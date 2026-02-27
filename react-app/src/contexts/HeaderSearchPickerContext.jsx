import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const EMPTY_PICKER = {
  isActive: false,
  kind: "",
  title: "",
  maxSelections: 5,
  selectedIds: [],
};

const HeaderSearchPickerContext = createContext(null);

function normalizeIds(list = [], maxSelections = 5) {
  const seen = new Set();
  const out = [];
  (Array.isArray(list) ? list : []).forEach((entry) => {
    const safeId = String(entry || "").trim();
    if (!safeId || seen.has(safeId)) return;
    seen.add(safeId);
    out.push(safeId);
  });
  return out.slice(0, Math.max(1, Number(maxSelections) || 5));
}

export function HeaderSearchPickerProvider({ children }) {
  const [picker, setPicker] = useState(EMPTY_PICKER);
  const resolverRef = useRef(null);

  const closePicker = useCallback((result = null) => {
    if (typeof resolverRef.current === "function") {
      resolverRef.current(result);
    }
    resolverRef.current = null;
    setPicker(EMPTY_PICKER);
  }, []);

  const openHeaderPicker = useCallback((config = {}) => {
    if (typeof resolverRef.current === "function") {
      resolverRef.current(null);
      resolverRef.current = null;
    }
    const safeKind = config.kind === "team" || config.kind === "athlete" ? config.kind : "team";
    const safeMax = Math.max(1, Number(config.maxSelections) || 5);
    const safeInitial = normalizeIds(config.initialIds, safeMax);
    const safeTitle = String(config.title || "").trim();

    setPicker({
      isActive: true,
      kind: safeKind,
      title: safeTitle,
      maxSelections: safeMax,
      selectedIds: safeInitial,
    });

    return new Promise((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const setSelectedIds = useCallback((next) => {
    setPicker((current) => {
      if (!current.isActive) return current;
      const base = Array.isArray(current.selectedIds) ? current.selectedIds : [];
      const resolved = typeof next === "function" ? next(base) : next;
      return {
        ...current,
        selectedIds: normalizeIds(resolved, current.maxSelections),
      };
    });
  }, []);

  const confirmPicker = useCallback(() => {
    const safeIds = normalizeIds(picker.selectedIds, picker.maxSelections);
    closePicker(safeIds);
  }, [closePicker, picker.maxSelections, picker.selectedIds]);

  const cancelPicker = useCallback(() => {
    closePicker(null);
  }, [closePicker]);

  const value = useMemo(() => ({
    openHeaderPicker,
    isPickerActive: picker.isActive,
    pickerKind: picker.kind,
    pickerTitle: picker.title,
    pickerMaxSelections: picker.maxSelections,
    selectedIds: picker.selectedIds,
    setSelectedIds,
    confirmPicker,
    cancelPicker,
  }), [cancelPicker, confirmPicker, openHeaderPicker, picker.isActive, picker.kind, picker.maxSelections, picker.selectedIds, picker.title, setSelectedIds]);

  return (
    <HeaderSearchPickerContext.Provider value={value}>
      {children}
    </HeaderSearchPickerContext.Provider>
  );
}

export function useHeaderSearchPicker() {
  const context = useContext(HeaderSearchPickerContext);
  if (!context) {
    throw new Error("useHeaderSearchPicker must be used within <HeaderSearchPickerProvider>.");
  }
  return context;
}

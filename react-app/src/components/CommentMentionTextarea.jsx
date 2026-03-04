import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildCommentMentionSuggestions,
  filterCommentMentionsForText,
  getCommentMentionQuery,
  insertCommentMention,
} from "../services/commentMentionsService";

function CommentMentionTextarea({
  id,
  label = "",
  value = "",
  onChange = () => {},
  placeholder = "",
  rows = 3,
  maxLength = 600,
  mentions = [],
  onMentionsChange = () => {},
  fieldClassName = "search-wrap",
  labelClassName = "",
  textareaClassName = "",
  suggestionsClassName = "",
  onKeyDown = null,
}) {
  const textareaRef = useRef(null);
  const [activeQuery, setActiveQuery] = useState("");
  const [activeTokenRange, setActiveTokenRange] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const pendingSelectionRef = useRef(null);
  const safeValue = String(value || "");
  const safeLabel = String(label || "").trim();
  const safeFieldClassName = String(fieldClassName || "").trim() || "search-wrap";
  const safeLabelClassName = String(labelClassName || "").trim();
  const safeTextareaClassName = String(textareaClassName || "").trim();
  const safeSuggestionsClassName = String(suggestionsClassName || "").trim();

  const suggestions = useMemo(
    () => (activeQuery ? buildCommentMentionSuggestions(activeQuery, { limit: 6 }) : []),
    [activeQuery],
  );
  const isSuggestionsOpen = suggestions.length > 0 && Boolean(activeQuery);

  function closeSuggestions() {
    setActiveQuery("");
    setActiveTokenRange(null);
    setHighlightedIndex(0);
  }

  function syncMentionsFromSelection(nextValue, caretIndex) {
    const mentionQuery = getCommentMentionQuery(nextValue, caretIndex);
    if (!mentionQuery) {
      closeSuggestions();
      return;
    }
    setActiveQuery(mentionQuery.query);
    setActiveTokenRange({
      start: mentionQuery.start,
      end: mentionQuery.end,
    });
    setHighlightedIndex(0);
  }

  function handleChange(event) {
    const nextValue = event.target.value;
    onMentionsChange(filterCommentMentionsForText(nextValue, mentions));
    onChange(nextValue);
    syncMentionsFromSelection(nextValue, event.target.selectionStart);
  }

  function handleTextSelection(event) {
    syncMentionsFromSelection(safeValue, event.currentTarget.selectionStart);
  }

  function applyPendingSelection() {
    const pendingSelection = pendingSelectionRef.current;
    const textareaElement = textareaRef.current;
    if (!pendingSelection || !textareaElement) return;
    textareaElement.focus();
    textareaElement.setSelectionRange(pendingSelection.start, pendingSelection.end);
    pendingSelectionRef.current = null;
  }

  useEffect(() => {
    applyPendingSelection();
  }, [safeValue]);

  function handleInsertMention(mention) {
    const textareaElement = textareaRef.current;
    const selectionStart = textareaElement?.selectionStart ?? activeTokenRange?.start ?? safeValue.length;
    const selectionEnd = textareaElement?.selectionEnd ?? activeTokenRange?.end ?? selectionStart;
    const inserted = insertCommentMention(safeValue, selectionStart, selectionEnd, mention);
    onMentionsChange(filterCommentMentionsForText(inserted.text, [...mentions, mention]));
    onChange(inserted.text);
    pendingSelectionRef.current = {
      start: inserted.selectionStart,
      end: inserted.selectionEnd,
    };
    closeSuggestions();
  }

  function handleKeyDown(event) {
    if (isSuggestionsOpen) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((current) => (
          suggestions.length ? (current + 1) % suggestions.length : 0
        ));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((current) => (
          suggestions.length ? (current - 1 + suggestions.length) % suggestions.length : 0
        ));
        return;
      }
      if (event.key === "Enter" || event.key === "Tab") {
        const mention = suggestions[highlightedIndex] || suggestions[0];
        if (mention) {
          event.preventDefault();
          handleInsertMention(mention);
          return;
        }
      }
      if (event.key === "Escape") {
        event.preventDefault();
        closeSuggestions();
        return;
      }
    }
    if (typeof onKeyDown === "function") {
      onKeyDown(event);
    }
  }

  function handleBlur() {
    closeSuggestions();
  }

  return (
    <div className="comment-mention-field">
      <label className={`${safeFieldClassName} ${safeLabelClassName}`.trim()} htmlFor={id}>
        {safeLabel ? <span>{safeLabel}</span> : null}
        <textarea
          ref={textareaRef}
          id={id}
          className={safeTextareaClassName}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          value={safeValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onClick={handleTextSelection}
          onKeyUp={handleTextSelection}
          onSelect={handleTextSelection}
          onFocus={handleTextSelection}
          onBlur={handleBlur}
        />
      </label>
      {isSuggestionsOpen ? (
        <div
          className={`comment-mention-suggestions ${safeSuggestionsClassName}`.trim()}
          role="listbox"
          aria-label="Suggestions de mentions"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.id}`}
              type="button"
              className={`comment-mention-option ${highlightedIndex === index ? "is-active" : ""}`.trim()}
              role="option"
              aria-selected={highlightedIndex === index}
              onMouseDown={(event) => {
                event.preventDefault();
                handleInsertMention(suggestion);
              }}
            >
              <span className="comment-mention-option-type">
                {suggestion.type === "athlete" ? "Athlete" : "Team"}
              </span>
              <span className="comment-mention-option-copy">
                <strong>{suggestion.label}</strong>
                {suggestion.meta ? <span>{suggestion.meta}</span> : null}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default CommentMentionTextarea;

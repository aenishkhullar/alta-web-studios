import React, { useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Heading1, 
  Heading2, 
  Text,
  Trash2
} from 'lucide-react';

export const RichTextEditor = ({ value, onChange, placeholder = 'Write your message here...' }) => {
  const editorRef = useRef(null);

  // Sync value from parent if it changes externally (e.g. loaded draft or loaded lead template)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const currentHtml = editorRef.current.innerHTML;
      // If editor becomes empty, contenteditable sometimes leaves a <br> or empty tags
      if (editorRef.current.textContent.trim() === '' && editorRef.current.children.length <= 1) {
        onChange('');
      } else {
        onChange(currentHtml);
      }
    }
  };

  const executeCommand = (e, command, argument = null) => {
    e.preventDefault(); // Prevent focus loss from editor
    document.execCommand(command, false, argument);
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const toolbarButtons = [
    { icon: <Bold size={15} />, command: 'bold', label: 'Bold' },
    { icon: <Italic size={15} />, command: 'italic', label: 'Italic' },
    { icon: <Underline size={15} />, command: 'underline', label: 'Underline' },
    { type: 'separator' },
    { icon: <Heading1 size={15} />, command: 'formatBlock', argument: '<h1>', label: 'Heading 1' },
    { icon: <Heading2 size={15} />, command: 'formatBlock', argument: '<h2>', label: 'Heading 2' },
    { icon: <Text size={15} />, command: 'formatBlock', argument: '<p>', label: 'Paragraph' },
    { type: 'separator' },
    { icon: <List size={15} />, command: 'insertUnorderedList', label: 'Bullet List' },
    { icon: <ListOrdered size={15} />, command: 'insertOrderedList', label: 'Numbered List' },
    { type: 'separator' },
    { icon: <AlignLeft size={15} />, command: 'justifyLeft', label: 'Align Left' },
    { icon: <AlignCenter size={15} />, command: 'justifyCenter', label: 'Align Center' },
    { icon: <AlignRight size={15} />, command: 'justifyRight', label: 'Align Right' },
    { type: 'separator' },
    { icon: <Trash2 size={15} />, command: 'removeFormat', label: 'Clear Formatting' },
  ];

  return (
    <div style={{
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--border-radius-md)',
      backgroundColor: 'var(--bg-tertiary)',
      overflow: 'hidden',
      transition: 'border-color var(--transition-fast)'
    }}
    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
    >
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '8px 12px',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        flexWrap: 'wrap'
      }}>
        {toolbarButtons.map((btn, idx) => {
          if (btn.type === 'separator') {
            return <div key={idx} style={{ width: '1px', height: '18px', backgroundColor: 'var(--border-color)', margin: '0 4px' }} />;
          }
          return (
            <button
              key={idx}
              type="button"
              title={btn.label}
              onMouseDown={(e) => executeCommand(e, btn.command, btn.argument)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {btn.icon}
            </button>
          );
        })}
      </div>

      {/* Editor Content Area */}
      <div style={{ position: 'relative' }}>
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          style={{
            padding: '16px',
            minHeight: '220px',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '14px',
            lineHeight: '1.6',
            boxSizing: 'border-box',
            overflowY: 'auto'
          }}
        />
        {/* Placeholder overlay */}
        {(!value || value === '' || value === '<p><br></p>') && (
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            color: 'var(--text-muted)',
            fontSize: '14px',
            pointerEvents: 'none',
            userSelect: 'none'
          }}>
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;

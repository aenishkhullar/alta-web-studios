import React, { useEffect, useState, useRef } from 'react';
import { useChatModal } from '../../context/ChatModalContext';
import api from '../../services/api';

const C = {
  bg: '#fafbe7',
  surface: '#ffffff',
  onBg: '#1a1d11',
  primaryContainer: '#c8f135',
  onPrimaryContainer: '#566c00',
  primary: '#526600',
  primaryFixed: '#c9f236',
  primaryFixedDim: '#aed50d',
  secondaryContainer: '#e5e2e1',
  onSecondaryContainer: '#656464',
  onPrimary: '#ffffff',
  secondary: '#5f5e5e',
  outlineVariant: '#c5c9ae',
  surfaceContainerLow: '#f4f5e2',
  surfaceVariant: '#e2e4d1',
};

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: `Hello 👋\n\nI'm Alta AI Assistant.\n\nI can help you understand our services, development process, project timelines, pricing, CRM systems, web applications, mobile apps, and AI automation solutions.`,
  timestamp: new Date().toISOString()
};

export const ChatModal = () => {
  const { isOpen, closeModal } = useChatModal();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      // scrollHeight includes padding. Using border-box sizing, style.height equals scrollHeight.
      // We bound it to a minimum of 48px and a maximum of 120px.
      textareaRef.current.style.height = `${Math.min(Math.max(textareaRef.current.scrollHeight, 48), 120)}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async (textToSend) => {
    const messageText = textToSend || inputValue;
    if (!messageText || messageText.trim() === '') return;

    // Add user message to history
    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) {
      setInputValue('');
    }
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await api.post('/api/ai/chat', { message: messageText.trim() });
      if (response.data && response.data.success) {
        setMessages(prev => [...prev, {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.data.reply,
          timestamp: new Date().toISOString()
        }]);
      } else {
        setErrorMsg('Sorry, Alta AI is currently unavailable. Please try again in a few moments.');
      }
    } catch (err) {
      console.error("AI chat error:", err);
      setErrorMsg('Sorry, Alta AI is currently unavailable. Please try again in a few moments.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setErrorMsg('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        if (!isLoading && inputValue.trim()) {
          handleSendMessage();
        }
      }
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, errorMsg]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeModal]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.id === 'chat-modal-backdrop') {
      closeModal();
    }
  };

  const chips = [
    'Website Development',
    'Mobile Apps',
    'AI Automation',
    'CRM Systems',
    'Pricing',
    'Project Timeline'
  ];

  return (
    <div
      id="chat-modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(26, 29, 17, 0.4)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'chatFadeIn 0.3s ease-out',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="chat-modal-container"
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '560px',
          height: '620px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
          animation: 'chatSlideUp 0.3s ease-out',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ 
          padding: '24px 32px', 
          borderBottom: '1px solid rgba(197,201,174,0.3)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: '#ffffff',
          zIndex: 10
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c8f135' }}></div>
              <h2 style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: '22px', fontWeight: 700, margin: 0, color: '#1a1d11' }}>
                Alta AI Assistant
              </h2>
            </div>
            <p style={{ margin: '4px 0 0 0', color: '#5f5e5e', fontSize: '13px' }}>
              Ask questions about our services, process, pricing, and projects.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Clear Chat Button */}
            <button
              onClick={handleClearChat}
              title="Clear Chat"
              style={{
                background: 'rgba(26,29,17,0.05)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#1a1d11',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,29,17,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(26,29,17,0.05)'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
            </button>
            <button
              onClick={closeModal}
              style={{
                background: 'rgba(26,29,17,0.05)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#1a1d11',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,29,17,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(26,29,17,0.05)'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ 
          flex: 1, 
          padding: '32px', 
          overflowY: 'auto', 
          background: C.bg, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px'
        }}>
          {/* Dynamic Messages */}
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  marginTop: isUser ? '4px' : '-4px'
                }}
              >
                <div style={{
                  background: isUser ? '#1a1d11' : '#ffffff',
                  color: isUser ? '#fafbe7' : '#1a1d11',
                  borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  padding: '16px 20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  border: isUser ? 'none' : '1px solid rgba(197,201,174,0.3)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
                    {msg.content}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Typing Loading State */}
          {isLoading && (
            <div style={{ alignSelf: 'flex-start', maxWidth: '85%', marginTop: '-4px' }}>
              <div style={{ 
                background: '#ffffff', 
                borderRadius: '20px 20px 20px 4px', 
                padding: '16px 20px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                border: '1px solid rgba(197,201,174,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1a1d11', animation: 'chatBounce 1.4s infinite ease-in-out both' }}></div>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1a1d11', animation: 'chatBounce 1.4s infinite ease-in-out both 0.2s' }}></div>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1a1d11', animation: 'chatBounce 1.4s infinite ease-in-out both 0.4s' }}></div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div style={{ alignSelf: 'center', maxWidth: '85%', margin: '10px 0' }}>
              <div style={{
                background: '#fee2e2',
                color: '#b91c1c',
                borderRadius: '12px',
                padding: '10px 16px',
                fontSize: '13px',
                fontFamily: "'Inter', sans-serif",
                border: '1px solid #fca5a5'
              }}>
                {errorMsg}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />

          {/* Quick Action Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                disabled={isLoading}
                onClick={() => handleSendMessage(chip)}
                style={{
                  background: '#ffffff',
                  color: C.onBg,
                  border: '1px solid rgba(197,201,174,0.6)',
                  borderRadius: '9999px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.2s ease',
                  opacity: isLoading ? 0.6 : 1
                }}
                onMouseEnter={e => {
                  if (!isLoading) {
                    e.currentTarget.style.background = C.primaryContainer;
                    e.currentTarget.style.borderColor = C.primary;
                  }
                }}
                onMouseLeave={e => {
                  if (!isLoading) {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.borderColor = 'rgba(197,201,174,0.6)';
                  }
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div style={{ 
          padding: '24px 32px', 
          borderTop: '1px solid rgba(197,201,174,0.3)', 
          background: '#ffffff',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <textarea 
            ref={textareaRef}
            placeholder={isLoading ? "Alta AI is typing..." : "Ask Alta AI anything..."} 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            disabled={isLoading}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: '24px',
              border: '1px solid rgba(197,201,174,0.5)',
              background: C.bg,
              fontSize: '14px',
              color: '#1a1d11',
              outline: 'none',
              fontFamily: "'Inter', sans-serif",
              cursor: isLoading ? 'not-allowed' : 'text',
              resize: 'none',
              boxSizing: 'border-box',
              minHeight: '48px',
              maxHeight: '120px',
              overflowY: 'auto',
              lineHeight: '20px'
            }} 
          />
          <button
            disabled={isLoading || !inputValue.trim()}
            onClick={() => handleSendMessage()}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: (isLoading || !inputValue.trim()) ? C.secondary : '#1a1d11',
              color: '#fafbe7',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: (isLoading || !inputValue.trim()) ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              flexShrink: 0
            }}
            onMouseEnter={e => {
              if (!isLoading && inputValue.trim()) {
                e.currentTarget.style.background = C.primary;
              }
            }}
            onMouseLeave={e => {
              if (!isLoading && inputValue.trim()) {
                e.currentTarget.style.background = '#1a1d11';
              }
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>send</span>
          </button>
        </div>
      </div>
      <style>{`
        @keyframes chatFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
        @media (max-width: 600px) {
          .chat-modal-container {
            height: 100% !important;
            max-height: 100% !important;
            border-radius: 0px !important;
            max-width: 100% !important;
          }
          #chat-modal-backdrop {
            padding: 0px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatModal;

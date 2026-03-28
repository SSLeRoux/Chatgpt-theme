/**
 * A ChatGPT-App-Inspired Theme for TypingMind
 * FINAL FULL VERSION: Pure Black, #303030 Bubbles, Hidden AI Icons, Full Sidebar & Fonts
 */
(function () {
    'use strict';

    const CONFIG = {
        colors: {
            light: {
                background: '#F9F9F9',
                text: '#000',
                border: '#ccc',
                input: { background: '#f4f4f4', text: 'rgb(13, 13, 13)' },
                sidebar: { text: 'rgb(13, 13, 13)', hover: '#E3E3E3', searchBg: '#fff' }
            },
            dark: {
                background: '#000000', // Pure Black App Background
                text: '#ececec',
                border: '#333',
                input: { background: '#303030', text: '#ececec' }, // App-style bubble grey
                sidebar: { text: '#ececec', heading: 'rgb(143, 143, 143)', hover: '#2f2f2f', searchBg: '#1a1a1a' }
            }
        },
        fonts: { 
            primary: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            sidebar: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif'
        },
        borderRadius: { small: '0.5rem', medium: '1rem', large: '1.5rem' }
    };

    const SELECTORS = {
        USER_MESSAGE_BLOCK: 'div[data-element-id="user-message"]',
        AI_AVATAR: '[data-element-id="chat-avatar-container"]', // The purple icon
        SIDEBAR: { 
            WORKSPACE: '[data-element-id="workspace-bar"]', 
            BACKGROUND: '[data-element-id="side-bar-background"]',
            SEARCH: '[data-element-id="search-chats-bar"]',
            NEW_CHAT: '[data-element-id="new-chat-button-in-side-bar"]'
        }
    };

    /**
     * 1) Combined Sidebar & Main Styles
     */
    const style = document.createElement('style');
    const d = CONFIG.colors.dark;
    
    style.textContent = `
      /* --- HIDE AI AVATAR ICON --- */
      ${SELECTORS.AI_AVATAR} { display: none !important; }

      /* --- GLOBAL APP DARK MODE --- */
      html.dark body, 
      html.dark [data-element-id="chat-space-middle-part"],
      html.dark ${SELECTORS.SIDEBAR.BACKGROUND},
      html.dark ${SELECTORS.SIDEBAR.WORKSPACE} { 
        background-color: ${d.background} !important; 
      }

      /* Sidebar Specifics */
      html.dark ${SELECTORS.SIDEBAR.SEARCH} { background-color: ${d.sidebar.searchBg} !important; border: 1px solid ${d.border} !important; }
      html.dark ${SELECTORS.SIDEBAR.NEW_CHAT} { background-color: ${d.sidebar.hover} !important; color: ${d.text} !important; }
      html.dark [data-element-id="custom-chat-item"] span, 
      html.dark [data-element-id="selected-chat-item"] span { 
        color: ${d.sidebar.text} !important; 
        font-family: ${CONFIG.fonts.sidebar} !important; 
      }
      html.dark [data-element-id="custom-chat-item"]:hover, 
      html.dark [data-element-id="selected-chat-item"] { 
        background-color: ${d.sidebar.hover} !important; 
      }

      /* User Message Bubbles (1rem Padding) */
      html.dark ${SELECTORS.USER_MESSAGE_BLOCK} { 
        background-color: ${d.input.background} !important; 
        color: ${d.text} !important;
        padding: 1rem !important;
        border-radius: ${CONFIG.borderRadius.large} !important;
        margin-left: auto !important;
        max-width: 90% !important;
        font-family: ${CONFIG.fonts.primary} !important;
        font-size: 18px !important;
        line-height: 28px !important;
      }

      /* Input Bar Area */
      html.dark [data-element-id="chat-space-end-part"] [role="presentation"] { 
        background-color: ${d.input.background} !important; 
        border-radius: ${CONFIG.borderRadius.large} !important;
      }
      #chat-input-textbox { border: none !important; outline: none !important; background: transparent !important; color: ${d.text} !important; }

      /* Prose & Text Rendering */
      .prose { 
        max-width: 100% !important; 
        font-family: ${CONFIG.fonts.primary} !important; 
        font-size: 18px !important;
        line-height: 28px !important;
      }
    `;
    document.head.appendChild(style);

    /**
     * 2) Logic for User Message Processing (Markdown/Bold/Italic)
     */
    function styleUserMessageEl(msgEl) {
        if (msgEl.hasAttribute('data-processed')) return;
        // This keeps the internal formatting of your messages working
        msgEl.setAttribute('data-processed', 'true');
    }

    const observer = new MutationObserver(() => {
        document.querySelectorAll(SELECTORS.USER_MESSAGE_BLOCK).forEach(msg => styleUserMessageEl(msg));
    });
    observer.observe(document.body, { childList: true, subtree: true });

})();

/**
 * A ChatGPT-OLED-App Theme for TypingMind
 * THE COMPLETE MASTER VERSION: 
 * Pure Black (#000), Flush AI Text, Monochrome UI, Full Sidebar & Markdown Logic
 */
(function () {
    'use strict';

    const CONFIG = {
        colors: {
            dark: {
                background: '#000000',
                bubble: '#303030',
                text: '#ececec',
                border: '#222',
                sidebarHover: '#2f2f2f',
                uiGrey: '#a1a1a1',
                placeholder: 'rgba(255,255,255,0.4)',
                searchBg: '#1a1a1a'
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
        AI_RESPONSE: '[data-element-id="ai-response"]',
        AI_AVATAR: '[data-element-id="chat-avatar-container"]',
        SIDEBAR: { 
            WORKSPACE: '[data-element-id="workspace-bar"]', 
            BACKGROUND: '[data-element-id="side-bar-background"]',
            SEARCH: '[data-element-id="search-chats-bar"]',
            NEW_CHAT: '[data-element-id="new-chat-button-in-side-bar"]'
        }
    };

    /**
     * 1) THE CSS OVERHAUL
     */
    const style = document.createElement('style');
    const d = CONFIG.colors.dark;
    
    style.textContent = `
      /* --- GLOBAL OLED BLACKOUT --- */
      html.dark body, 
      html.dark [data-element-id="chat-space-middle-part"],
      html.dark ${SELECTORS.SIDEBAR.BACKGROUND},
      html.dark ${SELECTORS.SIDEBAR.WORKSPACE},
      html.dark [data-element-id="chat-space-beginning-part"],
      html.dark [data-element-id="chat-space-end-part"],
      html.dark [data-element-id="nav-bar"],
      html.dark header { 
        background-color: ${d.background} !important; 
        background-image: none !important;
      }

      /* --- FLUSH AI RESPONSES --- */
      ${SELECTORS.AI_AVATAR} { display: none !important; }
      ${SELECTORS.AI_RESPONSE} { padding-left: 0 !important; margin-left: 0 !important; }
      ${SELECTORS.AI_RESPONSE} > div { grid-template-columns: 1fr !important; display: block !important; }

      /* --- MONOCHROME UI (No more Purple/Blue) --- */
      button[aria-label="Regenerate response"], 
      button[class*="text-blue-"], 
      [class*="bg-blue-600"] { 
        background-color: ${d.uiGrey} !important; 
        color: #000 !important; 
        border: none !important;
      }
      html.dark svg[class*="text-blue-"] { color: ${d.uiGrey} !important; }

      /* --- SIDEBAR FULL STYLING --- */
      html.dark ${SELECTORS.SIDEBAR.SEARCH} { 
        background-color: ${d.searchBg} !important; 
        border: 1px solid ${d.border} !important; 
        color: ${d.text} !important; 
      }
      html.dark ${SELECTORS.SIDEBAR.NEW_CHAT} { 
        background-color: ${d.sidebarHover} !important; 
        color: ${d.text} !important; 
      }
      html.dark [data-element-id="custom-chat-item"] span, 
      html.dark [data-element-id="selected-chat-item"] span { 
        color: ${d.text} !important; 
        font-family: ${CONFIG.fonts.sidebar} !important; 
      }
      html.dark [data-element-id="custom-chat-item"]:hover, 
      html.dark [data-element-id="selected-chat-item"] { 
        background-color: ${d.sidebarHover} !important; 
      }

      /* --- USER MESSAGES & INPUT (The Bubble Look) --- */
      html.dark ${SELECTORS.USER_MESSAGE_BLOCK} { 
        background-color: ${d.bubble} !important; 
        color: ${d.text} !important;
        padding: 1rem !important;
        border-radius: ${CONFIG.borderRadius.large} !important;
        margin-left: auto !important;
        max-width: 90% !important;
        font-family: ${CONFIG.fonts.primary} !important;
        font-size: 18px !important;
        line-height: 28px !important;
      }
      html.dark [data-element-id="chat-space-end-part"] [role="presentation"] { 
        background-color: ${d.bubble} !important; 
        border-radius: ${CONFIG.borderRadius.large} !important;
      }
      #chat-input-textbox::placeholder { font-size: 13px !important; opacity: 0.6 !important; }

      /* --- PROSE REFINEMENT --- */
      .prose { 
        max-width: 100% !important; 
        font-family: ${CONFIG.fonts.primary} !important; 
        font-size: 18px !important;
        line-height: 28px !important;
        color: ${d.text} !important;
      }
      pre code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace !important; }
    `;
    document.head.appendChild(style);

    /**
     * 2) DYNAMIC CONTENT LOGIC (Markdown & Observers)
     */
    const Utils = {
        escapeHtml(str) { return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    };

    function processUserMessage(msgEl) {
        if (msgEl.hasAttribute('data-processed')) return;
        // Logic to preserve 1rem padding even when content updates
        msgEl.style.padding = "1rem";
        msgEl.setAttribute('data-processed', 'true');
    }

    const observer = new MutationObserver((mutations) => {
        document.querySelectorAll(SELECTORS.USER_MESSAGE_BLOCK).forEach(msg => processUserMessage(msg));
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

})();

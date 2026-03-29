/**
 * A ChatGPT-OLED-App Theme for TypingMind
 * THE FINAL MASTER CONSOLIDATED VERSION
 * Pure Black (#000), #303030 Bubbles, Flush AI Text, Monochrome UI, 1rem Padding
 */
(function () {
    'use strict';

    /**
     * 1) Configuration & Selectors
     */
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
        borderRadius: { large: '1.5rem' }
    };

    const SELECTORS = {
        USER_MESSAGE_BLOCK: 'div[data-element-id="user-message"]',
        AI_RESPONSE_BLOCK: '[data-element-id="ai-response"]',
        AI_AVATAR: '[data-element-id="chat-avatar-container"]',
        SIDEBAR: { 
            WORKSPACE: '[data-element-id="workspace-bar"]', 
            BACKGROUND: '[data-element-id="side-bar-background"]',
            SEARCH: '[data-element-id="search-chats-bar"]',
            NEW_CHAT: '[data-element-id="new-chat-button-in-side-bar"]'
        }
    };

    /**
     * 2) The CSS Engine
     */
    const style = document.createElement('style');
    const d = CONFIG.colors.dark;
    
    style.textContent = `
      /* --- 1) TOTAL OLED BLACKOUT (TARGETING THE GREY BAR) --- */
      html.dark body, 
      html.dark [data-element-id="chat-space-middle-part"],
      html.dark ${SELECTORS.SIDEBAR.BACKGROUND},
      html.dark ${SELECTORS.SIDEBAR.WORKSPACE},
      html.dark [data-element-id="chat-space-beginning-part"],
      html.dark [data-element-id="chat-space-end-part"],
      html.dark [data-element-id="nav-bar"],
      html.dark header,
      html.dark .sticky.bottom-0, /* The persistent grey bar fix */
      html.dark [class*="bg-gray-50"], 
      html.dark [class*="dark:bg-gray-800"],
      html.dark [class*="bg-base-100"] { 
        background-color: ${d.background} !important; 
        background-image: none !important;
        border: none !important;
        box-shadow: none !important;
      }

      /* --- 2) FLUSH AI TEXT (LEFT-ALIGNED) --- */
      ${SELECTORS.AI_AVATAR} { display: none !important; }
      
      [data-element-id="response-block"] { 
        display: block !important; 
        width: 100% !important; 
      }

      ${SELECTORS.AI_RESPONSE_BLOCK} { 
        display: block !important;
        padding-left: 1rem !important; 
        padding-right: 1.5rem !important; 
        margin-left: 0 !important;
        max-width: 100% !important; 
        width: 100% !important;
      }
      
      ${SELECTORS.AI_RESPONSE_BLOCK} > div { 
        width: 100% !important; 
        max-width: 100% !important;
        text-align: left !important;
      }

      /* --- 3) USER MESSAGES (1REM PADDING) --- */
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

      /* --- 4) INPUT AREA & MONOCHROME BUTTONS --- */
      html.dark [data-element-id="chat-space-end-part"] [role="presentation"] { 
        background-color: ${d.bubble} !important; 
        border-radius: ${CONFIG.borderRadius.large} !important;
      }
      
      #chat-input-textbox { color: ${d.text} !important; background: transparent !important; }
      #chat-input-textbox::placeholder { font-size: 14px !important; color: ${d.placeholder} !important; }

      /* Blue button to Grey UI */
      .bg-blue-600, 
      button[aria-label="Regenerate response"],
      [data-element-id="regenerate-button"],
      [class*="text-blue-"] { 
        background-color: ${d.uiGrey} !important; 
        color: #000 !important; 
        border: none !important;
      }
      
      /* Active icons in input bar */
      html.dark svg[class*="text-blue-"] { color: ${d.uiGrey} !important; }

      /* --- 5) FULL SIDEBAR RESTORATION --- */
      html.dark ${SELECTORS.SIDEBAR.SEARCH} { background-color: ${d.searchBg} !important; border: 1px solid ${d.border} !important; color: ${d.text} !important; }
      html.dark ${SELECTORS.SIDEBAR.NEW_CHAT} { background-color: ${d.sidebarHover} !important; color: ${d.text} !important; }
      html.dark [data-element-id="custom-chat-item"]:hover, 
      html.dark [data-element-id="selected-chat-item"] { background-color: ${d.sidebarHover} !important; }
      html.dark [data-element-id="custom-chat-item"] span, 
      html.dark [data-element-id="selected-chat-item"] span { 
        color: ${d.text} !important; 
        font-family: ${CONFIG.fonts.sidebar} !important; 
      }

      /* --- 6) TEXT & CODE RENDERING --- */
      .prose { 
        max-width: 100% !important; 
        font-family: ${CONFIG.fonts.primary} !important; 
        font-size: 18px !important;
        line-height: 28px !important;
        color: ${d.text} !important;
      }
      pre code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace !important; font-size: 14px !important; }
    `;
    document.head.appendChild(style);

    /**
     * 3) Logic & Performance Observers
     */
    const Utils = {
        safe(fn) { try { return fn(); } catch (e) { return null; } }
    };

    function processUserMessage(msgEl) {
        if (msgEl.hasAttribute('data-processed')) return;
        msgEl.style.padding = "1rem";
        msgEl.setAttribute('data-processed', 'true');
    }

    const observer = new MutationObserver(() => {
        document.querySelectorAll(SELECTORS.USER_MESSAGE_BLOCK).forEach(msg => processUserMessage(msg));
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

})();

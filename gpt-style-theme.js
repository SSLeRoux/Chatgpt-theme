/**
 * A ChatGPT-OLED-App Theme for TypingMind
 * THE COMPLETE REWRITE: -50px AI Nudge, #303030 Input Bubble, Total Blackout Footer
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
                uiGrey: '#a1a1a1',
                sidebarHover: '#2f2f2f'
            }
        },
        fonts: { 
            primary: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
            sidebar: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif'
        }
    };

    const style = document.createElement('style');
    const d = CONFIG.colors.dark;
    
    style.textContent = `
      /* --- 1) THE GREAT OLED BLACKOUT --- */
      html.dark body, 
      html.dark [data-element-id="chat-space-middle-part"],
      html.dark [data-element-id="side-bar-background"],
      html.dark [data-element-id="workspace-bar"],
      html.dark [data-element-id="chat-space-beginning-part"],
      html.dark [data-element-id="chat-space-end-part"],
      html.dark [data-element-id="nav-bar"],
      html.dark header,
      html.dark .sticky.bottom-0, 
      html.dark [class*="bg-base-100"],
      html.dark [class*="dark:bg-gray-800"] { 
        background-color: ${d.background} !important; 
        background-image: none !important;
        border: none !important;
        box-shadow: none !important;
      }

      /* --- 2) AI TEXT ALIGNMENT (-50PX BRUTE FORCE) --- */
      [data-element-id="chat-avatar-container"] { display: none !important; }
      
      [data-element-id="response-block"] { 
        display: block !important; 
        width: 100% !important; 
      }

      [data-element-id="ai-response"] { 
        display: block !important;
        margin-left: -50px !important; /* Forced nudge to the left */
        padding-left: 1rem !important; 
        padding-right: 1.5rem !important; 
        max-width: 100% !important; 
        width: calc(100% + 50px) !important;
      }
      
      [data-element-id="ai-response"] > div { 
        width: 100% !important;
        text-align: left !important;
      }

      /* --- 3) USER MESSAGES (1REM PADDING) --- */
      html.dark [data-element-id="user-message"] { 
        background-color: ${d.bubble} !important; 
        color: ${d.text} !important;
        padding: 1rem !important;
        border-radius: 1.5rem !important;
        margin-left: auto !important;
        max-width: 90% !important;
        font-family: ${CONFIG.fonts.primary} !important;
        font-size: 18px !important;
        line-height: 28px !important;
      }

      /* --- 4) THE INPUT BUBBLE (#303030) --- */
      /* This styles the rounded bubble itself */
      html.dark [data-element-id="chat-space-end-part"] [role="presentation"] { 
        background-color: ${d.bubble} !important; 
        border-radius: 1.5rem !important;
        border: none !important;
      }
      
      #chat-input-textbox { 
        color: ${d.text} !important; 
        background: transparent !important; 
        font-size: 18px !important;
      }
      #chat-input-textbox::placeholder { font-size: 14px !important; color: rgba(255,255,255,0.4) !important; }

      /* --- 5) MONOCHROME BUTTONS --- */
      .bg-blue-600, 
      button[aria-label="Regenerate response"],
      [data-element-id="regenerate-button"],
      [class*="text-blue-"] { 
        background-color: ${d.uiGrey} !important; 
        color: #000 !important; 
        border: none !important;
      }
      html.dark svg[class*="text-blue-"] { color: ${d.uiGrey} !important; }

      /* --- 6) SIDEBAR RESTORATION --- */
      html.dark [data-element-id="search-chats-bar"] { background-color: #1a1a1a !important; border: 1px solid #333 !important; }
      html.dark [data-element-id="new-chat-button-in-side-bar"] { background-color: ${d.sidebarHover} !important; }
      html.dark [data-element-id="custom-chat-item"]:hover, 
      html.dark [data-element-id="selected-chat-item"] { background-color: ${d.sidebarHover} !important; }
      html.dark [data-element-id="custom-chat-item"] span, 
      html.dark [data-element-id="selected-chat-item"] span { 
        color: ${d.text} !important; 
        font-family: ${CONFIG.fonts.sidebar} !important; 
      }

      /* TEXT & PROSE */
      .prose { 
        max-width: 100% !important; 
        font-family: ${CONFIG.fonts.primary} !important; 
        font-size: 18px !important;
        line-height: 28px !important;
        color: ${d.text} !important;
      }
    `;
    document.head.appendChild(style);

    /* Logic to ensure user message padding stays consistent */
    const observer = new MutationObserver(() => {
        document.querySelectorAll('[data-element-id="user-message"]').forEach(msg => {
            if (!msg.hasAttribute('data-processed')) {
                msg.style.padding = "1rem";
                msg.setAttribute('data-processed', 'true');
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

})();

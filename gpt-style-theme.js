/**
 * A ChatGPT-OLED-App Theme for TypingMind
 * THE FINAL MASTER: OLED Black, Left-Aligned AI Text, Full Sidebar, Monochrome UI
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
            primary: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
            sidebar: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif'
        },
        borderRadius: { large: '1.5rem' }
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
      html.dark [class*="bg-gray-50"], 
      html.dark [class*="dark:bg-gray-800"] { 
        background-color: ${d.background} !important; 
        background-image: none !important;
      }

      /* --- 2) AI TEXT ALIGNMENT (LEFT-FLUSH) --- */
      [data-element-id="chat-avatar-container"] { display: none !important; }
      
      /* Target the AI response container to align left and add padding */
      [data-element-id="ai-response"] { 
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-start !important; /* Force to the left */
        padding-left: 1rem !important; 
        padding-right: 2rem !important; /* Keep space on the right for readability */
        margin-left: 0 !important;
        width: 100% !important;
      }
      
      /* Ensure the inner prose text also respects the left alignment */
      [data-element-id="ai-response"] > div { 
        width: 100% !important;
        text-align: left !important;
      }

      /* --- 3) FULL SIDEBAR RESTORATION --- */
      html.dark [data-element-id="search-chats-bar"] { 
        background-color: ${d.searchBg} !important; 
        border: 1px solid ${d.border} !important; 
      }
      html.dark [data-element-id="new-chat-button-in-side-bar"] { 
        background-color: ${d.sidebarHover} !important; 
        color: ${d.text} !important; 
      }
      html.dark [data-element-id="custom-chat-item"]:hover, 
      html.dark [data-element-id="selected-chat-item"] { 
        background-color: ${d.sidebarHover} !important; 
      }
      html.dark [data-element-id="custom-chat-item"] span, 
      html.dark [data-element-id="selected-chat-item"] span { 
        color: ${d.text} !important; 
        font-family: ${CONFIG.fonts.sidebar} !important; 
      }

      /* --- 4) USER MESSAGES & INPUT --- */
      html.dark [data-element-id="user-message"] { 
        background-color: ${d.bubble} !important; 
        padding: 1rem !important;
        border-radius: ${CONFIG.borderRadius.large} !important;
        margin-left: auto !important;
        max-width: 90% !important;
      }
      html.dark [data-element-id="chat-space-end-part"] [role="presentation"] { 
        background-color: ${d.bubble} !important; 
        border-radius: ${CONFIG.borderRadius.large} !important;
      }
      #chat-input-textbox::placeholder { font-size: 13px !important; opacity: 0.5 !important; }

      /* --- 5) MONOCHROME BUTTONS & MODEL PICKER --- */
      /* Reroll & Model Picker Backgrounds */
      button[aria-label="Regenerate response"],
      [data-element-id="model-picker-button"],
      [data-element-id="plugin-picker-button"] {
        background-color: ${d.bubble} !important;
        color: ${d.uiGrey} !important;
        border: 1px solid ${d.border} !important;
      }
      
      /* Change any blue icons/text to grey */
      html.dark svg[class*="text-blue-"], 
      html.dark [class*="text-blue-600"] { 
        color: ${d.uiGrey} !important; 
      }

      /* Text Rendering */
      .prose { 
        font-family: ${CONFIG.fonts.primary} !important; 
        font-size: 18px !important;
        line-height: 28px !important;
        color: ${d.text} !important;
      }
    `;
    document.head.appendChild(style);

    // MutationObserver to ensure user message padding stays consistent
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

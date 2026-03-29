/**
 * A ChatGPT-OLED-App Theme for TypingMind
 * THE OLED-FOOTER FIX: Hunting down the persistent grey wrapper
 */
(function () {
    'use strict';

    const CONFIG = {
        colors: {
            dark: {
                background: '#000000',
                bubble: '#303030',
                text: '#ececec',
                uiGrey: '#a1a1a1',
                sidebarHover: '#2f2f2f'
            }
        }
    };

    const style = document.createElement('style');
    const d = CONFIG.colors.dark;
    
    style.textContent = `
      /* --- 1) THE BLACKOUT (Targeting the Screenshot Grey) --- */
      html.dark body, 
      html.dark [data-element-id="chat-space-middle-part"],
      html.dark [data-element-id="side-bar-background"],
      html.dark [data-element-id="chat-space-end-part"], 
      html.dark [data-element-id="nav-bar"],
      html.dark header,
      html.dark .sticky.bottom-0,
      html.dark [class*="bg-base-"],
      html.dark [class*="dark:bg-gray-800"],
      html.dark div[class*="bg-gray-900/"], /* Targets transparent overlays */
      html.dark footer { 
        background-color: ${d.background} !important; 
        background-image: none !important;
        border: none !important;
        box-shadow: none !important;
      }

      /* --- 2) AI TEXT ALIGNMENT (-50PX) --- */
      [data-element-id="chat-avatar-container"] { display: none !important; }
      [data-element-id="response-block"] { display: block !important; width: 100% !important; }
      [data-element-id="ai-response"] { 
        display: block !important;
        margin-left: -50px !important; 
        padding-left: 1rem !important; 
        padding-right: 1.5rem !important; 
        width: calc(100% + 50px) !important;
      }

      /* --- 3) THE INPUT AREA (Keeping the Bubble Grey) --- */
      /* This makes the wrapper behind the bubble black */
      html.dark [data-element-id="chat-space-end-part"] {
        background-color: ${d.background} !important;
      }
      
      /* This keeps the bubble itself #303030 */
      html.dark [data-element-id="chat-space-end-part"] [role="presentation"] { 
        background-color: ${d.bubble} !important; 
        border-radius: 1.5rem !important;
      }

      #chat-input-textbox { color: ${d.text} !important; background: transparent !important; }

      /* --- 4) MONOCHROME BUTTONS (From Screenshot) --- */
      button[aria-label="Regenerate response"],
      [data-element-id="regenerate-button"],
      .bg-blue-600,
      [class*="bg-blue-"] { 
        background-color: ${d.uiGrey} !important; 
        color: #000 !important; 
      }
      html.dark svg[class*="text-blue-"] { color: ${d.uiGrey} !important; }

      /* --- 5) SIDEBAR & TEXT --- */
      html.dark [data-element-id="side-bar-background"] { background-color: ${d.background} !important; }
      .prose { color: ${d.text} !important; font-size: 18px !important; line-height: 28px !important; }
      
      /* User Messages */
      html.dark [data-element-id="user-message"] { 
        background-color: ${d.bubble} !important; 
        padding: 1rem !important;
        border-radius: 1.5rem !important;
        margin-left: auto !important;
      }
    `;
    document.head.appendChild(style);

})();

/**
 * A ChatGPT-OLED-App Theme for TypingMind
 * BRUTE FORCE VERSION: Negative Margins & Total Footer Transparency
 */
(function () {
    'use strict';

    const CONFIG = {
        colors: {
            dark: {
                background: '#000000',
                bubble: '#303030',
                text: '#ececec',
                uiGrey: '#a1a1a1'
            }
        }
    };

    const style = document.createElement('style');
    const d = CONFIG.colors.dark;
    
    style.textContent = `
      /* --- 1) THE "PAINT IT ALL BLACK" OVERRIDE --- */
      html.dark body, 
      html.dark [data-element-id="chat-space-middle-part"],
      html.dark [data-element-id="side-bar-background"],
      html.dark [data-element-id="workspace-bar"],
      html.dark [data-element-id="nav-bar"],
      html.dark header,
      html.dark [data-element-id="chat-space-end-part"], 
      html.dark [data-element-id="chat-space-beginning-part"],
      html.dark .sticky.bottom-0,
      html.dark [class*="bg-base-"],
      html.dark [class*="dark:bg-gray-800"] { 
        background-color: ${d.background} !important; 
        background-image: none !important;
        border: none !important;
      }

      /* --- 2) NEGATIVE MARGIN HACK FOR AI TEXT --- */
      [data-element-id="chat-avatar-container"] { display: none !important; }
      
      [data-element-id="response-block"] { 
        display: block !important; 
        width: 100% !important;
      }

      [data-element-id="ai-response"] { 
        display: block !important;
        margin-left: -40px !important; /* THE HACK: Pushes text into the "avatar space" */
        padding-left: 1rem !important;
        padding-right: 1.5rem !important;
        width: calc(100% + 40px) !important; /* Adjust width to compensate */
      }

      /* --- 3) INPUT AREA RESET --- */
      /* Removing the black background so it blends with the (now black) footer */
      html.dark [data-element-id="chat-space-end-part"] [role="presentation"] { 
        background-color: transparent !important; 
        border: 1px solid #333 !important;
      }
      
      /* --- 4) MONOCHROME UI --- */
      .bg-blue-600, 
      [data-element-id="regenerate-button"],
      [class*="text-blue-"] { 
        background-color: ${d.bubble} !important; 
        color: ${d.text} !important; 
      }
      html.dark svg[class*="text-blue-"] { color: ${d.uiGrey} !important; }

      /* --- 5) TEXT RENDERING --- */
      .prose { 
        font-family: ui-sans-serif, system-ui, sans-serif !important;
        font-size: 18px !important;
        line-height: 28px !important;
        color: ${d.text} !important;
      }
      
      /* User Messages */
      html.dark [data-element-id="user-message"] { 
        background-color: ${d.bubble} !important;
        padding: 1rem !important;
        border-radius: 1.5rem !important;
        max-width: 90% !important;
        margin-left: auto !important;
      }
    `;
    document.head.appendChild(style);

    // Sidebar fix inclusion
    const sidebarFix = document.createElement('style');
    sidebarFix.textContent = `
      html.dark [data-element-id="side-bar-background"], 
      html.dark [data-element-id="search-chats-bar"] { background-color: ${d.background} !important; }
      html.dark [data-element-id="custom-chat-item"]:hover, 
      html.dark [data-element-id="selected-chat-item"] { background-color: #1a1a1a !important; }
    `;
    document.head.appendChild(sidebarFix);

})();

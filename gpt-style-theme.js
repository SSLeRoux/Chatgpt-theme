/**
 * A ChatGPT-Inspired Theme for TypingMind - Cleaned Version
 */
(function () {
    'use strict';

    const CONFIG = {
        colors: {
            light: {
                background: '#F9F9F9',
                text: '#000',
                border: '#ccc',
                input: { background: '#f4f4f4', text: 'rgb(13, 13, 13)', placeholder: 'rgb(142, 142, 142)' },
                button: { primary: 'rgb(13, 13, 13)', hover: 'rgba(13, 13, 13, 0.8)' },
                thought: { text: '#0066CC' },
                sidebar: { text: 'rgb(13, 13, 13)', heading: 'rgb(143, 143, 143)', hover: '#E3E3E3', searchBg: '#fff' },
                hoverOverlay: 'rgba(0,0,0,0.1)'
            },
            dark: {
                background: '#212121',
                text: '#ececec',
                border: '#444',
                input: { background: '#303030', text: '#ececec', placeholder: 'rgba(255,255,255,0.5)' },
                button: { primary: '#ececec', hover: 'rgba(236, 236, 236, 0.8)' },
                thought: { text: '#6cb6ff' },
                sidebar: { text: '#ececec', heading: 'rgb(143, 143, 143)', hover: '#2f2f2f', searchBg: '#303030' },
                hoverOverlay: 'rgba(255,255,255,0.1)'
            }
        },
        fonts: { primary: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif', weights: { normal: 400, semibold: 600 } },
        borderRadius: { large: '1.5rem' },
    };

    const SELECTORS = {
        USER_MESSAGE_BLOCK: 'div[data-element-id="user-message"]',
        SIDEBAR: { BACKGROUND: '[data-element-id="side-bar-background"]', SEARCH: '[data-element-id="search-chats-bar"]' }
    };

    const mainStyle = document.createElement('style');
    const light = CONFIG.colors.light;
    const dark = CONFIG.colors.dark;
    
    mainStyle.textContent = `
      /* Clear the annoying gradient smudge */
      .scroll-indicator-gradient, 
      [class*="scroll-indicator-gradient"],
      div[class*="bottom-0"][class*="right-0"][class*="bg-gradient-to-l"] { 
        display: none !important; 
        background: transparent !important;
        opacity: 0 !important;
      }

      /* Chat Bubble Styling */
      html:not(.dark) [data-element-id="chat-space-middle-part"] [data-element-id="user-message"] { 
        background-color: ${light.input.background} !important; 
        padding: 1.25rem 1.5rem !important; 
        border-radius: ${CONFIG.borderRadius.large} !important;
        margin-left: auto !important;
      }
      html.dark [data-element-id="chat-space-middle-part"] [data-element-id="user-message"] { 
        background-color: ${dark.input.background} !important; 
        padding: 1.25rem 1.5rem !important; 
        border-radius: ${CONFIG.borderRadius.large} !important;
        margin-left: auto !important;
      }

      /* Input Bar Fixes */
      html:not(.dark) [data-element-id="chat-space-end-part"] [role="presentation"] { background-color: ${light.input.background} !important; border-radius: ${CONFIG.borderRadius.large} !important; }
      html.dark [data-element-id="chat-space-end-part"] [role="presentation"] { background-color: ${dark.input.background} !important; border-radius: ${CONFIG.borderRadius.large} !important; }
      
      #chat-input-textbox { border: none !important; outline: none !important; background: transparent !important; }
    `;
    document.head.appendChild(mainStyle);

    console.log('TypingMind Theme: Smudge removed.');
})();

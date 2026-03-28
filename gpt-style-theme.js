/**
 * A ChatGPT-OLED-App Theme for TypingMind
 * BASE: User's Full Original Script
 * UPDATES: Pure Black, #303030 Bubbles, Flush AI Text, Monochrome UI, 1rem Padding
 */
(function () {
    'use strict';

    /**
     * 1) Configuration & Selectors
     */
    const CONFIG = {
        colors: {
            light: {
                background: '#F9F9F9',
                text: '#000',
                border: '#ccc',
                input: { background: '#f4f4f4', text: 'rgb(13, 13, 13)', placeholder: 'rgb(142, 142, 142)' },
                sidebar: { text: 'rgb(13, 13, 13)', hover: '#E3E3E3', searchBg: '#fff' }
            },
            dark: {
                background: '#000000', // OLED Black
                text: '#ececec',
                border: '#000000',
                input: { background: '#303030', text: '#ececec', placeholder: 'rgba(255,255,255,0.4)' }, // App Grey
                uiGrey: '#1a1a1a', // For Monochrome buttons
                sidebar: { text: '#ececec', heading: 'rgb(143, 143, 143)', hover: '#2f2f2f', searchBg: '#1a1a1a' }
            }
        },
        fonts: { primary: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif', sidebar: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif' },
        borderRadius: { large: '1.5rem' }
    };

    const SELECTORS = {
        USER_MESSAGE_BLOCK: 'div[data-element-id="user-message"]',
        AI_RESPONSE_BLOCK: '[data-element-id="ai-response"]',
        AI_AVATAR: '[data-element-id="chat-avatar-container"]',
        SIDEBAR: { WORKSPACE: '[data-element-id="workspace-bar"]', BACKGROUND: '[data-element-id="side-bar-background"]', BEGINNING: '[data-element-id="sidebar-beginning-part"]', MIDDLE: '[data-element-id="sidebar-middle-part"]', SEARCH: '[data-element-id="search-chats-bar"]', NEW_CHAT: '[data-element-id="new-chat-button-in-side-bar"]' }
    };

    /**
     * 2) Sidebar Styling (Restored & Darkened)
     */
    function applySidebarStyles() {
        if (document.getElementById('typingmindSidebarFixMerged')) return;
        const sidebarStyle = document.createElement('style'); sidebarStyle.id = 'typingmindSidebarFixMerged';
        const dark = CONFIG.colors.dark;
        
        sidebarStyle.innerHTML = `
            html.dark ${SELECTORS.SIDEBAR.WORKSPACE}, 
            html.dark ${SELECTORS.SIDEBAR.BACKGROUND}, 
            html.dark ${SELECTORS.SIDEBAR.BEGINNING}, 
            html.dark ${SELECTORS.SIDEBAR.MIDDLE} { background-color: ${dark.background} !important; }
            
            html.dark ${SELECTORS.SIDEBAR.SEARCH} { background-color: ${dark.sidebar.searchBg} !important; border: 1px solid ${dark.border} !important; color: ${dark.text} !important; }
            html.dark ${SELECTORS.SIDEBAR.NEW_CHAT} { background-color: ${dark.sidebar.hover} !important; color: ${dark.text} !important; }
            html.dark [data-element-id="custom-chat-item"]:hover, 
            html.dark [data-element-id="selected-chat-item"] { background-color: ${dark.sidebar.hover} !important; }
            html.dark [data-element-id="custom-chat-item"] span, 
            html.dark [data-element-id="selected-chat-item"] span { color: ${dark.sidebar.text} !important; font-family: ${CONFIG.fonts.sidebar} !important; }
        `;
        document.head.appendChild(sidebarStyle);
    }

    /**
     * 3) Main Chat & Input Styles (The "OLED App" Look)
     */
    const mainStyle = document.createElement('style');
    const d = CONFIG.colors.dark;
    
    mainStyle.textContent = `
      /* --- GLOBAL OLED BLACKOUT --- */
      html.dark body, 
      html.dark [data-element-id="chat-space-middle-part"],
      html.dark [data-element-id="chat-space-beginning-part"],
      html.dark [data-element-id="chat-space-end-part"],
      html.dark [data-element-id="nav-bar"],
      html.dark header { background-color: ${d.background} !important; background-image: none !important; }

      /* --- AI RESPONSE: LEFT-FLUSH --- */      /* --- AI RESPONSE: FULL WIDTH & LEFT-FLUSH --- */
      ${SELECTORS.AI_AVATAR} { display: none !important; }
      
      /* Target the message row to remove grid gaps */
      [data-element-id="response-block"] { 
        display: block !important; 
        width: 100% !important; 
      }

      ${SELECTORS.AI_RESPONSE_BLOCK} { 
        display: block !important;
        padding-left: 1rem !important; 
        padding-right: 1rem !important; 
        margin-left: 0 !important;
        margin-right: 0 !important;
        max-width: 100% !important; /* This kills the blank space on the right */
        width: 100% !important;
      }
      
      /* Ensure the prose actually fills the container */
      ${SELECTORS.AI_RESPONSE_BLOCK} > div { 
        max-width: 100% !important; 
        width: 100% !important;
      }

      /* --- USER MESSAGE BUBBLES --- */
      html.dark ${SELECTORS.USER_MESSAGE_BLOCK} { 
        background-color: ${d.input.background} !important; 
        color: ${d.text} !important;
        padding: 1rem !important; /* Fixed to 1rem */
        border-radius: ${CONFIG.borderRadius.large} !important;
        margin-left: auto !important;
        max-width: 90% !important;
      }

      /* --- INPUT BAR --- */
      html.dark [data-element-id="chat-space-end-part"] [role="presentation"] { 
        background-color: ${d.input.background} !important; 
        border-radius: ${CONFIG.borderRadius.large} !important;
      }
      #chat-input-textbox::placeholder { font-size: 14px !important; color: ${d.input.placeholder} !important; }

      /* --- MONOCHROME UI --- */
      button[aria-label="Regenerate response"], 
      [data-element-id="model-picker-button"], 
      [data-element-id="plugin-picker-button"] { 
        background-color: ${d.input.background} !important; 
        color: ${d.uiGrey} !important; 
        border: 1px solid ${d.border} !important; 
      }
      html.dark svg[class*="text-blue-"] { color: ${d.uiGrey} !important; }

      /* PROSE TEXT */
      .prose { font-family: ${CONFIG.fonts.primary} !important; font-size: 18px !important; line-height: 28px !important; }
    `;
    document.head.appendChild(mainStyle);

    /**
     * 4) Logic & Observers
     */
    function processUserMessage(msgEl) {
        if (msgEl.hasAttribute('data-processed')) return;
        msgEl.style.padding = "1rem";
        msgEl.setAttribute('data-processed', 'true');
    }

    const observer = new MutationObserver(() => {
        document.querySelectorAll(SELECTORS.USER_MESSAGE_BLOCK).forEach(msg => processUserMessage(msg));
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    applySidebarStyles();

})();

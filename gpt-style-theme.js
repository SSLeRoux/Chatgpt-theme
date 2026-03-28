/**
 * A ChatGPT-Inspired Theme for TypingMind
 * Final Restored Version: Full Features + 1rem Padding + Safe Smudge Filter
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
                button: { primary: 'rgb(13, 13, 13)', hover: 'rgba(13, 13, 13, 0.8)' },
                thought: { text: '#0066CC' },
                inlineCode: { background: '#e8e8e8', border: '#ddd', text: '#111' },
                sidebar: { text: 'rgb(13, 13, 13)', heading: 'rgb(143, 143, 143)', hover: '#E3E3E3', searchBg: '#fff', searchPlaceholder: 'rgba(0,0,0,0.6)' },
                codeBlock: { headerBg: '#F9F9F9' },
                scrollbar: { track: '#f1f1f1', thumb: '#c1c1c1', thumbHover: '#a1a1a1' },
                menu: { background: 'white', text: 'black' },
                hoverOverlay: 'rgba(0,0,0,0.1)'
            },
            dark: {
                background: '#212121',
                text: '#ececec',
                border: '#444',
                input: { background: '#303030', text: '#ececec', placeholder: 'rgba(255,255,255,0.5)' },
                button: { primary: '#ececec', hover: 'rgba(236, 236, 236, 0.8)' },
                thought: { text: '#6cb6ff' },
                inlineCode: { background: '#2f2f2f', border: '#444', text: '#ececec' },
                sidebar: { text: '#ececec', heading: 'rgb(143, 143, 143)', hover: '#2f2f2f', searchBg: '#303030', searchPlaceholder: 'rgba(255,255,255,0.5)' },
                codeBlock: { headerBg: '#2f2f2f' },
                scrollbar: { track: '#2f2f2f', thumb: '#555', thumbHover: '#666' },
                menu: { background: '#2f2f2f', text: '#ececec' },
                hoverOverlay: 'rgba(255,255,255,0.1)'
            }
        },
        fonts: { primary: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', code: 'ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace', weights: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 }, thought: { size: '12px', lineHeight: '20px', weight: 400 }, sidebar: { size: '14px', lineHeight: '20px', weight: 400, family: 'ui-sans-serif, -apple-system, system-ui, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"' } },
        spacing: { small: '0.5rem', medium: '1rem', large: '1.5rem' },
        borderRadius: { small: '0.5rem', medium: '1rem', large: '1.5rem' },
    };
    const SELECTORS = {
        CODE_BLOCK_CONTAINER: 'pre:has(> div.relative):not(details pre)',
        USER_MESSAGE_BLOCK: 'div[data-element-id="user-message"]',
        SIDEBAR: { WORKSPACE: '[data-element-id="workspace-bar"]', BACKGROUND: '[data-element-id="side-bar-background"]', BEGINNING: '[data-element-id="sidebar-beginning-part"]', MIDDLE: '[data-element-id="sidebar-middle-part"]', SEARCH: '[data-element-id="search-chats-bar"]', NEW_CHAT: '[data-element-id="new-chat-button-in-side-bar"]' }
    };

    /**
     * 2) Utility Functions
     */
    const Utils = {
        debounce(fn, delay) { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => fn(...args), delay); }; },
        safe(fn, context = 'unknown') { try { return fn(); } catch (e) { console.error(`Error in ${context}:`, e); return null; } },
        escapeHtml(str) { if (typeof str !== 'string') return ''; return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'); }
    };

    /**
     * 3) Sidebar Styling & Behavior
     */
    function applySidebarStyles() {
        if (document.getElementById('typingmindSidebarFixMerged')) return;
        const sidebarStyle = document.createElement('style'); sidebarStyle.id = 'typingmindSidebarFixMerged'; sidebarStyle.type = 'text/css';
        const light = CONFIG.colors.light;
        const dark = CONFIG.colors.dark;
        
        const generateSidebarStyles = (colors, prefix) => [
            `${prefix} ${SELECTORS.SIDEBAR.WORKSPACE}, ${prefix} ${SELECTORS.SIDEBAR.BACKGROUND}, ${prefix} ${SELECTORS.SIDEBAR.BEGINNING}, ${prefix} ${SELECTORS.SIDEBAR.MIDDLE} { background-color: ${colors.background} !important; }`,
            `${prefix} ${SELECTORS.SIDEBAR.NEW_CHAT} { background-color: ${colors.sidebar.hover} !important; color: ${colors.text} !important; font-weight: ${CONFIG.fonts.weights.semibold} !important; }`,
            `${prefix} ${SELECTORS.SIDEBAR.NEW_CHAT} * { color: ${colors.text} !important; }`,
            `${prefix} ${SELECTORS.SIDEBAR.SEARCH} { background-color: ${colors.sidebar.searchBg} !important; color: ${colors.text} !important; border: 1px solid ${colors.border} !important; font-weight: ${CONFIG.fonts.weights.normal} !important; }`,
            `${prefix} ${SELECTORS.SIDEBAR.SEARCH}[placeholder]::placeholder { color: ${colors.sidebar.searchPlaceholder} !important; }`,
            `${prefix} [data-element-id="custom-chat-item"]:hover, ${prefix} [data-element-id="selected-chat-item"] { background-color: ${colors.sidebar.hover} !important; }`,
            `${prefix} [data-element-id="custom-chat-item"] span, ${prefix} [data-element-id="selected-chat-item"] span { color: ${colors.sidebar.text} !important; font-family: ${CONFIG.fonts.sidebar.family} !important; font-size: ${CONFIG.fonts.sidebar.size} !important; line-height: ${CONFIG.fonts.sidebar.lineHeight} !important; }`,
            `${prefix} [data-element-id="workspace-bar"] button:hover { background-color: ${colors.hoverOverlay} !important; }`
        ];

        const lightStyles = generateSidebarStyles(light, 'html:not(.dark)');
        const darkStyles = generateSidebarStyles(dark, 'html.dark');
        
        sidebarStyle.innerHTML = [...lightStyles, ...darkStyles].join('\n');
        document.head.appendChild(sidebarStyle);
    }

    /**
     * 4) Main Chat & Input Styles
     */
    const mainStyle = document.createElement('style');
    const light = CONFIG.colors.light;
    const dark = CONFIG.colors.dark;
    
    mainStyle.textContent = `
      /* --- SAFE SMUDGE FILTER --- */
      /* Targets only the gradient backgrounds and makes them invisible to the eye */
      [class*="scroll-indicator-gradient"], 
      [class*="bg-gradient-to-l"][class*="from-black"],
      [class*="bg-gradient-to-l"][class*="from-white"] { 
        visibility: hidden !important;
        pointer-events: none !important;
      }

      /* ===== LIGHT MODE ===== */
      html:not(.dark) [data-element-id="chat-space-middle-part"] .prose.max-w-full, 
      html:not(.dark) [data-element-id="chat-space-middle-part"] [data-element-id="user-message"] { font-family: ${CONFIG.fonts.primary} !important; font-size: 18px !important; line-height: 28px !important; color: ${light.text} !important; }
      html:not(.dark) [data-element-id="chat-space-middle-part"] [data-element-id="user-message"] { margin-left: auto !important; max-width: 90% !important; border-radius: ${CONFIG.borderRadius.large} !important; background-color: ${light.input.background} !important; padding: 1rem !important; margin-bottom: ${CONFIG.spacing.small} !important; }
      html:not(.dark) ${SELECTORS.CODE_BLOCK_CONTAINER} { background-color: ${light.background} !important; border: 1px solid ${light.border} !important; border-radius: ${CONFIG.borderRadius.small} !important; }
      
      /* ===== DARK MODE ===== */
      html.dark [data-element-id="chat-space-middle-part"] .prose.max-w-full, 
      html.dark [data-element-id="chat-space-middle-part"] [data-element-id="user-message"] { font-family: ${CONFIG.fonts.primary} !important; font-size: 18px !important; line-height: 28px !important; color: ${dark.text} !important; }
      html.dark [data-element-id="chat-space-middle-part"] [data-element-id="user-message"] { margin-left: auto !important; max-width: 90% !important; border-radius: ${CONFIG.borderRadius.large} !important; background-color: ${dark.input.background} !important; padding: 1rem !important; margin-bottom: ${CONFIG.spacing.small} !important; }
      html.dark ${SELECTORS.CODE_BLOCK_CONTAINER} { background-color: ${dark.background} !important; border: 1px solid ${dark.border} !important; border-radius: ${CONFIG.borderRadius.small} !important; }

      /* Input Bar Logic */
      html:not(.dark) [data-element-id="chat-space-end-part"] [role="presentation"] { background-color: ${light.input.background} !important; border-radius: ${CONFIG.borderRadius.large} !important; margin-bottom: ${CONFIG.spacing.medium} !important; }
      html.dark [data-element-id="chat-space-end-part"] [role="presentation"] { background-color: ${dark.input.background} !important; border-radius: ${CONFIG.borderRadius.large} !important; margin-bottom: ${CONFIG.spacing.medium} !important; }
      #chat-input-textbox { border: none !important; outline: none !important; background: transparent !important; }
    `;
    document.head.appendChild(mainStyle);

    function multiStepParse(rawText) {
        return Utils.safe(() => {
            let processedHtml = rawText;
            const codeBlockRegex = /^(```|""")(\w*)\s*([\s\S]*?)\s*\1$/gm;
            const placeholders = [];
            processedHtml = processedHtml.replace(codeBlockRegex, (match, delimiter, lang, code) => {
                const placeholder = `__CODEBLOCK_${placeholders.length}__`;
                placeholders.push(`<pre><div class="relative"><div class="sticky top-0 flex items-center bg-gray-200 dark:bg-gray-900 pl-[12px] pr-1 justify-between"><span class="text-xs font-light">${lang || 'code'}</span></div><div><pre><code style="white-space: pre;">${Utils.escapeHtml(code)}</code></pre></div></div></pre>`);
                return placeholder;
            });
            processedHtml = Utils.escapeHtml(processedHtml);
            placeholders.forEach((blockHtml, index) => { processedHtml = processedHtml.replace(`__CODEBLOCK_${index}__`, blockHtml); });
            return processedHtml;
        });
    }

    function styleUserMessageEl(msgEl) {
        Utils.safe(() => {
            if (msgEl.hasAttribute('data-processed')) return;
            for (const child of msgEl.children) {
                const rawText = child.textContent || '';
                if (rawText.trim() === '' || !/[*`~_]/.test(rawText)) continue;
                child.innerHTML = multiStepParse(rawText);
            }
            msgEl.setAttribute('data-processed', 'true');
        });
    }

    const improveTextDisplay = Utils.debounce((rootNode = document) => {
        const scope = rootNode === document ? document.body : rootNode;
        scope.querySelectorAll(SELECTORS.USER_MESSAGE_BLOCK).forEach(msg => styleUserMessageEl(msg));
    }, 350);

    function initTheme() {
        applySidebarStyles();
        improveTextDisplay();
        new MutationObserver(() => improveTextDisplay()).observe(document.body, { childList: true, subtree: true });
    }

    initTheme();
})();

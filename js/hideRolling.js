let scrollTimeout;

window.addEventListener('DOMContentLoaded', () => {
    hideScrollbar();
});

window.addEventListener('scroll', () => {
    showScrollbar();
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(hideScrollbar, 1500);
});

function hideScrollbar() {
    document.documentElement.style.setProperty('--scrollbar-color-thumb', 'rgba(0, 0, 0, 0)');
    document.documentElement.style.setProperty('--global-color-thumb', 'var(--anzhiyu-background)');
}

function showScrollbar() {
    document.documentElement.style.setProperty('--scrollbar-color-thumb', '#c1c1c1');
    document.documentElement.style.setProperty('--global-color-thumb', '#f1f1f1');
}
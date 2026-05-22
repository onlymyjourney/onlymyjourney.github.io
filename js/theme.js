const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

if (themeToggle) {
  themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
  themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let switchToTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', switchToTheme);
    localStorage.setItem('theme', switchToTheme);
    themeToggle.textContent = switchToTheme === 'light' ? '🌙' : '☀️';
  });
}

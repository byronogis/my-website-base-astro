// 获取主题
function getPreferTheme() {
  // 从 localStorage 中获取主题
  const storageTheme = localStorage.getItem('theme')
  if (storageTheme !== null) {
    return storageTheme
  }

  // 从系统中获取主题
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  if (systemTheme.matches) {
    return 'dark'
  } else {
    return 'light'
  }
}

// 应用主题
function applyTheme(theme) {
  // 设置 localStorage
  localStorage.setItem('theme', theme)

  // 设置 html 标签的 class
  // toggle 的第二个参数为 true 时添加 class，为 false 时删除 class
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.setAttribute("data-theme", theme);
}

// 监听系统主题变化
function watchSystemTheme() {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  systemTheme.addEventListener('change', e => {
    const theme = e.matches ? 'dark' : 'light'
    applyTheme(theme)
  })
}

// 监听页面主题变化(可选, 在页面中切换主题, 如按钮)
function watchPageTheme() {
  const themeToggle = document.querySelector('#toggle-theme')
  themeToggle.addEventListener('click', () => {
    const theme = getPreferTheme() === 'dark' ? 'light' : 'dark'
    themeToggle.setAttribute("aria-label", theme);
    applyTheme(theme)
  })
}

// 渲染前应用主题, 防止页面闪烁
applyTheme(getPreferTheme())
// 监听系统主题变化
watchSystemTheme()
// 监听页面主题变化(可选, 在页面中切换主题, 如按钮)
window.addEventListener('DOMContentLoaded', watchPageTheme)

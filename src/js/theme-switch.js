import {refs} from './variables.global';
const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };
  
  refs.checkboxEl.addEventListener('change', themeChange);
  
  function themeChange(event) {
    const isChecked = event.target.checked;
  
    if (isChecked) {
      refs.bodyEl.classList.remove(Theme.LIGHT);
      refs.bodyEl.classList.add(Theme.DARK);
      localStorage.setItem('theme', Theme.DARK);
    } else {
      refs.bodyEl.classList.remove(Theme.DARK);
      refs.bodyEl.classList.add(Theme.LIGHT);
      localStorage.setItem('theme', Theme.LIGHT);
    }
  }
  
  function currentTheme() {
    if (localStorage.getItem('theme') === Theme.DARK) {
        refs.checkboxEl.checked = true;
        refs.bodyEl.classList.add(Theme.DARK);
    }
  }
  currentTheme();
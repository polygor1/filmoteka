import {refs} from './variables.global';

window.addEventListener('scroll', showButtonUp);
refs.buttonUpEl.addEventListener('click', onButtonUpClick);

function showButtonUp() {
  if (window.pageYOffset < document.documentElement.clientHeight) {
    refs.buttonUpEl.classList.add('visually-hidden');
  } else {
    refs.buttonUpEl.classList.remove('visually-hidden');
  }
}

function onButtonUpClick() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
import {refs} from './variables.global'


refs.btnFooterEl.addEventListener('click', onFooterBtnClick);
refs.footerBackdropEl.addEventListener('click', onFooterModalClose);
refs.closeModalTeamBtn.addEventListener('click', onClose);

function onFooterBtnClick(e) {
  e.preventDefault();
  refs.footerBackdropEl.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscPress);
}

function onFooterModalClose(e) {
  if (e.target === refs.footerBackdropEl) {
    refs.footerBackdropEl.classList.add('is-hidden');
    window.removeEventListener('keydown', onEscPress);
  }
}

function onEscPress(e) {
  if (e.code === 'Escape') {
    refs.footerBackdropEl.classList.add('is-hidden');
  }
  window.removeEventListener('keydown', onEscPress);
  
}

function onClose() {
  refs.footerBackdropEl.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscPress);  
}
import { apiService, ls, refs } from './variables.global';
import movieInfoTmp from '../templates/movie-info.hbs';
import delayIndicator from './delayIndicator';
import prepareForShow from './prepareForShow';
import { renderWatched, renderQueue } from './library-rendering';

const modalRefs = {
  lightboxEl: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxOverlayEl: document.querySelector('.lightbox__overlay'),
  movieInfo: document.querySelector('.movie-info'),
  movieImg: document.querySelector('[data-movie-img]'),
  activeWatched: document.querySelector('[data-watched]'),
  activeQueue: document.querySelector('[data-queue]'),
};

refs.movieGallery.addEventListener('click', onImageClick);
modalRefs.closeModalBtn.addEventListener('click', onCloseBtnClick);
modalRefs.lightboxOverlayEl.addEventListener('click', onOverlayClick);

function onImageClick(event) {
  const isGalleryImage = event.target.classList.contains('film__img');
  if (!isGalleryImage) {
    return;
  }
  const movieCard = event.target.closest('li');
  const movieId = movieCard.dataset.id;
  event.preventDefault();
  window.addEventListener('keydown', onEscKeyPress);
  modalRefs.lightboxEl.classList.add('is-open');
  renderMovieInfo(movieId);
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.bodyEl.style.overflow = 'visible';
  modalRefs.movieInfo.innerHTML = '';
  modalRefs.movieImg.src = ``; // стрирает картинку в модалке
  modalRefs.lightboxEl.classList.remove('is-open');

  modalRefs.button_queue.removeEventListener('click', onAddQueueClick);
  modalRefs.button_watched.removeEventListener('click', onAddWatchedClick);
  modalRefs.button_queue.removeEventListener('click', onRemoveQueueClick);
  modalRefs.button_watched.removeEventListener('click', onRemoveWatchedClick);
  // перезагрузка списка при выходе из модалки
  const libraryOn = document.getElementById('library').className.indexOf('current');
  if (libraryOn !== -1) {
    if (modalRefs.activeWatched.className.indexOf('active-button') !== -1) renderWatched();
    if (modalRefs.activeQueue.className.indexOf('active-button') !== -1) renderQueue();
  }
}

function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseBtnClick();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseBtnClick();
  }
}

async function renderMovieInfo(id) {
  const movieInfo = await apiService.getMovieById(id);
  prepareForShow(movieInfo);
  modalRefs.movieImg.src = `${movieInfo.poster_path}`;
  modalRefs.movieInfo.insertAdjacentHTML('beforeend', movieInfoTmp(movieInfo));
  refs.bodyEl.style.overflow = 'hidden';
  refs.lightbox.overflow = 'auto';
  refs.lightbox.style.maxHeight = 'calc(90vh)';

  // Добавляем индикатор задержки загрузки
  if (movieInfo.poster_path) {
    // якщо нема постера - дзуськи!
    const onLoadObj = document.querySelectorAll('.lightbox__content');
    delayIndicator(onLoadObj, 'classToInsertCodeAfter', 'movie-img', true);
  }
  //Adding EventListeners
  modalRefs.button_watched = document.querySelector('.button__watched');
  modalRefs.button_queue = document.querySelector('.button__queue');
  if (ls.checkIfInQueue(id)) {
    modalRefs.button_queue.classList.add('contentDelete');
    modalRefs.button_queue.textContent = 'delete from queue';
    modalRefs.button_queue.addEventListener('click', onRemoveQueueClick);
  } else {
    modalRefs.button_queue.addEventListener('click', onAddQueueClick);
  }
  if (ls.checkIfInWatched(id)) {
    modalRefs.button_watched.classList.add('contentDelete');
    modalRefs.button_watched.textContent = 'delete from watched';
    modalRefs.button_watched.addEventListener('click', onRemoveWatchedClick);
  } else {
    modalRefs.button_watched.addEventListener('click', onAddWatchedClick);
  }
}

function onRemoveWatchedClick(event) {
  ls.removeFromWatched(event);
  modalRefs.button_watched.classList.remove('contentDelete');
  modalRefs.button_watched.textContent = 'add to watched';
  modalRefs.button_watched.addEventListener('click', onAddWatchedClick);
  modalRefs.button_watched.removeEventListener('click', onRemoveWatchedClick);
}
function onRemoveQueueClick(event) {
  ls.removeFromQueue(event);
  modalRefs.button_queue.classList.remove('contentDelete');
  modalRefs.button_queue.textContent = 'add to queue';
  modalRefs.button_queue.addEventListener('click', onAddQueueClick);
  modalRefs.button_queue.removeEventListener('click', onRemoveQueueClick);
}
function onAddWatchedClick(event) {
  ls.addToWatched(event);
  modalRefs.button_watched.classList.add('contentDelete');
  modalRefs.button_watched.textContent = 'delete from watched';
  modalRefs.button_watched.addEventListener('click', onRemoveWatchedClick);
  modalRefs.button_watched.removeEventListener('click', onAddWatchedClick);
}
function onAddQueueClick(event) {
  ls.addToQueue(event);
  modalRefs.button_queue.classList.add('contentDelete');
  modalRefs.button_queue.textContent = 'delete from queue';
  modalRefs.button_queue.addEventListener('click', onRemoveQueueClick);
  modalRefs.button_queue.removeEventListener('click', onAddQueueClick);
}

import { apiService, ls, paginator, PAGIN_MODES, refs } from './variables.global';
import galleryItems from '../templates/card.hbs';
import prepareForShow from './prepareForShow';
import delayIndicator from './delayIndicator';
import Notiflix from 'notiflix';
import cardPerPage from './cardPerPage';

export async function renderWatched(page) {
  if (!page) {
    page = 1;
  }
  const watchedIds = ls.getWatched(page, cardPerPage());
  const totalPages = watchedIds.pages;
  const watchedMovies = await getLibraryMovies(watchedIds);
  refs.movieGallery.innerHTML = '';
  paginator.renderPagesList(page, totalPages, PAGIN_MODES.WATCHED);
  refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(watchedMovies));
  if (!watchedMovies.length) {
    refs.emptyLibImg.classList.remove('is-hidden');
    page = 0;
    Notiflix.Notify.warning('The list is empty! Add film to watched.');
  }
  if (watchedMovies.length > 0 && !refs.emptyLibImg.classList.contains('is-hidden')) {
    refs.emptyLibImg.classList.add('is-hidden');
  }
  // Добавляем индикатор задержки загрузки
  const onLoadGallery = document.querySelectorAll('.film__card');
  delayIndicator(onLoadGallery, 'film__link', 'film__img', false);
  // Показываем VOTE в карточке фильмЫ
  document.querySelectorAll('.film__vote_average').forEach(element => {
    element.classList.remove('is-hidden');
  });
  if (!refs.watchedBtn.classList.contains('active-button')) {
    refs.watchedBtn.classList.add('active-button');
    refs.queueBtn.classList.remove('active-button');
  }
}

export async function renderQueue(page) {
  if (!page) {
    page = 1;
  }
  const queueIds = ls.getQueue(1, cardPerPage());
  const totalPages = queueIds.pages;
  const queueMovies = await getLibraryMovies(queueIds);
  refs.movieGallery.innerHTML = '';
  if (queueMovies.length === 0) {
    refs.emptyLibImg.classList.remove('is-hidden');
    page = 0;
    Notiflix.Notify.warning('The list is empty! Add film to queue.');
  }
  if (queueMovies.length > 0 && !refs.emptyLibImg.classList.contains('is-hidden')) {
    refs.emptyLibImg.classList.add('is-hidden');
  }
  paginator.renderPagesList(page, totalPages, PAGIN_MODES.QUEUE);
  refs.movieGallery.insertAdjacentHTML('beforeend', galleryItems(queueMovies));
  // Добавляем индикатор задержки загрузки
  const onLoadGallery = document.querySelectorAll('.film__card');
  delayIndicator(onLoadGallery, 'film__link', 'film__img', false);
  // Показываем VOTE в карточке фильмЫ
  document.querySelectorAll('.film__vote_average').forEach(element => {
    element.classList.remove('is-hidden');
  });
  if (!refs.queueBtn.classList.contains('active-button')) {
    refs.queueBtn.classList.add('active-button');
    refs.watchedBtn.classList.remove('active-button');
  }
}

async function getLibraryMovies(ids) {
  const movies = await Promise.all(
    ids.list.map(async function getWatchedMovie(id) {
      const movie = await apiService.getMovieById(id);
      prepareForShow(movie);
      return movie;
    }),
  );
  return movies;
}

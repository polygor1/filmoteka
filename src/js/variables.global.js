//  В этот файл добавляем только глобальные переменные которые будут использоваться в нескольких модулях.
//  Локальные для модуля пишите в модуле
//  Желательно подписывать комментами что это такое и для чего

//  Тут импорты
import ApiService from './apiService';
import Paginator from './pagination';
import LS from './LocalStorage';

//  Тут переменные
export const PAGIN_MODES = {
  TREND: 'trending',
  SEARCH: 'search',
  WATCHED: 'watched',
  QUEUE: 'queue',
};
export const apiService = new ApiService(); //  Апишка
export const paginator = new Paginator(); //  Пагинация))
export const ls = new LS();
export const breakpoints = {
  // it, as is
  mobile: 320,
  tablet: 768,
  desktop: 1024,
};

//  Ниже ссылки на обьекты DOM-дерева
export const refs = {
  navList: document.querySelector('[data-navigation]'),
  homeBtn: document.querySelectorAll('[data-home]'),
  libraryBtn: document.querySelector('[data-library]'),
  movieGallery: document.querySelector('[data-movie-gallery]'),
  searchForm: document.querySelector('#form-search'),
  searchInput: document.querySelector('.search-input'),
  header: document.getElementById('header'),
  headerFormBox: document.getElementById('form-box'),
  headerButtonBox: document.getElementById('button-box'),
  emptyLibImg: document.querySelector('.empty-lib'),

  // Секция пагинатора
  paginationRef: document.querySelector('.pagination-js'),
  paginationList: document.querySelector('.pagination-box'),
  pageList: document.querySelector('.pages'),
  lastBtn: document.getElementById('last-page'),
  prevBtn: document.getElementById('button-prev'),
  nextBtn: document.getElementById('button-next'),
  firstPage: document.querySelector('.first'),
  lastPage: document.querySelector('.last'),

  watchedBtn: document.querySelector('[data-watched]'),
  queueBtn: document.querySelector('[data-queue]'),

  btnFooterEl: document.querySelector('.footer__link'),
  footerBackdropEl: document.querySelector('#footer-backdrop'),
  closeModalTeamBtn: document.querySelector('[data-action="close-modal-team"]'),

  bodyEl: document.querySelector('body'),
  lightbox: document.querySelector('.lightbox__content'),
  checkboxEl: document.querySelector('.theme-switch__toggle'),

  buttonUpEl: document.querySelector('.button-up'),
};

import { apiService, PAGIN_MODES, refs } from "./variables.global";
import { renderTrending, renderSearchResults } from './main-page-rendering';
import { renderQueue, renderWatched } from './library-rendering';



export default class Paginator {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.pageRange = 2;
    this.mode = '';
    
  }
  
  renderPagesList(page, totalPages, mode) {
    if (totalPages <= 1) {
      refs.paginationRef.classList.add('is-hidden');
      return;
    } else {
      if (refs.paginationRef.classList.contains('is-hidden')) {
        refs.paginationRef.classList.remove('is-hidden');
      }
    }
    this.currentPage = page;
    this.totalPages = totalPages;
    this.mode = mode;
    const start = this.currentPage - this.pageRange;
    const end = this.currentPage + this.pageRange;
    refs.pageList.innerHTML = '';

    for (let i = start; i <= end; i++){
      if (i > 0 && i <= this.totalPages) {
        refs.pageList.insertAdjacentHTML(
          'beforeend',
          `<li class="pages-item"><button type="button" class="pagination-btn">${i}</button></li>`
        );
      }
    }
    refs.lastBtn.textContent = this.totalPages;
    this.isHideBtn();
    this.activeBtn();
    this.hideFirstLstBtn();
  }

  onBtnClick(e) {
    e.preventDefault();

    if (e.target.nodeName !== 'BUTTON') {
      return;
    };
    this.currentPage = Number(e.target.textContent);
    this.render();
  }
  onPrevBtnClick(e) {
    e.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
      this.render();
    }
  }

  onNextBtnClick(e) {
    e.preventDefault();

    if (this.currentPage !== this.totalPages) {
      this.currentPage++;
    };
    this.render();
  }

  isHideBtn() {
    if (this.currentPage === 1) {
      refs.prevBtn.disabled = true;
    } else {
      refs.prevBtn.disabled = false;
    };

    if (this.currentPage === this.totalPages) {
      refs.nextBtn.disabled = true;
    } else {
      refs.nextBtn.disabled = false;
    };
  }

  activeBtn() {
    let pagesItem = refs.pageList.querySelectorAll('button');
    for (let i = 0; i < pagesItem.length; i++){
      if (Number(pagesItem[i].textContent) === this.currentPage) {
        pagesItem[i].classList.add('active-btn');
      } else if (
        Number(pagesItem[i].textContent) !== this.currentPage &&
        pagesItem[i].classList.contains('active-btn')) {
        pagesItem[i].classList.remove('active-btn')
      };
    }
  }
  hideFirstLstBtn() {
    if (this.currentPage < 4) {
      refs.firstPage.hidden = true;
    } else {
      refs.firstPage.hidden = false;
    };
    if (this.currentPage > this.totalPages - 3) {
      refs.lastPage.hidden = true;
    } else {
      refs.lastPage.hidden = false;
    };
  }

  scrollPage() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      block: 'end',
    });
  }

  render() {
    this.scrollPage();
    setTimeout(()=>{refs.pageList.innerHTML = '';
    refs.movieGallery.innerHTML = '';
    if (this.mode === PAGIN_MODES.TREND) {
      apiService.setPage(this.currentPage);
      renderTrending();
      return;
    } else if (this.mode === PAGIN_MODES.SEARCH) {
      apiService.setPage(this.currentPage);
      renderSearchResults(apiService.query);
      return;
    } else if (this.mode === PAGIN_MODES.WATCHED) {
      renderWatched(this.currentPage);
      return;
    } else if (this.mode === PAGIN_MODES.QUEUE) {
      renderQueue(this.currentPage);
      return;
    }},500)
  }
}
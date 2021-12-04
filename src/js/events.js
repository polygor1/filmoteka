import { paginator, refs } from './variables.global';

// ТАК НАДО

refs.paginationList.addEventListener('click', (e) => { paginator.onBtnClick(e) });
refs.prevBtn.addEventListener('click', (e) => { paginator.onPrevBtnClick(e) });
refs.nextBtn.addEventListener('click', (e) => { paginator.onNextBtnClick(e) });
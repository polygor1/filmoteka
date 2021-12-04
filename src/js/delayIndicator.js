import beautiSpinner from '../templates/spiner';
// // Добавляем индикатор задержки загрузки
// const onLoadObj = document.querySelectorAll('.objClassForInsertIndicator');
// delayIndicator(onLoadObj,'classToInsertCodeAfter', 'classLoadableObj', false);
// для модалки - true

// Индикатор задержки загрузки
export default function delayIndicator(array, classConteiner, classLoadObj, permit) {

  array.forEach(element => {
    // если разметки нет то
    if (!element.getElementsByClassName('delay-indicator')[0]) { 
      // вставляем разметку индикатора в HTML 
      const cardItem = element.getElementsByClassName(classConteiner)[0];
      cardItem.insertAdjacentHTML('afterbegin', beautiSpinner());
      permit = true;
    };
    // находим разметку индикатора и
    const delayIndicator = element.getElementsByClassName('delay-indicator')[0];
    const loadableObj = element.getElementsByClassName(classLoadObj)[0];

    if (permit) { // если разрешено
      delayIndicator.classList.remove('is-hidden'); // показываем индикатор
      loadableObj.onload = function () { // ловим событие окончания загрузки
        delayIndicator.classList.add('is-hidden'); // посмотрели и хватит
      };
      permit = false; // Все-для-вас-на-одн-раз (с)Борис Зубков, Евгений Муслин "Непрочный, непрочный, непрочный мир..." http://lib.ru/RUFANT/MUSLIN/42-09.txt
    };
  });
};
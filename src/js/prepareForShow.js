// Выводим значение
export default function prepareForShow(array) {
  if (array.length === 0) {
    // answer = false; // если ничего не пришло в ответе
    return;
  }
  if (array.genres.length === 0) {
    array.genres[0] = 'Unknown'; // если нет данных
  }
  if (array.genres.length > 3) {
    array.genres = array.genres.slice(0, 2); // делаем обрезание ;-))
    array.genres[2] = 'Other';
  }
  array.genreShow = array.genres.join(', '); // дорисовываем запятые
  array.release_year = array.release_date.substring(0, 4); // делаем год релиза

  // answer = true;
  return array;
}

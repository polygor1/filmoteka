export default class LS{
  constructor() { }

  //function for getting values from queue and watched lists in local storage
  getQueue(page, limit) {
    return this.getFromList('queue', page, limit);
  }
  
  getWatched(page, limit) {
    return this.getFromList('watched', page, limit);
  }
  
  //function for checking if value is in queue or watched lists in local storage
  checkIfInQueue(id) {
    const queue = this.getAllFromList('queue');
    return queue.includes(parseInt(id));
  }

  checkIfInWatched(id) {
    const watched = this.getAllFromList('watched');
    return watched.includes(parseInt(id));
  }

  //function to remove value from queue or watched lists in local storage by id
  removeFromQueue(event) {
    const queue = this.getAllFromList('queue');
    localStorage.setItem(
      'queue',
      JSON.stringify(queue.filter(el => el !== parseInt(event.target.dataset.value))),
    );
  }

  removeFromWatched(event) {
    const watched = this.getAllFromList('watched');
    localStorage.setItem(
      'watched',
      JSON.stringify(watched.filter(el => el !== parseInt(event.target.dataset.value))),
    );
  }

  // functions for adding to queue and watched lists in local storage
  addToQueue(event) {
    if (this.checkIfInQueue(event.target.dataset.value)) return;
    this.addToList('queue', event.target.dataset.value);
  }

  addToWatched(event) {
    if (this.checkIfInWatched(event.target.dataset.value)) return;
    this.addToList('watched', event.target.dataset.value);
  }

  // function for adding to list in local storage
  addToList(listName, value) {
    let list = JSON.parse(localStorage.getItem(`${listName}`));
    if (!list) list = [];
    list.push(parseInt(value));
    localStorage.setItem(`${listName}`, JSON.stringify(list));
  }

  // function for getting values from a list in local storage
  getFromList(listName, page = 1, limit = 4) {
    let list = JSON.parse(localStorage.getItem(`${listName}`));
    if (list) {
      const pages = Math.ceil(list.length / limit);
      const from = (page - 1) * limit;
      const to = from + limit;
      const pag_list = list.slice(from, to);
      return {
        list: pag_list,
        pages,
        current: page,
      };
    }
  }

  getAllFromList(listName) {
    let list = JSON.parse(localStorage.getItem(`${listName}`));
    if (list) return list;
    return [];
  }
}

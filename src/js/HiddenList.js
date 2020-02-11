import EventManager from '../../dist/lib/bean-master/bean.min';
require('../css/hiddenList.css');

class HiddenList {
  constructor() {
    this.setHtml();
    // this.setupEvents();
  }

  setHtml() {
    this.container = document.createElement('div');
    this.container.className = 'hiddenListContainer';
    this.container.innerHTML = this.list;

    this.list = document.createElement('div');
    this.list.className = 'hiddenListItems';
    this.container.appendChild(this.list);

    let items = JSON.parse(window.localStorage.getItem('storage'));
    // console.log(items);
    for (let i=0; i<items.length; i++) {
      let item = document.createElement('div');
      item.className = 'listItem';
      item.innerText = JSON.stringify(items[i]);
      this.list.appendChild(item);
    }
  }
}

export default HiddenList;
import { todoStore } from '../store/todoStore.js';

export class AppInput extends HTMLElement {
  constructor() {
    super();
    todoStore.subscribe(this.renderList.bind(this));
  }

  render() {
    this.innerHTML = `
        <section class="app">
        <h2 class="app__heading">오늘 할 일</h2>
        <ul class="todo-items"></ul>
        <form>
            <label for="new-item-field">
              할 일을 추가하세요
            </label>
            <input
              type="text"
              id="new-item-field"
              autocomplete="off"
            />
            <button type='submit'>저장</button>
            </div>
        </form>
        </section>
    `;
  }

  renderList() {
    const list = todoStore.getState().items.reduce((acc, item) => {
      return acc + `<li>${item}<button class="rm">×</button></li>`;
    }, '');

    this.querySelector('.todo-items').innerHTML = list;

    this.querySelectorAll('.rm').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        this.onDelete(idx);
      });
    });
  }

  onDelete = (idx) => {
    todoStore.getState().deleteItem(idx);
  };

  onSubmit = (event) => {
    event.preventDefault();

    const inputElement = document.getElementById('new-item-field');
    const item = inputElement.value.trim();
    inputElement.value = '';

    todoStore.getState().addItem(item);
  };

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.querySelector('form').addEventListener('submit', this.onSubmit);
      this.rendered = true;
    }
  }

  disconnectedCallback() {
    this.querySelector('form').removeEventListener('submit', this.onSubmit);
    this.rendered = false;
  }
}

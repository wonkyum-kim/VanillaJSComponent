import { todoStore } from '../store/todoStore.js';

export class AppStatus extends HTMLElement {
  constructor() {
    super();
    todoStore.subscribe(this.render.bind(this));
  }

  render() {
    this.innerHTML = `
        <aside class="app__status">
            <div>
                <small>오늘 할 일이</small>
                <span>${todoStore.getState().items.length}</span>
                <small>개 남았어요. 😢</small>
            </div>
        </aside>
    `;
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  disconnectedCallback() {
    this.rendered = false;
  }
}

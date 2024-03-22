import { todoStore } from '../store/todoStore.js';

export class AppStatus extends HTMLElement {
  constructor() {
    super();
    todoStore.events.subscribe('stateChange', this.render.bind(this));
  }

  render() {
    this.innerHTML = `
        <aside class="app__status">
            <div>
                <small>오늘 할 일이</small>
                <span>${todoStore.state.items.length}</span>
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

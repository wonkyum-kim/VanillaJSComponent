export class Counter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
  }

  // this를 잃어버리지 않기 위해 화살표 함수로 정의한다.
  handleClick = () => {
    this.count++;
    this.querySelector('div').innerHTML = `count: ${this.count}`;
  };

  render() {
    this.innerHTML = `
      <div class='counter'>count: ${this.count}</div>
    `;
  }

  addEvents() {
    this.querySelector('div').addEventListener('click', this.handleClick);
  }

  removeEvents() {
    this.querySelector('div').removeEventListener('click', this.handleClick);
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.addEvents();
      this.rendered = true;
    }
  }

  disconnectedCallback() {
    this.rendered = false;
    this.removeEvents();
  }
}

export class HeadIntro extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
      <header class="intro">
          <h1 class="intro__heading">Todo list</h1>
          <p class="intro__summary">
            오늘 할 일을 적어보세요. <br />
            <b>주의:</b> 데이터는 새로고침 후 사라집니다.
          </p>
      </header>
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

export class MainApp extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
        <head-intro></head-intro>
        <app-input class='app__input'></app-input>
        <app-status class='app__status'></app-status>
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

import template from "./page-not-found.tpl";

export default class PageNotFound {
  template: string = template;
  container: HTMLElement;

  constructor(container) {
    this.container = document.querySelector(container);
  }

  render = () => {
    this.container.innerHTML = this.template;
  };
}

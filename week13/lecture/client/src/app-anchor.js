export class AppAnchor extends HTMLAnchorElement {

  constructor() {
    super();
  }

  clickHandler(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('app-render', {
      detail: this.href.replace(window.location.origin, ''),
      bubbles: true
    }));
  }

  connectedCallback() {
    this.addEventListener('click', this.clickHandler);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.clickHandler);
  }

}

customElements.define('app-anchor', AppAnchor, { extends: 'a' });
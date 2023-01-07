export class EditUser extends HTMLElement {
  #_shadowRoot = null;

  constructor() {
    super();
    this.#_shadowRoot = this.attachShadow({ mode: 'closed' });
  }
}

customElements.define('app-edit-user', EditUser);
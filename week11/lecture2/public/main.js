import { UserList } from './user-list.js';

export class AppComponent extends HTMLElement {
  #_shadowRoot = null;

  constructor() {
    super();
    this.#_shadowRoot = this.attachShadow({ mode: 'closed' });
    const userListInstance = new UserList();
    this.#_shadowRoot.appendChild(userListInstance);
  }
}

customElements.define('app-root', AppComponent);

const app = new AppComponent();
document.body.appendChild(app);

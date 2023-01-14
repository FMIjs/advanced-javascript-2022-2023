import { pathToRegexp } from 'path-to-regexp';
import { UserList } from './user-list';
import { EditUser } from './edit-user';

export class Router extends HTMLElement {
  #_shadowRoot = null;
  #currentPath = null;

  config = {
    '/edit/:id': EditUser,
    '/': UserList,
  };

  constructor() {
    super();
    this.#_shadowRoot = this.attachShadow({ mode: 'closed' });
  }

  render(path, skipStatePush = false) {
    let ctor = null;
    for (const [key, value] of Object.entries(this.config)) {
      const keyRe = pathToRegexp(key);
      if (!keyRe.test(path)) { continue; }
      ctor = value;
      break;
    }

    if (!ctor) {
      console.error('Route not found!')
    }
    if (this.#currentPath === path) { return; }
    this.#currentPath = path;

    const instance = new ctor();
    if (this.#_shadowRoot.children[0]) {
      this.#_shadowRoot.removeChild(this.#_shadowRoot.children[0]);
    }
    this.#_shadowRoot.appendChild(instance);

    if (skipStatePush) { return; }
    history.pushState('', '', path);
  }

  popstateHandler = (e) => {
    e.preventDefault();
    this.render(location.pathname, true);
  }

  connectedCallback() {
    this.render(location.pathname);
    window.addEventListener('popstate', this.popstateHandler);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.popstateHandler);
  }
}

customElements.define('app-router', Router);


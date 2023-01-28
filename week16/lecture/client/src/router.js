import { pathToRegexp } from 'path-to-regexp';
import { UserList } from './user-list';
import { EditUser } from './edit-user';
import { Home } from './home';
import { Logout } from './logout';
import { Login } from './login';

export class Router extends HTMLElement {
  #_shadowRoot = null;
  #currentPath = null;
  state = null;

  config = {
    '/edit/:id': { component: EditUser, isRestricted: true },
    '/list': { component: UserList, isRestricted: true },
    '/logout': { component: Logout, isRestricted: true },
    '/login': { component: Login, isRestricted: false },
    '/': { component: Home, isRestricted: false }
  };

  constructor({ state }) {
    super();
    this.state = state;
    this.#_shadowRoot = this.attachShadow({ mode: 'closed' });
  }

  render(path, skipStatePush = false) {
    let ctor = null;
    let isRestricted = null;
    for (const [key, value] of Object.entries(this.config)) {
      const keyRe = pathToRegexp(key);
      if (!keyRe.test(path)) { continue; }
      ctor = value.component;
      isRestricted = value.isRestricted;
      if (isRestricted && !this.state.user) {
        this.navigate('/login');
        return;
      }
      break;
    }

    if (!ctor) {
      console.error('Route not found!')
    }
    if (this.#currentPath === path) { return; }
    this.#currentPath = path;

    const instance = new ctor({ router: this, state: this.state });
    if (this.#_shadowRoot.children[0]) {
      this.#_shadowRoot.removeChild(this.#_shadowRoot.children[0]);
    }
    this.#_shadowRoot.appendChild(instance);

    if (skipStatePush) { return; }
    history.pushState('', '', path);
  }

  navigate = (path) => {
    setTimeout(() => { this.render(path); });
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


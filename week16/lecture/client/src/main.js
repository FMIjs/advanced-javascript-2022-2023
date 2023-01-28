import './app-anchor';
import { Router } from './router';
import { environment } from './environments/environment';

function createMainTemplate() {
  const templateString = `
    <nav id="nav">
      <a href="/" is="app-anchor">Home</a>
      <a href="/list" is="app-anchor">User List</a>
      <a href="/edit/1" is="app-anchor">Edit User 1</a>
      <a href="/login" is="app-anchor">Login</a>
      <a href="/logout" is="app-anchor">Logout</a>
    </nav>
    <app-slot>SLOT EXAMPLE</app-slot>
    `;

  const templateElement = document.createElement('template');
  templateElement.innerHTML = templateString;
  return templateElement;
}

const template = createMainTemplate();

const state = { user: null };

export class AppComponent extends HTMLElement {
  #_shadowRoot = null;

  constructor() {
    super();
    this.#_shadowRoot = this.attachShadow({ mode: 'closed' });
  }

  connectedCallback() {
    this.authenticate().then(() => {
      this.init();
    });
  }

  init() {
    const router = new Router({ state });
    this.#_shadowRoot.appendChild(template.content.cloneNode(true));
    this.#_shadowRoot.appendChild(router);

    const nav = this.#_shadowRoot.querySelector('#nav');
    nav.addEventListener('app-render', (e) => {
      router.render(e.detail);
    });
  }

  authenticate = () => {
    return fetch(`${environment.apiURL}/users?action=auth`, {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(res => res.ok ? res.json() : null)
      .then((result) => state.user = result);
  }
}

customElements.define('app-root', AppComponent);


function createSlotTempalte() {
  const templateString = `
    <slot></slot>
    `;

  const templateElement = document.createElement('template');
  templateElement.innerHTML = templateString;
  return templateElement;
}

const slotTemplate = createSlotTempalte();
export class SlotComponent extends HTMLElement {
  #_shadowRoot = null;
  constructor() {
    super();
    this.#_shadowRoot = this.attachShadow({ mode: 'closed' });
    this.#_shadowRoot.appendChild(slotTemplate.content.cloneNode(true));
  }
}

customElements.define('app-slot', SlotComponent);

const app = new AppComponent();
document.body.appendChild(app);

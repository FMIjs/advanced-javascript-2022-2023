import './app-anchor.js';
import { Router } from './router.js';

function createMainTempalte() {
  const templateString = `
    <nav id="nav">
      <a href="/" is="app-anchor">User List</a>
      <a href="/edit/1" is="app-anchor">Edit User 1</a>
    </nav>
    <app-slot>AAAAAAAAAAAAAAA</app-slot>
    `;

  const templateElement = document.createElement('template');
  templateElement.innerHTML = templateString;
  return templateElement;
}

const template = createMainTempalte();

export class AppComponent extends HTMLElement {
  #_shadowRoot = null;

  constructor() {
    super();
    this.#_shadowRoot = this.attachShadow({ mode: 'closed' });
    const router = new Router();
    this.#_shadowRoot.appendChild(template.content.cloneNode(true));
    this.#_shadowRoot.appendChild(router);

    const nav = this.#_shadowRoot.querySelector('#nav');
    nav.addEventListener('app-render', (e) => {
      router.render(e.detail);
    })
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

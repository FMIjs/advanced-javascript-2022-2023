import { environment } from './environments/environment';
import { html, render } from 'lit';

const renderUserListTemplate = (context) => html`
  <style>
    #loading:not(.visible) {
      display: none;
    }
  </style>
  <div id="content">
    ${context.isLoading ? html`<div id="loading" class="visible">Loading...</div>` : ''}
    ${context.isLoading ? '' : html`<ul id="user-list">${context?.users?.map(u => html`<li>${u}</li>`)}</ul>`}
   </div>
`;

export class UserList extends HTMLElement {
  #_shadowRoot = null;

  set isLoading(newValue) {
    this._isLoading = newValue;
    this.render();
  }

  get isLoading() {
    return this._isLoading;
  }

  set users(newValue) {
    this._users = newValue;
    this.render();
  }

  get users() {
    return this._users;
  }

  constructor() {
    super();
    this.#_shadowRoot = this.attachShadow({ mode: 'closed' });
    this.isRenderScheduled = false;
    this.isLoading = false;
    this.users = [];
  }

  render() {
    if (this.isRenderScheduled) { return; }
    this.isRenderScheduled = true;
    Promise.resolve().then(() => {
      const templateResult = renderUserListTemplate(this);
      render(templateResult, this.#_shadowRoot);
      this.isRenderScheduled = false;
    });
  }

  loadUsers() {
    this.isLoading = true;
    fetch(environment.apiURL + '/users')
      .then(res => res.ok ? res.json() : Promise.reject(new Error('Error loading users')))
      .then(users => this.users = users)
      .catch(err => console.error(err))
      .finally(() => this.isLoading = false);
  }

  connectedCallback() {
    this.loadUsers();
  }
}

customElements.define('app-user-list', UserList);

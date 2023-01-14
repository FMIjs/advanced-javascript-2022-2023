import { environment } from './environments/environment';
import { html } from 'lit';
import { Component } from './decorators/component';
import { property } from './decorators/property';


const template = (context) => html`
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

@Component({ template })
export class UserList extends HTMLElement {
  @property isLoading;
  @property users;

  constructor() {
    super();
    this.isRenderScheduled = false;
    this.isLoading = false;
    this.users = [];
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

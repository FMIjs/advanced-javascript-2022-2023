import { html } from 'lit';
import { Component } from './decorators/component';
import { environment } from './environments/environment';

const template = (context) => html`
  <h1>Signing out...</h1>
`;

@Component({ template })
export class Logout extends HTMLElement {

  router = null;
  state = null;
  constructor({ router, state }) {
    super();
    this.router = router;
    this.state = state;
  }

  connectedCallback() {
    this.logout();
  }

  logout() {
    fetch(`${environment.apiURL}/users?action=logout`, { method: 'GET', credentials: 'include' })
      .then(() => {
        this.state.user = null;
        this.router.navigate('/');
      });
  }

}

customElements.define('app-logout', Logout);

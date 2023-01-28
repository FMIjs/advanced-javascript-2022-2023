import { html } from 'lit';
import { Component } from './decorators/component';
import { environment } from './environments/environment';


const template = (context) => html`
  <h1>Login</h1>
  <form @submit="${context.loginHandler}">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="text" id="email" name="email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
    </div>
    <button>Login</button>
  </form>
`;

@Component({ template })
export class Login extends HTMLElement {

  router = null;
  state = null;

  constructor({ router, state }) {
    super();
    this.router = router;
    this.state = state;
  }

  loginHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get('email');
    const password = data.get('password');
    fetch(`${environment.apiURL}/users?action=login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    }).then(res => res.ok ? res.json() : null)
      .then((user) => {
        if (!user) { return void console.error('SHOW ERROR IN HTML'); }
        this.state.user = user;
        this.router.navigate('/list');
      });
  }
}

customElements.define('app-login', Login);

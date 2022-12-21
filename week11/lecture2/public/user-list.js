function createUserListTempalte() {
  const templateString = `
    <style>
      #loading:not(.visible) {
        display: none;
      }
    </style>
    <div id="content">
      <div id="loading" class="visible">Loading...</div>
      <ul id="user-list"></ul>
    </div>`;

  const templateElement = document.createElement('template');
  templateElement.innerHTML = templateString;
  return templateElement;
}

const template = createUserListTempalte();

export class UserList extends HTMLElement {
  #_shadowRoot = null;
  #queryAll = null;

  constructor() {
    super();
    this.#_shadowRoot = this.attachShadow({ mode: 'closed' });
    this.#_shadowRoot.appendChild(template.content.cloneNode(true));
    this.#queryAll = function (selector) {
      return this.#_shadowRoot.querySelectorAll(selector);
    };
  }

  renderUsers(users) {
    const [userList] = this.#queryAll('#user-list');
    userList.innerHTML = '';
    let i = 0;
    for (const user of users) {
      const userLi = document.createElement('li');
      userLi.setAttribute('data-index', i++);
      userLi.innerHTML = user;
      userList.appendChild(userLi);
    }
  }

  loadUsers() {
    const [loader] = this.#queryAll('#loading');
    loader.classList.add('visible');
    fetch('/users')
      .then(res => res.ok ? res.json() : Promise.reject(new Error('Error loading users')))
      .then(users => this.renderUsers(users))
      .catch(err => console.error(err))
      .finally(() => loader.classList.remove('visible'));
  }

  connectedCallback() {
    this.loadUsers();
  }
}

customElements.define('app-user-list', UserList);

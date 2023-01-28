import { html } from 'lit';
import { Component } from './decorators/component';


const template = (context) => html`
  <h1>EDIT USER TEMPLATE</h1>
`;

@Component({ template })
export class EditUser extends HTMLElement {

  constructor() {
    super();
  }


}

customElements.define('app-edit-user', EditUser);

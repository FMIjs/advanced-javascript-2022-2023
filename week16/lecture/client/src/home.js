import { html } from 'lit';
import { Component } from './decorators/component';


const template = (context) => html`
  <h1>HOME PAGE</h1>
`;

@Component({ template })
export class Home extends HTMLElement {

  constructor() {
    super();
  }


}

customElements.define('app-home', Home);

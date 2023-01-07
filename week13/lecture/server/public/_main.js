const appComponentTemplate = document.getElementById('app-component-template');

class AppComponent extends HTMLElement {

  static observedAttributes = ['styles'];

  get date() {
    return this._date;
  }

  set date(newValue) {
    this._date = newValue;
    this._content.innerHTML = newValue;
  }

  constructor() {
    super();
    const showRoot = this.attachShadow({ mode: 'closed' });


    // const styleContent = this.getAttribute('styles')
    const style = document.createElement('style');
    showRoot.appendChild(style);
    showRoot.appendChild(appComponentTemplate.content.cloneNode(true));

    this._content = showRoot.querySelector('#content');

    this.setComponentStyle = function (innerHTML) {
      style.innerHTML = innerHTML;
      // let currentStyle = showRoot.querySelector('#cmp-style');
      // if (currentStyle) { showRoot.removeChild(currentStyle); }
      // currentStyle = document.createElement('style');
      // currentStyle.id = 'cmp-style';
      // currentStyle.innerHTML = innerHTML;
      // showRoot.appendChild(currentStyle);
    }
  }

  connectedCallback() {
    this.date = new Date();
    this._timerId = setInterval(() => {
      this.date = new Date();
    }, 1000);

    console.log('connectedCallback');
  }

  disconnectedCallback() {
    clearInterval(this._timerId);
    console.log('disconnectedCallback');
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
      case 'styles': {
        this.setComponentStyle(newValue);
        break;
      }
    }
  }
}

customElements.define('app-component', AppComponent);

const appCmp = new AppComponent();


// setTimeout(() => {
//   document.body.appendChild(appCmp);
//   setTimeout(() => {
//     document.body.removeChild(appCmp);
//     setTimeout(() => {
//       document.body.appendChild(appCmp);
//     }, 5000);

//   }, 5000);
// }, 4000);
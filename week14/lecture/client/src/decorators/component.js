import { render } from 'lit';
export function Component(config) {
  return function (target) {
    target.prototype._render = function () {
      if (!this.shadowRoot) { this.attachShadow({ mode: 'open' }); }
      if (this.isRenderScheduled) { return; }
      this.isRenderScheduled = true;
      Promise.resolve().then(() => {
        const templateResult = config.template(this);
        render(templateResult, this.shadowRoot);
        this.isRenderScheduled = false;
      });
    }
  };
}
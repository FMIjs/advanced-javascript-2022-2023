import { render } from 'lit';
export function Component(config) {
  return function (target) {
    target.prototype._render = function () {
      if (this.isRenderScheduled) { return; }
      this.isRenderScheduled = true;
      Promise.resolve().then(() => {
        const templateResult = config.template(this);
        render(templateResult, this.shadowRoot);
        this.isRenderScheduled = false;
      });
    }
    return class extends target {
      constructor(...args) {
        const result = super(...args);
        result.attachShadow({ mode: 'open' });
        result._render();
        return result;
      }
    }
  };
}
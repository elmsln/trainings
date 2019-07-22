// base class that brings in helpers for html and css data binding
import { LitElement, html, css } from 'lit-element';
// Polymer Team element that implements a Material design pattern though not official material
import "@polymer/paper-button/paper-button.js";

/**
 * All Web components will look this way. You'll extend a base class whether that's
 * HTMLElement (vanilla), LitElement (recommended), PolymerElement or otherwise
 * All of your web components will extend something else. Elements can also extend other elements.
 */
class GovButton extends LitElement {
  /**
   * The properties block allows you to define the API for
   * others to work with your element
   */
  static get properties() {
    return {
      /**
       * title/label of the button
       */
      title: { type: String },
      /**
       * link to point to
       */
      link: { type: String },
      /**
       * optional <a> link target like _blank
       */
      target: { type: String },
      /**
       * Optional size of the button
       */
      size: { type: String, reflect:true },
    };
  }

  /**
   * Constructor is the initialization of the class
   * This is the first place you can put things in a web component's life cycle
   */
  constructor() {
    // this must be called as we're extending something else (LitElement)
    super();
    // set some default values for our element's properties
    this.target = '';
    this.link = '';
    this.title = "My title";
    this.size = 'small';
  }

  /**
   * Styles is unique to LitElement but forms a clean way of adding your CSS
   * in a way that will work with ShadyCSS (polyfills) as well as ShadowRoots (Native spec)
   */
  static get styles() {
    return [
      css`
        :host {
          display: inline-flex;
        }
        :host([size="small"]) button {
          font-size: 12px;
        }
        :host([size="medium"]) button {
          font-size: 24px;
        }
        :host([size="large"]) button {
          font-size: 36px;
        }

        a {
          text-decoration: none;
        }
        button:hover,
        button:active,
        button:focus {
          background-color: blue;
          color: white;
          outline: none;
        }
        button {
          background-color: transparent;
          padding: 16px;
          border: 0;
        }
      `,
    ];
  }

  /**
   * The render function is specific to LitElement but it's the way you get your
   * HTML / elements internals to print to the screen. the styles function above
   * is assumed that it will also run. You'll notice that render also
   * is the place you can do template literal data binding, seen in the ${this.whatever}
   * convention. This is the real power of LitElement, leveraging the lit-html
   * function in order to provide highly performant rewriting of the properties on this
   * element into the page to view. This is what people think of when they talk about
   * web components from a data binding / api perspective.
   */
  render() {
    return html`
     <a tabindex="-1" href="${this.link}" target="${this.target}">
      <button id="btn">${this.title}<slot></slot></button>
     </a>
    `;
  }

  /**
   * Updated is called whenever a property changes. When any property changes
   * (or a batch of them) you'll have this function run automatically and
   * then you can query the element via this for the values that are active.
   * @param {array} changedProperties 
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      switch (propName) {
        // listen for the target changing
        case 'target':
          // if the user sets it to _blank, then append some additional security related things
          if (this[propName] === '_blank') {
            // this.shadowRoot allows you to work the way document works for the whole document
            // shadowRoot is for querying just the piece of the DOM found in the render function
            this.shadowRoot.querySelector('a').setAttribute('rel', "noopener noreferrer");
          }
          else {
            this.shadowRoot.querySelector('a').removeAttribute('rel');
          }
        break;
        default:
        break;
      }
    });
  }
}
// all web components will have omething like this which tells the browser
// when you see this tag name, then execute it's definition via this class
customElements.define('gov-button', GovButton);
// not required but popular for more abstract classes which could be both visual
// or leveraged in other JS projects for it's functions directly
export { GovButton };
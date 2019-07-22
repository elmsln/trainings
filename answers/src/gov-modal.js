import { LitElement, html, css } from 'lit-element';
// we can pull in the button we just made
import "./gov-button.js";
// we can also pull in a dialog from else where
import "@polymer/paper-dialog/paper-dialog.js";

class GovModal extends LitElement {
  static get properties() {
    return {
      label: { type: String }
    };
  }

  constructor() {
    super();
    this.label = "Click me";
  }

  /**
   * firstUpdated is a LitElement specific life-cycle function at which point
   * the shadowRoot is ready for querying / modifying but is also available for
   * seeing the values of properties. This makes for a great place to perform one
   * time setup kinds of tasks when the shadowRoot is ready.
   * @param {array} changedProperties 
   */
  firstUpdated() {
    // binding event listeners is extremely useful as the correct
    // data flow is ALWAYS properties get passed down into other elements
    // and events allow child elements to communicate back up to direct or higher parents
    this.shadowRoot.querySelector('gov-button').addEventListener('click', this.openModal.bind(this));
  }

  /**
   * Just like any javscript class we can add whatever function we want
   */
  openModal() {
    this.shadowRoot.querySelector('paper-dialog').toggle();
  }

  /**
   * This styles block is using the ::slotted(h2) call which says:
   * If something is placed directly in my slot (NOT deeper children)
   * and it's an h2, then apply these styles
   */
  static get styles() {
    return [
      css`
        :host {
          display: inline-flex;
        }
        paper-dialog ::slotted(h2) {
          background-color: green;
          color: white;
          margin: 0;
          padding: 8px 0 8px 8px;
        }
      `,
    ];
  }

  /**
   * <slot> allows other tags implementing this to leverage the innerHTML of
   * the tag like you would nest any other HTML primative. This provides maximal flexibility
   * to developers and is popular with those supporting progressive enhancement methods
   * of implementation.
   * `@anything` is a way in LitElement to quickly add a listener for any events. in this case click
   */
  render() {
    return html`
    <gov-button title="${this.label}" @click="${this.handleClick}">
      <slot name="button"></slot>
    </gov-button>
    <paper-dialog>
      <slot></slot>
    </paper-dialog>
    `;
  }

  /**
   * Block the normal default click; this allows us to use the gov-button's
   * ability to be designed and have a label but yet not jump to a link.
   * This is probably not how you'd do this in reality but it's an example
   * of hijacking behavior when it's too closely aligned to design.
   */
  handleClick(e) {
    e.preventDefault();
  }
}
customElements.define('gov-modal', GovModal);
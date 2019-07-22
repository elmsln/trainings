import { LitElement, html, css } from 'lit-element';
// This is a polymer specific element used for teaching
import "@polymer/polymer/lib/elements/dom-repeat.js";
// You could do this via fetch but it's very newbee friendly
import "@polymer/iron-ajax/iron-ajax.js";
// A simple date / time renderer the ELMSLN team made
import "@lrnwebcomponents/simple-datetime/simple-datetime.js";
// Pull that happy button back in
import "./gov-button.js";

class GovAPI extends LitElement {
    static get properties() {
        return {
            /**
             * items is an array so we can maintain a list of items
             */
            items: { type: Array },
            /**
             * url to get our data from / an end point. This would be
             * really useful in the drupal context where we get data
             * from a backend or some kind
             */
            url: { type: String },
        };
    }

    static get styles() {
        return [
        css`
        :host {
            display: block;
        }
        simple-datetime {
            color: black;
        }
        `,
        ];
    }

    constructor() {
        super();
        this.items =[];
        this.url = 'https://www.elmsln.org/node.json';
    }

    /**
     * iron-ajax will automatically get data and pass it over to handleResponse
     * items.map is a bit confusing to read potentially, but it's going to update and print
     * the gov-button with simple-datetime PER RESULT FROM THE API. This is how we build complexity
     * out of simple things rather rapidly.
     * 
     * Below this is a dom-repeat to illustrate how this same thing can be accomplished in Polymer.
     * Note the syntax differences. The [[title]] for data binding instead of ${this.title}
     */
    render() {
        return html`
        <iron-ajax
            auto
            url="${this.url}"
            handle-as="json"
            @response="${this.handleResponse}"></iron-ajax>
        <ul>
        ${this.items.map(item => html`
        <li>
        <gov-button title="${item.title}" link="${item.url}" target="_blank">
            <simple-datetime format="M jS, Y" timestamp="${item.created}" unix></simple-datetime>
        </gov-button>
    </li>
        `)}
        </ul>

        <dom-repeat items="${this.dataItems}" as="item">
            <template>
                <gov-button title="[[item.title]]" link="[[item.url]]" target="_blank">
                    <simple-datetime
                    format="M jS, Y"
                    timestamp="[[item.created]]"
                    unix
                    ></simple-datetime>
                </gov-button>
            </template>
        </dom-repeat>`;
    }

    /**
     * Our response has a list property. If we have it, then rebuild the list in the DOM
     * @param {object} e 
     */
    handleResponse(e) {
        if (e.detail.response.list) {
            // print for debugging
            console.log(e.detail.response.list);
            // this changes items, which then will reflect in the page the list
            // of items in the this.items.map area
            this.items = e.detail.response.list;
            // because of how Polymer can handle data binding, we convert this item
            // to a string and then it'll convert it back over to the right type
            // this is illustrating the ability to mix polymer and lit data binding
            // methodologies though it's not recommended
            this.dataItems = JSON.stringify(e.detail.response.list);
        }
    }
}
customElements.define('gov-api', GovAPI);
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../shared/API/ajax-call.js';
import '@polymer/app-route/app-location.js';
/**
 * @customElement
 * @polymer
 */
class UserHome extends PolymerElement {
  static get template() {
    return html`
      <style>
      :host {
        display: block;
        height:78vh;
      }
      paper-card {
        max-width: 400px;
        margin: 10px;
        cursor:pointer;
      }
      </style>
      <app-location route={{route}}></app-location>
      <ajax-call id="ajax"></ajax-call>
      <template is="dom-repeat" items={{vendors}} as="vendor">
    <paper-card image=../../images/carousal2.jpg elevation="2" animated-shadow="false" on-click="_handleClick">
      <div class="card-content">
        <p>{{vendor.firstName}}{{vendor.lastName}}</p>
      </div>
    </paper-card>
  </template>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'user-home'
      },
      vendors: {
        type: Array,
        value: []
      }
    };
  }
  ready() {
    super.ready();
    this.addEventListener('user-data', (e) => this._userData(e))
  }
  connectedCallback() {
    super.connectedCallback();
    this.$.ajax._makeAjaxCall('get',`http://10.117.189.138:8085/foodplex/users`,null,'userData')  
    let currentImage = 0;
    let images = [
      "url(../../../images/carousal1.jpg)",
      "url(../../../images/carousal2.jpg)",
      "url(../../../images/carousal3.jpg)"
    ];
    let nextImage = () => {
      currentImage = (currentImage + 1) % images.length;
      this.shadowRoot.host.style.background = images[currentImage];
      this.shadowRoot.host.style.backgroundSize = 'cover';
      setTimeout(nextImage, 4000)
    }
      nextImage();
  }
  /**
   * 
   * @param {event} event 
   */
  _handleClick(event) {
    this.set('route.path', './order')
  }
  /**
   * 
   * @param {*} event 
   */
  _userData(event) {
    this.vendors = event.detail.data;
  }
}

window.customElements.define('user-home', UserHome);

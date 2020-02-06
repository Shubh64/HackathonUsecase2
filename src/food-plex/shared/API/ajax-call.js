import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js'
/**
 * @customElement
 * @polymer
 */
class AjaxCall extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
    <iron-ajax id="ajax" on-error="_handleError" on-response="_handleResponse" handle-as="json" content-type="application/json"> </iron-ajax>
    `;
  }
  static get properties() {
    return {

    };
  }
  /**
   * @description: ???
   * @author: ???
  *@param {String} url url of specific location
  *@param {String} method method type:get/put/post/delete
  *@param {Object} postObj needs object as value for put/post and null for get/delete
  *@param {Boolean} sync true for synchronization and false for asynchronization
  **/

  _makeAjaxCall(method, url, postObj, action) {
    const ajax = this.$.ajax
    this.action = action
    ajax.body = postObj ? JSON.stringify(postObj) : undefined;
    ajax.method = method;
    ajax.url = url;
    ajax.generateRequest();
  }

/**
 * @description: Fired everytime when ajax call is made.It handles response of the ajax 
 * @param {*} event 
 */
  _handleResponse(event) {
    const data = event.detail.response
    console.log(data)
    //All the response has been handled through switch case by dispatching event details to the parent
    switch (this.action) {
      case 'login': this.dispatchEvent(new CustomEvent('login-status', { bubbles: true, composed: true, detail: { data } }))
        break;
      case 'userData': this.dispatchEvent(new CustomEvent('user-data', { bubbles: true, composed: true, detail: { data } }))
        break;
        case 'fetchingCategories': this.dispatchEvent(new CustomEvent('fetching-categories', { bubbles: true, composed: true, detail: { data } }))
        break;
        case 'populateFields': this.dispatchEvent(new CustomEvent('populate-fields', { bubbles: true, composed: true, detail: { data } }))
        break;
        case 'myOrders': 
        this.dispatchEvent(new CustomEvent('getting-orders', { bubbles: true, composed: true, detail: { data } }))
        break;
        case 'getVendorItems':
        this.dispatchEvent(new CustomEvent('vendor-items', { bubbles: true, composed: true, detail: { data } }))
        break;
        case 'payments':
        this.dispatchEvent(new CustomEvent('payments-page', { bubbles: true, composed: true, detail: { data } }))
        break;
      default:

    }
  }
  _handleError(event)
  {
    const data = event.detail.request.response
    switch (this.action) {
      case 'login': this.dispatchEvent(new CustomEvent('login-status', { bubbles: true, composed: true, detail: { data } }))
        break;
        case 'payments':
          this.dispatchEvent(new CustomEvent('payments-page', { bubbles: true, composed: true, detail: { data } }))
          break;
        default:

    }
  }
}
window.customElements.define('ajax-call', AjaxCall);

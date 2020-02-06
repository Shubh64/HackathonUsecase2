import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '../shared/API/ajax-call.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
class VendorOrders extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
    paper-card
    {
        width:350px;
        margin-right:20px;
        margin-left:20px;
    }
    h1
    {
        margin-left:20px;
    }
  </style>
  <ajax-call id="ajax"></ajax-call>
  <h1>Vendor's Orders</h1>
      <template is="dom-repeat" items={{myOrders}}>
        <paper-card>
        <ul>
        <li>OrderId:{{item.orderDetailId}}</li>
        <li>Price:{{item.totalPrice}}</li>
        <li>Quantity:{{item.quantity}}</li>
        <li>PaymentMode:{{item.paymentMode}}</li>
        <li>Status:{{item.status}}</li>
        <li>Items:
        <template is="dom-repeat" items={{item.orderItems}} as="order">
        {{order.vendorItem.item.itemName}},
        </template>
        </li>
        <li>Quantity:{{item.quantity}}</li>
        </ul>
        </paper-card>
    `;
  }
  static get properties() {
    return {
        myOrders:{
            type:Array,
             value:[]
          },
    
     }
}
  ready()
  {
    super.ready();
    this.addEventListener('getting-orders', (e) => this._gettingOrders(e))
  }
  connectedCallback()
  {
    super.connectedCallback();
    this.$.ajax._makeAjaxCall('get',`http://10.117.189.208:8085/foodplex/users/${sessionStorage.getItem('userId')}/vendororders`,null,'myOrders')  
  }
  _gettingOrders(event){  
      this.myOrders=event.detail.data.orders
  }
}

window.customElements.define('vendor-orders', VendorOrders);

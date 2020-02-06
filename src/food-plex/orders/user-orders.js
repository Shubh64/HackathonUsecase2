import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '../shared/API/ajax-call.js';
class UserOrders extends PolymerElement
    {
        static get template()
        {
            return html `
            <style>
            paper-card{
              width:400px;
            }
              :host {
                display: block;
              }
            </style>
            <h2>Hello [[prop1]]!</h2>
            <app-location route={{route}}></app-location>
            <ajax-call id="ajax"></ajax-call>
                <template is="dom-repeat" items={{myOrders}}>
                  <paper-card >
                  <ul>
                  <li>OrderId:{{item.orderDetailId}}</li>
                  <li>Price:{{item.totalPrice}}</li>
                  <li>Date:{{item.orderDate}}</li>
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
                </template>   `
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
    const userId=sessionStorage.getItem('userId')
    super.connectedCallback();
    this.$.ajax._makeAjaxCall('get',`http://10.117.189.208:8085/foodplex/users/${userId}/orders`,null,'myOrders')  
  }
  _gettingOrders(){
      this.myOrders=event.target.response.orders
  }
}
    customElements.define('user-orders',UserOrders)
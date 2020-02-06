import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '../shared/API/ajax-call.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
/**
 * @customElement
 * @polymer
 */
class FoodOrder extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        paper-card{
          width:100%;
        }
        span{
          display:flex;
          margin-top: 10px;
          justify-content: center;
        }
        paper-card ul
        {
          display:flex;
          justify-content:space-between;
          align-items:center;
          list-style:none;
        }
        paper-card ul li
        {
          width:120px;
        }
        paper-tab
        {
          font-size:22px;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <app-location route={{route}}></app-location>
      <ajax-call id="ajax"></ajax-call>
      <paper-tabs selected="{{selected}}" scrollable>
          <template is="dom-repeat" items={{availableCategories}}>
            <paper-tab on-click="_filterCategory"> {{item.categoryName}}</paper-tab>
          </template>
      </paper-tabs>
          <template is="dom-repeat" items={{availableItems}}>
            <paper-card>
            <ul><li>item:{{item.itemName}}</li>
            <li>Price:{{item.itemPrice}}</li>
            <li><paper-icon-button id="removeBtn" on-click="_handleRemove" icon="remove"></paper-icon-button>
            <span id="quantity{{item.itemId}}">0</span>
            <paper-icon-button id="addBtn" on-click="_handleAdd" icon="add"></paper-icon-button></li>
            </ul>
            </paper-card>
          </template>
      <span><paper-button on-click="_foodOrder" raised id="foodOrder">OrderNow</paper-button></span>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'food-order'
      },
      quantity:{
        type: Number,
        value: 0
      },
      availableItems:{
        type:Array,
        value:[{itemId:"1"},{itemId:"2"}]
      },
      availableCategories:{
        type:Array,
        value:[{categoryName:"salad"}]
      },
      selected: {
        type: Number,
        value: 0
      }
    };
  }

  ready()
  {
    super.ready();
    this.addEventListener('fetching-categories', (e) => this._fetchingCategories(e))
  }
  connectedCallback()
  {
    super.connectedCallback();
    this.$.ajax._makeAjaxCall('get',`http://10.117.189.208:8085/foodplex/categories?userId=${sessionStorage.getItem('userId')}`,null,'fetchingCategories')  
  }
  _fetchingCategories(event){
    this.availableCategories=event.detail.data.itemCategoryList
  }
  _handleAdd(event){
    this.quantity+=1;
    let quant=`quantity${event.model.item.itemId}`
    let something=this.shadowRoot.querySelector(`#${quant}`)
something.innerHTML=parseInt(something.innerHTML)+1
    sessionStorage.setItem('vendorItemId',event.model.item.itemId)
    sessionStorage.setItem('price',event.model.item.itemPrice)
  }
  _handleRemove(event){
    let quant=`quantity${event.model.item.itemId}`
    let something=this.shadowRoot.querySelector(`#${quant}`)
    if(something.innerHTML!=0){
      something.innerHTML=parseInt(something.innerHTML)-1
  }}
  _filterCategory(event)
  {
     this.selectedCategoryTab=event.model.item.categoryName
    let items=this.availableCategories;
    let item=items.filter(item=>{
      return item.categoryName==this.selectedCategoryTab
    })
    this.availableItems=item[0].itemList
  }
  _foodOrder(event){
    const quantity=this.quantity;
    const vendorItemId=sessionStorage.getItem('vendorItemId')
    const price=sessionStorage.getItem('price');
    const obj={quantity,vendorItemId,price}
    sessionStorage.setItem('orderDetailsObj', JSON.stringify(obj))
   this.set('route.path','/payment')
  }
}

window.customElements.define('food-order', FoodOrder);
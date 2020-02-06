import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '../shared/API/ajax-call.js';
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
      <iron-pages selected="{{selected}}">
          <template is="dom-repeat" items={{availableItems}}>
            <paper-card>
            <ul><li>item:{{item.name}}</li>
            <li>Price:{{item.price}}</li>
            <li><paper-icon-button id="removeBtn" on-click="_handleRemove" icon="remove"></paper-icon-button>
            {{quantity}}
            <paper-icon-button id="addBtn" on-click="_handleAdd" icon="add"></paper-icon-button></li>
            </ul>
            </paper-card>
          </template>
      </iron-pages>
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
       // value:[{name:"Dosa",price:"50",category:"food"},{name:"Dosa",price:"500",category:"c"},{name:"Dosa",price:"509",category:"b"},{name:"Dosa",price:"50",category:"a"}, {name:"Dosa",price:"50",category:"food"},{name:"Dosa",price:"500",category:"c"},{name:"Dosa",price:"509",category:"b"},{name:"Dosa",price:"50",category:"a"},{name:"Dosa",price:"50",category:"food"},{name:"Dosa",price:"500",category:"c"},{name:"Dosa",price:"509",category:"b"},{name:"Dosa",price:"50",category:"a"},{name:"Dosa",price:"50",category:"food"},{name:"Dosa",price:"500",category:"c"},{name:"Dosa",price:"509",category:"b"},{name:"Dosa",price:"50",category:"a"},{name:"Dosa",price:"50",category:"food"},{name:"Dosa",price:"500",category:"c"},{name:"Dosa",price:"509",category:"b"},{name:"Dosa",price:"50",category:"a"},{name:"Dosa",price:"50",category:"food"},{name:"Dosa",price:"500",category:"c"},{name:"Dosa",price:"509",category:"b"},{name:"Dosa",price:"50",category:"a"},{name:"Dosa",price:"50",category:"food"},{name:"Dosa",price:"500",category:"c"},{name:"Dosa",price:"509",category:"b"},{name:"Dosa",price:"50",category:"a"},{name:"Dosa",price:"50",category:"food"},{name:"Dosa",price:"500",category:"c"},{name:"Dosa",price:"509",category:"b"},{name:"Dosa",price:"50",category:"a"},{name:"Dosa",price:"50",category:"food"},{name:"Dosa",price:"500",category:"c"},{name:"Dosa",price:"509",category:"b"},{name:"Dosa",price:"50",category:"a"},{name:"Dosa",price:"50",category:"food"},{name:"Dosa",price:"500",category:"c"},{name:"Dosa",price:"509",category:"b"},{name:"Dosa",price:"50",category:"a"}]
       value: [{name:"Dosa",price:"50",category:"Salad"},{name:"Dosa",price:"50",category:"Salad"},{name:"Dosa",price:"500",category:"Sandwich"},{name:"Dosa",price:"509",category:"Healthy bites"},{name:"Dosa",price:"50",category:"Soups"}, {name:"Dosa",price:"50",category:"Soups"},{name:"Dosa",price:"50",category:"Soups"}]
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
    this.$.ajax._makeAjaxCall('get',`http://10.117.189.138:8085/foodplex/categories?userId=${sessionStorage.getItem('userId')}`,null,'fetchingCategories')  
  }
  _fetchingCategories(event){
    console.log(event.detail.data)
    this.availableCategories=event.detail.data.itemCategoryList
  }
  _handleAdd(){
    this.quantity+=1;
  }
  _handleRemove(){
    if(this.quantity!=0){
    this.quantity-=1;
  }}
}

window.customElements.define('food-order', FoodOrder);
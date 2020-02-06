import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-input/paper-input.js';
import '../shared/API/ajax-call.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-card/paper-card.js';
/**
 * @customElement
 * @polymer
 */
class VendorHome extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        paper-card
        {
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
      <ajax-call id="ajax"></ajax-call>
      <paper-dialog id="modal">
            <h2>Enter Details</h2>
            <paper-dialog-scrollable>
                <iron-form id="form">
                    <form>
                        <paper-input label="Enter Price" id="price" name="itemPrice" required error-message="Price is required"></paper-input>
                        <paper-dropdown-menu id="categories" name="categories" vertical-offset="60">
                        <paper-listbox slot="dropdown-content" class="dropdown-content" selected=0>
                        <template is="dom-repeat"  items={{itemDetails}}>
                            <paper-item on-click="_getCategoryId">{{item.itemName}}</paper-item>
                            </template>
                        </paper-listbox>
                    </paper-dropdown-menu>
                        <paper-dropdown-menu id="categories" name="categories" vertical-offset="60">
                        <paper-listbox slot="dropdown-content" class="dropdown-content" selected=0>
                        <template is="dom-repeat"  items={{itemDetails}}>
                            <paper-item on-click="_getCategoryId">{{item.categoryName}}</paper-item>
                            </template>
                        </paper-listbox>
                    </paper-dropdown-menu>
                        </form>
                </iron-form>
                <br />
            </paper-dialog-scrollable>
            <div class="buttons">
                <paper-button on-click="_handleSubmit">OK</paper-button>
                <paper-button dialog-dismiss>Cancel</paper-button>
            </div>
        </paper-dialog>
      <paper-button raised on-click="_handleAdd">Add Item</paper-button>
      <paper-tabs selected="{{selected}}" scrollable>
          <template is="dom-repeat" items={{availableCategories}}>
            <paper-tab name="{{item.categoryName}}" on-click="_handleCategoryItems"> {{item.categoryName}}</paper-tab>
          </template>
      </paper-tabs>
          <template is="dom-repeat" items={{availableItems}}>
            <paper-card>
            <ul>
            <li>item:{{item.itemName}}</li>
            <li>Price:{{item.itemPrice}}</li>
            <li><paper-icon-button id="deleteBtn" on-click="_handleDelete" icon="delete"></paper-icon-button></li>
            </ul>
            </paper-card>
          </template>
          <h2>VendorOrders</h2>
          
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'vendor-home'
      },
      availableItems:{
        type:Array,
        value:[]
      },
      availableCategories:{
        type:Array,
        value:[]
      },
      selected: {
        type: Number,
        value: 0
      },
      itemDetails:{
        type:Array,
        value:[]
      },
      categoryId:{
        type:Number,
        value:0
      },
      itemId:{
        type:Number,
        value:0
      },
      selectedCategoryTab:{
        type:String,
        value:''
      }
    };
  }
  ready()
  {
    super.ready();
    this.addEventListener('populate-fields', (e) => this._populateFields(e))
    this.addEventListener('vendor-items', (e) => this._getVendorItems(e))
    this.addEventListener('fetching-categories', (e) => this._fetchingCategories(e))
  }
  connectedCallback()
  {
    super.connectedCallback();
    this.$.ajax._makeAjaxCall('get',`http://10.117.189.208:8085/foodplex/categories?userId=${sessionStorage.getItem('userId')}`,null,'fetchingCategories')  
  }
  _fetchingCategories(event){
    console.log(event.detail.data)
    this.availableCategories=event.detail.data.itemCategoryList
  }
  _getCategoryId(event)
  {
    this.categoryId=event.model.item.categoryId
    this.itemId=event.model.item.itemId
    console.log(event.model.item.categoryId)
  }
  /**
   * 
   * @param {*} event 
   */
  _handleAdd(event)
  {
    console.log(event)
    this.$.ajax._makeAjaxCall('get',`http://10.117.189.208:8085/foodplex/vendors`,null,'populateFields')
    this.$.modal.open()
  }
  _populateFields(event)
  {
    console.log(event.detail)
    this.itemDetails=event.detail.data
  }
  _handleSubmit()
  {
    const price=this.$.price.value;
    const postObj={price,categoryId:this.categoryId,itemId:this.itemId}
    this.$.ajax._makeAjaxCall('post',`http://10.117.189.208:8085/foodplex/vendors/${sessionStorage.getItem('userId')}/item`,postObj,'')
  }
  _handleCategoryItems(event)
  {
     this.selectedCategoryTab=event.model.item.categoryName
    console.log(this.selectedCategoryTab)
    let items=this.availableCategories;
    let item=items.filter(item=>{
      return item.categoryName==this.selectedCategoryTab
    })
    this.availableItems=item[0].itemList
  }
}

window.customElements.define('vendor-home', VendorHome);

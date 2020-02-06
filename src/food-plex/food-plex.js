import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import { setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/font-roboto/roboto.js';
/**
 * @customElement
 * @polymer
 */
setRootPath(MyAppGlobals.rootPath);
class FoodPlex extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      margin:0;
      padding:0;
      font-family:"roboto"
    }
    .tabs-bar {
      background-image: linear-gradient(to right, #f83600 0%, #f9d423 100%);
      width:100%;
      height: auto;
      text-align:center;
  }

  ul {
      display: inline-flex;
      list-style: none;
      align-items: flex-start;
      
  }
  ul li 
  {
      width:120px;
  }
  ul li a:visited
  {
    color:white;
  }
  ul li a
  {
    color:white;
    text-decoration:none;
  }
  .link
  {
    text-decoration:none;
    color:black;
  }
  .link:visited
  {
    color:black;
  }
  [hidden] {
    display: none !important;
  }
  .heading-title
  {
    color:white;
  }
  .heading
  {
    background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), 
    radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898; 
     background-blend-mode: multiply,multiply;color: white;
  }
  </style>
  <app-location id="location" route="{{route}}"></app-location>
<app-route route="{{route}}" data="{{routeData}}" pattern="[[rootPath]]:page" tail="{{subRoute}}"></app-route>
<app-drawer-layout force-narrow>
  <app-drawer id="drawer" slot="drawer">
    <app-toolbar>Menu</app-toolbar>
    <!-- Nav on mobile: side nav menu -->
    <paper-listbox selected="[[page]]" attr-for-selected="name">
      <template is="dom-repeat" items="{{items}}">
      <a href="[[rootPath]]{{item.route}}" class="link">
        <paper-item name$="{{item.route}}">{{item.label}}</paper-item>
        </a>
      </template>
    </paper-listbox>
  </app-drawer>
  <app-header-layout has-scrolling-region>
    <app-header class="main-header" slot="header">
      <app-toolbar class="heading">
        <paper-icon-button class="menu-button" icon="menu" drawer-toggle hidden$="{{wideLayout}}">
        </paper-icon-button>
        <span class="heading-title">Food Plex</span>
      </app-toolbar>
        <!-- Nav on desktop: tabs -->
        <nav class="tabs-bar" hidden$="{{!wideLayout}}">
          <template is="dom-repeat" items="{{items}}">
          <ul>
        <li><a href="[[rootPath]]{{item.route}}">{{item.label}}</a></li>
         </ul>
          </template>
         </nav>
      </app-toolbar>
      <iron-pages selected="[[page]]" attr-for-selected="name" role="main" fallback-selection="error404">
        <user-home id="userHome" name="user-home"></user-home>
        <vendor-home id="vendorHome" name="vendor-home"></vendor-home>
        <login-form name="login"></login-form>
        <payment-page name="payment"></payment-page>
        <food-order name="order"></food-order>
        <user-orders name="user-orders"></user-orders>
        <vendor-orders name="vendor-orders"></vendor-orders>
        <error-view name="error404"></error-view>
      </iron-pages> 
    </app-header>
  </app-header-layout>
</app-drawer-layout>
<iron-media-query query="min-width: 600px" query-matches="{{wideLayout}}"></iron-media-query>
    `;
  }
  static get properties() {
    return {
      page: {
        type: String,
        observer: '_pageChanged'
      },
      wideLayout: {
        type: Boolean,
        value: false,
        observer: 'onLayoutChange',
      },
      items: {
        type: Array,
        value: function () {
          return [{ label: 'User-Home', route: 'user-home' },{ label: 'Vendor-Home', route: 'vendor-home' },{ label: 'Login', route: 'login' }, { label: 'Payment', route: 'payment' },{ label: 'Order', route: 'order' },{ label: 'MyOrders', route: 'user-orders' },{ label: 'VendorOrders', route: 'vendor-orders' }]
        }
      }
    };
  }
  /**
  *simple observer which is triggered when page property is changed
  *@param {String} newPage value of changed page 
  **/
  _pageChanged(newPage) {
    console.log(newPage)
    //Depending upon the changed page it lazy-imports the url
    switch (newPage) {
      case 'user-home': import('./home/user-home.js')
        break;
      case 'vendor-home': import('./home/vendor-home.js')
        break;
      case 'login': import('./login/login-form.js')
        break;
      case 'payment': import('./payment/payment-page.js')
        break;
      case 'order': import('./orders/food-order.js')
        break;
        case 'user-orders': import('./orders/user-orders.js')
        break;
        case 'vendor-orders': import('./orders/vendor-orders.js')
        break;
      default: import('./error-view.js')
        break;
    }
  }
  /**A simple observer triggers only any changes happens to the properties defined. 
  * Hence a complex observer is required to trigger any changes happens to app (including page load).
  * Hence complex triggers is required to define to observe changes on first time page load.
  **/
  static get observers() {
    return ['_routerChanged(routeData.page)']
  }
  /**
   * @author: Abhinav
   *@param {String} page Value of new page
  **/
  _routerChanged(page) {
    console.log(page)
    this.page = page || 'login';
  }
  /**
   *onLayoutChange() is a simple observer which is triggered when wideLayout Property is changed.
   It closes the drawer if the layout is wider than 600px
   *@param {Boolean} wide tells that layout is wide or not? it's a value in true or false
  **/
  onLayoutChange(wide) {
    var drawer = this.$.drawer;

    if (wide && drawer.opened) {
      drawer.opened = false;
    }
  }
}

window.customElements.define('food-plex', FoodPlex);

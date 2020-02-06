import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '../shared/smart-accordian.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '../shared/API/ajax-call.js';
/**
 * @customElement
 * @polymer
 */
class PaymentPage extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
  
    /* Credit Card */
    .credit-card {
      width: 360px;
      height: 400px;
      margin: 20px auto 0;
      border: 1px solid #ddd;
      border-radius: 6px;
      background-color: #fff;
      box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, .10);
    }
    .form-header {
      height: 60px;
      padding: 20px 30px 0;
      border-bottom: 1px solid #e1e8ee;
  }
   
  .form-body {
      height: 340px;
      padding: 30px 30px 20px;
  }
  .title {
      font-size: 18px;
      margin: 0;
      color: #5e6977;
  }
  .card-number,
  .cvv-input input,
  .month select,
  .year select {
      font-size: 14px;
      font-weight: 100;
      line-height: 20px;
  }
   .year
   {
     position:relative;
   }
  .card-number,
  .month select,
  .year select {
      font-size: 14px;
      font-weight: 100;
      line-height: 20px;
  }
   
  .card-number,
  .cvv-details,
  .cvv-input input,
  .month select,
  .year select {
      opacity: .7;
      color: #86939e;
  }
  .card-number {
      width: 100%;
      margin-bottom: 20px;
      padding-left: 20px;
      border: 2px solid #e1e8ee;
      border-radius: 6px;
  }
  .month select,
  .year select {
      width: 145px;
      margin-bottom: 20px;
      padding-left: 20px;
      border: 2px solid #e1e8ee;
      border-radius: 6px;
      background-position: 85% 50%;
      float: right;
      float: left;
    }
  .cvv-input input {
      float: left;
      width: 145px;
      padding-left: 20px;
      border: 2px solid #e1e8ee;
      border-radius: 6px;
      background: #fff;
  }
   
  .cvv-details {
      font-size: 12px;
      font-weight: 300;
      line-height: 20px;
      float: right;
      margin-bottom: 20px;
  }
  .cvv-details p {
      margin-top: 6px;
  }
  .proceed-btn {
      margin-bottom: 10px;
      background: #7dc855;
      cursor: pointer;
      font-size: 16px;
      width: 100%;
      border-color: transparent;
      border-radius: 6px;
  }
  .proceed-btn a {
      text-decoration: none;
      color: #fff;
  }
   
  paper-input
  {
    width:300px;
  }
  iron-icon
  {
  position:absolute;
  right:5%;
  }
  </style>
  <ajax-call id="ajax"></ajax-call>
  <smart-accordion>
    <div slot="summary">Credit Card/Debit Card</div>
    <ul>
      <form class="credit-card">
        <div class="form-header">
          <h4 class="title">Credit card detail</h4>
        </div>
  
        <div class="form-body">
          <!-- Card Number -->
          <input type="text" class="card-number" placeholder="Card Number">
  
          <!-- Date Field -->
          <div class="date-field">
            <div class="month">
              <select name="Month">
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </select>
            </div>
            <div class="year">
              <select name="Year">
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2024">2025</option>
                <option value="2024">2026</option>
                <option value="2024">2027</option>
                <option value="2024">2028</option>
              </select>
            </div>
          </div>
  
          <!-- Card Verification Field -->
          <div class="card-verification">
            <div class="cvv-input">
              <input type="text" placeholder="CVV">
            </div>
            <div class="cvv-details">
              <p>3 or 4 digits usually found <br> on the signature strip</p>
            </div>
          </div>
  
          <!-- Buttons -->
          <paper-button type="submit"  on-click="_handleSubmit" raised class="proceed-btn">Proceed</paper-button>
        </div>
      </form>
    </ul>
  </smart-accordion>
  <smart-accordion>
    <div slot="summary">UPI ID</div>
    <paper-input label="Enter your upi"><div slot="suffix">@upi</div></paper-input>
    <paper-button type="submit"  on-click="_handleSubmit" raised class="upi-btn">Proceed</paper-button>
  </smart-accordion>
  <smart-accordion>
    <div slot="summary">Wallets</div>
    <paper-input label="Enter your upi" id="upiId"><div slot="suffix">@upi</div></paper-input>
    <paper-radio-group selected="phonePe" id="payment">
      <paper-radio-button name="PhonePe">PhonePe</paper-radio-button>
      <paper-radio-button name="PayTM">PayTM</paper-radio-button>
      <paper-radio-button name="GooglePay">GooglePay</paper-radio-button>
  </paper-radio-group>
  <paper-button type="submit" on-click="_handleSubmit" class="wallet-btn" raised>Proceed</paper-button>
  </smart-accordion>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'payment-page'
      },
    postObj:Object
    };
  }
  _handleSubmit(){
    const upiId=this.$.upiId.value;
    const paymentMode=this.$.payment.selected;
    this.postObj={upiId,paymentMode}
    let orderList=[]
    orderList.push(JSON.parse(sessionStorage.getItem('orderDetailsObj')));
    this.postObj.orderList=orderList;
    console.log(this.postObj);
    this.$.ajax._makeAjaxCall('post',`http://10.117.189.208:8085/foodplex/users/${sessionStorage.getItem('userId')}/order`,this.postObj,'payments')  

  }
  ready() {
    super.ready();
    this.addEventListener('payments-page', (e) => this._payments(e))
  }
  _payments(event){
     let order=event.model.data
    alert(`Your order of ${order.totalPrice} is confirmed with OrderID ${order.orderDetailId}`)
  }
}

window.customElements.define('payment-page', PaymentPage);

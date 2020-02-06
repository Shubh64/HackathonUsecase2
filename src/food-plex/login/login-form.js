import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-form/iron-form.js';
import '../shared/API/ajax-call.js';
import '@polymer/app-route/app-location.js';
/**
 * @customElement
 * @polymer
 */
class LoginForm extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          height:80.8vh;
          overflow-y:hidden;
          background-size:cover;
        }
        .form
        {
          background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
          width:40%;
          margin:70px auto;
          padding:15px;
          box-shadow:0px 0px 5px 5px;
        }
        span{
          display:flex;
          margin-top: 10px;
          justify-content: center;
        }
      </style>
      <app-location route={{route}}></app-location>
      <paper-toast text={{message}} id="toast"></paper-toast>
      <ajax-call id="ajax"></ajax-call>
      <iron-form>
      <form class="form">
      <paper-input id="mobileNo" label="Mobile Number"></paper-input>
      <paper-input id="password" label="Password"></paper-input>
      <span>
      <paper-button on-click="_signIn" raised id="loginBtn">LogIn</paper-button></span>
      </form>
      </iron-form>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'login-form'
      },
      message:{
        type:String,
        value:''
      }
    };
  }
  ready()
  {
    super.ready();
    this.addEventListener('login-status', (e) => this._loginStatus(e))
  }
  _signIn(event)
  {
    const mobileNumber = this.$.mobileNo.value;
    const password = this.$.password.value;
    const postObj={mobileNumber,password}
    this.$.ajax._makeAjaxCall('post',`http://10.117.189.208:8085/foodplex/users`,postObj,'login')  
    
  } 
  _loginStatus(event)
  {
    const data=event.detail.data;
    this.message=`${data.message}`
    this.$.toast.open();
      sessionStorage.setItem('userId',data.userId)
      if(data.role=='USER')
      this.set('route.path','./user-home')
      else if(data.role=='VENDOR')
      this.set('route.path','./vendor-home')
  }
  connectedCallback(){
    super.connectedCallback();
    let currentImage = 0;
    let images = [
      "url(../../../images/carousal2.jpg)",
      "url(../../../images/login.jpg)",
      "url(../../../images/carousal3.jpg)"
    ];
    let nextImage = () => {
      currentImage = (currentImage + 1) % images.length;
      this.shadowRoot.host.style.background = images[currentImage];
      this.shadowRoot.host.style.backgroundSize = 'cover';
      setTimeout(nextImage, 5000)
    }
      nextImage();
  }
}

window.customElements.define('login-form', LoginForm);

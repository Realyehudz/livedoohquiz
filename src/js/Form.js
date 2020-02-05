import '../css/form.css';
import EventManager from '../../dist/lib/bean-master/bean.min';

class Form {
  constructor() {
    this.createHtml();
    this.setupEvents();
  }

  createHtml() {
    this.container = document.createElement('div');
    this.container.className = 'formContainer display-flex-center';
    this.container.innerHTML = `
      <form class="display-flex-center">
        <div class="wrapper">
          <input id="name" placeholder="Name" type="text" class="form-input name" required autofocus/>
          <label id="name-label" for="name" class="requiredField hidden">Required</label> 
          <input id="last-name" placeholder="Last Name" type="text" class="form-input last-name" required/>
          <label id="last-name-label" for="last-name" class="requiredField hidden">Required</label> 
          <input id="email" placeholder="email" type="email" class="form-input email" required/>
          <label id="email-label" for="email" class="requiredField hidden">Required</label> 
          <input id="checkbox" type="checkbox" name="newsletter" class="input-checkbox" />
          <label for="newsletter">Subscribe to Newsletter</label> 
        </div>
        
        <div class="submit-btn disabled">Submit</div>
      </form>
    `
    document.body.appendChild(this.container);

  }

  setupEvents() {
    let name = document.querySelector('#name');
    let lastName = document.querySelector('#last-name');
    let email = document.querySelector('#email');
    let checkbox = document.querySelector('#checkbox');

    this.submitBtn = document.querySelector('.submit-btn');
    EventManager.on(this.submitBtn, 'click touchstart', ()=> {
      this.setPostData(name.value, lastName.value, email.value, checkbox.checked);
    });

    EventManager.on(name, 'blur', ()=> {
      if (!name.value) document.querySelector('#name-label').classList.remove('hidden');
    });

    EventManager.on(name, 'keydown', ()=> {
      if (name.value) document.querySelector('#name-label').classList.add('hidden');
      this.enableSubmitButton(name, lastName, email);
    });

    EventManager.on(lastName, 'blur', ()=> {
      if (!lastName.value) document.querySelector('#last-name-label').classList.remove('hidden');
    });
    
    EventManager.on(lastName, 'keydown', ()=> {
      if (lastName.value) document.querySelector('#last-name-label').classList.add('hidden');
      this.enableSubmitButton(name, lastName, email);
    });

    EventManager.on(email, 'blur', ()=> {
      if (!email.value) document.querySelector('#email-label').classList.remove('hidden');
    });
    
    EventManager.on(email, 'keydown', ()=> {
      if (email.value) document.querySelector('#email-label').classList.add('hidden');
      this.enableSubmitButton(name, lastName, email);
    });
  }

  enableSubmitButton(name, lastName, email) {
    if (name.value !=='' && lastName.value !== '' && email.value !== '') this.submitBtn.classList.remove('disabled');
    else this.submitBtn.classList.add('disabled');
  }

  setPostData(name, lastName, email, checkbox) {
    let postData = {
        "email_address": email,
        "status": (checkbox) ? 'subscribed' : 'pending',
        "merge_fields": {
            "FNAME": name,
            "LNAME": lastName
        }
      }
      this.processAuthRequest(postData);
  }

  /**
   * 
   * @param {Object} postData // This is what mailChimp requiers as an object to add a new subscriber 
   */
  processAuthRequest(postData) {
    //Auth requierments for mailChimp API conncetion
    const regionName = 'us4'
    const apiKey = 'd61c482e5f75be326481aaf715e343e1-us4'; // Enter you mailChimp API key
    const listId = '29f064e332'; // Enter your list you want to add members to.
    const username = 'yeduz'; // this is optional depending on which method you are doing the POST request
    const url = `https://cors-anywhere.herokuapp.com/https://${regionName}.api.mailchimp.com/3.0/lists/${listId}/members/`;
    // const url = `https://${regionName}.api.mailchimp.com/3.0/lists/${listId}/members/`;


    // Ajax POST request to mailchimp API

    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('content-type', 'application/json');
    request.setRequestHeader('Authorization', `Basic ${apiKey}`);
    request.send(JSON.stringify(postData));


    this.success();

    // this.error();
  }

  success() {
    this.container.innerHTML = '';
    let message = document.createElement('div');
    message.className = 'endMessage';
    message.innerText = 'Success, Thank you for your participation.';

    this.container.appendChild(message);

    this.createReloadButton();
  }

  error() {
    this.container.innerHTML = '';
    let message = document.createElement('div');
    message.className = 'endMessage';
    message.innerText = 'Error submiting your information, please try again.';

    this.container.appendChild(message);

    this.createReloadButton();
  }

  createReloadButton() {
    let reloadButton = document.createElement('div');
    reloadButton.classList = 'reloadButton';
    reloadButton.innerText = 'Reload test';

    this.container.appendChild(reloadButton);

    EventManager.on(reloadButton, 'click touchstart', ()=> {
      location.reload();
    });
  }
}

export default Form;
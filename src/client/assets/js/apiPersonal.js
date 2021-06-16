import { base_url } from './consts.js';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const res = urlParams.get('res');
export const getProfile = async() => {
  const result =  await call(`${base_url}/users/profile`, 'GET');
  const profile = result.profile[0]
  if(result.name !== 'JsonWebTokenError' && res == 'personal'){ 
    createPersonal(profile);
  }
  else{
    return profile;
  }
};
export const createPersonal = (profile) =>{
  const $signSection = document.querySelector('.sign');
  const $wishlist = document.querySelector('.wishlist');
  const $personal = document.querySelector('.personal');

  
  if($signSection){
    if(res == 'personal'){
      $signSection.style.display ='none';
      $wishlist.style.display ='none';
      let str = '';
      str += `
      <div class="personal__title">
        Update Personal Details
      </div>
        <form class='personal__form' action="" method="post">
          <div class = 'personal__form__wrapper'>
           <div class = 'personal__form__wrapper__item'>
            <label for="text">FirstName</label><br>
            <input class='fname' type="text" name="fname" value='${profile.firstName != null ? profile.firstName : "Type Your First Name please"}' required><br>
          </div>
          <div class = 'personal__form__wrapper__item'>
            <label for="text">LastName</label><br>
            <input class='lname' type="text" name="lname" value='${profile.LastName != null ? profile.LastName : "Type Your Last Name please"}' required><br>
          </div>
          <div class = 'personal__form__wrapper__item'>
            <label for="text">Telephone Nummber</label><br>
            <input class='phone' type="text" name="phone" value='${profile.mobileNumber != null ? profile.mobileNumber : "Type Your mobile number please"}' required><br>
          </div>
          <div class = 'personal__form__wrapper__item'>
            <label for="text">Your Address</label><br>
            <input class='address' type="text" name="address" value='${profile.addressLine != null ? profile.addressLine : "Type Your address please"}' required><br>
          </div>
            <!-- submit button -->
            <button class="btn btn--big js-updatePersonal" type="button">Update</button>
          </div>
          
        </form>
      `;
      $personal.innerHTML = str;
      const $updatePersonalBtn = document.querySelector('.js-updatePersonal');
      const $personalFirstName = document.querySelector('.fname');
      const $personalLastName = document.querySelector('.lname');
      const $personalPhone = document.querySelector('.phone');
      const $personalAddress = document.querySelector('.address');
          

      //update pesonal database
      if($updatePersonalBtn){
        $updatePersonalBtn.addEventListener('click', async(e) => {
          e.preventDefault();
          const firstName = $personalFirstName.value;
          const lastName = $personalLastName.value;
          const phone = $personalPhone.value;
          const address = $personalAddress.value;
          const info = {profile: {firstName: firstName, lastName: lastName, mobileNumber:phone, addressLine:address}}
          console.log(info);
          await updatePersonal(info);
        })
  }
    }
    if(!res && res != 'personal'){
      this.$signSection.style.display ='block'
      this.$personal.style.display ='none';
      this.$wishlist.style.display ='none';
    }
  }
};
export const updatePersonal = async(info)=> {
  const body = JSON.stringify(info);
  console.log(body);
  return await call(`${base_url}/users/profile`, 'PUT', body);
};

const call = async(url, method, body) =>{
  const token = window.localStorage.getItem('token');
  const options = { method: method, headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}};
  
  if(body) {
    options.body = body;
  }
  const data =await fetch(url, options);
  const json =await data.json();
  // if(json.name === 'TokenExpiredError'){
  //   await this.logOut();
  //   alert('Session expired, please login');
  // }

  return json;
};
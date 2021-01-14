import React, { Component } from 'react'
import HarbourList from './HarbourList';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(`response ${response}`)
  localStorage.setItem('login',true)
  document.getElementById('GoogleLogin').remove()
  document.getElementById('search').disabled = false;
  localStorage.setItem("latitude","22.1");
  localStorage.setItem("longitude","23.1");
  localStorage.setItem("radius", "5.0");
  
  
}

const find =()=>{
if (localStorage.login){ 
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
}
}
const showPosition=(position)=>
{ 
  console.log(position)
  if (position)
  {localStorage.setItem("latitude",position.coords.latitude);
  localStorage.setItem("longitude",position.coords.longitude);
  
  localStorage.setItem("radius", '5')
}
}


export default class App extends Component {

  render() {
    return (
<div class="container">
      <div id='GoogleLogin'>
    
        <GoogleLogin
    clientId="349661957982-v4d9jqh60g6j64kqhdqe011k80tff03h.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    cookiePolicy={'single_host_origin'}
    />
    </div>
    <div className='search' >
    <input type= 'radius' text ="5.0" placeholder ="5.0"></input>
      <button  value ="submit" onClick={find}  >Search</button>
                
            </div>
            <HarbourList/>
</div>
    
    

    
    )
  }
}


export const base_url = 'http://localhost:6002';

export const call = async(url, method, body) =>{
  const token = window.localStorage.getItem('token');
  const options = { method: method, headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}};
  
  if(body) {
    options.body = body;
  }
  const data =await fetch(url, options);
  const json =await data.json();
 
  if(json.name === 'TokenExpiredError'){
    window.localStorage.removeItem('token');
    alert('Session expired, please login');
    window.location.href = "http://127.0.0.1:5500/src/client/signUp_In.html";
  }
  return json;
};
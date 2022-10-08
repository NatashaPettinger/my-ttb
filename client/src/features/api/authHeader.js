export default function authHeader(token) {
    //const user = JSON.parse(localStorage.getItem('user'));
  
    if (token) {
      return { 'x-auth-token': token };
    } else {
      return {};
    }
  }
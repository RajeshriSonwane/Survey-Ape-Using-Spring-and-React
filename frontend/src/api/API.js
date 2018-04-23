const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};

//signup
export const signup = (payload) =>
fetch(`${api}/signup`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  credentials:'include',
  body: JSON.stringify(payload)
}).then(res=>res.json())
.then(res => {
  return res;
})
.catch(error => {
  console.log("This is signup error");
  return error;
});

//sign in
export const checklogin = (payload) =>
fetch(`${api}/signin`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
    credentials:'include',
  body: JSON.stringify(payload)
}).then(res=>res.json())
.then(res => {
  return res;
})
.catch(error => {
  console.log("This is login error");
  return error;
});

//logout
export const logout = () =>
    fetch(`${api}/logout`, {
      method: 'POST',
      headers: {
          ...headers,
          'Content-Type': 'application/json'
      },
        credentials:'include'
            }).then(res => {
                return res;
            }).catch(error => {
                    console.log("This is error");
                    return error;
                });








// create general survey
export const createGeneral = (payload) =>
fetch(`${api}/creategeneral`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  //credentials:'include',
  body: JSON.stringify(payload)
}).then(res=>res.json())
.then(res => {
  return res;
})
.catch(error => {
  console.log("This is create general survey error");
  return error;
});

// get general survey by id
export const getGeneral = (payload) =>
fetch(`${api}/getsurvey/`+payload, {
  method: 'GET',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  //credentials:'include',
  //body: JSON.stringify(payload)
}).then(res=>res.json())
.then(res => {
  return res;
})
.catch(error => {
  console.log("This is get survey error");
  return error;
});

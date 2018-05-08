const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};

//signup
export const signup = (payload) =>
    fetch(`${api}/user/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is signup error");
            return error;
        });

//sign in
export const checklogin = (payload) =>
    fetch(`${api}/user/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is login error" + error);
            return error;
        });

//verify user account
export const verifyUser = (payload) =>
    fetch(`${api}/user/verifyUser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("Unable to verify user" + error);
            return error;
        });


export const registerUser = (payload) =>
    fetch(`${api}/user/registerUser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is signup error");
            return error;
        });

//register user for open survey
export const registerOpenUser = (payload) =>
    fetch(`${api}/user/registerOpenUser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            console.log("This is registerOpenUser result" + res);
            return res;
        })
        .catch(error => {
            console.log("This is registerOpenUser error" + error);
            return error;
        });

//logout
export const logout = () =>
    fetch(`${api}/user/logout`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error" + error);
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
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is create general survey error");
            return error;
        });


// create closed survey
export const createClosed = (payload) =>
    fetch(`${api}/createclosed`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is create closed survey error");
            return error;
        });

// create open survey
export const createOpen = (payload) =>
    fetch(`${api}/createopen`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is create closed survey error");
            return error;
        });


// get general survey by id
export const getGeneral = (payload) =>
    fetch(`${api}/getsurvey/` + payload, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        //body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is get survey error");
            return error;
        });


// get closed survey by survey id and user
export const getClosed = (sid, uid) =>
fetch(`${api}/getsurvey/` + sid + "?user=" + uid, {
  method: 'GET',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  //body: JSON.stringify(payload)
}).then(res => res.json())
.then(res => {
  return res;
})
.catch(error => {
  console.log("This is get survey error");
  return error;
});



export const giveOpenSurvey = (sid,gid) =>
    fetch(`${api}/giveOpenSurvey/` + sid + "?guest=" + gid, {

        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        //body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
          console.log(res);
            return res;
        })
        .catch(error => {
            console.log("This is get giveOpenSurvey error");
            return error;
        });

// get general survey by id
export const getOpenSurveys = (payload) =>
    fetch(`${api}/getOpenSurveys`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            console.log("JSON result -" + res[0].surveyTitle + res[0].surveyId);
            return res;
        })
        .catch(error => {
            console.log("This is get open survey error" + error);
            return error;
        });





// publish survey
export const publishSurvey = (payload) =>
    fetch(`${api}/publish`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is publish survey error");
            return error;
        });


// unpublish survey
export const unpublishSurvey = (payload) =>
    fetch(`${api}/unpublish`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is unpublish survey error");
            return error;
        });


// close survey
export const closeSurvey = (payload) =>
    fetch(`${api}/close`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is end survey error");
            return error;
        });


// get all surveys created by a user
export const allSurveys = (payload) =>
    fetch(`${api}/getallsurveys/`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        //body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is get survey error");
            return error;
        });


// edit survey - add more questions/users
export const editSurvey = (payload, sid) =>
    fetch(`${api}/editsurvey/` + sid, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is edit survey error");
            return error;
        });

// open survey - logged in users
export const getOpenSurveyQuestion = (payload, sid) =>
    fetch(`${api}/getOpenSurveyQuestion/` + sid, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(error => {
            console.log("This is getOpenSurveyQuestion survey error" + error);
            return error;
        });




/* SURVEY STATS APIs */

// get survey by id
export const getSurveyDetails = (id) =>
    fetch(`${api}/getsurveydetails/`+ id, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
      //  body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(error => {
            console.log("This is get open survey error" + error);
            return error;
        });

// save response - general & closed survey
export const saveResponse = (payload) =>
    fetch(`${api}/createResponse`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is create general survey error");
            return error;
});

// save response - open survey
export const saveOpenResponse = (payload) =>
    fetch(`${api}/createOpenResponse`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is create general survey error");
            return error;
        });

// save complete survey
export const saveSurvey = (payload) =>
    fetch(`${api}/completeResponse`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is create general survey error");
            return error;
        });


// get all surveys started by a user
export const startedSurveys = (payload) =>
fetch(`${api}/startedsurveys/`, {
  method: 'GET',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  credentials: 'include'
  //body: JSON.stringify(payload)
}).then(res => res.json())
.then(res => {
  return res;
})
.catch(error => {
  console.log("This is get survey error");
  return error;
});


// get user details for auto populate
export const getUserDetails = (payload) =>
    fetch(`${api}/getuserdetails/`, {
        method: 'GET',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        //body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is get getUserDetails error");
            return error;
        });


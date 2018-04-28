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
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("This is login error" + error);
            return error;
        });

export const verifyUser = (payload) =>
    fetch(`${api}/user/verifyUser`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res.status;
    })
        .catch(error => {
            console.log("Unable to verify user" + error);
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
        credentials: 'include'
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
        //credentials:'include',
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
        //credentials:'include',
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
        //credentials:'include',
        //body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is get survey error");
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
        //credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is create publish survey error");
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
        //credentials:'include',
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
        //credentials:'include',
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
        //credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => res.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log("This is edit survey error");
            return error;
        });

import { api } from "../config.json"

export default async (form) => {
    let response = await fetch(api + '/inscription', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(form)
    });

    return response.json();
};

// // Code for registering
// (async() => {
//     let { code, status, message, data } = await register({
//         email: 'jesuisuntest6@exemple.com', 
//         password: '123456789'
//     });
//     if(code == "E_USER_ALREADY_EXIST" || status == 400) {
//         console.error('Fail : ' + message);
//     } else {
//         console.log(data);
//         setUser(data);
//     }
// })()
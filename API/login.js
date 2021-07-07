import { api } from "../config.json"

export default async (form) => {
    let response = await fetch(api + '/connection', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(form)
    });
    
    return await response.json();
};
// // Code for login
// useEffect(() => {
//     (async() => {
//         let { code, status, message, data } = await login({
//             email: 'jesuisuntest6@exemple.com', 
//             password: '123456789'
//         });
//         console.log(code, status, message, data)
//         if(code == "S_LOGGED" && status == 200) {
//             console.log(data);
//             setToken(data.token);
//         } else {
//             console.error('Fail : ' + message);
//         }
//     })();
// }, []);
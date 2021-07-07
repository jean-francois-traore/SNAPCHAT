import { api } from "../config.json"

export default async (token) => {
    let response = await fetch(api + '/all', {
        method: "GET",
        headers: { 
            'Content-Type': 'application/json',
            token
        },
        mode: 'cors',
        cache: 'default',
    });

    return response.json();
};
// // Code for all
// useEffect(() => {
//     (async() => {
//         if(!token) {
//             let { code, status, message, data } = await login({
//                 email: 'jesuisuntest6@exemple.com', 
//                 password: '123456789'
//             });
//             console.log(code, status, message, data)
//             if(code == "S_LOGGED" && status == 200) {
//                 console.log(data);
//                 setToken(data.token);
//             } else {
//                 console.error('Fail : ' + message);
//             }
//         } else {
//             let { code, status, message, data } = await getUsers(token);
//             if(code == "S_LIST_USERS" && status == 200) {
//                 console.log(data);
//             } else {
//                 console.log({error: message, code});
//             }
//         }
//     })();
// }, [token]);
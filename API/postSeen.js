import { api } from "../config.json"
export default async (token, id) => {

    let response = await fetch(api + '/seen', {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            token
        },
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({id})
    });
    return response.json();
};

// (async () => {
//     let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwYWU1MTU0NjAzZjQzMmMxNGZhZTEyMiIsImVtYWlsIjoicmljYXJkb0BnbWFpbC5jb20ifSwiaWF0IjoxNjIyMDM2ODc4fQ.UzD8EaMMiqVMqEo1abvbkEfIOUFPBUNtDV5X5uRb67U"
//     let { code, status, message, data } = await postSeen(token, '60af56e4603f432c14fae148');
//     if(code == 'S_DELETE_SNAP' && status == 200){
//         console.log("snap supprimer");
//     }else{
//         console.log('snap pas supprimer');
//     }
// })() 
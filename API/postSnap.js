import { api } from "../config.json"

export default async (token, form) => {
    
    const formData = new FormData();
    formData.append("duration", form.duration ? form.duration : 5);
    formData.append("to", form.to);
    formData.append("image", form.image);

    let response = await fetch(api + '/snap', {
        method: "POST",
        headers: { 
            'Content-Type': 'multipart/form-data',
            token
        },
        mode: 'cors',
        cache: 'default',
        body: formData
    });

    return response.json();
};

// // postSnap example :
// const [token, setToken] = useState(null);
// const [perm, setPerm] = useState(null);
// const [image, setImage] = useState(null);

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
//             if(!perm) {
//                 await ImagePicker.requestCameraPermissionsAsync()
//                 .then(res => {
//                     console.log(res);
//                     setPerm(true)
//                 })
//                 .catch((err) => setPerm(false));
//             } else {
//                 if(!image) {
//                     let image = await ImagePicker.launchCameraAsync()
//                     .then((result) => {
//                         if(result.cancelled) return;
//                         let localUri = result.uri;
//                         let filename = localUri.split('/').pop();
                      
//                         // Infer the type of the image
//                         let match = /\.(\w+)$/.exec(filename);
//                         let type = match ? `image/${match[1]}` : `image`;

//                         return { uri: localUri, name: filename, type }
//                     })
//                     .catch((err) => console.error(err))

//                     setImage(image)
//                 } else {
//                     console.log(image)
//                     let response = await postSnap(token, {to: 'jesuisuntest2@gmail.com', image});
//                     console.log(response)
//                     setImage(null);
//                 }
//             }
//         }
//     })();
// }, [token, perm, image]);
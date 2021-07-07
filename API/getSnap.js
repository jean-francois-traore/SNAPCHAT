import { api } from "../config.json"

export default async (token, id) => {
    let response = await fetch(api + '/snap/' + id, {
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

// //Example for getSnap()
// export default function App() {
// 	const [token, setToken] = useState(null);
// 	const [image, setImage] = useState(null);
// 	const [base64, setBase64] = useState(null);

// 	useEffect(() => {
// 		(async() => {
// 			if(!token) {
// 				let { code, status, message, data } = await login({
// 					email: 'jesuisuntest6@exemple.com', 
// 					password: '123456789'
// 				});
// 				console.log(code, status, message, data)
// 				if(code == "S_LOGGED" && status == 200) {
// 					console.log(data);
// 					setToken(data.token);
// 				} else {
// 					console.error('Fail : ' + message);
// 				}
// 			} else if (!image) {
// 				let {code, status, message, data} = await getSnap(token, "60ab9d57603f432c14fae095");

// 				if(code == "S_SNAP" && status == 200) {
// 					setImage(data.image)
// 				} else {
// 					console.error('Fail : ' + message);
// 				}
// 			} else if (!base64) {
// 				console.log('WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
// 				let buf = new Buffer(image.data.data);
// 				setBase64(await buf.toString('base64'));
// 			} else {
// 				console.log('base64 :' + base64)
// 			}
		
// 		})();
// 	}, [token, image, base64]);

// 	return (
// 		<View style={styles.container}>
// 			<Text>Hello world !</Text>
// 			<StatusBar style="auto" />
// 			{base64 ? 
// 				<Image style={{width: 200, height: 200}} source={{uri: `data:image/png;base64,${base64}`}} />
// 				: null
// 			}
// 		</View>
// 	);
// }
import { api } from "../config.json"

export default async (token) => {
    let response = await fetch(api + '/snaps', {
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

// // Example for getSnaps();
// export default function App() {
// 	const [token, setToken] = useState(null);
// 	const [snaps, setSnaps] = useState(null);

// 	useEffect(() => {
// 		(async() => {
// 			if(!token) {
// 				let { code, status, message, data } = await login({
// 					email: 'jesuisuntest2@gmail.com', 
// 					password: '123456789'
// 				});
// 				console.log(code, status, message, data)
// 				if(code == "S_LOGGED" && status == 200) {
// 					console.log(data);
// 					setToken(data.token);
// 				} else {
// 					console.error('Fail : ' + message);
// 				}
// 			} else if(!snaps) {
// 				console.log('here');
// 				let { code, status, message, data } = await getSnaps(token);
// 				if(code == "S_SNAPS" && status == 200) {
// 					setSnaps(data);
// 				} else {
// 					console.error('Fail in getSnaps() :' + message);
// 				}

// 			}
// 		})();
// 	}, [token]);
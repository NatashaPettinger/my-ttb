import React from "react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const api = axios.create({
    //baseURL: 'http://localhost:8000/api',
    baseURL: 'https://my-ttb-production.up.railway.app',
})

const getToken = payload => api.post('/login', payload);
const signup = payload => api.post('/signup', payload);

const AuthContext = React.createContext(null);

export function AuthProvider ({ children }){
    const navigate = useNavigate();
    const location = useLocation();

    const [token, setToken] = React.useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = React.useState();

    const handleAuthCheck = storedData => {
        setToken(storedData.token);
        setTokenExpirationDate(storedData.expirationTime);
        const desination = location.pathname;
        navigate(desination);
    }

    const handleLogin = async (payload) => {
        try {
            const token = await getToken(payload);
        
            const expiration = new Date(new Date().getTime() + 1000 * 60  * 60);
            setTokenExpirationDate(expiration);

            setToken(token.data.token);
            localStorage.setItem(
                "userData",
                JSON.stringify({
                        token: token.data.token,
                        expirationTime: expiration.toISOString()
                })
            );

            navigate('/raw-materials');
        } catch (error) {
            console.log(error.response.data)
        }
    };

    const handleSignup = async (payload) => {
        try {
            const token = await signup(payload);
            
            const expiration = new Date(new Date().getTime() + 1000 * 60  * 60);
            setTokenExpirationDate(expiration);
    
            setToken(token.data.token);
            localStorage.setItem(
                "userData",
                JSON.stringify({
                        token: token.data.token,
                        expirationTime: expiration.toISOString()
                })
            );
    
            navigate('/raw-materials');
            
        } catch (error) {
            console.log(error.res.data)
        }
    };

    const handleLogout = () => {
        setToken(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
        navigate('/');
    };

    React.useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));    
        if (storedData && storedData.token && new Date(storedData.expirationTime) > new Date()){
            handleAuthCheck(storedData)
        }}, []);
        //but need to be able to call it when you go to protected routes...
        
    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
        onCheck: handleAuthCheck,
        onSignup: handleSignup,
    };

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
};

export default function useAuth () {
  return React.useContext(AuthContext);
};






/* 
function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    async login(payload){
        const res = await api.post('/login', payload);
        console.log(res.data.token)
        if (res.data.token) {
            localStorage.setItem("user", JSON.stringify(res.data.token));
            setAuthed(true);
        }
        return res.data.token;
    },
    logout() {
        setAuthed(false);
        localStorage.removeItem('user');
    },
  };
}

const authContext = React.createContext('');

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
} */
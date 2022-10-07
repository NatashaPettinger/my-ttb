import React from "react";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

const getToken = payload => api.post('/login', payload);

const AuthContext = React.createContext(null);

export function AuthProvider ({ children }){
    const navigate = useNavigate();
    const location = useLocation();

    const [token, setToken] = React.useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = React.useState();

    const handleAuthCheck = storedData => {
        console.log(location)
        setToken(storedData.token);
        setTokenExpirationDate(storedData.expirationTime);
        const desination = location.pathname;
        navigate(desination);
    }

    const handleLogin = async (payload) => {
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
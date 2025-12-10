import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from './util/APIUtils';
import Login from './user/login/Login';
import Profile from './user/profile/Profile';
import OAuth2RedirectHandler from './user/oauth2/OAuth2RedirectHandler';
import { ACCESS_TOKEN } from './constants/constants';
import type {User} from "./types/User";


function App() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    const loadCurrentUser = () => {
        console.log('loadCurrentUser called');
        setIsLoading(true);
        getCurrentUser()
            .then(response => {
                console.log('User loaded successfully:', response);
                setCurrentUser(response);
                setIsAuthenticated(true);
            })
            .catch(error => {
                console.log('Error loading user:', error);
                setIsAuthenticated(false);
                localStorage.removeItem(ACCESS_TOKEN);
            })
            .finally(() => {
                console.log('Setting loading to false');
                setIsLoading(false);
            });
    };

    const handleLogout = () => {
        logoutUser();
        setIsAuthenticated(false);
        setCurrentUser(null);

        navigate('/login' as string);
    };

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        console.log('App useEffect - token check:', token ? 'found' : 'not found');
        if (token) {
            console.log('Found token, attempting to load user');
            loadCurrentUser();
        } else {
            console.log('No token found');
            setIsLoading(false);
        }
    }, []);

    console.log('App render - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/profile" /> : <Login authenticated={isAuthenticated} />}
            />
            <Route
                path="/profile"
                element={
                isAuthenticated && currentUser
                    ? <Profile currentUser={currentUser} onLogout={handleLogout}/>
                    : <Navigate to="/login" />
            }
            />
            <Route
                path="/oauth2/redirect"
                element={<OAuth2RedirectHandler onLoginSuccess={loadCurrentUser} />}
            />
            <Route
                path="/"
                element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />}
            />
        </Routes>
    );
}

export default App;
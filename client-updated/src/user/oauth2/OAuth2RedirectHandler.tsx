import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants/constants.ts';

interface Props {
    onLoginSuccess?: () => void;
}

const OAuth2RedirectHandler = ({ onLoginSuccess }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log('OAuth2RedirectHandler useEffect triggered');
        console.log('Current location:', location.pathname, location.search);

        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token') || urlParams.get('access_token');
        const error = urlParams.get('error');

        console.log('Extracted token:', token);
        console.log('Extracted error:', error);

        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            console.log('Token stored:', token);

            // Verify token was stored
            const storedToken = localStorage.getItem(ACCESS_TOKEN);
            console.log('Verified stored token:', storedToken);

            // Call the parent function to load user data and update state
            if (onLoginSuccess) {
                console.log('Calling onLoginSuccess');
                onLoginSuccess();
            } else {
                console.log('onLoginSuccess not provided');
            }

            // Navigate after a short delay to allow state update
            setTimeout(() => {
                console.log('Navigating to /profile');
                navigate('/profile', { replace: true });
            }, 500); // Increased delay
        } else if (error) {
            console.error('OAuth2 error:', error);
            navigate('/login?error=' + error, { replace: true });
        } else {
            console.error('No token or error received');
            navigate('/login', { replace: true });
        }
    }, [navigate, location, onLoginSuccess]);

    return <div>Processing authentication...</div>;
};

export default OAuth2RedirectHandler;
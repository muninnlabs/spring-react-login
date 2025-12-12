import React, { useState, useCallback } from 'react';
import { setUserPassword } from '../util/APIUtils';

interface SetPasswordProps {
    onPasswordSet: () => void;
}

const SetPassword = ({ onPasswordSet }: SetPasswordProps) => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        try {
            await setUserPassword(password);

            onPasswordSet();

        } catch (err) {
            console.error("Set password error:", err);
            setError('Failed to set password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [password, confirmPassword, onPasswordSet]); // Dependency Array

    return (
        <div className="set-password-form">
            <h2>Set Your Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password-input">Password:</label>
                    <input
                        id="password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password-input">Confirm Password:</label>
                    <input
                        id="confirm-password-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={isLoading || password.length < 6 || password !== confirmPassword}>
                    {isLoading ? 'Setting Password...' : 'Set Password'}
                </button>
            </form>
        </div>
    );
};

export default SetPassword;
import React, { useState, useEffect, useCallback } from "react";
import "./Profile.css";
import type {User} from '../../types/User';

interface ProfileProps {
    currentUser: User;
    onLogout: () => void; // Add logout handler prop
}

const Profile: React.FC<ProfileProps> = ({ currentUser, onLogout }) => {
    const [loading, setLoading] = useState(false);

    const loadCurrentlyLoggedInUserDetails = useCallback(async () => {
        setLoading(true);
        try {
            setLoading(false);
        } catch (error) {
            console.error("Failed to load user details:", error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCurrentlyLoggedInUserDetails();
    }, [loadCurrentlyLoggedInUserDetails]);

    if (loading) {
        return <div className="profile-loading">Loading Profile...</div>;
    }

    return (
        <div className="container">
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card card-body d-flex flex-column align-items-center text-center">
                            <img
                                src={currentUser.imageUrl || '/default-avatar.png'}
                                alt={currentUser.name}
                                className="rounded-circle mb-3"
                                width="150"
                            />
                            <h4>{currentUser.name}</h4>
                            <p className="text-muted">{currentUser.email}</p>
                            <button
                                className="btn btn-danger mt-3"
                                onClick={onLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
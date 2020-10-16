import React, { useContext, useEffect } from 'react';

import { ProfileContext } from '../context/profile-context';
import ProfileControls from '../components/ProfileControls';
import ProfileList from '../components/ProfileList';

const Profiles = props => {
    const { fetchProfiles } = useContext(ProfileContext);

    useEffect(() => {
        fetchProfiles();
    }, [fetchProfiles]);

    return (
        <React.Fragment>
            <h1>User Profiles</h1>
            <ProfileControls />
            <ProfileList />
        </React.Fragment>
    );
}

export default Profiles;
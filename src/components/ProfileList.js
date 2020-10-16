import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { ProfileContext } from '../context/profile-context';
import Card from './UI/Card';

const StyledUl = styled.ul`list-style-type: none;`;
const StyledLi = styled.li`display: inline-block; padding: 10px;`;

const ProfileList = props => {
    const { filteredProfiles } = useContext(ProfileContext);

    const goToProfile = id => {
        props.history.push(`/profile/${id}`);
    };

    let listContent = "Loading profiles...";
    if (filteredProfiles) {
        listContent = filteredProfiles.map(profile => {
            return (
                <StyledLi key={profile.login.uuid}>
                    <Card 
                        image={profile.picture.medium}
                        title={`${profile.name.first} ${profile.name.last}`}
                        subtitle={profile.location.city}
                        clicked={() => goToProfile(profile.login.uuid)}
                    />
                </StyledLi>
            );
        });
    }

    return (
        <StyledUl>
            {listContent}
        </StyledUl>
    );
}

export default withRouter(ProfileList);
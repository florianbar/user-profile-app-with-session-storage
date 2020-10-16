import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { ProfileContext } from '../context/profile-context';
import Button from '../components/UI/Button'

const StyledProfile = styled.div`
    width: 100%;
    max-width: 350px;
    margin: 40px auto 0;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 2px 3px 0px rgba(0,0,0,0.2);
    border-radius: 5px;

    .photo { border-radius: 100%; margin-top: -30px; }
    .title { margin-top: 0; }
    
    .info {
        width: 100%;
        margin: 0 0 10px;
        border-collapse: collapse;
        font-size: 14px;
        text-align: left;
    }
    
    .info tr:nth-child(odd) { background-color: #f5f5f5; } 
    .info tr td { padding: 6px; } 
    
    .info tr td:first-child {
        font-weight: 600;
        text-align: right;
    } 
`;

const Profile = props => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const { getProfile } = useContext(ProfileContext);

    useEffect(() => {
        setProfile(getProfile(props.match.params.id));
        setLoading(false);
    }, [setProfile, setLoading, getProfile, props.match.params.id]);

    const goBack = () => {
        props.history.push("/");
    };

    let profileContent = "Loading profile...";
    if (profile) {
        profileContent = (
            <StyledProfile>
                <img 
                    className="photo"
                    src={profile.picture.large} 
                    alt={`${profile.name.first} ${profile.name.first}`} 
                />
                <h2 className="title">
                    {profile.name.first} {profile.name.last}
                </h2>
                <table className="info">
                    <tbody>
                        <tr>
                            <td>Cell:</td>
                            <td>{profile.cell}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{profile.email}</td>
                        </tr>
                        <tr>
                            <td>Country:</td>
                            <td>{profile.location.country}</td>
                        </tr>
                        <tr>
                            <td>City:</td>
                            <td>{profile.location.city}</td>
                        </tr>
                        <tr>
                            <td>State:</td>
                            <td>{profile.location.state}</td>
                        </tr>
                        <tr>
                            <td>Post Code:</td>
                            <td>{profile.location.postcode}</td>
                        </tr>
                        <tr>
                            <td>Street Name:</td>
                            <td>{profile.location.street.name}</td>
                        </tr>
                    </tbody>
                </table>
                <Button clicked={goBack}>Back</Button>
            </StyledProfile>
        );
    }

    return !loading && !profile ? <Redirect to="/" /> : profileContent;
}

export default Profile;
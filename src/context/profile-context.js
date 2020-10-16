import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export const ProfileContext = React.createContext({
    profiles: null,
    filteredProfiles: null,
    searchValue: "",
    selectedGender: "",
    sortOrder: "",
    fetchProfiles: () => {},
    getProfileHandler: () => {},
    filterProfilesByName: () => {},
    filterProfilesByGender: () => {},
    sortProfiles: () => {}
});

export default props => {
    const [profiles, setProfiles] = useState(null);
    const [filteredProfiles, setFilteredProfiles] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [selectedGender, setSelectedGender] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");

    const fetchProfiles = useCallback(() => {
        if (sessionStorage.getItem("profiles")) {
            console.log("Fetch data from session");
            const sessionProfiles = JSON.parse(sessionStorage.getItem("profiles"));
            setProfiles(sessionProfiles);
        } 
        else {
            console.log("Fetch data from api endpoint");
            axios.get(" https://randomuser.me/api/?results=20")
                .then(response => {
                    const profiles = response.data.results;
                    sessionStorage.setItem("profiles", JSON.stringify(profiles))
                    setProfiles(profiles);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [setProfiles]);

    const getProfile = id => {
        if (profiles) {
            return profiles.find(profile => profile.login.uuid === id);
        }
        return null;
    };

    const updateFilteredProfiles = useCallback(() => {
        let updatedFilteredProfiles = [...profiles];

        // Search by name
        if (searchValue.trim()) {
            updatedFilteredProfiles = profiles.filter(profile => {
                const searchVal = searchValue.toLowerCase();
                const fullname = `${profile.name.first.toLowerCase()} ${profile.name.last.toLowerCase()}`;
                return fullname.includes(searchVal);
            });
        }

        // Filter by gender
        if (selectedGender !== "all") {
            updatedFilteredProfiles = updatedFilteredProfiles.filter(profile => profile.gender === selectedGender);
        }

        // Order by ascending or descending alphabetically
        updatedFilteredProfiles.sort((userA, userB) => {
            if (sortOrder === "asc") {
                return userA.name.first < userB.name.first ? -1 : 1;
            } else {
                return userA.name.first < userB.name.first ? 1 : -1;
            }
        });

        setFilteredProfiles(updatedFilteredProfiles);
    }, [profiles, sortOrder, searchValue, selectedGender]);

    useEffect(() => {
        if (profiles) {
            updateFilteredProfiles();
        }
    }, [profiles, updateFilteredProfiles]);

    const filterProfilesByName = search => {
        setSearchValue(search);
        updateFilteredProfiles();
    };

    const filterProfilesByGender = gender => {
        setSelectedGender(gender);
        updateFilteredProfiles();
    };

    const sortProfiles = () => {
        setSortOrder(sortOrder === "desc" ? "asc" : "desc");
        updateFilteredProfiles();
    };

    return (
        <ProfileContext.Provider value={{
            profiles: profiles,
            filteredProfiles: filteredProfiles,
            searchValue: searchValue,
            selectedGender: selectedGender,
            sortOrder: sortOrder,
            fetchProfiles: fetchProfiles,
            getProfile: getProfile,
            filterProfilesByName: filterProfilesByName,
            filterProfilesByGender: filterProfilesByGender,
            sortProfiles: sortProfiles
        }}>
            {props.children}
        </ProfileContext.Provider>
    );
};
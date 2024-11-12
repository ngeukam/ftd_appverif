import React, {useEffect} from "react";
import { useFetch } from "../../../helpers/hooks";
import UserCardDetails from "./UserCardDetails";
import RouteLoader from "../../common/preloader";
import { useLocation } from 'react-router-dom';
import {
	fetchUserWithWallet,
} from "../../../helpers/backend_helpers";

const UserDetails = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('_id')
    const [userDetails, getUserDetails] = useFetch(fetchUserWithWallet, {_id: id});
    useEffect(() => {
        getUserDetails({_id: id});
    }, [id]);

    if (!getUserDetails) {
        return <RouteLoader/>
    }

    return (
        <UserCardDetails currency_code={"$"} userDetails={userDetails} getUserDetails={getUserDetails}/>
    );
};

export default UserDetails;

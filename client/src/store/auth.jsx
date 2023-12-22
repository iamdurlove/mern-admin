import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ( { children } ) =>
{
    const [ token, setToken ] = useState( localStorage.getItem( "token" ) );
    const [ user, setUser ] = useState( {} );

    const storeToken = ( serverToken ) =>
    {
        setToken( serverToken );
        return localStorage.setItem( "token", serverToken );
    };

    let isLoggedIn = !!token;

    //tackling logout functionality
    const LogoutUser = () =>
    {
        setToken( "" );
        return localStorage.removeItem( "token" );
    };

    // JWT authentication - to get the data of logged in user

    const userAuthentication = async () =>
    {
        try
        {
            const response = await fetch( "http://127.0.0.1:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${ token }`,
                },
            } );
            if ( response.ok )
            {
                const data = await response.json();
                // console.log(data);
                setUser( data.userData );
            }
        } catch ( error )
        {
            console.log( "Error fetching data", error );
        }
    };

    useEffect( () =>
    {
        if ( token )
            userAuthentication();
    }, [ token ] );

    return <AuthContext.Provider value={ { isLoggedIn, storeToken, LogoutUser, user } } >
        { children }
    </AuthContext.Provider>
};

export const useAuth = () =>
{
    const authContextValue = useContext( AuthContext );
    if ( !authContextValue )
    {
        throw new Error( "useAuth must be used within an AuthProvider" );
    }
    return authContextValue;
}
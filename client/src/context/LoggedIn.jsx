import React, { useState, useEffect, createContext } from 'react'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedEmail, setLoggedEmail] = useState('')
    const [searchP, setSearchP] = useState([])
    const [userData, setUserData] = useState([])
    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loggedEmail, setLoggedEmail, searchP, setSearchP, userData, setUserData }}>{children}</AuthContext.Provider>
}
export default AuthProvider
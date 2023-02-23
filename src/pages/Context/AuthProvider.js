import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../Firebase/firebase.config';
export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, SetUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // sign up 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //sign in 
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    //update user
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }
    // google
    const createUserWithGoogle = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    //logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    // onauth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('userIs ovserbing');
            SetUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [])
    const authInfo = {
        createUser,
        signIn,
        updateUser,
        user,
        logOut,
        loading,
        createUserWithGoogle,
        setLoading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;
import React, {useState, useEffect}from 'react';
import { auth } from '../../firebase/config';
import { useHistory } from 'react-router';
import { Spin } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const history = new useHistory();

    useEffect(() => {
        const unsubscibed = auth.onAuthStateChanged((user) => {
            console.log({user});
            if(user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ 
                    displayName, email, uid, photoURL 
                });
                setIsLoading(false);
                history.push('/');
                return;
            }
            
            setIsLoading(false); // Nếu ko sẽ hiện icon loading
            history.push('/login')
        });
        
        //cleanup
        return () => {
            unsubscibed();
        }
    }, [history])


    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <Spin/> : children}
        </AuthContext.Provider>
    )
}

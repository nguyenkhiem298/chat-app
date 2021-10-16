import React, {useContext, useEffect, useState, useMemo} from "react";
import { db } from "../../firebase/config";
import { AuthContext } from "./AuthProvider";

export const RoomsContext = React.createContext();

export default function RoomsProvider({children}) {
    const [rooms, setRooms] = useState([]);

    const {uid} = useContext(AuthContext);

    const uidCondition = useMemo(() => {
        return uid;
    }, [uid])

    useEffect(() => {
        const unsubscibed = db.collection('rooms')
            .orderBy('createAt')
            .where('menbers', 'array-contains', uidCondition)
            .onSnapshot((querySnapshot) => {
                const documents = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                if(documents) {
                    setRooms(documents);
                }
            });
        return unsubscibed;
    }, [uidCondition]);

    return (
        <RoomsContext.Provider value={{rooms}}>
            {children}
        </RoomsContext.Provider>
    )


}
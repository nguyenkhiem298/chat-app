import React, {useContext, useEffect, useState, useMemo} from "react";
import { db } from "../../firebase/config";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

export default function AppProvider({children}) {
    const [rooms, setRooms] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectRoomId, setSelectRoomId] = useState('');

    const {uid} = useContext(AuthContext);

    const uidCondition = useMemo(() => {
        return uid;
    }, [uid])

    useEffect(() => {
        let queryCollections = db.collection('rooms')
            .orderBy('createAt')

            if(!uidCondition || uidCondition.length === 0) {
                return;
            }
            // console.log(uidCondition);
            queryCollections = queryCollections.where('members', 'array-contains', uidCondition)


            const unsubscibed = queryCollections.onSnapshot((querySnapshot) => {
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

    const clearState = () => {
        setIsModalVisible(false);
        setSelectRoomId('');
        // setRooms([]);
    }

    return (
        <AppContext.Provider value={{
            rooms, 
            isModalVisible, 
            setIsModalVisible,
            selectRoomId,
            setSelectRoomId,
            clearState
        }}>
            {children}
        </AppContext.Provider>
    )


}
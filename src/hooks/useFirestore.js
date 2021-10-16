import React, {useEffect, useState} from "react"
import { db } from "../firebase/config"

export const useFirestore = (collection, condition) => {
    const [document, setDocument] = useState([]);

    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy('createAt');

        /* 
            {
                condition.fielName;
                condition.operator
                condition.compareValue
            }
        */
        if(condition) {
            // where thi compareValue ko được null
            if(!condition.compareValue || !condition.compareValue.length) {
                return;
            }

            collectionRef.where(condition.fielName, condition.operator, condition.compareValue);
        }

        const unsubscribe = collectionRef.onSnapshot((snapshot) => {
            
            const document = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setDocument(document);
        });
        

        /* 
            Để khi UnMount thì sẽ hủy bỏ lắng nghe sự kiện collectionRef.onSnapshot().
            Khi collection or condition thay đổi thì sẽ  return unsubscribe; để hủy bỏ sự kiện lắng nghe trước đó
            Sau đó thì mới chay lại unsubscribe để nắng nghe sự kiện mới
        */
        return unsubscribe;
        
    }, [collection, condition]);

    return document;

}

export default useFirestore;

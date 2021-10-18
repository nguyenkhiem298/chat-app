import { Avatar, Button, Typography } from 'antd'
import React, {useEffect, useContext} from 'react';
import styled from 'styled-components';
import firebase, { auth, db } from '../../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

const WrapperStyle = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83);

    .username {
        color: white;
        margin-left: 5px;
        font-size: 14px;
        font-weight: bold;
    }
`;

export default function UserInfo() {

/*     useEffect(() => {
        db.collection('user').onSnapshot((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))

            console.log({data, snapshot, docs: snapshot.docs});
        });
        
    }, []); */

    // Lấy dữ liệu từ AuthContext



    // input data to firestore:
/*     useEffect(() => {
        db.collection('user').add({
            name: 'tes',
            charAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        
    }, []) */

    //get data from firestore:
/*     useEffect(() => {
        db.collection('user').where("displayName", "!=", null).onSnapshot((sanpshot) => {
            // console.log(sanpshot.docs);
            sanpshot.docs.forEach((doc) => {
                console.log(doc.data());
            });
        });

    }, []) */



    const data = React.useContext(AuthContext);

    // console.log(data);

    return (
        <WrapperStyle>
            <div>
                <Avatar src={data.photoURL}>{data.photoURL ? '' : data.displayName || data.displayName.charAt(0) ? data.displayName.charAt(0) : ''}</Avatar>
                <Typography.Text className="username">{data.displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>Đăng Xuất</Button>
        </WrapperStyle>
    )
}

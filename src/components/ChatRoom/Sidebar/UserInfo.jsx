import { Avatar, Button, Typography } from 'antd'
import React, {useEffect, useContext} from 'react';
import styled from 'styled-components';
import { auth, db } from '../../../firebase/config';
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
    const data = React.useContext(AuthContext);

    console.log(data);

    return (
        <WrapperStyle>
            <div>
                <Avatar src={data.photoURL}>ABC</Avatar>
                <Typography.Text className="username">{data.displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>Đăng Xuất</Button>
        </WrapperStyle>
    )
}

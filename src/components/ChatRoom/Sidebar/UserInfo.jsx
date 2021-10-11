import { useEffect } from 'react';
import { Avatar, Button, Typography } from 'antd'
import React from 'react';
import styled from 'styled-components';
import { auth, db } from '../../../firebase/config';

const WrapperStyle = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82, 38, 83);

    .username {
        color: white;
        margin-left: 5px;
    }
`;

export default function UserInfo() {

    useEffect(() => {
        db.collection('user').onSnapshot((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            
            console.log({data, snapshot, docs: snapshot.docs});
        });
        
    }, []);

    return (
        <WrapperStyle>
            <div>
                <Avatar>ABC</Avatar>
                <Typography.Text className="username">Nguyen Van A</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>Đăng Xuất</Button>
        </WrapperStyle>
    )
}

import { Avatar, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const WrapperStyle = styled.div`
    margin-bottom: 10px;

    .author {
        margin-left: 5px;
        font-weight: bold;
    }

    .date {
        margin-left: 10px;
        font-size: 11px;
        color: #a7a7a7;
    }

    .content {
        display: flex;
        margin-left: 30px;
        width: 60%;
        
    }
`;





export default function Message({textContent, displayName, createAt, photoURL}) {
    return (
        <WrapperStyle>
            <div>
                <Avatar size="small" src={photoURL}>Avatar</Avatar>
                <Typography.Text className="author">{displayName}</Typography.Text>
                <Typography.Text className="date">{createAt}</Typography.Text>
            </div>
            <div>
                <Typography.Text className="content">{textContent}</Typography.Text>
            </div>
        </WrapperStyle>
    )
}

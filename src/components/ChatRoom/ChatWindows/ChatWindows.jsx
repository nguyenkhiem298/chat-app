import React, { useContext, useEffect, useMemo, useState } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip, Form, Input, Alert} from 'antd';
import styled from 'styled-components';
import Message from './Message';
import listMessage from '../../../data/listMessage.json'
import { AppContext } from '../../Context/AppProvider';
import { db } from '../../../firebase/config';

const WrapperStyle = styled.div`
    height: 100vh;
`;

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);

    .header {
        &_info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &_title {
            margin: 0;
            font-weight: bold;
        }

        &_des {
            font-size: 12px;
        }
    }
`;

const ButtonGroupStyle = styled.div`
    display: flex;
    align-items: center;
`;
/* style nằm giữa theo chiều dọc:
    1. display: flex;
    2. align-items: center;     

    -----
    - Giãn hết container
    flex: 1;
*/
const ContentStyled = styled.div`
    height: calc(100%  - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`;

/* 
    Tạo scoll khi nhiều tin nhắn
*/
const MessageListStyle = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;

const FormStyle = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border-bottom: 1px solid rgba(230, 230, 230);
    border-radius: 2px;
    margin-top: 10px;

    .ant-form-item {
        flex: 1;
        margin-bottom: 0px;
    }
`;

export default function ChatWindows() {
    const {selectRoomId} = useContext(AppContext);
    const [room, setRoom] = useState({});
    // console.log(selectRoomId);

    const uidRoomCondition = useMemo(() => {
        return selectRoomId;
    }, [selectRoomId])

    //Get room by Id:
    useEffect(() => {
        const query = db.collection("rooms").where("idRoom", "==", uidRoomCondition);

        const unsubscibed = query.onSnapshot((querySnapshot) => {
            const document = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))

            // console.log(document[0]);
            setRoom(document[0]);
        });

        return unsubscibed;
    }, [uidRoomCondition]);

    // console.log(room);

    return (
        <WrapperStyle>
            {selectRoomId && room ? (
                <>
                    <HeaderStyled>
                        <div className="header_info">
                            <p className="header_title">{room.nameRoom}</p>
                            <span className="header_des">{room.desciption}</span>
                        </div>
                        <ButtonGroupStyle>
                            <Button icon={<UserAddOutlined/>} type="text">Mời</Button>
                            <Avatar.Group size='small' maxCount={2}>
                                <Tooltip title='A'>
                                    <Avatar>A</Avatar>
                                </Tooltip>
                                <Tooltip title='B'>
                                    <Avatar>B</Avatar>
                                </Tooltip>
                                <Tooltip title='C'>
                                    <Avatar>C</Avatar>
                                </Tooltip>
                                <Tooltip title='D'>
                                    <Avatar>D</Avatar>
                                </Tooltip>
                                <Tooltip title='E'>
                                    <Avatar>E</Avatar>
                                </Tooltip>
                                <Tooltip title='F'>
                                    <Avatar>F</Avatar>
                                </Tooltip>
                            </Avatar.Group>
                        </ButtonGroupStyle>
                    </HeaderStyled>
                    <ContentStyled>
                        <MessageListStyle>
                            {
                                listMessage.map((mess) => (
                                    <Message key={mess.id} textContent={mess.textContent} displayName={mess.displayName} createAt={mess.createAt} photoURL={mess.photoURL}/>
                                ))
                            }
                        </MessageListStyle>
                        <FormStyle>
                            <Form.Item>
                                <Input placeholder="Nhập tin nhắn..." bordered={false} autoComplete="off"/>
                            </Form.Item>
                            <Button>Gửi</Button>
                        </FormStyle>
                    </ContentStyled>
                </>
            ) : (
                <Alert
                    message='Hãy chọn phòng'
                    type='info'
                    showIcon
                    style={{ margin: 5 }}
                    closable
                />
            )}
        </WrapperStyle>
    )
}

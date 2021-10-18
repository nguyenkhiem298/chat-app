import { Button, Collapse, Typography } from 'antd'
import React, {useEffect, useState, useContext} from 'react'
import styled from 'styled-components';
import { PlusSquareOutlined} from '@ant-design/icons'
import firebase, { db } from '../../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

const { Panel } = Collapse;

const PanleStyle = styled(Panel)`
    &&& {
        .ant-collapse-header,
        p {
            color: white;
        }

        .ant-collapse-content-box {
            padding: 0 50px;
        }
    }
`;

const LinkStyle = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`;

const ButtonStyle = styled(Button)`
    padding-left: 0px;
`;

export default function RoomList() {

    /* 
        {
            idRoom:
            nameRoom: String,
            users: []
            createAt: Date,
        } 
    */

    function guidGenerator() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

/*     useEffect(() => {
        const uid = guidGenerator();

        db.collection('rooms').add({
            uid: uid,
            nameRoom: 'Room 2',
            users: [
                'qqMS3dwOi7Eniw7eBlGoUN0va29z',
                'OAUziOLK3Boq7j8nkCRtTrq76f1p'
            ],
            createAt: firebase.firestore.FieldValue.serverTimestamp()
        })

    }, []) */

    //Get user info from Context API
    const {uid} = useContext(AuthContext);
    console.log(uid);

    // get room list of current user joined
    useEffect(() => {
        const listRoom = db.collection('rooms')
                            .orderBy('createAt')
                            .where("users", "array-contains", uid)
                            .onSnapshot((doc) => {
                                 
                            })


    }, [uid])




    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanleStyle header="Danh sach cac phong" key="1">
                <LinkStyle>Room 1</LinkStyle>
                <LinkStyle>Room 2</LinkStyle>
                <LinkStyle>Room 3</LinkStyle>
                <LinkStyle>Room 4</LinkStyle>
                <LinkStyle>Room 5</LinkStyle>
                <ButtonStyle type="text" icon={<PlusSquareOutlined/>} className="add-room">Thêm Phòng</ButtonStyle>
            </PanleStyle>
        </Collapse>
    )
}

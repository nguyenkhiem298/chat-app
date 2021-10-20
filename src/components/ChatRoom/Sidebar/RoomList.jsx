import { Button, Collapse, Typography } from 'antd'
import React, {useEffect, useContext, useState, useMemo} from 'react'
import styled from 'styled-components';
import { PlusSquareOutlined} from '@ant-design/icons'
import firebase, { db } from '../../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';
import { AppContext, RoomsContext } from '../../Context/AppProvider';
import AddRoomsModal from './Modal/AddRoomsModal';

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
    color: white;
`;

export default function RoomList() {
    const {setIsModalVisible, setSelectRoomId} = useContext(AppContext);

    /* 
        {
            idRoom:
            nameRoom: String,
            users: []
            createAt: Date,
        } 
    */

    // const [rooms, setRooms] = useState([]);

    function guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    /* 
        {
            uid: id,
            nameRoom: nameRoom,
            member: [id user]
        }
    */

/*     useEffect(() => {
        console.log(1);
        db.collection('rooms').add({
            uid: guidGenerator(),
            nameRoom: 'Room 1',
            description: 'This is Room1\'s description',
            menbers: [
                'zlGQHPTkvfXHXD4yMZlxKpUIqMFF',
            ],
            createAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        
    }, []) */

/*     const {uid} = useContext(AuthContext);

    const uidCondition = useMemo(() => {
        return uid;
    }, [uid]);




     useEffect(() => {
        db.collection('rooms')
            .orderBy('createAt')
            .where('menbers', 'array-contains', uidCondition)
            .onSnapshot((querySnapshot) => {
                const docs = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                }));

                // console.log({docs});
                setRooms(docs);
            });
        
        // rooms.map((room) => {
        //     console.log(room.nameRoom);
        // });

    }, [uidCondition]); */


    const {rooms} = useContext(AppContext);
    // console.log({rooms});


    // const roomslist = [];
    // for (let i = 0; i < rooms.length; i++) {
    //     const el = rooms[i];
    //     roomslist.push(el);
    // }

    const showAddRoom = () => {
        setIsModalVisible(true)
    }
    

    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <PanleStyle header="Danh sach cac phong" key="1">
                {
                    rooms.map((room) => (
                        <LinkStyle 
                            key={room.id}
                            onClick={() => setSelectRoomId(room.idRoom)}
                        >
                            {room.nameRoom}
                        </LinkStyle>
                    ))
                }
                <ButtonStyle onClick={showAddRoom} type="text" icon={<PlusSquareOutlined/>} className="add-room">Thêm Phòng</ButtonStyle>

                <AddRoomsModal/>
            </PanleStyle>
        </Collapse>
    )
}

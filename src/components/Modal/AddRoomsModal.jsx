import { Input, Modal, Form } from 'antd';
import React, { useContext } from 'react';
import firebase, { db } from '../../firebase/config';
import { AppContext } from '../Context/AppProvider';
import { AuthContext } from '../Context/AuthProvider';


export default function AddRoomsModal() {
    const { isModalVisible, setIsModalVisible} = useContext(AppContext);
    const [form] = Form.useForm();

    function guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    const {uid} = useContext(AuthContext);

    const handleOk = () => {
        /* console.log({formData: form.getFieldsValue()}); */
        const data = form.getFieldValue();


        const room = {};

        room.idRoom = guidGenerator();
        room.nameRoom = data.name;
        room.desciption = data.description;
        room.members = [uid];
        room.createAt = firebase.firestore.FieldValue.serverTimestamp();

        
        console.log({room});

        db.collection('rooms').add(room);

        form.resetFields();
        setIsModalVisible(false);
    }
    
    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    }


    return (
        <div>
            <Modal 
                title="Create Room" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <Form form={form} layout='vertical'>
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="Room Name"></Input>
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="Room Name"></Input.TextArea>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}

import { Input, Modal, Form } from 'antd'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../Context/AppProvider';

export default function AddRoomsModal() {
    const { isModalVisible, setIsModalVisible} = useContext(AppContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        console.log({formData: form.getFieldsValue()});


        // form.resetFields();
        setIsModalVisible(false);
    }
    
    const handleCancel = () => {
        setIsModalVisible(false);
    }


    return (
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

    )
}

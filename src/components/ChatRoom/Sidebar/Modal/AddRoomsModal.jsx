import { Input, Modal } from 'antd'
import React, { useContext, useState } from 'react'
import { AppContext } from '../../../Context/AppProvider';

export default function AddRoomsModal() {
    const { isModalVisible, setIsModalVisible} = useContext(AppContext);

    const handleOk = () => {
        setIsModalVisible(false);
    }
    
    const handleCancel = () => {
        setIsModalVisible(false);
    }


    return (
        <Modal title="Create Room" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Input Room's name</p>
            <Input placeholder="Room Name"></Input>
            <p style={{paddingTop: 20}}>Description</p>
            <Input.TextArea placeholder="Input Room's description"></Input.TextArea>
        </Modal>

    )
}

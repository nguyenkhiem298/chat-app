import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar/Sidebar';
import ChatWindows from './ChatWindows';

export default function ChatRoom() {
    return (
        <div>
            <Row>
                <Col span={6}>
                    <Sidebar/>
                </Col>
                <Col span={18}>
                    <ChatWindows/>
                </Col>
            </Row>
        </div>
    )
}

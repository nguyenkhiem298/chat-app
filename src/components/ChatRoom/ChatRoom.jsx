import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar/Sidebar';
import ChatWindows from './ChatWindows/ChatWindows';

export default function ChatRoom() {

    /* const functionFromChildCompomemt = (mess)=> {
        console.log("This is messager: " + mess);
    } */

    return (
        <div>
            <Row>
                <Col span={6}>
                    <Sidebar/>
                    {/* <Sidebar functionCallBack={functionFromChildCompomemt}/> */}
                </Col>
                <Col span={18}>
                    <ChatWindows/>
                </Col>
            </Row>
        </div>
    )
}

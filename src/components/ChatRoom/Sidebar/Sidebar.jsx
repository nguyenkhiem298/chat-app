import React, {useEffect} from 'react';
import { Row, Col } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';

const SidebarStyled = styled.div`
    background: #3f0e40;
    color: while;
    height: 100vh;
`;

export default function Sidebar() {
/* export default function Sidebar({functionCallBack}) { */


/*     useEffect(() => {
        functionCallBack("Khiem");
    }, []) */

    return (
        <SidebarStyled>
            <Row>
                <Col span={24}>
                    <UserInfo/>
                </Col>
                <Col span={24}>
                    <RoomList/>
                </Col>
            </Row>
        </SidebarStyled>
    )
}

import { Button, Collapse, Typography } from 'antd'
import React from 'react'
import styled from 'styled-components';
import { PlusSquareOutlined} from '@ant-design/icons'

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

import { Collapse, Typography } from 'antd'
import React from 'react'

const { Panel } = Collapse;

export default function RoomList() {
    return (
        <Collapse defaultActiveKey={['1']}>
            <Panel header="Danh sach cac phong" key="1">
                <Typography.Link>Room 1</Typography.Link>
                <Typography.Link>Room 2</Typography.Link>
                <Typography.Link>Room 3</Typography.Link>
                <Typography.Link>Room 4</Typography.Link>
                <Typography.Link>Room 5</Typography.Link>
            </Panel>
        </Collapse>
    )
}

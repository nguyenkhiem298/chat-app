import { Avatar, Button, Typography } from 'antd'
import React from 'react'

export default function UserInfo() {
    return (
        <div>
            <div>
                <Avatar>A</Avatar>
                <Typography.Text>Nguyen Van A</Typography.Text>
            </div>
            <Button>Đăng Xuất</Button>
        </div>
    )
}

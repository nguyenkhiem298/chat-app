import React, { Component } from 'react'
import { Row, Col, Button, Typography } from 'antd';
import firebase, {auth} from '../../firebase/config';
import { useHistory } from 'react-router-dom'

const { Title } = Typography;

const gitHubProvider = new firebase.auth.GithubAuthProvider();

export default function LoginPage() {
    const history = new useHistory();

    const handleGitHubLogin = () => {
        auth.signInWithPopup(gitHubProvider);
    }

    auth.onAuthStateChanged((user) => {
        console.log({user});
        if(user) {
            history.push('/');
        }
    });

    return (
        <div>
            <Row justify='center' style={{height: 800}}>
                <Col>
                    <Title style={{textAlign: 'center'}} level={3}>
                        Fun Chat
                    </Title>
                    <Button style={{width: '100%', marginBottom: 5}}>
                        Đăng nhập bắng Google
                    </Button>
                    <Button style={{width: '100%', marginBottom: 5}} onClick={handleGitHubLogin}>
                        Đăng nhập bắng GitHub
                    </Button>
                </Col>
            </Row>            
        </div>
    )
}

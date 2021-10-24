import React, { Component } from 'react'
import { Row, Col, Button, Typography } from 'antd';
import firebase, {auth, db} from '../../firebase/config';
import { addDocument } from '../../firebase/service';
import { generateKeywords } from '../../firebase/service'

const { Title } = Typography;

const gitHubProvider = new firebase.auth.GithubAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default function LoginPage() {

    const handleGitHubLogin = async () => {
        const {additionalUserInfo, user} = await auth.signInWithPopup(gitHubProvider);
        // Lưu thông tin người dùng khi người dùng mới đăng nhập lần đầu tiên
        //Từ lần đăng nhập sau thì sẽ không thực thi đoạn code bên dưới
        if(additionalUserInfo.isNewUser) {
            const userInfo = {};
            // if(additionalUserInfo.providerId === 'github.com') {
            //     const userName = user.email.split('@').at(0);
            //     userInfo.displayName = userName;
            // } else {
            //     userInfo.displayName = user.displayName;
            // }

            userInfo.displayName = user.displayName;
            userInfo.email = user.email;
            userInfo.photoURL = user.photoURL;
            userInfo.uid = user.uid;
            userInfo.providerId = additionalUserInfo.providerId;
            userInfo.keyworks = generateKeywords(user.displayName);
            
            // save firebaseStore
            addDocument('user', userInfo);
        }
    }
    
    const handleGoogleLogin = async () => {
        const {additionalUserInfo, user} = await auth.signInWithPopup(googleProvider);
        if(additionalUserInfo.isNewUser) {
            const userInfo = {};
            userInfo.displayName = user.displayName;
            userInfo.email = user.email;
            userInfo.photoURL = user.photoURL;
            userInfo.uid = user.uid;
            userInfo.providerId = additionalUserInfo.providerId;
            userInfo.keyworks = generateKeywords(user.displayName);
            
            addDocument('user', userInfo);
        }

    }

    return (
        <div>
            <Row justify='center' style={{height: 800}}>
                <Col>
                    <Title style={{textAlign: 'center'}} level={3}>
                        Fun Chat
                    </Title>
                    <Button style={{width: '100%', marginBottom: 5}} onClick={handleGoogleLogin}>
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

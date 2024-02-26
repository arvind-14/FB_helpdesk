import styles from '../styles/connect.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/Auth/AuthContext';


const Connect = () => {

    var [userAccessToken, setUserAccessToken] = useState('');
    const router = useRouter();


    const handleLogin = () => {
        FB.login((response) => {

            if (response.status === 'connected') {
                console.log("login success", response);
                setUserAccessToken(response.authResponse.accessToken)
            }
            else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {
            scope: 'pages_read_user_content,email,public_profile,pages_manage_metadata,pages_read_engagement,pages_messaging_subscriptions,pages_messaging'
        });
    }
    useEffect(() => {
        if (userAccessToken) {
            router.push({
                pathname: '/Disconnect',
                query: { userAccessToken },
            });
        }
    }, [userAccessToken]);


    const { user, signIn, signUp, logout } = useAuth();

    const handleLogout = () => {
        logout()
        alert('Logout Successful')
        router.push('/Login')
    }
    return (
        <div className={styles.container}>
            <h2 className={styles.h2}>Facebook Page Integration</h2>
            <div className={styles.formGroup}>
                <button onClick={handleLogin}>Connect Page</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};
export default Connect
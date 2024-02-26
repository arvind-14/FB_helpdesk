import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/disconnect.module.css"

const DisConnect = () => {
    const router = useRouter();
    const [pageName, setPageName] = useState('');
    const [pageId, setPageId] = useState('');
    const [pageAccessToken, setPageAccessToken] = useState('');
    const { userAccessToken } = router.query;

    const handleLogout = async () => {
        try {
            await FB.logout();
            router.push("/Connect");
            console.log('User logged out');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await FB.api('/me/accounts', 'get', { access_token: userAccessToken }, (response) => {
                    console.log(response);
                    if (response && response.data && response.data.length > 0) {
                        const firstPage = response.data[0];
                        setPageName(firstPage.name);
                        setPageId(firstPage.id);
                        setPageAccessToken(firstPage.access_token);
                    } else {
                        console.error('Error fetching user accounts');
                    }
                });
            } catch (error) {
                console.error(error.message);
            }
        };

        if (userAccessToken) {
            fetchData();
        }
    }, [userAccessToken]);

    const handleClick = async () => {
        await FB.api(`/me/picture`, 'get', { redirect: 0, access_token: pageAccessToken }, (response) => {
            console.log(response);
            if (response && !response.error) {

                // console.log(response.picture.data.url);
                setProfilePicUrl(response.data.url);
            }
            else {
                console.error(response.error)
            }
        })
        router.push({
            pathname: '/Agent',
            query: { pageId, pageAccessToken, userAccessToken}
        });
    };

    return (
        <div className={styles.container}>
            <h3>Facebook Page Integration</h3>
            <p>Integrated Page: <span>{pageName}</span></p>
            <div className={styles.formGroup}>
                <button onClick={handleLogout}>Delete Integration</button>
                <button onClick={handleClick}>Reply to Messages</button>
            </div>
        </div>
    );
};

export default DisConnect;

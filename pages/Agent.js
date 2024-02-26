import { useRouter } from "next/router";
import { useRef, useEffect, useState } from "react";
import styles from "../styles/agent.module.css"
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import Image from "next/image";


const Agent = () => {
    const [convResponse, setConvResponse] = useState([]);
    const [sendText, setSendText] = useState('');
    const [psid, setPSID] = useState('');
    const [myName, setMyName] = useState('');
    const [div3messages, setDiv3Messages] = useState([]);
    const [profilePicUrl, setProfilePicUrl] = useState('');
    // const [email, setEmail] = useState();
    const [headName, setHeadName] = useState('Conversations');
    const [rotation, setRotation] = useState(0);
    const router = useRouter();
    var { pageId, pageAccessToken, userAccessToken } = router.query;

    const handleDivClick = async (id) => {
        console.log(id);
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
    }

    const refresh = async () => {
        setRotation(rotation + 360);
        try {
            await FB.api(`/${pageId}/conversations`, 'get', { fields: 'participants,messages{id,from,to,created_time,message}', access_token: pageAccessToken }, (res) => {
                console.log(res);
                if (res && res.data) {
                    const data = res.data;
                    setConvResponse(data);
                    // console.log(psid);

                } else {
                    console.error('Error fetching conversations');
                }
            });
        } catch (error) {
            console.error(error.message);
        };
    }

    const handleSend = async () => {
        console.log(psid);
        console.log(sendText);

        FB.api(`/${pageId}/messages`, 'post', {
            recipient: { id: psid },
            message: { text: sendText },
            messaging_type: 'MESSAGE_TAG',
            tag: 'CUSTOMER_FEEDBACK',
            access_token: pageAccessToken
        }, (response) => {
            if (response.message_id) {
                // alert("message sent successfully");
                setDiv3Messages([...div3messages, { from: { id: pageId }, message: sendText }])
                setSendText('');
            }
            console.log(response);
        })
    }
    const handleIconClick = (newHeadName) => {
        setHeadName(newHeadName);
    };

    const ChatMessage = ({ message, id }) => {

        const isSender = message.from.id !== `${id}`;
        const messageClass = isSender ? styles.sender : styles.recipient;

        return (
            <div className={`${styles.chatMessage} ${messageClass}`}>
                <div>{message.message}</div>
                {/* <div className={styles.messageTimestamp}>{message.timestamp}</div> */}
            </div>
        );
    }

    const div3ContainerRef = useRef(null);

    useEffect(() => {
        div3ContainerRef.current.scrollTop = div3ContainerRef.current.scrollHeight;
    }, [div3messages]);

    return (<>
        <div className={styles.outer}>
            <div className={styles.div1}>
                <div className={styles.div1_1}>
                    <HubRoundedIcon
                        className={`${styles.navicons} ${headName === "Header" ? styles.activeIcon : ''}`}
                        onClick={() => handleIconClick("Header")}
                    />
                    <ForumRoundedIcon
                        className={`${styles.navicons} ${headName === "Conversations" ? styles.activeIcon : ''}`}
                        onClick={() => handleIconClick("Conversations")}
                    />
                    <PeopleRoundedIcon
                        className={`${styles.navicons} ${headName === "People" ? styles.activeIcon : ''}`}
                        onClick={() => handleIconClick("People")}
                    />
                    <SignalCellularAltRoundedIcon
                        className={`${styles.navicons} ${headName === "Analytics" ? styles.activeIcon : ''}`}
                        onClick={() => handleIconClick("Analytics")}
                    />
                </div>
                <div >
                    <Image
                        className={styles.div1_2}
                        src={profilePicUrl}
                        alt="profile_pic"
                        height={50}
                        width={50}
                    />
                </div>
            </div>

            <div className={styles.div2}>
                <div className={styles.div2_1}>
                    <h1>{headName}</h1>
                    <RefreshRoundedIcon className={styles.ref} onClick={refresh} style={{ transform: `rotate(${rotation}deg)` }} />

                </div>
                <div className={styles.div2_2} style={{ display: headName !== "Conversations" ? 'none' : '' }}>
                    {convResponse.map((sender, index) => {

                        return (
                            <div className={styles.messagedisplay} onClick={() => {
                                const name = sender.participants.data[0].name;
                                const id = sender.participants.data[0].id;
                                setMyName(name);
                                setDiv3Messages(sender.messages.data.slice().reverse());
                                setPSID(id);
                                handleDivClick(id);
                            }}
                                key={index}>
                                <h1>{sender.participants.data[0].name}</h1>
                                <p>{sender.messages.data[0].message}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className={styles.div3}>
                <div className={styles.div3_1}>
                    <h1 style={{ display: headName !== "Conversations" ? 'none' : '' }}>{myName}</h1>
                </div>
                <div className={styles.div3_2} ref={div3ContainerRef} style={{ display: headName !== "Conversations" ? 'none' : '' }}>
                    {div3messages.map((first, index) => {
                        return (
                            <ChatMessage
                                key={index}
                                message={first}
                                id={pageId}
                            />)
                    })}
                </div>
                <div className={styles.div3_3}>
                    <input type="text" value={sendText} placeholder={`Message ${myName}`} onChange={(e) => { setSendText(e.target.value) }} className={styles.input}></input>
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
            <div className={styles.div4}>
                <div className={styles.div4_1} style={{ display: headName !== "Conversations" ? 'none' : '' }}>
                    <div className={styles.profilepic}></div>
                    <h3>{myName}</h3>
                    <li><span>Online</span></li>
                    <div>
                        <button >Call</button>
                        <button >Profile</button>
                    </div>
                </div>
                <div className={styles.div4_2} style={{ display: headName !== "Conversations" ? 'none' : '' }}>
                    <h3>Customer Details</h3>
                    <div>
                        <p>Email</p>
                        <p>First Name</p>
                        <p>Last Name</p>
                        <h5>View more details</h5>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Agent


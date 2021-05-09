import React,{useState,useEffect} from 'react'
import './Chat.css';
import { useParams } from 'react-router-dom';
import {db} from '../../config'
import firebase from 'firebase';
import {auth} from '../Login';


export default function Chat({user}) {
    const [input, setInput] = useState("");
    const {grpId} = useParams();
    const [grpName, setGrpName] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        if(grpId){
            db.collection('groups').doc(grpId).onSnapshot(snapshot => {
                setGrpName(snapshot.data().name);
                
            });

            db.collection('groups').doc(grpId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

        }
    },[grpId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('groups').doc(grpId).collection('messages').add({
            message: input,
            username: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }

    function SignOut(){
        auth.signOut();
      }
    return (
        <div className='chat'>
            <div className='chat_header'>
                <div className='chat_headerInfo'>
                    <h3 className='chat-room-name'>{grpName}</h3>{console.log(grpName)}
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toTimeString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <button onClick={SignOut}>sign out</button>
                </div>
            </div>
            <div className='chat_body'>
                {messages.map(message => (
                    <p className={`chat_message ${ message.username === user && 'chat_receiver'}`}>
                        <span className="chat_name">{message.usrname}</span>
                        {message.message}
                        <span className="chat_timestemp">{new Date(message.timestamp?.toDate()).toTimeString()}</span>
                    </p>
                ))}
            </div>
            <div className='chat_footer'>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}> Send a Message</button>
                    {console.log(input)}
                </form>
            </div>
        </div>
    )
}

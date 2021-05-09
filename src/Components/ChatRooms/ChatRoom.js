import React,{useEffect, useState} from 'react'
import {db} from '../../config'
import './ChatRoom.css';
import firebase from 'firebase'
import {Link} from 'react-router-dom'

export default function ChatRoom({id,name,addNewChat}) {
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if(id){
            db.collection('groups').doc(id).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);

    const createGrp = ()=>{
        const groupName = prompt('enter the group name');
        if(groupName){
            db.collection('groups').add({
                name:groupName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp()
            })
        }
       
    }


    return !addNewChat ? (
        <Link to={`/groups/${id}`} key={id}>
            <div className="sidebarGrps">
                <div className="sidebarChat_info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
            
        </Link>
           
    ) :(
        <div onClick={createGrp} className="sidebarGrps">
            <button className="add-new-chat-title">Add New Group</button>
        </div>
    )
}

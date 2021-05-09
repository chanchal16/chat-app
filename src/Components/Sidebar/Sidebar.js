import React,{useState,useEffect} from 'react'
import './Sidebar.css'
import {db} from '../../config'
import ChatRoom from '../ChatRooms/ChatRoom';
export default function Sidebar() {
    const[groups,setGroups] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('groups').onSnapshot(snapshot => (
            setGroups(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )

            ))
        ));

        return () => {
            unsubscribe();
        }
    },[]); 

    return (
        <div className='sidebar'>
            <div className="sidebar_groups">
                <ChatRoom addNewChat/>
                {groups.map(grp=> (
                    <ChatRoom key={grp.id} id={grp.id} name={grp.data.name}/>
                ))}
            </div>
        </div>
    )
}

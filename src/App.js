import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import { Input,IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  
    apiKey: "AIzaSyDzf6NNDEJz5LQbXhfINTNNXRbtK11Kcb8",
    authDomain: "buzzer-5c166.firebaseapp.com",
    projectId: "buzzer-5c166",
    storageBucket: "buzzer-5c166.appspot.com",
    messagingSenderId: "612409323131",
    appId: "1:612409323131:web:17df71924dd3c9978bfcde"
})

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {

  const [user] = useAuthState(auth); 
  return (
    <div className="App">
      

      <header className="App-header">
        <SignOut />
      </header>
      <section>
        {user? <Chatroom />: <SignIn />}
      </section>
    </div>
  );
}

function SignIn(){
  const SignInWithGoogle=()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return(
    <>
      {/* <button className="sign-in" onClick={SignInWithGoogle}>Sign in with Google</button> */}
      <div className="card">
        <div className="container">
          <h3><b>One Time Sign In</b></h3>
          <p style={{color:'black'}}>Sign in with your google account to get started.</p>
          <button className='sign-in' onClick={SignInWithGoogle}>Sign in with Google</button>
        </div>
      </div>
      
    </>
  )
}

function SignOut(){
  return auth.currentUser && (
    <button onClick={()=>auth.signOut()}>Sign Out</button>
  )
}

function Chatroom(){
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const dummy = useRef()

  const [formValue, setFormValue] = useState('');
  const [messages] = useCollectionData(query, { idField: 'id' });

  const sendMessage = async(e) => {
    e.preventDefault();
    const{uid,photoURL}=auth.currentUser;
    await messagesRef.add({
      text:formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');

    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }


  return(
    <>
    <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      <div ref={dummy}></div>
    </main>

    <form onSubmit={sendMessage}>
      {/* <input value={formValue} onChange={(e)=>setFormValue(e.target.value)} placeholder="Write text here.." /> */}
      {/* <button type="submit" disabled={!formValue}></button> */}
      <Input className='msg_input' placeholder='enter your message' value={formValue} 
        onChange={e=>{setFormValue(e.target.value)}}></Input>
        <IconButton className='snd-msg' type='submit' disabled={!formValue} onClick={sendMessage}>
          <SendIcon />
        </IconButton>
    </form>
    </>
  )
}

function ChatMessage(props){
  const {text,uid,photoURL} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
  return (
    <div className={`message ${messageClass}`}>
         <img src={photoURL} />
      <p>{text}</p>
    </div>

  )

}


export default App;
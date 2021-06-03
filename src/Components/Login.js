import React from 'react'
import firebase from 'firebase'
import {auth} from '../config'


 function Login() {
    

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    
    return (
        <div>
             <div className="card">
                <div className="container">
                    <h3><b>One Time Sign In</b></h3>
                    <p style={{color:'black'}}>Sign in with your google account to get started.</p>
                    <button className='signin-btn' onClick={signInWithGoogle}>Sign in with Google</button>
                    <button className='guest' onClick={loginGuest}>Login as Guest</button>
                </div>
            </div>
        </div>
    )
}

export {auth,Login};
import React, { useContext } from 'react'
import { Button, Typography } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { AuthContext } from '../context/AuthProvider.jsx'
import { useNavigate, Navigate } from 'react-router-dom'
import { graphQLRequest } from '../utils/request.js'

export default function Login() {
  const auth = getAuth();
  // const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const { user: { uid, displayName} } = await signInWithPopup(auth, provider);

    const { data } = await graphQLRequest({query: `mutation register($uid: String!, $name: String!){
      register(uid: $uid, name: $name) {
        id
        name
      }
    }`, variables: {
      uid,
      name: displayName
    }
  });
    console.log('register', {data});
  };

  // nếu đã có user (user đã đăng nhập) thì điều hướng về trang home
  if(user?.uid) {
    // navigate('/');

    return <Navigate to="/" /> // điều hướng về trang home
  }

  return (
    <>
      <Typography variant='h5' sx={{ marginBottom: '10px'}}>Welcome to Note App</Typography>
      <Button variant='outlined' onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  )
}

// code cấu hình kết nối firebase

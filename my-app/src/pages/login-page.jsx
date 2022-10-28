import * as React from 'react'
import {
    Container,
    Paper,
    Box,
    TextField,
    Button,
    Typography,
    Link,
  } from '@mui/material'
import { useNavigate } from 'react-router-dom' 
import { post } from '../plugins/https'

const LoginPage = () => {

 const navigate = useNavigate()
 const emailRef = React.useRef()
 const passwordRef = React.useRef()
 
 const loginUser = async () => {
 
  const userLoginData = {
    email: emailRef.current.value,
    password: passwordRef.current.value
  }

  const res = await post('login', userLoginData)
  console.log(res)

  if(!res.error){
    navigate('/main')
  }

 }

  return (
    <Container>
        <Paper sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
            <Box sx={{display:'flex', flexDirection:'column', width:'50%'}}>
                <TextField 
                id="standard-basic" 
                label="Email"
                variant="standard" 
                inputRef={emailRef}
                 />
                <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                inputRef={passwordRef}
                 />
                <Button
                onClick={loginUser}
                >
                 Login
                </Button>
                <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                >
                Dont have an account? 
                <Link 
                href="/register">
                Register
                </Link>
                </Typography>
            </Box>
        </Paper>
  </Container>
  )
}

export default LoginPage
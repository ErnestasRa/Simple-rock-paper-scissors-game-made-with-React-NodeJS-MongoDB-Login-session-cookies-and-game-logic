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


const RegisterPage = () => {

  const emailRef = React.useRef()
  const passwordRef = React.useRef()
  const passwordConfirmRef = React.useRef()
  const navigate = useNavigate()
  
  const registerUser = async () => {
   
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: passwordConfirmRef.current.value
    }
    
    const res = await post('register', userData)
    
    if(!res.error){
      navigate('/')
    } else {
      throw new Error(res.error)
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

          <TextField 
          id="standard-basic"
          label="Confirm password" 
          variant="standard" 
          inputRef={passwordConfirmRef}
          />

          <Button
          onClick={registerUser}
          >
          Register
          </Button>

          <Typography 
          sx={{ fontSize: 14 }}
          color="text.secondary">
            Already have an account? 
          <Link 
          href="/">
          Login
          </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default RegisterPage

import * as React from 'react'
import {
  Container,
  Paper,
  Box,
  TextField,
  Typography,
  Button,
  Link,
} from '@mui/material'
import MainContext from '../context/main-context'
import { post } from '../plugins/https'
import winnerCalculator from '../functions/random-number'

const SessionPage = () => {
  const {opponent, loggedInPlayer} = React.useContext(MainContext)
  const [winner, setWinner] = React.useState('')
  const inputRef = React.useRef()
 
  const updateScore = async (email) => {
    const newData = {
      email: email
    }
    const res = await post('setwinner', newData)
  }

  const handleSubmit = () => {
   let numberRandomizer = winnerCalculator(1,10)
   if(inputRef > numberRandomizer) {
    setWinner(loggedInPlayer.email)
    updateScore(loggedInPlayer.email)
   } else if (inputRef === numberRandomizer) {
    setWinner('nobody wins, equal')
   } else {
    setWinner(opponent[0].email)
    updateScore(opponent[0].email)
   }
  }

  return (
    <Container>
      <Paper sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <Box sx={{display:'flex', flexDirection:'column', gap: 5}}>
          {opponent.map((data,i) => {
            return <Box key={i}> 
            <Typography>{data.email} (opponent)</Typography>
            </Box>
          })}
            
            <Typography variant='h5'>Winner is: {winner}</Typography>

          <Box>
            <Typography>{loggedInPlayer.email} (you)</Typography>
            <TextField 
                id="standard-basic" 
                label="Number from 1-10"
                variant="standard" 
                inputRef={inputRef}
             />
             <Button onClick={handleSubmit}>Submit</Button>
          </Box>
          <Link 
              href="/main">
              Back to main page
             </Link>
        </Box>
      </Paper>
    </Container>
  )
}

export default SessionPage

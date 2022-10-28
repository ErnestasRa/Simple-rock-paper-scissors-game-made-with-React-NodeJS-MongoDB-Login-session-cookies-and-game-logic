import * as React from 'react'
import {
    Container,
    Paper,
    Box,
} from '@mui/material'
import UserCard from '../components/user-card'
import { get } from '../plugins/https'
import MainContext from '../context/main-context'
import { useNavigate } from 'react-router-dom'
import { post } from '../plugins/https'

const PlayersPage = () => {
  const {players, setPlayers, setOpponent, setLoggedInPlayer} = React.useContext(MainContext)
  const navigate = useNavigate()

  const getAllPlayers = async () => {
    const res = await get('allplayers')
    console.log(res.data)
  
    if(!res.error){
      setPlayers(res.data)
    } else {
      throw new Error(res.error)
    }
  }
  
  const playAgainstPlayer = async (email) => {
    
    const playerData = {
      email
    }

    const res = await post('playgame', playerData)
    console.log(res.data.session)
    if(!res.error){
      setOpponent(res.data.playerInfo)
      setLoggedInPlayer(res.data.session)
      navigate('/game')
    }
  }

  React.useEffect(() => {
    getAllPlayers()
  }, [])

  return (
    <Container>
        <Paper sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'70vh', border: '1px solid black'}}>
            <Box sx={{display:'flex', flexDirection:'row', gap: 2, flexWrap:'wrap'}}>
                {players.map((player, i) => {
                  return <UserCard 
                    email={player.email}
                    score={player.score}
                    key={i}
                    onClick={() => playAgainstPlayer(player.email)}
                  />
                })}
            </Box>
        </Paper>
    </Container>
  )
}

export default PlayersPage
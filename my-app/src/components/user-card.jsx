import * as React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
} from '@mui/material'

const UserCard = ({email, score, onClick}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {email}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          score: {score}/6
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" onClick={onClick}>Play against</Button>
      </CardActions>
    </Card>
  );
}

export default UserCard
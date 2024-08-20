import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useGetBaseballPlayersQuery } from './api/api';
import './App.css';


const BaseballPlayers: FC = () => {
    const baseballPlayers = useGetBaseballPlayersQuery();

    if (baseballPlayers.data == null) {
        return <Typography color="primary" variant="h2">
            Loading...
        </Typography>;

    } else {
        return (<Box>
            <List>
                {baseballPlayers.data!.map((baseballPlayer, index) => {
                    return (<ListItem key={baseballPlayer.id}>
                        <ListItemButton component={Link} to={`/player/${baseballPlayer.id}`}>
                            <ListItemIcon>
                                <SportsBaseballIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                                primary={
                                   <Typography color="primary" variant="h2">
                                        #{index+1} {baseballPlayer.player}
                                   </Typography>
                                }
                                secondary={
                                    <>
                                       <Typography color="text.secondary">
                                            Hits {baseballPlayer.hits}                                    
                                       </Typography>
                                    </>
                                }>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>);
                })}
            </List>
    </Box>)};
}

export default BaseballPlayers;
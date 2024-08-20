import { Box, Button, MenuItem, Select, SelectChangeEvent, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePostBaseballPlayerMutation } from './api/api';
import { BaseballPlayer } from './models/baseball_player';

interface BaseballPlayerFormProps {
    baseballPlayer: BaseballPlayer
}

const BaseballPlayerForm: FC<BaseballPlayerFormProps> = (props: BaseballPlayerFormProps) => {

    const [baseballPlayer, setBaseballPlayer] = useState<BaseballPlayer>(props.baseballPlayer);

    const onChangeHits = (event: ChangeEvent<HTMLInputElement>) => {
        setBaseballPlayer({
            ...baseballPlayer,
            hits: Number(event.target.value)
        })
    }
    const onChangeYears = (event: ChangeEvent<HTMLInputElement>) => {
        setBaseballPlayer({
            ...baseballPlayer,
            year: Number(event.target.value)
        })
    }
    const onChangeAgeThatYear = (event: ChangeEvent<HTMLInputElement>) => {
        setBaseballPlayer({
            ...baseballPlayer,
            ageThatYear: Number(event.target.value)
        })
    }
    const onChangeHandedness = (event: SelectChangeEvent) => {
        setBaseballPlayer({
            ...baseballPlayer,
            bats: event.target.value
        })
    }
    const onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setBaseballPlayer({
            ...baseballPlayer,
            description: event.target.value
        })
    }

    const [updateBaseballPlayer, {isSuccess}] = usePostBaseballPlayerMutation();

    const onSaveChanges = () => {
        updateBaseballPlayer(baseballPlayer);
    }

    if (baseballPlayer) {
        return (<Box>
            <Stack spacing={2}>
                <Typography color="primary" variant="h2">
                    {baseballPlayer.player}
                </Typography>

                <TextField id="player-hits" label="Hits" variant="outlined" value={baseballPlayer.hits} onChange={onChangeHits} />
                <TextField id="player-year" label="Year" variant="outlined" value={baseballPlayer.year} onChange={onChangeYears} />
                <TextField id="player-age-that-year" label="Age That Year" variant="outlined" value={baseballPlayer.ageThatYear} onChange={onChangeAgeThatYear} />

                <Select id="player-bats" value={baseballPlayer.bats} label="Bats" onChange={onChangeHandedness}>
                    <MenuItem value="Left">Left</MenuItem>
                    <MenuItem value="Right">Right</MenuItem>
                </Select>
                <TextField id="player-description" label="Description" variant="outlined" value={baseballPlayer.description} onChange={onChangeDescription} />

                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={2}>
                        <Button component={Link} to="/" variant="contained">
                            Back To Player List
                        </Button>

                        <Button component={Link} to={`/player/${baseballPlayer.id}`} variant="contained">
                            Back To Player
                        </Button>
                    </Stack>

                    <Button variant="contained" onClick={onSaveChanges}>Save Changes</Button>
                </Stack>

                <Snackbar
                    open={isSuccess}
                    autoHideDuration={6000}
                    message="Updates Saved"
                />
            </Stack>
        </Box>);
    } else {
        return <>Fragment</>;
    }
};

export default BaseballPlayerForm
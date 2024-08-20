import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetBaseballPlayerQuery } from './api/api';

const BaseballPlayerDetails: FC = () => {
    const { playerId } = useParams();

    const {data, isLoading } = useGetBaseballPlayerQuery(Number(playerId));

    if (isLoading) {
        return <Typography color="primary" variant="h2">
            Loading...
        </Typography>;
    } else {
        if (data != null) {
            return (<Box>
                <Typography color="primary" variant="h2">
                    {data.player}
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={4}  justifyContent="end" alignItems="end">
                        <Typography>Hits</Typography>
                    </Grid>
                    <Grid xs={8}>
                        <Typography>{data.hits}</Typography>
                    </Grid>

                    <Grid xs={4}>
                        <Typography>Year</Typography>
                    </Grid>
                    <Grid xs={8}>
                        <Typography>{data.year}</Typography>
                    </Grid>

                    <Grid xs={4}>
                        <Typography>Age That Year</Typography>
                    </Grid>
                    <Grid xs={8}>
                        <Typography>{data.ageThatYear}</Typography>
                    </Grid>

                    <Grid xs={4}>
                        <Typography>Bats</Typography>
                    </Grid>
                    <Grid xs={8}>
                        <Typography>{data.bats}</Typography>
                    </Grid>

                    <Grid xs={4}>
                        <Typography>Description</Typography>
                    </Grid>
                    <Grid xs={8}>
                        <Typography>{data.description}</Typography>
                    </Grid>
                </Grid>

                <Stack direction="row" justifyContent="space-between">
                    <Button component={Link} to="/" variant="contained">
                        Back To Player List
                    </Button>

                    <Button component={Link} to={`/player/${playerId}/edit`} variant="contained">
                        Edit Player
                    </Button>
                </Stack>
            </Box>);
        } else {
            return <Typography color="primary" variant="h2">
                Player Not Found.
            </Typography>;
        }
    }
};

export default BaseballPlayerDetails
import { Typography } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBaseballPlayerQuery } from './api/api';
import BaseballPlayerForm from './baseball_player_form';

const BaseballPlayerEditor: FC = () => {
    const { playerId } = useParams();

    const {data, isLoading } = useGetBaseballPlayerQuery(Number(playerId));

    if (isLoading || !data) {
        return <Typography color="primary" variant="h2">
            Loading...
        </Typography>;
    } else {
        return <BaseballPlayerForm baseballPlayer={data!}/>
    }
};

export default BaseballPlayerEditor
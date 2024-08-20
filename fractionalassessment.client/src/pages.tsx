import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import BaseballPlayers from './baseball_players';

const XXXXPages: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<BaseballPlayers/>}/>
        </Routes>
    )
}

export default XXXXPages;
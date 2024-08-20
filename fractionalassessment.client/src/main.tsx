import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import BaseballPlayerDetails from './baseball_player_details'
import BaseballPlayerEditor from './baseball_player_editor'
import BaseballPlayers from './baseball_players'
import './index.css'
import { store } from "./store/store"

const router = createBrowserRouter([
  {
    path: "/",
    element: (<BaseballPlayers/>),
  },
  {
    path: "/player/:playerId",
    element: (<BaseballPlayerDetails/>),
  },
  {
    path: "/player/:playerId/edit",
    element: (<BaseballPlayerEditor/>),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>      
        <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);

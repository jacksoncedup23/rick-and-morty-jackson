import React from 'react'
import ReactDOM from 'react-dom/client'
import EpisodesPage from './Episodes.tsx'
import './index.css'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import CharacsPage from './characs.tsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<Navigate to="/episodes" />}/>
      <Route path="/episodes" element={<EpisodesPage />}/>
      <Route path="/characters" element={<CharacsPage />} />
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

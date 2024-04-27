import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import NovaPag from './NovaPag.tsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<Navigate to="/app" />}/>
      <Route path="/app" element={<App />}/>
      <Route path="/nova" element={<NovaPag />} />
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

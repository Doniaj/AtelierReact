import React from 'react';
import { Suspense, useState } from 'react'
import Events from './components/Events'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import NotFound from './components/NotFound'
import NavigationBar from './components/NavigationBar'
import EventDetails from './components/EventDetails'
import AddEvent from './components/AddEvent'
import UpdateEvent from './components/UpdateEvent';

function App() {

  const EventDetails=React.lazy(()=>import("../src/components/EventDetails"))
  const NotFound=React.lazy(()=>import("../src/components/NotFound"))
  const Events=React.lazy(()=>import("../src/components/Events"))

  return (
    <>
     <Suspense fallback={<p>loading . . .</p>}>
     <NavigationBar/>
     <Routes>
       <Route path="/events">
        
        <Route index element={<Events/>}/>
        <Route path='AddEvent' element={<AddEvent/>}/>
        <Route path='details/:nom' element={<EventDetails/>}/>
        <Route path="/events/update/:eventId" element={<UpdateEvent />} /> 
       </Route>
       <Route path='AddEvent' element={<AddEvent/>}/>
       <Route path='*' element={<NotFound/>}/>
       
     </Routes>
     </Suspense>
    </>
  )
}

export default App

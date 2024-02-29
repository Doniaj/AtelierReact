import React from 'react';
import events from '../data/events.json'
import { useParams } from 'react-router-dom';

export default function EventDetails(props) {
    const{nom}=useParams();
    const event=events.find((e)=>{
        return e.name=nom})

    return <>{event?
    <p>Event Name : {event.name}</p>:<p>event not found</p>}
       
        </>;
}
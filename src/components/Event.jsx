import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import { deleteEvent } from '../service/api';
export default function Event(props)
{  
     const [e,SetEvent]=useState(props.e)
     const like=()=>{
        SetEvent((previousEvent)=>({
            ...previousEvent,
            like:!previousEvent.like,
            }))
     }
    const bookEvent=()=>{
        props.fonctionAlert(), 
        SetEvent((previousEvent)=>({
        ...previousEvent,
        nbParticipants:previousEvent.nbParticipants+1,
        nbTickets:previousEvent.nbTickets-1}))}

    

    return<>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={e.nbTickets===0?"images/sold_out.png":`images/${e.img}`} />
      <Card.Body>
        <Card.Title><Link to={`/events/details/${e.name}`}>{e.name}</Link></Card.Title>
        <Card.Text>
        <p>description:{e.description}</p>
         <p>price:{e.price}</p>
         <p>nombreParticipants:{e.nbParticipants}</p>
         <p>nombreTickets:{e.nbTickets}</p>
        </Card.Text>
        <Button variant="danger" onClick={like}>{e.like?"dislike":"like"}</Button>
        <Button variant="primary" onClick={bookEvent} disabled={e.nbTickets===0?true:false}>book an event </Button>
        <Button variant="primary" onClick={deleteEvent} >Delete </Button>
      </Card.Body>
    </Card>

    </>
}
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import { getallEvents, deleteEvent } from '../service/api';

export default function Event(props) {
  const [e, setEvent] = useState(props.e);
  const [eventDetails, setEventDetails] = useState(null);
  const [showEventNotFound, setShowEventNotFound] = useState(false);

  const like = () => {
    setEvent((previousEvent) => ({
      ...previousEvent,
      like: !previousEvent.like,
    }));
  };

  const bookEvent = () => {
    props.fonctionAlert();
    setEvent((previousEvent) => ({
      ...previousEvent,
      nbParticipants: previousEvent.nbParticipants + 1,
      nbTickets: previousEvent.nbTickets - 1,
    }));
  };

  const fetchEventDetails = async (eventId) => {
    try {
      const response = await getallEvents(eventId);
      setEventDetails(response.data);
    } catch (error) {
      console.error('Error fetching event details:', error);
      setShowEventNotFound(true);
    }
  };

  useEffect(() => {
    // Faites l'appel à l'API pour récupérer les détails de l'événement en fonction de son identifiant
    fetchEventDetails(props.e.id);
  }, [props.e.id]);

  const handleDeleteEvent = async () => {
    try {
      if (eventDetails) {
        await deleteEvent(eventDetails.id);
        // Supprimez l'événement de l'état après la suppression
        setEventDetails(null);
      } else {
        console.warn("No event details found to delete.");
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };
  

  return (
    <>
      {showEventNotFound && (
        <Alert variant="danger">
          L'événement n'existe pas
        </Alert>
      )}

      {eventDetails && (
        <Card style={{ width: '18rem' }}>
          <Card.Img
            variant="top"
            src={eventDetails.nbTickets === 0 ? 'images/sold_out.png' : `images/${eventDetails.img}`}
          />
          <Card.Body>
            <Card.Title>
              <Link to={`/events/details/${eventDetails.name}`}>{eventDetails.name}</Link>
            </Card.Title>
            <Card.Text>
              <p>Description: {eventDetails.description}</p>
              <p>Prix: {eventDetails.price}</p>
              <p>Nombre de participants: {eventDetails.nbParticipants}</p>
              <p>Nombre de tickets: {eventDetails.nbTickets}</p>
            </Card.Text>
            <Button variant="danger" onClick={like}>
              {eventDetails.like ? 'Dislike' : 'Like'}
            </Button>
            <Button variant="primary" onClick={bookEvent} disabled={eventDetails.nbTickets === 0}>
              Réserver un événement
            </Button>
            <Button variant="primary" onClick={handleDeleteEvent}>
              Supprimer
            </Button>
            <Button variant="primary" as={Link} to={`/events/update/${eventDetails.id}`}>
              Update
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
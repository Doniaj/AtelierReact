import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Row } from 'react-bootstrap';
import Event from './Event';
import { getallEvents } from '../service/api';  // Importez la fonction getallEvents

export default function Events() {
  const [showAlert, setShowAlert] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [eventList, setEventList] = useState([]);  // Ajoutez un état pour stocker la liste des événements

  const modifAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const deleteEvent = async (id) => {
    // Ajoutez la logique pour supprimer un événement
  };

  useEffect(() => {
    // Faites l'appel à l'API ici pour récupérer la liste des événements
    const fetchEvents = async () => {
      try {
        const response = await getallEvents();  // Utilisez la fonction getallEvents
        setEventList(response.data);  // Mettez à jour l'état avec la liste des événements
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Appelez la fonction fetchEvents
    fetchEvents();

    // Affichez le message de bienvenue
    setShowWelcome(true);
    setTimeout(() => setShowWelcome(false), 2000);

    // Clean up function
    return () => {
      console.log('welcome unmounting');
    };
  }, []);  // Ajoutez les dépendances vides pour exécuter l'effet une seule fois

  return (
    <>
      {showWelcome && (
        <Alert variant="success">
          Bienvenue
        </Alert>
      )}

      <Row>
        {eventList.map((element, index) => (
          <Event key={index} e={element} fonctionAlert={modifAlert} />
        ))}
      </Row>

      {showAlert && (
        <Alert variant="success">
          Vous avez réservé un événement
        </Alert>
      )}
    </>
  );
}

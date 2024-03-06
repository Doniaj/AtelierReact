import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getallEvents, editEvent } from "../service/api";

export default function UpdateEvent({ eventId }) {
  const navigate = useNavigate();

  const [eventItem, setEventItem] = useState({
    name: "",
    description: "",
    img: "",
    price: 0,
    nbTickets: 0,
    nbParticipants: 0,
    like: false,
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await getallEvents(eventId);
        console.log("API Response:", response.data);

        if (response.data && response.data.length > 0) {
          setEventItem(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const onInputChange = (e) => {
    setEventItem((prevEventItem) => ({
      ...prevEventItem,
      [e.target.name]: e.target.value,
    }));
  };

  const onFileChange = (e) => {
    setEventItem((prevEventItem) => ({
      ...prevEventItem,
      [e.target.name]: e.target.files[0] ? e.target.files[0].name : '',
    }));
  };

  const handleUpdateEvent = async () => {
    try {
      if (!eventId) {
        console.error('Event ID is undefined');
        return;
      }
  
      await editEvent(eventId, eventItem);
      navigate("/events");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleCancel = () => {
    navigate("/events");
  };

  return (
    <Container style={{ marginTop: "30px" }}>
      <h2>Update Event</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter a Name"
            value={eventItem.name}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description "
            name="description"
            value={eventItem.description}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={eventItem.price}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control
            type="number"
            name="nbTickets"
            value={eventItem.nbTickets}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="img" onChange={(e) => onFileChange(e)} />
        </Form.Group>
        <Button variant="primary" onClick={handleUpdateEvent}>
          Update Event
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
}

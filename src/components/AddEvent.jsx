
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { addEvent } from "../service/api";

export default function AddEvent() {
  const [EventItem,setEventItem]=useState({
name:"",
description:"",
img:"",
price:0,
nbTickets:0,
nbParticipants:0,
like:false})

const OnInputChange=(e)=>{
setEventItem({
    ...EventItem, [e.target.name]:e.target.value
})
}

const OnFileChange=(e)=>{
    setEventItem({
        ...EventItem, [e.target.name]:e.target.file[0].name
    })
    }


  return (
    <Container style={{ marginTop: "30px" }}>
      <h2>Add a new Event to your Event List</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter a Name"
            value={EventItem.name}
            onChange={(e)=>{OnInputChange(e)}}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description "
            name="description"
            value={EventItem.description}
            onChange={(e)=>{OnInputChange(e)}}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={EventItem.price}
            onChange={(e)=>{OnInputChange(e)}}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Number of Tickets</Form.Label>
          <Form.Control
            type="number"
            name="nbTickets"
            value={EventItem.nbTickets}
            onChange={(e)=>{OnInputChange(e)}}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            name="img"
            onChange={(e)=>{OnFileChange(e)}}
          />
        </Form.Group>
        <Button variant="primary" onClick={addEvent}>
          Add an Event
        </Button>
        <Button  variant="secondary">
          Cancel
        </Button>
      </Form>
    </Container>
  );
}
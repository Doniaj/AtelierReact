import Event from "./Event"
import listEvent from "../data/events.json"
import { Row } from "react-bootstrap"
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function Events()
{ const [showAlert,SetShowAlert]=useState(false)
  const [showWelcome,SetShowWelcome]=useState(false)

  const modifAlert=()=>{
    SetShowAlert(true);
    setTimeout(()=>SetShowAlert(false),2000)
}

useEffect(()=>{
    SetShowWelcome(true),
    setTimeout(()=>SetShowWelcome(false),2000)
    return()=>{
        console.log("welcome unmounting")
        
    }
})

    return<>
       {showWelcome && <Alert variant="succes">
          Bienvenus
        </Alert>

    }
   <Row>
    {
        listEvent?.map((element,index)=>{
            return  <Event key={index} e={element} fonctionAlert={modifAlert}/>
        })
    }</Row>

        {showAlert && <Alert variant="succes">
          you have booked an event
        </Alert>

    }
    </>
}
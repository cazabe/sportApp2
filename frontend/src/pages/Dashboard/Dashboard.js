import React, { useEffect, useState } from "react";
import api from "../../services/api";
import moment from "moment";
import "./Dashboard.css";
import { Button, FormGroup, ButtonGroup,Alert } from "reactstrap";
import socketio from 'socket.io-client';

const Dashboard = ({ history }) => {
  const [events, setEvents] = useState([]);
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageHandler , setMessageHandler] = useState("");

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(()=>{
    const socket = socketio('http://localhost:8000',{query:{user:user_id}});
    socket.on('registration_request', data => console.log(data));
  },[]);

  const filterHandler = (query) => {
    setRSelected(query);
    getEvents(query);
  };

  const getEvents = async (filter) => {
    try {
      const url = filter ? `/events/${filter}` : "/events";
      const response = await api.get(url, { headers: { user: user } });
      setEvents(response.data.events);
    } catch (error) {
      history.push('/login');
    }
   
  };

  const myEventsHandler = async () => {
    try {
      setRSelected("myevents");
    const response = await api.get('/users/myevents', { headers: { user: user } });
    console.log("los eventos por ususraio: " , response.data.userEvents);
    setEvents(response.data.userEvents);
    } catch (error) {
      history.push('/login');
    }
    
  };

  const deleteEventsHandler = async(eventId)=>{
    console.log("event id for delete : " , eventId);
    try {
       await api.delete(`/event/${eventId}`,{ headers: { user: user } });

      setSuccess(true);
      setMessageHandler(" Event deleted successfully");
      setTimeout(()=>{
        setSuccess(false);
        setMessageHandler("");
        filterHandler(null);
      },2000)
    } catch (error) {
      setError(true);
      setMessageHandler("Could nort delete evvent");
      setTimeout(()=>{
        setError(false);
        setMessageHandler("");
      },2000)
    }
    
      
  }

  const logOutHandler = ()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    history.push('/login');
  }

  const registrationRequestHandler = async (event)=>{
    try {
      await api.post(`/registration/${event.id}` , {}, {headers:{user}});
      setSuccess(true);
      setMessageHandler(`The request for the ${event.title} was successfully`);
      setTimeout(()=>{
        setSuccess(false);
        setMessageHandler("");
        filterHandler(null);
      },2000)
    } catch (error) {
      setError(true);
      setMessageHandler(`The request for the ${event.title} wasn't successfully`);
      setTimeout(()=>{
        setError(false);
        setMessageHandler("");
      },2000)
    }
    
  }

  console.log(events);

  return (
    <>
      <div className="filter-panel">
        Filter:
        <ButtonGroup>
          <Button
            color="primary"
            onClick={() => filterHandler(null)}
            active={rSelected === null}
          >
            All events
          </Button>

          <Button
            color="primary"
            onClick={() => filterHandler("running")}
            active={rSelected === "running"}
          >
            Running
          </Button>
          <Button
            color="primary"
            onClick={() => filterHandler("cycling")}
            active={rSelected === "cycling"}
          >
            Cycling
          </Button>
          <Button
            color="primary"
            onClick={() => filterHandler("swiming")}
            active={rSelected === "swiming"}
          >
            Swiming
          </Button>
          <Button
            color="primary"
            onClick={myEventsHandler}
            active={rSelected === "myevents"}
          >
            My events
          </Button>
          <Button
            color="danger"
            onClick={logOutHandler}
          >
            Logout
          </Button>
        </ButtonGroup>
        <FormGroup>
          <Button className="secondary" onClick={() => history.push("/events")}>
            Event
          </Button>
        </FormGroup>
      </div>

      <ul className="events-list">
        {events.map((event) => {
          return (
            <li key={event._id}>
              <header
                style={{ backgroundImage: `url(${event.thumbnail_url})` }}
              >
                {event.user === user_id ? (
                  <div className="delet-btn"><Button
                    color="danger"
                    onClick={()=> deleteEventsHandler(event._id)}
                    active={rSelected === "myevents"}
                  >
                    Delete
                  </Button></div>
                ) : (
                  ""
                )}
              </header>
              <strong>{event.title}</strong>
              <span>Event Date: {moment(event.date).format("l")}</span>
              <span>Event Price:{parseFloat(event.price).toFixed(2)}</span>
              <span>Event Description{event.description}</span>
              <FormGroup>
                <Button className="primary" onClick={()=> registrationRequestHandler(event)}>Registration To Event</Button>
              </FormGroup>
            </li>
          );
        })}
      </ul>
      {error ? (
        <Alert className="event-validation" color="danger">
         The event can't be deleted 
        </Alert>
      ) : (
        ""
      )}
      {success ? (
        <Alert className="event-validation" color="success">
         {messageHandler}
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;

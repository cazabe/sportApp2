import React, { useEffect, useState } from "react";
import api from "../../services/api";
import moment from "moment";
import "./Dashboard.css";
import { Button, FormGroup, ButtonGroup,Alert } from "reactstrap";

const Dashboard = ({ history }) => {
  const [events, setEvents] = useState([]);
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getEvents();
  }, []);

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
      setTimeout(()=>{
        setSuccess(false);
        filterHandler(null);
      },2000)
    } catch (error) {
      setError(true);
      setTimeout(()=>{
        setError(false);
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
                <Button className="primary">Subscribe</Button>
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
          Event deleted successfully
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;

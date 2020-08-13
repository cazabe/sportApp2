import React, { useEffect, useState } from "react";
import api from "../../services/api";
import moment from "moment";
import "./Dashboard.css";
import { Button, FormGroup, ButtonGroup } from "reactstrap";

const Dashboard = ({ history }) => {
  const [events, setEvents] = useState([]);
  const user_id = localStorage.getItem("user");
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);

  useEffect(() => {
    getEvents();
  }, []);

  const filterHandler = (query) => {
    setRSelected(query);
    getEvents(query);
  };

  const getEvents = async (filter) => {
    const url = filter ? `/events/${filter}` : "/events";
    const response = await api.get(url, { headers: { user_id } });
    setEvents(response.data);
  };

  console.log(events);

  return (
    <>
      <div>
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
        </ButtonGroup>
      </div>
      <FormGroup>
        <Button className="secondary" onClick={() => history.push("/events")}>
          Event
        </Button>
      </FormGroup>
      <ul className="events-list">
        {events.map((event) => {
          return (
            <li key={event._id}>
              <header
                style={{ backgroundImage: `url(${event.thumbnail_url})` }}
              />
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
    </>
  );
};

export default Dashboard;

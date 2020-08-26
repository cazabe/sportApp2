import React, { useEffect, useState, useMemo } from "react";
import api from "../../services/api";
import moment from "moment";
import "./Dashboard.css";
import {
  Button,
  FormGroup,
  ButtonGroup,
  Alert,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import socketio from "socket.io-client";

const Dashboard = ({ history }) => {
  const [events, setEvents] = useState([]);
  const user = localStorage.getItem("user");
  const user_id = localStorage.getItem("user_id");
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageHandler, setMessageHandler] = useState("");
  const [eventsRequest, setEventsRequest] = useState([]);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [eventsRequestMessage, setEventsRequestMessage] = useState("");
  const [eventsRequestSuccess, seteventsRequestSuccess] = useState(false);

  const toggle = () => setDropDownOpen(!dropDownOpen);

  useEffect(() => {
    getEvents();
  }, []);

  const socket = useMemo(
    () => socketio("http://localhost:8000", { query: { user: user_id } }),
    [user_id]
  );

  useEffect(() => {
    socket.on("registration_request", (data) =>
      setEventsRequest([...eventsRequest, data])
    );
  }, [eventsRequest, socket]);

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
      history.push("/login");
    }
  };

  const myEventsHandler = async () => {
    try {
      setRSelected("myevents");
      const response = await api.get("/users/myevents", {
        headers: { user: user },
      });
      console.log("los eventos por ususraio: ", response.data.userEvents);
      setEvents(response.data.userEvents);
    } catch (error) {
      history.push("/login");
    }
  };

  const deleteEventsHandler = async (eventId) => {
    console.log("event id for delete : ", eventId);
    try {
      await api.delete(`/event/${eventId}`, { headers: { user: user } });

      setSuccess(true);
      setMessageHandler(" Event deleted successfully");
      setTimeout(() => {
        setSuccess(false);
        setMessageHandler("");
        filterHandler(null);
      }, 2000);
    } catch (error) {
      setError(true);
      setMessageHandler("Could nort delete evvent");
      setTimeout(() => {
        setError(false);
        setMessageHandler("");
      }, 2000);
    }
  };

  const registrationRequestHandler = async (event) => {
    try {
      await api.post(`/registration/${event.id}`, {}, { headers: { user } });
      setSuccess(true);
      setMessageHandler(`The request for the ${event.title} was successfully`);
      setTimeout(() => {
        setSuccess(false);
        setMessageHandler("");
        filterHandler(null);
      }, 2000);
    } catch (error) {
      setError(true);
      setMessageHandler(
        `The request for the ${event.title} wasn't successfully`
      );
      setTimeout(() => {
        setError(false);
        setMessageHandler("");
      }, 2000);
    }
  };

  const acceptEventHandler = async (eventId) => {
    try {
      await api.post(
        `/registration/${eventId}/approval`,
        {},
        { headers: { user } }
      );

      seteventsRequestSuccess(true);
      setEventsRequestMessage("Event approved successfully");
      setTimeout(() => {
        seteventsRequestSuccess(false);
        setEventsRequestMessage("");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rejectEventHandler = async (eventId) => {
    try {
      await api.post(
        `/registration/${eventId}/rejection`,
        {},
        { headers: { user } }
      );

      seteventsRequestSuccess(true);
      setEventsRequestMessage("Event rejected");
      removeNotificationFromDashboard(eventId);
      setTimeout(() => {
        seteventsRequestSuccess(false);
        setEventsRequestMessage("");
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(events);

  const removeNotificationFromDashboard = (eventId) => {
    const newEvents = eventsRequest.filter((event) => event._id !== eventId);
    setEventsRequest(newEvents);
  };

  return (
    <>
      <ul className="notification">
        {eventsRequest.map((request) => {
          return (
            <li key={request._id}>
              <div>
                <strong>{request.user.email}</strong>Is requesting to register
                to your event
                <strong>{request.event.title}</strong>
              </div>
              <ButtonGroup>
                <Button
                  className="secondary"
                  onClick={() => acceptEventHandler(request._id)}
                >
                  Accept
                </Button>
                <Button
                  className="secondary"
                  onClick={() => rejectEventHandler(request._id)}
                >
                  Reject
                </Button>
              </ButtonGroup>
            </li>
          );
        })}
      </ul>
      {eventsRequestSuccess ? (
        <Alert className="event-validation" color="success">
          {eventsRequestMessage}
        </Alert>
      ) : (
        ""
      )}
      <div className="filter-panel">
        <Dropdown isOpen={dropDownOpen} toggle={toggle}>
          <DropdownToggle color="primary" caret>
            Filter
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => filterHandler(null)}
              active={rSelected === null}
            >
              All Sports
            </DropdownItem>
            <DropdownItem
              onClick={myEventsHandler}
              active={rSelected === "myevents"}
            >
              My Events
            </DropdownItem>
            <DropdownItem
              onClick={() => filterHandler("running")}
              active={rSelected === "running"}
            >
              Running
            </DropdownItem>

            <DropdownItem
              onClick={() => filterHandler("cycling")}
              active={rSelected === "cycling"}
            >
              Cycling
            </DropdownItem>

            <DropdownItem
              onClick={() => filterHandler("swiming")}
              active={rSelected === "swiming"}
            >
              Swiming
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

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
                  <div className="delet-btn">
                    <Button
                      color="danger"
                      onClick={() => deleteEventsHandler(event._id)}
                      active={rSelected === "myevents"}
                    >
                      Delete
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </header>
              <strong>{event.title}</strong>
              <span>Event Date: {moment(event.date).format("l")}</span>
              <span>Event Price:{parseFloat(event.price).toFixed(2)}</span>
              <span>Event Description{event.description}</span>
              <FormGroup>
                <Button
                  className="primary"
                  onClick={() => registrationRequestHandler(event)}
                >
                  Registration To Event
                </Button>
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

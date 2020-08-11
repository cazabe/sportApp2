import React, { useState, useMemo } from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Label, Input, Container, Alert } from "reactstrap";
import camaraIcon from "../../Assets/camera.png";
import "./events.css";

const EventsPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage , setErrorMessage] = useState(false);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  console.log(title, description, price, sport, date);

  const submitHandler = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("user");
    // console.log("user id " ,  user_id);
    const eventData = new FormData();

    eventData.append("thumbnail", thumbnail);
    eventData.append("sport", sport);
    eventData.append("title", title);
    eventData.append("description", description);
    eventData.append("price", price);
    eventData.append("date", date);

    try {
      if (
        title !== "" &&
        description !== "" &&
        price !== "" &&
        sport !== "" &&
        date !== "" &&
        thumbnail !== null
      ) {
        await api.post("/event/create", eventData, { headers: { user_id } });
      }else{
        setErrorMessage(true)
        setTimeout(()=>{
            setErrorMessage(false);
        },2000)
        console.log("Missing required message");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <h1>Create event</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label>Upload image</Label>
          <Label
            id="tumbnail"
            style={{ backgroundImage: `url(${preview})` }}
            className={thumbnail ? "has-thumbnail" : ""}
          >
            <Input
              type="file"
              onChange={(event) => setThumbnail(event.target.files[0])}
            />
            <img
              src={camaraIcon}
              style={{ maxWidth: "50px" }}
              alt="upload icon file"
            />
          </Label>
        </FormGroup>

        <FormGroup>
          <Label>Sport:</Label>
          <Input
            id="sport"
            type="text"
            placeholder="Enter sport name"
            value={sport}
            onChange={(event) => setSport(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Title:</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter description"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Description:</Label>
          <Input
            id="description"
            type="text"
            placeholder="Enter title"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Price:</Label>
          <Input
            id="price"
            type="text"
            placeholder="Enter price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Event date:</Label>
          <Input
            id="date"
            type="date"
            placeholder="Enter date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </FormGroup>

        <Button type="submit">Create event</Button>
      </Form>
      {errorMessage ? (
          <Alert className="event-validation" color="danger">Missing required information</Alert>
      ):""}
    </Container>
  );
};

export default EventsPage;
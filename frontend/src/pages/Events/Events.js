import React, { useState, useMemo} from "react";
import api from "../../services/api";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import camaraIcon from "../../Assets/camera.png";
import "./events.css";

const EventsPage = ({ history }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [sport, setSport] = useState("Sport");
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  

  // console.log(title, description, price, sport, date);

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
        sport !== "Sport" &&
        date !== "" &&
        thumbnail !== null
      ) {
        await api.post("/event/create", eventData, { headers: { user_id } });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
        console.log("Missing required message");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const sportEventHandler = (sport)=>{
    setSport(sport);
  }

  console.log(sport);

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
        
        <FormGroup>
          <label>Sports:</label>
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} >
            <DropdownToggle caret>{sport}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={()=>sportEventHandler('running')}>Running</DropdownItem>
              <DropdownItem onClick={()=>sportEventHandler('cycling')}>Cycling</DropdownItem>
              <DropdownItem onClick={()=>sportEventHandler('swiming')}>Swiming</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </FormGroup>

        <FormGroup>
          <Button type="submit" className="submit-btn">
            Create event
          </Button>
        </FormGroup>
        <FormGroup>
          <Button className="secondary-btn" onClick={() => history.push("/")}>
            dashboard
          </Button>
        </FormGroup>
      </Form>
      {error ? (
        <Alert className="event-validation" color="danger">
          Missing required information
        </Alert>
      ) : (
        ""
      )}
      {success ? (
        <Alert className="event-validation" color="success">
          Event created successfully
        </Alert>
      ) : (
        ""
      )}
    </Container>
  );
};

export default EventsPage;

import React, { useState,useContext } from "react";
import api from "../../services/api";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
} from "reactstrap";
import { UserContext } from "../../User-context";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`result: ${email} " " ${password} `);

    try {
      const response = await api.post("/login", { email, password });
      const user_id = response.data.user_id || false;
      const user = response.data.user || false;

      if (user_id) {
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);
        setIsLoggedIn(true);
        history.push("/");
      } else {
        const { message } = response.data;
        setError(true);
        setErrorMessage(message);
        setTimeout(()=>{
          setError(false);
          setErrorMessage("");
        },2000)
      }
    } catch (error) {
      console.log("Error , the server return an error" , error);
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <p>
        Please <strong>Login into your account</strong>
      </p>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
        <FormGroup className="form-group"></FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Your email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Your password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>
        </div>
        <FormGroup>
        <Button className="submit-btn">Submit</Button>
        </FormGroup>
        <FormGroup>
        <Button className="secondary-btn" onClick={()=> history.push("/register")}>New Account</Button>
        </FormGroup>
      </Form>
      {error ? (
        <Alert className="event-validation" color="danger">
          {errorMessage}
        </Alert>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Login;

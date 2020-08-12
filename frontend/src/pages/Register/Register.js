import React , {useState} from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Label, Input, Container,Alert } from "reactstrap";

const Register = ({history}) => {
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log(`result: ${email} " " ${password} "" ${firstName} "" ${lastName} `);

        try {
          if(email !== "" && password !== "" && firstName !== "" && lastName !== "" ){
            const response = await api.post("/user/register" , {email,password,firstName,lastName});
            const user_id = response.data._id || false
    
            if(user_id){
                localStorage.setItem('user' , user_id)
                history.push('/');
            }else{
                const {message} = response.data;
                setError(true);
                setErrorMessage(message);
                setTimeout(()=>{
                  setError(false);
                  setErrorMessage("");
                },2000)
            }
          }else{
            setError(true);
            setErrorMessage("You need to field all inputs");
            setTimeout(()=>{
              setError(false);
              setErrorMessage("");
            },2000)
            
          }
         
        } catch (error) {
          
        }
       
    }

  return (
    <Container>
      <h2>Registration</h2>
      <p>Create <strong>a new account</strong></p>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">
            First name
          </Label>
          <Input
            type="text"
            name="firstName"
            id="your name"
            placeholder="Your email"
            onChange={(event)=> setFirstName(event.target.value)}
          />
        </FormGroup>

        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">
            Last name
          </Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last name"
            onChange={(event)=> setLastName(event.target.value)}
          />
        </FormGroup>

        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Your email"
            onChange={(event)=> setEmail(event.target.value)}
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
            onChange={(event)=> setPassword(event.target.value)}
          />
        </FormGroup>
        </div>
        <FormGroup>
        <Button className="submit-btn">Submit</Button>
        </FormGroup>
        <FormGroup>
        <Button className="secondary-btn" onClick={()=> history.push("/login")}>login</Button>
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

export default Register;

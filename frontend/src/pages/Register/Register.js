import React , {useState} from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

const Register = ({history}) => {
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');

    const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log(`result: ${email} " " ${password} "" ${firstName} "" ${lastName} `);
        const response = await api.post("/user/register" , {email,password,firstName,lastName});
        const user_id = response.data._id || false

        if(user_id){
            localStorage.setItem('user' , user_id)
            history.push('/dashboard');
        }else{
            const {message} = response.data;
            console.log(message);
        }
    }

  return (
    <Container>
      <h2>Registration</h2>
      <p>Create <strong>a new account</strong></p>
      <Form onSubmit={handleSubmit}>
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
        <Button>Submit</Button>
      </Form>
    </Container>
  );
};

export default Register;

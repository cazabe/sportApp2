import React , {useState} from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

const Login = ({history}) => {
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');

    const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log(`result: ${email} " " ${password} `);
        const response = await api.post("/login" , {email,password});
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
      <h2>Login</h2>
      <p>Please <strong>Login into your account</strong></p>
      <Form onSubmit={handleSubmit}>
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

export default Login;

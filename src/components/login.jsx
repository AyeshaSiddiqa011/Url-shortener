import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import * as Yup from "yup"
const login = () => {
    const [error, setError] = useState([])
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name] : value,
        }))
        }

    const handleLogin = async () => {
        setError([])
        try{
            const schema = Yup.object().shape({
                email: Yup.string()
                .email("Invalid Email")
                .required("Email is Required"),
                password: Yup.string()
                .min(6, "Password must be atleast 6 characters")
                .required("Password is Required"),
            })
            await schema.validate(formData, {abortEarly: false})
        }catch(error){
            const newError = {};
            error?.forEach((err) => {
                newError[err.path] = err.message;
            })
            setError(newError)
        }
    }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Please fill the details</CardDescription>
        <Error message={}/>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input name="email" type="email" placeholder="Email" onChange={handleInputChange} />
          <Error message={}/>
        </div>
        <div className="space-y-1">
          <Input name="password" type="password" placeholder="Password" onChange={handleInputChange} />
          <Error message={}/>
        </div>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        {true ? <BeatLoader size={10} color="grey" /> : "Login"}
        <Button onClick={handleLogin}>Login</Button>
      </CardFooter>
    </Card>
  );
};

export default login;

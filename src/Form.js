import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  width: 50%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: linear-gradient(to right, #007bff, #00bfff);
  height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 50%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  align-items: left;
  display: flex;
  padding-left: 20px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Error = styled.span`
  display: flex;
  color: red;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 50px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Form = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newFormErrors = {};

    // Name validation
    if (formData.name.trim() === "") {
      newFormErrors.name = "Name is required";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newFormErrors.email = "Invalid email address";
      valid = false;
    }

    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      newFormErrors.mobile = "Invalid mobile number";
      valid = false;
    }

    // Address validation
    if (formData.address.trim() === "") {
      newFormErrors.address = "Address is required";
      valid = false;
    }

    // Password validation
    if (formData.password.length < 6) {
      newFormErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setFormErrors(newFormErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Save data to the API using Axios
        const response = await axios.post(
          "https://crudcrud.com/api/0f0f7631454642188fed5dddc6c5f860/sanya",
          { ...formData, timestamp: new Date().toISOString() }
        );

        console.log("Data successfully submitted:", response.data);
        navigate("DataTable");
      } catch (error) {
        console.error("Error submitting data to the API:", error);
      }

      // Clear form data
      setFormData({
        name: "",
        email: "",
        mobile: "",
        address: "",
        password: "",
      });
    }
  };

  return (
    <Container>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name:</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Error>{formErrors.name}</Error>
          </FormGroup>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Error>{formErrors.email}</Error>
          </FormGroup>
          <FormGroup>
            <Label>Mobile:</Label>
            <Input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <Error>{formErrors.mobile}</Error>
          </FormGroup>
          <FormGroup>
            <Label>Address:</Label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <Error>{formErrors.address}</Error>
          </FormGroup>
          <FormGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Error>{formErrors.password}</Error>
          </FormGroup>
          <SubmitButton type="submit">Submit</SubmitButton>
        </form>
      </FormContainer>
      <ImageContainer>
        <Image src="Images/login.jpg" alt="img" />
      </ImageContainer>
    </Container>
  );
};

export default Form;

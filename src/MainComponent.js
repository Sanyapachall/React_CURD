import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ApiUrl =
  "https://crudcrud.com/api/ef34715e2c8b4b9e9bc0542dab17d05f/sanya";

const MainComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const [tableData, setTableData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    // Fetch data from the API on component mount
    fetchData();
  }, []);

  const fetchData = async() => {
    await fetch(ApiUrl)
      .then((response) => response.json())
      .then((data) =>{console.log(data);
         setTableData(data)})
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editItemId) {
      // Edit existing data
      await fetch(`${ApiUrl}/${editItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setTableData((prevTableData) =>
          prevTableData.map((item) =>
            item._id === editItemId ? data : item
          )
        );
          setFormData({
            name: "",
            age: "",
            address: "",
            email: "",
            password: "",
            mobileNumber: "",
          });
          setEditItemId(null);
          
          // Update the tableData with the edited data
          // setTableData((prevTableData) => {
          //   const updatedData = prevTableData.map((item) =>
          //     item._id === editItemId ? data : item
          //   );
          //   return updatedData;
          // });
        })
        .catch((error) => console.error("Error editing data:", error));
       
    } else {
      // Add new data
      await fetch(ApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          setFormData({
            name: "",
            age: "",
            address: "",
            email: "",
            password: "",
            mobileNumber: "",
          });
          // Fetch and update tableData after adding
          fetchData();
        })
        .catch((error) => console.error("Error adding data:", error));
    }
    await fetchData();
  };

  const handleEdit = (id) => {
    // Set form data to the selected item for editing
    const editItem = tableData.find((data) => data._id === id);
    if (editItem) {
      setFormData({
        name: editItem.name,
        age: editItem.age,
        address: editItem.address,
        email: editItem.email,
        password: editItem.password,
        mobileNumber: editItem.mobileNumber,
      });
      setEditItemId(id);
    } else {
      console.error(`Item with ID ${id} not found for editing`);
    }
  };

  const handleDelete = (id) => {
    // Delete data from the API
    fetch(`${ApiUrl}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Update tableData after deletion
        setTableData((prevTableData) =>
          prevTableData.filter((item) => item._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ marginBottom: "10px", width: "300px" }}
        />
        <TextField
          label="Age"
          variant="outlined"
          name="age"
          value={formData.age}
          onChange={handleChange}
          type="number"
          style={{ marginBottom: "10px", width: "300px" }}
        />
        <TextField
          label="Address"
          variant="outlined"
          name="address"
          value={formData.address}
          onChange={handleChange}
          style={{ marginBottom: "10px", width: "300px" }}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          style={{ marginBottom: "10px", width: "300px" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          style={{ marginBottom: "10px", width: "300px" }}
        />
        <TextField
          label="Mobile Number"
          variant="outlined"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          type="tel"
          style={{ marginBottom: "10px", width: "300px" }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ width: "150px" }}
        >
          {editItemId ? "Edit" : "Submit"}
        </Button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((data) => (
                <TableRow key={data._id}>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.age}</TableCell>
                  <TableCell>{data.address}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.password}</TableCell>
                  <TableCell>{data.mobileNumber}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(data._id)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(data._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default MainComponent;

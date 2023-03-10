import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [inputs, setInputs] = useState({
    name: " ",
    petType: " ",
    description: " ",
    skill1: " ",
    skill2: " ",
    skill3: " ",
  });
  const [backEndErrors, setbackEndErrors] = useState(null);
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/addPet", {
        ...inputs,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.err.code === 11000) {
          setbackEndErrors(err.response.data.err.errors);
        }
        if (err.response.data.err) {
          setbackEndErrors(err.response.data.err.errors);
        }
      });
  };
  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <h1>Pet Shelter</h1>
        <p>Know a pet needing a home?</p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          border: "1px solid black",
          width: "600px",
          padding: "30px",
          margin: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ textAlign: "left" }}>Pet Name:</label> <br></br>
          <input name="name" value={inputs.name} onChange={onChangeHandler} />
          <br></br>
          {backEndErrors && backEndErrors.name && (
            <p style={{ color: "red" }}>{backEndErrors.name.message}</p>
          )}
          <label style={{ textAlign: "left" }}>Pet Type:</label> <br></br>
          <input
            name="petType"
            value={inputs.petType}
            onChange={onChangeHandler}
          />
          {backEndErrors && backEndErrors.petType && (
            <p style={{ color: "red" }}>{backEndErrors.petType.message}</p>
          )}
          <br></br>
          <label style={{ textAlign: "left" }}>Pet Description:</label>{" "}
          <br></br>
          <input
            name="description"
            value={inputs.description}
            onChange={onChangeHandler}
          />
          {backEndErrors && backEndErrors.description && (
            <p style={{ color: "red" }}>{backEndErrors.description.message}</p>
          )}{" "}
          <br></br>
          <button
            style={{
              color: "white",
              backgroundColor: "blue",
              boxShadow: "2px 2px black",
            }}
          >
            Add Pet
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h6>Skills (optional)</h6>
          <label style={{ textAlign: "left" }}>Skill 1:</label> <br></br>
          <input
            name="skill1"
            value={inputs.skill1}
            onChange={onChangeHandler}
          />
          <label style={{ textAlign: "left" }}>Skill 2:</label> <br></br>
          <input
            name="skill2"
            value={inputs.skill2}
            onChange={onChangeHandler}
          />
          <label style={{ textAlign: "left" }}>Skill 3:</label> <br></br>
          <input
            name="skill3"
            value={inputs.skill3}
            onChange={onChangeHandler}
          />{" "}
          <br></br>
        </div>
      </form>
    </div>
  );
};

export default Form;

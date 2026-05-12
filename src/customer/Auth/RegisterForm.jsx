import React from "react";
import { Button, TextField, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "State/Auth/Action";

const RegisterForm = ({ switchToLogin }) => {
  const dispatch = useDispatch();

  // FIXED: select only auth slice
  const auth = useSelector((store) => store.auth);
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(register(userData));

    console.log("userData:", userData);
    // alert("Submitted successfully! Check console."); // optional, can remove later
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            size="small"
          />

          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            size="small"
          />
        </Box>

        <TextField
          required
          id="email"
          name="email"
          label="Email"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />

        <TextField
          required
          id="password"
          name="password"
          label="Password"
          type="password"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            py: 1.2,
            textTransform: "uppercase",
            fontWeight: "bold",
            borderRadius: "4px",
            padding: ".8rem 0",
            bgcolor: "#9155FD",
            "&:hover": {
              bgcolor: "#7E3FF2",
            },
          }}
        >
          Register
        </Button>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p>if you have already account ?</p>
          <Button
            onClick={switchToLogin}
            className="ml-5"
            size="small"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
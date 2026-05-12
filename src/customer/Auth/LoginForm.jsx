import React from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "State/Auth/Action";

const LoginForm = ({ switchToRegister, handleClose }) => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    console.log("Login userData:", userData);

    // REAL LOGIN CALL
    dispatch(login(userData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </form>

      {/* Show login error if backend sends wrong password */}
      {auth?.error && (
        <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
          {auth.error}
        </p>
      )}

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p>if you don't have an account ?</p>
          <Button onClick={switchToRegister} className="ml-5" size="small">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
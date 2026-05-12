import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
};

const AuthModal = ({ open, handleClose, mode = "register" }) => {
  const [currentMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode, open]);

  const switchToLogin = () => {
    setCurrentMode("login");
  };

  const switchToRegister = () => {
    setCurrentMode("register");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-description"
    >
      <Box sx={style}>
        {currentMode === "login" ? (
          <LoginForm switchToRegister={switchToRegister} handleClose={handleClose} />
        ) : (
          <RegisterForm switchToLogin={switchToLogin} handleClose={handleClose} />
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
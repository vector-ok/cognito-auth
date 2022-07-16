import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
} from '@mui/material';
import config from '../../config';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import styles from './styles';

export default function Login({ handleSuccess, handleMessage }) {
  const [confirm, setConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputs, setInputs] = useState({
    loginEmail: '',
    password: '',
  });

  let navigate = useNavigate();

  useEffect(() => {
    if (errorMessage.includes(`UserNotConfirmedException`)) {
      handleSuccess(true);
      return setConfirm(true);
    }
    handleSuccess(false);
    return setConfirm(false);
  }, [errorMessage, confirm]);

  const handleInputs = (e) => {
    inputs[e.target.name] = e.target.value;
    setInputs({ ...inputs });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    inputs[event.target.name] = event.target.value;
    setInputs({ ...inputs });
    if ((inputs.password === '') | null)
      return handleMessage('password field must not be empty');
    try {
      const userData = new CognitoUser({
        Username: inputs.loginEmail,
        Pool: config,
      });

      const authDetails = new AuthenticationDetails({
        Username: inputs.loginEmail,
        Password: inputs.password,
      });

      userData.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('onSuccess: ', data);
          handleSuccess(true);
          handleMessage(`SUCCESS! You just logged in.`);
          return navigate('dashboard');
        },
        onFailure: (error) => {
          console.error('onFailure: ', error);
          setErrorMessage(`ERROR ${error}`);
          handleMessage(`ERROR ${error}`);
          handleSuccess(false);
        },
      });
    } catch (error) {
      setErrorMessage(`ERROR ${error}`);
      handleMessage(`ERROR ${error}`);
      handleSuccess(false);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="loginEmail"
          label="Email Address"
          name="loginEmail"
          type="email"
          autoComplete="email"
          autoFocus
          onChange={(event) => handleInputs(event)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => handleInputs(e)}
        />
        <Box sx={styles.submitBox}>
          <Link href="#" variant="body2" fullWidth>
            Forgot password?
          </Link>
          <Button
            type="submit"
            variant="contained"
            // fullWidth
            sx={{ ml: 3, maxWidth: '50%', backgroundColor: 'green' }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

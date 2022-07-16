import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Alert,
  Stack,
  Typography,
  Slide,
} from '@mui/material';
import styles from './styles';
import config from '../../config';

const Signup = ({ handleSuccess, handleMessage, checkUser }) => {
  const [checked, setChecked] = useState(false);
  const [inputs, setInputs] = useState({
    signupEmail: '',
    password: '',
  });

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleInputs = (e) => {
    inputs[e.target.name] = e.target.value;
    setInputs({ ...inputs });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (inputs.password === '') {
      inputs.password = '12345678';
      inputs.username = '';
    }
    try {
      await config.signUp(
        inputs.signupEmail,
        inputs.password,
        [],
        null,
        (err, data) => {
          if (err) {
            checkUser('');
            handleSuccess(false);
            return handleMessage(`ERROR ${err}`);
          }
          // console.log('data is ', data);
          console.log('username is ', data.user.username);
          checkUser(data.user);
          handleSuccess(true);
          handleMessage(
            `SUCCESS! You just signed up ${data.user.username}. Your default password is 12345678. Enter the verification code sent to your email below.`
          );
        }
      );
    } catch (error) {
      console.error('catch error is ', error);
      checkUser('');
      handleSuccess(false);
      handleMessage(`ERROR ${error}`);
    }
  };

  return (
    <Grid>
      <Typography sx={styles.title}>Let's get started</Typography>
      <Box sx={{ display: '' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="signupEmail"
          label="Enter your Email ID"
          name="signupEmail"
          type="email"
          autoComplete="email"
          onChange={(e) => handleInputs(e)}
        />
        <Box sx={{ marginTop: 2, marginLeft: 5 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckbox}
                inputProps={{
                  'aria-label': 'controlled',
                }}
              />
            }
            label='I Agree with processing my personal data in conformity with the Privacy Policy. When clicking on "Get Started", you also agree with the End User license Agreement.'
          />
        </Box>

        <Box
          component="form"
          noValidate
          onSubmit={handleSignup}
          sx={styles.submitBox}
        >
          <Button
            md
            type="submit"
            // fullWidth
            variant="outlined"
            sx={{
              mt: 1,
              mb: 2,
              color: 'green',
            }}
            disabled={!checked}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default Signup;

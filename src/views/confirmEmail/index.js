import React, { useState } from 'react';
import { Button, TextField, Box, Grid, Typography } from '@mui/material';
import styles from './styles';

const ConfirmEmail = ({ handleSuccess, handleMessage, user }) => {
  const [checked, setChecked] = useState(false);

  const [inputs, setInputs] = useState({
    verificationCode: '',
  });

  const handleInputs = (e) => {
    inputs[e.target.name] = e.target.value;
    setInputs({ ...inputs });
    inputs[e.target.name].length > 0 ? setChecked(true) : setChecked(false);
  };

  const handleVerification = async (event) => {
    event.preventDefault();
    try {
      await user.confirmRegistration(
        inputs.verificationCode,
        true,
        (error, result) => {
          if (error) {
            handleSuccess(false);
            return handleMessage(`ERROR ${error}`);
            // return console.error('confirm error is ', error);
          }
          handleSuccess(true);
          handleMessage(
            `SUCCESS! Email verified. Your default password is 12345678. Proceed to Login.`
          );
        }
      );
    } catch (error) {
      handleSuccess(false);
      handleMessage(`ERROR ${error}`);
    }
  };

  return (
    <Grid sx={{ marginTop: 5 }}>
      <Typography sx={styles.title}>Confirm Your Email</Typography>
      <Typography>Enter the verification code sent to your email</Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleVerification}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="verificationCode"
          label="Enter code"
          name="verificationCode"
          type="email"
          autoComplete="email"
          onChange={(e) => handleInputs(e)}
        />
        <Box sx={styles.submitBox}>
          <Button
            md
            type="submit"
            variant="outlined"
            sx={{
              mt: 1,
              mb: 2,
              color: 'green',
            }}
            disabled={!checked}
          >
            Confirm Email
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default ConfirmEmail;

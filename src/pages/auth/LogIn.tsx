import { useLogIn } from '@/services/auth';
import { TextField, Button, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const logIn = useLogIn();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logIn({ email, password });
  };

  return (
    <Container maxWidth="sm" sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h2">Log In</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type={'submit'} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </Typography>
      </form>
    </Container>
  );
};

export default LogIn;

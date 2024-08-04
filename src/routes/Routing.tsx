import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PokemonList from '@/pages/PokemonList';
import PokemonBattle from '@/pages/PokemonBattle';
import AppBar from '@/components/AppBar';
import { ProtectedRoute } from './ProtectedRoute';
import LogIn from '@/pages/auth/LogIn';
import SignUp from '@/pages/auth/SignUp';

const Routing = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PokemonList />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/card/:id"
          element={
            <ProtectedRoute>
              <PokemonBattle />{' '}
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default Routing;

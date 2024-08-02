import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PokemonList from '@/pages/PokemonList';
import PokemonBattle from '@/pages/PokemonBattle';
import AppBar from '@/components/AppBar';

const Routing = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/card/:id" element={<PokemonBattle />} />
      </Routes>
    </>
  );
};

export default Routing;

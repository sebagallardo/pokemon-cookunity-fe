import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from '@/components/AppBar/AppBar';
import PokemonList from '@/pages/PokemonList';
import PokemonCard from '@/pages/PokemonCard';

const Routing = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/card/:id" element={<PokemonCard />} />
      </Routes>
    </>
  );
};

export default Routing;

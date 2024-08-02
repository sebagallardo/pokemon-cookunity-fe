import { Pokemon, useGetAllPokemonQuery } from '@/services/pokemon';
import React from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';
import PokemonCard from '@/components/PokemonCard';

const PokemonList = () => {
  const { data, isLoading } = useGetAllPokemonQuery();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Grid container spacing={6} p={2}>
      {data &&
        data.map((pokemon: Pokemon) => (
          <Grid item key={pokemon.id} lg={3} md={6} sm={12}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
    </Grid>
  );
};

export default PokemonList;

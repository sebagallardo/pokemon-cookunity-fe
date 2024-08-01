import { useGetAllPokemonQuery } from '@/services/pokemon';
import React from 'react';

const PokemonList = () => {
  const { data, isLoading } = useGetAllPokemonQuery();

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div>
      {data.map((pokemon: any) => (
        <div key={pokemon.id}>{pokemon.name}</div>
      ))}
    </div>
  );
};

export default PokemonList;

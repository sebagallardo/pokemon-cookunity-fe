import { useQuery } from 'react-query';

// Get a pokemon
const getPokemon = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pokemon/${id}`);
  const data = await response.json();
  return data;
};

// Get all pokemon
const getAllPokemon = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pokemon`);
  const data = await response.json();
  return data;
};

// Simulate a battle
const simulateBattle = async (attackerId: string, defenderId: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pokemon/simulation/${attackerId}/${defenderId}`);
  const data = await response.json();
  return data;
};

// Analyze Pokemon
const analyzePokemon = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pokemon/analyze/${id}`);
  const data = await response.json();
  return data;
};

// Query to get a pokemon
export const useGetPokemonQuery = (id: string) => {
  return useQuery(['pokemon', id], () => getPokemon(id));
};

// Query to get all pokemon
export const useGetAllPokemonQuery = () => {
  return useQuery('all-pokemon', getAllPokemon);
};

// Query to simulate a battle
export const useSimulateBattleQuery = (attackerId: string, defenderId: string) => {
  return useQuery(['simulation', attackerId, defenderId], () => simulateBattle(attackerId, defenderId));
};

// Query to analyze a pokemon
export const useAnalyzePokemonQuery = (id: string) => {
  return useQuery(['analyze', id], () => analyzePokemon(id));
};

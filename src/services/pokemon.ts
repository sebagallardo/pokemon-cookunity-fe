import { useQuery } from 'react-query';

export interface Pokemon {
  id: string;
  name: string;
  hp: number;
  power: number;
  picture: string;
  type: string;
}

export interface SimulationResult {
  attacker: string;
  defender: string;
  originalAttack: number;
  attackModified: number;
  succeed: boolean;
}

export interface AnalysisResult {
  weakAgainst: string[];
  resistantTo: string[];
}

// Get a pokemon
const getPokemon = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

// Get all pokemon
const getAllPokemon = async (): Promise<Pokemon[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pokemon`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

// Simulate a battle
const simulateBattle = async (attackerId: string, defenderId: string): Promise<SimulationResult> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pokemon/simulation/${attackerId}/${defenderId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

// Analyze Pokemon
const analyzePokemon = async (id: string): Promise<AnalysisResult> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pokemon/analyze/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
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
export const useSimulateBattleQuery = (attackerId: string, defenderId: string, enabled: boolean) => {
  return useQuery(['simulation', attackerId, defenderId], () => simulateBattle(attackerId, defenderId), {
    enabled,
  });
};

// Query to analyze a pokemon
export const useAnalyzePokemonQuery = (id: string) => {
  return useQuery(['analyze', id], () => analyzePokemon(id));
};

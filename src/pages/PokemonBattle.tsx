import React, { useState } from 'react';
import PokemonCard from '@/components/PokemonCard';
import { Pokemon, useGetAllPokemonQuery, useGetPokemonQuery, useSimulateBattleQuery } from '@/services/pokemon';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const PokemonBattle = () => {
  const { id } = useParams() as { id: string };
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  const [displayResults, setDisplayResults] = useState(false);
  const { data: pokemon, isLoading: pokemonLoading, isError: pokemonError } = useGetPokemonQuery(id);
  const { data: allPokemon, isLoading: allPokemonLoading, isError: allPokemonError } = useGetAllPokemonQuery();
  const {
    data: battleResult,
    isLoading: battleLoading,
    isError: battleError,
    refetch,
  } = useSimulateBattleQuery(id, selectedPokemon?.id || '', !!selectedPokemon);

  const handleSimulation = () => {
    refetch();
    setDisplayResults(true);
  };

  if (pokemonLoading && allPokemonLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (pokemonError || allPokemonError) {
    return <div>Oops, there was an error loading this page. Try again later.</div>;
  }

  return (
    <>
      <Grid container p={4}>
        <Grid item lg={5} md={5} sm={12}>
          {pokemon && (
            <Box m={5}>
              <PokemonCard pokemon={pokemon} disabled />
            </Box>
          )}
        </Grid>
        <Grid item lg={2} md={2} sm={12} alignContent={'center'} textAlign={'center'}>
          <Chip label="VS" color="warning" variant="filled" size="medium" sx={{ fontSize: '20px' }} />
        </Grid>
        <Grid item lg={5} md={5} sm={12}>
          <Box m={5}>
            {selectedPokemon ? (
              <PokemonCard pokemon={selectedPokemon} disabled />
            ) : (
              <Autocomplete
                id="select-pokemon"
                options={allPokemon || []}
                getOptionLabel={(option) => option.name}
                value={selectedPokemon}
                onChange={(e, value) => {
                  setSelectedPokemon(value ?? undefined);
                }}
                sx={{ backgroundColor: 'white', width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Select a Pokemon" />}
              />
            )}
          </Box>
        </Grid>
        <Grid item lg={12} display={'flex'} alignItems={'center'} flexDirection={'column'}>
          {!displayResults && (
            <Button
              sx={{ m: 1, width: '10%', fontWeight: 'bold' }}
              variant="contained"
              color="primary"
              onClick={handleSimulation}
              disabled={!selectedPokemon}
            >
              Battle!
            </Button>
          )}
          <Button
            sx={{ m: 1, width: '10%' }}
            variant="outlined"
            color="error"
            onClick={() => {
              setSelectedPokemon(undefined);
              setDisplayResults(false);
            }}
            disabled={!selectedPokemon}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
      <Grid container p={2} pt={0} justifyContent={'center'}>
        {displayResults && (
          <>
            {battleLoading && <CircularProgress />}
            {battleError && <div>Oops, there was an error loading this page. Try again later.</div>}

            {battleResult && (
              <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <CardHeader
                  titleTypographyProps={{
                    variant: 'h2',
                    align: 'center',
                    color: battleResult.succeed ? 'green' : 'red',
                  }}
                  title={battleResult.succeed ? `${battleResult.attacker} Wins!` : `${battleResult.defender} Defends!`}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={battleResult.succeed ? pokemon?.picture : selectedPokemon?.picture}
                  alt="Pokemon picture"
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" component="h2" color={'green'}></Typography>
                  <Typography variant="h5" component="p" noWrap>
                    Original Attack:
                  </Typography>
                  <Typography variant="h4" component="p">
                    {battleResult.originalAttack}
                  </Typography>
                  <Typography variant="h5" component="p" noWrap>
                    Attack Modified:
                  </Typography>
                  <Typography variant="h4" component="p">
                    {battleResult.attackModified}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default PokemonBattle;

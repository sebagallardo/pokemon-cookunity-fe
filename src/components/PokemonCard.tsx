import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Pokemon } from '@/services/pokemon';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import AdjustIcon from '@mui/icons-material/Adjust';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface PokemonCardProps {
  pokemon: Pokemon;
  disabled?: boolean;
}

const PokemonCardBase = ({ pokemon, disabled }: PokemonCardProps) => {
  return (
    <Card raised>
      <CardActionArea disabled={disabled}>
        <CardHeader
          titleTypographyProps={{ variant: 'h3' }}
          title={pokemon.name}
          action={
            <Typography sx={{ mt: '4px', display: 'flex' }} variant="h3">
              <FavoriteBorderIcon color="error" /> {pokemon.hp}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          height="194"
          sx={{ objectFit: 'contain' }}
          image={pokemon.picture || 'https://static.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png'}
          alt="Pokemon picture"
        />
        <CardContent>
          {/* <Typography variant="h5">Type: {pokemon.type}</Typography>
          <Typography variant="h5">Power: {pokemon.power}</Typography>
          <Typography variant="h5">Rarity: {'Common (TODO)'}</Typography> */}
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BlurOnIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                  primary={pokemon.type}
                  secondary={'Type'}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AdjustIcon color="info" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                  primary={pokemon.power}
                  secondary={'Attack Power'}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const PokemonCard = (props: PokemonCardProps) => {
  const { pokemon, disabled } = props;
  return disabled ? (
    <PokemonCardBase {...props} />
  ) : (
    <Link to={`/card/${pokemon.id}`} style={{ textDecoration: 'none' }}>
      <PokemonCardBase {...props} />
    </Link>
  );
};

export default PokemonCard;

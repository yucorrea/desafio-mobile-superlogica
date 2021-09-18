import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from "@expo/vector-icons";

import theme from '../../global/styles/theme';

import {
  selectFavorite,
  removeFavoriteCharacter,
  addFavoriteCharacter
} from '../../redux/reducers/favorite';

import {
  Name,
  Header,
  Avatar,
  Footer,
  Status,
  Specie,
  Content,
  FirstTitle,
  LastTitle,
  Episode,
  ActionsContainer,
  EpisodeButton,
  EpisodeButtonText,
  FavoriteButton,
  FavoriteButtonText,
} from './styles';


export function DetailCharacter()  {
 
  const {  favorites } = useSelector(selectFavorite)
  const character = useSelector(state => state.selectedCharacter.character)

  const [firstSeen, setFirstSeen] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    fetchEpisodes(character.episode[0])
  },[character])

  const handleRemoveCharacter = (id: number) => {
    dispatch(removeFavoriteCharacter(id))
  }

  const handleAddCharacter = (id : number) => {
    dispatch(addFavoriteCharacter(id))
  }

  const ifExists = (id: number) => {
    if (favorites.filter((item: number) => item === id).length > 0) {
      return true;
    }

    return false;
  }

  const handleNavigateToEpisodes = useCallback(() => {
    //@ts-ignore
    navigation.navigate('Episode', { episode: character.episode })
  }, [character])

  function fetchEpisodes(url: string) {
    fetch(url).then(res => res.json()).then(res => setFirstSeen(res.name))
  }

  const navigation = useNavigation()

  return (
      <>
        <Header>
          <Name>{character.name}</Name>
          <Avatar source={{ uri: character.image }} />
          <Footer>
            <Status status={character.status} />
            <Specie>{character.species}</Specie>
          </Footer>
        </Header>

        <Content>
          <LastTitle>Last know location:</LastTitle>
          <Episode>{character.location.name}</Episode>

          <FirstTitle>First seen in:</FirstTitle>
          <Episode>{firstSeen ?? '-'}</Episode>

          <ActionsContainer>
            <EpisodeButton onPress={handleNavigateToEpisodes}>
              <Feather size={24} color={theme.colors.primary} name="play" />
              <EpisodeButtonText>Episodes</EpisodeButtonText>
            </EpisodeButton>

          </ActionsContainer>
          <FavoriteButton
            color={ifExists(character.id) ? theme.colors.danger : theme.colors.primary}
            onPress={() =>
              ifExists(character.id) ? handleRemoveCharacter(character.id) : handleAddCharacter(character.id)
            }>
            <Feather size={24} color={theme.colors.title} name={ifExists(character.id) ? "trash" : "heart"} />
            <FavoriteButtonText>
              {ifExists(character.id) ? "Remove" : "Favorite"}
            </FavoriteButtonText>
          </FavoriteButton>
        </Content>
      </>
  )
}

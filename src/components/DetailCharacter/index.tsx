import React, { useCallback, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from "@expo/vector-icons";

import { Character as ICharacter } from '../../@types/character';

import { selectCharacter} from '../../redux/reducers/character';

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

function DetailCharacter()  {
 
  const {  character} = useSelector(selectCharacter)
  const {  favorites } = useSelector(selectFavorite)
  const [firstSeen, setFirstSeen] = useState('')

  useEffect(() => {
    fetchEpisodes(character.episode[0])
  },[character])

  const dispatch = useDispatch()

  const handleRemoveCharacter = (character: ICharacter) => {
    dispatch(removeFavoriteCharacter(character))
  }

  const handleAddCharacter = (character: ICharacter) => {
    dispatch(addFavoriteCharacter(character))
  }

  const ifExists = (character: ICharacter) => {
    if (favorites.filter((item: ICharacter) => item.id === character.id).length > 0) {
      return true;
    }

    return false;
  }

  const handleNavigateToEpisodes = useCallback(() => {
    //@ts-ignore
    navigation.navigate('Episodes', { episode: character.episode })
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
            color={ifExists(character) ? theme.colors.danger : theme.colors.primary}
            onPress={() =>
              ifExists(character) ? handleRemoveCharacter(character) : handleAddCharacter(character)
            }>
            <Feather size={24} color={theme.colors.title} name={ifExists(character) ? "trash" : "heart"} />
            <FavoriteButtonText>
              {ifExists(character) ? "Remove" : "Favorite"}
            </FavoriteButtonText>
          </FavoriteButton>
        </Content>
      </>
  )
}

export default DetailCharacter;

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Character as ICharacter } from '../../@types/character';
import theme from '../../global/styles/theme';

import { Character } from '../../components/Character';
import { Modal } from '../../components/Modal';

import { Container } from './styles';

import { selectedCharacter } from '../../redux/reducers/character';
import { useDispatch } from 'react-redux';
import DetailCharacter from '../../components/DetailCharacter';

export interface RouteProps {
  params: {
    characters: Array<string>,
    episode: string
  }
}

interface Props {
  route: RouteProps
}

function EpisodeCharacter({ route }: Props) {

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch()


  function fetchCharacters(url: string) {
    return fetch(url).then(res => res.json())
  }

  useEffect(() => {
    let promises = route.params.characters.map((url: string) => fetchCharacters(url))
    Promise.all(promises).then(res => setCharacters(res))

  }, [route.params])


  const handleEvent = (item: any) => {
    dispatch(selectedCharacter(item))
    setModal(true)
  }

  return (
    <Container>

      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <ActivityIndicator size="large" color={theme.colors.primary} />}
        renderItem={({ item }) => (
          <Character onPress={() => handleEvent(item)} data={item} />
        )}
      />

      <Modal show={modal} close={() => setModal(false)}>
        <DetailCharacter />
      </Modal>
    </Container>
  )
}

export default EpisodeCharacter;

import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';

import { Character as ICharacter } from '../../@types/character';

import theme from '../../global/styles/theme';

import { setCharacter } from "../../redux/reducers/selectedCharacter"

import { Character } from '../../components/Character';
import { Modal } from '../../components/Modal';
import { DetailCharacter } from '../../components/DetailCharacter';

import { Container } from './styles';

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

  const dispatch = useDispatch();

  function fetchCharacters(url: string) {
    return fetch(url).then(res => res.json())
  }

  useEffect(() => {
    let promises = route.params.characters.map((url: string) => fetchCharacters(url))
    Promise.all(promises).then(res => setCharacters(res))

  }, [route.params])


  const handleEvent = useCallback((item: any) => {
    dispatch(setCharacter(item))
    setModal(true)
  },[])

  const handleCloseModal = useCallback(() => {
    setModal(false)
  },[])


  const listEmpty = () => {
    return <ActivityIndicator size="large" color={theme.colors.primary} />
  }

  return (
    <Container>

      <FlatList
        data={characters}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listEmpty}
        renderItem={({ item }) => (
          <Character onPress={() => handleEvent(item)} data={item} />
        )}
      />

      <Modal show={modal} close={handleCloseModal}>
        <DetailCharacter />
      </Modal>
    </Container>
  )
}

export default EpisodeCharacter;

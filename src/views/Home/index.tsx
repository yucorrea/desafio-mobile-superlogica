import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Character as ICharacter } from '../../@types/character';

import { Character } from '../../components/Character';
import { Filter } from '../../components/Filter';
import { Modal } from '../../components/Modal';
import { DetailCharacter } from '../../components/DetailCharacter';

import {
  setLoading,
  selectCharacter,
  getAllCharacters
} from '../../redux/reducers/character';
import { setCharacter } from '../../redux/reducers/selectedCharacter';

import theme from '../../global/styles/theme';

import {
  Container,
  Title,
} from './styles';

function Home() {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const { characters, isLoading, totalPage, currentPage } = useSelector(selectCharacter)

  useEffect(() => {
    dispatch(setLoading(true))
    dispatch(getAllCharacters())
  }, [])

  const handleEvent = useCallback((item: ICharacter) => {
    dispatch(setCharacter(item))
    setModal(true)
  }, [])

  const handlePaginate = useCallback(() => {
    if(currentPage <= totalPage)
    dispatch(getAllCharacters())
  }, [totalPage, currentPage])

  const listEmpty = () => {
    return !isLoading && characters.length <= 0 ?
         <Title style={{ fontSize: 16 }}>No results found</Title> : null
  }

  const listFooter = () => {
    return isLoading ? <ActivityIndicator size="large" color={theme.colors.primary} /> : null
  }

  return (
    <Container>
      <Filter />

      <Title>Characters</Title>

      <FlatList
        data={characters}
        numColumns={2}
        keyExtractor={(item: ICharacter) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={handlePaginate}
        ListEmptyComponent={listEmpty}
        ListFooterComponent={listFooter}
        renderItem={({ item }) => (
          <Character onPress={() => handleEvent(item)} data={item} />
        )}
      />

      <Modal show={modal} close={() => setModal(false)}>
        <DetailCharacter />
      </Modal>

    </Container >
  )
}

export default Home;

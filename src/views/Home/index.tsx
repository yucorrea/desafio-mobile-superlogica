import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Character as ICharacter } from '../../@types/character';

import { Character } from '../../components/Character';
import { Filter } from '../../components/Filter';
import { Modal } from '../../components/Modal';
import DetailCharacter from '../../components/DetailCharacter';

import {
  addCharacters,
  selectCharacter
} from '../../redux/reducers/character';

import api from '../../services/api';
import theme from '../../global/styles/theme';

import {
  Container,
  Title,
} from './styles';

function Home() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState({} as ICharacter);
  const [modal, setModal] = useState(false);

  const { characters, filtering } = useSelector(selectCharacter)

  useEffect(() => {
    fetchCharacters()
  }, [currentPage])

  const fetchCharacters = () => {
    setIsLoading(true)
    api.get(`/character?&page=${currentPage}`).then(res => {

      dispatch(addCharacters([...characters, ...res.data.results]))

      setIsLoading(false)
    }).catch((err) => {
      Alert.alert('Erro inesperado', 'Não foi possível buscar os dados')
    });
  }

  const handleEvent = (item: any) => {
    setCharacter(item)
    setModal(true)
  }

  const handlePaginate = () => {
    if (!isLoading && !filtering) {
      setCurrentPage(currentPage + 1)
    }
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
        ListEmptyComponent={
          () => (
            <>
              { ( !isLoading && characters.length <= 0) 
                ? (<Title style={{fontSize: 16}}>No results found</Title>)
                : null
              }
            </>
          )
        }
        ListFooterComponent={
          () => (
            <>
              {isLoading ? (<ActivityIndicator size="large" color={theme.colors.primary} />) : null}
            </>
          )
        }
        renderItem={({ item }) => (
          <Character onPress={() => handleEvent(item)} data={item} />
        )}
      />

      <Modal show={modal} close={() => setModal(false)}>
        <DetailCharacter character={character}/>
      </Modal>

    </Container >
  )
}

export default Home;

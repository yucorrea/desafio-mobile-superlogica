import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import theme from '../../global/styles/theme';
import api from '../../services/api';

import { 
  Container, 
  Chapter, 
  Wrapper,
  Title, 
  Date,
  Line,
 } from './styles';

function Episodes()  {

  const [episodes, setEpisodes] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)

  function fetchEpisodes() {
    setIsLoading(true)
    api.get(`/episode?&page=${currentPage}`).then(res => {

      setEpisodes([...episodes, ...res.data.results ])

      setIsLoading(false)
    }).catch((err) => {
      setIsLoading(false)
    });
  }

  useEffect(() => {
    fetchEpisodes()
  }, [currentPage])


  const handlePaginate = useCallback(() => {
    if (!isLoading ) {
      setCurrentPage(currentPage + 1)
    }
  },[isLoading, currentPage])

  return (
    <Container>

      <FlatList 
        data={episodes}
        ItemSeparatorComponent={() => <Line />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={handlePaginate}
        ListFooterComponent={
          () => (
            <>
              {isLoading ? (<ActivityIndicator size="large" color={theme.colors.primary} />) : null}
            </>
          )
        }
        renderItem={({item}) => (
          <Chapter>
            <Title>{item.episode}</Title>

            <Wrapper>
              <Title style={{fontSize: 14}} numberOfLines={1}>{item.name}</Title>
              <Date>{item.air_date}</Date>
            </Wrapper>
          </Chapter>
        )}
      />
    </Container>
  )
}

export default Episodes;

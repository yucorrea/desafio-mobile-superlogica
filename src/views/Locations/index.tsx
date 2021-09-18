import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import theme from '../../global/styles/theme';
import api from '../../services/api';

import { 
  Container, 
  Location, 
  Wrapper,
  Title, 
  Dimension,
  Line,
 } from './styles';

function Locations()  {

  const [locations, setLocations] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)

  function fetchLoations() {
    setIsLoading(true)
    api.get(`/location?&page=${currentPage}`).then(res => {

      setLocations([...locations, ...res.data.results ])

      setIsLoading(false)
    }).catch((err) => {
      setIsLoading(false)
    });
  }

  useEffect(() => {
    fetchLoations()
  }, [currentPage])


  const handlePaginate = useCallback(() => {
    if (!isLoading ) {
      setCurrentPage(currentPage + 1)
    }
  },[])


  const listFooter = () => {
    return isLoading ? <ActivityIndicator size="large" color={theme.colors.primary} /> : null
  }

  return (
    <Container>

      <FlatList 
        data={locations}
        ItemSeparatorComponent={() => <Line />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={handlePaginate}
        ListFooterComponent={listFooter}
        renderItem={({ item }) => (
          <Location>
              <Title style={{fontSize: 14, width: 80 }}>{item.type}</Title>
            <Wrapper>
              <Title style={{fontSize: 14}} numberOfLines={1}>{item.name}</Title>
              <Dimension>{item.dimension}</Dimension>
            </Wrapper>
          </Location>
        )}
      />
    </Container>
  )
}

export default Locations;

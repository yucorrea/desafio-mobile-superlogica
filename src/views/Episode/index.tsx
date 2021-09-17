import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import theme from '../../global/styles/theme';

import { 
  Container, 
  Chapter, 
  Wrapper,
  Title, 
  Date,
  Line,
 } from './styles';

 interface RouteProps {
   params: {
    episode: Array<string>
   }
 }

 interface Props {
   route: RouteProps
 }

function Episode({ route } : Props)  {

  const [episodes, setEpisodes] = useState<any>([]);

  function fetchEpisodes(url: string) {
    return fetch(url).then(res => res.json())
  }

  useEffect(() => {
    let promises = route.params.episode.map((url : string) => fetchEpisodes(url))
    Promise.all(promises).then(res => setEpisodes(res))

  }, [route.params])


  const navigation = useNavigation()

  const handleNavigateToEpisodeCharacter = (episode: string, characters: Array<string>, ) => {
    //@ts-ignore
    navigation.navigate('EpisodeCharacter', { characters: characters, episode })
  }

  return (
    <Container>

      <FlatList 
        data={episodes}
        ItemSeparatorComponent={() => <Line />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ () => <ActivityIndicator size="large" color={theme.colors.primary} />}
        renderItem={({item}) => (
          <Chapter onPress={() => handleNavigateToEpisodeCharacter(item.episode, item.characters)}>
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

export default Episode;

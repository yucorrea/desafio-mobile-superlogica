import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useCallback } from 'react';
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

function Episode({ route }: Props) {

  const [episodes, setEpisodes] = useState<any>([]);
  const navigation = useNavigation()

  useEffect(() => {
    let promises = route.params.episode.map((url: string) => fetchEpisodes(url))
    Promise.all(promises).then(res => setEpisodes(res))

  }, [route.params])

  function fetchEpisodes(url: string) {
    return fetch(url).then(res => res.json())
  }

  const handleNavigateToEpisodeCharacter = useCallback((episode: string, characters: Array<string>,) => {
    //@ts-ignore
    navigation.navigate('EpisodeCharacter', { characters: characters, episode: episode })
  }, [])


  const listEmpty = () => <ActivityIndicator size="large" color={theme.colors.primary} />

  return (
    <Container>

      <FlatList
        data={episodes}
        ItemSeparatorComponent={() => <Line />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listEmpty}
        renderItem={({ item }) => (
          <Chapter onPress={() => handleNavigateToEpisodeCharacter(item.episode, item.characters)}>
            <Title>{item.episode}</Title>

            <Wrapper>
              <Title style={{ fontSize: 14 }} numberOfLines={1}>{item.name}</Title>
              <Date>{item.air_date}</Date>
            </Wrapper>
          </Chapter>
        )}
      />
    </Container>
  )
}

export default Episode;

import React from 'react';
import { TouchableOpacityProps } from "react-native";
import { Character as ICharacter } from '../../@types/character';

import { 
    Container, 
    Avatar, 
    Name, 
} from './styles';


interface Props extends TouchableOpacityProps{
    onPress: () => void,
    data: Omit<ICharacter, "status"|"species"|"location"|"episode">
}

export function Character({ onPress, data, ...rest} : Props) {
  return (
      <Container onPress={onPress} {...rest}>
          <Avatar source={{uri: data.image }} />
          <Name>{data.name}</Name>
      </Container>
  )
}

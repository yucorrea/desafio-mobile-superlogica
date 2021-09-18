import { Animated, Dimensions } from "react-native";
import styled from "styled-components/native";

const { width, height } = Dimensions.get('window');

export const ModalContainer = styled(Animated.View)`

    width: ${width}px;
    height: ${height}px;
    position: absolute;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
   
`;

export const ModalContent = styled(Animated.View)`
    width: 100%;
    border-radius: 20px;

    background: ${({ theme }) => theme.colors.title};
    padding: 16px;
    position: absolute;
    top: 64px;

`;

export const Close = styled.TouchableOpacity`
   height: 44px;
   width: 44px;
   align-self: flex-end;
`

export const Header = styled.View`
    width: 100%;
    justify-content: flex-end;
    align-items: center;
`

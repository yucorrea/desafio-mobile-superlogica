import styled from "styled-components/native";

interface StatusProps {
  status: 'Alive' | 'Dead' | 'unknown',
}

const statusColors =  {
  Alive: "#55CC44",
  Dead:"#D63D2E",
  unknown: "#9E9E9E"
}

interface FavoriteButtonProps {
color: string
}

export const Header  = styled.View`
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    margin-top: 8px;
`

export const Name  = styled.Text`
    font-family: ${({ theme}) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.title_dark};
    font-size: 18px; 
    margin-bottom: 16px;
`

export const Avatar  = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 40px;
`

export const Footer  = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 16px 0px;
`

export const Status  = styled.View<StatusProps>`
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: ${({ status }) => statusColors[status]};
    margin-right: 16px;
`

export const Specie  = styled.Text``

export const Content  = styled.View``

export const FirstTitle  = styled.Text`
  font-family: ${({ theme}) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title_dark};
  font-size: 14px; 
`

export const LastTitle  = styled.Text`
  font-family: ${({ theme}) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title_dark};
  font-size: 14px; 
`

export const Episode  = styled.Text`
    font-family: ${({ theme}) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px; 
`

export const ActionsContainer = styled.View`
    width: 100%;
    margin: 16px 0px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const EpisodeButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

export const EpisodeButtonText = styled.Text`
    margin-left: 8px;
    font-family: ${({ theme}) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.title_dark};
    font-size: 14px;
`;


export const FavoriteButton  = styled.TouchableOpacity<FavoriteButtonProps>`
    background: ${({ color }) => color };
    padding: 16px;

    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    border-radius: 4px;
`

export const FavoriteButtonText  = styled.Text`
    font-size: 16px; 
    font-family: ${({ theme}) => theme.fonts.regular};
    margin-left: 16px;
    color: ${({ theme}) => theme.colors.title};
`

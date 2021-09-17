import styled, { css } from "styled-components/native";

interface FilterButtonProps {
  selected?: boolean
}

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 32px;
`;

export const InputContainer = styled.View`
  width: 80%;
  flex-direction: row;
  background: ${({ theme }) => theme.colors.secondary};
  justify-content: space-between;
  margin-right: 16px;
  border-radius: 5px;
  height: 44px;
`

export const Input = styled.TextInput`
  width: 70%;
  padding: 8px 8px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color:  ${({ theme }) => theme.colors.text};
`

export const Button = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin: 0px 8px;
`

export const OptionsFilter = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`

export const FilterButton = styled.TouchableOpacity<FilterButtonProps>`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  margin-right: 8px;

  ${({ selected, theme }) => selected && css`
      background: ${theme.colors.primary};
  `}
`

export const FilterButtonText = styled.Text<FilterButtonProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;

  color: ${({ selected, theme }) => selected ? theme.colors.title : theme.colors.primary};
`

export const Title  = styled.Text`
    font-size: 24px; 
    font-family: ${({ theme}) => theme.fonts.bold};
    color: ${({ theme}) => theme.colors.title_dark};
`

export const ApplyFilterButton  = styled.TouchableOpacity`
    width: 100%;
    background: ${({ theme }) => theme.colors.primary };
    padding: 16px;

    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    border-radius: 4px;

    align-self: flex-end;

    margin-top: 16px;
`

export const ApplyFilterButtonText  = styled.Text`
    font-size: 16px; 
    font-family: ${({ theme}) => theme.fonts.regular};
    margin-left: 16px;
    color: ${({ theme}) => theme.colors.title};
`

import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    margin: 4px;
`

export const Avatar = styled.Image`
    width: 154px;
    height: 151px;
    border-radius: 4px;
    margin-bottom: 8px;
`

export const Name = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.title };
    font-family: ${({ theme }) => theme.fonts.light};
`

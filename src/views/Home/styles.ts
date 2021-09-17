import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
  color: ${({ theme }) => theme.colors.title};
  
  margin: 32px 0px;
`;

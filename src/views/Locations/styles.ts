import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
`;

export const Location = styled.View`
  flex-direction: row;
  align-items: center;
  height: 70px;
`;

export const Wrapper = styled.View`
  flex-direction: column;
  margin-left: 24px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Dimension = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`;


export const Line = styled.View`
  width: 100%;
  height: 0.5px;
  background: #fff;
`;



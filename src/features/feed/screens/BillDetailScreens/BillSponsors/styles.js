import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 25px;
  border-color: lightgrey;
  border-bottom-width: 1px;
`;

export const TitleWrapper = styled.View`
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
`;

export const CosponsorText = styled.Text`
  font-size: 16px;
`;

export const styles = StyleSheet.create({
  avatar: { width: 64, height: 64 },
  container: { flex: 1 },
});

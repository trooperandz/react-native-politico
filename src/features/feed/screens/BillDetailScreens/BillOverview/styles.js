import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const LinkTouch = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Link = styled.Text`
  margin-top: 8px;
  font-size: 16px;
  color: #3366ff;
`;

export const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { marginTop: 25, textAlign: 'center' },
  billSummary: { marginVertical: 25 },
  overview: { paddingLeft: 25, paddingRight: 25 },
  disclaimer: { marginBottom: 25 },
  noSummary: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 25,
  },
});

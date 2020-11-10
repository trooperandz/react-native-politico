import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const HistoryContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const BillDate = styled.Text`
  color: #8f9bb3;
  font-size: 14px;
  line-height: 18px;
  margin-right: 32px;
`;

export const BillText = styled.Text`
  flex: 1;
`;

export const styles = StyleSheet.create({
  listStyle: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
});

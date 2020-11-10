import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const CalendarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const styles = StyleSheet.create({
  date: {
    fontWeight: '600',
    marginHorizontal: 8,
  },
});

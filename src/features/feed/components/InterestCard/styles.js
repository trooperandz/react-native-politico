import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const CalendarWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FooterStatusWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const styles = StyleSheet.create({
  cardText: {
    marginBottom: 16,
  },
  acceptanceSlider: {
    height: 27,
    width: 71,
    marginRight: 24,
  },
  tag: {
    minWidth: 150,
    maxWidth: 280,
    marginLeft: 0,
    alignSelf: 'flex-start',
  },
});

import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const Body = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Info = styled.View`
  flex: 1;
`;

export const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
  },
  calendarIcon: {
    marginRight: 10,
  },
});

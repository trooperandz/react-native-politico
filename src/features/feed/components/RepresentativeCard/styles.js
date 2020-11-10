import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const CheckmarkWrapper = styled.View`
  position: absolute;
  top: -3px;
  right: -2px;
  z-index: 1;
`;

export const styles = StyleSheet.create({
  tag: {
    minWidth: 170,
    maxWidth: 200,
    marginRight: 8,
  },
});

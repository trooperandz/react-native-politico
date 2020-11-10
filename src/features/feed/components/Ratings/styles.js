import { StyleSheet } from 'react-native';

import styled, { css } from 'styled-components/native';

const thumbStyle = css`
  height: 42px;
  width: 42px;
`;

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ThumbsDownWrapper = styled.TouchableOpacity`
  top: 6px;
  opacity: ${props => (props.active ? 0.85 : 1)};
  ${thumbStyle}
`;

export const ThumbsUpWrapper = styled.TouchableOpacity`
  top: 7px;
  ${thumbStyle}
  opacity: ${props => (props.active ? 0.85 : 1)};
`;

export const AcceptanceMeter = styled.Image`
  flex: 1;
  height: 44px;
  width: 100%;
  bottom: 1px;
`;

export const MeterText = styled.Text`
  flex: 1;
  font-weight: 600;
  height: 24px;
  line-height: 24px;
  text-align: center;
  width: 100%;
`;

export const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 44,
    opacity: 1,
  },
});

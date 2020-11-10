import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';

const backgroundWhite = css`
  background-color: #fff;
`;

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  ${backgroundWhite}
  justify-content: space-between;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const BoxWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #c5cee0;
  border-radius: 4px;
  margin: 10px;
  padding: 14px 20px;
  min-height: 80px;
  ${backgroundWhite}
`;

export const CardStatistic = styled.Text`
  font-size: 26px;
  font-weight: bold;
  line-height: 32px;
`;

export const CardTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #8f9bb3;
  line-height: 24px;
`;

export const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  shareIconBarStyle: {
    marginBottom: 16,
  },
});

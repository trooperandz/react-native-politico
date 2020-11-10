import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Layout, Text } from '@ui-kitten/components';

export const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
  },
  resultsList: {
    width: '100%',
  },
});

export const SearchContainer = styled(Layout)`
  flex: 1;
  padding: 20px;
`;

export const SearchHeaderContainer = styled(Layout)`
  align-items: center;
  margin-bottom: 20px;
`;

export const HeaderText = styled(Text)`
  margin-bottom: 20px;
`;

export const ResultsContainer = styled(Layout)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const SVGContainer = styled(Layout)`
  position: absolute;
  top: 20;
`;

export const EmptyText = styled(Text)`
  text-align: center;
`;

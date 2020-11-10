import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
`;

export const HeaderAvatarWrapper = styled.TouchableOpacity`
  width: auto;
`;

export const HeaderTextWrapper = styled.TouchableOpacity`
  flex: 1;
`;

export const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  listFooter: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginVertical: 8,
    width: '100%',
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
});

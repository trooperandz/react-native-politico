import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`;

export const TitleWrapper = styled.View`
  justify-content: space-between;
  align-items: center;
`;

export const ImageWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

export const AvatarWrapper = styled.View`
  width: auto;
`;

export const styles = StyleSheet.create({
  avatarStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
  },
  subtitle: {
    color: '#8F9BB3',
  },
  partyImage: {
    paddingTop: 3,
    paddingRight: 3,
    paddingLeft: 3,
    paddingBottom: 3,
  },
});

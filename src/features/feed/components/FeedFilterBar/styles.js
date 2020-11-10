import styled from 'styled-components/native';
import { Text } from '@ui-kitten/components';

export const FilterContainer = styled.View`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: lightgrey;
`;

export const BookmarksAndFollowsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ShowText = styled(Text)`
  margin-left: 10px;
`;

export const BubblesButton = styled.TouchableOpacity`
  height: 50px;
  flex-direction: row;
  justify-content: flex-end;
`;

export const FilterTouch = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

export const AvatarWrapper = styled.View`
  width: 109px;
  height: 50px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const RepCountWraper = styled.View`
  width: 35px;
  height: 50px;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
`;

export const RepCountText = styled(Text)`
  color: #3366ff;
`;

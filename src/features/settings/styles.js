import styled from 'styled-components/native';
import { Icon, List, ListItem, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const Wrapper = styled(Layout)`
  flex: 1;
`;

export const VerticalScroll = styled.ScrollView`
  flex: 1;
`;

export const Container = styled(Layout)`
  flex: 1;
  padding: 0 24px;
`;

export const Title = styled(Text)`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Header = styled(Layout)`
  align-items: center;
`;

export const AvatarWrapper = styled(Layout)`
  margin-bottom: 16px;
`;

export const Avatar = styled(Icon)`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

export const UserEmail = styled(Text)`
  color: #8f9bb3;
`;

export const SettingsList = styled(List)`
  margin-top: 24px;
`;

export const SettingsListItem = styled(ListItem)`
  padding: 16px 0;
`;

export const styles = StyleSheet.create({
  listItemTitleStyle: {
    color: '#222b45',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 50,
    shadowOpacity: 0.15,
    shadowRadius: 3.22,
  },
});

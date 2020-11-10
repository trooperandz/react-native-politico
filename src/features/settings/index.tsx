import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Icon, IconProps } from '@ui-kitten/components';

import WebViewModal, {
  PRIVACY_POLICY_URI,
  TERMS_AND_CONDITIONS_URI,
  INJECTED_JAVASCRIPT,
} from '@ph/comps/WebViewModal';
import { logout } from '@ph/feats/auth/authSlice';
import { AuthSliceState } from '@ph/feats/auth/types';
import * as S from './styles';

const { styles } = S;

interface ListItemData {
  iconName: string;
  title: string;
  onPress: () => void;
}

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [isPPModalVisible, setIsPPModalVisible] = useState(false);
  const [isTCModalVisible, setIsTCModalVisible] = useState(false);
  const user = useSelector((state: AuthSliceState) => state.auth.user);

  const togglePPModal = () => setIsPPModalVisible(!isPPModalVisible);
  const toggleTCModal = () => setIsTCModalVisible(!isTCModalVisible);

  const topListdata: ListItemData[] = [
    {
      iconName: 'shield-outline',
      title: 'Privacy Policy',
      onPress: togglePPModal,
    },
    {
      iconName: 'file-outline',
      title: 'Terms & Conditions',
      onPress: toggleTCModal,
    },
    {
      iconName: 'log-out-outline',
      title: 'Log Out',
      onPress: () => dispatch(logout()),
    },
  ];

  const renderItem = ({ item }: { item: ListItemData }) => (
    <S.SettingsListItem
      title={item.title}
      titleStyle={styles.listItemTitleStyle}
      icon={(props: IconProps) => (
        <Icon {...props} fill="#231f20" name={item.iconName} />
      )}
      onPress={item.onPress}
    />
  );

  return (
    <S.Wrapper>
      <S.VerticalScroll>
        <S.Container>
          <S.Header>
            <S.Title category="s1">User Settings</S.Title>
            <S.AvatarWrapper style={styles.shadowStyle}>
              <S.Avatar fill="#c5cee0" name="person" />
            </S.AvatarWrapper>
            <S.UserEmail category="p2">{user.email}</S.UserEmail>
          </S.Header>
          <S.SettingsList
            data={topListdata}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
            scrollEnabled={false}
          />
          <WebViewModal
            isModalVisible={isPPModalVisible}
            toggleModal={togglePPModal}
            uri={PRIVACY_POLICY_URI}
            injectedJavaScript={INJECTED_JAVASCRIPT}
          />
          <WebViewModal
            isModalVisible={isTCModalVisible}
            toggleModal={toggleTCModal}
            uri={TERMS_AND_CONDITIONS_URI}
            injectedJavaScript={INJECTED_JAVASCRIPT}
          />
        </S.Container>
      </S.VerticalScroll>
    </S.Wrapper>
  );
};

export default SettingsScreen;

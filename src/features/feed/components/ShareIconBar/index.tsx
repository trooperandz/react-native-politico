import React, { FC } from 'react';
import { Linking, Platform } from 'react-native';
import { Email, Phone, Twitter, Share, Facebook } from '@ph/comps/Icons';

import ShareButton from '../ShareButton';
import { ShareIconBarProps } from './types';
import * as S from './styles';

const FILL_HEX = '#3366ff';

const ShareIconBar: FC<ShareIconBarProps> = props => {
  const {
    emailUrl,
    facebookSlug,
    phoneNumber,
    twitterSlug,
    shareUri,
    style,
  } = props;

  const handleEmailPress = () => {
    Linking.openURL(`${emailUrl}/contact`);
  };

  const handleTwitterPress = () => {
    Linking.openURL(`https://twitter.com/${twitterSlug}`);
  };

  const handleFacebookPress = () => {
    Linking.openURL(`https://www.facebook.com/${facebookSlug}`);
  };

  const handlePhonePress = () => {
    let phone = '';

    if (Platform.OS === 'android') {
      phone = 'tel:${' + phoneNumber + '}';
    } else {
      phone = 'telprompt:${' + phoneNumber + '}';
    }

    Linking.openURL(phone);
  };

  return (
    <S.ShareWrapper style={{ ...style }}>
      {emailUrl && (
        <ShareButton
          icon={() => <Email fill={FILL_HEX} />}
          onPress={handleEmailPress}
        />
      )}
      {phoneNumber && (
        <ShareButton
          icon={() => <Phone fill={FILL_HEX} />}
          onPress={handlePhonePress}
        />
      )}
      {twitterSlug && (
        <ShareButton
          icon={() => <Twitter fill={FILL_HEX} />}
          onPress={handleTwitterPress}
        />
      )}
      {facebookSlug && (
        <ShareButton
          icon={() => <Facebook fill={FILL_HEX} />}
          onPress={handleFacebookPress}
        />
      )}
      {shareUri && <ShareButton icon={() => <Share fill={FILL_HEX} />} />}
    </S.ShareWrapper>
  );
};

export default ShareIconBar;

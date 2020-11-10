import React, { FC } from 'react';
import { Card, Text } from '@ui-kitten/components';
import { View } from 'react-native';
import moment from 'moment';

import AvatarParty from '@ph/feats/feed/components/AvatarParty';
import DateTag from '@ph/feats/feed/components/DateTag';
import { BillCosponsor } from '@ph/feats/feed/types';
import { styles as sharedStyles, FooterContainer } from '@ph/feats/feed/styles';
import * as S from './styles';

const { avatar } = S.styles;

const CardFooter: FC<{ date: string }> = ({ date }) => {
  return (
    <FooterContainer>
      <View />
      <DateTag date={moment(date).fromNow()} />
    </FooterContainer>
  );
};

const CosponsorCard: FC<{ cosponsor: BillCosponsor }> = ({ cosponsor }) => {
  const { fullName, sponsored_at, party, fixedsize: imageUrl } = cosponsor;

  return (
    <Card
      style={sharedStyles.cardWrapper}
      footer={() => <CardFooter date={sponsored_at} />}>
      <S.Body>
        <S.Info>
          <Text category="h6">{fullName}</Text>
        </S.Info>
        <AvatarParty party={party} imageUrl={imageUrl} style={avatar} />
      </S.Body>
    </Card>
  );
};

export default CosponsorCard;

import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from '@ui-kitten/components';

import { styles as sharedStyles } from '@ph/feats/feed/styles';
import * as S from '@ph/feats/feed/screens/BillDetailScreens/BillSponsors/CosponsorCard/styles';

type Props = {
  routeName: string;
};

const EmptyResultsMessageCard: FC<Props> = props => {
  const bookmarksOrFollowsTitle =
    props.routeName === 'Interests' ? 'bookmarks' : 'follows';

  return (
    <Card style={[sharedStyles.cardWrapper, styles.card]}>
      <S.Body>
        <S.Info>
          <Text>{`You have no saved ${bookmarksOrFollowsTitle}.`}</Text>
        </S.Info>
      </S.Body>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 0,
  },
});

export default EmptyResultsMessageCard;

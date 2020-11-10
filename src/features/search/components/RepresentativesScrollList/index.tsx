import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';

import AvatarWithFailSafe from '@ph/comps/AvatarWithFailSafe';
import { RepresentativeProfile } from '@ph/feats/feed/types';
import { styles } from './styles';

interface RepresentativesScrollListProps {
  representatives: RepresentativeProfile[];
  postOnPress?: () => void;
}

const RepresentativesScrollList: FC<RepresentativesScrollListProps> = ({
  representatives,
  postOnPress,
}) => {
  const navigation = useNavigation();

  const handleRepPress = (rep: RepresentativeProfile) => {
    navigation.navigate('RepDetailTabs', {
      representativeId: rep.id,
      representativeState: rep.state,
      representativeDistrict: rep.district,
      representativeFullName: rep.fullName,
      representativeImageUrl: rep.fixedsize,
      representativeParty: rep.party,
    });
    postOnPress && postOnPress();
  };

  return (
    <>
      {representatives.map((rep: RepresentativeProfile) => (
        <TouchableOpacity key={rep.id} onPress={() => handleRepPress(rep)}>
          <Layout style={styles.containerRow}>
            <AvatarWithFailSafe
              party={rep.party}
              source={{ uri: rep.fixedsize }}
              style={styles.avatar}
            />
            <Text category="s1">{rep.fullName}</Text>
          </Layout>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default RepresentativesScrollList;

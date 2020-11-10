import React, { useEffect, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Spinner, Text } from '@ui-kitten/components';

import Tag from 'features/feed/components/Tag';
import { registerUserInterests } from '@ph/feats/auth/authSlice';
import { mockInterestData } from '@ph/feats/feed/utils';
import { AuthSliceState } from '@ph/feats/auth/types';
import ArrowLeft from '@ph/assets/arrow-left.svg';
import { styles } from './styles';

const CloseIcon = (style: any) => <Icon {...style} name="close-outline" />;

const InterestsSelectionModal = ({
  isModalVisible,
  toggleModal,
}: {
  isModalVisible: boolean;
  toggleModal: () => void;
}) => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const { myInterests } = useSelector(
    (state: AuthSliceState) => state.auth.user,
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedInterests(myInterests);
  }, [myInterests])

  const handleToggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(int => int !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleRegisterInterests = () => {
    if (selectedInterests?.length) {
      setIsRegistering(true);
      dispatch(
        registerUserInterests(selectedInterests, () => {
          setIsRegistering(false);
          toggleModal();
        }),
      );
    }
  };

  const handleOnPressClose = () => {
    toggleModal();
    // Restore myInterests saved selections
    setSelectedInterests(myInterests);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isModalVisible}
      onRequestClose={toggleModal}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <SafeAreaView style={styles.body}>
            <>
              <View style={styles.header}>
                <Text category="s1">Select Your Interests</Text>
                <Button
                  status="basic"
                  icon={CloseIcon}
                  style={styles.button}
                  onPress={handleOnPressClose}
                />
              </View>
              <ScrollView scrollEnabled={true}>
                <>
                  {mockInterestData.map((interest: string, i: number) => (
                    <TouchableOpacity
                      key={i + interest}
                      onPress={() => handleToggleInterest(interest)}>
                      <Tag
                        text={interest}
                        fill={
                          selectedInterests?.includes(interest)
                            ? 'primary'
                            : 'secondary'
                        }
                        style={styles.tag}
                      />
                    </TouchableOpacity>
                  ))}
                </>
              </ScrollView>
              <TouchableOpacity
                style={styles.submitButtonViewStyle}
                disabled={isRegistering}
                onPress={handleRegisterInterests}>
                {isRegistering ? (
                  <Spinner status="control" />
                ) : (
                  <ArrowLeft width={28} height={28} />
                )}
              </TouchableOpacity>
            </>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
};

export default InterestsSelectionModal;

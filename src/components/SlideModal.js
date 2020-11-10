import React from 'react';
import { Modal, StyleSheet, SafeAreaView, View } from 'react-native';
import { Icon, Text, Button } from '@ui-kitten/components';

const CloseIcon = style => <Icon {...style} name="close-outline" />;

const SlideModal = ({
  headerText,
  isModalVisible,
  toggleModal,
  children,
  transparent = true,
}) => (
  <Modal
    animationType="slide"
    transparent={transparent}
    visible={isModalVisible}
    onRequestClose={toggleModal}>
    <View style={styles.modal}>
      <View style={styles.container}>
        <SafeAreaView style={styles.body}>
          <View style={styles.header}>
            <Text category="s1" style={styles.headerText}>
              {headerText}
            </Text>
            <Button
              status="basic"
              icon={CloseIcon}
              style={styles.button}
              onPress={toggleModal}
            />
          </View>
          {children}
        </SafeAreaView>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 5,
    display: 'flex',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(34,43,69,0.95)',
    padding: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginBottom: 25,
    marginTop: 20,
  },
  headerText: {
    color: 'white',
  },
  button: {
    width: 48,
    height: 48,
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
  },
});

export default SlideModal;

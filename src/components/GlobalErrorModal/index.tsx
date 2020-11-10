import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Layout, Modal, Text } from '@ui-kitten/components';

import { removeGlobalError } from '@ph/feats/app/appSlice';
import { AppSliceState } from './types';
import { styles } from './styles';

const GlobalErrorModal = () => {
  const dispatch = useDispatch();
  const globalError = useSelector((state: AppSliceState) => state.app.error);

  const handleOnClose = () => {
    dispatch(removeGlobalError());
  };

  return (
    <Modal
      visible={!!globalError}
      backdropStyle={styles.backdrop}
      onBackdropPress={handleOnClose}>
      <Layout level="3" style={styles.modalContainer}>
        <Text>{globalError}</Text>
        <Button onPress={handleOnClose} style={styles.button}>
          Dismiss
        </Button>
      </Layout>
    </Modal>
  );
};

export default GlobalErrorModal;

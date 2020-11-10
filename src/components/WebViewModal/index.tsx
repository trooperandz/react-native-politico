import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import SlideModal from '@ph/comps/SlideModal';

export const PRIVACY_POLICY_URI = 'https://www.google.com';
export const TERMS_AND_CONDITIONS_URI = 'https://www.google.com';
export const INJECTED_JAVASCRIPT =
  "window.document.querySelector('#page-top').style.display = 'none'";

const WebViewModal = ({
  isModalVisible,
  toggleModal,
  uri,
  injectedJavaScript,
}: {
  isModalVisible: boolean;
  toggleModal: () => void;
  uri: string;
  injectedJavaScript?: string;
}) => (
  <SlideModal
    headerText=""
    isModalVisible={isModalVisible}
    toggleModal={toggleModal}>
    <WebView
      source={{ uri }}
      style={styles.webViewContainer}
      injectedJavaScript={injectedJavaScript}
      onMessage={() => null} // this prop is necessary in order to successfully inject JS
    />
  </SlideModal>
);

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});

export default WebViewModal;

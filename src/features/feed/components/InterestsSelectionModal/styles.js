import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginBottom: 25,
    marginTop: 20,
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
  tag: {
    marginBottom: 10,
    paddingTop: 6,
    paddingBottom: 6,
    width: '78%',
  },
  submitButtonViewStyle: {
    backgroundColor: '#3366ff',
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 14,
    right: 0,
    transform: [{ rotate: '180deg' }],
  },
});

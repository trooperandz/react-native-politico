import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerViewStyle: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  headerViewStyle: {
    width: '100%',
    alignItems: 'center',
  },
  hangoutImageStyle: {
    marginBottom: 25,
  },
  subtitleTextStyle: {
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 18,
    color: '#8f9bb3',
  },
  scrollViewStyle: {
    width: '100%',
  },
  scrollContainerViewStyle: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagContainer: {
    marginLeft: 20,
  },
  tag: {
    marginRight: 10,
    marginBottom: 10,
  },
  moreButtonWrapperViewStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonViewStyle: {
    height: 32,
    width: 92,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonTextStyle: {
    color: '#3366ff',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  nextButtonViewStyle: {
    backgroundColor: '#3366ff',
    height: 48,
    width: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 14,
    right: 30,
    transform: [{ rotate: '180deg' }],
  },
});

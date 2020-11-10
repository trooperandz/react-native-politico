import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';

const thumbStyle = css`
  height: 42px;
  width: 42px;
`;

export const ThumbsDownWrapper = styled.View`
  top: 6px;
  ${thumbStyle}
`;

export const ThumbsUpWrapper = styled.View`
  top: 7px;
  ${thumbStyle}
`;

export const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export const cardStyles = {
  wrapper: {
    border: 1,
    borderColor: 'lightgrey',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
};

export const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  title: {
    width: 280,
    height: 20,
    borderRadius: 16,
    marginBottom: 6,
  },
  subtitle: {
    width: 130,
    height: 20,
    borderRadius: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export const footerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  textWrapper: {
    flexDirection: 'row',
  },
  title: {
    width: 100,
    height: 20,
    borderRadius: 16,
  },
  subtitle: {
    width: 50,
    height: 20,
    borderRadius: 16,
    marginLeft: 8,
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginRight: 12,
  },
});

export const ratingsStyle = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  bar: {
    height: 8,
    width: 140,
    position: 'absolute',
    left: -35,
    top: 5,
  },
  slider: {
    position: 'absolute',
    height: 20,
    width: 6,
    right: 10,
    top: -1,
  },
};

export const interestsStyle = {
  container: {
    display: 'flex',
  },
  heading: {
    height: 10,
    width: 330,
    borderRadius: 16,
    marginBottom: 8,
  },
  lightBar: {
    height: 10,
    width: 300,
    borderRadius: 16,
    marginBottom: 8,
  },
  subtitle: {
    height: 10,
    width: 265,
    borderRadius: 16,
    marginBottom: 8,
  },
  largeBar: {
    height: 25,
    width: 200,
    marginVertical: 20,
    borderRadius: 16,
    marginBottom: 8,
  },
};

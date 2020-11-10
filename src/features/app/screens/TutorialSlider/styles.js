import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const Container = styled.View.attrs(props => ({
  height: props.height,
  width: props.width,
}))`
  background-color: #fff;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  margin-bottom: 80px;
`;

export const IntroText = styled.Text`
  flex: 1;
  flex-wrap: wrap;
  font-size: 16px;
  line-height: 21px;
  color: #222b45;
  margin-left: 10px;
  margin-bottom: 16px;
`;

export const ScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px 24px;
  background-color: #fff;
`;

export const StepVerticalScroll = styled.ScrollView`
  flex: 1;
`;

export const StepTitle = styled.Text`
  font-size: 16px;
  margin: 24px 0 10px;
`;

export const StepImage = styled(Layout)`
  margin-bottom: 24px;
`;

export const PaginationWrapper = styled.View`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const PaginationContainer = styled.View`
  flex-direction: row;
  background-color: #fff;
  padding: 8px 4px;
  border-radius: 20px;
`;

export const PaginationDot = styled.View.attrs(props => ({
  currentIndex: props.currentIndex,
  pageIndex: props.pageIndex,
}))`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: #0898a0;
  margin: 0 5px;
  opacity: ${props => (props.pageIndex === props.currentIndex ? 1 : 0.2)};
`;

export const TutorialButton = styled.TouchableOpacity.attrs(props => ({
  isLastStep: props.isLastStep,
}))`
  height: 48px;
  width: 48px;
  background-color: ${props => (props.isLastStep ? '#3366ff' : '#fff')};
  border-radius: 24px;
  border-width: 1px;
  border-color: #3366ff;
  align-items: center;
  justify-content: center;
  position: absolute;
  align-self: flex-end;
  bottom: 50px;
  right: 24px;
`;

export const TipWrapper = styled.View`
  flex-direction: row;
`;

export const TipBullet = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: gray;
  margin-top: 8px;
`;

export const styles = StyleSheet.create({
  shadowWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 12,
    shadowOpacity: 0.22,
    shadowRadius: 3.22,
  },
});

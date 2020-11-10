import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Spinner } from '@ui-kitten/components';

import { registerUserTutorialStatus } from '@ph/feats/auth/authSlice';
import * as RootNavigation from '@ph/navs/utils';
import ArrowRightIcon from '@ph/assets/arrow-right.svg';
import BillExample from '@ph/assets/bill-example.svg';
import VoteExample from '@ph/assets/vote-example.svg';
import RepDetailExample from '@ph/assets/rep-detail-example.svg';
import BillOverviewExample from '@ph/assets/bill-overview-example.svg';
import BillHistoryExample from '@ph/assets/bill-history-example.svg';
import BookmarkFilterExample from '@ph/assets/bookmark-filter-example.svg';
import RepFilterExample from '@ph/assets/rep-filter-example.svg';
import * as S from './styles';

const { styles } = S;

const TutorialSlider = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const scrollContainerRef = useRef<ScrollView>(null);
  const { width, height } = Dimensions.get('window');

  const introSteps = [
    {
      title: 'My Interests',
      imageComponent: (
        <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 8 }}>
          <BookmarkFilterExample width={width - 50} height={width * 0.42} />
        </View>
      ),
      tips: [
        'View bills by congressional subject',
        'Use the toggle to show previously bookmarked bills within your selected interests',
        'Filter bills by interest with over twenty congressional subjects to choose from',
      ],
    },
    {
      title: 'My Interests',
      imageComponent: <BillExample width={width - 48} height={width * 0.89} />,
      tips: [
        'View bill titles and summaries by congressional subject',
        'Press the bookmark icon to save the bill to your bookmarks for later viewing',
        'Press the bill title or member avatar to view further details',
      ],
    },
    {
      title: 'My Representatives',
      imageComponent: (
        <View style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 8 }}>
          <RepFilterExample width={width - 50} height={width * 0.42} />
        </View>
      ),
      tips: [
        'View representative votes from your district',
        'Use the toggle to filter votes by previously followed representatives',
        'Navigate directly to the represetative detail screen by clicking on the avatars and selecting your representative',
      ],
    },
    {
      title: 'My Representatives',
      imageComponent: <VoteExample width={width - 48} height={width * 0.67} />,
      tips: [
        'See how your representatives have voted on various issues',
        'Show your opinion to other users by giving a thumbs-up or a thumbs-down',
        'The acceptance meter in the middle shows overall public opinion of other users',
        'Press the bill title or member avatar to view further details',
      ],
    },
    {
      title: 'Representative Details',
      imageComponent: (
        <View style={styles.shadowWrapper}>
          <RepDetailExample width={width - 48} height={width * 0.9} />
        </View>
      ),
      tips: [
        'View bills enacted, partyline vote statistics, total votes, and other details',
        'Press the follow icon to add representatives to your list',
        'Gain access to representative contact details and social media links',
      ],
    },
    {
      title: 'Bill Details',
      imageComponent: (
        <View style={styles.shadowWrapper}>
          <BillOverviewExample width={width - 48} height={width * 0.95} />
        </View>
      ),
      tips: [
        'View bill details and gain more insights into specific legislation',
        'Read the bill overview for more information, or click the link to navigate to the official government bill site',
      ],
    },
    {
      title: 'Bill Details',
      imageComponent: (
        <View style={styles.shadowWrapper}>
          <BillHistoryExample width={width - 48} height={width * 1.04} />
        </View>
      ),
      tips: [
        "View a bill's history to get a full picture of its lifecycle and current status",
      ],
    },
  ];

  const setSliderPage = (e: any) => {
    const { x } = e.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);

    if (indexOfNextScreen !== pageIndex) {
      setPageIndex(indexOfNextScreen);
    }
  };

  
  const handleNextPress = () => {
    if (pageIndex < introSteps.length - 1 && scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({ x: width * (pageIndex + 1) });
    } else {
      setIsLoading(true);
      dispatch(registerUserTutorialStatus(() => RootNavigation.navigate('AppTabs', () => setIsLoading(false))));
    }
  };
  
  const isLastStep = pageIndex === introSteps.length - 1;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <S.ScrollContainer
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={setSliderPage}
        ref={scrollContainerRef}>
        {introSteps.map((step: any, i: number) => (
          <S.Container key={i} width={width} height={height}>
            <S.StepVerticalScroll>
              <S.ScreenContainer>
                <S.Wrapper>
                  <S.StepTitle>{step.title}</S.StepTitle>
                  <S.StepImage>{step.imageComponent}</S.StepImage>
                  {step.tips.map((tip: string) => {
                    return (
                      <S.TipWrapper key={tip}>
                        <S.TipBullet />
                        <S.IntroText>{tip}</S.IntroText>
                      </S.TipWrapper>
                    );
                  })}
                </S.Wrapper>
              </S.ScreenContainer>
            </S.StepVerticalScroll>
          </S.Container>
        ))}
      </S.ScrollContainer>
      <S.TutorialButton isLastStep={isLastStep} onPress={handleNextPress}>
        {isLoading ? (
          <Spinner status="control" /> 
        ) : (
          <ArrowRightIcon fill={isLastStep ? "#fff" : "#3366ff"} height={24} width={30} />
        )}
      </S.TutorialButton>
      <S.PaginationWrapper>
        <S.PaginationContainer>
          {introSteps.map((key, index: number) => (
            <S.PaginationDot
              key={index}
              currentIndex={index}
              pageIndex={pageIndex}
            />
          ))}
        </S.PaginationContainer>
      </S.PaginationWrapper>
    </>
  );
};

export default TutorialSlider;

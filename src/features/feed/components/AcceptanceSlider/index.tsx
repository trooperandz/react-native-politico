import React, { FC } from 'react';
import Slider from '@react-native-community/slider';

type Props = {
  style?: { [key: string]: any };
  value: number;
};

export const getSliderValue = (
  positiveCount: number,
  negativeCount: number,
) => {
  if (positiveCount + negativeCount === 0) {
    return 0.5;
  }
  return (
    0.5 +
    ((positiveCount - negativeCount) / (positiveCount + negativeCount)) * 0.5
  );
};

// TODO: cannot get custom trackImage and thumbImages to work in production
const AcceptanceSlider: FC<Props> = ({ style, value }) => {
  return (
    <Slider
      style={style}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#00b383"
      maximumTrackTintColor="#ff708d"
      // trackImage={require('../../../../assets/acceptance-track-image.png')}
      // thumbImage={require('../../../../assets/pen-drop.png')}
      value={value}
      disabled
    />
  );
};

export default AcceptanceSlider;

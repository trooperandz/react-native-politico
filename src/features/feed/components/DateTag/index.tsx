import React, { FC } from 'react';
import { Text } from '@ui-kitten/components';

import CalendarIcon from '@ph/assets/calendar.svg';
import { styles, CalendarWrapper } from './styles';
import { DateTag as DateTagProps } from './types';

const DateTag: FC<DateTagProps> = props => (
  <CalendarWrapper>
    <CalendarIcon width={24} height={24} fill="#000" />
    <Text category="p1" style={styles.date}>
      {props.date}
    </Text>
  </CalendarWrapper>
);

export default DateTag;

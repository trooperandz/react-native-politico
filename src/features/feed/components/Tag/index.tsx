import React, { FC } from 'react';
import { Layout, Text, Icon } from '@ui-kitten/components';

import { styles } from './styles';

type Props = {
  text: string;
  fill: string;
  iconName?: string;
  style?: { [key: string]: string | number };
};

const Tag: FC<Props> = ({ text, fill, iconName, style }) => {
  const fills = {
    primary: {
      backgroundColor: '#3366ff',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#eff3ff',
      color: '#0095ff',
    },
    success: {
      backgroundColor: '#00e096',
      color: 'white',
    },
    info: {
      backgroundColor: '#0095ff',
      color: 'white',
    },
    warning: {
      backgroundColor: '#ffaa00',
      color: 'white',
    },
    danger: {
      backgroundColor: '#ff3d71',
      color: 'white',
    },
    basic: {
      backgroundColor: '#edf1f7',
      color: 'black',
    },
  };

  const hasBorder = ['primary', 'secondary'];
  const borderStyle = { borderWidth: 1, borderColor: fills[fill].color };

  return (
    <Layout
      style={[
        styles.tag,
        iconName ? styles.tagWithIcon : null,
        fill ? fills[fill] : fills.basic,
        fill && hasBorder.includes(fill) ? borderStyle : null,
        style,
      ]}>
      <Text category="c2" style={fill ? fills[fill] : fills.basic}>
        {text}
      </Text>
      {iconName ? (
        <Icon
          name={iconName}
          style={styles.icon}
          fill={fill && fill !== 'basic' ? 'white' : 'black'}
        />
      ) : null}
    </Layout>
  );
};

export default Tag;

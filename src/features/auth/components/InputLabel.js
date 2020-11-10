import React from 'react';
import Label from './Label';

const InputLabel = ({ iconName, text, style }) => {
  return (
    <Label
      text={text}
      category="c1"
      iconName={iconName}
      fill="#222b45"
      size="16"
      style={style}
    />
  );
};

export default InputLabel;

import styled, { css } from 'styled-components/native';

const styles = {
  primary: {
    fill: {
      tag: css`
        background: rgb(51, 102, 255);
      `,
      text: css`
        color: rgb(255, 255, 255);
      `,
    },
    outline: {
      tag: css`
        background: #f0f3fe;
        border: 1px solid rgb(51, 102, 255);
      `,
      text: css`
        color: rgb(51, 102, 255);
      `,
    },
  },
  success: {
    fill: {
      tag: css`
        background: rgb(0, 224, 150);
      `,
      text: css`
        color: rgb(255, 255, 255);
      `,
    },
    outline: {
      tag: css`
        background: #effdf8;
        border: 1px solid rgb(0, 219, 146);
      `,
      text: css`
        color: rgb(0, 219, 146);
      `,
    },
  },
  info: {
    fill: {
      tag: css`
        background: rgb(0, 149, 255);
      `,
      text: css`
        color: rgb(255, 255, 255);
      `,
    },
    outline: {
      tag: css`
        background: #edf7fe;
        border: 1px solid rgb(0, 149, 255);
      `,
      text: css`
        color: rgb(0, 149, 255);
      `,
    },
  },
  warning: {
    fill: {
      tag: css`
        background: rgb(255, 170, 0);
      `,
      text: css`
        color: rgb(255, 255, 255);
      `,
    },
    outline: {
      tag: css`
        background: #fef9ed;
        border: 1px solid rgb(255, 191, 0);
      `,
      text: css`
        color: rgb(255, 191, 0);
      `,
    },
  },
  danger: {
    fill: {
      tag: css`
        background: rgb(255, 61, 113);
      `,
      text: css`
        color: rgb(255, 255, 255);
      `,
    },
    outline: {
      tag: css`
        background: #fdf1f4;
        border: 1px solid rgb(255, 64, 112);
      `,
      text: css`
        color: rgb(255, 64, 112);
      `,
    },
  },
  basic: {
    fill: {
      tag: css`
        background: rgb(237, 241, 247);
      `,
      text: css`
        color: rgb(34, 43, 69);
      `,
    },
    outline: {
      tag: css`
        background: #f6f7f9;
        border: 1px solid rgb(143, 155, 179);
      `,
      text: css`
        color: rgb(143, 155, 179);
      `,
    },
  },
};

export const Tag = styled.View`
  padding: 5px 16px;
  border-radius: 12px;
  margin-bottom: 5px;
  ${props => styles[props.status || 'primary'][props.appearance || 'fill'].tag}
`;

export const Text = styled.Text`
  ${props => styles[props.status || 'primary'][props.appearance || 'fill'].text}
`;

import styled, { css } from 'styled-components/native';

const logoStyles = css`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const LogoWrapper = styled.View`
  ${logoStyles}
  margin-top: 10px;
  margin-bottom: 0;
  margin-bottom: 20px;
  margin-top: 25px;
`;

export const FeedLogoWrapper = styled.View`
  ${logoStyles}
  margin-top: 10px;
  margin-bottom: 0;
`;

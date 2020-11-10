import React, { FC } from 'react';

import { AuthTemplateProps } from './types';
import { LogoWrapper } from '@ph/feats/app/styles';
import { styles } from './styles';
import LogoImage from '@ph/assets/logo.svg';
import { Layout } from '@ui-kitten/components';

const AuthTemplate: FC<AuthTemplateProps> = ({ hasLogo, header, children }) => {
  return (
    <Layout style={styles.container}>
      {hasLogo ? (
        <LogoWrapper>
          <LogoImage width={180} height={50} />
        </LogoWrapper>
      ) : null}
      {header ? <Layout style={styles.header}>{header}</Layout> : null}
      <Layout style={styles.body}>{children}</Layout>
    </Layout>
  );
};

export default AuthTemplate;

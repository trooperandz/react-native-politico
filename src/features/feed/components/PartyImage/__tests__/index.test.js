import React from 'react';
import { render } from '@testing-library/react-native';

import PartyImage from '../index';

const renderComponent = props => {
  return render(<PartyImage {...props} />);
};

describe('PartyImage', () => {
  it('should return the democratic icon if the party is D', () => {
    const { getByTestId } = renderComponent({ party: 'D' });

    expect(getByTestId('icon-democratic')).toBeDefined();
  });

  it('should return the republican icon if the party is R', () => {
    const { getByTestId } = renderComponent({ party: 'R' });

    expect(getByTestId('icon-republican')).toBeDefined();
  });
});

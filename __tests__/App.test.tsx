import React from 'react';
import { render } from './utils/test-utils';
import App from '../src/App';

describe('App', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId).toBeDefined();
  });
});

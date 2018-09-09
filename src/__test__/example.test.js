/* eslint-disable no-unused-vars */

import React from 'react';
import renderer from 'react-test-renderer';
import Example from '../components/Example';

describe('Example component renders correctly', () => {
  it('renders correctly', () => {
    const rendered = renderer.create(
      <Example />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});
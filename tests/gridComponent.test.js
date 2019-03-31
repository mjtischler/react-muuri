import GridComponent from './components/GridComponent';
import React from 'react';
import {render, fireEvent, cleanup} from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

test('Render the grid and remove one element', () => {
  const { container, getByTestId } = render(
    <GridComponent />
  );

  expect(container).toBeTruthy();
  expect(getByTestId('box_container').children.length).toBe(2);
  fireEvent.click(getByTestId('remove_button'));
  expect(getByTestId('box_container').children.length).toBe(1);
});

test('Render the grid and remove all elements', () => {
  const { container, getByTestId } = render(
    <GridComponent />
  );

  expect(container).toBeTruthy();
  expect(getByTestId('box_container').children.length).toBe(2);
  fireEvent.click(getByTestId('remove_button'));
  expect(getByTestId('box_container').children.length).toBe(1);
  fireEvent.click(getByTestId('remove_button'));
  expect(getByTestId('box_container').children.length).toBe(0);
});

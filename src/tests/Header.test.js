import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Header from '../Components/Header';
import App from '../App';
import userEvent from '@testing-library/user-event';

const name = 'Maria Silva';
const email = 'maria@trybe.com';
const initialState = { player: { name: name, assertions: 0, score: 0, gravatarEmail: email } };


test('Teste se a o nome do usuário aparece no cabeçalho página', () => {
  const { history } = renderWithRouterAndRedux(<App />, { initialState: { name: '', assertions: 0, score: 0, gravatarEmail: '' } });
  const inputNome = screen.getByTestId('input-player-name');
  const inputEmail = screen.getByTestId('input-gravatar-email');
  const button = screen.getByRole('button', { name: 'Play' });
  userEvent.type(inputEmail, email);
  userEvent.type(inputNome, name);
  userEvent.click(button);
  const { pathname } = history.location;
  expect(pathname).toBe('/game');
  const playerName = screen.getByTestId('header-player-name', name);
  expect(playerName.innerHTML).toBe(name);
});

test('Teste se o placar total aparece na cabeçalho da página', () => {
  renderWithRouterAndRedux(<Header />, { initialState: initialState });
  const scoreHeader = screen.getByTestId('header-score');
  expect(scoreHeader.innerHTML).toBe('0');
});

test('Teste se o avatar do ususário aparece no cabeçalho da página', () => {
  renderWithRouterAndRedux(<Header />, { initialState: initialState });
  const userAvatar = screen.getByAltText('Profile');
  const srcAvatar = 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e';
  expect(userAvatar.src).toBe(srcAvatar);
});
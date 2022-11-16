import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const email = 'maria@trybe.com';

test('Teste se a página contém um input de e-mail', () => {
  renderWithRouterAndRedux(<App />);
  const inputEmail = screen.getByTestId('input-gravatar-email');
  expect(inputEmail).toBeInTheDocument();
});

test('Teste se a página contém um input de nome', () => {
  renderWithRouterAndRedux(<App />);
  const inputNome = screen.getByTestId('input-player-name');
  expect(inputNome).toBeInTheDocument();
});

test('Teste se a página contém um button de Entrar', () => {
  renderWithRouterAndRedux(<App />);
  const button = screen.getByRole('button', { name: 'Play' });
  expect(button).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a tela do jogo, ao clicar no botão `Play`', async () => {
  const { history } = renderWithRouterAndRedux(<App />, { initialState: { user: { email: '' } } });
  const inputNome = screen.getByTestId('input-player-name');
  const inputEmail = screen.getByTestId('input-gravatar-email');
  const button = screen.getByRole('button', { name: 'Play' });
  userEvent.type(inputEmail, email);
  userEvent.type(inputNome, 'Maria');
  userEvent.click(button);
  await waitFor(() => {
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });
});

test('Será validado se o botão está habilitado somente se o input input nome estiver preenchido e o input de email tem um formato valido', () => {
  renderWithRouterAndRedux(<App />);

  const inputEmail = screen.getByTestId('input-gravatar-email');
  expect(inputEmail).toBeInTheDocument();
  expect(inputEmail.value).toBe('');

  const inputNome = screen.getByTestId('input-player-name');
  expect(inputNome).toBeInTheDocument();
  expect(inputNome.value).toBe('');

  const button = screen.getByRole('button', { name: 'Play' });
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();

  userEvent.type(inputEmail, email);
  expect(inputEmail.value).toBe(email);
  expect(button).toBeDisabled();

  userEvent.type(inputNome, 'Maria');
  expect(inputNome.value).toBe('Maria');
  expect(button).toBeEnabled();
});
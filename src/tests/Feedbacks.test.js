import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

const name = 'Maria Silva'
const email = 'maria@trybe.com';
const lessThanTree = { player: { name: name, assertions: 0, score: 0, gravatarEmail: email } };
const greaterThanTree = { player: { name: name, assertions: 4, score: 120, gravatarEmail: email } };

test('Teste se o total de acertos aparece na página', () => {
  renderWithRouterAndRedux(<Feedback />, { initialState: lessThanTree });
  const questions = screen.getByTestId('feedback-total-question');
  expect(questions.innerHTML).toBe('0');
});

test('Teste se o placar total aparece na página', () => {
  renderWithRouterAndRedux(<Feedback />, { initialState: lessThanTree });
  const scorePage = screen.getByTestId('feedback-total-score');
  expect(scorePage.innerHTML).toBe('0');
});

test('Teste se o texto `Could be better...` aparece na página', () => {
  renderWithRouterAndRedux(<Feedback />, { initialState: lessThanTree });
  const feedbackText = screen.getByText('Could be better...');
  expect(feedbackText).toBeInTheDocument();
});

test('Teste se o texto `Could be better...` aparece na página quando o jogador acertar menos de 3 perguntas', () => {
  renderWithRouterAndRedux(<Feedback />, { initialState: lessThanTree });
  const feedbackText = screen.getByText('Could be better...');
  expect(feedbackText).toBeInTheDocument();
});

test('Teste se o texto `Well Done!` aparece na página quando o jogador acertar mais de 3 perguntas', () => {
  renderWithRouterAndRedux(<Feedback />, { initialState: greaterThanTree });
  const feedbackText = screen.getByText('Well Done!');
  expect(feedbackText).toBeInTheDocument();
});

test('Teste se o botão `Ranking` aparece na página', () => {
  renderWithRouterAndRedux(<Feedback />);
  const rankingButton = screen.getByTestId('btn-ranking');
  expect(rankingButton).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a tela do ranking, ao clicar no botão `Ranking`', () => {
  const { history } = renderWithRouterAndRedux(<Feedback /> );
  const rankingButton = screen.getByTestId('btn-ranking');
  userEvent.click(rankingButton);
  const { pathname } = history.location;
  expect(pathname).toBe('/rankings');
});

test('Teste se o botão `Play Again` aparece na página', () => {
  renderWithRouterAndRedux(<Feedback />);
  const playAgainButton = screen.getByTestId('btn-play-again');
  expect(playAgainButton).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a tela de Login, ao clicar no botão `Play Again`', () => {
  const { history } = renderWithRouterAndRedux(<Feedback />);
  const playAgainButton = screen.getByTestId('btn-play-again');
  userEvent.click(playAgainButton);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

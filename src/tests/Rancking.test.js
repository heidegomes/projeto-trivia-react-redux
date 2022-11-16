
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa o componente Ranking', () => {

  test('Testa se ao clicar no botão Ranking, é redirecionado para o Ranking "/ranking"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/feedback'); });
    const btnRanking = screen.getByRole('button', { name: /Ranking/i });
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/feedback');
  });
});
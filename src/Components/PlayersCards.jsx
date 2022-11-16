import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import '../Style/PlayerCard.css';

class PlayersCards extends Component {
  componentDidMount() {
    const { playerRanking } = this.props;
    const sorteado = playerRanking.sort((x, y) => y.score - x.score);
    const teste = JSON.stringify(sorteado);
    localStorage.setItem('ranking', teste);
  }

  render() {
    const { playerRanking } = this.props;
    const hash = md5(playerRanking.email).toString();

    return (
      <ol>
        {
          playerRanking.sort((x, y) => y.score - x.score).map((player, index) => (
            <li key={ player.email } className="PlayerCard">
              <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="Profile" />
              <p data-testid={ `player-name-${index}` }>
                { player.name.charAt(0).toUpperCase()
          + player.name.slice(1) }
              </p>
              <p data-testid={ `player-score-${index}` }>
                { player.score }
              </p>
            </li>
          ))
        }
      </ol>
    );
  }
}

PlayersCards.propTypes = {
  playersRanking: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;
const mapStateToProps = (state) => ({
  playerRanking: state.player.playersRanking,
});
export default connect(mapStateToProps)(PlayersCards);

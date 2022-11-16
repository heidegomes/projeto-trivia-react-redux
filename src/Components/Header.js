import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../Style/Header.css';
import { TiHome } from 'react-icons/ti';
import { withRouter } from 'react-router-dom';
import { resetScore } from '../redux/actions/actions';

class Header extends React.Component {
  handleHome = async () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
    const { name, email, score } = this.props;
    const hash = md5(email).toString();
    return (
      <div>
        <div className="HeaderContent">
          <button type="button" onClick={ this.handleHome } data-testid="btn-go-home">
            <TiHome pointerEvents="none" />
          </button>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="Profile" />
          <p data-testid="header-player-name">
            { name.charAt(0).toUpperCase()
          + name.slice(1) }
          </p>
          <p data-testid="header-score">
            { score }
          </p>
        </div>
      </div>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;
Header.defaultProps = { email: '', name: '', score: '' };

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});
export default connect(mapStateToProps)(withRouter(Header));

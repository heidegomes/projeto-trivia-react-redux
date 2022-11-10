import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../Style/Header.css';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;
    const hash = md5(email).toString();
    return (
      <div>
        <div className="HeaderContent">
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="Profile" />
          <p data-testid="header-player-name">
            { name.charAt(0).toUpperCase()
          + name.slice(1) }
          </p>
          <p data-testid="header-score"> Score: 0</p>
        </div>
      </div>
    );
  }
}
Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string };
Header.defaultProps = { email: '', name: '' };

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});
export default connect(mapStateToProps)(Header);

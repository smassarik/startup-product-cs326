import React from 'react';
import { hashHistory, Link } from 'react-router';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      var query = this.state.value.trim();
      if (query !== '') {
        hashHistory.push({ pathname: '/search/', query: { query: query } });
      }  
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img alt="Brand" src="img/UBoard_logo.png" />
            </a>
          </div>

          <ul className="nav navbar-nav navbar-center">
            <h3 className="navbar-title">
              <Link to="/">UBoard</Link>
            </h3>
          </ul>

          <form className="navbar-form navbar-right" role="search" onSubmit={(e) => this.handleSubmit(e)}>

            <div className="btn-group" role="group" aria-label="...">
              <Link className="btn btn-default" to="/messaging/">
                <i className="fa fa-envelope"></i>
              </Link>
              <Link className="btn btn-default" to="/accountsettings/">
                <i className="fa fa-cog"></i>
              </Link>
              <Link className="btn btn-default" to="/createthread/">
                <i className="fa fa-pencil"></i>
              </Link>
            </div>

            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search UBoard Posts"
                     value={this.state.value} onChange={(e) => this.handleChange(e)}
                     onKeyUp={(e) => this.handleKeyUp(e)}/>
              <span className="input-group-btn">
                <Link className="btn btn-default" to={{ pathname: '/search/', query: { query: this.state.value.trim() } }}>
                  <i className="fa fa-search"></i>
                </Link>
              </span>
            </div>

          </form>

        </div>
      </nav>
    )
  }
}

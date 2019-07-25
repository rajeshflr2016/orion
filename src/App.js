import React from 'react';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Content from './components/Content';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          inputValue: "Batman"
        };
    }
    changeInput = (e) => {
      this.setState({
        inputValue: e.target.value
      });
    }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg  fixed-top">
         
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <div className="col-lg-2 col-md-6">
                <a className="navbar-brand" href="#">Movie Catalog</a>
              </div>
            <div className="col-lg-8 col-md-6">  
              <form>
                    <input className="form-control" name="search" onChange={this.changeInput} value={this.state.inputValue} type="text" placeholder="Search" aria-label="Search" />
                  </form>
                </div>
              <div className="col-lg-2 col-md-6">  
                <ul className="navbar-nav ml-auto right_cls header_menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#"> <i className="fa fa-user user-icon" /> Alexander Borisenko <i className="fa fa-sort-down" /> </a>
                  </li>
                </ul>
              </div>
            </div>
        </nav>
        <Content search = {this.state.inputValue}/>
      </div>
    );
  }
}

export default App;

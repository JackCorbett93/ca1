
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./Main";
import "./index.css";
import Pagination from "react-js-pagination";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 15
    };
  }
  handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber});
    }
    render() {
     return (
       <div>
         <Pagination
           activePage={this.state.activePage}
           itemsCountPerPage={10}
           totalItemsCount={170}
           pageRangeDisplayed={5}
           onChange={this.handlePageChange}
         />
       </div>
     );
   }
 }

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Main/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

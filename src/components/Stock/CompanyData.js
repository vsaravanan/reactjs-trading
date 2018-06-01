import axios from "axios";
import React, { Component } from 'react' ;
import CompanyList from 'components/Stock/CompanyList';
import store from 'reducers/store.js';
import { toggleLoading } from 'reducers/actions/state-actions';
import {connect } from 'react-redux';

class CompanyData extends Component {


  // default State object
  state = {
    peers: [],
    company: []
  };

  getPeers = (stockId) => {
    return (
      axios
        .get(`https://api.iextrading.com/1.0/stock/${stockId}/peers`)
        .then(response => {

          const Peers = [].concat(response.data) ;

  
          //console.log('Peers : ' + Peers);
          const newPeers = Object.assign({}, this.state, {
            peers: Peers
          });
  
          this.setState(newPeers);
        })
        .catch(error =>  {
          console.log(error);
          
        })
    );
  }
  
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  getCompany = (stockId) => {
    return (
      axios
        .get(`https://api.iextrading.com/1.0/stock/${stockId}/company`)
        .then(response => {

          const Company = response.data ;
  
          const companyConcated = [ ...this.state.company, Company];
          
          const companyArr = Object.assign({}, this.state, {
            company: companyConcated
          });



          this.setState(  companyArr);

          if (this.props.loading === 't') {
             //this.sleep(1000);
            store.dispatch(toggleLoading('f'));
          }


        })
        .catch(error =>  {
          console.log(error);
        })
    );
  }

  
  getAll = async (stockId) => {
    try {
      await this.getPeers(stockId);

      if (this.state.peers.length === 0) {
        // if not found return and don't process further
        return;
      }
      
      await this.getCompany(stockId);

      this.state.peers.filter(peers => peers !== stockId).map( (peers) =>
        {
            return this.getCompany(peers);
        })
      ;



      
    }
    catch (e) {
      console.error(e); 
    }
  }



  fetch() {

    store.dispatch(toggleLoading('t'));
    this.setState({
      peers: [],
      company: []
    });
    let stockId = store.getState().states.stockId;
    if (stockId !== null) {
      this.getAll(stockId);
    }  
 
  }


  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      {
        console.log(store.getState());
        //this.forceUpdate();
      }
    );  
  }

  componentWillUpdate(nextProps) {

    if (nextProps.stockId !== this.props.stockId) {
        this.fetch();
    } 
  }

  componentWillMount() {
    this.fetch();
  }  

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    let data;
    // if (this.state.loading) {
    //   data = <img src={ require('assets/img/preloader.gif')}  alt="Loading..." />
    // } else {
      data = (
        <div className="App">
          <CompanyList company={this.state.company}  />
        </div>
      );
 
    return (
      <div>{data}</div>
    );
  
  }
}


const mapStateToProps = (state) => {
  return {
    stockId : store.getState().states.stockId,
    loading : store.getState().loadings.loading
  }
};

export default connect(mapStateToProps)(CompanyData);

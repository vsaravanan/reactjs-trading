import axios from "axios";
import React, { Component } from 'react' ;
import store from 'reducers/store.js';
import { toggleLoading } from 'reducers/actions/state-actions';
import {connect } from 'react-redux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
//import NumberFormat  from 'react-number-format';
//var numeral = require('react-number-format');

class CompanyChart extends Component {

  

  // default State object
  state = {
    data: []
  };

  numberformat = (val) => {return val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');}
  volumeformat = (val) => {return val.toFixed(0).replace(/(\d)(?=(\d{3}))/g, '$1,');}

  columns = [{
    Header: 'date',
    accessor: 'date' 
  }, {
    Header: 'open',
    accessor: 'open',
    style: {
      textAlign: 'right'
    },
    Cell : props => this.numberformat (props.value)

  }, {
    Header: 'high',
    accessor: 'high',
    style: {
      textAlign: 'right'
    },
    Cell : props => this.numberformat (props.value)
  }, {
    Header: 'low',
    accessor: 'low',
    style: {
      textAlign: 'right'
    },
    Cell : props => this.numberformat (props.value)
  }, {
    Header: 'close',
    accessor: 'close',
    style: {
      textAlign: 'right'
    },
    Cell : props => this.numberformat (props.value)
  }, {
    Header: 'volume',
    accessor: 'volume',
    style: {
      textAlign: 'right'
    },
    Cell : props => this.volumeformat (props.value)
  }, {
    Header: 'unadjustedVolume',
    accessor: 'unadjustedVolume',
    style: {
      textAlign: 'right'
    },
    Cell : props => this.volumeformat (props.value)
  }, {
    Header: 'change',
    accessor: 'change',
    style: {
      textAlign: 'right'
    },
    Cell : props =>  this.numberformat (props.value) 
  }, {
    Header: 'changePercent',
    accessor: 'changePercent',
    style: {
      textAlign: 'right'
    },
    Cell : props => this.numberformat (props.value) + '%'
  }, {
    Header: 'vwap',
    accessor: 'vwap',
    style: {
      textAlign: 'right'
    },
    Cell : props => this.numberformat (props.value)
  }, {
    Header: 'label',
    accessor: 'label',
    style: {
      textAlign: 'right'
    }
  }, {
    Header: 'changeOverTime',
    accessor: 'changeOverTime',
    style: {
      textAlign: 'right'
    },
    Cell : props => this.numberformat (props.value)
  }
];

  getChart = (stockId, duration) => {
    return (
      axios
        .get(`https://api.iextrading.com/1.0/stock/${stockId}/chart/${duration}`)
        .then(response => {
          const Chart = response.data ;
          const chartArr = Object.assign({}, { data : Chart });
          this.setState( chartArr);
          if (this.props.loading === 't') {
           store.dispatch(toggleLoading('f'));
         }          
        })
        .catch(error =>  {
          console.log(error);
        })
    );
  }

  
  getAll = async (stockId, duration) => {
    try {
      await this.getChart(stockId, duration);
     
    }
    catch (e) {
      console.error(e); 
    }
  }


  fetch() {
    store.dispatch(toggleLoading('t'));    
    this.setState({
      data : []
    });
    let stockId = store.getState().states.stockId;
    if (stockId !== null) {
      this.getAll(stockId, this.props.duration);
    }  
 
  }

  componentWillMount() {
    this.fetch();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      {
        console.log(store.getState());
      }
    );     
  }

  componentWillUpdate(nextProps) {
    if (nextProps.stockId !== this.props.stockId) {
      this.fetch();
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  toCurrency(numberString) {
    let number = parseFloat(numberString);
    return number.toLocaleString('USD');
  }  

  view() {
    let stockId = store.getState().states.stockId;



    if (stockId === null ) {
      return (<div> search for stock Id </div>);
    } 
    if (this.state.data.length === 0) {
      return (<div> loading... </div>);
    }
    const { data } = this.state;

    

    return ( <div>
      <ReactTable
        columns={this.columns}
        data = {data}
        noDataText="No data found"
        showPagination={true}
        defaultPageSize={10}
        className="-striped -highlight"
        loading = {store.getState().loadings.loading === 't' ? true : false}
        />

    </div>
    );
  }

  render() {
    return this.view();
  }
}


const mapStateToProps = (state) => {
  return {
    stockId : store.getState().states.stockId,
    loading : store.getState().loadings.loading
  }
};

export default connect(mapStateToProps)(CompanyChart);





import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Header, Sidebar, Content, Footer } from 'components/Layout';

import componentQueries from 'react-component-queries';


import DropdownPage from 'pages/DropdownPage';
import CompanyData from 'components/Stock/CompanyData';
import CompanyChart from 'components/Stock/CompanyChart';

import store from 'reducers/store.js';
import { updateStockId } from 'reducers/actions/state-actions';

import './styles/reduction.css';

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {


  // state = {
  //   stockId : 'orcl'
  // }

  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);
  }

  // close sidebar when
  handleContentClick = event => {
    // close sidebar if sidebar is open and screen size is less than `md`
    if (
      App.isSidebarOpen() &&
      (this.props.breakpoint === 'xs' ||
        this.props.breakpoint === 'sm' ||
        this.props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }

    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
  }

  render() {
    return (
      <BrowserRouter basename={getBasename()}>
          <main className="cr-app bg-light">
            <Sidebar />
            <Content fluid onClick={this.handleContentClick}>
              <Header />
              <Switch>

                <Route exact path="/cards" component={CompanyData}  />
                <Route path="/dropdowns" component={DropdownPage} />     
                <Route path="/stock/:stockId/chart/:duration" render={(props) => <GotoCompanyChart  {...props} />} />     
                     
                <Redirect to="/" />
              </Switch>
              <Footer />
            </Content>


          </main>

      </BrowserRouter>
    );
  }
}

const GotoCompanyChart = ({ match }) => 
{      
  let stockId=match.params.stockId;
  store.dispatch(updateStockId(stockId));

  return (
    <div>
      <h2>stockId: {match.params.stockId}</h2>
      <h2>duration: {match.params.duration}</h2>
      <CompanyChart  stockId={match.params.stockId} duration={match.params.duration} />
    </div>

  )
}


const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);

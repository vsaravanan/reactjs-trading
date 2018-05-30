import Page from 'components/Page';
import React, { Component} from 'react';
import {
  //Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  //Table,
  //Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown,
  NavLink,
} from 'reactstrap';
import CompanyChart from '../components/Stock/CompanyChart';

import store from 'reducers/store.js';
import {connect } from 'react-redux';
//import { getThemeColors } from 'utils/colors';

//const colors = getThemeColors();

class DropdownPage extends Component {

  state = {
    duration : '1m',
    stockId : null
  }
  
  

  // select = (event) => {
  //   this.setState({
  //     duration : event.target.innerText
  //   });
  //   console.log(" select " + this.state.duration);
  //   // let stockId = store.getState().states.stockId;
  //   // let url = '/stock/' + stockId + '/chart/' + this.state.duration;
  //   // return url;
  // }


    render() {
      return (
        <Page title="Stock Chart" breadcrumbs={[{ name: 'stockchart', active: true }]}>
          <Row>
            <Col md={6}>
              <Card>
                <CardHeader>StockChart</CardHeader>
                <CardBody>
                <UncontrolledButtonDropdown>
                      <DropdownToggle
                        caret
                        color="primary"
                        className="text-capitalize m-1">
                        {this.state.duration}
                      </DropdownToggle>
                      <DropdownMenu>

                        <NavLink href={"/stock/" + store.getState().states.stockId + "/chart/1m" }  active className="position-relative">
                          <DropdownItem >1m</DropdownItem>
                        </NavLink>

                        <NavLink href={"/stock/" + store.getState().states.stockId + "/chart/3m" } active className="position-relative">
                          <DropdownItem >3m</DropdownItem>
                        </NavLink>

                        <NavLink href={"/stock/" + store.getState().states.stockId + "/chart/6m" } active className="position-relative">
                          <DropdownItem >6m</DropdownItem>
                        </NavLink>

                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CompanyChart duration={this.state.duration} />
            </Col>        
          </Row>

        </Page>
      );
    }
};



const mapStateToProps = (state) => {
  return {
    stockId : store.getState().states.stockId
  }
};

export default connect(mapStateToProps)(DropdownPage);
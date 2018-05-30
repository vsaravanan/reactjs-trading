
import React, { Component } from 'react' ;
import PropTypes from "prop-types";
import Company from 'components/Stock/Company';
import Page from 'components/Page';
import store from 'reducers/store.js';
import {connect } from 'react-redux';



import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardLink,
  Row,
  Col,
  Button,
} from 'reactstrap';

function Loading(props) {

  let loading = props.loading;
  let data;

  if (loading === 't') {
    data = <img src={ require('assets/img/preloader.gif')}  alt="Loading..." />
  } else {
    data = (
        <span>
        {props.description}    
        </span>
    );
  }  
  return data;  
}

//function CompanyList(props) {
class CompanyList extends Component {  

  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      {
        console.log(store.getState());
        //this.forceUpdate();
      }
    );     
  }


  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
  //console.log(this.props.loading);
   
  return (
      <Page title="Company Cards" breadcrumbs={[{ name: 'cards', active: true }]}>
        <Row>
          {this.props.company.map((company, index) => (

            <Col md={3} sm={6} xs={12} className="mb-3"  key={company.symbol} >

              <Card
                inverse
                className={`border-0 bg-gradient-theme`}
                >
                <CardBody className="d-flex flex-column justify-content-start align-items-start">
                  <CardTitle>{company.symbol} - {company.companyName} </CardTitle>
                  <CardText><Loading  loading={this.props.loading} description={company.description} /></CardText>
                </CardBody>

                <CardBody className="d-flex justify-content-between align-items-center">
                  <CardText>{company.ceo}</CardText>
                  <CardLink href={"/stock/" + company.symbol + "/chart/1m"}  >
                  
                  <Button outline color="light">
                    Click
                  </Button>
                  </CardLink>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Page>

  
    );
  }
} 

CompanyList.propTypes = {
  company :  PropTypes.arrayOf(Company)
};

CompanyList.defaultProps = {
  company: []
};


const mapStateToProps = (state) => {
  return {
    loading : store.getState().loadings.loading
  }
};

export default connect(mapStateToProps)(CompanyList);
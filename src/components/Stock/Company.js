import PropTypes from "prop-types";
import React from 'react' ;

// import classNames from 'classnames';
// import { Card, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';

const Company = (props) => {
  //const classes = classNames('bg-gradient-theme', className);
  const company = props.company || {};

  return (

    <div className="company">
      <div>{company.symbol}</div>
      <div>{company.companyName}</div>
      <div>{company.exchange}</div>
      <div>{company.industry}</div>
      <div>{company.website}</div>
      <div>{company.description}</div>
      <div>{company.ceo}</div>
      <div>{company.issueType}</div>
      <div>{company.sector}</div>
    </div>

  );
}

// const companyPropType = PropTypes.shape({
//   symbol : PropTypes.string,
//   companyName : PropTypes.string,
//   exchange : PropTypes.string,
//   industry : PropTypes.string,
//   website : PropTypes.string,
//   description : PropTypes.string,
//   ceo : PropTypes.string,
//   issueType : PropTypes.string,
//   sector : PropTypes.string
// });

// Company.propTypes = {
//   company: companyPropType
// };

Company.propTypes = {
  symbol : PropTypes.string,
  companyName : PropTypes.string,
  exchange : PropTypes.string,
  industry : PropTypes.string,
  website : PropTypes.string,
  description : PropTypes.string,
  ceo : PropTypes.string,
  issueType : PropTypes.string,
  sector : PropTypes.string
};

// Company.defaultProps = {
//   symbol : '',
//   companyName : '',
//   exchange : '',
//   industry : '',
//   website : '',
//   description : '',
//   ceo : '',
//   issueType : '',
//   sector : ''
// };

export default Company;
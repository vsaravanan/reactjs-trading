import React, { Component } from 'react';

import { Form, Input } from 'reactstrap';
import { MdSearch } from 'react-icons/lib/md';
import store from 'reducers/store.js';
import { updateStockId } from 'reducers/actions/state-actions';

class SearchInput extends Component {

  onClick = (e) => {

    let searchtext = document.getElementById('searchtext');
    if (searchtext.value.length > 0 )
      store.dispatch(updateStockId(searchtext.value));
  }
  render = () => {
    return (
      <Form inline className="cr-search-form" onSubmit={e => {
        e.preventDefault();
        let searchvalue = e.target.searchtext.value;
        if (searchvalue.length > 0 )
          store.dispatch(updateStockId(searchvalue));
      }}>
        <MdSearch
          size="20"
          className="cr-search-form__icon-search text-secondary"
          onClick={this.onClick}
        />
        <Input
          type="search"
          className="cr-search-form__input"
          placeholder="Search..."
          //ref={(node) => {this.searchtext = node} }
          id="searchtext"
        />
      </Form>
    );
  }
};

export default SearchInput;

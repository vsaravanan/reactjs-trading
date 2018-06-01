import React, { Component } from "react";

import { Form, Input } from "reactstrap";
import { MdSearch } from "react-icons/lib/md";
import store from "reducers/store.js";
import { updateStockId } from "reducers/actions/state-actions";

class SearchInput extends Component {
  onClick = e => {
    if (this.searchtext.value.length > 0)
      store.dispatch(updateStockId(this.searchtext.value));
  };
  render = () => {
    return (
      <Form
        inline
        className="cr-search-form"
        onSubmit={e => {
          e.preventDefault();
          this.onClick();
        }}
      >
        <MdSearch
          size="20"
          className="cr-search-form__icon-search text-secondary"
          onClick={e => this.onClick()}
        />
        <Input
          type="search"
          className="cr-search-form__input"
          placeholder="Search..."
          innerRef={node => {
            this.searchtext = node;
          }}
        />
      </Form>
    );
  };
}

export default SearchInput;

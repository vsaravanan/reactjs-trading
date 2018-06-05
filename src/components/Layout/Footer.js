import React from "react";

import { Navbar, Nav, NavItem } from "reactstrap";

import SourceLink from "components/SourceLink";

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          Try ORCL or MSFT or any other stock code in search box source on{" "}
          <SourceLink>Github</SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;

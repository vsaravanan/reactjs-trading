import React from 'react';

import bn from 'utils/bemnames';

import {
  Navbar,
  Nav,
  NavItem,
  NavLink as BSNavLink,
  // UncontrolledTooltip,
  // Collapse,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import {
  //MdDashboard,
  MdWeb,
  //MdInsertChart,
  // MdWidgets,
  // MdTextFields,
  // MdNotificationsActive,
  // MdBorderAll,
  // MdRadioButtonChecked,
  // MdStar,
  // MdGroupWork,
  MdArrowDropDownCircle,
  // MdBrush,
  // MdViewDay,
  // MdChromeReaderMode,
  // MdViewList,
  // MdExtension,
  // MdSend,
  // MdKeyboardArrowDown,
} from 'react-icons/lib/md';
//import FaGithub from 'react-icons/lib/fa/github';

import SourceLink from 'components/SourceLink';

import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import logo200Image from 'assets/img/logo/logo_200.png';

const sidebarBackground = {
//  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

// const navComponents = [
//   // { to: '/buttons', name: 'buttons', exact: false, Icon: MdRadioButtonChecked },
//   // {
//   //   to: '/button-groups',
//   //   name: 'button groups',
//   //   exact: false,
//   //   Icon: MdGroupWork,
//   // },
//   // { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
//   // { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
//   {
//     to: '/dropdowns',
//     name: 'dropdowns',
//     exact: false,
//     Icon: MdArrowDropDownCircle,
//   },
//   // { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
//   // { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
//   // { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
//   // { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
// ];

// const navContents = [
//   { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
//   { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
// ];

const navItems = [
  { to: '/cards', name: 'cards', exact: false, Icon: MdWeb },
//  { to: '/cards', name: 'cards', exact: true, Icon: MdWeb },
  { to: '/dropdowns', name: 'dropdowns', exact: false, Icon: MdArrowDropDownCircle },
//  { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
//  { to: '/widgets', name: 'widgets', exact: false, Icon: MdWidgets },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                Saravanan 
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}


          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;

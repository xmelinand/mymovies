import { UncontrolledDropdown, DropdownItem, DropdownMenu,
        DropdownToggle, Nav, Navbar, NavItem, NavLink, NavbarBrand,
        NavbarToggler, Collapse, NavbarText, } from "reactstrap";



function Header(){

  var handleClickAddMovie = () => {
    console.log("t'as cliqué bâtard");
  }

return (
<Navbar
    color="dark"
    light
    expand="md"

  >
    <NavbarBrand href="/">
      <img src="logo.png"/>
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
        
      >
        <NavItem>
          <NavLink href="/components/" className="text-light">
            Last releases
          </NavLink>
        </NavItem>
        <UncontrolledDropdown
          inNavbar
          nav
        >
          <DropdownToggle
            caret
            nav
            className="text-light"
          >
            Films
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
                WishList
            </DropdownItem>
            <DropdownItem
            divider/>
            <DropdownItem>
                Movie 1
            </DropdownItem>
            <DropdownItem>
                Movie 2
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
      <NavbarText>
        Simple Text
      </NavbarText>
    </Collapse>
  </Navbar>
)};

export {Header}
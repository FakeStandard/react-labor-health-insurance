import React from "react";
import { Container, Nav, Navbar, NavbarBrand, NavDropdown, NavItem, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import Calculation from "../Calculation/calculation";
import HealthGrading from "../HealthGrading/HealthGrading";
// import Calculation from "../Calculation/calculation";
import { IMenuProps } from "./IMenuProps";
import { IMenuStates } from "./IMenuStates";
// import Calculation from 'calculation';

export default class Menu extends React.Component<IMenuProps, IMenuStates> {
  constructor(props: IMenuProps) {
    super(props);

    this.state = {
      selectKey: "4",
    }
  }

  componentDidMount() {
    // componentDidMount
  }

  componentWillUnmount() {
    // componentWillUnmount
  }

  render(): React.ReactNode {
    const { selectKey } = this.state;

    return (
      <div>
        <Navbar bg="dark" variant="dark" onSelect={this.handleSelect}>
          <Container>
            <NavbarBrand>2022 勞健保與薪資查詢</NavbarBrand>
            <NavbarToggle aria-controls="menu-navbar" />
            <NavbarCollapse id="menu-navbar">
              <Nav>
                <NavLink href="#" eventKey={1}>薪資即時試算</NavLink>
                <NavLink href="#" eventKey={2}>勞健保及勞退費用對照表</NavLink>
                <NavDropdown title="投保薪資分級表">
                  <NavDropdown.Item href="#1" eventKey={3}>勞工保險投保分級表</NavDropdown.Item>
                  <NavDropdown.Item href="#2" eventKey={4}>全民健康保險投保金額分級表</NavDropdown.Item>
                  {/* <NavDropdown.Divider /> */}
                </NavDropdown>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>

        {/* 薪資即時試算 */}
        {(selectKey === "1") && (
          <Calculation />
        )}

        {/* 勞健保及勞退費用對照表 */}
        {(selectKey === "2") && (
          <div>勞健保及勞退費用對照表</div>
        )}

        {/* 勞工保險投保分級表 */}
        {(selectKey === "3") && (
          <div>勞工保險投保分級表</div>
        )}

        {/* 全民健康保險投保分級表 */}
        {(selectKey === "4") && (
          <HealthGrading />
        )}
      </div>
    );
  }

  handleSelect = (key: string | null) => {
    this.setState({ selectKey: key });
  }
}

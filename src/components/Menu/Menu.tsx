import React from "react";
import { Container, Nav, Navbar, NavbarBrand, NavDropdown, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import Calculation from "../Calculation/Calculation";
import ComparisonTable from "../ComparisonTable/ComparisonTable";
import HealthGrading from "../HealthGrading/HealthGrading";
import Index from "../Index/Index";
import LaborGrading from "../LaborGrading/LaborGrading";
import { IMenuProps } from "./IMenuProps";
import { IMenuStates } from "./IMenuStates";

export default class Menu extends React.Component<IMenuProps, IMenuStates> {
  constructor(props: IMenuProps) {
    super(props);

    this.state = {
      selectKey: "1",
    }
  }

  // 當 Component 被 render 到 DOM 之後才會執行
  componentDidMount() {
    // mount: 裝載(Component)
  }

  // 當 Component 從 DOM 被移除後執行
  componentWillUnmount() {
    // unmount: 卸載(Component)
  }

  render(): React.ReactNode {
    const { selectKey } = this.state;

    return (
      <div>
        <Navbar expand="lg" bg="dark" variant="dark" onSelect={this.handleSelect}>
          <Container>
            <NavbarBrand key={0} href="#" onClick={this.handleClick}>2022勞健保與薪資查詢</NavbarBrand>
            <NavbarToggle aria-controls="menu-navbar" />
            <NavbarCollapse id="menu-navbar">
              <Nav>
                <NavLink eventKey={1}>薪資即時試算</NavLink>
                <NavLink eventKey={2}>勞健保及勞退費用對照表</NavLink>
                <NavDropdown title="投保薪資分級表">
                  <NavDropdown.Item eventKey={3}>勞工保險投保分級表</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey={4}>全民健康保險投保金額分級表</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>

        {/* 薪資即時試算 */}
        {(selectKey === "0") && (
          <Index />
        )}

        {/* 薪資即時試算 */}
        {(selectKey === "1") && (
          <Calculation />
        )}

        {/* 勞健保及勞退費用對照表 */}
        {(selectKey === "2") && (
          <ComparisonTable />
        )}

        {/* 勞工保險投保分級表 */}
        {(selectKey === "3") && (
          <LaborGrading />
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

  handleClick = () => {
    this.setState({ selectKey: "0" });
  }
}


import React from "react";
import { Badge, Container, Nav, Navbar, NavbarBrand, NavDropdown, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import Calculation from "../Calculation/Calculation";
import ComparisonTable from "../ComparisonTable/ComparisonTable";
import HealthGrading from "../HealthGrading/HealthGrading";
import AssociationMember from "../HealthPremium/AssociationMember/AssociationMember";
import Employers from "../HealthPremium/Employers/Employers";
import NormalEmployees from "../HealthPremium/NormalEmployees/NormalEmployees";
import PrivateStaff from "../HealthPremium/PrivateStaff/PrivateStaff";
import ProfessionalMember from "../HealthPremium/ProfessionalMember/ProfessionalMember";
import PublicServants from "../HealthPremium/PublicServants/PublicServants";
import Home from "../Home/Home";
import LaborGrading from "../LaborGrading/LaborGrading";
import PensionGrading from "../PensionGrading/PensionGrading";
import { IMenuProps } from "./IMenuProps";
import { IMenuStates } from "./IMenuStates";
export default class Menu extends React.Component<IMenuProps, IMenuStates> {
  constructor(props: IMenuProps) {
    super(props);

    this.state = {
      selectKey: "0",
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
        {/* 路由 */}
        <Navbar expand="lg" bg="dark" variant="dark" onSelect={this.handleSelect}>
          <Container>
            <NavbarBrand key={0} onClick={this.handleClick}>2022勞健保與薪資查詢</NavbarBrand>
            <NavbarToggle aria-controls="menu-navbar" />
            <NavbarCollapse id="menu-navbar">
              <Nav>
                <NavLink eventKey={1}>薪資即時試算</NavLink>
                <NavLink eventKey={2}>勞健保保費及勞退提繳三合一費用對照表</NavLink>
                <NavDropdown title="投保薪資分級表">
                  <NavDropdown.Item eventKey={3}>勞工保險投保分級表</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey={4}>全民健康保險投保金額分級表</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey={5}>勞工退休金月提繳工資分級表</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="全民健康保險保險費負擔金額表">
                  <NavDropdown.Item eventKey={6}>公、民營事業、機構及有一定雇主之受僱者
                    {'  '}<Badge pill bg="danger">New</Badge>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey={7}>公務人員、公職人員、志願役軍人
                    {'  '}<Badge pill bg="danger">New</Badge>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey={8}>私立學校教職員
                    {'  '}<Badge pill bg="danger">New</Badge>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey={9}>雇主、自營業主、專門職業及技術人員自行執業者
                    {'  '}<Badge pill bg="danger">New</Badge>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey={10}>農會、漁會、水利會會員
                    {'  '}<Badge pill bg="danger">New</Badge>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey={11}>職業工會會員
                    {'  '}<Badge pill bg="danger">New</Badge>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>

        {/* 首頁 */}
        {(selectKey === "0") && (
          <Home />)}

        {/* 薪資即時試算 */}
        {(selectKey === "1") && (
          <Calculation />)}

        {/* 勞健保保費及勞退提繳三合一費用對照表 */}
        {(selectKey === "2") && (
          <ComparisonTable />)}

        {/* 勞工保險投保分級表 */}
        {(selectKey === "3") && (
          <LaborGrading />)}

        {/* 全民健康保險投保金額分級表 */}
        {(selectKey === "4") && (
          <HealthGrading />)}

        {/* 勞工退休金月提繳工資分級表 */}
        {(selectKey === "5") &&
          (<PensionGrading />)}

        {/* 全民健康保險保險費負擔金額表 */}

        {/* 公、民營事業、機構及有一定雇主之受僱者 */}
        {(selectKey === "6") &&
          (<NormalEmployees />)}

        {/* 公務人員、公職人員、志願役軍人 */}
        {(selectKey === "7") &&
          (<PublicServants />)}

        {/* 私立學校教職員 */}
        {(selectKey === "8") &&
          (<PrivateStaff />)}

        {/* 雇主、自營業主、專門職業及技術人員自行執業者 */}
        {(selectKey === "9") &&
          (<Employers />)}

        {/* 農會、漁會、水利會會員 */}
        {(selectKey === "10") &&
          (<AssociationMember />)}

        {/* 職業工會會員 */}
        {(selectKey === "11") &&
          (<ProfessionalMember />)}
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


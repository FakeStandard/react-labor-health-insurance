import React from "react";
import { Badge, Container, Nav, Navbar, NavbarBrand, NavDropdown, NavLink } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import Calculation from "../Calculation/Calculation";
import ComparisonTable from "../ComparisonTable/ComparisonTable";
import AssociationMember from "../HealthPremium/AssociationMember/AssociationMember";
import Employers from "../HealthPremium/Employers/Employers";
import NormalEmployees from "../HealthPremium/NormalEmployees/NormalEmployees";
import PrivateStaff from "../HealthPremium/PrivateStaff/PrivateStaff";
import ProfessionalMember from "../HealthPremium/ProfessionalMember/ProfessionalMember";
import PublicServants from "../HealthPremium/PublicServants/PublicServants";
import Home from "../Home/Home";
import Health from "../GradingTable/Health/Health";
import Labor from "../GradingTable/Labor/Labor";
import Pension from "../GradingTable/Pension/Pension";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

export interface IMenuProps {
}
export interface IMenuStates {
}
export default class Menu extends React.Component<IMenuProps, IMenuStates> {
  constructor(props: IMenuProps) {
    super(props);

    this.state = {
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
    return (
      <div>
        {/* 路由 */}
        <BrowserRouter>
          <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
              <NavbarBrand as={Link} to="/">2022勞健保與薪資查詢</NavbarBrand>
              <NavbarToggle aria-controls="menu-navbar" />
              <NavbarCollapse id="menu-navbar">
                <Nav>
                  <NavLink as={Link} to="/calculation">薪資即時試算</NavLink>
                  <NavLink as={Link} to="/comparison-table">勞健保保費及勞退提繳三合一費用對照表</NavLink>
                  <NavDropdown title="投保薪資分級表">
                    <NavDropdown.Item as={Link} to="/grading-labor">
                      勞工保險投保分級表
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/grading-health">
                      全民健康保險投保金額分級表
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/grading-pension">
                      勞工退休金月提繳工資分級表
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="全民健康保險保險費負擔金額表">
                    <NavDropdown.Item as={Link} to="/health-premium-normal-employees">
                      公、民營事業、機構及有一定雇主之受僱者
                      {'  '}<Badge pill bg="danger">New</Badge>
                    </NavDropdown.Item>
                    <NavDropdown.Divider /> ˇ
                    <NavDropdown.Item as={Link} to="/health-premium-public-servants">
                      公務人員、公職人員、志願役軍人
                      {'  '}<Badge pill bg="danger">New</Badge>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/health-premium-private-staff">
                      私立學校教職員
                      {'  '}<Badge pill bg="danger">New</Badge>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/health-premium-employers">
                      雇主、自營業主、專門職業及技術人員自行執業者
                      {'  '}<Badge pill bg="danger">New</Badge>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/health-premium-associateion-member">
                      農會、漁會、水利會會員
                      {'  '}<Badge pill bg="danger">New</Badge>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/health-premium-professional-member">
                      職業工會會員
                      {'  '}<Badge pill bg="danger">New</Badge>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </NavbarCollapse>
            </Container>
          </Navbar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculation" element={<Calculation />} />
            <Route path="/comparison-table" element={<ComparisonTable />} />
            <Route path="/grading-labor" element={<Labor />} />
            <Route path="/grading-health" element={<Health />} />
            <Route path="/grading-pension" element={<Pension />} />
            <Route path="/health-premium-normal-employees" element={<NormalEmployees />} />
            <Route path="/health-premium-public-servants" element={<PublicServants />} />
            <Route path="/health-premium-private-staff" element={<PrivateStaff />} />
            <Route path="/health-premium-employers" element={<Employers />} />
            <Route path="/health-premium-associateion-member" element={<AssociationMember />} />
            <Route path="/health-premium-professional-member" element={<ProfessionalMember />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}


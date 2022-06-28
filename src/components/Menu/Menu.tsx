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
import PartTime from "../LaborPremium/PartTime/PartTime";
import LaborRatio from "../BurdenRatio/Labor/LaborRatio";
import OccupationalAccidentRateTable from "../OccupationalAccidentRateTable/OccupationalAccidentRateTable";

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
        <BrowserRouter basename="react-labor-health-insurance">
          <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
              <NavbarBrand as={Link} to="/">2022勞健保查詢與薪資即時試算</NavbarBrand>
              <NavbarToggle aria-controls="menu-navbar" />
              <NavbarCollapse id="menu-navbar">
                <Nav>
                  <NavLink as={Link} to="/calculation">薪資即時試算</NavLink>
                  <NavLink as={Link} to="/comparison-table">費用對照表</NavLink>
                  <NavDropdown title="投保薪資分級表">
                    <NavDropdown.Item as={Link} to="/grading-labor">
                      勞工保險投保薪資分級表
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
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/health-premium-public-servants">
                      公務人員、公職人員、志願役軍人
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/health-premium-private-staff">
                      私立學校教職員
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/health-premium-employers">
                      雇主、自營業主、專門職業及技術人員自行執業者
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/health-premium-associateion-member">
                      農會、漁會、水利會會員
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/health-premium-professional-member">
                      職業工會會員
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="勞工保險保險費分擔表">
                    <NavDropdown.Item as={Link} to="/labor-premium-generalUnit">
                      一般單位
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/labor-premium-partTime">
                      部分工時
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/labor-premium-professionalUnion">
                      職業工會被保險人(會員)月
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/labor-premium-fishingClub">
                      漁會被保險人(會員)
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/labor-premium-disabilities">
                      庇護性就業身心障礙人員
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavLink as={Link} to="/labor-premium-burden-ratio">保險費負擔比例一覽表
                    {'  '}<Badge pill bg="danger">New</Badge>
                  </NavLink>
                  <NavLink as={Link} to="/oa-rate-table">職災費率表
                    {'  '}<Badge pill bg="danger">New</Badge>
                  </NavLink>
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

            {/* 全民健康保險保險費負擔金額表 */}
            <Route path="/health-premium-normal-employees" element={<NormalEmployees />} />
            <Route path="/health-premium-public-servants" element={<PublicServants />} />
            <Route path="/health-premium-private-staff" element={<PrivateStaff />} />
            <Route path="/health-premium-employers" element={<Employers />} />
            <Route path="/health-premium-associateion-member" element={<AssociationMember />} />
            <Route path="/health-premium-professional-member" element={<ProfessionalMember />} />
            {/* 勞工保險保險費分擔表 */}
            <Route path="/labor-premium-generalUnit" element={<PartTime />} />
            <Route path="/labor-premium-partTime" element={<PartTime />} />
            <Route path="/labor-premium-professionalUnion" element={<PartTime />} />
            <Route path="/labor-premium-fishingClub" element={<PartTime />} />
            <Route path="/labor-premium-disabilities" element={<PartTime />} />

            <Route path="/labor-premium-burden-ratio" element={<LaborRatio />} />
            <Route path="/oa-rate-table" element={<OccupationalAccidentRateTable />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}


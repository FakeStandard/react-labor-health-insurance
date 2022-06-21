import { Separator, Stack } from "@fluentui/react";
import React from "react";
import { Card, Col, Container, Row, Form } from "react-bootstrap";
import "./Calculation.css"
import { ICalculationProps } from "./ICalculationProps";
import { ICalculationStates } from "./ICalculationStates";

export default class Calculation extends React.Component<ICalculationProps, ICalculationStates>{
  constructor(props: ICalculationProps) {
    super(props);

    this.state = {
      isLoaded: false,
      errInput: false,
      pensionCheck: false,
      pensionSelect: 5,
      pensionLabel: '6%',
      laborInfo: [],
      healthInfo: [],
      pensionInfo: [],
      // 勞保
      labor: {
        salaryLevel: 0,
        personal: 0,
        employer: 0,
        government: 0,
        total: 0
      },
      // 健保
      health: {
        salaryLevel: 0,
        personal: 0,
        employer: 0,
        government: 0,
        dependents: 0,
        total: 0
      },
      // 勞退 & 自提
      pension: {
        salaryLevel: 0,
        personal: 0,
        employer: 0
      },
      // 個人統計
      statistics: {
        basicSalary: 0,
        actualSalary: 0,
      }
    }
  }

  componentDidMount() {
    // componentDidMount
    this.getData();
  }

  componentWillUnmount() {
    // componentWillUnmount
  }

  getData = async () => {
    // 勞保
    await fetch("./JSON/GradingTable/Labor.json")
      .then(res => res.json())
      .then(res => {
        // console.log(res.normal);
        this.setState({ laborInfo: res.normal })
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))

    // 健保
    await fetch("./JSON/GradingTable/Health.json")
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        this.setState({ healthInfo: res })
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))

    // 勞退
    await fetch("./JSON/GradingTable/Pension.json")
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        this.setState({ pensionInfo: res })
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))
  }

  changeInput = async (e: any) => {
    const salary = e.target.value;
    const regular = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;

    if (salary !== "0" && regular.test(salary)) {
      this.setState({ errInput: false })

      // 勞保
      await this.setLaborInfo(salary);

      // 健保
      await this.setHealthInfo(salary);

      // 勞退
      await this.setPension(salary);

      // 統計
      await this.setStatistics(salary);
    } else {
      this.setState({
        labor: {
          salaryLevel: 0,
          personal: 0,
          employer: 0,
          government: 0,
          total: 0,
        },
        health: {
          salaryLevel: 0,
          personal: 0,
          employer: 0,
          government: 0,
          dependents: 0,
          total: 0,
        },

        pension: {
          salaryLevel: 0,
          personal: 0,
          employer: 0,
        },

        statistics: {
          basicSalary: 0,
          actualSalary: 0,
        }
      })

      if (salary === "0") {
        this.setState({ errInput: false })
        return
      }

      this.setState({ errInput: true })
    }
  }

  changeSelect = async (e: any) => {
    const value = e.target.value;
    const health = this.state.health;

    const num = Number(value) > 3 ? 4 : Number(value) + 1
    const single = Math.round(health.salaryLevel * 5.17 / 100 * 0.3)
    const sum = num * single

    this.setState({
      health: {
        salaryLevel: health.salaryLevel,
        personal: sum,
        employer: health.employer,
        government: health.government,
        dependents: Number(value),
        total: health.employer + health.government + sum
      }
    })

    const salary = this.state.statistics.basicSalary

    const labor = this.state.labor.personal
    const pension = this.state.pension.personal
    const actualSalary = salary - labor - sum - pension;

    this.setState({
      statistics: {
        basicSalary: salary,
        actualSalary: actualSalary
      }
    })
  }

  changePensionCheck = async (e: any) => {
    const checked = e.target.checked;
    const level = this.state.pension.salaryLevel
    const salary = this.state.statistics.basicSalary
    const regular = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;

    this.setState({ pensionCheck: checked })

    // recalculate
    if (level !== 0 && regular.test(String(level))) {
      await this.setPension(salary);
      await this.setStatistics(salary);
    }
  }

  changePensionSelect = async (e: any) => {
    const item = e.target.value;
    const level = this.state.pension.salaryLevel
    const salary = this.state.statistics.basicSalary
    const regular = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;

    this.setState({ pensionSelect: item, pensionLabel: e.target[item].label })

    // recalculate
    if (level !== 0 && regular.test(String(level))) {
      await this.setPension(salary);
      await this.setStatistics(salary);
    }
  }

  // 設置勞保資訊
  setLaborInfo = (salary: any) => {
    const laborInfo = this.state.laborInfo;
    let personal = 0;
    let employer = 0;
    let government = 0;

    // 預設為最高級距
    let level = Number(laborInfo[laborInfo.length - 1].InsuredSalaryLevel.replace(",", ""));
    let temp = 0

    // 迭代搜尋
    for (let i = laborInfo.length - 1; i >= 0; i--) {
      temp = Number(laborInfo[i].InsuredSalaryLevel.replace(",", ""))

      if (Number(salary) <= temp)
        level = temp;
    }

    // 計算
    // 勞保費率(11.5%) = 普通事故保險費率(10.5%) + 就業保險費率(1%)
    personal = Math.round(level * 10.5 / 100 * 0.2) + Math.round(level * 1 / 100 * 0.2)
    employer = Math.round(level * 10.5 / 100 * 0.7) + Math.round(level * 1 / 100 * 0.7)
    government = Math.round(level * 10.5 / 100 * 0.1) + Math.round(level * 1 / 100 * 0.1)

    this.setState({
      labor: {
        salaryLevel: level,
        personal: personal,
        employer: employer,
        government: government,
        total: personal + employer + government
      }
    })
  }

  // 設置健保資訊
  setHealthInfo = (salary: any) => {
    let healthInfo = this.state.healthInfo;
    let personal = 0;
    let employer = 0;
    let government = 0;

    // 預設為最高級距
    let level = Number(healthInfo[healthInfo.length - 1].InsuredSalaryLevel.replace(",", ""));
    let temp = 0

    // 迭代搜尋
    for (let i = healthInfo.length - 1; i >= 0; i--) {
      temp = Number(healthInfo[i].InsuredSalaryLevel.replace(",", ""));

      if (Number(salary) <= temp)
        level = temp
      else break;
    }

    // 計算
    // 投保金額 * 保險費率（5.17%）* 負擔比率（小數點後先四捨五入）* (本人+眷屬人數)
    // 自109年1月1日起調整平均眷口數為0.58人，投保單位及政府負擔金額含本人及平均眷屬人數0.58人，合計1.58人。
    const dependents = this.state.health.dependents

    personal = Math.round(level * 5.17 / 100 * 0.3) * (dependents + 1)
    employer = Math.round(level * 5.17 / 100 * 0.6 * 1.58)
    government = Math.round(level * 5.17 / 100 * 0.1 * 1.58)


    this.setState({
      health: {
        salaryLevel: level,
        personal: personal,
        employer: employer,
        government: government,
        dependents: dependents,
        total: personal + employer + government
      }
    })
  }

  // 設置勞退資訊
  setPension = async (salary: any) => {
    let pensionInfo = this.state.pensionInfo;

    // 預設為最高級距
    let level = Number(pensionInfo[pensionInfo.length - 1].InsuredSalaryLevel.replace(",", ""));
    let temp = 0

    // 迭代搜尋
    for (let i = pensionInfo.length - 1; i >= 0; i--) {
      temp = Number(pensionInfo[i].InsuredSalaryLevel.replace(",", ""));

      if (Number(salary) <= temp)
        level = temp
      else break;
    }

    // 計算
    // 投保金額 * 保險費率（5.17%）* 負擔比率（小數點後先四捨五入）* (本人+眷屬人數)
    // 自109年1月1日起調整平均眷口數為0.58人，投保單位及政府負擔金額含本人及平均眷屬人數0.58人，合計1.58人。
    this.setState((state) => ({
      pension: {
        salaryLevel: level,
        personal: state.pensionCheck ? Math.round(level * (Number(state.pensionSelect) + 1) / 100) : 0,
        employer: Math.round(level * 0.06),
      }
    }))
  }

  // 設置個人統計
  setStatistics = async (salary: any) => {
    this.setState((state) => ({
      statistics: {
        basicSalary: salary,
        actualSalary: salary - state.labor.personal - state.health.personal - state.pension.personal
      }
    }))
  }

  render(): React.ReactElement<ICalculationProps> {
    const {
      labor, health, pension, statistics,
      errInput, pensionCheck, pensionSelect, pensionLabel
    } = this.state;

    const separatorStyle = {
      root: [{
        // add selectors here
        selectors: {
          '::before': {
            background: '#d2d0ce',
          },
        }
      }]
    }

    return (
      <div className="Calculation" >
        <Container fluid>
          <h3>
            <span>薪資即時試算</span>
          </h3>
          <br />
          <Stack styles={{ root: [{ height: 70 }] }}>
            <Row className="justify-content-center">
              <Col xs={10} sm={8} md={6} lg={4}>
                <Form.Control
                  type="text"
                  placeholder="Please enter salary"
                  isInvalid={errInput}
                  onChange={(event: any) => { this.changeInput(event); }}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid salary
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Stack>
          <Stack>
            <Row className="justify-content-center">
              <Col xs={3} sm={2} md={2} lg={1} xl={1}>
                <Form.Check
                  type={'checkbox'}
                  id={`default-checkbox`}
                  label={`自提`}
                  checked={pensionCheck}
                  onChange={(event: any) => { this.changePensionCheck(event); }}
                />
              </Col>
              <Col xs={3} sm={3} md={2} lg={1} xl={1}>
                <Form.Select size="sm"
                  className="text-center text-md-right"
                  value={pensionSelect}
                  disabled={!pensionCheck}
                  onChange={(event: any) => { this.changePensionSelect(event); }}>
                  {[0, 1, 2, 3, 4, 5].map(c => (
                    <option key={c} value={c}>{`${c + 1}%`}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Stack>
          <Row>
            {/* 勞保 */}
            <Col xs={12} sm={6} md={6} lg={3}>
              <Card className="shadow-lg rounded"
                style={{
                  marginTop: 50, paddingTop: 20, paddingLeft: 10
                }}>
                <Card.Body className="CardText">
                  <Card.Title className="CardTitle">勞保</Card.Title>
                  <Row className="mb-3">
                    <Col>投保級距</Col>
                    <Col>{labor.salaryLevel}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>政府負擔 10%</Col>
                    <Col>{labor.government}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>雇主負擔 70%</Col>
                    <Col>{labor.employer}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col className="fontRed">個人負擔 20%</Col>
                    <Col>{labor.personal}</Col>
                  </Row>
                  <Separator styles={separatorStyle} />
                  <Row className="mb-3">
                    <Col>合計</Col>
                    <Col>{labor.total}</Col>
                  </Row>
                </Card.Body>
              </Card>
              {/* <div className="row">
              <span className="Remark">
                2021.1.1<br />
                普通事故保險費率從10%調整為10.5%<br />
                就業保險費率1%<br />
                故勞保費率為11.5%
              </span>
            </div> */}
            </Col>
            {/* 健保 */}
            <Col sm={6} md={6} lg={3}>
              <Card className="shadow-lg rounded"
                style={{
                  marginTop: 50, paddingTop: 20, paddingLeft: 10
                }}>
                <Card.Body className="CardText">
                  <Card.Title className="CardTitle">健保</Card.Title>
                  <Row className="mb-3">
                    <Col>投保級距</Col>
                    <Col>{health.salaryLevel}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>政府負擔 10%</Col>
                    <Col>{health.government}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>雇主負擔 60%</Col>
                    <Col>{health.employer}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>扶養眷屬</Col>
                    <Col>
                      <Form.Select
                        className="text-center text-md-right"
                        value={health.dependents}
                        onChange={(event: any) => { this.changeSelect(event); }}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3人以上(包含)</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col className="fontRed">個人負擔 30%</Col>
                    <Col>{health.personal}</Col>
                  </Row>
                  <Separator styles={separatorStyle} />
                  <Row className="mb-3">
                    <Col>合計</Col>
                    <Col>{health.total}</Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={6} lg={3}>
              {/* 勞退 */}
              <Card className="shadow-lg rounded"
                style={{
                  marginTop: 50, paddingTop: 20, paddingLeft: 10
                }}>
                <Card.Body className="CardText">
                  <Card.Title className="CardTitle">勞退(6%)</Card.Title>
                  <Row className="mb-3">
                    <Col>投保級距</Col>
                    <Col>{pension.salaryLevel}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>雇主負擔</Col>
                    <Col>{pension.employer}</Col>
                  </Row>
                </Card.Body>
              </Card>
              {/* 自提 */}
              <Card className="shadow-lg rounded"
                style={{
                  marginTop: 50, paddingTop: 20, paddingLeft: 10
                }}>
                <Card.Body className="CardText">
                  <Card.Title className="CardTitle">自提(最高6%)</Card.Title>
                  <Row className="mb-3">
                    <Col>投保級距</Col>
                    <Col>{pension.salaryLevel}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col className="fontRed">個人負擔</Col>
                    <Col>{pension.personal}</Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            {/* 個人統計 */}
            <Col xs={{ order: 'first' }} sm={{ order: 'last' }} md={{ order: 'last' }}>
              <Card className="shadow-lg rounded"
                style={{
                  marginTop: 50, paddingTop: 20, paddingLeft: 10
                }}>
                <Card.Body className="CardText">
                  <Card.Title className="CardTitle">個人統計</Card.Title>
                  <Row className="mb-3">
                    <Col className="fontGreen">本薪</Col>
                    <Col>{statistics.basicSalary}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col className="fontRed">- 勞保負擔</Col>
                    <Col>{labor.personal}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col className="fontRed">- 健保負擔</Col>
                    <Col>{health.personal}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col className="fontRed">- 自提 {pensionLabel}</Col>
                    <Col>{pension.personal}</Col>
                  </Row>
                  <Separator styles={separatorStyle} />
                  <Row className="mb-3">
                    <Col className="fontGreen">+ 實領薪資</Col>
                    <Col>{statistics.actualSalary}</Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container >
      </div >
    );
  }
}
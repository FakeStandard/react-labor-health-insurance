import { Stack, TextField } from "@fluentui/react";
import React from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import "./Calculation.css"
import { ICalculationProps } from "./ICalculationProps";
import { ICalculationStates } from "./ICalculationStates";

export default class Calculation extends React.Component<ICalculationProps, ICalculationStates>{
  constructor(props: ICalculationProps) {
    super(props);

    this.state = {
      isLoaded: false,
      errInputMsg: "",
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

    this.getData();
  }

  componentDidMount = async () => {
    // componentDidMount
  }

  componentWillUnmount() {
    // componentWillUnmount
  }

  getData = async () => {
    // 勞保
    await fetch("json/labor-grading.json")
      .then(res => res.json())
      .then(res => {
        // console.log(res.normal);
        this.setState({ laborInfo: res.normal })
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))

    // 健保
    await fetch("json/health-grading.json")
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        this.setState({ healthInfo: res })
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))

    // 勞退
    await fetch("json/pension-grading.json")
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        this.setState({ pensionInfo: res })
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))
  }

  changeInput = async (salary: any) => {
    const regular = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;
    if (regular.test(salary)) {
      // 勞保
      this.setState({ errInputMsg: "" })
      await this.setLaborInfo(salary);

      // 健保
      await this.setHealthInfo(salary);

      // 勞退
      await this.setPension(salary);

      // 統計
      await this.setStatistics(salary);
    } else {
      this.setState({
        errInputMsg: "Invalid salary",
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
    personal = Math.round(level * 5.17 / 100 * 0.3)
    employer = Math.round(level * 5.17 / 100 * 0.6 * 1.58)
    government = Math.round(level * 5.17 / 100 * 0.1 * 1.58)

    this.setState({
      health: {
        salaryLevel: level,
        personal: personal,
        employer: employer,
        government: government,
        total: personal + employer + government
      }
    })
  }

  // 設置勞退資訊
  setPension = (salary: any) => {
    let pensionInfo = this.state.pensionInfo;
    let personal = 0;
    let employer = 0;

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
    personal = Math.round(level * 0.06)
    employer = Math.round(level * 0.06)

    this.setState({
      pension: {
        salaryLevel: level,
        personal: personal,
        employer: employer,
      }
    })

  }

  // 設置個人統計
  setStatistics = (salary: any) => {
    const labor = this.state.labor.personal
    const health = this.state.health.personal
    const pension = this.state.pension.personal
    const actualSalary = salary - labor - health - pension;

    this.setState({
      statistics: {
        basicSalary: salary,
        actualSalary: actualSalary
      }
    })
  }

  render(): React.ReactElement<ICalculationProps> {
    const { labor, health, pension, statistics, errInputMsg } = this.state;

    return (
      <div className="Calculation" >
        <Container fluid>
          <h3>
            <span>薪資即時試算</span>
          </h3>
          {/* <span style={{ color: "#CC0000" }}>2022.1.1 起生效</span> */}
          <br />
          <Stack styles={{ root: [{ height: 50 }] }}>
            <Form>
              <Form.Group>
                <Row className="justify-content-center">
                  <Col md={6} lg={3}>
                    <TextField
                      maxLength={7}
                      autoFocus
                      placeholder="Please enter salary"
                      errorMessage={errInputMsg}
                      onChange={(e, text) => { this.changeInput(text); }} />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Stack>
          <Row>
            <Col xs={12} md={6}>
              <Card className="shadow-lg rounded"
                style={{
                  marginTop: 50, paddingTop: 20, paddingLeft: 20, paddingRight: 0
                }}>
                <Card.Body>
                  <Card.Title className="CardTitle">勞保</Card.Title>
                  <Card.Text className="CardText">
                    <div className="row">
                      <div className="col">
                        <p>投保級距</p>
                      </div>
                      <div className="col">
                        <p>{labor.salaryLevel}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p>政府負擔 10%</p>
                      </div>
                      <div className="col">
                        <p>{labor.government}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p>雇主負擔 70%</p>
                      </div>
                      <div className="col">
                        <p>{labor.employer}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p className="fontRed">個人負擔 20%</p>
                      </div>
                      <div className="col">
                        <p>{labor.personal}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <p>合計</p>
                      </div>
                      <div className="col">
                        <p>{labor.total}</p>
                      </div>
                    </div>
                  </Card.Text>
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
            <Col xs={12} md={6}>
              <Card className="shadow-lg rounded"
                style={{
                  marginTop: 50, paddingTop: 20, paddingLeft: 10, paddingRight: 10
                }}>
                <Card.Body>
                  <Card.Title className="CardTitle">健保</Card.Title>
                  <Card.Text className="CardText">
                    <div className="row">
                      <div className="col">
                        <p>投保級距</p>
                      </div>
                      <div className="col">
                        <p>{health.salaryLevel}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p>政府負擔 10%</p>
                      </div>
                      <div className="col">
                        <p>{health.government}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p>雇主負擔 60%</p>
                      </div>
                      <div className="col">
                        <p>{health.employer}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p>扶養眷屬</p>
                      </div>
                      <div className="col">
                        <p>0</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p className="fontRed">個人負擔 30%</p>
                      </div>
                      <div className="col">
                        <p>{health.personal}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <p>合計</p>
                      </div>
                      <div className="col">
                        <p>{health.total}</p>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card className="shadow-lg rounded"
                style={{
                  marginTop: 50, paddingTop: 20, paddingLeft: 10, paddingRight: 10
                }}>
                <Card.Body>
                  <Card.Title className="CardTitle">勞退(6%)</Card.Title>
                  <Card.Text className="CardText">
                    <div className="row">
                      <div className="col">
                        <p>投保級距</p>
                      </div>
                      <div className="col">
                        <p>{pension.salaryLevel}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p>雇主負擔</p>
                      </div>
                      <div className="col">
                        <p>{pension.employer}</p>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="shadow-lg rounded"
                style={{
                  marginTop: 50, paddingTop: 20, paddingLeft: 10, paddingRight: 10
                }}>
                <Card.Body>
                  <Card.Title className="CardTitle">自提(最高6%)</Card.Title>
                  <Card.Text className="CardText">
                    <div className="row">
                      <div className="col">
                        <p>投保級距</p>
                      </div>
                      <div className="col">
                        <p>{pension.salaryLevel}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p className="fontRed">個人負擔</p>
                      </div>
                      <div className="col">
                        <p>{pension.personal}</p>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={{ order: 'first' }} md={{ order: 'last' }}>
              <Card className="shadow-lg rounded"
                style={{
                  marginTop: 50, paddingTop: 20, paddingLeft: 10, paddingRight: 10
                }}>
                <Card.Body>
                  <Card.Title className="CardTitle">個人統計</Card.Title>
                  <Card.Text className="CardText">
                    <div className="row">
                      <div className="col">
                        <p className="fontGreen">本薪</p>
                      </div>
                      <div className="col">
                        <p>{statistics.basicSalary}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p className="fontRed">- 勞保負擔</p>
                      </div>
                      <div className="col">
                        <p>{labor.personal}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p className="fontRed">- 健保負擔</p>
                      </div>
                      <div className="col">
                        <p>{health.personal}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p className="fontRed">- 自提 6%</p>
                      </div>
                      <div className="col">
                        <p>{pension.personal}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <p className="fontGreen">實領薪資</p>
                      </div>
                      <div className="col">
                        <p>{statistics.actualSalary}</p>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div >
    );
  }
}
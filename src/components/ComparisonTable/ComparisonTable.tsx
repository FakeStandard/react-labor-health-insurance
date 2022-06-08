import React from "react";
import "./ComparisonTable.css"
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { IComparisonTableProps } from "./IComparisonTableProps";
import { IComparisonTableStates } from "./IComparisonTableStates";
import { IHealthInfo } from "../../interface/IHealthInfo";
import { IItemInfo } from "../../interface/IItemInfo";

export default class ComparisonTable extends React.Component<IComparisonTableProps, IComparisonTableStates>{
  constructor(props: IComparisonTableProps) {
    super(props);

    this.state = {
      isLoaded: false,
      items: [],
    }

    this.getData()
  }

  componentDidMount = async () => {

  }

  componentWillUnmount() {
    // componentWillUnmount
  }

  numberWithCommas = (number: number | string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getData = async () => {
    let healthInfo: IHealthInfo[] = [];
    let Info: IItemInfo[] = [];
    let laborLength: number = 0;
    let healthLength: number = 0;

    // 勞保
    await fetch("json/labor-grading.json")
      .then(res => res.json())
      .then(res => {
        laborLength = res.normal.length;
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))

    // 健保
    await fetch("json/health-grading.json")
      .then(res => res.json())
      .then(res => {
        healthInfo = res;
        healthLength = res.length;
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))

    // 因為健保級距比較多,故以此長度為限
    for (let i = 0; i < healthLength; i++) {
      const insuredSalaryLevel = Number(healthInfo[i].InsuredSalaryLevel.replace(',', ''));

      // 健康保險費率:5.17%
      // 計算公式:投保金額 * 保險費率（5.17%）* 負擔比率（小數點後先四捨五入）* (本人+眷屬人數)
      const p_health = this.numberWithCommas(Math.round(insuredSalaryLevel * 5.17 / 100 * 0.3));

      // 投保金額 * 保險費率（5.17%）* 負擔比率 * (1+平均眷口數) （小數點後四捨五入）
      // 平均眷口數：109年1月1日起調整為0.58人
      const e_health = this.numberWithCommas(Math.round(insuredSalaryLevel * 5.17 / 100 * 0.6 * 1.58));

      // 政府負擔10%
      const g_health = this.numberWithCommas(Math.round(insuredSalaryLevel * 5.17 / 100 * 0.1 * 1.58));

      // 自110年1月1日起，勞工保險保險費率實收10.5%。
      // 就業保險費率1%
      const p_accident = Math.round(insuredSalaryLevel * 10.5 / 100 * 0.2);
      const p_employemnt = Math.round(insuredSalaryLevel * 1 / 100 * 0.2);
      const p_total = this.numberWithCommas(p_accident + p_employemnt);

      const e_accident = Math.round(insuredSalaryLevel * 10.5 / 100 * 0.7);
      const e_employemnt = Math.round(insuredSalaryLevel * 1 / 100 * 0.7);
      const e_total = this.numberWithCommas(e_accident + e_employemnt);

      // const g_accident = Math.round(Number(insuredSalaryLevel) * 10.5 / 100 * 0.1);;
      // const g_employemnt = Math.round(Number(insuredSalaryLevel) * 1 / 100 * 0.1);
      // const g_total = this.numberWithCommas(g_accident + g_employemnt);;

      // 勞工退休金
      const laborPension = this.numberWithCommas(Math.round(insuredSalaryLevel * 0.06));

      let item: IItemInfo = {
        level: healthInfo[i].Level,
        insuredSalaryLevel: healthInfo[i].InsuredSalaryLevel,
        personalAccident: i >= laborLength ? "-" : this.numberWithCommas(p_accident),
        personalEmployment: i >= laborLength ? "-" : this.numberWithCommas(p_employemnt),
        personalTotal: i >= laborLength ? "-" : p_total,
        employerAccident: i >= laborLength ? "-" : this.numberWithCommas(e_accident),
        employerEmployment: i >= laborLength ? "-" : this.numberWithCommas(e_employemnt),
        employerTotal: i >= laborLength ? "-" : e_total,
        // governmentAccident: i >= laborLength ? "-" : this.numberWithCommas(g_accident),
        // governmentEmployment: i >= laborLength ? "-" : this.numberWithCommas(g_employemnt),
        // governmentTotal: i >= laborLength ? "-" : g_total,
        personalHealth: p_health,
        employerHealth: e_health,
        governmentHealth: g_health,
        laborPension: i > 40 ? "-" : laborPension,
        remark: "",
      }

      Info.push(item);
    }

    Info[laborLength - 1].remark = "勞保最高級距";
    Info[healthLength - 1].remark = "健保最高級距";
    Info[40].remark = "勞退最高級距";

    this.setState({ items: Info });
  }

  render(): React.ReactElement<IComparisonTableProps> {
    const { items } = this.state;

    return (
      <div className="ComparisonTable">
        <Container fluid>
          <h3>
            <span>勞健保及勞退費用對照表</span>
          </h3>
          <span style={{ color: "#CC0000" }}>2022.7.1 起生效</span>

          <Row className="justify-content-md-center">
            <Col xs sm md lg xl xxl={10}>
              <Card className="shadow-lg rounded"
                style={{ marginTop: 50, paddingTop: 10 }}>
                <Card.Body>
                  <Card.Text>
                    <Table bordered  striped hover responsive className="Table">
                      <thead>
                        <tr className="TableTitle">
                          <th rowSpan={3}>等級</th>
                          <th rowSpan={3}>投保級距</th>
                          <th colSpan={6}>勞保</th>
                          <th colSpan={3}>健保</th>
                          <th rowSpan={3}>勞工退休金<br />(雇主負擔)</th>
                          <th rowSpan={3}>備註</th>
                        </tr>
                        <tr className="TableTitle">
                          <th colSpan={3}>個人</th>
                          <th colSpan={3}>雇主</th>
                          {/* <th colSpan={3}>政府</th> */}
                          <th rowSpan={2}>個人</th>
                          <th rowSpan={2}>雇主</th>
                          <th rowSpan={2}>政府</th>
                        </tr>
                        <tr className="TableTitle">
                          <th>普通事故保險費率</th>
                          <th>就業保險費率</th>
                          <th>合計</th>
                          <th>普通事故保險費率</th>
                          <th>就業保險費率</th>
                          <th>合計</th>
                          {/* <th>普通事故保險費率</th>
                    <th>就業保險費率</th>
                    <th>合計</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.level}</td>
                            <td>{item.insuredSalaryLevel}</td>
                            <td>{item.personalAccident}</td>
                            <td>{item.personalEmployment}</td>
                            <td>{item.personalTotal}</td>
                            <td>{item.employerAccident}</td>
                            <td>{item.employerEmployment}</td>
                            <td>{item.employerTotal}</td>
                            {/* <td>{item.governmentAccident}</td> */}
                            {/* <td>{item.governmentEmployment}</td> */}
                            {/* <td>{item.governmentTotal}</td> */}
                            <td>{item.personalHealth}</td>
                            <td>{item.employerHealth}</td>
                            <td>{item.governmentHealth}</td>
                            <td>{item.laborPension}</td>
                            <td>{item.remark}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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
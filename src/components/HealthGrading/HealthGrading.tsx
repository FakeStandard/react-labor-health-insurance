import React from "react";
import "./HealthGrading.css"
import { Card, Table } from "react-bootstrap";
import { IHealthGradingStates } from "./HealthGradingStates";
import { IHealthGradingProps } from "./IHealthGradingProps";
import { rgb2hex, TagItemSuggestionBase } from "@fluentui/react";

export default class HealthGrading extends React.Component<IHealthGradingProps, IHealthGradingStates>{
  constructor(props: IHealthGradingProps) {
    super(props);

    this.state = {
      isLoaded: false,
      items: [{ Distance: "", InsuredSalaryLevel: "", Level: "", SalaryRange: "" }]
    }
  }

  componentDidMount = async () => {
    // get json data
    await fetch("json/health-grading.json")
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        this.setState({ items: res });
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))
  }

  componentWillUnmount() {
    // componentWillUnmount
  }

  render(): React.ReactElement<IHealthGradingProps> {
    const { items } = this.state;

    return (
      <div className="HealthGrading">
        <h3>
          <span>2022 全民健康保險投保金額分級表</span>
        </h3>
        <span style={{ color: "#CC0000" }}>111.7.1生效</span>

        <Card className="shadow-lg rounded"
          style={{
            marginTop: 50,
            paddingTop: 50, paddingLeft: 50, paddingRight: 50
          }}>
          <Card.Body>
            <Card.Text>
              <Table striped hover responsive>
                <thead className="table-success">
                  <tr>
                    <th>組別級距</th>
                    <th>投保等級</th>
                    <th>月投保金額(元)</th>
                    <th>實際薪資月額(元)</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.Level}>
                      <td rowSpan={1}>{item.Distance}</td>
                      <td>{item.Level}</td>
                      <td>{item.InsuredSalaryLevel}</td>
                      <td>{item.SalaryRange}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Text>
          </Card.Body>
        </Card>
      </div >
    );
  }
}
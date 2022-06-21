import React from "react";
import "./Health.css"
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { IHealthInfo } from "../../../interface/GradingTable/IHealthInfo";

export interface IHealthProps {

}

export interface IHealthStates {
  isLoaded: boolean,
  items: IHealthInfo[],
}

export default class Health extends React.Component<IHealthProps, IHealthStates>{
  constructor(props: IHealthProps) {
    super(props);

    this.state = {
      isLoaded: false,
      items: []
    }
  }

  componentDidMount = async () => {
    // get json data
    await fetch("./JSON/GradingTable/Health.json")
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

  render(): React.ReactElement<IHealthProps> {
    const { items } = this.state;

    return (
      <div className="Health">
        <Container fluid>
          <h3>
            <span>全民健康保險投保金額分級表</span>
          </h3>
          <span style={{ color: "#CC0000" }}>2022.7.1 起生效</span>

          <Row className="justify-content-md-center">
            <Col xs sm md lg={9} xl={8}>
              <Card className="shadow-lg rounded text-center"
                style={{ marginTop: 50, paddingTop: 10 }}>
                <Card.Body>
                  <Card.Text>
                    <Table hover responsive>
                      <thead >
                        <tr>
                          <th>組別級距</th>
                          <th>投保等級</th>
                          <th>月投保金額(元)</th>
                          <th>實際薪資月額(元)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={index}>
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
            </Col>
          </Row>
        </Container>
      </div >
    );
  }
}
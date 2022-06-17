import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import "./Pension.css";
import { IPensionInfo } from "../../../interface/GradingTable/IPensionInfo";

export interface IPensionProps {
}

export interface IPensionStates {
  isLoaded: boolean,
  items: IPensionInfo[],
}

export default class PensionGrading extends React.Component<IPensionProps, IPensionStates>{
  constructor(props: IPensionProps) {
    super(props)

    this.state = {
      isLoaded: false,
      items: []
    }
  }

  async componentDidMount() {
    await fetch("JSON/GradingTable/Pension.json")
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({ items: res })
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))
  }

  componentWillUnmount() {

  }

  render(): React.ReactNode {
    const { items } = this.state

    return (
      <div className="Pension">
        <Container fluid>
          <h3>
            <span>勞工退休金月提繳工資分級表</span>
          </h3>
          <span style={{ color: "#CC0000" }}>2022.1.1 起生效</span>
          <Row className="justify-content-md-center">
            <Col xs sm md={10} lg={7} xl={6}>
              <Card className="shadow-lg rounded"
                style={{ marginTop: 50, paddingTop: 10 }}>
                <Card.Body>
                  <Card.Text>
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>級距</th>
                          <th>級</th>
                          <th>實際工資/<br />執行業務所得(元)</th>
                          <th>月提繳工資/<br />月提繳執行業務所得(元)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={index}>
                            <td rowSpan={1}>{item.Distance}</td>
                            <td>{item.Level}</td>
                            <td>{item.SalaryRange}</td>
                            <td>{item.PaymentOfWages}</td>
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
      </div>
    )
  }
}
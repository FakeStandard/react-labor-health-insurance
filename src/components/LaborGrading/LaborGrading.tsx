import React from "react";
import "./LaborGrading.css"
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { ILaborGradingProps } from "./ILaborGradingProps";
import { ILaborGradingStates } from "./ILaborGradingStates";

export default class LaborGrading extends React.Component<ILaborGradingProps, ILaborGradingStates>{
  constructor(props: ILaborGradingProps) {
    super(props);

    this.state = {
      isLoaded: false,
      items: []
    }
  }

  componentDidMount = async () => {
    // get json data
    await fetch("json/labor-grading.json")
      .then(res => res.json())
      .then(res => {
        console.log(res.normal);
        this.setState({ items: res.normal });
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))
  }

  componentWillUnmount() {
    // componentWillUnmount
  }

  render(): React.ReactElement<ILaborGradingProps> {
    const { items } = this.state;

    return (
      <div className="LaborGrading">
        <Container fluid>
          <h3>
            <span>勞工保險投保薪資分級表</span>
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
                          <th>投保薪資等級</th>
                          <th>月薪資總額(元)</th>
                          <th>月投保薪資(元)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={index}>
                            <td rowSpan={1}>{item.Level}</td>
                            <td>{item.SalaryRange}</td>
                            <td>{item.InsuredSalaryLevel}</td>
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
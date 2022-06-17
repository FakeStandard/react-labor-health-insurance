import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { IPrivateStaffInfo } from "../../../interface/HealthPremium/IPrivateStaffInfo";
import "./PrivateStaff.css"

export interface IPrivateStaffProps {

}

export interface IPrivateStaffStates {
  isLoaded: boolean,
  items: IPrivateStaffInfo[],
}

export default class PublicServants extends React.Component<IPrivateStaffProps, IPrivateStaffStates>{
  constructor(props: IPrivateStaffProps) {
    super(props)

    this.state = {
      isLoaded: false,
      items: []
    }
  }

  async componentDidMount() {
    // get json data
    await fetch("./react-labor-health-insurance/JSON/HealthPremium/PrivateStaff.json")
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        this.setState({ items: res });
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))
  }

  componentWillUnmount() {

  }

  render(): React.ReactNode {
    const { items } = this.state

    return (
      <div className="PrivateStaff">
        <Container fluid>
          <h3>
            <span>私立學校教職員</span>
          </h3>
          <span style={{ color: "#CC0000" }}>2022.7.1 起生效</span>

          <Row className="justify-content-md-center">
            <Col xs sm md lg xl xxl={10}>
              <Card className="shadow-lg rounded"
                style={{ marginTop: 50, paddingTop: 10 }}>
                <Card.Body>
                  <Card.Text>
                    <Table bordered striped hover responsive className="Table">
                      <thead>
                        <tr className="TableTitle">
                          <th rowSpan={2}>投保金額等級</th>
                          <th rowSpan={2}>月投保金額</th>
                          <th colSpan={4}>被保險人及眷屬負擔金額<br />(負擔比率35%)</th>
                          <th rowSpan={2}>投保單位負擔金額<br />(負擔比率35%)</th>
                        </tr>
                        <tr className="TableTitle">
                          <th>本人</th>
                          <th>本人+1眷口</th>
                          <th>本人+2眷口</th>
                          <th>本人+3眷口</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.Level}</td>
                            <td>{item.InsuredSalaryLevel}</td>
                            <td>{item.Personal}</td>
                            <td>{item.AddOne}</td>
                            <td>{item.AddTwo}</td>
                            <td>{item.AddThree}</td>
                            <td>{item.Employer}</td>
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
    )
  }
}
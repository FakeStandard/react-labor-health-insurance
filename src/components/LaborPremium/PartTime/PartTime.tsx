import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { IPartTimeInfo } from "../../../interface/LaborPremium/IPartTimeInfo";
import "./PartTime.css"

export interface IPartTimeProps {

}

export interface IPartTimeStates {
  isLoaded: boolean,
  items: IPartTimeInfo[],
}

export default class PartTime extends React.Component<IPartTimeProps, IPartTimeStates>{
  constructor(props: IPartTimeProps) {
    super(props)

    this.state = {
      isLoaded: false,
      items: []
    }
  }

  async componentDidMount() {
    // get json data
    await fetch("./JSON/LaborPremium/PartTime.json")
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
      <div className="PartTime">
        <Container fluid>
          <h3>
            {/* <span>部分工時</span> */}
          </h3>
          <span style={{ color: "#CC0000" }}>2022.1.1 起生效</span>

          <Row className="justify-content-md-center">
            <Col xs sm md lg xl xxl={10}>
              <Card className="shadow-lg rounded"
                style={{ marginTop: 50, paddingTop: 10 }}>
                <Card.Body>
                  <Card.Text>
                    {/* 每四個級距就建立一個表 */}
                    {/* {items.map((item, index) => (
                      (index % 4 === 0 && (
                        <Table bordered striped hover responsive className="Table" >
                          <thead>
                            <tr className="TableTitle">
                              <th rowSpan={2} className="TableCrossed">
                                <p className="TableRight">投保薪資</p>
                                <br />
                                <p className="TableLeft">投保日數</p>
                              </th>
                              <th colSpan={2}>{item.InsuredSalaryLevel}</th>
                              <th colSpan={2}>{items[index + 1].InsuredSalaryLevel}</th>
                              <th colSpan={2}>{items[index + 2].InsuredSalaryLevel}</th>
                              <th colSpan={2}>{items[index + 3].InsuredSalaryLevel}</th>
                            </tr>
                            <tr className="TableTitle">
                              <th>勞工</th>
                              <th>單位</th>
                              <th>勞工</th>
                              <th>單位</th>
                              <th>勞工</th>
                              <th>單位</th>
                              <th>勞工</th>
                              <th>單位</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.InsuredItems.map((data, subIndex) => (
                              <tr>
                                <td>{data.InsuredDays}</td>
                                <td>{data.Personal}</td>
                                <td>{data.Employer}</td>
                                <td>{items[index + 1].InsuredItems[subIndex].Personal}</td>
                                <td>{items[index + 1].InsuredItems[subIndex].Employer}</td>
                                <td>{items[index + 2].InsuredItems[subIndex].Personal}</td>
                                <td>{items[index + 2].InsuredItems[subIndex].Employer}</td>
                                <td>{items[index + 3].InsuredItems[subIndex].Personal}</td>
                                <td>{items[index + 3].InsuredItems[subIndex].Employer}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ))
                    ))} */}
                    施工中...
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
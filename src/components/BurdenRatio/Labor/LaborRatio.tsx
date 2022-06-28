import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { ILaborRatioInfo } from "../../../interface/BurdenRatio/ILaborRatioInfo";
import './LaborRatio.css'

export interface ILaborRatioProps { }
export interface ILaborRatioStates {
  isLoaded: boolean,
  items: ILaborRatioInfo[],
}

class LaborRatio extends React.Component<ILaborRatioProps, ILaborRatioStates>{
  constructor(props: ILaborRatioProps) {
    super(props)
    this.state = {
      isLoaded: false,
      items: []
    }
  }

  async componentDidMount() {
    // get json data
    await fetch("./JSON/BurdenRatio/Labor.json")
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        this.setState({ items: res });
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoaded: true }))
  }

  render(): React.ReactNode {
    const { items } = this.state

    // make table.
    let table: any[] = []
    let row: any[] = []
    let type: string = ""
    let key: string = ""
    let emptyKey: string = ""

    for (let i = 0; i < items.length; i++) {
      key = `${i}.`
      emptyKey = `${items.length + i}.`

      if (type !== items[i].TypeOfInsured) {
        if (row.length !== 0) {
          // push
          if (row.length !== 10) {
            const len = row.length
            for (let j = 0; j < 10 - len; j++) {
              row.push(<td key={emptyKey + j}></td>)
            }
          }

          table.push(<tr key={i}>{row}</tr>)
        }

        // clear
        row = []
        row.push(<td key={key + 0}>{items[i].TypeOfInsured}</td>)
      }

      if (items[i].PremiumCategory === "勞工保險-普通事故保險費") {
        row.push(<td key={key + 1}>{items[i].Personal}</td>)
        row.push(<td key={key + 2}>{items[i].Employer}</td>)
        row.push(<td key={key + 3}>{items[i].Goverment}</td>)
      } else {
        // 沒有普通事故保險費
        if (row.length === 1) {
          for (let j = 0; j < 3; j++) {
            row.push(<td key={emptyKey + j + 1}></td>)
          }
        }

        if (row.length === 4) {
          if (items[i].PremiumCategory === "就業保險費") {
            for (let j = 0; j < 3; j++) {
              row.push(<td key={emptyKey + j + 4}></td>)
            }
          }
        }

        row.push(<td key={key + 1}>{items[i].Personal}</td>)
        row.push(<td key={key + 2}>{items[i].Employer}</td>)
        row.push(<td key={key + 3}>{items[i].Goverment}</td>)
      }

      type = items[i].TypeOfInsured
    }

    table.push(<tr key={items.length + 1}>{row}</tr>)

    return (
      <div className="LaborRatio">
        <Container fluid>
          <h3>
            <span>保險費負擔比例一覽表</span>
          </h3>
          <span style={{ color: "#CC0000" }}>更新於 2021.1.1</span>

          <Row className="justify-content-md-center">
            <Col xs sm md lg xl xxl={10}>
              <Card className="shadow-lg rounded"
                style={{ marginTop: 50, paddingTop: 10 }}>
                <Card.Body>
                  <Card.Text>
                    <Table bordered striped hover responsive className="Table">
                      <thead>
                        <tr className="TableTitle">
                          <th rowSpan={3}>被保險人類別</th>
                          <th colSpan={9}>保險費負擔比例</th>
                        </tr>
                        <tr className="TableTitle">
                          <th colSpan={3}>普通事故保險費</th>
                          <th colSpan={3}>職業災害保險費</th>
                          <th colSpan={3}>就業保險費</th>
                        </tr>
                        <tr className="TableTitle">
                          <th>被保險人</th>
                          <th>投保單位</th>
                          <th>政府</th>
                          <th>被保險人</th>
                          <th>投保單位</th>
                          <th>政府</th>
                          <th>被保險人</th>
                          <th>投保單位</th>
                          <th>政府</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table}
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

export default LaborRatio
import React from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { IOARateTableInfo } from "../../interface/IOARateTableInfo";
import './OccupationalAccidentRateTable.css'

export interface IOccupationalAccidentRateTableProps {

}

export interface IOccupationalAccidentRateTableStates {
  isLoaded: boolean,
  items: IOARateTableInfo[],
}

class OccupationalAccidentRateTable extends React.Component<IOccupationalAccidentRateTableProps, IOccupationalAccidentRateTableStates>{
  constructor(props: IOccupationalAccidentRateTableProps) {
    super(props)
    this.state = {
      isLoaded: false,
      items: []
    }
  }

  async componentDidMount() {
    // get json data
    await fetch("./JSON/OccupationalAccidentRateTable.json")
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

    // array for merge <td>
    let arr: number[] = [2, 1, 18, 1, 2, 5, 2, 7, 1, 3, 1, 1, 2, 2, 1, 1, 1, 1, 3]
    let index: number = -1
    let count: number = 0

    for (let i = 0; i < items.length; i++) {
      row = []
      let k = `${i}.`

      if (arr[index] === count || i === 0) {
        index++
        count = 0
        row.push(<td rowSpan={arr[index]} key={k + 1}>{items[i].MainCategory}</td>)
      }

      row.push(<td key={k + 2}>{items[i].RateNum}</td>)
      row.push(<td key={k + 3}>{items[i].IndustryCategory}</td>)
      row.push(<td key={k + 4}>{items[i].IndustryRate}</td>)
      row.push(<td key={k + 5}>{items[i].CommuteRate}</td>)
      row.push(<td key={k + 6}>{items[i].OccupationalAccidentRate}</td>)

      table.push(<tr key={i}>{row}</tr>)

      count++
    }

    return (
      <div className="OccupationalAccidentRateTable">
        <Container fluid>
          <h3>
            <span>勞工保險職業災害保險適用行業別及費率表</span>
          </h3>
          <span style={{ color: "#CC0000" }}>2021.1.1 起適用</span>

          <Row className="justify-content-md-center">
            <Col xs sm md lg xl xxl={10}>
              <Card className="shadow-lg rounded"
                style={{ marginTop: 50, paddingTop: 10 }}>
                <Card.Body>
                  <Card.Text>
                    <Table bordered striped hover responsive className="Table">
                      <thead>
                        <tr className="TableTitle">
                          <th colSpan={3}>行業分類</th>
                          <th colSpan={3}>保險費率</th>
                        </tr>
                        <tr className="TableTitle">
                          <th>大分類</th>
                          <th>編號</th>
                          <th>行業類別</th>
                          <th>行業別費率%(a)</th>
                          <th>上下班費率%(b)</th>
                          <th>職災費率%(a)+(b)</th>
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

export default OccupationalAccidentRateTable
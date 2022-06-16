import { Link } from "@fluentui/react";
import React from "react";
import { Alert } from "react-bootstrap";
import "./Home.css"

export interface IHomeProps { }
export interface IHomeStates { }

export default class Home extends React.Component<IHomeProps, IHomeStates> {
    constructor(props: IHomeProps) {
        super(props);

        this.state = {
        }
    }

    render(): React.ReactNode {

        return (
            <div className="Home">
                <Alert variant="success">
                    <p>1. 勞工保險投保薪資分級表：自西元2022(民國110)年1月1日起適用新法規</p>
                    <p>2. 勞工退休金月提繳分級表：自西元2022(民國110)年1月1日起適用新法規</p>
                    <p>3. 全民健康保險投保金額分級表：自西元2022(民國110)年7月1日起適用新法規</p>
                </Alert>
                {/* <Link>link</Link> */}
                Index
                <p>
                    <Link href="https://www.bli.gov.tw" target="_blank">勞動部勞工保險局</Link>
                </p>
                <p>
                    <Link href="https://www.nhi.gov.tw" target="_blank">衛生福利部中央健康保險署</Link>
                </p>
            </div>
        )
    }
}
import { Link } from "@fluentui/react";
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import "./Index.css"

export interface IIndexProps { }
export interface IIndexStates { }

export default class Index extends React.Component<IIndexProps, IIndexStates> {
    constructor(props: IIndexProps) {
        super(props);

        this.state = {
        }
    }

    render(): React.ReactNode {

        return (
            <div className="Index">
                <Alert variant="success">
                    <p>1. 勞工保險投保薪資分級表：自西元2022(民國110)年1月1日起適用新法規</p>
                    <p>2. 勞工退休金月提繳分級表：自西元2022(民國110)年1月1日起適用新法規</p>
                    <p>3. 全民健康保險投保金額分級表：自西元2022(民國110)年7月1日起適用新法規</p>
                </Alert>
                {/* <Link>link</Link> */}
                Index
            </div>
        )
    }
}
import { IHealthInfo } from "../../interface/IHealthInfo"

export interface IHealthGradingStates {
    isLoaded: boolean,
    items: IHealthInfo[],
}
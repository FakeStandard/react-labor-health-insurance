import { ILaborInfo } from "../../interface/ILaborInfo";

export interface ILaborGradingStates {
    isLoaded: boolean,
    items: ILaborInfo[],
}
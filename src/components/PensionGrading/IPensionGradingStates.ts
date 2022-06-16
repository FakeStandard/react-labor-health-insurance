import { IPensionInfo } from "../../interface/IPensionInfo";

export interface IPensionGradingStates {
    isLoaded: boolean,
    items: IPensionInfo[],
}
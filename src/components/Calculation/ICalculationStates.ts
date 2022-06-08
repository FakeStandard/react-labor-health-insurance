import { IHealthInfo } from "../../interface/IHealthInfo"
import { ILaborInfo } from "../../interface/ILaborInfo"

export interface ICalculationStates {
    isLoaded: boolean,
    errInputMsg: string,
    laborInfo: ILaborInfo[],
    healthInfo: IHealthInfo[],
    pensionInfo: IHealthInfo[],
    labor: {
        salaryLevel: number,
        personal: number,
        employer: number,
        government: number,
        total: number,
    },

    health: {
        salaryLevel: number,
        personal: number,
        employer: number,
        government: number,
        total: number,
    },

    pension: {
        salaryLevel: number,
        personal: number,
        employer: number,
    },

    statistics: {
        basicSalary: number,
        actualSalary: number,
    }
}
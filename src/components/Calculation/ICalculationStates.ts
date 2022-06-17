import { IHealthInfo } from "../../interface/GradingTable/IHealthInfo";
import { ILaborInfo } from "../../interface/GradingTable/ILaborInfo";

export interface ICalculationStates {
    isLoaded: boolean,
    errInput: boolean,
    pensionCheck: boolean,
    pensionSelect: number,
    pensionLabel: string,
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
        dependents: number,
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
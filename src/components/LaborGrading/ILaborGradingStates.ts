export interface ILaborGradingStates {
    isLoaded: boolean,
    items: [{
        Level: string,
        SalaryRange: string,
        InsuredSalaryLevel: string
    }]
}
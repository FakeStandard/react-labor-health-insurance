export interface IHealthGradingStates {
    isLoaded: boolean
    items: [{
        Distance: string,
        InsuredSalaryLevel: string,
        Level: string,
        SalaryRange: string
    }]
}
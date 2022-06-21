
export interface IInsuredItems {
    InsuredDays: number,
    Personal: number,
    Employer: number
}

export interface IPartTimeInfo {
    InsuredSalaryLevel: number
    InsuredItems: IInsuredItems[]
}
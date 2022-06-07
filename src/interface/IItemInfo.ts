export interface IItemInfo {
    level: string; // 投保等級
    // Distance: string; // 組別級距
    insuredSalaryLevel: string; // 月投保金額

    // 勞保-個人
    personalAccident: string; // 普通事故保險費率
    personalEmployment: string; // 就業保險費率
    personalTotal: string; // 合計

    // 勞保-雇主
    employerAccident: string; // 普通事故保險費率
    employerEmployment: string; // 就業保險費率
    employerTotal: string; // 合計

    // 勞保-政府
    // governmentAccident: string; // 普通事故保險費率
    // governmentEmployment: string; // 就業保險費率
    // governmentTotal: string; // 合計

    // 健保
    personalHealth: string; // 個人
    employerHealth: string; // 雇主
    governmentHealth: string; // 政府

    // 勞工退休金(雇主負擔)
    laborPension: string;

    // 備註
    remark: string;
}
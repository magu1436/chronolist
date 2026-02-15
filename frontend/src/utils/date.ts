

/**
 * 基準となる日付の翌日の `Date` オブジェクトを作成する。  
 * @param date 基準となる日付
 * @returns 翌日の `Date` オブジェクト
 */
export const nextDate = (date: Date): Date => {
    return addDays(date, 1);
}

/**
 * 基準となる日付の前日の `Date` オブジェクトを作成する。  
 * @param date 基準となる日付
 * @returns 前日の `Date` オブジェクト
 */
export const prevDate = (date: Date): Date => {
    return addDays(date, -1);
}

/**
 * 日付を指定した日数分翌日に変更した `Date` オブジェクトを作成する。
 * @param date 基準となる日付
 * @param days 翌日にする日数
 * @returns 日付をずらした `Date` オブジェクト
 */
export const addDays = (date: Date, days: number): Date => {
    const addedDate = new Date(date.valueOf());
    addedDate.setDate(addedDate.getDate() + days);
    return addedDate;
};
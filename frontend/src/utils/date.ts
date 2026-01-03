

/**
 * 日付を翌日に変更した `Date` オブジェクトを作成する。  
 * @param date 基準となる日付
 * @returns 日付のみ翌日にした `Date` オブジェクト
 */
export const createNextDate = (date: Date): Date => {
    const nextDate = new Date(date.valueOf());
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate;
};
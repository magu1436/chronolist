import type { TemplateBlockSource } from "../types/blockSourceTypes";

/**
 * テンプレートブロックを登録するAPI
 * 
 * @param templateBlock 登録するテンプレートブロック
 * @returns テンプレートブロックのID
 */
export const registerTemplateBlock = async (templateBlock: TemplateBlockSource) => {
    // 一時的に仮のIDを返却
    const newId: number = 11;
    return newId;
};
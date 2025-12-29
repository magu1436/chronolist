import type { PullDownProps } from "@/types/utility-prop";
import classNames from "classnames";
import type { FC } from "react";
import { v4 as uuidv4 } from "uuid";

// プルダウン要素固有のクラス名
const PULLDOWN_CLASS_TAG = "chronolist-pulldown";

// プルダウン要素が持つクラス群
const PULLDOWN_CLASS_NAMES = classNames(
    PULLDOWN_CLASS_TAG,
    "form-select",
);

/**
 * Chronolist共通のプルダウン要素を提供するコンポーネント。  
 * 
 * デフォルト値が指定されていない場合、 `items` の最初のアイテムを  
 * デフォルト値として使用する。  
 * 
 * デフォルト値を指定した場合に、その値が `items` に含まれていない場合、  
 * コンソールに警告を出し、最初のアイテムをデフォルト値として使用する。  
 * 
 * @throws プルダウンに含まれるアイテムが0個の場合に発生する。
 */
const PullDown: FC<PullDownProps> = ({ items, onChange, defaultValue, formLabel }) => {

    if (items.length === 0) throw new Error("No items were given to PullDown");

    let defaultSelectedValue = defaultValue || items[0];

    // デフォルト値が指定されている場合に、その値がitemsに含まれているかどうかのチェック
    if (defaultValue && !items.includes(defaultSelectedValue)) {
        console.log(`[chronolist]WARNING: The default value "${defaultSelectedValue}" is not included in items. The first item "${items[0]}" will be used instead.`);
        defaultSelectedValue = items[0];
    }

    return (
        <select
            className={PULLDOWN_CLASS_NAMES}
            onChange={(e) => {onChange(e.target.value)}}
            aria-label={formLabel || uuidv4()}
        >
            {items.map((item) => (
                <option key={item} value={item} selected={item === defaultSelectedValue}>
                    {item}
                </option>
            ))}
        </select>
    )
}

export default PullDown;
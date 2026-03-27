import { Typography, type TypographyVariant } from "@mui/material";
import { useState, type FC } from "react";


type EditableTextProps = {
    value?: string,
    variant?: TypographyVariant | "inherit",
    style?: React.CSSProperties,
    onChange?: (value: string) => void,
};

const EditableText: FC<EditableTextProps> = ({ value, variant, style, onChange }) => {
    const [ isEditing, setIsEditing ] = useState(false);
    const [ text, setText ] = useState<string>(value || "");

    const handleFinishEdit = () => {
        onChange?.(text);
        setIsEditing(false);
    };
    const handleKeyDown = (event: React.KeyboardEvent) => {
        const cancelKeys = ["Escape", "Enter"];
        if (cancelKeys.includes(event.key)) handleFinishEdit();
    };

    const textNode = (
        <Typography
            style={style}
            variant={variant}
            onDoubleClick={() => setIsEditing(true)}
        >{text}</Typography>
    );
    const editNode = (
        <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {handleKeyDown(e);}}
            onBlur={handleFinishEdit}
        />
    );

    return (
        <>
            {isEditing ? editNode : textNode}
        </>
    )
};

export default EditableText;
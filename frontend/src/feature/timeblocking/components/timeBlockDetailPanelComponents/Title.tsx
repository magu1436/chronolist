import { type FC } from "react"
import EditableText from "@/components/EditableText";

type TitleProps = {
    text?: string,
    setText?: (text: string | ((text: string) => string)) => void
}

const Title: FC<TitleProps> = ({ text, setText }) => {

    return (
        <>
            <EditableText value={text} onChange={setText} />
        </>
    )
};

export default Title;
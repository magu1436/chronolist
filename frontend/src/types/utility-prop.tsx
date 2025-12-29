

export interface PullDownProps {
    items: string[];
    onChange: (item: string) => void | null;
    defaultValue?: string;
    formLabel?: string;
}
export interface IControlSettings {
    Events?: Array<{ name: string, listeners: Array<(...args: any[]) => void> }>,
    ParentNode?: HTMLElement | string,
    Enabled?: boolean;
    IsVisible?: boolean;
}
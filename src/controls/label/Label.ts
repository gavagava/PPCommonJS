import Control from '../base/control';
import { IControlSettings } from '../base/control';
import * as _ from 'lodash';

export interface ILabelSettings extends IControlSettings {
    Content?: string;
}

export default class Label extends Control {
    constructor (s: ILabelSettings) {
        super(s);

        if (_.isString(s.Content))
            this.Content = s.Content;
    }

    protected _render () {
        this.addClass('PPLabel');
    }

    get Content (): string {
        return this._domNode.innerHTML;
    }

    set Content (value: string) {
        this._domNode.innerHTML = value;
    } 
}
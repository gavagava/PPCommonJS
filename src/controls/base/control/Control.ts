import { IControlSettings } from './IControlSettings';
import { EventEmitter } from 'events';
import * as _ from 'lodash';

abstract class Control extends EventEmitter {
    protected _domNode: Element = document.createElement('div');
    
    get DomNode(): Element {
        return this._domNode;
    }

    get ParentNode(): Node | null {
        return this._domNode.parentNode;
    }

    set ParentNode(p: Node | null) {
        if (!_.isNull(p))
        {
            p.appendChild(this._domNode);
        } else {
            let currentParent = this._domNode.parentNode;

            if (currentParent)
                currentParent.removeChild(this._domNode);
        }        
    }
    
    /**
     * Устанавливает родительскою ноду контрола по переданному идентификатору
     * @param value Идентификатор элемента
     */
    addToNode(value: string|Element, beforeNode?: Element) {
        let newParent: Element|null = null;
        
        if (_.isString(value))
            newParent = document.getElementById(value);
        else
            newParent = value;

        if (!newParent)
            return;

        if (beforeNode && beforeNode.parentNode == newParent)
            newParent.insertBefore(this._domNode, beforeNode);
        else
            this.ParentNode = newParent;
    }

    private _enabled: boolean = true;

    get Enabled(): boolean {
        return this._enabled;
    }

    set Enabled(value: boolean) {
        this._enabled = value;
    }

    private _isVisible: boolean = true;

    get IsVisible(): boolean {
        return this._isVisible;
    }

    set IsVisible(value: boolean) {
        this._isVisible = value;
    }

    get Class(): string {
        return this._domNode.className;
    }

    set Class(value: string) {
        this._domNode.className = value;
    }

    
    /**
     * Добавляет CSS-класс контролу
     * 
     * @param {string} className Имя добавляемого класса 
     * @returns {Control}
     * 
     * @memberOf Control
     */
    addClass(className: string): Control {
        let current = _.words(this._domNode.className, /[^ ]+/g);
        let classes = _.words(className, /[^ ]+/g);

        current = current.concat(classes);
        this._domNode.className = _.uniq(current).join(' ');
        
        return this;
    }

    private _domListeners: { [eventName: string]: EventListener } = {};
    
    protected _bindDomEvents () {
        ['click', 'mousedown', 'mouseup', 'mouseover', 'mouseleave'].forEach(
            (eventName) => {
                let listener = this.emit.bind(this, _.capitalize(eventName));
                this._domNode.addEventListener(eventName, listener);
                this._domListeners[eventName] = listener;
                }
            );
    }

    protected _unbindDomEvents () {
        for (let eventName in this._domListeners)
        {
            this._domNode.removeEventListener(eventName, this._domListeners[eventName]);
        }
    }

    protected abstract _render (): void;

    render () {
        this._render();
        this._bindDomEvents();
        this.emit('Rendered');
    }

    
    /**
     * Creates an instance of Control.
     * 
     * @param {IControlSettings} Настройки контрола
     * 
     * @memberOf Control
     */
    constructor(s: IControlSettings) {
        super();

        if (s.Events) {
            s.Events.forEach((event) => {
                event.listeners.forEach(listener => {
                    this.on(event.name, listener);
                });
            });
        }

        if (_.isString(s.ParentNode))
            this.addToNode(s.ParentNode);
        else if (!_.isUndefined(s.ParentNode))
            this.ParentNode = s.ParentNode;
        
        if (!_.isUndefined(s.Enabled))
            this.Enabled = s.Enabled;
        
        if (!_.isUndefined(s.IsVisible))
            this.IsVisible = s.IsVisible;

        this.render();
    };
};

export default Control;
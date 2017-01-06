/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {TreeSelection} from "./tree-selection";

export abstract class AbstractTreeSelection {
    constructor(public parent: AbstractTreeSelection) {
        //if (this.parent) {
            //this.parent.overrideChildren.subscribe((selected: boolean) => this.parentChanged(selected));
        //}
    }

    public model: any;

    abstract get children(): AbstractTreeSelection[];

    private _selected: boolean = false;
    private _indeterminate: boolean = false;

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(value: boolean) {
        this._selected = value;
        this._indeterminate = false;
        this.children.forEach(child => child.parentChanged(value));
        if(this.parent) {
            this.parent.childChanged();
        }
    }

    public get indeterminate(): boolean {
        return this._indeterminate;
    }

    childChanged(): void {
        let oneSelectedChild = false;
        this._selected = true;
        this._indeterminate = false;

        for (let child of this.children) {
            if (child.indeterminate) {
                this._selected = false;
                this._indeterminate = true;
                break;
            }
            if (child.selected) {
                oneSelectedChild = true;
                if (this._selected === false) {
                    this._indeterminate = true;
                    break;
                }
            } else {
                this._selected = false;
                if (oneSelectedChild) {
                    this._indeterminate = true;
                    break;
                }
            }
        }
        // FIXME: Only update the parent if this node really changed
        // But when doing that, we need to make sure the root node is still warned that the overall selection
        // has changed.
        //this._updateParent.next(this._selected);
        if (this.parent) {
            this.parent.childChanged();
        }
    }

    parentChanged(selected: boolean) {
        if (selected && !this.selected) {
            this._selected = true;
            this._indeterminate = false;
            //this._overrideChildren.next(true);
            this.children.forEach(child => child.parentChanged(true));
        }
        if (!selected && (this.selected || this.indeterminate)) {
            this._selected = false;
            this._indeterminate = false;
            //this._overrideChildren.next(false);
            this.children.forEach(child => child.parentChanged(false));
        }
    }

    toTreeSelection(): TreeSelection {
        return {
            model: this.model,
            selected: this.selected,
            children: this.children.filter(child => child.selected || child.indeterminate)
                .map(child => child.toTreeSelection())
        };
    }
}
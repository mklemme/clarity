/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
    Injectable,
    Optional,
    SkipSelf
} from "@angular/core";

@Injectable()
export class TreeSelection {
    public model: any;
    public children: TreeSelection[] = [];

    private _selected: boolean = false;
    private _indeterminate: boolean = false;

    public get selected(): boolean {
        return this._selected;
    }

    public get indeterminate(): boolean {
        return this._indeterminate;
    }

    constructor( @SkipSelf() @Optional() private parent: TreeSelection) {
    }

    updateSelectedState(selected: boolean,
                        updateChildren: boolean = true,
                        updateParent: boolean = true,
                        indeterminate: boolean = false): void {
        this._selected = selected;
        this._indeterminate = indeterminate;

        if (updateChildren) {
            this.updateChildrenSelectedState(selected);
        }

        if (updateParent) {
           this.updateParentSelectedState();
        }
    }

    private updateChildrenSelectedState(selected: boolean): void {
        this.children.forEach(function(child) {
            child.updateSelectedState(selected, true, false, false);
        });
    }

    private updateParentSelectedState(): void {
        if (!this.parent) {
            return;
        }

        let siblings: TreeSelection[] = this.parent.children;
        let state: boolean = siblings[0].selected;
        let indeterminate: boolean = siblings[0].indeterminate;

        if (indeterminate) {
            this.parent.updateSelectedState(false, false, true, true);
            return;
        }

        for (let i = 1; i < siblings.length; i++) {
            if (siblings[i].indeterminate) {
                this.parent.updateSelectedState(false, false, true, true);
                return;
            } else if (siblings[i].selected !== state) {
                this.parent.updateSelectedState(false, false, true, true);
                return;
            }
        }
        this.parent.updateSelectedState(state, false, true, false);
    }
}

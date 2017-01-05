/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    Optional,
    SkipSelf,
    trigger
} from "@angular/core";

import {collapse} from "../animations/collapse/index";
import {AbstractTreeSelection} from "./abstract-tree-selection";
import {TreeSelection} from "./tree-selection";
import {TreeView} from "./tree-view";

@Component({
    selector: "clr-tree-node",
    templateUrl: "./tree-node.html",
    animations: [trigger("collapse", collapse())]
})
export class TreeNode extends AbstractTreeSelection {

    constructor(@Optional() @SkipSelf() parent: TreeNode,
                @Optional() private _tree: TreeView) {
        super(parent);
    }

    @Input("clrTreeModel") model: any;

    @ContentChildren(TreeNode) _children: QueryList<TreeNode>;

    /**
     * Generates the child TreeNodes array from the ContentChildren QueryList
     * @returns {TreeNode[]|Array}
     */
    get children(): AbstractTreeSelection[] {
        return this._children ? this._children.toArray() : [];
    }

    @Input("clrTreeSelected") selection: TreeSelection;
    @Output("clrTreeSelectedChange") selectionChange = new EventEmitter<TreeSelection>(false);

    /**
     * Returns true if a TreeNode contains child TreeNodes and false otherwise.
     * @returns {boolean}
     */
    public get hasChildren(): boolean {
        //Comparing with 1 because @ContentChildren registers itself if the child and parent type is the same
        if (this.children && this.children.length > 1) {
            return true;
        }
        return false;
    }

    @Input("clrTreeNodeExpanded") expanded = false;
    @Output("clrTreeNodeExpandedChange") expandedChange: EventEmitter<boolean>
        = new EventEmitter<boolean>(false);

    /**
     * Determines the caret direction based on the expanded/collapsed
     * state of the TreeNode.
     *
     * Returns "down" when collapsed and "right" when expanded
     * @returns {string|string}
     */
    public get caretDirection(): string {
        return (this.expanded) ? "down" : "right";
    }

    @Input("clrTreeNodeExpandable") isExpandable = false;
    @Input("clrTreeNodeLoading") loading = false;

    /**
     * Clicking on the caret sign calls this method.
     * Toggles the expanded/collpased state of the TreeNode
     */
    toggleExpand(): void {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }

    get selectable(): boolean {
        if (this._tree && this._tree.isSelectable) {
            return true;
        }
        return false;
    }

    onSelectedChange(): void {
        this.selected = !this.selected;
        this.children.forEach(child => child.parentChanged(this.selected));
        if (this.parent) {
            this.parent.childChanged();
        }
    }
}

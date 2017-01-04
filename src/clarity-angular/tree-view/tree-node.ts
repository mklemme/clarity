/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
    AfterContentInit,
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

import {TreeView} from "./tree-view";

import {TreeSelection} from "./providers/selection.service";

import {collapse} from "../animations/collapse/index";

@Component({
    selector: "clr-tree-node",
    templateUrl: "./tree-node.html",
    animations: [trigger("collapse", collapse())],
    providers: [TreeSelection]
})
export class TreeNode implements AfterContentInit {
    @ContentChildren(TreeNode) childNodes: QueryList<TreeNode>;

    @Input("clrTreeModel") treeModel: any;

    @Input("clrTreeNodeExpanded") expanded = false;
    @Output("clrTreeNodeExpandedChange") expandedChange: EventEmitter<boolean>
        = new EventEmitter<boolean>(false);

    @Input("clrTreeNodeExpandable") isExpandable = false;
    @Input("clrTreeNodeLoading") loading = false;

    private _selected: boolean = false;
    private _selectionIndeterminate: boolean = false;

    public get selected(): boolean {
        return this._selected;
    }

    @Input("clrTreeNodeSelected")
    public set selected(value: boolean) {
        this._selected = value;
        this._selectionIndeterminate = false;
    }

    @Output("clrTreeNodeSelectedChange") selectedChange: EventEmitter<boolean>
        = new EventEmitter<boolean>(false);

    private _isSelectable: boolean = false;

    constructor( @Optional() private tree: TreeView,
                 @SkipSelf() @Optional() private parent: TreeNode,
                 private selection: TreeSelection) {
    }

    hasChildren: boolean = false;
    caretDirection: string = this.expanded ? "down" : "right";

    toggleCollapse(): void {
        this.expanded = !this.expanded;
        this.toggleDirection();
        this.expandedChange.emit(this.expanded);
    }

    toggleDirection(): void {
        this.caretDirection = this.expanded ? "down" : "right";
    }

    ngAfterContentInit() {
        if (this.tree && this.tree.isSelectable) {
            this._isSelectable = true;
        }
        this.hasChildren = this.treeNodeHasChildren();
        this.selection.model = this.treeModel;
        if (this._isSelectable) {
            this.populateTreeSelectionProvider();
        }
    }

    treeNodeHasChildren(): boolean {
        //Since @ContentChildren registers itself as a child too,
        //we check for length > 1 instead of 0
        if (this.childNodes.length > 1) {
            return true;
        }
        return false;
    }

    onSelectedChange(): void {
        this.selected = !this.selected;
        this.selectedChange.emit(this.selected);
        this.selection.updateSelectedState(this.selected);
    }

    populateTreeSelectionProvider(): void {
        this.selection.model = this.treeModel;
        if (this.hasChildren) {
            this.childNodes.forEach(function(child: TreeNode) {
                if (child !== this) {
                    this.selection.children.push(child.selection);
                }
            }.bind(this));
        }
    }
}

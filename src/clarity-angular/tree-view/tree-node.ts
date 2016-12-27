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
    trigger
} from "@angular/core";

import {TreeView} from "./tree-view";

import {collapse} from "../animations/collapse/index";

@Component({
    selector: "clr-tree-node",
    templateUrl: "./tree-node.html",
    animations: [trigger("collapse", collapse())]
})
export class TreeNode implements AfterContentInit {
    private parent: TreeNode;

    @ContentChildren(TreeNode) childNodes: QueryList<TreeNode>;

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

    constructor( @Optional() private tree: TreeView) {
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
        this.addParentReference(this);
    }

    treeNodeHasChildren(): boolean {
        //Since @ContentChildren registers itself as a child too,
        //we check for length > 1 instead of 0
        if (this.childNodes.length > 1) {
            return true;
        }
        return false;
    }

    addParentReference(parent: TreeNode): void {
        if (this.hasChildren) {
            this.childNodes.forEach(function(childNode) {
                if (childNode !== parent) {
                    childNode.parent = parent;
                }
            });
        }
    }

    onSelectedChange(): void {
        this.selected = !this.selected;
        this.refreshChildrenSelection(this, this.selected);
        this.selectedChange.emit(this.selected);
        this.refreshParentSelection(this.parent);
    }

    refreshChildrenSelection(treeNode: TreeNode, selected: boolean): void {
        if (!treeNode.hasChildren) {
            return;
        } else {
            treeNode.childNodes.forEach(function(childNode) {
                //Checking whether the child node is not the
                //parent because of the way ContentChildren works
                if (childNode !== treeNode) {
                    childNode.selected = selected;
                    treeNode.refreshChildrenSelection(childNode, selected);
                }
            });
        }
    }

    refreshParentSelection(parentNode: TreeNode): void {
        if (!this.parent) {
            return;
        }
        let childrenSelected = this.noOfChildrenSelected(parentNode);
        if (childrenSelected === (parentNode.childNodes.length - 1)) {
            parentNode.selected = true;
        } else if (childrenSelected === 0) {
            parentNode.selected = false;
        } else {
            parentNode.selected = false;
            parentNode._selectionIndeterminate = true;
        }
        parentNode.refreshParentSelection(parentNode.parent);
    }

    noOfChildrenSelected(node: TreeNode): number {
        let childNodes: TreeNode[] = node.childNodes.toArray();
        let count: number = 0;
        for (let i = 0; i < childNodes.length; i++) {
            if ((childNodes[i] !== node) && (childNodes[i].selected)) {
                count++;
            }
        }
        return count;
    }

    checkIfAllChildrenSelected(node: TreeNode): boolean {
        let childNodes: TreeNode[] = node.childNodes.toArray();
        for (let i = 0; i < childNodes.length; i++) {
            if ((childNodes[i] !== node) && (!childNodes[i].selected)) {
                return false;
            }
        }
        return true;
    }
}

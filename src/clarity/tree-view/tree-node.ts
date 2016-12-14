/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
    AfterContentInit,
    Component,
    ContentChildren,
    Input,
    QueryList,
    trigger
} from "@angular/core";

import {collapse} from "../animations/collapse/index";

@Component({
    selector: "clr-tree-node",
    templateUrl: "./tree-node.html",
    styleUrls: ["./tree-node.css"],
    animations: [trigger("collapse", collapse())]
})
export class TreeNode implements AfterContentInit {

    @ContentChildren(TreeNode) childNodes: QueryList<TreeNode>;

    @Input("clrTreeNodeExpanded") expanded = false;
    @Input("clrTreeNodeExpandable") isExpandable = false;

    hasChildren: boolean = false;
    caretDirection: string = this.expanded ? "down" : "right";

    toggleCollapse(): void {
        this.expanded = !this.expanded;
        this.toggleDirection();
    }

    toggleDirection(): void {
        this.caretDirection = this.expanded ? "down" : "right";
    }

    ngAfterContentInit() {
        this.hasChildren = this.treeNodeHasChildren();
    }

    treeNodeHasChildren(): boolean {
        //Since @ContentChildren registers itself as a child too
        //we check for length > 1 instead of 0
        if (this.childNodes.length > 1) {
            return true;
        }
        return false;
    }

}

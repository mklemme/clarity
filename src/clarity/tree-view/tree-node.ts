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

    @Input("clrTestTreeInput") testInput: string;

    collapsed: boolean = true;
    caretDirection: string = this.collapsed ? "right" : "down";

    toggleCollapse(): void {
        this.collapsed = !this.collapsed;
        this.toggleDirection();
    }

    toggleDirection(): void {
        this.caretDirection = this.collapsed ? "right" : "down";
    }

    ngAfterContentInit() {
        console.log(this.childNodes);
    }
}

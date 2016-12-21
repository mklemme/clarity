/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClarityModule} from "../../clarity.module";
import {ROUTING} from "./tree-view.demo.routing";

import {TreeViewDemo} from "./tree-view.demo";
import {TreeViewBasicStructureDemo} from "./basic-structure/tree-view-basic";
import {TreeNodeExpandableDemo} from "./tree-node-expandable/tree-node-expandable";
import {TreeViewDynamicDemo} from "./tree-view-dynamic/tree-view-dynamic";
import {TreeNodeLazyLoadingDemo} from "./lazy-loading/lazy-loading";
import {TreeNodeLabelChangeOnExpandDemo} from "./label-change-on-expand/label-change-on-expand";

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        ROUTING
    ],
    declarations: [
        TreeViewDemo,
        TreeViewBasicStructureDemo,
        TreeNodeExpandableDemo,
        TreeViewDynamicDemo,
        TreeNodeLazyLoadingDemo,
        TreeNodeLabelChangeOnExpandDemo
    ],
    exports: [
        TreeViewDemo,
        TreeViewBasicStructureDemo,
        TreeNodeExpandableDemo,
        TreeViewDynamicDemo,
        TreeNodeLazyLoadingDemo,
        TreeNodeLabelChangeOnExpandDemo
    ]
})
export default class TooltipsDemoModule {
}

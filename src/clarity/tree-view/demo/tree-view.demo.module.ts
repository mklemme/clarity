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

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        ROUTING
    ],
    declarations: [
        TreeViewDemo,
        TreeViewBasicStructureDemo
    ],
    exports: [
        TreeViewDemo,
        TreeViewBasicStructureDemo
    ]
})
export default class TooltipsDemoModule {
}

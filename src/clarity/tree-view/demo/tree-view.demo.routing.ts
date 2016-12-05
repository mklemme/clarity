/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {TreeViewDemo} from "./tree-view.demo";
import {TreeViewBasicStructureDemo} from "./basic-structure/tree-view-basic";

const ROUTES: Routes = [
    {
        path: "",
        component: TreeViewDemo,
        children: [
            { path: "", redirectTo: "sizes", pathMatch: "full" },
            { path: "basic-structure", component: TreeViewBasicStructureDemo }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
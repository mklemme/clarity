/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
    AfterContentInit,
    Component,
    Input
} from "@angular/core";

@Component({
    selector: "clr-tree",
    templateUrl: "./tree-view.html"
})
export class TreeView implements AfterContentInit {

    @Input("clrTreeSelectable") isSelectable: boolean = false;

    ngAfterContentInit() {
    }

}

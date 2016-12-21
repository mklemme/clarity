/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";

import {File} from "../model/file";

@Component({
    selector: "clr-tree-node-lazy-loading-demo",
    // Note the .css extension here, not .scss. That's the best we can have at the moment.
    styleUrls: ["../tree-view.demo.css"],
    templateUrl: "./lazy-loading.html"
})
export class TreeNodeLazyLoadingDemo {
    dirName: string = "Home";
    files: File[] = [];
    loading: boolean = false;

    fetchFiles() {
        if (this.files.length > 0) {
            return;
        }
        this.loading = true;
        setTimeout(() => {
            let homeFile1: File = new File("home1.txt", "23KB");
            let homeFile2: File = new File("home2.txt", "25KB");
            let homeFile3: File = new File("home3.txt", "27KB");
            this.files = [homeFile1, homeFile2, homeFile3];
            this.loading = false;
        }, 2000);
    }
}

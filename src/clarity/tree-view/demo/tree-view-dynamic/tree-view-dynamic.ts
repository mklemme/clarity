/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component, OnInit} from "@angular/core";

import {Directory} from "../model/directory";
import {File} from "../model/file";

@Component({
    selector: "clr-tree-view-dynamic-demo",
    // Note the .css extension here, not .scss. That's the best we can have at the moment.
    styleUrls: ["../tree-view.demo.css"],
    templateUrl: "./tree-view-dynamic.html"
})
export class TreeViewDynamicDemo implements OnInit {
    myHome: Directory[] = [];

    ngOnInit() {
        let homeFile1: File = new File("home1.txt", "23KB");
        let homeFile2: File = new File("home2.txt", "25KB");
        let homeFile3: File = new File("home3.txt", "27KB");
        let homeFiles: File[] = [];
        homeFiles.push(homeFile1);
        homeFiles.push(homeFile2);
        homeFiles.push(homeFile3);

        let documentFile1: File = new File("document1.txt", "23KB");
        let documentFile2: File = new File("document2.txt", "25KB");
        let documentFile3: File = new File("document3.txt", "27KB");
        let documentFiles: File[] = [];
        documentFiles.push(documentFile1);
        documentFiles.push(documentFile2);
        documentFiles.push(documentFile3);

        let documentDir: Directory = new Directory("Document", documentFiles, []);

        let profileFile1: File = new File("profile1.txt", "23KB");
        let profileFile2: File = new File("profile2.txt", "25KB");
        let profileFile3: File = new File("profile3.txt", "27KB");
        let profileFiles: File[] = [];
        profileFiles.push(profileFile1);
        profileFiles.push(profileFile2);
        profileFiles.push(profileFile3);

        let homeDir: Directory = new Directory("Home", homeFiles, [documentDir]);
        let profileDir: Directory = new Directory("Profile", profileFiles, []);

        this.myHome.push(homeDir);
        this.myHome.push(profileDir);
    }
}

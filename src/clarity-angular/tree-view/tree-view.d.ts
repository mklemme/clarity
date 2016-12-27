import { AfterContentInit, QueryList } from "@angular/core";
import { TreeNode } from "./tree-node";
export declare class TreeView implements AfterContentInit {
    childNodes: QueryList<TreeNode>;
    ngAfterContentInit(): void;
}

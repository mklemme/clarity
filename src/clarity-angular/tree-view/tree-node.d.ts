import { AfterContentInit, EventEmitter, QueryList } from "@angular/core";
export declare class TreeNode implements AfterContentInit {
    childNodes: QueryList<TreeNode>;
    expanded: boolean;
    expandedChange: EventEmitter<boolean>;
    isExpandable: boolean;
    loading: boolean;
    hasChildren: boolean;
    caretDirection: string;
    toggleCollapse(): void;
    toggleDirection(): void;
    ngAfterContentInit(): void;
    treeNodeHasChildren(): boolean;
}

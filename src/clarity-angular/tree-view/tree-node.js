/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var tree_view_1 = require("./tree-view");
var index_1 = require("../animations/collapse/index");
var TreeNode = TreeNode_1 = (function () {
    function TreeNode(tree) {
        this.tree = tree;
        this.expanded = false;
        this.expandedChange = new core_1.EventEmitter(false);
        this.isExpandable = false;
        this.loading = false;
        this.selected = false;
        this._isSelectable = false;
        this.hasChildren = false;
        this.caretDirection = this.expanded ? "down" : "right";
    }
    TreeNode.prototype.toggleCollapse = function () {
        this.expanded = !this.expanded;
        this.toggleDirection();
        this.expandedChange.emit(this.expanded);
    };
    TreeNode.prototype.toggleDirection = function () {
        this.caretDirection = this.expanded ? "down" : "right";
    };
    TreeNode.prototype.ngAfterContentInit = function () {
        if (this.tree && this.tree.isSelectable) {
            this._isSelectable = true;
        }
        this.hasChildren = this.treeNodeHasChildren();
    };
    TreeNode.prototype.treeNodeHasChildren = function () {
        //Since @ContentChildren registers itself as a child too,
        //we check for length > 1 instead of 0
        if (this.childNodes.length > 1) {
            return true;
        }
        return false;
    };
    TreeNode.prototype.onSelectedChange = function () {
        this.selected = !this.selected;
        this.refreshChildrenSelection(this, this.selected);
        this.refreshParentSelection();
    };
    TreeNode.prototype.refreshChildrenSelection = function (treeNode, selected) {
        console.log("children selection refreshed");
        if (!treeNode.hasChildren) {
            return;
        }
        else {
            treeNode.childNodes.forEach(function (childNode) {
                //Checking whether the child node is not the
                //parent because of the way ContentChildren works
                if (childNode !== treeNode) {
                    childNode.selected = selected;
                    treeNode.refreshChildrenSelection(childNode, selected);
                }
            });
        }
    };
    TreeNode.prototype.refreshParentSelection = function () {
        console.log("parent selection refreshed");
    };
    return TreeNode;
}());
__decorate([
    core_1.ContentChildren(TreeNode_1),
    __metadata("design:type", core_1.QueryList)
], TreeNode.prototype, "childNodes", void 0);
__decorate([
    core_1.Input("clrTreeNodeExpanded"),
    __metadata("design:type", Object)
], TreeNode.prototype, "expanded", void 0);
__decorate([
    core_1.Output("clrTreeNodeExpandedChange"),
    __metadata("design:type", core_1.EventEmitter)
], TreeNode.prototype, "expandedChange", void 0);
__decorate([
    core_1.Input("clrTreeNodeExpandable"),
    __metadata("design:type", Object)
], TreeNode.prototype, "isExpandable", void 0);
__decorate([
    core_1.Input("clrTreeNodeLoading"),
    __metadata("design:type", Object)
], TreeNode.prototype, "loading", void 0);
__decorate([
    core_1.Input("clrTreeNodeSelected"),
    __metadata("design:type", Boolean)
], TreeNode.prototype, "selected", void 0);
TreeNode = TreeNode_1 = __decorate([
    core_1.Component({
        selector: "clr-tree-node",
        templateUrl: "./tree-node.html",
        animations: [core_1.trigger("collapse", index_1.collapse())]
    }),
    __param(0, core_1.Optional()),
    __metadata("design:paramtypes", [tree_view_1.TreeView])
], TreeNode);
exports.TreeNode = TreeNode;
var TreeNode_1;
//# sourceMappingURL=tree-node.js.map
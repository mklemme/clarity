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
var core_1 = require("@angular/core");
var index_1 = require("../animations/collapse/index");
var TreeNode = TreeNode_1 = (function () {
    function TreeNode() {
        this.expanded = false;
        this.expandedChange = new core_1.EventEmitter(false);
        this.isExpandable = false;
        this.loading = false;
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
TreeNode = TreeNode_1 = __decorate([
    core_1.Component({
        selector: "clr-tree-node",
        templateUrl: "./tree-node.html",
        animations: [core_1.trigger("collapse", index_1.collapse())]
    }),
    __metadata("design:paramtypes", [])
], TreeNode);
exports.TreeNode = TreeNode;
var TreeNode_1;
//# sourceMappingURL=tree-node.js.map
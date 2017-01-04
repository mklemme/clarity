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
var selection_service_1 = require("./providers/selection.service");
var index_1 = require("../animations/collapse/index");
var TreeNode = TreeNode_1 = (function () {
    function TreeNode(tree, parent, selection) {
        this.tree = tree;
        this.parent = parent;
        this.selection = selection;
        this.expanded = false;
        this.expandedChange = new core_1.EventEmitter(false);
        this.isExpandable = false;
        this.loading = false;
        this._selected = false;
        this._selectionIndeterminate = false;
        this.selectedChange = new core_1.EventEmitter(false);
        this._isSelectable = false;
        this.hasChildren = false;
        this.caretDirection = this.expanded ? "down" : "right";
    }
    Object.defineProperty(TreeNode.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this._selectionIndeterminate = false;
        },
        enumerable: true,
        configurable: true
    });
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
        this.selection.model = this.treeModel;
        if (this._isSelectable) {
            this.populateTreeSelectionProvider();
        }
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
        this.selectedChange.emit(this.selected);
        this.selection.updateSelectedState(this.selected);
    };
    TreeNode.prototype.populateTreeSelectionProvider = function () {
        this.selection.model = this.treeModel;
        if (this.hasChildren) {
            this.childNodes.forEach(function (child) {
                if (child !== this) {
                    this.selection.children.push(child.selection);
                }
            }.bind(this));
        }
    };
    return TreeNode;
}());
__decorate([
    core_1.ContentChildren(TreeNode_1),
    __metadata("design:type", core_1.QueryList)
], TreeNode.prototype, "childNodes", void 0);
__decorate([
    core_1.Input("clrTreeModel"),
    __metadata("design:type", Object)
], TreeNode.prototype, "treeModel", void 0);
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
    core_1.Output("clrTreeNodeSelectedChange"),
    __metadata("design:type", core_1.EventEmitter)
], TreeNode.prototype, "selectedChange", void 0);
TreeNode = TreeNode_1 = __decorate([
    core_1.Component({
        selector: "clr-tree-node",
        templateUrl: "./tree-node.html",
        animations: [core_1.trigger("collapse", index_1.collapse())],
        providers: [selection_service_1.TreeSelection]
    }),
    __param(0, core_1.Optional()),
    __param(1, core_1.SkipSelf()), __param(1, core_1.Optional()),
    __metadata("design:paramtypes", [tree_view_1.TreeView,
        TreeNode,
        selection_service_1.TreeSelection])
], TreeNode);
exports.TreeNode = TreeNode;
var TreeNode_1;
//# sourceMappingURL=tree-node.js.map
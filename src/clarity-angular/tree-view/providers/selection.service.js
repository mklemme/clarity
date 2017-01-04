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
/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
var core_1 = require("@angular/core");
var TreeSelection = (function () {
    function TreeSelection(parent) {
        this.parent = parent;
        this.children = [];
        this._selected = false;
        this._indeterminate = false;
    }
    Object.defineProperty(TreeSelection.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelection.prototype, "indeterminate", {
        get: function () {
            return this._indeterminate;
        },
        enumerable: true,
        configurable: true
    });
    TreeSelection.prototype.updateSelectedState = function (selected, updateChildren, updateParent, indeterminate) {
        if (updateChildren === void 0) { updateChildren = true; }
        if (updateParent === void 0) { updateParent = true; }
        if (indeterminate === void 0) { indeterminate = false; }
        this._selected = selected;
        this._indeterminate = indeterminate;
        if (updateChildren) {
            this.updateChildrenSelectedState(selected);
        }
        if (updateParent) {
            this.updateParentSelectedState();
        }
    };
    TreeSelection.prototype.updateChildrenSelectedState = function (selected) {
        this.children.forEach(function (child) {
            child.updateSelectedState(selected, true, false, false);
        });
    };
    TreeSelection.prototype.updateParentSelectedState = function () {
        if (!this.parent) {
            return;
        }
        var siblings = this.parent.children;
        var state = siblings[0].selected;
        var indeterminate = siblings[0].indeterminate;
        if (indeterminate) {
            this.parent.updateSelectedState(false, false, true, true);
            return;
        }
        for (var i = 1; i < siblings.length; i++) {
            if (siblings[i].indeterminate) {
                this.parent.updateSelectedState(false, false, true, true);
                return;
            }
            else if (siblings[i].selected !== state) {
                this.parent.updateSelectedState(false, false, true, true);
                return;
            }
        }
        this.parent.updateSelectedState(state, false, true, false);
    };
    return TreeSelection;
}());
TreeSelection = __decorate([
    core_1.Injectable(),
    __param(0, core_1.SkipSelf()), __param(0, core_1.Optional()),
    __metadata("design:paramtypes", [TreeSelection])
], TreeSelection);
exports.TreeSelection = TreeSelection;
//# sourceMappingURL=selection.service.js.map
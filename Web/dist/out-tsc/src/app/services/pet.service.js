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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var Cats = (function () {
    function Cats() {
    }
    return Cats;
}());
exports.Cats = Cats;
var PetService = (function () {
    function PetService(http) {
        this.http = http;
        this.petEndpoint = 'api/petowner/catsbyownergender';
    }
    PetService.prototype.getCatsByOwnerGender = function () {
        return this.http.get(this.petEndpoint)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return rxjs_1.Observable.throw(error.json().error || 'Server error'); });
    };
    return PetService;
}());
PetService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PetService);
exports.PetService = PetService;
//# sourceMappingURL=pet.service.js.map
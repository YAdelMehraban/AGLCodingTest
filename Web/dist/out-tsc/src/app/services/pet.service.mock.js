"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
exports.cats = [];
var PetServiceMock = (function () {
    function PetServiceMock() {
    }
    PetServiceMock.prototype.getCatsByOwnerGender = function () {
        return rxjs_1.Observable.of(exports.cats);
    };
    return PetServiceMock;
}());
exports.PetServiceMock = PetServiceMock;
//# sourceMappingURL=pet.service.mock.js.map
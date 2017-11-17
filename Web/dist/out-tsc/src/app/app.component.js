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
var pet_service_1 = require("./services/pet.service");
var ng2_toasty_1 = require("ng2-toasty");
var AppComponent = (function () {
    function AppComponent(petService, toastyService) {
        this.petService = petService;
        this.toastyService = toastyService;
        this.loading = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.petService.getCatsByOwnerGender()
            .subscribe(function (x) {
            _this.cats = x;
            console.log(x);
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
            var toastOptions = {
                title: 'Error',
                msg: 'Sorry cannot find any cats at the moment.',
                showClose: true,
                timeout: 5000,
                theme: 'material'
            };
            _this.toastyService.error(toastOptions);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    }),
    __metadata("design:paramtypes", [pet_service_1.PetService, ng2_toasty_1.ToastyService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var ng2_toasty_1 = require("ng2-toasty");
var app_component_1 = require("./app.component");
var pet_service_1 = require("./services/pet.service");
var pet_service_mock_1 = require("./services/pet.service.mock");
var rxjs_1 = require("rxjs");
var petServiceMock = new pet_service_mock_1.PetServiceMock();
describe('AppComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                ng2_toasty_1.ToastyModule
            ],
            declarations: [
                app_component_1.AppComponent
            ],
            providers: [
                { provide: pet_service_1.PetService, useValue: petServiceMock }
            ]
        }).compileComponents();
    }));
    it('should create the app', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('should call service getcatsbyownergender action on load', testing_1.async(testing_1.inject([pet_service_1.PetService], function (petService) {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        var app = fixture.debugElement.componentInstance;
        spyOn(petService, 'getCatsByOwnerGender').and.returnValue(rxjs_1.Observable.of([]));
        fixture.whenStable().then(function () {
            fixture.detectChanges();
            expect(petService.getCatsByOwnerGender).toHaveBeenCalled();
        });
    })));
    it('should render the headers with two genders', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        spyOn(petServiceMock, 'getCatsByOwnerGender').and.returnValue(rxjs_1.Observable.of([
            {
                gender: 'Male',
                petNames: ['Tom', 'Bob', 'Rob']
            },
            {
                gender: 'Femail',
                petNames: ['Lili']
            }
        ]));
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('h3').length).toEqual(2);
    }));
    it('should render cat names', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        spyOn(petServiceMock, 'getCatsByOwnerGender').and.returnValue(rxjs_1.Observable.of([
            {
                gender: 'Male',
                petNames: ['Tom', 'Bob', 'Rob']
            },
            {
                gender: 'Femail',
                petNames: ['Lili']
            }
        ]));
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelectorAll('.title').length).toEqual(4);
    }));
});
//# sourceMappingURL=app.component.spec.js.map
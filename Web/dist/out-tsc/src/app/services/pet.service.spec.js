"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var pet_service_1 = require("./pet.service");
describe('PetService', function () {
    var mockBackend;
    var petService;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                pet_service_1.PetService,
                testing_2.MockBackend,
                http_1.BaseRequestOptions,
                {
                    provide: http_1.Http,
                    deps: [testing_2.MockBackend, http_1.BaseRequestOptions],
                    useFactory: function (backend, defaultOptions) {
                        return new http_1.Http(backend, defaultOptions);
                    }
                }
            ]
        });
        mockBackend = testing_1.TestBed.get(testing_2.MockBackend);
        petService = testing_1.TestBed.get(pet_service_1.PetService);
    });
    it('should be created', testing_1.inject([pet_service_1.PetService], function (service) {
        expect(service).toBeTruthy();
    }));
    it('should return the cats if the call is successful', function () { return __awaiter(_this, void 0, void 0, function () {
        var mockResponse;
        return __generator(this, function (_a) {
            mockResponse = [
                {
                    'gender': 'Male',
                    'petNames': ['Tom', 'Bob', 'Rob']
                },
                {
                    'gender': 'Female',
                    'petNames': ['Lili']
                }
            ];
            mockBackend.connections.subscribe(function (connection) {
                connection.mockRespond(new Response(new http_1.ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
            petService.getCatsByOwnerGender().subscribe(function (cats) {
                expect(cats.length).toBe(4);
                expect(cats[0].gender).toEqual('Male');
                expect(cats[1].gender).toEqual('Female');
                expect(cats[0].petNames.length).toEqual(2);
                expect(cats[3].petNames.length).toEqual(1);
            });
            return [2 /*return*/];
        });
    }); });
    it('should return the cats in alphabetical order', function () { return __awaiter(_this, void 0, void 0, function () {
        var mockResponse;
        return __generator(this, function (_a) {
            mockResponse = [
                {
                    gender: 'Male',
                    petNames: ['Tom', 'Bob', 'Rob']
                },
                {
                    gender: 'Female',
                    petNames: ['Lili']
                }
            ];
            mockBackend.connections.subscribe(function (connection) {
                connection.mockRespond(new Response(new http_1.ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
            petService.getCatsByOwnerGender().subscribe(function (cats) {
                expect(cats[0].petNames[0]).toEqual('Bob');
                expect(cats[0].petNames[1]).toEqual('Rob');
                expect(cats[0].petNames[2]).toEqual('Tom');
            });
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=pet.service.spec.js.map
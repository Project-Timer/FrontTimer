webpackJsonp([0,5],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceType; });
var ResourceType = (function () {
    function ResourceType(obj) {
        this.id = obj && obj.id || null;
        this.label = obj && obj.label || null;
        this.places = obj && obj.places || null;
        this.bookable_type = obj && obj.bookable_type || null;
        this.capacity_type = obj && obj.capacity_type || null;
        this.inviteable = obj && obj.inviteable || null;
        this.visible_in_availability_page = obj && obj.visible_in_availability_page || null;
        this.visible_in_search_page = obj && obj.visible_in_search_page || null;
    }
    return ResourceType;
}());

//# sourceMappingURL=resource-type.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Serializable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Diacritics; });
/*
    a class that can be set from json
*/
var Serializable = (function () {
    function Serializable(json) {
        for (var propName in json) {
            this[propName] = json[propName];
        }
        return this;
    }
    ;
    return Serializable;
}());

var Diacritics = (function () {
    function Diacritics() {
    }
    Diacritics.removeDiacritics = function (value) {
        return value
            .replace(/á/g, 'a')
            .replace(/é/g, 'e')
            .replace(/í/g, 'i')
            .replace(/ó/g, 'o')
            .replace(/ú/g, 'u');
    };
    return Diacritics;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_utils__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_location_reservation__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_localStorage_services_office365LocalStorage_service__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReservationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ReservationService = (function () {
    function ReservationService(http, pathService, office365LocalStorageService) {
        this.http = http;
        this.pathService = pathService;
        this.office365LocalStorageService = office365LocalStorageService;
    }
    // get list of reservations
    ReservationService.prototype.getReservations = function () {
        var data = [];
        return this.http.get(this.pathService.getApiPath('RESERVATION-SEARCH'))
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_3__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_4__model_location_reservation__["a" /* Reservation */](tmp);
                data.push(tmp2);
            });
            return data;
        });
    };
    ReservationService.prototype.start = function (id) {
        return this.http.put(this.pathService.getApiPath('RESERVATION') + '/' + id + '/start', null)
            .map(function (res) {
            return res;
        });
    };
    ReservationService.prototype.delete = function (id) {
        var userToken = this.office365LocalStorageService.tokenOffice365;
        return this.http.delete(this.pathService.getApiPath('RESERVATION') + '/' + id, null, userToken)
            .map(function (res) {
            return res;
        });
    };
    ReservationService.prototype.createOrUpdate = function (obj) {
        var tmp = obj;
        // tmp.create_date = tmp.create_date.getTime();
        // delete tmp.image_ids;
        // delete tmp.bread_crumb;
        // if (obj && !obj.id) {
        //     delete obj.id;
        // }
        //tmp.charac_complement_type=null;
        //tmp.attendees=null;
        var userToken = this.office365LocalStorageService.tokenOffice365;
        var dataToSend = JSON.stringify(tmp, this.replacer);
        if ((obj && obj.id)) {
            // update
            return this.http.put(this.pathService.getApiPath('RESERVATION') + '/' + obj.id, dataToSend, null, userToken)
                .map(function (res) {
                return res.json();
            });
        }
        else {
            // create
            return this.http.post(this.pathService.getApiPath('RESERVATION'), dataToSend, null, userToken)
                .map(function (res) {
                return res.json();
            });
        }
    };
    ReservationService.prototype.replacer = function (key, value) {
        if (key == "start_date_string")
            return undefined;
        else if (key == "start_time_string")
            return undefined;
        else if (key == "end_date_string")
            return undefined;
        else if (key == "end_time_string")
            return undefined;
        else if (key == "tenant_id")
            return undefined;
        else if (key == "tenantId")
            return undefined;
        else if (key == "resource")
            return undefined;
        else if (key == "startButtonVisible")
            return undefined;
        else if (key == "closeButtonVisible")
            return undefined;
        else if (key == "stopButtonVisible")
            return undefined;
        else if (key == "deleteButtonVisible")
            return undefined;
        else
            return value;
    };
    return ReservationService;
}());
ReservationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_app_modules_core__["c" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_modules_core__["c" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_app_modules_core__["e" /* PathService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_modules_core__["e" /* PathService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */]) === "function" && _c || Object])
], ReservationService);

var _a, _b, _c;
//# sourceMappingURL=reservation.service.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_utils__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_location_place__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_location_place_with_children__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_location_resource__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_location_sub_resource_type__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_location_searchResource__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_location_location_type__ = __webpack_require__(820);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_modules_core__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var TreeService = (function () {
    function TreeService(http, pathService) {
        this.http = http;
        this.pathService = pathService;
    }
    TreeService.prototype.getPlaceById = function (id) {
        return this.http.get(this.pathService.getApiPath('PLACE') + '/' + id)
            .map(function (res) {
            var data = res.json();
            if (data) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_3__model_utils__["a" /* Serializable */](data);
                data = new __WEBPACK_IMPORTED_MODULE_4__model_location_place__["a" /* Place */](tmp);
            }
            return data;
        });
    };
    TreeService.prototype.getResourceById = function (id) {
        return this.http.get(this.pathService.getApiPath('RESOURCE') + '/' + id)
            .map(function (res) {
            var data = res.json();
            if (data) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_3__model_utils__["a" /* Serializable */](data);
                data = new __WEBPACK_IMPORTED_MODULE_6__model_location_resource__["a" /* Resource */](tmp);
            }
            return data;
        });
    };
    TreeService.prototype.getPlaceTypeList = function () {
        var data = [];
        return this.http.get(this.pathService.getApiPath('PLACE-TYPE'))
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_3__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_9__model_location_location_type__["a" /* LocationType */](tmp);
                data.push(tmp2);
            });
            return data;
        });
    };
    TreeService.prototype.addPlaceType = function (dataToSend) {
        return this.http.post(this.pathService.getApiPath('PLACE-TYPE'), dataToSend)
            .map(function (res) {
            return res.json();
        });
    };
    TreeService.prototype.updatePlaceType = function (data) {
        var dataToSend = JSON.stringify(data);
        return this.http.put(this.pathService.getApiPath('PLACE-TYPE'), dataToSend)
            .map(function (res) {
            return res;
        });
    };
    TreeService.prototype.getResourceTypeList = function () {
        var data = [];
        return this.http.get(this.pathService.getApiPath('RESOURCE-TYPE'))
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_3__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_7__model_location_sub_resource_type__["a" /* ResourceType */](tmp);
                data.push(tmp2);
            });
            return data;
        });
    };
    TreeService.prototype.getAllPlaces = function () {
        var data = [];
        return this.http.get(this.pathService.getApiPath('ALL-PLACES'))
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_3__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_5__model_location_place_with_children__["a" /* PlaceWithChildren */](tmp);
                data.push(tmp2);
            });
            var sortedData = data.sort(function (n1, n2) {
                if (n1.label > n2.label) {
                    return 1;
                }
                if (n1.label < n2.label) {
                    return -1;
                }
                return 0;
            });
            return sortedData;
        });
    };
    TreeService.prototype.getAllResources = function () {
        var data = [];
        return this.http.get(this.pathService.getApiPath('RESOURCE') + "?search=")
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_3__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_8__model_location_searchResource__["a" /* SearchResource */](tmp);
                data.push(tmp2);
            });
            var sortedData = data.sort(function (n1, n2) {
                if (n1.resource.label > n2.resource.label) {
                    return 1;
                }
                if (n1.resource.label < n2.resource.label) {
                    return -1;
                }
                return 0;
            });
            return sortedData;
        });
    };
    TreeService.prototype.UpdateFavouritePlaces = function (obj) {
        var tmp = obj;
        var dataToSend = JSON.stringify(tmp);
        return this.http.post(this.pathService.getApiPath('FAVOURITE-PLACES'), dataToSend)
            .map(function (res) {
            return res.json();
        });
    };
    TreeService.prototype.getFavouritePlaces = function () {
        var data = [];
        return this.http.get(this.pathService.getApiPath('FAVOURITE-PLACES'))
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_3__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_4__model_location_place__["a" /* Place */](tmp);
                data.push(tmp2);
            });
            return data;
        });
    };
    return TreeService;
}());
TreeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_10_app_modules_core__["c" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10_app_modules_core__["c" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_10_app_modules_core__["e" /* PathService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10_app_modules_core__["e" /* PathService */]) === "function" && _b || Object])
], TreeService);

var _a, _b;
//# sourceMappingURL=tree.service.js.map

/***/ }),

/***/ 1146:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1147:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".main-div {\r\n    /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n    border-radius: 15px; */\r\n    text-align:center;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n  }\r\n  .btn-primary {\r\n    background-color: #000000;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1148:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".alert {\r\n    position: fixed;\r\n    top: 0px;\r\n    left:0px;\r\n    width: 100%;\r\n    z-index: 10;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1149:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1150:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "  .main-div {\r\n    /* background: #f837c8;\r\n    background: -webkit-linear-gradient(#f837c8, #f8ec44);\r\n    background:    -moz-linear-gradient(#f837c8, #f8ec44);\r\n    background:         linear-gradient(120deg, #f9d423 0%, #e14fad 70%); */\r\n    /* background-image: linear-gradient(120deg, #e14fad 0%, #f9d423 100%); */\r\n    /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n    border-radius: 15px; */\r\n    text-align:center;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n\r\n  }\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1151:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "#mapwize {\r\n    position: absolute;\r\n    top: 205px;\r\n    bottom: 0;\r\n    left: 15px;\r\n    right: 15px;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1152:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".main-div {\r\n    /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n    border-radius: 15px; */\r\n    text-align:center;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n\r\n  }\r\n  .btn-primary {\r\n    background-color: #000000;\r\n}\r\n/* .circle{\r\n    margin-top: 5px;\r\n    width:30px;\r\n    background:#00aaff !important;\r\n    height:30px;\r\n    text-align:center;\r\n    border-radius:100px;\r\n    line-height: 30px;\r\n    color: white;\r\n    display: inline-block;\r\n    font-size: small;\r\n    font-weight: bold;\r\n  } */\r\n  .div-standard {\r\n    background-image: null;\r\n  }\r\n  .parent {\r\n    display: table;\r\n;  \r\n}\r\n.child {\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n}\r\n\r\n\r\n::ng-deep .carousel-control{\r\n  background-image: none;\r\n }\r\n::ng-deep a.carousel-control:hover, a.carousel-control.right:hover {\r\n  background-image: none;\r\n }\r\n ::ng-deep a.carousel-control.left:hover{\r\n  background-image: none;\r\n }\r\n ::ng-deep a.carousel-control.left{\r\n  background-image: none;\r\n } \r\n ::ng-deep a.carousel-control.right{\r\n  background-image: none;\r\n }\r\n ::ng-deep a.carousel-control{\r\n  background-color: none;\r\n  opacity:1;\r\n }\r\n ::ng-deep .carousel-control-prev, ::ng-deep .carousel-control-next {\r\n  background-color: none;\r\n}\r\n::ng-deep .carousel .carousel-control-prev-icon, ::ng-deep .carousel .carousel-control-next-icon {\r\n  font-family: \"Lato\", sans-serif;\r\n  background-color: #00aaff;\r\n  color: white;\r\n  width: 35px;\r\n  height: 35px;\r\n  border-radius: 50%; \r\n} \r\n.desc{\r\n  color:grey;\r\n  font-size: smaller;\r\n  margin-top:1px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1153:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".main-div {\r\n    /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n    border-radius: 15px; */\r\n    text-align:center;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n    margin-bottom: 10px;\r\n\r\n  }\r\n  .btn-primary {\r\n    background-color: #000000;\r\n}\r\n\r\n.table tr.highlighted td {\r\n    background-color:#0f72ce;\r\n    \r\n    /* !important; */\r\n    \r\n     color: white;\r\n  }\r\n  .no-highlight{\r\n    /* display: inline-block; */\r\n    background:transparent;\r\n  }\r\n  \r\n/* .circle{\r\n  margin-top: 5px;\r\n  width:30px;\r\n  background:#00aaff !important;\r\n  text-align:center;\r\n  border-radius:100px;\r\n  line-height: 12px;\r\n  color: white;\r\n  display: inline-block;\r\n  font-size: small;\r\n  font-weight: bold;\r\n} */\r\n.state{\r\n  text-align:center;\r\n  /* border-radius:5px; */\r\n  line-height: 30px;\r\n  color: white;\r\n\r\n}\r\n.state_Created{\r\n  background:darkorange !important;\r\n}\r\n.state_Confirmed{\r\n  background:green !important;\r\n}\r\n.state_NotConfirmed{\r\n  background:red !important;\r\n}\r\n\r\ntable tr td a {\r\n  display:block;\r\n  height:100%;\r\n  width:100%;\r\n}\r\ntable tr td {\r\n  padding-left: 0;\r\n  padding-right: 0;\r\n}\r\n\r\n/* table {\r\n  border: 1px solid white;    \r\n} */\r\n\r\nclickable {\r\n  cursor: pointer;\r\n}\r\n.warning{\r\n  background-color: #000000;\r\n  border-radius: 15px; \r\n  padding:10px;\r\n  color: white;\r\n  text-align:center;\r\n  font-weight: bold;\r\n}\r\n\r\n.modal-opened{\r\n  opacity: 1 !important;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1154:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1155:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".main-div {\r\n    /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n    border-radius: 15px; */\r\n    text-align:left;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n  }\r\n  .btn-primary {\r\n    background-color: #000000;\r\n    vertical-align: bottom;\r\n}\r\n\r\n.div-standard {\r\n    background-image: null;\r\n  }\r\n  .parent {\r\n    display: table;\r\n;  \r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1156:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1157:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".navbar > li{\r\n    margin-left: 0.5em;\r\n    margin-right: 0.5em;\r\n    color: grey!important;\r\n    background-color: white;\r\n\r\n}\r\na.active {\r\n  /* created active class for your li elements */\r\n  /* border-left: 3px solid #000099; */\r\n  /* border-left: 3px solid rgb(63, 184, 255); */\r\n  /* border-left: 3px solid black; */\r\n  /* color: #00aaff; */\r\n  color: #00aaff!important;\r\n  background-color: white!important;\r\n}\r\n\r\n.linkPage{\r\n    max-width: 20%; \r\n    /* max-width: 190px; */\r\n}\r\na {\r\n    color:grey; \r\n    text-decoration: none;\r\n    font-size: 0.90vw;\r\n}\r\na:focus{\r\n    color: #00aaff;\r\n    background-color: white;\r\n}\r\na:hover{\r\n    color: #00aaff;\r\n    background-color: white;\r\n}\r\nli.active {\r\n    /* created active class for your li elements */\r\n    /* border-left: 3px solid #000099; */\r\n    /* border-left: 3px solid rgb(63, 184, 255); */\r\n    /* border-left: 3px solid black; */\r\n    /* color: #00aaff; */\r\n    color: #00aaff!important;\r\n    background-color: white;\r\n  }\r\n.mainMenuElement{\r\n    cursor: not-allowed ;\r\n}\r\n\r\n/* .nav>li>a:hover {\r\n    text-decoration: none;\r\n    color: grey;\r\n    background-color: white;\r\n} */\r\n  /* h5.active{\r\n    color: #00aaff!important;\r\n    background-color: white!important;\r\n  } */\r\n\r\n  .currentVersion {\r\n    color:gray;\r\n    font-size: small;\r\n    margin-top: 10px;\r\n    margin-bottom: 0px;\r\n  }\r\n  ", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1158:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1159:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".main-div {\r\n    /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n    border-radius: 15px; */\r\n    text-align:left;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n  }\r\n  .btn-primary {\r\n    background-color: #000000;\r\n}\r\n\r\n.div-standard {\r\n    background-image: null;\r\n  }\r\n.parent {\r\n    display: table;\r\n;  \r\n}\r\n.child {\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n}\r\n\r\ninput{\r\n    color: #00aaff;\r\n    background-color: #f5f7fa;\r\n    border-top: none;\r\n    border-left: none;\r\n    border-right: none;\r\n    border-color: grey;\r\n    border-width: thin;\r\n    font-size: 14px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1160:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".main-div {\r\n    /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n    border-radius: 15px; */\r\n    text-align:left;\r\n    padding-top: 4px;\r\n    padding-bottom: 10px;\r\n    margin-top: 10px;\r\n\r\n  }\r\n  .btn-primary {\r\n    background-color: #000000;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1161:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".main-div {\r\n  /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n  border-radius: 15px; */\r\n  text-align:left;\r\n  padding-top: 10px;\r\n  padding-bottom: 10px;\r\n}\r\n.btn-primary {\r\n  background-color: #000000;\r\n}\r\n.carac-div {\r\n  /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n  border-radius: 15px; */\r\n  padding: 10px;\r\n  background-color: white; \r\n  /* box-shadow: 2px 2px 8px 1px gray;\r\n  border-radius: 15px; */\r\n  /* border: 1px dotted rgba(0, 170, 255, 1); */\r\n  margin-bottom: 10px;\r\n}\r\ninput[type=text]{\r\n  display: inline-block;\r\n  position: relative;\r\n \r\n  margin-top: 2px;\r\n  margin-bottom: 4px;\r\n  margin-right:10px;\r\n  width: 36px;\r\n  color: #00aaff;\r\n  background-color: #f5f7fa;\r\n  font-size: small;\r\n  border: 1px dotted rgba(0, 170, 255, 1);\r\n}\r\n\r\ntbody {\r\n  height: 150px;\r\n  display: inline-block;\r\n  width: 100%;\r\n  overflow: auto;\r\n}\r\n/* td.container > div {\r\n    width: 100%;\r\n    height: 100%;\r\n    overflow:hidden;\r\n}\r\ntd.container {\r\n    height: 15px;\r\n}\r\n */\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1162:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".main-div {\r\n    /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n    border-radius: 15px; */\r\n    text-align:center;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n    margin-top: 10px;\r\n    margin-bottom: 10px;\r\n\r\n  }\r\n  .btn-primary {\r\n    background-color: #000000;\r\n}\r\n/* .circle{\r\n    margin-top: 5px;\r\n    width:40px;\r\n    background:#00aaff !important;\r\n    height:40px;\r\n    text-align:center;\r\n    border-radius:100px;\r\n    line-height: 40px;\r\n    color: white;\r\n    display: inline-block;\r\n    font-size: large;\r\n    font-weight: bold;\r\n  } */\r\n  .div-standard {\r\n    background-image: null;\r\n  }\r\n  .parent {\r\n    display: table;\r\n;  \r\n}\r\n.child {\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n}\r\n\r\n.tableIcons {\r\n  margin: 0 auto;\r\n  text-align: center;\r\n}\r\n.characCircle{\r\n  margin-top: 0px;\r\n  width:20px;\r\n  background:#00aaff !important;\r\n  /* height:30px; */\r\n  text-align:center;\r\n  border-radius:100px;\r\n  line-height: 20px;\r\n  color: white;\r\n  display: inline-block;\r\n  font-size: small;\r\n  font-weight: bold;\r\n}\r\n.warning{\r\n    background-color: #000000;\r\n    border-radius: 15px; \r\n    padding:10px;\r\n    color: white;\r\n    text-align:center;\r\n    font-weight: bold;\r\n}\r\n.attendeesList {\r\n  /* line-height: 2em;  */\r\n  word-wrap: break-word;\r\n  word-break: break-all;\r\n  height: 80px;\r\n}\r\n::ng-deep .carousel-control{\r\n  background-image: none;\r\n }\r\n::ng-deep a.carousel-control:hover, a.carousel-control.right:hover {\r\n  background-image: none;\r\n }\r\n ::ng-deep a.carousel-control.left:hover{\r\n  background-image: none;\r\n }\r\n ::ng-deep a.carousel-control.left{\r\n  background-image: none;\r\n } \r\n ::ng-deep a.carousel-control.right{\r\n  background-image: none;\r\n }\r\n ::ng-deep a.carousel-control{\r\n  background-color: none;\r\n  opacity:1;\r\n }\r\n ::ng-deep .carousel-control-prev, ::ng-deep .carousel-control-next {\r\n  background-color: none;\r\n}\r\n::ng-deep .carousel .carousel-control-prev-icon, ::ng-deep .carousel .carousel-control-next-icon {\r\n  font-family: \"Lato\", sans-serif;\r\n  background-color: #00aaff;\r\n  color: white;\r\n  width: 35px;\r\n  height: 35px;\r\n  border-radius: 50%; \r\n}\r\n.carousel-caption {\r\n  color: rgba(255, 255, 255, 0.87);\r\n  font-family: \"Lato\", sans-serif;\r\n}\r\n\r\n.avail{\r\n  text-align:center;\r\n  /* border-radius:5px; */\r\n  line-height: 30px;\r\n  /* width: 100px; */\r\n  color: white;\r\n  margin-left: 10px;\r\n  margin-right:10px;\r\n}\r\n.avail_Available{\r\n  background:green !important;\r\n}\r\n.avail_Unavailable{\r\n  background:red !important;\r\n}\r\n.avail_Unknown{\r\n  background:gray !important;\r\n}\r\n\r\ntextarea {\r\n  width: 70%;\r\n  /* height: 100px; */\r\n}\r\n/* .desc{\r\n    background-color: #00aaff;\r\n    color:white;\r\n    margin-left: 7px;\r\n    margin-right: 7px;\r\n    margin-top:1px;\r\n} */\r\n\r\n.desc{\r\n  color:grey;\r\n  font-size: smaller;\r\n  margin-top:1px;\r\n}\r\n.reports-div {\r\n  /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n  border-radius: 15px; */\r\n  padding: 10px;\r\n  background-color: white; \r\n  /* box-shadow: 2px 2px 8px 1px gray;\r\n  border-radius: 15px; */\r\n  /* border: 1px dotted rgba(0, 170, 255, 1); */\r\n  margin-top: 40px;\r\n  margin-bottom: 10px;\r\n  margin-left: 10px;\r\n  margin-right: 10px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1163:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".main-div {\r\n    /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n    border-radius: 15px; */\r\n    text-align:center;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n    margin-top: 10px;\r\n    margin-bottom: 10px;\r\n  }\r\n  .btn-primary {\r\n    background-color: #000000;\r\n}\r\n\r\n.table tr.highlighted td {\r\n    background-color:#0f72ce;\r\n    \r\n    /* !important; */\r\n    \r\n     color: white;\r\n  }\r\n  table {\r\n    /* width: 100%; */\r\n    width:-webkit-fit-content;\r\n    width:-moz-fit-content;\r\n    width:fit-content;\r\n    border-collapse: collapse;\r\n  }\r\n  .table-wrapper {\r\n    /* display: block; */\r\n    display: inline-block;\r\n    max-height: 320px;\r\n    overflow-y: scroll;\r\n    /* width: 1200px; */\r\n  }\r\n\r\n  \r\n  .no-highlight{\r\n    /* display: inline-block; */\r\n    background:transparent;\r\n  }\r\n  \r\n/* .circle{\r\n  margin-top: 5px;\r\n  width:30px;\r\n  background:#00aaff !important;\r\n  text-align:center;\r\n  border-radius:100px;\r\n  line-height: 12px;\r\n  color: white;\r\n  display: inline-block;\r\n  font-size: small;\r\n  font-weight: bold;\r\n} */\r\ntable tr td a {\r\n  display:block;\r\n  height:100%;\r\n  /* width:100%; */\r\n  width:-webkit-fit-content;\r\n  width:-moz-fit-content;\r\n  width:fit-content;\r\n}\r\ntable tr td {\r\n  padding-left: 0;\r\n  padding-right: 0;\r\n}\r\n\r\n/* table {\r\n  border: 1px solid white;    \r\n} */\r\n\r\nclickable {\r\n  cursor: pointer;\r\n}\r\n\r\n.tableIcons {\r\n  margin: 0 auto;\r\n  text-align: center;\r\n}\r\n.characCircle{\r\n  margin-top: 0px;\r\n  width:20px;\r\n  background:#00aaff !important;\r\n  /* height:30px; */\r\n  text-align:center;\r\n  border-radius:100px;\r\n  line-height: 20px;\r\n  color: white;\r\n  display: inline-block;\r\n  font-size: small;\r\n  font-weight: bold;\r\n}\r\n\r\n.avail{\r\n  text-align:center;\r\n  /* border-radius:5px; */\r\n  line-height: 30px;\r\n  /* width: 100px; */\r\n  color: white;\r\n  margin-left: 30px;\r\n  margin-right:30px;\r\n}\r\n.avail_Available{\r\n  background:green !important;\r\n}\r\n.avail_Unavailable{\r\n  background:red !important;\r\n}\r\n.avail_Unknown{\r\n  background:gray !important;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1164:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".btn-primary {\r\n    background-color: #000000;\r\n    margin-top: 15px;\r\n    margin-right: 10px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1165:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, ".main-div {\r\n    /* background-image: linear-gradient(120deg,  #f9d423 10%,#e14fad 90%);\r\n    border-radius: 15px; */\r\n    text-align:left;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n    margin-top: 10px;\r\n\r\n  }\r\n  .btn-primary {\r\n    background-color: #000000;\r\n    margin-left: 10px;\r\n}\r\ninput{\r\n  color: #00aaff;\r\n  background-color: #f5f7fa;\r\n  border-top: none;\r\n  border-left: none;\r\n  border-right: none;\r\n  border-color: grey;\r\n  border-width: thin;\r\n  width: 100%;\r\n  font-size: 1em;\r\n  height: 1.5em;\r\n  line-height: 1.5em;\r\n}\r\nspan {\r\n  display: block;\r\n  overflow: hidden;\r\n  padding: 0 1em;\r\n  margin:0px;\r\n}\r\n.img-magnifier{\r\n  float:left;\r\n}\r\n.img-clear{\r\n  float:right;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1166:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "\r\n.modal-opened{\r\n    opacity: 1 !important; \r\n}\r\n\r\n.modal-header {\r\n    padding: 5px;\r\n    background-color: white;\r\n    border-bottom: 1px transparent;\r\n}\r\n/* .modal-content{\r\n    background-color: transparent!important;\r\n} */\r\n\r\n\r\n    ::ng-deep .modal-dialog{\r\n        max-width: 95%;\r\n        width: 95%;\r\n        max-height: 80%;\r\n        height: 80%;\r\n        } \r\n    ::ng-deep .modal-content {\r\n            /* margin-top: 12%; */\r\n            margin-top: 8%;\r\n        } \r\n    /* .map-container{\r\n        overflow:hidden;\r\n        position:relative;\r\n        } */\r\n    /* .map-container iframe{\r\n        left:0;\r\n        top:0;\r\n        height:100%;\r\n        width:100%;\r\n        position:absolute;\r\n        }     */\r\n\r\n        /* .clickable-div{\r\n            position: relative;\r\n        } */\r\n        /* .k-scheduler-views li.k-state-selected {\r\n            background-color: #00aaff!important;\r\n        } */\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1167:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "#showMapwize{\r\n    position: absolute;\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 0;\r\n    right: 0;\r\n}\r\n\r\n.modal-opened{\r\n    opacity: 0.1!important;\r\n\r\n}\r\n\r\n.modal-header {\r\n    padding: 5px;\r\n    background-color: white;\r\n    border-bottom: 1px transparent;\r\n}\r\n    ::ng-deep .modal-dialog{\r\n        max-width: 95%;\r\n        width: 95%;\r\n        } \r\n    ::ng-deep .modal-content {\r\n            margin-top: 12%;\r\n        } \r\n    .map-container{\r\n        overflow:hidden;\r\n        position:relative;\r\n        }\r\n    .map-container iframe{\r\n        left:0;\r\n        top:0;\r\n        height:100%;\r\n        width:100%;\r\n        position:absolute;\r\n        }    \r\n\r\n        .clickable-div{\r\n            position: relative;\r\n        }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1168:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)();
// imports


// module
exports.push([module.i, "\r\n.modal-opened{\r\n    /* opacity: 1 !important; */\r\n    opacity: 0.1!important;\r\n\r\n}\r\n\r\n.modal-header {\r\n    padding: 5px;\r\n    background-color: white;\r\n    border-bottom: 1px transparent;\r\n}\r\n/* .modal-content{\r\n    background-color: transparent!important;\r\n} */\r\n\r\n/* \r\n.resp-container {\r\n    position: relative;\r\n    overflow: hidden;\r\n    padding-top: 56.25%; \r\n\r\n}\r\n.conteneur iframe\r\n{\r\nposition: absolute;\r\ntop: 0;\r\nleft: 0;\r\nwidth: 100%;\r\nheight: 100%;\r\n}\r\n*/\r\n/* ::ng-deep .showURL .modal-dialog{\r\n    max-width: 95%;\r\n    width: 95%;\r\n    }  */\r\n    ::ng-deep .modal-dialog{\r\n        max-width: 95%;\r\n        width: 95%;\r\n        /* height: 100%; */\r\n        /* max-height: 50%; */\r\n        /* height: 1000px!important; */\r\n        } \r\n    ::ng-deep .modal-content {\r\n            /* height: 80%; */\r\n            margin-top: 12%;\r\n        } \r\n    .map-container{\r\n        overflow:hidden;\r\n        /* padding-bottom:56.25%; */\r\n        position:relative;\r\n        /* height:0; */\r\n        }\r\n    .map-container iframe{\r\n        left:0;\r\n        top:0;\r\n        height:100%;\r\n        width:100%;\r\n        position:absolute;\r\n        }    \r\n\r\n        .clickable-div{\r\n            position: relative;\r\n        }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 1174:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 546,
	"./af.js": 546,
	"./ar": 553,
	"./ar-dz": 547,
	"./ar-dz.js": 547,
	"./ar-kw": 548,
	"./ar-kw.js": 548,
	"./ar-ly": 549,
	"./ar-ly.js": 549,
	"./ar-ma": 550,
	"./ar-ma.js": 550,
	"./ar-sa": 551,
	"./ar-sa.js": 551,
	"./ar-tn": 552,
	"./ar-tn.js": 552,
	"./ar.js": 553,
	"./az": 554,
	"./az.js": 554,
	"./be": 555,
	"./be.js": 555,
	"./bg": 556,
	"./bg.js": 556,
	"./bm": 557,
	"./bm.js": 557,
	"./bn": 558,
	"./bn.js": 558,
	"./bo": 559,
	"./bo.js": 559,
	"./br": 560,
	"./br.js": 560,
	"./bs": 561,
	"./bs.js": 561,
	"./ca": 562,
	"./ca.js": 562,
	"./cs": 563,
	"./cs.js": 563,
	"./cv": 564,
	"./cv.js": 564,
	"./cy": 565,
	"./cy.js": 565,
	"./da": 566,
	"./da.js": 566,
	"./de": 569,
	"./de-at": 567,
	"./de-at.js": 567,
	"./de-ch": 568,
	"./de-ch.js": 568,
	"./de.js": 569,
	"./dv": 570,
	"./dv.js": 570,
	"./el": 571,
	"./el.js": 571,
	"./en-au": 572,
	"./en-au.js": 572,
	"./en-ca": 573,
	"./en-ca.js": 573,
	"./en-gb": 574,
	"./en-gb.js": 574,
	"./en-ie": 575,
	"./en-ie.js": 575,
	"./en-il": 576,
	"./en-il.js": 576,
	"./en-nz": 577,
	"./en-nz.js": 577,
	"./eo": 578,
	"./eo.js": 578,
	"./es": 581,
	"./es-do": 579,
	"./es-do.js": 579,
	"./es-us": 580,
	"./es-us.js": 580,
	"./es.js": 581,
	"./et": 582,
	"./et.js": 582,
	"./eu": 583,
	"./eu.js": 583,
	"./fa": 584,
	"./fa.js": 584,
	"./fi": 585,
	"./fi.js": 585,
	"./fo": 586,
	"./fo.js": 586,
	"./fr": 589,
	"./fr-ca": 587,
	"./fr-ca.js": 587,
	"./fr-ch": 588,
	"./fr-ch.js": 588,
	"./fr.js": 589,
	"./fy": 590,
	"./fy.js": 590,
	"./gd": 591,
	"./gd.js": 591,
	"./gl": 592,
	"./gl.js": 592,
	"./gom-latn": 593,
	"./gom-latn.js": 593,
	"./gu": 594,
	"./gu.js": 594,
	"./he": 595,
	"./he.js": 595,
	"./hi": 596,
	"./hi.js": 596,
	"./hr": 597,
	"./hr.js": 597,
	"./hu": 598,
	"./hu.js": 598,
	"./hy-am": 599,
	"./hy-am.js": 599,
	"./id": 600,
	"./id.js": 600,
	"./is": 601,
	"./is.js": 601,
	"./it": 602,
	"./it.js": 602,
	"./ja": 603,
	"./ja.js": 603,
	"./jv": 604,
	"./jv.js": 604,
	"./ka": 605,
	"./ka.js": 605,
	"./kk": 606,
	"./kk.js": 606,
	"./km": 607,
	"./km.js": 607,
	"./kn": 608,
	"./kn.js": 608,
	"./ko": 609,
	"./ko.js": 609,
	"./ky": 610,
	"./ky.js": 610,
	"./lb": 611,
	"./lb.js": 611,
	"./lo": 612,
	"./lo.js": 612,
	"./lt": 613,
	"./lt.js": 613,
	"./lv": 614,
	"./lv.js": 614,
	"./me": 615,
	"./me.js": 615,
	"./mi": 616,
	"./mi.js": 616,
	"./mk": 617,
	"./mk.js": 617,
	"./ml": 618,
	"./ml.js": 618,
	"./mr": 619,
	"./mr.js": 619,
	"./ms": 621,
	"./ms-my": 620,
	"./ms-my.js": 620,
	"./ms.js": 621,
	"./mt": 622,
	"./mt.js": 622,
	"./my": 623,
	"./my.js": 623,
	"./nb": 624,
	"./nb.js": 624,
	"./ne": 625,
	"./ne.js": 625,
	"./nl": 627,
	"./nl-be": 626,
	"./nl-be.js": 626,
	"./nl.js": 627,
	"./nn": 628,
	"./nn.js": 628,
	"./pa-in": 629,
	"./pa-in.js": 629,
	"./pl": 630,
	"./pl.js": 630,
	"./pt": 632,
	"./pt-br": 631,
	"./pt-br.js": 631,
	"./pt.js": 632,
	"./ro": 633,
	"./ro.js": 633,
	"./ru": 634,
	"./ru.js": 634,
	"./sd": 635,
	"./sd.js": 635,
	"./se": 636,
	"./se.js": 636,
	"./si": 637,
	"./si.js": 637,
	"./sk": 638,
	"./sk.js": 638,
	"./sl": 639,
	"./sl.js": 639,
	"./sq": 640,
	"./sq.js": 640,
	"./sr": 642,
	"./sr-cyrl": 641,
	"./sr-cyrl.js": 641,
	"./sr.js": 642,
	"./ss": 643,
	"./ss.js": 643,
	"./sv": 644,
	"./sv.js": 644,
	"./sw": 645,
	"./sw.js": 645,
	"./ta": 646,
	"./ta.js": 646,
	"./te": 647,
	"./te.js": 647,
	"./tet": 648,
	"./tet.js": 648,
	"./tg": 649,
	"./tg.js": 649,
	"./th": 650,
	"./th.js": 650,
	"./tl-ph": 651,
	"./tl-ph.js": 651,
	"./tlh": 652,
	"./tlh.js": 652,
	"./tr": 653,
	"./tr.js": 653,
	"./tzl": 654,
	"./tzl.js": 654,
	"./tzm": 656,
	"./tzm-latn": 655,
	"./tzm-latn.js": 655,
	"./tzm.js": 656,
	"./ug-cn": 657,
	"./ug-cn.js": 657,
	"./uk": 658,
	"./uk.js": 658,
	"./ur": 659,
	"./ur.js": 659,
	"./uz": 661,
	"./uz-latn": 660,
	"./uz-latn.js": 660,
	"./uz.js": 661,
	"./vi": 662,
	"./vi.js": 662,
	"./x-pseudo": 663,
	"./x-pseudo.js": 663,
	"./yo": 664,
	"./yo.js": 664,
	"./zh-cn": 665,
	"./zh-cn.js": 665,
	"./zh-hk": 666,
	"./zh-hk.js": 666,
	"./zh-tw": 667,
	"./zh-tw.js": 667
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1174;


/***/ }),

/***/ 1209:
/***/ (function(module, exports) {

module.exports = "<app-alert></app-alert>\r\n<label class=\"pull-right\" style=\"color: #00aaff;margin-right: 15px;margin-top: 5px;\">{{userDisplayName}}</label>\r\n<div class=\"container-fluid main\" style=\"padding:0\">\r\n    <!-- Pour que le login soit centré : -->\r\n    <div *ngIf=\"!isNotOnLoginPage\" class=\"col-xs-1\" style=\"width: 8%\">\r\n\r\n    </div>\r\n\r\n    <div *ngIf=\"isNotOnLoginPage\" class=\"col-xs-2\" style=\"width: 16%\">\r\n        <app-navbar id=\"nav\"></app-navbar>\r\n    </div>\r\n    <!-- overflow-y:auto; -->\r\n    <div class=\"col-xs-10\" style=\"width: 84%; height:100%;\">\r\n        <router-outlet id=\"main\" >\r\n        </router-outlet>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 1210:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-xs-12 main-div div-gradient\">\r\n    <div class=\"col-xs-3\"></div>\r\n    <div class=\"col-xs-6  card\">\r\n        <h3 class=\"text-center font-weight-bold py-4 bg-primary card-heading\">{{'WELCOME' | translate}}</h3>\r\n        <div class=\"main-div \">\r\n            <div class=\"div-white-rounded\">\r\n                <img style=\"margin-top:20px;text-align: center\" src=\"assets/images/VertuozOffice.png\" alt=\"Vertuoz Office\"\r\n                    width=\"250\" />\r\n            </div>\r\n            <div class=\"small\" style=\"margin-top: 10px\">\r\n                <p>version {{globals.currentVersion}}</p>\r\n            </div>\r\n            <div class=\"panel-body  div-gradient\">\r\n                <form name=\"loginForm\" novalidate>\r\n\r\n                    <!-- <h4>{{'WELCOME' | translate}}</h4> -->\r\n                    <!-- <div>  -->\r\n                    <!-- <button mat-raised-button class=\"v-btn-primary\" color=\"#00aaff\"><mat-icon class=\"mat-icon\">add</mat-icon>Primary</button> -->\r\n                    <button mat-raised-button class=\"v-btn-primary pull-right\" \r\n                    *ngIf=\"!validationLoginState\" (click)=\"connect()\"\r\n                        (disabled)=\"loginForm.$invalid\">\r\n                        <!-- <i class=\"fa fa-user-o\"></i>  -->\r\n                        {{'CONNECT' | translate}}</button>\r\n\r\n                    <!-- </div> -->\r\n                    <!-- <button *ngIf=\"!validationLoginState\" type=\"button\" class=\"btn btn-primary\" (click)=\"connect(checkboxRemember.value)\" (disabled)=\"loginForm.$invalid\">\r\n                    <i class=\"fa fa-user-o\"></i> {{'CONNECT' | translate}}\r\n                </button> -->\r\n                    <img *ngIf=\"validationLoginState\" style=\"width: 30px;\" src=\"assets/images/loading.gif\" />\r\n\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-xs-3\"></div>\r\n</div>"

/***/ }),

/***/ 1211:
/***/ (function(module, exports) {

module.exports = "<span *ngIf=\"error\" class=\"alert alert-danger\">{{error | translate }}</span>"

/***/ }),

/***/ 1212:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n    <h3 class=\"text-center font-weight-bold py-4 bg-primary card-heading \" style=\"margin-top: 0;\">{{'AVAILABILITY-TITLE' | translate}}</h3>\n    <div class=\"row\" style=\"margin-top:-10px\">\n\n        <app-search-text-selector class=\"col-xs-9\" style=\"margin-left: 0\" [selectedSearchText]=\"selectedSearchText\"\n            (onSelectSearchText)='onSelectSearchText($event)' (onEnterKeyPressed)='onEnterKeyPressed($event)'>\n        </app-search-text-selector>\n        <button mat-raised-button class=\"v-btn-primary pull-right col-xs-3\" style=\"margin-top: 10px;margin-right: 20px;\"\n            (click)=\"search($event)\">{{'CAPTION-SEARCH'| translate}}\n        </button>\n    </div>\n    \n    <div class=\"row\" style=\"margin-right: 0px; margin-top:10px\">\n        <div class=col-xs-6>\n            <app-resource-type-selector [selectedResourceType]=\"selectedResourceType\"\n                where=\"availabilities\" [selectedPrimary]=\"selectedPrimary\"\n                [selectedSecondary]=\"selectedSecondary\" [caracList]=\"caracList\"\n                (onSelectCaracList)='onSelectCaracList($event)' (onSelectResourceType)='onSelectResourceType($event)'>\n            </app-resource-type-selector>\n            <div *ngIf ></div>\n        </div>\n        <div class=\"col-xs-6\">\n            <div class=row style=\"padding-top:0px\">\n                <app-place-selector [selectedResourceType]=\"selectedResourceType\"\n                    [selectedPrimary]=\"selectedPrimary\"\n                    (onSelectPrimary)='onSelectPrimary($event)'\n                    [selectedSecondary]=\"selectedSecondary\"\n                    (onSelectSecondary)='onSelectSecondary($event)'>\n                </app-place-selector>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"col-xs-12 \" style=\"border: solid 0.5px rgb(107, 107, 107); width:100%;margin-top: 10px\"></div>\n    <div class=\"col-xs-12 \">\n        <div class=\"row\">\n            <app-search-page-resources [selectedSearchResource]=\"selectedSearchResource\" (onSelectSearchResource)='onSelectSearchResource($event)'\n                (onEnterKeyPressed)='onEnterKeyPressed($event)' pageType = 1\n                [selectedEndDate]=\"selectedEndDate\" [selectedSearchText]=\"selectedSearchText\" [selectedResourceType]=\"selectedResourceType\"\n                [selectedPrimary]=\"selectedPrimary\" [selectedSecondary]=\"selectedSecondary\" [caracList]=\"caracList\"></app-search-page-resources>\n        </div>\n    </div> \n    <div class=\"col-xs-12 \">\n        <div class=\"col-xs-12 \">\n            <app-search-page-detail [selectedSearchResource]=\"selectedSearchResource\" (onSelectSearchResource)='onSelectSearchResource($event)'\n            ></app-search-page-detail>\n        </div>\n</div>"

/***/ }),

/***/ 1213:
/***/ (function(module, exports) {

module.exports = "<!-- <div style=\"margin-top: 20px\"> -->\r\n  <div class=\"modal-header\" style=\"background-color: #00aaff;color:white\">\r\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"dismiss()\">\r\n      <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    <h4 class=\"modal-title\">{{ title }}</h4>\r\n  </div>\r\n  <div class=\"modal-body div-gradient\">\r\n    {{ message }}\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <!-- <button type=\"button\" class=\"btn btn-danger\" (click)=\"decline()\">{{ btnCancelText }}</button> -->\r\n    <button mat-raised-button class=\"v-btn-primary\" style=\"width: 100px; background-color: red\" (click)=\"decline()\">{{\r\n      btnCancelText }}</button>\r\n    <!-- <button type=\"button\" class=\"btn btn-primary\" (click)=\"accept()\">{{ btnOkText }}</button> -->\r\n    <button mat-raised-button class=\"v-btn-primary\" style=\"width: 100px\" (click)=\"accept()\">{{ btnOkText }}</button>\r\n  </div>\r\n<!-- </div> -->"

/***/ }),

/***/ 1214:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r\n    <h3 class=\"text-center font-weight-bold py-4 bg-primary card-heading\" style=\"margin-top: 0;\">{{'HOME-TEXT' | translate}}</h3>\r\n</div>\r\n<div ng-controller=\"homeCtrl\" class=\"col-xs-12 main-div div-gradient card\" style=\"background-color:'transparent'\">\r\n    <br>\r\n    <div class=\"div-white-rounded\" style=\"margin-left: 25%;margin-right: 25%\">\r\n        <br>\r\n        <br>\r\n        <!-- <img src=\"assets/images/VertuozOffice.png\" alt=\"Vertuoz Office\"  width=\"250\" />      -->\r\n        <!-- <img src=\"assets/images/VertuozOfficeCompleteName.png\" alt=\"Vertuoz Office\"  width=\"800\" />      -->\r\n        <img src=\"assets/images/VertuozOffice.png\" alt=\"Vertuoz Office\" width=\"250\" />\r\n        <br>\r\n        <br>\r\n    </div>\r\n    <br>\r\n    <p>\r\n        <font color='black'>version 6.4.0</font>\r\n    </p>\r\n\r\n</div>\r\n\r\n<div class=\"main-div col-xs-12\">\r\n    <p>\r\n        <br>\r\n        <font color='black'>{{'DOWNLOAD-MOBILE-APP' | translate}}</font>\r\n        <br>\r\n    </p>\r\n</div>\r\n\r\n<div class=\"main-div\">\r\n    <div class=\"col-xs-2\">\r\n    </div>\r\n    <div class=\"col-xs-3\">\r\n        <a href=\"https://itunes.apple.com/fr/app/zen-office-by-vertuoz/id1366185513?mt=8\" target=\"_blank\">\r\n            <img src=\"assets/images/appstore_fr.png\" alt=\"Télécharger dans l'App Store\" width=\"180\" />\r\n        </a>\r\n        <br>\r\n        <a href=\"https://itunes.apple.com/fr/app/zen-office-by-vertuoz/id1366185513?mt=8\" target=\"_blank\">\r\n            <img src=\"assets/images/qr_code_appstore_fr.png\" alt=\"QR Code\" width=\"120\" />\r\n        </a>\r\n    </div>\r\n    <div class=\"col-xs-2\">\r\n    </div>\r\n    <div class=\"col-xs-3\">\r\n        <a href=\"https://play.google.com/store/apps/details?id=com.engie.zenoffice\" target=\"_blank\">\r\n            <img src=\"assets/images/googleplay_fr.png\" alt=\"Disponible sur Google Play\" width=\"180\" />\r\n        </a>\r\n        <br>\r\n        <a href=\"https://play.google.com/store/apps/details?id=com.engie.zenoffice\" target=\"_blank\">\r\n            <img src=\"assets/images/qr_code_googleplay_fr.png\" alt=\"QR Code\" width=\"120\" />\r\n        </a>\r\n    </div>\r\n    <div class=\"col-xs-2\">\r\n    </div>\r\n</div>"

/***/ }),

/***/ 1215:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r\n  <h3 class=\"text-center font-weight-bold py-4 bg-primary card-heading\" style=\"margin-top: 0;\">{{'MAP-TITLE' | translate}}</h3>\r\n</div>\r\n\r\n<app-place-selector [selectedResourceType]=\"selectedResourceType\" [selectedPrimary]=\"selectedPrimary\"\r\n                    (onSelectPrimary)='onSelectPrimary($event)' [selectedSecondary]=\"selectedSecondary\"\r\n                    (onSelectSecondary)='onSelectSecondary($event)'></app-place-selector>\r\n\r\n<div id=\"mapwize\"></div>"

/***/ }),

/***/ 1216:
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"loading\"></ngx-loading>\r\n<div *ngIf=\"selectedReservation\" class=\"col-xs-12 main-div div-gradient\">\r\n  <div class=\"row\">\r\n    <div class=\"row\" style=\"margin-right: 0px; margin-top:10px\">\r\n      <div class=col-xs-6>\r\n        <app-dates-selector [selectedStartDate]=\"selectedStartDate\" (onSelectStartDate)='onSelectStartDate($event)'\r\n          [selectedEndDate]=\"selectedEndDate\" (onSelectEndDate)='onSelectEndDate($event)'></app-dates-selector>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-12\">\r\n      <h5 class=\"warning\" *ngIf=\"mustShowModificationImpossibleWarning\">{{ 'RESOURCE_NOT_AVAILABLE' | translate}}</h5>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <br>\r\n    <div class=\"col-xs-12 \" style=\"border: solid 0.5px rgb(107, 107, 107); width:100%;margin-bottom: 10px\"></div>\r\n    <br>\r\n    <div class=\"col-xs-4 parent\">\r\n      <!-- Carousel -->\r\n      <div class=\"child\">\r\n        <carousel style=\"cursor: pointer;\" *ngIf=\"picturesList\" [noWrap]=\"true\" [interval]=\"false\">\r\n          <slide ngbSlide *ngFor=\"let picture of picturesList\">\r\n            <a (click)=\"showPictureFullScreen(picture)\">\r\n              <img [src]=\"picture.imgData\" alt=\"{{picture.description}}\"\r\n                style=\"max-height:150px; margin:0 auto;cursor: pointer\">\r\n            </a>\r\n            <div>\r\n              <p class=\"desc\">{{picture.description}}</p>\r\n            </div>\r\n          </slide>\r\n        </carousel>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-6 parent\">\r\n      <div class=\"child\">\r\n        <div class=\"col-xs-1 child\">\r\n          <!-- Capacité -->\r\n          <div class=\"child\">\r\n            <br>\r\n            <br>\r\n            <h2 class=\"circle \">{{selectedReservation.resource?.capacity}}</h2>\r\n            <h5 class=\"buttonCaption\" style=\"margin-top:-5px\">{{'HEADER-CAPACITY' | translate}}</h5>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-10 child\">\r\n          <!-- Caractéristiques -->\r\n          <table align=\"center\">\r\n            <td *ngFor=\"let car of selectedReservation.resource?.charac\" class=\"tableIcons\"\r\n              style=\"padding-right:2px;padding-left: 2px\">\r\n              <div *ngIf=\"car.label!='Capacité'\">\r\n                <img *ngIf=\"car.type!='long_type'\" class=\"img-characteristics\" src=\"{{car.pictogramFullPath}}\"\r\n                  title=\"{{car.label}}\" />\r\n                <div *ngIf=\"car.type === 'long_type' ||car.type === 'double_type'\">\r\n                  <img class=\"img-characteristics\" src=\"{{car.pictogramFullPath}}\" title=\"{{car.label}}\" />\r\n                  <label class=\"characCircle \">{{car.value}}</label>\r\n                </div>\r\n              </div>\r\n            </td>\r\n          </table>\r\n          <!-- Adresse -->\r\n          <table align=\"center\">\r\n            <td>\r\n              <div style=\"margin-left: 40px;margin-right:40px;\">\r\n                <h5>{{selectedReservation.resource?.address.address}}</h5>\r\n              </div>\r\n            </td>\r\n          </table>\r\n          <!-- Boutons d'action -->\r\n          <table style=\"margin-top: 10px\" align=\"center\">\r\n            <td class=\"tableIcons\" style=\"padding-right:4px;padding-left: 4px\">\r\n              <div>\r\n                <button mat-raised-button class=\"v-btn-primary\" style=\"width: 60px\" on-click=\"showLocalization()\">\r\n                  <img src=\"assets/images/localization.png\" height=\"20\" style=\"margin-top: -5px\" alt=\"Localisation\" />\r\n                </button>\r\n                <h5 class=\"buttonCaption\">{{'TITLE-SHOW-LOCATION' | translate}}</h5>\r\n              </div>\r\n            </td>\r\n            <td *ngIf=\"selectedReservation.resource?.map_url\" class=\"tableIcons\"\r\n              style=\"padding-right:4px;padding-left: 4px\">\r\n              <div>\r\n                <button mat-raised-button class=\"v-btn-primary\" style=\"width: 60px\" on-click=\"showMapwize()\">\r\n                  <img src=\"assets/images/maps_128.png\" height=\"20\" style=\"margin-top: -5px\" alt=\"Guidage\" />\r\n                </button>\r\n                <h5 class=\"buttonCaption\">{{'TITLE-SHOW-DETAILED-MAP' | translate}}</h5>\r\n              </div>\r\n            </td>\r\n            <td *ngIf=\"selectedReservation.resource?.resource_type?.bookable_type== 'Bookable'\" class=\"tableIcons\"\r\n              style=\"padding-right:4px;padding-left: 4px\">\r\n              <div>\r\n                <button mat-raised-button class=\"v-btn-primary\" style=\"width: 60px\" on-click=\"showCalendar()\">\r\n                  <img src=\"assets/images/calendar.png\" height=\"20\" style=\"margin-top: -5px\" alt=\"Guidage\" />\r\n                </button>\r\n                <h5 class=\"buttonCaption\">{{'TITLE-CALENDAR' | translate}}</h5>\r\n              </div>\r\n            </td>\r\n\r\n          </table>\r\n        </div>\r\n        <div class=\"col-xs-1 child\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-2 parent\">\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-4 parent\" style=\"height:120px;\">\r\n      <!-- Infos ressource (type ressource, nom, place tree) -->\r\n      <div class=\"child\">\r\n        <h5>{{selectedReservation.resource?.resource_type?.label}}</h5>\r\n        <h2 style=\"color:#00aaff;font-weight: bold \">{{selectedReservation.resource?.label}}</h2>\r\n        <h5>\r\n          <i>{{selectedReservation.placeTreeLabel}}</i>\r\n        </h5>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-6 parent\" style=\"height:120px;\">\r\n      <!-- Invités -->\r\n      <div *ngIf=\"selectedReservation.resource?.resource_type?.bookable_type== 'Bookable'\" class=\"child\">\r\n        <label>{{'TITLE-ATTENDEES' | translate}}</label>\r\n        <br>\r\n        <h5>{{attendees}}</h5>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-2 parent\" style=\"height:120px;\">\r\n      <!-- bouton Réserver  -->\r\n      <div class=\"child\">\r\n        <button mat-raised-button class=\"v-btn-primary pull-right\" style=\"width: 100px\" (click)=\"doReserve($event)\"\r\n          [disabled]=\"!reservationValid\">{{'CAPTION-MODIFY' | translate}}</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>"

/***/ }),

/***/ 1217:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-xs-12 main-div div-gradient\">\r\n  <ngx-loading [show]=\"loading\"></ngx-loading>\r\n  <!-- <div class=\"card-bodye\"> -->\r\n  <div id=\"table\" >\r\n    <!-- <table class=\"table table-dark table-bordered table-responsive-md table-striped text-center\"> -->\r\n    <ng-container *ngIf=\"reservationList.length !== 0; then thenBlock; else elseBlock\">\r\n    </ng-container>\r\n    <ng-template #thenBlock>\r\n      <table class=\"table\">\r\n        <tr>\r\n          <th class=\"text-center\">{{'HEADER-CAPACITY' | translate}}</th>\r\n          <th class=\"text-center\">{{'HEADER-TYPE' | translate}}</th>\r\n          <th class=\"text-center\">{{'HEADER-START-DATE' | translate}}</th>\r\n          <th class=\"text-center\">{{'HEADER-START-HOUR' | translate}}</th>\r\n          <th class=\"text-center\">{{'HEADER-END-DATE' | translate}}</th>\r\n          <th class=\"text-center\">{{'HEADER-END-HOUR' | translate}}</th>\r\n          <th class=\"text-center\">{{'HEADER-RESOURCE' | translate}}</th>\r\n          <th class=\"text-center\">{{'HEADER-STATUS' | translate}}</th>\r\n          <th class=\"text-center\"></th>\r\n        </tr>\r\n        <tr style=\"cursor: pointer;\" *ngFor=\"let reservation of reservationList; let id = index\" class=\"clickable\" (click)=\"reservationSelected(reservation)\"\r\n          [class.highlighted]=\"selectedReservation && reservation.id === selectedReservation.id\">\r\n          <!-- [ngClass]=\"{ 'highlighted': selectedReservation && reservation.id === selectedReservation.id}\" -->\r\n          <td contenteditable=\"false\" class=\"circle \">{{reservation.resource?.capacity}}</td>\r\n          <td contenteditable=\"false\">{{reservation.resource?.resource_type?.label}}</td>\r\n          <td contenteditable=\"false\">{{reservation.start_date | date:'shortDate' }}</td>\r\n          <td contenteditable=\"false\">{{reservation.start_date | date:'shortTime' }}</td>\r\n          <td contenteditable=\"false\">{{reservation.end_date | date:'shortDate' }}</td>\r\n          <td contenteditable=\"false\">{{reservation.end_date | date:'shortTime' }}</td>\r\n          <td contenteditable=\"false\" >\r\n              <!-- <label style=\"color:#00aaff;font-weight: bold \">{{reservation.resource?.label}}</label> -->\r\n              <div>\r\n                  <h4 style=\"color:#00aaff;font-weight: bold;margin-top: 0px \">{{reservation.resource?.label}}</h4>\r\n                  <!-- <h5>\r\n                    <i>{{searchResource.placeTreeLabel}}</i>\r\n                  </h5> -->\r\n                </div>              \r\n          </td>\r\n          <td contenteditable=\"false\" *ngIf=\"reservation.state === 'Confirmed' || reservation.state === 'Started' || reservation.state === 'Extended'\">\r\n            <div class=\"state state_Confirmed\">{{reservation.state | reservationState | uppercase}}</div>\r\n          </td>\r\n          <td contenteditable=\"false\" *ngIf=\"reservation.state === 'Created' || reservation.state === 'Updating'\">\r\n            <div class=\"state state_Created\">{{reservation.state | reservationState | uppercase}}</div>\r\n          </td>\r\n          <td contenteditable=\"false\" *ngIf=\"reservation.state !== 'Confirmed' && reservation.state !== 'Created' && reservation.state !== 'Updating' && reservation.state !== 'Started' && reservation.state !== 'Extended'\">\r\n            <div class=\"state state_NotConfirmed\">{{reservation.state | reservationState | uppercase}}</div>\r\n          </td>\r\n          <td contenteditable=\"false\" class=\"no-highlight \">\r\n            <!-- <button *ngIf=\"reservation.startButtonVisible\" type=\"button\" class=\"btn btn-primary\" (click)=\"doAction($event, reservation)\">{{'CAPTION-START' | translate}}</button> -->\r\n            <button mat-raised-button class=\"v-btn-primary\" *ngIf=\"reservation.startButtonVisible\" (click)=\"doAction($event, reservation)\">{{'CAPTION-START' | translate}}</button>\r\n            <div *ngIf=\"reservation.startButtonVisible && reservation.closeButtonVisible\" style=\"margin-top:5px\" >\r\n            </div>\r\n            <!-- <button *ngIf=\"reservation.closeButtonVisible\" type=\"button\" class=\"btn btn-primary\" (click)=\"doAction($event, reservation)\">{{'CAPTION-CLOSE' | translate}}</button> -->\r\n            <button mat-raised-button class=\"v-btn-primary\" *ngIf=\"reservation.closeButtonVisible\" (click)=\"doAction($event, reservation)\">{{'CAPTION-CLOSE' | translate}}</button>\r\n            <!-- <button *ngIf=\"reservation.stopButtonVisible\" type=\"button\" class=\"btn btn-primary\" (click)=\"doAction($event, reservation)\">{{'CAPTION-STOP' | translate}}</button> -->\r\n            <button mat-raised-button class=\"v-btn-primary\" *ngIf=\"reservation.stopButtonVisible\" (click)=\"doAction($event, reservation)\">{{'CAPTION-STOP' | translate}}</button>\r\n            <button mat-raised-button class=\"v-btn-primary\" *ngIf=\"reservation.deleteButtonVisible\" (click)=\"doAction($event, reservation)\">{{'CAPTION-DELETE' | translate}}</button>\r\n          </td>\r\n        </tr>\r\n      </table>\r\n    </ng-template>\r\n    <ng-template #elseBlock>\r\n      <div *ngIf=\"!loading\">\r\n        <p>\r\n          <font color='black'>\r\n            <i>{{'NO_RESERVATION' | translate}}</i>\r\n          </font>\r\n        </p>\r\n      </div>\r\n    </ng-template>\r\n  </div>\r\n  <div class=\"col-xs-12\">\r\n    <h5 class=\"warning\" *ngIf=\"mustShowModificationImpossibleWarning\">{{'MODIFICATION_FAILED' | translate}}</h5>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 1218:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r\n  <h3 class=\"text-center font-weight-bold py-4 bg-primary card-heading\" style=\"margin-top: 0;\">{{'TITLE-MY-RESERVATIONS' | translate}}</h3>\r\n  <div class=\"col-xs-12 \">\r\n    <div class=\"row\">\r\n      <app-my-reservations-master [selectedReservation]=\"selectedReservation\" (onSelectReservation)='onSelectReservation($event)'></app-my-reservations-master>\r\n    </div>\r\n  </div>\r\n  <div class=\"col-xs-12 \" style=\"border: solid 0.5px rgb(107, 107, 107); width:100%;margin-bottom: 10px\"></div>\r\n  <div class=\"col-xs-12 \">\r\n    <div  class=\"row\">\r\n      <app-my-reservations-detail [selectedReservation]=\"selectedReservation\" (onSelectReservation)='onSelectReservation($event)'\r\n        [selectedStartDate]=\"selectedStartDate\" [selectedEndDate]=\"selectedEndDate\">\r\n      </app-my-reservations-detail>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 1219:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-xs-12 main-div div-gradient \">\r\n  <div class=\"col-xs-12\">\r\n    <div class=\"col-xs-12\">\r\n      <label>{{'FAVOURITE-PLACES-TITLE' | translate}}</label>\r\n    </div>\r\n    <div class=\"col-xs-6\">\r\n      <app-place-selector [selectedResourceType]=\"selectedResourceType\" [selectedPrimary]=\"selectedPrimary\"\r\n        (onSelectPrimary)='onSelectPrimary($event)' [selectedSecondary]=\"selectedSecondary\" (onSelectSecondary)='onSelectSecondary($event)'></app-place-selector>\r\n    </div>\r\n    <div class=\"col-xs-3\" style=\"position: relative;bottom: 0px\">\r\n      \r\n        <button mat-raised-button class=\"v-btn-primary pull-left\"  (click)=\"validate($event)\"\r\n      style=\"position: relative;top: 40px;\">{{'CAPTION-VALIDATE' | translate}}</button>\r\n\r\n      <!-- <button type=\"button\" class=\"btn btn-primary pull-left\" (click)=\"validate($event)\"\r\n        style=\"position: relative;top: 40px;\">{{'CAPTION-VALIDATE' | translate}}</button> -->\r\n    </div>\r\n    <div class=\"col-xs-3\">\r\n      <h5 class=\"warning\" *ngIf=\"mustShowOKWarning\">{{'FAVOURITE-PLACES-UPDATED-WARNING' | translate}}</h5>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 1220:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r\n  <h3 class=\"text-center font-weight-bold py-4 bg-primary card-heading\" style=\"margin-top: 0;\">{{'MY-SETTINGS-TITLE' | translate}}</h3>\r\n  <div class=\"col-xs-12\">\r\n\r\n    <div class=\"row\">\r\n      <app-my-settings-favourite-places></app-my-settings-favourite-places>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 1221:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"margin-top: 20px\">\r\n    <ul class=\"nav linkPage\">\r\n        <li>\r\n            <div style=\"text-align:center\">\r\n\r\n                <!-- <img *ngIf=\"!logoTenant\" src=\"assets/images/ENGIE_ineo_gradient_BLUE_RGB.png\" alt=\"Engie Ineo\" height=\"75\" width=\"124\" /> -->\r\n                <img *ngIf=\"logoTenant\" src=\"{{logoTenant}}\" alt=\"{{labelTenant}}\" width=\"124\" />\r\n                <!-- <p style=\"text-align:center\"> -->\r\n                <!-- <p>\r\n                    <font face='Arial' size='1' color='Gray'>\r\n                        <i>{{labelTenant}}</i>\r\n                    </font>\r\n                </p> -->\r\n                <!-- </p> -->\r\n            </div>\r\n        </li>\r\n        <li >\r\n            <div title=\"Accueil\" class =\"currentVersion\" style=\"text-align:center;width: 124;\">\r\n                v. {{globals.currentVersion}}\r\n            </div>\r\n        </li>\r\n        <br />\r\n\r\n        <ul class=\"nav\" *ngFor=\"let x of records\">\r\n            <li class=\"mainMenuElement\" >\r\n                <a [ngClass]=\"calculateClasses(x.label)\">\r\n                    <i class=\"fa fa-2x {{x.Icon}}\" style=\"margin-right: 5px; width: 30px\"></i>\r\n                    {{x.label | translate}}\r\n                </a>\r\n            </li>\r\n            <ul class=\"nav\" *ngFor=\"let y of x.content\">\r\n                <li >\r\n                    <!-- <a routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{ exact: true }\" style=\"padding-left: 55px\"\r\n                        routerLink=\"{{y.PageUrl}}\">{{y.KeyName | translate}}</a> -->\r\n\r\n\r\n\r\n                    <a routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{ exact: true }\" routerLink=\"{{y.PageUrl}}\">\r\n                        <i class=\"fa fa-2x \" style=\"margin-right: 5px; width: 30px\"></i>\r\n                        {{y.KeyName | translate}}\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </ul>\r\n        <ul class=\"nav\">\r\n            <li style=\"cursor: pointer;\">\r\n                <!-- <h5 style=\"color: grey\"><i class=\"fa fa-2x fa-power-off\" style=\"margin-right: 5px\"></i>\r\n                    <a (click)=\"logout()\">{{ 'DISCONNECT' | translate}}</a>\r\n                </h5> -->\r\n                <a (click)=\"logout()\">\r\n                    <i class=\"fa fa-2x fa-power-off\" style=\"margin-right: 5px; width: 30px\"></i>\r\n                    {{ 'DISCONNECT' | translate}}\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </ul>\r\n</div>"

/***/ }),

/***/ 1222:
/***/ (function(module, exports) {

module.exports = "<img #imgRef class=\"img-responsive\" >"

/***/ }),

/***/ 1223:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-xs-12 main-div div-gradient \">\r\n  <div class=\"col-xs-4\" title =\"{{'TITLE-DATE-START' | translate}}\">\r\n    <label>{{'CAPTION-DATE-START' | translate}}</label>\r\n    <br>\r\n    <input type=\"date\" (keydown)=\"testDateValid($event)\"  class=\"\" [(ngModel)]=\"start_date_string\" (focusout)=\"startDateSelected()\"  />\r\n    <br>\r\n    <br>\r\n    <input type=\"time\" (keydown)=\"testDateValid($event)\" class=\"\" [(ngModel)]=\"start_time_string\" (focusout)=\"startDateSelected()\"   />\r\n  </div>\r\n  <div class=\"col-xs-4\" title =\"{{'TITLE-DATE-END' | translate}}\">\r\n    <label>{{'CAPTION-DATE-END' | translate}}</label> \r\n    <br>\r\n    <input type=\"date\" (keydown)=\"testDateValid($event)\"  class=\"\" [(ngModel)]=\"end_date_string\" (focusout)=\"endDateSelected()\"  />\r\n    <br>\r\n    <br>\r\n    <input type=\"time\" (keydown)=\"testDateValid($event)\" class=\"\" [(ngModel)]=\"end_time_string\" (focusout)=\"endDateSelected()\"  />\r\n  </div>\r\n  <div class=\"col-xs-4\">\r\n    <h5 class=\"warning\" *ngIf=\"mustShowDateStartWarning\">{{'DATE-START-WARNING' | translate}}</h5>\r\n    <h5 class=\"warning\" *ngIf=\"mustShowDateEndWarning\">{{'DATE-END-WARNING' | translate}}</h5>\r\n    <h5 class=\"warning\" *ngIf=\"mustShowDateMaxWarning\">{{'DATE-MAX-WARNING' | translate}}</h5>\r\n  </div>\r\n  <br>\r\n  <br>\r\n</div>"

/***/ }),

/***/ 1224:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-xs-12 main-div div-gradient \">\r\n    <div class=\"col-xs-6\">\r\n      <label>{{'TITLE-PLACE' | translate}}</label>\r\n      <div title=\"{{'TITLE-PLACE-SELECTOR' | translate}}\">\r\n        <select (ngModelChange)=\"changePrimary($event)\" [(ngModel)]=\"selectedPrimaryLabel\">\r\n          <option value=\"0\" selected> </option>\r\n          <option *ngFor=\"let prim of primaryList\">{{prim.label}} </option>\r\n        </select>\r\n        <img *ngIf=\"selectedPrimary\" style=\"height: 16px;\" src=\"assets/images/searchbar_cancel_blue.png\" (click)=\"clearSelectedPrimary($event)\" />\r\n      </div>\r\n    </div>\r\n    \r\n    <div class=\"col-xs-6\" *ngIf=\"secondaryList && secondaryList.length > 0\">\r\n      <label>{{secondaryTypelabel}}</label>\r\n      <div title=\"{{'TITLE-PLACE-SELECTOR' | translate}}\" >\r\n        <select (ngModelChange)=\"changeSecondary($event)\" [(ngModel)]=\"selectedSecondaryLabel\">\r\n          <option value=\"0\" selected> </option>\r\n          <option *ngFor=\"let secondary of secondaryList\">{{secondary.label}} </option>\r\n        </select>\r\n        <img *ngIf=\"selectedSecondary\" style=\"height: 16px;\" src=\"assets/images/searchbar_cancel_blue.png\" (click)=\"clearSelectedSecondary($event)\" />\r\n      </div>\r\n    </div>\r\n  </div>"

/***/ }),

/***/ 1225:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-xs-12 main-div div-gradient \" style=\"height: 192px\">\r\n    <div class=\"col-xs-6\">\r\n        <label>{{'TITLE-RESOURCE-TYPE' | translate}}</label>\r\n        <div title=\"{{'TITLE-RESOURCE-TYPE-SELECTOR' | translate}}\">\r\n            <select (ngModelChange)=\"changeResourceType($event)\" [(ngModel)]=\"selectedResourceTypeLabel\">\r\n                <option value=\"0\" selected> </option>\r\n                <option *ngFor=\"let prim of resourceTypeList\">{{prim.label}} </option>\r\n            </select>\r\n            <img *ngIf=\"selectedResourceType\" style=\"height: 16px;\" src=\"assets/images/searchbar_cancel_blue.png\" (click)=\"clearSelectedResourceType($event)\" />\r\n        </div>\r\n    </div>\r\n    <div class=\"col-xs-6\" *ngIf=\"caracList.length !== 0\">\r\n        <!-- <label>{{'TITLE-CHARACTERISTICS' | translate}}</label> -->\r\n        <div title=\"{{'TITLE-CHARACTERISTICS-SELECTOR' | translate}}\" class=\"carac-div \">\r\n            <table>\r\n                <tbody>\r\n                    <tr *ngFor=\"let carac of caracList;let index = index\" style=\"margin-top: 0px;margin-bottom:0px\">\r\n                        <td width=\"180px\" >\r\n                            <!-- <label size=\"35\">{{carac.label}} </label> -->\r\n                            <!-- <label class=pull-right style=\"margin-right: 10px; font-weight: normal;font-size: smaller\">{{carac.label}}</label> -->\r\n                            <span class=pull-right style=\"margin-right: 20px; font-weight: normal;font-size: smaller\">{{carac.label}}</span>\r\n                        </td>\r\n                        <!-- <td>&nbsp;</td> -->\r\n                        <td>\r\n                            <input size=\"5\" *ngIf=\"carac.type === 'long_type'\" type=\"text\" (keypress)=\"OnlyNumbers($event)\"\r\n                                [(ngModel)]=\"caracList[index].value\" (ngModelChange)=\"caracChanged($event)\" />\r\n                            <input size=\"5\" *ngIf=\"carac.type === 'double_type'\" type=\"text\" (keypress)=\"OnlyDecimal($event)\"\r\n                                [(ngModel)]=\"caracList[index].value\" (ngModelChange)=\"caracChanged($event)\" />\r\n                            <input size=\"5\" *ngIf=\"carac.type === 'string_type'\" type=\"text\" [(ngModel)]=\"caracList[index].value\"\r\n                                (ngModelChange)=\"caracChanged($event)\" />\r\n                            <input *ngIf=\"carac.type === 'boolean_type'\" type=\"checkbox\" id=\"chk+{{index}}\" name=\"chkdemo+{{index}}\" [(ngModel)]=\"caracList[index].value\" \r\n                                (ngModelChange)=\"caracChanged($event)\" />\r\n                            <label *ngIf=\"carac.type === 'boolean_type'\" for=\"chk+{{index}}\"></label>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <!-- </li>\r\n            </ul> -->\r\n    </div>\r\n</div>"

/***/ }),

/***/ 1226:
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"loading\"></ngx-loading>\r\n<div *ngIf=\"selectedSearchResource\" class=\"col-xs-12 main-div div-gradient\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-4 parent\">\r\n      <!-- Carousel -->\r\n      <div class=\"child\">\r\n        <carousel style=\"cursor: pointer;\" *ngIf=\"picturesList\" [noWrap]=\"true\" [interval]=\"false\">\r\n          <slide ngbSlide *ngFor=\"let picture of picturesList\">\r\n            <a (click)=\"showPictureFullScreen(picture)\">\r\n              <img [src]=\"picture.imgData\" alt=\"{{picture.description}}\"\r\n                style=\"max-height:150px; margin:0 auto;cursor: pointer\">\r\n            </a>\r\n            <div>\r\n              <p class=\"desc\">{{picture.description}}</p>\r\n            </div>\r\n          </slide>\r\n        </carousel>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-6 parent\">\r\n      <div class=\"child\">\r\n        <div class=\"col-xs-1 child\">\r\n          <!-- Capacité -->\r\n          <div class=\"child\">\r\n            <br>\r\n            <br>\r\n            <h2 class=\"circle \">{{selectedSearchResource.resource?.capacity}}</h2>\r\n            <h5 class=\"buttonCaption\" style=\"margin-top:-5px\">{{'HEADER-CAPACITY' | translate}}</h5>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-xs-10 child\">\r\n          <!-- Caractéristiques -->\r\n          <table align=\"center\">\r\n            <td *ngFor=\"let car of selectedSearchResource.resource?.charac\" class=\"tableIcons\"\r\n              style=\"padding-right:2px;padding-left: 2px\">\r\n              <div *ngIf=\"car.label!='Capacité'\">\r\n                <img *ngIf=\"car.type!='long_type'\" class=\"img-characteristics\" src=\"{{car.pictogramFullPath}}\"\r\n                  title=\"{{car.label}}\" />\r\n                <div *ngIf=\"car.type === 'long_type' ||car.type === 'double_type'\">\r\n                  <img class=\"img-characteristics\" src=\"{{car.pictogramFullPath}}\" title=\"{{car.label}}\" />\r\n                  <label class=\"characCircle \">{{car.value}}</label>\r\n                </div>\r\n              </div>\r\n            </td>\r\n          </table>\r\n          <!-- Adresse -->\r\n          <table align=\"center\">\r\n            <td>\r\n              <div style=\"margin-left: 40px;margin-right:40px;\">\r\n                <h5>{{selectedSearchResource.resource?.address.address}}</h5>\r\n              </div>\r\n            </td>\r\n          </table>\r\n          <!-- Boutons d'action -->\r\n          <table style=\"margin-top: 10px\" align=\"center\">\r\n            <td class=\"tableIcons\" style=\"padding-right:4px;padding-left: 4px\">\r\n              <div>\r\n                <button mat-raised-button class=\"v-btn-primary\" style=\"width: 60px\" on-click=\"showLocalization()\">\r\n                  <img src=\"assets/images/localization.png\" height=\"20\" style=\"margin-top: -5px\" alt=\"Localisation\" />\r\n                </button>\r\n                <h5 class=\"buttonCaption\">{{'TITLE-SHOW-LOCATION' | translate}}</h5>\r\n              </div>\r\n            </td>\r\n            <td *ngIf=\"selectedSearchResource.resource?.map_url\" class=\"tableIcons\"\r\n              style=\"padding-right:4px;padding-left: 4px\">\r\n              <div>\r\n                <button mat-raised-button class=\"v-btn-primary\" style=\"width: 60px\" on-click=\"showMapwize()\">\r\n                  <img src=\"assets/images/maps_128.png\" height=\"20\" style=\"margin-top: -5px\" alt=\"Guidage\" />\r\n                </button>\r\n                <h5 class=\"buttonCaption\">{{'TITLE-SHOW-DETAILED-MAP' | translate}}</h5>\r\n              </div>\r\n            </td>\r\n            <td *ngIf=\"selectedSearchResource.resource?.resource_type?.bookable_type== 'Bookable'\" class=\"tableIcons\"\r\n              style=\"padding-right:4px;padding-left: 4px\">\r\n              <div>\r\n                <button mat-raised-button class=\"v-btn-primary\" style=\"width: 60px\" on-click=\"showCalendar()\">\r\n                  <img src=\"assets/images/calendar.png\" height=\"20\" style=\"margin-top: -5px\" alt=\"Guidage\" />\r\n                </button>\r\n                <h5 class=\"buttonCaption\">{{'TITLE-CALENDAR' | translate}}</h5>\r\n              </div>\r\n            </td>\r\n\r\n          </table>\r\n        </div>\r\n        <div class=\"col-xs-1 child\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-2 parent\">\r\n      <!-- Disponibilité -->\r\n      <div class=\"col-xs-12 child\">\r\n        <br>\r\n        <br>\r\n        <h5 style=\"padding-right:5%;padding-left:5%\">\r\n          <div *ngIf=\"selectedSearchResource.is_Available_Data_Reliable\">\r\n            <div *ngIf=\"selectedSearchResource.isAvailale\" class=\"avail avail_Available\">\r\n              {{'CAPTION-AVAILABILITY_AVAILABLE' | translate}}\r\n            </div>\r\n            <div *ngIf=\"!selectedSearchResource.isAvailale\" class=\"avail avail_Unavailable\">\r\n              {{'CAPTION-AVAILABILITY_UNAVAILABLE' | translate}}</div>\r\n          </div>\r\n          <div *ngIf=\"!selectedSearchResource.is_Available_Data_Reliable\">\r\n            <div *ngIf=\"selectedSearchResource.isAvailale\" class=\"avail avail_Unknown\">\r\n              {{'CAPTION-AVAILABILITY_UNKNOWN' | translate}}</div>\r\n          </div>\r\n        </h5>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-4 parent\" style=\"height:120px;\">\r\n      <!-- Infos ressource (type ressource, nom, place tree) -->\r\n      <div class=\"child\">\r\n        <h5>{{selectedSearchResource.resource?.resource_type?.label}}</h5>\r\n        <h2 style=\"color:#00aaff;font-weight: bold \">{{selectedSearchResource.resource?.label}}</h2>\r\n        <h5>\r\n          <i>{{selectedSearchResource.placeTreeLabel}}</i>\r\n        </h5>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-6 parent\" style=\"height:120px;\">\r\n      <!-- Invités -->\r\n      <div *ngIf=\"selectedSearchResource.resource?.resource_type?.bookable_type== 'Bookable'\" class=\"child\">\r\n        <label>{{'TITLE-ATTENDEES' | translate}}</label>\r\n        <br>\r\n        <!-- <input type=\"text\" class=\"attendeesList\" [(ngModel)]=\"attendees\" (ngModelChange)=\"attendeesChanged()\" (focusout)=\"attendeesFocusLost()\"/> -->\r\n        <textarea rows=\"3\" cols=\"180\" wrap=\"soft\" [(ngModel)]=\"attendees\" (ngModelChange)=\"attendeesChanged()\"\r\n          (focusout)=\"attendeesFocusLost()\"></textarea>\r\n        <h5 class=\"warning\" *ngIf=\"attendeesShowError\">{{'EMAIL-VERIFICATION-ERROR' | translate}}</h5>\r\n\r\n      </div>\r\n    </div>\r\n    <div class=\"col-xs-2 parent\" style=\"height:120px;\">\r\n      <!-- bouton Réserver  -->\r\n      <div *ngIf=\"selectedSearchResource.resource?.resource_type?.bookable_type== 'Bookable'\" class=\"child\">\r\n        <button mat-raised-button class=\"v-btn-primary\" style=\"width: 100px\" (click)=\"doReserve($event)\"\r\n          [disabled]=\"!reservationValid\">{{'CAPTION-RESERVE' | translate}}</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- <div *ngIf=\"reportsList.length === 0\" class=\"row reports-div\">\r\n    Cette ressource ne fait l'objet d'aucun signalement actif.\r\n  </div>\r\n  <div *ngIf=\"reportsList.length > 0\" class=\"row reports-div\">\r\n    Liste des signalements :\r\n    <br>\r\n    {{reportsList | json}}\r\n  </div> -->\r\n\r\n\r\n  <div id=\"table\" class=\"row reports-div\">\r\n    <ng-container *ngIf=\"reportsList.length !== 0; then thenBlock; else elseBlock\">\r\n    </ng-container>\r\n    <ng-template #thenBlock>\r\n      <p>\r\n        <label class=\"pull-left\" >\r\n          {{'REPORTS-LIST' | translate}} ({{reportsList.length}})\r\n        </label>\r\n    <table class=\"table table-wrapper div-gradient\" style=\"width:100%;margin-bottom: 0\">\r\n        <tr style=\"width:100%\">\r\n          <th class=\"text-center\" style=\"width:15%\">{{'REPORT-FAMILY' | translate}}</th>\r\n          <th class=\"text-center\" style=\"width:15%\">{{'REPORT-TYPE' | translate}}</th>\r\n          <th class=\"text-center\" style=\"width:15%\">{{'REPORT-CREATION-DATE' | translate}}</th>\r\n          <th class=\"text-center\" style=\"width:10%\">{{'REPORT-STATE' | translate}}</th>\r\n          <th class=\"text-center\" style=\"width:250px\">{{'REPORT-DESCRIPTION' | translate}}</th>\r\n        </tr>\r\n        <tr style=\"cursor: pointer;\" *ngFor=\"let report of reportsList; let id = index\">\r\n          <td contenteditable=\"false\">{{report.incident_type.family_label}}</td>\r\n          <td contenteditable=\"false\">{{report.incident_type.label}}</td>\r\n          <td contenteditable=\"false\">{{report.create_date | date: 'dd/MM/yy HH:mm' }}</td>\r\n          <td contenteditable=\"false\">{{report.report_state | translate}}</td>\r\n          <td contenteditable=\"false\">{{report.description}}</td>\r\n        </tr>\r\n      </table>\r\n    </ng-template>\r\n    <ng-template #elseBlock>\r\n      <div *ngIf=\"!loading\">\r\n        <p>\r\n          <font color='black'>\r\n            <i>{{'NO-REPORT' | translate}}</i>\r\n          </font>\r\n        </p>\r\n      </div>\r\n    </ng-template>\r\n  </div>\r\n</div>"

/***/ }),

/***/ 1227:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"selectedSearchResource\" class=\"pull-right\">\r\n  <!-- <ngx-loading [show]=\"loading\"></ngx-loading> -->\r\n  <label *ngIf=\"loading\" style=\"margin-top:30px;margin-right:10px\"\r\n    style=\"display: inline-block;vertical-align: bottom\"><i>{{'REFRESHING' | translate}}</i></label>\r\n  <!-- <button type=\"button\" class=\"btn btn-primary\" (click)=\"deselectResource()\" style=\"margin-top:20px;margin-right:10px\">\r\n    <i class=\"fa fa-close\"></i>\r\n  </button> -->\r\n  <button mat-raised-button class=\"v-btn-primary\" (click)=\"deselectResource()\"\r\n    style=\"width:35px;margin-top:20px;margin-right:10px\">\r\n    <i class=\"fa fa-close\"></i>\r\n  </button>\r\n\r\n</div>\r\n<div *ngIf=\"!selectedSearchResource\" class=\"col-xs-12 main-div div-gradient\">\r\n  <ngx-loading [show]=\"loading\"></ngx-loading>\r\n  <!-- <h3 class=\"text-center font-weight-bold text-uppercase py-4\">Réserver</h3> -->\r\n  <!-- <div class=\"card-bodye\"> -->\r\n  <div id=\"table\">\r\n    <!-- <table class=\"table table-dark table-bordered table-responsive-md table-striped text-center\"> -->\r\n    <ng-container *ngIf=\"searchResourceList.length !== 0; then thenBlock; else elseBlock\">\r\n    </ng-container>\r\n    <ng-template #thenBlock>\r\n      <table class=\"table table-wrapper\" style=\"width:100%\">\r\n        <tr style=\"width:100%\">\r\n          <th class=\"text-center\" style=\"width:10%\">{{'HEADER-CAPACITY' | translate}}</th>\r\n          <th class=\"text-center\" style=\"width:15%\">{{'HEADER-TYPE' | translate}}</th>\r\n          <th class=\"text-center\" style=\"width:40%\">{{'HEADER-RESOURCE' | translate}}</th>\r\n          <th class=\"text-center\" style=\"width:250px\">{{'HEADER-CHARACTERISTICS' | translate}}</th>\r\n          <th class=\"text-center\" style=\"width:15%\">{{'HEADER-AVAILABILITY' | translate}}</th>\r\n          <!-- <th class=\"text-center\" >{{'HEADER-CAPACITY' | translate}}</th>\r\n          <th class=\"text-center\" >{{'HEADER-TYPE' | translate}}</th>\r\n          <th class=\"text-center\" >{{'HEADER-RESOURCE' | translate}}</th>\r\n          <th class=\"text-center\" >{{'HEADER-CHARACTERISTICS' | translate}}</th>\r\n          <th class=\"text-center\" >{{'HEADER-AVAILABILITY' | translate}}</th> -->\r\n        </tr>\r\n        <tr style=\"cursor: pointer;\" *ngFor=\"let searchResource of searchResourceList; let id = index\" class=\"clickable\"\r\n          (click)=\"searchResourceSelected(searchResource)\"\r\n          [class.highlighted]=\"selectedSearchResource && searchResource.resource?.id === selectedSearchResource.resource?.id\">\r\n          <!-- [ngClass]=\"{ 'highlighted': selectedSearchResource && searchResource.id === selectedSearchResource.id}\" -->\r\n          <td contenteditable=\"false\" class=\"circle \">{{searchResource.resource?.capacity}}</td>\r\n          <td contenteditable=\"false\">{{searchResource.resource?.resource_type?.label}}</td>\r\n          <!-- <td contenteditable=\"false\"><h4>{{searchResource.resource?.label}}</h4></td> -->\r\n          <td contenteditable=\"false\">\r\n            <div>\r\n              <h4 style=\"color:#00aaff;font-weight: bold;margin-top: 0px  \">{{searchResource.resource?.label}}</h4>\r\n              <h5>\r\n                <i>{{searchResource.placeTreeLabel}}</i>\r\n              </h5>\r\n            </div>\r\n          </td>\r\n          <td contenteditable=\"false\">\r\n            <!-- <div *ngFor=\"let car of searchResource.resource?.charac\">\r\n              <img style=\"height: 18px;\" src=\"{{car.pictogramFullPath}}\"  />\r\n            </div> -->\r\n            <table align=\"center\">\r\n          <td *ngFor=\"let car of searchResource.resource?.charac\" class=\"tableIcons \"\r\n            style=\"padding-right:2px;padding-left: 2px\">\r\n            <div *ngIf=\"car.label!='Capacité'\">\r\n              <img *ngIf=\"car.type!='long_type'\" class=\"img-characteristics\" src=\"{{car.pictogramFullPath}}\"\r\n                title=\"{{car.label}}\" />\r\n              <div *ngIf=\"car.type === 'long_type' ||car.type === 'double_type'\">\r\n                <img class=\"img-characteristics\" src=\"{{car.pictogramFullPath}}\" title=\"{{car.label}}\" />\r\n                <label class=\"characCircle \">{{car.value}}</label>\r\n              </div>\r\n            </div>\r\n          </td>\r\n      </table>\r\n      </td>\r\n      <!-- <td contenteditable=\"false\">{{searchResource.isAvailale}}</td> -->\r\n      <td contenteditable=\"false\" style=\"align-content: center\">\r\n        <div *ngIf=\"searchResource.is_Available_Data_Reliable\">\r\n          <div *ngIf=\"searchResource.isAvailale\" class=\"avail avail_Available\">\r\n            {{'CAPTION-AVAILABILITY_AVAILABLE' | translate}}</div>\r\n          <div *ngIf=\"!searchResource.isAvailale\" class=\"avail avail_Unavailable\">\r\n            {{'CAPTION-AVAILABILITY_UNAVAILABLE' | translate}}</div>\r\n        </div>\r\n        <div *ngIf=\"!searchResource.is_Available_Data_Reliable\">\r\n          <div *ngIf=\"searchResource.isAvailale\" class=\"avail avail_Unknown\">\r\n            {{'CAPTION-AVAILABILITY_UNKNOWN' | translate}}</div>\r\n        </div>\r\n      </td>\r\n\r\n      </tr>\r\n      </table>\r\n    </ng-template>\r\n    <ng-template #elseBlock>\r\n      <div *ngIf=\"!loading\">\r\n        <p>\r\n          <font color='black'>\r\n            <i>{{'NO-RESOURCE' | translate}}</i>\r\n          </font>\r\n        </p>\r\n      </div>\r\n    </ng-template>\r\n  </div>\r\n  <!-- <br>\r\n  <label>selectedStartDate : </label>{{selectedStartDate}}\r\n  <br>\r\n  <label>selectedEndDate : </label>{{selectedEndDate}}\r\n  <br>\r\n  <label>selectedSearchText : </label>{{selectedSearchText}}\r\n  <br>\r\n  <label>selectedResourceType : </label>{{selectedResourceType | json}}\r\n  <br>\r\n  <label>caracList : </label>{{caracList | json}}\r\n  <br>\r\n  <label>selectedPrimary : </label>{{selectedPrimary | json}}\r\n  <br>\r\n  <label>selectedSecondary : </label>{{selectedSecondary | json}} -->\r\n  <!-- {{todaysDate}} -->\r\n\r\n</div>"

/***/ }),

/***/ 1228:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r\n    <h3 class=\"text-center font-weight-bold py-4 bg-primary card-heading\" style=\"margin-top: 0;\">{{'TITLE-SEARCH' | translate}}</h3>\r\n    <div class=\"row\" style=\"margin-top:-10px\">\r\n        <app-search-text-selector class=\"col-xs-9\" style=\"margin-left: 0\" [selectedSearchText]=\"selectedSearchText\"\r\n            (onSelectSearchText)='onSelectSearchText($event)' (onEnterKeyPressed)='onEnterKeyPressed($event)' ></app-search-text-selector>\r\n\r\n        <button mat-raised-button class=\"v-btn-primary pull-right col-xs-3\" style=\"margin-top: 10px;margin-right: 20px;\"\r\n            (click)=\"search($event)\">{{'CAPTION-SEARCH'\r\n            | translate}}</button>\r\n    </div>\r\n\r\n    <div class=\"row\" style=\"margin-right: 0px; margin-top:10px\">\r\n        <div class=col-xs-6>\r\n            <app-resource-type-selector [selectedResourceType]=\"selectedResourceType\" where=\"reservation\" [selectedPrimary]=\" selectedPrimary\"\r\n                [selectedSecondary]=\"selectedSecondary\" [caracList]=\"caracList\" (onSelectCaracList)='onSelectCaracList($event)'\r\n                (onSelectResourceType)='onSelectResourceType($event)'></app-resource-type-selector>\r\n        </div>\r\n        <div class=\"col-xs-6\">\r\n            <div class=\"row\">\r\n                <app-dates-selector [selectedStartDate]=\" selectedStartDate\" (onSelectStartDate)='onSelectStartDate($event)'\r\n                    [selectedEndDate]=\"selectedEndDate\" (onSelectEndDate)='onSelectEndDate($event)'></app-dates-selector>\r\n            </div>\r\n            <div class=row>\r\n                <app-place-selector [selectedResourceType]=\"selectedResourceType\" [selectedPrimary]=\"selectedPrimary\"\r\n                    (onSelectPrimary)='onSelectPrimary($event)' [selectedSecondary]=\"selectedSecondary\"\r\n                    (onSelectSecondary)='onSelectSecondary($event)'></app-place-selector>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-xs-12 \" style=\"border: solid 0.5px rgb(107, 107, 107); width:100%;margin-top: 10px\"></div>\r\n    <div class=\"col-xs-12 \">\r\n        <div class=\"row\">\r\n            <app-search-page-resources [selectedSearchResource]=\"selectedSearchResource\" (onSelectSearchResource)='onSelectSearchResource($event)'\r\n                (onEnterKeyPressed)='onEnterKeyPressed($event)' [selectedStartDate]=\"selectedStartDate\" pageType = 0 \r\n                [selectedEndDate]=\"selectedEndDate\" [selectedSearchText]=\"selectedSearchText\" [selectedResourceType]=\"selectedResourceType\"\r\n                [selectedPrimary]=\"selectedPrimary\" [selectedSecondary]=\"selectedSecondary\" [caracList]=\"caracList\"></app-search-page-resources>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-xs-12 \">\r\n        <app-search-page-detail [selectedSearchResource]=\"selectedSearchResource\" (onSelectSearchResource)='onSelectSearchResource($event)'\r\n            [selectedStartDate]=\"selectedStartDate\" [selectedEndDate]=\"selectedEndDate\"></app-search-page-detail>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 1229:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-xs-12 main-div div-gradient\">\r\n  <div class=\"col-xs-12\" title=\"{{'TITLE-SEARCH-TEXT-SELECTOR' | translate}}\">\r\n    <!-- <label >{{'TITLE-SEARCH-TEXT' | translate}}</label>\r\n      <br> -->\r\n    <!-- <img style=\"height: 20px;\" src=\"assets/images/searchbar_magnifier_blue.png\" />\r\n    <input type=\"text\" size=\"90%\" [(ngModel)]=\"selectedSearchText\" (ngModelChange)=\"searchTextSelected()\" (keyup.enter)=\"triggerLaunchSearch()\"\r\n      style=\"margin-left:10px;margin-right: 10px\">\r\n    <img *ngIf=\"selectedSearchText\" style=\"height: 16px;\" src=\"assets/images/searchbar_cancel_blue.png\" (click)=\"clearSearchText($event)\" /> -->\r\n    <img class=\"img-magnifier\" style=\"width: 20px;\" src=\"assets/images/searchbar_magnifier_blue.png\" />\r\n    <img class=\"img-clear\" *ngIf=\"selectedSearchText\" \r\n    style=\"width: 16px;\" \r\n    src=\"assets/images/searchbar_cancel_blue.png\" \r\n    (click)=\"clearSearchText($event)\" />\r\n\r\n\r\n    <span>\r\n      <input type=\"text\" [(ngModel)]=\"selectedSearchText\" (ngModelChange)=\"searchTextSelected()\" (keyup.enter)=\"triggerLaunchSearch()\"  >\r\n  </span>\r\n\r\n  </div>\r\n</div>"

/***/ }),

/***/ 1230:
/***/ (function(module, exports) {

module.exports = "<div (click)='dismiss()' class=\"modal-header\">\r\n  <button mat-raised-button class=\"v-btn-primary pull-right\" (click)=\"dismiss()\"\r\n    style=\"width:35px;margin-top:5px;margin-bottom:5px\">\r\n    <i class=\"fa fa-close\"></i>\r\n  </button>\r\n</div>\r\n<div class=\"col-xs-12\" style=\"background-color: white;height: 560px\">\r\n  <kendo-scheduler [kendoSchedulerBinding]=\"events\" [selectedDate]=\"selectedDate\" [selectedViewIndex]=\"1\"\r\n    [showWorkHours]=\"true\" [workDayStart]=\"workDayStart\" [workDayEnd]=\"workDayEnd\" [loading]=\"loading\"\r\n    [currentTimeMarker]=\"false\" (eventClick)=\"onEventClick($event)\" style=\"height: 540px;\">\r\n    <ng-template kendoSchedulerEventTemplate let-event=\"event\">\r\n      <div *ngIf=\"event.title\" style=\"margin-left: 10px;\">\r\n        <span>{{ event.title }}</span>\r\n      </div>\r\n      <div style=\"margin-left: 10px;\">\r\n        <span>{{ event.description }}</span>\r\n      </div>\r\n    </ng-template>\r\n    <kendo-scheduler-day-view [startTime]=\"startTime\" [endTime]=\"endTime\">\r\n    </kendo-scheduler-day-view>\r\n\r\n    <kendo-scheduler-week-view [startTime]=\"startTime\" [endTime]=\"endTime\">\r\n    </kendo-scheduler-week-view>\r\n\r\n    <kendo-scheduler-month-view>\r\n    </kendo-scheduler-month-view>\r\n\r\n    <kendo-scheduler-agenda-view>\r\n    </kendo-scheduler-agenda-view>\r\n\r\n    <kendo-scheduler-messages today=\"{{'CALENDAR-TODAY' | translate}}\" allDay=\"{{'CALENDAR-ALL-DAY' | translate}}\"\r\n      dayViewTitle=\"{{'CALENDAR-DAY-VIEW-TITLE' | translate}}\"\r\n      weekViewTitle=\"{{'CALENDAR-WEEK-VIEW-TITLE' | translate}}\"\r\n      monthViewTitle=\"{{'CALENDAR-MONTH-VIEW-TITLE' | translate}}\"\r\n      agendaViewTitle=\"{{'CALENDAR-AGENDA-VIEW-TITLE' | translate}}\" dateHeader=\"{{'CALENDAR-DATE-HEADER' | translate}}\"\r\n      timeHeader=\"{{'CALENDAR-TIME-HEADER' | translate}}\" eventHeader=\"{{'CALENDAR-EVENT-HEADER' | translate}}\"\r\n      showWorkDay=\"{{'CALENDAR-SHOW-WORK-DAY' | translate}}\" showFullDay=\"{{'CALENDAR-SHOW-FULL-DAY' | translate}}\">\r\n    </kendo-scheduler-messages>\r\n  </kendo-scheduler>\r\n</div>"

/***/ }),

/***/ 1231:
/***/ (function(module, exports) {

module.exports = "<div (click)='dismiss()' class=\"modal-header\" >\r\n  <button mat-raised-button class=\"v-btn-primary pull-right\" (click)=\"dismiss()\"\r\n    style=\"width:35px;margin-top:5px;margin-bottom:5px\">\r\n    <i class=\"fa fa-close\"></i>\r\n  </button>\r\n</div>\r\n<div id=\"map-container\" class=\"col-xs-12 z-depth-1-half map-container\" style=\"height: 550px\">\r\n    <div id=\"showMapwize\"></div>\r\n</div>"

/***/ }),

/***/ 1232:
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"resp-container\" style=\"height:1000px; width:1900px\">\r\n  <iframe style=\"float:center; height: 99%; width: 98%; position: absolute\" [src]=\"url\"></iframe>\r\n</div> -->\r\n<!--Google map-->\r\n<!-- style=\"height: 600px\" -->\r\n<div (click)='dismiss()' class=\"modal-header\" >\r\n  <button mat-raised-button class=\"v-btn-primary pull-right\" (click)=\"dismiss()\"\r\n    style=\"width:35px;margin-top:5px;margin-bottom:5px\">\r\n    <i class=\"fa fa-close\"></i>\r\n  </button>\r\n</div>\r\n<div id=\"map-container\" class=\"col-xs-12 z-depth-1-half map-container\" style=\"height: 550px\">\r\n\r\n  <iframe [src]=\"url\" frameborder=\"0\" style=\"border:0\" allowfullscreen></iframe>\r\n</div>"

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_user_local_model__ = __webpack_require__(834);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__models_user_local_model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_module__ = __webpack_require__(833);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__core_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_http_service__ = __webpack_require__(230);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__services_http_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_path_service__ = __webpack_require__(151);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__services_path_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alert_service__ = __webpack_require__(150);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__services_alert_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_app_configuration_service__ = __webpack_require__(229);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__services_app_configuration_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_tenant_configuration_service__ = __webpack_require__(389);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__services_tenant_configuration_service__["a"]; });







//# sourceMappingURL=index.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__location__ = __webpack_require__(224);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceWithChildren; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var PlaceWithChildren = (function (_super) {
    __extends(PlaceWithChildren, _super);
    function PlaceWithChildren(obj) {
        var _this = _super.call(this, obj) || this;
        _this.id_place_type = obj && obj.id_place_type || null;
        _this.child_places = obj && obj.child_places || null;
        return _this;
    }
    return PlaceWithChildren;
}(__WEBPACK_IMPORTED_MODULE_0__location__["a" /* Location */]));

//# sourceMappingURL=place-with-children.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__location__ = __webpack_require__(224);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Place; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Place = (function (_super) {
    __extends(Place, _super);
    function Place(obj) {
        var _this = _super.call(this, obj) || this;
        _this.id_place_type = obj && obj.id_place_type || null;
        return _this;
    }
    return Place;
}(__WEBPACK_IMPORTED_MODULE_0__location__["a" /* Location */]));

//# sourceMappingURL=place.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Reservation; });

var Reservation = (function () {
    function Reservation(obj) {
        var _this = this;
        this.charac_complement_type = [];
        this.attendees = [];
        this.id = obj && obj.id || null;
        this.tenantId = obj && obj.tenantId || null;
        this.id_resource = (obj && obj.id_resource) || null;
        this.start_date = obj && obj.start_date || null;
        this.start_date_string = obj && this.dateToDateString(obj.start_date) || null;
        this.start_time_string = obj && this.dateToTimeString(obj.start_date) || null;
        this.end_date = obj && obj.end_date || null;
        this.end_date_string = obj && this.dateToDateString(obj.end_date) || null;
        this.end_time_string = obj && this.dateToTimeString(obj.end_date) || null;
        this.user_ref = obj && obj.user_ref || null;
        this.real_start_date = obj && obj.real_start_date || null;
        this.real_end_date = obj && obj.real_end_date || null;
        this.state = obj && obj.state || null;
        this.gateway_state = obj && obj.gateway_state || null;
        this.create_date = obj && obj.create_date || null;
        this.last_state_modification_date = obj && obj.last_state_modification_date || null;
        if (obj && obj.charac_complement_type) {
            obj && obj.charac_complement_type.forEach(function (child) {
                _this.charac_complement_type.push(child);
            });
        }
        if (obj && obj.attendees) {
            obj && obj.attendees.forEach(function (child) {
                _this.attendees.push(child);
            });
        }
    }
    Reservation.prototype.dateToDateString = function (epoch) {
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCMilliseconds(epoch);
        var momentObj = __WEBPACK_IMPORTED_MODULE_0_moment__(d);
        return momentObj.format("YYYY-MM-DD");
    };
    Reservation.prototype.dateToTimeString = function (epoch) {
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCMilliseconds(epoch);
        var momentObj = __WEBPACK_IMPORTED_MODULE_0_moment__(d);
        return momentObj.format("HH:mm");
    };
    return Reservation;
}());

//# sourceMappingURL=reservation.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__place__ = __webpack_require__(146);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResource; });

var SearchResource = (function () {
    function SearchResource(obj) {
        var _this = this;
        this.place_tree = [];
        this.available_places = obj && obj.available_places || null;
        this.isAvailale = obj && obj.isAvailale || null;
        this.is_Available_Data_Reliable = obj && obj.is_Available_Data_Reliable || null;
        if (obj && obj.place_tree) {
            obj.place_tree.forEach(function (c) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_0__place__["a" /* Place */](c);
                _this.place_tree.push(c);
            });
        }
        this.present_peoples = obj && obj.present_peoples || null;
        this.tenantId = obj && obj.tenantId || null;
        this.total_places = obj && obj.total_places || null;
        this.resource = obj && obj.resource || null;
        this.placeTreeLabel = this.computePlaceTreeLabel(this.resource.id_place_parent);
    }
    SearchResource.prototype.computePlaceTreeLabel = function (id_place_parent) {
        var lab = "";
        // this.place_tree.reverse().forEach(function (p) {
        //     lab += p.label + ", "
        // })
        var mustConcatenate = false;
        this.place_tree.reverse().forEach(function (p) {
            //  We start to concatenate only when we have reached the actual parent 
            // (for some reason, some places might be at the same level as the resource 
            // but should not be considered as part of the place tree)
            if (p.id === id_place_parent) {
                mustConcatenate = true;
            }
            if (mustConcatenate) {
                lab += p.label + ", ";
            }
        });
        if (lab != "") {
            lab = lab.substring(0, lab.length - 2);
        }
        return lab;
    };
    return SearchResource;
}());

//# sourceMappingURL=searchResource.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_modules_authentication_services_auth_guard__ = __webpack_require__(227);
/* unused harmony reexport AuthGuard */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_authentication_services_auth_service__ = __webpack_require__(228);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1_app_modules_authentication_services_auth_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_authentication_module__ = __webpack_require__(828);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_authentication_module__["a"]; });



//# sourceMappingURL=index.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertService = (function () {
    function AlertService() {
        this.alertEmitter = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"]('');
    }
    AlertService.prototype.alertEmitterSubscriber = function () {
        return this.alertEmitter;
    };
    AlertService.prototype.alert = function (message) {
        // console.log('alert',message);
        this.alertEmitter.next(message);
    };
    return AlertService;
}());
AlertService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], AlertService);

//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ 1505:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1507:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(790);


/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes_api__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_configuration_service__ = __webpack_require__(229);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PathService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PathService = (function () {
    // inject our ROUTES
    function PathService(appConfigurationService) {
        this.appConfigurationService = appConfigurationService;
        this.apiPathWeb = '';
        //constructor() {
        //this.apiPathWeb = environment.api;
        this.apiPathWeb = this.appConfigurationService.urlAPIV1;
    }
    PathService.prototype.getApiPath = function (key) {
        var ret = '';
        ret = this.apiPathWeb;
        if (__WEBPACK_IMPORTED_MODULE_1__routes_api__["a" /* API_ROUTES_NAME */][key]) {
            ret += __WEBPACK_IMPORTED_MODULE_1__routes_api__["a" /* API_ROUTES_NAME */][key];
        }
        return ret;
    };
    PathService.prototype.logout = function () {
        localStorage.clear();
        //this.router.navigate(['login']);
        window.location.href = this.appConfigurationService.urlV2 + 'login';
    };
    return PathService;
}());
PathService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__app_configuration_service__["a" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_configuration_service__["a" /* AppConfigurationService */]) === "function" && _a || Object])
], PathService);

var _a;
//# sourceMappingURL=path.service.js.map

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mapwize__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mapwize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mapwize__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapwizeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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



var MapwizeService = (function () {
    function MapwizeService(appConfigService) {
        this.appConfigService = appConfigService;
        this.mapwize = this.appConfigService.mapwize;
        this.apiKey = this.mapwize.api_key;
        this.organizationId = this.mapwize.organization_id;
        this.universeId = this.mapwize.universe_id;
        __WEBPACK_IMPORTED_MODULE_2_mapwize__["apiKey"](this.apiKey);
    }
    MapwizeService.prototype.mapCreation = function () {
        return this.map = __WEBPACK_IMPORTED_MODULE_2_mapwize__["map"]({
            container: this.container
        }, {
            venueId: this.venueId,
            userPositionControl: false
        });
    };
    MapwizeService.prototype.getVenuesByOrga = function () {
        return __WEBPACK_IMPORTED_MODULE_2_mapwize__["Api"].getVenues({
            organizationId: this.organizationId
        });
    };
    MapwizeService.prototype.getPlacesByVenue = function () {
        return __WEBPACK_IMPORTED_MODULE_2_mapwize__["Api"].getPlaces({
            venueId: this.venueId,
            universeId: this.universeId
        });
    };
    MapwizeService.prototype.searchVenueByName = function (myVenue) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var venue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVenuesByOrga()
                            .then(function (venues) {
                            for (var i = 0; i < venues.length; i++) {
                                if (venues[i].name === myVenue.label) {
                                    _this.venueId = venues[i]._id;
                                    venue = venues[i]._id;
                                    break;
                                }
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, venue];
                }
            });
        });
    };
    MapwizeService.prototype.searchPlaceByName = function (selectedResource) {
        return __awaiter(this, void 0, void 0, function () {
            var place;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPlacesByVenue()
                            .then(function (places) {
                            for (var i = 0; i < places.length; i++) {
                                if (places[i].name === selectedResource.resource.identifier) {
                                    place = places[i];
                                    break;
                                }
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, place];
                }
            });
        });
    };
    MapwizeService.prototype.clearMap = function () {
        this.mapInstance = null;
        var mapDiv = document.getElementById(this.container);
        mapDiv.innerHTML = "";
    };
    return MapwizeService;
}());
MapwizeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _a || Object])
], MapwizeService);

var _a;
//# sourceMappingURL=mapwize.service.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_location_place_with_children__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_rxjs__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__node_modules_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_tree_tree_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_model_location_sub_resource_type__ = __webpack_require__(101);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceSelectorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PlaceSelectorComponent = (function () {
    function PlaceSelectorComponent(treeService) {
        this.treeService = treeService;
        this.primaryList = [];
        this.secondaryList = [];
        this.fullPrimaryList = [];
        this.fullSecondaryList = [];
        this.preferredPlaces = [];
        this.placeTypesList = [];
        this.onSelectPrimary = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onSelectSecondary = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.secondaryTypelabel = "";
    }
    PlaceSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2__node_modules_rxjs__["Observable"].forkJoin(this.treeService.getAllPlaces(), this.treeService.getFavouritePlaces(), this.treeService.getPlaceTypeList())
            .subscribe(function (data) {
            if (data) {
                _this.primaryList = data[0];
                _this.fullPrimaryList = data[0];
                _this.preferredPlaces = data[1];
                _this.placeTypesList = data[2];
                if (_this.preferredPlaces.length > 0) {
                    var primaryPlace_1 = _this.preferredPlaces.find(function (p) { return p.id_place_parent === null; });
                    //Fill primary
                    if (primaryPlace_1) {
                        _this.selectedPrimaryLabel = primaryPlace_1.label;
                        _this.changePrimary(primaryPlace_1.label);
                        if (_this.preferredPlaces.length > 1) {
                            var secondaryPlace = _this.preferredPlaces.find(function (p) { return p.id_place_parent === primaryPlace_1.id; });
                            //Fill secondary
                            _this.selectedSecondaryLabel = secondaryPlace.label;
                            _this.changeSecondary(secondaryPlace.label);
                        }
                    }
                }
                else {
                    _this.clearSelectedSecondary();
                    _this.clearSelectedPrimary();
                }
            }
        });
    };
    PlaceSelectorComponent.prototype.filterPlacesByResourceType = function (resourceType) {
        var _this = this;
        this.filterPrimaryList(resourceType);
        this.filterSecondaryList(resourceType);
        var isPrimaryEmpty;
        var isSecondaryEmpty;
        if (this.selectedPrimary) {
            if (!this.primaryList.find(function (o) { return o.id == _this.selectedPrimary.id; })) {
                isPrimaryEmpty = true;
            }
        }
        if (this.selectedSecondary) {
            if (!this.secondaryList.find(function (o) { return o.id == _this.selectedSecondary.id; })) {
                isSecondaryEmpty = true;
            }
        }
        setTimeout(function () {
            if (isPrimaryEmpty || isSecondaryEmpty) {
                if (isPrimaryEmpty) {
                    _this.onSelectPrimary.emit(null);
                }
                if (isSecondaryEmpty) {
                    _this.onSelectSecondary.emit(null);
                }
            }
        }, 100);
    };
    PlaceSelectorComponent.prototype.filterPrimaryList = function (resourceType) {
        if (resourceType && this.fullPrimaryList) {
            this.primaryList = this.fullPrimaryList.filter(function (o) { return resourceType.places.some(function (p) { return p.id == o.id; }); });
        }
        else {
            this.primaryList = this.fullPrimaryList;
        }
    };
    PlaceSelectorComponent.prototype.filterSecondaryList = function (resourceType) {
        var _this = this;
        if (resourceType && this.fullSecondaryList) {
            if (this.selectedPrimary) {
                this.secondaryList = this.fullSecondaryList.filter(function (o) { return resourceType.places.some(function (p) { return p.id == o.id; }); });
            }
            else {
                this.secondaryList = [];
            }
        }
        else {
            this.secondaryList = this.fullSecondaryList;
        }
        if (this.secondaryList.length > 0) {
            var placeType = this.placeTypesList.find(function (p) { return p.id === _this.secondaryList[0].id_place_type; });
            if (placeType) {
                this.secondaryTypelabel = placeType.label;
            }
            else {
                this.secondaryTypelabel = "";
            }
        }
    };
    PlaceSelectorComponent.prototype.changePrimary = function (prim) {
        var _this = this;
        if (this.primaryList.find(function (con) { return con.label == prim; })) {
            this.selectedPrimary = this.primaryList.find(function (con) { return con.label == prim; });
            this.fullSecondaryList = this.primaryList.find(function (con) { return con.label == prim; }).child_places;
            this.filterSecondaryList(this.selectedResourceType);
            if (this.selectedSecondary) {
                if (!this.secondaryList.some(function (o) { return o.id == _this.selectedSecondary.id; })) {
                    this.selectedSecondary = null;
                }
            }
        }
        else {
            this.selectedPrimary = null;
            this.selectedSecondary = null;
            this.selectedSecondaryLabel = null;
            this.secondaryList = null;
        }
        //It takes time for SearchPageRessources to be aware that selectedPrimary has changed
        setTimeout(function () {
            _this.onSelectPrimary.emit(_this.selectedPrimary);
            _this.onSelectSecondary.emit(_this.selectedSecondary);
        }, 100);
    };
    PlaceSelectorComponent.prototype.changeSecondary = function (prim) {
        var _this = this;
        if (this.secondaryList.find(function (con) { return con.label == prim; })) {
            this.selectedSecondary = this.secondaryList.find(function (con) { return con.label == prim; });
        }
        else {
            this.selectedSecondary = null;
        }
        //It takes time for SearchPageRessources to be aware that selectedSecondary has changed
        setTimeout(function () {
            _this.onSelectSecondary.emit(_this.selectedSecondary);
        }, 100);
    };
    PlaceSelectorComponent.prototype.clearSelectedPrimary = function () {
        this.selectedPrimary = null;
        this.selectedPrimaryLabel = null;
        this.changePrimary(null);
    };
    PlaceSelectorComponent.prototype.clearSelectedSecondary = function () {
        this.selectedSecondary = null;
        this.selectedSecondaryLabel = null;
        this.changeSecondary(null);
    };
    return PlaceSelectorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__model_location_place_with_children__["a" /* PlaceWithChildren */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__model_location_place_with_children__["a" /* PlaceWithChildren */]) === "function" && _a || Object)
], PlaceSelectorComponent.prototype, "selectedPrimary", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__model_location_place_with_children__["a" /* PlaceWithChildren */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__model_location_place_with_children__["a" /* PlaceWithChildren */]) === "function" && _b || Object)
], PlaceSelectorComponent.prototype, "selectedSecondary", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_app_model_location_sub_resource_type__["a" /* ResourceType */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_app_model_location_sub_resource_type__["a" /* ResourceType */]) === "function" && _c || Object)
], PlaceSelectorComponent.prototype, "selectedResourceType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PlaceSelectorComponent.prototype, "onSelectPrimary", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PlaceSelectorComponent.prototype, "onSelectSecondary", void 0);
PlaceSelectorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-place-selector',
        template: __webpack_require__(1224),
        styles: [__webpack_require__(1160)]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_tree_tree_service__["a" /* TreeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_tree_tree_service__["a" /* TreeService */]) === "function" && _d || Object])
], PlaceSelectorComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=place-selector.component.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    bi_debug: true,
    production: false,
    debug_report: false,
    configurationFile: 'application-config.json'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Globals; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Globals = (function () {
    function Globals() {
    }
    Object.defineProperty(Globals.prototype, "currentVersion", {
        get: function () {
            return "6.4.0";
        },
        enumerable: true,
        configurable: true
    });
    return Globals;
}());
Globals = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Globals);

//# sourceMappingURL=globals.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Location; });
var Location = (function () {
    function Location(obj) {
        this.id = obj && obj.id || null;
        this.label = obj && obj.label || null;
        this.id_place_parent = obj && obj.id_place_parent || null;
        this.resource_types = obj && obj.resource_types || null;
    }
    return Location;
}());

//# sourceMappingURL=location.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__microsoft_microsoft_graph_client_lib_src_index__ = __webpack_require__(807);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__microsoft_microsoft_graph_client_lib_src_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__microsoft_microsoft_graph_client_lib_src_index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_localStorage_services_office365LocalStorage_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_modules_authentication_modules_zenoffice_services_zenoffice_auth_service__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__transformers_office365_transformer__ = __webpack_require__(832);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_modules_localStorage__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_modules_core__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphHelperService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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








var GraphHelperService = (function () {
    function GraphHelperService(office365LocalStorageService, infoLocalStorageService, zenOfficeService, appConfigurationService, pathService, tenantConfigurationService) {
        this.office365LocalStorageService = office365LocalStorageService;
        this.infoLocalStorageService = infoLocalStorageService;
        this.zenOfficeService = zenOfficeService;
        this.appConfigurationService = appConfigurationService;
        this.pathService = pathService;
        this.tenantConfigurationService = tenantConfigurationService;
        // public clientID: string = '90b9dbe2-5471-4d3a-858d-d6e62cf4d02e';
        this.graphScopes = ['user.read', 'Calendars.ReadWrite'];
        //this.clientID = this.tenantConfigurationService.MicrosoftApplicationId;
        //if (this.clientID === undefined) {
        this.clientID = this.appConfigurationService.clientID;
        //}
        this.init();
    }
    GraphHelperService.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idToken, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.clientApplication.getUser();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.clientApplication.loginRedirect(this.graphScopes)];
                    case 2:
                        idToken = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        window.alert('Error during login:\n');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GraphHelperService.prototype.me = function () {
        return this.graphClient.api('/me').get().then(function (res) {
            return res;
        }).catch(function (err) {
            return null;
        });
    };
    GraphHelperService.prototype.init = function () {
        var _this = this;
        if (this.office365LocalStorageService.tokenOffice365) {
            this.authToken = this.office365LocalStorageService.tokenOffice365;
        }
        // tslint:disable-next-line:semicolon
        this.logger = new Msal.Logger(function (logLevel, message, piiEnabled) {
            console.log(message);
        }, { level: Msal.LogLevel.Verbose, correlationId: '12345' });
        if (this.office365LocalStorageService.userOffice365) {
            if (this.office365LocalStorageService.userOffice365.mail) {
                console.log('>>> Let s try to call the tenant service now (mail = ' + this.office365LocalStorageService.userOffice365.mail + ')');
                console.log('>>> clientID BEFORE = ' + this.clientID);
                //var toto = this.tenantConfigurationService;
                // Only now can we load the tenant configuration
                //CONFIGURATION TENANT
                this.tenantConfigurationService.load().then(function (data) {
                    console.log('Success callback', data);
                }).catch(function (err) {
                    console.log('Error callback', err);
                });
            }
            else {
                console.log('>>> user exists but we don t have the mail info yet');
            }
        }
        else {
            console.log('>>> No use to call the tenant service now : we don t have the login yet');
        }
        console.log('>>>> Calling new Msal.UserAgentApplication with clientID = ' + this.clientID);
        this.clientApplication = new Msal.UserAgentApplication(this.clientID, null, function (errorDesc, token, error, tokenType) { return __awaiter(_this, void 0, void 0, function () {
            var _a, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, this.clientApplication.acquireTokenSilent(this.graphScopes)];
                    case 1:
                        _a.authToken = _b.sent();
                        this.office365LocalStorageService.tokenOffice365 = this.authToken;
                        return [4 /*yield*/, this.processAuth()];
                    case 2:
                        _b.sent();
                        this.infoLocalStorageService.isWaitingForAuthToComplete = false;
                        return [4 /*yield*/, this.zenOfficeService.loginOAuth()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); }, { cacheLocation: 'localStorage', logger: this.logger });
        this.graphClient = __WEBPACK_IMPORTED_MODULE_1__microsoft_microsoft_graph_client_lib_src_index__["Client"].init({
            authProvider: function (done) {
                if (typeof _this.authToken === 'undefined') {
                    done({ err: 'No auth token' }, null);
                }
                else {
                    done(null, _this.authToken); // first parameter takes an error if you can't get an access token
                }
            }
        });
    };
    GraphHelperService.prototype.processAuth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user365, user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user365 = this.office365LocalStorageService.userOffice365;
                        console.log('User Office 365', user365);
                        if (!(user365 === null)) return [3 /*break*/, 5];
                        user = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.me()];
                    case 2:
                        user = _a.sent();
                        console.log('Ask for User Office 365 Info', user365);
                        // Save the user to localStorage.
                        user365 = __WEBPACK_IMPORTED_MODULE_4__transformers_office365_transformer__["a" /* transformFromOfficeToUserInfo */](user);
                        this.office365LocalStorageService.userOffice365 = user365;
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log('Failed');
                        console.log('Error is', error_3);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        user365 = this.office365LocalStorageService.userOffice365;
                        _a.label = 6;
                    case 6: return [2 /*return*/, user365];
                }
            });
        });
    };
    return GraphHelperService;
}());
GraphHelperService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_app_modules_localStorage__["a" /* InfoLocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_modules_localStorage__["a" /* InfoLocalStorageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_app_modules_authentication_modules_zenoffice_services_zenoffice_auth_service__["a" /* ZenOfficeAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_modules_authentication_modules_zenoffice_services_zenoffice_auth_service__["a" /* ZenOfficeAuth */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["e" /* PathService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["e" /* PathService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["d" /* TenantConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["d" /* TenantConfigurationService */]) === "function" && _f || Object])
], GraphHelperService);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=graphHelper.service.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_localStorage__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage_services_office365LocalStorage_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZenOfficeAuth; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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





var ZenOfficeAuth = (function () {
    function ZenOfficeAuth(httpService, infoLocalStorageService, office365LocalStorageService, router, appConfigurationService, pathService) {
        this.httpService = httpService;
        this.infoLocalStorageService = infoLocalStorageService;
        this.office365LocalStorageService = office365LocalStorageService;
        this.router = router;
        this.appConfigurationService = appConfigurationService;
        this.pathService = pathService;
        this.refreshTokenTimeoutInMinute = 10;
        this.createRefreshTokenTimer();
    }
    ZenOfficeAuth.prototype.ngOnDestroy = function () {
        clearInterval(this.interval);
    };
    ZenOfficeAuth.prototype.login = function (login, password, askRemember) {
        return __awaiter(this, void 0, void 0, function () {
            var dataToSend, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dataToSend = {
                            login: login, password: password, ask_remember_me: askRemember, remember_me_token: ''
                        };
                        return [4 /*yield*/, this.httpService.post(this.pathService.getApiPath('LOGIN'), dataToSend).toPromise()];
                    case 1:
                        response = _a.sent();
                        this.httpService.saveTokenInStorage(response);
                        return [2 /*return*/];
                }
            });
        });
    };
    ZenOfficeAuth.prototype.loginOAuth = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.requestZenOfficeToken()];
                    case 1:
                        _a.sent();
                        window.location.href = this.appConfigurationService.urlAccueil;
                        return [2 /*return*/];
                }
            });
        });
    };
    ZenOfficeAuth.prototype.isAuthenticated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isTokenFilled, isTokenValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isTokenFilled = (this.infoLocalStorageService.token) ? true : false;
                        if (!isTokenFilled) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.isTokenValid()];
                    case 1:
                        isTokenValid = _a.sent();
                        if (!isTokenValid) return [3 /*break*/, 2];
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, this.httpService.refreshZenOfficeToken()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.isTokenValid()];
                    case 4: 
                    // console.log("token expire and relogin");
                    return [2 /*return*/, _a.sent()];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ZenOfficeAuth.prototype.createRefreshTokenTimer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.interval = setInterval(function () {
                    var isTokenFilled = (_this.infoLocalStorageService.token) ? true : false;
                    if (isTokenFilled) {
                        _this.httpService.refreshZenOfficeToken();
                    }
                }, this.refreshTokenTimeoutInMinute * 60 * 1000);
                return [2 /*return*/];
            });
        });
    };
    ZenOfficeAuth.prototype.isTokenValid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.httpService.get(this.pathService.getApiPath('RESERVATION')).toPromise()];
                    case 1:
                        response = _a.sent();
                        if (response.ok) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ZenOfficeAuth;
}());
ZenOfficeAuth = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["c" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["c" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_app_modules_localStorage__["a" /* InfoLocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_modules_localStorage__["a" /* InfoLocalStorageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["e" /* PathService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["e" /* PathService */]) === "function" && _f || Object])
], ZenOfficeAuth);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=zenoffice-auth.service.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__(228);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        return this.authService.isZenOfficeAuthenticated().then(function (isAuth) {
            if (isAuth) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_modules_authentication_modules_office365__ = __webpack_require__(829);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_modules_authentication_modules_zenoffice_services_zenoffice_auth_service__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_modules_localStorage__ = __webpack_require__(71);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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









var AuthService = (function () {
    function AuthService(office365Service, zenOfficeAuth, router, infoLocalStorageService, appConfigurationService) {
        var _this = this;
        this.office365Service = office365Service;
        this.zenOfficeAuth = zenOfficeAuth;
        this.router = router;
        this.infoLocalStorageService = infoLocalStorageService;
        this.appConfigurationService = appConfigurationService;
        this.temporaryPermission = '';
        this._isOnLoginPageAuthenticated$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["BehaviorSubject"](false);
        var waiting = this.infoLocalStorageService.isWaitingForAuthToComplete;
        if (waiting) {
            setTimeout(function () {
                _this.infoLocalStorageService.isWaitingForAuthToComplete = 'false';
                _this._waitingForAuthentication$.next(false);
            }, 5000);
        }
        this._waitingForAuthentication$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["BehaviorSubject"](waiting);
    }
    AuthService.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.infoLocalStorageService.isWaitingForAuthToComplete = 'true';
                        this._waitingForAuthentication$.next(true);
                        return [4 /*yield*/, this.office365Service.login()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.loginZenOffice = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._waitingForAuthentication$.next(false);
                        return [4 /*yield*/, this.zenOfficeAuth.loginOAuth()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.isAuthenticated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isOffice365Auth, isZenOfficeAuth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isOffice365Authenticated()];
                    case 1:
                        isOffice365Auth = _a.sent();
                        return [4 /*yield*/, this.isZenOfficeAuthenticated()];
                    case 2:
                        isZenOfficeAuth = _a.sent();
                        if (!isOffice365Auth && isZenOfficeAuth) {
                            this.logout();
                        }
                        else if (isOffice365Auth && isZenOfficeAuth) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    AuthService.prototype.isZenOfficeAuthenticated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isZenOfficeAuth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.zenOfficeAuth.isAuthenticated()];
                    case 1:
                        isZenOfficeAuth = _a.sent();
                        // console.log('Zen Office is authenticated with ZenOffice', isZenOfficeAuth);
                        return [2 /*return*/, isZenOfficeAuth];
                }
            });
        });
    };
    AuthService.prototype.isOffice365Authenticated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isOffice365Auth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.office365Service.isAuthenticated()];
                    case 1:
                        isOffice365Auth = _a.sent();
                        // console.log('Zen Office is authenticated with Office365', isOffice365Auth);
                        return [2 /*return*/, isOffice365Auth];
                }
            });
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.clear();
        window.location.href = this.appConfigurationService.urlV2 + 'login';
        //this.router.navigate(['login']);
    };
    AuthService.prototype.getPermission = function (feature, value) {
        // todo : implementation
        return true;
    };
    AuthService.prototype.getRoutePermission = function (route) {
        // todo : implementation
        return true;
    };
    AuthService.prototype.waitingForAuthenticationSubscriber = function () {
        return this._waitingForAuthentication$;
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_app_modules_authentication_modules_office365__["a" /* Office365Service */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_modules_authentication_modules_office365__["a" /* Office365Service */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6_app_modules_authentication_modules_zenoffice_services_zenoffice_auth_service__["a" /* ZenOfficeAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_modules_authentication_modules_zenoffice_services_zenoffice_auth_service__["a" /* ZenOfficeAuth */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_8_app_modules_localStorage__["a" /* InfoLocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_app_modules_localStorage__["a" /* InfoLocalStorageService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _e || Object])
], AuthService);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(154);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfigurationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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



var AppConfigurationService = (function () {
    function AppConfigurationService(http) {
        this.http = http;
    }
    AppConfigurationService.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get('assets/' + __WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].configurationFile).toPromise()];
                    case 1:
                        result = _a.sent();
                        // console.log('configuration');
                        this.configuration = result.json();
                        // console.log(this.configuration);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Object.defineProperty(AppConfigurationService.prototype, "clientID", {
        get: function () {
            return this.configuration.clientID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppConfigurationService.prototype, "urlAccueil", {
        get: function () {
            return this.configuration.urlAccueil;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppConfigurationService.prototype, "urlAPIV1", {
        get: function () {
            return this.configuration.urlAPIV1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppConfigurationService.prototype, "urlV2", {
        get: function () {
            return this.configuration.urlV2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppConfigurationService.prototype, "env", {
        get: function () {
            return this.configuration.env;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppConfigurationService.prototype, "pictoAddress", {
        get: function () {
            return this.configuration.pictoAddress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppConfigurationService.prototype, "mapwize", {
        get: function () {
            return this.configuration.mapwize;
        },
        enumerable: true,
        configurable: true
    });
    return AppConfigurationService;
}());
AppConfigurationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    /**
     * this service manages global configuration of the application
     */
    ,
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AppConfigurationService);

var _a;
//# sourceMappingURL=app-configuration.service.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_modules_core_services_path_service__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_modules_localStorage__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_modules_localStorage_services_office365LocalStorage_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__ = __webpack_require__(681);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__alert_service__ = __webpack_require__(150);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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










var HttpService = HttpService_1 = (function (_super) {
    __extends(HttpService, _super);
    function HttpService(backend, options, router, infoLocalStorageService, office365LocalStorageService, alertService, pathService) {
        var _this = _super.call(this, backend, options) || this;
        _this.router = router;
        _this.infoLocalStorageService = infoLocalStorageService;
        _this.office365LocalStorageService = office365LocalStorageService;
        _this.alertService = alertService;
        _this.pathService = pathService;
        _this.unLocked = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](true);
        _this.authRoute = '';
        _this.buffer = [];
        HttpService_1.instanceCount++;
        // console.log('Started constructor of HttpService (instanceCount=' + HttpService.instanceCount + ')');
        _this.authRoute = _this.pathService.getApiPath('AUTH-ROUTE');
        return _this;
        // console.log('Done constructor of HttpService');
    }
    HttpService.prototype.logout = function () {
        //localStorage.clear();
        //this.router.navigate(['login']);
        //window.location.href = this.appConfigurationService.urlV2 + 'login';
        this.pathService.logout();
    };
    HttpService.prototype._serverError = function (err) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(err instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */])) return [3 /*break*/, 2];
                        return [4 /*yield*/, err.json()];
                    case 1:
                        error = _a.sent();
                        if (err.status === 404) {
                            return [2 /*return*/, __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw('BACKEND-ERROR-404')];
                        }
                        else if (err.status === 401 && error.error) {
                            return [2 /*return*/, __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error.error)];
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw('BACKEND-ERROR')];
                }
            });
        });
    };
    HttpService.prototype.setupHeader = function (options, userToken) {
        if (!options) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
            options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        }
        else if (options && !options.headers) {
            options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        }
        // todo get authenticationToken
        var authenticationToken = this.infoLocalStorageService.token;
        if (authenticationToken) {
            options.headers.set('Access-Token', authenticationToken);
        }
        if (userToken) {
            options.headers.set('User-Token', userToken);
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('sender', 'fow');
        return options;
    };
    HttpService.prototype.get = function (url, options, userToken) {
        return _super.prototype.get.call(this, url, this.setupHeader(options, userToken)).catch(this.catchAuthError());
    };
    HttpService.prototype.delete = function (url, options, userToken) {
        return _super.prototype.delete.call(this, url, this.setupHeader(options, userToken)).catch(this.catchAuthError());
    };
    HttpService.prototype.post = function (url, body, options, userToken) {
        return _super.prototype.post.call(this, url, body, this.setupHeader(options, userToken)).catch(this.catchAuthError());
    };
    HttpService.prototype.put = function (url, body, options, userToken) {
        return _super.prototype.put.call(this, url, body, this.setupHeader(options, userToken)).catch(this.catchAuthError());
    };
    HttpService.prototype.catchAuthError = function () {
        // we have to pass HttpService's own instance here as `self`
        return function (res) {
            if (res.status === 401) {
                // console.log('401 Unauthorized');
            }
            else if (res.status === 400 && res.json().error) {
                return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(res.json().error);
            }
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(res);
        };
    };
    HttpService.prototype.requestZenOfficeToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, token, dataToSend, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.office365LocalStorageService.userOffice365;
                        token = this.office365LocalStorageService.tokenOffice365;
                        dataToSend = '\"' + token + '\"';
                        return [4 /*yield*/, this.post(this.pathService.getApiPath('LOGIN_OAUTH') + user.mail, dataToSend).toPromise()];
                    case 1:
                        response = _a.sent();
                        this.saveTokenInStorage(response);
                        return [2 /*return*/];
                }
            });
        });
    };
    HttpService.prototype.refreshZenOfficeToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataToSend, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.infoLocalStorageService.rememberMeToken) return [3 /*break*/, 2];
                        dataToSend = {
                            login: '', password: '', ask_remember_me: true, remember_me_token: this.infoLocalStorageService.rememberMeToken
                        };
                        return [4 /*yield*/, this.post(this.pathService.getApiPath('LOGIN'), dataToSend).toPromise()];
                    case 1:
                        response = _a.sent();
                        this.saveTokenInStorage(response);
                        return [3 /*break*/, 3];
                    case 2:
                        this.requestZenOfficeToken();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HttpService.prototype.saveTokenInStorage = function (resp) {
        var data = JSON.parse(resp._body);
        if (data) {
            if (data.token) {
                this.infoLocalStorageService.token = data.token;
            }
            if (data.remember_me_token) {
                this.infoLocalStorageService.rememberMeToken = data.remember_me_token;
            }
        }
    };
    return HttpService;
}(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]));
HttpService.instanceCount = 0;
HttpService = HttpService_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* XHRBackend */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* XHRBackend */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6_app_modules_localStorage__["a" /* InfoLocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_modules_localStorage__["a" /* InfoLocalStorageService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7_app_modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_app_modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_9__alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__alert_service__["a" /* AlertService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5_app_modules_core_services_path_service__["a" /* PathService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_modules_core_services_path_service__["a" /* PathService */]) === "function" && _g || Object])
], HttpService);

var HttpService_1, _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=http.service.js.map

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_tree_tree_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_resource_resource_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_model_location_sub_resource_type__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_model_location_place_with_children__ = __webpack_require__(145);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceTypeSelectorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ResourceTypeSelectorComponent = (function () {
    function ResourceTypeSelectorComponent(treeService, resourceService, translateService) {
        this.treeService = treeService;
        this.resourceService = resourceService;
        this.translateService = translateService;
        this.caracList = [];
        this.onSelectResourceType = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onSelectCaracList = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.resourceTypeList = [];
        this.fullResourceTypeList = [];
    }
    ResourceTypeSelectorComponent.prototype.ngOnInit = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs__["Observable"].forkJoin(this.treeService.getResourceTypeList())
            .subscribe(function (data) {
            if (data) {
                // this.resourceTypeList = [...data[0]]
                data[0].forEach(function (resource) {
                    if (resource.visible_in_search_page && _this.where === "reservation") {
                        _this.resourceTypeList.push(resource);
                        _this.fullResourceTypeList.push(resource);
                    }
                    else if (resource.visible_in_availability_page && _this.where === "availabilities") {
                        _this.resourceTypeList.push(resource);
                        _this.fullResourceTypeList.push(resource);
                    }
                });
                //console.log(this.resourceTypeList);
                // this.resourceTypeList = data[0];
                // this.fullResourceTypeList = data[0];
            }
        });
    };
    ResourceTypeSelectorComponent.prototype.changeResourceType = function (prim) {
        var _this = this;
        if (this.resourceTypeList.find(function (con) { return con.label == prim; })) {
            this.selectedResourceType = this.resourceTypeList.find(function (con) { return con.label == prim; });
            __WEBPACK_IMPORTED_MODULE_1__node_modules_rxjs__["Observable"].forkJoin(this.resourceService.getCaracTypeByResourceType(this.resourceTypeList.find(function (con) { return con.label == prim; }).id))
                .subscribe(function (data) {
                if (data) {
                    _this.caracList = data[0];
                    _this.caracChanged();
                }
                else
                    _this.caracList = [];
                _this.caracChanged();
            });
        }
        else {
            this.caracList = [];
            this.caracChanged();
            this.selectedResourceType = null;
        }
        //It takes time for SearchPageRessources to be aware that selectedResource has changed
        setTimeout(function () {
            // console.log(this.selectedResourceType)
            _this.onSelectResourceType.emit(_this.selectedResourceType);
            //this.caracChanged();
        }, 10);
    };
    ResourceTypeSelectorComponent.prototype.filterResourceTypesByPlace = function (primaryPlace, secondaryPlace) {
        var _this = this;
        if (this.fullResourceTypeList) {
            if (primaryPlace && !secondaryPlace) {
                this.resourceTypeList = this.fullResourceTypeList.filter(function (o) { return primaryPlace.resource_types.some(function (p) { return p.id == o.id; }); });
            }
            else if (secondaryPlace) {
                this.resourceTypeList = this.fullResourceTypeList.filter(function (o) { return secondaryPlace.resource_types.some(function (p) { return p.id == o.id; }); });
            }
            else {
                this.resourceTypeList = this.fullResourceTypeList;
            }
            if (this.selectedResourceType) {
                if (!this.resourceTypeList.some(function (o) { return o.id == _this.selectedResourceType.id; })) {
                    setTimeout(function () {
                        this.onSelectResourceType.emit(null);
                    }, 10);
                }
            }
        }
    };
    ResourceTypeSelectorComponent.prototype.OnlyNumbers = function ($event) {
        var regex = new RegExp(/^[0-9]{1,}$/g);
        var specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft'];
        if (specialKeys.indexOf($event.key) !== -1) {
            return;
        }
        else {
            if (regex.test($event.key)) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    ResourceTypeSelectorComponent.prototype.OnlyDecimal = function ($event) {
        var regex = new RegExp(/^[0-9\.]{1,}$/g);
        var specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft'];
        if (specialKeys.indexOf($event.key) !== -1) {
            return;
        }
        else {
            if (regex.test($event.key)) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    ResourceTypeSelectorComponent.prototype.clearSelectedResourceType = function () {
        this.selectedResourceType = null;
        this.selectedResourceTypeLabel = null;
        this.changeResourceType(null);
        this.onSelectResourceType.emit(this.selectedResourceType);
    };
    ResourceTypeSelectorComponent.prototype.caracChanged = function () {
        this.onSelectCaracList.emit(this.caracList);
    };
    return ResourceTypeSelectorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5_app_model_location_sub_resource_type__["a" /* ResourceType */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_model_location_sub_resource_type__["a" /* ResourceType */]) === "function" && _a || Object)
], ResourceTypeSelectorComponent.prototype, "selectedResourceType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ResourceTypeSelectorComponent.prototype, "where", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6_app_model_location_place_with_children__["a" /* PlaceWithChildren */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_model_location_place_with_children__["a" /* PlaceWithChildren */]) === "function" && _b || Object)
], ResourceTypeSelectorComponent.prototype, "selectedPrimary", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6_app_model_location_place_with_children__["a" /* PlaceWithChildren */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_model_location_place_with_children__["a" /* PlaceWithChildren */]) === "function" && _c || Object)
], ResourceTypeSelectorComponent.prototype, "selectedSecondary", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ResourceTypeSelectorComponent.prototype, "caracList", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ResourceTypeSelectorComponent.prototype, "onSelectResourceType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ResourceTypeSelectorComponent.prototype, "onSelectCaracList", void 0);
ResourceTypeSelectorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-resource-type-selector',
        template: __webpack_require__(1225),
        styles: [__webpack_require__(1161)]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_tree_tree_service__["a" /* TreeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_tree_tree_service__["a" /* TreeService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_resource_resource_service__["a" /* ResourceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_resource_resource_service__["a" /* ResourceService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__node_modules_ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__node_modules_ngx_translate_core__["c" /* TranslateService */]) === "function" && _f || Object])
], ResourceTypeSelectorComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=resource-type-selector.component.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_location_searchResource__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_reservation_reservation_service__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_location_reservation__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_rxjs__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__node_modules_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_resource_resource_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_location_sub_charac_complement_type__ = __webpack_require__(823);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_location_sub_attendee__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ng_bootstrap_ng_bootstrap__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__show_url_show_url_service__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__show_calendar_show_calendar_service__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_services_report_report_service__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_mapwize_mapwize_service__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__show_mapwize_show_mapwize_service__ = __webpack_require__(404);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPageDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var SearchPageDetailComponent = (function () {
    // dateStart: Date = new Date();
    // myDate: string;
    // myTime: string;
    function SearchPageDetailComponent(reservationService, resourceService, reportService, tenantConfigurationService, router, showUrlService, showCalendarService, translateService, appConfigurationService, modalService, mapwizeService, showMapwizeService, config) {
        this.reservationService = reservationService;
        this.resourceService = resourceService;
        this.reportService = reportService;
        this.tenantConfigurationService = tenantConfigurationService;
        this.router = router;
        this.showUrlService = showUrlService;
        this.showCalendarService = showCalendarService;
        this.translateService = translateService;
        this.appConfigurationService = appConfigurationService;
        this.modalService = modalService;
        this.mapwizeService = mapwizeService;
        this.showMapwizeService = showMapwizeService;
        this.selectedStartDate = new Date();
        this.selectedEndDate = new Date();
        this.todaysDate = new Date();
        //errors: any;
        this.loading = false;
        this.picturesList = [];
        this.reportsList = [];
        this.incidentFamilyList = [];
        this.MAPWIZE_BASE_URL = "https://maps.mapwize.io/nosplash#";
        this.attendeesArray = [];
        this.charac_complement_type = [];
        config.wrap = false;
        config.interval = 0;
    }
    SearchPageDetailComponent.prototype.ngOnInit = function () {
        var nextQuarterOfHour = __WEBPACK_IMPORTED_MODULE_13_moment__(new Date()).add(15, 'minutes').toDate();
        this.todaysDate = nextQuarterOfHour;
    };
    SearchPageDetailComponent.prototype.doReserve = function () {
        var _this = this;
        var res = new __WEBPACK_IMPORTED_MODULE_3__model_location_reservation__["a" /* Reservation */]();
        res.id = 0;
        // res.user_ref = "5000101";
        res.user_ref = "";
        res.id_resource = this.selectedSearchResource.resource.id;
        res.start_date = this.selectedStartDate.getTime();
        res.end_date = this.selectedEndDate.getTime();
        res.charac_complement_type = this.charac_complement_type;
        res.state = "Created";
        res.attendees = [];
        this.attendeesArray.forEach(function (att) {
            var newAtt = new __WEBPACK_IMPORTED_MODULE_8__model_location_sub_attendee__["a" /* Attendee */]();
            newAtt.id = null;
            newAtt.email_address = att.trim();
            newAtt.id_reservation = null;
            newAtt.response_type = null;
            res.attendees.push(newAtt);
        });
        this.reservationService.createOrUpdate(res)
            .subscribe(function (result) {
            // console.log(result);
            // Let's disable the Reservation button
            _this.reservationValid = false;
            //Go to My Reservations
            setTimeout(function () {
                // We wait a little bit otherwise the reservationlist won't contain our newly created reservation
                _this.router.navigate(['my-reservations']);
            }, 2000);
        }, function (error) {
            console.log(error);
            //this.errors = error;
        });
        //Sends an event to the web property
        if (this.appConfigurationService.env === "PROD") {
            this.sendEventWeb('Reservation', 'Web', 'WebReservation');
        }
        // if (!this.errors) {
        //   // Let's disable the Reservation button
        //   this.reservationValid = false;
        //   //Go to My Reservations
        //   setTimeout(() => {
        //     // We wait a little bit otherwise the reservationlist won't contain our newly created reservation
        //     this.router.navigate(['my-reservations']);
        //   }, 2000);
        // }
    };
    //Sends an event to Google Analytics
    SearchPageDetailComponent.prototype.sendEventWeb = function (eventCategory, eventAction, eventLabel) {
        window.ga('send', 'event', eventCategory, eventAction, eventLabel);
    };
    SearchPageDetailComponent.prototype.onSelectSearchResource = function () {
        var _this = this;
        if (this.selectedSearchResource && this.selectedSearchResource.resource) {
            this.incidentFamilyList = [];
            __WEBPACK_IMPORTED_MODULE_5__node_modules_rxjs__["Observable"].forkJoin(this.reportService.getIncidentTypeList('Resource', this.selectedSearchResource.resource.id))
                .subscribe(function (data) {
                if (data) {
                    _this.incidentFamilyList = data[0];
                    // this.reportForm.get('incident_family_label').setValue(this.incidentFamilyList.find(o => o.id === this.selectedReport.incident_type.parent_id));
                }
            });
            this.charac_complement_type = [];
            this.selectedSearchResource.resource.complement_type.forEach(function (comp) {
                __WEBPACK_IMPORTED_MODULE_5__node_modules_rxjs__["Observable"].forkJoin(_this.resourceService.getCaracTypeByComplementType(comp.id))
                    .subscribe(function (data) {
                    if (data) {
                        var listeCharacTypeComplementType = data[0];
                        listeCharacTypeComplementType.forEach(function (ctct) {
                            var cct = new __WEBPACK_IMPORTED_MODULE_7__model_location_sub_charac_complement_type__["a" /* CharacComplementType */]();
                            cct.id = ctct.id_complement_type;
                            cct.id_charactype_complement_type = ctct.id;
                            cct.type = ctct.type;
                            switch (ctct.type) {
                                case "long_type":
                                    cct.value = "0";
                                    break;
                                case "double_type":
                                    cct.value = "0";
                                    break;
                                case "string_type":
                                    cct.value = "";
                                    break;
                                case "boolean_type":
                                    cct.value = "false";
                                    break;
                                default:
                                    cct.value = "";
                                    break;
                            }
                            cct.reservation = 0;
                            cct.tenant_id = 0;
                            _this.charac_complement_type.push(cct);
                        });
                    }
                });
            });
            this.computeReservationValid();
            this.loadPictures();
            this.loadReports();
            setTimeout(function () {
                //Force scroll to end of page to make sure the detail is visible 
                window.scrollTo(0, document.body.scrollHeight);
            }, 500);
        }
        var nextQuarterOfHour = __WEBPACK_IMPORTED_MODULE_13_moment__(new Date()).add(15, 'minutes').toDate();
        this.todaysDate = nextQuarterOfHour;
    };
    SearchPageDetailComponent.prototype.attendeesChanged = function () {
        console.log("hiiiiiiii");
        this.attendeesArray = this.attendees.split(";");
        this.validation(false);
    };
    SearchPageDetailComponent.prototype.attendeesFocusLost = function () {
        this.validation(true);
    };
    SearchPageDetailComponent.prototype.validation = function (showMessage) {
        var _this = this;
        var mustShowError = false;
        this.attendeesArray.forEach(function (address) {
            if (!_this.isEmailAddress(address)) {
                mustShowError = true;
            }
        });
        if (mustShowError) {
            this.attendeesListError = true;
            if (showMessage) {
                this.attendeesShowError = true;
                // setTimeout(() => {
                //   this.attendeesShowError = false;
                //   //this.caracChanged();
                // }, 3000);
            }
        }
        else {
            this.attendeesListError = false;
            this.attendeesShowError = false;
        }
        this.computeReservationValid();
    };
    SearchPageDetailComponent.prototype.computeReservationValid = function () {
        this.reservationValid = ((!this.attendeesListError)
            && (this.selectedSearchResource && this.selectedSearchResource.isAvailale));
    };
    SearchPageDetailComponent.prototype.isEmailAddress = function (email) {
        if (email.trim().length > 0) {
            var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var isOk = false;
            // isOk=(email.indexOf("@") !== -1);
            isOk = EMAIL_REGEXP.test(email.trim());
            return isOk;
        }
        else {
            return true;
        }
    };
    SearchPageDetailComponent.prototype.showLocalization = function () {
        //https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed
        this.urlLocalization = "https://maps.google.com/maps?q="
            + this.selectedSearchResource.resource.address.latitude + ","
            + this.selectedSearchResource.resource.address.longitude + "&t=&z=13&ie=UTF8&iwloc=&output=embed";
        // window.open("http://maps.google.com/maps?q="
        //   + this.selectedSearchResource.resource.address.latitude + ","
        //   + this.selectedSearchResource.resource.address.longitude);
        //this.router.navigate(['/show-url'], { queryParams: { url: this.urlLocalization } });
        this.showUrlService.show(this.urlLocalization, 'LOCALIZATION', 'OK')
            .then(function (confirmed) {
            if (confirmed) {
            }
        })
            .catch(function (error) {
            // console.log(error);
        });
    };
    SearchPageDetailComponent.prototype.showMapwize = function () {
        // let Url: string = this.buildMapwizeUrl(this.MAPWIZE_BASE_URL,
        //   this.selectedSearchResource.resource.map_url,
        //   this.tenantConfigurationService.MapwizeAccessKey);
        // this.urlLocalization = Url;
        // // this.router.navigate(['/show-url'], { queryParams: { url: this.urlLocalization } });
        // this.showUrlService.show(
        //   // this.urlLocalization,
        //   '/front/mapwize',
        //   'LOCALIZATION',
        //   'OK')
        //   .then((confirmed) => {
        //     if (confirmed) {
        //     }
        //   })
        //   // .catch(() => console.log('Suppression annulée'));
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        //window.open(Url);
        this.mapwizeService.venueToFind = this.selectedSecondary;
        this.mapwizeService.resourceToFind = this.selectedSearchResource;
        this.showMapwizeService.show(this.selectedSecondary, this.selectedSearchResource)
            .then(function (confirmed) {
            if (confirmed) {
            }
        })
            .catch(function (error) {
            // console.log(error);
        });
    };
    SearchPageDetailComponent.prototype.showCalendar = function () {
        this.showCalendarService.show(this.selectedSearchResource.resource.id, this.selectedSearchResource.resource.label)
            .then(function (confirmed) {
            if (confirmed) {
            }
        })
            .catch(function (error) {
            // console.log(error);
        });
    };
    SearchPageDetailComponent.prototype.buildMapwizeUrl = function (mapwizeBaseUrl, resourceUrl, mapwizeAccessKey) {
        var url = mapwizeBaseUrl + "/p/" + resourceUrl + "?k=" + mapwizeAccessKey + "&l=fr&z=21&embed=true&menu=false";
        return url;
    };
    SearchPageDetailComponent.prototype.loadPictures = function () {
        var _this = this;
        var idResource;
        //let data: any[] = [0];
        var data;
        var data2;
        data = [0];
        this.picturesList = [];
        this.loading = true;
        //Get Data
        this.getPictures()
            .then(function (r) {
            data = r;
            //foreach...
            data.forEach(function (pic) {
                pic.imgData = 'data:image/png;base64,' + pic.data;
            });
            //this.logoTenant = 'data:image/png;base64,' + this.tenantConfigurationService.logoImageData;
            _this.picturesList = data;
            _this.loading = false;
        })
            .catch(function (err) {
            // console.log("err => images non trouvées");
            _this.loading = false;
        });
    };
    SearchPageDetailComponent.prototype.getPictures = function () {
        // keep this for Promise
        var that = this;
        return new Promise(function (resolve, reject) {
            that.resourceService.getPictures(that.selectedSearchResource.resource.id).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject();
            });
        });
    };
    /**
   * Display a base64 URL inside an iframe in another window.
   */
    SearchPageDetailComponent.prototype.showBase64InNewTab = function (base64URL, desc) {
        var win = window.open();
        // win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="text-align:center; '
        // +'border:0; top:0px; left:0px; bottom:0px; right:0px; '
        // +'width:100%; height:100%;" allowfullscreen></iframe>');
        // win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="margin: auto; width: 90%; height:90%; '
        // +'border: 3px solid #000000; padding: 10px; display: block; margin-left: auto; margin-right: auto;" allowfullscreen></iframe>');
        win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="width: 99%; height:99%; '
            + 'display: block; margin-left: auto; margin-right: auto;" allowfullscreen></iframe>');
        setTimeout(function () {
            win.document.title = desc;
        }, 0);
    };
    SearchPageDetailComponent.prototype.showPictureFullScreen = function (img) {
        // e.g This will open an image in a new window
        this.showBase64InNewTab(img.imgData, img.description);
    };
    SearchPageDetailComponent.prototype.loadReports = function () {
        var _this = this;
        var idResource;
        var data;
        var data2;
        data = [0];
        this.reportsList = [];
        if (this.selectedSearchResource) {
            idResource = this.selectedSearchResource.resource.id;
        }
        this.loading = true;
        //Get Data
        this.getReports()
            .then(function (r) {
            data = r;
            data.forEach(function (element) {
                var familyIncident = _this.incidentFamilyList.find(function (o) { return o.id === element.incident_type.parent_id; });
                if (familyIncident) {
                    element.incident_type.family_label = familyIncident.label;
                }
            });
            //Filtering is done in the service method
            _this.reportsList = data; //this.filterReportsList(data);
            _this.loading = false;
        })
            .catch(function (err) {
            console.log("err => signalements non trouvés");
            _this.loading = false;
        });
    };
    // filterReportsList(data: Report[]): Report[] {
    //   let list: Report[] = [];
    //   data.forEach(report => {
    //     if (report.location_type === 'Resource'
    //       && (report.report_state === 'Declared' || report.report_state === 'Created' || report.report_state === 'Confirmed' || report.report_state === 'Transfered')
    //       && report.location_id === this.selectedSearchResource.resource.id) {
    //       list.push(report);
    //     }
    //   });
    //   return list;
    // }
    SearchPageDetailComponent.prototype.getReports = function () {
        // keep this for Promise
        var that = this;
        return new Promise(function (resolve, reject) {
            that.reportService.getReportsForResource(that.selectedSearchResource.resource.id)
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject();
            });
        });
    };
    return SearchPageDetailComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__model_location_searchResource__["a" /* SearchResource */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__model_location_searchResource__["a" /* SearchResource */]) === "function" && _a || Object)
], SearchPageDetailComponent.prototype, "selectedSearchResource", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SearchPageDetailComponent.prototype, "selectedSecondary", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SearchPageDetailComponent.prototype, "selectedStartDate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SearchPageDetailComponent.prototype, "selectedEndDate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], SearchPageDetailComponent.prototype, "pageType", void 0);
SearchPageDetailComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search-page-detail',
        template: __webpack_require__(1226),
        styles: [__webpack_require__(1162)],
        providers: [__WEBPACK_IMPORTED_MODULE_10__ng_bootstrap_ng_bootstrap__["d" /* NgbCarouselConfig */]] // add NgbCarouselConfig to the component providers
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_reservation_reservation_service__["a" /* ReservationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_reservation_reservation_service__["a" /* ReservationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__services_resource_resource_service__["a" /* ResourceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_resource_resource_service__["a" /* ResourceService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_16_app_services_report_report_service__["a" /* ReportService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_16_app_services_report_report_service__["a" /* ReportService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_9__modules_core__["d" /* TenantConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__modules_core__["d" /* TenantConfigurationService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_router__["a" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_11__show_url_show_url_service__["a" /* ShowUrlService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__show_url_show_url_service__["a" /* ShowUrlService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_14__show_calendar_show_calendar_service__["a" /* ShowCalendarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__show_calendar_show_calendar_service__["a" /* ShowCalendarService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_15_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_10__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_17__services_mapwize_mapwize_service__["a" /* MapwizeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_17__services_mapwize_mapwize_service__["a" /* MapwizeService */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_18__show_mapwize_show_mapwize_service__["a" /* ShowMapwizeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_18__show_mapwize_show_mapwize_service__["a" /* ShowMapwizeService */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_10__ng_bootstrap_ng_bootstrap__["d" /* NgbCarouselConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__ng_bootstrap_ng_bootstrap__["d" /* NgbCarouselConfig */]) === "function" && _p || Object])
], SearchPageDetailComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
//# sourceMappingURL=search-page-detail.component.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_reservation_reservation_service__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_resource_resource_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_location_searchResource__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_location_place_with_children__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_model_location_sub_resource_type__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPageResourcesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SearchPageResourcesComponent = (function () {
    function SearchPageResourcesComponent(translateService, reservationService, resourceService) {
        this.translateService = translateService;
        this.reservationService = reservationService;
        this.resourceService = resourceService;
        this.loading = false;
        this.searchResourceList = [];
        this.onSelectSearchResource = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.selectedStartDate = new Date();
        this.selectedEndDate = new Date();
        this.selectedSearchText = '';
        this.caracList = [];
        this.todaysDate = new Date();
    }
    SearchPageResourcesComponent.prototype.ngOnInit = function () {
    };
    SearchPageResourcesComponent.prototype.loadData = function () {
        var _this = this;
        var idResource;
        var data;
        var data2;
        data = [0];
        this.searchResourceList = [];
        if (this.selectedSearchResource) {
            idResource = this.selectedSearchResource.resource.id;
        }
        this.loading = true;
        //Get Data
        this.getData()
            .then(function (r) {
            data = r;
            data.forEach(function (element) {
                element.resource.capacity = _this.deduceCapacity(element.resource);
            });
            //Filter
            _this.searchResourceList = _this.filterResourceList(data);
            _this.loading = false;
            setTimeout(function () {
                if (idResource) {
                    var selectedRes = _this.searchResourceList.find(function (sr) { return sr.resource.id === idResource; });
                    // Either the previously selected resource is stilll part of the list 
                    // => we display it again
                    // or it's not 
                    // => selected resource is then null => the list is shown and the detail component is hidden
                    _this.onSelectSearchResource.emit(selectedRes);
                }
            }, 100);
        })
            .catch(function (err) {
            // console.log("err => réservation non trouvée");
            _this.loading = false;
        });
    };
    SearchPageResourcesComponent.prototype.filterResourceList = function (data) {
        var _this = this;
        var list = [];
        data.forEach(function (sr) {
            if (_this.isResourceTypeOK(sr)
                && _this.areCharacOK(sr)) {
                list.push(sr);
            }
        });
        return list;
    };
    SearchPageResourcesComponent.prototype.isResourceTypeOK = function (sr) {
        var isOk = false;
        if (!this.selectedResourceType) {
            isOk = true;
        }
        else {
            isOk = (this.selectedResourceType.id === sr.resource.resource_type.id);
        }
        return isOk;
    };
    SearchPageResourcesComponent.prototype.areCharacOK = function (sr) {
        var isOk = true;
        this.caracList.forEach(function (car) {
            var CharacRequested = ((car.type === "long_type") && (car.value && (Number(car.value) || 0) != 0)
                || (car.type === "double_type") && (car.value && (Number(car.value) || 0) != 0)
                || (car.type === "string_type") && (car.value && car.value != "")
                || (car.type === "boolean_type") && (car.value && car.value != "false"));
            if (CharacRequested) {
                // Does the resource havethe requested characteristic
                var srOfResource = sr.resource.charac.find(function (r) { return r.id_charactype_resource === car.id; });
                if (!srOfResource) {
                    //requested characterisc not found in Resource => NO GO
                    isOk = false;
                }
                else {
                    switch (car.type) {
                        case "long_type":
                            if ((Number(srOfResource.value) || 0) < (Number(car.value) || 0)) {
                                //Value of characteristic less than value requested
                                isOk = false;
                            }
                            break;
                        case "double_type":
                            if ((Number(srOfResource.value) || 0) < (Number(car.value) || 0)) {
                                //Value of characteristic less than value requested
                                isOk = false;
                            }
                            break;
                        case "string_type":
                            if (srOfResource.value != car.value) {
                                //Value of characteristic != value requested
                                isOk = false;
                            }
                            break;
                        case "boolean_type":
                            if (srOfResource.value != "true") {
                                //Value of characteristic is false
                                isOk = false;
                            }
                            break;
                        default:
                            isOk = true;
                            break;
                    }
                }
            }
        });
        return isOk;
    };
    SearchPageResourcesComponent.prototype.ancestorId = function () {
        var id = null;
        if (this.selectedSecondary) {
            id = this.selectedSecondary.id;
        }
        else {
            if (this.selectedPrimary) {
                id = this.selectedPrimary.id;
            }
        }
        return id;
    };
    SearchPageResourcesComponent.prototype.checkLocation = function (pt, idTarget) {
        if (pt.length === 0) {
            return false;
        }
        else {
            if (pt[0].id === idTarget) {
                return true;
            }
            else {
                var pt2_1 = [];
                pt.forEach(function (element) {
                    if (element.id != pt[0].id) {
                        pt2_1.push(element);
                    }
                });
                return this.checkLocation(pt2_1, idTarget);
            }
        }
    };
    SearchPageResourcesComponent.prototype.deduceCapacity = function (res) {
        var retour = '';
        res.charac.forEach(function (car) {
            if (car.label === 'Capacité') {
                retour = car.value;
            }
        });
        if (retour === '') {
            retour = res.resource_type.label.charAt(0).toUpperCase();
        }
        return retour;
    };
    SearchPageResourcesComponent.prototype.compareFunction = function (a, b) {
        if (a.start_date > b.start_date) {
            return 1;
        }
        if (a.start_date < b.start_date) {
            return -1;
        }
        return 0;
    };
    SearchPageResourcesComponent.prototype.getData = function () {
        // keep this for Promise
        var that = this;
        var startDate;
        var endDate;
        if (that.selectedStartDate && that.selectedEndDate) {
            startDate = that.selectedStartDate.getTime();
            endDate = that.selectedEndDate.getTime();
        }
        else {
            startDate = null;
            endDate = null;
        }
        return new Promise(function (resolve, reject) {
            that.resourceService.searchResource(that.selectedSearchText, startDate, endDate, that.pageType, that.ancestorId()).subscribe(function (data) {
                resolve(data);
                var nextQuarterOfHour = __WEBPACK_IMPORTED_MODULE_7_moment__(new Date()).add(15, 'minutes').toDate();
                that.todaysDate = nextQuarterOfHour;
            }, function (error) {
                reject();
            });
        });
        // }
        // else 
        // { 
        //     return new Promise(function (resolve, reject) {
        //     that.resourceService.searchResource(
        //         that.selectedSearchText,
        //         that.pageType,
        //         that.ancestorId()).subscribe(
        //             data => {
        //                 resolve(data);
        //             },
        //             error => {
        //                 reject();
        //             })
        //     });
        // }
    };
    SearchPageResourcesComponent.prototype.doAction = function (event, searchResource) {
        event.stopPropagation();
    };
    SearchPageResourcesComponent.prototype.searchResourceSelected = function (res) {
        this.selectedSearchResource = res;
        this.onSelectSearchResource.emit(this.selectedSearchResource);
    };
    SearchPageResourcesComponent.prototype.triggerSearch = function () {
        this.loadData();
    };
    ;
    SearchPageResourcesComponent.prototype.deselectResource = function () {
        this.selectedSearchResource = null;
        this.onSelectSearchResource.emit(this.selectedSearchResource);
    };
    return SearchPageResourcesComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__model_location_searchResource__["a" /* SearchResource */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__model_location_searchResource__["a" /* SearchResource */]) === "function" && _a || Object)
], SearchPageResourcesComponent.prototype, "selectedSearchResource", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]) === "function" && _b || Object)
], SearchPageResourcesComponent.prototype, "onSelectSearchResource", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SearchPageResourcesComponent.prototype, "selectedStartDate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SearchPageResourcesComponent.prototype, "selectedEndDate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", String)
], SearchPageResourcesComponent.prototype, "selectedSearchText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6_app_model_location_sub_resource_type__["a" /* ResourceType */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_model_location_sub_resource_type__["a" /* ResourceType */]) === "function" && _c || Object)
], SearchPageResourcesComponent.prototype, "selectedResourceType", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Array)
], SearchPageResourcesComponent.prototype, "caracList", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__model_location_place_with_children__["a" /* PlaceWithChildren */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__model_location_place_with_children__["a" /* PlaceWithChildren */]) === "function" && _d || Object)
], SearchPageResourcesComponent.prototype, "selectedPrimary", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__model_location_place_with_children__["a" /* PlaceWithChildren */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__model_location_place_with_children__["a" /* PlaceWithChildren */]) === "function" && _e || Object)
], SearchPageResourcesComponent.prototype, "selectedSecondary", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", Number)
], SearchPageResourcesComponent.prototype, "pageType", void 0);
SearchPageResourcesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-search-page-resources',
        template: __webpack_require__(1227),
        styles: [__webpack_require__(1163)]
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__services_reservation_reservation_service__["a" /* ReservationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_reservation_reservation_service__["a" /* ReservationService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__services_resource_resource_service__["a" /* ResourceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_resource_resource_service__["a" /* ResourceService */]) === "function" && _h || Object])
], SearchPageResourcesComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=search-page-resources.component.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__show_calendar_component__ = __webpack_require__(403);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowCalendarService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShowCalendarService = (function () {
    function ShowCalendarService(modalService) {
        this.modalService = modalService;
    }
    ShowCalendarService.prototype.show = function (id, label) {
        var modalRef = this.modalService.open(__WEBPACK_IMPORTED_MODULE_2__show_calendar_component__["a" /* ShowCalendarComponent */], { windowClass: 'modal-dialog-centered', size: 'lg' });
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.label = label;
        return modalRef.result;
    };
    return ShowCalendarService;
}());
ShowCalendarService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _a || Object])
], ShowCalendarService);

var _a;
//# sourceMappingURL=show-calendar.service.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_mapwize_mapwize_service__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowMapwizeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShowMapwizeComponent = (function () {
    function ShowMapwizeComponent(mapwizeService, activeModal) {
        this.mapwizeService = mapwizeService;
        this.activeModal = activeModal;
    }
    ShowMapwizeComponent.prototype.ngOnInit = function () {
        this.mapwizeService.container = "showMapwize";
        this.initMap();
    };
    ShowMapwizeComponent.prototype.initMap = function () {
        var _this = this;
        this.mapwizeService.mapCreation()
            .then(function (mapInstance) {
            var venueToFind = _this.mapwizeService.venueToFind;
            _this.mapwizeService.searchVenueByName(venueToFind).then(function (venueId) {
                var resourceToFind = _this.mapwizeService.resourceToFind;
                _this.mapwizeService.searchPlaceByName(resourceToFind).then(function (place) {
                    mapInstance.centerOnVenue(venueId);
                    mapInstance.on('mapwize:venueenter', function (e) {
                        mapInstance.setUniverse(_this.mapwizeService.universeId);
                        mapInstance.centerOnPlace(place);
                        mapInstance.addMarker({
                            latitude: place.marker.latitude,
                            longitude: place.marker.longitude,
                            floor: place.floor,
                        });
                    });
                });
            });
        });
    };
    ShowMapwizeComponent.prototype.decline = function () {
        this.activeModal.close(false);
    };
    ShowMapwizeComponent.prototype.dismiss = function () {
        this.activeModal.dismiss();
    };
    return ShowMapwizeComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], ShowMapwizeComponent.prototype, "venue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ShowMapwizeComponent.prototype, "resource", void 0);
ShowMapwizeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-show-mapwize',
        template: __webpack_require__(1231),
        styles: [__webpack_require__(1167)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_mapwize_mapwize_service__["a" /* MapwizeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_mapwize_mapwize_service__["a" /* MapwizeService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */]) === "function" && _b || Object])
], ShowMapwizeComponent);

var _a, _b;
//# sourceMappingURL=show-mapwize.component.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__show_url_component__ = __webpack_require__(405);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowUrlService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShowUrlService = (function () {
    function ShowUrlService(modalService) {
        this.modalService = modalService;
    }
    ShowUrlService.prototype.show = function (url, title, btnCancelText, dialogSize) {
        if (btnCancelText === void 0) { btnCancelText = 'Annuler'; }
        if (dialogSize === void 0) { dialogSize = 'lg'; }
        var modalRef = this.modalService.open(__WEBPACK_IMPORTED_MODULE_2__show_url_component__["a" /* ShowUrlComponent */], { windowClass: 'modal-dialog-centered', size: dialogSize });
        modalRef.componentInstance.urlParam = url;
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.btnCancelText = btnCancelText;
        return modalRef.result;
    };
    return ShowUrlService;
}());
ShowUrlService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _a || Object])
], ShowUrlService);

var _a;
//# sourceMappingURL=show-url.service.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__location__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sub_address__ = __webpack_require__(821);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sub_charac__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sub_complement__ = __webpack_require__(825);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sub_resource_type__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sub_picture__ = __webpack_require__(384);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Resource; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource(obj) {
        var _this = _super.call(this, obj) || this;
        _this.charac = [];
        _this.complement_type = [];
        _this.picture = [];
        //        this.id_resource_type = obj && obj.id_resource_type || null;
        // this.id_resource_type = obj && obj.resource_type && obj.resource_type.id || null;
        if (obj && obj.address) {
            _this.address = new __WEBPACK_IMPORTED_MODULE_1__sub_address__["a" /* Address */](obj.address);
        }
        if (obj && obj.resource_type) {
            _this.resource_type = new __WEBPACK_IMPORTED_MODULE_4__sub_resource_type__["a" /* ResourceType */](obj.resource_type);
        }
        if (obj && obj.charac) {
            obj.charac.forEach(function (c) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_2__sub_charac__["a" /* Charac */](c);
                _this.charac.push(c);
            });
        }
        if (obj && obj.complement_type) {
            obj.complement_type.forEach(function (c) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_3__sub_complement__["a" /* Complement */](c);
                _this.complement_type.push(c);
            });
        }
        _this.capacity = obj && obj.capacity || null;
        _this.map_url = obj && obj.map_url || null;
        if (obj && obj.picture) {
            obj.picture.forEach(function (c) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_5__sub_picture__["a" /* Picture */](c);
                _this.picture.push(c);
            });
        }
        return _this;
    }
    return Resource;
}(__WEBPACK_IMPORTED_MODULE_0__location__["a" /* Location */]));

//# sourceMappingURL=resource.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Charac; });
var Charac = (function () {
    function Charac(obj) {
        this.id = obj && obj.id || null;
        this.pictogram = obj && obj.pictogram || null;
        this.value = obj && obj.value || null;
        this.type = obj && obj.type || null;
        this.label = obj && obj.label || null;
        this.mandatory = obj && obj.mandatory || null;
        this.id_resource = obj && obj.id_resource || null;
        this.id_resource_type = obj && obj.id_resource_type || null;
        this.id_charactype_resource = obj && obj.id_charactype_resource || null;
        this.pictogramFullPath = obj && obj.pictogram || null;
    }
    return Charac;
}());

//# sourceMappingURL=charac.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Picture; });
var Picture = (function () {
    function Picture(obj) {
        this.id = obj && obj.id || null;
        this.description = obj && obj.description || null;
        this.file_name = obj && obj.file_name || null;
        this.data = obj && obj.data || null;
        this.create_date = obj && obj.create_date || null;
        this.owner_id = obj && obj.owner_id || null;
        this.owner_type = obj && obj.owner_type || null;
    }
    return Picture;
}());

//# sourceMappingURL=picture.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Incident; });
var Incident = (function () {
    function Incident(obj) {
        var _this = this;
        this.children = [];
        this.id = obj && obj.id || null;
        this.label = obj && obj.label || null;
        this.parent_id = obj && obj.parent_id || null;
        if (obj && obj.children) {
            obj.children.forEach(function (c) {
                var tmp = new Incident(c);
                _this.children.push(tmp);
            });
        }
    }
    return Incident;
}());

//# sourceMappingURL=incident.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graphHelper_service__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage_services_office365LocalStorage_service__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Office365Service; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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




var Office365Service = (function () {
    function Office365Service(httpService, graphHelperService, office365LocalStorageService) {
        this.httpService = httpService;
        this.graphHelperService = graphHelperService;
        this.office365LocalStorageService = office365LocalStorageService;
    }
    Office365Service.prototype.isAuthenticated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.office365LocalStorageService.userOffice365 = undefined;
                        token = this.office365LocalStorageService.tokenOffice365;
                        if (!token) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.graphHelperService.processAuth()];
                    case 1:
                        user = _a.sent();
                        // console.log('User Office 365', user);
                        if (user) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Office365Service.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.graphHelperService.login()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Office365Service;
}());
Office365Service = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__graphHelper_service__["a" /* GraphHelperService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__graphHelper_service__["a" /* GraphHelperService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */]) === "function" && _c || Object])
], Office365Service);

var _a, _b, _c;
//# sourceMappingURL=office365.service.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_authentication_modules_zenoffice_services_zenoffice_auth_service__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_core__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZenOfficeModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ZenOfficeModule = (function () {
    function ZenOfficeModule() {
    }
    return ZenOfficeModule;
}());
ZenOfficeModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["a" /* CoreModule */],
        ],
        declarations: [],
        providers: [
            __WEBPACK_IMPORTED_MODULE_1_app_modules_authentication_modules_zenoffice_services_zenoffice_auth_service__["a" /* ZenOfficeAuth */],
        ],
        exports: [],
    })
], ZenOfficeModule);

//# sourceMappingURL=zenoffice.module.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_globals__ = __webpack_require__(223);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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





var LoginComponent = (function () {
    function LoginComponent(authService, infoLocalStorageService, appConfigurationService, globals) {
        this.authService = authService;
        this.infoLocalStorageService = infoLocalStorageService;
        this.appConfigurationService = appConfigurationService;
        this.globals = globals;
    }
    LoginComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isAuth;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.user = new __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["f" /* UserLocal */]();
                        this.validationLoginState = false;
                        this.validationPasswordState = false;
                        this.checkboxRemember = { value: false };
                        this.env = this.appConfigurationService.env;
                        // hide navbar
                        this.authService._isOnLoginPageAuthenticated$.next(true);
                        this.authService.waitingForAuthenticationSubscriber().subscribe(function (value) { return _this.validationLoginState = value; });
                        return [4 /*yield*/, this.authService.isAuthenticated()];
                    case 1:
                        isAuth = _a.sent();
                        if (isAuth) {
                            window.location.href = this.appConfigurationService.urlAccueil;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        this.authService._isOnLoginPageAuthenticated$.next(false);
    };
    LoginComponent.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.login()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(1210),
        styles: [__webpack_require__(1147)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication__["b" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication__["b" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage__["a" /* InfoLocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage__["a" /* InfoLocalStorageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_app_globals__["a" /* Globals */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_app_globals__["a" /* Globals */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_modules_localStorage_services_office365LocalStorage_service__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_modules_core_services_path_service__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_modules_core_services_http_service__ = __webpack_require__(230);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TenantConfigurationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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






var TenantConfigurationService = (function () {
    function TenantConfigurationService(office365LocalStorageService, http, pathService) {
        this.office365LocalStorageService = office365LocalStorageService;
        this.http = http;
        this.pathService = pathService;
    }
    TenantConfigurationService.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var login, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        login = this.office365LocalStorageService.userOffice365.mail;
                        return [4 /*yield*/, this.http.get(this.pathService.getApiPath('TENANT') + '/' + login).toPromise()];
                    case 1:
                        result = _a.sent();
                        // console.log('tenant configuration');
                        this.tenantConfiguration = result.json()[0];
                        // console.log(this.tenantConfiguration);
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Object.defineProperty(TenantConfigurationService.prototype, "id", {
        get: function () {
            if (this.tenantConfiguration && this.tenantConfiguration.id)
                return this.tenantConfiguration.id;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantConfigurationService.prototype, "label", {
        get: function () {
            if (this.tenantConfiguration && this.tenantConfiguration.label)
                return this.tenantConfiguration.label;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantConfigurationService.prototype, "logoImageData", {
        get: function () {
            if (this.tenantConfiguration && this.tenantConfiguration.logoImageData)
                return this.tenantConfiguration.logoImageData;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantConfigurationService.prototype, "logoImageFileName", {
        get: function () {
            if (this.tenantConfiguration && this.tenantConfiguration.logoImageFileName)
                return this.tenantConfiguration.logoImageFileName;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantConfigurationService.prototype, "domains", {
        get: function () {
            if (this.tenantConfiguration && this.tenantConfiguration.domains)
                return this.tenantConfiguration.domains;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantConfigurationService.prototype, "MicrosoftApplicationId", {
        get: function () {
            if (this.tenantConfiguration && this.tenantConfiguration.microsoft_application_id)
                return this.tenantConfiguration.microsoft_application_id;
            else
                return null;
            //return '75819db6-3601-4c59-9cec-575d678f71a5';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantConfigurationService.prototype, "MapwizeAccessKey", {
        get: function () {
            if (this.tenantConfiguration && this.tenantConfiguration.mapwize_access_key)
                return this.tenantConfiguration.mapwize_access_key;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantConfigurationService.prototype, "MapwizeAccessGroup", {
        get: function () {
            if (this.tenantConfiguration && this.tenantConfiguration.mapwize_access_group)
                return this.tenantConfiguration.mapwize_access_group;
            else
                return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantConfigurationService.prototype, "Reports_StartHour", {
        get: function () {
            if (this.tenantConfiguration && this.tenantConfiguration.time_range && this.tenantConfiguration.time_range.start_time)
                return this.tenantConfiguration.time_range.start_time;
            else
                return '00:00';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantConfigurationService.prototype, "Reports_EndHour", {
        get: function () {
            if (this.tenantConfiguration && this.tenantConfiguration.time_range && this.tenantConfiguration.time_range.end_time)
                return this.tenantConfiguration.time_range.end_time;
            else
                return '23:00';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TenantConfigurationService.prototype, "MaxSynchro", {
        get: function () {
            if (this.tenantConfiguration && this.tenantConfiguration.reservation_synchronize_time_range_in_day)
                return this.tenantConfiguration.reservation_synchronize_time_range_in_day;
            else
                return 60;
        },
        enumerable: true,
        configurable: true
    });
    return TenantConfigurationService;
}());
TenantConfigurationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])()
    /**
     * this service manages tenant-relative configuration of the application
     */
    ,
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0_app_modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0_app_modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_app_modules_core_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_modules_core_services_http_service__["a" /* HttpService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_app_modules_core_services_path_service__["a" /* PathService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_app_modules_core_services_path_service__["a" /* PathService */]) === "function" && _c || Object])
], TenantConfigurationService);

var _a, _b, _c;
//# sourceMappingURL=tenant-configuration.service.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoLocalStorageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var InfoLocalStorageService = (function () {
    function InfoLocalStorageService() {
    }
    Object.defineProperty(InfoLocalStorageService.prototype, "token", {
        get: function () {
            return localStorage.getItem('token');
        },
        set: function (token) {
            localStorage.setItem('token', token);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoLocalStorageService.prototype, "rememberMeToken", {
        get: function () {
            return localStorage.getItem('rememberMeToken');
        },
        set: function (rememberMeToken) {
            localStorage.setItem('rememberMeToken', rememberMeToken);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoLocalStorageService.prototype, "user", {
        get: function () {
            return localStorage.getItem('token');
        },
        set: function (user) {
            localStorage.setItem('token', JSON.stringify(user));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InfoLocalStorageService.prototype, "isWaitingForAuthToComplete", {
        get: function () {
            var value = localStorage.getItem('isWaitingForAuthToComplete');
            return (value === 'true') ? true : false;
        },
        set: function (value) {
            localStorage.setItem('isWaitingForAuthToComplete', value);
        },
        enumerable: true,
        configurable: true
    });
    return InfoLocalStorageService;
}());
InfoLocalStorageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], InfoLocalStorageService);

//# sourceMappingURL=infoLocalStorage.service.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslatePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TranslatePipe = (function () {
    function TranslatePipe(translateService) {
        this.translateService = translateService;
    }
    TranslatePipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!value) {
            return;
        }
        return this.translateService.instant(value, args);
    };
    return TranslatePipe;
}());
TranslatePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'translate'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object])
], TranslatePipe);

var _a;
//# sourceMappingURL=translate.pipe.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_environments_environment__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_utils__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_report_report__ = __webpack_require__(826);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_report_sub_incident__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_modules_core__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ReportService = (function () {
    function ReportService(http, pathService) {
        this.http = http;
        this.pathService = pathService;
    }
    // get list of activity
    ReportService.prototype.getList = function () {
        var data = [];
        if (__WEBPACK_IMPORTED_MODULE_4_environments_environment__["a" /* environment */].debug_report) {
            // this is a mock
            var list = [
                {
                    'id': 123,
                    'create_date': 1499782927804,
                    'description': 'description1',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Place',
                    'location_id': 8520,
                    'location_label': 'etage 1'
                },
                {
                    'id': 124,
                    'create_date': 1499782927802,
                    'description': 'description2',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8529,
                    'location_label': 'Jupilar'
                },
                {
                    'id': 236,
                    'create_date': 1499782927800,
                    'description': 'description3',
                    'report_state': 'Invalid',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8585,
                    'location_label': 'Jupiler'
                },
                {
                    'id': 237,
                    'create_date': 1499782927805,
                    'description': 'description4',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8579,
                    'location_label': 'Jupilor'
                },
                {
                    'id': 123,
                    'create_date': 1499782927804,
                    'description': 'description1',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Place',
                    'location_id': 8520,
                    'location_label': 'etage 1'
                },
                {
                    'id': 124,
                    'create_date': 1499782927802,
                    'description': 'description2',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8529,
                    'location_label': 'Jupilar'
                },
                {
                    'id': 236,
                    'create_date': 1499782927800,
                    'description': 'description3',
                    'report_state': 'Invalid',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8585,
                    'location_label': 'Jupiler'
                },
                {
                    'id': 237,
                    'create_date': 1499782927805,
                    'description': 'description4',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8579,
                    'location_label': 'Jupilor'
                },
                {
                    'id': 123,
                    'create_date': 1499782927804,
                    'description': 'description1',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Place',
                    'location_id': 8520,
                    'location_label': 'etage 1'
                },
                {
                    'id': 124,
                    'create_date': 1499782927802,
                    'description': 'description2',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8529,
                    'location_label': 'Jupilar'
                },
                {
                    'id': 236,
                    'create_date': 1499782927800,
                    'description': 'description3',
                    'report_state': 'Invalid',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8585,
                    'location_label': 'Jupiler'
                },
                {
                    'id': 237,
                    'create_date': 1499782927805,
                    'description': 'description4',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8579,
                    'location_label': 'Jupilor'
                },
                {
                    'id': 123,
                    'create_date': 1499782927804,
                    'description': 'description1',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Place',
                    'location_id': 8520,
                    'location_label': 'etage 1'
                },
                {
                    'id': 124,
                    'create_date': 1499782927802,
                    'description': 'description2',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8529,
                    'location_label': 'Jupilar'
                },
                {
                    'id': 236,
                    'create_date': 1499782927800,
                    'description': 'description3',
                    'report_state': 'Invalid',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8585,
                    'location_label': 'Jupiler'
                },
                {
                    'id': 237,
                    'create_date': 1499782927805,
                    'description': 'description4',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8579,
                    'location_label': 'Jupilor'
                },
                {
                    'id': 123,
                    'create_date': 1499782927804,
                    'description': 'description1',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Place',
                    'location_id': 8520,
                    'location_label': 'etage 1'
                },
                {
                    'id': 124,
                    'create_date': 1499782927802,
                    'description': 'description2',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8529,
                    'location_label': 'Jupilar'
                },
                {
                    'id': 236,
                    'create_date': 1499782927800,
                    'description': 'description3',
                    'report_state': 'Invalid',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8585,
                    'location_label': 'Jupiler'
                },
                {
                    'id': 237,
                    'create_date': 1499782927805,
                    'description': 'description4',
                    'report_state': 'Created',
                    'incident_type': { id: 1, label: 'Eclairage' },
                    'reporter': 'wesh@yo.oklm',
                    'location_type': 'Resource',
                    'location_id': 8579,
                    'location_label': 'Jupilor'
                },
            ];
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_5__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_6__model_report_report__["a" /* Report */](tmp);
                data.push(tmp2);
            });
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].of(data);
        }
        else {
            return this.http.get(this.pathService.getApiPath('REPORT-SEARCH'))
                .map(function (res) {
                var list = res.json();
                list.forEach(function (element) {
                    var tmp = new __WEBPACK_IMPORTED_MODULE_5__model_utils__["a" /* Serializable */](element);
                    var tmp2 = new __WEBPACK_IMPORTED_MODULE_6__model_report_report__["a" /* Report */](tmp);
                    data.push(tmp2);
                });
                return data;
            });
        }
    };
    // get list of activity
    ReportService.prototype.getReportsForResource = function (idResource) {
        var _this = this;
        var data = [];
        return this.http.get(this.pathService.getApiPath('REPORT-SEARCH'))
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_5__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_6__model_report_report__["a" /* Report */](tmp);
                data.push(tmp2);
            });
            data = _this.filterReportsList(data, idResource);
            return data;
        });
    };
    ReportService.prototype.filterReportsList = function (data, idResource) {
        var list = [];
        data.forEach(function (report) {
            if (report.location_type === 'Resource'
                && (report.report_state === 'Declared' || report.report_state === 'Created' || report.report_state === 'Confirmed' || report.report_state === 'Transfered')
                && report.location_id === idResource) {
                list.push(report);
            }
        });
        return list;
    };
    ReportService.prototype.createOrUpdate = function (obj) {
        var tmp = obj;
        tmp.create_date = tmp.create_date.getTime();
        delete tmp.image_ids;
        delete tmp.bread_crumb;
        if (obj && !obj.id) {
            delete obj.id;
        }
        if (obj && !obj.invalid_reason) {
            delete tmp.invalid_reason;
        }
        var dataToSend = JSON.stringify(tmp);
        if ((obj && obj.id)) {
            // update
            return this.http.put(this.pathService.getApiPath('REPORT'), dataToSend)
                .map(function (res) {
                return res.json();
            });
        }
        else {
            // create
            return this.http.post(this.pathService.getApiPath('REPORT'), dataToSend)
                .map(function (res) {
                return res.json();
            });
        }
    };
    ReportService.prototype.updateState = function (id, info) {
        var dataToSend = JSON.stringify(info);
        return this.http.put(this.pathService.getApiPath('REPORT-STATE') + '/' + id, dataToSend)
            .map(function (res) {
            return res;
        });
    };
    // getIncidentTypeList() {
    //     let data: Incident[] = [];
    //     data.push(new Incident({ 'id': '', 'label': '' }))
    //     return this.http.get(this.pathService.getApiPath('REPORT-INCIDENT-ALL'))
    //         .map((res: Response) => {
    //             let list = res.json();
    //             list.forEach(element => {
    //                 let tmp = new Serializable(element)
    //                 let tmp2 = new Incident(tmp)
    //                 data.push(tmp2);
    //             });
    //             return data;
    //         })
    // }
    ReportService.prototype.getIncidentTypeList = function (location_type, location_id) {
        var data = [];
        var url = '';
        if (location_type && location_id) {
            if (location_type === 'Resource') {
                url = this.pathService.getApiPath('REPORT-INCIDENT-RESOURCE') + '/' + location_id;
            }
            else {
                if (location_type === 'Place') {
                    url = this.pathService.getApiPath('REPORT-INCIDENT-PLACE') + '/' + location_id;
                }
                else {
                    url = this.pathService.getApiPath('REPORT-INCIDENT-ALL');
                }
            }
        }
        else {
            url = this.pathService.getApiPath('REPORT-INCIDENT-ALL');
        }
        data.push(new __WEBPACK_IMPORTED_MODULE_7__model_report_sub_incident__["a" /* Incident */]({ 'id': '', 'label': '' }));
        return this.http.get(url)
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_5__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_7__model_report_sub_incident__["a" /* Incident */](tmp);
                data.push(tmp2);
            });
            return data;
        });
    };
    ReportService.prototype.deleteImg = function (id) {
        return this.http.delete(this.pathService.getApiPath('REPORT-IMAGE') + '/' + id)
            .map(function (res) {
            return res;
        });
    };
    ReportService.prototype.uploadImg = function (data) {
        var tmp = data;
        tmp.data = tmp.data.split(',')[1];
        tmp.create_date = tmp.create_date.getTime();
        var dataToSend = JSON.stringify(tmp);
        return this.http.post(this.pathService.getApiPath('REPORT-IMAGE'), dataToSend)
            .map(function (res) {
            return res;
        });
    };
    return ReportService;
}());
ReportService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8_app_modules_core__["c" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_app_modules_core__["c" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8_app_modules_core__["e" /* PathService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_app_modules_core__["e" /* PathService */]) === "function" && _b || Object])
], ReportService);

var _a, _b;
//# sourceMappingURL=report.service.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_page_resource_type_selector_resource_type_selector_component__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_page_search_page_detail_search_page_detail_component__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_page_search_page_resources_search_page_resources_component__ = __webpack_require__(233);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AvailabilitiesWrapperComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AvailabilitiesWrapperComponent = (function () {
    function AvailabilitiesWrapperComponent() {
        this.selectedSearchText = '';
        this.selectedResourceType = null;
        this.caracList = [];
        this.selectedPrimary = null;
        this.selectedSecondary = null;
        this.selectedSearchTextHasChanged = true;
        this.selectedResourceTypeHasChanged = true;
        this.caracListHasChanged = true;
        this.selectedPrimaryHasChanged = true;
        this.selectedSecondaryHasChanged = true;
        this.searchHasBeenTriggered = false;
    }
    AvailabilitiesWrapperComponent.prototype.ngOnInit = function () { };
    AvailabilitiesWrapperComponent.prototype.onSelectSearchResource = function (sr) {
        var _this = this;
        this.selectedSearchResource = sr;
        //It takes time for SearchPageRessources to be aware that selectedPrimary has changed
        setTimeout(function () {
            _this.searchPageDetail.onSelectSearchResource();
        }, 100);
    };
    AvailabilitiesWrapperComponent.prototype.onSelectResourceType = function (resourceType) {
        var _this = this;
        this.selectedResourceType = resourceType;
        this.selectedResourceTypeHasChanged = true;
        if (this.searchHasBeenTriggered) {
            setTimeout(function () {
                _this.doSearch();
            }, 500);
        }
        this.placeSelectorComponent.filterPlacesByResourceType(this.selectedResourceType);
    };
    AvailabilitiesWrapperComponent.prototype.onSelectCaracList = function (c) {
        var _this = this;
        this.caracList = c;
        this.caracListHasChanged = true;
        if (this.searchHasBeenTriggered) {
            setTimeout(function () {
                _this.doSearch();
            }, 500);
        }
    };
    AvailabilitiesWrapperComponent.prototype.onSelectPrimary = function (primaryPlace) {
        var _this = this;
        this.selectedPrimary = primaryPlace;
        this.selectedPrimaryHasChanged = true;
        if (this.searchHasBeenTriggered) {
            setTimeout(function () {
                _this.doSearch();
            }, 500);
        }
        this.resourceTypeSelectorComponent.filterResourceTypesByPlace(this.selectedPrimary, this.selectedSecondary);
    };
    AvailabilitiesWrapperComponent.prototype.onSelectSecondary = function (secondaryPlace) {
        var _this = this;
        this.selectedSecondary = secondaryPlace;
        this.selectedSecondaryHasChanged = true;
        if (this.searchHasBeenTriggered) {
            setTimeout(function () {
                _this.doSearch();
            }, 500);
        }
        this.resourceTypeSelectorComponent.filterResourceTypesByPlace(this.selectedPrimary, this.selectedSecondary);
    };
    AvailabilitiesWrapperComponent.prototype.onSelectSearchText = function (st) {
        this.selectedSearchText = st;
    };
    AvailabilitiesWrapperComponent.prototype.onEnterKeyPressed = function () {
        this.selectedSearchTextHasChanged = true;
        this.doSearch();
    };
    AvailabilitiesWrapperComponent.prototype.search = function () {
        // Force search
        this.selectedSearchTextHasChanged = true;
        this.doSearch();
    };
    AvailabilitiesWrapperComponent.prototype.doSearch = function () {
        // Launch search
        if (this.selectedSearchTextHasChanged ||
            this.selectedResourceTypeHasChanged ||
            this.caracListHasChanged ||
            this.selectedPrimaryHasChanged ||
            this.selectedSecondaryHasChanged) {
            this.searchPageResources.triggerSearch();
            this.searchHasBeenTriggered = true;
            this.selectedSearchTextHasChanged = false;
            this.selectedResourceTypeHasChanged = false;
            this.caracListHasChanged = false;
            this.selectedPrimaryHasChanged = false;
            this.selectedSecondaryHasChanged = false;
        }
    };
    return AvailabilitiesWrapperComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__["a" /* PlaceSelectorComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__["a" /* PlaceSelectorComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__["a" /* PlaceSelectorComponent */]) === "function" && _a || Object)
], AvailabilitiesWrapperComponent.prototype, "placeSelectorComponent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__search_page_resource_type_selector_resource_type_selector_component__["a" /* ResourceTypeSelectorComponent */]),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__search_page_resource_type_selector_resource_type_selector_component__["a" /* ResourceTypeSelectorComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__search_page_resource_type_selector_resource_type_selector_component__["a" /* ResourceTypeSelectorComponent */]) === "function" && _b || Object)
], AvailabilitiesWrapperComponent.prototype, "resourceTypeSelectorComponent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__search_page_search_page_resources_search_page_resources_component__["a" /* SearchPageResourcesComponent */]),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__search_page_search_page_resources_search_page_resources_component__["a" /* SearchPageResourcesComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__search_page_search_page_resources_search_page_resources_component__["a" /* SearchPageResourcesComponent */]) === "function" && _c || Object)
], AvailabilitiesWrapperComponent.prototype, "searchPageResources", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__search_page_search_page_detail_search_page_detail_component__["a" /* SearchPageDetailComponent */]),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__search_page_search_page_detail_search_page_detail_component__["a" /* SearchPageDetailComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__search_page_search_page_detail_search_page_detail_component__["a" /* SearchPageDetailComponent */]) === "function" && _d || Object)
], AvailabilitiesWrapperComponent.prototype, "searchPageDetail", void 0);
AvailabilitiesWrapperComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-availabilities-wrapper',
        template: __webpack_require__(1212),
        styles: [__webpack_require__(1149)]
    }),
    __metadata("design:paramtypes", [])
], AvailabilitiesWrapperComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=availabilities-wrapper.component.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmationDialogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfirmationDialogComponent = (function () {
    function ConfirmationDialogComponent(activeModal) {
        this.activeModal = activeModal;
    }
    ConfirmationDialogComponent.prototype.ngOnInit = function () {
    };
    ConfirmationDialogComponent.prototype.decline = function () {
        this.activeModal.close(false);
    };
    ConfirmationDialogComponent.prototype.accept = function () {
        this.activeModal.close(true);
    };
    ConfirmationDialogComponent.prototype.dismiss = function () {
        this.activeModal.dismiss();
    };
    return ConfirmationDialogComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmationDialogComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmationDialogComponent.prototype, "message", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmationDialogComponent.prototype, "btnOkText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmationDialogComponent.prototype, "btnCancelText", void 0);
ConfirmationDialogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-confirmation-dialog',
        template: __webpack_require__(1213),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */]) === "function" && _a || Object])
], ConfirmationDialogComponent);

var _a;
//# sourceMappingURL=confirmation-dialog.component.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__confirmation_dialog_component__ = __webpack_require__(394);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmationDialogService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConfirmationDialogService = (function () {
    function ConfirmationDialogService(modalService) {
        this.modalService = modalService;
    }
    ConfirmationDialogService.prototype.confirm = function (title, message, btnOkText, btnCancelText, dialogSize) {
        if (btnOkText === void 0) { btnOkText = 'OK'; }
        if (btnCancelText === void 0) { btnCancelText = 'Annuler'; }
        if (dialogSize === void 0) { dialogSize = 'sm'; }
        var modalRef = this.modalService.open(__WEBPACK_IMPORTED_MODULE_2__confirmation_dialog_component__["a" /* ConfirmationDialogComponent */], { size: dialogSize });
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.message = message;
        modalRef.componentInstance.btnOkText = btnOkText;
        modalRef.componentInstance.btnCancelText = btnCancelText;
        return modalRef.result;
    };
    return ConfirmationDialogService;
}());
ConfirmationDialogService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _a || Object])
], ConfirmationDialogService);

var _a;
//# sourceMappingURL=confirmation-dialog.service.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_core__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(appConfigurationService) {
        this.appConfigurationService = appConfigurationService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.env = this.appConfigurationService.env;
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(1214),
        styles: [__webpack_require__(1150)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_mapwize_mapwize_service__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_modules_core__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapwizeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MapwizeComponent = (function () {
    function MapwizeComponent(mapwizeService, tenantConfService, appConfigurationService) {
        this.mapwizeService = mapwizeService;
        this.tenantConfService = tenantConfService;
        this.appConfigurationService = appConfigurationService;
        this.selectedPrimary = null;
        this.selectedSecondary = null;
        this.selectedPrimaryHasChanged = false;
        this.selectedSecondaryHasChanged = false;
    }
    MapwizeComponent.prototype.ngOnInit = function () {
        this.mapwizeService.container = "mapwize";
    };
    MapwizeComponent.prototype.onSelectPrimary = function (primaryPlace) {
        // console.log(primaryPlace);    
        this.selectedPrimary = primaryPlace;
        this.selectedPrimaryHasChanged = true;
    };
    MapwizeComponent.prototype.onSelectSecondary = function (secondaryPlace) {
        // console.log(secondaryPlace);    
        this.selectedSecondary = secondaryPlace;
        this.selectedSecondaryHasChanged = true;
        this.mapwizeService.clearMap();
        this.initMap();
    };
    MapwizeComponent.prototype.initMap = function () {
        var _this = this;
        this.mapwizeService.searchVenueByName(this.selectedSecondary).then(function (venueId) {
            _this.mapwizeService.mapCreation()
                .then(function (mapInstance) {
                mapInstance.centerOnVenue(venueId);
                mapInstance.on('mapwize:venueenter', function (e) {
                    mapInstance.setUniverse(_this.mapwizeService.universeId);
                });
            });
        });
    };
    return MapwizeComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__["a" /* PlaceSelectorComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__["a" /* PlaceSelectorComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__["a" /* PlaceSelectorComponent */]) === "function" && _a || Object)
], MapwizeComponent.prototype, "placeSelectorComponent", void 0);
MapwizeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-mapwize',
        template: __webpack_require__(1215),
        styles: [__webpack_require__(1151)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_mapwize_mapwize_service__["a" /* MapwizeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_mapwize_mapwize_service__["a" /* MapwizeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_app_modules_core__["d" /* TenantConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_modules_core__["d" /* TenantConfigurationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _d || Object])
], MapwizeComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=mapwize.component.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_location_reservation__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_page_dates_selector_dates_selector_component__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_services_reservation_reservation_service__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_resource_resource_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__search_page_show_url_show_url_service__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__search_page_show_calendar_show_calendar_service__ = __webpack_require__(234);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyReservationsDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyReservationsDetailComponent = (function () {
    function MyReservationsDetailComponent(reservationService, resourceService, tenantConfigurationService, showUrlService, showCalendarService, translateService, router) {
        this.reservationService = reservationService;
        this.resourceService = resourceService;
        this.tenantConfigurationService = tenantConfigurationService;
        this.showUrlService = showUrlService;
        this.showCalendarService = showCalendarService;
        this.translateService = translateService;
        this.router = router;
        this.MAPWIZE_BASE_URL = "https://maps.mapwize.io/nosplash#";
        this.onSelectReservation = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.loading = false;
        this.picturesList = [];
        //errors: any;
        this.mustShowModificationImpossibleWarning = false;
    }
    MyReservationsDetailComponent.prototype.ngOnInit = function () {
        this.selectedStartDate = new Date();
        this.selectedEndDate = new Date();
        this.origSelectedStartDate = new Date();
        this.origSelectedEndDate = new Date();
    };
    MyReservationsDetailComponent.prototype.onSelectStartDate = function (d) {
        this.selectedStartDate = d;
        // this.selectedStartDateHasChanged = true;
        // if (this.searchHasBeenTriggered) {
        //   setTimeout(() => {
        //     this.doSearch();
        //   }, 500);
        // }
    };
    MyReservationsDetailComponent.prototype.onSelectEndDate = function (d) {
        this.selectedEndDate = d;
        // this.selectedEndDateHasChanged = true;
        // if (this.searchHasBeenTriggered) {
        //   setTimeout(() => {
        //     this.doSearch();
        //   }, 500);
        // }
    };
    MyReservationsDetailComponent.prototype.onSelectSearchResource = function () {
        var _this = this;
        this.selectedStartDate = new Date(this.selectedReservation.start_date_string + " " + this.selectedReservation.start_time_string);
        this.selectedEndDate = new Date(this.selectedReservation.end_date_string + " " + this.selectedReservation.end_time_string);
        this.datesSelector.selectedStartDate = this.selectedStartDate;
        this.datesSelector.selectedEndDate = this.selectedEndDate;
        this.origSelectedStartDate = this.selectedStartDate;
        this.origSelectedEndDate = this.selectedEndDate;
        this.datesSelector.start_date_string = this.selectedReservation.start_date_string;
        this.datesSelector.start_time_string = this.selectedReservation.start_time_string;
        this.datesSelector.end_date_string = this.selectedReservation.end_date_string;
        this.datesSelector.end_time_string = this.selectedReservation.end_time_string;
        this.datesSelector.delta = (this.selectedEndDate.getTime() - this.selectedStartDate.getTime()) / (1000 * 60);
        this.computeReservationValid();
        this.attendees = '';
        this.selectedReservation.attendees.forEach(function (attendee) {
            _this.attendees += attendee.email_address + ", ";
        });
        if (this.attendees.length > 2) {
            this.attendees = this.attendees.substring(0, this.attendees.length - 2);
        }
        this.loadPictures();
        setTimeout(function () {
            //Force scroll to end of page to make sure the detail is visible even if the list is crowded
            window.scrollTo(0, document.body.scrollHeight);
        }, 500);
    };
    MyReservationsDetailComponent.prototype.doReserve = function () {
        var _this = this;
        var res = this.selectedReservation;
        res.start_date = this.selectedStartDate.getTime();
        res.end_date = this.selectedEndDate.getTime();
        this.reservationService.createOrUpdate(res)
            .subscribe(function (result) {
            console.log(result);
            // Let's disable the Reservation button
            _this.reservationValid = false;
            _this.selectedReservation.state = "Created";
            _this.selectedReservation = null;
            _this.onSelectReservation.emit(_this.selectedReservation);
            //Go to My Reservations
            setTimeout(function () {
                // We wait a little bit otherwise the reservationlist won't contain our newly created reservation
                _this.router.navigate(['my-reservations']);
            }, 2000);
        }, function (error) {
            console.log(error);
            //this.errors = error;
            _this.mustShowModificationImpossibleWarning = true;
            setTimeout(function () {
                _this.mustShowModificationImpossibleWarning = false;
                //this.caracChanged();
            }, 3000);
            var dateDebut = new Date();
        });
        // if (!this.errors) {
        //   // Let's disable the Reservation button
        //   this.reservationValid = false;
        //   this.selectedReservation.state = "Created";
        //   this.selectedReservation = null;
        //   this.onSelectReservation.emit(this.selectedReservation);
        //   //Go to My Reservations
        //   setTimeout(() => {
        //     // We wait a little bit otherwise the reservationlist won't contain our newly created reservation
        //     this.router.navigate(['my-reservations']);
        //   }, 2000);
        // }
        // else {
        //   this.mustShowModificationImpossibleWarning = true;
        //   setTimeout(() => {
        //     this.mustShowModificationImpossibleWarning = false;
        //     //this.caracChanged();
        //   }, 3000);
        //   var dateDebut: Date = new Date();
        //   // this.selectedStartDate = this.origSelectedStartDate; 
        //   // this.selectedEndDate = this.origSelectedEndDate; 
        //   // this.selectedReservation.start_date = this.selectedStartDate.getTime();
        //   // this.selectedReservation.end_date = this.selectedEndDate.getTime();
        //   // this.onSelectReservation.emit(this.selectedReservation);
        //   // La ressource n'est pas disponible sur la période de temps demandée
        // }
    };
    MyReservationsDetailComponent.prototype.computeReservationValid = function () {
        //this.reservationValid = (this.selectedReservation && this.selectedReservation.isAvailale);
        this.reservationValid = true;
        this.reservationValid = (this.selectedReservation.state === "Created"
            || this.selectedReservation.state === "Confirmed"
            || this.selectedReservation.state === "Updating");
    };
    MyReservationsDetailComponent.prototype.loadPictures = function () {
        var _this = this;
        var idResource;
        //let data: any[] = [0];
        var data;
        var data2;
        data = [0];
        this.picturesList = [];
        this.loading = true;
        //Get Data
        this.getPictures()
            .then(function (r) {
            data = r;
            //foreach...
            data.forEach(function (pic) {
                pic.imgData = 'data:image/png;base64,' + pic.data;
            });
            //this.logoTenant = 'data:image/png;base64,' + this.tenantConfigurationService.logoImageData;
            _this.picturesList = data;
            _this.loading = false;
        })
            .catch(function (err) {
            console.log("err => images non trouvées");
            _this.loading = false;
        });
    };
    MyReservationsDetailComponent.prototype.getPictures = function () {
        // keep this for Promise
        var that = this;
        return new Promise(function (resolve, reject) {
            that.resourceService.getPictures(that.selectedReservation.resource.id).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject();
            });
        });
    };
    /**
   * Display a base64 URL inside an iframe in another window.
   */
    MyReservationsDetailComponent.prototype.showBase64InNewTab = function (base64URL, desc) {
        var win = window.open();
        // win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="text-align:center; '
        // +'border:0; top:0px; left:0px; bottom:0px; right:0px; '
        // +'width:100%; height:100%;" allowfullscreen></iframe>');
        // win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="margin: auto; width: 90%; height:90%; '
        // +'border: 3px solid #000000; padding: 10px; display: block; margin-left: auto; margin-right: auto;" allowfullscreen></iframe>');
        win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="width: 99%; height:99%; '
            + 'display: block; margin-left: auto; margin-right: auto;" allowfullscreen></iframe>');
        setTimeout(function () {
            win.document.title = desc;
        }, 0);
    };
    MyReservationsDetailComponent.prototype.showPictureFullScreen = function (img) {
        // e.g This will open an image in a new window
        this.showBase64InNewTab(img.imgData, img.description);
    };
    MyReservationsDetailComponent.prototype.showLocalization = function () {
        // window.open("http://maps.google.com/maps?q="
        //   + this.selectedReservation.resource.address.latitude + ","
        //   + this.selectedReservation.resource.address.longitude);
        this.urlLocalization = "https://maps.google.com/maps?q="
            + this.selectedReservation.resource.address.latitude + ","
            + this.selectedReservation.resource.address.longitude + "&t=&z=13&ie=UTF8&iwloc=&output=embed";
        // window.open("http://maps.google.com/maps?q="
        //   + this.selectedSearchResource.resource.address.latitude + ","
        //   + this.selectedSearchResource.resource.address.longitude);
        //this.router.navigate(['/show-url'], { queryParams: { url: this.urlLocalization } });
        this.showUrlService.show(this.urlLocalization, 'LOCALIZATION', 'OK')
            .then(function (confirmed) {
            if (confirmed) {
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    MyReservationsDetailComponent.prototype.showMapwize = function () {
        var Url = this.buildMapwizeUrl(this.MAPWIZE_BASE_URL, this.selectedReservation.resource.map_url, this.tenantConfigurationService.MapwizeAccessKey);
        this.urlLocalization = Url;
        // this.router.navigate(['/show-url'], { queryParams: { url: this.urlLocalization } });
        this.showUrlService.show(this.urlLocalization, 'LOCALIZATION', 'OK')
            .then(function (confirmed) {
            if (confirmed) {
            }
        })
            .catch(function (error) {
            // console.log(error);
        });
    };
    MyReservationsDetailComponent.prototype.buildMapwizeUrl = function (mapwizeBaseUrl, resourceUrl, mapwizeAccessKey) {
        var url = mapwizeBaseUrl + "/p/" + resourceUrl + "?k=" + mapwizeAccessKey + "&l=fr&z=21&embed=true&menu=false";
        return url;
    };
    MyReservationsDetailComponent.prototype.showCalendar = function () {
        this.showCalendarService.show(this.selectedReservation.resource.id, this.selectedReservation.resource.label)
            .then(function (confirmed) {
            if (confirmed) {
            }
        })
            .catch(function (error) {
            // console.log(error);
        });
    };
    return MyReservationsDetailComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2__search_page_dates_selector_dates_selector_component__["a" /* DatesSelectorComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__search_page_dates_selector_dates_selector_component__["a" /* DatesSelectorComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__search_page_dates_selector_dates_selector_component__["a" /* DatesSelectorComponent */]) === "function" && _a || Object)
], MyReservationsDetailComponent.prototype, "datesSelector", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__model_location_reservation__["a" /* Reservation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__model_location_reservation__["a" /* Reservation */]) === "function" && _b || Object)
], MyReservationsDetailComponent.prototype, "selectedReservation", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _c || Object)
], MyReservationsDetailComponent.prototype, "onSelectReservation", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], MyReservationsDetailComponent.prototype, "selectedStartDate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], MyReservationsDetailComponent.prototype, "selectedEndDate", void 0);
MyReservationsDetailComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-my-reservations-detail',
        template: __webpack_require__(1216),
        styles: [__webpack_require__(1152)]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_app_services_reservation_reservation_service__["a" /* ReservationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_services_reservation_reservation_service__["a" /* ReservationService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_resource_resource_service__["a" /* ResourceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_resource_resource_service__["a" /* ResourceService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__modules_core__["d" /* TenantConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__modules_core__["d" /* TenantConfigurationService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__search_page_show_url_show_url_service__["a" /* ShowUrlService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__search_page_show_url_show_url_service__["a" /* ShowUrlService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_9__search_page_show_calendar_show_calendar_service__["a" /* ShowCalendarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__search_page_show_calendar_show_calendar_service__["a" /* ShowCalendarService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__node_modules_angular_router__["a" /* Router */]) === "function" && _k || Object])
], MyReservationsDetailComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=my-reservations-detail.component.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__my_reservations_detail_my_reservations_detail_component__ = __webpack_require__(398);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyReservationsWrapperComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MyReservationsWrapperComponent = (function () {
    function MyReservationsWrapperComponent() {
    }
    MyReservationsWrapperComponent.prototype.ngOnInit = function () {
    };
    MyReservationsWrapperComponent.prototype.onSelectReservation = function (sr) {
        var _this = this;
        this.selectedReservation = sr;
        setTimeout(function () {
            _this.myReservationsDetail.onSelectSearchResource();
        }, 100);
    };
    return MyReservationsWrapperComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__my_reservations_detail_my_reservations_detail_component__["a" /* MyReservationsDetailComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__my_reservations_detail_my_reservations_detail_component__["a" /* MyReservationsDetailComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__my_reservations_detail_my_reservations_detail_component__["a" /* MyReservationsDetailComponent */]) === "function" && _a || Object)
], MyReservationsWrapperComponent.prototype, "myReservationsDetail", void 0);
MyReservationsWrapperComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-my-reservations-wrapper',
        template: __webpack_require__(1218),
        styles: [__webpack_require__(1154)]
    }),
    __metadata("design:paramtypes", [])
], MyReservationsWrapperComponent);

var _a;
//# sourceMappingURL=my-reservations-wrapper.component.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MySettingsWrapperComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MySettingsWrapperComponent = (function () {
    function MySettingsWrapperComponent() {
    }
    MySettingsWrapperComponent.prototype.ngOnInit = function () {
    };
    return MySettingsWrapperComponent;
}());
MySettingsWrapperComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-my-settings-wrapper',
        template: __webpack_require__(1220),
        styles: [__webpack_require__(1156)]
    }),
    __metadata("design:paramtypes", [])
], MySettingsWrapperComponent);

//# sourceMappingURL=my-settings-wrapper.component.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_core__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatesSelectorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DatesSelectorComponent = (function () {
    function DatesSelectorComponent(tenantConfigurationService, alertService) {
        this.tenantConfigurationService = tenantConfigurationService;
        this.alertService = alertService;
        this.mustShowDateStartWarning = false;
        this.mustShowDateEndWarning = false;
        this.mustShowDateMaxWarning = false;
        this.onSelectStartDate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onSelectEndDate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    DatesSelectorComponent.prototype.ngOnInit = function () {
        var dateDebut = new Date();
        this.start_date_string = this.roundedDateToDateString(dateDebut, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
        this.start_time_string = this.roundedDateToTimeString(dateDebut, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
        var dateFin = new Date();
        this.delta = 60;
        dateFin.setMinutes(dateFin.getMinutes() + this.delta);
        this.end_date_string = this.roundedDateToDateString(dateFin, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
        this.end_time_string = this.roundedDateToTimeString(dateFin, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
        this.startDateSelected();
        this.endDateSelected();
    };
    DatesSelectorComponent.prototype.roundedDateToDateString = function (date, duration, method) {
        return __WEBPACK_IMPORTED_MODULE_1_moment__(Math[method]((+date) / (+duration)) * (+duration)).format("YYYY-MM-DD");
    };
    DatesSelectorComponent.prototype.roundedDateToTimeString = function (date, duration, method) {
        return __WEBPACK_IMPORTED_MODULE_1_moment__(Math[method]((+date) / (+duration)) * (+duration)).format("HH:mm");
    };
    DatesSelectorComponent.prototype.startDateSelected = function () {
        var _this = this;
        //Eventuel arrondi
        var dateDebutTest = new Date(this.start_date_string + " " + this.start_time_string);
        var previousQuarterOfHour = __WEBPACK_IMPORTED_MODULE_1_moment__(new Date()).add(-15, 'minutes').toDate();
        if (dateDebutTest < previousQuarterOfHour) {
            this.mustShowDateStartWarning = true;
            setTimeout(function () {
                _this.mustShowDateStartWarning = false;
            }, 3000);
            var dateDebut = new Date();
            this.start_date_string = this.roundedDateToDateString(dateDebut, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
            this.start_time_string = this.roundedDateToTimeString(dateDebut, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
            this.startDateSelected();
        }
        else {
            if (this.isTooFar(dateDebutTest)) {
                this.mustShowDateMaxWarning = true;
                setTimeout(function () {
                    _this.mustShowDateMaxWarning = false;
                }, 3000);
                var dateDebut = new Date();
                this.start_date_string = this.roundedDateToDateString(dateDebut, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
                this.start_time_string = this.roundedDateToTimeString(dateDebut, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
                this.startDateSelected();
            }
            else {
                this.start_date_string = this.roundedDateToDateString(dateDebutTest, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
                this.start_time_string = this.roundedDateToTimeString(dateDebutTest, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
                //Construction de la date INPUT    
                this.selectedStartDate = new Date(this.start_date_string + " " + this.start_time_string);
                this.onSelectStartDate.emit(this.selectedStartDate);
                // Maj date fin
                var dateFin = new Date();
                dateFin.setTime(this.selectedStartDate.getTime() + this.delta * (1000 * 60));
                this.end_date_string = this.roundedDateToDateString(dateFin, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
                this.end_time_string = this.roundedDateToTimeString(dateFin, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
                this.endDateSelected();
            }
        }
    };
    DatesSelectorComponent.prototype.endDateSelected = function () {
        var _this = this;
        //Eventuel arrondi
        var dateFinTest = new Date(this.end_date_string + " " + this.end_time_string);
        if (dateFinTest <= this.selectedStartDate) {
            this.mustShowDateEndWarning = true;
            setTimeout(function () {
                _this.mustShowDateEndWarning = false;
                //this.caracChanged();
            }, 3000);
            var dateFin = new Date(this.start_date_string + " " + this.start_time_string);
            this.delta = 60;
            dateFin.setMinutes(dateFin.getMinutes() + this.delta);
            this.end_date_string = this.roundedDateToDateString(dateFin, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
            this.end_time_string = this.roundedDateToTimeString(dateFin, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
            this.endDateSelected();
        }
        else {
            if (this.isTooFar(dateFinTest)) {
                this.mustShowDateMaxWarning = true;
                setTimeout(function () {
                    _this.mustShowDateMaxWarning = false;
                    //this.caracChanged();
                }, 3000);
                var dateFin = new Date(this.start_date_string + " " + this.start_time_string);
                this.delta = 60;
                dateFin.setMinutes(dateFin.getMinutes() + this.delta);
                this.end_date_string = this.roundedDateToDateString(dateFin, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
                this.end_time_string = this.roundedDateToTimeString(dateFin, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
                this.endDateSelected();
            }
            else {
                this.end_date_string = this.roundedDateToDateString(dateFinTest, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
                this.end_time_string = this.roundedDateToTimeString(dateFinTest, __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](15, "minutes"), "ceil");
                //Construction de la date INPUT    
                this.selectedEndDate = new Date(this.end_date_string + " " + this.end_time_string);
                this.onSelectEndDate.emit(this.selectedEndDate);
                //Recalcul du delta
                this.delta = (this.selectedEndDate.getTime() - this.selectedStartDate.getTime()) / (1000 * 60);
            }
        }
    };
    DatesSelectorComponent.prototype.testDateValid = function (event) {
        // Prevent DEL and BACKSPACE
        if (event.keyCode === 8 || event.keyCode === 46) {
            event.stopPropagation();
            return false;
        }
    };
    DatesSelectorComponent.prototype.isTooFar = function (dateTest) {
        var max = this.tenantConfigurationService.MaxSynchro;
        var dateMax = __WEBPACK_IMPORTED_MODULE_1_moment__().add(max, 'd').toDate();
        return (dateTest > dateMax);
    };
    return DatesSelectorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DatesSelectorComponent.prototype, "selectedStartDate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], DatesSelectorComponent.prototype, "selectedEndDate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], DatesSelectorComponent.prototype, "onSelectStartDate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], DatesSelectorComponent.prototype, "onSelectEndDate", void 0);
DatesSelectorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dates-selector',
        template: __webpack_require__(1223),
        styles: [__webpack_require__(1159)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__modules_core__["d" /* TenantConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__modules_core__["d" /* TenantConfigurationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__modules_core__["g" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__modules_core__["g" /* AlertService */]) === "function" && _b || Object])
], DatesSelectorComponent);

var _a, _b;
//# sourceMappingURL=dates-selector.component.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_page_resources_search_page_resources_component__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_view_search_page_resource_type_selector_resource_type_selector_component__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_page_detail_search_page_detail_component__ = __webpack_require__(232);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPageWrapperComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchPageWrapperComponent = (function () {
    function SearchPageWrapperComponent() {
        this.selectedStartDate = new Date();
        this.selectedEndDate = new Date();
        this.selectedSearchText = '';
        this.selectedResourceType = null;
        this.caracList = [];
        this.selectedPrimary = null;
        this.selectedSecondary = null;
        this.selectedStartDateHasChanged = true;
        this.selectedEndDateHasChanged = true;
        this.selectedSearchTextHasChanged = true;
        this.selectedResourceTypeHasChanged = true;
        this.caracListHasChanged = true;
        this.selectedPrimaryHasChanged = true;
        this.selectedSecondaryHasChanged = true;
        this.searchHasBeenTriggered = false;
    }
    SearchPageWrapperComponent.prototype.ngOnInit = function () { };
    SearchPageWrapperComponent.prototype.onSelectSearchResource = function (sr) {
        var _this = this;
        this.selectedSearchResource = sr;
        //It takes time for SearchPageRessources to be aware that selectedPrimary has changed
        setTimeout(function () {
            _this.searchPageDetail.onSelectSearchResource();
        }, 100);
    };
    SearchPageWrapperComponent.prototype.onSelectStartDate = function (d) {
        var _this = this;
        this.selectedStartDate = d;
        this.selectedStartDateHasChanged = true;
        if (this.searchHasBeenTriggered) {
            setTimeout(function () {
                _this.doSearch();
            }, 500);
        }
    };
    SearchPageWrapperComponent.prototype.onSelectEndDate = function (d) {
        var _this = this;
        this.selectedEndDate = d;
        this.selectedEndDateHasChanged = true;
        if (this.searchHasBeenTriggered) {
            setTimeout(function () {
                _this.doSearch();
            }, 500);
        }
    };
    SearchPageWrapperComponent.prototype.onSelectResourceType = function (resourceType) {
        var _this = this;
        this.selectedResourceType = resourceType;
        this.selectedResourceTypeHasChanged = true;
        if (this.searchHasBeenTriggered) {
            setTimeout(function () {
                _this.doSearch();
            }, 10000);
        }
        this.placeSelectorComponent.filterPlacesByResourceType(this.selectedResourceType);
    };
    SearchPageWrapperComponent.prototype.onSelectCaracList = function (c) {
        var _this = this;
        this.caracList = c;
        this.caracListHasChanged = true;
        if (this.searchHasBeenTriggered) {
            setTimeout(function () {
                _this.doSearch();
            }, 500);
        }
    };
    SearchPageWrapperComponent.prototype.onSelectPrimary = function (primaryPlace) {
        var _this = this;
        this.selectedPrimary = primaryPlace;
        this.selectedPrimaryHasChanged = true;
        if (this.searchHasBeenTriggered) {
            setTimeout(function () {
                _this.doSearch();
            }, 500);
        }
        this.resourceTypeSelectorComponent.filterResourceTypesByPlace(this.selectedPrimary, this.selectedSecondary);
    };
    SearchPageWrapperComponent.prototype.onSelectSecondary = function (secondaryPlace) {
        var _this = this;
        this.selectedSecondary = secondaryPlace;
        this.selectedSecondaryHasChanged = true;
        if (this.searchHasBeenTriggered) {
            setTimeout(function () {
                _this.doSearch();
            }, 500);
        }
        this.resourceTypeSelectorComponent.filterResourceTypesByPlace(this.selectedPrimary, this.selectedSecondary);
    };
    SearchPageWrapperComponent.prototype.onSelectSearchText = function (st) {
        this.selectedSearchText = st;
    };
    SearchPageWrapperComponent.prototype.onEnterKeyPressed = function () {
        this.selectedSearchTextHasChanged = true;
        this.doSearch();
    };
    SearchPageWrapperComponent.prototype.search = function () {
        // Force search
        this.selectedSearchTextHasChanged = true;
        this.doSearch();
    };
    SearchPageWrapperComponent.prototype.doSearch = function () {
        // Launch search
        if (this.selectedStartDateHasChanged ||
            this.selectedEndDateHasChanged ||
            this.selectedSearchTextHasChanged ||
            this.selectedResourceTypeHasChanged ||
            this.caracListHasChanged ||
            this.selectedPrimaryHasChanged ||
            this.selectedSecondaryHasChanged) {
            this.searchPageResources.triggerSearch();
            this.searchHasBeenTriggered = true;
            this.selectedStartDateHasChanged = false;
            this.selectedEndDateHasChanged = false;
            this.selectedSearchTextHasChanged = false;
            this.selectedResourceTypeHasChanged = false;
            this.caracListHasChanged = false;
            this.selectedPrimaryHasChanged = false;
            this.selectedSecondaryHasChanged = false;
        }
    };
    return SearchPageWrapperComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__search_page_resources_search_page_resources_component__["a" /* SearchPageResourcesComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__search_page_resources_search_page_resources_component__["a" /* SearchPageResourcesComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__search_page_resources_search_page_resources_component__["a" /* SearchPageResourcesComponent */]) === "function" && _a || Object)
], SearchPageWrapperComponent.prototype, "searchPageResources", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4__search_page_detail_search_page_detail_component__["a" /* SearchPageDetailComponent */]),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__search_page_detail_search_page_detail_component__["a" /* SearchPageDetailComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__search_page_detail_search_page_detail_component__["a" /* SearchPageDetailComponent */]) === "function" && _b || Object)
], SearchPageWrapperComponent.prototype, "searchPageDetail", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__["a" /* PlaceSelectorComponent */]),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__["a" /* PlaceSelectorComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_view_search_page_place_selector_place_selector_component__["a" /* PlaceSelectorComponent */]) === "function" && _c || Object)
], SearchPageWrapperComponent.prototype, "placeSelectorComponent", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3_app_view_search_page_resource_type_selector_resource_type_selector_component__["a" /* ResourceTypeSelectorComponent */]),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_app_view_search_page_resource_type_selector_resource_type_selector_component__["a" /* ResourceTypeSelectorComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_view_search_page_resource_type_selector_resource_type_selector_component__["a" /* ResourceTypeSelectorComponent */]) === "function" && _d || Object)
], SearchPageWrapperComponent.prototype, "resourceTypeSelectorComponent", void 0);
SearchPageWrapperComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search-page-wrapper',
        template: __webpack_require__(1228),
        styles: [__webpack_require__(1164)]
    }),
    __metadata("design:paramtypes", [])
], SearchPageWrapperComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=search-page-wrapper.component.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_resource_resource_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowCalendarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ShowCalendarComponent = (function () {
    function ShowCalendarComponent(route, router, sanitizer, activeModal, resourceService, translateService, tenantConfigurationService) {
        this.route = route;
        this.router = router;
        this.sanitizer = sanitizer;
        this.activeModal = activeModal;
        this.resourceService = resourceService;
        this.translateService = translateService;
        this.tenantConfigurationService = tenantConfigurationService;
        this.selectedDate = new Date();
        //All day
        this.startTime = '07:00';
        this.endTime = '19:00';
        //Business hours
        this.workDayStart = '07:00';
        this.workDayEnd = '19:00';
        this.loading = true;
        this.events = [];
    }
    ShowCalendarComponent.prototype.ngOnInit = function () {
        this.selectedDate = new Date();
        this.workDayStart = this.tenantConfigurationService.Reports_StartHour;
        this.workDayEnd = this.tenantConfigurationService.Reports_EndHour;
        this.loadData();
    };
    ShowCalendarComponent.prototype.decline = function () {
        this.activeModal.close(false);
    };
    ShowCalendarComponent.prototype.dismiss = function () {
        this.activeModal.dismiss();
    };
    ShowCalendarComponent.prototype.onEventClick = function (_a) {
        var sender = _a.sender, event = _a.event;
        __WEBPACK_IMPORTED_MODULE_4_moment__["locale"]('fr');
        var title = this.translateService.instant('TOOLTIP-NO-TITLE');
        if (event.title) {
            title = event.title;
        }
        var strTmp = title
            + '\n\n' + this.translateService.instant('TOOLTIP-START') + __WEBPACK_IMPORTED_MODULE_4_moment__(event.start).format('dddd DD/MM/YYYY HH:mm')
            + '\n' + this.translateService.instant('TOOLTIP-END') + __WEBPACK_IMPORTED_MODULE_4_moment__(event.end).format('dddd DD/MM/YYYY HH:mm')
            + '\n\n' + this.translateService.instant('TOOLTIP-LOCATION') + event.description;
        alert(strTmp);
    };
    ShowCalendarComponent.prototype.loadData = function () {
        var _this = this;
        var idResource;
        //let data: any[] = [0];
        var data;
        var data2;
        data = [0];
        this.events = [];
        this.loading = true;
        //Get Data
        this.getData()
            .then(function (r) {
            data = r;
            data.forEach(function (element) {
                element.description = _this.label;
            });
            _this.events = data;
            _this.loading = false;
        })
            .catch(function (err) {
            // console.log("err => chargement des événements");
            _this.loading = false;
        });
    };
    ShowCalendarComponent.prototype.getData = function () {
        // keep this for Promise
        var that = this;
        return new Promise(function (resolve, reject) {
            that.resourceService.getCalendar(that.id).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject();
            });
        });
    };
    return ShowCalendarComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], ShowCalendarComponent.prototype, "id", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ShowCalendarComponent.prototype, "label", void 0);
ShowCalendarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-show-calendar',
        template: __webpack_require__(1230),
        styles: [__webpack_require__(1166)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DomSanitizer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5_app_services_resource_resource_service__["a" /* ResourceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_services_resource_resource_service__["a" /* ResourceService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["d" /* TenantConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["d" /* TenantConfigurationService */]) === "function" && _g || Object])
], ShowCalendarComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=show-calendar.component.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__show_mapwize_component__ = __webpack_require__(235);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowMapwizeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ShowMapwizeService = (function () {
    function ShowMapwizeService(modalService) {
        this.modalService = modalService;
    }
    ShowMapwizeService.prototype.show = function (venue, resource) {
        var modalRef = this.modalService.open(__WEBPACK_IMPORTED_MODULE_2__show_mapwize_component__["a" /* ShowMapwizeComponent */], { windowClass: 'modal-dialog-centered', size: 'lg' });
        modalRef.componentInstance.venue = venue;
        modalRef.componentInstance.resource = resource;
        return modalRef.result;
    };
    return ShowMapwizeService;
}());
ShowMapwizeService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _a || Object])
], ShowMapwizeService);

var _a;
//# sourceMappingURL=show-mapwize.service.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowUrlComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ShowUrlComponent = (function () {
    function ShowUrlComponent(route, router, sanitizer, activeModal) {
        this.route = route;
        this.router = router;
        this.sanitizer = sanitizer;
        this.activeModal = activeModal;
        // URL must be like http://localhost:4200/?room=eqwater/jupiter&mainColor=00AAFF
        // this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://maps.mapwize.io/nosplash#/p/'
        //   + this.decryptedRoom
        //   + '?k='
        //   + this.decryptedMapwizeKey
        //   + '&u=concrete&l=fr&z=21&mainColor=00AAFF');
    }
    ShowUrlComponent.prototype.ngOnInit = function () {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlParam);
    };
    ShowUrlComponent.prototype.decline = function () {
        this.activeModal.close(false);
    };
    ShowUrlComponent.prototype.dismiss = function () {
        this.activeModal.dismiss();
    };
    return ShowUrlComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ShowUrlComponent.prototype, "title", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ShowUrlComponent.prototype, "urlParam", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ShowUrlComponent.prototype, "btnOkText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ShowUrlComponent.prototype, "btnCancelText", void 0);
ShowUrlComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-show-url',
        template: __webpack_require__(1232),
        styles: [__webpack_require__(1168)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DomSanitizer */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ng_bootstrap_ng_bootstrap__["c" /* NgbActiveModal */]) === "function" && _d || Object])
], ShowUrlComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=show-url.component.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Office365LocalStorageService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Office365LocalStorageService = (function () {
    function Office365LocalStorageService() {
    }
    Object.defineProperty(Office365LocalStorageService.prototype, "userOffice365", {
        get: function () {
            var user = localStorage.getItem('office365_user');
            return this.getObject(user);
        },
        set: function (user) {
            localStorage.setItem('office365_user', JSON.stringify(user));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Office365LocalStorageService.prototype, "tokenOffice365", {
        get: function () {
            return localStorage.getItem('office365_token');
        },
        set: function (token) {
            localStorage.setItem('office365_token', token);
        },
        enumerable: true,
        configurable: true
    });
    Office365LocalStorageService.prototype.getObject = function (object) {
        if (object !== 'undefined') {
            return JSON.parse(object);
        }
        else {
            return null;
        }
    };
    return Office365LocalStorageService;
}());
Office365LocalStorageService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], Office365LocalStorageService);

//# sourceMappingURL=office365LocalStorage.service.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_utils__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_location_resource__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_location_searchResource__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_location_sub_charac__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_location_sub_charactype_complement_type__ = __webpack_require__(824);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_location_sub_picture__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_model_location_calendar_item__ = __webpack_require__(819);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var ResourceService = (function () {
    function ResourceService(http, pathService, appConfigurationService) {
        this.http = http;
        this.pathService = pathService;
        this.appConfigurationService = appConfigurationService;
    }
    // get resource by id
    ResourceService.prototype.getResourceById = function (id) {
        var _this = this;
        var data;
        return this.http.get(this.pathService.getApiPath('RESOURCE-SEARCH') + '/' + id)
            .map(function (res) {
            var resource = res.json();
            var data = new __WEBPACK_IMPORTED_MODULE_5__model_location_resource__["a" /* Resource */](resource);
            data.charac.forEach(function (car) {
                car.pictogramFullPath = _this.appConfigurationService.pictoAddress + car.pictogram;
            });
            return data;
        });
    };
    ResourceService.prototype.getCaracTypeByResourceType = function (id) {
        var _this = this;
        var data = [];
        return this.http.get(this.pathService.getApiPath('RESOURCE-TYPE') + '/' + id + "/characTypeResourceType")
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_4__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_8__model_location_sub_charac__["a" /* Charac */](tmp);
                tmp2.pictogramFullPath = _this.appConfigurationService.pictoAddress + tmp2.pictogramFullPath;
                data.push(tmp2);
            });
            return data;
        });
    };
    ResourceService.prototype.getCaracTypeByComplementType = function (id) {
        var data = [];
        return this.http.get(this.pathService.getApiPath('COMPLEMENT-TYPE') + '/' + id + "/characTypeComplementType")
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_4__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_9__model_location_sub_charactype_complement_type__["a" /* CharacTypeComplementType */](tmp);
                data.push(tmp2);
            });
            return data;
        });
    };
    ResourceService.prototype.searchResource = function (searchedText, startDate, endDate, pageType, idAncestor) {
        var _this = this;
        var options = null;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]();
        options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
        options.headers.append('search', searchedText);
        var searchURI = this.pathService.getApiPath('RESOURCE');
        if (startDate && endDate) {
            searchURI +=
                "?startDate=" + startDate
                    + "&endDate=" + endDate;
        }
        else
            searchURI += "?";
        if (pageType === 0) {
            //SearchPage
            searchURI = searchURI + "&visibleInSearchPage=true";
        }
        else if (pageType === 1) {
            //AvailabilityPage
            searchURI = searchURI + "&visibleInAvailabilityPage=true";
        }
        if (idAncestor) {
            searchURI = searchURI + "&place=" + idAncestor;
        }
        var data = [];
        return this.http.get(searchURI, options)
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_4__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_7__model_location_searchResource__["a" /* SearchResource */](tmp);
                tmp2.resource.charac.forEach(function (car) {
                    car.pictogramFullPath = _this.appConfigurationService.pictoAddress + car.pictogram;
                });
                data.push(tmp2);
            });
            var sortedData = data.sort(function (n1, n2) {
                // Sort by availability
                if (n1.isAvailale < n2.isAvailale) {
                    return 1;
                }
                if (n1.isAvailale > n2.isAvailale) {
                    return -1;
                }
                // Same availability => sort by name
                if (n1.resource.label > n2.resource.label) {
                    return 1;
                }
                if (n1.resource.label < n2.resource.label) {
                    return -1;
                }
                return 0;
            });
            return sortedData;
        });
    };
    ResourceService.prototype.getPictures = function (id) {
        var data = [];
        return this.http.get(this.pathService.getApiPath('RESOURCE-PICTURES') + id)
            .map(function (res) {
            var list = res.json();
            list.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_4__model_utils__["a" /* Serializable */](element);
                var tmp2 = new __WEBPACK_IMPORTED_MODULE_10__model_location_sub_picture__["a" /* Picture */](tmp);
                data.push(tmp2);
            });
            return data;
        });
    };
    ResourceService.prototype.getCalendar = function (id) {
        var data = [];
        var start = __WEBPACK_IMPORTED_MODULE_11_moment__().add(-15, 'days').unix() * 1000;
        var end = __WEBPACK_IMPORTED_MODULE_11_moment__().add(2, 'months').unix() * 1000;
        return this.http.get(this.pathService.getApiPath('RESOURCE')
            + '/' + id
            + '/calendar'
            + '?startDate=' + start
            + '&endDate=' + end)
            .map(function (res) {
            var list = res.json();
            list.appointments.forEach(function (element) {
                var tmp = new __WEBPACK_IMPORTED_MODULE_12_app_model_location_calendar_item__["a" /* CalendarItem */]();
                tmp.title = element.title;
                var dStart = new Date(0); // The 0 there is the key, which sets the date to the epoch
                dStart.setUTCMilliseconds(element.start_date);
                var momentObjStart = __WEBPACK_IMPORTED_MODULE_11_moment__(dStart);
                tmp.start = momentObjStart.toDate();
                var dEnd = new Date(0); // The 0 there is the key, which sets the date to the epoch
                dEnd.setUTCMilliseconds(element.end_date);
                var momentObjEnd = __WEBPACK_IMPORTED_MODULE_11_moment__(dEnd);
                tmp.end = momentObjEnd.toDate();
                tmp.description = '?';
                data.push(tmp);
            });
            return data;
        });
    };
    return ResourceService;
}());
ResourceService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["c" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["c" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["e" /* PathService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["e" /* PathService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _c || Object])
], ResourceService);

var _a, _b, _c;
//# sourceMappingURL=resource.service.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_modules_localStorage_services_infoLocalStorage_service__ = __webpack_require__(390);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_app_modules_localStorage_services_infoLocalStorage_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__localStorage_module__ = __webpack_require__(837);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__localStorage_module__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 789:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 789;


/***/ }),

/***/ 790:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(803);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(816);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(154);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
// platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]).then(function (ref) {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
        window['ngRef'].destroy();
    }
    window['ngRef'] = ref;
    // Otherise, log the boot error
}).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 814:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_services_auth_guard__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_view_search_page_search_page_wrapper_search_page_wrapper_component__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_view_home_home_component__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_view_my_reservations_my_reservations_wrapper_my_reservations_wrapper_component__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__view_my_settings_my_settings_wrapper_my_settings_wrapper_component__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__view_availabilities_availabilities_wrapper_availabilities_wrapper_component__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_view_mapwize_mapwize_component__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_view_search_page_show_mapwize_show_mapwize_component__ = __webpack_require__(235);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// import { BiViewerComponent } from 'app/view/bi-viewer/bi-viewer.component';





// setup allowed routes and associated components


var routes = [
    {
        path: './',
        redirectTo: 'home',
        canActivate: [__WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_services_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'home',
        component: __WEBPACK_IMPORTED_MODULE_4_app_view_home_home_component__["a" /* HomeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_services_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'search-page',
        component: __WEBPACK_IMPORTED_MODULE_3_app_view_search_page_search_page_wrapper_search_page_wrapper_component__["a" /* SearchPageWrapperComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_services_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'my-reservations',
        component: __WEBPACK_IMPORTED_MODULE_5_app_view_my_reservations_my_reservations_wrapper_my_reservations_wrapper_component__["a" /* MyReservationsWrapperComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_services_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'availabilities',
        component: __WEBPACK_IMPORTED_MODULE_7__view_availabilities_availabilities_wrapper_availabilities_wrapper_component__["a" /* AvailabilitiesWrapperComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_services_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'my-settings',
        component: __WEBPACK_IMPORTED_MODULE_6__view_my_settings_my_settings_wrapper_my_settings_wrapper_component__["a" /* MySettingsWrapperComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_services_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'mapwize',
        component: __WEBPACK_IMPORTED_MODULE_8_app_view_mapwize_mapwize_component__["a" /* MapwizeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_services_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'show-mapwize',
        component: __WEBPACK_IMPORTED_MODULE_9_app_view_search_page_show_mapwize_show_mapwize_component__["a" /* ShowMapwizeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_services_auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */],
        ],
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_translate__ = __webpack_require__(838);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_modules_authentication__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_localStorage_services_office365LocalStorage_service__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = (function () {
    function AppComponent(translate, authService, office365LocalStorageService, appConfigurationService, router) {
        var _this = this;
        this.translate = translate;
        this.authService = authService;
        this.office365LocalStorageService = office365LocalStorageService;
        this.appConfigurationService = appConfigurationService;
        this.router = router;
        translate.addLangs(__WEBPACK_IMPORTED_MODULE_2_app_modules_translate__["a" /* LANGUAGES */]);
        translate.setDefaultLang(__WEBPACK_IMPORTED_MODULE_2_app_modules_translate__["a" /* LANGUAGES */][0]);
        translate.use(translate.getBrowserLang());
        this.userDisplayName = '';
        this.authService._isOnLoginPageAuthenticated$.subscribe(function (value) {
            // SetTimeOut to avoid ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(function () {
                _this.isNotOnLoginPage = !value;
            }, 0);
        });
        if (this.appConfigurationService.env === "PROD") {
            this.router.events.subscribe(function (event) {
                if (event instanceof __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* NavigationEnd */]) {
                    window.ga('set', 'page', event.urlAfterRedirects);
                    window.ga('send', 'pageview');
                    if (_this.office365LocalStorageService.userOffice365) {
                        _this.userDisplayName = _this.office365LocalStorageService.userOffice365.givenName + ' ' + _this.office365LocalStorageService.userOffice365.surname;
                    }
                }
            });
        }
        else {
            this.router.events.subscribe(function (event) {
                if (event instanceof __WEBPACK_IMPORTED_MODULE_4__angular_router__["d" /* NavigationEnd */]) {
                    if (_this.office365LocalStorageService.userOffice365) {
                        _this.userDisplayName = _this.office365LocalStorageService.userOffice365.givenName + ' ' + _this.office365LocalStorageService.userOffice365.surname;
                    }
                }
            });
        }
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(1209),
        styles: [__webpack_require__(1146)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_app_modules_authentication__["b" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_app_modules_authentication__["b" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === "function" && _e || Object])
], AppComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 816:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ng_bootstrap_ng_bootstrap__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_carousel__ = __webpack_require__(1190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular_font_awesome_angular_font_awesome__ = __webpack_require__(812);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular_2_dropdown_multiselect__ = __webpack_require__(1039);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts__ = __webpack_require__(1177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(804);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__progress_kendo_angular_scheduler__ = __webpack_require__(869);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_tree_tree_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_report_report_service__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_bi_bi_service__ = __webpack_require__(842);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_bi_bi_report_service__ = __webpack_require__(840);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_bi_bi_t1_report_service__ = __webpack_require__(841);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_reservation_reservation_service__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_resource_resource_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_mapwize_mapwize_service__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__app_component__ = __webpack_require__(815);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__view_navbar_navbar_component__ = __webpack_require__(849);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__view_partial_img_secure_img_secure_component__ = __webpack_require__(850);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_tools_pipe_report_location_search_pipe__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_tools_pipe_reservation_state_pipe__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_app_modules_authentication__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_app_app_routing_module__ = __webpack_require__(814);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ngx_translate_http_loader__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_tools_pipe_datex_pipe__ = __webpack_require__(843);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_ngx_loading__ = __webpack_require__(1197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_ngx_treeview__ = __webpack_require__(1199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_ng2_tree__ = __webpack_require__(1178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32_ng2_tree___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_32_ng2_tree__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__view_home_home_component__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__view_my_reservations_my_reservations_wrapper_my_reservations_wrapper_component__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__view_my_reservations_my_reservations_master_my_reservations_master_component__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__view_my_reservations_my_reservations_detail_my_reservations_detail_component__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__view_search_page_search_page_wrapper_search_page_wrapper_component__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__view_search_page_search_page_resources_search_page_resources_component__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__view_search_page_search_page_detail_search_page_detail_component__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__view_search_page_dates_selector_dates_selector_component__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__globals__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__view_search_page_resource_type_selector_resource_type_selector_component__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__view_search_page_place_selector_place_selector_component__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__view_search_page_search_text_selector_search_text_selector_component__ = __webpack_require__(851);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__view_my_settings_my_settings_wrapper_my_settings_wrapper_component__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__view_my_settings_my_settings_favourite_places_my_settings_favourite_places_component__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__view_confirmation_dialog_confirmation_dialog_component__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__view_confirmation_dialog_confirmation_dialog_service__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__view_search_page_show_url_show_url_component__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__view_search_page_show_calendar_show_calendar_component__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__view_search_page_show_url_show_url_service__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__view_search_page_show_calendar_show_calendar_service__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__view_search_page_show_mapwize_show_mapwize_service__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__progress_kendo_angular_intl_locales_fr_all__ = __webpack_require__(861);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__view_mapwize_mapwize_component__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__view_search_page_show_mapwize_show_mapwize_component__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__view_availabilities_availabilities_wrapper_availabilities_wrapper_component__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__services_tools_pipe_filter_search_pipe__ = __webpack_require__(844);
/* unused harmony export loadConfiguration */
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
































// import { TreeModule } from 'angular-tree-component';



























function loadConfiguration(configService) {
    return function () { return configService.load(); };
}
// export function loadTenantConfiguration(tenantConfigService: TenantConfigurationService): () => void {
//     return () => tenantConfigService.load();
// }
function createTranslateLoader(configService, http) {
    return new __WEBPACK_IMPORTED_MODULE_28__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, configService.urlV2 + 'assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_20__view_navbar_navbar_component__["a" /* NavbarComponent */],
            __WEBPACK_IMPORTED_MODULE_21__view_partial_img_secure_img_secure_component__["a" /* ImgSecureComponent */],
            __WEBPACK_IMPORTED_MODULE_22__services_tools_pipe_report_location_search_pipe__["a" /* ReportLocationSearchPipe */],
            __WEBPACK_IMPORTED_MODULE_23__services_tools_pipe_reservation_state_pipe__["a" /* ReservationStatePipe */],
            __WEBPACK_IMPORTED_MODULE_29__services_tools_pipe_datex_pipe__["a" /* DatexPipe */],
            __WEBPACK_IMPORTED_MODULE_33__view_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_37__view_search_page_search_page_wrapper_search_page_wrapper_component__["a" /* SearchPageWrapperComponent */],
            __WEBPACK_IMPORTED_MODULE_38__view_search_page_search_page_resources_search_page_resources_component__["a" /* SearchPageResourcesComponent */],
            __WEBPACK_IMPORTED_MODULE_39__view_search_page_search_page_detail_search_page_detail_component__["a" /* SearchPageDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_34__view_my_reservations_my_reservations_wrapper_my_reservations_wrapper_component__["a" /* MyReservationsWrapperComponent */],
            __WEBPACK_IMPORTED_MODULE_35__view_my_reservations_my_reservations_master_my_reservations_master_component__["a" /* MyReservationsMasterComponent */],
            __WEBPACK_IMPORTED_MODULE_36__view_my_reservations_my_reservations_detail_my_reservations_detail_component__["a" /* MyReservationsDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_40__view_search_page_dates_selector_dates_selector_component__["a" /* DatesSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_42__view_search_page_resource_type_selector_resource_type_selector_component__["a" /* ResourceTypeSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_43__view_search_page_place_selector_place_selector_component__["a" /* PlaceSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_44__view_search_page_search_text_selector_search_text_selector_component__["a" /* SearchTextSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_45__view_my_settings_my_settings_wrapper_my_settings_wrapper_component__["a" /* MySettingsWrapperComponent */],
            __WEBPACK_IMPORTED_MODULE_46__view_my_settings_my_settings_favourite_places_my_settings_favourite_places_component__["a" /* MySettingsFavouritePlacesComponent */],
            __WEBPACK_IMPORTED_MODULE_47__view_confirmation_dialog_confirmation_dialog_component__["a" /* ConfirmationDialogComponent */],
            __WEBPACK_IMPORTED_MODULE_49__view_search_page_show_url_show_url_component__["a" /* ShowUrlComponent */],
            __WEBPACK_IMPORTED_MODULE_50__view_search_page_show_calendar_show_calendar_component__["a" /* ShowCalendarComponent */],
            __WEBPACK_IMPORTED_MODULE_57__view_availabilities_availabilities_wrapper_availabilities_wrapper_component__["a" /* AvailabilitiesWrapperComponent */],
            __WEBPACK_IMPORTED_MODULE_55__view_mapwize_mapwize_component__["a" /* MapwizeComponent */],
            __WEBPACK_IMPORTED_MODULE_56__view_search_page_show_mapwize_show_mapwize_component__["a" /* ShowMapwizeComponent */],
            __WEBPACK_IMPORTED_MODULE_58__services_tools_pipe_filter_search_pipe__["a" /* FilterSearchPipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_carousel__["a" /* CarouselModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts__["ChartsModule"],
            __WEBPACK_IMPORTED_MODULE_2_angular_font_awesome_angular_font_awesome__["a" /* AngularFontAwesomeModule */],
            __WEBPACK_IMPORTED_MODULE_3_angular_2_dropdown_multiselect__["a" /* MultiselectDropdownModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_7__progress_kendo_angular_scheduler__["a" /* SchedulerModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_10__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_9__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_24_app_modules_authentication__["a" /* AuthenticationModule */],
            __WEBPACK_IMPORTED_MODULE_25_app_modules_core__["a" /* CoreModule */],
            __WEBPACK_IMPORTED_MODULE_26_app_app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_30_ngx_loading__["a" /* LoadingModule */].forRoot({
                animationType: __WEBPACK_IMPORTED_MODULE_30_ngx_loading__["b" /* ANIMATION_TYPES */].threeBounce,
                backdropBackgroundColour: 'rgba(255,255,255,1)',
                backdropBorderRadius: '2px',
                primaryColour: '#00aaff',
                secondaryColour: '#00aaff',
                tertiaryColour: '#00aaff'
            }),
            __WEBPACK_IMPORTED_MODULE_27__ngx_translate_core__["a" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_27__ngx_translate_core__["b" /* TranslateLoader */],
                    useFactory: createTranslateLoader,
                    deps: [__WEBPACK_IMPORTED_MODULE_25_app_modules_core__["b" /* AppConfigurationService */], __WEBPACK_IMPORTED_MODULE_9__angular_http__["b" /* Http */]],
                },
            }),
            __WEBPACK_IMPORTED_MODULE_31_ngx_treeview__["a" /* TreeviewModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_32_ng2_tree__["TreeModule"],
        ],
        providers: [
            {
                provide: __WEBPACK_IMPORTED_MODULE_8__angular_core__["APP_INITIALIZER"],
                useFactory: loadConfiguration,
                deps: [__WEBPACK_IMPORTED_MODULE_25_app_modules_core__["b" /* AppConfigurationService */]],
                multi: true,
            },
            { provide: __WEBPACK_IMPORTED_MODULE_8__angular_core__["LOCALE_ID"], useValue: 'fr' },
            // {
            //     provide: APP_INITIALIZER,
            //     useFactory: loadTenantConfiguration,
            //     deps: [TenantConfigurationService],
            //     multi: true,
            // },
            __WEBPACK_IMPORTED_MODULE_12__services_report_report_service__["a" /* ReportService */],
            __WEBPACK_IMPORTED_MODULE_11__services_tree_tree_service__["a" /* TreeService */],
            __WEBPACK_IMPORTED_MODULE_13__services_bi_bi_service__["a" /* BIService */],
            __WEBPACK_IMPORTED_MODULE_14__services_bi_bi_report_service__["a" /* BIReportService */],
            __WEBPACK_IMPORTED_MODULE_15__services_bi_bi_t1_report_service__["a" /* BIT1ReportsService */],
            __WEBPACK_IMPORTED_MODULE_16__services_reservation_reservation_service__["a" /* ReservationService */],
            __WEBPACK_IMPORTED_MODULE_17__services_resource_resource_service__["a" /* ResourceService */],
            __WEBPACK_IMPORTED_MODULE_18__services_mapwize_mapwize_service__["a" /* MapwizeService */],
            __WEBPACK_IMPORTED_MODULE_25_app_modules_core__["c" /* HttpService */],
            __WEBPACK_IMPORTED_MODULE_25_app_modules_core__["b" /* AppConfigurationService */],
            __WEBPACK_IMPORTED_MODULE_25_app_modules_core__["d" /* TenantConfigurationService */],
            __WEBPACK_IMPORTED_MODULE_48__view_confirmation_dialog_confirmation_dialog_service__["a" /* ConfirmationDialogService */],
            __WEBPACK_IMPORTED_MODULE_51__view_search_page_show_url_show_url_service__["a" /* ShowUrlService */],
            __WEBPACK_IMPORTED_MODULE_52__view_search_page_show_calendar_show_calendar_service__["a" /* ShowCalendarService */],
            __WEBPACK_IMPORTED_MODULE_38__view_search_page_search_page_resources_search_page_resources_component__["a" /* SearchPageResourcesComponent */],
            __WEBPACK_IMPORTED_MODULE_39__view_search_page_search_page_detail_search_page_detail_component__["a" /* SearchPageDetailComponent */],
            __WEBPACK_IMPORTED_MODULE_43__view_search_page_place_selector_place_selector_component__["a" /* PlaceSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_42__view_search_page_resource_type_selector_resource_type_selector_component__["a" /* ResourceTypeSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_41__globals__["a" /* Globals */],
            __WEBPACK_IMPORTED_MODULE_53__view_search_page_show_mapwize_show_mapwize_service__["a" /* ShowMapwizeService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_19__app_component__["a" /* AppComponent */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_47__view_confirmation_dialog_confirmation_dialog_component__["a" /* ConfirmationDialogComponent */], __WEBPACK_IMPORTED_MODULE_49__view_search_page_show_url_show_url_component__["a" /* ShowUrlComponent */], __WEBPACK_IMPORTED_MODULE_50__view_search_page_show_calendar_show_calendar_component__["a" /* ShowCalendarComponent */], __WEBPACK_IMPORTED_MODULE_56__view_search_page_show_mapwize_show_mapwize_component__["a" /* ShowMapwizeComponent */]],
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BIReportData; });
var BIReportData = (function () {
    function BIReportData() {
        this.data = [0];
        this.label = '***';
        this.data = [];
    }
    return BIReportData;
}());

//# sourceMappingURL=bi-report-data.js.map

/***/ }),

/***/ 818:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReservationDuration; });
var ReservationDuration = (function () {
    function ReservationDuration() {
        this.data1 = [0];
        this.data2 = [0];
        this.data3 = [0];
        this.data4 = [0];
        this.data1 = [];
        this.data2 = [];
        this.data3 = [];
        this.data4 = [];
    }
    return ReservationDuration;
}());

//# sourceMappingURL=reservation-duration.js.map

/***/ }),

/***/ 819:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarItem; });
var CalendarItem = (function () {
    function CalendarItem(obj) {
        this.title = obj && obj.title || null;
        this.description = obj && obj.description || null;
        this.start = obj && obj.start || null;
        this.end = obj && obj.end || null;
    }
    return CalendarItem;
}());

//# sourceMappingURL=calendar-item.js.map

/***/ }),

/***/ 820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationType; });
var LocationType = (function () {
    function LocationType(obj) {
        var _this = this;
        this.id = obj && obj.id || null;
        this.label = obj && obj.label || null;
        // this.id_place_type_parent = obj && obj.id_place_type_parent || null;
        this.id_place_type_parent = (obj && obj.id_place_type_parent) || null;
        this.value = obj && obj.label || null;
        if (obj && obj.children) {
            obj && obj.children.forEach(function (child) {
                _this.children.push(child);
            });
        }
    }
    return LocationType;
}());

//# sourceMappingURL=location-type.js.map

/***/ }),

/***/ 821:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Address; });
var Address = (function () {
    function Address(obj) {
        this.id = obj && obj.id || null;
        this.latitude = obj && obj.latitude || null;
        this.longitude = obj && obj.longitude || null;
        this.address = obj && obj.address || null;
    }
    return Address;
}());

//# sourceMappingURL=address.js.map

/***/ }),

/***/ 822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Attendee; });
var Attendee = (function () {
    // public enum EReservationResponseType
    // {
    //     None,
    //     TentativelyAccepted,
    //     Accepted,
    //     Declined,
    //     NotResponded
    // }
    function Attendee(obj) {
        this.id = obj && obj.id || null;
        this.email_address = obj && obj.email_address || null;
        this.id_reservation = obj && obj.id_reservation || null;
        this.response_type = obj && obj.response_type || null;
    }
    return Attendee;
}());

//# sourceMappingURL=attendee.js.map

/***/ }),

/***/ 823:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CharacComplementType; });
var CharacComplementType = (function () {
    function CharacComplementType(obj) {
        this.id = obj && obj.id || null;
        this.value = obj && obj.value || null;
        this.type = obj && obj.type || null;
        this.reservation = obj && obj.reservation || null;
        this.tenant_id = obj && obj.tenant_id || null;
        this.id_charactype_complement_type = obj && obj.id_charactype_complement_type || null;
    }
    return CharacComplementType;
}());

//# sourceMappingURL=charac-complement-type.js.map

/***/ }),

/***/ 824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CharacTypeComplementType; });
var CharacTypeComplementType = (function () {
    function CharacTypeComplementType(obj) {
        this.id = obj && obj.id || null;
        this.label = obj && obj.label || null;
        this.mandatory = obj && obj.mandatory || null;
        this.tenantId = obj && obj.tenantId || null;
        this.id_complement_type = obj && obj.id_complement_type || null;
        this.type = obj && obj.type || null;
    }
    return CharacTypeComplementType;
}());

//# sourceMappingURL=charactype-complement-type.js.map

/***/ }),

/***/ 825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Complement; });
var Complement = (function () {
    function Complement(obj) {
    }
    return Complement;
}());

//# sourceMappingURL=complement.js.map

/***/ }),

/***/ 826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sub_incident__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__location_place__ = __webpack_require__(146);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Report; });


var Report = (function () {
    function Report(obj) {
        var _this = this;
        this.incident_type = new __WEBPACK_IMPORTED_MODULE_0__sub_incident__["a" /* Incident */]();
        this.image_ids = [];
        this.location_parents = [];
        this.bread_crumb = '';
        this.id = obj && obj.id || null;
        if (obj && obj.create_date && typeof obj.create_date === 'number') {
            this.create_date = obj && new Date(obj.create_date) || null;
        }
        else {
            this.create_date = obj && obj.create_date || null;
        }
        this.report_state = obj && obj.report_state || null;
        this.description = obj && obj.description || null;
        if (obj && obj.incident_type) {
            this.incident_type = new __WEBPACK_IMPORTED_MODULE_0__sub_incident__["a" /* Incident */](obj.incident_type);
        }
        this.reporter = obj && obj.reporter || '';
        this.location_type = obj && obj.location_type || null;
        this.location_id = obj && obj.location_id || null;
        this.location_label = obj && obj.location_label || null;
        this.location_type_label = obj && obj.location_type_label || null;
        this.invalid_reason = obj && obj.invalid_reason || '';
        if (obj && obj.location_parents) {
            obj.location_parents.forEach(function (p) {
                if (p.label)
                    _this.bread_crumb += p.label + ' > ';
                _this.location_parents.push(new __WEBPACK_IMPORTED_MODULE_1__location_place__["a" /* Place */](p));
            });
        }
        if (obj && obj.image_ids) {
            obj.image_ids.forEach(function (i) {
                _this.image_ids.push(i);
            });
        }
    }
    return Report;
}());

//# sourceMappingURL=report.js.map

/***/ }),

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_views_login_component__ = __webpack_require__(388);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var checkupRoutes = [
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_views_login_component__["a" /* LoginComponent */],
    },
];
var AuthenticationRoutingModule = (function () {
    function AuthenticationRoutingModule() {
    }
    return AuthenticationRoutingModule;
}());
AuthenticationRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild(checkupRoutes),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */],
        ],
    })
], AuthenticationRoutingModule);

//# sourceMappingURL=authentication-routing.modules.js.map

/***/ }),

/***/ 828:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_services_auth_guard__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_modules_authentication_services_auth_service__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_modules_authentication_views_login_component__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_modules_authentication_authentication_routing_modules__ = __webpack_require__(827);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_modules_authentication_modules_office365_office365_module__ = __webpack_require__(831);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_modules_authentication_modules_zenoffice_zenoffice_module__ = __webpack_require__(387);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AuthenticationModule = (function () {
    function AuthenticationModule() {
    }
    return AuthenticationModule;
}());
AuthenticationModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5_app_modules_authentication_authentication_routing_modules__["a" /* AuthenticationRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_6_app_modules_core__["a" /* CoreModule */],
            __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["a" /* TranslateModule */].forChild(),
            __WEBPACK_IMPORTED_MODULE_8_app_modules_authentication_modules_office365_office365_module__["a" /* Office365Module */],
            __WEBPACK_IMPORTED_MODULE_9_app_modules_authentication_modules_zenoffice_zenoffice_module__["a" /* ZenOfficeModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4_app_modules_authentication_views_login_component__["a" /* LoginComponent */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_services_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_3_app_modules_authentication_services_auth_service__["a" /* AuthService */],
        ],
        exports: [],
    })
], AuthenticationModule);

//# sourceMappingURL=authentication.module.js.map

/***/ }),

/***/ 829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_app_modules_authentication_modules_office365_services_graphHelper_service__ = __webpack_require__(225);
/* unused harmony reexport GraphHelperService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_authentication_modules_office365_services_office365_service__ = __webpack_require__(386);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1_app_modules_authentication_modules_office365_services_office365_service__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 830:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User365; });
var User365 = (function () {
    function User365() {
    }
    return User365;
}());

//# sourceMappingURL=user365.model.js.map

/***/ }),

/***/ 831:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_modules_office365_services_graphHelper_service__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_modules_authentication_modules_office365_services_office365_service__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_modules_localStorage__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_modules_authentication_modules_zenoffice_zenoffice_module__ = __webpack_require__(387);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Office365Module; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var Office365Module = (function () {
    function Office365Module() {
    }
    return Office365Module;
}());
Office365Module = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4_app_modules_localStorage__["b" /* LocalStorageModule */],
            __WEBPACK_IMPORTED_MODULE_5_app_modules_authentication_modules_zenoffice_zenoffice_module__["a" /* ZenOfficeModule */],
        ],
        declarations: [],
        providers: [
            __WEBPACK_IMPORTED_MODULE_2_app_modules_authentication_modules_office365_services_graphHelper_service__["a" /* GraphHelperService */],
            __WEBPACK_IMPORTED_MODULE_3_app_modules_authentication_modules_office365_services_office365_service__["a" /* Office365Service */],
        ],
        exports: [],
    })
], Office365Module);

//# sourceMappingURL=office365.module.js.map

/***/ }),

/***/ 832:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_user365_model__ = __webpack_require__(830);
/* harmony export (immutable) */ __webpack_exports__["a"] = transformFromOfficeToUserInfo;

function transformFromOfficeToUserInfo(officeUser) {
    var userInfo = new __WEBPACK_IMPORTED_MODULE_0__models_user365_model__["a" /* User365 */]();
    userInfo.displayName = officeUser.displayName;
    userInfo.givenName = officeUser.givenName;
    userInfo.id = officeUser.id;
    userInfo.jobTitle = officeUser.jobTitle;
    userInfo.mail = officeUser.mail;
    userInfo.surname = officeUser.surname;
    userInfo.userPrincipalName = officeUser.userPrincipalName;
    return userInfo;
}
//# sourceMappingURL=office365.transformer.js.map

/***/ }),

/***/ 833:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_core_services_http_service__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_modules_core_views_alert_component__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_modules_core_services_alert_service__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_modules_translate_translate_module__ = __webpack_require__(839);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_path_service__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_app_configuration_service__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_tenant_configuration_service__ = __webpack_require__(389);
/* unused harmony export httpFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













function httpFactory(backend, options, router, infoLStorageService, office365LocalStorageService, alertService, pathService) {
    return new __WEBPACK_IMPORTED_MODULE_2_app_modules_core_services_http_service__["a" /* HttpService */](backend, options, router, infoLStorageService, office365LocalStorageService, alertService, pathService);
}
var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_8__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage__["b" /* LocalStorageModule */],
            __WEBPACK_IMPORTED_MODULE_7_app_modules_translate_translate_module__["a" /* TranslateModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5_app_modules_core_views_alert_component__["a" /* AlertComponent */],
        ],
        providers: [
            {
                provide: __WEBPACK_IMPORTED_MODULE_2_app_modules_core_services_http_service__["a" /* HttpService */],
                useFactory: httpFactory,
                deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* XHRBackend */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */], __WEBPACK_IMPORTED_MODULE_3_app_modules_localStorage__["a" /* InfoLocalStorageService */], __WEBPACK_IMPORTED_MODULE_6_app_modules_core_services_alert_service__["a" /* AlertService */], __WEBPACK_IMPORTED_MODULE_9__services_path_service__["a" /* PathService */]]
            },
            __WEBPACK_IMPORTED_MODULE_6_app_modules_core_services_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_9__services_path_service__["a" /* PathService */],
            __WEBPACK_IMPORTED_MODULE_10__services_app_configuration_service__["a" /* AppConfigurationService */],
            __WEBPACK_IMPORTED_MODULE_11__services_tenant_configuration_service__["a" /* TenantConfigurationService */],
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_5_app_modules_core_views_alert_component__["a" /* AlertComponent */],
        ],
    })
], CoreModule);

//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ 834:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserLocal; });
var UserLocal = (function () {
    function UserLocal(obj) {
        this.login = obj && obj.login || null;
        this.password = obj && obj.password || null;
        this.ask_remember_me = obj && obj.ask_remember_me === 'true' || false;
        this.remember_me_token = obj && obj.remember_me_token || null;
    }
    return UserLocal;
}());

//# sourceMappingURL=user-local.model.js.map

/***/ }),

/***/ 835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return API_ROUTES_NAME; });
var API_ROUTES_NAME = {
    'LOGIN': 'login',
    'LOGIN_OAUTH': 'login/oauth/',
    'REPORT': 'report',
    'RESERVATION-SEARCH': 'reservation',
    'RESOURCE-SEARCH': 'resource',
    'REPORT-SEARCH': 'report/search',
    'REPORT-STATE': 'report/state',
    'REPORT-INCIDENT-ALL': 'report/incident/all',
    'REPORT-INCIDENT-PLACE': 'report/incident/place',
    'REPORT-INCIDENT-RESOURCE': 'report/incident/resource',
    'REPORT-IMAGE': 'report/image',
    'PLACE': 'place',
    'FAVOURITE-PLACES': 'place/preferred',
    'ALL-PLACES': 'place/tree/all',
    'PLACE-TYPE': 'placeType',
    'RESOURCE': 'resource',
    'RESOURCE-TYPE': 'resourceType',
    'RESOURCE-PICTURES': '/picture/resource/all/',
    'CHARAC-TYPE-RESOURCE-TYPE': 'characTypeResourceType',
    'COMPLEMENT-TYPE': 'complementType',
    'BI': 'bi',
    'RESERVATION': 'reservation',
    'REALTIME-OCCUPANCY-RATE': 'reporting/occupancy-rate',
    'REALTIME-RESERVATIONS-COUNT': 'reporting/reservations-count',
    'OCCUPANCY-RATE': 'reporting/history/resources/occupancy-rates',
    'RESERVATION-DURATION': 'reporting/history/reservations/durations',
    'CANCELLATIONS-COUNT': 'reporting/history/reservations/canceled-count',
    'AVERAGE-DURATION': 'reporting/history/reservations/average-duration',
    'TOP5': 'reporting/history/resources/most-used',
    'REPORTS_COUNT_BY_CATEGORY': 'reporting/reports/count-by-incident',
    'REPORTS_COUNT_BY_STATUS': 'reporting/reports/count-by-state',
    'REPORTS_COUNT_BY_CREATION_DATE': 'reporting/history/reports/count-by-create-date',
    'REPORTS_COUNT_BY_RESOLUTION_DATE': 'reporting/history/reports/count-by-resolve-date',
    'TENANT': 'tenant',
    'FILLING-RATE': 'reporting/history/resource/filling-rate',
    'FILLING-VALUE': 'reporting/history/resource/filling',
    'RESOURCE-USAGE-RATE': 'reporting/history/reservation/resource-usage-rate',
    'CALENDAR': 'calendar'
};
//# sourceMappingURL=api.js.map

/***/ }),

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_core_services_alert_service__ = __webpack_require__(150);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertComponent = (function () {
    function AlertComponent(alertService) {
        var _this = this;
        this.alertService = alertService;
        // console.log('init alert composant');
        this.alertService.alertEmitterSubscriber().subscribe(function (message) {
            // console.log('error:', message);
            _this.displayAlert(message);
        });
    }
    AlertComponent.prototype.displayAlert = function (message) {
        var _this = this;
        // console.log('display alert');
        this.error = message;
        setTimeout(function () {
            _this.error = null;
        }, 5000);
    };
    return AlertComponent;
}());
AlertComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-alert',
        template: __webpack_require__(1211),
        styles: [__webpack_require__(1148)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_modules_core_services_alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_modules_core_services_alert_service__["a" /* AlertService */]) === "function" && _a || Object])
], AlertComponent);

var _a;
//# sourceMappingURL=alert.component.js.map

/***/ }),

/***/ 837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_localStorage_services_infoLocalStorage_service__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_localStorage_services_office365LocalStorage_service__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalStorageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LocalStorageModule = (function () {
    function LocalStorageModule() {
    }
    return LocalStorageModule;
}());
LocalStorageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [],
        declarations: [],
        providers: [
            __WEBPACK_IMPORTED_MODULE_1_app_modules_localStorage_services_infoLocalStorage_service__["a" /* InfoLocalStorageService */],
            __WEBPACK_IMPORTED_MODULE_2_app_modules_localStorage_services_office365LocalStorage_service__["a" /* Office365LocalStorageService */],
        ],
        exports: [],
    })
], LocalStorageModule);

//# sourceMappingURL=localStorage.module.js.map

/***/ }),

/***/ 838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pipes_translate_pipe__ = __webpack_require__(391);
/* unused harmony reexport TranslatePipe */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LANGUAGES; });

var LANGUAGES = ['fr'];
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_translate_pipes_translate_pipe__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_http_loader__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(23);
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslateModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_2__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, '../../../assets/i18n/', '.json');
}
var TranslateModule = (function () {
    function TranslateModule() {
    }
    return TranslateModule;
}());
TranslateModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateModule */].forChild(),
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1_app_modules_translate_pipes_translate_pipe__["a" /* TranslatePipe */],
        ],
        providers: [],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1_app_modules_translate_pipes_translate_pipe__["a" /* TranslatePipe */],
        ],
    })
], TranslateModule);

//# sourceMappingURL=translate.module.js.map

/***/ }),

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_bi_bi_report_data__ = __webpack_require__(817);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BIReportService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BIReportService = (function () {
    function BIReportService(translateService, http, pathService) {
        this.translateService = translateService;
        this.http = http;
        this.pathService = pathService;
    }
    BIReportService.prototype.getActiveReportsByCategory = function () {
        var returndata = [];
        return this.http.get(this.pathService.getApiPath('REPORTS_COUNT_BY_CATEGORY'))
            .map(function (res) {
            var rd = new __WEBPACK_IMPORTED_MODULE_3__model_bi_bi_report_data__["a" /* BIReportData */]();
            res.json().forEach(function (element) {
                rd = new __WEBPACK_IMPORTED_MODULE_3__model_bi_bi_report_data__["a" /* BIReportData */]();
                rd.label = element.groupByPropertyValue;
                rd.data = [];
                //rd.data.push(element.count+1); // DEBUG ONLY !!!
                rd.data.push(element.count);
                returndata.push(rd);
            });
            return returndata;
        });
        //var ret = confirm('ids.length = ' + ids.length);
        // let reportData: BIReportData[] = [];
        // let rd :BIReportData = new BIReportData();
        // rd.label = 'Eclairage';
        // rd.data = [Math.floor((Math.random()*10)+1)];
        // reportData.push(rd);
        // rd  = new BIReportData();
        // rd.label = 'Equipement vidéo défaillant';
        // rd.data = [Math.floor((Math.random()*10)+1)];
        // reportData.push(rd);
        // rd  = new BIReportData();
        // rd.label = 'Complément manquant';
        // rd.data = [Math.floor((Math.random()*10)+1)];
        // reportData.push(rd);
        // rd  = new BIReportData();
        // rd.label = 'Mobilier cassé';
        // rd.data = [Math.floor((Math.random()*10)+1)];
        // reportData.push(rd);
        // rd  = new BIReportData();
        // rd.label = 'Bris de glace';
        // rd.data = [Math.floor((Math.random()*10)+1)];
        // reportData.push(rd);
        // rd  = new BIReportData();
        // rd.label = 'Propreté';
        // rd.data = [Math.floor((Math.random()*10)+1)];
        // reportData.push(rd);
        // return Observable.of(reportData);
    };
    BIReportService.prototype.getActiveReportsByStatus = function () {
        //const filter = this.formatFilter(ids, startDate, endDate, timeStep);
        //return this.http.get(this.pathService.getApiPath('BI') + '/toto' + filter)
        //     .map((res: Response) => {
        //         return res.json();
        //     });
        //var ret = confirm('ids.length = ' + ids.length);
        var _this = this;
        var returndata = [];
        return this.http.get(this.pathService.getApiPath('REPORTS_COUNT_BY_STATUS'))
            .map(function (res) {
            var rd = new __WEBPACK_IMPORTED_MODULE_3__model_bi_bi_report_data__["a" /* BIReportData */]();
            res.json().forEach(function (element) {
                rd = new __WEBPACK_IMPORTED_MODULE_3__model_bi_bi_report_data__["a" /* BIReportData */]();
                rd.label = _this.translateService.instant(element.groupByPropertyValue);
                rd.data = [];
                //rd.data.push(element.count+1); // DEBUG ONLY !!!
                rd.data.push(element.count);
                returndata.push(rd);
            });
            return returndata;
        });
        // let reportData: BIReportData[] = [];
        // let rd: BIReportData = new BIReportData();
        // rd.label = 'Déclaré';
        // rd.data = [Math.floor((Math.random() * 10) + 1)];
        // reportData.push(rd);
        // rd = new BIReportData();
        // rd.label = 'Confirmé';
        // rd.data = [Math.floor((Math.random() * 10) + 1)];
        // reportData.push(rd);
        // rd = new BIReportData();
        // rd.label = 'Transmis';
        // rd.data = [Math.floor((Math.random() * 10) + 1)];
        // reportData.push(rd);
        // rd = new BIReportData();
        // rd.label = 'Enregistré';
        // rd.data = [Math.floor((Math.random() * 10) + 1)];
        // reportData.push(rd);
        // return Observable.of(reportData);
    };
    BIReportService.prototype.getReportsByCreationDate = function () {
        //const filter = this.formatFilter(ids, startDate, endDate, timeStep);
        //return this.http.get(this.pathService.getApiPath('BI') + '/toto' + filter)
        //     .map((res: Response) => {
        //         return res.json();
        //     });
        //var ret = confirm('ids.length = ' + ids.length);
        var returndata = [];
        var filter = '?year=' + this.getCurrentYear();
        return this.http.get(this.pathService.getApiPath('REPORTS_COUNT_BY_CREATION_DATE') + filter)
            .map(function (res) {
            var rd = new __WEBPACK_IMPORTED_MODULE_3__model_bi_bi_report_data__["a" /* BIReportData */]();
            // what we get is an array of months containing categories.
            // what we need is an array of categories containing months...
            // Let's build the categories array (based on the 1st category)
            res.json()[0].forEach(function (categ) {
                rd = new __WEBPACK_IMPORTED_MODULE_3__model_bi_bi_report_data__["a" /* BIReportData */]();
                rd.label = categ.groupByPropertyValue;
                rd.data = [];
                returndata.push(rd);
            });
            //Let's add the monthly values to the data array of each category
            var ii = 0;
            res.json().forEach(function (element) {
                ii = 0;
                element.forEach(function (categ) {
                    //returndata[ii].data.push(categ.count+1); // DEBUG ONLY !!!
                    returndata[ii].data.push(categ.count);
                    ii++;
                });
            });
            return returndata;
        });
        //     return this.http.get(this.pathService.getApiPath('REPORTS_COUNT_BY_CREATION_DATE') + filter)
        //     .map((res: Response) => {
        //   let rd: BIReportData = new BIReportData();
        //   rd.label = 'Eclairage';
        //   rd.data = [
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1)
        //   ];
        //   returndata.push(rd);
        //   rd = new BIReportData();
        //   rd.label = 'Equipement vidéo défaillant';
        //   rd.data = [
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1)
        //   ];
        //   returndata.push(rd);
        //   rd = new BIReportData();
        //   rd.label = 'Complément manquant';
        //   rd.data = [
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1)
        //   ];
        //   returndata.push(rd);
        //   rd = new BIReportData();
        //   rd.label = 'Mobilier cassé';
        //   rd.data = [
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1)
        //   ];
        //   returndata.push(rd);
        //   rd = new BIReportData();
        //   rd.label = 'Bris de glace';
        //   rd.data = [
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1)
        //   ];
        //   returndata.push(rd);
        //   rd = new BIReportData();
        //   rd.label = 'Propreté';
        //   rd.data = [
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1),
        //     Math.floor((Math.random() * 10) + 1)
        //   ];
        //   returndata.push(rd);
        //   return returndata;
        // });
    };
    BIReportService.prototype.getReportsByResolutionDate = function () {
        //const filter = this.formatFilter(ids, startDate, endDate, timeStep);
        //return this.http.get(this.pathService.getApiPath('BI') + '/toto' + filter)
        //     .map((res: Response) => {
        //         return res.json();
        //     });
        //var ret = confirm('ids.length = ' + ids.length);
        var returndata = [];
        var filter = '?year=' + this.getCurrentYear();
        return this.http.get(this.pathService.getApiPath('REPORTS_COUNT_BY_RESOLUTION_DATE') + filter)
            .map(function (res) {
            var rd = new __WEBPACK_IMPORTED_MODULE_3__model_bi_bi_report_data__["a" /* BIReportData */]();
            // what we get is an array of months containing categories.
            // what we need is an array of categories containing months...
            // Let's build the categories array (based on the 1st category)
            res.json()[0].forEach(function (categ) {
                rd = new __WEBPACK_IMPORTED_MODULE_3__model_bi_bi_report_data__["a" /* BIReportData */]();
                rd.label = categ.groupByPropertyValue;
                rd.data = [];
                returndata.push(rd);
            });
            //Let's add the monthly values to the data array of each category
            var ii = 0;
            res.json().forEach(function (element) {
                ii = 0;
                element.forEach(function (categ) {
                    //returndata[ii].data.push(categ.count+1); // DEBUG ONLY !!!
                    returndata[ii].data.push(categ.count);
                    ii++;
                });
            });
            return returndata;
        });
        // let reportData: BIReportData[] = [];
        // let rd: BIReportData = new BIReportData();
        // rd.label = 'Eclairage';
        // rd.data = [
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1)
        // ];
        // reportData.push(rd);
        // rd = new BIReportData();
        // rd.label = 'Equipement vidéo défaillant';
        // rd.data = [
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1)
        // ];
        // reportData.push(rd);
        // rd = new BIReportData();
        // rd.label = 'Complément manquant';
        // rd.data = [
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1)
        // ];
        // reportData.push(rd);
        // rd = new BIReportData();
        // rd.label = 'Mobilier cassé';
        // rd.data = [
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1)
        // ];
        // reportData.push(rd);
        // rd = new BIReportData();
        // rd.label = 'Bris de glace';
        // rd.data = [
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1)
        // ];
        // reportData.push(rd);
        // rd = new BIReportData();
        // rd.label = 'Propreté';
        // rd.data = [
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1),
        //   Math.floor((Math.random() * 10) + 1)
        // ];
        // reportData.push(rd);
        // return Observable.of(reportData);
    };
    BIReportService.prototype.getCurrentYear = function () {
        return __WEBPACK_IMPORTED_MODULE_4_moment__().startOf('year').format('YYYY');
    };
    return BIReportService;
}());
BIReportService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__modules_core__["c" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__modules_core__["c" /* HttpService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__modules_core__["e" /* PathService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__modules_core__["e" /* PathService */]) === "function" && _c || Object])
], BIReportService);

var _a, _b, _c;
//# sourceMappingURL=bi-report.service.js.map

/***/ }),

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BIT1ReportsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BIT1ReportsService = (function () {
    function BIT1ReportsService(translateService, http, pathService) {
        this.translateService = translateService;
        this.http = http;
        this.pathService = pathService;
    }
    BIT1ReportsService.prototype.getActualFillingRate = function (ids, startDate, endDate, timeStep) {
        var _this = this;
        var returndata = [];
        // View by day : day starts at 7AM
        if (timeStep === 'd') {
            startDate = startDate + (7 * 60 * 60 * 1000); // 7 hours
        }
        var filter = this.formatFilter(ids, startDate, endDate, this.timeStepToTimeUnit(timeStep, 'occupancy-rate'));
        if (ids.length > 0) {
            return this.http.get(this.pathService.getApiPath('FILLING-RATE') + filter)
                .map(function (res) {
                res.json().forEach(function (element) {
                    returndata.push(_this.precisionRound(element.filling_rate * 100, 2));
                });
                return returndata;
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].of(returndata);
        }
    };
    BIT1ReportsService.prototype.getActualFillingValue = function (ids, startDate, endDate, timeStep) {
        var _this = this;
        var returndata = [];
        // View by day : day starts at 7AM
        if (timeStep === 'd') {
            startDate = startDate + (7 * 60 * 60 * 1000); // 7 hours
        }
        var filter = this.formatFilter(ids, startDate, endDate, this.timeStepToTimeUnit(timeStep, 'occupancy-rate'));
        if (ids.length > 0) {
            return this.http.get(this.pathService.getApiPath('FILLING-VALUE') + filter)
                .map(function (res) {
                res.json().forEach(function (element) {
                    returndata.push(_this.precisionRound(element.filling * 100, 2));
                });
                return returndata;
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].of(returndata);
        }
    };
    BIT1ReportsService.prototype.getMeetingsNotAttended = function (ids, startDate, endDate, timeStep) {
        var _this = this;
        var returndata = [];
        // View by day : day starts at 7AM
        if (timeStep === 'd') {
            startDate = startDate + (7 * 60 * 60 * 1000); // 7 hours
        }
        var filter = this.formatFilter(ids, startDate, endDate, this.timeStepToTimeUnit(timeStep, 'occupancy-rate'));
        if (ids.length > 0) {
            return this.http.get(this.pathService.getApiPath('RESOURCE-USAGE-RATE') + filter)
                .map(function (res) {
                res.json().forEach(function (element) {
                    returndata.push(_this.precisionRound(element.usage_rate * 100, 2));
                });
                return returndata;
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].of(returndata);
        }
    };
    BIT1ReportsService.prototype.precisionRound = function (number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    };
    BIT1ReportsService.prototype.timeStepToTimeUnit = function (timeStep, report) {
        switch (timeStep) {
            case 'd':
                if (report === 'reservation-duration') {
                    return 'Day';
                }
                else {
                    return 'Hour';
                }
            case 'w':
                return 'Day';
            case 'm':
                return 'Day';
            case 'y':
                return 'Month';
            default:
                return '';
        }
    };
    BIT1ReportsService.prototype.formatFilter = function (ids, startDate, endDate, timeUnit) {
        if (timeUnit === void 0) { timeUnit = null; }
        var idsList = '';
        ids.forEach(function (element) {
            idsList += element + ',';
        });
        if (timeUnit === null) {
            return '?resources=' + idsList.substring(0, idsList.length - 1)
                + '&startDate=' + startDate.toString()
                + '&endDate=' + endDate.toString();
        }
        else {
            return '?resources=' + idsList.substring(0, idsList.length - 1)
                + '&startDate=' + startDate.toString()
                + '&endDate=' + endDate.toString()
                + '&time-unit=' + timeUnit;
        }
    };
    BIT1ReportsService.prototype.computeLabels = function (timeStep, componentName) {
        if (componentName === void 0) { componentName = 'occupancy-rate'; }
        var labels;
        switch (timeStep) {
            case 'd':
                if (componentName === 'occupancy-rate') {
                    labels = ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h'];
                }
                else {
                    labels = [this.translateService.instant('RESERVATION-DURATION-X-LABEL')];
                }
                //data = [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40];
                break;
            case 'w':
                labels =
                    [this.translateService.instant('MONDAY'),
                        this.translateService.instant('TUESDAY'),
                        this.translateService.instant('WEDNESDAY'),
                        this.translateService.instant('THURSDAY'),
                        this.translateService.instant('FRIDAY'),
                        this.translateService.instant('SATURDAY'),
                        this.translateService.instant('SUNDAY')];
                //data = [81, 56, 55, 40, 65, 59, 80];
                break;
            case 'm':
                labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
                //Gérer durée du mois courant
                var nbJours = this.daysInThisMonth();
                labels.splice(nbJours);
                //data = [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 56, 55, 40];
                break;
            case 'y':
                labels = [
                    this.translateService.instant('JANUARY'),
                    this.translateService.instant('FEBRUARY'),
                    this.translateService.instant('MARCH'),
                    this.translateService.instant('APRIL'),
                    this.translateService.instant('MAY'),
                    this.translateService.instant('JUNE'),
                    this.translateService.instant('JULY'),
                    this.translateService.instant('AUGUST'),
                    this.translateService.instant('SEPTEMBER'),
                    this.translateService.instant('OCTOBER'),
                    this.translateService.instant('NOVEMBER'),
                    this.translateService.instant('DECEMBER')
                ];
                //data = [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40];
                break;
            default:
        }
        return labels;
    };
    BIT1ReportsService.prototype.daysInThisMonth = function () {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    };
    BIT1ReportsService.prototype.computeStartDate = function (timeStep, returnAsString) {
        if (returnAsString === void 0) { returnAsString = false; }
        __WEBPACK_IMPORTED_MODULE_6_moment__["locale"]('fr');
        switch (timeStep) {
            case 'd':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().startOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().startOf('day').unix() * 1000;
            case 'w':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().weekday(0).startOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().weekday(0).startOf('day').unix() * 1000;
            case 'm':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().startOf('month').startOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().startOf('month').startOf('day').unix() * 1000;
            case 'y':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().startOf('year').startOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().startOf('year').startOf('day').unix() * 1000;
            default:
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().startOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().startOf('day').unix() * 1000;
        }
    };
    BIT1ReportsService.prototype.computeEndDate = function (timeStep, returnAsString) {
        if (returnAsString === void 0) { returnAsString = false; }
        __WEBPACK_IMPORTED_MODULE_6_moment__["locale"]('fr');
        switch (timeStep) {
            case 'd':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().endOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().endOf('day').unix() * 1000;
            case 'w':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().weekday(6).endOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().weekday(6).endOf('day').unix() * 1000;
            case 'm':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().endOf('month').endOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().endOf('month').endOf('day').unix() * 1000;
            case 'y':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().endOf('year').endOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().endOf('year').endOf('day').unix() * 1000;
            default:
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().endOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_6_moment__().endOf('day').unix() * 1000;
        }
    };
    return BIT1ReportsService;
}());
BIT1ReportsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["c" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["c" /* HttpService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["e" /* PathService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["e" /* PathService */]) === "function" && _c || Object])
], BIT1ReportsService);

var _a, _b, _c;
//# sourceMappingURL=bi-t1-report.service.js.map

/***/ }),

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_environments_environment__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_bi_reservation_duration__ = __webpack_require__(818);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BIService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var BIService = (function () {
    function BIService(translateService, http, pathService) {
        this.translateService = translateService;
        this.http = http;
        this.pathService = pathService;
    }
    BIService.prototype.getOtherDurationType = function () {
        return this.http.get('assets/data/duration_type.json')
            .map(function (res) {
            return res.json();
        });
    };
    BIService.prototype.getSelectedPlace = function () {
        return this.http.get('assets/data/mocked_place.json')
            .map(function (res) {
            return res.json();
        });
    };
    BIService.prototype.getChartList = function (locationType, locationId, durationType) {
        if (!__WEBPACK_IMPORTED_MODULE_5_environments_environment__["a" /* environment */].bi_debug) {
            // @ todo
            var dataToSend = { id: locationId, type: locationType, duration_type: durationType };
            return this.http.post(this.pathService.getApiPath('BI'), dataToSend)
                .map(function (res) {
                return res.json();
            });
        }
        else {
            return this.http.get('assets/data/stats_' + durationType.toLowerCase() + '.json')
                .map(function (res) {
                return res.json();
            });
        }
    };
    BIService.prototype.getOccupancyRate = function (ids, startDate, endDate, timeStep) {
        var _this = this;
        var returndata = [];
        // View by day : day starts at 7AM
        if (timeStep === 'd') {
            startDate = startDate + (7 * 60 * 60 * 1000); // 7 hours
        }
        var filter = this.formatFilter(ids, startDate, endDate, this.timeStepToTimeUnit(timeStep, 'occupancy-rate'));
        if (ids.length > 0) {
            return this.http.get(this.pathService.getApiPath('OCCUPANCY-RATE') + filter)
                .map(function (res) {
                res.json().forEach(function (element) {
                    returndata.push(_this.precisionRound(element.occupancy_rate * 100, 2));
                });
                return returndata;
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].of(returndata);
        }
    };
    BIService.prototype.precisionRound = function (number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    };
    BIService.prototype.getReservationDuration = function (ids, startDate, endDate, timeStep) {
        var returndata = new __WEBPACK_IMPORTED_MODULE_8__model_bi_reservation_duration__["a" /* ReservationDuration */]();
        var filter = this.formatFilter(ids, startDate, endDate, this.timeStepToTimeUnit(timeStep, 'reservation-duration'));
        if (ids.length > 0) {
            return this.http.get(this.pathService.getApiPath('RESERVATION-DURATION') + filter)
                .map(function (res) {
                res.json().forEach(function (element) {
                    returndata.data1.push(element.reservations_count_duration_1);
                    returndata.data2.push(element.reservations_count_duration_2);
                    returndata.data3.push(element.reservations_count_duration_3);
                    returndata.data4.push(element.reservations_count_duration_4);
                });
                //return res.json();
                return returndata;
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].of(returndata);
        }
    };
    BIService.prototype.getTop5 = function (ids, startDate, endDate, timeStep) {
        var filter = this.formatFilter(ids, startDate, endDate);
        if (ids.length > 0) {
            return this.http.get(this.pathService.getApiPath('TOP5') + filter)
                .map(function (res) {
                if (res.ok) {
                    var top5 = res.json();
                    return top5;
                }
                else {
                    return [];
                }
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].of([]);
        }
    };
    BIService.prototype.getCancellations = function (ids, startDate, endDate, timeStep) {
        var filter = this.formatFilter(ids, startDate, endDate);
        if (ids.length > 0) {
            return this.http.get(this.pathService.getApiPath('CANCELLATIONS-COUNT') + filter)
                .map(function (res) {
                if (res.ok) {
                    var cancellations = res.json();
                    return cancellations;
                }
                else {
                    return 0;
                }
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].of(0);
        }
    };
    BIService.prototype.getAverageDuration = function (ids, startDate, endDate, timeStep) {
        var filter = this.formatFilter(ids, startDate, endDate);
        if (ids.length > 0) {
            return this.http.get(this.pathService.getApiPath('AVERAGE-DURATION') + filter)
                .map(function (res) {
                if (res.ok) {
                    var durations = res.json();
                    return durations / 60;
                }
                else {
                    return 0;
                }
            });
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].of(0);
        }
    };
    BIService.prototype.timeStepToTimeUnit = function (timeStep, report) {
        switch (timeStep) {
            case 'd':
                if (report === 'reservation-duration') {
                    return 'Day';
                }
                else {
                    return 'Hour';
                }
            case 'w':
                return 'Day';
            case 'm':
                return 'Day';
            case 'y':
                return 'Month';
            default:
                return '';
        }
    };
    BIService.prototype.formatFilter = function (ids, startDate, endDate, timeUnit) {
        if (timeUnit === void 0) { timeUnit = null; }
        var idsList = '';
        ids.forEach(function (element) {
            idsList += element + ',';
        });
        if (timeUnit === null) {
            return '?resources=' + idsList.substring(0, idsList.length - 1)
                + '&startDate=' + startDate.toString()
                + '&endDate=' + endDate.toString();
        }
        else {
            return '?resources=' + idsList.substring(0, idsList.length - 1)
                + '&startDate=' + startDate.toString()
                + '&endDate=' + endDate.toString()
                + '&time-unit=' + timeUnit;
        }
    };
    BIService.prototype.getRealTimeOccupancyRate = function () {
        // let data: Incident[] = [];
        // data.push(new Incident({ 'id': '', 'label': '' }))
        return this.http.get(this.pathService.getApiPath('REALTIME-OCCUPANCY-RATE'))
            .map(function (res) {
            if (res.ok) {
                var rate = res.json();
                return rate * 100;
                //return Math.round(Math.random() * 50);
            }
            else {
                return 0;
            }
        });
    };
    BIService.prototype.getRealTimeReservationsCount = function () {
        // let data: Incident[] = [];
        // data.push(new Incident({ 'id': '', 'label': '' }))
        return this.http.get(this.pathService.getApiPath('REALTIME-RESERVATIONS-COUNT'))
            .map(function (res) {
            if (res.ok) {
                var count = res.json();
                return count;
                //return Math.round(Math.random() * 30);
            }
            else {
                return 0;
            }
        });
    };
    BIService.prototype.computeLabels = function (timeStep, componentName) {
        if (componentName === void 0) { componentName = 'occupancy-rate'; }
        var labels;
        switch (timeStep) {
            case 'd':
                if (componentName === 'occupancy-rate') {
                    labels = ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h'];
                }
                else {
                    labels = [this.translateService.instant('RESERVATION-DURATION-X-LABEL')];
                }
                //data = [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40];
                break;
            case 'w':
                labels =
                    [this.translateService.instant('MONDAY'),
                        this.translateService.instant('TUESDAY'),
                        this.translateService.instant('WEDNESDAY'),
                        this.translateService.instant('THURSDAY'),
                        this.translateService.instant('FRIDAY'),
                        this.translateService.instant('SATURDAY'),
                        this.translateService.instant('SUNDAY')];
                //data = [81, 56, 55, 40, 65, 59, 80];
                break;
            case 'm':
                labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
                //Gérer durée du mois courant
                var nbJours = this.daysInThisMonth();
                labels.splice(nbJours);
                //data = [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 56, 55, 40];
                break;
            case 'y':
                labels = [
                    this.translateService.instant('JANUARY'),
                    this.translateService.instant('FEBRUARY'),
                    this.translateService.instant('MARCH'),
                    this.translateService.instant('APRIL'),
                    this.translateService.instant('MAY'),
                    this.translateService.instant('JUNE'),
                    this.translateService.instant('JULY'),
                    this.translateService.instant('AUGUST'),
                    this.translateService.instant('SEPTEMBER'),
                    this.translateService.instant('OCTOBER'),
                    this.translateService.instant('NOVEMBER'),
                    this.translateService.instant('DECEMBER')
                ];
                //data = [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40];
                break;
            default:
        }
        return labels;
    };
    BIService.prototype.daysInThisMonth = function () {
        var now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    };
    BIService.prototype.computeStartDate = function (timeStep, returnAsString) {
        if (returnAsString === void 0) { returnAsString = false; }
        __WEBPACK_IMPORTED_MODULE_7_moment__["locale"]('fr');
        switch (timeStep) {
            case 'd':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().startOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().startOf('day').unix() * 1000;
            case 'w':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().weekday(0).startOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().weekday(0).startOf('day').unix() * 1000;
            case 'm':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().startOf('month').startOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().startOf('month').startOf('day').unix() * 1000;
            case 'y':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().startOf('year').startOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().startOf('year').startOf('day').unix() * 1000;
            default:
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().startOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().startOf('day').unix() * 1000;
        }
    };
    BIService.prototype.computeEndDate = function (timeStep, returnAsString) {
        if (returnAsString === void 0) { returnAsString = false; }
        __WEBPACK_IMPORTED_MODULE_7_moment__["locale"]('fr');
        switch (timeStep) {
            case 'd':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().endOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().endOf('day').unix() * 1000;
            case 'w':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().weekday(6).endOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().weekday(6).endOf('day').unix() * 1000;
            case 'm':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().endOf('month').endOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().endOf('month').endOf('day').unix() * 1000;
            case 'y':
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().endOf('year').endOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().endOf('year').endOf('day').unix() * 1000;
            default:
                if (returnAsString)
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().endOf('day').format('DD/MM/YYYY');
                else
                    return __WEBPACK_IMPORTED_MODULE_7_moment__().endOf('day').unix() * 1000;
        }
    };
    return BIService;
}());
BIService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["c" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["c" /* HttpService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["e" /* PathService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["e" /* PathService */]) === "function" && _c || Object])
], BIService);

var _a, _b, _c;
//# sourceMappingURL=bi.service.js.map

/***/ }),

/***/ 843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatexPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DatexPipe = (function () {
    function DatexPipe() {
    }
    DatexPipe.prototype.transform = function (value, format) {
        if (format === void 0) { format = ""; }
        if (!value || value === "")
            return "";
        return __WEBPACK_IMPORTED_MODULE_1_moment__["utc"]().startOf('day').add(value, 'minutes').format('HH:mm');
    };
    return DatexPipe;
}());
DatexPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'datex'
    })
], DatexPipe);

//# sourceMappingURL=datex-pipe.js.map

/***/ }),

/***/ 844:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterSearchPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterSearchPipe = (function () {
    function FilterSearchPipe() {
    }
    FilterSearchPipe.prototype.transform = function (items, selectedSearchText) {
        if (!items)
            return [];
        if (!selectedSearchText)
            return items;
        selectedSearchText = selectedSearchText.toLowerCase();
        return items.filter(function (it) {
            return it.toLowerCase().indexOf(selectedSearchText.toLowerCase()) !== -1;
        });
    };
    return FilterSearchPipe;
}());
FilterSearchPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'filterSearch'
    })
], FilterSearchPipe);

//# sourceMappingURL=filter-search.pipe.js.map

/***/ }),

/***/ 845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_model_utils__ = __webpack_require__(102);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportLocationSearchPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ReportLocationSearchPipe = (function () {
    function ReportLocationSearchPipe() {
    }
    ReportLocationSearchPipe.prototype.transform = function (value, key, term) {
        var keys = key.split(' ');
        return value.filter(function (item) {
            var res = true;
            keys.forEach(function (k) {
                if (!item.hasOwnProperty(k))
                    res = false;
            });
            if (res) {
                if (term) {
                    var result_1 = false;
                    keys.forEach(function (k) {
                        if (item[k] && term) {
                            var tmpItem = __WEBPACK_IMPORTED_MODULE_1_app_model_utils__["b" /* Diacritics */].removeDiacritics(item[k].toLowerCase());
                            var tmpTerm = __WEBPACK_IMPORTED_MODULE_1_app_model_utils__["b" /* Diacritics */].removeDiacritics(term.toLowerCase());
                            if (tmpItem && tmpTerm && tmpItem.indexOf(tmpTerm) > -1) {
                                result_1 = true;
                            }
                        }
                    });
                    return result_1;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        });
    };
    return ReportLocationSearchPipe;
}());
ReportLocationSearchPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'reportLocationSearch'
    })
], ReportLocationSearchPipe);

//# sourceMappingURL=report-location-search.pipe.js.map

/***/ }),

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(23);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReservationStatePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ReservationStatePipe = (function () {
    function ReservationStatePipe(translateService) {
        this.translateService = translateService;
    }
    ReservationStatePipe.prototype.transform = function (value, format) {
        if (format === void 0) { format = ""; }
        switch (value) {
            case 'Created':
                return this.translateService.instant('RESERVATION_STATE_CREATED'); //'DEMANDEE';
            case 'Confirmed':
                return this.translateService.instant('RESERVATION_STATE_CONFIRMED'); //'PREVUE';
            case 'Started':
                return this.translateService.instant('RESERVATION_STATE_STARTED'); //'DEMARREE';
            case 'Terminated':
                return this.translateService.instant('RESERVATION_STATE_TERMINATED'); //'TERMINEE';
            case 'Extended':
                return this.translateService.instant('RESERVATION_STATE_EXTENDED'); //'PROLONGEE';
            case 'Canceled':
                return this.translateService.instant('RESERVATION_STATE_CANCELED'); //'ANNULEE';
            case 'Refused':
                return this.translateService.instant('RESERVATION_STATE_REFUSED'); //'REFUSEE';
            case 'Abandoned':
                return this.translateService.instant('RESERVATION_STATE_ABANDONED'); //'ABANDONNEE';
            case 'Deleted':
                return this.translateService.instant('RESERVATION_STATE_DELETED'); //'EFFACEE';
            case 'Updating':
                return this.translateService.instant('RESERVATION_STATE_CREATED'); //'DEMANDEE';
            default:
                return '*' + value + '*';
        }
    };
    return ReservationStatePipe;
}());
ReservationStatePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'reservationState'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object])
], ReservationStatePipe);

var _a;
//# sourceMappingURL=reservation-state-pipe.js.map

/***/ }),

/***/ 847:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_reservation_reservation_service__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_resource_resource_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_location_reservation__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_view_confirmation_dialog_confirmation_dialog_service__ = __webpack_require__(395);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyReservationsMasterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MyReservationsMasterComponent = (function () {
    function MyReservationsMasterComponent(translateService, reservationService, resourceService, confirmationDialogService, router) {
        this.translateService = translateService;
        this.reservationService = reservationService;
        this.resourceService = resourceService;
        this.confirmationDialogService = confirmationDialogService;
        this.router = router;
        this.loading = false;
        this.mustShowModificationImpossibleWarning = false;
        //editField: string;
        this.reservationList = [];
        this.onSelectReservation = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
    }
    MyReservationsMasterComponent.prototype.ngOnInit = function () {
        var _this = this;
        // var test = new Attendee
        this.loadData();
        var timer = __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].timer(0, 10000);
        this.subscription = timer.subscribe(function (t) { return _this.ticks(); });
    };
    // After the user live the page
    MyReservationsMasterComponent.prototype.ngOnDestroy = function () {
        console.log('My reservations : timer destroyed');
        this.subscription.unsubscribe();
    };
    MyReservationsMasterComponent.prototype.ticks = function () {
        this.loadData();
        this.buildButtonsVisibility();
    };
    MyReservationsMasterComponent.prototype.loadData = function () {
        var _this = this;
        var data;
        var data2;
        data = [0];
        this.loading = true;
        //Get Data
        this.getData()
            .then(function (r) {
            data = r;
            data.forEach(function (element) {
                _this.getResource(element.id_resource)
                    .then(function (r2) {
                    data2 = r2;
                    element.resource = data2;
                    element.resource.capacity = _this.deduceCapacity(element.resource);
                })
                    .catch(function (err) {
                    console.log("err => ressource non trouvée");
                    _this.loading = false;
                });
            });
            //Sort data 
            data.sort(_this.compareFunction);
            _this.reservationList = data;
            _this.buildButtonsVisibility();
            _this.loading = false;
        })
            .catch(function (err) {
            console.log("err => réservation non trouvée");
            _this.loading = false;
        });
    };
    MyReservationsMasterComponent.prototype.deduceCapacity = function (res) {
        var retour = '';
        res.charac.forEach(function (car) {
            if (car.label === 'Capacité') {
                retour = car.value;
            }
        });
        if (retour === '') {
            retour = res.resource_type.label.charAt(0).toUpperCase();
        }
        return retour;
    };
    MyReservationsMasterComponent.prototype.compareFunction = function (a, b) {
        if (a.start_date > b.start_date) {
            return 1;
        }
        if (a.start_date < b.start_date) {
            return -1;
        }
        return 0;
    };
    MyReservationsMasterComponent.prototype.getData = function () {
        // keep this for Promise
        var that = this;
        return new Promise(function (resolve, reject) {
            that.reservationService.getReservations().subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject();
            });
        });
    };
    MyReservationsMasterComponent.prototype.getResource = function (id) {
        // keep this for Promise
        var that = this;
        return new Promise(function (resolve, reject) {
            that.resourceService.getResourceById(id).subscribe(function (data) {
                resolve(data);
            }, function (error) {
                reject();
            });
        });
    };
    MyReservationsMasterComponent.prototype.doAction = function (event, reservation) {
        var _this = this;
        if (reservation.startButtonVisible) {
            //alert("START !");
            this.startReservation(reservation);
        }
        else {
            if (reservation.closeButtonVisible) {
                //alert("CLOSE !");
                this.confirmationDialogService.confirm(this.translateService.instant('CONFIRMATION-TITLE'), this.translateService.instant('CONFIRMATION-CLOSE-CAPTION'), this.translateService.instant('BUTTON-YES'), this.translateService.instant('BUTTON-NO'))
                    .then(function (confirmed) {
                    if (confirmed) {
                        _this.deleteReservation(reservation);
                    }
                })
                    .catch(function (error) {
                    console.log(error);
                });
            }
            else {
                if (reservation.stopButtonVisible) {
                    //alert("STOP !");
                    this.confirmationDialogService.confirm(this.translateService.instant('CONFIRMATION-TITLE'), this.translateService.instant('CONFIRMATION-STOP-CAPTION'), this.translateService.instant('BUTTON-YES'), this.translateService.instant('BUTTON-NO'))
                        .then(function (confirmed) {
                        if (confirmed) {
                            _this.deleteReservation(reservation);
                        }
                    })
                        .catch(function (error) {
                        console.log(error);
                    });
                }
                else {
                    if (reservation.deleteButtonVisible) {
                        this.confirmationDialogService.confirm(this.translateService.instant('CONFIRMATION-TITLE'), this.translateService.instant('CONFIRMATION-DELETE-CAPTION'), this.translateService.instant('BUTTON-YES'), this.translateService.instant('BUTTON-NO'))
                            .then(function (confirmed) {
                            if (confirmed) {
                                _this.deleteReservation(reservation);
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                        });
                    }
                }
            }
        }
        event.stopPropagation();
    };
    MyReservationsMasterComponent.prototype.startReservation = function (res) {
        var _this = this;
        this.reservationService.start(res.id)
            .subscribe(function (result) {
            if (result.status === 200) {
                console.log(result);
                // Let's disable the Reservation button
                res.stopButtonVisible = false;
                res.closeButtonVisible = false;
                res.deleteButtonVisible = false;
                //Reload
                setTimeout(function () {
                    // We wait a little bit
                    _this.loadData();
                }, 100);
            }
            else {
                _this.mustShowModificationImpossibleWarning = true;
                setTimeout(function () {
                    _this.mustShowModificationImpossibleWarning = false;
                    //this.caracChanged();
                }, 3000);
            }
        }, function (error) {
            console.log(error);
            //this.errors = error;
            _this.mustShowModificationImpossibleWarning = true;
            setTimeout(function () {
                _this.mustShowModificationImpossibleWarning = false;
                //this.caracChanged();
            }, 3000);
        });
    };
    MyReservationsMasterComponent.prototype.deleteReservation = function (res) {
        var _this = this;
        this.reservationService.delete(res.id)
            .subscribe(function (result) {
            if (result.status === 200) {
                console.log(result);
                // Let's disable the Reservation button
                res.startButtonVisible = false;
                //Reload
                setTimeout(function () {
                    // We wait a little bit
                    _this.loadData();
                }, 100);
            }
            else {
                _this.mustShowModificationImpossibleWarning = true;
                setTimeout(function () {
                    _this.mustShowModificationImpossibleWarning = false;
                }, 3000);
            }
        }, function (error) {
            console.log(error);
            //this.errors = error;
            _this.mustShowModificationImpossibleWarning = true;
            setTimeout(function () {
                _this.mustShowModificationImpossibleWarning = false;
                //this.caracChanged();
            }, 3000);
        });
    };
    MyReservationsMasterComponent.prototype.reservationSelected = function (res) {
        this.selectedReservation = res;
        this.onSelectReservation.emit(this.selectedReservation);
    };
    MyReservationsMasterComponent.prototype.buildButtonsVisibility = function () {
        var _this = this;
        if (this.reservationList) {
            this.reservationList.forEach(function (res) {
                res.startButtonVisible = _this.buildStartButtonVisibility(res);
                res.closeButtonVisible = _this.buildCloseButtonVisibility(res);
                res.stopButtonVisible = _this.buildStopButtonVisibility(res);
                res.deleteButtonVisible = _this.buildDeleteButtonVisibility(res);
            });
        }
    };
    MyReservationsMasterComponent.prototype.buildStartButtonVisibility = function (res) {
        var millisecondesAfterStart = new Date().getTime() - res.start_date;
        var millisecondesBeforeEnd = res.end_date - new Date().getTime();
        if (res.state === 'Confirmed') {
            if (millisecondesAfterStart > 0 && millisecondesBeforeEnd > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    MyReservationsMasterComponent.prototype.buildCloseButtonVisibility = function (res) {
        if (res.state === 'Created' || res.state === 'Confirmed' || res.state === 'Updating') {
            return true;
        }
        else {
            return false;
        }
    };
    MyReservationsMasterComponent.prototype.buildStopButtonVisibility = function (res) {
        if (res.state === 'Started' || res.state === 'Extended') {
            if (!this.buildStartButtonVisibility(res)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    MyReservationsMasterComponent.prototype.buildDeleteButtonVisibility = function (res) {
        if (res.state === 'Refused') {
            return true;
        }
        else {
            return false;
        }
    };
    return MyReservationsMasterComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__model_location_reservation__["a" /* Reservation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__model_location_reservation__["a" /* Reservation */]) === "function" && _a || Object)
], MyReservationsMasterComponent.prototype, "selectedReservation", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]) === "function" && _b || Object)
], MyReservationsMasterComponent.prototype, "onSelectReservation", void 0);
MyReservationsMasterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'app-my-reservations-master',
        template: __webpack_require__(1217),
        styles: [__webpack_require__(1153)]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__services_reservation_reservation_service__["a" /* ReservationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__services_reservation_reservation_service__["a" /* ReservationService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__services_resource_resource_service__["a" /* ResourceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_resource_resource_service__["a" /* ResourceService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7_app_view_confirmation_dialog_confirmation_dialog_service__["a" /* ConfirmationDialogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_app_view_confirmation_dialog_confirmation_dialog_service__["a" /* ConfirmationDialogService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__node_modules_angular_router__["a" /* Router */]) === "function" && _g || Object])
], MyReservationsMasterComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=my-reservations-master.component.js.map

/***/ }),

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_services_tree_tree_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_model_location_place__ = __webpack_require__(146);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MySettingsFavouritePlacesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MySettingsFavouritePlacesComponent = (function () {
    function MySettingsFavouritePlacesComponent(treeService) {
        this.treeService = treeService;
        this.selectedResourceType = null;
        this.selectedPrimary = null;
        this.selectedSecondary = null;
        this.selectedPrimaryHasChanged = true;
        this.selectedSecondaryHasChanged = true;
        this.mustShowOKWarning = false;
    }
    MySettingsFavouritePlacesComponent.prototype.ngOnInit = function () {
    };
    MySettingsFavouritePlacesComponent.prototype.onSelectPrimary = function (primaryPlace) {
        this.selectedPrimary = primaryPlace;
        this.selectedPrimaryHasChanged = true;
        // if (this.searchHasBeenTriggered) {
        //     setTimeout(() => {
        //         this.doSearch();
        //     }, 500);
        // }
        // this.resourceTypeSelectorComponent.filterResourceTypesByPlace(this.selectedPrimary, this.selectedSecondary);
    };
    MySettingsFavouritePlacesComponent.prototype.onSelectSecondary = function (secondaryPlace) {
        this.selectedSecondary = secondaryPlace;
        this.selectedSecondaryHasChanged = true;
        // if (this.searchHasBeenTriggered) {
        //     setTimeout(() => {
        //         this.doSearch();
        //     }, 500);
        // }
        // this.resourceTypeSelectorComponent.filterResourceTypesByPlace(this.selectedPrimary, this.selectedSecondary);
    };
    MySettingsFavouritePlacesComponent.prototype.validate = function () {
        // alert("Validating..." +
        //   "Primary = " + (this.selectedPrimary && this.selectedPrimary.label) +
        //   ", Secondary = " + (this.selectedSecondary && this.selectedSecondary.label));
        this.doValidate();
    };
    MySettingsFavouritePlacesComponent.prototype.doValidate = function () {
        var _this = this;
        var favouritePlaces = [];
        if (this.selectedPrimary) {
            var prim = new __WEBPACK_IMPORTED_MODULE_2_app_model_location_place__["a" /* Place */];
            prim.id = this.selectedPrimary.id;
            prim.id_place_parent = this.selectedPrimary.id_place_parent;
            prim.id_place_type = this.selectedPrimary.id_place_type;
            prim.label = this.selectedPrimary.label;
            prim.resource_types = this.selectedPrimary.resource_types;
            favouritePlaces.push(prim);
        }
        if (this.selectedSecondary) {
            var second = new __WEBPACK_IMPORTED_MODULE_2_app_model_location_place__["a" /* Place */];
            second.id = this.selectedSecondary.id;
            second.id_place_parent = this.selectedSecondary.id_place_parent;
            second.id_place_type = this.selectedSecondary.id_place_type;
            second.label = this.selectedSecondary.label;
            second.resource_types = this.selectedSecondary.resource_types;
            favouritePlaces.push(second);
        }
        this.treeService.UpdateFavouritePlaces(favouritePlaces)
            .subscribe(function (result) {
            // console.log(result);
            // Let's disable the Reservation button
            //this.reservationValid = false;
            //Go to My Reservations
            // setTimeout(() => {
            //   // We wait a little bit otherwise the reservationlist won't contain our newly created reservation
            //   this.router.navigate(['my-reservations']);
            // }, 2000);
            _this.mustShowOKWarning = true;
            setTimeout(function () {
                _this.mustShowOKWarning = false;
                //this.caracChanged();
            }, 3000);
        }, function (error) {
            // console.log(error);
            //this.errors = error;
        });
    };
    return MySettingsFavouritePlacesComponent;
}());
MySettingsFavouritePlacesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-my-settings-favourite-places',
        template: __webpack_require__(1219),
        styles: [__webpack_require__(1155)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_services_tree_tree_service__["a" /* TreeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_services_tree_tree_service__["a" /* TreeService */]) === "function" && _a || Object])
], MySettingsFavouritePlacesComponent);

var _a;
//# sourceMappingURL=my-settings-favourite-places.component.js.map

/***/ }),

/***/ 849:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_authentication__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_modules_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_globals__ = __webpack_require__(223);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
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






var NavbarComponent = (function () {
    function NavbarComponent(authService, appConfigurationService, router, globals, tenantConfigurationService) {
        this.authService = authService;
        this.appConfigurationService = appConfigurationService;
        this.router = router;
        this.globals = globals;
        this.tenantConfigurationService = tenantConfigurationService;
        this.records = [
            {
                "label": "GENERAL",
                "Icon": "fa-home",
                "content": [
                    {
                        "KeyName": "HOME",
                        "PageUrl": "home",
                    },
                    {
                        "KeyName": "MY-SETTINGS-TITLE",
                        "PageUrl": "my-settings",
                    }
                ]
            },
            {
                "label": "RESOURCES",
                "Icon": "fa-calendar-check-o",
                "content": [
                    {
                        "KeyName": "RESERVATION-TITLE",
                        "PageUrl": "search-page",
                    },
                    {
                        "KeyName": "AVAILABILITY-TITLE",
                        "PageUrl": "availabilities",
                    },
                    {
                        "KeyName": "MY-RESERVATIONS-TITLE",
                        "PageUrl": "my-reservations",
                    },
                    {
                        "KeyName": "Mapwize",
                        "PageUrl": "mapwize",
                    }
                ]
            }
        ];
        if (tenantConfigurationService.logoImageData) {
            this.logoTenant = 'data:image/png;base64,' + tenantConfigurationService.logoImageData;
            this.labelTenant = tenantConfigurationService.label;
        }
    }
    NavbarComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var timer;
            return __generator(this, function (_a) {
                if (!this.tenantConfigurationService.logoImageData) {
                    timer = __WEBPACK_IMPORTED_MODULE_3__node_modules_rxjs__["Observable"].timer(0, 100);
                    this.subscription = timer.subscribe(function (t) { return _this.ticks(); });
                }
                else {
                    // console.log('Navbar => logo found without delay');
                    this.loadImage();
                }
                return [2 /*return*/];
            });
        });
    };
    NavbarComponent.prototype.ticks = function () {
        // console.log('Navbar => logo not found => checking again...');
        if (this.logoTenant === undefined) {
            this.loadImage();
        }
        else {
            // logo has finally arrived... timer is not needed anymore
            // console.log('Navbar => logo finally found!');
            this.subscription.unsubscribe();
        }
    };
    NavbarComponent.prototype.loadImage = function () {
        if (this.tenantConfigurationService.logoImageData) {
            this.logoTenant = 'data:image/png;base64,' + this.tenantConfigurationService.logoImageData;
            this.labelTenant = this.tenantConfigurationService.label;
        }
    };
    NavbarComponent.prototype.logout = function () {
        this.authService.logout();
    };
    // After the user leaves the page
    NavbarComponent.prototype.ngOnDestroy = function () {
        // console.log('Navbar : timer destroyed');
        if (this.subscription)
            this.subscription.unsubscribe();
        // else
        // console.log('Navbar : timer already destroyed');
    };
    NavbarComponent.prototype.calculateClasses = function (label) {
        var _this = this;
        var found = false;
        var record = this.records.find(function (r) { return r.label === label; });
        if (record) {
            record.content.forEach(function (element) {
                if (_this.router.url === '/' + element.PageUrl) {
                    found = true;
                }
            });
        }
        if (found) {
            return {
                active: true
            };
        }
        else {
            return {
                active: false
            };
        }
        // switch (label) {
        //     case 'GENERAL':
        //         if (this.router.url === '/home' || this.router.url === '/my-settings') {
        //             return {
        //                 active: true
        //             };
        //         }
        //         else {
        //             return {
        //                 active: false
        //             };
        //         }
        //     case 'RESOURCES':
        //         if (this.router.url === '/search-page' || this.router.url === '/my-reservations') {
        //             return {
        //                 active: true
        //             };
        //         }
        //         else {
        //             return {
        //                 active: false
        //             };
        //         }
        //     default:
        //         return {
        //             active: false
        //         };
        // }
    };
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-navbar',
        template: __webpack_require__(1221),
        styles: [__webpack_require__(1157)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_app_modules_authentication__["b" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_modules_authentication__["b" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_app_globals__["a" /* Globals */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_app_globals__["a" /* Globals */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["d" /* TenantConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_modules_core__["d" /* TenantConfigurationService */]) === "function" && _e || Object])
], NavbarComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ 850:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_modules_core__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImgSecureComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ImgSecureComponent = (function () {
    function ImgSecureComponent(httpService, appConfigurationService) {
        this.httpService = httpService;
        this.appConfigurationService = appConfigurationService;
    }
    ImgSecureComponent.prototype.ngOnInit = function () {
    };
    ImgSecureComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.httpService.get(this.appConfigurationService.urlAPIV1 + this.src).subscribe(function (res) {
            var data = res.json();
            var type = data.file_name.split('.')[1];
            _this.img.nativeElement.src = 'data:image/' + type + ';base64,' + data.data;
        });
    };
    return ImgSecureComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ImgSecureComponent.prototype, "src", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('imgRef'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], ImgSecureComponent.prototype, "img", void 0);
ImgSecureComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'img-secure',
        template: __webpack_require__(1222),
        styles: [__webpack_require__(1158)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["c" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["c" /* HttpService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["b" /* AppConfigurationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_app_modules_core__["b" /* AppConfigurationService */]) === "function" && _c || Object])
], ImgSecureComponent);

var _a, _b, _c;
//# sourceMappingURL=img-secure.component.js.map

/***/ }),

/***/ 851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_tree_tree_service__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_ngx_translate_core__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_resource_resource_service__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchTextSelectorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchTextSelectorComponent = (function () {
    function SearchTextSelectorComponent(treeService, resourceService, translateService) {
        this.treeService = treeService;
        this.resourceService = resourceService;
        this.translateService = translateService;
        this.onSelectSearchText = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onEnterKeyPressed = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SearchTextSelectorComponent.prototype.ngOnInit = function () {
    };
    SearchTextSelectorComponent.prototype.searchTextSelected = function () {
        this.onSelectSearchText.emit(this.selectedSearchText);
    };
    SearchTextSelectorComponent.prototype.clearSearchText = function () {
        var _this = this;
        this.selectedSearchText = '';
        this.searchTextSelected();
        //It takes time for SearchPageRessources to be aware that selectedSearchText has changed
        setTimeout(function () {
            _this.onEnterKeyPressed.emit();
        }, 100);
    };
    SearchTextSelectorComponent.prototype.triggerLaunchSearch = function () {
        this.onEnterKeyPressed.emit();
    };
    return SearchTextSelectorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], SearchTextSelectorComponent.prototype, "selectedSearchText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], SearchTextSelectorComponent.prototype, "where", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SearchTextSelectorComponent.prototype, "onSelectSearchText", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], SearchTextSelectorComponent.prototype, "onEnterKeyPressed", void 0);
SearchTextSelectorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search-text-selector',
        template: __webpack_require__(1229),
        styles: [__webpack_require__(1165)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_tree_tree_service__["a" /* TreeService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_tree_tree_service__["a" /* TreeService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_resource_resource_service__["a" /* ResourceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_resource_resource_service__["a" /* ResourceService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__node_modules_ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__node_modules_ngx_translate_core__["c" /* TranslateService */]) === "function" && _d || Object])
], SearchTextSelectorComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=search-text-selector.component.js.map

/***/ })

},[1507]);
//# sourceMappingURL=main.bundle.js.map
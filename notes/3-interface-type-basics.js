"use strict";
exports.__esModule = true;
// NOTE : we don't need type annotations for contact or message
var emailer = function (_contact, _message) {
    /** */
};
// const d: PhoneNumberDict = {};
// if (d.abc) {
//   d.abc;
// }
// const e: PhoneNumberDict = {};
// if (typeof d.abc === 'object') {
//   d.abc;
// }
var phoneDict = {
    office: { areaCode: 321, num: 555444 },
    home: { areaCode: 321, num: 555666 },
    iphone: { areaCode: 334, num: 444555 }
};
phoneDict.home;
phoneDict.office;
phoneDict.iphone;
phoneDict.mobile; // maybe present

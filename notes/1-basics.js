"use strict";
// == BASICS == //
exports.__esModule = true;
/**
 * (1) x is a string, b/c we've initialized it
 */
var x = 'hello world';
/**
 * (2) reassignment is fine
 */
x = 'Hello mars';
/**
 * (3) but if we try to change the type
 */
//x = 42; // ERROR
/**
 * (4) let's look at const. the type is literally 'hello world'
 */
var y = 'hello world';
/**
 * (5) sometimes we need to declare a variable w/o initilizing it
 */
var z;
z = 41;
z = 'abc'; // (6) oh no! this is not good
/**
 * (7) we can improve this situation by providing a type annotation
 */
var zz;
zz = 41;
// zz = 'abc'; ERROR type "abc" is not assignable to type 'number
//== SIMPLE ARRAYS ==//
/**
 * (8) simple array types can be expressed using []
 */
var aa = [];
aa.push(33);
//aa.push('abc'); ERROR: Argument of type 'abc' is not assignable
/**
 * (9)  we can define a tuple, which has a fixed lenght
 */
var bb = [
    123,
    'Fake Street',
    'Nowhere , USA',
    10110
];
//bb = [1, 2, 3]; //ERROR
/**
 * (10) Tuples values often require type annotation
 */
// == OBJECTS ==//
/**
 * (11) Object types can be expressed using {} and property names
 */
var cc;
cc = {
    streetName: 'Fake Street',
    houseNumber: 123
};
// cc = {
//   houseNumber: 33
// };
//Property 'streetName' is missing in type '{ houseNumber: number; }'
//but required in type '{ houseNumber: number; streetName: string; }'.
/**
 * (12) You can use the optional operator (?) to
 * indicate that something may or not be there
 */
var dd;
cc = {
    streetName: '',
    houseNumber: 33
};
// and refer to it by name
var ee = { houseNumber: 33 };
var contactInfo = Math.random() > 0.5
    ? {
        //we can assign it to a HasPhoneNumber
        name: 'Mike',
        phone: 123123123
    }
    : {
        // or a HasEmail
        name: 'Mike',
        email: 'mike@yahoo.com'
    };
contactInfo.name; // NOTE: we can only access the .name property
/**
 * (15) Union types
 */
var otherContactInfo = {
    name: 'Mike',
    email: 'mike@yahoo.com',
    phone: 123123123
};
// we can access anything on otherContactInfo
otherContactInfo.name;
otherContactInfo.email;
otherContactInfo.phone;

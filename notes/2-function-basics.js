"use strict";
exports.__esModule = true;
//== FUNCTIONS ==//
// (1) function args and return values can have type annotation
function sendEmail(to) {
    return {
        recipient: to.name + " <" + to.email + ">",
        body: 'You are pre-qualified for a loan!'
    };
}
// (2) or the arrow function variant
var sendTextMessage = function (to) {
    return {
        recipient: to.name + " <" + to.phone + ">",
        body: 'You are pre-quaslified for a loan'
    };
};
//(3) return types can almost be inferred
var getNameParts = function (contact) {
    var parts = contact.name.split(/\s/g); // split @ whitespace
    if (parts.length === 1) {
        return { name: parts[0] };
    }
    if (parts.length < 2) {
        throw new Error("Can't calculate name parts from name \"" + contact);
    }
    return {
        first: parts[0],
        middle: parts.length === 2
            ? undefined
            : // everithing except first and last
                parts.slice(1, parts.length - 2).join(' '),
        last: parts[parts.length - 1]
    };
};
console.log(getNameParts({ name: 'Madonna' }));
// (4) rest params work just as you'd think. type must be array-is
var sum = function () {
    var vals = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        vals[_i] = arguments[_i];
    }
    return vals.reduce(function (sum, x) { return sum + x; }, 0);
};
console.log(sum(3, 4, 6));
// function implementation
function contactPeople(method) {
    var people = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        people[_i - 1] = arguments[_i];
    }
    if (method === 'email') {
        people.forEach(sendEmail);
    }
    else {
        people.forEach(sendTextMessage);
    }
}
// email works
contactPeople('email', { name: 'foo', email: '' });
// phone works
contactPeople('phone', { name: 'foo', phone: 123123123 });
// mixins does not work
//contactPeople('email', { name: 'foo', phone: 123123123 });
// (6) Lexical scope
function sendMessage(preferdMethod) {
    if (preferdMethod === 'email') {
        console.log('send mail');
        sendEmail(this);
    }
    else {
        console.log('sendTextMessage');
        sendTextMessage(this);
    }
}
var c = { name: 'Mike', phone: 123123, email: 'mike@yahoo.com' };
function invokeSoon(cb, timeout) {
    setTimeout(function () { return cb.call(null); }, timeout);
}
// this is not satisfied
//invokeSoon(() => sendMessage('email'), 500);
// creating a bound function is one solution
var bound = sendMessage.bind(c, 'email');
invokeSoon(function () { return bound(); }, 500);
// call/apply works as well
invokeSoon(function () { return sendMessage.apply(c, ['phone']); }, 500);

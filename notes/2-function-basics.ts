import { HasPhoneNumber, HasEmail } from './1-basics';

//== FUNCTIONS ==//

// (1) function args and return values can have type annotation
function sendEmail(to: HasEmail): { recipient: string; body: string } {
  return {
    recipient: `${to.name} <${to.email}>`, //Mike <mike@yahoo.com
    body: 'You are pre-qualified for a loan!'
  };
}

// (2) or the arrow function variant
const sendTextMessage = (
  to: HasPhoneNumber
): { recipient: string; body: string } => {
  return {
    recipient: `${to.name} <${to.phone}>`,
    body: 'You are pre-quaslified for a loan'
  };
};

//(3) return types can almost be inferred
const getNameParts = (contact: { name: string }) => {
  const parts = contact.name.split(/\s/g); // split @ whitespace
  if (parts.length === 1) {
    return { name: parts[0] };
  }
  if (parts.length < 2) {
    throw new Error(`Can't calculate name parts from name "${contact}`);
  }
  return {
    first: parts[0],
    middle:
      parts.length === 2
        ? undefined
        : // everithing except first and last
          parts.slice(1, parts.length - 2).join(' '),
    last: parts[parts.length - 1]
  };
};

console.log(getNameParts({ name: 'Madonna' }));

// (4) rest params work just as you'd think. type must be array-is
const sum = (...vals: number[]) => vals.reduce((sum, x) => sum + x, 0);
console.log(sum(3, 4, 6));

// (5) we can even provide multiple function signatures

// "overload" signatures
function contactPeople(method: 'email', ...people: HasEmail[]): void;
function contactPeople(method: 'phone', ...people: HasPhoneNumber[]): void;

// function implementation
function contactPeople(
  method: 'email' | 'phone',
  ...people: (HasEmail | HasPhoneNumber)[]
): void {
  if (method === 'email') {
    (people as HasEmail[]).forEach(sendEmail);
  } else {
    (people as HasPhoneNumber[]).forEach(sendTextMessage);
  }
}

// email works
contactPeople('email', { name: 'foo', email: '' });

// phone works
contactPeople('phone', { name: 'foo', phone: 123123123 });

// mixins does not work
//contactPeople('email', { name: 'foo', phone: 123123123 });

// (6) Lexical scope
function sendMessage(
  this: HasEmail & HasPhoneNumber,
  preferdMethod: 'phone' | 'email'
) {
  if (preferdMethod === 'email') {
    console.log('send mail');
    sendEmail(this);
  } else {
    console.log('sendTextMessage');
    sendTextMessage(this);
  }
}

const c = { name: 'Mike', phone: 123123, email: 'mike@yahoo.com' };

function invokeSoon(cb: () => any, timeout: number) {
  setTimeout(() => cb.call(null), timeout);
}
// this is not satisfied
//invokeSoon(() => sendMessage('email'), 500);

// creating a bound function is one solution
const bound = sendMessage.bind(c, 'email');
invokeSoon(() => bound(), 500);

// call/apply works as well
invokeSoon(() => sendMessage.apply(c, ['phone']), 500);

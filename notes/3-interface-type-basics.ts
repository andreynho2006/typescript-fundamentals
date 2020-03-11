import { HasEmail, HasPhoneNumber } from './1-basics';
//==TYPE ALIAS ==//

//(1) Type alias allows us to give a type a name

type StringNumber = string | number;

// this is the only time you'll see a type on the RHS of assignment
type hashName = { name: string };

// self-referencing types don't work!
type NumVal = 1 | 2 | 3 | NumArr;
type NumArr = NumVal[];

// (2) interfaces can extends from other interfaces
export interface HasInternationalPhoneNumber extends HasPhoneNumber {
  contryCode: string;
}

// (3) they can only be used to describe call signatures
interface ContactMessenger1 {
  (contact: HasEmail | HasPhoneNumber, message: string): void;
}

type ContactMessenger2 = (
  contact: HasEmail | HasPhoneNumber,
  message: string
) => void;

// NOTE : we don't need type annotations for contact or message
const emailer: ContactMessenger1 = (_contact, _message) => {
  /** */
};

// (4) construct signatures can be described as well
interface ContactConstructor {
  new (...args: any[]): HasEmail | HasPhoneNumber;
}

interface PhoneNumberDict {
  // arr[0], foo['myProp]
  [numberName: string]:
    | undefined
    | {
        areaCode: number;
        num: number;
      };
}

// const d: PhoneNumberDict = {};
// if (d.abc) {
//   d.abc;
// }
// const e: PhoneNumberDict = {};
// if (typeof d.abc === 'object') {
//   d.abc;
// }

const phoneDict: PhoneNumberDict = {
  office: { areaCode: 321, num: 555444 },
  home: { areaCode: 321, num: 555666 },
  iphone: { areaCode: 334, num: 444555 }
};

// augment the existing PhoneNumberDict
// i.e. imported it from a library, adding studd to it
interface PhoneNumberDict {
  home: {
    /**
     * interface are 'open' meaning any declaration
     * of the same name are merged
     */
    areaCode: number;
    num: number;
  };
  office: {
    areaCode: number;
    num: number;
  };
}
phoneDict.home;
phoneDict.office;
phoneDict.iphone;
phoneDict.mobile; // maybe present

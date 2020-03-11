import { HasEmail, HasPhoneNumber } from './1-basics';
// (1) class work similarly to what you're used to seeing in JS
// They can "implement" interfaces

export class Contact implements HasEmail {
  email: string;
  name: string;
  constructor(name: string, email: string) {
    this.email = email;
    this.name = name;
  }
}

// (2) this looks a little verbose
// we have to specify the words
// Typescript has a shortcut: PARAMETER PROPERTIES

// (3) Access modifier keywords- "who" can access this thing

// - public - everyone
// - protected - me and subclasses
// - private - only me

class ParamPropContact implements HasEmail {
  constructor(public name: string, public email: string = 'no email') {
    // nothing here
  }
}

// (4) class fields can have initializers (defaults)
class OtherContact implements HasEmail, HasPhoneNumber {
  protected age: number = 0;
  //private password: string;
  //private password!: string;
  // private password: string | undefined;
  private passwordValue: string | undefined;
  constructor(public name: string, public email: string, public phone: number) {
    // password must either be initialized like this , or have a default  value
    this.age = 35;
  }
  // lazzy instantiated value
  get password(): string {
    if (!this.passwordValue) {
      this.passwordValue = Math.round(Math.random() * 1e14).toString(32);
    }
    return this.passwordValue;
  }
  async init() {
    this.password;
  }
}

// (5) Abstract classes
abstract class AbstractClass implements HasEmail, HasPhoneNumber {
  public abstract phone: number; // mjust be implemented by non-abstract

  constructor(
    public name: string,
    public email: string // must be public to satisfy HasEmail
  ) {}

  abstract sendEmail(): void; // must be implemented by non-abstract
}

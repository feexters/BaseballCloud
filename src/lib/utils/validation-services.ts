import { UserData } from "lib/interfaces";

function validateEmail(email: string) {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.trim());
}

class Validation {
  email(email: string): string {
    if (this.validation(email)) {
      return "Required";
    } else if (!validateEmail(email)) {
      return "Invalid address";
    }

    return "";
  }

  password(password: string): string {
    if (this.validation(password)) {
      return "Required";
    } else if (password.length < 8) {
      return "Must contain more than 8 characters";
    }

    return "";
  }

  confirm(password: string, confirm: string): string {
    if (!this.password(password)) {
      if (password !== confirm) {
        return "Passwords are not equal";
      }
    }

    return "";
  }

  age(age: number): string {
    if (!age) {
      return "Age Required";
    } else if (age < 0) {
      return "You must be older than 0";
    } else if (age >= 30) {
      return "Must not be older than 30";
    }

    return "";
  }

  feet(feet: number): string {
    if (!feet) {
      return "Feet Required";
    } else if (feet < 4) {
      return "Minimal height is 4";
    } else if (feet > 7) {
      return "Maximum height is 7";
    }

    return "";
  }

  inches(inches: number): string {
    if (inches < 0 || inches > 11) {
      return "Inches can be from 0 to 11";
    }

    return "";
  }

  weight(weight: number): string {
    if (!weight) {
      return "Weight Required";
    } else if (weight < 50) {
      return "Minimal weight is 50 lbs";
    } else if (weight > 350) {
      return "Maximum weight is 350 lbs";
    }

    return "";
  }

  userFieldsRequired(user: UserData): boolean {
    if (
      !user.first_name ||
      !user.last_name ||
      !user.age ||
      !user.position ||
      !user.feet ||
      !user.weight ||
      !user.throws_hand ||
      !user.bats_hand
    ) {
      return false
    }

    return true;
  }

  validation(value: string, message = "") {
    if (!value || !value.trim()) {
      return message + "Required";
    }

    return "";
  }
}

export default new Validation();

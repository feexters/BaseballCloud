import validateEmail from "./email-validation";

class Validation {
  email(email: string): string {
    if (this.validation(email)) {
      return 'Required';
    } else if (!validateEmail(email)) {
      return 'Invalid address';
    }

    return '';
  }

  password(password: string): string {
    if (this.validation(password)) {
      return 'Required';
    } else if (password.length < 8) {
      return 'Must contain more than 8 characters';
    }

    return '';
  }

  confirm(password: string, confirm: string): string {
    if (!this.password(password)) {
      if (password !== confirm) {
        return 'Passwords are not equal'
      }
    }

    return ''
  }

  validation(value: string) {
    if (!value || !value.trim()) {
      return "Required";
    }

    return "";
  }
}

export default new Validation();

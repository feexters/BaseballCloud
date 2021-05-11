class Validation {
  validation(value: string) {
    if (!value || !value.trim()) {
      return "Invalid login credentials. Please try again.";
    }

    return "";
  }
}

export default new Validation();

function emailValid(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

emaile();
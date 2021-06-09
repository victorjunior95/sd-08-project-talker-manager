function email(reqEmail) {
    const verifyEmail = /\S+@\S+\.\S+/.test(reqEmail);

    if (!reqEmail || reqEmail === '') {
        return { message: 'O campo "email" é obrigatório' };
    }
    if (!verifyEmail) {
        return { message: 'O "email" deve ter o formato "email@email.com"' };
    }

    return true;
}

function password(reqPassword) {
    const verifyPassword = /^[A-Za-z0-9]\w{5,}$/.test(reqPassword);

    if (!reqPassword || reqPassword === '') {
        return { message: 'O campo "password" é obrigatório' };
    }
    if (!verifyPassword) {
        return { message: 'O "password" deve ter pelo menos 6 caracteres' };
    }

    return true;
}

const validate = {
    email,
    password,
};

module.exports = validate;

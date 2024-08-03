export const passwordValid = (password) => {
    if (password.length >= 8 && password.length <= 20 && password.match(/[A-Z]/) && password.match(/[a-z]/) && password.match(/[0-9]/)) {
        return true;
    }
    return false;
};
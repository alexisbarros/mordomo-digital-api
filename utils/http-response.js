/**
 * Ok.
 * @param       {string}     message 
 * @param       {object}     data 
 * @returns     {object}
 */
const ok = (message, data) => {
    console.info(message);
    return { code: 200, message, data };
};

/**
 * Error.
 * @param       {string}     message 
 * @param       {object}     data 
 * @returns     {object}
 */
const error = (message, data) => {
    console.error(message);
    return { code: 400, message, data };
};

/**
 * Unauthorized.
 * @param       {string}     message 
 * @param       {object}     data 
 * @returns     {object}
 */
const unauthorized = (message, data) => {
    console.error(message);
    return { code: 401, message, data };
};

/**
 * Not found.
 * @param       {string}     message 
 * @param       {object}     data 
 * @returns     {object}
 */
const notFound = (message, data) => {
    console.error(message);
    return { code: 404, message, data };
};

const internalServerError = (data) => {
    console.error(message);
    return {
        code: 500,
        message: 'Desculpa, o servidor não está respondendo! Tente novamente mais tarde!',
        data
    };
};

module.exports = {
    ok,
    error,
    unauthorized,
    notFound,
    internalServerError
};

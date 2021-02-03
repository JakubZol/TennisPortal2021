const snakeCaseToCamelCase = variableName => variableName.split('_').map((word, idx) => idx !== 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word).join('');

export default body => {
    const validResponseBody = {};

    for(let key in body){
        const validKey = snakeCaseToCamelCase(key);
        validResponseBody[validKey] = body[key];
    }

    return validResponseBody;
}

const camelCaseToSnakeCase = variableName => variableName.split('').map(character => character === character.toUpperCase() ? '_' + character.toLowerCase() : character).join('');

export default body => {
    const validRequestBody = {};

    for(let key in body){
        const validKey = camelCaseToSnakeCase(key);
        validRequestBody[validKey] = body[key];
    }

    return validRequestBody;
}

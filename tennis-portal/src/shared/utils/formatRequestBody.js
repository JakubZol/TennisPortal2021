const camelCaseToSnakeCase = variableName => variableName.split('').map(character => character === character.toUpperCase() && character !== character.toLowerCase() ? '_' + character.toLowerCase() : character).join('');

const formatRequestBody = body => {
    const validRequestBody = {};

    for(let key in body){
        const validKey = camelCaseToSnakeCase(key);
        const currentElement = body[key];

        if (key === 'ntrp'){
            const parsedNtrp = parseFloat(currentElement).toString();
            validRequestBody[key] = parsedNtrp.length === 1 ? `${parsedNtrp}.0` : parsedNtrp;
        }
        else if (Array.isArray(currentElement)){
            validRequestBody[validKey] = currentElement.map(element => typeof element === 'object' && element !== null ? formatRequestBody(element) : element);
        }
        else if(typeof currentElement === 'object' && currentElement !== null){
            validRequestBody[validKey] = formatRequestBody(currentElement);
        }
        else {
            validRequestBody[validKey] = currentElement;
        }
    }

    return validRequestBody;
};

export default formatRequestBody;


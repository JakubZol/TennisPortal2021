const snakeCaseToCamelCase = variableName => variableName.split('_').map((word, idx) => idx !== 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word).join('');

const formatResponseBody = body => {
    const validResponseBody = {};

    for(let key in body){
        const validKey = snakeCaseToCamelCase(key);
        const currentElement = body[key];

        if (Array.isArray(currentElement)){
            validResponseBody[validKey] = currentElement.map(element => typeof element === 'object' && element !== null ? formatResponseBody(element) : element);
        }
        else if(typeof currentElement === 'object' && currentElement !== null){
            validResponseBody[validKey] = formatResponseBody(currentElement);
        }
        else {
            validResponseBody[validKey] = currentElement;
        }
    }

    return validResponseBody;
};

export default formatResponseBody;

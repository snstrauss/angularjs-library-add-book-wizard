APP.filter('camelCase', (capitalizeFilter) => (text) => {
    let [firstWord, ...rest] = text.split(' ');

    rest = rest.map(capitalizeFilter);

    return [firstWord].concat(rest).join('');
});
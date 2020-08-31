APP.filter('capitalize', () => (text) => capitalize(text));

const capitalize = (word) => word[0].toUpperCase() + word.slice(1);

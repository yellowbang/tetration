const SUBSTITUTION = /{([^{]+)}/g;

const dictionary = {
    alert: 'Alert',
    cancel: 'Cancel',
    ok: 'Ok',
    page1Header: 'Page One',
    page2Header: 'Page Two',

    /**
     * Accepts a parameterized string and the associated substitution value.
     *
     * @param parametrized string template
     * @param variables to be substituted into given template
     */
    format: function(template, variables) {
        return template.replace(SUBSTITUTION, function(_unused, varName) {
            return variables[varName];
        });
    }
};

/**
 * Proxy should guarantee the user will get a
 * String, either the value of the target[property]
 * or the property string. no chance of getting
 * undefined
 * @type {Proxy}
 */
const labels = new Proxy(dictionary, {
    get: function(target, property) {
        return property in target ? target[property] : property;
    }
});

/**
 *
 * @param {String} label - property name of the label in the dictionary
 * @param {Array} variables array of string to be used for substitution
 * @returns {String}
 */
function formatLabel(label, variables) {
    let template = labels[label];
    return template.replace(SUBSTITUTION, function(_unused, varName) {
        return variables[varName];
    });
}

export default labels;
export {formatLabel};

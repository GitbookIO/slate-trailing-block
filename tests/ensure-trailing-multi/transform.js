const Slate = require('slate');

module.exports = function(plugin, state) {
    const schema = new Slate.Schema(plugin.schema);
    const normalized = state.transform()
        .normalize(schema)
        .apply();
    return normalized;
};

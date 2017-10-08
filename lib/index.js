const Slate = require('slate');
const focusAtEnd = require('./focusAtEnd');

/**
 * Slate plugin to ensure a trailing block.
 * @param {Object} [opts] Options for the plugin
 * @param {String|Function} [opts.match='paragraph'] Match last block
 * @param {String} [opts.type] The type of the trailing block to insert
 * @return {Object}
 */

function TrailingBlock(opts) {
    opts       = opts || {};
    opts.type  = opts.type || 'paragraph';
    opts.match = opts.match || (node => node.type === opts.type);

    return {
        schema: {
            rules: [
                {
                    match(node) {
                        return node.kind === 'document';
                    },
                    validate(node) {
                        const lastNode = node.nodes.last();

                        return (!lastNode || !opts.match(lastNode)) ?
                            true : null;
                    },
                    normalize(change, node, value) {
                        const lastIndex = node.nodes.count();
                        const block = Slate.Block.create({
                            type: opts.type,
                            nodes: [Slate.Text.create()]
                        });

                        change.insertNodeByKey(node.key, lastIndex, block);
                        return true
                    }
                }
            ]
        },

        transforms: {
            focusAtEnd
        }
    };
}

module.exports = TrailingBlock;

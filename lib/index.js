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
        validateNode: (node) => {
            if (node.kind !== 'document') {
                return undefined;
            }

            const lastNode = node.nodes.last();
            if (lastNode && opts.match(lastNode)) {
                return undefined;
            }

            const lastIndex = node.nodes.count();
            const block = Slate.Block.create({
                type: opts.type,
                nodes: [Slate.Text.create()]
            });

            return (change) => change.insertNodeByKey(node.key, lastIndex, block);
        },

        changes: {
            focusAtEnd
        }
    };
}

module.exports = TrailingBlock;

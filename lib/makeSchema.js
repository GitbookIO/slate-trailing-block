const Slate = require('slate');

/**
 * Create a schema for blockquotes
 * @param {String} opts.type The type of blockquote
 * @param {String} opts.typeDefault The type of the default block in list items
 * @return {Object} A schema definition with rules to normalize lists
 */
function makeSchema(opts) {
    return {
        rules: [
            {
                match(node) {
                    return node.kind === 'document';
                },
                validate(node) {
                    const lastNode = node.nodes.last();

                    return (!lastNode || lastNode.type !== opts.type) ?
                        true : null;
                },
                normalize(transform, node, value) {
                    const lastIndex = node.nodes.count();
                    const block = Slate.Block.create({
                        type: opts.type
                    });

                    return transform.insertNodeByKey(node.key, lastIndex, block);
                }
            }
        ]
    };
}


module.exports = makeSchema;

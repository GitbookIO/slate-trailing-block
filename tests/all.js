const expect = require('expect');
const fs = require('fs');
const path = require('path');
const Slate = require('slate');
const readMetadata = require('read-metadata');

const TrailingBlock = require('../lib');

const PLUGIN = TrailingBlock({
    match: node => (node.type == 'paragraph' || node.type == 'footnote')
});

const SCHEMA = Slate.Schema.create({
    plugins: [PLUGIN]
});

function deserializeValue(json) {
    json.schema = SCHEMA;

    return Slate.Value.fromJSON(
        json,
        { normalize: false }
    );
}

describe('slate-trailing-block', function() {
    const tests = fs.readdirSync(__dirname);

    tests.forEach(function(test) {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, function() {
            const dir = path.resolve(__dirname, test);
            const input = readMetadata.sync(path.resolve(dir, 'input.yaml'));
            const expectedPath = path.resolve(dir, 'expected.yaml');
            const expected =
                fs.existsSync(expectedPath) && readMetadata.sync(expectedPath);

            // eslint-disable-next-line
            const runChange = require(path.resolve(dir, 'change.js'));

            const valueInput = deserializeValue(input);

            const newChange = runChange(PLUGIN, valueInput.change());

            if (expected) {
                const newDocJSon = newChange.value.toJSON();
                expect(newDocJSon).toEqual(deserializeValue(expected).toJSON());
            }
        });
    });
});

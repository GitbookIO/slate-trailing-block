const expect = require('expect');
const fs = require('fs');
const path = require('path');
const Slate = require('slate');
const readMetadata = require('read-metadata');

const TrailingBlock = require('../lib');

describe('slate-trailing-block', function() {
    const tests = fs.readdirSync(__dirname);
    const plugin = TrailingBlock({
        match: node => (node.type == 'paragraph' || node.type == 'footnote')
    });

    tests.forEach(function(test) {
        if (test[0] === '.' || path.extname(test).length > 0) return;

        it(test, function() {
            const dir = path.resolve(__dirname, test);

            const inputPath = path.resolve(dir, 'input.yaml');
            const input = readMetadata.sync(inputPath);

            const expectedPath = path.resolve(dir, 'expected.yaml');
            let expected;
            if (fs.existsSync(expectedPath)) {
                expected = readMetadata.sync(expectedPath);
            }

            const runChange = require(path.resolve(dir, 'change.js'));

            const stateInput = Slate.State.fromJSON(input);

            const newState = runChange(plugin, stateInput);

            if (expected) {
                const expectedState = Slate.State.fromJSON(expected);
                expect(newState.toJSON()).toEqual(expectedState.toJSON());
            }
        });
    });
});

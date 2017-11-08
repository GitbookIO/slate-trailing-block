
/**
 * Focus at the end of the document
 * @param  {Slate.Change} change
 * @return {Slate.Change}
 */
function focusAtEnd(change) {
    const {state} = change;
    const document = state.document;
    return change.collapseToEndOf(document);
}

module.exports = focusAtEnd;

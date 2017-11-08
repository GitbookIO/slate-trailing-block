
/**
 * Focus at the end of the document
 * @param  {Slate.Change} change
 * @return {Slate.Change}
 */
function focusAtEnd(change) {
    const { value } = change;
    const document = value.document;
    return change.collapseToEndOf(document);
}

module.exports = focusAtEnd;

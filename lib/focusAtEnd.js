
/**
 * Focus at the end of the document
 * @param  {Slate.Transform} transform
 * @return {Slate.Transform}
 */
function focusAtEnd(change) {
  var {state} = change;
  var document = state.document;
  change.collapseToEndOf(document);
  return true
}

module.exports = focusAtEnd;

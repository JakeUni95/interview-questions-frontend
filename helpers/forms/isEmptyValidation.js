function isEmptyValidation(skillSelection, res) {
  if (!skillSelection.length == 0) {
    res.redirect(`/question?skills=${skillSelection}`);
  } else {
    res.redirect(`/error`);
  }
}
module.exports = isEmptyValidation;


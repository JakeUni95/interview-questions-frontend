function getPostedArray(req, key, defaultValue = []) {
  const values = req.body[key];

  if (!values) {
    return defaultValue;
  }

  if (!Array.isArray(values)) {
    return [ values ];
  }

  return values;
}

module.exports = getPostedArray;

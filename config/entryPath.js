const fs = require('fs');
const path = require('path');

exports.entryPath = (src) => {
  const entries = fs.readdirSync(src)
  return entries.reduce((_entries, component_path) => {
    if (component_path.indexOf('.') < 0) {
      const file = path.resolve(src, component_path, './index');
      _entries[component_path] = file
    }
    return _entries
  },{})
}
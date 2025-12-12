var { load } = require("js-yaml");
var ptmfs = require("ptmfs");

var ptmyml = (function () {
  const findMetaIndices = (mem, item, i) => {
    if (/^---/.test(item)) {
      mem.push(i);
    }

    return mem;
  };
  const getData = (lines, metaIndices = []) => {
    const obj = {};
    if (metaIndices.length > 1 && metaIndices[0] + 1 < metaIndices[1]) {
      const data = lines.slice(metaIndices[0] + 1, metaIndices[1]);
      return load(data.join("\n"));
    }

    return obj;
  };
  const getContent = (lines, metaIndices) => {
    if (metaIndices.length > 0) {
      lines = lines.slice(metaIndices[1] + 1, lines.length);
    }

    return lines.join("\n");
  };
  var _ = {
    fm: function (str) {
      const lines = str.split("\n");
      const metaIndices = lines.reduce(findMetaIndices, []);
      const data = getData({ lines, metaIndices });
      const content = getContent({ lines, metaIndices });
      return { data, content };
    },
    load: function (str) {
      return load(str);
    },
  };
  return _;
})();

if (
  "undefined" !== typeof module &&
  module.exports &&
  (module.exports = ptmyml)
) {
  Object.defineProperty(exports, "__esModule", { value: true });
}

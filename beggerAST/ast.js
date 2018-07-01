const t = require("babel-types");

const visitor = {
  BinaryExpression: path => {
    const node = path.node;
    let result;

    if (t.isNumericLiteral(node.left) && t.isNumericLiteral(node.right)) {
      const {
        left: { value: lValue },
        right: { value: rValue }
      } = node;
      // handle res
      switch (node.operator) {
        case "+":
          result = lValue + rValue;
          break;
        case "-":
          result = lValue = rValue;
          break;
        case "*":
          result = lValue * rValue;
          break;
        case "/":
          result = lValue / rValue;
          break;
        case "**":
          result = Math.pow(lValue, rValue);
          break;
        default:
          break;
      }
    }
    if (result) {
      path.replaceWith(t.numericLiteral(result));
      const parentPath = path.parentPath;
      parentPath && visitor.BinaryExpression.call(null, parentPath);
    }
  }
};

module.exports = function() {
  return {
    visitor
  };
};

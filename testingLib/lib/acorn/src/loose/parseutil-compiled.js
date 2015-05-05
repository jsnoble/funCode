"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDummy = isDummy;

var _LooseParser = require("./state");

var _Node$SourceLocation$lineBreak$isNewLine$tt = require("..");

var lp = _LooseParser.LooseParser.prototype;

lp.startNode = function () {
  var node = new _Node$SourceLocation$lineBreak$isNewLine$tt.Node();
  node.start = this.tok.start;
  if (this.options.locations) node.loc = new _Node$SourceLocation$lineBreak$isNewLine$tt.SourceLocation(this.toks, this.tok.loc.start);
  if (this.options.directSourceFile) node.sourceFile = this.options.directSourceFile;
  if (this.options.ranges) node.range = [this.tok.start, 0];
  return node;
};

lp.storeCurrentPos = function () {
  return this.options.locations ? [this.tok.start, this.tok.loc.start] : this.tok.start;
};

lp.startNodeAt = function (pos) {
  var node = new _Node$SourceLocation$lineBreak$isNewLine$tt.Node();
  if (this.options.locations) {
    node.start = pos[0];
    node.loc = new _Node$SourceLocation$lineBreak$isNewLine$tt.SourceLocation(this.toks, pos[1]);
    pos = pos[0];
  } else {
    node.start = pos;
  }
  if (this.options.directSourceFile) node.sourceFile = this.options.directSourceFile;
  if (this.options.ranges) node.range = [pos, 0];
  return node;
};

lp.finishNode = function (node, type) {
  node.type = type;
  node.end = this.last.end;
  if (this.options.locations) node.loc.end = this.last.loc.end;
  if (this.options.ranges) node.range[1] = this.last.end;
  return node;
};

lp.dummyIdent = function () {
  var dummy = this.startNode();
  dummy.name = "✖";
  return this.finishNode(dummy, "Identifier");
};

function isDummy(node) {
  return node.name == "✖";
}

lp.eat = function (type) {
  if (this.tok.type === type) {
    this.next();
    return true;
  } else {
    return false;
  }
};

lp.isContextual = function (name) {
  return this.tok.type === _Node$SourceLocation$lineBreak$isNewLine$tt.tokTypes.name && this.tok.value === name;
};

lp.eatContextual = function (name) {
  return this.tok.value === name && this.eat(_Node$SourceLocation$lineBreak$isNewLine$tt.tokTypes.name);
};

lp.canInsertSemicolon = function () {
  return this.tok.type === _Node$SourceLocation$lineBreak$isNewLine$tt.tokTypes.eof || this.tok.type === _Node$SourceLocation$lineBreak$isNewLine$tt.tokTypes.braceR || _Node$SourceLocation$lineBreak$isNewLine$tt.lineBreak.test(this.input.slice(this.last.end, this.tok.start));
};

lp.semicolon = function () {
  return this.eat(_Node$SourceLocation$lineBreak$isNewLine$tt.tokTypes.semi);
};

lp.expect = function (type) {
  if (this.eat(type)) return true;
  for (var i = 1; i <= 2; i++) {
    if (this.lookAhead(i).type == type) {
      for (var j = 0; j < i; j++) {
        this.next();
      }return true;
    }
  }
};

lp.pushCx = function () {
  this.context.push(this.curIndent);
};
lp.popCx = function () {
  this.curIndent = this.context.pop();
};

lp.lineEnd = function (pos) {
  while (pos < this.input.length && !_Node$SourceLocation$lineBreak$isNewLine$tt.isNewLine(this.input.charCodeAt(pos))) ++pos;
  return pos;
};

lp.indentationAfter = function (pos) {
  for (var count = 0;; ++pos) {
    var ch = this.input.charCodeAt(pos);
    if (ch === 32) ++count;else if (ch === 9) count += this.options.tabSize;else return count;
  }
};

lp.closes = function (closeTok, indent, line, blockHeuristic) {
  if (this.tok.type === closeTok || this.tok.type === _Node$SourceLocation$lineBreak$isNewLine$tt.tokTypes.eof) return true;
  return line != this.curLineStart && this.curIndent < indent && this.tokenStartsLine() && (!blockHeuristic || this.nextLineStart >= this.input.length || this.indentationAfter(this.nextLineStart) < indent);
};

lp.tokenStartsLine = function () {
  for (var p = this.tok.start - 1; p >= this.curLineStart; --p) {
    var ch = this.input.charCodeAt(p);
    if (ch !== 9 && ch !== 32) return false;
  }
  return true;
};

//# sourceMappingURL=parseutil-compiled.js.map
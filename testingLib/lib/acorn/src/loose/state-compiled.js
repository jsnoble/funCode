"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LooseParser = LooseParser;

var _tokenizer$SourceLocation$tt = require("..");

function LooseParser(input, options) {
  this.toks = _tokenizer$SourceLocation$tt.tokenizer(input, options);
  this.options = this.toks.options;
  this.input = this.toks.input;
  this.tok = this.last = { type: _tokenizer$SourceLocation$tt.tokTypes.eof, start: 0, end: 0 };
  if (this.options.locations) {
    var here = this.toks.curPosition();
    this.tok.loc = new _tokenizer$SourceLocation$tt.SourceLocation(this.toks, here, here);
  }
  this.ahead = []; // Tokens ahead
  this.context = []; // Indentation contexted
  this.curIndent = 0;
  this.curLineStart = 0;
  this.nextLineStart = this.lineEnd(this.curLineStart) + 1;
}

//# sourceMappingURL=state-compiled.js.map
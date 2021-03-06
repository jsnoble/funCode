"use strict";

var _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG = require("..");

var _LooseParser = require("./state");

var lp = _LooseParser.LooseParser.prototype;

function isSpace(ch) {
  return ch < 14 && ch > 8 || ch === 32 || ch === 160 || _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.isNewLine(ch);
}

lp.next = function () {
  this.last = this.tok;
  if (this.ahead.length) this.tok = this.ahead.shift();else this.tok = this.readToken();

  if (this.tok.start >= this.nextLineStart) {
    while (this.tok.start >= this.nextLineStart) {
      this.curLineStart = this.nextLineStart;
      this.nextLineStart = this.lineEnd(this.curLineStart) + 1;
    }
    this.curIndent = this.indentationAfter(this.curLineStart);
  }
};

lp.readToken = function () {
  for (;;) {
    try {
      this.toks.next();
      if (this.toks.type === _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.tokTypes.dot && this.input.substr(this.toks.end, 1) === "." && this.options.ecmaVersion >= 6) {
        this.toks.end++;
        this.toks.type = _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.tokTypes.ellipsis;
      }
      return new _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.Token(this.toks);
    } catch (e) {
      if (!(e instanceof SyntaxError)) throw e;

      // Try to skip some text, based on the error message, and then continue
      var msg = e.message,
          pos = e.raisedAt,
          replace = true;
      if (/unterminated/i.test(msg)) {
        pos = this.lineEnd(e.pos + 1);
        if (/string/.test(msg)) {
          replace = { start: e.pos, end: pos, type: _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.tokTypes.string, value: this.input.slice(e.pos + 1, pos) };
        } else if (/regular expr/i.test(msg)) {
          var re = this.input.slice(e.pos, pos);
          try {
            re = new RegExp(re);
          } catch (e) {}
          replace = { start: e.pos, end: pos, type: _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.tokTypes.regexp, value: re };
        } else if (/template/.test(msg)) {
          replace = { start: e.pos, end: pos,
            type: _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.tokTypes.template,
            value: this.input.slice(e.pos, pos) };
        } else {
          replace = false;
        }
      } else if (/invalid (unicode|regexp|number)|expecting unicode|octal literal|is reserved|directly after number/i.test(msg)) {
        while (pos < this.input.length && !isSpace(this.input.charCodeAt(pos))) ++pos;
      } else if (/character escape|expected hexadecimal/i.test(msg)) {
        while (pos < this.input.length) {
          var ch = this.input.charCodeAt(pos++);
          if (ch === 34 || ch === 39 || _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.isNewLine(ch)) break;
        }
      } else if (/unexpected character/i.test(msg)) {
        pos++;
        replace = false;
      } else if (/regular expression/i.test(msg)) {
        replace = true;
      } else {
        throw e;
      }
      this.resetTo(pos);
      if (replace === true) replace = { start: pos, end: pos, type: _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.tokTypes.name, value: "✖" };
      if (replace) {
        if (this.options.locations) replace.loc = new _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.SourceLocation(this.toks, _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.getLineInfo(this.input, replace.start), _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.getLineInfo(this.input, replace.end));
        return replace;
      }
    }
  }
};

lp.resetTo = function (pos) {
  this.toks.pos = pos;
  var ch = this.input.charAt(pos - 1);
  this.toks.exprAllowed = !ch || /[\[\{\(,;:?\/*=+\-~!|&%^<>]/.test(ch) || /[enwfd]/.test(ch) && /\b(keywords|case|else|return|throw|new|in|(instance|type)of|delete|void)$/.test(this.input.slice(pos - 10, pos));

  if (this.options.locations) {
    this.toks.curLine = 1;
    this.toks.lineStart = _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.lineBreakG.lastIndex = 0;
    var match = undefined;
    while ((match = _tt$Token$isNewLine$SourceLocation$getLineInfo$lineBreakG.lineBreakG.exec(this.input)) && match.index < pos) {
      ++this.toks.curLine;
      this.toks.lineStart = match.index + match[0].length;
    }
  }
};

lp.lookAhead = function (n) {
  while (n > this.ahead.length) this.ahead.push(this.readToken());
  return this.ahead[n - 1];
};

//# sourceMappingURL=tokenize-compiled.js.map
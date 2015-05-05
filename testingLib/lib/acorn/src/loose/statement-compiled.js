"use strict";

var _LooseParser = require("./state");

var _isDummy = require("./parseutil");

var _getLineInfo$tt = require("..");

var lp = _LooseParser.LooseParser.prototype;

lp.parseTopLevel = function () {
  var node = this.startNodeAt(this.options.locations ? [0, _getLineInfo$tt.getLineInfo(this.input, 0)] : 0);
  node.body = [];
  while (this.tok.type !== _getLineInfo$tt.tokTypes.eof) node.body.push(this.parseStatement());
  this.last = this.tok;
  if (this.options.ecmaVersion >= 6) {
    node.sourceType = this.options.sourceType;
  }
  return this.finishNode(node, "Program");
};

lp.parseStatement = function () {
  var starttype = this.tok.type,
      node = this.startNode();

  switch (starttype) {
    case _getLineInfo$tt.tokTypes._break:case _getLineInfo$tt.tokTypes._continue:
      this.next();
      var isBreak = starttype === _getLineInfo$tt.tokTypes._break;
      if (this.semicolon() || this.canInsertSemicolon()) {
        node.label = null;
      } else {
        node.label = this.tok.type === _getLineInfo$tt.tokTypes.name ? this.parseIdent() : null;
        this.semicolon();
      }
      return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");

    case _getLineInfo$tt.tokTypes._debugger:
      this.next();
      this.semicolon();
      return this.finishNode(node, "DebuggerStatement");

    case _getLineInfo$tt.tokTypes._do:
      this.next();
      node.body = this.parseStatement();
      node.test = this.eat(_getLineInfo$tt.tokTypes._while) ? this.parseParenExpression() : this.dummyIdent();
      this.semicolon();
      return this.finishNode(node, "DoWhileStatement");

    case _getLineInfo$tt.tokTypes._for:
      this.next();
      this.pushCx();
      this.expect(_getLineInfo$tt.tokTypes.parenL);
      if (this.tok.type === _getLineInfo$tt.tokTypes.semi) return this.parseFor(node, null);
      if (this.tok.type === _getLineInfo$tt.tokTypes._var || this.tok.type === _getLineInfo$tt.tokTypes._let || this.tok.type === _getLineInfo$tt.tokTypes._const) {
        var _init = this.parseVar(true);
        if (_init.declarations.length === 1 && (this.tok.type === _getLineInfo$tt.tokTypes._in || this.isContextual("of"))) {
          return this.parseForIn(node, _init);
        }
        return this.parseFor(node, _init);
      }
      var init = this.parseExpression(true);
      if (this.tok.type === _getLineInfo$tt.tokTypes._in || this.isContextual("of")) return this.parseForIn(node, this.toAssignable(init));
      return this.parseFor(node, init);

    case _getLineInfo$tt.tokTypes._function:
      this.next();
      return this.parseFunction(node, true);

    case _getLineInfo$tt.tokTypes._if:
      this.next();
      node.test = this.parseParenExpression();
      node.consequent = this.parseStatement();
      node.alternate = this.eat(_getLineInfo$tt.tokTypes._else) ? this.parseStatement() : null;
      return this.finishNode(node, "IfStatement");

    case _getLineInfo$tt.tokTypes._return:
      this.next();
      if (this.eat(_getLineInfo$tt.tokTypes.semi) || this.canInsertSemicolon()) node.argument = null;else {
        node.argument = this.parseExpression();this.semicolon();
      }
      return this.finishNode(node, "ReturnStatement");

    case _getLineInfo$tt.tokTypes._switch:
      var blockIndent = this.curIndent,
          line = this.curLineStart;
      this.next();
      node.discriminant = this.parseParenExpression();
      node.cases = [];
      this.pushCx();
      this.expect(_getLineInfo$tt.tokTypes.braceL);

      var cur = undefined;
      while (!this.closes(_getLineInfo$tt.tokTypes.braceR, blockIndent, line, true)) {
        if (this.tok.type === _getLineInfo$tt.tokTypes._case || this.tok.type === _getLineInfo$tt.tokTypes._default) {
          var isCase = this.tok.type === _getLineInfo$tt.tokTypes._case;
          if (cur) this.finishNode(cur, "SwitchCase");
          node.cases.push(cur = this.startNode());
          cur.consequent = [];
          this.next();
          if (isCase) cur.test = this.parseExpression();else cur.test = null;
          this.expect(_getLineInfo$tt.tokTypes.colon);
        } else {
          if (!cur) {
            node.cases.push(cur = this.startNode());
            cur.consequent = [];
            cur.test = null;
          }
          cur.consequent.push(this.parseStatement());
        }
      }
      if (cur) this.finishNode(cur, "SwitchCase");
      this.popCx();
      this.eat(_getLineInfo$tt.tokTypes.braceR);
      return this.finishNode(node, "SwitchStatement");

    case _getLineInfo$tt.tokTypes._throw:
      this.next();
      node.argument = this.parseExpression();
      this.semicolon();
      return this.finishNode(node, "ThrowStatement");

    case _getLineInfo$tt.tokTypes._try:
      this.next();
      node.block = this.parseBlock();
      node.handler = null;
      if (this.tok.type === _getLineInfo$tt.tokTypes._catch) {
        var clause = this.startNode();
        this.next();
        this.expect(_getLineInfo$tt.tokTypes.parenL);
        clause.param = this.toAssignable(this.parseExprAtom(), true);
        this.expect(_getLineInfo$tt.tokTypes.parenR);
        clause.guard = null;
        clause.body = this.parseBlock();
        node.handler = this.finishNode(clause, "CatchClause");
      }
      node.finalizer = this.eat(_getLineInfo$tt.tokTypes._finally) ? this.parseBlock() : null;
      if (!node.handler && !node.finalizer) return node.block;
      return this.finishNode(node, "TryStatement");

    case _getLineInfo$tt.tokTypes._var:
    case _getLineInfo$tt.tokTypes._let:
    case _getLineInfo$tt.tokTypes._const:
      return this.parseVar();

    case _getLineInfo$tt.tokTypes._while:
      this.next();
      node.test = this.parseParenExpression();
      node.body = this.parseStatement();
      return this.finishNode(node, "WhileStatement");

    case _getLineInfo$tt.tokTypes._with:
      this.next();
      node.object = this.parseParenExpression();
      node.body = this.parseStatement();
      return this.finishNode(node, "WithStatement");

    case _getLineInfo$tt.tokTypes.braceL:
      return this.parseBlock();

    case _getLineInfo$tt.tokTypes.semi:
      this.next();
      return this.finishNode(node, "EmptyStatement");

    case _getLineInfo$tt.tokTypes._class:
      return this.parseClass(true);

    case _getLineInfo$tt.tokTypes._import:
      return this.parseImport();

    case _getLineInfo$tt.tokTypes._export:
      return this.parseExport();

    default:
      var expr = this.parseExpression();
      if (_isDummy.isDummy(expr)) {
        this.next();
        if (this.tok.type === _getLineInfo$tt.tokTypes.eof) return this.finishNode(node, "EmptyStatement");
        return this.parseStatement();
      } else if (starttype === _getLineInfo$tt.tokTypes.name && expr.type === "Identifier" && this.eat(_getLineInfo$tt.tokTypes.colon)) {
        node.body = this.parseStatement();
        node.label = expr;
        return this.finishNode(node, "LabeledStatement");
      } else {
        node.expression = expr;
        this.semicolon();
        return this.finishNode(node, "ExpressionStatement");
      }
  }
};

lp.parseBlock = function () {
  var node = this.startNode();
  this.pushCx();
  this.expect(_getLineInfo$tt.tokTypes.braceL);
  var blockIndent = this.curIndent,
      line = this.curLineStart;
  node.body = [];
  while (!this.closes(_getLineInfo$tt.tokTypes.braceR, blockIndent, line, true)) node.body.push(this.parseStatement());
  this.popCx();
  this.eat(_getLineInfo$tt.tokTypes.braceR);
  return this.finishNode(node, "BlockStatement");
};

lp.parseFor = function (node, init) {
  node.init = init;
  node.test = node.update = null;
  if (this.eat(_getLineInfo$tt.tokTypes.semi) && this.tok.type !== _getLineInfo$tt.tokTypes.semi) node.test = this.parseExpression();
  if (this.eat(_getLineInfo$tt.tokTypes.semi) && this.tok.type !== _getLineInfo$tt.tokTypes.parenR) node.update = this.parseExpression();
  this.popCx();
  this.expect(_getLineInfo$tt.tokTypes.parenR);
  node.body = this.parseStatement();
  return this.finishNode(node, "ForStatement");
};

lp.parseForIn = function (node, init) {
  var type = this.tok.type === _getLineInfo$tt.tokTypes._in ? "ForInStatement" : "ForOfStatement";
  this.next();
  node.left = init;
  node.right = this.parseExpression();
  this.popCx();
  this.expect(_getLineInfo$tt.tokTypes.parenR);
  node.body = this.parseStatement();
  return this.finishNode(node, type);
};

lp.parseVar = function (noIn) {
  var node = this.startNode();
  node.kind = this.tok.type.keyword;
  this.next();
  node.declarations = [];
  do {
    var decl = this.startNode();
    decl.id = this.options.ecmaVersion >= 6 ? this.toAssignable(this.parseExprAtom(), true) : this.parseIdent();
    decl.init = this.eat(_getLineInfo$tt.tokTypes.eq) ? this.parseMaybeAssign(noIn) : null;
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
  } while (this.eat(_getLineInfo$tt.tokTypes.comma));
  if (!node.declarations.length) {
    var decl = this.startNode();
    decl.id = this.dummyIdent();
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
  }
  if (!noIn) this.semicolon();
  return this.finishNode(node, "VariableDeclaration");
};

lp.parseClass = function (isStatement) {
  var node = this.startNode();
  this.next();
  if (this.tok.type === _getLineInfo$tt.tokTypes.name) node.id = this.parseIdent();else if (isStatement) node.id = this.dummyIdent();else node.id = null;
  node.superClass = this.eat(_getLineInfo$tt.tokTypes._extends) ? this.parseExpression() : null;
  node.body = this.startNode();
  node.body.body = [];
  this.pushCx();
  var indent = this.curIndent + 1,
      line = this.curLineStart;
  this.eat(_getLineInfo$tt.tokTypes.braceL);
  if (this.curIndent + 1 < indent) {
    indent = this.curIndent;line = this.curLineStart;
  }
  while (!this.closes(_getLineInfo$tt.tokTypes.braceR, indent, line)) {
    if (this.semicolon()) continue;
    var method = this.startNode(),
        isGenerator = undefined,
        start = undefined;
    if (this.options.ecmaVersion >= 6) {
      method["static"] = false;
      isGenerator = this.eat(_getLineInfo$tt.tokTypes.star);
    }
    this.parsePropertyName(method);
    if (_isDummy.isDummy(method.key)) {
      if (_isDummy.isDummy(this.parseMaybeAssign())) this.next();this.eat(_getLineInfo$tt.tokTypes.comma);continue;
    }
    if (method.key.type === "Identifier" && !method.computed && method.key.name === "static" && (this.tok.type != _getLineInfo$tt.tokTypes.parenL && this.tok.type != _getLineInfo$tt.tokTypes.braceL)) {
      method["static"] = true;
      isGenerator = this.eat(_getLineInfo$tt.tokTypes.star);
      this.parsePropertyName(method);
    } else {
      method["static"] = false;
    }
    if (this.options.ecmaVersion >= 5 && method.key.type === "Identifier" && !method.computed && (method.key.name === "get" || method.key.name === "set") && this.tok.type !== _getLineInfo$tt.tokTypes.parenL && this.tok.type !== _getLineInfo$tt.tokTypes.braceL) {
      method.kind = method.key.name;
      this.parsePropertyName(method);
      method.value = this.parseMethod(false);
    } else {
      if (!method.computed && !method["static"] && !isGenerator && (method.key.type === "Identifier" && method.key.name === "constructor" || method.key.type === "Literal" && method.key.value === "constructor")) {
        method.kind = "constructor";
      } else {
        method.kind = "method";
      }
      method.value = this.parseMethod(isGenerator);
    }
    node.body.body.push(this.finishNode(method, "MethodDefinition"));
  }
  this.popCx();
  if (!this.eat(_getLineInfo$tt.tokTypes.braceR)) {
    // If there is no closing brace, make the node span to the start
    // of the next token (this is useful for Tern)
    this.last.end = this.tok.start;
    if (this.options.locations) this.last.loc.end = this.tok.loc.start;
  }
  this.semicolon();
  this.finishNode(node.body, "ClassBody");
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
};

lp.parseFunction = function (node, isStatement) {
  this.initFunction(node);
  if (this.options.ecmaVersion >= 6) {
    node.generator = this.eat(_getLineInfo$tt.tokTypes.star);
  }
  if (this.tok.type === _getLineInfo$tt.tokTypes.name) node.id = this.parseIdent();else if (isStatement) node.id = this.dummyIdent();
  node.params = this.parseFunctionParams();
  node.body = this.parseBlock();
  return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
};

lp.parseExport = function () {
  var node = this.startNode();
  this.next();
  if (this.eat(_getLineInfo$tt.tokTypes.star)) {
    node.source = this.eatContextual("from") ? this.parseExprAtom() : null;
    return this.finishNode(node, "ExportAllDeclaration");
  }
  if (this.eat(_getLineInfo$tt.tokTypes._default)) {
    var expr = this.parseMaybeAssign();
    if (expr.id) {
      switch (expr.type) {
        case "FunctionExpression":
          expr.type = "FunctionDeclaration";break;
        case "ClassExpression":
          expr.type = "ClassDeclaration";break;
      }
    }
    node.declaration = expr;
    this.semicolon();
    return this.finishNode(node, "ExportDefaultDeclaration");
  }
  if (this.tok.type.keyword) {
    node.declaration = this.parseStatement();
    node.specifiers = [];
    node.source = null;
  } else {
    node.declaration = null;
    node.specifiers = this.parseExportSpecifierList();
    node.source = this.eatContextual("from") ? this.parseExprAtom() : null;
    this.semicolon();
  }
  return this.finishNode(node, "ExportNamedDeclaration");
};

lp.parseImport = function () {
  var node = this.startNode();
  this.next();
  if (this.tok.type === _getLineInfo$tt.tokTypes.string) {
    node.specifiers = [];
    node.source = this.parseExprAtom();
    node.kind = "";
  } else {
    var elt = undefined;
    if (this.tok.type === _getLineInfo$tt.tokTypes.name && this.tok.value !== "from") {
      elt = this.startNode();
      elt.local = this.parseIdent();
      this.finishNode(elt, "ImportDefaultSpecifier");
      this.eat(_getLineInfo$tt.tokTypes.comma);
    }
    node.specifiers = this.parseImportSpecifierList();
    node.source = this.eatContextual("from") ? this.parseExprAtom() : null;
    if (elt) node.specifiers.unshift(elt);
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration");
};

lp.parseImportSpecifierList = function () {
  var elts = [];
  if (this.tok.type === _getLineInfo$tt.tokTypes.star) {
    var elt = this.startNode();
    this.next();
    if (this.eatContextual("as")) elt.local = this.parseIdent();
    elts.push(this.finishNode(elt, "ImportNamespaceSpecifier"));
  } else {
    var indent = this.curIndent,
        line = this.curLineStart,
        continuedLine = this.nextLineStart;
    this.pushCx();
    this.eat(_getLineInfo$tt.tokTypes.braceL);
    if (this.curLineStart > continuedLine) continuedLine = this.curLineStart;
    while (!this.closes(_getLineInfo$tt.tokTypes.braceR, indent + (this.curLineStart <= continuedLine ? 1 : 0), line)) {
      var elt = this.startNode();
      if (this.eat(_getLineInfo$tt.tokTypes.star)) {
        if (this.eatContextual("as")) elt.local = this.parseIdent();
        this.finishNode(elt, "ImportNamespaceSpecifier");
      } else {
        if (this.isContextual("from")) break;
        elt.imported = this.parseIdent();
        elt.local = this.eatContextual("as") ? this.parseIdent() : elt.imported;
        this.finishNode(elt, "ImportSpecifier");
      }
      elts.push(elt);
      this.eat(_getLineInfo$tt.tokTypes.comma);
    }
    this.eat(_getLineInfo$tt.tokTypes.braceR);
    this.popCx();
  }
  return elts;
};

lp.parseExportSpecifierList = function () {
  var elts = [];
  var indent = this.curIndent,
      line = this.curLineStart,
      continuedLine = this.nextLineStart;
  this.pushCx();
  this.eat(_getLineInfo$tt.tokTypes.braceL);
  if (this.curLineStart > continuedLine) continuedLine = this.curLineStart;
  while (!this.closes(_getLineInfo$tt.tokTypes.braceR, indent + (this.curLineStart <= continuedLine ? 1 : 0), line)) {
    if (this.isContextual("from")) break;
    var elt = this.startNode();
    elt.local = this.parseIdent();
    elt.exported = this.eatContextual("as") ? this.parseIdent() : elt.local;
    this.finishNode(elt, "ExportSpecifier");
    elts.push(elt);
    this.eat(_getLineInfo$tt.tokTypes.comma);
  }
  this.eat(_getLineInfo$tt.tokTypes.braceR);
  this.popCx();
  return elts;
};

//# sourceMappingURL=statement-compiled.js.map
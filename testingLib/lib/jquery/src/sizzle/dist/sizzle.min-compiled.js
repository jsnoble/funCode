/*! Sizzle v2.2.0-pre | (c) 2008, 2014 jQuery Foundation, Inc. | jquery.org/license */
"use strict";

!(function (a) {
  var b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u = "sizzle" + 1 * new Date(),
      v = a.document,
      w = 0,
      x = 0,
      y = hb(),
      z = hb(),
      A = hb(),
      B = function B(a, b) {
    return (a === b && (l = !0), 0);
  },
      C = 1 << 31,
      D = ({}).hasOwnProperty,
      E = [],
      F = E.pop,
      G = E.push,
      H = E.push,
      I = E.slice,
      J = function J(a, b) {
    for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) {
      return c;
    }return -1;
  },
      K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      L = "[\\x20\\t\\r\\n\\f]",
      M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      N = M.replace("w", "w#"),
      O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
      P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
      Q = new RegExp(L + "+", "g"),
      R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
      S = new RegExp("^" + L + "*," + L + "*"),
      T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
      U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
      V = new RegExp(P),
      W = new RegExp("^" + N + "$"),
      X = { ID: new RegExp("^#(" + M + ")"), CLASS: new RegExp("^\\.(" + M + ")"), TAG: new RegExp("^(" + M.replace("w", "w*") + ")"), ATTR: new RegExp("^" + O), PSEUDO: new RegExp("^" + P), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"), bool: new RegExp("^(?:" + K + ")$", "i"), needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i") },
      Y = /^(?:input|select|textarea|button)$/i,
      Z = /^h\d$/i,
      $ = /^[^{]+\{\s*\[native \w/,
      _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      ab = /[+~]/,
      bb = /'|\\/g,
      cb = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
      db = function db(a, b, c) {
    var d = "0x" + b - 65536;return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
  },
      eb = function eb() {
    m();
  };try {
    H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType;
  } catch (fb) {
    H = { apply: E.length ? function (a, b) {
        G.apply(a, I.call(b));
      } : function (a, b) {
        var c = a.length,
            d = 0;while (a[c++] = b[d++]);a.length = c - 1;
      } };
  }function gb(a, b, d, e) {
    var f, h, j, k, l, o, r, s, w, x;if (((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k)) {
      return d;
    }if (!e && p) {
      if (11 !== k && (f = _.exec(a))) if (j = f[1]) {
        if (9 === k) {
          if ((h = b.getElementById(j), !h || !h.parentNode)) {
            return d;
          }if (h.id === j) {
            return (d.push(h), d);
          }
        } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) {
          return (d.push(h), d);
        }
      } else {
        if (f[2]) {
          return (H.apply(d, b.getElementsByTagName(a)), d);
        }if ((j = f[3]) && c.getElementsByClassName) {
          return (H.apply(d, b.getElementsByClassName(j)), d);
        }
      }if (c.qsa && (!q || !q.test(a))) {
        if ((s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase())) {
          o = g(a), (r = b.getAttribute("id")) ? s = r.replace(bb, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;while (l--) o[l] = s + rb(o[l]);w = ab.test(a) && pb(b.parentNode) || b, x = o.join(",");
        }if (x) try {
          return (H.apply(d, w.querySelectorAll(x)), d);
        } catch (y) {} finally {
          r || b.removeAttribute("id");
        }
      }
    }return i(a.replace(R, "$1"), b, d, e);
  }function hb() {
    var a = [];function b(c, e) {
      return (a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e);
    }return b;
  }function ib(a) {
    return (a[u] = !0, a);
  }function jb(a) {
    var b = n.createElement("div");try {
      return !!a(b);
    } catch (c) {
      return !1;
    } finally {
      b.parentNode && b.parentNode.removeChild(b), b = null;
    }
  }function kb(a, b) {
    var c = a.split("|"),
        e = a.length;while (e--) d.attrHandle[c[e]] = b;
  }function lb(a, b) {
    var c = b && a,
        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);if (d) {
      return d;
    }if (c) while (c = c.nextSibling) if (c === b) {
      return -1;
    }return a ? 1 : -1;
  }function mb(a) {
    return function (b) {
      var c = b.nodeName.toLowerCase();return "input" === c && b.type === a;
    };
  }function nb(a) {
    return function (b) {
      var c = b.nodeName.toLowerCase();return ("input" === c || "button" === c) && b.type === a;
    };
  }function ob(a) {
    return ib(function (b) {
      return (b = +b, ib(function (c, d) {
        var e,
            f = a([], c.length, b),
            g = f.length;while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]));
      }));
    });
  }function pb(a) {
    return a && "undefined" != typeof a.getElementsByTagName && a;
  }c = gb.support = {}, f = gb.isXML = function (a) {
    var b = a && (a.ownerDocument || a).documentElement;return b ? "HTML" !== b.nodeName : !1;
  }, m = gb.setDocument = function (a) {
    var b,
        e,
        g = a ? a.ownerDocument || a : v;return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", eb, !1) : e.attachEvent && e.attachEvent("onunload", eb)), p = !f(g), c.attributes = jb(function (a) {
      return (a.className = "i", !a.getAttribute("className"));
    }), c.getElementsByTagName = jb(function (a) {
      return (a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length);
    }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = jb(function (a) {
      return (o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length);
    }), c.getById ? (d.find.ID = function (a, b) {
      if ("undefined" != typeof b.getElementById && p) {
        var c = b.getElementById(a);return c && c.parentNode ? [c] : [];
      }
    }, d.filter.ID = function (a) {
      var b = a.replace(cb, db);return function (a) {
        return a.getAttribute("id") === b;
      };
    }) : (delete d.find.ID, d.filter.ID = function (a) {
      var b = a.replace(cb, db);return function (a) {
        var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");return c && c.value === b;
      };
    }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
      return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
    } : function (a, b) {
      var c,
          d = [],
          e = 0,
          f = b.getElementsByTagName(a);if ("*" === a) {
        while (c = f[e++]) 1 === c.nodeType && d.push(c);return d;
      }return f;
    }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
      return p ? b.getElementsByClassName(a) : void 0;
    }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (jb(function (a) {
      o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
    }), jb(function (a) {
      var b = g.createElement("input");b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
    })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && jb(function (a) {
      c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P);
    }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function (a, b) {
      var c = 9 === a.nodeType ? a.documentElement : a,
          d = b && b.parentNode;return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
    } : function (a, b) {
      if (b) while (b = b.parentNode) if (b === a) return !0;return !1;
    }, B = b ? function (a, b) {
      if (a === b) return (l = !0, 0);var d = !a.compareDocumentPosition - !b.compareDocumentPosition;return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1);
    } : function (a, b) {
      if (a === b) return (l = !0, 0);var c,
          d = 0,
          e = a.parentNode,
          f = b.parentNode,
          h = [a],
          i = [b];if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;if (e === f) return lb(a, b);c = a;while (c = c.parentNode) h.unshift(c);c = b;while (c = c.parentNode) i.unshift(c);while (h[d] === i[d]) d++;return d ? lb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0;
    }, g) : n;
  }, gb.matches = function (a, b) {
    return gb(a, null, null, b);
  }, gb.matchesSelector = function (a, b) {
    if (((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b)))) try {
      var d = s.call(a, b);if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
    } catch (e) {}return gb(b, n, null, [a]).length > 0;
  }, gb.contains = function (a, b) {
    return ((a.ownerDocument || a) !== n && m(a), t(a, b));
  }, gb.attr = function (a, b) {
    (a.ownerDocument || a) !== n && m(a);var e = d.attrHandle[b.toLowerCase()],
        f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
  }, gb.error = function (a) {
    throw new Error("Syntax error, unrecognized expression: " + a);
  }, gb.uniqueSort = function (a) {
    var b,
        d = [],
        e = 0,
        f = 0;if ((l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l)) {
      while (b = a[f++]) b === a[f] && (e = d.push(f));while (e--) a.splice(d[e], 1);
    }return (k = null, a);
  }, e = gb.getText = function (a) {
    var b,
        c = "",
        d = 0,
        f = a.nodeType;if (f) {
      if (1 === f || 9 === f || 11 === f) {
        if ("string" == typeof a.textContent) return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) c += e(a);
      } else if (3 === f || 4 === f) return a.nodeValue;
    } else while (b = a[d++]) c += e(b);return c;
  }, d = gb.selectors = { cacheLength: 50, createPseudo: ib, match: X, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(a) {
        return (a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || "").replace(cb, db), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4));
      }, CHILD: function CHILD(a) {
        return (a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || gb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && gb.error(a[0]), a);
      }, PSEUDO: function PSEUDO(a) {
        var b,
            c = !a[6] && a[2];return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
      } }, filter: { TAG: function TAG(a) {
        var b = a.replace(cb, db).toLowerCase();return "*" === a ? function () {
          return !0;
        } : function (a) {
          return a.nodeName && a.nodeName.toLowerCase() === b;
        };
      }, CLASS: function CLASS(a) {
        var b = y[a + " "];return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function (a) {
          return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
        });
      }, ATTR: function ATTR(a, b, c) {
        return function (d) {
          var e = gb.attr(d, a);return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0;
        };
      }, CHILD: function CHILD(a, b, c, d, e) {
        var f = "nth" !== a.slice(0, 3),
            g = "last" !== a.slice(-4),
            h = "of-type" === b;return 1 === d && 0 === e ? function (a) {
          return !!a.parentNode;
        } : function (b, c, i) {
          var j,
              k,
              l,
              m,
              n,
              o,
              p = f !== g ? "nextSibling" : "previousSibling",
              q = b.parentNode,
              r = h && b.nodeName.toLowerCase(),
              s = !i && !h;if (q) {
            if (f) {
              while (p) {
                l = b;while (l = l[p]) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;o = p = "only" === a && !o && "nextSibling";
              }return !0;
            }if ((o = [g ? q.firstChild : q.lastChild], g && s)) {
              k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if (1 === l.nodeType && ++m && l === b) {
                k[a] = [w, n, m];break;
              }
            } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break;return (m -= e, m === d || m % d === 0 && m / d >= 0);
          }
        };
      }, PSEUDO: function PSEUDO(a, b) {
        var c,
            e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || gb.error("unsupported pseudo: " + a);return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ib(function (a, c) {
          var d,
              f = e(a, b),
              g = f.length;while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g]);
        }) : function (a) {
          return e(a, 0, c);
        }) : e;
      } }, pseudos: { not: ib(function (a) {
        var b = [],
            c = [],
            d = h(a.replace(R, "$1"));return d[u] ? ib(function (a, b, c, e) {
          var f,
              g = d(a, null, e, []),
              h = a.length;while (h--) (f = g[h]) && (a[h] = !(b[h] = f));
        }) : function (a, e, f) {
          return (b[0] = a, d(b, null, f, c), b[0] = null, !c.pop());
        };
      }), has: ib(function (a) {
        return function (b) {
          return gb(a, b).length > 0;
        };
      }), contains: ib(function (a) {
        return (a = a.replace(cb, db), function (b) {
          return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
        });
      }), lang: ib(function (a) {
        return (W.test(a || "") || gb.error("unsupported lang: " + a), a = a.replace(cb, db).toLowerCase(), function (b) {
          var c;do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return (c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-")); while ((b = b.parentNode) && 1 === b.nodeType);return !1;
        });
      }), target: function target(b) {
        var c = a.location && a.location.hash;return c && c.slice(1) === b.id;
      }, root: function root(a) {
        return a === o;
      }, focus: function focus(a) {
        return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
      }, enabled: function enabled(a) {
        return a.disabled === !1;
      }, disabled: function disabled(a) {
        return a.disabled === !0;
      }, checked: function checked(a) {
        var b = a.nodeName.toLowerCase();return "input" === b && !!a.checked || "option" === b && !!a.selected;
      }, selected: function selected(a) {
        return (a.parentNode && a.parentNode.selectedIndex, a.selected === !0);
      }, empty: function empty(a) {
        for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) {
          return !1;
        }return !0;
      }, parent: function parent(a) {
        return !d.pseudos.empty(a);
      }, header: function header(a) {
        return Z.test(a.nodeName);
      }, input: function input(a) {
        return Y.test(a.nodeName);
      }, button: function button(a) {
        var b = a.nodeName.toLowerCase();return "input" === b && "button" === a.type || "button" === b;
      }, text: function text(a) {
        var b;return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
      }, first: ob(function () {
        return [0];
      }), last: ob(function (a, b) {
        return [b - 1];
      }), eq: ob(function (a, b, c) {
        return [0 > c ? c + b : c];
      }), even: ob(function (a, b) {
        for (var c = 0; b > c; c += 2) a.push(c);return a;
      }), odd: ob(function (a, b) {
        for (var c = 1; b > c; c += 2) a.push(c);return a;
      }), lt: ob(function (a, b, c) {
        for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);return a;
      }), gt: ob(function (a, b, c) {
        for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);return a;
      }) } }, d.pseudos.nth = d.pseudos.eq;for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) d.pseudos[b] = mb(b);for (b in { submit: !0, reset: !0 }) d.pseudos[b] = nb(b);function qb() {}qb.prototype = d.filters = d.pseudos, d.setFilters = new qb(), g = gb.tokenize = function (a, b) {
    var c,
        e,
        f,
        g,
        h,
        i,
        j,
        k = z[a + " "];if (k) return b ? 0 : k.slice(0);h = a, i = [], j = d.preFilter;while (h) {
      (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(R, " ") }), h = h.slice(c.length));for (g in d.filter) !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));if (!c) break;
    }return b ? h.length : h ? gb.error(a) : z(a, i).slice(0);
  };function rb(a) {
    for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;return d;
  }function sb(a, b, c) {
    var d = b.dir,
        e = c && "parentNode" === d,
        f = x++;return b.first ? function (b, c, f) {
      while (b = b[d]) if (1 === b.nodeType || e) return a(b, c, f);
    } : function (b, c, g) {
      var h,
          i,
          j = [w, f];if (g) {
        while (b = b[d]) if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
      } else while (b = b[d]) if (1 === b.nodeType || e) {
        if ((i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f)) return j[2] = h[2];if ((i[d] = j, j[2] = a(b, c, g))) return !0;
      }
    };
  }function tb(a) {
    return a.length > 1 ? function (b, c, d) {
      var e = a.length;while (e--) if (!a[e](b, c, d)) return !1;return !0;
    } : a[0];
  }function ub(a, b, c) {
    for (var d = 0, e = b.length; e > d; d++) gb(a, b[d], c);return c;
  }function vb(a, b, c, d, e) {
    for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));return g;
  }function wb(a, b, c, d, e, f) {
    return (d && !d[u] && (d = wb(d)), e && !e[u] && (e = wb(e, f)), ib(function (f, g, h, i) {
      var j,
          k,
          l,
          m = [],
          n = [],
          o = g.length,
          p = f || ub(b || "*", h.nodeType ? [h] : h, []),
          q = !a || !f && b ? p : vb(p, m, a, h, i),
          r = c ? e || (f ? a : o || d) ? [] : g : q;if ((c && c(q, r, h, i), d)) {
        j = vb(r, n), d(j, [], h, i), k = j.length;while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
      }if (f) {
        if (e || a) {
          if (e) {
            j = [], k = r.length;while (k--) (l = r[k]) && j.push(q[k] = l);e(null, r = [], j, i);
          }k = r.length;while (k--) (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
        }
      } else r = vb(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r);
    }));
  }function xb(a) {
    for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = sb(function (a) {
      return a === b;
    }, h, !0), l = sb(function (a) {
      return J(b, a) > -1;
    }, h, !0), m = [function (a, c, d) {
      var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));return (b = null, e);
    }]; f > i; i++) if (c = d.relative[a[i].type]) m = [sb(tb(m), c)];else {
      if ((c = d.filter[a[i].type].apply(null, a[i].matches), c[u])) {
        for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break;return wb(i > 1 && tb(m), i > 1 && rb(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(R, "$1"), c, e > i && xb(a.slice(i, e)), f > e && xb(a = a.slice(e)), f > e && rb(a));
      }m.push(c);
    }return tb(m);
  }function yb(a, b) {
    var c = b.length > 0,
        e = a.length > 0,
        f = (function (_f) {
      function f(_x, _x2, _x3, _x4, _x5) {
        return _f.apply(this, arguments);
      }

      f.toString = function () {
        return _f.toString();
      };

      return f;
    })(function (f, g, h, i, k) {
      var l,
          m,
          o,
          p = 0,
          q = "0",
          r = f && [],
          s = [],
          t = j,
          u = f || e && d.find.TAG("*", k),
          v = w += null == t ? 1 : Math.random() || 0.1,
          x = u.length;for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
        if (e && l) {
          m = 0;while (o = a[m++]) if (o(l, g, h)) {
            i.push(l);break;
          }k && (w = v);
        }c && ((l = !o && l) && p--, f && r.push(l));
      }if ((p += q, c && q !== p)) {
        m = 0;while (o = b[m++]) o(r, s, g, h);if (f) {
          if (p > 0) while (q--) r[q] || s[q] || (s[q] = F.call(i));s = vb(s);
        }H.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && gb.uniqueSort(i);
      }return (k && (w = v, j = t), r);
    });return c ? ib(f) : f;
  }h = gb.compile = function (a, b) {
    var c,
        d = [],
        e = [],
        f = A[a + " "];if (!f) {
      b || (b = g(a)), c = b.length;while (c--) f = xb(b[c]), f[u] ? d.push(f) : e.push(f);f = A(a, yb(e, d)), f.selector = a;
    }return f;
  }, i = gb.select = function (a, b, e, f) {
    var i,
        j,
        k,
        l,
        m,
        n = "function" == typeof a && a,
        o = !f && g(a = n.selector || a);if ((e = e || [], 1 === o.length)) {
      if ((j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type])) {
        if ((b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b)) return e;n && (b = b.parentNode), a = a.slice(j.shift().value.length);
      }i = X.needsContext.test(a) ? 0 : j.length;while (i--) {
        if ((k = j[i], d.relative[l = k.type])) break;if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && pb(b.parentNode) || b))) {
          if ((j.splice(i, 1), a = f.length && rb(j), !a)) return (H.apply(e, f), e);break;
        }
      }
    }return ((n || h(a, o))(f, b, !p, e, ab.test(a) && pb(b.parentNode) || b), e);
  }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = jb(function (a) {
    return 1 & a.compareDocumentPosition(n.createElement("div"));
  }), jb(function (a) {
    return (a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href"));
  }) || kb("type|href|height|width", function (a, b, c) {
    return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
  }), c.attributes && jb(function (a) {
    return (a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value"));
  }) || kb("value", function (a, b, c) {
    return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
  }), jb(function (a) {
    return null == a.getAttribute("disabled");
  }) || kb(K, function (a, b, c) {
    var d;return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
  }), "function" == typeof define && define.amd ? define(function () {
    return gb;
  }) : "undefined" != typeof module && module.exports ? module.exports = gb : a.Sizzle = gb;
})(window);
//# sourceMappingURL=sizzle.min.map

//# sourceMappingURL=sizzle.min-compiled.js.map
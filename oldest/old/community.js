/*
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */
(function(B, A) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = B.document ? A(B, true) : function(C) {
            if (!C.document) {
                throw new Error("jQuery requires a window with a document")
            }
            return A(C)
        }
    } else {
        A(B)
    }
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    var deletedIds = [];
    var slice = deletedIds.slice;
    var concat = deletedIds.concat;
    var push = deletedIds.push;
    var indexOf = deletedIds.indexOf;
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var support = {};
    var version = "1.11.1",
        jQuery = function(selector, context) {
            return new jQuery.fn.init(selector, context)
        }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,
        fcamelCase = function(all, letter) {
            return letter.toUpperCase()
        };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this)
        },
        get: function(num) {
            return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this)
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args)
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem)
            }))
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };
    jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++
        }
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {}
        }
        if (i === length) {
            target = this;
            i--
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue
                    }
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : []
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {}
                        }
                        target[name] = jQuery.extend(deep, clone, copy)
                    } else {
                        if (copy !== undefined) {
                            target[name] = copy
                        }
                    }
                }
            }
        }
        return target
    };
    jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function(msg) {
            throw new Error(msg)
        },
        noop: function() {},
        isFunction: function(obj) {
            return jQuery.type(obj) === "function"
        },
        isArray: Array.isArray || function(obj) {
            return jQuery.type(obj) === "array"
        },
        isWindow: function(obj) {
            return obj != null && obj == obj.window
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) >= 0
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false
            }
            return true
        },
        isPlainObject: function(obj) {
            var key;
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false
            }
            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false
                }
            } catch (e) {
                return false
            }
            if (support.ownLast) {
                for (key in obj) {
                    return hasOwn.call(obj, key)
                }
            }
            for (key in obj) {}
            return key === undefined || hasOwn.call(obj, key)
        },
        type: function(obj) {
            if (obj == null) {
                return obj + ""
            }
            return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj
        },
        globalEval: function(data) {
            if (data && jQuery.trim(data)) {
                (window.execScript || function(data) {
                    window["eval"].call(window, data)
                })(data)
            }
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase)
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
        },
        each: function(obj, callback, args) {
            var value, i = 0,
                length = obj.length,
                isArray = isArraylike(obj);
            if (args) {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.apply(obj[i], args);
                        if (value === false) {
                            break
                        }
                    }
                }
            } else {
                if (isArray) {
                    for (; i < length; i++) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break
                        }
                    }
                } else {
                    for (i in obj) {
                        value = callback.call(obj[i], i, obj[i]);
                        if (value === false) {
                            break
                        }
                    }
                }
            }
            return obj
        },
        trim: function(text) {
            return text == null ? "" : (text + "").replace(rtrim, "")
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    jQuery.merge(ret, typeof arr === "string" ? [arr] : arr)
                } else {
                    push.call(ret, arr)
                }
            }
            return ret
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (indexOf) {
                    return indexOf.call(arr, elem, i)
                }
                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for (; i < len; i++) {
                    if (i in arr && arr[i] === elem) {
                        return i
                    }
                }
            }
            return -1
        },
        merge: function(first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;
            while (j < len) {
                first[i++] = second[j++]
            }
            if (len !== len) {
                while (second[j] !== undefined) {
                    first[i++] = second[j++]
                }
            }
            first.length = i;
            return first
        },
        grep: function(elems, callback, invert) {
            var callbackInverse, matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i])
                }
            }
            return matches
        },
        map: function(elems, callback, arg) {
            var value, i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];
            if (isArray) {
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value)
                    }
                }
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);
                    if (value != null) {
                        ret.push(value)
                    }
                }
            }
            return concat.apply([], ret)
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp
            }
            if (!jQuery.isFunction(fn)) {
                return undefined
            }
            args = slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)))
            };
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;
            return proxy
        },
        now: function() {
            return +(new Date())
        },
        support: support
    });
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase()
    });

    function isArraylike(obj) {
        var length = obj.length,
            type = jQuery.type(obj);
        if (type === "function" || jQuery.isWindow(obj)) {
            return false
        }
        if (obj.nodeType === 1 && length) {
            return true
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj
    }
    var Sizzle =
    /*
     * Sizzle CSS Selector Engine v1.10.19
     * http://sizzlejs.com/
     *
     * Copyright 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2014-04-18
     */
    (function(window) {
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + -(new Date()),
            preferredDoc = window.document,
            dirruns = 0,
            done = 0,
            classCache = createCache(),
            tokenCache = createCache(),
            compilerCache = createCache(),
            sortOrder = function(a, b) {
                if (a === b) {
                    hasDuplicate = true
                }
                return 0
            }, strundefined = typeof undefined,
            MAX_NEGATIVE = 1 << 31,
            hasOwn = ({}).hasOwnProperty,
            arr = [],
            pop = arr.pop,
            push_native = arr.push,
            push = arr.push,
            slice = arr.slice,
            indexOf = arr.indexOf || function(elem) {
                var i = 0,
                    len = this.length;
                for (; i < len; i++) {
                    if (this[i] === elem) {
                        return i
                    }
                }
                return -1
            }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            whitespace = "[\\x20\\t\\r\\n\\f]",
            characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            identifier = characterEncoding.replace("w", "w#"),
            attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
            pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)",
            rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),
            rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
            rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
            rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),
            rpseudo = new RegExp(pseudos),
            ridentifier = new RegExp("^" + identifier + "$"),
            matchExpr = {
                ID: new RegExp("^#(" + characterEncoding + ")"),
                CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
                TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + attributes),
                PSEUDO: new RegExp("^" + pseudos),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + booleans + ")$", "i"),
                needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
            }, rinputs = /^(?:input|select|textarea|button)$/i,
            rheader = /^h\d$/i,
            rnative = /^[^{]+\{\s*\[native \w/,
            rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            rsibling = /[+~]/,
            rescape = /'|\\/g,
            runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
            funescape = function(_, escaped, escapedWhitespace) {
                var high = "0x" + escaped - 65536;
                return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
            };
        try {
            push.apply((arr = slice.call(preferredDoc.childNodes)), preferredDoc.childNodes);
            arr[preferredDoc.childNodes.length].nodeType
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els))
                } : function(target, els) {
                    var j = target.length,
                        i = 0;
                    while ((target[j++] = els[i++])) {}
                    target.length = j - 1
                }
            }
        }

        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                setDocument(context)
            }
            context = context || document;
            results = results || [];
            if (!selector || typeof selector !== "string") {
                return results
            }
            if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
                return []
            }
            if (documentIsHTML && !seed) {
                if ((match = rquickExpr.exec(selector))) {
                    if ((m = match[1])) {
                        if (nodeType === 9) {
                            elem = context.getElementById(m);
                            if (elem && elem.parentNode) {
                                if (elem.id === m) {
                                    results.push(elem);
                                    return results
                                }
                            } else {
                                return results
                            }
                        } else {
                            if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                                results.push(elem);
                                return results
                            }
                        }
                    } else {
                        if (match[2]) {
                            push.apply(results, context.getElementsByTagName(selector));
                            return results
                        } else {
                            if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                                push.apply(results, context.getElementsByClassName(m));
                                return results
                            }
                        }
                    }
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    nid = old = expando;
                    newContext = context;
                    newSelector = nodeType === 9 && selector;
                    if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                        groups = tokenize(selector);
                        if ((old = context.getAttribute("id"))) {
                            nid = old.replace(rescape, "\\$&")
                        } else {
                            context.setAttribute("id", nid)
                        }
                        nid = "[id='" + nid + "'] ";
                        i = groups.length;
                        while (i--) {
                            groups[i] = nid + toSelector(groups[i])
                        }
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                        newSelector = groups.join(",")
                    }
                    if (newSelector) {
                        try {
                            push.apply(results, newContext.querySelectorAll(newSelector));
                            return results
                        } catch (qsaError) {} finally {
                            if (!old) {
                                context.removeAttribute("id")
                            }
                        }
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed)
        }

        function createCache() {
            var keys = [];

            function cache(key, value) {
                if (keys.push(key + " ") > Expr.cacheLength) {
                    delete cache[keys.shift()]
                }
                return (cache[key + " "] = value)
            }
            return cache
        }

        function markFunction(fn) {
            fn[expando] = true;
            return fn
        }

        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div)
            } catch (e) {
                return false
            } finally {
                if (div.parentNode) {
                    div.parentNode.removeChild(div)
                }
                div = null
            }
        }

        function addHandle(attrs, handler) {
            var arr = attrs.split("|"),
                i = attrs.length;
            while (i--) {
                Expr.attrHandle[arr[i]] = handler
            }
        }

        function siblingCheck(a, b) {
            var cur = b && a,
                diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) {
                return diff
            }
            if (cur) {
                while ((cur = cur.nextSibling)) {
                    if (cur === b) {
                        return -1
                    }
                }
            }
            return a ? 1 : -1
        }

        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === type
            }
        }

        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return (name === "input" || name === "button") && elem.type === type
            }
        }

        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                argument = +argument;
                return markFunction(function(seed, matches) {
                    var j, matchIndexes = fn([], seed.length, argument),
                        i = matchIndexes.length;
                    while (i--) {
                        if (seed[(j = matchIndexes[i])]) {
                            seed[j] = !(matches[j] = seed[j])
                        }
                    }
                })
            })
        }

        function testContext(context) {
            return context && typeof context.getElementsByTagName !== strundefined && context
        }
        support = Sizzle.support = {};
        isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false
        };
        setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, doc = node ? node.ownerDocument || node : preferredDoc,
                parent = doc.defaultView;
            if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                return document
            }
            document = doc;
            docElem = doc.documentElement;
            documentIsHTML = !isXML(doc);
            if (parent && parent !== parent.top) {
                if (parent.addEventListener) {
                    parent.addEventListener("unload", function() {
                        setDocument()
                    }, false)
                } else {
                    if (parent.attachEvent) {
                        parent.attachEvent("onunload", function() {
                            setDocument()
                        })
                    }
                }
            }
            support.attributes = assert(function(div) {
                div.className = "i";
                return !div.getAttribute("className")
            });
            support.getElementsByTagName = assert(function(div) {
                div.appendChild(doc.createComment(""));
                return !div.getElementsByTagName("*").length
            });
            support.getElementsByClassName = rnative.test(doc.getElementsByClassName) && assert(function(div) {
                div.innerHTML = "<div class='a'></div><div class='a i'></div>";
                div.firstChild.className = "i";
                return div.getElementsByClassName("i").length === 2
            });
            support.getById = assert(function(div) {
                docElem.appendChild(div).id = expando;
                return !doc.getElementsByName || !doc.getElementsByName(expando).length
            });
            if (support.getById) {
                Expr.find.ID = function(id, context) {
                    if (typeof context.getElementById !== strundefined && documentIsHTML) {
                        var m = context.getElementById(id);
                        return m && m.parentNode ? [m] : []
                    }
                };
                Expr.filter.ID = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        return elem.getAttribute("id") === attrId
                    }
                }
            } else {
                delete Expr.find.ID;
                Expr.filter.ID = function(id) {
                    var attrId = id.replace(runescape, funescape);
                    return function(elem) {
                        var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                        return node && node.value === attrId
                    }
                }
            }
            Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                if (typeof context.getElementsByTagName !== strundefined) {
                    return context.getElementsByTagName(tag)
                }
            } : function(tag, context) {
                var elem, tmp = [],
                    i = 0,
                    results = context.getElementsByTagName(tag);
                if (tag === "*") {
                    while ((elem = results[i++])) {
                        if (elem.nodeType === 1) {
                            tmp.push(elem)
                        }
                    }
                    return tmp
                }
                return results
            };
            Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
                    return context.getElementsByClassName(className)
                }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if ((support.qsa = rnative.test(doc.querySelectorAll))) {
                assert(function(div) {
                    div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";
                    if (div.querySelectorAll("[msallowclip^='']").length) {
                        rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")")
                    }
                    if (!div.querySelectorAll("[selected]").length) {
                        rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")")
                    }
                    if (!div.querySelectorAll(":checked").length) {
                        rbuggyQSA.push(":checked")
                    }
                });
                assert(function(div) {
                    var input = doc.createElement("input");
                    input.setAttribute("type", "hidden");
                    div.appendChild(input).setAttribute("name", "D");
                    if (div.querySelectorAll("[name=d]").length) {
                        rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=")
                    }
                    if (!div.querySelectorAll(":enabled").length) {
                        rbuggyQSA.push(":enabled", ":disabled")
                    }
                    div.querySelectorAll("*,:x");
                    rbuggyQSA.push(",.*:")
                })
            }
            if ((support.matchesSelector = rnative.test((matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)))) {
                assert(function(div) {
                    support.disconnectedMatch = matches.call(div, "div");
                    matches.call(div, "[s!='']:x");
                    rbuggyMatches.push("!=", pseudos)
                })
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a,
                    bup = b && b.parentNode;
                return a === bup || !! (bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16))
            } : function(a, b) {
                if (b) {
                    while ((b = b.parentNode)) {
                        if (b === a) {
                            return true
                        }
                    }
                }
                return false
            };
            sortOrder = hasCompare ? function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0
                }
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                if (compare) {
                    return compare
                }
                compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                if (compare & 1 || (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {
                    if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                        return -1
                    }
                    if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                        return 1
                    }
                    return sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0
                }
                return compare & 4 ? -1 : 1
            } : function(a, b) {
                if (a === b) {
                    hasDuplicate = true;
                    return 0
                }
                var cur, i = 0,
                    aup = a.parentNode,
                    bup = b.parentNode,
                    ap = [a],
                    bp = [b];
                if (!aup || !bup) {
                    return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) : 0
                } else {
                    if (aup === bup) {
                        return siblingCheck(a, b)
                    }
                }
                cur = a;
                while ((cur = cur.parentNode)) {
                    ap.unshift(cur)
                }
                cur = b;
                while ((cur = cur.parentNode)) {
                    bp.unshift(cur)
                }
                while (ap[i] === bp[i]) {
                    i++
                }
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0
            };
            return doc
        };
        Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements)
        };
        Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem)
            }
            expr = expr.replace(rattributeQuotes, "='$1']");
            if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
                try {
                    var ret = matches.call(elem, expr);
                    if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
                        return ret
                    }
                } catch (e) {}
            }
            return Sizzle(expr, document, null, [elem]).length > 0
        };
        Sizzle.contains = function(context, elem) {
            if ((context.ownerDocument || context) !== document) {
                setDocument(context)
            }
            return contains(context, elem)
        };
        Sizzle.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) !== document) {
                setDocument(elem)
            }
            var fn = Expr.attrHandle[name.toLowerCase()],
                val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
            return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
        };
        Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg)
        };
        Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [],
                j = 0,
                i = 0;
            hasDuplicate = !support.detectDuplicates;
            sortInput = !support.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
                while ((elem = results[i++])) {
                    if (elem === results[i]) {
                        j = duplicates.push(i)
                    }
                }
                while (j--) {
                    results.splice(duplicates[j], 1)
                }
            }
            sortInput = null;
            return results
        };
        getText = Sizzle.getText = function(elem) {
            var node, ret = "",
                i = 0,
                nodeType = elem.nodeType;
            if (!nodeType) {
                while ((node = elem[i++])) {
                    ret += getText(node)
                }
            } else {
                if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    if (typeof elem.textContent === "string") {
                        return elem.textContent
                    } else {
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem)
                        }
                    }
                } else {
                    if (nodeType === 3 || nodeType === 4) {
                        return elem.nodeValue
                    }
                }
            }
            return ret
        };
        Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: true
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: true
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    match[1] = match[1].replace(runescape, funescape);
                    match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                    if (match[2] === "~=") {
                        match[3] = " " + match[3] + " "
                    }
                    return match.slice(0, 4)
                },
                CHILD: function(match) {
                    match[1] = match[1].toLowerCase();
                    if (match[1].slice(0, 3) === "nth") {
                        if (!match[3]) {
                            Sizzle.error(match[0])
                        }
                        match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                        match[5] = +((match[7] + match[8]) || match[3] === "odd")
                    } else {
                        if (match[3]) {
                            Sizzle.error(match[0])
                        }
                    }
                    return match
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    if (matchExpr.CHILD.test(match[0])) {
                        return null
                    }
                    if (match[3]) {
                        match[2] = match[4] || match[5] || ""
                    } else {
                        if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess)
                        }
                    }
                    return match.slice(0, 3)
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return nodeNameSelector === "*" ? function() {
                        return true
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName
                    }
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "")
                    })
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        if (result == null) {
                            return operator === "!="
                        }
                        if (!operator) {
                            return true
                        }
                        result += "";
                        return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false
                    }
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = type.slice(0, 3) !== "nth",
                        forward = type.slice(-4) !== "last",
                        ofType = what === "of-type";
                    return first === 1 && last === 0 ? function(elem) {
                        return !!elem.parentNode
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling",
                            parent = elem.parentNode,
                            name = ofType && elem.nodeName.toLowerCase(),
                            useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                while (dir) {
                                    node = elem;
                                    while ((node = node[dir])) {
                                        if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                                            return false
                                        }
                                    }
                                    start = dir = type === "only" && !start && "nextSibling"
                                }
                                return true
                            }
                            start = [forward ? parent.firstChild : parent.lastChild];
                            if (forward && useCache) {
                                outerCache = parent[expando] || (parent[expando] = {});
                                cache = outerCache[type] || [];
                                nodeIndex = cache[0] === dirruns && cache[1];
                                diff = cache[0] === dirruns && cache[2];
                                node = nodeIndex && parent.childNodes[nodeIndex];
                                while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                    if (node.nodeType === 1 && ++diff && node === elem) {
                                        outerCache[type] = [dirruns, nodeIndex, diff];
                                        break
                                    }
                                }
                            } else {
                                if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                                    diff = cache[1]
                                } else {
                                    while ((node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop())) {
                                        if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                                            if (useCache) {
                                                (node[expando] || (node[expando] = {}))[type] = [dirruns, diff]
                                            }
                                            if (node === elem) {
                                                break
                                            }
                                        }
                                    }
                                }
                            }
                            diff -= last;
                            return diff === first || (diff % first === 0 && diff / first >= 0)
                        }
                    }
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    if (fn[expando]) {
                        return fn(argument)
                    }
                    if (fn.length > 1) {
                        args = [pseudo, pseudo, "", argument];
                        return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                            var idx, matched = fn(seed, argument),
                                i = matched.length;
                            while (i--) {
                                idx = indexOf.call(seed, matched[i]);
                                seed[idx] = !(matches[idx] = matched[i])
                            }
                        }) : function(elem) {
                            return fn(elem, 0, args)
                        }
                    }
                    return fn
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [],
                        results = [],
                        matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        var elem, unmatched = matcher(seed, null, xml, []),
                            i = seed.length;
                        while (i--) {
                            if ((elem = unmatched[i])) {
                                seed[i] = !(matches[i] = elem)
                            }
                        }
                    }) : function(elem, context, xml) {
                        input[0] = elem;
                        matcher(input, null, xml, results);
                        return !results.pop()
                    }
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0
                    }
                }),
                contains: markFunction(function(text) {
                    return function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1
                    }
                }),
                lang: markFunction(function(lang) {
                    if (!ridentifier.test(lang || "")) {
                        Sizzle.error("unsupported lang: " + lang)
                    }
                    lang = lang.replace(runescape, funescape).toLowerCase();
                    return function(elem) {
                        var elemLang;
                        do {
                            if ((elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {
                                elemLang = elemLang.toLowerCase();
                                return elemLang === lang || elemLang.indexOf(lang + "-") === 0
                            }
                        } while ((elem = elem.parentNode) && elem.nodeType === 1);
                        return false
                    }
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id
                },
                root: function(elem) {
                    return elem === docElem
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !! (elem.type || elem.href || ~elem.tabIndex)
                },
                enabled: function(elem) {
                    return elem.disabled === false
                },
                disabled: function(elem) {
                    return elem.disabled === true
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return (nodeName === "input" && !! elem.checked) || (nodeName === "option" && !! elem.selected)
                },
                selected: function(elem) {
                    if (elem.parentNode) {
                        elem.parentNode.selectedIndex
                    }
                    return elem.selected === true
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                        if (elem.nodeType < 6) {
                            return false
                        }
                    }
                    return true
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem)
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName)
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName)
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === "button" || name === "button"
                },
                text: function(elem) {
                    var attr;
                    return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text")
                },
                first: createPositionalPseudo(function() {
                    return [0]
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [length - 1]
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [argument < 0 ? argument + length : argument]
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 0;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    var i = 1;
                    for (; i < length; i += 2) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; --i >= 0;) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    var i = argument < 0 ? argument + length : argument;
                    for (; ++i < length;) {
                        matchIndexes.push(i)
                    }
                    return matchIndexes
                })
            }
        };
        Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: true,
            checkbox: true,
            file: true,
            password: true,
            image: true
        }) {
            Expr.pseudos[i] = createInputPseudo(i)
        }
        for (i in {
            submit: true,
            reset: true
        }) {
            Expr.pseudos[i] = createButtonPseudo(i)
        }

        function setFilters() {}
        setFilters.prototype = Expr.filters = Expr.pseudos;
        Expr.setFilters = new setFilters();
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
                return parseOnly ? 0 : cached.slice(0)
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
                if (!matched || (match = rcomma.exec(soFar))) {
                    if (match) {
                        soFar = soFar.slice(match[0].length) || soFar
                    }
                    groups.push((tokens = []))
                }
                matched = false;
                if ((match = rcombinators.exec(soFar))) {
                    matched = match.shift();
                    tokens.push({
                        value: matched,
                        type: match[0].replace(rtrim, " ")
                    });
                    soFar = soFar.slice(matched.length)
                }
                for (type in Expr.filter) {
                    if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            type: type,
                            matches: match
                        });
                        soFar = soFar.slice(matched.length)
                    }
                }
                if (!matched) {
                    break
                }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0)
        };

        function toSelector(tokens) {
            var i = 0,
                len = tokens.length,
                selector = "";
            for (; i < len; i++) {
                selector += tokens[i].value
            }
            return selector
        }

        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir,
                checkNonElements = base && dir === "parentNode",
                doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                while ((elem = elem[dir])) {
                    if (elem.nodeType === 1 || checkNonElements) {
                        return matcher(elem, context, xml)
                    }
                }
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [dirruns, doneName];
                if (xml) {
                    while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            if (matcher(elem, context, xml)) {
                                return true
                            }
                        }
                    }
                } else {
                    while ((elem = elem[dir])) {
                        if (elem.nodeType === 1 || checkNonElements) {
                            outerCache = elem[expando] || (elem[expando] = {});
                            if ((oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                                return (newCache[2] = oldCache[2])
                            } else {
                                outerCache[dir] = newCache;
                                if ((newCache[2] = matcher(elem, context, xml))) {
                                    return true
                                }
                            }
                        }
                    }
                }
            }
        }

        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                var i = matchers.length;
                while (i--) {
                    if (!matchers[i](elem, context, xml)) {
                        return false
                    }
                }
                return true
            } : matchers[0]
        }

        function multipleContexts(selector, contexts, results) {
            var i = 0,
                len = contexts.length;
            for (; i < len; i++) {
                Sizzle(selector, contexts[i], results)
            }
            return results
        }

        function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [],
                i = 0,
                len = unmatched.length,
                mapped = map != null;
            for (; i < len; i++) {
                if ((elem = unmatched[i])) {
                    if (!filter || filter(elem, context, xml)) {
                        newUnmatched.push(elem);
                        if (mapped) {
                            map.push(i)
                        }
                    }
                }
            }
            return newUnmatched
        }

        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
                postFilter = setMatcher(postFilter)
            }
            if (postFinder && !postFinder[expando]) {
                postFinder = setMatcher(postFinder, postSelector)
            }
            return markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [],
                    postMap = [],
                    preexisting = results.length,
                    elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
                    matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems,
                    matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher) {
                    matcher(matcherIn, matcherOut, context, xml)
                }
                if (postFilter) {
                    temp = condense(matcherOut, postMap);
                    postFilter(temp, [], context, xml);
                    i = temp.length;
                    while (i--) {
                        if ((elem = temp[i])) {
                            matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem)
                        }
                    }
                }
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            temp = [];
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i])) {
                                    temp.push((matcherIn[i] = elem))
                                }
                            }
                            postFinder(null, (matcherOut = []), temp, xml)
                        }
                        i = matcherOut.length;
                        while (i--) {
                            if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                                seed[temp] = !(results[temp] = elem)
                            }
                        }
                    }
                } else {
                    matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
                    if (postFinder) {
                        postFinder(null, results, matcherOut, xml)
                    } else {
                        push.apply(results, matcherOut)
                    }
                }
            })
        }

        function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length,
                leadingRelative = Expr.relative[tokens[0].type],
                implicitRelative = leadingRelative || Expr.relative[" "],
                i = leadingRelative ? 1 : 0,
                matchContext = addCombinator(function(elem) {
                    return elem === checkContext
                }, implicitRelative, true),
                matchAnyContext = addCombinator(function(elem) {
                    return indexOf.call(checkContext, elem) > -1
                }, implicitRelative, true),
                matchers = [
                    function(elem, context, xml) {
                        return (!leadingRelative && (xml || context !== outermostContext)) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml))
                    }
                ];
            for (; i < len; i++) {
                if ((matcher = Expr.relative[tokens[i].type])) {
                    matchers = [addCombinator(elementMatcher(matchers), matcher)]
                } else {
                    matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
                    if (matcher[expando]) {
                        j = ++i;
                        for (; j < len; j++) {
                            if (Expr.relative[tokens[j].type]) {
                                break
                            }
                        }
                        return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                            value: tokens[i - 2].type === " " ? "*" : ""
                        })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens((tokens = tokens.slice(j))), j < len && toSelector(tokens))
                    }
                    matchers.push(matcher)
                }
            }
            return elementMatcher(matchers)
        }

        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0,
                byElement = elementMatchers.length > 0,
                superMatcher = function(seed, context, xml, results, outermost) {
                    var elem, j, matcher, matchedCount = 0,
                        i = "0",
                        unmatched = seed && [],
                        setMatched = [],
                        contextBackup = outermostContext,
                        elems = seed || byElement && Expr.find.TAG("*", outermost),
                        dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                        len = elems.length;
                    if (outermost) {
                        outermostContext = context !== document && context
                    }
                    for (; i !== len && (elem = elems[i]) != null; i++) {
                        if (byElement && elem) {
                            j = 0;
                            while ((matcher = elementMatchers[j++])) {
                                if (matcher(elem, context, xml)) {
                                    results.push(elem);
                                    break
                                }
                            }
                            if (outermost) {
                                dirruns = dirrunsUnique
                            }
                        }
                        if (bySet) {
                            if ((elem = !matcher && elem)) {
                                matchedCount--
                            }
                            if (seed) {
                                unmatched.push(elem)
                            }
                        }
                    }
                    matchedCount += i;
                    if (bySet && i !== matchedCount) {
                        j = 0;
                        while ((matcher = setMatchers[j++])) {
                            matcher(unmatched, setMatched, context, xml)
                        }
                        if (seed) {
                            if (matchedCount > 0) {
                                while (i--) {
                                    if (!(unmatched[i] || setMatched[i])) {
                                        setMatched[i] = pop.call(results)
                                    }
                                }
                            }
                            setMatched = condense(setMatched)
                        }
                        push.apply(results, setMatched);
                        if (outermost && !seed && setMatched.length > 0 && (matchedCount + setMatchers.length) > 1) {
                            Sizzle.uniqueSort(results)
                        }
                    }
                    if (outermost) {
                        dirruns = dirrunsUnique;
                        outermostContext = contextBackup
                    }
                    return unmatched
                };
            return bySet ? markFunction(superMatcher) : superMatcher
        }
        compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [],
                elementMatchers = [],
                cached = compilerCache[selector + " "];
            if (!cached) {
                if (!match) {
                    match = tokenize(selector)
                }
                i = match.length;
                while (i--) {
                    cached = matcherFromTokens(match[i]);
                    if (cached[expando]) {
                        setMatchers.push(cached)
                    } else {
                        elementMatchers.push(cached)
                    }
                }
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
                cached.selector = selector
            }
            return cached
        };
        select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = typeof selector === "function" && selector,
                match = !seed && tokenize((selector = compiled.selector || selector));
            results = results || [];
            if (match.length === 1) {
                tokens = match[0] = match[0].slice(0);
                if (tokens.length > 2 && (token = tokens[0]).type === "ID" && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                    context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0];
                    if (!context) {
                        return results
                    } else {
                        if (compiled) {
                            context = context.parentNode
                        }
                    }
                    selector = selector.slice(tokens.shift().value.length)
                }
                i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
                while (i--) {
                    token = tokens[i];
                    if (Expr.relative[(type = token.type)]) {
                        break
                    }
                    if ((find = Expr.find[type])) {
                        if ((seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                            tokens.splice(i, 1);
                            selector = seed.length && toSelector(tokens);
                            if (!selector) {
                                push.apply(results, seed);
                                return results
                            }
                            break
                        }
                    }
                }
            }(compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context);
            return results
        };
        support.sortStable = expando.split("").sort(sortOrder).join("") === expando;
        support.detectDuplicates = !! hasDuplicate;
        setDocument();
        support.sortDetached = assert(function(div1) {
            return div1.compareDocumentPosition(document.createElement("div")) & 1
        });
        if (!assert(function(div) {
            div.innerHTML = "<a href='#'></a>";
            return div.firstChild.getAttribute("href") === "#"
        })) {
            addHandle("type|href|height|width", function(elem, name, isXML) {
                if (!isXML) {
                    return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2)
                }
            })
        }
        if (!support.attributes || !assert(function(div) {
            div.innerHTML = "<input/>";
            div.firstChild.setAttribute("value", "");
            return div.firstChild.getAttribute("value") === ""
        })) {
            addHandle("value", function(elem, name, isXML) {
                if (!isXML && elem.nodeName.toLowerCase() === "input") {
                    return elem.defaultValue
                }
            })
        }
        if (!assert(function(div) {
            return div.getAttribute("disabled") == null
        })) {
            addHandle(booleans, function(elem, name, isXML) {
                var val;
                if (!isXML) {
                    return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null
                }
            })
        }
        return Sizzle
    })(window);
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext;
    var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
    var risSimple = /^.[^:#\[\.,]*$/;

    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                return !!qualifier.call(elem, i, elem) !== not
            })
        }
        if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
                return (elem === qualifier) !== not
            })
        }
        if (typeof qualifier === "string") {
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not)
            }
            qualifier = jQuery.filter(qualifier, elements)
        }
        return jQuery.grep(elements, function(elem) {
            return (jQuery.inArray(elem, qualifier) >= 0) !== not
        })
    }
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
            expr = ":not(" + expr + ")"
        }
        return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return elem.nodeType === 1
        }))
    };
    jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [],
                self = this,
                len = self.length;
            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true
                        }
                    }
                }))
            }
            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret)
            }
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false))
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true))
        },
        is: function(selector) {
            return !!winnow(this, typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length
        }
    });
    var rootjQuery, document = window.document,
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        init = jQuery.fn.init = function(selector, context) {
            var match, elem;
            if (!selector) {
                return this
            }
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    match = [null, selector, null]
                } else {
                    match = rquickExpr.exec(selector)
                } if (match && (match[1] || !context)) {
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match])
                                } else {
                                    this.attr(match, context[match])
                                }
                            }
                        }
                        return this
                    } else {
                        elem = document.getElementById(match[2]);
                        if (elem && elem.parentNode) {
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector)
                            }
                            this.length = 1;
                            this[0] = elem
                        }
                        this.context = document;
                        this.selector = selector;
                        return this
                    }
                } else {
                    if (!context || context.jquery) {
                        return (context || rootjQuery).find(selector)
                    } else {
                        return this.constructor(context).find(selector)
                    }
                }
            } else {
                if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this
                } else {
                    if (jQuery.isFunction(selector)) {
                        return typeof rootjQuery.ready !== "undefined" ? rootjQuery.ready(selector) : selector(jQuery)
                    }
                }
            } if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context
            }
            return jQuery.makeArray(selector, this)
        };
    init.prototype = jQuery.fn;
    rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery.extend({
        dir: function(elem, dir, until) {
            var matched = [],
                cur = elem[dir];
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur)
                }
                cur = cur[dir]
            }
            return matched
        },
        sibling: function(n, elem) {
            var r = [];
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n)
                }
            }
            return r
        }
    });
    jQuery.fn.extend({
        has: function(target) {
            var i, targets = jQuery(target, this),
                len = targets.length;
            return this.filter(function() {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true
                    }
                }
            })
        },
        closest: function(selectors, context) {
            var cur, i = 0,
                l = this.length,
                matched = [],
                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ? jQuery(selectors, context || this.context) : 0;
            for (; i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                    if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                        matched.push(cur);
                        break
                    }
                }
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched)
        },
        index: function(elem) {
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1
            }
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem))
            }
            return jQuery.inArray(elem.jquery ? elem[0] : elem, this)
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))))
        },
        addBack: function(selector) {
            return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
        }
    });

    function sibling(cur, dir) {
        do {
            cur = cur[dir]
        } while (cur && cur.nodeType !== 1);
        return cur
    }
    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode")
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until)
        },
        next: function(elem) {
            return sibling(elem, "nextSibling")
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling")
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling")
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling")
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until)
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until)
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem)
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild)
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes)
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            if (name.slice(-5) !== "Until") {
                selector = until
            }
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret)
            }
            if (this.length > 1) {
                if (!guaranteedUnique[name]) {
                    ret = jQuery.unique(ret)
                }
                if (rparentsprev.test(name)) {
                    ret = ret.reverse()
                }
            }
            return this.pushStack(ret)
        }
    });
    var rnotwhite = (/\S+/g);
    var optionsCache = {};

    function createOptions(options) {
        var object = optionsCache[options] = {};
        jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = true
        });
        return object
    }
    jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? (optionsCache[options] || createOptions(options)) : jQuery.extend({}, options);
        var firing, memory, fired, firingLength, firingIndex, firingStart, list = [],
            stack = !options.once && [],
            fire = function(data) {
                memory = options.memory && data;
                fired = true;
                firingIndex = firingStart || 0;
                firingStart = 0;
                firingLength = list.length;
                firing = true;
                for (; list && firingIndex < firingLength; firingIndex++) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false;
                        break
                    }
                }
                firing = false;
                if (list) {
                    if (stack) {
                        if (stack.length) {
                            fire(stack.shift())
                        }
                    } else {
                        if (memory) {
                            list = []
                        } else {
                            self.disable()
                        }
                    }
                }
            }, self = {
                add: function() {
                    if (list) {
                        var start = list.length;
                        (function add(args) {
                            jQuery.each(args, function(_, arg) {
                                var type = jQuery.type(arg);
                                if (type === "function") {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg)
                                    }
                                } else {
                                    if (arg && arg.length && type !== "string") {
                                        add(arg)
                                    }
                                }
                            })
                        })(arguments);
                        if (firing) {
                            firingLength = list.length
                        } else {
                            if (memory) {
                                firingStart = start;
                                fire(memory)
                            }
                        }
                    }
                    return this
                },
                remove: function() {
                    if (list) {
                        jQuery.each(arguments, function(_, arg) {
                            var index;
                            while ((index = jQuery.inArray(arg, list, index)) > -1) {
                                list.splice(index, 1);
                                if (firing) {
                                    if (index <= firingLength) {
                                        firingLength--
                                    }
                                    if (index <= firingIndex) {
                                        firingIndex--
                                    }
                                }
                            }
                        })
                    }
                    return this
                },
                has: function(fn) {
                    return fn ? jQuery.inArray(fn, list) > -1 : !! (list && list.length)
                },
                empty: function() {
                    list = [];
                    firingLength = 0;
                    return this
                },
                disable: function() {
                    list = stack = memory = undefined;
                    return this
                },
                disabled: function() {
                    return !list
                },
                lock: function() {
                    stack = undefined;
                    if (!memory) {
                        self.disable()
                    }
                    return this
                },
                locked: function() {
                    return !stack
                },
                fireWith: function(context, args) {
                    if (list && (!fired || stack)) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        if (firing) {
                            stack.push(args)
                        } else {
                            fire(args)
                        }
                    }
                    return this
                },
                fire: function() {
                    self.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!fired
                }
            };
        return self
    };
    jQuery.extend({
        Deferred: function(func) {
            var tuples = [
                ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                ["notify", "progress", jQuery.Callbacks("memory")]
            ],
                state = "pending",
                promise = {
                    state: function() {
                        return state
                    },
                    always: function() {
                        deferred.done(arguments).fail(arguments);
                        return this
                    },
                    then: function() {
                        var fns = arguments;
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each(tuples, function(i, tuple) {
                                var fn = jQuery.isFunction(fns[i]) && fns[i];
                                deferred[tuple[1]](function() {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify)
                                    } else {
                                        newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments)
                                    }
                                })
                            });
                            fns = null
                        }).promise()
                    },
                    promise: function(obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise
                    }
                }, deferred = {};
            promise.pipe = promise.then;
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];
                promise[tuple[1]] = list.add;
                if (stateString) {
                    list.add(function() {
                        state = stateString
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock)
                }
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this
                };
                deferred[tuple[0] + "With"] = list.fireWith
            });
            promise.promise(deferred);
            if (func) {
                func.call(deferred, deferred)
            }
            return deferred
        },
        when: function(subordinate) {
            var i = 0,
                resolveValues = slice.call(arguments),
                length = resolveValues.length,
                remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
                updateFunc = function(i, contexts, values) {
                    return function(value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values)
                        } else {
                            if (!(--remaining)) {
                                deferred.resolveWith(contexts, values)
                            }
                        }
                    }
                }, progressValues, progressContexts, resolveContexts;
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues))
                    } else {
                        --remaining
                    }
                }
            }
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues)
            }
            return deferred.promise()
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        jQuery.ready.promise().done(fn);
        return this
    };
    jQuery.extend({
        isReady: false,
        readyWait: 1,
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++
            } else {
                jQuery.ready(true)
            }
        },
        ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return
            }
            if (!document.body) {
                return setTimeout(jQuery.ready)
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
                return
            }
            readyList.resolveWith(document, [jQuery]);
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler("ready");
                jQuery(document).off("ready")
            }
        }
    });

    function detach() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed, false);
            window.removeEventListener("load", completed, false)
        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed)
        }
    }

    function completed() {
        if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
            detach();
            jQuery.ready()
        }
    }
    jQuery.ready.promise = function(obj) {
        if (!readyList) {
            readyList = jQuery.Deferred();
            if (document.readyState === "complete") {
                setTimeout(jQuery.ready)
            } else {
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded", completed, false);
                    window.addEventListener("load", completed, false)
                } else {
                    document.attachEvent("onreadystatechange", completed);
                    window.attachEvent("onload", completed);
                    var top = false;
                    try {
                        top = window.frameElement == null && document.documentElement
                    } catch (e) {}
                    if (top && top.doScroll) {
                        (function doScrollCheck() {
                            if (!jQuery.isReady) {
                                try {
                                    top.doScroll("left")
                                } catch (e) {
                                    return setTimeout(doScrollCheck, 50)
                                }
                                detach();
                                jQuery.ready()
                            }
                        })()
                    }
                }
            }
        }
        return readyList.promise(obj)
    };
    var strundefined = typeof undefined;
    var i;
    for (i in jQuery(support)) {
        break
    }
    support.ownLast = i !== "0";
    support.inlineBlockNeedsLayout = false;
    jQuery(function() {
        var val, div, body, container;
        body = document.getElementsByTagName("body")[0];
        if (!body || !body.style) {
            return
        }
        div = document.createElement("div");
        container = document.createElement("div");
        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        body.appendChild(container).appendChild(div);
        if (typeof div.style.zoom !== strundefined) {
            div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";
            support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
            if (val) {
                body.style.zoom = 1
            }
        }
        body.removeChild(container)
    });
    (function() {
        var div = document.createElement("div");
        if (support.deleteExpando == null) {
            support.deleteExpando = true;
            try {
                delete div.test
            } catch (e) {
                support.deleteExpando = false
            }
        }
        div = null
    })();
    jQuery.acceptData = function(elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
            nodeType = +elem.nodeType || 1;
        return nodeType !== 1 && nodeType !== 9 ? false : !noData || noData !== true && elem.getAttribute("classid") === noData
    };
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;

    function dataAttr(elem, key, data) {
        if (data === undefined && elem.nodeType === 1) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            data = elem.getAttribute(name);
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data
                } catch (e) {}
                jQuery.data(elem, key, data)
            } else {
                data = undefined
            }
        }
        return data
    }

    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue
            }
            if (name !== "toJSON") {
                return false
            }
        }
        return true
    }

    function internalData(elem, name, data, pvt) {
        if (!jQuery.acceptData(elem)) {
            return
        }
        var ret, thisCache, internalKey = jQuery.expando,
            isNode = elem.nodeType,
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
        if ((!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string") {
            return
        }
        if (!id) {
            if (isNode) {
                id = elem[internalKey] = deletedIds.pop() || jQuery.guid++
            } else {
                id = internalKey
            }
        }
        if (!cache[id]) {
            cache[id] = isNode ? {} : {
                toJSON: jQuery.noop
            }
        }
        if (typeof name === "object" || typeof name === "function") {
            if (pvt) {
                cache[id] = jQuery.extend(cache[id], name)
            } else {
                cache[id].data = jQuery.extend(cache[id].data, name)
            }
        }
        thisCache = cache[id];
        if (!pvt) {
            if (!thisCache.data) {
                thisCache.data = {}
            }
            thisCache = thisCache.data
        }
        if (data !== undefined) {
            thisCache[jQuery.camelCase(name)] = data
        }
        if (typeof name === "string") {
            ret = thisCache[name];
            if (ret == null) {
                ret = thisCache[jQuery.camelCase(name)]
            }
        } else {
            ret = thisCache
        }
        return ret
    }

    function internalRemoveData(elem, name, pvt) {
        if (!jQuery.acceptData(elem)) {
            return
        }
        var thisCache, i, isNode = elem.nodeType,
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[jQuery.expando] : jQuery.expando;
        if (!cache[id]) {
            return
        }
        if (name) {
            thisCache = pvt ? cache[id] : cache[id].data;
            if (thisCache) {
                if (!jQuery.isArray(name)) {
                    if (name in thisCache) {
                        name = [name]
                    } else {
                        name = jQuery.camelCase(name);
                        if (name in thisCache) {
                            name = [name]
                        } else {
                            name = name.split(" ")
                        }
                    }
                } else {
                    name = name.concat(jQuery.map(name, jQuery.camelCase))
                }
                i = name.length;
                while (i--) {
                    delete thisCache[name[i]]
                }
                if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                    return
                }
            }
        }
        if (!pvt) {
            delete cache[id].data;
            if (!isEmptyDataObject(cache[id])) {
                return
            }
        }
        if (isNode) {
            jQuery.cleanData([elem], true)
        } else {
            if (support.deleteExpando || cache != cache.window) {
                delete cache[id]
            } else {
                cache[id] = null
            }
        }
    }
    jQuery.extend({
        cache: {},
        noData: {
            "applet ": true,
            "embed ": true,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem)
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data)
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name)
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, true)
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, true)
        }
    });
    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0],
                attrs = elem && elem.attributes;
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);
                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        i = attrs.length;
                        while (i--) {
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name])
                                }
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true)
                    }
                }
                return data
            }
            if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key)
                })
            }
            return arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value)
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key)
            })
        }
    });
    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data))
                    } else {
                        queue.push(data)
                    }
                }
                return queue || []
            }
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function() {
                    jQuery.dequeue(elem, type)
                };
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--
            }
            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress")
                }
                delete hooks.stop;
                fn.call(elem, next, hooks)
            }
            if (!startLength && hooks) {
                hooks.empty.fire()
            }
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue");
                    jQuery._removeData(elem, key)
                })
            })
        }
    });
    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--
            }
            if (arguments.length < setter) {
                return jQuery.queue(this[0], type)
            }
            return data === undefined ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type);
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type)
                }
            })
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type)
            })
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", [])
        },
        promise: function(type, obj) {
            var tmp, count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements])
                    }
                };
            if (typeof type !== "string") {
                obj = type;
                type = undefined
            }
            type = type || "fx";
            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve)
                }
            }
            resolve();
            return defer.promise(obj)
        }
    });
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
    var cssExpand = ["Top", "Right", "Bottom", "Left"];
    var isHidden = function(elem, el) {
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem)
    };
    var access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            length = elems.length,
            bulk = key == null;
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                jQuery.access(elems, fn, i, key[i], true, emptyGet, raw)
            }
        } else {
            if (value !== undefined) {
                chainable = true;
                if (!jQuery.isFunction(value)) {
                    raw = true
                }
                if (bulk) {
                    if (raw) {
                        fn.call(elems, value);
                        fn = null
                    } else {
                        bulk = fn;
                        fn = function(elem, key, value) {
                            return bulk.call(jQuery(elem), value)
                        }
                    }
                }
                if (fn) {
                    for (; i < length; i++) {
                        fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)))
                    }
                }
            }
        }
        return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet
    };
    var rcheckableType = (/^(?:checkbox|radio)$/i);
    (function() {
        var input = document.createElement("input"),
            div = document.createElement("div"),
            fragment = document.createDocumentFragment();
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        support.leadingWhitespace = div.firstChild.nodeType === 3;
        support.tbody = !div.getElementsByTagName("tbody").length;
        support.htmlSerialize = !! div.getElementsByTagName("link").length;
        support.html5Clone = document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";
        input.type = "checkbox";
        input.checked = true;
        fragment.appendChild(input);
        support.appendChecked = input.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !! div.cloneNode(true).lastChild.defaultValue;
        fragment.appendChild(div);
        div.innerHTML = "<input type='radio' checked='checked' name='t'/>";
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        support.noCloneEvent = true;
        if (div.attachEvent) {
            div.attachEvent("onclick", function() {
                support.noCloneEvent = false
            });
            div.cloneNode(true).click()
        }
        if (support.deleteExpando == null) {
            support.deleteExpando = true;
            try {
                delete div.test
            } catch (e) {
                support.deleteExpando = false
            }
        }
    })();
    (function() {
        var i, eventName, div = document.createElement("div");
        for (i in {
            submit: true,
            change: true,
            focusin: true
        }) {
            eventName = "on" + i;
            if (!(support[i + "Bubbles"] = eventName in window)) {
                div.setAttribute(eventName, "t");
                support[i + "Bubbles"] = div.attributes[eventName].expando === false
            }
        }
        div = null
    })();
    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

    function returnTrue() {
        return true
    }

    function returnFalse() {
        return false
    }

    function safeActiveElement() {
        try {
            return document.activeElement
        } catch (err) {}
    }
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (!elemData) {
                return
            }
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector
            }
            if (!handler.guid) {
                handler.guid = jQuery.guid++
            }
            if (!(events = elemData.events)) {
                events = elemData.events = {}
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                    return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined
                };
                eventHandle.elem = elem
            }
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    continue
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                special = jQuery.event.special[type] || {};
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false)
                        } else {
                            if (elem.attachEvent) {
                                elem.attachEvent("on" + type, eventHandle)
                            }
                        }
                    }
                }
                if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid
                    }
                }
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj)
                } else {
                    handlers.push(handleObj)
                }
                jQuery.event.global[type] = true
            }
            elem = null
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (!elemData || !(events = elemData.events)) {
                return
            }
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true)
                    }
                    continue
                }
                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];
                    if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);
                        if (handleObj.selector) {
                            handlers.delegateCount--
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj)
                        }
                    }
                }
                if (origCount && !handlers.length) {
                    if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle)
                    }
                    delete events[type]
                }
            }
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;
                jQuery._removeData(elem, "events")
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = tmp = elem = elem || document;
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return
            }
            if (type.indexOf(".") >= 0) {
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort()
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = undefined;
            if (!event.target) {
                event.target = elem
            }
            data = data == null ? [event] : jQuery.makeArray(data, [event]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return
            }
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur
                }
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window)
                }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
                event.type = i > 1 ? bubbleType : special.bindType || type;
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
                if (handle) {
                    handle.apply(cur, data)
                }
                handle = ontype && cur[ontype];
                if (handle && handle.apply && jQuery.acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault()
                    }
                }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
                if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {
                        tmp = elem[ontype];
                        if (tmp) {
                            elem[ontype] = null
                        }
                        jQuery.event.triggered = type;
                        try {
                            elem[type]()
                        } catch (e) {}
                        jQuery.event.triggered = undefined;
                        if (tmp) {
                            elem[ontype] = tmp
                        }
                    }
                }
            }
            return event.result
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [],
                args = slice.call(arguments),
                handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};
            args[0] = event;
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;
                j = 0;
                while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                    if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation()
                            }
                        }
                    }
                }
            }
            if (special.postDispatch) {
                special.postDispatch.call(this, event)
            }
            return event.result
        },
        handlers: function(event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || event.type !== "click")) {
                for (; cur != this; cur = cur.parentNode || this) {
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];
                            sel = handleObj.selector + " ";
                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length
                            }
                            if (matches[sel]) {
                                matches.push(handleObj)
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            })
                        }
                    }
                }
            }
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                })
            }
            return handlerQueue
        },
        fix: function(event) {
            if (event[jQuery.expando]) {
                return event
            }
            var i, prop, copy, type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];
            if (!fixHook) {
                this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
            event = new jQuery.Event(originalEvent);
            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop]
            }
            if (!event.target) {
                event.target = originalEvent.srcElement || document
            }
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode
            }
            event.metaKey = !! event.metaKey;
            return fixHook.filter ? fixHook.filter(event, originalEvent) : event
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode
                }
                return event
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button,
                    fromElement = original.fromElement;
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;
                    event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)
                }
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ? original.toElement : fromElement
                }
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)))
                }
                return event
            }
        },
        special: {
            load: {
                noBubble: true
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) {
                        try {
                            this.focus();
                            return false
                        } catch (e) {}
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false
                    }
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result
                    }
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble) {
                jQuery.event.trigger(e, null, elem)
            } else {
                jQuery.event.dispatch.call(elem, e)
            } if (e.isDefaultPrevented()) {
                event.preventDefault()
            }
        }
    };
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false)
        }
    } : function(elem, type, handle) {
        var name = "on" + type;
        if (elem.detachEvent) {
            if (typeof elem[name] === strundefined) {
                elem[name] = null
            }
            elem.detachEvent(name, handle)
        }
    };
    jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props)
        }
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && src.returnValue === false ? returnTrue : returnFalse
        } else {
            this.type = src
        } if (props) {
            jQuery.extend(this, props)
        }
        this.timeStamp = src && src.timeStamp || jQuery.now();
        this[jQuery.expando] = true
    };
    jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (!e) {
                return
            }
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                e.returnValue = false
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (!e) {
                return
            }
            if (e.stopPropagation) {
                e.stopPropagation()
            }
            e.cancelBubble = true
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation()
            }
            this.stopPropagation()
        }
    };
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix
                }
                return ret
            }
        }
    });
    if (!support.submitBubbles) {
        jQuery.event.special.submit = {
            setup: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false
                }
                jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
                    if (form && !jQuery._data(form, "submitBubbles")) {
                        jQuery.event.add(form, "submit._submit", function(event) {
                            event._submit_bubble = true
                        });
                        jQuery._data(form, "submitBubbles", true)
                    }
                })
            },
            postDispatch: function(event) {
                if (event._submit_bubble) {
                    delete event._submit_bubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event, true)
                    }
                }
            },
            teardown: function() {
                if (jQuery.nodeName(this, "form")) {
                    return false
                }
                jQuery.event.remove(this, "._submit")
            }
        }
    }
    if (!support.changeBubbles) {
        jQuery.event.special.change = {
            setup: function() {
                if (rformElems.test(this.nodeName)) {
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function(event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._just_changed = true
                            }
                        });
                        jQuery.event.add(this, "click._change", function(event) {
                            if (this._just_changed && !event.isTrigger) {
                                this._just_changed = false
                            }
                            jQuery.event.simulate("change", this, event, true)
                        })
                    }
                    return false
                }
                jQuery.event.add(this, "beforeactivate._change", function(e) {
                    var elem = e.target;
                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
                        jQuery.event.add(elem, "change._change", function(event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event, true)
                            }
                        });
                        jQuery._data(elem, "changeBubbles", true)
                    }
                })
            },
            handle: function(event) {
                var elem = event.target;
                if (this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox")) {
                    return event.handleObj.handler.apply(this, arguments)
                }
            },
            teardown: function() {
                jQuery.event.remove(this, "._change");
                return !rformElems.test(this.nodeName)
            }
        }
    }
    if (!support.focusinBubbles) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true)
            };
            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix);
                    if (!attaches) {
                        doc.addEventListener(orig, handler, true)
                    }
                    jQuery._data(doc, fix, (attaches || 0) + 1)
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix) - 1;
                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        jQuery._removeData(doc, fix)
                    } else {
                        jQuery._data(doc, fix, attaches)
                    }
                }
            }
        })
    }
    jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var type, origFn;
            if (typeof types === "object") {
                if (typeof selector !== "string") {
                    data = data || selector;
                    selector = undefined
                }
                for (type in types) {
                    this.on(type, selector, data, types[type], one)
                }
                return this
            }
            if (data == null && fn == null) {
                fn = selector;
                data = selector = undefined
            } else {
                if (fn == null) {
                    if (typeof selector === "string") {
                        fn = data;
                        data = undefined
                    } else {
                        fn = data;
                        data = selector;
                        selector = undefined
                    }
                }
            } if (fn === false) {
                fn = returnFalse
            } else {
                if (!fn) {
                    return this
                }
            } if (one === 1) {
                origFn = fn;
                fn = function(event) {
                    jQuery().off(event);
                    return origFn.apply(this, arguments)
                };
                fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)
            }
            return this.each(function() {
                jQuery.event.add(this, types, fn, data, selector)
            })
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1)
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
                return this
            }
            if (typeof types === "object") {
                for (type in types) {
                    this.off(type, selector, types[type])
                }
                return this
            }
            if (selector === false || typeof selector === "function") {
                fn = selector;
                selector = undefined
            }
            if (fn === false) {
                fn = returnFalse
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector)
            })
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this)
            })
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true)
            }
        }
    });

    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(list.pop())
            }
        }
        return safeFrag
    }
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rleadingWhitespace = /^\s+/,
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        rtagName = /<([\w:]+)/,
        rtbody = /<tbody/i,
        rhtml = /<|&#?\w+;/,
        rnoInnerhtml = /<(?:script|style|link)/i,
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptType = /^$|\/(?:java|ecma)script/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        wrapMap = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        }, safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;

    function getAll(context, tag) {
        var elems, elem, i = 0,
            found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") : undefined;
        if (!found) {
            for (found = [], elems = context.childNodes || context;
                (elem = elems[i]) != null; i++) {
                if (!tag || jQuery.nodeName(elem, tag)) {
                    found.push(elem)
                } else {
                    jQuery.merge(found, getAll(elem, tag))
                }
            }
        }
        return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found
    }

    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked
        }
    }

    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem
    }

    function disableScript(elem) {
        elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
        return elem
    }

    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1]
        } else {
            elem.removeAttribute("type")
        }
        return elem
    }

    function setGlobalEval(elems, refElements) {
        var elem, i = 0;
        for (;
            (elem = elems[i]) != null; i++) {
            jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"))
        }
    }

    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return
        }
        var type, i, l, oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;
        if (events) {
            delete curData.handle;
            curData.events = {};
            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i])
                }
            }
        }
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data)
        }
    }

    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (dest.nodeType !== 1) {
            return
        }
        nodeName = dest.nodeName.toLowerCase();
        if (!support.noCloneEvent && dest[jQuery.expando]) {
            data = jQuery._data(dest);
            for (e in data.events) {
                jQuery.removeEvent(dest, e, data.handle)
            }
            dest.removeAttribute(jQuery.expando)
        }
        if (nodeName === "script" && dest.text !== src.text) {
            disableScript(dest).text = src.text;
            restoreScript(dest)
        } else {
            if (nodeName === "object") {
                if (dest.parentNode) {
                    dest.outerHTML = src.outerHTML
                }
                if (support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                    dest.innerHTML = src.innerHTML
                }
            } else {
                if (nodeName === "input" && rcheckableType.test(src.type)) {
                    dest.defaultChecked = dest.checked = src.checked;
                    if (dest.value !== src.value) {
                        dest.value = src.value
                    }
                } else {
                    if (nodeName === "option") {
                        dest.defaultSelected = dest.selected = src.defaultSelected
                    } else {
                        if (nodeName === "input" || nodeName === "textarea") {
                            dest.defaultValue = src.defaultValue
                        }
                    }
                }
            }
        }
    }
    jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">")) {
                clone = elem.cloneNode(true)
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild)
            } if ((!support.noCloneEvent || !support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
                destElements = getAll(clone);
                srcElements = getAll(elem);
                for (i = 0;
                    (node = srcElements[i]) != null; ++i) {
                    if (destElements[i]) {
                        fixCloneNodeIssues(node, destElements[i])
                    }
                }
            }
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);
                    for (i = 0;
                        (node = srcElements[i]) != null; i++) {
                        cloneCopyEvent(node, destElements[i])
                    }
                } else {
                    cloneCopyEvent(elem, clone)
                }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"))
            }
            destElements = srcElements = node = null;
            return clone
        },
        buildFragment: function(elems, context, scripts, selection) {
            var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length,
                safe = createSafeFragment(context),
                nodes = [],
                i = 0;
            for (; i < l; i++) {
                elem = elems[i];
                if (elem || elem === 0) {
                    if (jQuery.type(elem) === "object") {
                        jQuery.merge(nodes, elem.nodeType ? [elem] : elem)
                    } else {
                        if (!rhtml.test(elem)) {
                            nodes.push(context.createTextNode(elem))
                        } else {
                            tmp = tmp || safe.appendChild(context.createElement("div"));
                            tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                            wrap = wrapMap[tag] || wrapMap._default;
                            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
                            j = wrap[0];
                            while (j--) {
                                tmp = tmp.lastChild
                            }
                            if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                                nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]))
                            }
                            if (!support.tbody) {
                                elem = tag === "table" && !rtbody.test(elem) ? tmp.firstChild : wrap[1] === "<table>" && !rtbody.test(elem) ? tmp : 0;
                                j = elem && elem.childNodes.length;
                                while (j--) {
                                    if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") && !tbody.childNodes.length) {
                                        elem.removeChild(tbody)
                                    }
                                }
                            }
                            jQuery.merge(nodes, tmp.childNodes);
                            tmp.textContent = "";
                            while (tmp.firstChild) {
                                tmp.removeChild(tmp.firstChild)
                            }
                            tmp = safe.lastChild
                        }
                    }
                }
            }
            if (tmp) {
                safe.removeChild(tmp)
            }
            if (!support.appendChecked) {
                jQuery.grep(getAll(nodes, "input"), fixDefaultChecked)
            }
            i = 0;
            while ((elem = nodes[i++])) {
                if (selection && jQuery.inArray(elem, selection) !== -1) {
                    continue
                }
                contains = jQuery.contains(elem.ownerDocument, elem);
                tmp = getAll(safe.appendChild(elem), "script");
                if (contains) {
                    setGlobalEval(tmp)
                }
                if (scripts) {
                    j = 0;
                    while ((elem = tmp[j++])) {
                        if (rscriptType.test(elem.type || "")) {
                            scripts.push(elem)
                        }
                    }
                }
            }
            tmp = null;
            return safe
        },
        cleanData: function(elems, acceptData) {
            var elem, type, id, data, i = 0,
                internalKey = jQuery.expando,
                cache = jQuery.cache,
                deleteExpando = support.deleteExpando,
                special = jQuery.event.special;
            for (;
                (elem = elems[i]) != null; i++) {
                if (acceptData || jQuery.acceptData(elem)) {
                    id = elem[internalKey];
                    data = id && cache[id];
                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type)
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle)
                                }
                            }
                        }
                        if (cache[id]) {
                            delete cache[id];
                            if (deleteExpando) {
                                delete elem[internalKey]
                            } else {
                                if (typeof elem.removeAttribute !== strundefined) {
                                    elem.removeAttribute(internalKey)
                                } else {
                                    elem[internalKey] = null
                                }
                            }
                            deletedIds.push(id)
                        }
                    }
                }
            }
        }
    });
    jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value))
            }, null, value, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this)
                }
            })
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling)
                }
            })
        },
        remove: function(selector, keepData) {
            var elem, elems = selector ? jQuery.filter(selector, this) : this,
                i = 0;
            for (;
                (elem = elems[i]) != null; i++) {
                if (!keepData && elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem))
                }
                if (elem.parentNode) {
                    if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
                        setGlobalEval(getAll(elem, "script"))
                    }
                    elem.parentNode.removeChild(elem)
                }
            }
            return this
        },
        empty: function() {
            var elem, i = 0;
            for (;
                (elem = this[i]) != null; i++) {
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false))
                }
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild)
                }
                if (elem.options && jQuery.nodeName(elem, "select")) {
                    elem.options.length = 0
                }
            }
            return this
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents)
            })
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0,
                    l = this.length;
                if (value === undefined) {
                    return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, "") : undefined
                }
                if (typeof value === "string" && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (; i < l; i++) {
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value
                            }
                        }
                        elem = 0
                    } catch (e) {}
                }
                if (elem) {
                    this.empty().append(value)
                }
            }, null, value, arguments.length)
        },
        replaceWith: function() {
            var arg = arguments[0];
            this.domManip(arguments, function(elem) {
                arg = this.parentNode;
                jQuery.cleanData(getAll(this));
                if (arg) {
                    arg.replaceChild(elem, this)
                }
            });
            return arg && (arg.length || arg.nodeType) ? this : this.remove()
        },
        detach: function(selector) {
            return this.remove(selector, true)
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0,
                l = this.length,
                set = this,
                iNoClone = l - 1,
                value = args[0],
                isFunction = jQuery.isFunction(value);
            if (isFunction || (l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value))) {
                return this.each(function(index) {
                    var self = set.eq(index);
                    if (isFunction) {
                        args[0] = value.call(this, index, self.html())
                    }
                    self.domManip(args, callback)
                })
            }
            if (l) {
                fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, this);
                first = fragment.firstChild;
                if (fragment.childNodes.length === 1) {
                    fragment = first
                }
                if (first) {
                    scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                    hasScripts = scripts.length;
                    for (; i < l; i++) {
                        node = fragment;
                        if (i !== iNoClone) {
                            node = jQuery.clone(node, true, true);
                            if (hasScripts) {
                                jQuery.merge(scripts, getAll(node, "script"))
                            }
                        }
                        callback.call(this[i], node, i)
                    }
                    if (hasScripts) {
                        doc = scripts[scripts.length - 1].ownerDocument;
                        jQuery.map(scripts, restoreScript);
                        for (i = 0; i < hasScripts; i++) {
                            node = scripts[i];
                            if (rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node)) {
                                if (node.src) {
                                    if (jQuery._evalUrl) {
                                        jQuery._evalUrl(node.src)
                                    }
                                } else {
                                    jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, ""))
                                }
                            }
                        }
                    }
                    fragment = first = null
                }
            }
            return this
        }
    });
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems, i = 0,
                ret = [],
                insert = jQuery(selector),
                last = insert.length - 1;
            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);
                push.apply(ret, elems.get())
            }
            return this.pushStack(ret)
        }
    });
    var iframe, elemdisplay = {};

    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body),
            display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        elem.detach();
        return display
    }

    function defaultDisplay(nodeName) {
        var doc = document,
            display = elemdisplay[nodeName];
        if (!display) {
            display = actualDisplay(nodeName, doc);
            if (display === "none" || !display) {
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement);
                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
                doc.write();
                doc.close();
                display = actualDisplay(nodeName, doc);
                iframe.detach()
            }
            elemdisplay[nodeName] = display
        }
        return display
    }(function() {
        var shrinkWrapBlocksVal;
        support.shrinkWrapBlocks = function() {
            if (shrinkWrapBlocksVal != null) {
                return shrinkWrapBlocksVal
            }
            shrinkWrapBlocksVal = false;
            var div, body, container;
            body = document.getElementsByTagName("body")[0];
            if (!body || !body.style) {
                return
            }
            div = document.createElement("div");
            container = document.createElement("div");
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild(container).appendChild(div);
            if (typeof div.style.zoom !== strundefined) {
                div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1";
                div.appendChild(document.createElement("div")).style.width = "5px";
                shrinkWrapBlocksVal = div.offsetWidth !== 3
            }
            body.removeChild(container);
            return shrinkWrapBlocksVal
        }
    })();
    var rmargin = (/^margin/);
    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
    var getStyles, curCSS, rposition = /^(top|right|bottom|left)$/;
    if (window.getComputedStyle) {
        getStyles = function(elem) {
            return elem.ownerDocument.defaultView.getComputedStyle(elem, null)
        };
        curCSS = function(elem, name, computed) {
            var width, minWidth, maxWidth, ret, style = elem.style;
            computed = computed || getStyles(elem);
            ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
            if (computed) {
                if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                    ret = jQuery.style(elem, name)
                }
                if (rnumnonpx.test(ret) && rmargin.test(name)) {
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth
                }
            }
            return ret === undefined ? ret : ret + ""
        }
    } else {
        if (document.documentElement.currentStyle) {
            getStyles = function(elem) {
                return elem.currentStyle
            };
            curCSS = function(elem, name, computed) {
                var left, rs, rsLeft, ret, style = elem.style;
                computed = computed || getStyles(elem);
                ret = computed ? computed[name] : undefined;
                if (ret == null && style && style[name]) {
                    ret = style[name]
                }
                if (rnumnonpx.test(ret) && !rposition.test(name)) {
                    left = style.left;
                    rs = elem.runtimeStyle;
                    rsLeft = rs && rs.left;
                    if (rsLeft) {
                        rs.left = elem.currentStyle.left
                    }
                    style.left = name === "fontSize" ? "1em" : ret;
                    ret = style.pixelLeft + "px";
                    style.left = left;
                    if (rsLeft) {
                        rs.left = rsLeft
                    }
                }
                return ret === undefined ? ret : ret + "" || "auto"
            }
        }
    }

    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                var condition = conditionFn();
                if (condition == null) {
                    return
                }
                if (condition) {
                    delete this.get;
                    return
                }
                return (this.get = hookFn).apply(this, arguments)
            }
        }
    }(function() {
        var div, style, a, pixelPositionVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal;
        div = document.createElement("div");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];
        style = a && a.style;
        if (!style) {
            return
        }
        style.cssText = "float:left;opacity:.5";
        support.opacity = style.opacity === "0.5";
        support.cssFloat = !! style.cssFloat;
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" || style.WebkitBoxSizing === "";
        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                if (reliableHiddenOffsetsVal == null) {
                    computeStyleTests()
                }
                return reliableHiddenOffsetsVal
            },
            boxSizingReliable: function() {
                if (boxSizingReliableVal == null) {
                    computeStyleTests()
                }
                return boxSizingReliableVal
            },
            pixelPosition: function() {
                if (pixelPositionVal == null) {
                    computeStyleTests()
                }
                return pixelPositionVal
            },
            reliableMarginRight: function() {
                if (reliableMarginRightVal == null) {
                    computeStyleTests()
                }
                return reliableMarginRightVal
            }
        });

        function computeStyleTests() {
            var div, body, container, contents;
            body = document.getElementsByTagName("body")[0];
            if (!body || !body.style) {
                return
            }
            div = document.createElement("div");
            container = document.createElement("div");
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild(container).appendChild(div);
            div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
            pixelPositionVal = boxSizingReliableVal = false;
            reliableMarginRightVal = true;
            if (window.getComputedStyle) {
                pixelPositionVal = (window.getComputedStyle(div, null) || {}).top !== "1%";
                boxSizingReliableVal = (window.getComputedStyle(div, null) || {
                    width: "4px"
                }).width === "4px";
                contents = div.appendChild(document.createElement("div"));
                contents.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                contents.style.marginRight = contents.style.width = "0";
                div.style.width = "1px";
                reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents, null) || {}).marginRight)
            }
            div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            contents = div.getElementsByTagName("td");
            contents[0].style.cssText = "margin:0;border:0;padding:0;display:none";
            reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
            if (reliableHiddenOffsetsVal) {
                contents[0].style.display = "";
                contents[1].style.display = "none";
                reliableHiddenOffsetsVal = contents[0].offsetHeight === 0
            }
            body.removeChild(container)
        }
    })();
    jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name]
        }
        ret = callback.apply(elem, args || []);
        for (name in options) {
            elem.style[name] = old[name]
        }
        return ret
    };
    var ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/,
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
        rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        }, cssPrefixes = ["Webkit", "O", "Moz", "ms"];

    function vendorPropName(style, name) {
        if (name in style) {
            return name
        }
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            origName = name,
            i = cssPrefixes.length;
        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in style) {
                return name
            }
        }
        return origName
    }

    function showHide(elements, show) {
        var display, elem, hidden, values = [],
            index = 0,
            length = elements.length;
        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue
            }
            values[index] = jQuery._data(elem, "olddisplay");
            display = elem.style.display;
            if (show) {
                if (!values[index] && display === "none") {
                    elem.style.display = ""
                }
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName))
                }
            } else {
                hidden = isHidden(elem);
                if (display && display !== "none" || !hidden) {
                    jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))
                }
            }
        }
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none"
            }
        }
        return elements
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ? 4 : name === "width" ? 1 : 0,
            val = 0;
        for (; i < 4; i += 2) {
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles)
            }
            if (isBorderBox) {
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles)
                }
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
                }
            } else {
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles)
                }
            }
        }
        return val
    }

    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles(elem),
            isBorderBox = support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box";
        if (val <= 0 || val == null) {
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name]
            }
            if (rnumnonpx.test(val)) {
                return val
            }
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
            val = parseFloat(val) || 0
        }
        return (val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles)) + "px"
    }
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret
                    }
                }
            }
        },
        cssNumber: {
            columnCount: true,
            fillOpacity: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        },
        cssProps: {
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return
            }
            var ret, type, hooks, origName = jQuery.camelCase(name),
                style = elem.style;
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (value !== undefined) {
                type = typeof value;
                if (type === "string" && (ret = rrelNum.exec(value))) {
                    value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                    type = "number"
                }
                if (value == null || value !== value) {
                    return
                }
                if (type === "number" && !jQuery.cssNumber[origName]) {
                    value += "px"
                }
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit"
                }
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
                    try {
                        style[name] = value
                    } catch (e) {}
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret
                }
                return style[name]
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra)
            }
            if (val === undefined) {
                val = curCSS(elem, name, styles)
            }
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name]
            }
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || jQuery.isNumeric(num) ? num || 0 : val
            }
            return val
        }
    });
    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {
                    return rdisplayswap.test(jQuery.css(elem, "display")) && elem.offsetWidth === 0 ? jQuery.swap(elem, cssShow, function() {
                        return getWidthOrHeight(elem, name, extra)
                    }) : getWidthOrHeight(elem, name, extra)
                }
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && jQuery.css(elem, "boxSizing", false, styles) === "border-box", styles) : 0)
            }
        }
    });
    if (!support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed) {
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (0.01 * parseFloat(RegExp.$1)) + "" : computed ? "1" : ""
            },
            set: function(elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";
                style.zoom = 1;
                if ((value >= 1 || value === "") && jQuery.trim(filter.replace(ralpha, "")) === "" && style.removeAttribute) {
                    style.removeAttribute("filter");
                    if (value === "" || currentStyle && !currentStyle.filter) {
                        return
                    }
                }
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity
            }
        }
    }
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        if (computed) {
            return jQuery.swap(elem, {
                display: "inline-block"
            }, curCSS, [elem, "marginRight"])
        }
    });
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0,
                    expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0]
                }
                return expanded
            }
        };
        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber
        }
    });
    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;
                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles)
                    }
                    return map
                }
                return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name)
            }, name, value, arguments.length > 1)
        },
        show: function() {
            return showHide(this, true)
        },
        hide: function() {
            return showHide(this)
        },
        toggle: function(state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide()
            }
            return this.each(function() {
                if (isHidden(this)) {
                    jQuery(this).show()
                } else {
                    jQuery(this).hide()
                }
            })
        }
    });

    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing)
    }
    jQuery.Tween = Tween;
    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px")
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this)
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration)
            } else {
                this.pos = eased = percent
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            }
            if (hooks && hooks.set) {
                hooks.set(this)
            } else {
                Tween.propHooks._default.set(this)
            }
            return this
        }
    };
    Tween.prototype.init.prototype = Tween.prototype;
    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
                    return tween.elem[tween.prop]
                }
                result = jQuery.css(tween.elem, tween.prop, "");
                return !result || result === "auto" ? 0 : result
            },
            set: function(tween) {
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween)
                } else {
                    if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
                        jQuery.style(tween.elem, tween.prop, tween.now + tween.unit)
                    } else {
                        tween.elem[tween.prop] = tween.now
                    }
                }
            }
        }
    };
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now
            }
        }
    };
    jQuery.easing = {
        linear: function(p) {
            return p
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2
        }
    };
    jQuery.fx = Tween.prototype.init;
    jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/,
        rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
        rrun = /queueHooks$/,
        animationPrefilters = [defaultPrefilter],
        tweeners = {
            "*": [
                function(prop, value) {
                    var tween = this.createTween(prop, value),
                        target = tween.cur(),
                        parts = rfxnum.exec(value),
                        unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
                        start = (jQuery.cssNumber[prop] || unit !== "px" && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)),
                        scale = 1,
                        maxIterations = 20;
                    if (start && start[3] !== unit) {
                        unit = unit || start[3];
                        parts = parts || [];
                        start = +target || 1;
                        do {
                            scale = scale || ".5";
                            start = start / scale;
                            jQuery.style(tween.elem, prop, start + unit)
                        } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations)
                    }
                    if (parts) {
                        start = tween.start = +start || +target || 0;
                        tween.unit = unit;
                        tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]
                    }
                    return tween
                }
            ]
        };

    function createFxNow() {
        setTimeout(function() {
            fxNow = undefined
        });
        return (fxNow = jQuery.now())
    }

    function genFx(type, includeWidth) {
        var which, attrs = {
                height: type
            }, i = 0;
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type
        }
        if (includeWidth) {
            attrs.opacity = attrs.width = type
        }
        return attrs
    }

    function createTween(value, prop, animation) {
        var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]),
            index = 0,
            length = collection.length;
        for (; index < length; index++) {
            if ((tween = collection[index].call(animation, prop, value))) {
                return tween
            }
        }
    }

    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this,
            orig = {}, style = elem.style,
            hidden = elem.nodeType && isHidden(elem),
            dataShow = jQuery._data(elem, "fxshow");
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire()
                    }
                }
            }
            hooks.unqueued++;
            anim.always(function() {
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire()
                    }
                })
            })
        }
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            display = jQuery.css(elem, "display");
            checkDisplay = display === "none" ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;
            if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {
                if (!support.inlineBlockNeedsLayout || defaultDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block"
                } else {
                    style.zoom = 1
                }
            }
        }
        if (opts.overflow) {
            style.overflow = "hidden";
            if (!support.shrinkWrapBlocks()) {
                anim.always(function() {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2]
                })
            }
        }
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true
                    } else {
                        continue
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop)
            } else {
                display = undefined
            }
        }
        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) {
                    hidden = dataShow.hidden
                }
            } else {
                dataShow = jQuery._data(elem, "fxshow", {})
            } if (toggle) {
                dataShow.hidden = !hidden
            }
            if (hidden) {
                jQuery(elem).show()
            } else {
                anim.done(function() {
                    jQuery(elem).hide()
                })
            }
            anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop])
                }
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0
                    }
                }
            }
        } else {
            if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
                style.display = display
            }
        }
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0]
            }
            if (index !== name) {
                props[name] = value;
                delete props[index]
            }
            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing
                    }
                }
            } else {
                specialEasing[name] = easing
            }
        }
    }

    function Animation(elem, properties, options) {
        var result, stopped, index = 0,
            length = animationPrefilters.length,
            deferred = jQuery.Deferred().always(function() {
                delete tick.elem
            }),
            tick = function() {
                if (stopped) {
                    return false
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;
                for (; index < length; index++) {
                    animation.tweens[index].run(percent)
                }
                deferred.notifyWith(elem, [animation, percent, remaining]);
                if (percent < 1 && length) {
                    return remaining
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false
                }
            }, animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {}
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween
                },
                stop: function(gotoEnd) {
                    var index = 0,
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1)
                    }
                    if (gotoEnd) {
                        deferred.resolveWith(elem, [animation, gotoEnd])
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd])
                    }
                    return this
                }
            }),
            props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
            result = animationPrefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                return result
            }
        }
        jQuery.map(props, createTween, animation);
        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation)
        }
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        }));
        return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always)
    }
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"]
            } else {
                props = props.split(" ")
            }
            var prop, index = 0,
                length = props.length;
            for (; index < length; index++) {
                prop = props[index];
                tweeners[prop] = tweeners[prop] || [];
                tweeners[prop].unshift(callback)
            }
        },
        prefilter: function(callback, prepend) {
            if (prepend) {
                animationPrefilters.unshift(callback)
            } else {
                animationPrefilters.push(callback)
            }
        }
    });
    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx"
        }
        opt.old = opt.complete;
        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this)
            }
            if (opt.queue) {
                jQuery.dequeue(this, opt.queue)
            }
        };
        return opt
    };
    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback)
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function() {
                    var anim = Animation(this, jQuery.extend({}, prop), optall);
                    if (empty || jQuery._data(this, "finish")) {
                        anim.stop(true)
                    }
                };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation)
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd)
            };
            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", [])
            }
            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = jQuery._data(this);
                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index])
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index])
                        }
                    }
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1)
                    }
                }
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type)
                }
            })
        },
        finish: function(type) {
            if (type !== false) {
                type = type || "fx"
            }
            return this.each(function() {
                var index, data = jQuery._data(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;
                data.finish = true;
                jQuery.queue(this, type, []);
                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true)
                }
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1)
                    }
                }
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this)
                    }
                }
                delete data.finish
            })
        }
    });
    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback)
        }
    });
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback)
        }
    });
    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers,
            i = 0;
        fxNow = jQuery.now();
        for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1)
            }
        }
        if (!timers.length) {
            jQuery.fx.stop()
        }
        fxNow = undefined
    };
    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start()
        } else {
            jQuery.timers.pop()
        }
    };
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if (!timerId) {
            timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval)
        }
    };
    jQuery.fx.stop = function() {
        clearInterval(timerId);
        timerId = null
    };
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout)
            }
        })
    };
    (function() {
        var input, div, select, a, opt;
        div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];
        select = document.createElement("select");
        opt = select.appendChild(document.createElement("option"));
        input = div.getElementsByTagName("input")[0];
        a.style.cssText = "top:1px";
        support.getSetAttribute = div.className !== "t";
        support.style = /top/.test(a.getAttribute("style"));
        support.hrefNormalized = a.getAttribute("href") === "/a";
        support.checkOn = !! input.value;
        support.optSelected = opt.selected;
        support.enctype = !! document.createElement("form").enctype;
        select.disabled = true;
        support.optDisabled = !opt.disabled;
        input = document.createElement("input");
        input.setAttribute("value", "");
        support.input = input.getAttribute("value") === "";
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t"
    })();
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
                    if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
                        return ret
                    }
                    ret = elem.value;
                    return typeof ret === "string" ? ret.replace(rreturn, "") : ret == null ? "" : ret
                }
                return
            }
            isFunction = jQuery.isFunction(value);
            return this.each(function(i) {
                var val;
                if (this.nodeType !== 1) {
                    return
                }
                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val())
                } else {
                    val = value
                } if (val == null) {
                    val = ""
                } else {
                    if (typeof val === "number") {
                        val += ""
                    } else {
                        if (jQuery.isArray(val)) {
                            val = jQuery.map(val, function(value) {
                                return value == null ? "" : value + ""
                            })
                        }
                    }
                }
                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val
                }
            })
        }
    });
    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ? val : jQuery.trim(jQuery.text(elem))
                }
            },
            select: {
                get: function(elem) {
                    var value, option, options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ? max : one ? index : 0;
                    for (; i < max; i++) {
                        option = options[i];
                        if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            value = jQuery(option).val();
                            if (one) {
                                return value
                            }
                            values.push(value)
                        }
                    }
                    return values
                },
                set: function(elem, value) {
                    var optionSet, option, options = elem.options,
                        values = jQuery.makeArray(value),
                        i = options.length;
                    while (i--) {
                        option = options[i];
                        if (jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) {
                            try {
                                option.selected = optionSet = true
                            } catch (_) {
                                option.scrollHeight
                            }
                        } else {
                            option.selected = false
                        }
                    }
                    if (!optionSet) {
                        elem.selectedIndex = -1
                    }
                    return options
                }
            }
        }
    });
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0)
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value
            }
        }
    });
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle,
        ruseDefault = /^(?:checked|selected)$/i,
        getSetAttribute = support.getSetAttribute,
        getSetInput = support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1)
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name)
            })
        }
    });
    jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return
            }
            if (typeof elem.getAttribute === strundefined) {
                return jQuery.prop(elem, name, value)
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)
            }
            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name)
                } else {
                    if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
                        return ret
                    } else {
                        elem.setAttribute(name, value + "");
                        return value
                    }
                }
            } else {
                if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                    return ret
                } else {
                    ret = jQuery.find.attr(elem, name);
                    return ret == null ? undefined : ret
                }
            }
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0,
                attrNames = value && value.match(rnotwhite);
            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    propName = jQuery.propFix[name] || name;
                    if (jQuery.expr.match.bool.test(name)) {
                        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                            elem[propName] = false
                        } else {
                            elem[jQuery.camelCase("default-" + name)] = elem[propName] = false
                        }
                    } else {
                        jQuery.attr(elem, name, "")
                    }
                    elem.removeAttribute(getSetAttribute ? name : propName)
                }
            }
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && value === "radio" && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val
                        }
                        return value
                    }
                }
            }
        }
    });
    boolHook = {
        set: function(elem, value, name) {
            if (value === false) {
                jQuery.removeAttr(elem, name)
            } else {
                if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                    elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name)
                } else {
                    elem[jQuery.camelCase("default-" + name)] = elem[name] = true
                }
            }
            return name
        }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ? function(elem, name, isXML) {
            var ret, handle;
            if (!isXML) {
                handle = attrHandle[name];
                attrHandle[name] = ret;
                ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
                attrHandle[name] = handle
            }
            return ret
        } : function(elem, name, isXML) {
            if (!isXML) {
                return elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null
            }
        }
    });
    if (!getSetInput || !getSetAttribute) {
        jQuery.attrHooks.value = {
            set: function(elem, value, name) {
                if (jQuery.nodeName(elem, "input")) {
                    elem.defaultValue = value
                } else {
                    return nodeHook && nodeHook.set(elem, value, name)
                }
            }
        }
    }
    if (!getSetAttribute) {
        nodeHook = {
            set: function(elem, value, name) {
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    elem.setAttributeNode((ret = elem.ownerDocument.createAttribute(name)))
                }
                ret.value = value += "";
                if (name === "value" || value === elem.getAttribute(name)) {
                    return value
                }
            }
        };
        attrHandle.id = attrHandle.name = attrHandle.coords = function(elem, name, isXML) {
            var ret;
            if (!isXML) {
                return (ret = elem.getAttributeNode(name)) && ret.value !== "" ? ret.value : null
            }
        };
        jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret = elem.getAttributeNode(name);
                if (ret && ret.specified) {
                    return ret.value
                }
            },
            set: nodeHook.set
        };
        jQuery.attrHooks.contenteditable = {
            set: function(elem, value, name) {
                nodeHook.set(elem, value === "" ? false : value, name)
            }
        };
        jQuery.each(["width", "height"], function(i, name) {
            jQuery.attrHooks[name] = {
                set: function(elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value
                    }
                }
            }
        })
    }
    if (!support.style) {
        jQuery.attrHooks.style = {
            get: function(elem) {
                return elem.style.cssText || undefined
            },
            set: function(elem, value) {
                return (elem.style.cssText = value + "")
            }
        }
    }
    var rfocusable = /^(?:input|select|textarea|button|object)$/i,
        rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1)
        },
        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {
                try {
                    this[name] = undefined;
                    delete this[name]
                } catch (e) {}
            })
        }
    });
    jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (!elem || nType === 3 || nType === 8 || nType === 2) {
                return
            }
            notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
            if (notxml) {
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name]
            }
            if (value !== undefined) {
                return hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : (elem[name] = value)
            } else {
                return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name]
            }
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1
                }
            }
        }
    });
    if (!support.hrefNormalized) {
        jQuery.each(["href", "src"], function(i, name) {
            jQuery.propHooks[name] = {
                get: function(elem) {
                    return elem.getAttribute(name, 4)
                }
            }
        })
    }
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex
                    }
                }
                return null
            }
        }
    }
    jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        jQuery.propFix[this.toLowerCase()] = this
    });
    if (!support.enctype) {
        jQuery.propFix.enctype = "encoding"
    }
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0,
                len = this.length,
                proceed = typeof value === "string" && value;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, this.className))
                })
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];
                for (; i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " "
                            }
                        }
                        finalValue = jQuery.trim(cur);
                        if (elem.className !== finalValue) {
                            elem.className = finalValue
                        }
                    }
                }
            }
            return this
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0,
                len = this.length,
                proceed = arguments.length === 0 || typeof value === "string" && value;
            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, this.className))
                })
            }
            if (proceed) {
                classes = (value || "").match(rnotwhite) || [];
                for (; i < len; i++) {
                    elem = this[i];
                    cur = elem.nodeType === 1 && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "");
                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            while (cur.indexOf(" " + clazz + " ") >= 0) {
                                cur = cur.replace(" " + clazz + " ", " ")
                            }
                        }
                        finalValue = value ? jQuery.trim(cur) : "";
                        if (elem.className !== finalValue) {
                            elem.className = finalValue
                        }
                    }
                }
            }
            return this
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value)
            }
            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal)
                })
            }
            return this.each(function() {
                if (type === "string") {
                    var className, i = 0,
                        self = jQuery(this),
                        classNames = value.match(rnotwhite) || [];
                    while ((className = classNames[i++])) {
                        if (self.hasClass(className)) {
                            self.removeClass(className)
                        } else {
                            self.addClass(className)
                        }
                    }
                } else {
                    if (type === strundefined || type === "boolean") {
                        if (this.className) {
                            jQuery._data(this, "__className__", this.className)
                        }
                        this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || ""
                    }
                }
            })
        },
        hasClass: function(selector) {
            var className = " " + selector + " ",
                i = 0,
                l = this.length;
            for (; i < l; i++) {
                if (this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) {
                    return true
                }
            }
            return false
        }
    });
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name)
        }
    });
    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver)
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn)
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn)
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn)
        },
        undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn)
        }
    });
    var nonce = jQuery.now();
    var rquery = (/\?/);
    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function(data) {
        if (window.JSON && window.JSON.parse) {
            return window.JSON.parse(data + "")
        }
        var requireNonComma, depth = null,
            str = jQuery.trim(data + "");
        return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {
            if (requireNonComma && comma) {
                depth = 0
            }
            if (depth === 0) {
                return token
            }
            requireNonComma = open || comma;
            depth += !close - !open;
            return ""
        })) ? (Function("return " + str))() : jQuery.error("Invalid JSON: " + data)
    };
    jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null
        }
        try {
            if (window.DOMParser) {
                tmp = new DOMParser();
                xml = tmp.parseFromString(data, "text/xml")
            } else {
                xml = new ActiveXObject("Microsoft.XMLDOM");
                xml.async = "false";
                xml.loadXML(data)
            }
        } catch (e) {
            xml = undefined
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data)
        }
        return xml
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href
    } catch (e) {
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*"
            }
            var dataType, i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) {
                while ((dataType = dataTypes[i++])) {
                    if (dataType.charAt(0) === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func)
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func)
                    }
                }
            }
        }
    }

    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = (structure === transports);

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false
                } else {
                    if (seekingTransport) {
                        return !(selected = dataTypeOrTransport)
                    }
                }
            });
            return selected
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*")
    }

    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key]
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep)
        }
        return target
    }

    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType, ct, finalDataType, type, contents = s.contents,
            dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type")
            }
        }
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break
                }
            }
        }
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0]
        } else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break
                }
                if (!firstDataType) {
                    firstDataType = type
                }
            }
            finalDataType = finalDataType || firstDataType
        } if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType)
            }
            return responses[finalDataType]
        }
    }

    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv]
            }
        }
        current = dataTypes.shift();
        while (current) {
            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response
            }
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType)
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
                if (current === "*") {
                    current = prev
                } else {
                    if (prev !== "*" && prev !== current) {
                        conv = converters[prev + " " + current] || converters["* " + current];
                        if (!conv) {
                            for (conv2 in converters) {
                                tmp = conv2.split(" ");
                                if (tmp[1] === current) {
                                    conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                                    if (conv) {
                                        if (conv === true) {
                                            conv = converters[conv2]
                                        } else {
                                            if (converters[conv2] !== true) {
                                                current = tmp[0];
                                                dataTypes.unshift(tmp[1])
                                            }
                                        }
                                        break
                                    }
                                }
                            }
                        }
                        if (conv !== true) {
                            if (conv && s["throws"]) {
                                response = conv(response)
                            } else {
                                try {
                                    response = conv(response)
                                } catch (e) {
                                    return {
                                        state: "parsererror",
                                        error: conv ? e : "No conversion from " + prev + " to " + current
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: response
        }
    }
    jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": true,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: true,
                context: true
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target)
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            if (typeof url === "object") {
                options = url;
                url = undefined
            }
            options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options),
                callbackContext = s.context || s,
                globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),
                statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0,
                strAbort = "canceled",
                jqXHR = {
                    readyState: 0,
                    getResponseHeader: function(key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2]
                                }
                            }
                            match = responseHeaders[key.toLowerCase()]
                        }
                        return match == null ? null : match
                    },
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null
                    },
                    setRequestHeader: function(name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value
                        }
                        return this
                    },
                    overrideMimeType: function(type) {
                        if (!state) {
                            s.mimeType = type
                        }
                        return this
                    },
                    statusCode: function(map) {
                        var code;
                        if (map) {
                            if (state < 2) {
                                for (code in map) {
                                    statusCode[code] = [statusCode[code], map[code]]
                                }
                            } else {
                                jqXHR.always(map[jqXHR.status])
                            }
                        }
                        return this
                    },
                    abort: function(statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText)
                        }
                        done(0, finalText);
                        return this
                    }
                };
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;
            s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !! (parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? "80" : "443")) !== (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443"))))
            }
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional)
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (state === 2) {
                return jqXHR
            }
            fireGlobals = s.global;
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart")
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url;
            if (!s.hasContent) {
                if (s.data) {
                    cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);
                    delete s.data
                }
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++
                }
            }
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL])
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])
                }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType)
            }
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i])
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
                return jqXHR.abort()
            }
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                jqXHR[i](s[i])
            }
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
                done(-1, "No Transport")
            } else {
                jqXHR.readyState = 1;
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s])
                }
                if (s.async && s.timeout > 0) {
                    timeoutTimer = setTimeout(function() {
                        jqXHR.abort("timeout")
                    }, s.timeout)
                }
                try {
                    state = 1;
                    transport.send(requestHeaders, done)
                } catch (e) {
                    if (state < 2) {
                        done(-1, e)
                    } else {
                        throw e
                    }
                }
            }

            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                if (state === 2) {
                    return
                }
                state = 2;
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer)
                }
                transport = undefined;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || status === 304;
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses)
                }
                response = ajaxConvert(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified
                        }
                    }
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent"
                    } else {
                        if (status === 304) {
                            statusText = "notmodified"
                        } else {
                            statusText = response.state;
                            success = response.data;
                            error = response.error;
                            isSuccess = !error
                        }
                    }
                } else {
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0
                        }
                    }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR])
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error])
                }
                jqXHR.statusCode(statusCode);
                statusCode = undefined;
                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error])
                }
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop")
                    }
                }
            }
            return jqXHR
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json")
        },
        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script")
        }
    });
    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined
            }
            return jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            })
        }
    });
    jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn)
        }
    });
    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: false,
            global: false,
            "throws": true
        })
    };
    jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i))
                })
            }
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0])
                }
                wrap.map(function() {
                    var elem = this;
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild
                    }
                    return elem
                }).append(this)
            }
            return this
        },
        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i))
                })
            }
            return this.each(function() {
                var self = jQuery(this),
                    contents = self.contents();
                if (contents.length) {
                    contents.wrapAll(html)
                } else {
                    self.append(html)
                }
            })
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes)
                }
            }).end()
        }
    });
    jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || (!support.reliableHiddenOffsets() && ((elem.style && elem.style.display) || jQuery.css(elem, "display")) === "none")
    };
    jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem)
    };
    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {
                    add(prefix, v)
                } else {
                    buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add)
                }
            })
        } else {
            if (!traditional && jQuery.type(obj) === "object") {
                for (name in obj) {
                    buildParams(prefix + "[" + name + "]", obj[name], traditional, add)
                }
            } else {
                add(prefix, obj)
            }
        }
    }
    jQuery.param = function(a, traditional) {
        var prefix, s = [],
            add = function(key, value) {
                value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value)
            };
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional
        }
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
            jQuery.each(a, function() {
                add(this.name, this.value)
            })
        } else {
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add)
            }
        }
        return s.join("&").replace(r20, "+")
    };
    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type))
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    }
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                }
            }).get()
        }
    });
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR()
    } : createStandardXHR;
    var xhrId = 0,
        xhrCallbacks = {}, xhrSupported = jQuery.ajaxSettings.xhr();
    if (window.ActiveXObject) {
        jQuery(window).on("unload", function() {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](undefined, true)
            }
        })
    }
    support.cors = !! xhrSupported && ("withCredentials" in xhrSupported);
    xhrSupported = support.ajax = !! xhrSupported;
    if (xhrSupported) {
        jQuery.ajaxTransport(function(options) {
            if (!options.crossDomain || support.cors) {
                var callback;
                return {
                    send: function(headers, complete) {
                        var i, xhr = options.xhr(),
                            id = ++xhrId;
                        xhr.open(options.type, options.url, options.async, options.username, options.password);
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i]
                            }
                        }
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType)
                        }
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest"
                        }
                        for (i in headers) {
                            if (headers[i] !== undefined) {
                                xhr.setRequestHeader(i, headers[i] + "")
                            }
                        }
                        xhr.send((options.hasContent && options.data) || null);
                        callback = function(_, isAbort) {
                            var status, statusText, responses;
                            if (callback && (isAbort || xhr.readyState === 4)) {
                                delete xhrCallbacks[id];
                                callback = undefined;
                                xhr.onreadystatechange = jQuery.noop;
                                if (isAbort) {
                                    if (xhr.readyState !== 4) {
                                        xhr.abort()
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;
                                    if (typeof xhr.responseText === "string") {
                                        responses.text = xhr.responseText
                                    }
                                    try {
                                        statusText = xhr.statusText
                                    } catch (e) {
                                        statusText = ""
                                    }
                                    if (!status && options.isLocal && !options.crossDomain) {
                                        status = responses.text ? 200 : 404
                                    } else {
                                        if (status === 1223) {
                                            status = 204
                                        }
                                    }
                                }
                            }
                            if (responses) {
                                complete(status, statusText, responses, xhr.getAllResponseHeaders())
                            }
                        };
                        if (!options.async) {
                            callback()
                        } else {
                            if (xhr.readyState === 4) {
                                setTimeout(callback)
                            } else {
                                xhr.onreadystatechange = xhrCallbacks[id] = callback
                            }
                        }
                    },
                    abort: function() {
                        if (callback) {
                            callback(undefined, true)
                        }
                    }
                }
            }
        })
    }

    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest()
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {}
    }
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text
            }
        }
    });
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false
        }
    });
    jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script");
                    script.async = true;
                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset
                    }
                    script.src = s.url;
                    script.onload = script.onreadystatechange = function(_, isAbort) {
                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                            script.onload = script.onreadystatechange = null;
                            if (script.parentNode) {
                                script.parentNode.removeChild(script)
                            }
                            script = null;
                            if (!isAbort) {
                                callback(200, "success")
                            }
                        }
                    };
                    head.insertBefore(script, head.firstChild)
                },
                abort: function() {
                    if (script) {
                        script.onload(undefined, true)
                    }
                }
            }
        }
    });
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback
        }
    });
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName)
            } else {
                if (s.jsonp !== false) {
                    s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName
                }
            }
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called")
                }
                return responseContainer[0]
            };
            s.dataTypes[0] = "json";
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments
            };
            jqXHR.always(function() {
                window[callbackName] = overwritten;
                if (s[callbackName]) {
                    s.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName)
                }
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0])
                }
                responseContainer = overwritten = undefined
            });
            return "script"
        }
    });
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false
        }
        context = context || document;
        var parsed = rsingleTag.exec(data),
            scripts = !keepScripts && [];
        if (parsed) {
            return [context.createElement(parsed[1])]
        }
        parsed = jQuery.buildFragment([data], context, scripts);
        if (scripts && scripts.length) {
            jQuery(scripts).remove()
        }
        return jQuery.merge([], parsed.childNodes)
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments)
        }
        var selector, response, type, self = this,
            off = url.indexOf(" ");
        if (off >= 0) {
            selector = jQuery.trim(url.slice(off, url.length));
            url = url.slice(0, off)
        }
        if (jQuery.isFunction(params)) {
            callback = params;
            params = undefined
        } else {
            if (params && typeof params === "object") {
                type = "POST"
            }
        } if (self.length > 0) {
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params
            }).done(function(responseText) {
                response = arguments;
                self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText)
            }).complete(callback && function(jqXHR, status) {
                self.each(callback, response || [jqXHR.responseText, status, jqXHR])
            })
        }
        return this
    };
    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem
        }).length
    };
    var docElem = window.document.documentElement;

    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false
    }
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"),
                curElem = jQuery(elem),
                props = {};
            if (position === "static") {
                elem.style.position = "relative"
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0
            } if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset)
            }
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft
            }
            if ("using" in options) {
                options.using.call(elem, props)
            } else {
                curElem.css(props)
            }
        }
    };
    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) {
                return options === undefined ? this : this.each(function(i) {
                    jQuery.offset.setOffset(this, options, i)
                })
            }
            var docElem, win, box = {
                    top: 0,
                    left: 0
                }, elem = this[0],
                doc = elem && elem.ownerDocument;
            if (!doc) {
                return
            }
            docElem = doc.documentElement;
            if (!jQuery.contains(docElem, elem)) {
                return box
            }
            if (typeof elem.getBoundingClientRect !== strundefined) {
                box = elem.getBoundingClientRect()
            }
            win = getWindow(doc);
            return {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            }
        },
        position: function() {
            if (!this[0]) {
                return
            }
            var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                }, elem = this[0];
            if (jQuery.css(elem, "position") === "fixed") {
                offset = elem.getBoundingClientRect()
            } else {
                offsetParent = this.offsetParent();
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset()
                }
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true)
            }
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent || docElem;
                while (offsetParent && (!jQuery.nodeName(offsetParent, "html") && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent
                }
                return offsetParent || docElem
            })
        }
    });
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                if (val === undefined) {
                    return win ? (prop in win) ? win[prop] : win.document.documentElement[method] : elem[method]
                }
                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop())
                } else {
                    elem[method] = val
                }
            }, method, val, arguments.length, null)
        }
    });
    jQuery.each(["top", "left"], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            if (computed) {
                computed = curCSS(elem, prop);
                return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed
            }
        })
    });
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                    extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    if (jQuery.isWindow(elem)) {
                        return elem.document.documentElement["client" + name]
                    }
                    if (elem.nodeType === 9) {
                        doc = elem.documentElement;
                        return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])
                    }
                    return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra)
                }, type, chainable ? margin : undefined, chainable, null)
            }
        })
    });
    jQuery.fn.size = function() {
        return this.length
    };
    jQuery.fn.andSelf = jQuery.fn.addBack;
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery
        })
    }
    var _jQuery = window.jQuery,
        _$ = window.$;
    jQuery.noConflict = function(deep) {
        if (window.$ === jQuery) {
            window.$ = _$
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery
        }
        return jQuery
    };
    if (typeof noGlobal === strundefined) {
        window.jQuery = window.$ = jQuery
    }
    return jQuery
}));
/*
 * jQuery Migrate - v1.2.1 - 2013-05-08
 * https://github.com/jquery/jquery-migrate
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT
 */
(function(S, P, I) {
    var d = {};
    S.migrateWarnings = [];
    if (!S.migrateMute && P.console && P.console.log) {
        P.console.log("JQMIGRATE: Logging is active")
    }
    if (S.migrateTrace === I) {
        S.migrateTrace = true
    }
    S.migrateReset = function() {
        d = {};
        S.migrateWarnings.length = 0
    };

    function H(h) {
        var g = P.console;
        if (!d[h]) {
            d[h] = true;
            S.migrateWarnings.push(h);
            if (g && g.warn && !S.migrateMute) {
                g.warn("JQMIGRATE: " + h);
                if (S.migrateTrace && g.trace) {
                    g.trace()
                }
            }
        }
    }

    function A(j, l, h, k) {
        if (Object.defineProperty) {
            try {
                Object.defineProperty(j, l, {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                        H(k);
                        return h
                    },
                    set: function(m) {
                        H(k);
                        h = m
                    }
                });
                return
            } catch (g) {}
        }
        S._definePropertyBroken = true;
        j[l] = h
    }
    if (document.compatMode === "BackCompat") {
        H("jQuery is not compatible with Quirks Mode")
    }
    var F = S("<input/>", {
        size: 1
    }).attr("size") && S.attrFn,
        X = S.attr,
        W = S.attrHooks.value && S.attrHooks.value.get || function() {
            return null
        }, J = S.attrHooks.value && S.attrHooks.value.set || function() {
            return I
        }, T = /^(?:input|button)$/i,
        Y = /^[238]$/,
        b = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        K = /^(?:checked|selected)$/i;
    A(S, "attrFn", F || {}, "jQuery.attrFn is deprecated");
    S.attr = function(l, j, m, k) {
        var h = j.toLowerCase(),
            g = l && l.nodeType;
        if (k) {
            if (X.length < 4) {
                H("jQuery.fn.attr( props, pass ) is deprecated")
            }
            if (l && !Y.test(g) && (F ? j in F : S.isFunction(S.fn[j]))) {
                return S(l)[j](m)
            }
        }
        if (j === "type" && m !== I && T.test(l.nodeName) && l.parentNode) {
            H("Can't change the 'type' of an input or button in IE 6/7/8")
        }
        if (!S.attrHooks[h] && b.test(h)) {
            S.attrHooks[h] = {
                get: function(o, n) {
                    var q, p = S.prop(o, n);
                    return p === true || typeof p !== "boolean" && (q = o.getAttributeNode(n)) && q.nodeValue !== false ? n.toLowerCase() : I
                },
                set: function(o, q, n) {
                    var p;
                    if (q === false) {
                        S.removeAttr(o, n)
                    } else {
                        p = S.propFix[n] || n;
                        if (p in o) {
                            o[p] = true
                        }
                        o.setAttribute(n, n.toLowerCase())
                    }
                    return n
                }
            };
            if (K.test(h)) {
                H("jQuery.fn.attr('" + h + "') may use property instead of attribute")
            }
        }
        return X.call(S, l, j, m)
    };
    S.attrHooks.value = {
        get: function(h, g) {
            var j = (h.nodeName || "").toLowerCase();
            if (j === "button") {
                return W.apply(this, arguments)
            }
            if (j !== "input" && j !== "option") {
                H("jQuery.fn.attr('value') no longer gets properties")
            }
            return g in h ? h.value : null
        },
        set: function(g, h) {
            var j = (g.nodeName || "").toLowerCase();
            if (j === "button") {
                return J.apply(this, arguments)
            }
            if (j !== "input" && j !== "option") {
                H("jQuery.fn.attr('value', val) no longer sets properties")
            }
            g.value = h
        }
    };
    var Q, e, Z = S.fn.init,
        a = S.parseJSON,
        V = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
    S.fn.init = function(g, k, j) {
        var h;
        if (g && typeof g === "string" && !S.isPlainObject(k) && (h = V.exec(S.trim(g))) && h[0]) {
            if (g.charAt(0) !== "<") {
                H("$(html) HTML strings must start with '<' character")
            }
            if (h[3]) {
                H("$(html) HTML text after last tag is ignored")
            }
            if (h[0].charAt(0) === "#") {
                H("HTML string cannot start with a '#' character");
                S.error("JQMIGRATE: Invalid selector string (XSS)")
            }
            if (k && k.context) {
                k = k.context
            }
            if (S.parseHTML) {
                return Z.call(this, S.parseHTML(h[2], k, true), k, j)
            }
        }
        return Z.apply(this, arguments)
    };
    S.fn.init.prototype = S.fn;
    S.parseJSON = function(g) {
        if (!g && g !== null) {
            H("jQuery.parseJSON requires a valid JSON string");
            return null
        }
        return a.apply(this, arguments)
    };
    S.uaMatch = function(h) {
        h = h.toLowerCase();
        var g = /(chrome)[ \/]([\w.]+)/.exec(h) || /(webkit)[ \/]([\w.]+)/.exec(h) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(h) || /(msie) ([\w.]+)/.exec(h) || h.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(h) || [];
        return {
            browser: g[1] || "",
            version: g[2] || "0"
        }
    };
    if (!S.browser) {
        Q = S.uaMatch(navigator.userAgent);
        e = {};
        if (Q.browser) {
            e[Q.browser] = true;
            e.version = Q.version
        }
        if (e.chrome) {
            e.webkit = true
        } else {
            if (e.webkit) {
                e.safari = true
            }
        }
        S.browser = e
    }
    A(S, "browser", S.browser, "jQuery.browser is deprecated");
    S.sub = function() {
        function g(k, l) {
            return new g.fn.init(k, l)
        }
        S.extend(true, g, this);
        g.superclass = this;
        g.fn = g.prototype = this();
        g.fn.constructor = g;
        g.sub = this.sub;
        g.fn.init = function j(k, l) {
            if (l && l instanceof S && !(l instanceof g)) {
                l = g(l)
            }
            return S.fn.init.call(this, k, l, h)
        };
        g.fn.init.prototype = g.fn;
        var h = g(document);
        H("jQuery.sub() is deprecated");
        return g
    };
    S.ajaxSetup({
        converters: {
            "text json": S.parseJSON
        }
    });
    var N = S.fn.data;
    S.fn.data = function(j) {
        var h, g, k = this[0];
        if (k && j === "events" && arguments.length === 1) {
            h = S.data(k, j);
            g = S._data(k, j);
            if ((h === I || h === g) && g !== I) {
                H("Use of jQuery.fn.data('events') is deprecated");
                return g
            }
        }
        return N.apply(this, arguments)
    };
    var O = /\/(java|ecma)script/i,
        U = S.fn.andSelf || S.fn.addBack;
    S.fn.andSelf = function() {
        H("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");
        return U.apply(this, arguments)
    };
    if (!S.clean) {
        S.clean = function(g, h, o, k) {
            h = h || document;
            h = !h.nodeType && h[0] || h;
            h = h.ownerDocument || h;
            H("jQuery.clean() is deprecated");
            var l, j, m, p, n = [];
            S.merge(n, S.buildFragment(g, h).childNodes);
            if (o) {
                m = function(q) {
                    if (!q.type || O.test(q.type)) {
                        return k ? k.push(q.parentNode ? q.parentNode.removeChild(q) : q) : o.appendChild(q)
                    }
                };
                for (l = 0;
                    (j = n[l]) != null; l++) {
                    if (!(S.nodeName(j, "script") && m(j))) {
                        o.appendChild(j);
                        if (typeof j.getElementsByTagName !== "undefined") {
                            p = S.grep(S.merge([], j.getElementsByTagName("script")), m);
                            n.splice.apply(n, [l + 1, 0].concat(p));
                            l += p.length
                        }
                    }
                }
            }
            return n
        }
    }
    var C = S.event.add,
        B = S.event.remove,
        G = S.event.trigger,
        R = S.fn.toggle,
        D = S.fn.live,
        M = S.fn.die,
        c = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
        E = new RegExp("\\b(?:" + c + ")\\b"),
        f = /(?:^|\s)hover(\.\S+|)\b/,
        L = function(g) {
            if (typeof(g) !== "string" || S.event.special.hover) {
                return g
            }
            if (f.test(g)) {
                H("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'")
            }
            return g && g.replace(f, "mouseenter$1 mouseleave$1")
        };
    if (S.event.props && S.event.props[0] !== "attrChange") {
        S.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement")
    }
    if (S.event.dispatch) {
        A(S.event, "handle", S.event.dispatch, "jQuery.event.handle is undocumented and deprecated")
    }
    S.event.add = function(k, h, j, l, g) {
        if (k !== document && E.test(h)) {
            H("AJAX events should be attached to document: " + h)
        }
        C.call(this, k, L(h || ""), j, l, g)
    };
    S.event.remove = function(l, j, k, g, h) {
        B.call(this, l, L(j) || "", k, g, h)
    };
    S.fn.error = function() {
        var g = Array.prototype.slice.call(arguments, 0);
        H("jQuery.fn.error() is deprecated");
        g.splice(0, 0, "error");
        if (arguments.length) {
            return this.bind.apply(this, g)
        }
        this.triggerHandler.apply(this, g);
        return this
    };
    S.fn.toggle = function(l, j) {
        if (!S.isFunction(l) || !S.isFunction(j)) {
            return R.apply(this, arguments)
        }
        H("jQuery.fn.toggle(handler, handler...) is deprecated");
        var h = arguments,
            g = l.guid || S.guid++,
            k = 0,
            m = function(n) {
                var o = (S._data(this, "lastToggle" + l.guid) || 0) % k;
                S._data(this, "lastToggle" + l.guid, o + 1);
                n.preventDefault();
                return h[o].apply(this, arguments) || false
            };
        m.guid = g;
        while (k < h.length) {
            h[k++].guid = g
        }
        return this.click(m)
    };
    S.fn.live = function(g, j, h) {
        H("jQuery.fn.live() is deprecated");
        if (D) {
            return D.apply(this, arguments)
        }
        S(this.context).on(g, this.selector, j, h);
        return this
    };
    S.fn.die = function(g, h) {
        H("jQuery.fn.die() is deprecated");
        if (M) {
            return M.apply(this, arguments)
        }
        S(this.context).off(g, this.selector || "**", h);
        return this
    };
    S.event.trigger = function(j, k, h, g) {
        if (!h && !E.test(j)) {
            H("Global events are undocumented and deprecated")
        }
        return G.call(this, j, k, h || document, g)
    };
    S.each(c.split("|"), function(h, g) {
        S.event.special[g] = {
            setup: function() {
                var j = this;
                if (j !== document) {
                    S.event.add(document, g + "." + S.guid, function() {
                        S.event.trigger(g, null, j, true)
                    });
                    S._data(this, g, S.guid++)
                }
                return false
            },
            teardown: function() {
                if (this !== document) {
                    S.event.remove(document, g + "." + S._data(this, g))
                }
                return false
            }
        }
    })
})(jQuery, window);
var PollDaddy;
jQuery.support.transition = (function() {
    var B = document.body || document.documentElement,
        C = B.style,
        A = C.WebkitTransition !== undefined || C.MozTransition !== undefined || C.OTransition !== undefined || C.transition !== undefined;
    return A
})();
jQuery.support.transform3d = (function() {
    var D = document.createElement("div"),
        A = false,
        C = ["perspectiveProperty", "WebkitPerspective"];
    for (var B = C.length - 1; B >= 0; B--) {
        A = A ? A : D.style[C[B]] !== undefined
    }
    return A
})();
(function(A) {
    PollDaddy = {
        highlight_colour: "#fdf5e1",
        error_colour: "#ccaaaa",
        opacity: 0.4,
        loading_icon: '<img src="/images/ajax-loader.gif" width="16" height="16" alt="loading"/>',
        fatal_complete: function() {
            A("#error").unbind("click").click(function() {
                A.colorbox.close();
                return false
            })
        },
        is_fatal: function(C) {
            if (typeof C == "object" && typeof C.documentElement != "undefined" && C.documentElement.nodeName == "error" && (C.documentElement.getAttribute("level") == "fatal" || C.documentElement.getAttribute("level") == "upgrade")) {
                var B = C.documentElement.childNodes;
                for (var D = 0; D < B.length; D++) {
                    if (B[D].nodeName == "html") {
                        A.colorbox({
                            html: B[D].childNodes[0].nodeValue,
                            open: true,
                            inline: false,
                            scrolling: false,
                            opacity: PollDaddy.opacity,
                            onComplete: PollDaddy.fatal_complete
                        });
                        return true
                    }
                }
            }
            return false
        },
        init: function() {
            A().bind("ajaxError", function(D, C) {
                var B = '<div class="dialog dialog-error" id="error"><div class="body"><div class="title">Server Error ' + C.status + '</div><div class="text">Ooops - an error occurred on the server</div></div>';
                B += '<div class="controls"><div class="right"><a class="cancel button" onclick="jQuery.fn.colorbox.close(); return false;" href="#">Ok</a><p class="clear"></p></div></div><p class="clear"></p></div></div>';
                A.colorbox({
                    html: B,
                    open: true,
                    href: false,
                    scrolling: false,
                    inline: false,
                    opacity: PollDaddy.opacity,
                    onComplete: function() {
                        A("#error").unbind("click").click(function() {
                            A.colorbox.close();
                            return false
                        })
                    }
                })
            })
        },
        preload: function(D, E, B) {
            var C = new Image(E, B);
            C.src = D
        }
    };
    PollDaddy.init();
    A.fn.extend({
        highlight: function(B) {
            return this.each(function() {
                var C = A(this).css("backgroundColor");
                A(this).stop(true, true);
                A(this).animate({
                    backgroundColor: PollDaddy.highlight_colour
                }, 450).animate({
                    backgroundColor: C
                }).animate({
                    backgroundColor: PollDaddy.highlight_colour
                }, 150).animate({
                    backgroundColor: C
                }, function() {
                    if (B && A.isFunction(B)) {
                        B()
                    }
                })
            })
        },
        error: function(B) {
            return this.each(function() {
                var C = A(this).css("backgroundColor");
                A(this).animate({
                    backgroundColor: PollDaddy.error_colour
                }, 450).animate({
                    backgroundColor: C
                }).animate({
                    backgroundColor: PollDaddy.error_colour
                }, 150).animate({
                    backgroundColor: C
                }, function() {
                    if (B && A.isFunction(B)) {
                        B()
                    }
                })
            })
        },
        fadeOutRemove: function(B) {
            return this.each(function() {
                var C = A(this);
                C.fadeOut("slow", "easeOutQuart", function() {
                    C.remove();
                    if (B && A.isFunction(B)) {
                        B()
                    }
                })
            })
        },
        dropdown: function(B) {
            var C = A.extend({
                offset_top: 0,
                offset_left: 0,
                copy_selected: false,
                before_drop: function() {},
                after_drop: function() {},
                close_drop: function() {},
                transitionIn: "fadeIn",
                transitionOut: "fadeOut",
                alignment: "left",
                width: "auto"
            }, B);
            if (typeof C.popup != "function") {
                A(C.popup).addClass("is-dropdown-popup")
            }
            return this.each(function() {
                var D = A(this);
                D.addClass("is-dropdown");
                D.click(function() {
                    var E = C.popup;
                    if (typeof E == "function") {
                        E = C.popup(this);
                        A(E).addClass("is-dropdown-popup")
                    }
                    if (D.hasClass("inactive") === false) {
                        A(".is-dropdown-popup")[C.transitionOut](250, "easeOutQuart");
                        if (A(E).is(":visible")) {
                            A(E)[C.transitionOut](250, "easeOutQuart");
                            D.removeClass("is-dropdown-open");
                            C.close_drop(D)
                        } else {
                            var I = D.offset().top + D.height() + C.offset_top;
                            var G;
                            if (C.width == "auto") {
                                G = D.innerWidth()
                            } else {
                                if (C.width !== false) {
                                    G = C.width
                                } else {
                                    G = A(E).width()
                                }
                            }
                            D.addClass("is-dropdown-open");
                            C.before_drop(E, this);
                            if (C.alignment == "left") {
                                posx = D.offset().left
                            } else {
                                diff = (G - D.parent().width());
                                posx = D.offset().left - diff
                            }
                            posx += C.offset_left;
                            var H = A(E).find(".searcher");
                            if (H.length > 0) {
                                H.unbind("keyup").bind("keyup", function(L) {
                                    var M;
                                    var K;
                                    var J = H.find("input").val().toLowerCase();
                                    A(E).find(".dropdown-item").each(function(O, N) {
                                        K = A(N);
                                        M = K.find(".dropdown-text");
                                        if (M.text().toLowerCase().indexOf(J) === -1) {
                                            K.hide()
                                        } else {
                                            K.show()
                                        }
                                    })
                                })
                            }
                            A(E).css({
                                left: posx,
                                top: I + "px",
                                width: G
                            })[C.transitionIn](250, "easeOutQuart", C.after_drop);
                            var F = function(K, J) {
                                if (A(this).parent().hasClass("disabled")) {
                                    return false
                                }
                                if (A(K.target).parent().hasClass("is-dropdown") || A(K.target).parent().hasClass("searcher")) {
                                    return false
                                }
                                if (C.copy_selected && A(K.target).closest(".is-dropdown-popup").length > 0) {
                                    D.prop("href", A(K.target).prop("href"));
                                    D.text(A(K.target).text())
                                }
                                A(E)[C.transitionOut](250, "easeOutQuart");
                                if (K.type == "touchstart" && A(this).closest(".is-dropdown-popup").length) {
                                    K.stopImmediatePropagation();
                                    A(this).click()
                                }
                                A("body").unbind("click", F).unbind("touchstart", F);
                                A(E).find("a").unbind("click", F).unbind("touchstart", F);
                                D.removeClass("is-dropdown-open");
                                C.close_drop(D);
                                return true
                            };
                            A(E).find("a").click(F).bind("touchstart", F);
                            A("body").click(F).bind("touchstart", F)
                        }
                    }
                    return false
                })
            })
        },
        check_all: function(B) {
            return this.each(function() {
                A(this).click(function() {
                    if (A(this).is(":checked")) {
                        A(B).find("input[type=checkbox]").prop("checked", true)
                    } else {
                        A(B).find("input[type=checkbox]").prop("checked", false)
                    }
                })
            })
        },
        copy_key: function(D, B, C) {
            return this.each(function() {
                A(this).keyup(function() {
                    if (A(this).val().length > C) {
                        A(D).html(A(this).val().substr(0, C) + "&hellip;")
                    } else {
                        if (A(this).val().length === 0) {
                            A(D).text(B)
                        } else {
                            A(D).text(A(this).val())
                        }
                    }
                })
            })
        },
        ellipsis: function(B) {
            var C = document.documentElement.style;
            if (!("textOverflow" in C || "OTextOverflow" in C)) {
                return this.each(function() {
                    var F = A(this);
                    if (F.css("overflow") == "hidden") {
                        var I = F.html();
                        var D = F.width();
                        var E = A(this.cloneNode(true)).hide().css({
                            position: "absolute",
                            width: "auto",
                            overflow: "visible",
                            "max-width": "inherit"
                        });
                        F.after(E);
                        var H = I;
                        while (H.length > 0 && E.width() > F.width()) {
                            H = H.substr(0, H.length - 1);
                            E.html(H + "&hellip;")
                        }
                        F.html(E.html());
                        E.remove();
                        if (B === true) {
                            var G = F.width();
                            setInterval(function() {
                                if (F.width() != G) {
                                    G = F.width();
                                    F.html(I);
                                    F.ellipsis()
                                }
                            }, 200)
                        }
                    }
                })
            } else {
                return this
            }
        },
        menu: function(D, B) {
            var C = A.extend({
                voffset: -1,
                hoffset: 2,
                clicked: false
            }, B);
            return this.each(function() {
                A(this).unbind("click");
                A(this).click(function() {
                    function F() {
                        A(D).slideUp(100, "easeOutQuart");
                        A(D).parents("body").unbind("click", F);
                        return false
                    }

                    function E(G) {
                        if (C.clicked === false) {
                            G.stopPropagation();
                            return true
                        } else {
                            A(D).find("a").unbind("click");
                            return C.clicked(A(this), G, F)
                        }
                    }
                    A(D).parents("body").click(F);
                    A(D).find("a").unbind("click", E).bind("click", E);
                    if (A(D).find(":visible").length === 0) {
                        A(D).css({
                            top: A(this).position().top + A(this).height() + C.voffset,
                            left: A(this).position().left + C.hoffset
                        });
                        A(D).slideDown(100, "easeOutQuart");
                        return false
                    } else {
                        return F()
                    }
                })
            })
        },
        auto_select: function() {
            return this.each(function() {
                A(this).click(function() {
                    this.focus();
                    this.select();
                    return true
                })
            })
        },
        auto_password: function(B) {
            return this.each(function() {
                A(this).unbind("click").click(function() {
                    var D = "";
                    var E = (Math.random() * 8) + 8;
                    var F = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
                    for (var C = 0; C < E; C++) {
                        D += F.substr(Math.random() * F.length, 1)
                    }
                    A(B).val(D);
                    return false
                })
            })
        },
        focus_text: function(B) {
            return this.each(function() {
                var C = this;
                A(this).parents("form").submit(function() {
                    if (A(C).val() == B || A(C).hasClass("idle")) {
                        A(C).val("")
                    }
                });
                if (A(this).val() === "" || A(this).val() == B) {
                    A(this).addClass("idle");
                    A(this).val(B)
                }
                A(this).unbind("focus").focus(function() {
                    if (A(C).val() === "") {
                        A(C).addClass("idle")
                    }
                    if (A(C).val() == B || A(C).hasClass("idle")) {
                        A(C).val("")
                    }
                    A(C).removeClass("idle")
                });
                A(this).unbind("blur").blur(function() {
                    if (A(C).val() === "") {
                        A(C).addClass("idle");
                        A(C).val(B)
                    } else {
                        A(C).removeClass("idle")
                    }
                })
            })
        },
        loading: function(B) {
            var C = A.extend({
                hide: false
            }, B);
            return this.each(function() {
                if (this.nodeName == "A") {
                    if (A(this).data("before") !== undefined && A(this).data("before") !== false && A(this).data("before") !== null) {
                        A(this).replaceWith(A(this).data("before"));
                        A(this).data("before_class", false);
                        A(this).data("before_click", false)
                    } else {
                        A(this).data("before", A(this).clone(true));
                        A(this).prop("class", A(this).prop("class").replace(/link-\w*/g, ""));
                        A(this).addClass("link-load");
                        A(this).unbind("click");
                        A(this).click(function() {
                            return false
                        })
                    }
                } else {
                    if (A(this).data("before") !== undefined && A(this).data("before") !== false && A(this).data("before") !== null) {
                        A(this).html(A(this).data("before"));
                        A(this).data("before", false)
                    } else {
                        A(this).data("before", A(this).html());
                        A(this).html(PollDaddy.loading_icon)
                    }
                }
            })
        }
    })
})(jQuery);

function language_subdomain(A) {
    var B = A.options[A.selectedIndex].value;
    var C = "polldaddy";
    if (document.location.hostname.indexOf("surveydaddy") !== -1) {
        C = "surveydaddy"
    }
    if (B === "") {
        document.location.href = "http://" + C + ".com" + document.location.pathname
    } else {
        document.location.href = "http://" + B + "." + C + ".com" + document.location.pathname
    }
}(function(A) {
    A(document).ready(function() {
        A(".signin-group").hide();
        A("#signin .signin-button input").click(function() {
            A("input[name=email]").focus_text(pd_login_email);
            A(".signin-group").show();
            A("#signin").attr("class", "signin");
            A(this).unbind("click");
            return false
        });
        A(".logos a").click(function() {
            return false
        });
        A(".logos a").mouseenter(function() {
            var C = A(this).attr("href").substr(1);
            var B = A("a.logo-on").attr("href").substr(1);
            A(".logos a").removeClass("logo-high").removeClass("logo-on");
            A(this).addClass("logo-on").addClass("logo-high");
            A("#test-" + B).hide();
            A("#test-" + C).show()
        });
        A(".home-menu a").click(function() {
            if (A(this).parents("li").hasClass("on") === false) {
                A(".home-desc").scrollTo(A(A(this).attr("href")), 300, {
                    easing: "easeOutQuart"
                });
                A(".home-menu li").removeClass("on");
                A(this).parents("li").addClass("on");
                A(".home-screen:visible").fadeOut();
                A(".home-screen-" + A(this).attr("href").substr(6)).fadeIn()
            }
            return false
        });
        A(".javascript").show();
        A(".basic").hide();
        A("#home-screen-surveys").click(function() {
            window.location = "/features-surveys/"
        });
        A("#home-screen-polls").click(function() {
            window.location = "/features-polls/"
        });
        A("#home-screen-ratings").click(function() {
            window.location = "/features-ratings/"
        })
    })
})(jQuery);
jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(B, C, A, E, D) {
        return jQuery.easing[jQuery.easing.def](B, C, A, E, D)
    },
    easeInQuad: function(B, C, A, E, D) {
        return E * (C /= D) * C + A
    },
    easeOutQuad: function(B, C, A, E, D) {
        return -E * (C /= D) * (C - 2) + A
    },
    easeInOutQuad: function(B, C, A, E, D) {
        if ((C /= D / 2) < 1) {
            return E / 2 * C * C + A
        }
        return -E / 2 * ((--C) * (C - 2) - 1) + A
    },
    easeInCubic: function(B, C, A, E, D) {
        return E * (C /= D) * C * C + A
    },
    easeOutCubic: function(B, C, A, E, D) {
        return E * ((C = C / D - 1) * C * C + 1) + A
    },
    easeInOutCubic: function(B, C, A, E, D) {
        if ((C /= D / 2) < 1) {
            return E / 2 * C * C * C + A
        }
        return E / 2 * ((C -= 2) * C * C + 2) + A
    },
    easeInQuart: function(B, C, A, E, D) {
        return E * (C /= D) * C * C * C + A
    },
    easeOutQuart: function(B, C, A, E, D) {
        return -E * ((C = C / D - 1) * C * C * C - 1) + A
    },
    easeInOutQuart: function(B, C, A, E, D) {
        if ((C /= D / 2) < 1) {
            return E / 2 * C * C * C * C + A
        }
        return -E / 2 * ((C -= 2) * C * C * C - 2) + A
    },
    easeInQuint: function(B, C, A, E, D) {
        return E * (C /= D) * C * C * C * C + A
    },
    easeOutQuint: function(B, C, A, E, D) {
        return E * ((C = C / D - 1) * C * C * C * C + 1) + A
    },
    easeInOutQuint: function(B, C, A, E, D) {
        if ((C /= D / 2) < 1) {
            return E / 2 * C * C * C * C * C + A
        }
        return E / 2 * ((C -= 2) * C * C * C * C + 2) + A
    },
    easeInSine: function(B, C, A, E, D) {
        return -E * Math.cos(C / D * (Math.PI / 2)) + E + A
    },
    easeOutSine: function(B, C, A, E, D) {
        return E * Math.sin(C / D * (Math.PI / 2)) + A
    },
    easeInOutSine: function(B, C, A, E, D) {
        return -E / 2 * (Math.cos(Math.PI * C / D) - 1) + A
    },
    easeInExpo: function(B, C, A, E, D) {
        return (C == 0) ? A : E * Math.pow(2, 10 * (C / D - 1)) + A
    },
    easeOutExpo: function(B, C, A, E, D) {
        return (C == D) ? A + E : E * (-Math.pow(2, -10 * C / D) + 1) + A
    },
    easeInOutExpo: function(B, C, A, E, D) {
        if (C == 0) {
            return A
        }
        if (C == D) {
            return A + E
        }
        if ((C /= D / 2) < 1) {
            return E / 2 * Math.pow(2, 10 * (C - 1)) + A
        }
        return E / 2 * (-Math.pow(2, -10 * --C) + 2) + A
    },
    easeInCirc: function(B, C, A, E, D) {
        return -E * (Math.sqrt(1 - (C /= D) * C) - 1) + A
    },
    easeOutCirc: function(B, C, A, E, D) {
        return E * Math.sqrt(1 - (C = C / D - 1) * C) + A
    },
    easeInOutCirc: function(B, C, A, E, D) {
        if ((C /= D / 2) < 1) {
            return -E / 2 * (Math.sqrt(1 - C * C) - 1) + A
        }
        return E / 2 * (Math.sqrt(1 - (C -= 2) * C) + 1) + A
    },
    easeInElastic: function(B, D, A, H, G) {
        var E = 1.70158;
        var F = 0;
        var C = H;
        if (D == 0) {
            return A
        }
        if ((D /= G) == 1) {
            return A + H
        }
        if (!F) {
            F = G * 0.3
        }
        if (C < Math.abs(H)) {
            C = H;
            var E = F / 4
        } else {
            var E = F / (2 * Math.PI) * Math.asin(H / C)
        }
        return -(C * Math.pow(2, 10 * (D -= 1)) * Math.sin((D * G - E) * (2 * Math.PI) / F)) + A
    },
    easeOutElastic: function(B, D, A, H, G) {
        var E = 1.70158;
        var F = 0;
        var C = H;
        if (D == 0) {
            return A
        }
        if ((D /= G) == 1) {
            return A + H
        }
        if (!F) {
            F = G * 0.3
        }
        if (C < Math.abs(H)) {
            C = H;
            var E = F / 4
        } else {
            var E = F / (2 * Math.PI) * Math.asin(H / C)
        }
        return C * Math.pow(2, -10 * D) * Math.sin((D * G - E) * (2 * Math.PI) / F) + H + A
    },
    easeInOutElastic: function(B, D, A, H, G) {
        var E = 1.70158;
        var F = 0;
        var C = H;
        if (D == 0) {
            return A
        }
        if ((D /= G / 2) == 2) {
            return A + H
        }
        if (!F) {
            F = G * (0.3 * 1.5)
        }
        if (C < Math.abs(H)) {
            C = H;
            var E = F / 4
        } else {
            var E = F / (2 * Math.PI) * Math.asin(H / C)
        } if (D < 1) {
            return -0.5 * (C * Math.pow(2, 10 * (D -= 1)) * Math.sin((D * G - E) * (2 * Math.PI) / F)) + A
        }
        return C * Math.pow(2, -10 * (D -= 1)) * Math.sin((D * G - E) * (2 * Math.PI) / F) * 0.5 + H + A
    },
    easeInBack: function(B, C, A, F, E, D) {
        if (D == undefined) {
            D = 1.70158
        }
        return F * (C /= E) * C * ((D + 1) * C - D) + A
    },
    easeOutBack: function(B, C, A, F, E, D) {
        if (D == undefined) {
            D = 1.70158
        }
        return F * ((C = C / E - 1) * C * ((D + 1) * C + D) + 1) + A
    },
    easeInOutBack: function(B, C, A, F, E, D) {
        if (D == undefined) {
            D = 1.70158
        }
        if ((C /= E / 2) < 1) {
            return F / 2 * (C * C * (((D *= (1.525)) + 1) * C - D)) + A
        }
        return F / 2 * ((C -= 2) * C * (((D *= (1.525)) + 1) * C + D) + 2) + A
    },
    easeInBounce: function(B, C, A, E, D) {
        return E - jQuery.easing.easeOutBounce(B, D - C, 0, E, D) + A
    },
    easeOutBounce: function(B, C, A, E, D) {
        if ((C /= D) < (1 / 2.75)) {
            return E * (7.5625 * C * C) + A
        } else {
            if (C < (2 / 2.75)) {
                return E * (7.5625 * (C -= (1.5 / 2.75)) * C + 0.75) + A
            } else {
                if (C < (2.5 / 2.75)) {
                    return E * (7.5625 * (C -= (2.25 / 2.75)) * C + 0.9375) + A
                } else {
                    return E * (7.5625 * (C -= (2.625 / 2.75)) * C + 0.984375) + A
                }
            }
        }
    },
    easeInOutBounce: function(B, C, A, E, D) {
        if (C < D / 2) {
            return jQuery.easing.easeInBounce(B, C * 2, 0, E, D) * 0.5 + A
        }
        return jQuery.easing.easeOutBounce(B, C * 2 - D, 0, E, D) * 0.5 + E * 0.5 + A
    }
});
(function(A) {
    A.fn.extend({
        validate: function(E, C, H) {
            var G = {
                email: function(J, I) {
                    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(J.val())
                },
                url: function(K, J) {
                    var I = /^(https?:\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(K.val());
                    if (I || (J === true && K.val() == "")) {
                        return true
                    }
                    return false
                },
                required: function(J, I) {
                    if (A(J).is(":checkbox")) {
                        return A(J).is(":checked") === false ? false : true
                    } else {
                        if (J.val().replace(/^\s+|\s+$/g, "").length > 0) {
                            return true
                        }
                    }
                    return false
                },
                string: function(J, I) {
                    if (J.val().replace(/^\s+|\s+$/g, "").length > parseInt(I)) {
                        return true
                    }
                    return false
                },
                equal: function(J, I) {
                    if (A(I).val().replace(/^\s+|\s+$/g, "").length == 0 || J.val() == A(I).val()) {
                        return true
                    }
                    return false
                }
            };
            var B = false;
            var D = function(I) {
                if (G[I.name](I.target, I.options) === false) {
                    I.target.unbind("blur").blur(function() {
                        D(I)
                    });
                    if (B === false) {
                        I.target.focus();
                        B = true
                    }
                    if (I.target.data("inerror") === undefined || I.target.data("inerror") === false || I.target.data("inerror") === null) {
                        I.target.data("inerror", true);
                        A("#error-" + I.target.attr("name")).slideDown({
                            easing: "easeOutQuart",
                            complete: function() {
                                if (A.isFunction(I.callback)) {
                                    I.callback(I.target, true)
                                }
                            }
                        })
                    }
                    return 1
                }
                A("#error-" + I.target.attr("name")).slideUp({
                    easing: "easeOutQuart",
                    complete: function() {
                        if (I.target.data("inerror") === true && A.isFunction(I.callback)) {
                            I.callback(I.target, false)
                        }
                        I.target.data("inerror", false);
                        I.target.unbind("blur")
                    }
                });
                return 0
            };
            var F = function(J) {
                var I = 0;
                B = false;
                A.each(J, function(K, L) {
                    I += D(L)
                });
                if (I > 0) {
                    return false
                }
                return true
            };
            return this.each(function() {
                var J = A(this).parents("form");
                var I = J.data("validators");
                if (I === undefined || I === null) {
                    I = []
                }
                I[I.length] = {
                    name: E,
                    target: A(this),
                    options: C,
                    callback: H
                };
                J.data("validators", I);
                J.submit(function(K) {
                    if (F(A(this).data("validators"))) {
                        return true
                    }
                    K.stopImmediatePropagation();
                    return false
                });
                J.data("validate", true)
            })
        }
    })
})(jQuery);
/*
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
(function(O, D) {
    var K = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        H = /^([\-+])=\s*(\d+\.?\d*)/,
        G = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(P) {
                return [P[1], P[2], P[3], P[4]]
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(P) {
                return [P[1] * 2.55, P[2] * 2.55, P[3] * 2.55, P[4]]
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(P) {
                return [parseInt(P[1], 16), parseInt(P[2], 16), parseInt(P[3], 16)]
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(P) {
                return [parseInt(P[1] + P[1], 16), parseInt(P[2] + P[2], 16), parseInt(P[3] + P[3], 16)]
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(P) {
                return [P[1], P[2] / 100, P[3] / 100, P[4]]
            }
        }],
        E = O.Color = function(Q, R, P, S) {
            return new O.Color.fn.parse(Q, R, P, S)
        }, J = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        }, N = {
            "byte": {
                floor: true,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: true
            }
        }, M = E.support = {}, B = O("<p>")[0],
        A, L = O.each;
    B.style.cssText = "background-color:rgba(1,1,1,.5)";
    M.rgba = B.style.backgroundColor.indexOf("rgba") > -1;
    L(J, function(P, Q) {
        Q.cache = "_" + P;
        Q.props.alpha = {
            idx: 3,
            type: "percent",
            def: 1
        }
    });

    function I(Q, S, R) {
        var P = N[S.type] || {};
        if (Q == null) {
            return (R || !S.def) ? null : S.def
        }
        Q = P.floor ? ~~Q : parseFloat(Q);
        if (isNaN(Q)) {
            return S.def
        }
        if (P.mod) {
            return (Q + P.mod) % P.mod
        }
        return 0 > Q ? 0 : P.max < Q ? P.max : Q
    }

    function F(P) {
        var R = E(),
            Q = R._rgba = [];
        P = P.toLowerCase();
        L(G, function(W, X) {
            var U, V = X.re.exec(P),
                T = V && X.parse(V),
                S = X.space || "rgba";
            if (T) {
                U = R[S](T);
                R[J[S].cache] = U[J[S].cache];
                Q = R._rgba = U._rgba;
                return false
            }
        });
        if (Q.length) {
            if (Q.join() === "0,0,0,0") {
                O.extend(Q, A.transparent)
            }
            return R
        }
        return A[P]
    }
    E.fn = O.extend(E.prototype, {
        parse: function(V, T, P, U) {
            if (V === D) {
                this._rgba = [null, null, null, null];
                return this
            }
            if (V.jquery || V.nodeType) {
                V = O(V).css(T);
                T = D
            }
            var S = this,
                R = O.type(V),
                Q = this._rgba = [];
            if (T !== D) {
                V = [V, T, P, U];
                R = "array"
            }
            if (R === "string") {
                return this.parse(F(V) || A._default)
            }
            if (R === "array") {
                L(J.rgba.props, function(W, X) {
                    Q[X.idx] = I(V[X.idx], X)
                });
                return this
            }
            if (R === "object") {
                if (V instanceof E) {
                    L(J, function(W, X) {
                        if (V[X.cache]) {
                            S[X.cache] = V[X.cache].slice()
                        }
                    })
                } else {
                    L(J, function(X, Y) {
                        var W = Y.cache;
                        L(Y.props, function(Z, a) {
                            if (!S[W] && Y.to) {
                                if (Z === "alpha" || V[Z] == null) {
                                    return
                                }
                                S[W] = Y.to(S._rgba)
                            }
                            S[W][a.idx] = I(V[Z], a, true)
                        });
                        if (S[W] && O.inArray(null, S[W].slice(0, 3)) < 0) {
                            S[W][3] = 1;
                            if (Y.from) {
                                S._rgba = Y.from(S[W])
                            }
                        }
                    })
                }
                return this
            }
        },
        is: function(R) {
            var P = E(R),
                S = true,
                Q = this;
            L(J, function(T, V) {
                var W, U = P[V.cache];
                if (U) {
                    W = Q[V.cache] || V.to && V.to(Q._rgba) || [];
                    L(V.props, function(X, Y) {
                        if (U[Y.idx] != null) {
                            S = (U[Y.idx] === W[Y.idx]);
                            return S
                        }
                    })
                }
                return S
            });
            return S
        },
        _space: function() {
            var P = [],
                Q = this;
            L(J, function(R, S) {
                if (Q[S.cache]) {
                    P.push(R)
                }
            });
            return P.pop()
        },
        transition: function(Q, W) {
            var R = E(Q),
                S = R._space(),
                T = J[S],
                U = this.alpha() === 0 ? E("transparent") : this,
                V = U[T.cache] || T.to(U._rgba),
                P = V.slice();
            R = R[T.cache];
            L(T.props, function(a, c) {
                var Z = c.idx,
                    Y = V[Z],
                    X = R[Z],
                    b = N[c.type] || {};
                if (X === null) {
                    return
                }
                if (Y === null) {
                    P[Z] = X
                } else {
                    if (b.mod) {
                        if (X - Y > b.mod / 2) {
                            Y += b.mod
                        } else {
                            if (Y - X > b.mod / 2) {
                                Y -= b.mod
                            }
                        }
                    }
                    P[Z] = I((X - Y) * W + Y, c)
                }
            });
            return this[S](P)
        },
        blend: function(S) {
            if (this._rgba[3] === 1) {
                return this
            }
            var R = this._rgba.slice(),
                Q = R.pop(),
                P = E(S)._rgba;
            return E(O.map(R, function(T, U) {
                return (1 - Q) * P[U] + Q * T
            }))
        },
        toRgbaString: function() {
            var Q = "rgba(",
                P = O.map(this._rgba, function(R, S) {
                    return R == null ? (S > 2 ? 1 : 0) : R
                });
            if (P[3] === 1) {
                P.pop();
                Q = "rgb("
            }
            return Q + P.join() + ")"
        },
        toHslaString: function() {
            var Q = "hsla(",
                P = O.map(this.hsla(), function(R, S) {
                    if (R == null) {
                        R = S > 2 ? 1 : 0
                    }
                    if (S && S < 3) {
                        R = Math.round(R * 100) + "%"
                    }
                    return R
                });
            if (P[3] === 1) {
                P.pop();
                Q = "hsl("
            }
            return Q + P.join() + ")"
        },
        toHexString: function(P) {
            var Q = this._rgba.slice(),
                R = Q.pop();
            if (P) {
                Q.push(~~(R * 255))
            }
            return "#" + O.map(Q, function(S) {
                S = (S || 0).toString(16);
                return S.length === 1 ? "0" + S : S
            }).join("")
        },
        toString: function() {
            return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
        }
    });
    E.fn.parse.prototype = E.fn;

    function C(R, Q, P) {
        P = (P + 1) % 1;
        if (P * 6 < 1) {
            return R + (Q - R) * P * 6
        }
        if (P * 2 < 1) {
            return Q
        }
        if (P * 3 < 2) {
            return R + (Q - R) * ((2 / 3) - P) * 6
        }
        return R
    }
    J.hsla.to = function(R) {
        if (R[0] == null || R[1] == null || R[2] == null) {
            return [null, null, null, R[3]]
        }
        var P = R[0] / 255,
            U = R[1] / 255,
            V = R[2] / 255,
            X = R[3],
            W = Math.max(P, U, V),
            S = Math.min(P, U, V),
            Y = W - S,
            Z = W + S,
            Q = Z * 0.5,
            T, c;
        if (S === W) {
            T = 0
        } else {
            if (P === W) {
                T = (60 * (U - V) / Y) + 360
            } else {
                if (U === W) {
                    T = (60 * (V - P) / Y) + 120
                } else {
                    T = (60 * (P - U) / Y) + 240
                }
            }
        } if (Y === 0) {
            c = 0
        } else {
            if (Q <= 0.5) {
                c = Y / Z
            } else {
                c = Y / (2 - Z)
            }
        }
        return [Math.round(T) % 360, c, Q, X == null ? 1 : X]
    };
    J.hsla.from = function(T) {
        if (T[0] == null || T[1] == null || T[2] == null) {
            return [null, null, null, T[3]]
        }
        var S = T[0] / 360,
            R = T[1],
            Q = T[2],
            P = T[3],
            U = Q <= 0.5 ? Q * (1 + R) : Q + R - Q * R,
            V = 2 * Q - U;
        return [Math.round(C(V, U, S + (1 / 3)) * 255), Math.round(C(V, U, S) * 255), Math.round(C(V, U, S - (1 / 3)) * 255), P]
    };
    L(J, function(Q, S) {
        var R = S.props,
            P = S.cache,
            U = S.to,
            T = S.from;
        E.fn[Q] = function(Z) {
            if (U && !this[P]) {
                this[P] = U(this._rgba)
            }
            if (Z === D) {
                return this[P].slice()
            }
            var W, Y = O.type(Z),
                V = (Y === "array" || Y === "object") ? Z : arguments,
                X = this[P].slice();
            L(R, function(a, c) {
                var b = V[Y === "object" ? a : c.idx];
                if (b == null) {
                    b = X[c.idx]
                }
                X[c.idx] = I(b, c)
            });
            if (T) {
                W = E(T(X));
                W[P] = X;
                return W
            } else {
                return E(X)
            }
        };
        L(R, function(V, W) {
            if (E.fn[V]) {
                return
            }
            E.fn[V] = function(a) {
                var c = O.type(a),
                    Z = (V === "alpha" ? (this._hsla ? "hsla" : "rgba") : Q),
                    Y = this[Z](),
                    b = Y[W.idx],
                    X;
                if (c === "undefined") {
                    return b
                }
                if (c === "function") {
                    a = a.call(this, b);
                    c = O.type(a)
                }
                if (a == null && W.empty) {
                    return this
                }
                if (c === "string") {
                    X = H.exec(a);
                    if (X) {
                        a = b + parseFloat(X[2]) * (X[1] === "+" ? 1 : -1)
                    }
                }
                Y[W.idx] = a;
                return this[Z](Y)
            }
        })
    });
    E.hook = function(Q) {
        var P = Q.split(" ");
        L(P, function(R, S) {
            O.cssHooks[S] = {
                set: function(W, X) {
                    var U, V, T = "";
                    if (X !== "transparent" && (O.type(X) !== "string" || (U = F(X)))) {
                        X = E(U || X);
                        if (!M.rgba && X._rgba[3] !== 1) {
                            V = S === "backgroundColor" ? W.parentNode : W;
                            while ((T === "" || T === "transparent") && V && V.style) {
                                try {
                                    T = O.css(V, "backgroundColor");
                                    V = V.parentNode
                                } catch (Y) {}
                            }
                            X = X.blend(T && T !== "transparent" ? T : "_default")
                        }
                        X = X.toRgbaString()
                    }
                    try {
                        W.style[S] = X
                    } catch (Y) {}
                }
            };
            O.fx.step[S] = function(T) {
                if (!T.colorInit) {
                    T.start = E(T.elem, S);
                    T.end = E(T.end);
                    T.colorInit = true
                }
                O.cssHooks[S].set(T.elem, T.start.transition(T.end, T.pos))
            }
        })
    };
    E.hook(K);
    O.cssHooks.borderColor = {
        expand: function(Q) {
            var P = {};
            L(["Top", "Right", "Bottom", "Left"], function(S, R) {
                P["border" + R + "Color"] = Q
            });
            return P
        }
    };
    A = O.Color.names = {
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",
        transparent: [null, null, null, 0],
        _default: "#ffffff"
    }
})(jQuery);
/*
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
(function(A) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], A)
    } else {
        A((typeof(jQuery) != "undefined") ? jQuery : window.Zepto)
    }
}(function(F) {
    var C = {};
    C.fileapi = F("<input type='file'/>").get(0).files !== undefined;
    C.formdata = window.FormData !== undefined;
    var E = !! F.fn.prop;
    F.fn.attr2 = function() {
        if (!E) {
            return this.attr.apply(this, arguments)
        }
        var G = this.prop.apply(this, arguments);
        if ((G && G.jquery) || typeof G === "string") {
            return G
        }
        return this.attr.apply(this, arguments)
    };
    F.fn.ajaxSubmit = function(J) {
        if (!this.length) {
            D("ajaxSubmit: skipping submit process - no element selected");
            return this
        }
        var I, b, L, N = this;
        if (typeof J == "function") {
            J = {
                success: J
            }
        } else {
            if (J === undefined) {
                J = {}
            }
        }
        I = J.type || this.attr2("method");
        b = J.url || this.attr2("action");
        L = (typeof b === "string") ? F.trim(b) : "";
        L = L || window.location.href || "";
        if (L) {
            L = (L.match(/^([^#]+)/) || [])[1]
        }
        J = F.extend(true, {
            url: L,
            success: F.ajaxSettings.success,
            type: I || F.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, J);
        var S = {};
        this.trigger("form-pre-serialize", [this, J, S]);
        if (S.veto) {
            D("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
            return this
        }
        if (J.beforeSerialize && J.beforeSerialize(this, J) === false) {
            D("ajaxSubmit: submit aborted via beforeSerialize callback");
            return this
        }
        var M = J.traditional;
        if (M === undefined) {
            M = F.ajaxSettings.traditional
        }
        var Q = [];
        var d, e = this.formToArray(J.semantic, Q);
        if (J.data) {
            J.extraData = J.data;
            d = F.param(J.data, M)
        }
        if (J.beforeSubmit && J.beforeSubmit(e, this, J) === false) {
            D("ajaxSubmit: submit aborted via beforeSubmit callback");
            return this
        }
        this.trigger("form-submit-validate", [e, this, J, S]);
        if (S.veto) {
            D("ajaxSubmit: submit vetoed via form-submit-validate trigger");
            return this
        }
        var W = F.param(e, M);
        if (d) {
            W = (W ? (W + "&" + d) : d)
        }
        if (J.type.toUpperCase() == "GET") {
            J.url += (J.url.indexOf("?") >= 0 ? "&" : "?") + W;
            J.data = null
        } else {
            J.data = W
        }
        var g = [];
        if (J.resetForm) {
            g.push(function() {
                N.resetForm()
            })
        }
        if (J.clearForm) {
            g.push(function() {
                N.clearForm(J.includeHidden)
            })
        }
        if (!J.dataType && J.target) {
            var K = J.success || function() {};
            g.push(function(h) {
                var a = J.replaceTarget ? "replaceWith" : "html";
                F(J.target)[a](h).each(K, arguments)
            })
        } else {
            if (J.success) {
                g.push(J.success)
            }
        }
        J.success = function(l, h, m) {
            var k = J.context || this;
            for (var j = 0, a = g.length; j < a; j++) {
                g[j].apply(k, [l, h, m || N, N])
            }
        };
        if (J.error) {
            var X = J.error;
            J.error = function(k, a, h) {
                var j = J.context || this;
                X.apply(j, [k, a, h, N])
            }
        }
        if (J.complete) {
            var H = J.complete;
            J.complete = function(j, a) {
                var h = J.context || this;
                H.apply(h, [j, a, N])
            }
        }
        var c = F("input[type=file]:enabled", this).filter(function() {
            return F(this).val() !== ""
        });
        var O = c.length > 0;
        var Z = "multipart/form-data";
        var V = (N.attr("enctype") == Z || N.attr("encoding") == Z);
        var U = C.fileapi && C.formdata;
        D("fileAPI :" + U);
        var P = (O || V) && !U;
        var T;
        if (J.iframe !== false && (J.iframe || P)) {
            if (J.closeKeepAlive) {
                F.get(J.closeKeepAlive, function() {
                    T = f(e)
                })
            } else {
                T = f(e)
            }
        } else {
            if ((O || V) && U) {
                T = R(e)
            } else {
                T = F.ajax(J)
            }
        }
        N.removeData("jqxhr").data("jqxhr", T);
        for (var Y = 0; Y < Q.length; Y++) {
            Q[Y] = null
        }
        this.trigger("form-submit-notify", [this, J]);
        return this;

        function G(l) {
            var m = F.param(l, J.traditional).split("&");
            var h = m.length;
            var a = [];
            var k, j;
            for (k = 0; k < h; k++) {
                m[k] = m[k].replace(/\+/g, " ");
                j = m[k].split("=");
                a.push([decodeURIComponent(j[0]), decodeURIComponent(j[1])])
            }
            return a
        }

        function R(j) {
            var h = new FormData();
            for (var k = 0; k < j.length; k++) {
                h.append(j[k].name, j[k].value)
            }
            if (J.extraData) {
                var n = G(J.extraData);
                for (k = 0; k < n.length; k++) {
                    if (n[k]) {
                        h.append(n[k][0], n[k][1])
                    }
                }
            }
            J.data = null;
            var m = F.extend(true, {}, F.ajaxSettings, J, {
                contentType: false,
                processData: false,
                cache: false,
                type: I || "POST"
            });
            if (J.uploadProgress) {
                m.xhr = function() {
                    var a = F.ajaxSettings.xhr();
                    if (a.upload) {
                        a.upload.addEventListener("progress", function(r) {
                            var q = 0;
                            var o = r.loaded || r.position;
                            var p = r.total;
                            if (r.lengthComputable) {
                                q = Math.ceil(o / p * 100)
                            }
                            J.uploadProgress(r, o, p, q)
                        }, false)
                    }
                    return a
                }
            }
            m.data = null;
            var l = m.beforeSend;
            m.beforeSend = function(p, a) {
                if (J.formData) {
                    a.data = J.formData
                } else {
                    a.data = h
                } if (l) {
                    l.call(this, p, a)
                }
            };
            return F.ajax(m)
        }

        function f(AJ) {
            var o = N[0],
                m, AF, z, AH, AC, q, u, r, t, AD, AG, x;
            var AM = F.Deferred();
            AM.abort = function(a) {
                r.abort(a)
            };
            if (AJ) {
                for (AF = 0; AF < Q.length; AF++) {
                    m = F(Q[AF]);
                    if (E) {
                        m.prop("disabled", false)
                    } else {
                        m.removeAttr("disabled")
                    }
                }
            }
            z = F.extend(true, {}, F.ajaxSettings, J);
            z.context = z.context || z;
            AC = "jqFormIO" + (new Date().getTime());
            if (z.iframeTarget) {
                q = F(z.iframeTarget);
                AD = q.attr2("name");
                if (!AD) {
                    q.attr2("name", AC)
                } else {
                    AC = AD
                }
            } else {
                q = F('<iframe name="' + AC + '" src="' + z.iframeSrc + '" />');
                q.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })
            }
            u = q[0];
            r = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {},
                abort: function(a) {
                    var n = (a === "timeout" ? "timeout" : "aborted");
                    D("aborting upload... " + n);
                    this.aborted = 1;
                    try {
                        if (u.contentWindow.document.execCommand) {
                            u.contentWindow.document.execCommand("Stop")
                        }
                    } catch (s) {}
                    q.attr("src", z.iframeSrc);
                    r.error = n;
                    if (z.error) {
                        z.error.call(z.context, r, n, a)
                    }
                    if (AH) {
                        F.event.trigger("ajaxError", [r, z, n])
                    }
                    if (z.complete) {
                        z.complete.call(z.context, r, n)
                    }
                }
            };
            AH = z.global;
            if (AH && 0 === F.active++) {
                F.event.trigger("ajaxStart")
            }
            if (AH) {
                F.event.trigger("ajaxSend", [r, z])
            }
            if (z.beforeSend && z.beforeSend.call(z.context, r, z) === false) {
                if (z.global) {
                    F.active--
                }
                AM.reject();
                return AM
            }
            if (r.aborted) {
                AM.reject();
                return AM
            }
            t = o.clk;
            if (t) {
                AD = t.name;
                if (AD && !t.disabled) {
                    z.extraData = z.extraData || {};
                    z.extraData[AD] = t.value;
                    if (t.type == "image") {
                        z.extraData[AD + ".x"] = o.clk_x;
                        z.extraData[AD + ".y"] = o.clk_y
                    }
                }
            }
            var y = 1;
            var v = 2;

            function w(s) {
                var n = null;
                try {
                    if (s.contentWindow) {
                        n = s.contentWindow.document
                    }
                } catch (a) {
                    D("cannot get iframe.contentWindow document: " + a)
                }
                if (n) {
                    return n
                }
                try {
                    n = s.contentDocument ? s.contentDocument : s.document
                } catch (a) {
                    D("cannot get iframe.contentDocument: " + a);
                    n = s.document
                }
                return n
            }
            var l = F("meta[name=csrf-token]").attr("content");
            var k = F("meta[name=csrf-param]").attr("content");
            if (k && l) {
                z.extraData = z.extraData || {};
                z.extraData[k] = l
            }

            function AE() {
                var AU = N.attr2("target"),
                    AQ = N.attr2("action"),
                    AO = "multipart/form-data",
                    AR = N.attr("enctype") || N.attr("encoding") || AO;
                o.setAttribute("target", AC);
                if (!I || /post/i.test(I)) {
                    o.setAttribute("method", "POST")
                }
                if (AQ != z.url) {
                    o.setAttribute("action", z.url)
                }
                if (!z.skipEncodingOverride && (!I || /post/i.test(I))) {
                    N.attr({
                        encoding: "multipart/form-data",
                        enctype: "multipart/form-data"
                    })
                }
                if (z.timeout) {
                    x = setTimeout(function() {
                        AG = true;
                        AB(y)
                    }, z.timeout)
                }

                function AS() {
                    try {
                        var a = w(u).readyState;
                        D("state = " + a);
                        if (a && a.toLowerCase() == "uninitialized") {
                            setTimeout(AS, 50)
                        }
                    } catch (n) {
                        D("Server abort: ", n, " (", n.name, ")");
                        AB(v);
                        if (x) {
                            clearTimeout(x)
                        }
                        x = undefined
                    }
                }
                var AT = [];
                try {
                    if (z.extraData) {
                        for (var AN in z.extraData) {
                            if (z.extraData.hasOwnProperty(AN)) {
                                if (F.isPlainObject(z.extraData[AN]) && z.extraData[AN].hasOwnProperty("name") && z.extraData[AN].hasOwnProperty("value")) {
                                    AT.push(F('<input type="hidden" name="' + z.extraData[AN].name + '">').val(z.extraData[AN].value).appendTo(o)[0])
                                } else {
                                    AT.push(F('<input type="hidden" name="' + AN + '">').val(z.extraData[AN]).appendTo(o)[0])
                                }
                            }
                        }
                    }
                    if (!z.iframeTarget) {
                        q.appendTo("body")
                    }
                    if (u.attachEvent) {
                        u.attachEvent("onload", AB)
                    } else {
                        u.addEventListener("load", AB, false)
                    }
                    setTimeout(AS, 15);
                    try {
                        o.submit()
                    } catch (AP) {
                        var s = document.createElement("form").submit;
                        s.apply(o)
                    }
                } finally {
                    o.setAttribute("action", AQ);
                    o.setAttribute("enctype", AR);
                    if (AU) {
                        o.setAttribute("target", AU)
                    } else {
                        N.removeAttr("target")
                    }
                    F(AT).remove()
                }
            }
            if (z.forceSync) {
                AE()
            } else {
                setTimeout(AE, 10)
            }
            var AK, AL, AI = 50,
                p;

            function AB(AQ) {
                if (r.aborted || p) {
                    return
                }
                AL = w(u);
                if (!AL) {
                    D("cannot access response document");
                    AQ = v
                }
                if (AQ === y && r) {
                    r.abort("timeout");
                    AM.reject(r, "timeout");
                    return
                } else {
                    if (AQ == v && r) {
                        r.abort("server abort");
                        AM.reject(r, "error", "server abort");
                        return
                    }
                } if (!AL || AL.location.href == z.iframeSrc) {
                    if (!AG) {
                        return
                    }
                }
                if (u.detachEvent) {
                    u.detachEvent("onload", AB)
                } else {
                    u.removeEventListener("load", AB, false)
                }
                var AO = "success",
                    AS;
                try {
                    if (AG) {
                        throw "timeout"
                    }
                    var AN = z.dataType == "xml" || AL.XMLDocument || F.isXMLDoc(AL);
                    D("isXml=" + AN);
                    if (!AN && window.opera && (AL.body === null || !AL.body.innerHTML)) {
                        if (--AI) {
                            D("requeing onLoad callback, DOM not available");
                            setTimeout(AB, 250);
                            return
                        }
                    }
                    var AT = AL.body ? AL.body : AL.documentElement;
                    r.responseText = AT ? AT.innerHTML : null;
                    r.responseXML = AL.XMLDocument ? AL.XMLDocument : AL;
                    if (AN) {
                        z.dataType = "xml"
                    }
                    r.getResponseHeader = function(AW) {
                        var AV = {
                            "content-type": z.dataType
                        };
                        return AV[AW.toLowerCase()]
                    };
                    if (AT) {
                        r.status = Number(AT.getAttribute("status")) || r.status;
                        r.statusText = AT.getAttribute("statusText") || r.statusText
                    }
                    var a = (z.dataType || "").toLowerCase();
                    var AR = /(json|script|text)/.test(a);
                    if (AR || z.textarea) {
                        var AP = AL.getElementsByTagName("textarea")[0];
                        if (AP) {
                            r.responseText = AP.value;
                            r.status = Number(AP.getAttribute("status")) || r.status;
                            r.statusText = AP.getAttribute("statusText") || r.statusText
                        } else {
                            if (AR) {
                                var n = AL.getElementsByTagName("pre")[0];
                                var AU = AL.getElementsByTagName("body")[0];
                                if (n) {
                                    r.responseText = n.textContent ? n.textContent : n.innerText
                                } else {
                                    if (AU) {
                                        r.responseText = AU.textContent ? AU.textContent : AU.innerText
                                    }
                                }
                            }
                        }
                    } else {
                        if (a == "xml" && !r.responseXML && r.responseText) {
                            r.responseXML = AA(r.responseText)
                        }
                    }
                    try {
                        AK = h(r, a, z)
                    } catch (s) {
                        AO = "parsererror";
                        r.error = AS = (s || AO)
                    }
                } catch (s) {
                    D("error caught: ", s);
                    AO = "error";
                    r.error = AS = (s || AO)
                }
                if (r.aborted) {
                    D("upload aborted");
                    AO = null
                }
                if (r.status) {
                    AO = (r.status >= 200 && r.status < 300 || r.status === 304) ? "success" : "error"
                }
                if (AO === "success") {
                    if (z.success) {
                        z.success.call(z.context, AK, "success", r)
                    }
                    AM.resolve(r.responseText, "success", r);
                    if (AH) {
                        F.event.trigger("ajaxSuccess", [r, z])
                    }
                } else {
                    if (AO) {
                        if (AS === undefined) {
                            AS = r.statusText
                        }
                        if (z.error) {
                            z.error.call(z.context, r, AO, AS)
                        }
                        AM.reject(r, "error", AS);
                        if (AH) {
                            F.event.trigger("ajaxError", [r, z, AS])
                        }
                    }
                } if (AH) {
                    F.event.trigger("ajaxComplete", [r, z])
                }
                if (AH && !--F.active) {
                    F.event.trigger("ajaxStop")
                }
                if (z.complete) {
                    z.complete.call(z.context, r, AO)
                }
                p = true;
                if (z.timeout) {
                    clearTimeout(x)
                }
                setTimeout(function() {
                    if (!z.iframeTarget) {
                        q.remove()
                    } else {
                        q.attr("src", z.iframeSrc)
                    }
                    r.responseXML = null
                }, 100)
            }
            var AA = F.parseXML || function(a, n) {
                    if (window.ActiveXObject) {
                        n = new ActiveXObject("Microsoft.XMLDOM");
                        n.async = "false";
                        n.loadXML(a)
                    } else {
                        n = (new DOMParser()).parseFromString(a, "text/xml")
                    }
                    return (n && n.documentElement && n.documentElement.nodeName != "parsererror") ? n : null
                };
            var j = F.parseJSON || function(a) {
                    return window["eval"]("(" + a + ")")
                };
            var h = function(AQ, AO, AN) {
                var n = AQ.getResponseHeader("content-type") || "",
                    a = AO === "xml" || !AO && n.indexOf("xml") >= 0,
                    AP = a ? AQ.responseXML : AQ.responseText;
                if (a && AP.documentElement.nodeName === "parsererror") {
                    if (F.error) {
                        F.error("parsererror")
                    }
                }
                if (AN && AN.dataFilter) {
                    AP = AN.dataFilter(AP, AO)
                }
                if (typeof AP === "string") {
                    if (AO === "json" || !AO && n.indexOf("json") >= 0) {
                        AP = j(AP)
                    } else {
                        if (AO === "script" || !AO && n.indexOf("javascript") >= 0) {
                            F.globalEval(AP)
                        }
                    }
                }
                return AP
            };
            return AM
        }
    };
    F.fn.ajaxForm = function(G) {
        G = G || {};
        G.delegation = G.delegation && F.isFunction(F.fn.on);
        if (!G.delegation && this.length === 0) {
            var H = {
                s: this.selector,
                c: this.context
            };
            if (!F.isReady && H.s) {
                D("DOM not ready, queuing ajaxForm");
                F(function() {
                    F(H.s, H.c).ajaxForm(G)
                });
                return this
            }
            D("terminating; zero elements found by selector" + (F.isReady ? "" : " (DOM not ready)"));
            return this
        }
        if (G.delegation) {
            F(document).off("submit.form-plugin", this.selector, B).off("click.form-plugin", this.selector, A).on("submit.form-plugin", this.selector, G, B).on("click.form-plugin", this.selector, G, A);
            return this
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin", G, B).bind("click.form-plugin", G, A)
    };

    function B(H) {
        var G = H.data;
        if (!H.isDefaultPrevented()) {
            H.preventDefault();
            F(H.target).ajaxSubmit(G)
        }
    }

    function A(K) {
        var J = K.target;
        var H = F(J);
        if (!(H.is("[type=submit],[type=image]"))) {
            var G = H.closest("[type=submit]");
            if (G.length === 0) {
                return
            }
            J = G[0]
        }
        var I = this;
        I.clk = J;
        if (J.type == "image") {
            if (K.offsetX !== undefined) {
                I.clk_x = K.offsetX;
                I.clk_y = K.offsetY
            } else {
                if (typeof F.fn.offset == "function") {
                    var L = H.offset();
                    I.clk_x = K.pageX - L.left;
                    I.clk_y = K.pageY - L.top
                } else {
                    I.clk_x = K.pageX - J.offsetLeft;
                    I.clk_y = K.pageY - J.offsetTop
                }
            }
        }
        setTimeout(function() {
            I.clk = I.clk_x = I.clk_y = null
        }, 100)
    }
    F.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    F.fn.formToArray = function(T, G) {
        var S = [];
        if (this.length === 0) {
            return S
        }
        var J = this[0];
        var V = this.attr("id");
        var N = T ? J.getElementsByTagName("*") : J.elements;
        var W;
        if (N && !/MSIE [678]/.test(navigator.userAgent)) {
            N = F(N).get()
        }
        if (V) {
            W = F(':input[form="' + V + '"]').get();
            if (W.length) {
                N = (N || []).concat(W)
            }
        }
        if (!N || !N.length) {
            return S
        }
        var O, M, L, U, K, Q, I;
        for (O = 0, Q = N.length; O < Q; O++) {
            K = N[O];
            L = K.name;
            if (!L || K.disabled) {
                continue
            }
            if (T && J.clk && K.type == "image") {
                if (J.clk == K) {
                    S.push({
                        name: L,
                        value: F(K).val(),
                        type: K.type
                    });
                    S.push({
                        name: L + ".x",
                        value: J.clk_x
                    }, {
                        name: L + ".y",
                        value: J.clk_y
                    })
                }
                continue
            }
            U = F.fieldValue(K, true);
            if (U && U.constructor == Array) {
                if (G) {
                    G.push(K)
                }
                for (M = 0, I = U.length; M < I; M++) {
                    S.push({
                        name: L,
                        value: U[M]
                    })
                }
            } else {
                if (C.fileapi && K.type == "file") {
                    if (G) {
                        G.push(K)
                    }
                    var H = K.files;
                    if (H.length) {
                        for (M = 0; M < H.length; M++) {
                            S.push({
                                name: L,
                                value: H[M],
                                type: K.type
                            })
                        }
                    } else {
                        S.push({
                            name: L,
                            value: "",
                            type: K.type
                        })
                    }
                } else {
                    if (U !== null && typeof U != "undefined") {
                        if (G) {
                            G.push(K)
                        }
                        S.push({
                            name: L,
                            value: U,
                            type: K.type,
                            required: K.required
                        })
                    }
                }
            }
        }
        if (!T && J.clk) {
            var P = F(J.clk),
                R = P[0];
            L = R.name;
            if (L && !R.disabled && R.type == "image") {
                S.push({
                    name: L,
                    value: P.val()
                });
                S.push({
                    name: L + ".x",
                    value: J.clk_x
                }, {
                    name: L + ".y",
                    value: J.clk_y
                })
            }
        }
        return S
    };
    F.fn.formSerialize = function(G) {
        return F.param(this.formToArray(G))
    };
    F.fn.fieldSerialize = function(H) {
        var G = [];
        this.each(function() {
            var L = this.name;
            if (!L) {
                return
            }
            var J = F.fieldValue(this, H);
            if (J && J.constructor == Array) {
                for (var K = 0, I = J.length; K < I; K++) {
                    G.push({
                        name: L,
                        value: J[K]
                    })
                }
            } else {
                if (J !== null && typeof J != "undefined") {
                    G.push({
                        name: this.name,
                        value: J
                    })
                }
            }
        });
        return F.param(G)
    };
    F.fn.fieldValue = function(L) {
        for (var K = [], I = 0, G = this.length; I < G; I++) {
            var J = this[I];
            var H = F.fieldValue(J, L);
            if (H === null || typeof H == "undefined" || (H.constructor == Array && !H.length)) {
                continue
            }
            if (H.constructor == Array) {
                F.merge(K, H)
            } else {
                K.push(H)
            }
        }
        return K
    };
    F.fieldValue = function(G, M) {
        var I = G.name,
            R = G.type,
            S = G.tagName.toLowerCase();
        if (M === undefined) {
            M = true
        }
        if (M && (!I || G.disabled || R == "reset" || R == "button" || (R == "checkbox" || R == "radio") && !G.checked || (R == "submit" || R == "image") && G.form && G.form.clk != G || S == "select" && G.selectedIndex == -1)) {
            return null
        }
        if (S == "select") {
            var N = G.selectedIndex;
            if (N < 0) {
                return null
            }
            var P = [],
                H = G.options;
            var K = (R == "select-one");
            var O = (K ? N + 1 : H.length);
            for (var J = (K ? N : 0); J < O; J++) {
                var L = H[J];
                if (L.selected) {
                    var Q = L.value;
                    if (!Q) {
                        Q = (L.attributes && L.attributes.value && !(L.attributes.value.specified)) ? L.text : L.value
                    }
                    if (K) {
                        return Q
                    }
                    P.push(Q)
                }
            }
            return P
        }
        return F(G).val()
    };
    F.fn.clearForm = function(G) {
        return this.each(function() {
            F("input,select,textarea", this).clearFields(G)
        })
    };
    F.fn.clearFields = F.fn.clearInputs = function(G) {
        var H = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var J = this.type,
                I = this.tagName.toLowerCase();
            if (H.test(J) || I == "textarea") {
                this.value = ""
            } else {
                if (J == "checkbox" || J == "radio") {
                    this.checked = false
                } else {
                    if (I == "select") {
                        this.selectedIndex = -1
                    } else {
                        if (J == "file") {
                            if (/MSIE/.test(navigator.userAgent)) {
                                F(this).replaceWith(F(this).clone(true))
                            } else {
                                F(this).val("")
                            }
                        } else {
                            if (G) {
                                if ((G === true && /hidden/.test(J)) || (typeof G == "string" && F(this).is(G))) {
                                    this.value = ""
                                }
                            }
                        }
                    }
                }
            }
        })
    };
    F.fn.resetForm = function() {
        return this.each(function() {
            if (typeof this.reset == "function" || (typeof this.reset == "object" && !this.reset.nodeType)) {
                this.reset()
            }
        })
    };
    F.fn.enable = function(G) {
        if (G === undefined) {
            G = true
        }
        return this.each(function() {
            this.disabled = !G
        })
    };
    F.fn.selected = function(G) {
        if (G === undefined) {
            G = true
        }
        return this.each(function() {
            var H = this.type;
            if (H == "checkbox" || H == "radio") {
                this.checked = G
            } else {
                if (this.tagName.toLowerCase() == "option") {
                    var I = F(this).parent("select");
                    if (G && I[0] && I[0].type == "select-one") {
                        I.find("option").selected(false)
                    }
                    this.selected = G
                }
            }
        })
    };
    F.fn.ajaxSubmit.debug = false;

    function D() {
        if (!F.fn.ajaxSubmit.debug) {
            return
        }
        var G = "[jquery.form] " + Array.prototype.join.call(arguments, "");
        if (window.console && window.console.log) {
            window.console.log(G)
        } else {
            if (window.opera && window.opera.postError) {
                window.opera.postError(G)
            }
        }
    }
}));
/*
	Colorbox v1.5.9 - 2014-04-25
	jQuery lightbox and modal window plugin
	(c) 2014 Jack Moore - http://www.jacklmoore.com/colorbox
	license: http://www.opensource.org/licenses/mit-license.php
*/
(function(o, L, AC) {
    var q = {
        html: false,
        photo: false,
        iframe: false,
        inline: false,
        transition: "elastic",
        speed: 300,
        fadeOut: 300,
        width: false,
        initialWidth: "600",
        innerWidth: false,
        maxWidth: false,
        height: false,
        initialHeight: "450",
        innerHeight: false,
        maxHeight: false,
        scalePhotos: true,
        scrolling: true,
        opacity: 0.9,
        preloading: true,
        className: false,
        overlayClose: true,
        escKey: true,
        arrowKey: true,
        top: false,
        bottom: false,
        left: false,
        right: false,
        fixed: false,
        data: undefined,
        closeButton: true,
        fastIframe: true,
        open: false,
        reposition: true,
        loop: true,
        slideshow: false,
        slideshowAuto: true,
        slideshowSpeed: 2500,
        slideshowStart: "start slideshow",
        slideshowStop: "stop slideshow",
        photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
        retinaImage: false,
        retinaUrl: false,
        retinaSuffix: "@2x.$1",
        current: "image {current} of {total}",
        previous: "previous",
        next: "next",
        close: "close",
        xhrError: "This content failed to load.",
        imgError: "This image failed to load.",
        returnFocus: true,
        trapFocus: true,
        onOpen: false,
        onLoad: false,
        onComplete: false,
        onCleanup: false,
        onClosed: false,
        rel: function() {
            return this.rel
        },
        href: function() {
            return o(this).attr("href")
        },
        title: function() {
            return this.title
        }
    }, X = "colorbox",
        y = "cbox",
        S = y + "Element",
        AB = y + "_open",
        E = y + "_load",
        z = y + "_complete",
        W = y + "_cleanup",
        AI = y + "_closed",
        I = y + "_purge",
        w, AM, AN, D, m, Q, B, v, C, AG, t, K, H, P, V, AD, U, x, Z, c, k = o("<a/>"),
        AK, AO, N, G, A, n, O, e, AE, s, a, r, AJ = "div",
        h = 0,
        AF = {}, AH;

    function l(AP, AS, AR) {
        var AQ = L.createElement(AP);
        if (AS) {
            AQ.id = y + AS
        }
        if (AR) {
            AQ.style.cssText = AR
        }
        return o(AQ)
    }

    function T() {
        return AC.innerHeight ? AC.innerHeight : o(AC).height()
    }

    function b(AQ, AP) {
        if (AP !== Object(AP)) {
            AP = {}
        }
        this.cache = {};
        this.el = AQ;
        this.value = function(AR) {
            var AS;
            if (this.cache[AR] === undefined) {
                AS = o(this.el).attr("data-cbox-" + AR);
                if (AS !== undefined) {
                    this.cache[AR] = AS
                } else {
                    if (AP[AR] !== undefined) {
                        this.cache[AR] = AP[AR]
                    } else {
                        if (q[AR] !== undefined) {
                            this.cache[AR] = q[AR]
                        }
                    }
                }
            }
            return this.cache[AR]
        };
        this.get = function(AR) {
            var AS = this.value(AR);
            return o.isFunction(AS) ? AS.call(this.el, this) : AS
        }
    }

    function g(AQ) {
        var AP = C.length,
            AR = (n + AQ) % AP;
        return (AR < 0) ? AP + AR : AR
    }

    function u(AP, AQ) {
        return Math.round((/%/.test(AP) ? ((AQ === "x" ? AG.width() : T()) / 100) : 1) * parseInt(AP, 10))
    }

    function d(AQ, AP) {
        return AQ.get("photo") || AQ.get("photoRegex").test(AP)
    }

    function f(AQ, AP) {
        return AQ.get("retinaUrl") && AC.devicePixelRatio > 1 ? AP.replace(AQ.get("photoRegex"), AQ.get("retinaSuffix")) : AP
    }

    function AL(AP) {
        if ("contains" in AM[0] && !AM[0].contains(AP.target) && AP.target !== w[0]) {
            AP.stopPropagation();
            AM.focus()
        }
    }

    function M(AP) {
        if (M.str !== AP) {
            AM.add(w).removeClass(M.str).addClass(AP);
            M.str = AP
        }
    }

    function p(AP) {
        n = 0;
        if (AP && AP !== false && AP !== "nofollow") {
            C = o("." + S).filter(function() {
                var AQ = o.data(this, X);
                var AR = new b(this, AQ);
                return (AR.get("rel") === AP)
            });
            n = C.index(AK.el);
            if (n === -1) {
                C = C.add(AK.el);
                n = C.length - 1
            }
        } else {
            C = o(AK.el)
        }
    }

    function j(AP) {
        o(L).trigger(AP);
        k.triggerHandler(AP)
    }
    var Y = (function() {
        var AQ, AT = y + "Slideshow_",
            AX = "click." + y,
            AV;

        function AR() {
            clearTimeout(AV)
        }

        function AW() {
            if (AK.get("loop") || C[n + 1]) {
                AR();
                AV = setTimeout(r.next, AK.get("slideshowSpeed"))
            }
        }

        function AP() {
            AD.html(AK.get("slideshowStop")).unbind(AX).one(AX, AU);
            k.bind(z, AW).bind(E, AR);
            AM.removeClass(AT + "off").addClass(AT + "on")
        }

        function AU() {
            AR();
            k.unbind(z, AW).unbind(E, AR);
            AD.html(AK.get("slideshowStart")).unbind(AX).one(AX, function() {
                r.next();
                AP()
            });
            AM.removeClass(AT + "on").addClass(AT + "off")
        }

        function AS() {
            AQ = false;
            AD.hide();
            AR();
            k.unbind(z, AW).unbind(E, AR);
            AM.removeClass(AT + "off " + AT + "on")
        }
        return function() {
            if (AQ) {
                if (!AK.get("slideshow")) {
                    k.unbind(W, AS);
                    AS()
                }
            } else {
                if (AK.get("slideshow") && C[1]) {
                    AQ = true;
                    k.one(W, AS);
                    if (AK.get("slideshowAuto")) {
                        AP()
                    } else {
                        AU()
                    }
                    AD.show()
                }
            }
        }
    }());

    function F(AQ) {
        var AP;
        if (!s) {
            AP = o(AQ).data("colorbox");
            AK = new b(AQ, AP);
            p(AK.get("rel"));
            if (!e) {
                e = AE = true;
                M(AK.get("className"));
                AM.css({
                    visibility: "hidden",
                    display: "block",
                    opacity: ""
                });
                t = l(AJ, "LoadedContent", "width:0; height:0; overflow:hidden; visibility:hidden");
                D.css({
                    width: "",
                    height: ""
                }).append(t);
                AO = m.height() + v.height() + D.outerHeight(true) - D.height();
                N = Q.width() + B.width() + D.outerWidth(true) - D.width();
                G = t.outerHeight(true);
                A = t.outerWidth(true);
                var AU = u(AK.get("initialWidth"), "x");
                var AR = u(AK.get("initialHeight"), "y");
                var AT = AK.get("maxWidth");
                var AS = AK.get("maxHeight");
                AK.w = (AT !== false ? Math.min(AU, u(AT, "x")) : AU) - A - N;
                AK.h = (AS !== false ? Math.min(AR, u(AS, "y")) : AR) - G - AO;
                t.css({
                    width: "",
                    height: AK.h
                });
                r.position();
                j(AB);
                AK.get("onOpen");
                c.add(P).hide();
                AM.focus();
                if (AK.get("trapFocus")) {
                    if (L.addEventListener) {
                        L.addEventListener("focus", AL, true);
                        k.one(AI, function() {
                            L.removeEventListener("focus", AL, true)
                        })
                    }
                }
                if (AK.get("returnFocus")) {
                    k.one(AI, function() {
                        o(AK.el).focus()
                    })
                }
            }
            w.css({
                opacity: parseFloat(AK.get("opacity")) || "",
                cursor: AK.get("overlayClose") ? "pointer" : "",
                visibility: "visible"
            }).show();
            if (AK.get("closeButton")) {
                Z.html(AK.get("close")).appendTo(D)
            } else {
                Z.appendTo("<div/>")
            }
            AA()
        }
    }

    function R() {
        if (!AM && L.body) {
            AH = false;
            AG = o(AC);
            AM = l(AJ).attr({
                id: X,
                "class": o.support.opacity === false ? y + "IE" : "",
                role: "dialog",
                tabindex: "-1"
            }).hide();
            w = l(AJ, "Overlay").hide();
            H = o([l(AJ, "LoadingOverlay")[0], l(AJ, "LoadingGraphic")[0]]);
            AN = l(AJ, "Wrapper");
            D = l(AJ, "Content").append(P = l(AJ, "Title"), V = l(AJ, "Current"), x = o('<button type="button"/>').attr({
                id: y + "Previous"
            }), U = o('<button type="button"/>').attr({
                id: y + "Next"
            }), AD = l("button", "Slideshow"), H);
            Z = o('<button type="button"/>').attr({
                id: y + "Close"
            });
            AN.append(l(AJ).append(l(AJ, "TopLeft"), m = l(AJ, "TopCenter"), l(AJ, "TopRight")), l(AJ, false, "clear:left").append(Q = l(AJ, "MiddleLeft"), D, B = l(AJ, "MiddleRight")), l(AJ, false, "clear:left").append(l(AJ, "BottomLeft"), v = l(AJ, "BottomCenter"), l(AJ, "BottomRight"))).find("div div").css({
                "float": "left"
            });
            K = l(AJ, false, "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;");
            c = U.add(x).add(V).add(AD);
            o(L.body).append(w, AM.append(AN, K))
        }
    }

    function J() {
        function AP(AQ) {
            if (!(AQ.which > 1 || AQ.shiftKey || AQ.altKey || AQ.metaKey || AQ.ctrlKey)) {
                AQ.preventDefault();
                F(this)
            }
        }
        if (AM) {
            if (!AH) {
                AH = true;
                U.click(function() {
                    r.next()
                });
                x.click(function() {
                    r.prev()
                });
                Z.click(function() {
                    r.close()
                });
                w.click(function() {
                    if (AK.get("overlayClose")) {
                        r.close()
                    }
                });
                o(L).bind("keydown." + y, function(AR) {
                    var AQ = AR.keyCode;
                    if (e && AK.get("escKey") && AQ === 27) {
                        AR.preventDefault();
                        r.close()
                    }
                    if (e && AK.get("arrowKey") && C[1] && !AR.altKey) {
                        if (AQ === 37) {
                            AR.preventDefault();
                            x.click()
                        } else {
                            if (AQ === 39) {
                                AR.preventDefault();
                                U.click()
                            }
                        }
                    }
                });
                if (o.isFunction(o.fn.on)) {
                    o(L).on("click." + y, "." + S, AP)
                } else {
                    o("." + S).live("click." + y, AP)
                }
            }
            return true
        }
        return false
    }
    if (o.colorbox) {
        return
    }
    o(R);
    r = o.fn[X] = o[X] = function(AP, AS) {
        var AQ;
        var AR = this;
        AP = AP || {};
        if (o.isFunction(AR)) {
            AR = o("<a/>");
            AP.open = true
        } else {
            if (!AR[0]) {
                return AR
            }
        } if (!AR[0]) {
            return AR
        }
        R();
        if (J()) {
            if (AS) {
                AP.onComplete = AS
            }
            AR.each(function() {
                var AT = o.data(this, X) || {};
                o.data(this, X, o.extend(AT, AP))
            }).addClass(S);
            AQ = new b(AR[0], AP);
            if (AQ.get("open")) {
                F(AR[0])
            }
        }
        return AR
    };
    r.position = function(AR, AT) {
        var AW, AY = 0,
            AQ = 0,
            AU = AM.offset(),
            AP, AS;
        AG.unbind("resize." + y);
        AM.css({
            top: -90000,
            left: -90000
        });
        AP = AG.scrollTop();
        AS = AG.scrollLeft();
        if (AK.get("fixed")) {
            AU.top -= AP;
            AU.left -= AS;
            AM.css({
                position: "fixed"
            })
        } else {
            AY = AP;
            AQ = AS;
            AM.css({
                position: "absolute"
            })
        } if (AK.get("right") !== false) {
            AQ += Math.max(AG.width() - AK.w - A - N - u(AK.get("right"), "x"), 0)
        } else {
            if (AK.get("left") !== false) {
                AQ += u(AK.get("left"), "x")
            } else {
                AQ += Math.round(Math.max(AG.width() - AK.w - A - N, 0) / 2)
            }
        } if (AK.get("bottom") !== false) {
            AY += Math.max(T() - AK.h - G - AO - u(AK.get("bottom"), "y"), 0)
        } else {
            if (AK.get("top") !== false) {
                AY += u(AK.get("top"), "y")
            } else {
                AY += Math.round(Math.max(T() - AK.h - G - AO, 0) / 2)
            }
        }
        AM.css({
            top: AU.top,
            left: AU.left,
            visibility: "visible"
        });
        AN[0].style.width = AN[0].style.height = "9999px";

        function AX() {
            m[0].style.width = v[0].style.width = D[0].style.width = (parseInt(AM[0].style.width, 10) - N) + "px";
            D[0].style.height = Q[0].style.height = B[0].style.height = (parseInt(AM[0].style.height, 10) - AO) + "px"
        }
        AW = {
            width: AK.w + A + N,
            height: AK.h + G + AO,
            top: AY,
            left: AQ
        };
        if (AR) {
            var AV = 0;
            o.each(AW, function(AZ) {
                if (AW[AZ] !== AF[AZ]) {
                    AV = AR;
                    return
                }
            });
            AR = AV
        }
        AF = AW;
        if (!AR) {
            AM.css(AW)
        }
        AM.dequeue().animate(AW, {
            duration: AR || 0,
            complete: function() {
                AX();
                AE = false;
                AN[0].style.width = (AK.w + A + N) + "px";
                AN[0].style.height = (AK.h + G + AO) + "px";
                if (AK.get("reposition")) {
                    setTimeout(function() {
                        AG.bind("resize." + y, r.position)
                    }, 1)
                }
                if (AT) {
                    AT()
                }
            },
            step: AX
        })
    };
    r.resize = function(AQ) {
        var AP;
        if (e) {
            AQ = AQ || {};
            if (AQ.width) {
                AK.w = u(AQ.width, "x") - A - N
            }
            if (AQ.innerWidth) {
                AK.w = u(AQ.innerWidth, "x")
            }
            t.css({
                width: AK.w
            });
            if (AQ.height) {
                AK.h = u(AQ.height, "y") - G - AO
            }
            if (AQ.innerHeight) {
                AK.h = u(AQ.innerHeight, "y")
            }
            if (!AQ.innerHeight && !AQ.height) {
                AP = t.scrollTop();
                t.css({
                    height: "auto"
                });
                AK.h = t.height()
            }
            t.css({
                height: AK.h
            });
            if (AP) {
                t.scrollTop(AP)
            }
            r.position(AK.get("transition") === "none" ? 0 : AK.get("speed"))
        }
    };
    r.prep = function(AQ) {
        if (!e) {
            return
        }
        var AT, AR = AK.get("transition") === "none" ? 0 : AK.get("speed");
        t.remove();
        t = l(AJ, "LoadedContent").append(AQ);

        function AP() {
            AK.w = AK.w || t.width();
            AK.w = AK.mw && AK.mw < AK.w ? AK.mw : AK.w;
            return AK.w
        }

        function AS() {
            AK.h = AK.h || t.height();
            AK.h = AK.mh && AK.mh < AK.h ? AK.mh : AK.h;
            return AK.h
        }
        t.hide().appendTo(K.show()).css({
            width: AP(),
            overflow: AK.get("scrolling") ? "auto" : "hidden"
        }).css({
            height: AS()
        }).prependTo(D);
        K.hide();
        o(O).css({
            "float": "none"
        });
        M(AK.get("className"));
        AT = function() {
            var AW = C.length,
                AV, AU;
            if (!e) {
                return
            }

            function AX() {
                if (o.support.opacity === false) {
                    AM[0].style.removeAttribute("filter")
                }
            }
            AU = function() {
                clearTimeout(a);
                H.hide();
                j(z);
                AK.get("onComplete")
            };
            P.html(AK.get("title")).show();
            t.show();
            if (AW > 1) {
                if (typeof AK.get("current") === "string") {
                    V.html(AK.get("current").replace("{current}", n + 1).replace("{total}", AW)).show()
                }
                U[(AK.get("loop") || n < AW - 1) ? "show" : "hide"]().html(AK.get("next"));
                x[(AK.get("loop") || n) ? "show" : "hide"]().html(AK.get("previous"));
                Y();
                if (AK.get("preloading")) {
                    o.each([g(-1), g(1)], function() {
                        var AY, AZ = C[this],
                            Aa = new b(AZ, o.data(AZ, X)),
                            Ab = Aa.get("href");
                        if (Ab && d(Aa, Ab)) {
                            Ab = f(Aa, Ab);
                            AY = L.createElement("img");
                            AY.src = Ab
                        }
                    })
                }
            } else {
                c.hide()
            } if (AK.get("iframe")) {
                AV = L.createElement("iframe");
                if ("frameBorder" in AV) {
                    AV.frameBorder = 0
                }
                if ("allowTransparency" in AV) {
                    AV.allowTransparency = "true"
                }
                if (!AK.get("scrolling")) {
                    AV.scrolling = "no"
                }
                o(AV).attr({
                    src: AK.get("href"),
                    name: (new Date()).getTime(),
                    "class": y + "Iframe",
                    allowFullScreen: true
                }).one("load", AU).appendTo(t);
                k.one(I, function() {
                    AV.src = "//about:blank"
                });
                if (AK.get("fastIframe")) {
                    o(AV).trigger("load")
                }
            } else {
                AU()
            } if (AK.get("transition") === "fade") {
                AM.fadeTo(AR, 1, AX)
            } else {
                AX()
            }
        };
        if (AK.get("transition") === "fade") {
            AM.fadeTo(AR, 0, function() {
                r.position(0, AT)
            })
        } else {
            r.position(AR, AT)
        }
    };

    function AA() {
        var AS, AT, AR = r.prep,
            AQ, AU = ++h;
        AE = true;
        O = false;
        j(I);
        j(E);
        AK.get("onLoad");
        AK.h = AK.get("height") ? u(AK.get("height"), "y") - G - AO : AK.get("innerHeight") && u(AK.get("innerHeight"), "y");
        AK.w = AK.get("width") ? u(AK.get("width"), "x") - A - N : AK.get("innerWidth") && u(AK.get("innerWidth"), "x");
        AK.mw = AK.w;
        AK.mh = AK.h;
        if (AK.get("maxWidth")) {
            AK.mw = u(AK.get("maxWidth"), "x") - A - N;
            AK.mw = AK.w && AK.w < AK.mw ? AK.w : AK.mw
        }
        if (AK.get("maxHeight")) {
            AK.mh = u(AK.get("maxHeight"), "y") - G - AO;
            AK.mh = AK.h && AK.h < AK.mh ? AK.h : AK.mh
        }
        AS = AK.get("href");
        a = setTimeout(function() {
            H.show()
        }, 100);
        if (AK.get("inline")) {
            var AP = o(AS);
            AQ = o("<div>").hide().insertBefore(AP);
            k.one(I, function() {
                AQ.replaceWith(AP)
            });
            AR(AP)
        } else {
            if (AK.get("iframe")) {
                AR(" ")
            } else {
                if (AK.get("html")) {
                    AR(AK.get("html"))
                } else {
                    if (d(AK, AS)) {
                        AS = f(AK, AS);
                        O = new Image();
                        o(O).addClass(y + "Photo").bind("error", function() {
                            AR(l(AJ, "Error").html(AK.get("imgError")))
                        }).one("load", function() {
                            if (AU !== h) {
                                return
                            }
                            setTimeout(function() {
                                var AV;
                                o.each(["alt", "longdesc", "aria-describedby"], function(AX, AY) {
                                    var AW = o(AK.el).attr(AY) || o(AK.el).attr("data-" + AY);
                                    if (AW) {
                                        O.setAttribute(AY, AW)
                                    }
                                });
                                if (AK.get("retinaImage") && AC.devicePixelRatio > 1) {
                                    O.height = O.height / AC.devicePixelRatio;
                                    O.width = O.width / AC.devicePixelRatio
                                }
                                if (AK.get("scalePhotos")) {
                                    AT = function() {
                                        O.height -= O.height * AV;
                                        O.width -= O.width * AV
                                    };
                                    if (AK.mw && O.width > AK.mw) {
                                        AV = (O.width - AK.mw) / O.width;
                                        AT()
                                    }
                                    if (AK.mh && O.height > AK.mh) {
                                        AV = (O.height - AK.mh) / O.height;
                                        AT()
                                    }
                                }
                                if (AK.h) {
                                    O.style.marginTop = Math.max(AK.mh - O.height, 0) / 2 + "px"
                                }
                                if (C[1] && (AK.get("loop") || C[n + 1])) {
                                    O.style.cursor = "pointer";
                                    O.onclick = function() {
                                        r.next()
                                    }
                                }
                                O.style.width = O.width + "px";
                                O.style.height = O.height + "px";
                                AR(O)
                            }, 1)
                        });
                        O.src = AS
                    } else {
                        if (AS) {
                            K.load(AS, AK.get("data"), function(AW, AV) {
                                if (AU === h) {
                                    AR(AV === "error" ? l(AJ, "Error").html(AK.get("xhrError")) : o(this).contents())
                                }
                            })
                        }
                    }
                }
            }
        }
    }
    r.next = function() {
        if (!AE && C[1] && (AK.get("loop") || C[n + 1])) {
            n = g(1);
            F(C[n])
        }
    };
    r.prev = function() {
        if (!AE && C[1] && (AK.get("loop") || n)) {
            n = g(-1);
            F(C[n])
        }
    };
    r.close = function() {
        if (e && !s) {
            s = true;
            e = false;
            j(W);
            AK.get("onCleanup");
            AG.unbind("." + y);
            w.fadeTo(AK.get("fadeOut") || 0, 0);
            AM.stop().fadeTo(AK.get("fadeOut") || 0, 0, function() {
                AM.hide();
                w.hide();
                j(I);
                t.remove();
                setTimeout(function() {
                    s = false;
                    j(AI);
                    AK.get("onClosed")
                }, 1)
            })
        }
    };
    r.remove = function() {
        if (!AM) {
            return
        }
        AM.stop();
        o.colorbox.close();
        AM.stop(false, true).remove();
        w.remove();
        s = false;
        AM = null;
        o("." + S).removeData(X).removeClass(S);
        o(L).unbind("click." + y).unbind("keydown." + y)
    };
    r.element = function() {
        return o(AK.el)
    };
    r.settings = q
}(jQuery, document, window));
/*
 * jQuery UI Core 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
(function(B, F) {
    var A = 0,
        E = /^ui-id-\d+$/;
    B.ui = B.ui || {};
    B.extend(B.ui, {
        version: "1.10.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    B.fn.extend({
        focus: (function(G) {
            return function(H, I) {
                return typeof H === "number" ? this.each(function() {
                    var J = this;
                    setTimeout(function() {
                        B(J).focus();
                        if (I) {
                            I.call(J)
                        }
                    }, H)
                }) : G.apply(this, arguments)
            }
        })(B.fn.focus),
        scrollParent: function() {
            var G;
            if ((B.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                G = this.parents().filter(function() {
                    return (/(relative|absolute|fixed)/).test(B.css(this, "position")) && (/(auto|scroll)/).test(B.css(this, "overflow") + B.css(this, "overflow-y") + B.css(this, "overflow-x"))
                }).eq(0)
            } else {
                G = this.parents().filter(function() {
                    return (/(auto|scroll)/).test(B.css(this, "overflow") + B.css(this, "overflow-y") + B.css(this, "overflow-x"))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !G.length ? B(document) : G
        },
        zIndex: function(J) {
            if (J !== F) {
                return this.css("zIndex", J)
            }
            if (this.length) {
                var H = B(this[0]),
                    G, I;
                while (H.length && H[0] !== document) {
                    G = H.css("position");
                    if (G === "absolute" || G === "relative" || G === "fixed") {
                        I = parseInt(H.css("zIndex"), 10);
                        if (!isNaN(I) && I !== 0) {
                            return I
                        }
                    }
                    H = H.parent()
                }
            }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                if (!this.id) {
                    this.id = "ui-id-" + (++A)
                }
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                if (E.test(this.id)) {
                    B(this).removeAttr("id")
                }
            })
        }
    });

    function D(I, G) {
        var K, J, H, L = I.nodeName.toLowerCase();
        if ("area" === L) {
            K = I.parentNode;
            J = K.name;
            if (!I.href || !J || K.nodeName.toLowerCase() !== "map") {
                return false
            }
            H = B("img[usemap=#" + J + "]")[0];
            return !!H && C(H)
        }
        return (/input|select|textarea|button|object/.test(L) ? !I.disabled : "a" === L ? I.href || G : G) && C(I)
    }

    function C(G) {
        return B.expr.filters.visible(G) && !B(G).parents().addBack().filter(function() {
            return B.css(this, "visibility") === "hidden"
        }).length
    }
    B.extend(B.expr[":"], {
        data: B.expr.createPseudo ? B.expr.createPseudo(function(G) {
            return function(H) {
                return !!B.data(H, G)
            }
        }) : function(I, H, G) {
            return !!B.data(I, G[3])
        },
        focusable: function(G) {
            return D(G, !isNaN(B.attr(G, "tabindex")))
        },
        tabbable: function(I) {
            var G = B.attr(I, "tabindex"),
                H = isNaN(G);
            return (H || G >= 0) && D(I, !H)
        }
    });
    if (!B("<a>").outerWidth(1).jquery) {
        B.each(["Width", "Height"], function(I, G) {
            var H = G === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                J = G.toLowerCase(),
                L = {
                    innerWidth: B.fn.innerWidth,
                    innerHeight: B.fn.innerHeight,
                    outerWidth: B.fn.outerWidth,
                    outerHeight: B.fn.outerHeight
                };

            function K(O, N, M, P) {
                B.each(H, function() {
                    N -= parseFloat(B.css(O, "padding" + this)) || 0;
                    if (M) {
                        N -= parseFloat(B.css(O, "border" + this + "Width")) || 0
                    }
                    if (P) {
                        N -= parseFloat(B.css(O, "margin" + this)) || 0
                    }
                });
                return N
            }
            B.fn["inner" + G] = function(M) {
                if (M === F) {
                    return L["inner" + G].call(this)
                }
                return this.each(function() {
                    B(this).css(J, K(this, M) + "px")
                })
            };
            B.fn["outer" + G] = function(M, N) {
                if (typeof M !== "number") {
                    return L["outer" + G].call(this, M)
                }
                return this.each(function() {
                    B(this).css(J, K(this, M, true, N) + "px")
                })
            }
        })
    }
    if (!B.fn.addBack) {
        B.fn.addBack = function(G) {
            return this.add(G == null ? this.prevObject : this.prevObject.filter(G))
        }
    }
    if (B("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        B.fn.removeData = (function(G) {
            return function(H) {
                if (arguments.length) {
                    return G.call(this, B.camelCase(H))
                } else {
                    return G.call(this)
                }
            }
        })(B.fn.removeData)
    }
    B.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    B.support.selectstart = "onselectstart" in document.createElement("div");
    B.fn.extend({
        disableSelection: function() {
            return this.bind((B.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(G) {
                G.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    });
    B.extend(B.ui, {
        plugin: {
            add: function(H, I, K) {
                var G, J = B.ui[H].prototype;
                for (G in K) {
                    J.plugins[G] = J.plugins[G] || [];
                    J.plugins[G].push([I, K[G]])
                }
            },
            call: function(G, I, H) {
                var J, K = G.plugins[I];
                if (!K || !G.element[0].parentNode || G.element[0].parentNode.nodeType === 11) {
                    return
                }
                for (J = 0; J < K.length; J++) {
                    if (G.options[K[J][0]]) {
                        K[J][1].apply(G.element, H)
                    }
                }
            }
        },
        hasScroll: function(J, H) {
            if (B(J).css("overflow") === "hidden") {
                return false
            }
            var G = (H && H === "left") ? "scrollLeft" : "scrollTop",
                I = false;
            if (J[G] > 0) {
                return true
            }
            J[G] = 1;
            I = (J[G] > 0);
            J[G] = 0;
            return I
        }
    })
})(jQuery);
(function(A) {
    A.fn.extend({
        dialog: function(H, C) {
            if (typeof H == "object" || typeof H == "undefined" || A.isFunction(H)) {
                C = H;
                if (A.isFunction(C)) {
                    C = {
                        start: C
                    }
                }
                H = false
            }
            if (A.isFunction(C)) {
                C = {
                    success: C
                }
            }
            var E = false;
            var G = A.extend({
                start: function() {},
                confirmed: false,
                success: function() {},
                error: function() {},
                auto_link: true,
                target: ".dialog",
                finished: function() {},
                overlayClose: true,
                select_value: -1
            }, C);
            var D = function(M) {
                var I = function() {
                    A.colorbox.resize()
                };
                var K = function() {
                    if (G.auto_link) {
                        A("#cboxLoadedContent " + G.target + " a").unbind("click").click(function() {
                            L(A(this).attr("href"));
                            return false
                        })
                    }
                    A("#cboxLoadedContent " + G.target + " .done").unbind("click").click(function() {
                        A.colorbox.close();
                        G.finished(G.target);
                        return false
                    });
                    G.start(A("#cboxLoadedContent " + G.target), {
                        resize: I,
                        reload: L,
                        refresh: J
                    })
                };
                var J = function(N) {
                    A.colorbox({
                        html: N,
                        open: true,
                        inline: false,
                        scrolling: false,
                        opacity: PollDaddy.opacity,
                        onComplete: K,
                        overlayClose: G.overlayClose
                    })
                };
                var L = function(N) {
                    if (N.indexOf("?") == -1) {
                        N += "?popup=1"
                    } else {
                        N += "&popup=1"
                    }
                    A.colorbox({
                        inline: false,
                        open: true,
                        opacity: PollDaddy.opacity,
                        scrolling: false,
                        close: "",
                        href: N,
                        html: false,
                        onComplete: K,
                        overlayClose: G.overlayClose
                    })
                };
                E = M;
                L(A(M).attr("href"));
                return false
            };
            var F = function(I) {
                E = I;
                G.start(A(I), A(H));
                A(H).find("a.confirm").unbind("click").click(function() {
                    A.colorbox.close();
                    if (G.confirmed === false) {
                        A(E).unbind("click");
                        A(E).click()
                    } else {
                        G.confirmed(E)
                    }
                    return false
                });
                A(H).find("a.cancel").unbind("click").click(function() {
                    A.colorbox.close();
                    return false
                });
                A(H).find("form").ajaxForm({
                    beforeSubmit: function() {
                        A(H).find(".loader").show();
                        A(H).find(".editor-buttons").hide()
                    },
                    success: function(J) {
                        A(H).find(".loader").hide();
                        A(H).find(".editor-buttons").show();
                        if (PollDaddy.is_fatal(J)) {
                            G.error(J, E)
                        } else {
                            G.success(J, E);
                            A.colorbox.close()
                        }
                    }
                });
                A.colorbox({
                    inline: true,
                    open: true,
                    opacity: PollDaddy.opacity,
                    scrolling: false,
                    close: "",
                    href: A(H),
                    html: false,
                    speed: 0,
                    onComplete: function() {}
                });
                return false
            };
            A(H).find(".list li").unbind("click").click(function(J) {
                J.stopPropagation();
                if (A(J.target).is("input") && !A(J.target).is(":disabled")) {
                    A(this).toggleClass("selected")
                } else {
                    var I = A(this).find("div#row input");
                    if (I.is(":disabled")) {
                        return false
                    }
                    if (I.is(":checked")) {
                        A(this).removeClass("selected");
                        I.prop("checked", false)
                    } else {
                        A(this).addClass("selected");
                        I.prop("checked", true)
                    }
                }
                A(".list ul").trigger("listClicked")
            });
            var B = F;
            if (H === false) {
                B = D
            }
            return this.each(function() {
                if (this.type == "select-one") {
                    A(this).unbind("change").change(function() {
                        if (A(this).val() == G.select_value) {
                            return B(this)
                        }
                    })
                } else {
                    A(this).unbind("click").click(function() {
                        return B(this)
                    })
                }
            })
        }
    })
})(jQuery);
(function(A) {
    A(document).ready(function() {
        A(".dismiss").on("click", function(C) {
            C.preventDefault();
            if (A(this).attr("href") != "#") {
                A.get(A(this).attr("href"))
            }
            A(this).closest(".notice-container").remove()
        });
        A(".javascript").show();
        A(".basic").hide();
        A("a.print-popup").click(function() {
            window.print();
            return false
        });
        A("#account-level a").not(".no-upgrade").dialog({
            start: function(D, C) {
                A(D).find("a.btn").unbind("click");
                return false
            }
        });
        A("a.preview").colorbox({
            width: "780px",
            height: "500px",
            iframe: true,
            opacity: PollDaddy.opacity,
            onOpen: function() {
                A("#colorbox").addClass("popup-preview")
            }
        });

        function B() {
            var C;
            C = A("#profileName").val().toLowerCase();
            C = C.replace(/ /g, "-");
            C = C.replace(/[^a-z0-9\-]/g, "");
            C = C.replace(/_/g, "-");
            C = C.replace(/^-*/, "");
            C = C.replace(/[-_]{2,}/g, "-");
            A("#profileName").val(C);
            if (parseInt(C, 10) == C) {
                C = ""
            }
            if (C.length > 0) {
                A("#profile-url strong").html(C.substr(0, 20))
            } else {
                A("#profile-url strong").html(A("#profile-url").data("original"))
            }
            return true
        }
        A("#profileName").keydown(B).keyup(B).keypress(B);
        A("input[name=uWebsite]").validate("url", true);
        PollDaddy.preload(pd_cdn_url + "/images/ajax-loader.gif", 16, 16);
        PollDaddy.preload(pd_cdn_url + "/images/dialog-load.gif", 16, 16);
        PollDaddy.preload(pd_cdn_url + "/images/nav-load.gif", 11, 11)
    })
})(jQuery);
(function(B) {
    B.fn.hoverIntent = function(J, I) {
        var K = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        K = B.extend(K, I ? {
            over: J,
            out: I
        } : J);
        var M, L, G, E;
        var F = function(N) {
            M = N.pageX;
            L = N.pageY
        };
        var D = function(O, N) {
            N.hoverIntent_t = clearTimeout(N.hoverIntent_t);
            if ((Math.abs(G - M) + Math.abs(E - L)) < K.sensitivity) {
                B(N).unbind("mousemove", F);
                N.hoverIntent_s = 1;
                return K.over.apply(N, [O])
            } else {
                G = M;
                E = L;
                N.hoverIntent_t = setTimeout(function() {
                    D(O, N)
                }, K.interval)
            }
        };
        var H = function(O, N) {
            N.hoverIntent_t = clearTimeout(N.hoverIntent_t);
            N.hoverIntent_s = 0;
            return K.out.apply(N, [O])
        };
        var C = function(Q) {
            var P = (Q.type == "mouseover" ? Q.fromElement : Q.toElement) || Q.relatedTarget;
            while (P && P != this) {
                try {
                    P = P.parentNode
                } catch (Q) {
                    P = this
                }
            }
            if (P == this) {
                return false
            }
            var O = jQuery.extend({}, Q);
            var N = this;
            if (N.hoverIntent_t) {
                N.hoverIntent_t = clearTimeout(N.hoverIntent_t)
            }
            if (Q.type == "mouseover") {
                G = O.pageX;
                E = O.pageY;
                B(N).bind("mousemove", F);
                if (N.hoverIntent_s != 1) {
                    N.hoverIntent_t = setTimeout(function() {
                        D(O, N)
                    }, K.interval)
                }
            } else {
                B(N).unbind("mousemove", F);
                if (N.hoverIntent_s == 1) {
                    N.hoverIntent_t = setTimeout(function() {
                        H(O, N)
                    }, K.timeout)
                }
            }
        };
        return this.mouseover(C).mouseout(C)
    };
    Menu = function(D) {
        var G = B.extend({}, D);

        function C(J) {
            var K = J.find(".nav-submenu");
            if (K.length == 0) {
                K = B("#" + B(J).find("a").attr("id") + "-submenu");
                B(J).append(K.remove());
                K = J.find(".nav-submenu")
            }
            return K
        }

        function I(J, K) {
            B(K).hide();
            B(J).hoverIntent(function() {
                var L = B(this);
                if (L.hasClass("no-hover") == false) {
                    var N = C(L);
                    B(".selected-nav").removeClass("selected-nav");
                    L.addClass("selected-nav");
                    var M = (B(".selected-nav").position().left + B(".selected-nav").width() / 2) - (B(K).width() / 2) + 1;
                    L.append(B(K).remove());
                    B(K).css("left", M).show();
                    N.css({
                        left: L.position().left + "px",
                        top: L.position().top + L.height() - 1 + "px"
                    }).slideUp(0);
                    N.slideDown(50)
                }
            }, function() {
                B(".selected-nav").removeClass("selected-nav");
                C(B(this)).slideUp(50)
            })
        }

        function H(J) {
            B(J).hoverIntent(function() {
                var K = B(this);
                var L = C(K);
                B(this).find("a:first").addClass("hover");
                B("#user-head-name").addClass("active");
                L.css({
                    left: ((K.position().left + (K.outerWidth() / 2)) - (L.outerWidth() / 2) + 3 + "px"),
                    top: (K.position().top + K.height() + 0 + "px")
                }).fadeIn(100)
            }, function() {
                E();
                B(this).find("a:first").removeClass("hover");
                B("#user-head-name").removeClass("active")
            })
        }

        function E() {
            B(".nav-popover").fadeOut(100)
        }
        var F = {
            dropdown: I,
            popover: H,
            hide: E
        };
        return F
    };

    function A() {
        if (B(".header-bar-section .active").length > 0) {
            B("#nav-arrow").css("left", (B(".header-bar-section .active").position().left + (B(".header-bar-section .active").width() / 2) + parseInt(B(".header-bar-section .active").css("padding-left"))) - (B("#nav-arrow").width() / 2) + 1).show()
        }
    }
    B(document).ready(function() {
        main_menu.popover(".second-menu li.has-submenu");
        B(".main-nav").hoverIntent(function() {}, function() {
            A()
        });
        A();

        function C() {
            var D = B("#stage-inner").offset().left + B("#stage-inner").width() - B("#user-survey").width();
            B("#user-survey").css("left", D)
        }
        B("#user-survey img").load(function() {
            C();
            B("#user-survey a").click(function() {
                B("#user-survey").fadeOut()
            });
            B("#user-survey").animate({
                top: B("#header").height()
            }, 1000, "easeOutQuart");
            B(window).resize(function() {
                C()
            })
        })
    })
})(jQuery);
var main_menu = new Menu();

function _$(A) {
    return document.getElementById(A)
}
var alert_no_answer;
var _debug = false;
var _document_root = ("https:" == document.location.protocol ? "https://polldaddy.com/swf/" : "http://i0.poll.fm/swf/");
var sc, _container, _global_ec, _global_ss, _global_wn;
var FlashDetect = new function() {
        var B = this;
        B.installed = false;
        B.raw = "";
        B.major = -1;
        B.minor = -1;
        B.revision = -1;
        B.revisionStr = "";
        var A = [{
            name: "ShockwaveFlash.ShockwaveFlash.7",
            version: function(H) {
                return F(H)
            }
        }, {
            name: "ShockwaveFlash.ShockwaveFlash.6",
            version: function(H) {
                var J = "6,0,21";
                try {
                    H.AllowScriptAccess = "always";
                    J = F(H)
                } catch (I) {}
                return J
            }
        }, {
            name: "ShockwaveFlash.ShockwaveFlash",
            version: function(H) {
                return F(H)
            }
        }];
        var F = function(H) {
            var J = -1;
            try {
                J = H.GetVariable("$version")
            } catch (I) {}
            return J
        };
        var C = function(J) {
            var H = -1;
            try {
                H = new ActiveXObject(J)
            } catch (I) {
                H = {
                    activeXError: true
                }
            }
            return H
        };
        var G = function(H) {
            var I = H.split(",");
            return {
                raw: H,
                major: parseInt(I[0].split(" ")[1], 10),
                minor: parseInt(I[1], 10),
                revision: parseInt(I[2], 10),
                revisionStr: I[2]
            }
        };
        var D = function(H) {
            var J = H.split(/ +/);
            var I = J[2].split(/\./);
            var K = J[3];
            return {
                raw: H,
                major: parseInt(I[0], 10),
                minor: parseInt(I[1], 10),
                revisionStr: K,
                revision: E(K)
            }
        };
        var E = function(H) {
            return parseInt(H.replace(/[a-zA-Z]/g, ""), 10) || B.revision
        };
        B.majorAtLeast = function(H) {
            return B.major >= H
        };
        B.minorAtLeast = function(H) {
            return B.minor >= H
        };
        B.revisionAtLeast = function(H) {
            return B.revision >= H
        };
        B.versionAtLeast = function(I) {
            var H = [B.major, B.minor, B.revision];
            var J = Math.min(H.length, arguments.length);
            for (i = 0; i < J; i++) {
                if (H[i] >= arguments[i]) {
                    if (i + 1 < J && H[i] == arguments[i]) {
                        continue
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            }
        };
        B.FlashDetect = function() {
            if (navigator.plugins && navigator.plugins.length > 0) {
                var I = "application/x-shockwave-flash";
                var J = navigator.mimeTypes;
                if (J && J[I] && J[I].enabledPlugin && J[I].enabledPlugin.description) {
                    var L = J[I].enabledPlugin.description;
                    var H = D(L);
                    B.raw = H.raw;
                    B.major = H.major;
                    B.minor = H.minor;
                    B.revisionStr = H.revisionStr;
                    B.revision = H.revision;
                    B.installed = true
                }
            } else {
                if (navigator.appVersion.indexOf("Mac") == -1 && window.execScript) {
                    var L = -1;
                    for (var K = 0; K < A.length && L == -1; K++) {
                        var M = C(A[K].name);
                        if (!M.activeXError) {
                            B.installed = true;
                            L = A[K].version(M);
                            if (L != -1) {
                                var H = G(L);
                                B.raw = H.raw;
                                B.major = H.major;
                                B.minor = H.minor;
                                B.revision = H.revision;
                                B.revisionStr = H.revisionStr
                            }
                        }
                    }
                }
            }
        }()
    };
FlashDetect.JS_RELEASE = "1.0.4";
var evercookie = (function() {
    this._class = function() {
        var self = this;
        this._ec = {};
        var no_color = -1;
        var _ec_tests = 10;
        this.get = function(name, cb, dont_reset) {
            self._evercookie(name, cb, undefined, undefined, dont_reset)
        };
        this.set = function(name, value) {
            self._evercookie(name, function() {}, value)
        };
        this._evercookie = function(name, cb, value, i, dont_reset) {
            if (typeof self._evercookie == "undefined") {
                self = this
            }
            if (typeof i == "undefined") {
                i = 0
            }
            if (i == 0) {
                self.evercookie_database_storage(name, value);
                self._ec.userData = self.evercookie_userdata(name, value);
                self._ec.cookieData = self.evercookie_cookie(name, value);
                self._ec.localData = self.evercookie_local_storage(name, value);
                self._ec.globalData = self.evercookie_global_storage(name, value);
                self._ec.sessionData = self.evercookie_session_storage(name, value)
            }
            if (typeof value == "undefined") {
                if (((window.openDatabase && typeof self._ec.dbData == "undefined")) && i++ < _ec_tests) {
                    setTimeout(self._evercookie, 300, name, cb, value, i, dont_reset)
                } else {
                    var tmpec = self._ec;
                    self._ec = {};
                    var candidates = new Array();
                    var bestnum = 0;
                    var candidate;
                    for (var item in tmpec) {
                        if (typeof tmpec[item] != "undefined" && typeof tmpec[item] != "null" && tmpec[item] != "null" && tmpec[item] != "undefined") {
                            candidates[tmpec[item]] = typeof candidates[tmpec[item]] == "undefined" ? 1 : candidates[tmpec[item]] + 1
                        }
                    }
                    for (var item in candidates) {
                        if (candidates[item] > bestnum) {
                            bestnum = candidates[item];
                            candidate = item
                        }
                    }
                    if (typeof dont_reset == "undefined" || dont_reset != 1) {
                        self.set(name, candidate)
                    }
                    if (typeof cb == "function") {
                        cb(candidate, tmpec)
                    }
                }
            }
        };
        this.evercookie_userdata = function(name, value) {
            try {
                var elm = this.createElem("div", "userdata_el", 1);
                elm.style.behavior = "url(#default#userData)";
                if (typeof(value) != "undefined") {
                    elm.setAttribute(name, value);
                    elm.save(name)
                } else {
                    elm.load(name);
                    return elm.getAttribute(name)
                }
            } catch (e) {}
        };
        this.evercookie_local_storage = function(name, value) {
            try {
                if (window.localStorage) {
                    if (typeof(value) != "undefined") {
                        localStorage.setItem(name, value)
                    } else {
                        return localStorage.getItem(name)
                    }
                }
            } catch (e) {}
        };
        this.evercookie_database_storage = function(name, value) {
            try {
                if (window.openDatabase) {
                    var database = window.openDatabase("sqlite_evercookie", "", "evercookie", 1024 * 1024);
                    if (typeof(value) != "undefined") {
                        database.transaction(function(tx) {
                            tx.executeSql("CREATE TABLE IF NOT EXISTS cache(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))", [], function(tx, rs) {}, function(tx, err) {});
                            tx.executeSql("INSERT OR REPLACE INTO cache(name, value) VALUES(?, ?)", [name, value], function(tx, rs) {}, function(tx, err) {})
                        })
                    } else {
                        database.transaction(function(tx) {
                            tx.executeSql("SELECT value FROM cache WHERE name=?", [name], function(tx, result1) {
                                if (result1.rows.length >= 1) {
                                    self._ec.dbData = result1.rows.item(0)["value"]
                                } else {
                                    self._ec.dbData = ""
                                }
                            }, function(tx, err) {})
                        })
                    }
                }
            } catch (e) {}
        };
        this.evercookie_session_storage = function(name, value) {
            try {
                if (window.sessionStorage) {
                    if (typeof(value) != "undefined") {
                        sessionStorage.setItem(name, value)
                    } else {
                        return sessionStorage.getItem(name)
                    }
                }
            } catch (e) {}
        };
        this.evercookie_global_storage = function(name, value) {
            if (window.globalStorage) {
                var host = this.getHost();
                try {
                    if (typeof(value) != "undefined") {
                        eval("globalStorage[host]." + name + " = value")
                    } else {
                        return eval("globalStorage[host]." + name)
                    }
                } catch (e) {}
            }
        };
        this.evercookie_cookie = function(name, value, expire) {
            var cookie = this.getFromStr(name, document.cookie);
            if (typeof(value) != "undefined" && typeof(cookie) == "undefined") {
                var today = new Date();
                today.setTime(today.getTime());
                if (typeof expire == undefined || expire == null) {
                    expire = (60 * 60 * 24 * 365 * 20 * 1000)
                }
                var expires_date = new Date((today.getTime() + expire));
                document.cookie = name + "=" + value + "; expires=" + expires_date.toGMTString() + "; path=/"
            } else {
                return cookie
            }
        };
        this.createElem = function(type, name, append) {
            var el;
            if (typeof name != "undefined" && document.getElementById(name)) {
                el = document.getElementById(name)
            } else {
                el = document.createElement(type)
            }
            el.style.visibility = "hidden";
            el.style.position = "absolute";
            if (name) {
                el.setAttribute("id", name)
            }
            if (append) {
                if (_container) {
                    _container.appendChild(el)
                } else {
                    document.body.appendChild(el)
                }
            }
            return el
        };
        this.getFromStr = function(name, text) {
            if (typeof text != "string") {
                return
            }
            var nameEQ = name + "=";
            var ca = text.split(/[;&]/);
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") {
                    c = c.substring(1, c.length)
                }
                if (c.indexOf(nameEQ) == 0) {
                    return c.substring(nameEQ.length, c.length)
                }
            }
        };
        this.getHost = function() {
            var domain = document.location.host;
            if (domain.indexOf("www.") == 0) {
                domain = domain.replace("www.", "")
            }
            return domain
        }
    };
    return _class
})();
var swfstore = (function() {
    var A = 0;
    var B = /[^a-z0-9_]/ig;

    function C(D) {
        if (typeof D == "function") {
            throw "SwfStore Error: Functions cannot be used as keys or values."
        }
    }
    SwfStore = function(J) {
        this.config = J || {
            namespace: "swfstore",
            swf_url: _document_root + "storage.swf",
            onready: function() {},
            onerror: function() {},
            debug: _debug,
            timeout: 10
        };
        var H = this.namespace = this.config.namespace.replace(B, "_"),
            L = this.config.debug,
            E = this.config.timeout;

        function K() {
            return "SwfStore_" + H + "_" + (A++)
        }

        function M(N) {
            var P = K();
            O = document.getElementById(P);
            if (typeof O == "undefined" || O == null) {
                var O = document.createElement("div");
                if (typeof _container !== "undefined" || _container !== null) {
                    _container.appendChild(O)
                } else {
                    document.body.appendChild(O)
                }
                O.id = P;
                O.style.position = "absolute";
                O.style.top = "0px";
                O.style.left = "-2000px"
            }
            return O
        }
        if (L) {
            if (typeof console == "undefined") {
                var G = M();
                window.console = {
                    log: function(N) {
                        var O = M();
                        O.innerHTML = N;
                        G.appendChild(O)
                    }
                }
            }
            this.log = function(P, O, N) {
                O = (O == "swfStore") ? "swf" : O;
                log("SwfStore - " + H + ": " + P + " (" + O + "): " + N)
            }
        } else {
            this.log = function() {}
        }
        this.log("info", "js", "Initializing...");
        SwfStore[H] = this;
        var D = M(L);
        var F = K();
        var I = "logfn=SwfStore." + H + ".log&amp;onload=SwfStore." + H + ".onload&amp;onerror=SwfStore." + H + ".onerror";
        D.innerHTML = '<object height="1" width="1" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + F + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">	<param value="' + this.config.swf_url + '" name="movie">	<param value="' + I + '" name="FlashVars">	<param value="always" name="allowScriptAccess">	<embed height="1" align="middle" width="1" pluginspage="https://www.macromedia.com/go/getflashplayer" flashvars="' + I + '" type="application/x-shockwave-flash" allowscriptaccess="always" quality="high" loop="false" play="true" name="' + F + '" bgcolor="#ffffff" src="' + this.config.swf_url + '"></object>';
        this.swf = document[F] || window[F];
        this._timeout = setTimeout(function() {
            if (typeof SwfStore !== "undefined" && typeof SwfStore[H] !== "undefined") {
                SwfStore[H].log("Timeout reached, assuming the store.swf failed to load and firing the onerror callback.");
                if (typeof SwfStore[H].config.onerror !== "undefined") {
                    SwfStore[H].config.onerror()
                }
            }
        }, E * 1000)
    };
    SwfStore.prototype = {
        ready: false,
        namespace: "SwfStore_prototype",
        set: function(E, D) {
            if (this.namespace === SwfStore.prototype.namespace) {
                throw "Create a new SwfStore to set data"
            }
            if (this.ready) {
                C(E);
                C(D);
                this.swf.set(E, D)
            } else {
                throw "Attempted to save to uninitialized SwfStore."
            }
        },
        get: function(D) {
            if (this.namespace === SwfStore.prototype.namespace) {
                throw "Create a new SwfStore to set data"
            }
            if (this.ready) {
                C(D);
                return this.swf.get(D)
            } else {
                throw "Attempted to read from an uninitialized SwfStore."
            }
        },
        getAll: function(D) {
            if (this.namespace === SwfStore.prototype.namespace) {
                throw "Create a new SwfStore to set data"
            }
            if (this.ready) {
                C(D);
                return this.swf.get(D)
            } else {
                throw "Attempted to read from an uninitialized SwfStore."
            }
        },
        onload: function() {
            clearTimeout(this._timeout);
            this.ready = true;
            if (this.config.onready) {
                this.config.onready()
            }
        },
        onerror: function() {
            clearTimeout(this._timeout);
            if (this.config.onerror) {
                this.config.onerror()
            }
        }
    };
    return SwfStore
}());
sessvars = function() {
    var x = {};
    x.$ = {
        prefs: {
            memLimit: 2000,
            autoFlush: true,
            crossDomain: true,
            includeProtos: false,
            includeFunctions: false
        },
        parent: x,
        clearMem: function() {
            for (var i in this.parent) {
                if (i != "$") {
                    this.parent[i] = undefined
                }
            }
            this.flush()
        },
        usedMem: function() {
            x = {};
            return Math.round(this.flush(x) / 1024)
        },
        usedMemPercent: function() {
            return Math.round(this.usedMem() / this.prefs.memLimit)
        },
        flush: function(x) {
            var y, o = {}, j = this.$$;
            x = x || top;
            for (var i in this.parent) {
                o[i] = this.parent[i]
            }
            o.$ = this.prefs;
            j.includeProtos = this.prefs.includeProtos;
            j.includeFunctions = this.prefs.includeFunctions;
            y = this.$$.make(o);
            if (x != top) {
                return y.length
            }
            if (y.length / 1024 > this.prefs.memLimit) {
                return false
            }
            x.name = y;
            return true
        },
        getDomain: function() {
            var l = location.href;
            l = l.split("///").join("//");
            l = l.substring(l.indexOf("://") + 3).split("/")[0];
            while (l.split(".").length > 2) {
                l = l.substring(l.indexOf(".") + 1)
            }
            return l
        },
        debug: function(t) {
            var t = t || this,
                a = arguments.callee;
            if (!document.body) {
                setTimeout(function() {
                    a(t)
                }, 200);
                return
            }
            t.flush();
            var d = document.getElementById("sessvarsDebugDiv");
            if (!d) {
                d = document.createElement("div");
                document.body.insertBefore(d, document.body.firstChild)
            }
            d.id = "sessvarsDebugDiv";
            d.innerHTML = '<div style="line-height:20px;padding:5px;font-size:11px;font-family:Verdana,Arial,Helvetica;z-index:10000;background:#FFFFCC;border: 1px solid #333;margin-bottom:12px"><b style="font-family:Trebuchet MS;font-size:20px">sessvars.js - debug info:</b><br/><br/>Memory usage: ' + t.usedMem() + " Kb (" + t.usedMemPercent() + '%)&nbsp;&nbsp;&nbsp;<span style="cursor:pointer"><b>[Clear memory]</b></span><br/>' + top.name.split("\n").join("<br/>") + "</div>";
            d.getElementsByTagName("span")[0].onclick = function() {
                t.clearMem();
                location.reload()
            }
        },
        init: function() {
            var o = {}, t = this;
            try {
                o = this.$$.toObject(top.name)
            } catch (e) {
                o = {}
            }
            this.prefs = o.$ || t.prefs;
            if (this.prefs.crossDomain || this.prefs.currentDomain == this.getDomain()) {
                for (var i in o) {
                    this.parent[i] = o[i]
                }
            } else {
                this.prefs.currentDomain = this.getDomain()
            }
            this.parent.$ = t;
            t.flush();
            var f = function() {
                if (t.prefs.autoFlush) {
                    t.flush()
                }
            };
            if (window.addEventListener) {
                addEventListener("unload", f, false)
            } else {
                if (window.attachEvent) {
                    window.attachEvent("onunload", f)
                } else {
                    this.prefs.autoFlush = false
                }
            }
        }
    };
    x.$.$$ = {
        compactOutput: false,
        includeProtos: false,
        includeFunctions: false,
        detectCirculars: true,
        restoreCirculars: true,
        make: function(arg, restore) {
            this.restore = restore;
            this.mem = [];
            this.pathMem = [];
            return this.toJsonStringArray(arg).join("")
        },
        toObject: function(x) {
            if (!this.cleaner) {
                try {
                    this.cleaner = new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')
                } catch (a) {
                    this.cleaner = /^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/
                }
            }
            if (!this.cleaner.test(x)) {
                return {}
            }
            eval("this.myObj=" + x);
            if (!this.restoreCirculars || !alert) {
                return this.myObj
            }
            if (this.includeFunctions) {
                var x = this.myObj;
                for (var i in x) {
                    if (typeof x[i] == "string" && !x[i].indexOf("JSONincludedFunc:")) {
                        x[i] = x[i].substring(17);
                        eval("x[i]=" + x[i])
                    }
                }
            }
            this.restoreCode = [];
            this.make(this.myObj, true);
            var r = this.restoreCode.join(";") + ";";
            eval('r=r.replace(/\\W([0-9]{1,})(\\W)/g,"[$1]$2").replace(/\\.\\;/g,";")');
            eval(r);
            return this.myObj
        },
        toJsonStringArray: function(arg, out) {
            if (!out) {
                this.path = []
            }
            out = out || [];
            var u;
            switch (typeof arg) {
                case "object":
                    this.lastObj = arg;
                    if (this.detectCirculars) {
                        var m = this.mem;
                        var n = this.pathMem;
                        for (var i = 0; i < m.length; i++) {
                            if (arg === m[i]) {
                                out.push('"JSONcircRef:' + n[i] + '"');
                                return out
                            }
                        }
                        m.push(arg);
                        n.push(this.path.join("."))
                    }
                    if (arg) {
                        if (arg.constructor == Array) {
                            out.push("[");
                            for (var i = 0; i < arg.length; ++i) {
                                this.path.push(i);
                                if (i > 0) {
                                    out.push(",\n")
                                }
                                this.toJsonStringArray(arg[i], out);
                                this.path.pop()
                            }
                            out.push("]");
                            return out
                        } else {
                            if (typeof arg.toString != "undefined") {
                                out.push("{");
                                var first = true;
                                for (var i in arg) {
                                    if (!this.includeProtos && arg[i] === arg.constructor.prototype[i]) {
                                        continue
                                    }
                                    this.path.push(i);
                                    var curr = out.length;
                                    if (!first) {
                                        out.push(this.compactOutput ? "," : ",\n")
                                    }
                                    this.toJsonStringArray(i, out);
                                    out.push(":");
                                    this.toJsonStringArray(arg[i], out);
                                    if (out[out.length - 1] == u) {
                                        out.splice(curr, out.length - curr)
                                    } else {
                                        first = false
                                    }
                                    this.path.pop()
                                }
                                out.push("}");
                                return out
                            }
                        }
                        return out
                    }
                    out.push("null");
                    return out;
                case "unknown":
                case "undefined":
                case "function":
                    if (!this.includeFunctions) {
                        out.push(u);
                        return out
                    }
                    arg = "JSONincludedFunc:" + arg;
                    out.push('"');
                    var a = ["\n", "\\n", "\r", "\\r", '"', '\\"'];
                    arg += "";
                    for (var i = 0; i < 6; i += 2) {
                        arg = arg.split(a[i]).join(a[i + 1])
                    }
                    out.push(arg);
                    out.push('"');
                    return out;
                case "string":
                    if (this.restore && arg.indexOf("JSONcircRef:") == 0) {
                        this.restoreCode.push("this.myObj." + this.path.join(".") + "=" + arg.split("JSONcircRef:").join("this.myObj."))
                    }
                    out.push('"');
                    var a = ["\n", "\\n", "\r", "\\r", '"', '\\"'];
                    arg += "";
                    for (var i = 0; i < 6; i += 2) {
                        arg = arg.split(a[i]).join(a[i + 1])
                    }
                    out.push(arg);
                    out.push('"');
                    return out;
                default:
                    out.push(String(arg));
                    return out
            }
        }
    };
    x.$.init();
    return x
}();
var supercookie = (function() {
    this._class = function() {
        if (_$("PD_superContainer") == null) {
            document.write('<div id="PD_superContainer"></div>')
        }
        _container = _$("PD_superContainer");
        _global_ec = new evercookie();
        log("Flash version:: " + FlashDetect.raw);
        if (FlashDetect.versionAtLeast(9, 0, 31)) {
            _global_ss = new swfstore()
        }
        this.showCookies = function(B, C) {
            for (var A in C) {
                log("Storage mechanism " + A + " returned: " + C[A])
            }
        };
        this.isEnabled = function() {
            var B = "pd-test-cookie";
            var A;
            _global_ec.evercookie_cookie(B, "true", (1000 * 5));
            A = _global_ec.getFromStr(B, document.cookie);
            log("Cookies are enabled: " + A);
            return A == "true"
        };
        this.set = function(B, A) {
            _global_ec.set(B, A);
            if (_global_ss && _global_ss.ready) {
                _global_ss.set(B, A)
            }
            sessvars[B] = A;
            sessvars.$.flush()
        };
        this.get = function(A) {
            var C, B, D;
            if (_debug) {
                _global_ec.get(A, this.showCookies, 1)
            }
            _global_ec.get(A, function(E) {
                C = E
            }, 1);
            log("Super Get- cookie_value::" + C);
            if (_global_ss && _global_ss.ready) {
                B = _global_ss.get(A)
            }
            log("Super Get- lso_value::" + B);
            D = sessvars[A];
            log("Super Get- wn_value::" + D);
            return C || B || D
        }
    };
    return this._class
})();

function countchars(A) {
    if (A.value.length > 4000) {
        A.value = left(A.value, 4000)
    }
    _$("charcount").innerHTML = A.value.length
}

function setCookie(C, H) {
    var G = "/";
    var D = "";
    var F = "";
    var A = 0;
    if (typeof(H) !== "undefined") {
        A = parseInt(H)
    }
    if (A > 0) {
        A = A * 1000
    } else {
        A = 60 * 60 * 24 * 30 * 1000
    }
    var B = new Date();
    B.setTime(B.getTime());
    A = B.getTime() + (A);
    var E = new Date(A);
    log("Cookie Name: " + C);
    if (typeof sc !== "undefined") {
        log("SET supercookie");
        sc.set(C, escape(A))
    } else {
        log("SET standard cookie");
        document.cookie = C + "=" + escape(B.getTime()) + ((A) ? ";expires=" + E.toGMTString() : "") + ((G) ? ";path=" + G : "") + ((D) ? ";domain=" + D : "") + ((F) ? ";secure" : "")
    }
}

function getCookie(A, B) {
    var H = "";
    var C = "";
    var D = "";
    B = (typeof B === "undefined") ? 3600000 : B;
    log("Cookie Name: " + A);
    if (typeof sc != "undefined") {
        log("GET supercookie");
        D = sc.get(A)
    } else {
        log("GET standard cookie");
        var F = document.cookie.split(";");
        for (i = 0; i < F.length; i++) {
            H = F[i].split("=");
            C = H[0].replace(/^\s+|\s+$/g, "");
            if (C == A) {
                if (H.length > 1) {
                    D = unescape(H[1].replace(/^\s+|\s+$/g, ""))
                }
                break
            }
            H = null;
            C = ""
        }
    }
    log("Cookie Value: " + D);
    if (D == "true") {
        return D
    } else {
        var G = new Date();
        D = parseInt(D);
        log("Time: " + G.getTime());
        if (D > G.getTime()) {
            var I = D - G.getTime();
            if (B >= I) {
                var E = G.getTime() - (B - I)
            } else {
                var E = G.getTime()
            }
            setCookie(A, E)
        }
        if (D + B > G.getTime()) {
            return "true"
        }
    }
    return null
}

function vote(D) {
    var A;
    var H;
    if (D.pageX) {
        A = D.pageX;
        H = D.pageY
    } else {
        A = D.clientX;
        H = D.clientY
    }
    log([A, H]);
    if (A == 0 && H == 0) {
        return false
    }
    var F = jQuery(".vote-button").data("vote");
    log(F);
    var G = "";
    var E = "";
    var C = "PDjs_poll_" + F.id + (F.v > 0 ? "_" + F.v : "");
    log(C);
    for (i = 0; i < document.formPoll.elements.length; i++) {
        if (document.formPoll.elements[i].type == "checkbox" || document.formPoll.elements[i].type == "radio") {
            if (document.formPoll.elements[i].checked) {
                G += document.formPoll.elements[i].value + ","
            }
        }
    }
    if (document.formPoll.pz !== undefined) {
        var B = document.formPoll.pz.value
    } else {
        var B = 1
    } if (parseInt(F.o) == 1) {
        E = _$("PDI_OtherText").value
    }
    if (typeof document.formPoll.tags != "undefined") {
        tags = "&tags=" + urlEncode(document.formPoll.tags.value)
    } else {
        tags = ""
    } if (G.length > 0 || E.length > 0) {
        url = "/vote.php?va=" + F.at + tags + "&pt=" + F.m + "&r=" + F.b + "&p=" + F.id + "&a=" + urlEncode(G) + "&o=" + urlEncode(E) + "&t=" + F.t + "&token=" + F.n + "&pz=" + B;
        if (F.b > 0) {
            if (getCookie(C, F.e) == "true") {
                url = "/poll/" + F.id + "/?view=results&msg=revoted"
            } else {
                setCookie(C, F.e)
            }
        }
        location.href = url
    } else {
        alert(alert_no_answer)
    }
}

function urlEncode(A) {
    return encodeURIComponent(A).replace(/\%20/g, "+").replace(/!/g, "%21").replace(/'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\*/g, "%2A").replace(/\~/g, "%7E")
}

function log(A) {
    if (typeof(_debug) !== "undefined" && _debug) {
        if (typeof(console) !== "undefined" && console != null) {
            console.log(A)
        }
    }
}

function answer_click(B, A) {
    var E = 0;
    jQuery("input[name=PDI_answer]").each(function() {
        var F = jQuery(this);
        if (A.attr("id") != F.attr("id") && F.is(":checked")) {
            E++
        }
    });
    var D = "";
    if (jQuery("input[name=PDI_OtherText]").length) {
        D = jQuery("input[name=PDI_OtherText]").val();
        if (D && D.length > 0) {
            E++
        }
    }
    if (A.is(":checked")) {
        E++
    }
    if (E >= B) {
        jQuery("input[name=PDI_answer]").each(function() {
            var F = jQuery(this);
            if (A.attr("id") != F.attr("id") && !F.is(":checked")) {
                F.attr("disabled", "true")
            }
        });
        if (jQuery("input[name=PDI_OtherText]")) {
            var C = jQuery("input[name=PDI_OtherText]");
            if (A.attr("id") != C.attr("id") && C.val() == "") {
                C.attr("disabled", "true")
            }
        }
    } else {
        jQuery("input[name=PDI_answer]").each(function() {
            var F = $(this);
            if (!F.is(":checked")) {
                F.removeAttr("disabled")
            }
        });
        if (jQuery("input[name=PDI_OtherText]")) {
            jQuery("input[name=PDI_OtherText]").removeAttr("disabled")
        }
    }
};

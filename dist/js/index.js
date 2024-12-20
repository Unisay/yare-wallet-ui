(() => {
  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result2 = new Array(l * k);
      var n = 0;
      for (var i2 = 0; i2 < l; i2++) {
        var f = fs[i2];
        for (var j = 0; j < k; j++) {
          result2[n++] = f(xs[j]);
        }
      }
      return result2;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var on = function(f) {
    return function(g) {
      return function(x) {
        return function(y) {
          return f(g(x))(g(y));
        };
      };
    };
  };
  var flip = function(f) {
    return function(b2) {
      return function(a2) {
        return f(a2)(b2);
      };
    };
  };
  var $$const = function(a2) {
    return function(v) {
      return a2;
    };
  };
  var applyFlipped = function(x) {
    return function(f) {
      return f(x);
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result2 = new Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result2[i2] = f(arr[i2]);
      }
      return result2;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map115(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map115($$const(x))(f);
      };
    };
  };
  var voidRight = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return function(x) {
      return map115($$const(x));
    };
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var applyFn = {
    apply: function(f) {
      return function(g) {
        return function(x) {
          return f(x)(g(x));
        };
      };
    },
    Functor0: function() {
      return functorFn;
    }
  };
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };
  var applyFirst = function(dictApply) {
    var apply12 = apply(dictApply);
    var map45 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply12(map45($$const)(a2))(b2);
      };
    };
  };
  var applySecond = function(dictApply) {
    var apply12 = apply(dictApply);
    var map45 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply12(map45($$const(identity2))(a2))(b2);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure110 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (!v) {
          return v1;
        }
        ;
        if (v) {
          return pure110(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var when = function(dictApplicative) {
    var pure110 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure110(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply5 = apply(dictApplicative.Apply0());
    var pure110 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply5(pure110(f))(a2);
      };
    };
  };

  // output/Control.Bind/foreign.js
  var arrayBind = function(arr) {
    return function(f) {
      var result2 = [];
      for (var i2 = 0, l = arr.length; i2 < l; i2++) {
        Array.prototype.push.apply(result2, f(arr[i2]));
      }
      return result2;
    };
  };

  // output/Control.Bind/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var discard = function(dict) {
    return dict.discard;
  };
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped14 = bindFlipped(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bindFlipped14(f)(g(a2));
        };
      };
    };
  };
  var composeKleisli = function(dictBind) {
    var bind110 = bind(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bind110(f(a2))(g);
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };
  var join = function(dictBind) {
    var bind110 = bind(dictBind);
    return function(m) {
      return bind110(m)(identity3);
    };
  };

  // output/Data.Semigroup/foreign.js
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeHas = function(label5) {
    return function(rec) {
      return {}.hasOwnProperty.call(rec, label5);
    };
  };
  var unsafeGet = function(label5) {
    return function(rec) {
      return rec[label5];
    };
  };
  var unsafeSet = function(label5) {
    return function(value16) {
      return function(rec) {
        var copy2 = {};
        for (var key in rec) {
          if ({}.hasOwnProperty.call(rec, key)) {
            copy2[key] = rec[key];
          }
        }
        copy2[label5] = value16;
        return copy2;
      };
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupString = {
    append: concatString
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Alt/index.js
  var altArray = {
    alt: /* @__PURE__ */ append(semigroupArray),
    Functor0: function() {
      return functorArray;
    }
  };
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq8) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq8 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqCharImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqUnit = {
    eq: function(v) {
      return function(v1) {
        return true;
      };
    }
  };
  var eqString = {
    eq: eqStringImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var notEq = function(dictEq) {
    var eq32 = eq(dictEq);
    return function(x) {
      return function(y) {
        return eq2(eq32(x)(y))(false);
      };
    };
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };

  // output/Data.Ring/index.js
  var sub = function(dict) {
    return dict.sub;
  };
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };
  var negate = function(dictRing) {
    var sub1 = sub(dictRing);
    var zero3 = zero(dictRing.Semiring0());
    return function(a2) {
      return sub1(zero3)(a2);
    };
  };

  // output/Data.Ord/index.js
  var ordUnit = {
    compare: function(v) {
      return function(v1) {
        return EQ.value;
      };
    },
    Eq0: function() {
      return eqUnit;
    }
  };
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var greaterThanOrEq = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare3(a1)(a2);
        if (v instanceof LT) {
          return false;
        }
        ;
        return true;
      };
    };
  };
  var abs = function(dictOrd) {
    var greaterThanOrEq1 = greaterThanOrEq(dictOrd);
    return function(dictRing) {
      var zero3 = zero(dictRing.Semiring0());
      var negate1 = negate(dictRing);
      return function(x) {
        var $99 = greaterThanOrEq1(x)(zero3);
        if ($99) {
          return x;
        }
        ;
        return negate1(x);
      };
    };
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showCharImpl = function(c) {
    var code2 = c.charCodeAt(0);
    if (code2 < 32 || code2 === 127) {
      switch (c) {
        case "\x07":
          return "'\\a'";
        case "\b":
          return "'\\b'";
        case "\f":
          return "'\\f'";
        case "\n":
          return "'\\n'";
        case "\r":
          return "'\\r'";
        case "	":
          return "'\\t'";
        case "\v":
          return "'\\v'";
      }
      return "'\\" + code2.toString(10) + "'";
    }
    return c === "'" || c === "\\" ? "'\\" + c + "'" : "'" + c + "'";
  };
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      // eslint-disable-line no-control-regex
      function(c, i2) {
        switch (c) {
          case '"':
          case "\\":
            return "\\" + c;
          case "\x07":
            return "\\a";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "	":
            return "\\t";
          case "\v":
            return "\\v";
        }
        var k = i2 + 1;
        var empty8 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty8;
      }
    ) + '"';
  };
  var showArrayImpl = function(f) {
    return function(xs) {
      var ss = [];
      for (var i2 = 0, l = xs.length; i2 < l; i2++) {
        ss[i2] = f(xs[i2]);
      }
      return "[" + ss.join(",") + "]";
    };
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var showChar = {
    show: showCharImpl
  };
  var show = function(dict) {
    return dict.show;
  };
  var showArray = function(dictShow) {
    return {
      show: showArrayImpl(show(dictShow))
    };
  };

  // output/Data.Generic.Rep/index.js
  var Inl = /* @__PURE__ */ function() {
    function Inl2(value0) {
      this.value0 = value0;
    }
    ;
    Inl2.create = function(value0) {
      return new Inl2(value0);
    };
    return Inl2;
  }();
  var Inr = /* @__PURE__ */ function() {
    function Inr2(value0) {
      this.value0 = value0;
    }
    ;
    Inr2.create = function(value0) {
      return new Inr2(value0);
    };
    return Inr2;
  }();
  var NoArguments = /* @__PURE__ */ function() {
    function NoArguments2() {
    }
    ;
    NoArguments2.value = new NoArguments2();
    return NoArguments2;
  }();
  var Constructor = function(x) {
    return x;
  };
  var Argument = function(x) {
    return x;
  };
  var to = function(dict) {
    return dict.to;
  };
  var from = function(dict) {
    return dict.from;
  };

  // output/Data.Maybe/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var semigroupMaybe = function(dictSemigroup) {
    var append12 = append(dictSemigroup);
    return {
      append: function(v) {
        return function(v1) {
          if (v instanceof Nothing) {
            return v1;
          }
          ;
          if (v1 instanceof Nothing) {
            return v;
          }
          ;
          if (v instanceof Just && v1 instanceof Just) {
            return new Just(append12(v.value0)(v1.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Maybe (line 182, column 1 - line 185, column 43): " + [v.constructor.name, v1.constructor.name]);
        };
      }
    };
  };
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a2) {
    return maybe(a2)(identity4);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var eqMaybe = function(dictEq) {
    var eq8 = eq(dictEq);
    return {
      eq: function(x) {
        return function(y) {
          if (x instanceof Nothing && y instanceof Nothing) {
            return true;
          }
          ;
          if (x instanceof Just && y instanceof Just) {
            return eq8(x.value0)(y.value0);
          }
          ;
          return false;
        };
      }
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var note = function(a2) {
    return maybe(new Left(a2))(Right.create);
  };
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var map3 = /* @__PURE__ */ map(functorEither);
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var hush = /* @__PURE__ */ function() {
    return either($$const(Nothing.value))(Just.create);
  }();
  var applyEither = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Left) {
          return new Left(v.value0);
        }
        ;
        if (v instanceof Right) {
          return map3(v.value0)(v1);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorEither;
    }
  };
  var bindEither = {
    bind: /* @__PURE__ */ either(function(e) {
      return function(v) {
        return new Left(e);
      };
    })(function(a2) {
      return function(f) {
        return f(a2);
      };
    }),
    Apply0: function() {
      return applyEither;
    }
  };
  var applicativeEither = /* @__PURE__ */ function() {
    return {
      pure: Right.create,
      Apply0: function() {
        return applyEither;
      }
    };
  }();

  // output/Data.String.Common/foreign.js
  var split = function(sep) {
    return function(s) {
      return s.split(sep);
    };
  };
  var joinWith = function(s) {
    return function(xs) {
      return xs.join(s);
    };
  };

  // output/Data.String.Common/index.js
  var $$null = function(s) {
    return s === "";
  };

  // output/Control.Lazy/index.js
  var defer = function(dict) {
    return dict.defer;
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b2) {
    return !b2;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var implies = function(dict) {
    return dict.implies;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a2) {
      return function(b2) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a2))(b2);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };
  var heytingAlgebraFunction = function(dictHeytingAlgebra) {
    var ff1 = ff(dictHeytingAlgebra);
    var tt1 = tt(dictHeytingAlgebra);
    var implies1 = implies(dictHeytingAlgebra);
    var conj1 = conj(dictHeytingAlgebra);
    var disj1 = disj(dictHeytingAlgebra);
    var not12 = not(dictHeytingAlgebra);
    return {
      ff: function(v) {
        return ff1;
      },
      tt: function(v) {
        return tt1;
      },
      implies: function(f) {
        return function(g) {
          return function(a2) {
            return implies1(f(a2))(g(a2));
          };
        };
      },
      conj: function(f) {
        return function(g) {
          return function(a2) {
            return conj1(f(a2))(g(a2));
          };
        };
      },
      disj: function(f) {
        return function(g) {
          return function(a2) {
            return disj1(f(a2))(g(a2));
          };
        };
      },
      not: function(f) {
        return function(a2) {
          return not12(f(a2));
        };
      }
    };
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Monoid/index.js
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var uncurry = function(f) {
    return function(v) {
      return f(v.value0)(v.value1);
    };
  };
  var snd = function(v) {
    return v.value1;
  };
  var functorTuple = {
    map: function(f) {
      return function(m) {
        return new Tuple(m.value0, f(m.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };
  var eqTuple = function(dictEq) {
    var eq8 = eq(dictEq);
    return function(dictEq1) {
      var eq13 = eq(dictEq1);
      return {
        eq: function(x) {
          return function(y) {
            return eq8(x.value0)(y.value0) && eq13(x.value1)(y.value1);
          };
        }
      };
    };
  };
  var ordTuple = function(dictOrd) {
    var compare3 = compare(dictOrd);
    var eqTuple1 = eqTuple(dictOrd.Eq0());
    return function(dictOrd1) {
      var compare12 = compare(dictOrd1);
      var eqTuple2 = eqTuple1(dictOrd1.Eq0());
      return {
        compare: function(x) {
          return function(y) {
            var v = compare3(x.value0)(y.value0);
            if (v instanceof LT) {
              return LT.value;
            }
            ;
            if (v instanceof GT) {
              return GT.value;
            }
            ;
            return compare12(x.value1)(y.value1);
          };
        },
        Eq0: function() {
          return eqTuple2;
        }
      };
    };
  };
  var applyTuple = function(dictSemigroup) {
    var append12 = append(dictSemigroup);
    return {
      apply: function(v) {
        return function(v1) {
          return new Tuple(append12(v.value0)(v1.value0), v.value1(v1.value1));
        };
      },
      Functor0: function() {
        return functorTuple;
      }
    };
  };
  var applicativeTuple = function(dictMonoid) {
    var applyTuple1 = applyTuple(dictMonoid.Semigroup0());
    return {
      pure: Tuple.create(mempty(dictMonoid)),
      Apply0: function() {
        return applyTuple1;
      }
    };
  };

  // output/Debug/foreign.js
  var req = typeof module === "undefined" ? void 0 : module.require;
  var util = function() {
    try {
      return req === void 0 ? void 0 : req("util");
    } catch (e) {
      return void 0;
    }
  }();
  var now = function() {
    var perf;
    if (typeof performance !== "undefined") {
      perf = performance;
    } else if (req) {
      try {
        perf = req("perf_hooks").performance;
      } catch (e) {
      }
    }
    return function() {
      return (perf || Date).now();
    };
  }();

  // output/Data.Function.Uncurried/foreign.js
  var mkFn5 = function(fn) {
    return function(a2, b2, c, d, e) {
      return fn(a2)(b2)(c)(d)(e);
    };
  };
  var runFn2 = function(fn) {
    return function(a2) {
      return function(b2) {
        return fn(a2, b2);
      };
    };
  };
  var runFn3 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return fn(a2, b2, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return fn(a2, b2, c, d);
          };
        };
      };
    };
  };
  var runFn5 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return function(e) {
              return fn(a2, b2, c, d, e);
            };
          };
        };
      };
    };
  };

  // output/Control.Monad/index.js
  var unlessM = function(dictMonad) {
    var bind26 = bind(dictMonad.Bind1());
    var unless5 = unless(dictMonad.Applicative0());
    return function(mb) {
      return function(m) {
        return bind26(mb)(function(b2) {
          return unless5(b2)(m);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind26 = bind(dictMonad.Bind1());
    var pure24 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind26(f)(function(f$prime) {
          return bind26(a2)(function(a$prime) {
            return pure24(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Custom.Prelude/index.js
  var pass = function(dictApplicative) {
    return pure(dictApplicative)(unit);
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init4) {
      return function(xs) {
        var acc = init4;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init4) {
      return function(xs) {
        var acc = init4;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var plusArray = {
    empty: [],
    Alt0: function() {
      return altArray;
    }
  };
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Data.Bifunctor/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var bimap = function(dict) {
    return dict.bimap;
  };
  var lmap = function(dictBifunctor) {
    var bimap1 = bimap(dictBifunctor);
    return function(f) {
      return bimap1(f)(identity5);
    };
  };
  var bifunctorTuple = {
    bimap: function(f) {
      return function(g) {
        return function(v) {
          return new Tuple(f(v.value0), g(v.value1));
        };
      };
    }
  };
  var bifunctorEither = {
    bimap: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return new Left(v(v2.value0));
          }
          ;
          if (v2 instanceof Right) {
            return new Right(v1(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Bifunctor (line 32, column 1 - line 34, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    }
  };

  // output/Data.Monoid.Disj/index.js
  var Disj = function(x) {
    return x;
  };
  var semigroupDisj = function(dictHeytingAlgebra) {
    var disj2 = disj(dictHeytingAlgebra);
    return {
      append: function(v) {
        return function(v1) {
          return disj2(v)(v1);
        };
      }
    };
  };
  var monoidDisj = function(dictHeytingAlgebra) {
    var semigroupDisj1 = semigroupDisj(dictHeytingAlgebra);
    return {
      mempty: ff(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupDisj1;
      }
    };
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };
  var over = function() {
    return function() {
      return function(v) {
        return coerce2;
      };
    };
  };
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v) {
            return coerce2;
          };
        };
      };
    };
  };

  // output/Data.Foldable/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var alaF2 = /* @__PURE__ */ alaF()()()();
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond3 = applySecond(dictApplicative.Apply0());
    var pure24 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond3(f($454));
        })(pure24(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_14 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_14(dictFoldable));
    };
  };
  var sequence_ = function(dictApplicative) {
    var traverse_14 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return traverse_14(dictFoldable)(identity6);
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var indexl = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(idx) {
      var go2 = function(cursor) {
        return function(a2) {
          if (cursor.elem instanceof Just) {
            return cursor;
          }
          ;
          var $296 = cursor.pos === idx;
          if ($296) {
            return {
              elem: new Just(a2),
              pos: cursor.pos
            };
          }
          ;
          return {
            pos: cursor.pos + 1 | 0,
            elem: cursor.elem
          };
        };
      };
      var $455 = foldl22(go2)({
        elem: Nothing.value,
        pos: 0
      });
      return function($456) {
        return function(v) {
          return v.elem;
        }($455($456));
      };
    };
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty3;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldableEither = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return v1;
          }
          ;
          if (v2 instanceof Right) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return v1;
          }
          ;
          if (v2 instanceof Right) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Left) {
            return mempty3;
          }
          ;
          if (v1 instanceof Right) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 181, column 1 - line 187, column 28): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append9 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append9(f(x))(acc);
          };
        })(mempty3);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var fold = function(dictFoldable) {
    var foldMap22 = foldMap(dictFoldable);
    return function(dictMonoid) {
      return foldMap22(dictMonoid)(identity6);
    };
  };
  var any = function(dictFoldable) {
    var foldMap22 = foldMap(dictFoldable);
    return function(dictHeytingAlgebra) {
      return alaF2(Disj)(foldMap22(monoidDisj(dictHeytingAlgebra)));
    };
  };

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);
  var applyEffect = /* @__PURE__ */ $lazy_applyEffect(23);

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error5) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error5) {
        setTimeout(function() {
          throw error5;
        }, 0);
      }
    }
    function runSync(left2, right2, eff) {
      try {
        return right2(eff());
      } catch (error5) {
        return left2(error5);
      }
    }
    function runAsync(left2, eff, k) {
      try {
        return eff(k)();
      } catch (error5) {
        k(left2(error5))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size5 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size5 !== 0) {
          size5--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i2, tmp;
          if (size5 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size5) % limit] = cb;
          size5++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util2) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result2) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill3(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result2) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util2.isLeft(result2) && util2.fromLeft(result2)) {
                    setTimeout(function() {
                      throw util2.fromLeft(result2);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill3(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error5) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util2, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step4 = aff;
      var fail4 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run5(localRunTick) {
        var tmp, result2, attempt;
        while (true) {
          tmp = null;
          result2 = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step4 = bhead(step4);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail4 = util2.left(e);
                step4 = null;
              }
              break;
            case STEP_RESULT:
              if (util2.isLeft(step4)) {
                status = RETURN;
                fail4 = step4;
                step4 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step4 = util2.fromRight(step4);
              }
              break;
            case CONTINUE:
              switch (step4.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step4._2;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step4 = util2.right(step4._1);
                  } else {
                    status = STEP_BIND;
                    step4 = step4._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step4 = runSync(util2.left, util2.right, step4._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step4 = runAsync(util2.left, step4._1, function(result3) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step4 = result3;
                        run5(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail4 = util2.left(step4._1);
                  step4 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util2, supervisor, step4._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step4._1) {
                    tmp.run();
                  }
                  step4 = util2.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step4 = sequential3(util2, supervisor, step4._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step4 = interrupt || fail4 || step4;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail4) {
                      status = CONTINUE;
                      step4 = attempt._2(util2.fromLeft(fail4));
                      fail4 = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail4) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step4 = util2.fromRight(step4);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail4 === null) {
                      result2 = util2.fromRight(step4);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result2), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step4 = attempt._3(result2);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail4), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step4 = attempt._1.killed(util2.fromLeft(interrupt))(attempt._2);
                    } else if (fail4) {
                      step4 = attempt._1.failed(util2.fromLeft(fail4))(attempt._2);
                    } else {
                      step4 = attempt._1.completed(util2.fromRight(step4))(attempt._2);
                    }
                    fail4 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail4), attempts, interrupt);
                    status = CONTINUE;
                    step4 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step4 = attempt._1;
                    fail4 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step4));
                }
              }
              joins = null;
              if (interrupt && fail4) {
                setTimeout(function() {
                  throw util2.fromLeft(fail4);
                }, 0);
              } else if (util2.isLeft(step4) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util2.fromLeft(step4);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join5) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join5.rethrow;
            join5.handler(step4)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join5;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill3(error5, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util2.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util2.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util2.left(error5);
              status = COMPLETED;
              step4 = interrupt;
              run5(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util2.left(error5);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step4(error5)), attempts, interrupt);
                }
                status = RETURN;
                step4 = null;
                fail4 = null;
                run5(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util2.left(error5);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step4 = null;
                fail4 = null;
              }
          }
          return canceler;
        };
      }
      function join4(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run5(runTick);
          }
          return canceler;
        };
      }
      return {
        kill: kill3,
        join: join4,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run5(runTick);
              });
            } else {
              run5(runTick);
            }
          }
        }
      };
    }
    function runPar(util2, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root2 = EMPTY;
      function kill3(error5, par2, cb2) {
        var step4 = par2;
        var head6 = null;
        var tail3 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step4.tag) {
              case FORKED:
                if (step4._3 === EMPTY) {
                  tmp = fibers[step4._1];
                  kills2[count++] = tmp.kill(error5, function(result2) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result2)();
                      }
                    };
                  });
                }
                if (head6 === null) {
                  break loop;
                }
                step4 = head6._2;
                if (tail3 === null) {
                  head6 = null;
                } else {
                  head6 = tail3._1;
                  tail3 = tail3._2;
                }
                break;
              case MAP:
                step4 = step4._2;
                break;
              case APPLY:
              case ALT:
                if (head6) {
                  tail3 = new Aff2(CONS, head6, tail3);
                }
                head6 = step4;
                step4 = step4._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util2.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join4(result2, head6, tail3) {
        var fail4, step4, lhs, rhs, tmp, kid;
        if (util2.isLeft(result2)) {
          fail4 = result2;
          step4 = null;
        } else {
          step4 = result2;
          fail4 = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head6 === null) {
              cb(fail4 || step4)();
              return;
            }
            if (head6._3 !== EMPTY) {
              return;
            }
            switch (head6.tag) {
              case MAP:
                if (fail4 === null) {
                  head6._3 = util2.right(head6._1(util2.fromRight(step4)));
                  step4 = head6._3;
                } else {
                  head6._3 = fail4;
                }
                break;
              case APPLY:
                lhs = head6._1._3;
                rhs = head6._2._3;
                if (fail4) {
                  head6._3 = fail4;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill3(early, fail4 === lhs ? head6._2 : head6._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join4(fail4, null, null);
                      } else {
                        join4(fail4, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step4 = util2.right(util2.fromRight(lhs)(util2.fromRight(rhs)));
                  head6._3 = step4;
                }
                break;
              case ALT:
                lhs = head6._1._3;
                rhs = head6._2._3;
                if (lhs === EMPTY && util2.isLeft(rhs) || rhs === EMPTY && util2.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util2.isLeft(lhs) && rhs !== EMPTY && util2.isLeft(rhs)) {
                  fail4 = step4 === lhs ? rhs : lhs;
                  step4 = null;
                  head6._3 = fail4;
                } else {
                  head6._3 = step4;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill3(early, step4 === lhs ? head6._2 : head6._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail3 === null) {
                        join4(step4, null, null);
                      } else {
                        join4(step4, tail3._1, tail3._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail3 === null) {
              head6 = null;
            } else {
              head6 = tail3._1;
              tail3 = tail3._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result2) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result2;
            join4(result2, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run5() {
        var status = CONTINUE;
        var step4 = par;
        var head6 = null;
        var tail3 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step4.tag) {
                  case MAP:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(MAP, step4._1, EMPTY, EMPTY);
                    step4 = step4._2;
                    break;
                  case APPLY:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(APPLY, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  case ALT:
                    if (head6) {
                      tail3 = new Aff2(CONS, head6, tail3);
                    }
                    head6 = new Aff2(ALT, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step4;
                    step4 = new Aff2(FORKED, fid, new Aff2(CONS, head6, tail3), EMPTY);
                    tmp = Fiber(util2, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step4)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head6 === null) {
                  break loop;
                }
                if (head6._1 === EMPTY) {
                  head6._1 = step4;
                  status = CONTINUE;
                  step4 = head6._2;
                  head6._2 = EMPTY;
                } else {
                  head6._2 = step4;
                  step4 = head6;
                  if (tail3 === null) {
                    head6 = null;
                  } else {
                    head6 = tail3._1;
                    tail3 = tail3._2;
                  }
                }
            }
          }
        root2 = step4;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error5, cb2) {
        interrupt = util2.left(error5);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill3(error5, root2, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run5();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential3(util2, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util2, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value16) {
          return Aff.Pure(f(value16));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  function _fork(immediate) {
    return function(aff) {
      return Aff.Fork(immediate, aff);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function generalBracket(acquire) {
    return function(options2) {
      return function(k) {
        return Aff.Bracket(acquire, options2, k);
      };
    };
  }
  function _makeFiber(util2, aff) {
    return function() {
      return Aff.Fiber(util2, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right2, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right2()));
          return function() {
            return Aff.Sync(function() {
              return right2(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function message(e) {
    return e.message;
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map45 = map(Monad0.Bind1().Apply0().Functor0());
    var pure24 = pure(Monad0.Applicative0());
    return function(a2) {
      return catchError1(map45(Right.create)(a2))(function($52) {
        return pure24(Left.create($52));
      });
    };
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref2) {
    return function() {
      return ref2.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref2) {
      return function() {
        var t = f(ref2.value);
        ref2.value = t.state;
        return t.value;
      };
    };
  };
  var write = function(val) {
    return function(ref2) {
      return function() {
        ref2.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s) {
      return $$void2(modify(f)(s));
    };
  };

  // output/Control.Monad.Rec.Class/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var map4 = /* @__PURE__ */ map(functorEffect);
  var Loop = /* @__PURE__ */ function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  }();
  var Done = /* @__PURE__ */ function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  }();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var tailRec = function(f) {
    var go2 = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Loop) {
          $copy_v = f(v.value0);
          return;
        }
        ;
        if (v instanceof Done) {
          $tco_done = true;
          return v.value0;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 103, column 3 - line 103, column 25): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return function($85) {
      return go2(f($85));
    };
  };
  var monadRecIdentity = {
    tailRecM: function(f) {
      var runIdentity = function(v) {
        return v;
      };
      var $86 = tailRec(function($88) {
        return runIdentity(f($88));
      });
      return function($87) {
        return Identity($86($87));
      };
    },
    Monad0: function() {
      return monadIdentity;
    }
  };
  var monadRecEffect = {
    tailRecM: function(f) {
      return function(a2) {
        var fromDone = function(v) {
          if (v instanceof Done) {
            return v.value0;
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 137, column 30 - line 137, column 44): " + [v.constructor.name]);
        };
        return function __do2() {
          var r = bindFlipped2($$new)(f(a2))();
          (function() {
            while (!function __do3() {
              var v = read(r)();
              if (v instanceof Loop) {
                var e = f(v.value0)();
                write(e)(r)();
                return false;
              }
              ;
              if (v instanceof Done) {
                return true;
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 128, column 22 - line 133, column 28): " + [v.constructor.name]);
            }()) {
            }
            ;
            return {};
          })();
          return map4(fromDone)(read(r))();
        };
      };
    },
    Monad0: function() {
      return monadEffect;
    }
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a2) {
      return function() {
        return f(a2());
      };
    };
  };
  var foreach = function(as3) {
    return function(f) {
      return function() {
        for (var i2 = 0, l = as3.length; i2 < l; i2++) {
          f(as3[i2])();
        }
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var functorST = {
    map: map_
  };

  // output/Control.Monad.Reader.Class/index.js
  var ask = function(dict) {
    return dict.ask;
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var put = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(s) {
      return state1(function(v) {
        return new Tuple(unit, s);
      });
    };
  };
  var modify_2 = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s) {
        return new Tuple(unit, f(s));
      });
    };
  };
  var gets = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s) {
        return new Tuple(f(s), s);
      });
    };
  };
  var get = function(dictMonadState) {
    return state(dictMonadState)(function(s) {
      return new Tuple(s, s);
    });
  };

  // output/Control.Monad.Trans.Class/index.js
  var lift = function(dict) {
    return dict.lift;
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map5 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map115(map5(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind26 = bind(dictMonad.Bind1());
    var pure24 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind26(v)(either(function($193) {
            return pure24(Left.create($193));
          })(function(a2) {
            var v1 = k(a2);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $194 = pure(dictMonad.Applicative0());
        return function($195) {
          return ExceptT($194(Right.create($195)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $204 = pure(dictMonad.Applicative0());
        return function($205) {
          return ExceptT($204(Left.create($205)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };
  var altExceptT = function(dictSemigroup) {
    var append9 = append(dictSemigroup);
    return function(dictMonad) {
      var Bind1 = dictMonad.Bind1();
      var bind26 = bind(Bind1);
      var pure24 = pure(dictMonad.Applicative0());
      var functorExceptT1 = functorExceptT(Bind1.Apply0().Functor0());
      return {
        alt: function(v) {
          return function(v1) {
            return bind26(v)(function(rm) {
              if (rm instanceof Right) {
                return pure24(new Right(rm.value0));
              }
              ;
              if (rm instanceof Left) {
                return bind26(v1)(function(rn) {
                  if (rn instanceof Right) {
                    return pure24(new Right(rn.value0));
                  }
                  ;
                  if (rn instanceof Left) {
                    return pure24(new Left(append9(rm.value0)(rn.value0)));
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 87, column 9 - line 89, column 49): " + [rn.constructor.name]);
                });
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 83, column 5 - line 89, column 49): " + [rm.constructor.name]);
            });
          };
        },
        Functor0: function() {
          return functorExceptT1;
        }
      };
    };
  };

  // output/Type.Equality/index.js
  var refl = {
    proof: function(a2) {
      return a2;
    },
    Coercible0: function() {
      return void 0;
    }
  };
  var proof = function(dict) {
    return dict.proof;
  };
  var from2 = function(dictTypeEquals) {
    var v = proof(dictTypeEquals)(function(a2) {
      return a2;
    });
    return v;
  };

  // output/Control.Monad.Reader.Trans/index.js
  var ReaderT = function(x) {
    return x;
  };
  var runReaderT = function(v) {
    return v;
  };
  var monadTransReaderT = {
    lift: function(dictMonad) {
      return function($153) {
        return ReaderT($$const($153));
      };
    }
  };
  var lift3 = /* @__PURE__ */ lift(monadTransReaderT);
  var mapReaderT = function(f) {
    return function(v) {
      return function($154) {
        return f(v($154));
      };
    };
  };
  var functorReaderT = function(dictFunctor) {
    return {
      map: function() {
        var $155 = map(dictFunctor);
        return function($156) {
          return mapReaderT($155($156));
        };
      }()
    };
  };
  var applyReaderT = function(dictApply) {
    var apply5 = apply(dictApply);
    var functorReaderT1 = functorReaderT(dictApply.Functor0());
    return {
      apply: function(v) {
        return function(v1) {
          return function(r) {
            return apply5(v(r))(v1(r));
          };
        };
      },
      Functor0: function() {
        return functorReaderT1;
      }
    };
  };
  var bindReaderT = function(dictBind) {
    var bind26 = bind(dictBind);
    var applyReaderT1 = applyReaderT(dictBind.Apply0());
    return {
      bind: function(v) {
        return function(k) {
          return function(r) {
            return bind26(v(r))(function(a2) {
              var v1 = k(a2);
              return v1(r);
            });
          };
        };
      },
      Apply0: function() {
        return applyReaderT1;
      }
    };
  };
  var applicativeReaderT = function(dictApplicative) {
    var applyReaderT1 = applyReaderT(dictApplicative.Apply0());
    return {
      pure: function() {
        var $160 = pure(dictApplicative);
        return function($161) {
          return ReaderT($$const($160($161)));
        };
      }(),
      Apply0: function() {
        return applyReaderT1;
      }
    };
  };
  var monadReaderT = function(dictMonad) {
    var applicativeReaderT1 = applicativeReaderT(dictMonad.Applicative0());
    var bindReaderT1 = bindReaderT(dictMonad.Bind1());
    return {
      Applicative0: function() {
        return applicativeReaderT1;
      },
      Bind1: function() {
        return bindReaderT1;
      }
    };
  };
  var monadAskReaderT = function(dictMonad) {
    var monadReaderT1 = monadReaderT(dictMonad);
    return {
      ask: pure(dictMonad.Applicative0()),
      Monad0: function() {
        return monadReaderT1;
      }
    };
  };
  var monadEffectReader = function(dictMonadEffect) {
    var Monad0 = dictMonadEffect.Monad0();
    var monadReaderT1 = monadReaderT(Monad0);
    return {
      liftEffect: function() {
        var $163 = lift3(Monad0);
        var $164 = liftEffect(dictMonadEffect);
        return function($165) {
          return $163($164($165));
        };
      }(),
      Monad0: function() {
        return monadReaderT1;
      }
    };
  };

  // output/Data.Profunctor/index.js
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var dimap = function(dict) {
    return dict.dimap;
  };
  var lcmap = function(dictProfunctor) {
    var dimap1 = dimap(dictProfunctor);
    return function(a2b) {
      return dimap1(a2b)(identity7);
    };
  };

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply5) {
      return function(map45) {
        return function(pure24) {
          return function(f) {
            return function(array4) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure24([]);
                  case 1:
                    return map45(array1)(f(array4[bot]));
                  case 2:
                    return apply5(map45(array2)(f(array4[bot])))(f(array4[bot + 1]));
                  case 3:
                    return apply5(apply5(map45(array3)(f(array4[bot])))(f(array4[bot + 1])))(f(array4[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply5(map45(concat2)(go2(bot, pivot)))(go2(pivot, top3));
                }
              }
              return go2(0, array4.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity8);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var sequence = function(dict) {
    return dict.sequence;
  };

  // output/Control.Parallel/index.js
  var identity9 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential3 = sequential(dictParallel);
    var parallel4 = parallel(dictParallel);
    return function(dictApplicative) {
      var traverse_7 = traverse_(dictApplicative);
      return function(dictFoldable) {
        var traverse_14 = traverse_7(dictFoldable);
        return function(f) {
          var $51 = traverse_14(function($53) {
            return parallel4(f($53));
          });
          return function($52) {
            return sequential3($51($52));
          };
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictApplicative) {
      var parTraverse_2 = parTraverse_1(dictApplicative);
      return function(dictFoldable) {
        return parTraverse_2(dictFoldable)(identity9);
      };
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy2 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var map6 = /* @__PURE__ */ map(functorEffect);
  var Canceler = function(x) {
    return x;
  };
  var suspendAff = /* @__PURE__ */ _fork(false);
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var map1 = /* @__PURE__ */ map(functorAff);
  var forkAff = /* @__PURE__ */ _fork(true);
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do2() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var launchAff_ = function($75) {
    return $$void3(launchAff($75));
  };
  var bracket = function(acquire) {
    return function(completed) {
      return generalBracket(acquire)({
        killed: $$const(completed),
        failed: $$const(completed),
        completed: $$const(completed)
      });
    };
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var applyAff = /* @__PURE__ */ $lazy_applyAff(73);
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var bind1 = /* @__PURE__ */ bind(bindAff);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindAff);
  var $$finally = function(fin) {
    return function(a2) {
      return bracket(pure22(unit))($$const(fin))($$const(a2));
    };
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Apply0: function() {
      return applyAff;
    },
    Apply1: function() {
      return applyParAff;
    }
  };
  var parallel2 = /* @__PURE__ */ parallel(parallelAff);
  var applicativeParAff = {
    pure: function($76) {
      return parallel2(pure22($76));
    },
    Apply0: function() {
      return applyParAff;
    }
  };
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var effectCanceler = function($77) {
    return Canceler($$const(liftEffect2($77)));
  };
  var joinFiber = function(v) {
    return makeAff(function(k) {
      return map6(effectCanceler)(v.join(k));
    });
  };
  var functorFiber = {
    map: function(f) {
      return function(t) {
        return unsafePerformEffect(makeFiber(map1(f)(joinFiber(t))));
      };
    }
  };
  var killFiber = function(e) {
    return function(v) {
      return bind1(liftEffect2(v.isSuspended))(function(suspended) {
        if (suspended) {
          return liftEffect2($$void3(v.kill(e, $$const(pure2(unit)))));
        }
        ;
        return makeAff(function(k) {
          return map6(effectCanceler)(v.kill(e, k));
        });
      });
    };
  };
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped3(function($83) {
        return liftEffect2(k($83));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void3(runAff(k)(aff));
    };
  };
  var monadRecAff = {
    tailRecM: function(k) {
      var go2 = function(a2) {
        return bind1(k(a2))(function(res) {
          if (res instanceof Done) {
            return pure22(res.value0);
          }
          ;
          if (res instanceof Loop) {
            return go2(res.value0);
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 104, column 7 - line 106, column 23): " + [res.constructor.name]);
        });
      };
      return go2;
    },
    Monad0: function() {
      return monadAff;
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name17) {
    return function(node) {
      return function() {
        return node[name17];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }
  function notNull(x) {
    return x;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.DOM.ParentNode/index.js
  var map7 = /* @__PURE__ */ map(functorEffect);
  var querySelector = function(qs) {
    var $2 = map7(toMaybe);
    var $3 = _querySelector(qs);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.Common/index.js
  var ClassName = function(x) {
    return x;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _readyState(doc) {
    return doc.readyState;
  }

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading = /* @__PURE__ */ function() {
    function Loading3() {
    }
    ;
    Loading3.value = new Loading3();
    return Loading3;
  }();
  var Interactive = /* @__PURE__ */ function() {
    function Interactive2() {
    }
    ;
    Interactive2.value = new Interactive2();
    return Interactive2;
  }();
  var Complete = /* @__PURE__ */ function() {
    function Complete2() {
    }
    ;
    Complete2.value = new Complete2();
    return Complete2;
  }();
  var parse = function(v) {
    if (v === "loading") {
      return new Just(Loading.value);
    }
    ;
    if (v === "interactive") {
      return new Just(Interactive.value);
    }
    ;
    if (v === "complete") {
      return new Just(Complete.value);
    }
    ;
    return Nothing.value;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var map8 = /* @__PURE__ */ map(functorEffect);
  var toParentNode = unsafeCoerce2;
  var toDocument = unsafeCoerce2;
  var readyState = function(doc) {
    return map8(function() {
      var $4 = fromMaybe(Loading.value);
      return function($5) {
        return $4(parse($5));
      };
    }())(function() {
      return _readyState(doc);
    });
  };

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value16) {
    var tag = Object.prototype.toString.call(value16);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value16);
    } else {
      return nothing;
    }
  }

  // output/Web.HTML.HTMLElement/index.js
  var toNode = unsafeCoerce2;
  var fromElement = function(x) {
    return _read(Nothing.value, Just.create, x);
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust10) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result2 = [];
              var value16 = b2;
              while (true) {
                var maybe2 = f(value16);
                if (isNothing2(maybe2))
                  return result2;
                var tuple = fromJust10(maybe2);
                result2.push(fst2(tuple));
                value16 = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust10) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result2 = [];
              var value16 = b2;
              while (true) {
                var tuple = f(value16);
                result2.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2))
                  return result2;
                value16 = fromJust10(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

  // output/Data.Enum/index.js
  var bottom1 = /* @__PURE__ */ bottom(boundedChar);
  var top1 = /* @__PURE__ */ top(boundedChar);
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var toEnumWithDefaults = function(dictBoundedEnum) {
    var toEnum1 = toEnum(dictBoundedEnum);
    var fromEnum12 = fromEnum(dictBoundedEnum);
    var bottom22 = bottom(dictBoundedEnum.Bounded0());
    return function(low2) {
      return function(high2) {
        return function(x) {
          var v = toEnum1(x);
          if (v instanceof Just) {
            return v.value0;
          }
          ;
          if (v instanceof Nothing) {
            var $140 = x < fromEnum12(bottom22);
            if ($140) {
              return low2;
            }
            ;
            return high2;
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
        };
      };
    };
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
      return new Just(fromCharCode(v));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

  // output/Web.HTML.Location/foreign.js
  function hash(location3) {
    return function() {
      return location3.hash;
    };
  }
  function setHash(hash4) {
    return function(location3) {
      return function() {
        location3.hash = hash4;
      };
    };
  }

  // output/Web.HTML.Window/foreign.js
  function document(window2) {
    return function() {
      return window2.document;
    };
  }
  function location2(window2) {
    return function() {
      return window2.location;
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget = unsafeCoerce2;

  // output/Web.HTML.Event.EventTypes/index.js
  var input = "input";
  var domcontentloaded = "DOMContentLoaded";

  // output/Halogen.Aff.Util/index.js
  var bind2 = /* @__PURE__ */ bind(bindAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindEffect);
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindEffect);
  var pure3 = /* @__PURE__ */ pure(applicativeAff);
  var bindFlipped1 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var pure1 = /* @__PURE__ */ pure(applicativeEffect);
  var map9 = /* @__PURE__ */ map(functorEffect);
  var discard2 = /* @__PURE__ */ discard(discardUnit);
  var throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
  var selectElement = function(query3) {
    return bind2(liftEffect3(bindFlipped4(composeKleisliFlipped2(function() {
      var $16 = querySelector(query3);
      return function($17) {
        return $16(toParentNode($17));
      };
    }())(document))(windowImpl)))(function(mel) {
      return pure3(bindFlipped1(fromElement)(mel));
    });
  };
  var runHalogenAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure1(unit))));
  var awaitLoad = /* @__PURE__ */ makeAff(function(callback) {
    return function __do2() {
      var rs = bindFlipped4(readyState)(bindFlipped4(document)(windowImpl))();
      if (rs instanceof Loading) {
        var et = map9(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v) {
          return callback(new Right(unit));
        })();
        addEventListener(domcontentloaded)(listener)(false)(et)();
        return effectCanceler(removeEventListener(domcontentloaded)(listener)(false)(et));
      }
      ;
      callback(new Right(unit))();
      return nonCanceler;
    };
  });
  var awaitBody = /* @__PURE__ */ discard2(bindAff)(awaitLoad)(function() {
    return bind2(selectElement("body"))(function(body3) {
      return maybe(throwError2(error("Could not find body")))(pure3)(body3);
    });
  });

  // output/Data.Exists/index.js
  var runExists = unsafeCoerce2;
  var mkExists = unsafeCoerce2;

  // output/Data.Coyoneda/index.js
  var CoyonedaF = /* @__PURE__ */ function() {
    function CoyonedaF2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CoyonedaF2.create = function(value0) {
      return function(value1) {
        return new CoyonedaF2(value0, value1);
      };
    };
    return CoyonedaF2;
  }();
  var unCoyoneda = function(f) {
    return function(v) {
      return runExists(function(v1) {
        return f(v1.value0)(v1.value1);
      })(v);
    };
  };
  var coyoneda = function(k) {
    return function(fi) {
      return mkExists(new CoyonedaF(k, fi));
    };
  };
  var functorCoyoneda = {
    map: function(f) {
      return function(v) {
        return runExists(function(v1) {
          return coyoneda(function($180) {
            return f(v1.value0($180));
          })(v1.value1);
        })(v);
      };
    }
  };
  var liftCoyoneda = /* @__PURE__ */ coyoneda(/* @__PURE__ */ identity(categoryFn));

  // output/Data.FunctorWithIndex/foreign.js
  var mapWithIndexArray = function(f) {
    return function(xs) {
      var l = xs.length;
      var result2 = Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result2[i2] = f(i2)(xs[i2]);
      }
      return result2;
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Data.FoldableWithIndex/index.js
  var foldr8 = /* @__PURE__ */ foldr(foldableArray);
  var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var foldl8 = /* @__PURE__ */ foldl(foldableArray);
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    return function(dictMonoid) {
      var append9 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldrWithIndex1(function(i2) {
          return function(x) {
            return function(acc) {
              return append9(f(i2)(x))(acc);
            };
          };
        })(mempty3);
      };
    };
  };
  var foldableWithIndexArray = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $291 = foldr8(function(v) {
          return function(y) {
            return f(v.value0)(v.value1)(y);
          };
        })(z);
        var $292 = mapWithIndex2(Tuple.create);
        return function($293) {
          return $291($292($293));
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $294 = foldl8(function(y) {
          return function(v) {
            return f(v.value0)(y)(v.value1);
          };
        })(z);
        var $295 = mapWithIndex2(Tuple.create);
        return function($296) {
          return $294($295($296));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
    },
    Foldable0: function() {
      return foldableArray;
    }
  };

  // output/Data.TraversableWithIndex/index.js
  var traverseWithIndexDefault = function(dictTraversableWithIndex) {
    var sequence2 = sequence(dictTraversableWithIndex.Traversable2());
    var mapWithIndex4 = mapWithIndex(dictTraversableWithIndex.FunctorWithIndex0());
    return function(dictApplicative) {
      var sequence12 = sequence2(dictApplicative);
      return function(f) {
        var $174 = mapWithIndex4(f);
        return function($175) {
          return sequence12($174($175));
        };
      };
    };
  };
  var traverseWithIndex = function(dict) {
    return dict.traverseWithIndex;
  };
  var traversableWithIndexArray = {
    traverseWithIndex: function(dictApplicative) {
      return traverseWithIndexDefault(traversableWithIndexArray)(dictApplicative);
    },
    FunctorWithIndex0: function() {
      return functorWithIndexArray;
    },
    FoldableWithIndex1: function() {
      return foldableWithIndexArray;
    },
    Traversable2: function() {
      return traversableArray;
    }
  };

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton2 = function(dictPlus) {
    var empty8 = empty(dictPlus);
    return function(a2) {
      return new NonEmpty(a2, empty8);
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var toList = function(v) {
    return new Cons(v.value0, v.value1);
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var map10 = /* @__PURE__ */ map(functorList);
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b2);
        return function($285) {
          return $284(rev3($285));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b2, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b2;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b2)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty3);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var monoidList = /* @__PURE__ */ function() {
    return {
      mempty: Nil.value,
      Semigroup0: function() {
        return semigroupList;
      }
    };
  }();
  var semigroupNonEmptyList = {
    append: function(v) {
      return function(as$prime) {
        return new NonEmpty(v.value0, append1(v.value1)(toList(as$prime)));
      };
    }
  };
  var applyList = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Nil) {
          return Nil.value;
        }
        ;
        if (v instanceof Cons) {
          return append1(map10(v.value0)(v1))(apply(applyList)(v.value1)(v1));
        }
        ;
        throw new Error("Failed pattern match at Data.List.Types (line 157, column 1 - line 159, column 48): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorList;
    }
  };
  var applicativeList = {
    pure: function(a2) {
      return new Cons(a2, Nil.value);
    },
    Apply0: function() {
      return applyList;
    }
  };
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Data.Map.Internal/index.js
  var $runtime_lazy3 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var map11 = /* @__PURE__ */ map(functorMaybe);
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Node = /* @__PURE__ */ function() {
    function Node2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    Node2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new Node2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return Node2;
  }();
  var Split = /* @__PURE__ */ function() {
    function Split2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Split2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Split2(value0, value1, value22);
        };
      };
    };
    return Split2;
  }();
  var SplitLast = /* @__PURE__ */ function() {
    function SplitLast2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    SplitLast2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new SplitLast2(value0, value1, value22);
        };
      };
    };
    return SplitLast2;
  }();
  var unsafeNode = function(k, v, l, r) {
    if (l instanceof Leaf) {
      if (r instanceof Leaf) {
        return new Node(1, 1, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + r.value0 | 0, 1 + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 702, column 5 - line 706, column 39): " + [r.constructor.name]);
    }
    ;
    if (l instanceof Node) {
      if (r instanceof Leaf) {
        return new Node(1 + l.value0 | 0, 1 + l.value1 | 0, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + function() {
          var $280 = l.value0 > r.value0;
          if ($280) {
            return l.value0;
          }
          ;
          return r.value0;
        }() | 0, (1 + l.value1 | 0) + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 708, column 5 - line 712, column 68): " + [r.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 700, column 32 - line 712, column 68): " + [l.constructor.name]);
  };
  var singleton3 = function(k) {
    return function(v) {
      return new Node(1, 1, k, v, Leaf.value, Leaf.value);
    };
  };
  var unsafeBalancedNode = /* @__PURE__ */ function() {
    var height8 = function(v) {
      if (v instanceof Leaf) {
        return 0;
      }
      ;
      if (v instanceof Node) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 757, column 12 - line 759, column 26): " + [v.constructor.name]);
    };
    var rotateLeft = function(k, v, l, rk, rv, rl, rr) {
      if (rl instanceof Node && rl.value0 > height8(rr)) {
        return unsafeNode(rl.value2, rl.value3, unsafeNode(k, v, l, rl.value4), unsafeNode(rk, rv, rl.value5, rr));
      }
      ;
      return unsafeNode(rk, rv, unsafeNode(k, v, l, rl), rr);
    };
    var rotateRight = function(k, v, lk, lv, ll, lr, r) {
      if (lr instanceof Node && height8(ll) <= lr.value0) {
        return unsafeNode(lr.value2, lr.value3, unsafeNode(lk, lv, ll, lr.value4), unsafeNode(k, v, lr.value5, r));
      }
      ;
      return unsafeNode(lk, lv, ll, unsafeNode(k, v, lr, r));
    };
    return function(k, v, l, r) {
      if (l instanceof Leaf) {
        if (r instanceof Leaf) {
          return singleton3(k)(v);
        }
        ;
        if (r instanceof Node && r.value0 > 1) {
          return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      if (l instanceof Node) {
        if (r instanceof Node) {
          if (r.value0 > (l.value0 + 1 | 0)) {
            return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
          }
          ;
          if (l.value0 > (r.value0 + 1 | 0)) {
            return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
          }
          ;
        }
        ;
        if (r instanceof Leaf && l.value0 > 1) {
          return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 717, column 40 - line 738, column 34): " + [l.constructor.name]);
    };
  }();
  var $lazy_unsafeSplit = /* @__PURE__ */ $runtime_lazy3("unsafeSplit", "Data.Map.Internal", function() {
    return function(comp, k, m) {
      if (m instanceof Leaf) {
        return new Split(Nothing.value, Leaf.value, Leaf.value);
      }
      ;
      if (m instanceof Node) {
        var v = comp(k)(m.value2);
        if (v instanceof LT) {
          var v1 = $lazy_unsafeSplit(793)(comp, k, m.value4);
          return new Split(v1.value0, v1.value1, unsafeBalancedNode(m.value2, m.value3, v1.value2, m.value5));
        }
        ;
        if (v instanceof GT) {
          var v1 = $lazy_unsafeSplit(796)(comp, k, m.value5);
          return new Split(v1.value0, unsafeBalancedNode(m.value2, m.value3, m.value4, v1.value1), v1.value2);
        }
        ;
        if (v instanceof EQ) {
          return new Split(new Just(m.value3), m.value4, m.value5);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 791, column 5 - line 799, column 30): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 787, column 34 - line 799, column 30): " + [m.constructor.name]);
    };
  });
  var unsafeSplit = /* @__PURE__ */ $lazy_unsafeSplit(786);
  var $lazy_unsafeSplitLast = /* @__PURE__ */ $runtime_lazy3("unsafeSplitLast", "Data.Map.Internal", function() {
    return function(k, v, l, r) {
      if (r instanceof Leaf) {
        return new SplitLast(k, v, l);
      }
      ;
      if (r instanceof Node) {
        var v1 = $lazy_unsafeSplitLast(779)(r.value2, r.value3, r.value4, r.value5);
        return new SplitLast(v1.value0, v1.value1, unsafeBalancedNode(k, v, l, v1.value2));
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 776, column 37 - line 780, column 57): " + [r.constructor.name]);
    };
  });
  var unsafeSplitLast = /* @__PURE__ */ $lazy_unsafeSplitLast(775);
  var unsafeJoinNodes = function(v, v1) {
    if (v instanceof Leaf) {
      return v1;
    }
    ;
    if (v instanceof Node) {
      var v2 = unsafeSplitLast(v.value2, v.value3, v.value4, v.value5);
      return unsafeBalancedNode(v2.value0, v2.value1, v2.value2, v1);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 764, column 25 - line 768, column 38): " + [v.constructor.name, v1.constructor.name]);
  };
  var pop = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      return function(m) {
        var v = unsafeSplit(compare3, k, m);
        return map11(function(a2) {
          return new Tuple(a2, unsafeJoinNodes(v.value1, v.value2));
        })(v.value0);
      };
    };
  };
  var lookup = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Node) {
            var v1 = compare3(k)(v.value2);
            if (v1 instanceof LT) {
              $copy_v = v.value4;
              return;
            }
            ;
            if (v1 instanceof GT) {
              $copy_v = v.value5;
              return;
            }
            ;
            if (v1 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value3);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 283, column 7 - line 286, column 22): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 280, column 8 - line 286, column 22): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go2;
    };
  };
  var insert = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var go2 = function(v1) {
          if (v1 instanceof Leaf) {
            return singleton3(k)(v);
          }
          ;
          if (v1 instanceof Node) {
            var v2 = compare3(k)(v1.value2);
            if (v2 instanceof LT) {
              return unsafeBalancedNode(v1.value2, v1.value3, go2(v1.value4), v1.value5);
            }
            ;
            if (v2 instanceof GT) {
              return unsafeBalancedNode(v1.value2, v1.value3, v1.value4, go2(v1.value5));
            }
            ;
            if (v2 instanceof EQ) {
              return new Node(v1.value0, v1.value1, k, v, v1.value4, v1.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 471, column 7 - line 474, column 35): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 468, column 8 - line 474, column 35): " + [v1.constructor.name]);
        };
        return go2;
      };
    };
  };
  var foldableMap = {
    foldr: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(m$prime, z$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(172)(m$prime.value4, f(m$prime.value3)($lazy_go(172)(m$prime.value5, z$prime)));
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 169, column 26 - line 172, column 43): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(169);
        return function(m) {
          return go2(m, z);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(z$prime, m$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(178)(f($lazy_go(178)(z$prime, m$prime.value4))(m$prime.value3), m$prime.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 175, column 26 - line 178, column 43): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(175);
        return function(m) {
          return go2(z, m);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      var append12 = append(dictMonoid.Semigroup0());
      return function(f) {
        var go2 = function(v) {
          if (v instanceof Leaf) {
            return mempty3;
          }
          ;
          if (v instanceof Node) {
            return append12(go2(v.value4))(append12(f(v.value3))(go2(v.value5)));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 181, column 10 - line 184, column 28): " + [v.constructor.name]);
        };
        return go2;
      };
    }
  };
  var empty2 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var $$delete = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      var go2 = function(v) {
        if (v instanceof Leaf) {
          return Leaf.value;
        }
        ;
        if (v instanceof Node) {
          var v1 = compare3(k)(v.value2);
          if (v1 instanceof LT) {
            return unsafeBalancedNode(v.value2, v.value3, go2(v.value4), v.value5);
          }
          ;
          if (v1 instanceof GT) {
            return unsafeBalancedNode(v.value2, v.value3, v.value4, go2(v.value5));
          }
          ;
          if (v1 instanceof EQ) {
            return unsafeJoinNodes(v.value4, v.value5);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 7 - line 501, column 43): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 8 - line 501, column 43): " + [v.constructor.name]);
      };
      return go2;
    };
  };
  var alter = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          var v = unsafeSplit(compare3, k, m);
          var v2 = f(v.value0);
          if (v2 instanceof Nothing) {
            return unsafeJoinNodes(v.value1, v.value2);
          }
          ;
          if (v2 instanceof Just) {
            return unsafeBalancedNode(k, v2.value0, v.value1, v.value2);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 514, column 3 - line 518, column 41): " + [v2.constructor.name]);
        };
      };
    };
  };

  // output/Halogen.Data.OrdBox/index.js
  var OrdBox = /* @__PURE__ */ function() {
    function OrdBox2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    OrdBox2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new OrdBox2(value0, value1, value22);
        };
      };
    };
    return OrdBox2;
  }();
  var mkOrdBox = function(dictOrd) {
    return OrdBox.create(eq(dictOrd.Eq0()))(compare(dictOrd));
  };
  var eqOrdBox = {
    eq: function(v) {
      return function(v1) {
        return v.value0(v.value2)(v1.value2);
      };
    }
  };
  var ordOrdBox = {
    compare: function(v) {
      return function(v1) {
        return v.value1(v.value2)(v1.value2);
      };
    },
    Eq0: function() {
      return eqOrdBox;
    }
  };

  // output/Halogen.Data.Slot/index.js
  var ordTuple2 = /* @__PURE__ */ ordTuple(ordString)(ordOrdBox);
  var pop1 = /* @__PURE__ */ pop(ordTuple2);
  var lookup1 = /* @__PURE__ */ lookup(ordTuple2);
  var insert1 = /* @__PURE__ */ insert(ordTuple2);
  var pop2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key) {
            return function(v) {
              return pop1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key)))(v);
            };
          };
        };
      };
    };
  };
  var lookup2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key) {
            return function(v) {
              return lookup1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key)))(v);
            };
          };
        };
      };
    };
  };
  var insert2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key) {
            return function(val) {
              return function(v) {
                return insert1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key)))(val)(v);
              };
            };
          };
        };
      };
    };
  };
  var foreachSlot = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMap);
    return function(v) {
      return function(k) {
        return traverse_7(function($54) {
          return k($54);
        })(v);
      };
    };
  };
  var empty3 = empty2;

  // output/DOM.HTML.Indexed.InputType/index.js
  var InputButton = /* @__PURE__ */ function() {
    function InputButton2() {
    }
    ;
    InputButton2.value = new InputButton2();
    return InputButton2;
  }();
  var InputCheckbox = /* @__PURE__ */ function() {
    function InputCheckbox2() {
    }
    ;
    InputCheckbox2.value = new InputCheckbox2();
    return InputCheckbox2;
  }();
  var InputColor = /* @__PURE__ */ function() {
    function InputColor2() {
    }
    ;
    InputColor2.value = new InputColor2();
    return InputColor2;
  }();
  var InputDate = /* @__PURE__ */ function() {
    function InputDate2() {
    }
    ;
    InputDate2.value = new InputDate2();
    return InputDate2;
  }();
  var InputDatetimeLocal = /* @__PURE__ */ function() {
    function InputDatetimeLocal2() {
    }
    ;
    InputDatetimeLocal2.value = new InputDatetimeLocal2();
    return InputDatetimeLocal2;
  }();
  var InputEmail = /* @__PURE__ */ function() {
    function InputEmail2() {
    }
    ;
    InputEmail2.value = new InputEmail2();
    return InputEmail2;
  }();
  var InputFile = /* @__PURE__ */ function() {
    function InputFile2() {
    }
    ;
    InputFile2.value = new InputFile2();
    return InputFile2;
  }();
  var InputHidden = /* @__PURE__ */ function() {
    function InputHidden2() {
    }
    ;
    InputHidden2.value = new InputHidden2();
    return InputHidden2;
  }();
  var InputImage = /* @__PURE__ */ function() {
    function InputImage2() {
    }
    ;
    InputImage2.value = new InputImage2();
    return InputImage2;
  }();
  var InputMonth = /* @__PURE__ */ function() {
    function InputMonth2() {
    }
    ;
    InputMonth2.value = new InputMonth2();
    return InputMonth2;
  }();
  var InputNumber = /* @__PURE__ */ function() {
    function InputNumber2() {
    }
    ;
    InputNumber2.value = new InputNumber2();
    return InputNumber2;
  }();
  var InputPassword = /* @__PURE__ */ function() {
    function InputPassword2() {
    }
    ;
    InputPassword2.value = new InputPassword2();
    return InputPassword2;
  }();
  var InputRadio = /* @__PURE__ */ function() {
    function InputRadio2() {
    }
    ;
    InputRadio2.value = new InputRadio2();
    return InputRadio2;
  }();
  var InputRange = /* @__PURE__ */ function() {
    function InputRange2() {
    }
    ;
    InputRange2.value = new InputRange2();
    return InputRange2;
  }();
  var InputReset = /* @__PURE__ */ function() {
    function InputReset2() {
    }
    ;
    InputReset2.value = new InputReset2();
    return InputReset2;
  }();
  var InputSearch = /* @__PURE__ */ function() {
    function InputSearch2() {
    }
    ;
    InputSearch2.value = new InputSearch2();
    return InputSearch2;
  }();
  var InputSubmit = /* @__PURE__ */ function() {
    function InputSubmit2() {
    }
    ;
    InputSubmit2.value = new InputSubmit2();
    return InputSubmit2;
  }();
  var InputTel = /* @__PURE__ */ function() {
    function InputTel2() {
    }
    ;
    InputTel2.value = new InputTel2();
    return InputTel2;
  }();
  var InputText = /* @__PURE__ */ function() {
    function InputText2() {
    }
    ;
    InputText2.value = new InputText2();
    return InputText2;
  }();
  var InputTime = /* @__PURE__ */ function() {
    function InputTime2() {
    }
    ;
    InputTime2.value = new InputTime2();
    return InputTime2;
  }();
  var InputUrl = /* @__PURE__ */ function() {
    function InputUrl2() {
    }
    ;
    InputUrl2.value = new InputUrl2();
    return InputUrl2;
  }();
  var InputWeek = /* @__PURE__ */ function() {
    function InputWeek2() {
    }
    ;
    InputWeek2.value = new InputWeek2();
    return InputWeek2;
  }();
  var renderInputType = function(v) {
    if (v instanceof InputButton) {
      return "button";
    }
    ;
    if (v instanceof InputCheckbox) {
      return "checkbox";
    }
    ;
    if (v instanceof InputColor) {
      return "color";
    }
    ;
    if (v instanceof InputDate) {
      return "date";
    }
    ;
    if (v instanceof InputDatetimeLocal) {
      return "datetime-local";
    }
    ;
    if (v instanceof InputEmail) {
      return "email";
    }
    ;
    if (v instanceof InputFile) {
      return "file";
    }
    ;
    if (v instanceof InputHidden) {
      return "hidden";
    }
    ;
    if (v instanceof InputImage) {
      return "image";
    }
    ;
    if (v instanceof InputMonth) {
      return "month";
    }
    ;
    if (v instanceof InputNumber) {
      return "number";
    }
    ;
    if (v instanceof InputPassword) {
      return "password";
    }
    ;
    if (v instanceof InputRadio) {
      return "radio";
    }
    ;
    if (v instanceof InputRange) {
      return "range";
    }
    ;
    if (v instanceof InputReset) {
      return "reset";
    }
    ;
    if (v instanceof InputSearch) {
      return "search";
    }
    ;
    if (v instanceof InputSubmit) {
      return "submit";
    }
    ;
    if (v instanceof InputTel) {
      return "tel";
    }
    ;
    if (v instanceof InputText) {
      return "text";
    }
    ;
    if (v instanceof InputTime) {
      return "time";
    }
    ;
    if (v instanceof InputUrl) {
      return "url";
    }
    ;
    if (v instanceof InputWeek) {
      return "week";
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.InputType (line 33, column 19 - line 55, column 22): " + [v.constructor.name]);
  };

  // output/Halogen.Query.Input/index.js
  var RefUpdate = /* @__PURE__ */ function() {
    function RefUpdate2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RefUpdate2.create = function(value0) {
      return function(value1) {
        return new RefUpdate2(value0, value1);
      };
    };
    return RefUpdate2;
  }();
  var Action = /* @__PURE__ */ function() {
    function Action3(value0) {
      this.value0 = value0;
    }
    ;
    Action3.create = function(value0) {
      return new Action3(value0);
    };
    return Action3;
  }();
  var functorInput = {
    map: function(f) {
      return function(m) {
        if (m instanceof RefUpdate) {
          return new RefUpdate(m.value0, m.value1);
        }
        ;
        if (m instanceof Action) {
          return new Action(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Query.Input (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count, value16) {
    if (count < 1) {
      return [];
    }
    var result2 = new Array(count);
    return result2.fill(value16);
  };
  var replicatePolyfill = function(count, value16) {
    var result2 = [];
    var n = 0;
    for (var i2 = 0; i2 < count; i2++) {
      result2[n++] = value16;
    }
    return result2;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head6, tail3) {
      this.head = head6;
      this.tail = tail3;
    }
    var emptyList = {};
    function curryCons(head6) {
      return function(tail3) {
        return new Cons3(head6, tail3);
      };
    }
    function listToArray(list) {
      var result2 = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result2[count++] = xs.head;
        xs = xs.tail;
      }
      return result2;
    }
    return function(foldr4, xs) {
      return listToArray(foldr4(curryCons)(emptyList)(xs));
    };
  }();
  var length3 = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty8, next, xs) {
    return xs.length === 0 ? empty8({}) : next(xs[0])(xs.slice(1));
  };
  var indexImpl = function(just, nothing, xs, i2) {
    return i2 < 0 || i2 >= xs.length ? nothing : just(xs[i2]);
  };
  var findIndexImpl = function(just, nothing, f, xs) {
    for (var i2 = 0, l = xs.length; i2 < l; i2++) {
      if (f(xs[i2]))
        return just(i2);
    }
    return nothing;
  };
  var _deleteAt = function(just, nothing, i2, l) {
    if (i2 < 0 || i2 >= l.length)
      return nothing;
    var l1 = l.slice();
    l1.splice(i2, 1);
    return just(l1);
  };
  var _updateAt = function(just, nothing, i2, a2, l) {
    if (i2 < 0 || i2 >= l.length)
      return nothing;
    var l1 = l.slice();
    l1[i2] = a2;
    return just(l1);
  };
  var sortByImpl = function() {
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from4, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from4 + (to2 - from4 >> 1);
      if (mid - from4 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from4, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to2);
      i2 = from4;
      j = mid;
      k = from4;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare3(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to2) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare3, fromOrdering, xs) {
      var out;
      if (xs.length < 2)
        return xs;
      out = xs.slice(0);
      mergeFromTo(compare3, fromOrdering, out, xs.slice(0), 0, xs.length);
      return out;
    };
  }();
  var sliceImpl = function(s, e, l) {
    return l.slice(s, e);
  };
  var allImpl = function(p2, xs) {
    var len = xs.length;
    for (var i2 = 0; i2 < len; i2++) {
      if (!p2(xs[i2]))
        return false;
    }
    return true;
  };
  var unsafeIndexImpl = function(xs, n) {
    return xs[n];
  };

  // output/Data.Array.ST/foreign.js
  function unsafeFreezeThawImpl(xs) {
    return xs;
  }
  var unsafeFreezeImpl = unsafeFreezeThawImpl;
  function copyImpl(xs) {
    return xs.slice();
  }
  var thawImpl = copyImpl;
  var sortByImpl2 = function() {
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from4, to2) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from4 + (to2 - from4 >> 1);
      if (mid - from4 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from4, mid);
      if (to2 - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to2);
      i2 = from4;
      j = mid;
      k = from4;
      while (i2 < mid && j < to2) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare3(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to2) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare3, fromOrdering, xs) {
      if (xs.length < 2)
        return xs;
      mergeFromTo(compare3, fromOrdering, xs, xs.slice(0), 0, xs.length);
      return xs;
    };
  }();
  var pushImpl = function(a2, xs) {
    return xs.push(a2);
  };

  // output/Control.Monad.ST.Uncurried/foreign.js
  var runSTFn1 = function runSTFn12(fn) {
    return function(a2) {
      return function() {
        return fn(a2);
      };
    };
  };
  var runSTFn2 = function runSTFn22(fn) {
    return function(a2) {
      return function(b2) {
        return function() {
          return fn(a2, b2);
        };
      };
    };
  };

  // output/Data.Array.ST/index.js
  var unsafeFreeze = /* @__PURE__ */ runSTFn1(unsafeFreezeImpl);
  var thaw = /* @__PURE__ */ runSTFn1(thawImpl);
  var withArray = function(f) {
    return function(xs) {
      return function __do2() {
        var result2 = thaw(xs)();
        f(result2)();
        return unsafeFreeze(result2)();
      };
    };
  };
  var push = /* @__PURE__ */ runSTFn2(pushImpl);

  // output/Data.Array/index.js
  var map12 = /* @__PURE__ */ map(functorMaybe);
  var fromJust4 = /* @__PURE__ */ fromJust();
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var updateAt = /* @__PURE__ */ function() {
    return runFn5(_updateAt)(Just.create)(Nothing.value);
  }();
  var unsafeIndex = function() {
    return runFn2(unsafeIndexImpl);
  };
  var unsafeIndex1 = /* @__PURE__ */ unsafeIndex();
  var tail = /* @__PURE__ */ function() {
    return runFn3(unconsImpl)($$const(Nothing.value))(function(v) {
      return function(xs) {
        return new Just(xs);
      };
    });
  }();
  var snoc = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var slice = /* @__PURE__ */ runFn3(sliceImpl);
  var singleton4 = function(a2) {
    return [a2];
  };
  var $$null2 = function(xs) {
    return length3(xs) === 0;
  };
  var mapWithIndex3 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var init = function(xs) {
    if ($$null2(xs)) {
      return Nothing.value;
    }
    ;
    if (otherwise) {
      return new Just(slice(0)(length3(xs) - 1 | 0)(xs));
    }
    ;
    throw new Error("Failed pattern match at Data.Array (line 351, column 1 - line 351, column 45): " + [xs.constructor.name]);
  };
  var index2 = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index2(xs)(length3(xs) - 1 | 0);
  };
  var modifyAt = function(i2) {
    return function(f) {
      return function(xs) {
        var go2 = function(x) {
          return updateAt(i2)(f(x))(xs);
        };
        return maybe(Nothing.value)(go2)(index2(xs)(i2));
      };
    };
  };
  var head = function(xs) {
    return index2(xs)(0);
  };
  var fromFoldable = function(dictFoldable) {
    return runFn2(fromFoldableImpl)(foldr(dictFoldable));
  };
  var findIndex = /* @__PURE__ */ function() {
    return runFn4(findIndexImpl)(Just.create)(Nothing.value);
  }();
  var find2 = function(f) {
    return function(xs) {
      return map12(unsafeIndex1(xs))(findIndex(f)(xs));
    };
  };
  var elemIndex = function(dictEq) {
    var eq22 = eq(dictEq);
    return function(x) {
      return findIndex(function(v) {
        return eq22(v)(x);
      });
    };
  };
  var notElem2 = function(dictEq) {
    var elemIndex1 = elemIndex(dictEq);
    return function(a2) {
      return function(arr) {
        return isNothing(elemIndex1(a2)(arr));
      };
    };
  };
  var drop = function(n) {
    return function(xs) {
      var $173 = n < 1;
      if ($173) {
        return xs;
      }
      ;
      return slice(n)(length3(xs))(xs);
    };
  };
  var deleteAt = /* @__PURE__ */ function() {
    return runFn4(_deleteAt)(Just.create)(Nothing.value);
  }();
  var deleteBy = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2.length === 0) {
          return [];
        }
        ;
        return maybe(v2)(function(i2) {
          return fromJust4(deleteAt(i2)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
  };
  var cons = function(x) {
    return function(xs) {
      return append2([x])(xs);
    };
  };
  var some = function(dictAlternative) {
    var apply12 = apply(dictAlternative.Applicative0().Apply0());
    var map310 = map(dictAlternative.Plus1().Alt0().Functor0());
    return function(dictLazy) {
      var defer5 = defer(dictLazy);
      return function(v) {
        return apply12(map310(cons)(v))(defer5(function(v1) {
          return many(dictAlternative)(dictLazy)(v);
        }));
      };
    };
  };
  var many = function(dictAlternative) {
    var alt8 = alt(dictAlternative.Plus1().Alt0());
    var pure110 = pure(dictAlternative.Applicative0());
    return function(dictLazy) {
      return function(v) {
        return alt8(some(dictAlternative)(dictLazy)(v))(pure110([]));
      };
    };
  };
  var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));
  var mapMaybe = function(f) {
    return concatMap(function() {
      var $189 = maybe([])(singleton4);
      return function($190) {
        return $189(f($190));
      };
    }());
  };
  var all2 = /* @__PURE__ */ runFn2(allImpl);

  // output/Halogen.VDom.Machine/index.js
  var Step = /* @__PURE__ */ function() {
    function Step4(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Step4.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Step4(value0, value1, value22, value32);
          };
        };
      };
    };
    return Step4;
  }();
  var unStep = unsafeCoerce2;
  var step2 = function(v, a2) {
    return v.value2(v.value1, a2);
  };
  var mkStep = unsafeCoerce2;
  var halt = function(v) {
    return v.value3(v.value1);
  };
  var extract2 = /* @__PURE__ */ unStep(function(v) {
    return v.value0;
  });

  // output/Halogen.VDom.Types/index.js
  var map13 = /* @__PURE__ */ map(functorArray);
  var map14 = /* @__PURE__ */ map(functorTuple);
  var Text = /* @__PURE__ */ function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  }();
  var Elem = /* @__PURE__ */ function() {
    function Elem2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Elem2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Elem2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Elem2;
  }();
  var Keyed = /* @__PURE__ */ function() {
    function Keyed2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Keyed2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Keyed2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Keyed2;
  }();
  var Widget = /* @__PURE__ */ function() {
    function Widget2(value0) {
      this.value0 = value0;
    }
    ;
    Widget2.create = function(value0) {
      return new Widget2(value0);
    };
    return Widget2;
  }();
  var Grafted = /* @__PURE__ */ function() {
    function Grafted2(value0) {
      this.value0 = value0;
    }
    ;
    Grafted2.create = function(value0) {
      return new Grafted2(value0);
    };
    return Grafted2;
  }();
  var Graft = /* @__PURE__ */ function() {
    function Graft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Graft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Graft2(value0, value1, value22);
        };
      };
    };
    return Graft2;
  }();
  var unGraft = function(f) {
    return function($61) {
      return f($61);
    };
  };
  var graft = unsafeCoerce2;
  var bifunctorGraft = {
    bimap: function(f) {
      return function(g) {
        return unGraft(function(v) {
          return graft(new Graft(function($63) {
            return f(v.value0($63));
          }, function($64) {
            return g(v.value1($64));
          }, v.value2));
        });
      };
    }
  };
  var bimap2 = /* @__PURE__ */ bimap(bifunctorGraft);
  var bifunctorVDom = {
    bimap: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Text) {
            return new Text(v2.value0);
          }
          ;
          if (v2 instanceof Grafted) {
            return new Grafted(bimap2(v)(v1)(v2.value0));
          }
          ;
          return new Grafted(graft(new Graft(v, v1, v2)));
        };
      };
    }
  };
  var runGraft = /* @__PURE__ */ unGraft(function(v) {
    var go2 = function(v2) {
      if (v2 instanceof Text) {
        return new Text(v2.value0);
      }
      ;
      if (v2 instanceof Elem) {
        return new Elem(v2.value0, v2.value1, v.value0(v2.value2), map13(go2)(v2.value3));
      }
      ;
      if (v2 instanceof Keyed) {
        return new Keyed(v2.value0, v2.value1, v.value0(v2.value2), map13(map14(go2))(v2.value3));
      }
      ;
      if (v2 instanceof Widget) {
        return new Widget(v.value1(v2.value0));
      }
      ;
      if (v2 instanceof Grafted) {
        return new Grafted(bimap2(v.value0)(v.value1)(v2.value0));
      }
      ;
      throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v2.constructor.name]);
    };
    return go2(v.value2);
  });

  // output/Halogen.VDom.Util/foreign.js
  function unsafeGetAny(key, obj) {
    return obj[key];
  }
  function unsafeHasAny(key, obj) {
    return obj.hasOwnProperty(key);
  }
  function unsafeSetAny(key, val, obj) {
    obj[key] = val;
  }
  function forE2(a2, f) {
    var b2 = [];
    for (var i2 = 0; i2 < a2.length; i2++) {
      b2.push(f(i2, a2[i2]));
    }
    return b2;
  }
  function forEachE(a2, f) {
    for (var i2 = 0; i2 < a2.length; i2++) {
      f(a2[i2]);
    }
  }
  function forInE(o, f) {
    var ks = Object.keys(o);
    for (var i2 = 0; i2 < ks.length; i2++) {
      var k = ks[i2];
      f(k, o[k]);
    }
  }
  function diffWithIxE(a1, a2, f1, f2, f3) {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a2.length;
    var i2 = 0;
    while (1) {
      if (i2 < l1) {
        if (i2 < l2) {
          a3.push(f1(i2, a1[i2], a2[i2]));
        } else {
          f2(i2, a1[i2]);
        }
      } else if (i2 < l2) {
        a3.push(f3(i2, a2[i2]));
      } else {
        break;
      }
      i2++;
    }
    return a3;
  }
  function strMapWithIxE(as3, fk, f) {
    var o = {};
    for (var i2 = 0; i2 < as3.length; i2++) {
      var a2 = as3[i2];
      var k = fk(a2);
      o[k] = f(k, i2, a2);
    }
    return o;
  }
  function diffWithKeyAndIxE(o1, as3, fk, f1, f2, f3) {
    var o2 = {};
    for (var i2 = 0; i2 < as3.length; i2++) {
      var a2 = as3[i2];
      var k = fk(a2);
      if (o1.hasOwnProperty(k)) {
        o2[k] = f1(k, i2, o1[k], a2);
      } else {
        o2[k] = f3(k, i2, a2);
      }
    }
    for (var k in o1) {
      if (k in o2) {
        continue;
      }
      f2(k, o1[k]);
    }
    return o2;
  }
  function refEq2(a2, b2) {
    return a2 === b2;
  }
  function createTextNode(s, doc) {
    return doc.createTextNode(s);
  }
  function setTextContent(s, n) {
    n.textContent = s;
  }
  function createElement(ns, name17, doc) {
    if (ns != null) {
      return doc.createElementNS(ns, name17);
    } else {
      return doc.createElement(name17);
    }
  }
  function insertChildIx(i2, a2, b2) {
    var n = b2.childNodes.item(i2) || null;
    if (n !== a2) {
      b2.insertBefore(a2, n);
    }
  }
  function removeChild(a2, b2) {
    if (b2 && a2.parentNode === b2) {
      b2.removeChild(a2);
    }
  }
  function parentNode(a2) {
    return a2.parentNode;
  }
  function setAttribute(ns, attr3, val, el) {
    if (ns != null) {
      el.setAttributeNS(ns, attr3, val);
    } else {
      el.setAttribute(attr3, val);
    }
  }
  function removeAttribute(ns, attr3, el) {
    if (ns != null) {
      el.removeAttributeNS(ns, attr3);
    } else {
      el.removeAttribute(attr3);
    }
  }
  function hasAttribute(ns, attr3, el) {
    if (ns != null) {
      return el.hasAttributeNS(ns, attr3);
    } else {
      return el.hasAttribute(attr3);
    }
  }
  function addEventListener2(ev, listener, el) {
    el.addEventListener(ev, listener, false);
  }
  function removeEventListener2(ev, listener, el) {
    el.removeEventListener(ev, listener, false);
  }
  var jsUndefined = void 0;

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }

  // output/Halogen.VDom.Util/index.js
  var unsafeLookup = unsafeGetAny;
  var unsafeFreeze2 = unsafeCoerce2;
  var pokeMutMap = unsafeSetAny;
  var newMutMap = newImpl;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name17) {
    return function(doctype) {
      return doctype[name17];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.Element/index.js
  var toNode2 = unsafeCoerce2;

  // output/Halogen.VDom.DOM/index.js
  var $runtime_lazy4 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var haltWidget = function(v) {
    return halt(v.widget);
  };
  var $lazy_patchWidget = /* @__PURE__ */ $runtime_lazy4("patchWidget", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchWidget(291)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Widget) {
        var res = step2(state3.widget, vdom.value0);
        var res$prime = unStep(function(v) {
          return mkStep(new Step(v.value0, {
            build: state3.build,
            widget: res
          }, $lazy_patchWidget(296), haltWidget));
        })(res);
        return res$prime;
      }
      ;
      haltWidget(state3);
      return state3.build(vdom);
    };
  });
  var patchWidget = /* @__PURE__ */ $lazy_patchWidget(286);
  var haltText = function(v) {
    var parent2 = parentNode(v.node);
    return removeChild(v.node, parent2);
  };
  var $lazy_patchText = /* @__PURE__ */ $runtime_lazy4("patchText", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchText(82)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Text) {
        if (state3.value === vdom.value0) {
          return mkStep(new Step(state3.node, state3, $lazy_patchText(85), haltText));
        }
        ;
        if (otherwise) {
          var nextState = {
            build: state3.build,
            node: state3.node,
            value: vdom.value0
          };
          setTextContent(vdom.value0, state3.node);
          return mkStep(new Step(state3.node, nextState, $lazy_patchText(89), haltText));
        }
        ;
      }
      ;
      haltText(state3);
      return state3.build(vdom);
    };
  });
  var patchText = /* @__PURE__ */ $lazy_patchText(77);
  var haltKeyed = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forInE(v.children, function(v1, s) {
      return halt(s);
    });
    return halt(v.attrs);
  };
  var haltElem = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forEachE(v.children, halt);
    return halt(v.attrs);
  };
  var eqElemSpec = function(ns1, v, ns2, v1) {
    var $63 = v === v1;
    if ($63) {
      if (ns1 instanceof Just && (ns2 instanceof Just && ns1.value0 === ns2.value0)) {
        return true;
      }
      ;
      if (ns1 instanceof Nothing && ns2 instanceof Nothing) {
        return true;
      }
      ;
      return false;
    }
    ;
    return false;
  };
  var $lazy_patchElem = /* @__PURE__ */ $runtime_lazy4("patchElem", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchElem(135)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Elem && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length3(vdom.value3);
        var v1 = length3(state3.children);
        if (v1 === 0 && v === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchElem(149), haltElem));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(ix, s, v2) {
          var res = step2(s, v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var onThat = function(ix, v2) {
          var res = state3.build(v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithIxE(state3.children, vdom.value3, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchElem(172), haltElem));
      }
      ;
      haltElem(state3);
      return state3.build(vdom);
    };
  });
  var patchElem = /* @__PURE__ */ $lazy_patchElem(130);
  var $lazy_patchKeyed = /* @__PURE__ */ $runtime_lazy4("patchKeyed", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchKeyed(222)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Keyed && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length3(vdom.value3);
        if (state3.length === 0 && v === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children,
            length: 0
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(237), haltKeyed));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(v2, ix$prime, s, v3) {
          var res = step2(s, v3.value1);
          insertChildIx(ix$prime, extract2(res), state3.node);
          return res;
        };
        var onThat = function(v2, ix, v3) {
          var res = state3.build(v3.value1);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithKeyAndIxE(state3.children, vdom.value3, fst, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2,
          length: v
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(261), haltKeyed));
      }
      ;
      haltKeyed(state3);
      return state3.build(vdom);
    };
  });
  var patchKeyed = /* @__PURE__ */ $lazy_patchKeyed(217);
  var buildWidget = function(v, build, w) {
    var res = v.buildWidget(v)(w);
    var res$prime = unStep(function(v1) {
      return mkStep(new Step(v1.value0, {
        build,
        widget: res
      }, patchWidget, haltWidget));
    })(res);
    return res$prime;
  };
  var buildText = function(v, build, s) {
    var node = createTextNode(s, v.document);
    var state3 = {
      build,
      node,
      value: s
    };
    return mkStep(new Step(node, state3, patchText, haltText));
  };
  var buildKeyed = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode2(el);
    var onChild = function(v1, ix, v2) {
      var res = build(v2.value1);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = strMapWithIxE(ch1, fst, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2,
      length: length3(ch1)
    };
    return mkStep(new Step(node, state3, patchKeyed, haltKeyed));
  };
  var buildElem = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode2(el);
    var onChild = function(ix, child) {
      var res = build(child);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = forE2(ch1, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2
    };
    return mkStep(new Step(node, state3, patchElem, haltElem));
  };
  var buildVDom = function(spec) {
    var $lazy_build = $runtime_lazy4("build", "Halogen.VDom.DOM", function() {
      return function(v) {
        if (v instanceof Text) {
          return buildText(spec, $lazy_build(59), v.value0);
        }
        ;
        if (v instanceof Elem) {
          return buildElem(spec, $lazy_build(60), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Keyed) {
          return buildKeyed(spec, $lazy_build(61), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Widget) {
          return buildWidget(spec, $lazy_build(62), v.value0);
        }
        ;
        if (v instanceof Grafted) {
          return $lazy_build(63)(runGraft(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v.constructor.name]);
      };
    });
    var build = $lazy_build(58);
    return build;
  };

  // output/Foreign/foreign.js
  function typeOf(value16) {
    return typeof value16;
  }
  function tagOf(value16) {
    return Object.prototype.toString.call(value16).slice(8, -1);
  }
  var isArray = Array.isArray || function(value16) {
    return Object.prototype.toString.call(value16) === "[object Array]";
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };
  var fromStringAsImpl = function(just) {
    return function(nothing) {
      return function(radix) {
        var digits;
        if (radix < 11) {
          digits = "[0-" + (radix - 1).toString() + "]";
        } else if (radix === 11) {
          digits = "[0-9a]";
        } else {
          digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
        }
        var pattern2 = new RegExp("^[\\+\\-]?" + digits + "+$", "i");
        return function(s) {
          if (pattern2.test(s)) {
            var i2 = parseInt(s, radix);
            return (i2 | 0) === i2 ? just(i2) : nothing;
          } else {
            return nothing;
          }
        };
      };
    };
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var floor = Math.floor;

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromStringAs = /* @__PURE__ */ function() {
    return fromStringAsImpl(Just.create)(Nothing.value);
  }();
  var fromString = /* @__PURE__ */ fromStringAs(10);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var floor2 = function($39) {
    return unsafeClamp(floor($39));
  };

  // output/Data.List/index.js
  var reverse2 = /* @__PURE__ */ function() {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Nil) {
            $tco_done = true;
            return v;
          }
          ;
          if (v1 instanceof Cons) {
            $tco_var_v = new Cons(v1.value0, v);
            $copy_v1 = v1.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  }();
  var $$null3 = function(v) {
    if (v instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var some2 = function(dictAlternative) {
    var apply5 = apply(dictAlternative.Applicative0().Apply0());
    var map115 = map(dictAlternative.Plus1().Alt0().Functor0());
    return function(dictLazy) {
      var defer5 = defer(dictLazy);
      return function(v) {
        return apply5(map115(Cons.create)(v))(defer5(function(v1) {
          return many2(dictAlternative)(dictLazy)(v);
        }));
      };
    };
  };
  var many2 = function(dictAlternative) {
    var alt8 = alt(dictAlternative.Plus1().Alt0());
    var pure24 = pure(dictAlternative.Applicative0());
    return function(dictLazy) {
      return function(v) {
        return alt8(some2(dictAlternative)(dictLazy)(v))(pure24(Nil.value));
      };
    };
  };

  // output/Data.List.NonEmpty/index.js
  var singleton5 = /* @__PURE__ */ function() {
    var $200 = singleton2(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  }();
  var head2 = function(v) {
    return v.value0;
  };
  var cons2 = function(y) {
    return function(v) {
      return new NonEmpty(y, new Cons(v.value0, v.value1));
    };
  };

  // output/Data.String.CodeUnits/foreign.js
  var fromCharArray = function(a2) {
    return a2.join("");
  };
  var toCharArray = function(s) {
    return s.split("");
  };
  var singleton6 = function(c) {
    return c;
  };
  var length5 = function(s) {
    return s.length;
  };
  var _indexOf = function(just) {
    return function(nothing) {
      return function(x) {
        return function(s) {
          var i2 = s.indexOf(x);
          return i2 === -1 ? nothing : just(i2);
        };
      };
    };
  };
  var take2 = function(n) {
    return function(s) {
      return s.substr(0, n);
    };
  };
  var drop3 = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };
  var splitAt = function(i2) {
    return function(s) {
      return { before: s.substring(0, i2), after: s.substring(i2) };
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i2) {
    return function(s) {
      if (i2 >= 0 && i2 < s.length)
        return s.charAt(i2);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.CodeUnits/index.js
  var stripPrefix = function(v) {
    return function(str) {
      var v1 = splitAt(length5(v))(str);
      var $20 = v1.before === v;
      if ($20) {
        return new Just(v1.after);
      }
      ;
      return Nothing.value;
    };
  };
  var indexOf = /* @__PURE__ */ function() {
    return _indexOf(Just.create)(Nothing.value);
  }();

  // output/Foreign/index.js
  var show2 = /* @__PURE__ */ show(showString);
  var show1 = /* @__PURE__ */ show(showInt);
  var ForeignError = /* @__PURE__ */ function() {
    function ForeignError2(value0) {
      this.value0 = value0;
    }
    ;
    ForeignError2.create = function(value0) {
      return new ForeignError2(value0);
    };
    return ForeignError2;
  }();
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch4(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch4.create = function(value0) {
      return function(value1) {
        return new TypeMismatch4(value0, value1);
      };
    };
    return TypeMismatch4;
  }();
  var ErrorAtIndex = /* @__PURE__ */ function() {
    function ErrorAtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtIndex2.create = function(value0) {
      return function(value1) {
        return new ErrorAtIndex2(value0, value1);
      };
    };
    return ErrorAtIndex2;
  }();
  var ErrorAtProperty = /* @__PURE__ */ function() {
    function ErrorAtProperty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtProperty2.create = function(value0) {
      return function(value1) {
        return new ErrorAtProperty2(value0, value1);
      };
    };
    return ErrorAtProperty2;
  }();
  var unsafeToForeign = unsafeCoerce2;
  var unsafeFromForeign = unsafeCoerce2;
  var renderForeignError = function(v) {
    if (v instanceof ForeignError) {
      return v.value0;
    }
    ;
    if (v instanceof ErrorAtIndex) {
      return "Error at array index " + (show1(v.value0) + (": " + renderForeignError(v.value1)));
    }
    ;
    if (v instanceof ErrorAtProperty) {
      return "Error at property " + (show2(v.value0) + (": " + renderForeignError(v.value1)));
    }
    ;
    if (v instanceof TypeMismatch) {
      return "Type mismatch: expected " + (v.value0 + (", found " + v.value1));
    }
    ;
    throw new Error("Failed pattern match at Foreign (line 78, column 1 - line 78, column 45): " + [v.constructor.name]);
  };
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton5($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure110 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value16) {
        if (tagOf(value16) === tag) {
          return pure110(unsafeFromForeign(value16));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value16)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value16.constructor.name]);
      };
    };
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Foreign.Object/foreign.js
  var empty4 = {};
  function runST(f) {
    return f();
  }
  function all3(f) {
    return function(m) {
      for (var k in m) {
        if (hasOwnProperty.call(m, k) && !f(k)(m[k]))
          return false;
      }
      return true;
    };
  }
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Foreign.Object/index.js
  var $$void4 = /* @__PURE__ */ $$void(functorST);
  var lookup3 = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();
  var isEmpty = /* @__PURE__ */ all3(function(v) {
    return function(v1) {
      return false;
    };
  });
  var fromFoldable3 = function(dictFoldable) {
    var fromFoldable12 = fromFoldable(dictFoldable);
    return function(l) {
      return runST(function __do2() {
        var s = newImpl();
        foreach(fromFoldable12(l))(function(v) {
          return $$void4(poke2(v.value0)(v.value1)(s));
        })();
        return s;
      });
    };
  };

  // output/Halogen.VDom.DOM.Prop/index.js
  var $runtime_lazy5 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var map15 = /* @__PURE__ */ map(functorFn);
  var map16 = /* @__PURE__ */ map(functorMaybe);
  var Created = /* @__PURE__ */ function() {
    function Created2(value0) {
      this.value0 = value0;
    }
    ;
    Created2.create = function(value0) {
      return new Created2(value0);
    };
    return Created2;
  }();
  var Removed = /* @__PURE__ */ function() {
    function Removed2(value0) {
      this.value0 = value0;
    }
    ;
    Removed2.create = function(value0) {
      return new Removed2(value0);
    };
    return Removed2;
  }();
  var Attribute = /* @__PURE__ */ function() {
    function Attribute2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Attribute2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Attribute2(value0, value1, value22);
        };
      };
    };
    return Attribute2;
  }();
  var Property = /* @__PURE__ */ function() {
    function Property2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Property2.create = function(value0) {
      return function(value1) {
        return new Property2(value0, value1);
      };
    };
    return Property2;
  }();
  var Handler = /* @__PURE__ */ function() {
    function Handler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Handler2.create = function(value0) {
      return function(value1) {
        return new Handler2(value0, value1);
      };
    };
    return Handler2;
  }();
  var Ref = /* @__PURE__ */ function() {
    function Ref2(value0) {
      this.value0 = value0;
    }
    ;
    Ref2.create = function(value0) {
      return new Ref2(value0);
    };
    return Ref2;
  }();
  var unsafeGetProperty = unsafeGetAny;
  var setProperty = unsafeSetAny;
  var removeProperty = function(key, el) {
    var v = hasAttribute(nullImpl, key, el);
    if (v) {
      return removeAttribute(nullImpl, key, el);
    }
    ;
    var v1 = typeOf(unsafeGetAny(key, el));
    if (v1 === "string") {
      return unsafeSetAny(key, "", el);
    }
    ;
    if (key === "rowSpan") {
      return unsafeSetAny(key, 1, el);
    }
    ;
    if (key === "colSpan") {
      return unsafeSetAny(key, 1, el);
    }
    ;
    return unsafeSetAny(key, jsUndefined, el);
  };
  var propToStrKey = function(v) {
    if (v instanceof Attribute && v.value0 instanceof Just) {
      return "attr/" + (v.value0.value0 + (":" + v.value1));
    }
    ;
    if (v instanceof Attribute) {
      return "attr/:" + v.value1;
    }
    ;
    if (v instanceof Property) {
      return "prop/" + v.value0;
    }
    ;
    if (v instanceof Handler) {
      return "handler/" + v.value0;
    }
    ;
    if (v instanceof Ref) {
      return "ref";
    }
    ;
    throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 182, column 16 - line 187, column 16): " + [v.constructor.name]);
  };
  var propFromString = unsafeCoerce2;
  var propFromBoolean = unsafeCoerce2;
  var functorProp = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Handler) {
          return new Handler(v1.value0, map15(map16(v))(v1.value1));
        }
        ;
        if (v1 instanceof Ref) {
          return new Ref(map15(map16(v))(v1.value0));
        }
        ;
        return v1;
      };
    }
  };
  var buildProp = function(emit) {
    return function(el) {
      var removeProp = function(prevEvents) {
        return function(v, v1) {
          if (v1 instanceof Attribute) {
            return removeAttribute(toNullable(v1.value0), v1.value1, el);
          }
          ;
          if (v1 instanceof Property) {
            return removeProperty(v1.value0, el);
          }
          ;
          if (v1 instanceof Handler) {
            var handler3 = unsafeLookup(v1.value0, prevEvents);
            return removeEventListener2(v1.value0, fst(handler3), el);
          }
          ;
          if (v1 instanceof Ref) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 169, column 5 - line 179, column 18): " + [v1.constructor.name]);
        };
      };
      var mbEmit = function(v) {
        if (v instanceof Just) {
          return emit(v.value0)();
        }
        ;
        return unit;
      };
      var haltProp = function(state3) {
        var v = lookup3("ref")(state3.props);
        if (v instanceof Just && v.value0 instanceof Ref) {
          return mbEmit(v.value0.value0(new Removed(el)));
        }
        ;
        return unit;
      };
      var diffProp = function(prevEvents, events) {
        return function(v, v1, v11, v2) {
          if (v11 instanceof Attribute && v2 instanceof Attribute) {
            var $66 = v11.value2 === v2.value2;
            if ($66) {
              return v2;
            }
            ;
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v11 instanceof Property && v2 instanceof Property) {
            var v4 = refEq2(v11.value1, v2.value1);
            if (v4) {
              return v2;
            }
            ;
            if (v2.value0 === "value") {
              var elVal = unsafeGetProperty("value", el);
              var $75 = refEq2(elVal, v2.value1);
              if ($75) {
                return v2;
              }
              ;
              setProperty(v2.value0, v2.value1, el);
              return v2;
            }
            ;
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v11 instanceof Handler && v2 instanceof Handler) {
            var handler3 = unsafeLookup(v2.value0, prevEvents);
            write(v2.value1)(snd(handler3))();
            pokeMutMap(v2.value0, handler3, events);
            return v2;
          }
          ;
          return v2;
        };
      };
      var applyProp = function(events) {
        return function(v, v1, v2) {
          if (v2 instanceof Attribute) {
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v2 instanceof Property) {
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v2 instanceof Handler) {
            var v3 = unsafeGetAny(v2.value0, events);
            if (unsafeHasAny(v2.value0, events)) {
              write(v2.value1)(snd(v3))();
              return v2;
            }
            ;
            var ref2 = $$new(v2.value1)();
            var listener = eventListener(function(ev) {
              return function __do2() {
                var f$prime = read(ref2)();
                return mbEmit(f$prime(ev));
              };
            })();
            pokeMutMap(v2.value0, new Tuple(listener, ref2), events);
            addEventListener2(v2.value0, listener, el);
            return v2;
          }
          ;
          if (v2 instanceof Ref) {
            mbEmit(v2.value0(new Created(el)));
            return v2;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 113, column 5 - line 135, column 15): " + [v2.constructor.name]);
        };
      };
      var $lazy_patchProp = $runtime_lazy5("patchProp", "Halogen.VDom.DOM.Prop", function() {
        return function(state3, ps2) {
          var events = newMutMap();
          var onThis = removeProp(state3.events);
          var onThese = diffProp(state3.events, events);
          var onThat = applyProp(events);
          var props = diffWithKeyAndIxE(state3.props, ps2, propToStrKey, onThese, onThis, onThat);
          var nextState = {
            events: unsafeFreeze2(events),
            props
          };
          return mkStep(new Step(unit, nextState, $lazy_patchProp(100), haltProp));
        };
      });
      var patchProp = $lazy_patchProp(87);
      var renderProp = function(ps1) {
        var events = newMutMap();
        var ps1$prime = strMapWithIxE(ps1, propToStrKey, applyProp(events));
        var state3 = {
          events: unsafeFreeze2(events),
          props: ps1$prime
        };
        return mkStep(new Step(unit, state3, patchProp, haltProp));
      };
      return renderProp;
    };
  };

  // output/Halogen.HTML.Core/index.js
  var map17 = /* @__PURE__ */ map(functorArray);
  var map18 = /* @__PURE__ */ map(functorProp);
  var map22 = /* @__PURE__ */ map(functorInput);
  var bimap3 = /* @__PURE__ */ bimap(bifunctorVDom);
  var HTML = function(x) {
    return x;
  };
  var widget = function($28) {
    return HTML(Widget.create($28));
  };
  var toPropValue = function(dict) {
    return dict.toPropValue;
  };
  var text5 = function($29) {
    return HTML(Text.create($29));
  };
  var prop = function(dictIsProp) {
    var toPropValue1 = toPropValue(dictIsProp);
    return function(v) {
      var $31 = Property.create(v);
      return function($32) {
        return $31(toPropValue1($32));
      };
    };
  };
  var isPropString = {
    toPropValue: propFromString
  };
  var isPropInputType = {
    toPropValue: function($45) {
      return propFromString(renderInputType($45));
    }
  };
  var isPropBoolean = {
    toPropValue: propFromBoolean
  };
  var handler = /* @__PURE__ */ function() {
    return Handler.create;
  }();
  var element = function(ns) {
    return function(name17) {
      return function(props) {
        return function(children2) {
          return new Elem(ns, name17, props, children2);
        };
      };
    };
  };
  var bifunctorHTML = {
    bimap: function(f) {
      return function(g) {
        return function(v) {
          return bimap3(map17(map18(map22(g))))(f)(v);
        };
      };
    }
  };

  // output/Control.Applicative.Free/index.js
  var identity10 = /* @__PURE__ */ identity(categoryFn);
  var Pure = /* @__PURE__ */ function() {
    function Pure2(value0) {
      this.value0 = value0;
    }
    ;
    Pure2.create = function(value0) {
      return new Pure2(value0);
    };
    return Pure2;
  }();
  var Lift = /* @__PURE__ */ function() {
    function Lift5(value0) {
      this.value0 = value0;
    }
    ;
    Lift5.create = function(value0) {
      return new Lift5(value0);
    };
    return Lift5;
  }();
  var Ap = /* @__PURE__ */ function() {
    function Ap2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ap2.create = function(value0) {
      return function(value1) {
        return new Ap2(value0, value1);
      };
    };
    return Ap2;
  }();
  var mkAp = function(fba) {
    return function(fb) {
      return new Ap(fba, fb);
    };
  };
  var liftFreeAp = /* @__PURE__ */ function() {
    return Lift.create;
  }();
  var goLeft = function(dictApplicative) {
    var pure24 = pure(dictApplicative);
    return function(fStack) {
      return function(valStack) {
        return function(nat) {
          return function(func) {
            return function(count) {
              if (func instanceof Pure) {
                return new Tuple(new Cons({
                  func: pure24(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Lift) {
                return new Tuple(new Cons({
                  func: nat(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Ap) {
                return goLeft(dictApplicative)(fStack)(cons2(func.value1)(valStack))(nat)(func.value0)(count + 1 | 0);
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [func.constructor.name]);
            };
          };
        };
      };
    };
  };
  var goApply = function(dictApplicative) {
    var apply5 = apply(dictApplicative.Apply0());
    return function(fStack) {
      return function(vals) {
        return function(gVal) {
          if (fStack instanceof Nil) {
            return new Left(gVal);
          }
          ;
          if (fStack instanceof Cons) {
            var gRes = apply5(fStack.value0.func)(gVal);
            var $31 = fStack.value0.count === 1;
            if ($31) {
              if (fStack.value1 instanceof Nil) {
                return new Left(gRes);
              }
              ;
              return goApply(dictApplicative)(fStack.value1)(vals)(gRes);
            }
            ;
            if (vals instanceof Nil) {
              return new Left(gRes);
            }
            ;
            if (vals instanceof Cons) {
              return new Right(new Tuple(new Cons({
                func: gRes,
                count: fStack.value0.count - 1 | 0
              }, fStack.value1), new NonEmpty(vals.value0, vals.value1)));
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [vals.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [fStack.constructor.name]);
        };
      };
    };
  };
  var functorFreeAp = {
    map: function(f) {
      return function(x) {
        return mkAp(new Pure(f))(x);
      };
    }
  };
  var foldFreeAp = function(dictApplicative) {
    var goApply1 = goApply(dictApplicative);
    var pure24 = pure(dictApplicative);
    var goLeft1 = goLeft(dictApplicative);
    return function(nat) {
      return function(z) {
        var go2 = function($copy_v) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v) {
            if (v.value1.value0 instanceof Pure) {
              var v1 = goApply1(v.value0)(v.value1.value1)(pure24(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Lift) {
              var v1 = goApply1(v.value0)(v.value1.value1)(nat(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Ap) {
              var nextVals = new NonEmpty(v.value1.value0.value1, v.value1.value1);
              $copy_v = goLeft1(v.value0)(nextVals)(nat)(v.value1.value0.value0)(1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [v.value1.value0.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
          }
          ;
          return $tco_result;
        };
        return go2(new Tuple(Nil.value, singleton5(z)));
      };
    };
  };
  var retractFreeAp = function(dictApplicative) {
    return foldFreeAp(dictApplicative)(identity10);
  };
  var applyFreeAp = {
    apply: function(fba) {
      return function(fb) {
        return mkAp(fba)(fb);
      };
    },
    Functor0: function() {
      return functorFreeAp;
    }
  };
  var applicativeFreeAp = /* @__PURE__ */ function() {
    return {
      pure: Pure.create,
      Apply0: function() {
        return applyFreeAp;
      }
    };
  }();
  var foldFreeAp1 = /* @__PURE__ */ foldFreeAp(applicativeFreeAp);
  var hoistFreeAp = function(f) {
    return foldFreeAp1(function($54) {
      return liftFreeAp(f($54));
    });
  };

  // output/Data.CatQueue/index.js
  var CatQueue = /* @__PURE__ */ function() {
    function CatQueue2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatQueue2.create = function(value0) {
      return function(value1) {
        return new CatQueue2(value0, value1);
      };
    };
    return CatQueue2;
  }();
  var uncons2 = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse2(v.value1), Nil.value);
        return;
      }
      ;
      if (v.value0 instanceof Cons) {
        $tco_done = true;
        return new Just(new Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
      }
      ;
      throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var snoc3 = function(v) {
    return function(a2) {
      return new CatQueue(v.value0, new Cons(a2, v.value1));
    };
  };
  var $$null4 = function(v) {
    if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty5 = /* @__PURE__ */ function() {
    return new CatQueue(Nil.value, Nil.value);
  }();

  // output/Data.CatList/index.js
  var CatNil = /* @__PURE__ */ function() {
    function CatNil2() {
    }
    ;
    CatNil2.value = new CatNil2();
    return CatNil2;
  }();
  var CatCons = /* @__PURE__ */ function() {
    function CatCons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatCons2.create = function(value0) {
      return function(value1) {
        return new CatCons2(value0, value1);
      };
    };
    return CatCons2;
  }();
  var link = function(v) {
    return function(v1) {
      if (v instanceof CatNil) {
        return v1;
      }
      ;
      if (v1 instanceof CatNil) {
        return v;
      }
      ;
      if (v instanceof CatCons) {
        return new CatCons(v.value0, snoc3(v.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var foldr3 = function(k) {
    return function(b2) {
      return function(q2) {
        var foldl3 = function($copy_v) {
          return function($copy_v1) {
            return function($copy_v2) {
              var $tco_var_v = $copy_v;
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1, v2) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return v1;
                }
                ;
                if (v2 instanceof Cons) {
                  $tco_var_v = v;
                  $tco_var_v1 = v(v1)(v2.value0);
                  $copy_v2 = v2.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
              }
              ;
              return $tco_result;
            };
          };
        };
        var go2 = function($copy_xs) {
          return function($copy_ys) {
            var $tco_var_xs = $copy_xs;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(xs, ys) {
              var v = uncons2(xs);
              if (v instanceof Nothing) {
                $tco_done1 = true;
                return foldl3(function(x) {
                  return function(i2) {
                    return i2(x);
                  };
                })(b2)(ys);
              }
              ;
              if (v instanceof Just) {
                $tco_var_xs = v.value0.value1;
                $copy_ys = new Cons(k(v.value0.value0), ys);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
        return go2(q2)(Nil.value);
      };
    };
  };
  var uncons3 = function(v) {
    if (v instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v instanceof CatCons) {
      return new Just(new Tuple(v.value0, function() {
        var $66 = $$null4(v.value1);
        if ($66) {
          return CatNil.value;
        }
        ;
        return foldr3(link)(CatNil.value)(v.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
  };
  var empty6 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append3 = link;
  var semigroupCatList = {
    append: append3
  };
  var snoc4 = function(cat) {
    return function(a2) {
      return append3(cat)(new CatCons(a2, empty5));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy6 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var append4 = /* @__PURE__ */ append(semigroupCatList);
  var map19 = /* @__PURE__ */ map(functorFn);
  var Free = /* @__PURE__ */ function() {
    function Free2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Free2.create = function(value0) {
      return function(value1) {
        return new Free2(value0, value1);
      };
    };
    return Free2;
  }();
  var Return = /* @__PURE__ */ function() {
    function Return2(value0) {
      this.value0 = value0;
    }
    ;
    Return2.create = function(value0) {
      return new Return2(value0);
    };
    return Return2;
  }();
  var Bind = /* @__PURE__ */ function() {
    function Bind2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Bind2.create = function(value0) {
      return function(value1) {
        return new Bind2(value0, value1);
      };
    };
    return Bind2;
  }();
  var toView = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      var runExpF = function(v22) {
        return v22;
      };
      var concatF = function(v22) {
        return function(r) {
          return new Free(v22.value0, append4(v22.value1)(r));
        };
      };
      if (v.value0 instanceof Return) {
        var v2 = uncons3(v.value1);
        if (v2 instanceof Nothing) {
          $tco_done = true;
          return new Return(v.value0.value0);
        }
        ;
        if (v2 instanceof Just) {
          $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
          return;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
      }
      ;
      if (v.value0 instanceof Bind) {
        $tco_done = true;
        return new Bind(v.value0.value0, function(a2) {
          return concatF(v.value0.value1(a2))(v.value1);
        });
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var fromView = function(f) {
    return new Free(f, empty6);
  };
  var freeMonad = {
    Applicative0: function() {
      return freeApplicative;
    },
    Bind1: function() {
      return freeBind;
    }
  };
  var freeFunctor = {
    map: function(k) {
      return function(f) {
        return bindFlipped(freeBind)(function() {
          var $189 = pure(freeApplicative);
          return function($190) {
            return $189(k($190));
          };
        }())(f);
      };
    }
  };
  var freeBind = {
    bind: function(v) {
      return function(k) {
        return new Free(v.value0, snoc4(v.value1)(k));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($191) {
      return fromView(Return.create($191));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy6("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var freeApply = /* @__PURE__ */ $lazy_freeApply(77);
  var bind3 = /* @__PURE__ */ bind(freeBind);
  var pure4 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f) {
    return fromView(new Bind(f, function($192) {
      return pure4($192);
    }));
  };
  var substFree = function(k) {
    var go2 = function(f) {
      var v = toView(f);
      if (v instanceof Return) {
        return pure4(v.value0);
      }
      ;
      if (v instanceof Bind) {
        return bind3(k(v.value0))(map19(go2)(v.value1));
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 168, column 10 - line 170, column 33): " + [v.constructor.name]);
    };
    return go2;
  };
  var hoistFree = function(k) {
    return substFree(function($193) {
      return liftF(k($193));
    });
  };
  var foldFree = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map115 = map(Monad0.Bind1().Apply0().Functor0());
    var pure110 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(k) {
      var go2 = function(f) {
        var v = toView(f);
        if (v instanceof Return) {
          return map115(Done.create)(pure110(v.value0));
        }
        ;
        if (v instanceof Bind) {
          return map115(function($199) {
            return Loop.create(v.value1($199));
          })(k(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v.constructor.name]);
      };
      return tailRecM4(go2);
    };
  };

  // output/Data.Lazy/foreign.js
  var defer3 = function(thunk) {
    var v = null;
    return function() {
      if (thunk === void 0)
        return v;
      v = thunk();
      thunk = void 0;
      return v;
    };
  };
  var force = function(l) {
    return l();
  };

  // output/Effect.Aff.Class/index.js
  var lift4 = /* @__PURE__ */ lift(monadTransReaderT);
  var monadAffAff = {
    liftAff: /* @__PURE__ */ identity(categoryFn),
    MonadEffect0: function() {
      return monadEffectAff;
    }
  };
  var liftAff = function(dict) {
    return dict.liftAff;
  };
  var monadAffReader = function(dictMonadAff) {
    var MonadEffect0 = dictMonadAff.MonadEffect0();
    var monadEffectReader2 = monadEffectReader(MonadEffect0);
    return {
      liftAff: function() {
        var $79 = lift4(MonadEffect0.Monad0());
        var $80 = liftAff(dictMonadAff);
        return function($81) {
          return $79($80($81));
        };
      }(),
      MonadEffect0: function() {
        return monadEffectReader2;
      }
    };
  };

  // output/Halogen.Query.ChildQuery/index.js
  var unChildQueryBox = unsafeCoerce2;

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a2) {
    return function(b2) {
      return a2 === b2;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Halogen.Subscription/index.js
  var $$void5 = /* @__PURE__ */ $$void(functorEffect);
  var bind4 = /* @__PURE__ */ bind(bindEffect);
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_1 = /* @__PURE__ */ traverse_2(foldableArray);
  var unsubscribe = function(v) {
    return v;
  };
  var subscribe = function(v) {
    return function(k) {
      return v(function($76) {
        return $$void5(k($76));
      });
    };
  };
  var notify = function(v) {
    return function(a2) {
      return v(a2);
    };
  };
  var create3 = function __do() {
    var subscribers = $$new([])();
    return {
      emitter: function(k) {
        return function __do2() {
          modify_(function(v) {
            return append5(v)([k]);
          })(subscribers)();
          return modify_(deleteBy(unsafeRefEq)(k))(subscribers);
        };
      },
      listener: function(a2) {
        return bind4(read(subscribers))(traverse_1(function(k) {
          return k(a2);
        }));
      }
    };
  };

  // output/Halogen.Query.HalogenM/index.js
  var over2 = /* @__PURE__ */ over()();
  var SubscriptionId = function(x) {
    return x;
  };
  var ForkId = function(x) {
    return x;
  };
  var State = /* @__PURE__ */ function() {
    function State2(value0) {
      this.value0 = value0;
    }
    ;
    State2.create = function(value0) {
      return new State2(value0);
    };
    return State2;
  }();
  var Subscribe = /* @__PURE__ */ function() {
    function Subscribe3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Subscribe3.create = function(value0) {
      return function(value1) {
        return new Subscribe3(value0, value1);
      };
    };
    return Subscribe3;
  }();
  var Unsubscribe = /* @__PURE__ */ function() {
    function Unsubscribe3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Unsubscribe3.create = function(value0) {
      return function(value1) {
        return new Unsubscribe3(value0, value1);
      };
    };
    return Unsubscribe3;
  }();
  var Lift2 = /* @__PURE__ */ function() {
    function Lift5(value0) {
      this.value0 = value0;
    }
    ;
    Lift5.create = function(value0) {
      return new Lift5(value0);
    };
    return Lift5;
  }();
  var ChildQuery2 = /* @__PURE__ */ function() {
    function ChildQuery4(value0) {
      this.value0 = value0;
    }
    ;
    ChildQuery4.create = function(value0) {
      return new ChildQuery4(value0);
    };
    return ChildQuery4;
  }();
  var Raise = /* @__PURE__ */ function() {
    function Raise3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Raise3.create = function(value0) {
      return function(value1) {
        return new Raise3(value0, value1);
      };
    };
    return Raise3;
  }();
  var Par = /* @__PURE__ */ function() {
    function Par3(value0) {
      this.value0 = value0;
    }
    ;
    Par3.create = function(value0) {
      return new Par3(value0);
    };
    return Par3;
  }();
  var Fork = /* @__PURE__ */ function() {
    function Fork3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Fork3.create = function(value0) {
      return function(value1) {
        return new Fork3(value0, value1);
      };
    };
    return Fork3;
  }();
  var Join = /* @__PURE__ */ function() {
    function Join2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Join2.create = function(value0) {
      return function(value1) {
        return new Join2(value0, value1);
      };
    };
    return Join2;
  }();
  var Kill = /* @__PURE__ */ function() {
    function Kill3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Kill3.create = function(value0) {
      return function(value1) {
        return new Kill3(value0, value1);
      };
    };
    return Kill3;
  }();
  var GetRef = /* @__PURE__ */ function() {
    function GetRef3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    GetRef3.create = function(value0) {
      return function(value1) {
        return new GetRef3(value0, value1);
      };
    };
    return GetRef3;
  }();
  var HalogenAp = function(x) {
    return x;
  };
  var HalogenM = function(x) {
    return x;
  };
  var ordSubscriptionId = ordInt;
  var ordForkId = ordInt;
  var monadTransHalogenM = {
    lift: function(dictMonad) {
      return function($180) {
        return HalogenM(liftF(Lift2.create($180)));
      };
    }
  };
  var monadHalogenM = freeMonad;
  var monadStateHalogenM = {
    state: function($181) {
      return HalogenM(liftF(State.create($181)));
    },
    Monad0: function() {
      return monadHalogenM;
    }
  };
  var monadEffectHalogenM = function(dictMonadEffect) {
    return {
      liftEffect: function() {
        var $186 = liftEffect(dictMonadEffect);
        return function($187) {
          return HalogenM(liftF(Lift2.create($186($187))));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var hoist = function(dictFunctor) {
    return function(nat) {
      return function(v) {
        var go2 = function(v1) {
          if (v1 instanceof State) {
            return new State(v1.value0);
          }
          ;
          if (v1 instanceof Subscribe) {
            return new Subscribe(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Unsubscribe) {
            return new Unsubscribe(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Lift2) {
            return new Lift2(nat(v1.value0));
          }
          ;
          if (v1 instanceof ChildQuery2) {
            return new ChildQuery2(v1.value0);
          }
          ;
          if (v1 instanceof Raise) {
            return new Raise(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Par) {
            return new Par(over2(HalogenAp)(hoistFreeAp(hoist(dictFunctor)(nat)))(v1.value0));
          }
          ;
          if (v1 instanceof Fork) {
            return new Fork(hoist(dictFunctor)(nat)(v1.value0), v1.value1);
          }
          ;
          if (v1 instanceof Join) {
            return new Join(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof Kill) {
            return new Kill(v1.value0, v1.value1);
          }
          ;
          if (v1 instanceof GetRef) {
            return new GetRef(v1.value0, v1.value1);
          }
          ;
          throw new Error("Failed pattern match at Halogen.Query.HalogenM (line 312, column 8 - line 323, column 29): " + [v1.constructor.name]);
        };
        return hoistFree(go2)(v);
      };
    };
  };
  var functorHalogenM = freeFunctor;
  var bindHalogenM = freeBind;
  var applicativeHalogenM = freeApplicative;
  var applicativeHalogenAp = applicativeFreeAp;

  // output/Halogen.Query.HalogenQ/index.js
  var Initialize = /* @__PURE__ */ function() {
    function Initialize9(value0) {
      this.value0 = value0;
    }
    ;
    Initialize9.create = function(value0) {
      return new Initialize9(value0);
    };
    return Initialize9;
  }();
  var Finalize = /* @__PURE__ */ function() {
    function Finalize3(value0) {
      this.value0 = value0;
    }
    ;
    Finalize3.create = function(value0) {
      return new Finalize3(value0);
    };
    return Finalize3;
  }();
  var Receive = /* @__PURE__ */ function() {
    function Receive2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Receive2.create = function(value0) {
      return function(value1) {
        return new Receive2(value0, value1);
      };
    };
    return Receive2;
  }();
  var Action2 = /* @__PURE__ */ function() {
    function Action3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Action3.create = function(value0) {
      return function(value1) {
        return new Action3(value0, value1);
      };
    };
    return Action3;
  }();
  var Query = /* @__PURE__ */ function() {
    function Query3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Query3.create = function(value0) {
      return function(value1) {
        return new Query3(value0, value1);
      };
    };
    return Query3;
  }();

  // output/Halogen.VDom.Thunk/index.js
  var $runtime_lazy7 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var Thunk = /* @__PURE__ */ function() {
    function Thunk2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Thunk2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Thunk2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Thunk2;
  }();
  var unsafeEqThunk = function(v, v1) {
    return refEq2(v.value0, v1.value0) && (refEq2(v.value1, v1.value1) && v.value1(v.value3, v1.value3));
  };
  var runThunk = function(v) {
    return v.value2(v.value3);
  };
  var mapThunk = function(k) {
    return function(v) {
      return new Thunk(v.value0, v.value1, function($51) {
        return k(v.value2($51));
      }, v.value3);
    };
  };
  var hoist2 = mapThunk;
  var buildThunk = function(toVDom) {
    var haltThunk = function(state3) {
      return halt(state3.vdom);
    };
    var $lazy_patchThunk = $runtime_lazy7("patchThunk", "Halogen.VDom.Thunk", function() {
      return function(state3, t2) {
        var $48 = unsafeEqThunk(state3.thunk, t2);
        if ($48) {
          return mkStep(new Step(extract2(state3.vdom), state3, $lazy_patchThunk(112), haltThunk));
        }
        ;
        var vdom = step2(state3.vdom, toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          vdom,
          thunk: t2
        }, $lazy_patchThunk(115), haltThunk));
      };
    });
    var patchThunk = $lazy_patchThunk(108);
    var renderThunk = function(spec) {
      return function(t) {
        var vdom = buildVDom(spec)(toVDom(runThunk(t)));
        return mkStep(new Step(extract2(vdom), {
          thunk: t,
          vdom
        }, patchThunk, haltThunk));
      };
    };
    return renderThunk;
  };

  // output/Halogen.Component/index.js
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorHalogenM);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var map20 = /* @__PURE__ */ map(functorHalogenM);
  var lmap2 = /* @__PURE__ */ lmap(bifunctorHTML);
  var pure5 = /* @__PURE__ */ pure(applicativeHalogenM);
  var lookup4 = /* @__PURE__ */ lookup2();
  var pop3 = /* @__PURE__ */ pop2();
  var insert3 = /* @__PURE__ */ insert2();
  var ComponentSlot = /* @__PURE__ */ function() {
    function ComponentSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ComponentSlot2.create = function(value0) {
      return new ComponentSlot2(value0);
    };
    return ComponentSlot2;
  }();
  var ThunkSlot = /* @__PURE__ */ function() {
    function ThunkSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ThunkSlot2.create = function(value0) {
      return new ThunkSlot2(value0);
    };
    return ThunkSlot2;
  }();
  var unComponentSlot = unsafeCoerce2;
  var unComponent = unsafeCoerce2;
  var mkEval = function(args) {
    return function(v) {
      if (v instanceof Initialize) {
        return voidLeft2(traverse_3(args.handleAction)(args.initialize))(v.value0);
      }
      ;
      if (v instanceof Finalize) {
        return voidLeft2(traverse_3(args.handleAction)(args.finalize))(v.value0);
      }
      ;
      if (v instanceof Receive) {
        return voidLeft2(traverse_3(args.handleAction)(args.receive(v.value0)))(v.value1);
      }
      ;
      if (v instanceof Action2) {
        return voidLeft2(args.handleAction(v.value0))(v.value1);
      }
      ;
      if (v instanceof Query) {
        return unCoyoneda(function(g) {
          var $45 = map20(maybe(v.value1(unit))(g));
          return function($46) {
            return $45(args.handleQuery($46));
          };
        })(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Halogen.Component (line 182, column 15 - line 192, column 71): " + [v.constructor.name]);
    };
  };
  var mkComponentSlot = unsafeCoerce2;
  var mkComponent = unsafeCoerce2;
  var hoistSlot = function(dictFunctor) {
    return function(nat) {
      return function(v) {
        if (v instanceof ComponentSlot) {
          return unComponentSlot(function(slot2) {
            return new ComponentSlot(mkComponentSlot({
              get: slot2.get,
              pop: slot2.pop,
              set: slot2.set,
              input: slot2.input,
              output: slot2.output,
              component: hoist3(dictFunctor)(nat)(slot2.component)
            }));
          })(v.value0);
        }
        ;
        if (v instanceof ThunkSlot) {
          return new ThunkSlot(hoist2(lmap2(hoistSlot(dictFunctor)(nat)))(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Component (line 279, column 17 - line 284, column 53): " + [v.constructor.name]);
      };
    };
  };
  var hoist3 = function(dictFunctor) {
    var hoist1 = hoist(dictFunctor);
    return function(nat) {
      return unComponent(function(c) {
        return mkComponent({
          initialState: c.initialState,
          render: function() {
            var $47 = lmap2(hoistSlot(dictFunctor)(nat));
            return function($48) {
              return $47(c.render($48));
            };
          }(),
          "eval": function() {
            var $49 = hoist1(nat);
            return function($50) {
              return $49(c["eval"]($50));
            };
          }()
        });
      });
    };
  };
  var defaultEval = /* @__PURE__ */ function() {
    return {
      handleAction: $$const(pure5(unit)),
      handleQuery: $$const(pure5(Nothing.value)),
      receive: $$const(Nothing.value),
      initialize: Nothing.value,
      finalize: Nothing.value
    };
  }();
  var componentSlot = function() {
    return function(dictIsSymbol) {
      var lookup13 = lookup4(dictIsSymbol);
      var pop12 = pop3(dictIsSymbol);
      var insert13 = insert3(dictIsSymbol);
      return function(dictOrd) {
        var lookup23 = lookup13(dictOrd);
        var pop22 = pop12(dictOrd);
        var insert22 = insert13(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(comp) {
              return function(input3) {
                return function(output2) {
                  return mkComponentSlot({
                    get: lookup23(label5)(p2),
                    pop: pop22(label5)(p2),
                    set: insert22(label5)(p2),
                    component: comp,
                    input: input3,
                    output: output2
                  });
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Halogen.Query/index.js
  var mkTell = function(act) {
    return act(unit);
  };

  // output/Control.Monad.Fork.Class/index.js
  var monadForkAff = {
    suspend: suspendAff,
    fork: forkAff,
    join: joinFiber,
    Monad0: function() {
      return monadAff;
    },
    Functor1: function() {
      return functorFiber;
    }
  };
  var fork2 = function(dict) {
    return dict.fork;
  };

  // output/Effect.Console/foreign.js
  var log2 = function(s) {
    return function() {
      console.log(s);
    };
  };
  var warn = function(s) {
    return function() {
      console.warn(s);
    };
  };

  // output/Halogen.HTML.Elements/index.js
  var element2 = /* @__PURE__ */ function() {
    return element(Nothing.value);
  }();
  var h1 = /* @__PURE__ */ element2("h1");
  var h2 = /* @__PURE__ */ element2("h2");
  var h2_ = /* @__PURE__ */ h2([]);
  var i = /* @__PURE__ */ element2("i");
  var input2 = function(props) {
    return element2("input")(props)([]);
  };
  var label4 = /* @__PURE__ */ element2("label");
  var li = /* @__PURE__ */ element2("li");
  var li_ = /* @__PURE__ */ li([]);
  var nav = /* @__PURE__ */ element2("nav");
  var p = /* @__PURE__ */ element2("p");
  var p_ = /* @__PURE__ */ p([]);
  var span3 = /* @__PURE__ */ element2("span");
  var span_ = /* @__PURE__ */ span3([]);
  var table = /* @__PURE__ */ element2("table");
  var tbody = /* @__PURE__ */ element2("tbody");
  var tbody_ = /* @__PURE__ */ tbody([]);
  var td = /* @__PURE__ */ element2("td");
  var td_ = /* @__PURE__ */ td([]);
  var th = /* @__PURE__ */ element2("th");
  var th_ = /* @__PURE__ */ th([]);
  var thead = /* @__PURE__ */ element2("thead");
  var thead_ = /* @__PURE__ */ thead([]);
  var tr = /* @__PURE__ */ element2("tr");
  var tr_ = /* @__PURE__ */ tr([]);
  var ul = /* @__PURE__ */ element2("ul");
  var div2 = /* @__PURE__ */ element2("div");
  var div_ = /* @__PURE__ */ div2([]);
  var button = /* @__PURE__ */ element2("button");
  var br = function(props) {
    return element2("br")(props)([]);
  };
  var br_ = /* @__PURE__ */ br([]);
  var aside = /* @__PURE__ */ element2("aside");
  var a = /* @__PURE__ */ element2("a");

  // output/Halogen.HTML.Properties/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var prop2 = function(dictIsProp) {
    return prop(dictIsProp);
  };
  var prop1 = /* @__PURE__ */ prop2(isPropBoolean);
  var prop22 = /* @__PURE__ */ prop2(isPropString);
  var required4 = /* @__PURE__ */ prop1("required");
  var title2 = /* @__PURE__ */ prop22("title");
  var type_17 = function(dictIsProp) {
    return prop2(dictIsProp)("type");
  };
  var value12 = function(dictIsProp) {
    return prop2(dictIsProp)("value");
  };
  var placeholder3 = /* @__PURE__ */ prop22("placeholder");
  var name15 = /* @__PURE__ */ prop22("name");
  var id2 = /* @__PURE__ */ prop22("id");
  var href4 = /* @__PURE__ */ prop22("href");
  var $$for = /* @__PURE__ */ prop22("htmlFor");
  var disabled10 = /* @__PURE__ */ prop1("disabled");
  var class_ = /* @__PURE__ */ function() {
    var $36 = prop22("className");
    return function($37) {
      return $36(unwrap2($37));
    };
  }();

  // output/Halogen.HTML/index.js
  var componentSlot2 = /* @__PURE__ */ componentSlot();
  var slot_ = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(component11) {
              return function(input3) {
                return widget(new ComponentSlot(componentSlot22(label5)(p2)(component11)(input3)($$const(Nothing.value))));
              };
            };
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Driver.State/index.js
  var unRenderStateX = unsafeCoerce2;
  var unDriverStateX = unsafeCoerce2;
  var renderStateX_ = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMaybe);
    return function(f) {
      return unDriverStateX(function(st) {
        return traverse_7(f)(st.rendering);
      });
    };
  };
  var mkRenderStateX = unsafeCoerce2;
  var renderStateX = function(dictFunctor) {
    return function(f) {
      return unDriverStateX(function(st) {
        return mkRenderStateX(f(st.rendering));
      });
    };
  };
  var mkDriverStateXRef = unsafeCoerce2;
  var mapDriverState = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var initDriverState = function(component11) {
    return function(input3) {
      return function(handler3) {
        return function(lchs) {
          return function __do2() {
            var selfRef = $$new({})();
            var childrenIn = $$new(empty3)();
            var childrenOut = $$new(empty3)();
            var handlerRef = $$new(handler3)();
            var pendingQueries = $$new(new Just(Nil.value))();
            var pendingOuts = $$new(new Just(Nil.value))();
            var pendingHandlers = $$new(Nothing.value)();
            var fresh2 = $$new(1)();
            var subscriptions = $$new(new Just(empty2))();
            var forks = $$new(empty2)();
            var ds = {
              component: component11,
              state: component11.initialState(input3),
              refs: empty2,
              children: empty3,
              childrenIn,
              childrenOut,
              selfRef,
              handlerRef,
              pendingQueries,
              pendingOuts,
              pendingHandlers,
              rendering: Nothing.value,
              fresh: fresh2,
              subscriptions,
              forks,
              lifecycleHandlers: lchs
            };
            write(ds)(selfRef)();
            return mkDriverStateXRef(selfRef);
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Driver.Eval/index.js
  var traverse_4 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var bindFlipped5 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var lookup5 = /* @__PURE__ */ lookup(ordSubscriptionId);
  var bind12 = /* @__PURE__ */ bind(bindAff);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard3(bindAff);
  var traverse_12 = /* @__PURE__ */ traverse_(applicativeAff);
  var traverse_22 = /* @__PURE__ */ traverse_12(foldableList);
  var fork3 = /* @__PURE__ */ fork2(monadForkAff);
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableList);
  var pure6 = /* @__PURE__ */ pure(applicativeAff);
  var map23 = /* @__PURE__ */ map(functorCoyoneda);
  var parallel3 = /* @__PURE__ */ parallel(parallelAff);
  var map110 = /* @__PURE__ */ map(functorAff);
  var sequential2 = /* @__PURE__ */ sequential(parallelAff);
  var map24 = /* @__PURE__ */ map(functorMaybe);
  var insert4 = /* @__PURE__ */ insert(ordSubscriptionId);
  var retractFreeAp2 = /* @__PURE__ */ retractFreeAp(applicativeParAff);
  var $$delete2 = /* @__PURE__ */ $$delete(ordForkId);
  var unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
  var insert12 = /* @__PURE__ */ insert(ordForkId);
  var traverse_32 = /* @__PURE__ */ traverse_12(foldableMaybe);
  var lookup12 = /* @__PURE__ */ lookup(ordForkId);
  var lookup22 = /* @__PURE__ */ lookup(ordString);
  var foldFree2 = /* @__PURE__ */ foldFree(monadRecAff);
  var alter2 = /* @__PURE__ */ alter(ordString);
  var unsubscribe3 = function(sid) {
    return function(ref2) {
      return function __do2() {
        var v = read(ref2)();
        var subs = read(v.subscriptions)();
        return traverse_4(unsubscribe)(bindFlipped5(lookup5(sid))(subs))();
      };
    };
  };
  var queueOrRun = function(ref2) {
    return function(au) {
      return bind12(liftEffect4(read(ref2)))(function(v) {
        if (v instanceof Nothing) {
          return au;
        }
        ;
        if (v instanceof Just) {
          return liftEffect4(write(new Just(new Cons(au, v.value0)))(ref2));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 188, column 33 - line 190, column 57): " + [v.constructor.name]);
      });
    };
  };
  var handleLifecycle = function(lchs) {
    return function(f) {
      return discard1(liftEffect4(write({
        initializers: Nil.value,
        finalizers: Nil.value
      })(lchs)))(function() {
        return bind12(liftEffect4(f))(function(result2) {
          return bind12(liftEffect4(read(lchs)))(function(v) {
            return discard1(traverse_22(fork3)(v.finalizers))(function() {
              return discard1(parSequence_2(v.initializers))(function() {
                return pure6(result2);
              });
            });
          });
        });
      });
    };
  };
  var handleAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeEffect)(unit))));
  var fresh = function(f) {
    return function(ref2) {
      return bind12(liftEffect4(read(ref2)))(function(v) {
        return liftEffect4(modify$prime(function(i2) {
          return {
            state: i2 + 1 | 0,
            value: f(i2)
          };
        })(v.fresh));
      });
    };
  };
  var evalQ = function(render) {
    return function(ref2) {
      return function(q2) {
        return bind12(liftEffect4(read(ref2)))(function(v) {
          return evalM(render)(ref2)(v["component"]["eval"](new Query(map23(Just.create)(liftCoyoneda(q2)), $$const(Nothing.value))));
        });
      };
    };
  };
  var evalM = function(render) {
    return function(initRef) {
      return function(v) {
        var evalChildQuery = function(ref2) {
          return function(cqb) {
            return bind12(liftEffect4(read(ref2)))(function(v1) {
              return unChildQueryBox(function(v2) {
                var evalChild = function(v3) {
                  return parallel3(bind12(liftEffect4(read(v3)))(function(dsx) {
                    return unDriverStateX(function(ds) {
                      return evalQ(render)(ds.selfRef)(v2.value1);
                    })(dsx);
                  }));
                };
                return map110(v2.value2)(sequential2(v2.value0(applicativeParAff)(evalChild)(v1.children)));
              })(cqb);
            });
          };
        };
        var go2 = function(ref2) {
          return function(v1) {
            if (v1 instanceof State) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                var v3 = v1.value0(v2.state);
                if (unsafeRefEq(v2.state)(v3.value1)) {
                  return pure6(v3.value0);
                }
                ;
                if (otherwise) {
                  return discard1(liftEffect4(write({
                    component: v2.component,
                    refs: v2.refs,
                    children: v2.children,
                    childrenIn: v2.childrenIn,
                    childrenOut: v2.childrenOut,
                    selfRef: v2.selfRef,
                    handlerRef: v2.handlerRef,
                    pendingQueries: v2.pendingQueries,
                    pendingOuts: v2.pendingOuts,
                    pendingHandlers: v2.pendingHandlers,
                    rendering: v2.rendering,
                    fresh: v2.fresh,
                    subscriptions: v2.subscriptions,
                    forks: v2.forks,
                    lifecycleHandlers: v2.lifecycleHandlers,
                    state: v3.value1
                  })(ref2)))(function() {
                    return discard1(handleLifecycle(v2.lifecycleHandlers)(render(v2.lifecycleHandlers)(ref2)))(function() {
                      return pure6(v3.value0);
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 86, column 7 - line 92, column 21): " + [v3.constructor.name]);
              });
            }
            ;
            if (v1 instanceof Subscribe) {
              return bind12(fresh(SubscriptionId)(ref2))(function(sid) {
                return bind12(liftEffect4(subscribe(v1.value0(sid))(function(act) {
                  return handleAff(evalF(render)(ref2)(new Action(act)));
                })))(function(finalize) {
                  return bind12(liftEffect4(read(ref2)))(function(v2) {
                    return discard1(liftEffect4(modify_(map24(insert4(sid)(finalize)))(v2.subscriptions)))(function() {
                      return pure6(v1.value1(sid));
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Unsubscribe) {
              return discard1(liftEffect4(unsubscribe3(v1.value0)(ref2)))(function() {
                return pure6(v1.value1);
              });
            }
            ;
            if (v1 instanceof Lift2) {
              return v1.value0;
            }
            ;
            if (v1 instanceof ChildQuery2) {
              return evalChildQuery(ref2)(v1.value0);
            }
            ;
            if (v1 instanceof Raise) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.handlerRef)))(function(handler3) {
                  return discard1(queueOrRun(v2.pendingOuts)(handler3(v1.value0)))(function() {
                    return pure6(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Par) {
              return sequential2(retractFreeAp2(hoistFreeAp(function() {
                var $119 = evalM(render)(ref2);
                return function($120) {
                  return parallel3($119($120));
                };
              }())(v1.value0)));
            }
            ;
            if (v1 instanceof Fork) {
              return bind12(fresh(ForkId)(ref2))(function(fid) {
                return bind12(liftEffect4(read(ref2)))(function(v2) {
                  return bind12(liftEffect4($$new(false)))(function(doneRef) {
                    return bind12(fork3($$finally(liftEffect4(function __do2() {
                      modify_($$delete2(fid))(v2.forks)();
                      return write(true)(doneRef)();
                    }))(evalM(render)(ref2)(v1.value0))))(function(fiber) {
                      return discard1(liftEffect4(unlessM2(read(doneRef))(modify_(insert12(fid)(fiber))(v2.forks))))(function() {
                        return pure6(v1.value1(fid));
                      });
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Join) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(joinFiber)(lookup12(v1.value0)(forkMap)))(function() {
                    return pure6(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Kill) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(killFiber(error("Cancelled")))(lookup12(v1.value0)(forkMap)))(function() {
                    return pure6(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof GetRef) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return pure6(v1.value1(lookup22(v1.value0)(v2.refs)));
              });
            }
            ;
            throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 83, column 12 - line 139, column 33): " + [v1.constructor.name]);
          };
        };
        return foldFree2(go2(initRef))(v);
      };
    };
  };
  var evalF = function(render) {
    return function(ref2) {
      return function(v) {
        if (v instanceof RefUpdate) {
          return liftEffect4(flip(modify_)(ref2)(mapDriverState(function(st) {
            return {
              component: st.component,
              state: st.state,
              children: st.children,
              childrenIn: st.childrenIn,
              childrenOut: st.childrenOut,
              selfRef: st.selfRef,
              handlerRef: st.handlerRef,
              pendingQueries: st.pendingQueries,
              pendingOuts: st.pendingOuts,
              pendingHandlers: st.pendingHandlers,
              rendering: st.rendering,
              fresh: st.fresh,
              subscriptions: st.subscriptions,
              forks: st.forks,
              lifecycleHandlers: st.lifecycleHandlers,
              refs: alter2($$const(v.value1))(v.value0)(st.refs)
            };
          })));
        }
        ;
        if (v instanceof Action) {
          return bind12(liftEffect4(read(ref2)))(function(v1) {
            return evalM(render)(ref2)(v1["component"]["eval"](new Action2(v.value0, unit)));
          });
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 52, column 20 - line 58, column 62): " + [v.constructor.name]);
      };
    };
  };

  // output/Halogen.Aff.Driver/index.js
  var bind5 = /* @__PURE__ */ bind(bindEffect);
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var traverse_5 = /* @__PURE__ */ traverse_(applicativeAff)(foldableList);
  var fork4 = /* @__PURE__ */ fork2(monadForkAff);
  var bindFlipped6 = /* @__PURE__ */ bindFlipped(bindEffect);
  var traverse_13 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_23 = /* @__PURE__ */ traverse_13(foldableMaybe);
  var traverse_33 = /* @__PURE__ */ traverse_13(foldableMap);
  var discard22 = /* @__PURE__ */ discard4(bindAff);
  var parSequence_3 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableList);
  var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure7 = /* @__PURE__ */ pure(applicativeEffect);
  var map25 = /* @__PURE__ */ map(functorEffect);
  var pure12 = /* @__PURE__ */ pure(applicativeAff);
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var renderStateX2 = /* @__PURE__ */ renderStateX(functorEffect);
  var $$void6 = /* @__PURE__ */ $$void(functorAff);
  var foreachSlot2 = /* @__PURE__ */ foreachSlot(applicativeEffect);
  var renderStateX_2 = /* @__PURE__ */ renderStateX_(applicativeEffect);
  var tailRecM3 = /* @__PURE__ */ tailRecM(monadRecEffect);
  var voidLeft3 = /* @__PURE__ */ voidLeft(functorEffect);
  var bind13 = /* @__PURE__ */ bind(bindAff);
  var liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var newLifecycleHandlers = /* @__PURE__ */ function() {
    return $$new({
      initializers: Nil.value,
      finalizers: Nil.value
    });
  }();
  var handlePending = function(ref2) {
    return function __do2() {
      var queue = read(ref2)();
      write(Nothing.value)(ref2)();
      return for_2(queue)(function() {
        var $59 = traverse_5(fork4);
        return function($60) {
          return handleAff($59(reverse2($60)));
        };
      }())();
    };
  };
  var cleanupSubscriptionsAndForks = function(v) {
    return function __do2() {
      bindFlipped6(traverse_23(traverse_33(unsubscribe)))(read(v.subscriptions))();
      write(Nothing.value)(v.subscriptions)();
      bindFlipped6(traverse_33(function() {
        var $61 = killFiber(error("finalized"));
        return function($62) {
          return handleAff($61($62));
        };
      }()))(read(v.forks))();
      return write(empty2)(v.forks)();
    };
  };
  var runUI = function(renderSpec2) {
    return function(component11) {
      return function(i2) {
        var squashChildInitializers = function(lchs) {
          return function(preInits) {
            return unDriverStateX(function(st) {
              var parentInitializer = evalM(render)(st.selfRef)(st["component"]["eval"](new Initialize(unit)));
              return modify_(function(handlers) {
                return {
                  initializers: new Cons(discard22(parSequence_3(reverse2(handlers.initializers)))(function() {
                    return discard22(parentInitializer)(function() {
                      return liftEffect5(function __do2() {
                        handlePending(st.pendingQueries)();
                        return handlePending(st.pendingOuts)();
                      });
                    });
                  }), preInits),
                  finalizers: handlers.finalizers
                };
              })(lchs);
            });
          };
        };
        var runComponent = function(lchs) {
          return function(handler3) {
            return function(j) {
              return unComponent(function(c) {
                return function __do2() {
                  var lchs$prime = newLifecycleHandlers();
                  var $$var2 = initDriverState(c)(j)(handler3)(lchs$prime)();
                  var pre2 = read(lchs)();
                  write({
                    initializers: Nil.value,
                    finalizers: pre2.finalizers
                  })(lchs)();
                  bindFlipped6(unDriverStateX(function() {
                    var $63 = render(lchs);
                    return function($64) {
                      return $63(function(v) {
                        return v.selfRef;
                      }($64));
                    };
                  }()))(read($$var2))();
                  bindFlipped6(squashChildInitializers(lchs)(pre2.initializers))(read($$var2))();
                  return $$var2;
                };
              });
            };
          };
        };
        var renderChild = function(lchs) {
          return function(handler3) {
            return function(childrenInRef) {
              return function(childrenOutRef) {
                return unComponentSlot(function(slot2) {
                  return function __do2() {
                    var childrenIn = map25(slot2.pop)(read(childrenInRef))();
                    var $$var2 = function() {
                      if (childrenIn instanceof Just) {
                        write(childrenIn.value0.value1)(childrenInRef)();
                        var dsx = read(childrenIn.value0.value0)();
                        unDriverStateX(function(st) {
                          return function __do3() {
                            flip(write)(st.handlerRef)(function() {
                              var $65 = maybe(pure12(unit))(handler3);
                              return function($66) {
                                return $65(slot2.output($66));
                              };
                            }())();
                            return handleAff(evalM(render)(st.selfRef)(st["component"]["eval"](new Receive(slot2.input, unit))))();
                          };
                        })(dsx)();
                        return childrenIn.value0.value0;
                      }
                      ;
                      if (childrenIn instanceof Nothing) {
                        return runComponent(lchs)(function() {
                          var $67 = maybe(pure12(unit))(handler3);
                          return function($68) {
                            return $67(slot2.output($68));
                          };
                        }())(slot2.input)(slot2.component)();
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 213, column 14 - line 222, column 98): " + [childrenIn.constructor.name]);
                    }();
                    var isDuplicate = map25(function($69) {
                      return isJust(slot2.get($69));
                    })(read(childrenOutRef))();
                    when2(isDuplicate)(warn("Halogen: Duplicate slot address was detected during rendering, unexpected results may occur"))();
                    modify_(slot2.set($$var2))(childrenOutRef)();
                    return bind5(read($$var2))(renderStateX2(function(v) {
                      if (v instanceof Nothing) {
                        return $$throw("Halogen internal error: child was not initialized in renderChild");
                      }
                      ;
                      if (v instanceof Just) {
                        return pure7(renderSpec2.renderChild(v.value0));
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 227, column 37 - line 229, column 50): " + [v.constructor.name]);
                    }))();
                  };
                });
              };
            };
          };
        };
        var render = function(lchs) {
          return function($$var2) {
            return function __do2() {
              var v = read($$var2)();
              var shouldProcessHandlers = map25(isNothing)(read(v.pendingHandlers))();
              when2(shouldProcessHandlers)(write(new Just(Nil.value))(v.pendingHandlers))();
              write(empty3)(v.childrenOut)();
              write(v.children)(v.childrenIn)();
              var handler3 = function() {
                var $70 = queueOrRun(v.pendingHandlers);
                var $71 = evalF(render)(v.selfRef);
                return function($72) {
                  return $70($$void6($71($72)));
                };
              }();
              var childHandler = function() {
                var $73 = queueOrRun(v.pendingQueries);
                return function($74) {
                  return $73(handler3(Action.create($74)));
                };
              }();
              var rendering = renderSpec2.render(function($75) {
                return handleAff(handler3($75));
              })(renderChild(lchs)(childHandler)(v.childrenIn)(v.childrenOut))(v.component.render(v.state))(v.rendering)();
              var children2 = read(v.childrenOut)();
              var childrenIn = read(v.childrenIn)();
              foreachSlot2(childrenIn)(function(v1) {
                return function __do3() {
                  var childDS = read(v1)();
                  renderStateX_2(renderSpec2.removeChild)(childDS)();
                  return finalize(lchs)(childDS)();
                };
              })();
              flip(modify_)(v.selfRef)(mapDriverState(function(ds$prime) {
                return {
                  component: ds$prime.component,
                  state: ds$prime.state,
                  refs: ds$prime.refs,
                  childrenIn: ds$prime.childrenIn,
                  childrenOut: ds$prime.childrenOut,
                  selfRef: ds$prime.selfRef,
                  handlerRef: ds$prime.handlerRef,
                  pendingQueries: ds$prime.pendingQueries,
                  pendingOuts: ds$prime.pendingOuts,
                  pendingHandlers: ds$prime.pendingHandlers,
                  fresh: ds$prime.fresh,
                  subscriptions: ds$prime.subscriptions,
                  forks: ds$prime.forks,
                  lifecycleHandlers: ds$prime.lifecycleHandlers,
                  rendering: new Just(rendering),
                  children: children2
                };
              }))();
              return when2(shouldProcessHandlers)(flip(tailRecM3)(unit)(function(v1) {
                return function __do3() {
                  var handlers = read(v.pendingHandlers)();
                  write(new Just(Nil.value))(v.pendingHandlers)();
                  traverse_23(function() {
                    var $76 = traverse_5(fork4);
                    return function($77) {
                      return handleAff($76(reverse2($77)));
                    };
                  }())(handlers)();
                  var mmore = read(v.pendingHandlers)();
                  var $52 = maybe(false)($$null3)(mmore);
                  if ($52) {
                    return voidLeft3(write(Nothing.value)(v.pendingHandlers))(new Done(unit))();
                  }
                  ;
                  return new Loop(unit);
                };
              }))();
            };
          };
        };
        var finalize = function(lchs) {
          return unDriverStateX(function(st) {
            return function __do2() {
              cleanupSubscriptionsAndForks(st)();
              var f = evalM(render)(st.selfRef)(st["component"]["eval"](new Finalize(unit)));
              modify_(function(handlers) {
                return {
                  initializers: handlers.initializers,
                  finalizers: new Cons(f, handlers.finalizers)
                };
              })(lchs)();
              return foreachSlot2(st.children)(function(v) {
                return function __do3() {
                  var dsx = read(v)();
                  return finalize(lchs)(dsx)();
                };
              })();
            };
          });
        };
        var evalDriver = function(disposed) {
          return function(ref2) {
            return function(q2) {
              return bind13(liftEffect5(read(disposed)))(function(v) {
                if (v) {
                  return pure12(Nothing.value);
                }
                ;
                return evalQ(render)(ref2)(q2);
              });
            };
          };
        };
        var dispose = function(disposed) {
          return function(lchs) {
            return function(dsx) {
              return handleLifecycle(lchs)(function __do2() {
                var v = read(disposed)();
                if (v) {
                  return unit;
                }
                ;
                write(true)(disposed)();
                finalize(lchs)(dsx)();
                return unDriverStateX(function(v1) {
                  return function __do3() {
                    var v2 = liftEffect1(read(v1.selfRef))();
                    return for_2(v2.rendering)(renderSpec2.dispose)();
                  };
                })(dsx)();
              });
            };
          };
        };
        return bind13(liftEffect5(newLifecycleHandlers))(function(lchs) {
          return bind13(liftEffect5($$new(false)))(function(disposed) {
            return handleLifecycle(lchs)(function __do2() {
              var sio = create3();
              var dsx = bindFlipped6(read)(runComponent(lchs)(function() {
                var $78 = notify(sio.listener);
                return function($79) {
                  return liftEffect5($78($79));
                };
              }())(i2)(component11))();
              return unDriverStateX(function(st) {
                return pure7({
                  query: evalDriver(disposed)(st.selfRef),
                  messages: sio.emitter,
                  dispose: dispose(disposed)(lchs)(dsx)
                });
              })(dsx)();
            });
          });
        });
      };
    };
  };

  // output/Web.DOM.Node/foreign.js
  var getEffProp2 = function(name17) {
    return function(node) {
      return function() {
        return node[name17];
      };
    };
  };
  var baseURI = getEffProp2("baseURI");
  var _ownerDocument = getEffProp2("ownerDocument");
  var _parentNode = getEffProp2("parentNode");
  var _parentElement = getEffProp2("parentElement");
  var childNodes = getEffProp2("childNodes");
  var _firstChild = getEffProp2("firstChild");
  var _lastChild = getEffProp2("lastChild");
  var _previousSibling = getEffProp2("previousSibling");
  var _nextSibling = getEffProp2("nextSibling");
  var _nodeValue = getEffProp2("nodeValue");
  var textContent = getEffProp2("textContent");
  function insertBefore(node1) {
    return function(node2) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(node1, node2);
        };
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }
  function removeChild2(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map26 = /* @__PURE__ */ map(functorEffect);
  var parentNode2 = /* @__PURE__ */ function() {
    var $6 = map26(toMaybe);
    return function($7) {
      return $6(_parentNode($7));
    };
  }();
  var nextSibling = /* @__PURE__ */ function() {
    var $15 = map26(toMaybe);
    return function($16) {
      return $15(_nextSibling($16));
    };
  }();

  // output/Halogen.VDom.Driver/index.js
  var $runtime_lazy8 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var $$void7 = /* @__PURE__ */ $$void(functorEffect);
  var pure8 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse_6 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var unwrap3 = /* @__PURE__ */ unwrap();
  var when3 = /* @__PURE__ */ when(applicativeEffect);
  var not2 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean)));
  var identity11 = /* @__PURE__ */ identity(categoryFn);
  var bind14 = /* @__PURE__ */ bind(bindAff);
  var liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var map27 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped7 = /* @__PURE__ */ bindFlipped(bindEffect);
  var substInParent = function(v) {
    return function(v1) {
      return function(v2) {
        if (v1 instanceof Just && v2 instanceof Just) {
          return $$void7(insertBefore(v)(v1.value0)(v2.value0));
        }
        ;
        if (v1 instanceof Nothing && v2 instanceof Just) {
          return $$void7(appendChild(v)(v2.value0));
        }
        ;
        return pure8(unit);
      };
    };
  };
  var removeChild3 = function(v) {
    return function __do2() {
      var npn = parentNode2(v.node)();
      return traverse_6(function(pn) {
        return removeChild2(v.node)(pn);
      })(npn)();
    };
  };
  var mkSpec = function(handler3) {
    return function(renderChildRef) {
      return function(document2) {
        var getNode = unRenderStateX(function(v) {
          return v.node;
        });
        var done = function(st) {
          if (st instanceof Just) {
            return halt(st.value0);
          }
          ;
          return unit;
        };
        var buildWidget2 = function(spec) {
          var buildThunk2 = buildThunk(unwrap3)(spec);
          var $lazy_patch = $runtime_lazy8("patch", "Halogen.VDom.Driver", function() {
            return function(st, slot2) {
              if (st instanceof Just) {
                if (slot2 instanceof ComponentSlot) {
                  halt(st.value0);
                  return $lazy_renderComponentSlot(100)(slot2.value0);
                }
                ;
                if (slot2 instanceof ThunkSlot) {
                  var step$prime = step2(st.value0, slot2.value0);
                  return mkStep(new Step(extract2(step$prime), new Just(step$prime), $lazy_patch(103), done));
                }
                ;
                throw new Error("Failed pattern match at Halogen.VDom.Driver (line 97, column 22 - line 103, column 79): " + [slot2.constructor.name]);
              }
              ;
              return $lazy_render(104)(slot2);
            };
          });
          var $lazy_render = $runtime_lazy8("render", "Halogen.VDom.Driver", function() {
            return function(slot2) {
              if (slot2 instanceof ComponentSlot) {
                return $lazy_renderComponentSlot(86)(slot2.value0);
              }
              ;
              if (slot2 instanceof ThunkSlot) {
                var step4 = buildThunk2(slot2.value0);
                return mkStep(new Step(extract2(step4), new Just(step4), $lazy_patch(89), done));
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 84, column 7 - line 89, column 75): " + [slot2.constructor.name]);
            };
          });
          var $lazy_renderComponentSlot = $runtime_lazy8("renderComponentSlot", "Halogen.VDom.Driver", function() {
            return function(cs) {
              var renderChild = read(renderChildRef)();
              var rsx = renderChild(cs)();
              var node = getNode(rsx);
              return mkStep(new Step(node, Nothing.value, $lazy_patch(117), done));
            };
          });
          var patch2 = $lazy_patch(91);
          var render = $lazy_render(82);
          var renderComponentSlot = $lazy_renderComponentSlot(109);
          return render;
        };
        var buildAttributes = buildProp(handler3);
        return {
          buildWidget: buildWidget2,
          buildAttributes,
          document: document2
        };
      };
    };
  };
  var renderSpec = function(document2) {
    return function(container) {
      var render = function(handler3) {
        return function(child) {
          return function(v) {
            return function(v1) {
              if (v1 instanceof Nothing) {
                return function __do2() {
                  var renderChildRef = $$new(child)();
                  var spec = mkSpec(handler3)(renderChildRef)(document2);
                  var machine = buildVDom(spec)(v);
                  var node = extract2(machine);
                  $$void7(appendChild(node)(toNode(container)))();
                  return {
                    machine,
                    node,
                    renderChildRef
                  };
                };
              }
              ;
              if (v1 instanceof Just) {
                return function __do2() {
                  write(child)(v1.value0.renderChildRef)();
                  var parent2 = parentNode2(v1.value0.node)();
                  var nextSib = nextSibling(v1.value0.node)();
                  var machine$prime = step2(v1.value0.machine, v);
                  var newNode = extract2(machine$prime);
                  when3(not2(unsafeRefEq)(v1.value0.node)(newNode))(substInParent(newNode)(nextSib)(parent2))();
                  return {
                    machine: machine$prime,
                    node: newNode,
                    renderChildRef: v1.value0.renderChildRef
                  };
                };
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 157, column 5 - line 173, column 80): " + [v1.constructor.name]);
            };
          };
        };
      };
      return {
        render,
        renderChild: identity11,
        removeChild: removeChild3,
        dispose: removeChild3
      };
    };
  };
  var runUI2 = function(component11) {
    return function(i2) {
      return function(element3) {
        return bind14(liftEffect6(map27(toDocument)(bindFlipped7(document)(windowImpl))))(function(document2) {
          return runUI(renderSpec(document2)(element3))(component11)(i2);
        });
      };
    };
  };

  // output/Record/index.js
  var get2 = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function(l) {
        return function(r) {
          return unsafeGet(reflectSymbol2(l))(r);
        };
      };
    };
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head6, tail3) {
      this.head = head6;
      this.tail = tail3;
    };
    function finalCell(head6) {
      return new ConsCell(head6, emptyList);
    }
    function consList(x) {
      return function(xs) {
        return new ConsCell(x, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply5, map45, f) {
      var buildFrom = function(x, ys) {
        return apply5(map45(consList)(f(x)))(ys);
      };
      var go2 = function(acc, currentLen, xs) {
        if (currentLen === 0) {
          return acc;
        } else {
          var last4 = xs[currentLen - 1];
          return new Cont(function() {
            var built = go2(buildFrom(last4, acc), currentLen - 1, xs);
            return built;
          });
        }
      };
      return function(array2) {
        var acc = map45(finalCell)(f(array2[array2.length - 1]));
        var result2 = go2(acc, array2.length - 1, array2);
        while (result2 instanceof Cont) {
          result2 = result2.fn();
        }
        return map45(listToArray)(result2);
      };
    };
  }();

  // output/Data.Array.NonEmpty.Internal/index.js
  var NonEmptyArray = function(x) {
    return x;
  };
  var semigroupNonEmptyArray = semigroupArray;
  var functorNonEmptyArray = functorArray;
  var foldableNonEmptyArray = foldableArray;

  // output/Data.Array.NonEmpty/index.js
  var fromJust5 = /* @__PURE__ */ fromJust();
  var unsafeFromArray = NonEmptyArray;
  var toArray = function(v) {
    return v;
  };
  var snoc$prime = function(xs) {
    return function(x) {
      return unsafeFromArray(snoc(xs)(x));
    };
  };
  var snoc5 = function(xs) {
    return function(x) {
      return unsafeFromArray(snoc(toArray(xs))(x));
    };
  };
  var singleton7 = function($110) {
    return unsafeFromArray(singleton4($110));
  };
  var fromArray = function(xs) {
    if (length3(xs) > 0) {
      return new Just(unsafeFromArray(xs));
    }
    ;
    if (otherwise) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Data.Array.NonEmpty (line 161, column 1 - line 161, column 58): " + [xs.constructor.name]);
  };
  var cons$prime = function(x) {
    return function(xs) {
      return unsafeFromArray(cons(x)(xs));
    };
  };
  var adaptMaybe = function(f) {
    return function($126) {
      return fromJust5(f(toArray($126)));
    };
  };
  var head4 = /* @__PURE__ */ adaptMaybe(head);
  var init3 = /* @__PURE__ */ adaptMaybe(init);
  var last3 = /* @__PURE__ */ adaptMaybe(last);
  var tail2 = /* @__PURE__ */ adaptMaybe(tail);
  var adaptAny = function(f) {
    return function($128) {
      return f(toArray($128));
    };
  };
  var unsafeAdapt = function(f) {
    var $129 = adaptAny(f);
    return function($130) {
      return unsafeFromArray($129($130));
    };
  };
  var cons3 = function(x) {
    return unsafeAdapt(cons(x));
  };

  // output/Data.Bifoldable/index.js
  var bifoldableTuple = {
    bifoldMap: function(dictMonoid) {
      var append9 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(g) {
          return function(v) {
            return append9(f(v.value0))(g(v.value1));
          };
        };
      };
    },
    bifoldr: function(f) {
      return function(g) {
        return function(z) {
          return function(v) {
            return f(v.value0)(g(v.value1)(z));
          };
        };
      };
    },
    bifoldl: function(f) {
      return function(g) {
        return function(z) {
          return function(v) {
            return g(f(z)(v.value0))(v.value1);
          };
        };
      };
    }
  };

  // output/Data.Bitraversable/index.js
  var bitraverse = function(dict) {
    return dict.bitraverse;
  };
  var ltraverse = function(dictBitraversable) {
    var bitraverse1 = bitraverse(dictBitraversable);
    return function(dictApplicative) {
      var bitraverse22 = bitraverse1(dictApplicative);
      var pure24 = pure(dictApplicative);
      return function(f) {
        return bitraverse22(f)(pure24);
      };
    };
  };
  var bitraversableTuple = {
    bitraverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      var apply5 = apply(Apply0);
      var map45 = map(Apply0.Functor0());
      return function(f) {
        return function(g) {
          return function(v) {
            return apply5(map45(Tuple.create)(f(v.value0)))(g(v.value1));
          };
        };
      };
    },
    bisequence: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      var apply5 = apply(Apply0);
      var map45 = map(Apply0.Functor0());
      return function(v) {
        return apply5(map45(Tuple.create)(v.value0))(v.value1);
      };
    },
    Bifunctor0: function() {
      return bifunctorTuple;
    },
    Bifoldable1: function() {
      return bifoldableTuple;
    }
  };

  // output/JSURI/foreign.js
  function encodeURIComponent_to_RFC3986(input3) {
    return input3.replace(/[!'()*]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  }
  function _encodeURIComponent(fail4, succeed, input3) {
    try {
      return succeed(encodeURIComponent_to_RFC3986(encodeURIComponent(input3)));
    } catch (err) {
      return fail4(err);
    }
  }
  function _encodeFormURLComponent(fail4, succeed, input3) {
    try {
      return succeed(encodeURIComponent_to_RFC3986(encodeURIComponent(input3)).replace(/%20/g, "+"));
    } catch (err) {
      return fail4(err);
    }
  }
  function _decodeURIComponent(fail4, succeed, input3) {
    try {
      return succeed(decodeURIComponent(input3));
    } catch (err) {
      return fail4(err);
    }
  }

  // output/JSURI/index.js
  var $$encodeURIComponent = /* @__PURE__ */ function() {
    return runFn3(_encodeURIComponent)($$const(Nothing.value))(Just.create);
  }();
  var encodeFormURLComponent = /* @__PURE__ */ function() {
    return runFn3(_encodeFormURLComponent)($$const(Nothing.value))(Just.create);
  }();
  var $$decodeURIComponent = /* @__PURE__ */ function() {
    return runFn3(_decodeURIComponent)($$const(Nothing.value))(Just.create);
  }();

  // output/Routing.Duplex.Types/index.js
  var emptyRouteState = {
    segments: [],
    params: [],
    hash: ""
  };

  // output/Routing.Duplex.Parser/index.js
  var $runtime_lazy9 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var bitraverse2 = /* @__PURE__ */ bitraverse(bitraversableTuple)(applicativeEither);
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeEither);
  var map28 = /* @__PURE__ */ map(functorNonEmptyArray);
  var map111 = /* @__PURE__ */ map(functorFn);
  var foldl2 = /* @__PURE__ */ foldl(foldableNonEmptyArray);
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindEither);
  var append6 = /* @__PURE__ */ append(semigroupNonEmptyArray);
  var Expected = /* @__PURE__ */ function() {
    function Expected2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Expected2.create = function(value0) {
      return function(value1) {
        return new Expected2(value0, value1);
      };
    };
    return Expected2;
  }();
  var ExpectedEndOfPath = /* @__PURE__ */ function() {
    function ExpectedEndOfPath2(value0) {
      this.value0 = value0;
    }
    ;
    ExpectedEndOfPath2.create = function(value0) {
      return new ExpectedEndOfPath2(value0);
    };
    return ExpectedEndOfPath2;
  }();
  var MalformedURIComponent = /* @__PURE__ */ function() {
    function MalformedURIComponent2(value0) {
      this.value0 = value0;
    }
    ;
    MalformedURIComponent2.create = function(value0) {
      return new MalformedURIComponent2(value0);
    };
    return MalformedURIComponent2;
  }();
  var EndOfPath = /* @__PURE__ */ function() {
    function EndOfPath2() {
    }
    ;
    EndOfPath2.value = new EndOfPath2();
    return EndOfPath2;
  }();
  var Fail = /* @__PURE__ */ function() {
    function Fail3(value0) {
      this.value0 = value0;
    }
    ;
    Fail3.create = function(value0) {
      return new Fail3(value0);
    };
    return Fail3;
  }();
  var Success = /* @__PURE__ */ function() {
    function Success3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Success3.create = function(value0) {
      return function(value1) {
        return new Success3(value0, value1);
      };
    };
    return Success3;
  }();
  var Alt = /* @__PURE__ */ function() {
    function Alt2(value0) {
      this.value0 = value0;
    }
    ;
    Alt2.create = function(value0) {
      return new Alt2(value0);
    };
    return Alt2;
  }();
  var Chomp = /* @__PURE__ */ function() {
    function Chomp2(value0) {
      this.value0 = value0;
    }
    ;
    Chomp2.create = function(value0) {
      return new Chomp2(value0);
    };
    return Chomp2;
  }();
  var Prefix = /* @__PURE__ */ function() {
    function Prefix2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Prefix2.create = function(value0) {
      return function(value1) {
        return new Prefix2(value0, value1);
      };
    };
    return Prefix2;
  }();
  var prefix = /* @__PURE__ */ function() {
    return Prefix.create;
  }();
  var parsePath = /* @__PURE__ */ function() {
    var toRouteState = function(v) {
      return {
        segments: v.value0.value0,
        params: v.value0.value1,
        hash: v.value1
      };
    };
    var splitNonEmpty = function(v) {
      return function(v1) {
        if (v1 === "") {
          return [];
        }
        ;
        return split(v)(v1);
      };
    };
    var splitAt4 = function(k) {
      return function(p2) {
        return function(str) {
          var v = indexOf(p2)(str);
          if (v instanceof Just) {
            return new Tuple(take2(v.value0)(str), drop3(v.value0 + length5(p2) | 0)(str));
          }
          ;
          if (v instanceof Nothing) {
            return k(str);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 191, column 5 - line 193, column 23): " + [v.constructor.name]);
        };
      };
    };
    var decodeURIComponent$prime = function(str) {
      var v = $$decodeURIComponent(str);
      if (v instanceof Nothing) {
        return new Left(new MalformedURIComponent(str));
      }
      ;
      if (v instanceof Just) {
        return new Right(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Routing.Duplex.Parser (line 195, column 29 - line 197, column 22): " + [v.constructor.name]);
    };
    var splitKeyValue = function() {
      var $349 = bitraverse2(decodeURIComponent$prime)(decodeURIComponent$prime);
      var $350 = splitAt4(flip(Tuple.create)(""))("=");
      return function($351) {
        return $349($350($351));
      };
    }();
    var splitParams = function() {
      var $352 = traverse2(splitKeyValue);
      var $353 = splitNonEmpty("&");
      return function($354) {
        return $352($353($354));
      };
    }();
    var splitSegments = function() {
      var $355 = splitNonEmpty("/");
      return function($356) {
        return function(v) {
          if (v.length === 2 && (v[0] === "" && v[1] === "")) {
            return new Right([""]);
          }
          ;
          return traverse2(decodeURIComponent$prime)(v);
        }($355($356));
      };
    }();
    var splitPath = function() {
      var $357 = bitraverse2(splitSegments)(splitParams);
      var $358 = splitAt4(flip(Tuple.create)(""))("?");
      return function($359) {
        return $357($358($359));
      };
    }();
    var $360 = map(functorEither)(toRouteState);
    var $361 = ltraverse(bitraversableTuple)(applicativeEither)(splitPath);
    var $362 = splitAt4(flip(Tuple.create)(""))("#");
    return function($363) {
      return $360($361($362($363)));
    };
  }();
  var functorRouteResult = {
    map: function(f) {
      return function(m) {
        if (m instanceof Fail) {
          return new Fail(m.value0);
        }
        ;
        if (m instanceof Success) {
          return new Success(m.value0, f(m.value1));
        }
        ;
        throw new Error("Failed pattern match at Routing.Duplex.Parser (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var map29 = /* @__PURE__ */ map(functorRouteResult);
  var functorRouteParser = {
    map: function(f) {
      return function(m) {
        if (m instanceof Alt) {
          return new Alt(map28(map(functorRouteParser)(f))(m.value0));
        }
        ;
        if (m instanceof Chomp) {
          return new Chomp(map111(map29(f))(m.value0));
        }
        ;
        if (m instanceof Prefix) {
          return new Prefix(m.value0, map(functorRouteParser)(f)(m.value1));
        }
        ;
        throw new Error("Failed pattern match at Routing.Duplex.Parser (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var end = /* @__PURE__ */ function() {
    return new Chomp(function(state3) {
      var v = head(state3.segments);
      if (v instanceof Nothing) {
        return new Success(state3, unit);
      }
      ;
      if (v instanceof Just) {
        return new Fail(new ExpectedEndOfPath(v.value0));
      }
      ;
      throw new Error("Failed pattern match at Routing.Duplex.Parser (line 266, column 3 - line 268, column 45): " + [v.constructor.name]);
    });
  }();
  var chompPrefix = function(pre2) {
    return function(state3) {
      var v = head(state3.segments);
      if (v instanceof Just && pre2 === v.value0) {
        return new Success({
          params: state3.params,
          hash: state3.hash,
          segments: drop(1)(state3.segments)
        }, unit);
      }
      ;
      if (v instanceof Just) {
        return new Fail(new Expected(pre2, v.value0));
      }
      ;
      return new Fail(EndOfPath.value);
    };
  };
  var $lazy_runRouteParser = /* @__PURE__ */ $runtime_lazy9("runRouteParser", "Routing.Duplex.Parser", function() {
    var goAlt = function(v) {
      return function(v1) {
        return function(v2) {
          if (v1 instanceof Fail) {
            return $lazy_runRouteParser(161)(v)(v2);
          }
          ;
          return v1;
        };
      };
    };
    var go2 = function($copy_state) {
      return function($copy_v) {
        var $tco_var_state = $copy_state;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(state3, v) {
          if (v instanceof Alt) {
            $tco_done = true;
            return foldl2(goAlt(state3))(new Fail(EndOfPath.value))(v.value0);
          }
          ;
          if (v instanceof Chomp) {
            $tco_done = true;
            return v.value0(state3);
          }
          ;
          if (v instanceof Prefix) {
            var v1 = chompPrefix(v.value0)(state3);
            if (v1 instanceof Fail) {
              $tco_done = true;
              return new Fail(v1.value0);
            }
            ;
            if (v1 instanceof Success) {
              $tco_var_state = v1.value0;
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Routing.Duplex.Parser (line 157, column 7 - line 159, column 40): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 153, column 14 - line 159, column 40): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_state, $copy_v);
        }
        ;
        return $tco_result;
      };
    };
    return go2;
  });
  var runRouteParser = /* @__PURE__ */ $lazy_runRouteParser(150);
  var run3 = function(p2) {
    return composeKleisli2(parsePath)(function() {
      var $366 = flip(runRouteParser)(p2);
      return function($367) {
        return function(v) {
          if (v instanceof Fail) {
            return new Left(v.value0);
          }
          ;
          if (v instanceof Success) {
            return new Right(v.value1);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 200, column 49 - line 202, column 29): " + [v.constructor.name]);
        }($366($367));
      };
    }());
  };
  var applyRouteParser = {
    apply: function(fx) {
      return function(x) {
        return new Chomp(function(state3) {
          var v = runRouteParser(state3)(fx);
          if (v instanceof Fail) {
            return new Fail(v.value0);
          }
          ;
          if (v instanceof Success) {
            return map29(v.value1)(runRouteParser(v.value0)(x));
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 81, column 5 - line 83, column 56): " + [v.constructor.name]);
        });
      };
    },
    Functor0: function() {
      return functorRouteParser;
    }
  };
  var applicativeRouteParser = {
    pure: /* @__PURE__ */ function() {
      var $368 = flip(Success.create);
      return function($369) {
        return Chomp.create($368($369));
      };
    }(),
    Apply0: function() {
      return applyRouteParser;
    }
  };
  var altSnoc = function(v) {
    return function(v1) {
      var v2 = function(v3) {
        return snoc5(v)(v1);
      };
      if (v1 instanceof Prefix) {
        var $310 = last3(v);
        if ($310 instanceof Prefix) {
          var $311 = v1.value0 === $310.value0;
          if ($311) {
            return snoc$prime(init3(v))(new Prefix(v1.value0, alt(altRouteParser)($310.value1)(v1.value1)));
          }
          ;
          return v2(true);
        }
        ;
        return v2(true);
      }
      ;
      return v2(true);
    };
  };
  var altRouteParser = {
    alt: function(v) {
      return function(v1) {
        if (v instanceof Alt && v1 instanceof Alt) {
          return new Alt(altAppend(v.value0)(v1.value0));
        }
        ;
        if (v instanceof Alt) {
          return new Alt(altSnoc(v.value0)(v1));
        }
        ;
        if (v1 instanceof Alt) {
          return new Alt(altCons(v)(v1.value0));
        }
        ;
        if (v instanceof Prefix && (v1 instanceof Prefix && v.value0 === v1.value0)) {
          return new Prefix(v.value0, alt(altRouteParser)(v.value1)(v1.value1));
        }
        ;
        return new Alt(cons3(v)(singleton7(v1)));
      };
    },
    Functor0: function() {
      return functorRouteParser;
    }
  };
  var altCons = function(v) {
    return function(v1) {
      var v2 = function(v3) {
        return cons3(v)(v1);
      };
      if (v instanceof Prefix) {
        var $330 = head4(v1);
        if ($330 instanceof Prefix) {
          var $331 = v.value0 === $330.value0;
          if ($331) {
            return cons$prime(new Prefix(v.value0, alt(altRouteParser)(v.value1)($330.value1)))(tail2(v1));
          }
          ;
          return v2(true);
        }
        ;
        return v2(true);
      }
      ;
      return v2(true);
    };
  };
  var altAppend = function($copy_ls) {
    return function($copy_rs) {
      var $tco_var_ls = $copy_ls;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(ls, rs) {
        var v = function(v12) {
          if (otherwise) {
            return append6(ls)(rs);
          }
          ;
          throw new Error("Failed pattern match at Routing.Duplex.Parser (line 103, column 1 - line 107, column 35): " + [ls.constructor.name, rs.constructor.name]);
        };
        var $340 = last3(ls);
        if ($340 instanceof Prefix) {
          var $341 = head4(rs);
          if ($341 instanceof Prefix) {
            var $342 = $340.value0 === $341.value0;
            if ($342) {
              var rs$prime = cons$prime(new Prefix($340.value0, alt(altRouteParser)($340.value1)($341.value1)))(tail2(rs));
              var v1 = fromArray(init3(ls));
              if (v1 instanceof Just) {
                $tco_var_ls = v1.value0;
                $copy_rs = rs$prime;
                return;
              }
              ;
              if (v1 instanceof Nothing) {
                $tco_done = true;
                return rs$prime;
              }
              ;
              throw new Error("Failed pattern match at Routing.Duplex.Parser (line 116, column 9 - line 118, column 25): " + [v1.constructor.name]);
            }
            ;
            $tco_done = true;
            return v(true);
          }
          ;
          $tco_done = true;
          return v(true);
        }
        ;
        $tco_done = true;
        return v(true);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_ls, $copy_rs);
      }
      ;
      return $tco_result;
    };
  };

  // output/Routing.Duplex.Printer/index.js
  var append7 = /* @__PURE__ */ append(/* @__PURE__ */ semigroupMaybe(semigroupString));
  var semigroupRoutePrinter = {
    append: function(v) {
      return function(v1) {
        return function($33) {
          return v1(v($33));
        };
      };
    }
  };
  var put2 = function(str) {
    return function(state3) {
      return {
        params: state3.params,
        hash: state3.hash,
        segments: snoc(state3.segments)(str)
      };
    };
  };
  var printPath = function(v) {
    var printSegments = function(v1) {
      if (v1.length === 1 && v1[0] === "") {
        return "/";
      }
      ;
      return joinWith("/")(mapMaybe($$encodeURIComponent)(v1));
    };
    var printParam = function(v1) {
      return function(v2) {
        if (v2 === "") {
          return $$encodeURIComponent(v1);
        }
        ;
        return append7($$encodeURIComponent(v1))(append7(new Just("="))($$encodeURIComponent(v2)));
      };
    };
    var printParams = function(v1) {
      if (v1.length === 0) {
        return "";
      }
      ;
      return "?" + joinWith("&")(mapMaybe(uncurry(printParam))(v1));
    };
    var printHash = function(v1) {
      if (v1 === "") {
        return "";
      }
      ;
      return "#" + v1;
    };
    return printSegments(v.segments) + (printParams(v.params) + printHash(v.hash));
  };
  var run4 = /* @__PURE__ */ function() {
    var $34 = applyFlipped(emptyRouteState);
    var $35 = unwrap();
    return function($36) {
      return printPath($34($35($36)));
    };
  }();
  var monoidRoutePRinter = {
    mempty: /* @__PURE__ */ identity(categoryFn),
    Semigroup0: function() {
      return semigroupRoutePrinter;
    }
  };

  // output/Routing.Duplex/index.js
  var append8 = /* @__PURE__ */ append(semigroupRoutePrinter);
  var applyFirst2 = /* @__PURE__ */ applyFirst(applyRouteParser);
  var pure9 = /* @__PURE__ */ pure(applicativeRouteParser);
  var apply2 = /* @__PURE__ */ apply(applyRouteParser);
  var map30 = /* @__PURE__ */ map(functorRouteParser);
  var mempty2 = /* @__PURE__ */ mempty(monoidRoutePRinter);
  var apply1 = /* @__PURE__ */ apply(applyFn);
  var map112 = /* @__PURE__ */ map(functorFn);
  var RouteDuplex = /* @__PURE__ */ function() {
    function RouteDuplex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RouteDuplex2.create = function(value0) {
      return function(value1) {
        return new RouteDuplex2(value0, value1);
      };
    };
    return RouteDuplex2;
  }();
  var profunctorRouteDuplex = {
    dimap: function(f) {
      return function(g) {
        return function(v) {
          return new RouteDuplex(function($137) {
            return v.value0(f($137));
          }, map30(g)(v.value1));
        };
      };
    }
  };
  var print6 = function(v) {
    return function($138) {
      return run4(v.value0($138));
    };
  };
  var prefix2 = function(s) {
    return function(v) {
      return new RouteDuplex(function(a2) {
        return append8(put2(s))(v.value0(a2));
      }, prefix(s)(v.value1));
    };
  };
  var path = /* @__PURE__ */ function() {
    var $139 = flip(foldr(foldableArray)(prefix2));
    var $140 = split("/");
    return function($141) {
      return $139($140($141));
    };
  }();
  var root = /* @__PURE__ */ path("");
  var parse7 = function(v) {
    return run3(v.value1);
  };
  var functorRouteDuplex = {
    map: function(f) {
      return function(m) {
        return new RouteDuplex(m.value0, map30(f)(m.value1));
      };
    }
  };
  var end2 = function(v) {
    return new RouteDuplex(v.value0, applyFirst2(v.value1)(end));
  };
  var applyRouteDuplex = {
    apply: function(v) {
      return function(v1) {
        return new RouteDuplex(apply1(map112(append8)(v.value0))(v1.value0), apply2(v.value1)(v1.value1));
      };
    },
    Functor0: function() {
      return functorRouteDuplex;
    }
  };
  var applicativeRouteDuplex = {
    pure: /* @__PURE__ */ function() {
      var $143 = RouteDuplex.create($$const(mempty2));
      return function($144) {
        return $143(pure9($144));
      };
    }(),
    Apply0: function() {
      return applyRouteDuplex;
    }
  };

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str) {
      return str.codePointAt(0);
    } : fallback;
  };
  var _codePointAt = function(fallback) {
    return function(Just2) {
      return function(Nothing2) {
        return function(unsafeCodePointAt02) {
          return function(index6) {
            return function(str) {
              var length9 = str.length;
              if (index6 < 0 || index6 >= length9)
                return Nothing2;
              if (hasStringIterator) {
                var iter = str[Symbol.iterator]();
                for (var i2 = index6; ; --i2) {
                  var o = iter.next();
                  if (o.done)
                    return Nothing2;
                  if (i2 === 0)
                    return Just2(unsafeCodePointAt02(o.value));
                }
              }
              return fallback(index6)(str);
            };
          };
        };
      };
    };
  };
  var _singleton = function(fallback) {
    return hasFromCodePoint ? String.fromCodePoint : fallback;
  };
  var _take = function(fallback) {
    return function(n) {
      if (hasStringIterator) {
        return function(str) {
          var accum = "";
          var iter = str[Symbol.iterator]();
          for (var i2 = 0; i2 < n; ++i2) {
            var o = iter.next();
            if (o.done)
              return accum;
            accum += o.value;
          }
          return accum;
        };
      }
      return fallback(n);
    };
  };
  var _toCodePointArray = function(fallback) {
    return function(unsafeCodePointAt02) {
      if (hasArrayFrom) {
        return function(str) {
          return Array.from(str, unsafeCodePointAt02);
        };
      }
      return fallback;
    };
  };

  // output/Data.String.CodePoints/index.js
  var $runtime_lazy10 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var map31 = /* @__PURE__ */ map(functorMaybe);
  var unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
  var div3 = /* @__PURE__ */ div(euclideanRingInt);
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var compare2 = /* @__PURE__ */ compare(ordInt);
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons5 = function(s) {
    var v = length5(s);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum2(charAt(0)(s)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum2(charAt(1)(s));
    var cu0 = fromEnum2(charAt(0)(s));
    var $43 = isLead(cu0) && isTrail(cu1);
    if ($43) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop3(2)(s)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop3(1)(s)
    });
  };
  var unconsButWithTuple = function(s) {
    return map31(function(v) {
      return new Tuple(v.head, v.tail);
    })(uncons5(s));
  };
  var toCodePointArrayFallback = function(s) {
    return unfoldr2(unconsButWithTuple)(s);
  };
  var unsafeCodePointAt0Fallback = function(s) {
    var cu0 = fromEnum2(charAt(0)(s));
    var $47 = isLead(cu0) && length5(s) > 1;
    if ($47) {
      var cu1 = fromEnum2(charAt(1)(s));
      var $48 = isTrail(cu1);
      if ($48) {
        return unsurrogate(cu0)(cu1);
      }
      ;
      return cu0;
    }
    ;
    return cu0;
  };
  var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
  var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
  var length7 = function($74) {
    return length3(toCodePointArray($74));
  };
  var fromCharCode2 = /* @__PURE__ */ function() {
    var $75 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
    return function($76) {
      return singleton6($75($76));
    };
  }();
  var singletonFallback = function(v) {
    if (v <= 65535) {
      return fromCharCode2(v);
    }
    ;
    var lead = div3(v - 65536 | 0)(1024) + 55296 | 0;
    var trail = mod2(v - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode2(lead) + fromCharCode2(trail);
  };
  var singleton9 = /* @__PURE__ */ _singleton(singletonFallback);
  var takeFallback = function(v) {
    return function(v1) {
      if (v < 1) {
        return "";
      }
      ;
      var v2 = uncons5(v1);
      if (v2 instanceof Just) {
        return singleton9(v2.value0.head) + takeFallback(v - 1 | 0)(v2.value0.tail);
      }
      ;
      return v1;
    };
  };
  var take5 = /* @__PURE__ */ _take(takeFallback);
  var splitAt3 = function(i2) {
    return function(s) {
      var before = take5(i2)(s);
      return {
        before,
        after: drop3(length5(before))(s)
      };
    };
  };
  var eqCodePoint = {
    eq: function(x) {
      return function(y) {
        return x === y;
      };
    }
  };
  var ordCodePoint = {
    compare: function(x) {
      return function(y) {
        return compare2(x)(y);
      };
    },
    Eq0: function() {
      return eqCodePoint;
    }
  };
  var drop4 = function(n) {
    return function(s) {
      return drop3(length5(take5(n)(s)))(s);
    };
  };
  var codePointAtFallback = function($copy_n) {
    return function($copy_s) {
      var $tco_var_n = $copy_n;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(n, s) {
        var v = uncons5(s);
        if (v instanceof Just) {
          var $66 = n === 0;
          if ($66) {
            $tco_done = true;
            return new Just(v.value0.head);
          }
          ;
          $tco_var_n = n - 1 | 0;
          $copy_s = v.value0.tail;
          return;
        }
        ;
        $tco_done = true;
        return Nothing.value;
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_n, $copy_s);
      }
      ;
      return $tco_result;
    };
  };
  var codePointAt = function(v) {
    return function(v1) {
      if (v < 0) {
        return Nothing.value;
      }
      ;
      if (v === 0 && v1 === "") {
        return Nothing.value;
      }
      ;
      if (v === 0) {
        return new Just(unsafeCodePointAt0(v1));
      }
      ;
      return _codePointAt(codePointAtFallback)(Just.create)(Nothing.value)(unsafeCodePointAt0)(v)(v1);
    };
  };
  var boundedCodePoint = {
    bottom: 0,
    top: 1114111,
    Ord0: function() {
      return ordCodePoint;
    }
  };
  var boundedEnumCodePoint = /* @__PURE__ */ function() {
    return {
      cardinality: 1114111 + 1 | 0,
      fromEnum: function(v) {
        return v;
      },
      toEnum: function(n) {
        if (n >= 0 && n <= 1114111) {
          return new Just(n);
        }
        ;
        if (otherwise) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.String.CodePoints (line 63, column 1 - line 68, column 26): " + [n.constructor.name]);
      },
      Bounded0: function() {
        return boundedCodePoint;
      },
      Enum1: function() {
        return $lazy_enumCodePoint(0);
      }
    };
  }();
  var $lazy_enumCodePoint = /* @__PURE__ */ $runtime_lazy10("enumCodePoint", "Data.String.CodePoints", function() {
    return {
      succ: defaultSucc(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      pred: defaultPred(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      Ord0: function() {
        return ordCodePoint;
      }
    };
  });

  // output/Web.HTML.Event.HashChangeEvent.EventTypes/index.js
  var hashchange = "hashchange";

  // output/Routing.Hash/index.js
  var bind6 = /* @__PURE__ */ bind(bindEffect);
  var map32 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped8 = /* @__PURE__ */ bindFlipped(bindEffect);
  var join3 = /* @__PURE__ */ join(bindEffect);
  var apply3 = /* @__PURE__ */ apply(applyEffect);
  var pure10 = /* @__PURE__ */ pure(applicativeEffect);
  var voidRight2 = /* @__PURE__ */ voidRight(functorEffect);
  var setHash2 = function(h) {
    return bind6(bind6(windowImpl)(location2))(setHash(h));
  };
  var getHash = /* @__PURE__ */ bind6(/* @__PURE__ */ bind6(windowImpl)(location2))(/* @__PURE__ */ function() {
    var $16 = map32(function() {
      var $18 = fromMaybe("");
      var $19 = stripPrefix("#");
      return function($20) {
        return $18($19($20));
      };
    }());
    return function($17) {
      return $16(hash($17));
    };
  }());
  var foldHashes = function(cb) {
    return function(init4) {
      return function __do2() {
        var ref2 = bindFlipped8($$new)(bindFlipped8(init4)(getHash))();
        var win = map32(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v) {
          return bindFlipped8(flip(write)(ref2))(join3(apply3(map32(cb)(read(ref2)))(getHash)));
        })();
        addEventListener(hashchange)(listener)(false)(win)();
        return removeEventListener(hashchange)(listener)(false)(win);
      };
    };
  };
  var matchesWith = function(dictFoldable) {
    var indexl2 = indexl(dictFoldable);
    return function(parser) {
      return function(cb) {
        var go2 = function(a2) {
          var $21 = maybe(pure10(a2))(function(b2) {
            return voidRight2(new Just(b2))(cb(a2)(b2));
          });
          var $22 = indexl2(0);
          return function($23) {
            return $21($22(parser($23)));
          };
        };
        return foldHashes(go2)(go2(Nothing.value));
      };
    };
  };

  // output/Effect.Now/foreign.js
  function now2() {
    return Date.now();
  }

  // output/Data.Date/foreign.js
  var createDate = function(y, m, d) {
    var date2 = new Date(Date.UTC(y, m, d));
    if (y >= 0 && y < 100) {
      date2.setUTCFullYear(y);
    }
    return date2;
  };
  function canonicalDateImpl(ctor, y, m, d) {
    var date2 = createDate(y, m - 1, d);
    return ctor(date2.getUTCFullYear())(date2.getUTCMonth() + 1)(date2.getUTCDate());
  }
  function calcWeekday(y, m, d) {
    return createDate(y, m - 1, d).getUTCDay();
  }

  // output/Data.Date.Component/index.js
  var $runtime_lazy11 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var Monday = /* @__PURE__ */ function() {
    function Monday2() {
    }
    ;
    Monday2.value = new Monday2();
    return Monday2;
  }();
  var Tuesday = /* @__PURE__ */ function() {
    function Tuesday2() {
    }
    ;
    Tuesday2.value = new Tuesday2();
    return Tuesday2;
  }();
  var Wednesday = /* @__PURE__ */ function() {
    function Wednesday2() {
    }
    ;
    Wednesday2.value = new Wednesday2();
    return Wednesday2;
  }();
  var Thursday = /* @__PURE__ */ function() {
    function Thursday2() {
    }
    ;
    Thursday2.value = new Thursday2();
    return Thursday2;
  }();
  var Friday = /* @__PURE__ */ function() {
    function Friday2() {
    }
    ;
    Friday2.value = new Friday2();
    return Friday2;
  }();
  var Saturday = /* @__PURE__ */ function() {
    function Saturday2() {
    }
    ;
    Saturday2.value = new Saturday2();
    return Saturday2;
  }();
  var Sunday = /* @__PURE__ */ function() {
    function Sunday2() {
    }
    ;
    Sunday2.value = new Sunday2();
    return Sunday2;
  }();
  var January = /* @__PURE__ */ function() {
    function January2() {
    }
    ;
    January2.value = new January2();
    return January2;
  }();
  var February = /* @__PURE__ */ function() {
    function February2() {
    }
    ;
    February2.value = new February2();
    return February2;
  }();
  var March = /* @__PURE__ */ function() {
    function March2() {
    }
    ;
    March2.value = new March2();
    return March2;
  }();
  var April = /* @__PURE__ */ function() {
    function April2() {
    }
    ;
    April2.value = new April2();
    return April2;
  }();
  var May = /* @__PURE__ */ function() {
    function May2() {
    }
    ;
    May2.value = new May2();
    return May2;
  }();
  var June = /* @__PURE__ */ function() {
    function June2() {
    }
    ;
    June2.value = new June2();
    return June2;
  }();
  var July = /* @__PURE__ */ function() {
    function July2() {
    }
    ;
    July2.value = new July2();
    return July2;
  }();
  var August = /* @__PURE__ */ function() {
    function August2() {
    }
    ;
    August2.value = new August2();
    return August2;
  }();
  var September = /* @__PURE__ */ function() {
    function September2() {
    }
    ;
    September2.value = new September2();
    return September2;
  }();
  var October = /* @__PURE__ */ function() {
    function October2() {
    }
    ;
    October2.value = new October2();
    return October2;
  }();
  var November = /* @__PURE__ */ function() {
    function November2() {
    }
    ;
    November2.value = new November2();
    return November2;
  }();
  var December = /* @__PURE__ */ function() {
    function December2() {
    }
    ;
    December2.value = new December2();
    return December2;
  }();
  var showWeekday = {
    show: function(v) {
      if (v instanceof Monday) {
        return "Monday";
      }
      ;
      if (v instanceof Tuesday) {
        return "Tuesday";
      }
      ;
      if (v instanceof Wednesday) {
        return "Wednesday";
      }
      ;
      if (v instanceof Thursday) {
        return "Thursday";
      }
      ;
      if (v instanceof Friday) {
        return "Friday";
      }
      ;
      if (v instanceof Saturday) {
        return "Saturday";
      }
      ;
      if (v instanceof Sunday) {
        return "Sunday";
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 184, column 1 - line 191, column 25): " + [v.constructor.name]);
    }
  };
  var showMonth = {
    show: function(v) {
      if (v instanceof January) {
        return "January";
      }
      ;
      if (v instanceof February) {
        return "February";
      }
      ;
      if (v instanceof March) {
        return "March";
      }
      ;
      if (v instanceof April) {
        return "April";
      }
      ;
      if (v instanceof May) {
        return "May";
      }
      ;
      if (v instanceof June) {
        return "June";
      }
      ;
      if (v instanceof July) {
        return "July";
      }
      ;
      if (v instanceof August) {
        return "August";
      }
      ;
      if (v instanceof September) {
        return "September";
      }
      ;
      if (v instanceof October) {
        return "October";
      }
      ;
      if (v instanceof November) {
        return "November";
      }
      ;
      if (v instanceof December) {
        return "December";
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 101, column 1 - line 113, column 29): " + [v.constructor.name]);
    }
  };
  var ordYear = ordInt;
  var ordDay = ordInt;
  var eqWeekday = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Monday && y instanceof Monday) {
          return true;
        }
        ;
        if (x instanceof Tuesday && y instanceof Tuesday) {
          return true;
        }
        ;
        if (x instanceof Wednesday && y instanceof Wednesday) {
          return true;
        }
        ;
        if (x instanceof Thursday && y instanceof Thursday) {
          return true;
        }
        ;
        if (x instanceof Friday && y instanceof Friday) {
          return true;
        }
        ;
        if (x instanceof Saturday && y instanceof Saturday) {
          return true;
        }
        ;
        if (x instanceof Sunday && y instanceof Sunday) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var ordWeekday = {
    compare: function(x) {
      return function(y) {
        if (x instanceof Monday && y instanceof Monday) {
          return EQ.value;
        }
        ;
        if (x instanceof Monday) {
          return LT.value;
        }
        ;
        if (y instanceof Monday) {
          return GT.value;
        }
        ;
        if (x instanceof Tuesday && y instanceof Tuesday) {
          return EQ.value;
        }
        ;
        if (x instanceof Tuesday) {
          return LT.value;
        }
        ;
        if (y instanceof Tuesday) {
          return GT.value;
        }
        ;
        if (x instanceof Wednesday && y instanceof Wednesday) {
          return EQ.value;
        }
        ;
        if (x instanceof Wednesday) {
          return LT.value;
        }
        ;
        if (y instanceof Wednesday) {
          return GT.value;
        }
        ;
        if (x instanceof Thursday && y instanceof Thursday) {
          return EQ.value;
        }
        ;
        if (x instanceof Thursday) {
          return LT.value;
        }
        ;
        if (y instanceof Thursday) {
          return GT.value;
        }
        ;
        if (x instanceof Friday && y instanceof Friday) {
          return EQ.value;
        }
        ;
        if (x instanceof Friday) {
          return LT.value;
        }
        ;
        if (y instanceof Friday) {
          return GT.value;
        }
        ;
        if (x instanceof Saturday && y instanceof Saturday) {
          return EQ.value;
        }
        ;
        if (x instanceof Saturday) {
          return LT.value;
        }
        ;
        if (y instanceof Saturday) {
          return GT.value;
        }
        ;
        if (x instanceof Sunday && y instanceof Sunday) {
          return EQ.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Date.Component (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
      };
    },
    Eq0: function() {
      return eqWeekday;
    }
  };
  var eqMonth = {
    eq: function(x) {
      return function(y) {
        if (x instanceof January && y instanceof January) {
          return true;
        }
        ;
        if (x instanceof February && y instanceof February) {
          return true;
        }
        ;
        if (x instanceof March && y instanceof March) {
          return true;
        }
        ;
        if (x instanceof April && y instanceof April) {
          return true;
        }
        ;
        if (x instanceof May && y instanceof May) {
          return true;
        }
        ;
        if (x instanceof June && y instanceof June) {
          return true;
        }
        ;
        if (x instanceof July && y instanceof July) {
          return true;
        }
        ;
        if (x instanceof August && y instanceof August) {
          return true;
        }
        ;
        if (x instanceof September && y instanceof September) {
          return true;
        }
        ;
        if (x instanceof October && y instanceof October) {
          return true;
        }
        ;
        if (x instanceof November && y instanceof November) {
          return true;
        }
        ;
        if (x instanceof December && y instanceof December) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var ordMonth = {
    compare: function(x) {
      return function(y) {
        if (x instanceof January && y instanceof January) {
          return EQ.value;
        }
        ;
        if (x instanceof January) {
          return LT.value;
        }
        ;
        if (y instanceof January) {
          return GT.value;
        }
        ;
        if (x instanceof February && y instanceof February) {
          return EQ.value;
        }
        ;
        if (x instanceof February) {
          return LT.value;
        }
        ;
        if (y instanceof February) {
          return GT.value;
        }
        ;
        if (x instanceof March && y instanceof March) {
          return EQ.value;
        }
        ;
        if (x instanceof March) {
          return LT.value;
        }
        ;
        if (y instanceof March) {
          return GT.value;
        }
        ;
        if (x instanceof April && y instanceof April) {
          return EQ.value;
        }
        ;
        if (x instanceof April) {
          return LT.value;
        }
        ;
        if (y instanceof April) {
          return GT.value;
        }
        ;
        if (x instanceof May && y instanceof May) {
          return EQ.value;
        }
        ;
        if (x instanceof May) {
          return LT.value;
        }
        ;
        if (y instanceof May) {
          return GT.value;
        }
        ;
        if (x instanceof June && y instanceof June) {
          return EQ.value;
        }
        ;
        if (x instanceof June) {
          return LT.value;
        }
        ;
        if (y instanceof June) {
          return GT.value;
        }
        ;
        if (x instanceof July && y instanceof July) {
          return EQ.value;
        }
        ;
        if (x instanceof July) {
          return LT.value;
        }
        ;
        if (y instanceof July) {
          return GT.value;
        }
        ;
        if (x instanceof August && y instanceof August) {
          return EQ.value;
        }
        ;
        if (x instanceof August) {
          return LT.value;
        }
        ;
        if (y instanceof August) {
          return GT.value;
        }
        ;
        if (x instanceof September && y instanceof September) {
          return EQ.value;
        }
        ;
        if (x instanceof September) {
          return LT.value;
        }
        ;
        if (y instanceof September) {
          return GT.value;
        }
        ;
        if (x instanceof October && y instanceof October) {
          return EQ.value;
        }
        ;
        if (x instanceof October) {
          return LT.value;
        }
        ;
        if (y instanceof October) {
          return GT.value;
        }
        ;
        if (x instanceof November && y instanceof November) {
          return EQ.value;
        }
        ;
        if (x instanceof November) {
          return LT.value;
        }
        ;
        if (y instanceof November) {
          return GT.value;
        }
        ;
        if (x instanceof December && y instanceof December) {
          return EQ.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Date.Component (line 0, column 0 - line 0, column 0): " + [x.constructor.name, y.constructor.name]);
      };
    },
    Eq0: function() {
      return eqMonth;
    }
  };
  var boundedYear = /* @__PURE__ */ function() {
    return {
      bottom: -271820 | 0,
      top: 275759,
      Ord0: function() {
        return ordYear;
      }
    };
  }();
  var boundedWeekday = /* @__PURE__ */ function() {
    return {
      bottom: Monday.value,
      top: Sunday.value,
      Ord0: function() {
        return ordWeekday;
      }
    };
  }();
  var boundedMonth = /* @__PURE__ */ function() {
    return {
      bottom: January.value,
      top: December.value,
      Ord0: function() {
        return ordMonth;
      }
    };
  }();
  var boundedEnumYear = {
    cardinality: 547580,
    toEnum: function(n) {
      if (n >= (-271820 | 0) && n <= 275759) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 35, column 1 - line 40, column 24): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedYear;
    },
    Enum1: function() {
      return $lazy_enumYear(0);
    }
  };
  var $lazy_enumYear = /* @__PURE__ */ $runtime_lazy11("enumYear", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $55 = toEnum(boundedEnumYear);
        var $56 = fromEnum(boundedEnumYear);
        return function($57) {
          return $55(function(v) {
            return v + 1 | 0;
          }($56($57)));
        };
      }(),
      pred: function() {
        var $58 = toEnum(boundedEnumYear);
        var $59 = fromEnum(boundedEnumYear);
        return function($60) {
          return $58(function(v) {
            return v - 1 | 0;
          }($59($60)));
        };
      }(),
      Ord0: function() {
        return ordYear;
      }
    };
  });
  var boundedEnumWeekday = {
    cardinality: 7,
    toEnum: function(v) {
      if (v === 1) {
        return new Just(Monday.value);
      }
      ;
      if (v === 2) {
        return new Just(Tuesday.value);
      }
      ;
      if (v === 3) {
        return new Just(Wednesday.value);
      }
      ;
      if (v === 4) {
        return new Just(Thursday.value);
      }
      ;
      if (v === 5) {
        return new Just(Friday.value);
      }
      ;
      if (v === 6) {
        return new Just(Saturday.value);
      }
      ;
      if (v === 7) {
        return new Just(Sunday.value);
      }
      ;
      return Nothing.value;
    },
    fromEnum: function(v) {
      if (v instanceof Monday) {
        return 1;
      }
      ;
      if (v instanceof Tuesday) {
        return 2;
      }
      ;
      if (v instanceof Wednesday) {
        return 3;
      }
      ;
      if (v instanceof Thursday) {
        return 4;
      }
      ;
      if (v instanceof Friday) {
        return 5;
      }
      ;
      if (v instanceof Saturday) {
        return 6;
      }
      ;
      if (v instanceof Sunday) {
        return 7;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 175, column 14 - line 182, column 16): " + [v.constructor.name]);
    },
    Bounded0: function() {
      return boundedWeekday;
    },
    Enum1: function() {
      return $lazy_enumWeekday(0);
    }
  };
  var $lazy_enumWeekday = /* @__PURE__ */ $runtime_lazy11("enumWeekday", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $61 = toEnum(boundedEnumWeekday);
        var $62 = fromEnum(boundedEnumWeekday);
        return function($63) {
          return $61(function(v) {
            return v + 1 | 0;
          }($62($63)));
        };
      }(),
      pred: function() {
        var $64 = toEnum(boundedEnumWeekday);
        var $65 = fromEnum(boundedEnumWeekday);
        return function($66) {
          return $64(function(v) {
            return v - 1 | 0;
          }($65($66)));
        };
      }(),
      Ord0: function() {
        return ordWeekday;
      }
    };
  });
  var boundedEnumMonth = {
    cardinality: 12,
    toEnum: function(v) {
      if (v === 1) {
        return new Just(January.value);
      }
      ;
      if (v === 2) {
        return new Just(February.value);
      }
      ;
      if (v === 3) {
        return new Just(March.value);
      }
      ;
      if (v === 4) {
        return new Just(April.value);
      }
      ;
      if (v === 5) {
        return new Just(May.value);
      }
      ;
      if (v === 6) {
        return new Just(June.value);
      }
      ;
      if (v === 7) {
        return new Just(July.value);
      }
      ;
      if (v === 8) {
        return new Just(August.value);
      }
      ;
      if (v === 9) {
        return new Just(September.value);
      }
      ;
      if (v === 10) {
        return new Just(October.value);
      }
      ;
      if (v === 11) {
        return new Just(November.value);
      }
      ;
      if (v === 12) {
        return new Just(December.value);
      }
      ;
      return Nothing.value;
    },
    fromEnum: function(v) {
      if (v instanceof January) {
        return 1;
      }
      ;
      if (v instanceof February) {
        return 2;
      }
      ;
      if (v instanceof March) {
        return 3;
      }
      ;
      if (v instanceof April) {
        return 4;
      }
      ;
      if (v instanceof May) {
        return 5;
      }
      ;
      if (v instanceof June) {
        return 6;
      }
      ;
      if (v instanceof July) {
        return 7;
      }
      ;
      if (v instanceof August) {
        return 8;
      }
      ;
      if (v instanceof September) {
        return 9;
      }
      ;
      if (v instanceof October) {
        return 10;
      }
      ;
      if (v instanceof November) {
        return 11;
      }
      ;
      if (v instanceof December) {
        return 12;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 87, column 14 - line 99, column 19): " + [v.constructor.name]);
    },
    Bounded0: function() {
      return boundedMonth;
    },
    Enum1: function() {
      return $lazy_enumMonth(0);
    }
  };
  var $lazy_enumMonth = /* @__PURE__ */ $runtime_lazy11("enumMonth", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $67 = toEnum(boundedEnumMonth);
        var $68 = fromEnum(boundedEnumMonth);
        return function($69) {
          return $67(function(v) {
            return v + 1 | 0;
          }($68($69)));
        };
      }(),
      pred: function() {
        var $70 = toEnum(boundedEnumMonth);
        var $71 = fromEnum(boundedEnumMonth);
        return function($72) {
          return $70(function(v) {
            return v - 1 | 0;
          }($71($72)));
        };
      }(),
      Ord0: function() {
        return ordMonth;
      }
    };
  });
  var boundedDay = {
    bottom: 1,
    top: 31,
    Ord0: function() {
      return ordDay;
    }
  };
  var boundedEnumDay = {
    cardinality: 31,
    toEnum: function(n) {
      if (n >= 1 && n <= 31) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Date.Component (line 133, column 1 - line 138, column 23): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedDay;
    },
    Enum1: function() {
      return $lazy_enumDay(0);
    }
  };
  var $lazy_enumDay = /* @__PURE__ */ $runtime_lazy11("enumDay", "Data.Date.Component", function() {
    return {
      succ: function() {
        var $73 = toEnum(boundedEnumDay);
        var $74 = fromEnum(boundedEnumDay);
        return function($75) {
          return $73(function(v) {
            return v + 1 | 0;
          }($74($75)));
        };
      }(),
      pred: function() {
        var $76 = toEnum(boundedEnumDay);
        var $77 = fromEnum(boundedEnumDay);
        return function($78) {
          return $76(function(v) {
            return v - 1 | 0;
          }($77($78)));
        };
      }(),
      Ord0: function() {
        return ordDay;
      }
    };
  });

  // output/Data.Date/index.js
  var fromEnum3 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
  var fromJust6 = /* @__PURE__ */ fromJust();
  var toEnum2 = /* @__PURE__ */ toEnum(boundedEnumWeekday);
  var toEnum22 = /* @__PURE__ */ toEnum(boundedEnumMonth);
  var $$Date = /* @__PURE__ */ function() {
    function $$Date2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    $$Date2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new $$Date2(value0, value1, value22);
        };
      };
    };
    return $$Date2;
  }();
  var year = function(v) {
    return v.value0;
  };
  var weekday = function(v) {
    var n = calcWeekday(v.value0, fromEnum3(v.value1), v.value2);
    var $86 = n === 0;
    if ($86) {
      return fromJust6(toEnum2(7));
    }
    ;
    return fromJust6(toEnum2(n));
  };
  var month = function(v) {
    return v.value1;
  };
  var day = function(v) {
    return v.value2;
  };
  var canonicalDate = function(y) {
    return function(m) {
      return function(d) {
        var mkDate = function(y$prime) {
          return function(m$prime) {
            return function(d$prime) {
              return new $$Date(y$prime, fromJust6(toEnum22(m$prime)), d$prime);
            };
          };
        };
        return canonicalDateImpl(mkDate, y, fromEnum3(m), d);
      };
    };
  };

  // output/Data.Time.Component/index.js
  var $runtime_lazy12 = function(name17, moduleName, init4) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init4();
      state3 = 2;
      return val;
    };
  };
  var ordSecond = ordInt;
  var ordMinute = ordInt;
  var ordMillisecond = ordInt;
  var ordHour = ordInt;
  var boundedSecond = {
    bottom: 0,
    top: 59,
    Ord0: function() {
      return ordSecond;
    }
  };
  var boundedMinute = {
    bottom: 0,
    top: 59,
    Ord0: function() {
      return ordMinute;
    }
  };
  var boundedMillisecond = {
    bottom: 0,
    top: 999,
    Ord0: function() {
      return ordMillisecond;
    }
  };
  var boundedHour = {
    bottom: 0,
    top: 23,
    Ord0: function() {
      return ordHour;
    }
  };
  var boundedEnumSecond = {
    cardinality: 60,
    toEnum: function(n) {
      if (n >= 0 && n <= 59) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 90, column 1 - line 95, column 26): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedSecond;
    },
    Enum1: function() {
      return $lazy_enumSecond(0);
    }
  };
  var $lazy_enumSecond = /* @__PURE__ */ $runtime_lazy12("enumSecond", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $36 = toEnum(boundedEnumSecond);
        var $37 = fromEnum(boundedEnumSecond);
        return function($38) {
          return $36(function(v) {
            return v + 1 | 0;
          }($37($38)));
        };
      }(),
      pred: function() {
        var $39 = toEnum(boundedEnumSecond);
        var $40 = fromEnum(boundedEnumSecond);
        return function($41) {
          return $39(function(v) {
            return v - 1 | 0;
          }($40($41)));
        };
      }(),
      Ord0: function() {
        return ordSecond;
      }
    };
  });
  var boundedEnumMinute = {
    cardinality: 60,
    toEnum: function(n) {
      if (n >= 0 && n <= 59) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 61, column 1 - line 66, column 26): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedMinute;
    },
    Enum1: function() {
      return $lazy_enumMinute(0);
    }
  };
  var $lazy_enumMinute = /* @__PURE__ */ $runtime_lazy12("enumMinute", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $42 = toEnum(boundedEnumMinute);
        var $43 = fromEnum(boundedEnumMinute);
        return function($44) {
          return $42(function(v) {
            return v + 1 | 0;
          }($43($44)));
        };
      }(),
      pred: function() {
        var $45 = toEnum(boundedEnumMinute);
        var $46 = fromEnum(boundedEnumMinute);
        return function($47) {
          return $45(function(v) {
            return v - 1 | 0;
          }($46($47)));
        };
      }(),
      Ord0: function() {
        return ordMinute;
      }
    };
  });
  var boundedEnumMillisecond = {
    cardinality: 1e3,
    toEnum: function(n) {
      if (n >= 0 && n <= 999) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 120, column 1 - line 125, column 31): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedMillisecond;
    },
    Enum1: function() {
      return $lazy_enumMillisecond(0);
    }
  };
  var $lazy_enumMillisecond = /* @__PURE__ */ $runtime_lazy12("enumMillisecond", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $48 = toEnum(boundedEnumMillisecond);
        var $49 = fromEnum(boundedEnumMillisecond);
        return function($50) {
          return $48(function(v) {
            return v + 1 | 0;
          }($49($50)));
        };
      }(),
      pred: function() {
        var $51 = toEnum(boundedEnumMillisecond);
        var $52 = fromEnum(boundedEnumMillisecond);
        return function($53) {
          return $51(function(v) {
            return v - 1 | 0;
          }($52($53)));
        };
      }(),
      Ord0: function() {
        return ordMillisecond;
      }
    };
  });
  var boundedEnumHour = {
    cardinality: 24,
    toEnum: function(n) {
      if (n >= 0 && n <= 23) {
        return new Just(n);
      }
      ;
      if (otherwise) {
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Data.Time.Component (line 32, column 1 - line 37, column 24): " + [n.constructor.name]);
    },
    fromEnum: function(v) {
      return v;
    },
    Bounded0: function() {
      return boundedHour;
    },
    Enum1: function() {
      return $lazy_enumHour(0);
    }
  };
  var $lazy_enumHour = /* @__PURE__ */ $runtime_lazy12("enumHour", "Data.Time.Component", function() {
    return {
      succ: function() {
        var $54 = toEnum(boundedEnumHour);
        var $55 = fromEnum(boundedEnumHour);
        return function($56) {
          return $54(function(v) {
            return v + 1 | 0;
          }($55($56)));
        };
      }(),
      pred: function() {
        var $57 = toEnum(boundedEnumHour);
        var $58 = fromEnum(boundedEnumHour);
        return function($59) {
          return $57(function(v) {
            return v - 1 | 0;
          }($58($59)));
        };
      }(),
      Ord0: function() {
        return ordHour;
      }
    };
  });

  // output/Data.Time/index.js
  var Time = /* @__PURE__ */ function() {
    function Time2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Time2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Time2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Time2;
  }();
  var second = function(v) {
    return v.value2;
  };
  var minute = function(v) {
    return v.value1;
  };
  var millisecond = function(v) {
    return v.value3;
  };
  var hour = function(v) {
    return v.value0;
  };

  // output/Data.DateTime/index.js
  var DateTime = /* @__PURE__ */ function() {
    function DateTime2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    DateTime2.create = function(value0) {
      return function(value1) {
        return new DateTime2(value0, value1);
      };
    };
    return DateTime2;
  }();
  var time3 = function(v) {
    return v.value1;
  };
  var date = function(v) {
    return v.value0;
  };

  // output/Data.DateTime.Instant/foreign.js
  var createDateTime = function(y, m, d, h, mi, s, ms) {
    var dateTime3 = new Date(Date.UTC(y, m, d, h, mi, s, ms));
    if (y >= 0 && y < 100) {
      dateTime3.setUTCFullYear(y);
    }
    return dateTime3;
  };
  function fromDateTimeImpl(y, mo, d, h, mi, s, ms) {
    return createDateTime(y, mo - 1, d, h, mi, s, ms).getTime();
  }
  function toDateTimeImpl(ctor) {
    return function(instant2) {
      var dt2 = new Date(instant2);
      return ctor(dt2.getUTCFullYear())(dt2.getUTCMonth() + 1)(dt2.getUTCDate())(dt2.getUTCHours())(dt2.getUTCMinutes())(dt2.getUTCSeconds())(dt2.getUTCMilliseconds());
    };
  }

  // output/Data.DateTime.Instant/index.js
  var fromJust7 = /* @__PURE__ */ fromJust();
  var toEnum3 = /* @__PURE__ */ toEnum(boundedEnumMonth);
  var fromEnum4 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
  var unInstant = function(v) {
    return v;
  };
  var toDateTime = /* @__PURE__ */ function() {
    var mkDateTime = function(y) {
      return function(mo) {
        return function(d) {
          return function(h) {
            return function(mi) {
              return function(s) {
                return function(ms) {
                  return new DateTime(canonicalDate(y)(fromJust7(toEnum3(mo)))(d), new Time(h, mi, s, ms));
                };
              };
            };
          };
        };
      };
    };
    return toDateTimeImpl(mkDateTime);
  }();
  var fromDateTime = function(v) {
    return fromDateTimeImpl(year(v.value0), fromEnum4(month(v.value0)), day(v.value0), hour(v.value1), minute(v.value1), second(v.value1), millisecond(v.value1));
  };

  // output/Effect.Now/index.js
  var map33 = /* @__PURE__ */ map(functorEffect);
  var nowTime = /* @__PURE__ */ map33(function($2) {
    return time3(toDateTime($2));
  })(now2);
  var nowDateTime = /* @__PURE__ */ map33(toDateTime)(now2);
  var nowDate = /* @__PURE__ */ map33(function($3) {
    return date(toDateTime($3));
  })(now2);

  // output/Yare.Config/index.js
  var Dev = /* @__PURE__ */ function() {
    function Dev2() {
    }
    ;
    Dev2.value = new Dev2();
    return Dev2;
  }();
  var Prod = /* @__PURE__ */ function() {
    function Prod2() {
    }
    ;
    Prod2.value = new Prod2();
    return Prod2;
  }();

  // output/Parsing/index.js
  var unwrap4 = /* @__PURE__ */ unwrap();
  var ParseState = /* @__PURE__ */ function() {
    function ParseState2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    ParseState2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new ParseState2(value0, value1, value22);
        };
      };
    };
    return ParseState2;
  }();
  var ParseError = /* @__PURE__ */ function() {
    function ParseError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ParseError2.create = function(value0) {
      return function(value1) {
        return new ParseError2(value0, value1);
      };
    };
    return ParseError2;
  }();
  var More = /* @__PURE__ */ function() {
    function More2(value0) {
      this.value0 = value0;
    }
    ;
    More2.create = function(value0) {
      return new More2(value0);
    };
    return More2;
  }();
  var Lift3 = /* @__PURE__ */ function() {
    function Lift5(value0) {
      this.value0 = value0;
    }
    ;
    Lift5.create = function(value0) {
      return new Lift5(value0);
    };
    return Lift5;
  }();
  var Stop = /* @__PURE__ */ function() {
    function Stop2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Stop2.create = function(value0) {
      return function(value1) {
        return new Stop2(value0, value1);
      };
    };
    return Stop2;
  }();
  var lazyParserT = {
    defer: function(f) {
      var m = defer3(f);
      return function(state1, more, lift1, $$throw2, done) {
        var v = force(m);
        return v(state1, more, lift1, $$throw2, done);
      };
    }
  };
  var functorParserT = {
    map: function(f) {
      return function(v) {
        return function(state1, more, lift1, $$throw2, done) {
          return more(function(v1) {
            return v(state1, more, lift1, $$throw2, function(state22, a2) {
              return more(function(v2) {
                return done(state22, f(a2));
              });
            });
          });
        };
      };
    }
  };
  var applyParserT = {
    apply: function(v) {
      return function(v1) {
        return function(state1, more, lift1, $$throw2, done) {
          return more(function(v2) {
            return v(state1, more, lift1, $$throw2, function(state22, f) {
              return more(function(v3) {
                return v1(state22, more, lift1, $$throw2, function(state3, a2) {
                  return more(function(v4) {
                    return done(state3, f(a2));
                  });
                });
              });
            });
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var bindParserT = {
    bind: function(v) {
      return function(next) {
        return function(state1, more, lift1, $$throw2, done) {
          return more(function(v1) {
            return v(state1, more, lift1, $$throw2, function(state22, a2) {
              return more(function(v2) {
                var v3 = next(a2);
                return v3(state22, more, lift1, $$throw2, done);
              });
            });
          });
        };
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var bindFlipped9 = /* @__PURE__ */ bindFlipped(bindParserT);
  var applicativeParserT = {
    pure: function(a2) {
      return function(state1, v, v1, v2, done) {
        return done(state1, a2);
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var monadParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Bind1: function() {
      return bindParserT;
    }
  };
  var monadThrowParseErrorParse = {
    throwError: function(err) {
      return function(state1, v, v1, $$throw2, v2) {
        return $$throw2(state1, err);
      };
    },
    Monad0: function() {
      return monadParserT;
    }
  };
  var throwError3 = /* @__PURE__ */ throwError(monadThrowParseErrorParse);
  var altParserT = {
    alt: function(v) {
      return function(v1) {
        return function(v2, more, lift1, $$throw2, done) {
          return more(function(v3) {
            return v(new ParseState(v2.value0, v2.value1, false), more, lift1, function(v4, err) {
              return more(function(v5) {
                if (v4.value2) {
                  return $$throw2(v4, err);
                }
                ;
                return v1(v2, more, lift1, $$throw2, done);
              });
            }, done);
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var stateParserT = function(k) {
    return function(state1, v, v1, v2, done) {
      var v3 = k(state1);
      return done(v3.value1, v3.value0);
    };
  };
  var runParserT$prime = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map45 = map(Monad0.Bind1().Apply0().Functor0());
    var pure110 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(state1) {
      return function(v) {
        var go2 = function($copy_step) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(step4) {
            var v1 = step4(unit);
            if (v1 instanceof More) {
              $copy_step = v1.value0;
              return;
            }
            ;
            if (v1 instanceof Lift3) {
              $tco_done = true;
              return map45(Loop.create)(v1.value0);
            }
            ;
            if (v1 instanceof Stop) {
              $tco_done = true;
              return pure110(new Done(new Tuple(v1.value1, v1.value0)));
            }
            ;
            throw new Error("Failed pattern match at Parsing (line 152, column 13 - line 158, column 32): " + [v1.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_step);
          }
          ;
          return $tco_result;
        };
        return tailRecM4(go2)(function(v1) {
          return v(state1, More.create, Lift3.create, function(state22, err) {
            return new Stop(state22, new Left(err));
          }, function(state22, res) {
            return new Stop(state22, new Right(res));
          });
        });
      };
    };
  };
  var position2 = /* @__PURE__ */ stateParserT(function(v) {
    return new Tuple(v.value1, v);
  });
  var parseErrorPosition = function(v) {
    return v.value1;
  };
  var parseErrorMessage = function(v) {
    return v.value0;
  };
  var initialPos = {
    index: 0,
    line: 1,
    column: 1
  };
  var runParserT = function(dictMonadRec) {
    var map45 = map(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
    var runParserT$prime1 = runParserT$prime(dictMonadRec);
    return function(s) {
      return function(p2) {
        var initialState2 = new ParseState(s, initialPos, false);
        return map45(fst)(runParserT$prime1(initialState2)(p2));
      };
    };
  };
  var runParserT1 = /* @__PURE__ */ runParserT(monadRecIdentity);
  var runParser = function(s) {
    var $281 = runParserT1(s);
    return function($282) {
      return unwrap4($281($282));
    };
  };
  var failWithPosition = function(message3) {
    return function(pos) {
      return throwError3(new ParseError(message3, pos));
    };
  };
  var fail2 = function(message3) {
    return bindFlipped9(failWithPosition(message3))(position2);
  };
  var plusParserT = {
    empty: /* @__PURE__ */ fail2("No alternative"),
    Alt0: function() {
      return altParserT;
    }
  };
  var alternativeParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Plus1: function() {
      return plusParserT;
    }
  };

  // output/Parsing.Combinators/index.js
  var alt5 = /* @__PURE__ */ alt(altParserT);
  var defer4 = /* @__PURE__ */ defer(lazyParserT);
  var empty7 = /* @__PURE__ */ empty(plusParserT);
  var withLazyErrorMessage = function(p2) {
    return function(msg) {
      return alt5(p2)(defer4(function(v) {
        return fail2("Expected " + msg(unit));
      }));
    };
  };
  var $$try3 = function(v) {
    return function(v1, more, lift11, $$throw2, done) {
      return v(v1, more, lift11, function(v2, err) {
        return $$throw2(new ParseState(v2.value0, v2.value1, v1.value2), err);
      }, done);
    };
  };
  var choice = function(dictFoldable) {
    var go2 = function(p1) {
      return function(v) {
        if (v instanceof Nothing) {
          return new Just(p1);
        }
        ;
        if (v instanceof Just) {
          return new Just(alt5(p1)(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Parsing.Combinators (line 358, column 11 - line 360, column 32): " + [v.constructor.name]);
      };
    };
    var $95 = fromMaybe(empty7);
    var $96 = foldr(dictFoldable)(go2)(Nothing.value);
    return function($97) {
      return $95($96($97));
    };
  };

  // output/Parsing.String/index.js
  var fromEnum5 = /* @__PURE__ */ fromEnum(boundedEnumCodePoint);
  var mod3 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromJust8 = /* @__PURE__ */ fromJust();
  var toEnum4 = /* @__PURE__ */ toEnum(boundedEnumChar);
  var show12 = /* @__PURE__ */ show(showString);
  var updatePosSingle = function(v) {
    return function(cp) {
      return function(after) {
        var v1 = fromEnum5(cp);
        if (v1 === 10) {
          return {
            index: v.index + 1 | 0,
            line: v.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 13) {
          var v2 = codePointAt(0)(after);
          if (v2 instanceof Just && fromEnum5(v2.value0) === 10) {
            return {
              index: v.index + 1 | 0,
              line: v.line,
              column: v.column
            };
          }
          ;
          return {
            index: v.index + 1 | 0,
            line: v.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 9) {
          return {
            index: v.index + 1 | 0,
            line: v.line,
            column: (v.column + 8 | 0) - mod3(v.column - 1 | 0)(8) | 0
          };
        }
        ;
        return {
          index: v.index + 1 | 0,
          line: v.line,
          column: v.column + 1 | 0
        };
      };
    };
  };
  var updatePosString = function($copy_pos) {
    return function($copy_before) {
      return function($copy_after) {
        var $tco_var_pos = $copy_pos;
        var $tco_var_before = $copy_before;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(pos, before, after) {
          var v = uncons5(before);
          if (v instanceof Nothing) {
            $tco_done = true;
            return pos;
          }
          ;
          if (v instanceof Just) {
            var newPos = function() {
              if ($$null(v.value0.tail)) {
                return updatePosSingle(pos)(v.value0.head)(after);
              }
              ;
              if (otherwise) {
                return updatePosSingle(pos)(v.value0.head)(v.value0.tail);
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 165, column 7 - line 167, column 52): " + []);
            }();
            $tco_var_pos = newPos;
            $tco_var_before = v.value0.tail;
            $copy_after = after;
            return;
          }
          ;
          throw new Error("Failed pattern match at Parsing.String (line 161, column 36 - line 168, column 38): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_pos, $tco_var_before, $copy_after);
        }
        ;
        return $tco_result;
      };
    };
  };
  var satisfy = function(f) {
    return mkFn5(function(v) {
      return function(v1) {
        return function(v2) {
          return function($$throw2) {
            return function(done) {
              var v3 = uncons5(v.value0);
              if (v3 instanceof Nothing) {
                return $$throw2(v, new ParseError("Unexpected EOF", v.value1));
              }
              ;
              if (v3 instanceof Just) {
                var cp = fromEnum5(v3.value0.head);
                var $85 = cp < 0 || cp > 65535;
                if ($85) {
                  return $$throw2(v, new ParseError("Expected Char", v.value1));
                }
                ;
                var ch = fromJust8(toEnum4(cp));
                var $86 = f(ch);
                if ($86) {
                  return done(new ParseState(v3.value0.tail, updatePosSingle(v.value1)(v3.value0.head)(v3.value0.tail), true), ch);
                }
                ;
                return $$throw2(v, new ParseError("Predicate unsatisfied", v.value1));
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 114, column 7 - line 129, column 75): " + [v3.constructor.name]);
            };
          };
        };
      };
    });
  };
  var eof = /* @__PURE__ */ mkFn5(function(v) {
    return function(v1) {
      return function(v2) {
        return function($$throw2) {
          return function(done) {
            var $133 = $$null(v.value0);
            if ($133) {
              return done(new ParseState(v.value0, v.value1, true), unit);
            }
            ;
            return $$throw2(v, new ParseError("Expected EOF", v.value1));
          };
        };
      };
    };
  });
  var consumeWith = function(f) {
    return mkFn5(function(v) {
      return function(v1) {
        return function(v2) {
          return function($$throw2) {
            return function(done) {
              var v3 = f(v.value0);
              if (v3 instanceof Left) {
                return $$throw2(v, new ParseError(v3.value0, v.value1));
              }
              ;
              if (v3 instanceof Right) {
                return done(new ParseState(v3.value0.remainder, updatePosString(v.value1)(v3.value0.consumed)(v3.value0.remainder), !$$null(v3.value0.consumed)), v3.value0.value);
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 286, column 7 - line 290, column 121): " + [v3.constructor.name]);
            };
          };
        };
      };
    });
  };
  var string = function(str) {
    return consumeWith(function(input3) {
      var v = stripPrefix(str)(input3);
      if (v instanceof Just) {
        return new Right({
          value: str,
          consumed: str,
          remainder: v.value0
        });
      }
      ;
      return new Left("Expected " + show12(str));
    });
  };

  // output/Data.Formatter.Parser.Utils/index.js
  var show3 = /* @__PURE__ */ show(showInt);
  var lmap3 = /* @__PURE__ */ lmap(bifunctorEither);
  var applyFirst3 = /* @__PURE__ */ applyFirst(applyParserT);
  var voidLeft4 = /* @__PURE__ */ voidLeft(functorParserT);
  var printPosition = function(v) {
    return "(line " + (show3(v.line) + (", col " + (show3(v.column) + ")")));
  };
  var printError = function(err) {
    return parseErrorMessage(err) + (" " + printPosition(parseErrorPosition(err)));
  };
  var runP = function(p2) {
    return function(s) {
      return lmap3(printError)(runParser(s)(applyFirst3(p2)(eof)));
    };
  };
  var oneOfAs = function(dictFunctor) {
    var map45 = map(dictFunctor);
    return function(dictFoldable) {
      var choice2 = choice(dictFoldable);
      return function(dictMonad) {
        return function(p2) {
          return function(xs) {
            return choice2(map45(function(v) {
              return voidLeft4(p2(v.value0))(v.value1);
            })(xs));
          };
        };
      };
    };
  };

  // output/Data.Char/index.js
  var toCharCode2 = /* @__PURE__ */ fromEnum(boundedEnumChar);

  // output/Data.CodePoint.Unicode/index.js
  var fromEnum6 = /* @__PURE__ */ fromEnum(boundedEnumCodePoint);
  var isDecDigit = function(c) {
    var diff = fromEnum6(c) - toCharCode2("0") | 0;
    return diff <= 9 && diff >= 0;
  };
  var isHexDigit = function(c) {
    return isDecDigit(c) || (function() {
      var diff = fromEnum6(c) - toCharCode2("A") | 0;
      return diff <= 5 && diff >= 0;
    }() || function() {
      var diff = fromEnum6(c) - toCharCode2("a") | 0;
      return diff <= 5 && diff >= 0;
    }());
  };

  // output/Parsing.String.Basic/index.js
  var show13 = /* @__PURE__ */ show(/* @__PURE__ */ showArray(showChar));
  var notElem1 = /* @__PURE__ */ notElem2(eqChar);
  var noneOf = function(ss) {
    return withLazyErrorMessage(satisfy(flip(notElem1)(ss)))(function(v) {
      return "none of " + show13(ss);
    });
  };

  // output/Data.Formatter.DateTime/index.js
  var show4 = /* @__PURE__ */ show(showInt);
  var foldMap2 = /* @__PURE__ */ foldMap(foldableList);
  var foldMap12 = /* @__PURE__ */ foldMap2(monoidString);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorParserT);
  var oneOfAs2 = /* @__PURE__ */ oneOfAs(functorArray)(foldableArray);
  var map34 = /* @__PURE__ */ map(functorParserT);
  var abs3 = /* @__PURE__ */ abs(ordInt)(ringInt);
  var some3 = /* @__PURE__ */ some2(alternativeParserT)(lazyParserT);
  var fromEnum7 = /* @__PURE__ */ fromEnum(boundedEnumYear);
  var show14 = /* @__PURE__ */ show(showMonth);
  var fromEnum1 = /* @__PURE__ */ fromEnum(boundedEnumMonth);
  var fromEnum22 = /* @__PURE__ */ fromEnum(boundedEnumDay);
  var unwrap5 = /* @__PURE__ */ unwrap();
  var fromEnum32 = /* @__PURE__ */ fromEnum(boundedEnumWeekday);
  var show22 = /* @__PURE__ */ show(showWeekday);
  var fromEnum42 = /* @__PURE__ */ fromEnum(boundedEnumHour);
  var mod4 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromEnum52 = /* @__PURE__ */ fromEnum(boundedEnumMinute);
  var fromEnum62 = /* @__PURE__ */ fromEnum(boundedEnumSecond);
  var fromEnum72 = /* @__PURE__ */ fromEnum(boundedEnumMillisecond);
  var div1 = /* @__PURE__ */ div(euclideanRingInt);
  var mapFlipped1 = /* @__PURE__ */ mapFlipped(functorEither);
  var YearFull = /* @__PURE__ */ function() {
    function YearFull2() {
    }
    ;
    YearFull2.value = new YearFull2();
    return YearFull2;
  }();
  var YearTwoDigits = /* @__PURE__ */ function() {
    function YearTwoDigits2() {
    }
    ;
    YearTwoDigits2.value = new YearTwoDigits2();
    return YearTwoDigits2;
  }();
  var YearAbsolute = /* @__PURE__ */ function() {
    function YearAbsolute2() {
    }
    ;
    YearAbsolute2.value = new YearAbsolute2();
    return YearAbsolute2;
  }();
  var MonthFull = /* @__PURE__ */ function() {
    function MonthFull2() {
    }
    ;
    MonthFull2.value = new MonthFull2();
    return MonthFull2;
  }();
  var MonthShort = /* @__PURE__ */ function() {
    function MonthShort2() {
    }
    ;
    MonthShort2.value = new MonthShort2();
    return MonthShort2;
  }();
  var MonthTwoDigits = /* @__PURE__ */ function() {
    function MonthTwoDigits2() {
    }
    ;
    MonthTwoDigits2.value = new MonthTwoDigits2();
    return MonthTwoDigits2;
  }();
  var DayOfMonthTwoDigits = /* @__PURE__ */ function() {
    function DayOfMonthTwoDigits2() {
    }
    ;
    DayOfMonthTwoDigits2.value = new DayOfMonthTwoDigits2();
    return DayOfMonthTwoDigits2;
  }();
  var DayOfMonth = /* @__PURE__ */ function() {
    function DayOfMonth2() {
    }
    ;
    DayOfMonth2.value = new DayOfMonth2();
    return DayOfMonth2;
  }();
  var UnixTimestamp = /* @__PURE__ */ function() {
    function UnixTimestamp2() {
    }
    ;
    UnixTimestamp2.value = new UnixTimestamp2();
    return UnixTimestamp2;
  }();
  var DayOfWeek = /* @__PURE__ */ function() {
    function DayOfWeek2() {
    }
    ;
    DayOfWeek2.value = new DayOfWeek2();
    return DayOfWeek2;
  }();
  var DayOfWeekName = /* @__PURE__ */ function() {
    function DayOfWeekName2() {
    }
    ;
    DayOfWeekName2.value = new DayOfWeekName2();
    return DayOfWeekName2;
  }();
  var DayOfWeekNameShort = /* @__PURE__ */ function() {
    function DayOfWeekNameShort2() {
    }
    ;
    DayOfWeekNameShort2.value = new DayOfWeekNameShort2();
    return DayOfWeekNameShort2;
  }();
  var Hours24 = /* @__PURE__ */ function() {
    function Hours242() {
    }
    ;
    Hours242.value = new Hours242();
    return Hours242;
  }();
  var Hours12 = /* @__PURE__ */ function() {
    function Hours122() {
    }
    ;
    Hours122.value = new Hours122();
    return Hours122;
  }();
  var Meridiem = /* @__PURE__ */ function() {
    function Meridiem2() {
    }
    ;
    Meridiem2.value = new Meridiem2();
    return Meridiem2;
  }();
  var Minutes = /* @__PURE__ */ function() {
    function Minutes2() {
    }
    ;
    Minutes2.value = new Minutes2();
    return Minutes2;
  }();
  var MinutesTwoDigits = /* @__PURE__ */ function() {
    function MinutesTwoDigits2() {
    }
    ;
    MinutesTwoDigits2.value = new MinutesTwoDigits2();
    return MinutesTwoDigits2;
  }();
  var Seconds = /* @__PURE__ */ function() {
    function Seconds2() {
    }
    ;
    Seconds2.value = new Seconds2();
    return Seconds2;
  }();
  var SecondsTwoDigits = /* @__PURE__ */ function() {
    function SecondsTwoDigits2() {
    }
    ;
    SecondsTwoDigits2.value = new SecondsTwoDigits2();
    return SecondsTwoDigits2;
  }();
  var Milliseconds2 = /* @__PURE__ */ function() {
    function Milliseconds3() {
    }
    ;
    Milliseconds3.value = new Milliseconds3();
    return Milliseconds3;
  }();
  var MillisecondsShort = /* @__PURE__ */ function() {
    function MillisecondsShort2() {
    }
    ;
    MillisecondsShort2.value = new MillisecondsShort2();
    return MillisecondsShort2;
  }();
  var MillisecondsTwoDigits = /* @__PURE__ */ function() {
    function MillisecondsTwoDigits2() {
    }
    ;
    MillisecondsTwoDigits2.value = new MillisecondsTwoDigits2();
    return MillisecondsTwoDigits2;
  }();
  var Placeholder = /* @__PURE__ */ function() {
    function Placeholder2(value0) {
      this.value0 = value0;
    }
    ;
    Placeholder2.create = function(value0) {
      return new Placeholder2(value0);
    };
    return Placeholder2;
  }();
  var printShortMonth = function(v) {
    if (v instanceof January) {
      return "Jan";
    }
    ;
    if (v instanceof February) {
      return "Feb";
    }
    ;
    if (v instanceof March) {
      return "Mar";
    }
    ;
    if (v instanceof April) {
      return "Apr";
    }
    ;
    if (v instanceof May) {
      return "May";
    }
    ;
    if (v instanceof June) {
      return "Jun";
    }
    ;
    if (v instanceof July) {
      return "Jul";
    }
    ;
    if (v instanceof August) {
      return "Aug";
    }
    ;
    if (v instanceof September) {
      return "Sep";
    }
    ;
    if (v instanceof October) {
      return "Oct";
    }
    ;
    if (v instanceof November) {
      return "Nov";
    }
    ;
    if (v instanceof December) {
      return "Dec";
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 489, column 19 - line 501, column 22): " + [v.constructor.name]);
  };
  var placeholderContent = /* @__PURE__ */ mapFlipped2(/* @__PURE__ */ some(alternativeParserT)(lazyParserT)(/* @__PURE__ */ noneOf(/* @__PURE__ */ toCharArray("YMDEHhamsS"))))(fromCharArray);
  var padSingleDigit = function(i2) {
    if (i2 < 0) {
      return "-" + padSingleDigit(-i2 | 0);
    }
    ;
    if (i2 < 10) {
      return "0" + show4(i2);
    }
    ;
    if (otherwise) {
      return show4(i2);
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 194, column 1 - line 194, column 32): " + [i2.constructor.name]);
  };
  var padQuadrupleDigit = function(i2) {
    if (i2 < 0) {
      return "-" + padQuadrupleDigit(-i2 | 0);
    }
    ;
    if (i2 < 10) {
      return "000" + show4(i2);
    }
    ;
    if (i2 < 100) {
      return "00" + show4(i2);
    }
    ;
    if (i2 < 1e3) {
      return "0" + show4(i2);
    }
    ;
    if (otherwise) {
      return show4(i2);
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 207, column 1 - line 207, column 35): " + [i2.constructor.name]);
  };
  var padDoubleDigit = function(i2) {
    if (i2 < 0) {
      return "-" + padDoubleDigit(-i2 | 0);
    }
    ;
    if (i2 < 10) {
      return "00" + show4(i2);
    }
    ;
    if (i2 < 100) {
      return "0" + show4(i2);
    }
    ;
    if (otherwise) {
      return show4(i2);
    }
    ;
    throw new Error("Failed pattern match at Data.Formatter.DateTime (line 200, column 1 - line 200, column 32): " + [i2.constructor.name]);
  };
  var formatterCommandParser = /* @__PURE__ */ function() {
    return alt(altParserT)(oneOfAs2(monadIdentity)(function($664) {
      return $$try3(string($664));
    })([new Tuple("YYYY", YearFull.value), new Tuple("YY", YearTwoDigits.value), new Tuple("Y", YearAbsolute.value), new Tuple("MMMM", MonthFull.value), new Tuple("MMM", MonthShort.value), new Tuple("MM", MonthTwoDigits.value), new Tuple("DD", DayOfMonthTwoDigits.value), new Tuple("D", DayOfMonth.value), new Tuple("E", DayOfWeek.value), new Tuple("X", UnixTimestamp.value), new Tuple("dddd", DayOfWeekName.value), new Tuple("ddd", DayOfWeekNameShort.value), new Tuple("HH", Hours24.value), new Tuple("hh", Hours12.value), new Tuple("a", Meridiem.value), new Tuple("mm", MinutesTwoDigits.value), new Tuple("m", Minutes.value), new Tuple("ss", SecondsTwoDigits.value), new Tuple("s", Seconds.value), new Tuple("SSS", Milliseconds2.value), new Tuple("SS", MillisecondsTwoDigits.value), new Tuple("S", MillisecondsShort.value)]))(map34(Placeholder.create)(placeholderContent));
  }();
  var formatYearTwoDigits = function(i2) {
    var dateString = show4(abs3(i2));
    var dateLength = length7(dateString);
    if (dateLength === 1) {
      return "0" + dateString;
    }
    ;
    if (dateLength === 2) {
      return dateString;
    }
    ;
    return drop4(dateLength - 2 | 0)(dateString);
  };
  var formatParser = /* @__PURE__ */ some3(formatterCommandParser);
  var parseFormatString = /* @__PURE__ */ runP(formatParser);
  var fix12 = function(h) {
    var $618 = h === 0;
    if ($618) {
      return 12;
    }
    ;
    return h;
  };
  var formatCommand = function(v) {
    return function(v1) {
      if (v1 instanceof YearFull) {
        return padQuadrupleDigit(fromEnum7(year(v.value0)));
      }
      ;
      if (v1 instanceof YearTwoDigits) {
        return formatYearTwoDigits(fromEnum7(year(v.value0)));
      }
      ;
      if (v1 instanceof YearAbsolute) {
        return show4(fromEnum7(year(v.value0)));
      }
      ;
      if (v1 instanceof MonthFull) {
        return show14(month(v.value0));
      }
      ;
      if (v1 instanceof MonthShort) {
        return printShortMonth(month(v.value0));
      }
      ;
      if (v1 instanceof MonthTwoDigits) {
        return padSingleDigit(fromEnum1(month(v.value0)));
      }
      ;
      if (v1 instanceof DayOfMonthTwoDigits) {
        return padSingleDigit(fromEnum22(day(v.value0)));
      }
      ;
      if (v1 instanceof DayOfMonth) {
        return show4(fromEnum22(day(v.value0)));
      }
      ;
      if (v1 instanceof UnixTimestamp) {
        return show4(floor2(function(v2) {
          return v2 / 1e3;
        }(unwrap5(unInstant(fromDateTime(v))))));
      }
      ;
      if (v1 instanceof DayOfWeek) {
        return show4(fromEnum32(weekday(v.value0)));
      }
      ;
      if (v1 instanceof DayOfWeekName) {
        return show22(weekday(v.value0));
      }
      ;
      if (v1 instanceof DayOfWeekNameShort) {
        return take5(3)(show22(weekday(v.value0)));
      }
      ;
      if (v1 instanceof Hours24) {
        return padSingleDigit(fromEnum42(hour(v.value1)));
      }
      ;
      if (v1 instanceof Hours12) {
        return padSingleDigit(fix12(mod4(fromEnum42(hour(v.value1)))(12)));
      }
      ;
      if (v1 instanceof Meridiem) {
        var $621 = fromEnum42(hour(v.value1)) >= 12;
        if ($621) {
          return "PM";
        }
        ;
        return "AM";
      }
      ;
      if (v1 instanceof Minutes) {
        return show4(fromEnum52(minute(v.value1)));
      }
      ;
      if (v1 instanceof MinutesTwoDigits) {
        return padSingleDigit(fromEnum52(minute(v.value1)));
      }
      ;
      if (v1 instanceof Seconds) {
        return show4(fromEnum62(second(v.value1)));
      }
      ;
      if (v1 instanceof SecondsTwoDigits) {
        return padSingleDigit(fromEnum62(second(v.value1)));
      }
      ;
      if (v1 instanceof Milliseconds2) {
        return padDoubleDigit(fromEnum72(millisecond(v.value1)));
      }
      ;
      if (v1 instanceof MillisecondsShort) {
        return show4(function(v2) {
          return div1(v2)(100);
        }(fromEnum72(millisecond(v.value1))));
      }
      ;
      if (v1 instanceof MillisecondsTwoDigits) {
        return padSingleDigit(function(v2) {
          return div1(v2)(10);
        }(fromEnum72(millisecond(v.value1))));
      }
      ;
      if (v1 instanceof Placeholder) {
        return v1.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Formatter.DateTime (line 169, column 38 - line 192, column 21): " + [v1.constructor.name]);
    };
  };
  var format = function(f) {
    return function(d) {
      return foldMap12(formatCommand(d))(f);
    };
  };
  var formatDateTime = function(pattern2) {
    return function(datetime) {
      return mapFlipped1(parseFormatString(pattern2))(function(v) {
        return format(v)(datetime);
      });
    };
  };

  // output/Yare.Capability.Now/index.js
  var nowDateTime2 = function(dict) {
    return dict.nowDateTime;
  };

  // output/Yare.Data.Log/index.js
  var identity12 = /* @__PURE__ */ identity(categoryFn);
  var fold3 = /* @__PURE__ */ fold(foldableArray)(monoidString);
  var Debug = /* @__PURE__ */ function() {
    function Debug2() {
    }
    ;
    Debug2.value = new Debug2();
    return Debug2;
  }();
  var Info = /* @__PURE__ */ function() {
    function Info2() {
    }
    ;
    Info2.value = new Info2();
    return Info2;
  }();
  var Warn = /* @__PURE__ */ function() {
    function Warn2() {
    }
    ;
    Warn2.value = new Warn2();
    return Warn2;
  }();
  var $$Error = /* @__PURE__ */ function() {
    function $$Error2() {
    }
    ;
    $$Error2.value = new $$Error2();
    return $$Error2;
  }();
  var reason = function(v) {
    return v.reason;
  };
  var mkLog = function(dictNow) {
    var Monad0 = dictNow.Monad0();
    var bind26 = bind(Monad0.Bind1());
    var nowDateTime3 = nowDateTime2(dictNow);
    var pure24 = pure(Monad0.Applicative0());
    return function(logReason) {
      return function(inputMessage) {
        var formatTimestamp = function() {
          var $36 = either($$const("(Failed to assign time)"))(identity12);
          var $37 = formatDateTime("YYYY-DD-MM hh:mm:ss a");
          return function($38) {
            return $36($37($38));
          };
        }();
        return bind26(nowDateTime3)(function(now3) {
          var headerWith = function(start2) {
            return fold3(["[", start2, ": ", formatTimestamp(now3), "]\n", inputMessage]);
          };
          var formattedLog = headerWith(function() {
            if (logReason instanceof Debug) {
              return "DEBUG";
            }
            ;
            if (logReason instanceof Info) {
              return "INFO";
            }
            ;
            if (logReason instanceof Warn) {
              return "WARNING";
            }
            ;
            if (logReason instanceof $$Error) {
              return "ERROR";
            }
            ;
            throw new Error("Failed pattern match at Yare.Data.Log (line 46, column 31 - line 50, column 22): " + [logReason.constructor.name]);
          }());
          return pure24({
            reason: logReason,
            timestamp: now3,
            message: formattedLog
          });
        });
      };
    };
  };
  var message2 = function(v) {
    return v.message;
  };

  // output/Routing.Duplex.Generic/index.js
  var identity13 = /* @__PURE__ */ identity(categoryFn);
  var map35 = /* @__PURE__ */ map(functorRouteParser);
  var alt6 = /* @__PURE__ */ alt(altRouteParser);
  var dimap2 = /* @__PURE__ */ dimap(profunctorRouteDuplex);
  var noArgs = /* @__PURE__ */ function() {
    return pure(applicativeRouteDuplex)(NoArguments.value);
  }();
  var gRouteNoArguments = {
    gRouteDuplexCtr: identity13
  };
  var gRouteDuplexCtr = function(dict) {
    return dict.gRouteDuplexCtr;
  };
  var gRouteDuplex = function(dict) {
    return dict.gRouteDuplex;
  };
  var gRouteSum = function(dictGRouteDuplex) {
    var gRouteDuplex1 = gRouteDuplex(dictGRouteDuplex);
    return function(dictGRouteDuplex1) {
      var gRouteDuplex2 = gRouteDuplex(dictGRouteDuplex1);
      return {
        gRouteDuplex: function(end$prime) {
          return function(r) {
            var v = gRouteDuplex1(end$prime)(r);
            var v1 = gRouteDuplex2(end$prime)(r);
            var enc = function(v2) {
              if (v2 instanceof Inl) {
                return v.value0(v2.value0);
              }
              ;
              if (v2 instanceof Inr) {
                return v1.value0(v2.value0);
              }
              ;
              throw new Error("Failed pattern match at Routing.Duplex.Generic (line 51, column 11 - line 53, column 22): " + [v2.constructor.name]);
            };
            var dec = alt6(map35(Inl.create)(v.value1))(map35(Inr.create)(v1.value1));
            return new RouteDuplex(enc, dec);
          };
        }
      };
    };
  };
  var sum2 = function(dictGeneric) {
    var from4 = from(dictGeneric);
    var to2 = to(dictGeneric);
    return function(dictGRouteDuplex) {
      var $71 = dimap2(from4)(to2);
      var $72 = gRouteDuplex(dictGRouteDuplex)(end2);
      return function($73) {
        return $71($72($73));
      };
    };
  };
  var gRouteConstructor = function(dictIsSymbol) {
    var get8 = get2(dictIsSymbol)();
    return function() {
      return function(dictGRouteDuplexCtr) {
        var gRouteDuplexCtr1 = gRouteDuplexCtr(dictGRouteDuplexCtr);
        return {
          gRouteDuplex: function(end$prime) {
            return function(r) {
              var v = end$prime(gRouteDuplexCtr1(get8($$Proxy.value)(r)));
              var enc = function(v1) {
                return v.value0(v1);
              };
              var dec = map35(Constructor)(v.value1);
              return new RouteDuplex(enc, dec);
            };
          }
        };
      };
    };
  };
  var gRouteArgument = {
    gRouteDuplexCtr: identity13
  };
  var gRouteAll = {
    gRouteDuplexCtr: function(v) {
      return new RouteDuplex(function(v1) {
        return v.value0(v1);
      }, map35(Argument)(v.value1));
    }
  };

  // output/Routing.Duplex.Generic.Syntax/index.js
  var gsepStringRoute = function(dictGRouteDuplexCtr) {
    var gRouteDuplexCtr2 = gRouteDuplexCtr(dictGRouteDuplexCtr);
    return {
      gsep: function(a2) {
        var $15 = prefix2(a2);
        return function($16) {
          return $15(gRouteDuplexCtr2($16));
        };
      }
    };
  };
  var gsep = function(dict) {
    return dict.gsep;
  };

  // output/Data.Argonaut.Core/foreign.js
  function id3(x) {
    return x;
  }
  function stringify(j) {
    return JSON.stringify(j);
  }
  function _caseJson(isNull3, isBool, isNum, isStr, isArr, isObj, j) {
    if (j == null)
      return isNull3();
    else if (typeof j === "boolean")
      return isBool(j);
    else if (typeof j === "number")
      return isNum(j);
    else if (typeof j === "string")
      return isStr(j);
    else if (Object.prototype.toString.call(j) === "[object Array]")
      return isArr(j);
    else
      return isObj(j);
  }

  // output/Data.Argonaut.Core/index.js
  var verbJsonType = function(def) {
    return function(f) {
      return function(g) {
        return g(def)(f);
      };
    };
  };
  var toJsonType = /* @__PURE__ */ function() {
    return verbJsonType(Nothing.value)(Just.create);
  }();
  var jsonEmptyObject = /* @__PURE__ */ id3(empty4);
  var caseJsonString = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), f, $$const(d), $$const(d), j);
      };
    };
  };
  var toString = /* @__PURE__ */ toJsonType(caseJsonString);
  var caseJsonObject = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), $$const(d), f, j);
      };
    };
  };
  var toObject = /* @__PURE__ */ toJsonType(caseJsonObject);
  var caseJsonNumber = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), f, $$const(d), $$const(d), $$const(d), j);
      };
    };
  };
  var toNumber2 = /* @__PURE__ */ toJsonType(caseJsonNumber);
  var caseJsonArray = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), f, $$const(d), j);
      };
    };
  };
  var toArray2 = /* @__PURE__ */ toJsonType(caseJsonArray);

  // output/Yare.Data.Route/index.js
  var MintIsSymbol = {
    reflectSymbol: function() {
      return "Mint";
    }
  };
  var gsep2 = /* @__PURE__ */ gsep(/* @__PURE__ */ gsepStringRoute(gRouteNoArguments));
  var HomeIsSymbol = {
    reflectSymbol: function() {
      return "Home";
    }
  };
  var UTxOIsSymbol = {
    reflectSymbol: function() {
      return "UTxO";
    }
  };
  var TransactionsIsSymbol = {
    reflectSymbol: function() {
      return "Transactions";
    }
  };
  var NetworkIsSymbol = {
    reflectSymbol: function() {
      return "Network";
    }
  };
  var ScriptsIsSymbol = {
    reflectSymbol: function() {
      return "Scripts";
    }
  };
  var AddressesIsSymbol = {
    reflectSymbol: function() {
      return "Addresses";
    }
  };
  var NftIsSymbol = {
    reflectSymbol: function() {
      return "Nft";
    }
  };
  var Mint = /* @__PURE__ */ function() {
    function Mint2() {
    }
    ;
    Mint2.value = new Mint2();
    return Mint2;
  }();
  var Home = /* @__PURE__ */ function() {
    function Home2() {
    }
    ;
    Home2.value = new Home2();
    return Home2;
  }();
  var UTxO = /* @__PURE__ */ function() {
    function UTxO2() {
    }
    ;
    UTxO2.value = new UTxO2();
    return UTxO2;
  }();
  var Transactions = /* @__PURE__ */ function() {
    function Transactions3() {
    }
    ;
    Transactions3.value = new Transactions3();
    return Transactions3;
  }();
  var Network = /* @__PURE__ */ function() {
    function Network3() {
    }
    ;
    Network3.value = new Network3();
    return Network3;
  }();
  var Scripts = /* @__PURE__ */ function() {
    function Scripts3() {
    }
    ;
    Scripts3.value = new Scripts3();
    return Scripts3;
  }();
  var Addresses = /* @__PURE__ */ function() {
    function Addresses3() {
    }
    ;
    Addresses3.value = new Addresses3();
    return Addresses3;
  }();
  var Nft = /* @__PURE__ */ function() {
    function Nft2(value0) {
      this.value0 = value0;
    }
    ;
    Nft2.create = function(value0) {
      return new Nft2(value0);
    };
    return Nft2;
  }();
  var genericRoute = {
    to: function(x) {
      if (x instanceof Inl) {
        return Home.value;
      }
      ;
      if (x instanceof Inr && x.value0 instanceof Inl) {
        return UTxO.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && x.value0.value0 instanceof Inl)) {
        return Transactions.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && (x.value0.value0 instanceof Inr && x.value0.value0.value0 instanceof Inl))) {
        return Network.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && (x.value0.value0 instanceof Inr && (x.value0.value0.value0 instanceof Inr && x.value0.value0.value0.value0 instanceof Inl)))) {
        return Scripts.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && (x.value0.value0 instanceof Inr && (x.value0.value0.value0 instanceof Inr && (x.value0.value0.value0.value0 instanceof Inr && x.value0.value0.value0.value0.value0 instanceof Inl))))) {
        return Addresses.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && (x.value0.value0 instanceof Inr && (x.value0.value0.value0 instanceof Inr && (x.value0.value0.value0.value0 instanceof Inr && x.value0.value0.value0.value0.value0 instanceof Inr))))) {
        return new Nft(x.value0.value0.value0.value0.value0.value0);
      }
      ;
      throw new Error("Failed pattern match at Yare.Data.Route (line 23, column 1 - line 23, column 47): " + [x.constructor.name]);
    },
    from: function(x) {
      if (x instanceof Home) {
        return new Inl(NoArguments.value);
      }
      ;
      if (x instanceof UTxO) {
        return new Inr(new Inl(NoArguments.value));
      }
      ;
      if (x instanceof Transactions) {
        return new Inr(new Inr(new Inl(NoArguments.value)));
      }
      ;
      if (x instanceof Network) {
        return new Inr(new Inr(new Inr(new Inl(NoArguments.value))));
      }
      ;
      if (x instanceof Scripts) {
        return new Inr(new Inr(new Inr(new Inr(new Inl(NoArguments.value)))));
      }
      ;
      if (x instanceof Addresses) {
        return new Inr(new Inr(new Inr(new Inr(new Inr(new Inl(NoArguments.value))))));
      }
      ;
      if (x instanceof Nft) {
        return new Inr(new Inr(new Inr(new Inr(new Inr(new Inr(x.value0))))));
      }
      ;
      throw new Error("Failed pattern match at Yare.Data.Route (line 23, column 1 - line 23, column 47): " + [x.constructor.name]);
    }
  };
  var genericNftRoute = {
    to: function(x) {
      return Mint.value;
    },
    from: function(x) {
      return NoArguments.value;
    }
  };
  var nftRouteCodec = /* @__PURE__ */ sum2(genericNftRoute)(/* @__PURE__ */ gRouteConstructor(MintIsSymbol)()(gRouteNoArguments))({
    Mint: /* @__PURE__ */ gsep2("mint")(noArgs)
  });
  var routeCodec = /* @__PURE__ */ root(/* @__PURE__ */ sum2(genericRoute)(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor(HomeIsSymbol)()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor(UTxOIsSymbol)()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor(TransactionsIsSymbol)()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor(NetworkIsSymbol)()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor(ScriptsIsSymbol)()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor(AddressesIsSymbol)()(gRouteNoArguments))(/* @__PURE__ */ gRouteConstructor(NftIsSymbol)()(gRouteArgument))))))))({
    Home: noArgs,
    UTxO: /* @__PURE__ */ gsep2("utxo")(noArgs),
    Transactions: /* @__PURE__ */ gsep2("txs")(noArgs),
    Network: /* @__PURE__ */ gsep2("network")(noArgs),
    Scripts: /* @__PURE__ */ gsep2("scripts")(noArgs),
    Addresses: /* @__PURE__ */ gsep2("addresses")(noArgs),
    Nft: /* @__PURE__ */ gsep(/* @__PURE__ */ gsepStringRoute(gRouteAll))("nft")(nftRouteCodec)
  }));
  var eqNftRoute = {
    eq: function(x) {
      return function(y) {
        return true;
      };
    }
  };
  var eq3 = /* @__PURE__ */ eq(eqNftRoute);
  var eqRoute = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Home && y instanceof Home) {
          return true;
        }
        ;
        if (x instanceof UTxO && y instanceof UTxO) {
          return true;
        }
        ;
        if (x instanceof Transactions && y instanceof Transactions) {
          return true;
        }
        ;
        if (x instanceof Network && y instanceof Network) {
          return true;
        }
        ;
        if (x instanceof Scripts && y instanceof Scripts) {
          return true;
        }
        ;
        if (x instanceof Addresses && y instanceof Addresses) {
          return true;
        }
        ;
        if (x instanceof Nft && y instanceof Nft) {
          return eq3(x.value0)(y.value0);
        }
        ;
        return false;
      };
    }
  };

  // output/Yare.AppM/index.js
  var pure11 = /* @__PURE__ */ pure(applicativeEffect);
  var runAppM = function(config) {
    return function(v) {
      return runReaderT(v)(config);
    };
  };
  var monadEffectAppM = /* @__PURE__ */ monadEffectReader(monadEffectAff);
  var liftEffect7 = /* @__PURE__ */ liftEffect(monadEffectAppM);
  var monadAsk = /* @__PURE__ */ monadAskReaderT(monadAff);
  var ask2 = /* @__PURE__ */ ask(monadAsk);
  var monadAppM = /* @__PURE__ */ monadReaderT(monadAff);
  var navigateAppM = {
    navigate: /* @__PURE__ */ function() {
      var $26 = print6(routeCodec);
      return function($27) {
        return liftEffect7(setHash2($26($27)));
      };
    }(),
    Monad0: function() {
      return monadAppM;
    }
  };
  var nowAppM = {
    now: /* @__PURE__ */ liftEffect7(now2),
    nowDate: /* @__PURE__ */ liftEffect7(nowDate),
    nowTime: /* @__PURE__ */ liftEffect7(nowTime),
    nowDateTime: /* @__PURE__ */ liftEffect7(nowDateTime),
    Monad0: function() {
      return monadAppM;
    }
  };
  var monadAffAppM = /* @__PURE__ */ monadAffReader(monadAffAff);
  var bindAppM = /* @__PURE__ */ bindReaderT(bindAff);
  var bind7 = /* @__PURE__ */ bind(bindAppM);
  var logMessagesAppM = {
    logMessage: function(log5) {
      return bind7(ask2)(function(v) {
        return liftEffect7(function() {
          var v1 = reason(log5);
          if (v.logLevel instanceof Prod && v1 instanceof Debug) {
            return pure11(unit);
          }
          ;
          return log2(message2(log5));
        }());
      });
    },
    Now0: function() {
      return nowAppM;
    }
  };

  // output/Data.Codec/index.js
  var map36 = /* @__PURE__ */ map(functorTuple);
  var Codec = /* @__PURE__ */ function() {
    function Codec2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Codec2.create = function(value0) {
      return function(value1) {
        return new Codec2(value0, value1);
      };
    };
    return Codec2;
  }();
  var profunctorCodec = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return {
      dimap: function(f) {
        return function(g) {
          return function(v) {
            return new Codec(function() {
              var $91 = map115(g);
              return function($92) {
                return $91(v.value0($92));
              };
            }(), function() {
              var $93 = map36(g);
              return function($94) {
                return $93(v.value1(f($94)));
              };
            }());
          };
        };
      }
    };
  };
  var functorCodec = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return new Codec(function() {
            var $95 = map115(f);
            return function($96) {
              return $95(v.value0($96));
            };
          }(), function() {
            var $97 = map36(f);
            return function($98) {
              return $97(v.value1($98));
            };
          }());
        };
      }
    };
  };
  var applyCodec = function(dictApply) {
    var apply5 = apply(dictApply);
    var functorCodec1 = functorCodec(dictApply.Functor0());
    return function(dictSemigroup) {
      var apply12 = apply(applyTuple(dictSemigroup));
      return {
        apply: function(v) {
          return function(v1) {
            return new Codec(function(a2) {
              return apply5(v.value0(a2))(v1.value0(a2));
            }, function(c) {
              return apply12(v.value1(c))(v1.value1(c));
            });
          };
        },
        Functor0: function() {
          return functorCodec1;
        }
      };
    };
  };
  var encode = function(v) {
    return function($100) {
      return fst(v.value1($100));
    };
  };
  var decode = function(v) {
    return v.value0;
  };
  var codec$prime = function(f) {
    return function(g) {
      return new Codec(f, function(b2) {
        return new Tuple(g(b2), b2);
      });
    };
  };
  var codec = function(f) {
    return function(g) {
      return new Codec(f, function(b2) {
        return new Tuple(g(b2), b2);
      });
    };
  };

  // output/Data.Codec.Argonaut/index.js
  var show15 = /* @__PURE__ */ show(showInt);
  var bind8 = /* @__PURE__ */ bind(bindEither);
  var lmap4 = /* @__PURE__ */ lmap(bifunctorEither);
  var pure13 = /* @__PURE__ */ pure(applicativeEither);
  var pure14 = /* @__PURE__ */ pure(applicativeList);
  var bindFlipped10 = /* @__PURE__ */ bindFlipped(bindEither);
  var fromFoldable6 = /* @__PURE__ */ fromFoldable3(foldableList);
  var composeKleisliFlipped3 = /* @__PURE__ */ composeKleisliFlipped(bindMaybe);
  var fromFoldable1 = /* @__PURE__ */ fromFoldable(foldableList);
  var bimap4 = /* @__PURE__ */ bimap(bifunctorEither);
  var coerce3 = /* @__PURE__ */ coerce();
  var traverseWithIndex2 = /* @__PURE__ */ traverseWithIndex(traversableWithIndexArray)(applicativeEither);
  var map113 = /* @__PURE__ */ map(functorArray);
  var TypeMismatch3 = /* @__PURE__ */ function() {
    function TypeMismatch4(value0) {
      this.value0 = value0;
    }
    ;
    TypeMismatch4.create = function(value0) {
      return new TypeMismatch4(value0);
    };
    return TypeMismatch4;
  }();
  var UnexpectedValue2 = /* @__PURE__ */ function() {
    function UnexpectedValue3(value0) {
      this.value0 = value0;
    }
    ;
    UnexpectedValue3.create = function(value0) {
      return new UnexpectedValue3(value0);
    };
    return UnexpectedValue3;
  }();
  var AtIndex2 = /* @__PURE__ */ function() {
    function AtIndex3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AtIndex3.create = function(value0) {
      return function(value1) {
        return new AtIndex3(value0, value1);
      };
    };
    return AtIndex3;
  }();
  var AtKey2 = /* @__PURE__ */ function() {
    function AtKey3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AtKey3.create = function(value0) {
      return function(value1) {
        return new AtKey3(value0, value1);
      };
    };
    return AtKey3;
  }();
  var Named2 = /* @__PURE__ */ function() {
    function Named3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Named3.create = function(value0) {
      return function(value1) {
        return new Named3(value0, value1);
      };
    };
    return Named3;
  }();
  var MissingValue2 = /* @__PURE__ */ function() {
    function MissingValue3() {
    }
    ;
    MissingValue3.value = new MissingValue3();
    return MissingValue3;
  }();
  var recordProp = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function(p2) {
        return function(codecA) {
          return function(codecR) {
            var enc$prime = function(key2) {
              return function(val) {
                return new Cons(new Tuple(key2, encode(codecA)(unsafeGet(key2)(val))), encode(codecR)(val));
              };
            };
            var dec$prime = function(key2) {
              return function(obj) {
                return bind8(decode(codecR)(obj))(function(r) {
                  return bind8(lmap4(AtKey2.create(key2))(function() {
                    var v = lookup3(key2)(obj);
                    if (v instanceof Just) {
                      return decode(codecA)(v.value0);
                    }
                    ;
                    if (v instanceof Nothing) {
                      return new Left(MissingValue2.value);
                    }
                    ;
                    throw new Error("Failed pattern match at Data.Codec.Argonaut (line 264, column 29 - line 266, column 34): " + [v.constructor.name]);
                  }()))(function(a2) {
                    return pure13(unsafeSet(key2)(a2)(r));
                  });
                });
              };
            };
            var key = reflectSymbol2(p2);
            return codec(dec$prime(key))(enc$prime(key));
          };
        };
      };
    };
  };
  var record = /* @__PURE__ */ function() {
    return new Codec($$const(pure13({})), pure(applicativeTuple(monoidList)));
  }();
  var prop3 = function(key) {
    return function(codec2) {
      return codec(function(obj) {
        return lmap4(AtKey2.create(key))(maybe(new Left(MissingValue2.value))(decode(codec2))(lookup3(key)(obj)));
      })(function() {
        var $200 = Tuple.create(key);
        var $201 = encode(codec2);
        return function($202) {
          return pure14($200($201($202)));
        };
      }());
    };
  };
  var prismaticCodec = function(name17) {
    return function(f) {
      return function(g) {
        return function(codec2) {
          return codec$prime(function(j) {
            return bindFlipped10(function() {
              var $203 = note(new Named2(name17, new UnexpectedValue2(j)));
              return function($204) {
                return $203(f($204));
              };
            }())(decode(codec2)(j));
          })(function() {
            var $205 = encode(codec2);
            return function($206) {
              return $205(g($206));
            };
          }());
        };
      };
    };
  };
  var printJsonDecodeError = function(err) {
    var go2 = function(v) {
      if (v instanceof TypeMismatch3) {
        return "  Expected value of type '" + (v.value0 + "'.");
      }
      ;
      if (v instanceof UnexpectedValue2) {
        return "  Unexpected value " + (stringify(v.value0) + ".");
      }
      ;
      if (v instanceof AtIndex2) {
        return "  At array index " + (show15(v.value0) + (":\n" + go2(v.value1)));
      }
      ;
      if (v instanceof AtKey2) {
        return "  At object key " + (v.value0 + (":\n" + go2(v.value1)));
      }
      ;
      if (v instanceof Named2) {
        return "  Under '" + (v.value0 + ("':\n" + go2(v.value1)));
      }
      ;
      if (v instanceof MissingValue2) {
        return "  No value was found.";
      }
      ;
      throw new Error("Failed pattern match at Data.Codec.Argonaut (line 90, column 8 - line 96, column 43): " + [v.constructor.name]);
    };
    return "An error occurred while decoding a JSON value:\n" + go2(err);
  };
  var jsonPrimCodec = function(ty) {
    return function(f) {
      return codec$prime(function() {
        var $210 = maybe(new Left(new TypeMismatch3(ty)))(pure13);
        return function($211) {
          return $210(f($211));
        };
      }());
    };
  };
  var number = /* @__PURE__ */ jsonPrimCodec("Number")(toNumber2)(id3);
  var string2 = /* @__PURE__ */ jsonPrimCodec("String")(toString)(id3);
  var json = /* @__PURE__ */ codec$prime(pure13)(/* @__PURE__ */ identity(categoryFn));
  var jobject = /* @__PURE__ */ jsonPrimCodec("Object")(toObject)(id3);
  var object2 = function(name17) {
    return function(codec2) {
      return codec$prime(function(j) {
        return lmap4(Named2.create(name17))(bindFlipped10(decode(codec2))(decode(jobject)(j)));
      })(function(a2) {
        return encode(jobject)(fromFoldable6(encode(codec2)(a2)));
      });
    };
  };
  var jarray = /* @__PURE__ */ jsonPrimCodec("Array")(toArray2)(id3);
  var $$int2 = /* @__PURE__ */ jsonPrimCodec("Int")(/* @__PURE__ */ composeKleisliFlipped3(fromNumber)(toNumber2))(function($212) {
    return id3(toNumber($212));
  });
  var indexedArray = function(name17) {
    return function(codec2) {
      return codec$prime(function(j) {
        return lmap4(Named2.create(name17))(bindFlipped10(decode(codec2))(decode(jarray)(j)));
      })(function(a2) {
        return encode(jarray)(fromFoldable1(encode(codec2)(a2)));
      });
    };
  };
  var index4 = function(ix) {
    return function(codec2) {
      return codec(function(xs) {
        return lmap4(AtIndex2.create(ix))(maybe(new Left(MissingValue2.value))(decode(codec2))(index2(xs)(ix)));
      })(function() {
        var $213 = encode(codec2);
        return function($214) {
          return pure14($213($214));
        };
      }());
    };
  };
  var coercible = function() {
    return function(name17) {
      return function(codec2) {
        return codec$prime(function() {
          var $215 = bimap4(Named2.create(name17))(coerce3);
          var $216 = decode(codec2);
          return function($217) {
            return $215($216($217));
          };
        }())(coerce3(encode(codec2)));
      };
    };
  };
  var array = function(codec2) {
    return codec$prime(function(j) {
      return bindFlipped10(traverseWithIndex2(function(ix) {
        return function(j$prime) {
          return lmap4(AtIndex2.create(ix))(decode(codec2)(j$prime));
        };
      }))(decode(jarray)(j));
    })(function(a2) {
      return id3(map113(encode(codec2))(a2));
    });
  };

  // output/Cardano.Address/index.js
  var renderAddress = function(v) {
    return v;
  };
  var codecAddress = /* @__PURE__ */ coercible()("Address")(string2);

  // output/Yare.Api.Endpoint/index.js
  var gsep3 = /* @__PURE__ */ gsep(/* @__PURE__ */ gsepStringRoute(gRouteNoArguments));
  var Utxo = /* @__PURE__ */ function() {
    function Utxo2() {
    }
    ;
    Utxo2.value = new Utxo2();
    return Utxo2;
  }();
  var Transactions2 = /* @__PURE__ */ function() {
    function Transactions3() {
    }
    ;
    Transactions3.value = new Transactions3();
    return Transactions3;
  }();
  var Network2 = /* @__PURE__ */ function() {
    function Network3() {
    }
    ;
    Network3.value = new Network3();
    return Network3;
  }();
  var Scripts2 = /* @__PURE__ */ function() {
    function Scripts3() {
    }
    ;
    Scripts3.value = new Scripts3();
    return Scripts3;
  }();
  var Addresses2 = /* @__PURE__ */ function() {
    function Addresses3() {
    }
    ;
    Addresses3.value = new Addresses3();
    return Addresses3;
  }();
  var NftMint = /* @__PURE__ */ function() {
    function NftMint2() {
    }
    ;
    NftMint2.value = new NftMint2();
    return NftMint2;
  }();
  var genericEndpoint = {
    to: function(x) {
      if (x instanceof Inl) {
        return Utxo.value;
      }
      ;
      if (x instanceof Inr && x.value0 instanceof Inl) {
        return Transactions2.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && x.value0.value0 instanceof Inl)) {
        return Network2.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && (x.value0.value0 instanceof Inr && x.value0.value0.value0 instanceof Inl))) {
        return Scripts2.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && (x.value0.value0 instanceof Inr && (x.value0.value0.value0 instanceof Inr && x.value0.value0.value0.value0 instanceof Inl)))) {
        return Addresses2.value;
      }
      ;
      if (x instanceof Inr && (x.value0 instanceof Inr && (x.value0.value0 instanceof Inr && (x.value0.value0.value0 instanceof Inr && x.value0.value0.value0.value0 instanceof Inr)))) {
        return NftMint.value;
      }
      ;
      throw new Error("Failed pattern match at Yare.Api.Endpoint (line 21, column 1 - line 21, column 53): " + [x.constructor.name]);
    },
    from: function(x) {
      if (x instanceof Utxo) {
        return new Inl(NoArguments.value);
      }
      ;
      if (x instanceof Transactions2) {
        return new Inr(new Inl(NoArguments.value));
      }
      ;
      if (x instanceof Network2) {
        return new Inr(new Inr(new Inl(NoArguments.value)));
      }
      ;
      if (x instanceof Scripts2) {
        return new Inr(new Inr(new Inr(new Inl(NoArguments.value))));
      }
      ;
      if (x instanceof Addresses2) {
        return new Inr(new Inr(new Inr(new Inr(new Inl(NoArguments.value)))));
      }
      ;
      if (x instanceof NftMint) {
        return new Inr(new Inr(new Inr(new Inr(new Inr(NoArguments.value)))));
      }
      ;
      throw new Error("Failed pattern match at Yare.Api.Endpoint (line 21, column 1 - line 21, column 53): " + [x.constructor.name]);
    }
  };
  var endpointCodec = /* @__PURE__ */ root(/* @__PURE__ */ sum2(genericEndpoint)(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor({
    reflectSymbol: function() {
      return "Utxo";
    }
  })()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor({
    reflectSymbol: function() {
      return "Transactions";
    }
  })()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor({
    reflectSymbol: function() {
      return "Network";
    }
  })()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor({
    reflectSymbol: function() {
      return "Scripts";
    }
  })()(gRouteNoArguments))(/* @__PURE__ */ gRouteSum(/* @__PURE__ */ gRouteConstructor({
    reflectSymbol: function() {
      return "Addresses";
    }
  })()(gRouteNoArguments))(/* @__PURE__ */ gRouteConstructor({
    reflectSymbol: function() {
      return "NftMint";
    }
  })()(gRouteNoArguments)))))))({
    Utxo: /* @__PURE__ */ gsep3("utxo")(noArgs),
    Transactions: /* @__PURE__ */ gsep3("transactions")(noArgs),
    Network: /* @__PURE__ */ gsep3("network")(noArgs),
    Scripts: /* @__PURE__ */ gsep3("script")(noArgs),
    Addresses: /* @__PURE__ */ gsep3("addresses")(noArgs),
    NftMint: /* @__PURE__ */ gsep3("nft")(/* @__PURE__ */ gsep3("mint")(noArgs))
  }));

  // output/Data.MediaType.Common/index.js
  var applicationJSON = "application/json";
  var applicationFormURLEncoded = "application/x-www-form-urlencoded";

  // output/Affjax.RequestBody/index.js
  var ArrayView = /* @__PURE__ */ function() {
    function ArrayView2(value0) {
      this.value0 = value0;
    }
    ;
    ArrayView2.create = function(value0) {
      return new ArrayView2(value0);
    };
    return ArrayView2;
  }();
  var Blob = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var $$String = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var FormData = /* @__PURE__ */ function() {
    function FormData2(value0) {
      this.value0 = value0;
    }
    ;
    FormData2.create = function(value0) {
      return new FormData2(value0);
    };
    return FormData2;
  }();
  var FormURLEncoded = /* @__PURE__ */ function() {
    function FormURLEncoded2(value0) {
      this.value0 = value0;
    }
    ;
    FormURLEncoded2.create = function(value0) {
      return new FormURLEncoded2(value0);
    };
    return FormURLEncoded2;
  }();
  var Json = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var toMediaType = function(v) {
    if (v instanceof FormURLEncoded) {
      return new Just(applicationFormURLEncoded);
    }
    ;
    if (v instanceof Json) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var json2 = /* @__PURE__ */ function() {
    return Json.create;
  }();

  // output/Affjax.ResponseFormat/index.js
  var identity15 = /* @__PURE__ */ identity(categoryFn);
  var $$ArrayBuffer = /* @__PURE__ */ function() {
    function $$ArrayBuffer2(value0) {
      this.value0 = value0;
    }
    ;
    $$ArrayBuffer2.create = function(value0) {
      return new $$ArrayBuffer2(value0);
    };
    return $$ArrayBuffer2;
  }();
  var Blob2 = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document2 = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var Json2 = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var $$String2 = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var Ignore = /* @__PURE__ */ function() {
    function Ignore2(value0) {
      this.value0 = value0;
    }
    ;
    Ignore2.create = function(value0) {
      return new Ignore2(value0);
    };
    return Ignore2;
  }();
  var toResponseType = function(v) {
    if (v instanceof $$ArrayBuffer) {
      return "arraybuffer";
    }
    ;
    if (v instanceof Blob2) {
      return "blob";
    }
    ;
    if (v instanceof Document2) {
      return "document";
    }
    ;
    if (v instanceof Json2) {
      return "text";
    }
    ;
    if (v instanceof $$String2) {
      return "text";
    }
    ;
    if (v instanceof Ignore) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at Affjax.ResponseFormat (line 44, column 3 - line 50, column 19): " + [v.constructor.name]);
  };
  var toMediaType2 = function(v) {
    if (v instanceof Json2) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var json3 = /* @__PURE__ */ function() {
    return new Json2(identity15);
  }();

  // output/Data.HTTP.Method/index.js
  var OPTIONS = /* @__PURE__ */ function() {
    function OPTIONS2() {
    }
    ;
    OPTIONS2.value = new OPTIONS2();
    return OPTIONS2;
  }();
  var GET2 = /* @__PURE__ */ function() {
    function GET3() {
    }
    ;
    GET3.value = new GET3();
    return GET3;
  }();
  var HEAD = /* @__PURE__ */ function() {
    function HEAD2() {
    }
    ;
    HEAD2.value = new HEAD2();
    return HEAD2;
  }();
  var POST2 = /* @__PURE__ */ function() {
    function POST3() {
    }
    ;
    POST3.value = new POST3();
    return POST3;
  }();
  var PUT = /* @__PURE__ */ function() {
    function PUT2() {
    }
    ;
    PUT2.value = new PUT2();
    return PUT2;
  }();
  var DELETE = /* @__PURE__ */ function() {
    function DELETE2() {
    }
    ;
    DELETE2.value = new DELETE2();
    return DELETE2;
  }();
  var TRACE = /* @__PURE__ */ function() {
    function TRACE2() {
    }
    ;
    TRACE2.value = new TRACE2();
    return TRACE2;
  }();
  var CONNECT = /* @__PURE__ */ function() {
    function CONNECT2() {
    }
    ;
    CONNECT2.value = new CONNECT2();
    return CONNECT2;
  }();
  var PROPFIND = /* @__PURE__ */ function() {
    function PROPFIND2() {
    }
    ;
    PROPFIND2.value = new PROPFIND2();
    return PROPFIND2;
  }();
  var PROPPATCH = /* @__PURE__ */ function() {
    function PROPPATCH2() {
    }
    ;
    PROPPATCH2.value = new PROPPATCH2();
    return PROPPATCH2;
  }();
  var MKCOL = /* @__PURE__ */ function() {
    function MKCOL2() {
    }
    ;
    MKCOL2.value = new MKCOL2();
    return MKCOL2;
  }();
  var COPY = /* @__PURE__ */ function() {
    function COPY2() {
    }
    ;
    COPY2.value = new COPY2();
    return COPY2;
  }();
  var MOVE = /* @__PURE__ */ function() {
    function MOVE2() {
    }
    ;
    MOVE2.value = new MOVE2();
    return MOVE2;
  }();
  var LOCK = /* @__PURE__ */ function() {
    function LOCK2() {
    }
    ;
    LOCK2.value = new LOCK2();
    return LOCK2;
  }();
  var UNLOCK = /* @__PURE__ */ function() {
    function UNLOCK2() {
    }
    ;
    UNLOCK2.value = new UNLOCK2();
    return UNLOCK2;
  }();
  var PATCH = /* @__PURE__ */ function() {
    function PATCH2() {
    }
    ;
    PATCH2.value = new PATCH2();
    return PATCH2;
  }();
  var unCustomMethod = function(v) {
    return v;
  };
  var showMethod = {
    show: function(v) {
      if (v instanceof OPTIONS) {
        return "OPTIONS";
      }
      ;
      if (v instanceof GET2) {
        return "GET";
      }
      ;
      if (v instanceof HEAD) {
        return "HEAD";
      }
      ;
      if (v instanceof POST2) {
        return "POST";
      }
      ;
      if (v instanceof PUT) {
        return "PUT";
      }
      ;
      if (v instanceof DELETE) {
        return "DELETE";
      }
      ;
      if (v instanceof TRACE) {
        return "TRACE";
      }
      ;
      if (v instanceof CONNECT) {
        return "CONNECT";
      }
      ;
      if (v instanceof PROPFIND) {
        return "PROPFIND";
      }
      ;
      if (v instanceof PROPPATCH) {
        return "PROPPATCH";
      }
      ;
      if (v instanceof MKCOL) {
        return "MKCOL";
      }
      ;
      if (v instanceof COPY) {
        return "COPY";
      }
      ;
      if (v instanceof MOVE) {
        return "MOVE";
      }
      ;
      if (v instanceof LOCK) {
        return "LOCK";
      }
      ;
      if (v instanceof UNLOCK) {
        return "UNLOCK";
      }
      ;
      if (v instanceof PATCH) {
        return "PATCH";
      }
      ;
      throw new Error("Failed pattern match at Data.HTTP.Method (line 43, column 1 - line 59, column 23): " + [v.constructor.name]);
    }
  };
  var print7 = /* @__PURE__ */ either(/* @__PURE__ */ show(showMethod))(unCustomMethod);

  // output/Yare.Api.Request/index.js
  var map37 = /* @__PURE__ */ map(functorMaybe);
  var Get = /* @__PURE__ */ function() {
    function Get2() {
    }
    ;
    Get2.value = new Get2();
    return Get2;
  }();
  var Post = /* @__PURE__ */ function() {
    function Post2(value0) {
      this.value0 = value0;
    }
    ;
    Post2.create = function(value0) {
      return new Post2(value0);
    };
    return Post2;
  }();
  var Put = /* @__PURE__ */ function() {
    function Put2(value0) {
      this.value0 = value0;
    }
    ;
    Put2.create = function(value0) {
      return new Put2(value0);
    };
    return Put2;
  }();
  var Delete = /* @__PURE__ */ function() {
    function Delete2() {
    }
    ;
    Delete2.value = new Delete2();
    return Delete2;
  }();
  var defaultRequest = function(v) {
    return function(v1) {
      var v2 = function() {
        if (v1.method instanceof Get) {
          return new Tuple(GET2.value, Nothing.value);
        }
        ;
        if (v1.method instanceof Post) {
          return new Tuple(POST2.value, v1.method.value0);
        }
        ;
        if (v1.method instanceof Put) {
          return new Tuple(PUT.value, v1.method.value0);
        }
        ;
        if (v1.method instanceof Delete) {
          return new Tuple(DELETE.value, Nothing.value);
        }
        ;
        throw new Error("Failed pattern match at Yare.Api.Request (line 44, column 30 - line 48, column 34): " + [v1.method.constructor.name]);
      }();
      return {
        method: new Left(v2.value0),
        url: v + print6(endpointCodec)(v1.endpoint),
        headers: [],
        content: map37(json2)(v2.value1),
        username: Nothing.value,
        password: Nothing.value,
        timeout: Nothing.value,
        withCredentials: false,
        responseFormat: json3
      };
    };
  };

  // output/Affjax/foreign.js
  function _ajax(platformSpecificDriver, timeoutErrorMessageIdent, requestFailedMessageIdent, mkHeader, options2) {
    return function(errback, callback) {
      var xhr = platformSpecificDriver.newXHR();
      var fixedUrl = platformSpecificDriver.fixupUrl(options2.url, xhr);
      xhr.open(options2.method || "GET", fixedUrl, true, options2.username, options2.password);
      if (options2.headers) {
        try {
          for (var i2 = 0, header3; (header3 = options2.headers[i2]) != null; i2++) {
            xhr.setRequestHeader(header3.field, header3.value);
          }
        } catch (e) {
          errback(e);
        }
      }
      var onerror = function(msgIdent) {
        return function() {
          errback(new Error(msgIdent));
        };
      };
      xhr.onerror = onerror(requestFailedMessageIdent);
      xhr.ontimeout = onerror(timeoutErrorMessageIdent);
      xhr.onload = function() {
        callback({
          status: xhr.status,
          statusText: xhr.statusText,
          headers: xhr.getAllResponseHeaders().split("\r\n").filter(function(header4) {
            return header4.length > 0;
          }).map(function(header4) {
            var i3 = header4.indexOf(":");
            return mkHeader(header4.substring(0, i3))(header4.substring(i3 + 2));
          }),
          body: xhr.response
        });
      };
      xhr.responseType = options2.responseType;
      xhr.withCredentials = options2.withCredentials;
      xhr.timeout = options2.timeout;
      xhr.send(options2.content);
      return function(error5, cancelErrback, cancelCallback) {
        try {
          xhr.abort();
        } catch (e) {
          return cancelErrback(e);
        }
        return cancelCallback();
      };
    };
  }

  // output/Affjax.RequestHeader/index.js
  var unwrap6 = /* @__PURE__ */ unwrap();
  var Accept = /* @__PURE__ */ function() {
    function Accept2(value0) {
      this.value0 = value0;
    }
    ;
    Accept2.create = function(value0) {
      return new Accept2(value0);
    };
    return Accept2;
  }();
  var ContentType = /* @__PURE__ */ function() {
    function ContentType2(value0) {
      this.value0 = value0;
    }
    ;
    ContentType2.create = function(value0) {
      return new ContentType2(value0);
    };
    return ContentType2;
  }();
  var RequestHeader = /* @__PURE__ */ function() {
    function RequestHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RequestHeader2.create = function(value0) {
      return function(value1) {
        return new RequestHeader2(value0, value1);
      };
    };
    return RequestHeader2;
  }();
  var value13 = function(v) {
    if (v instanceof Accept) {
      return unwrap6(v.value0);
    }
    ;
    if (v instanceof ContentType) {
      return unwrap6(v.value0);
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value1;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 26, column 1 - line 26, column 33): " + [v.constructor.name]);
  };
  var name16 = function(v) {
    if (v instanceof Accept) {
      return "Accept";
    }
    ;
    if (v instanceof ContentType) {
      return "Content-Type";
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 21, column 1 - line 21, column 32): " + [v.constructor.name]);
  };

  // output/Affjax.ResponseHeader/index.js
  var ResponseHeader = /* @__PURE__ */ function() {
    function ResponseHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseHeader2.create = function(value0) {
      return function(value1) {
        return new ResponseHeader2(value0, value1);
      };
    };
    return ResponseHeader2;
  }();

  // output/Control.Monad.Except/index.js
  var unwrap7 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap7(runExceptT($3));
  };

  // output/Data.Argonaut.Parser/foreign.js
  function _jsonParser(fail4, succ2, s) {
    try {
      return succ2(JSON.parse(s));
    } catch (e) {
      return fail4(e.message);
    }
  }

  // output/Data.Argonaut.Parser/index.js
  var jsonParser = function(j) {
    return _jsonParser(Left.create, Right.create, j);
  };

  // output/Data.FormURLEncoded/index.js
  var apply4 = /* @__PURE__ */ apply(applyMaybe);
  var map38 = /* @__PURE__ */ map(functorMaybe);
  var traverse3 = /* @__PURE__ */ traverse(traversableArray)(applicativeMaybe);
  var toArray3 = function(v) {
    return v;
  };
  var encode2 = /* @__PURE__ */ function() {
    var encodePart = function(v) {
      if (v.value1 instanceof Nothing) {
        return encodeFormURLComponent(v.value0);
      }
      ;
      if (v.value1 instanceof Just) {
        return apply4(map38(function(key) {
          return function(val) {
            return key + ("=" + val);
          };
        })(encodeFormURLComponent(v.value0)))(encodeFormURLComponent(v.value1.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.FormURLEncoded (line 37, column 16 - line 39, column 114): " + [v.constructor.name]);
    };
    var $37 = map38(joinWith("&"));
    var $38 = traverse3(encodePart);
    return function($39) {
      return $37($38(toArray3($39)));
    };
  }();

  // output/Effect.Aff.Compat/index.js
  var fromEffectFnAff = function(v) {
    return makeAff(function(k) {
      return function __do2() {
        var v1 = v(function($9) {
          return k(Left.create($9))();
        }, function($10) {
          return k(Right.create($10))();
        });
        return function(e) {
          return makeAff(function(k2) {
            return function __do3() {
              v1(e, function($11) {
                return k2(Left.create($11))();
              }, function($12) {
                return k2(Right.create($12))();
              });
              return nonCanceler;
            };
          });
        };
      };
    });
  };

  // output/Affjax/index.js
  var pure15 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeExceptT(monadIdentity));
  var fail3 = /* @__PURE__ */ fail(monadIdentity);
  var unsafeReadTagged2 = /* @__PURE__ */ unsafeReadTagged(monadIdentity);
  var alt7 = /* @__PURE__ */ alt(/* @__PURE__ */ altExceptT(semigroupNonEmptyList)(monadIdentity));
  var composeKleisliFlipped4 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var map39 = /* @__PURE__ */ map(functorMaybe);
  var any3 = /* @__PURE__ */ any(foldableArray)(heytingAlgebraBoolean);
  var eq4 = /* @__PURE__ */ eq(eqString);
  var bindFlipped11 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var map114 = /* @__PURE__ */ map(functorArray);
  var mapFlipped3 = /* @__PURE__ */ mapFlipped(functorAff);
  var $$try4 = /* @__PURE__ */ $$try(monadErrorAff);
  var pure16 = /* @__PURE__ */ pure(applicativeAff);
  var RequestContentError = /* @__PURE__ */ function() {
    function RequestContentError2(value0) {
      this.value0 = value0;
    }
    ;
    RequestContentError2.create = function(value0) {
      return new RequestContentError2(value0);
    };
    return RequestContentError2;
  }();
  var ResponseBodyError = /* @__PURE__ */ function() {
    function ResponseBodyError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseBodyError2.create = function(value0) {
      return function(value1) {
        return new ResponseBodyError2(value0, value1);
      };
    };
    return ResponseBodyError2;
  }();
  var TimeoutError = /* @__PURE__ */ function() {
    function TimeoutError2() {
    }
    ;
    TimeoutError2.value = new TimeoutError2();
    return TimeoutError2;
  }();
  var RequestFailedError = /* @__PURE__ */ function() {
    function RequestFailedError2() {
    }
    ;
    RequestFailedError2.value = new RequestFailedError2();
    return RequestFailedError2;
  }();
  var XHROtherError = /* @__PURE__ */ function() {
    function XHROtherError2(value0) {
      this.value0 = value0;
    }
    ;
    XHROtherError2.create = function(value0) {
      return new XHROtherError2(value0);
    };
    return XHROtherError2;
  }();
  var request2 = function(driver2) {
    return function(req2) {
      var parseJSON = function(v2) {
        if (v2 === "") {
          return pure15(jsonEmptyObject);
        }
        ;
        return either(function($74) {
          return fail3(ForeignError.create($74));
        })(pure15)(jsonParser(v2));
      };
      var fromResponse = function() {
        if (req2.responseFormat instanceof $$ArrayBuffer) {
          return unsafeReadTagged2("ArrayBuffer");
        }
        ;
        if (req2.responseFormat instanceof Blob2) {
          return unsafeReadTagged2("Blob");
        }
        ;
        if (req2.responseFormat instanceof Document2) {
          return function(x) {
            return alt7(unsafeReadTagged2("Document")(x))(alt7(unsafeReadTagged2("XMLDocument")(x))(unsafeReadTagged2("HTMLDocument")(x)));
          };
        }
        ;
        if (req2.responseFormat instanceof Json2) {
          return composeKleisliFlipped4(function($75) {
            return req2.responseFormat.value0(parseJSON($75));
          })(unsafeReadTagged2("String"));
        }
        ;
        if (req2.responseFormat instanceof $$String2) {
          return unsafeReadTagged2("String");
        }
        ;
        if (req2.responseFormat instanceof Ignore) {
          return $$const(req2.responseFormat.value0(pure15(unit)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 274, column 18 - line 283, column 57): " + [req2.responseFormat.constructor.name]);
      }();
      var extractContent = function(v2) {
        if (v2 instanceof ArrayView) {
          return new Right(v2.value0(unsafeToForeign));
        }
        ;
        if (v2 instanceof Blob) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof Document) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof $$String) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormData) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormURLEncoded) {
          return note("Body contains values that cannot be encoded as application/x-www-form-urlencoded")(map39(unsafeToForeign)(encode2(v2.value0)));
        }
        ;
        if (v2 instanceof Json) {
          return new Right(unsafeToForeign(stringify(v2.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 235, column 20 - line 250, column 69): " + [v2.constructor.name]);
      };
      var addHeader = function(mh) {
        return function(hs) {
          if (mh instanceof Just && !any3(on(eq4)(name16)(mh.value0))(hs)) {
            return snoc(hs)(mh.value0);
          }
          ;
          return hs;
        };
      };
      var headers = function(reqContent) {
        return addHeader(map39(ContentType.create)(bindFlipped11(toMediaType)(reqContent)))(addHeader(map39(Accept.create)(toMediaType2(req2.responseFormat)))(req2.headers));
      };
      var ajaxRequest = function(v2) {
        return {
          method: print7(req2.method),
          url: req2.url,
          headers: map114(function(h) {
            return {
              field: name16(h),
              value: value13(h)
            };
          })(headers(req2.content)),
          content: v2,
          responseType: toResponseType(req2.responseFormat),
          username: toNullable(req2.username),
          password: toNullable(req2.password),
          withCredentials: req2.withCredentials,
          timeout: fromMaybe(0)(map39(function(v1) {
            return v1;
          })(req2.timeout))
        };
      };
      var send = function(content3) {
        return mapFlipped3($$try4(fromEffectFnAff(_ajax(driver2, "AffjaxTimeoutErrorMessageIdent", "AffjaxRequestFailedMessageIdent", ResponseHeader.create, ajaxRequest(content3)))))(function(v2) {
          if (v2 instanceof Right) {
            var v1 = runExcept(fromResponse(v2.value0.body));
            if (v1 instanceof Left) {
              return new Left(new ResponseBodyError(head2(v1.value0), v2.value0));
            }
            ;
            if (v1 instanceof Right) {
              return new Right({
                headers: v2.value0.headers,
                status: v2.value0.status,
                statusText: v2.value0.statusText,
                body: v1.value0
              });
            }
            ;
            throw new Error("Failed pattern match at Affjax (line 209, column 9 - line 211, column 52): " + [v1.constructor.name]);
          }
          ;
          if (v2 instanceof Left) {
            return new Left(function() {
              var message3 = message(v2.value0);
              var $61 = message3 === "AffjaxTimeoutErrorMessageIdent";
              if ($61) {
                return TimeoutError.value;
              }
              ;
              var $62 = message3 === "AffjaxRequestFailedMessageIdent";
              if ($62) {
                return RequestFailedError.value;
              }
              ;
              return new XHROtherError(v2.value0);
            }());
          }
          ;
          throw new Error("Failed pattern match at Affjax (line 207, column 144 - line 219, column 28): " + [v2.constructor.name]);
        });
      };
      if (req2.content instanceof Nothing) {
        return send(toNullable(Nothing.value));
      }
      ;
      if (req2.content instanceof Just) {
        var v = extractContent(req2.content.value0);
        if (v instanceof Right) {
          return send(toNullable(new Just(v.value0)));
        }
        ;
        if (v instanceof Left) {
          return pure16(new Left(new RequestContentError(v.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 199, column 7 - line 203, column 48): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Affjax (line 195, column 3 - line 203, column 48): " + [req2.content.constructor.name]);
    };
  };
  var printError2 = function(v) {
    if (v instanceof RequestContentError) {
      return "There was a problem with the request content: " + v.value0;
    }
    ;
    if (v instanceof ResponseBodyError) {
      return "There was a problem with the response body: " + renderForeignError(v.value0);
    }
    ;
    if (v instanceof TimeoutError) {
      return "There was a problem making the request: timeout";
    }
    ;
    if (v instanceof RequestFailedError) {
      return "There was a problem making the request: request failed";
    }
    ;
    if (v instanceof XHROtherError) {
      return "There was a problem making the request: " + message(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Affjax (line 113, column 14 - line 123, column 66): " + [v.constructor.name]);
  };

  // output/Affjax.Web/foreign.js
  var driver = {
    newXHR: function() {
      return new XMLHttpRequest();
    },
    fixupUrl: function(url) {
      return url || "/";
    }
  };

  // output/Affjax.Web/index.js
  var request3 = /* @__PURE__ */ request2(driver);

  // output/Yare.Capability.LogMessages/index.js
  var logMessage = function(dict) {
    return dict.logMessage;
  };
  var log4 = function(dictLogMessages) {
    var Now0 = dictLogMessages.Now0();
    var composeKleisliFlipped6 = composeKleisliFlipped(Now0.Monad0().Bind1());
    var logMessage1 = logMessage(dictLogMessages);
    var mkLog2 = mkLog(Now0);
    return function(reason2) {
      return composeKleisliFlipped6(logMessage1)(mkLog2(reason2));
    };
  };
  var logError = function(dictLogMessages) {
    return log4(dictLogMessages)($$Error.value);
  };

  // output/Yare.Api.Utils/index.js
  var map40 = /* @__PURE__ */ map(functorEither);
  var identity16 = /* @__PURE__ */ identity(categoryFn);
  var mkRequest2 = function(dictMonadAff) {
    var Monad0 = dictMonadAff.MonadEffect0().Monad0();
    var bind26 = bind(Monad0.Bind1());
    var liftAff2 = liftAff(dictMonadAff);
    var pure24 = pure(Monad0.Applicative0());
    return function(dictMonadAsk) {
      var ask3 = ask(dictMonadAsk);
      return function(opts) {
        return bind26(ask3)(function(v) {
          return bind26(liftAff2(request3(defaultRequest(v.baseUrl)(opts))))(function(response) {
            return pure24(map40(function(v1) {
              return v1.body;
            })(response));
          });
        });
      };
    };
  };
  var handleResponseErrors = function(dictLogMessages) {
    var Monad0 = dictLogMessages.Now0().Monad0();
    var voidLeft6 = voidLeft(Monad0.Bind1().Apply0().Functor0());
    var logError2 = logError(dictLogMessages);
    var pure24 = pure(Monad0.Applicative0());
    return function(codec2) {
      return function(k) {
        return function(v) {
          if (v instanceof Left) {
            return voidLeft6(logError2(printError2(v.value0)))(k(new Left(new Left(v.value0))));
          }
          ;
          if (v instanceof Right) {
            var v1 = decode(codec2)(v.value0);
            if (v1 instanceof Left) {
              return voidLeft6(logError2(printJsonDecodeError(v1.value0)))(k(new Left(new Right(v1.value0))));
            }
            ;
            if (v1 instanceof Right) {
              return pure24(k(new Right(v1.value0)));
            }
            ;
            throw new Error("Failed pattern match at Yare.Api.Utils (line 44, column 7 - line 46, column 53): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Yare.Api.Utils (line 40, column 3 - line 46, column 53): " + [v.constructor.name]);
        };
      };
    };
  };
  var emptyOnError = function(dictPlus) {
    return either($$const(empty(dictPlus)))(identity16);
  };

  // output/Yare.Capability.Resource.Addresses/index.js
  var lift5 = /* @__PURE__ */ lift(monadTransHalogenM);
  var getAddresses = function(dict) {
    return dict.getAddresses;
  };
  var hasAddressesHalogenM = function(dictHasAddresses) {
    return {
      getAddresses: lift5(dictHasAddresses.Monad0())(getAddresses(dictHasAddresses)),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var codecAddresses = /* @__PURE__ */ array(codecAddress);
  var hasAddressesAppM = /* @__PURE__ */ function() {
    return {
      getAddresses: bind(bindAppM)(mkRequest2(monadAffAppM)(monadAsk)({
        endpoint: Addresses2.value,
        method: Get.value
      }))(handleResponseErrors(logMessagesAppM)(codecAddresses)(emptyOnError(plusArray))),
      Monad0: function() {
        return monadAppM;
      }
    };
  }();

  // output/Data.Codec.Argonaut.Record/index.js
  var rowListCodecNil = {
    rowListCodec: function(v) {
      return function(v1) {
        return record;
      };
    }
  };
  var rowListCodec = function(dict) {
    return dict.rowListCodec;
  };
  var rowListCodecCons = function(dictRowListCodec) {
    var rowListCodec1 = rowListCodec(dictRowListCodec);
    return function() {
      return function() {
        return function(dictIsSymbol) {
          var get8 = get2(dictIsSymbol)();
          var recordProp2 = recordProp(dictIsSymbol)();
          return {
            rowListCodec: function(v) {
              return function(codecs) {
                var tail3 = rowListCodec1($$Proxy.value)(codecs);
                var codec2 = get8($$Proxy.value)(codecs);
                return recordProp2($$Proxy.value)(codec2)(tail3);
              };
            }
          };
        };
      };
    };
  };
  var record2 = function() {
    return function(dictRowListCodec) {
      return rowListCodec(dictRowListCodec)($$Proxy.value);
    };
  };
  var record1 = /* @__PURE__ */ record2();
  var object3 = function() {
    return function(dictRowListCodec) {
      var record22 = record1(dictRowListCodec);
      return function(name17) {
        return function(rec) {
          return object2(name17)(record22(rec));
        };
      };
    };
  };

  // output/Cardano.Block/index.js
  var renderBlockHash = function(v) {
    return v;
  };
  var codecBlockHash = /* @__PURE__ */ coercible()("BlockHash")(string2);
  var codecBlockRef = /* @__PURE__ */ object3()(/* @__PURE__ */ rowListCodecCons(/* @__PURE__ */ rowListCodecCons(/* @__PURE__ */ rowListCodecCons(rowListCodecNil)()()({
    reflectSymbol: function() {
      return "slotNo";
    }
  }))()()({
    reflectSymbol: function() {
      return "headerHash";
    }
  }))()()({
    reflectSymbol: function() {
      return "blockNo";
    }
  }))("BlockRef")({
    slotNo: $$int2,
    blockNo: $$int2,
    headerHash: codecBlockHash
  });

  // output/Yare.Capability.Resource.NetworkInfo/index.js
  var lift6 = /* @__PURE__ */ lift(monadTransHalogenM);
  var getNetworkInfo = function(dict) {
    return dict.getNetworkInfo;
  };
  var hasNetworkInfoHalogenM = function(dictHasNetworkInfo) {
    return {
      getNetworkInfo: lift6(dictHasNetworkInfo.Monad0())(getNetworkInfo(dictHasNetworkInfo)),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var codecNetworkInfo = /* @__PURE__ */ object3()(/* @__PURE__ */ rowListCodecCons(/* @__PURE__ */ rowListCodecCons(rowListCodecNil)()()({
    reflectSymbol: function() {
      return "networkTip";
    }
  }))()()({
    reflectSymbol: function() {
      return "lastIndexed";
    }
  }))("NetworkInfo")({
    lastIndexed: codecBlockRef,
    networkTip: codecBlockRef
  });
  var hasNetworkInfoAppM = /* @__PURE__ */ function() {
    return {
      getNetworkInfo: bind(bindAppM)(mkRequest2(monadAffAppM)(monadAsk)({
        endpoint: Network2.value,
        method: Get.value
      }))(handleResponseErrors(logMessagesAppM)(codecNetworkInfo)(hush)),
      Monad0: function() {
        return monadAppM;
      }
    };
  }();

  // output/Cardano.Transaction/index.js
  var bindFlipped12 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var show5 = /* @__PURE__ */ show(showInt);
  var coercible2 = /* @__PURE__ */ coercible();
  var splitTxIn = function(v) {
    var v1 = splitAt3(64)(v);
    return {
      txId: v1.before,
      txIx: function() {
        var v2 = bindFlipped12(fromString)(stripPrefix("#")(v1.after));
        if (v2 instanceof Nothing) {
          return -1 | 0;
        }
        ;
        if (v2 instanceof Just) {
          return v2.value0;
        }
        ;
        throw new Error("Failed pattern match at Cardano.Transaction (line 32, column 13 - line 34, column 21): " + [v2.constructor.name]);
      }()
    };
  };
  var renderTxIx = function(v) {
    return show5(v);
  };
  var renderTxId = function(v) {
    return v;
  };
  var codecTxIx = /* @__PURE__ */ coercible2("TxIx")($$int2);
  var codecTxIn = /* @__PURE__ */ coercible2("TxIn")(string2);
  var codecTxId = /* @__PURE__ */ coercible2("TxId")(string2);

  // output/Data.Codec.Argonaut.Sum/index.js
  var bindFlipped13 = /* @__PURE__ */ bindFlipped(bindEither);
  var enumSum = function(printTag) {
    return function(parseTag) {
      return codec(function(j) {
        return bindFlipped13(function() {
          var $18 = maybe(new Left(new UnexpectedValue2(j)))(Right.create);
          return function($19) {
            return $18(parseTag($19));
          };
        }())(decode(string2)(j));
      })(function() {
        var $20 = encode(string2);
        return function($21) {
          return $20(printTag($21));
        };
      }());
    };
  };

  // output/Cardano.Script/index.js
  var DeploymentInitiated = /* @__PURE__ */ function() {
    function DeploymentInitiated2() {
    }
    ;
    DeploymentInitiated2.value = new DeploymentInitiated2();
    return DeploymentInitiated2;
  }();
  var DeploymentCompleted = /* @__PURE__ */ function() {
    function DeploymentCompleted2() {
    }
    ;
    DeploymentCompleted2.value = new DeploymentCompleted2();
    return DeploymentCompleted2;
  }();
  var renderScriptStatus = function(v) {
    if (v instanceof DeploymentInitiated) {
      return "deploy-initiated";
    }
    ;
    if (v instanceof DeploymentCompleted) {
      return "deploy-completed";
    }
    ;
    throw new Error("Failed pattern match at Cardano.Script (line 26, column 1 - line 26, column 43): " + [v.constructor.name]);
  };
  var renderScriptHash = function(v) {
    return v;
  };
  var codecScriptStatus = /* @__PURE__ */ enumSum(renderScriptStatus)(function(v) {
    if (v === "deploy-initiated") {
      return new Just(DeploymentInitiated.value);
    }
    ;
    if (v === "deploy-completed") {
      return new Just(DeploymentCompleted.value);
    }
    ;
    return Nothing.value;
  });
  var codecScriptHash = /* @__PURE__ */ coercible()("ScriptHash")(string2);
  var codecScriptDeployment = /* @__PURE__ */ object3()(/* @__PURE__ */ rowListCodecCons(/* @__PURE__ */ rowListCodecCons(/* @__PURE__ */ rowListCodecCons(/* @__PURE__ */ rowListCodecCons(rowListCodecNil)()()({
    reflectSymbol: function() {
      return "scriptTxOut";
    }
  }))()()({
    reflectSymbol: function() {
      return "scriptTxId";
    }
  }))()()({
    reflectSymbol: function() {
      return "scriptStatus";
    }
  }))()()({
    reflectSymbol: function() {
      return "scriptHash";
    }
  }))("ScriptDeployment")({
    scriptHash: codecScriptHash,
    scriptStatus: codecScriptStatus,
    scriptTxId: codecTxId,
    scriptTxOut: codecTxIx
  });

  // output/Yare.Capability.Resource.Scripts/index.js
  var lift7 = /* @__PURE__ */ lift(monadTransHalogenM);
  var getScripts = function(dict) {
    return dict.getScripts;
  };
  var hasScriptsHalogenM = function(dictHasScripts) {
    return {
      getScripts: lift7(dictHasScripts.Monad0())(getScripts(dictHasScripts)),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var codecScripts = /* @__PURE__ */ array(codecScriptDeployment);
  var hasScriptsAppM = /* @__PURE__ */ function() {
    return {
      getScripts: bind(bindAppM)(mkRequest2(monadAffAppM)(monadAsk)({
        endpoint: Scripts2.value,
        method: Get.value
      }))(handleResponseErrors(logMessagesAppM)(codecScripts)(hush)),
      Monad0: function() {
        return monadAppM;
      }
    };
  }();

  // output/Yare.Capability.Resource.Transactions/index.js
  var lift8 = /* @__PURE__ */ lift(monadTransHalogenM);
  var getTransactions = function(dict) {
    return dict.getTransactions;
  };
  var hasTransactionsHalogenM = function(dictHasTransactions) {
    return {
      getTransactions: lift8(dictHasTransactions.Monad0())(getTransactions(dictHasTransactions)),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var codecTransactions = /* @__PURE__ */ object3()(/* @__PURE__ */ rowListCodecCons(/* @__PURE__ */ rowListCodecCons(rowListCodecNil)()()({
    reflectSymbol: function() {
      return "submitted";
    }
  }))()()({
    reflectSymbol: function() {
      return "inLedger";
    }
  }))("Transactions")({
    submitted: /* @__PURE__ */ array(codecTxId),
    inLedger: /* @__PURE__ */ array(codecTxId)
  });
  var hasTransactionsAppM = /* @__PURE__ */ function() {
    return {
      getTransactions: bind(bindAppM)(mkRequest2(monadAffAppM)(monadAsk)({
        endpoint: Transactions2.value,
        method: Get.value
      }))(handleResponseErrors(logMessagesAppM)(codecTransactions)(hush)),
      Monad0: function() {
        return monadAppM;
      }
    };
  }();

  // output/Cardano.Value.Token.Name/index.js
  var discard5 = /* @__PURE__ */ discard(discardUnit)(bindEither);
  var unless2 = /* @__PURE__ */ unless(applicativeEither);
  var printTokenName = function(v) {
    return v;
  };
  var parseTokenName = function(tokenName) {
    return discard5(unless2(!$$null(tokenName))(new Left("Token Name must not be empty")))(function() {
      return new Right(tokenName);
    });
  };
  var readTokenName = function($16) {
    return hush(parseTokenName($16));
  };
  var eqTokenName = {
    eq: function(x) {
      return function(y) {
        return x === y;
      };
    }
  };
  var codecTokenName = /* @__PURE__ */ prismaticCodec("TokenName")(readTokenName)(printTokenName)(string2);

  // output/Cardano.Value.Token.Policy/index.js
  var discard6 = /* @__PURE__ */ discard(discardUnit)(bindEither);
  var unless3 = /* @__PURE__ */ unless(applicativeEither);
  var printPolicy = function(v) {
    return v;
  };
  var parsePolicy = function(policyId) {
    var codePoints = toCodePointArray(policyId);
    return discard6(unless3(length3(codePoints) === 56)(new Left("Policy ID must contain 56 hexadecimal digits (0..9, A..F, a..f)")))(function() {
      return discard6(unless3(all2(isHexDigit)(codePoints))(new Left("Policy ID must contain only hex digits (0..9, A..F, a..f)")))(function() {
        return new Right(policyId);
      });
    });
  };
  var readPolicy = function($16) {
    return hush(parsePolicy($16));
  };
  var eqPolicy = {
    eq: function(x) {
      return function(y) {
        return x === y;
      };
    }
  };
  var codecPolicy = /* @__PURE__ */ prismaticCodec("Policy")(readPolicy)(printPolicy)(string2);

  // output/Data.Variant/index.js
  var onMatch = function() {
    return function() {
      return function() {
        return function(r) {
          return function(k) {
            return function(v) {
              if (unsafeHas(v.type)(r)) {
                return unsafeGet(v.type)(r)(v.value);
              }
              ;
              return k(v);
            };
          };
        };
      };
    };
  };
  var onMatch1 = /* @__PURE__ */ onMatch()()();
  var on2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(p2) {
        return function(f) {
          return function(g) {
            return function(r) {
              if (r.type === reflectSymbol2(p2)) {
                return f(r.value);
              }
              ;
              return g(r);
            };
          };
        };
      };
    };
  };
  var inj = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(p2) {
        return function(value16) {
          return {
            type: reflectSymbol2(p2),
            value: value16
          };
        };
      };
    };
  };
  var case_ = function(r) {
    return unsafeCrashWith("Data.Variant: pattern match failure [" + (r.type + "]"));
  };
  var match3 = function() {
    return function() {
      return function() {
        return function(r) {
          return onMatch1(r)(case_);
        };
      };
    };
  };

  // output/Data.Codec.Argonaut.Variant/index.js
  var on3 = /* @__PURE__ */ on2();
  var voidLeft5 = /* @__PURE__ */ voidLeft(functorTuple);
  var bind15 = /* @__PURE__ */ bind(bindEither);
  var pure17 = /* @__PURE__ */ pure(applicativeEither);
  var inj2 = /* @__PURE__ */ inj();
  var map41 = /* @__PURE__ */ map(functorEither);
  var from3 = /* @__PURE__ */ from2(refl);
  var variantCodec = function(dict) {
    return dict.variantCodec;
  };
  var variantMatch = function() {
    return function(dictVariantCodec) {
      return variantCodec(dictVariantCodec)($$Proxy.value);
    };
  };
  var variantCase = function(dictIsSymbol) {
    var on1 = on3(dictIsSymbol);
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    var inj12 = inj2(dictIsSymbol);
    return function() {
      return function(proxy) {
        return function(eacodec) {
          return function(v) {
            var enc$prime = function(v1) {
              return on1(proxy)(function(v$prime) {
                return flip(Tuple.create)(v1)(encode(jobject)(runST(function __do2() {
                  var obj = newImpl();
                  poke2("tag")(encode(string2)(reflectSymbol2(proxy)))(obj)();
                  if (eacodec instanceof Left) {
                    return obj;
                  }
                  ;
                  if (eacodec instanceof Right) {
                    return poke2("value")(encode(eacodec.value0)(v$prime))(obj)();
                  }
                  ;
                  throw new Error("Failed pattern match at Data.Codec.Argonaut.Variant (line 119, column 13 - line 121, column 68): " + [eacodec.constructor.name]);
                })));
              })(function(v$prime) {
                return voidLeft5(v.value1(v$prime))(v1);
              })(v1);
            };
            var dec$prime = function(j) {
              return bind15(decode(jobject)(j))(function(obj) {
                return bind15(decode(prop3("tag")(string2))(obj))(function(tag) {
                  var $36 = tag === reflectSymbol2(proxy);
                  if ($36) {
                    if (eacodec instanceof Left) {
                      return pure17(inj12(proxy)(eacodec.value0));
                    }
                    ;
                    if (eacodec instanceof Right) {
                      return bind15(decode(prop3("value")(json))(obj))(function(value16) {
                        return map41(inj12(proxy))(decode(eacodec.value0)(value16));
                      });
                    }
                    ;
                    throw new Error("Failed pattern match at Data.Codec.Argonaut.Variant (line 104, column 7 - line 108, column 43): " + [eacodec.constructor.name]);
                  }
                  ;
                  return map41(unsafeCoerce2)(v.value0(j));
                });
              });
            };
            return new Codec(dec$prime, enc$prime);
          };
        };
      };
    };
  };
  var variantCodecCons = function(dictVariantCodec) {
    var variantCodec1 = variantCodec(dictVariantCodec);
    return function() {
      return function() {
        return function(dictIsSymbol) {
          var get8 = get2(dictIsSymbol)();
          var variantCase1 = variantCase(dictIsSymbol)();
          return function(dictTypeEquals) {
            return {
              variantCodec: function(v) {
                return function(codecs) {
                  var tail3 = variantCodec1($$Proxy.value)(codecs);
                  var codec2 = from3(get8($$Proxy.value)(codecs));
                  return variantCase1($$Proxy.value)(codec2)(tail3);
                };
              }
            };
          };
        };
      };
    };
  };
  var variant = /* @__PURE__ */ function() {
    return new Codec(function($42) {
      return Left.create(UnexpectedValue2.create($42));
    }, case_);
  }();
  var variantCodecNil = {
    variantCodec: function(v) {
      return function(v1) {
        return variant;
      };
    }
  };

  // output/Cardano.Value.Asset/index.js
  var eq5 = /* @__PURE__ */ eq(eqTokenName);
  var eq12 = /* @__PURE__ */ eq(eqPolicy);
  var inj3 = /* @__PURE__ */ inj();
  var adaIsSymbol = {
    reflectSymbol: function() {
      return "ada";
    }
  };
  var inj1 = /* @__PURE__ */ inj3(adaIsSymbol);
  var nativeTokenIsSymbol = {
    reflectSymbol: function() {
      return "nativeToken";
    }
  };
  var inj22 = /* @__PURE__ */ inj3(nativeTokenIsSymbol);
  var Ada = /* @__PURE__ */ function() {
    function Ada2() {
    }
    ;
    Ada2.value = new Ada2();
    return Ada2;
  }();
  var NativeToken = /* @__PURE__ */ function() {
    function NativeToken2(value0) {
      this.value0 = value0;
    }
    ;
    NativeToken2.create = function(value0) {
      return new NativeToken2(value0);
    };
    return NativeToken2;
  }();
  var eqAsset = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Ada && y instanceof Ada) {
          return true;
        }
        ;
        if (x instanceof NativeToken && y instanceof NativeToken) {
          return eq5(x.value0.name)(y.value0.name) && eq12(x.value0.policy)(y.value0.policy);
        }
        ;
        return false;
      };
    }
  };
  var codecAsset = /* @__PURE__ */ function() {
    var toVariant = function(v) {
      if (v instanceof Ada) {
        return inj1($$Proxy.value)(unit);
      }
      ;
      if (v instanceof NativeToken) {
        return inj22($$Proxy.value)(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Cardano.Value.Asset (line 41, column 15 - line 43, column 59): " + [v.constructor.name]);
    };
    var fromVariant = match3()()()({
      ada: function(v) {
        return Ada.value;
      },
      nativeToken: NativeToken.create
    });
    return dimap(profunctorCodec(functorEither))(toVariant)(fromVariant)(variantMatch()(variantCodecCons(variantCodecCons(variantCodecNil)()()(nativeTokenIsSymbol)(refl))()()(adaIsSymbol)(refl))({
      ada: new Left(unit),
      nativeToken: new Right(object3()(rowListCodecCons(rowListCodecCons(rowListCodecNil)()()({
        reflectSymbol: function() {
          return "policy";
        }
      }))()()({
        reflectSymbol: function() {
          return "name";
        }
      }))("Asset")({
        policy: codecPolicy,
        name: codecTokenName
      }))
    }));
  }();

  // output/JS.BigInt/foreign.js
  var fromNumberImpl2 = (just) => (nothing) => (n) => {
    try {
      var x = BigInt(n);
      return just(x);
    } catch (err) {
      return nothing;
    }
  };
  var toNumber3 = (n) => Number(n);
  var biAdd = (x) => (y) => x + y;
  var biMul = (x) => (y) => x * y;
  var biZero = 0n;
  var biOne = 1n;
  var toString4 = (x) => x.toString();

  // output/JS.BigInt/index.js
  var showBigInt = {
    show: toString4
  };
  var semiringBigInt = {
    add: biAdd,
    zero: biZero,
    mul: biMul,
    one: biOne
  };
  var fromNumber2 = /* @__PURE__ */ function() {
    return fromNumberImpl2(Just.create)(Nothing.value);
  }();

  // output/Cardano.Value/index.js
  var zero2 = /* @__PURE__ */ zero(semiringBigInt);
  var eq6 = /* @__PURE__ */ eq(eqAsset);
  var profunctorCodec2 = /* @__PURE__ */ profunctorCodec(functorEither);
  var lcmap2 = /* @__PURE__ */ lcmap(profunctorCodec2);
  var valueLovelace = function(v) {
    return function(v1) {
      if (v1 instanceof Just) {
        return v1.value0.quantity;
      }
      ;
      if (v1 instanceof Nothing) {
        return zero2;
      }
      ;
      throw new Error("Failed pattern match at Cardano.Value (line 63, column 58 - line 65, column 19): " + [v1.constructor.name]);
    }(find2(function(v1) {
      return eq6(v1.asset)(Ada.value);
    })(v.assets));
  };
  var codecAssetQuantity = /* @__PURE__ */ function() {
    var codecBigInt = prismaticCodec("BigInt")(fromNumber2)(toNumber3)(number);
    return indexedArray("AssetQuantity")(apply(applyCodec(applyEither)(semigroupList))(map(functorCodec(functorEither))(function(asset) {
      return function(quantity) {
        return {
          asset,
          quantity
        };
      };
    })(lcmap2(function(v) {
      return v.asset;
    })(index4(0)(codecAsset))))(lcmap2(function(v) {
      return v.quantity;
    })(index4(1)(codecBigInt))));
  }();
  var codecValue = /* @__PURE__ */ dimap(profunctorCodec2)(function(v) {
    return v.assets;
  })(function(v) {
    return {
      assets: v
    };
  })(/* @__PURE__ */ array(codecAssetQuantity));

  // output/Yare.Capability.Resource.UTxO/index.js
  var lift9 = /* @__PURE__ */ lift(monadTransHalogenM);
  var getUTxO = function(dict) {
    return dict.getUTxO;
  };
  var hasUTxOHalogenM = function(dictHasUTxO) {
    return {
      getUTxO: lift9(dictHasUTxO.Monad0())(getUTxO(dictHasUTxO)),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var codecUtxo = /* @__PURE__ */ object3()(/* @__PURE__ */ rowListCodecCons(/* @__PURE__ */ rowListCodecCons(/* @__PURE__ */ rowListCodecCons(rowListCodecNil)()()({
    reflectSymbol: function() {
      return "value";
    }
  }))()()({
    reflectSymbol: function() {
      return "txIn";
    }
  }))()()({
    reflectSymbol: function() {
      return "address";
    }
  }))("UTxO")({
    address: codecAddress,
    txIn: codecTxIn,
    value: codecValue
  });
  var hasUTxOAppM = /* @__PURE__ */ function() {
    return {
      getUTxO: bind(bindAppM)(mkRequest2(monadAffAppM)(monadAsk)({
        endpoint: Utxo.value,
        method: Get.value
      }))(handleResponseErrors(logMessagesAppM)(array(codecUtxo))(hush)),
      Monad0: function() {
        return monadAppM;
      }
    };
  }();

  // output/Yare.Capability.Navigate/index.js
  var lift10 = /* @__PURE__ */ lift(monadTransHalogenM);
  var navigate = function(dict) {
    return dict.navigate;
  };
  var navigateHalogenM = function(dictNavigate) {
    return {
      navigate: function() {
        var $7 = lift10(dictNavigate.Monad0());
        var $8 = navigate(dictNavigate);
        return function($9) {
          return $7($8($9));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };

  // output/Halogen.HTML.Extended/index.js
  var safeHref = /* @__PURE__ */ function() {
    var $8 = append(semigroupString)("#");
    var $9 = print6(routeCodec);
    return function($10) {
      return href4($8($9($10)));
    };
  }();
  var noHtml = /* @__PURE__ */ text5("");
  var maybeElem = function(v) {
    return function(v1) {
      if (v instanceof Just) {
        return v1(v.value0);
      }
      ;
      return noHtml;
    };
  };
  var css = function($11) {
    return class_(ClassName($11));
  };

  // output/Component.Html.Decor/index.js
  var show6 = /* @__PURE__ */ show(showInt);
  var txIx = function(ix) {
    return span3([css("is-family-code")])([text5(renderTxIx(ix))]);
  };
  var txId = function(id4) {
    return a([href4("https://preprod.cardanoscan.io/transaction/" + renderTxId(id4)), css("is-family-code")])([text5(renderTxId(id4))]);
  };
  var slotNo = function(slot2) {
    return span3([css("is-family-code")])([text5("Slot # " + show6(slot2))]);
  };
  var scriptHash = function(hash4) {
    return span3([css("is-family-code")])([text5(renderScriptHash(hash4))]);
  };
  var index5 = function($3) {
    return text5(show6($3));
  };
  var blockNo = function(b2) {
    return span3([css("is-family-code")])([text5("Block # "), a([href4("https://preprod.cardanoscan.io/block/" + show6(b2))])([text5(show6(b2))])]);
  };
  var block = function(hash4) {
    return span3([css("is-family-code")])([text5("Block hash: " + renderBlockHash(hash4))]);
  };
  var address2 = function(addr) {
    return a([href4("https://preprod.cardanoscan.io/address/" + renderAddress(addr)), css("is-family-code")])([text5(renderAddress(addr))]);
  };

  // output/Component.Html.Layout/index.js
  var header2 = function(headerTitle) {
    return nav([css("level m-4")])([div2([css("level-left")])([h1([css("is-size-1")])([span3([css("yare px-4")])([text5("Y're")]), text5(" @ " + headerTitle)])])]);
  };
  var body2 = function(sidebarHtml) {
    return function(contentHtml) {
      return div2([css("columns")])([div2([css("column is-narrow")])([div2([css("box")])(sidebarHtml)]), div2([css("column")])(contentHtml)]);
    };
  };
  var layout = function(title5) {
    return function(sidebarHtml) {
      return function(contentHtml) {
        return div_([header2(title5), body2(sidebarHtml)(contentHtml)]);
      };
    };
  };

  // output/Component.Html.Sidebar/index.js
  var sidebar = function(_route) {
    var menuSection = function(sectionTitle) {
      return p([css("menu-label")])([text5(sectionTitle)]);
    };
    var menuList = ul([css("menu-list")]);
    var menuButton = function(ref2) {
      return function(title$prime) {
        return function(icon) {
          return li_([a([css("is-medium"), title2(title$prime), safeHref(ref2)])([span3([css("icon")])([i([css("fas fa-" + icon)])([])]), span_([text5(title$prime)])])]);
        };
      };
    };
    return [aside([css("menu")])([menuSection("General"), menuList([menuButton(Home.value)("Home")("home"), menuButton(UTxO.value)("UTxO")("wallet"), menuButton(Transactions.value)("Transactions")("list-check"), menuButton(Addresses.value)("Addresses")("address-book"), menuButton(Scripts.value)("Scripts")("scroll"), menuButton(Network.value)("Network")("globe")]), menuSection("NFT"), menuList([menuButton(new Nft(Mint.value))("Mint")("certificate")]), menuSection("Auction"), menuList([])])];
  };

  // output/Network.RemoteData/index.js
  var NotAsked = /* @__PURE__ */ function() {
    function NotAsked2() {
    }
    ;
    NotAsked2.value = new NotAsked2();
    return NotAsked2;
  }();
  var Loading2 = /* @__PURE__ */ function() {
    function Loading3() {
    }
    ;
    Loading3.value = new Loading3();
    return Loading3;
  }();
  var Failure = /* @__PURE__ */ function() {
    function Failure2(value0) {
      this.value0 = value0;
    }
    ;
    Failure2.create = function(value0) {
      return new Failure2(value0);
    };
    return Failure2;
  }();
  var Success2 = /* @__PURE__ */ function() {
    function Success3(value0) {
      this.value0 = value0;
    }
    ;
    Success3.create = function(value0) {
      return new Success3(value0);
    };
    return Success3;
  }();

  // output/Yare.Component.Addresses/index.js
  var show7 = /* @__PURE__ */ show(showInt);
  var bind9 = /* @__PURE__ */ bind(bindHalogenM);
  var put4 = /* @__PURE__ */ put(monadStateHalogenM);
  var Initialize2 = /* @__PURE__ */ function() {
    function Initialize9() {
    }
    ;
    Initialize9.value = new Initialize9();
    return Initialize9;
  }();
  var component = function(dictHasAddresses) {
    var getAddresses2 = getAddresses(hasAddressesHalogenM(dictHasAddresses));
    var renderAddresses = function(addresses) {
      return div2([css("content")])([table([css("table")])([thead_([tr_([th_([text5("#")]), th_([text5("Address")])])]), tbody_(mapWithIndex3(function(index6) {
        return function(address3) {
          return tr_([td_([text5(show7(index6))]), td_([address2(address3)])]);
        };
      })(addresses))])]);
    };
    var render = function(remoteNetworkInfo) {
      return layout("addresses")(sidebar(Addresses.value))([function() {
        if (remoteNetworkInfo instanceof NotAsked) {
          return p_([text5("Loading...")]);
        }
        ;
        if (remoteNetworkInfo instanceof Loading2) {
          return p_([text5("Loading...")]);
        }
        ;
        if (remoteNetworkInfo instanceof Failure) {
          return p_([text5(remoteNetworkInfo.value0)]);
        }
        ;
        if (remoteNetworkInfo instanceof Success2) {
          return renderAddresses(remoteNetworkInfo.value0);
        }
        ;
        throw new Error("Failed pattern match at Yare.Component.Addresses (line 40, column 7 - line 44, column 54): " + [remoteNetworkInfo.constructor.name]);
      }()]);
    };
    var handleAction = function(v) {
      return bind9(getAddresses2)(function(v1) {
        if (v1.length === 0) {
          return put4(new Failure("No info about addresses is available"));
        }
        ;
        return put4(new Success2(v1));
      });
    };
    return mkComponent({
      initialState: $$const(NotAsked.value),
      render,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        finalize: defaultEval.finalize,
        handleAction,
        initialize: new Just(Initialize2.value)
      })
    });
  };

  // output/Yare.Component.Home/index.js
  var component2 = function(dictNavigate) {
    var render = function(v) {
      return layout("home")(sidebar(Home.value))([p_([text5("You can visit "), a([safeHref(Network.value)])([text5("Network information page")])])]);
    };
    return mkComponent({
      initialState: $$const(unit),
      render,
      "eval": mkEval(defaultEval)
    });
  };

  // output/Yare.Component.Network/index.js
  var div4 = /* @__PURE__ */ div(euclideanRingInt);
  var show8 = /* @__PURE__ */ show(showInt);
  var bind10 = /* @__PURE__ */ bind(bindHalogenM);
  var put5 = /* @__PURE__ */ put(monadStateHalogenM);
  var Initialize3 = /* @__PURE__ */ function() {
    function Initialize9() {
    }
    ;
    Initialize9.value = new Initialize9();
    return Initialize9;
  }();
  var component3 = function(dictHasNetworkInfo) {
    var getNetworkInfo2 = getNetworkInfo(hasNetworkInfoHalogenM(dictHasNetworkInfo));
    var renderBlockRef = function(v) {
      return p_([slotNo(v.slotNo), br_, blockNo(v.blockNo), br_, block(v.headerHash)]);
    };
    var render = function(remoteNetworkInfo) {
      return layout("network")(sidebar(Network.value))([function() {
        if (remoteNetworkInfo instanceof NotAsked) {
          return p_([text5("Loading...")]);
        }
        ;
        if (remoteNetworkInfo instanceof Loading2) {
          return p_([text5("Loading...")]);
        }
        ;
        if (remoteNetworkInfo instanceof Failure) {
          return p_([text5(remoteNetworkInfo.value0)]);
        }
        ;
        if (remoteNetworkInfo instanceof Success2) {
          var progress2 = div4(remoteNetworkInfo.value0.lastIndexed.blockNo * 100 | 0)(remoteNetworkInfo.value0.networkTip.blockNo);
          return div2([css("content")])([h2_([text5("Network Tip")]), renderBlockRef(remoteNetworkInfo.value0.networkTip), h2_([text5("Last Indexed")]), renderBlockRef(remoteNetworkInfo.value0.lastIndexed), h2_([text5("Sync Progress")]), p_([text5(function() {
            if (progress2 === 100) {
              return "Fully synchronized";
            }
            ;
            return "Syncing, " + (show8(progress2) + "%");
          }())])]);
        }
        ;
        throw new Error("Failed pattern match at Yare.Component.Network (line 40, column 9 - line 59, column 16): " + [remoteNetworkInfo.constructor.name]);
      }()]);
    };
    var handleAction = function(v) {
      return bind10(getNetworkInfo2)(function(v1) {
        if (v1 instanceof Nothing) {
          return put5(new Failure("No network info available"));
        }
        ;
        if (v1 instanceof Just) {
          return put5(new Success2(v1.value0));
        }
        ;
        throw new Error("Failed pattern match at Yare.Component.Network (line 33, column 37 - line 35, column 51): " + [v1.constructor.name]);
      });
    };
    return mkComponent({
      initialState: $$const(NotAsked.value),
      render,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        finalize: defaultEval.finalize,
        handleAction,
        initialize: new Just(Initialize3.value)
      })
    });
  };

  // output/Data.Form.Field/index.js
  var FieldDraft = /* @__PURE__ */ function() {
    function FieldDraft2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    FieldDraft2.create = function(value0) {
      return function(value1) {
        return new FieldDraft2(value0, value1);
      };
    };
    return FieldDraft2;
  }();
  var FieldValid = /* @__PURE__ */ function() {
    function FieldValid2(value0) {
      this.value0 = value0;
    }
    ;
    FieldValid2.create = function(value0) {
      return new FieldValid2(value0);
    };
    return FieldValid2;
  }();
  var value14 = function(v) {
    if (v.state instanceof FieldDraft) {
      return v.state.value1;
    }
    ;
    if (v.state instanceof FieldValid) {
      return v.printer(v.state.value0);
    }
    ;
    throw new Error("Failed pattern match at Data.Form.Field (line 74, column 3 - line 76, column 31): " + [v.state.constructor.name]);
  };
  var update = function(v) {
    return function(draft) {
      var v1 = v.parser(draft);
      if (v1 instanceof Left) {
        return {
          parser: v.parser,
          printer: v.printer,
          state: new FieldDraft(new Just(v1.value0), draft)
        };
      }
      ;
      if (v1 instanceof Right) {
        return {
          parser: v.parser,
          printer: v.printer,
          state: new FieldValid(v1.value0)
        };
      }
      ;
      throw new Error("Failed pattern match at Data.Form.Field (line 50, column 3 - line 52, column 49): " + [v1.constructor.name]);
    };
  };
  var result = function(v) {
    if (v.state instanceof FieldDraft) {
      return Nothing.value;
    }
    ;
    if (v.state instanceof FieldValid) {
      return new Just(v.state.value0);
    }
    ;
    throw new Error("Failed pattern match at Data.Form.Field (line 65, column 3 - line 67, column 26): " + [v.state.constructor.name]);
  };
  var make = function(parser) {
    return function(printer) {
      return function(draft) {
        return {
          parser,
          printer,
          state: new FieldDraft(Nothing.value, draft)
        };
      };
    };
  };
  var hasResult = function($30) {
    return isJust(result($30));
  };
  var error3 = function(v) {
    if (v.state instanceof FieldDraft) {
      return v.state.value0;
    }
    ;
    if (v.state instanceof FieldValid) {
      return Nothing.value;
    }
    ;
    throw new Error("Failed pattern match at Data.Form.Field (line 56, column 3 - line 58, column 32): " + [v.state.constructor.name]);
  };

  // output/Foreign.Index/foreign.js
  function unsafeReadPropImpl(f, s, key, value16) {
    return value16 == null ? f : s(value16[key]);
  }

  // output/Foreign.Index/index.js
  var unsafeReadProp = function(dictMonad) {
    var fail4 = fail(dictMonad);
    var pure24 = pure(applicativeExceptT(dictMonad));
    return function(k) {
      return function(value16) {
        return unsafeReadPropImpl(fail4(new TypeMismatch("object", typeOf(value16))), pure24, k, value16);
      };
    };
  };
  var readProp = function(dictMonad) {
    return unsafeReadProp(dictMonad);
  };

  // output/Web.Event.Event/foreign.js
  function _currentTarget(e) {
    return e.currentTarget;
  }

  // output/Web.Event.Event/index.js
  var currentTarget = function($5) {
    return toMaybe(_currentTarget($5));
  };

  // output/Web.UIEvent.MouseEvent.EventTypes/index.js
  var click2 = "click";

  // output/Halogen.HTML.Events/index.js
  var map42 = /* @__PURE__ */ map(functorMaybe);
  var composeKleisli3 = /* @__PURE__ */ composeKleisli(bindMaybe);
  var composeKleisliFlipped5 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var readProp2 = /* @__PURE__ */ readProp(monadIdentity);
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var mouseHandler = unsafeCoerce2;
  var handler$prime = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return map42(Action.create)(f(ev));
      });
    };
  };
  var handler2 = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return new Just(new Action(f(ev)));
      });
    };
  };
  var onClick = /* @__PURE__ */ function() {
    var $15 = handler2(click2);
    return function($16) {
      return $15(mouseHandler($16));
    };
  }();
  var addForeignPropHandler = function(key) {
    return function(prop4) {
      return function(reader) {
        return function(f) {
          var go2 = function(a2) {
            return composeKleisliFlipped5(reader)(readProp2(prop4))(unsafeToForeign(a2));
          };
          return handler$prime(key)(composeKleisli3(currentTarget)(function(e) {
            return either($$const(Nothing.value))(function($85) {
              return Just.create(f($85));
            })(runExcept(go2(e)));
          }));
        };
      };
    };
  };
  var onValueInput = /* @__PURE__ */ addForeignPropHandler(input)("value")(readString2);

  // output/Halogen.Hooks.Hook/index.js
  var bind16 = /* @__PURE__ */ bind(freeBind);
  var Hook = function(x) {
    return x;
  };
  var unsafeToHook = function($16) {
    return Hook(liftF($16));
  };
  var unsafeFromHook = function(v) {
    return v;
  };
  var pure18 = /* @__PURE__ */ function() {
    var $17 = pure(freeApplicative);
    return function($18) {
      return Hook($17($18));
    };
  }();
  var bind11 = function(v) {
    return function(f) {
      return bind16(v)(function(a2) {
        var v1 = f(a2);
        return v1;
      });
    };
  };

  // output/Effect.Exception.Unsafe/index.js
  var unsafeThrowException = function($1) {
    return unsafePerformEffect(throwException($1));
  };
  var unsafeThrow = function($2) {
    return unsafeThrowException(error($2));
  };

  // output/Halogen.Hooks.Internal.Types/index.js
  var toStateValue = unsafeCoerce2;
  var toQueryValue = unsafeCoerce2;
  var fromStateValue = unsafeCoerce2;
  var fromMemoValues = unsafeCoerce2;
  var fromMemoValue = unsafeCoerce2;

  // output/Halogen.Hooks.HookM/index.js
  var identity17 = /* @__PURE__ */ identity(categoryFn);
  var Modify = /* @__PURE__ */ function() {
    function Modify2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Modify2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Modify2(value0, value1, value22);
        };
      };
    };
    return Modify2;
  }();
  var Subscribe2 = /* @__PURE__ */ function() {
    function Subscribe3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Subscribe3.create = function(value0) {
      return function(value1) {
        return new Subscribe3(value0, value1);
      };
    };
    return Subscribe3;
  }();
  var Unsubscribe2 = /* @__PURE__ */ function() {
    function Unsubscribe3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Unsubscribe3.create = function(value0) {
      return function(value1) {
        return new Unsubscribe3(value0, value1);
      };
    };
    return Unsubscribe3;
  }();
  var Lift4 = /* @__PURE__ */ function() {
    function Lift5(value0) {
      this.value0 = value0;
    }
    ;
    Lift5.create = function(value0) {
      return new Lift5(value0);
    };
    return Lift5;
  }();
  var ChildQuery3 = /* @__PURE__ */ function() {
    function ChildQuery4(value0) {
      this.value0 = value0;
    }
    ;
    ChildQuery4.create = function(value0) {
      return new ChildQuery4(value0);
    };
    return ChildQuery4;
  }();
  var Raise2 = /* @__PURE__ */ function() {
    function Raise3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Raise3.create = function(value0) {
      return function(value1) {
        return new Raise3(value0, value1);
      };
    };
    return Raise3;
  }();
  var Par2 = /* @__PURE__ */ function() {
    function Par3(value0) {
      this.value0 = value0;
    }
    ;
    Par3.create = function(value0) {
      return new Par3(value0);
    };
    return Par3;
  }();
  var Fork2 = /* @__PURE__ */ function() {
    function Fork3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Fork3.create = function(value0) {
      return function(value1) {
        return new Fork3(value0, value1);
      };
    };
    return Fork3;
  }();
  var Kill2 = /* @__PURE__ */ function() {
    function Kill3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Kill3.create = function(value0) {
      return function(value1) {
        return new Kill3(value0, value1);
      };
    };
    return Kill3;
  }();
  var GetRef2 = /* @__PURE__ */ function() {
    function GetRef3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    GetRef3.create = function(value0) {
      return function(value1) {
        return new GetRef3(value0, value1);
      };
    };
    return GetRef3;
  }();
  var functorHookM = freeFunctor;
  var map210 = /* @__PURE__ */ map(functorHookM);
  var bindHookM = freeBind;
  var applyHookM = freeApply;
  var applicativeHookM = freeApplicative;
  var modify5 = function(identifier) {
    return function(f) {
      var f$prime = function($147) {
        return toStateValue(f(fromStateValue($147)));
      };
      return liftF(new Modify(identifier, f$prime, fromStateValue));
    };
  };
  var modify_3 = function(identifier) {
    var $148 = map210($$const(unit));
    var $149 = modify5(identifier);
    return function($150) {
      return $148($149($150));
    };
  };
  var put6 = function(identifier) {
    return function(state3) {
      return modify_3(identifier)($$const(state3));
    };
  };
  var get4 = function(identifier) {
    return modify5(identifier)(identity17);
  };

  // output/Halogen.Hooks.Internal.Eval.Types/index.js
  var Initialize4 = /* @__PURE__ */ function() {
    function Initialize9() {
    }
    ;
    Initialize9.value = new Initialize9();
    return Initialize9;
  }();
  var Queued = /* @__PURE__ */ function() {
    function Queued2() {
    }
    ;
    Queued2.value = new Queued2();
    return Queued2;
  }();
  var Step3 = /* @__PURE__ */ function() {
    function Step4() {
    }
    ;
    Step4.value = new Step4();
    return Step4;
  }();
  var Finalize2 = /* @__PURE__ */ function() {
    function Finalize3() {
    }
    ;
    Finalize3.value = new Finalize3();
    return Finalize3;
  }();
  var HookState = function(x) {
    return x;
  };
  var eqInterpretHookReason = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Initialize4 && y instanceof Initialize4) {
          return true;
        }
        ;
        if (x instanceof Queued && y instanceof Queued) {
          return true;
        }
        ;
        if (x instanceof Step3 && y instanceof Step3) {
          return true;
        }
        ;
        if (x instanceof Finalize2 && y instanceof Finalize2) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var toQueryFn = unsafeCoerce2;
  var toHalogenM = function(v) {
    return function(v1) {
      return function(hm) {
        return hm;
      };
    };
  };
  var fromQueryFn = unsafeCoerce2;

  // output/Halogen.Hooks.Internal.UseHookF/index.js
  var UseState = /* @__PURE__ */ function() {
    function UseState2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    UseState2.create = function(value0) {
      return function(value1) {
        return new UseState2(value0, value1);
      };
    };
    return UseState2;
  }();
  var UseEffect = /* @__PURE__ */ function() {
    function UseEffect2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    UseEffect2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new UseEffect2(value0, value1, value22);
        };
      };
    };
    return UseEffect2;
  }();
  var UseQuery = /* @__PURE__ */ function() {
    function UseQuery2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    UseQuery2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new UseQuery2(value0, value1, value22);
        };
      };
    };
    return UseQuery2;
  }();
  var UseMemo = /* @__PURE__ */ function() {
    function UseMemo2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    UseMemo2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new UseMemo2(value0, value1, value22);
        };
      };
    };
    return UseMemo2;
  }();
  var UseRef = /* @__PURE__ */ function() {
    function UseRef2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    UseRef2.create = function(value0) {
      return function(value1) {
        return new UseRef2(value0, value1);
      };
    };
    return UseRef2;
  }();

  // output/Halogen.Hooks.Internal.Eval/index.js
  var fromJust9 = /* @__PURE__ */ fromJust();
  var unsafeIndex2 = /* @__PURE__ */ unsafeIndex();
  var bind17 = /* @__PURE__ */ bind(bindHalogenM);
  var discard7 = /* @__PURE__ */ discard(discardUnit);
  var discard12 = /* @__PURE__ */ discard7(bindHalogenM);
  var when4 = /* @__PURE__ */ when(applicativeHalogenM);
  var sequence_2 = /* @__PURE__ */ sequence_(applicativeHalogenM)(foldableArray);
  var eq7 = /* @__PURE__ */ eq(eqInterpretHookReason);
  var $$void8 = /* @__PURE__ */ $$void(functorHalogenM);
  var gets2 = /* @__PURE__ */ gets(monadStateHalogenM);
  var unwrap8 = /* @__PURE__ */ unwrap();
  var get5 = /* @__PURE__ */ get(monadStateHalogenM);
  var pure19 = /* @__PURE__ */ pure(applicativeHalogenM);
  var map43 = /* @__PURE__ */ map(functorHookM);
  var unless4 = /* @__PURE__ */ unless(applicativeHalogenM);
  var bind18 = /* @__PURE__ */ bind(freeBind);
  var discard32 = /* @__PURE__ */ discard7(freeBind);
  var pure23 = /* @__PURE__ */ pure(freeApplicative);
  var void1 = /* @__PURE__ */ $$void(freeFunctor);
  var retractFreeAp3 = /* @__PURE__ */ retractFreeAp(applicativeHalogenAp);
  var pure32 = /* @__PURE__ */ pure(applicativeHookM);
  var not1 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean)));
  var applySecond2 = /* @__PURE__ */ applySecond(applyHookM);
  var bimap5 = /* @__PURE__ */ bimap(bifunctorTuple);
  var unsafeSetCell = function(index6) {
    return function(a2) {
      return function(array2) {
        return fromJust9(modifyAt(index6)($$const(a2))(array2));
      };
    };
  };
  var unsafeGetCell = function(index6) {
    return function(array2) {
      return unsafeIndex2(array2)(index6);
    };
  };
  var stepIndex = function(index6) {
    return function(array2) {
      var $88 = (index6 + 1 | 0) < length3(array2);
      if ($88) {
        return index6 + 1 | 0;
      }
      ;
      return 0;
    };
  };
  var mkEval2 = function(inputEq) {
    return function(_evalHookM) {
      return function(_evalHook) {
        var executeHooksAndEffects = function(stateRef) {
          return function(reason2) {
            return bind17(_evalHook(reason2))(function() {
              var v = unsafePerformEffect(read(stateRef));
              return discard12(when4(!$$null2(v.evalQueue))(function() {
                var runQueue = unsafePerformEffect(function __do2() {
                  modify_(function(v1) {
                    return {
                      componentRef: v1.componentRef,
                      effectCells: v1.effectCells,
                      input: v1.input,
                      memoCells: v1.memoCells,
                      queryFn: v1.queryFn,
                      refCells: v1.refCells,
                      stateCells: v1.stateCells,
                      evalQueue: [],
                      stateDirty: false
                    };
                  })(stateRef)();
                  return sequence_2(v.evalQueue);
                });
                return discard12(runQueue)(function() {
                  var v1 = unsafePerformEffect(read(stateRef));
                  var initializeOrStepReason = eq7(reason2)(Initialize4.value) || eq7(reason2)(Step3.value);
                  return when4(v1.stateDirty && initializeOrStepReason)($$void8(executeHooksAndEffects(stateRef)(Step3.value)));
                });
              }()))(function() {
                return gets2(function($217) {
                  return function(v1) {
                    return v1.result;
                  }(unwrap8($217));
                });
              });
            });
          };
        };
        return function(v) {
          if (v instanceof Initialize) {
            return bind17(get5)(function(v1) {
              return bind17(executeHooksAndEffects(v1.stateRef)(Initialize4.value))(function() {
                return pure19(v.value0);
              });
            });
          }
          ;
          if (v instanceof Query) {
            return bind17(get5)(function(v1) {
              var v2 = unsafePerformEffect(read(v1.stateRef));
              if (v2.queryFn instanceof Nothing) {
                return pure19(v.value1(unit));
              }
              ;
              if (v2.queryFn instanceof Just) {
                return _evalHookM(executeHooksAndEffects(v1.stateRef)(Step3.value))(unCoyoneda(function(g) {
                  var $218 = map43(maybe(v.value1(unit))(g));
                  var $219 = fromQueryFn(v2.queryFn.value0);
                  return function($220) {
                    return $218($219($220));
                  };
                })(v.value0));
              }
              ;
              throw new Error("Failed pattern match at Halogen.Hooks.Internal.Eval (line 46, column 5 - line 51, column 81): " + [v2.queryFn.constructor.name]);
            });
          }
          ;
          if (v instanceof Action2) {
            return bind17(get5)(function(v1) {
              return discard12(_evalHookM(executeHooksAndEffects(v1.stateRef)(Step3.value))(v.value0))(function() {
                return pure19(v.value1);
              });
            });
          }
          ;
          if (v instanceof Receive) {
            return bind17(get5)(function(v1) {
              var v2 = unsafePerformEffect(read(v1.stateRef));
              return discard12(unless4(inputEq(v2.input)(v.value0))(function() {
                var execute = unsafePerformEffect(function __do2() {
                  modify_(function(v3) {
                    return {
                      componentRef: v3.componentRef,
                      effectCells: v3.effectCells,
                      evalQueue: v3.evalQueue,
                      memoCells: v3.memoCells,
                      queryFn: v3.queryFn,
                      refCells: v3.refCells,
                      stateCells: v3.stateCells,
                      stateDirty: v3.stateDirty,
                      input: v.value0
                    };
                  })(v1.stateRef)();
                  return executeHooksAndEffects(v1.stateRef)(Step3.value);
                });
                return $$void8(execute);
              }()))(function() {
                return pure19(v.value1);
              });
            });
          }
          ;
          if (v instanceof Finalize) {
            return bind17(get5)(function(v1) {
              return bind17(executeHooksAndEffects(v1.stateRef)(Finalize2.value))(function() {
                return pure19(v.value0);
              });
            });
          }
          ;
          throw new Error("Failed pattern match at Halogen.Hooks.Internal.Eval (line 37, column 39 - line 74, column 11): " + [v.constructor.name]);
        };
      };
    };
  };
  var evalHookM = function(v) {
    return function(v1) {
      var interpretHalogenHook = function(v2) {
        if (v2 instanceof Modify) {
          return bind18(liftF(new State(function(state3) {
            return new Tuple(state3, state3);
          })))(function(v3) {
            var v4 = unsafePerformEffect(read(v3.stateRef));
            return discard32(function() {
              var v5 = unsafeRefEq(v4.componentRef)(v2.value0.value0);
              if (v5) {
                return pure23(unit);
              }
              ;
              return unsafeThrow("Attempted to use state-modifying `HookM` code outside the component where it was defined.");
            }())(function() {
              var current = unsafeGetCell(v2.value0.value1)(v4.stateCells.queue);
              var next = v2.value1(current);
              return discard32(function() {
                var v5 = unsafeRefEq(current)(next);
                if (v5) {
                  return pure23(unit);
                }
                ;
                var newQueue = unsafeSetCell(v2.value0.value1)(next);
                var runHooks$prime = unsafePerformEffect(function __do2() {
                  modify_(function(s) {
                    return {
                      componentRef: s.componentRef,
                      effectCells: s.effectCells,
                      evalQueue: s.evalQueue,
                      input: s.input,
                      memoCells: s.memoCells,
                      queryFn: s.queryFn,
                      refCells: s.refCells,
                      stateCells: {
                        index: s.stateCells.index,
                        queue: newQueue(s.stateCells.queue)
                      },
                      stateDirty: true
                    };
                  })(v3.stateRef)();
                  return v;
                });
                return void1(runHooks$prime);
              }())(function() {
                return pure23(v2.value2(next));
              });
            });
          });
        }
        ;
        if (v2 instanceof Subscribe2) {
          return liftF(new Subscribe(v2.value0, v2.value1));
        }
        ;
        if (v2 instanceof Unsubscribe2) {
          return liftF(new Unsubscribe(v2.value0, v2.value1));
        }
        ;
        if (v2 instanceof Lift4) {
          return liftF(new Lift2(v2.value0));
        }
        ;
        if (v2 instanceof ChildQuery3) {
          return liftF(new ChildQuery2(v2.value0));
        }
        ;
        if (v2 instanceof Raise2) {
          return liftF(new Raise(v2.value0, v2.value1));
        }
        ;
        if (v2 instanceof Par2) {
          return liftF(new Par(retractFreeAp3(hoistFreeAp(function() {
            var $221 = evalHookM(v);
            return function($222) {
              return HalogenAp(liftFreeAp($221($222)));
            };
          }())(v2.value0))));
        }
        ;
        if (v2 instanceof Fork2) {
          return liftF(new Fork(evalHookM(v)(v2.value0), v2.value1));
        }
        ;
        if (v2 instanceof Kill2) {
          return liftF(new Kill(v2.value0, v2.value1));
        }
        ;
        if (v2 instanceof GetRef2) {
          return liftF(new GetRef(v2.value0, v2.value1));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Hooks.Internal.Eval (line 237, column 26 - line 302, column 31): " + [v2.constructor.name]);
      };
      return substFree(interpretHalogenHook)(v1);
    };
  };
  var evalHook = function(_evalHookM) {
    return function(_evalHook) {
      return function(reason2) {
        return function(stateRef) {
          return function(v) {
            if (v instanceof UseState) {
              if (reason2 instanceof Initialize4) {
                var identifier = unsafePerformEffect(function __do2() {
                  var v12 = modify(function(s) {
                    return {
                      componentRef: s.componentRef,
                      effectCells: s.effectCells,
                      evalQueue: s.evalQueue,
                      input: s.input,
                      memoCells: s.memoCells,
                      queryFn: s.queryFn,
                      refCells: s.refCells,
                      stateDirty: s.stateDirty,
                      stateCells: {
                        index: s.stateCells.index,
                        queue: snoc(s.stateCells.queue)(v.value0)
                      }
                    };
                  })(stateRef)();
                  return new Tuple(v12.componentRef, length3(v12.stateCells.queue) - 1 | 0);
                });
                return pure23(v.value1(new Tuple(v.value0, identifier)));
              }
              ;
              var v1 = unsafePerformEffect(function __do2() {
                var v2 = read(stateRef)();
                modify_(function(v3) {
                  return {
                    componentRef: v3.componentRef,
                    effectCells: v3.effectCells,
                    evalQueue: v3.evalQueue,
                    input: v3.input,
                    memoCells: v3.memoCells,
                    queryFn: v3.queryFn,
                    refCells: v3.refCells,
                    stateDirty: v3.stateDirty,
                    stateCells: {
                      queue: v3.stateCells.queue,
                      index: stepIndex(v2.stateCells.index)(v2.stateCells.queue)
                    }
                  };
                })(stateRef)();
                return {
                  value: unsafeGetCell(v2.stateCells.index)(v2.stateCells.queue),
                  identifier: new Tuple(v2.componentRef, v2.stateCells.index)
                };
              });
              return pure23(v.value1(new Tuple(v1.value, v1.identifier)));
            }
            ;
            if (v instanceof UseQuery) {
              var handler$prime2 = function($223) {
                return v.value1(toQueryValue($223));
              };
              return pure23(unsafePerformEffect(function __do2() {
                modify_(function(v12) {
                  return {
                    componentRef: v12.componentRef,
                    effectCells: v12.effectCells,
                    evalQueue: v12.evalQueue,
                    input: v12.input,
                    memoCells: v12.memoCells,
                    refCells: v12.refCells,
                    stateCells: v12.stateCells,
                    stateDirty: v12.stateDirty,
                    queryFn: new Just(toQueryFn(handler$prime2))
                  };
                })(stateRef)();
                return v.value2;
              }));
            }
            ;
            if (v instanceof UseEffect) {
              if (reason2 instanceof Initialize4) {
                return pure23(unsafePerformEffect(function() {
                  var $$eval = function(index6) {
                    return bind17(_evalHookM(_evalHook(Queued.value))(v.value1))(function(mbFinalizer) {
                      var finalizer = fromMaybe(pure32(unit))(mbFinalizer);
                      var updateQueue = function(st) {
                        return unsafeSetCell(index6)(new Tuple(v.value0, finalizer))(st);
                      };
                      return pure19(unsafePerformEffect(modify_(function(s) {
                        return {
                          componentRef: s.componentRef,
                          evalQueue: s.evalQueue,
                          input: s.input,
                          memoCells: s.memoCells,
                          queryFn: s.queryFn,
                          refCells: s.refCells,
                          stateCells: s.stateCells,
                          stateDirty: s.stateDirty,
                          effectCells: {
                            index: s.effectCells.index,
                            queue: updateQueue(s.effectCells.queue)
                          }
                        };
                      })(stateRef)));
                    });
                  };
                  var initializeState = function(st) {
                    return {
                      input: st.input,
                      componentRef: st.componentRef,
                      queryFn: st.queryFn,
                      stateCells: st.stateCells,
                      memoCells: st.memoCells,
                      refCells: st.refCells,
                      stateDirty: st.stateDirty,
                      evalQueue: snoc(st.evalQueue)($$eval(length3(st.effectCells.queue))),
                      effectCells: {
                        index: st.effectCells.index,
                        queue: snoc(st.effectCells.queue)(new Tuple(v.value0, pure32(unit)))
                      }
                    };
                  };
                  return function __do2() {
                    modify_(initializeState)(stateRef)();
                    return v.value2;
                  };
                }()));
              }
              ;
              if (reason2 instanceof Queued) {
                return pure23(v.value2);
              }
              ;
              if (reason2 instanceof Step3) {
                return pure23(unsafePerformEffect(function __do2() {
                  var v12 = read(stateRef)();
                  var nextIndex = stepIndex(v12.effectCells.index)(v12.effectCells.queue);
                  var v2 = unsafeGetCell(v12.effectCells.index)(v12.effectCells.queue);
                  if (v.value0 instanceof Just && v2.value0 instanceof Just) {
                    var memos$prime = {
                      old: fromMemoValues(v2.value0.value0),
                      "new": fromMemoValues(v.value0.value0)
                    };
                    var $171 = isEmpty(memos$prime["new"].memos) || not1(memos$prime["new"].eq)(memos$prime.old.memos)(memos$prime["new"].memos);
                    if ($171) {
                      var $$eval = bind17(_evalHookM(_evalHook(Queued.value))(applySecond2(v2.value1)(v.value1)))(function(mbFinalizer) {
                        var v3 = unsafePerformEffect(read(stateRef));
                        var newFinalizer = fromMaybe(pure32(unit))(mbFinalizer);
                        var newValue = new Tuple(v.value0, newFinalizer);
                        var newQueue = unsafeSetCell(v12.effectCells.index)(newValue)(v3.effectCells.queue);
                        return pure19(unsafePerformEffect(modify_(function(v4) {
                          return {
                            componentRef: v4.componentRef,
                            evalQueue: v4.evalQueue,
                            input: v4.input,
                            memoCells: v4.memoCells,
                            queryFn: v4.queryFn,
                            refCells: v4.refCells,
                            stateCells: v4.stateCells,
                            stateDirty: v4.stateDirty,
                            effectCells: {
                              index: v4.effectCells.index,
                              queue: newQueue
                            }
                          };
                        })(stateRef)));
                      });
                      modify_(function(s) {
                        return {
                          componentRef: s.componentRef,
                          input: s.input,
                          memoCells: s.memoCells,
                          queryFn: s.queryFn,
                          refCells: s.refCells,
                          stateCells: s.stateCells,
                          stateDirty: s.stateDirty,
                          evalQueue: snoc(s.evalQueue)($$eval),
                          effectCells: {
                            queue: s.effectCells.queue,
                            index: nextIndex
                          }
                        };
                      })(stateRef)();
                      return v.value2;
                    }
                    ;
                    modify_(function(v3) {
                      return {
                        componentRef: v3.componentRef,
                        evalQueue: v3.evalQueue,
                        input: v3.input,
                        memoCells: v3.memoCells,
                        queryFn: v3.queryFn,
                        refCells: v3.refCells,
                        stateCells: v3.stateCells,
                        stateDirty: v3.stateDirty,
                        effectCells: {
                          queue: v3.effectCells.queue,
                          index: nextIndex
                        }
                      };
                    })(stateRef)();
                    return v.value2;
                  }
                  ;
                  modify_(function(v3) {
                    return {
                      componentRef: v3.componentRef,
                      evalQueue: v3.evalQueue,
                      input: v3.input,
                      memoCells: v3.memoCells,
                      queryFn: v3.queryFn,
                      refCells: v3.refCells,
                      stateCells: v3.stateCells,
                      stateDirty: v3.stateDirty,
                      effectCells: {
                        queue: v3.effectCells.queue,
                        index: nextIndex
                      }
                    };
                  })(stateRef)();
                  return v.value2;
                }));
              }
              ;
              if (reason2 instanceof Finalize2) {
                return pure23(unsafePerformEffect(function __do2() {
                  var v12 = read(stateRef)();
                  var v2 = unsafeGetCell(v12.effectCells.index)(v12.effectCells.queue);
                  var finalizeHook = _evalHookM(_evalHook(Queued.value))(v2.value1);
                  modify_(function(s) {
                    return {
                      componentRef: s.componentRef,
                      input: s.input,
                      memoCells: s.memoCells,
                      queryFn: s.queryFn,
                      refCells: s.refCells,
                      stateCells: s.stateCells,
                      stateDirty: s.stateDirty,
                      evalQueue: snoc(s.evalQueue)(finalizeHook),
                      effectCells: {
                        queue: s.effectCells.queue,
                        index: stepIndex(v12.effectCells.index)(v12.effectCells.queue)
                      }
                    };
                  })(stateRef)();
                  return v.value2;
                }));
              }
              ;
              throw new Error("Failed pattern match at Halogen.Hooks.Internal.Eval (line 131, column 5 - line 190, column 15): " + [reason2.constructor.name]);
            }
            ;
            if (v instanceof UseMemo) {
              if (reason2 instanceof Initialize4) {
                return pure23(unsafePerformEffect(function __do2() {
                  var v12 = read(stateRef)();
                  var newValue = v.value1(unit);
                  modify_(function(v2) {
                    return {
                      componentRef: v2.componentRef,
                      effectCells: v2.effectCells,
                      evalQueue: v2.evalQueue,
                      input: v2.input,
                      queryFn: v2.queryFn,
                      refCells: v2.refCells,
                      stateCells: v2.stateCells,
                      stateDirty: v2.stateDirty,
                      memoCells: {
                        index: v2.memoCells.index,
                        queue: snoc(v12.memoCells.queue)(new Tuple(v.value0, newValue))
                      }
                    };
                  })(stateRef)();
                  return v.value2(newValue);
                }));
              }
              ;
              return pure23(unsafePerformEffect(function __do2() {
                var v12 = read(stateRef)();
                var v2 = bimap5(fromMemoValues)(fromMemoValue)(unsafeGetCell(v12.memoCells.index)(v12.memoCells.queue));
                var newMemos = fromMemoValues(v.value0);
                var m = {
                  eq: newMemos.eq,
                  old: v2.value0.memos,
                  "new": newMemos.memos,
                  value: v2.value1
                };
                var nextIndex = stepIndex(v12.memoCells.index)(v12.memoCells.queue);
                var $198 = isEmpty(m["new"]) || !m.eq(m["new"])(m.old);
                if ($198) {
                  var newValue = v.value1(unit);
                  var newQueue = unsafeSetCell(v12.memoCells.index)(new Tuple(v.value0, newValue))(v12.memoCells.queue);
                  modify_(function(v3) {
                    return {
                      componentRef: v3.componentRef,
                      effectCells: v3.effectCells,
                      evalQueue: v3.evalQueue,
                      input: v3.input,
                      queryFn: v3.queryFn,
                      refCells: v3.refCells,
                      stateCells: v3.stateCells,
                      stateDirty: v3.stateDirty,
                      memoCells: {
                        index: nextIndex,
                        queue: newQueue
                      }
                    };
                  })(stateRef)();
                  return v.value2(newValue);
                }
                ;
                modify_(function(v3) {
                  return {
                    componentRef: v3.componentRef,
                    effectCells: v3.effectCells,
                    evalQueue: v3.evalQueue,
                    input: v3.input,
                    queryFn: v3.queryFn,
                    refCells: v3.refCells,
                    stateCells: v3.stateCells,
                    stateDirty: v3.stateDirty,
                    memoCells: {
                      queue: v3.memoCells.queue,
                      index: nextIndex
                    }
                  };
                })(stateRef)();
                return v.value2(m.value);
              }));
            }
            ;
            if (v instanceof UseRef) {
              if (reason2 instanceof Initialize4) {
                return pure23(unsafePerformEffect(function __do2() {
                  var v12 = read(stateRef)();
                  var ref2 = $$new(v.value0)();
                  modify_(function(v2) {
                    return {
                      componentRef: v2.componentRef,
                      effectCells: v2.effectCells,
                      evalQueue: v2.evalQueue,
                      input: v2.input,
                      memoCells: v2.memoCells,
                      queryFn: v2.queryFn,
                      stateCells: v2.stateCells,
                      stateDirty: v2.stateDirty,
                      refCells: {
                        index: v2.refCells.index,
                        queue: snoc(v12.refCells.queue)(ref2)
                      }
                    };
                  })(stateRef)();
                  return v.value1(new Tuple(v.value0, ref2));
                }));
              }
              ;
              return pure23(unsafePerformEffect(function __do2() {
                var v12 = read(stateRef)();
                var ref2 = unsafeGetCell(v12.refCells.index)(v12.refCells.queue);
                var value16 = read(ref2)();
                modify_(function(v2) {
                  return {
                    componentRef: v2.componentRef,
                    effectCells: v2.effectCells,
                    evalQueue: v2.evalQueue,
                    input: v2.input,
                    memoCells: v2.memoCells,
                    queryFn: v2.queryFn,
                    stateCells: v2.stateCells,
                    stateDirty: v2.stateDirty,
                    refCells: {
                      queue: v2.refCells.queue,
                      index: stepIndex(v12.refCells.index)(v12.refCells.queue)
                    }
                  };
                })(stateRef)();
                return v.value1(new Tuple(value16, ref2));
              }));
            }
            ;
            throw new Error("Failed pattern match at Halogen.Hooks.Internal.Eval (line 103, column 49 - line 230, column 39): " + [v.constructor.name]);
          };
        };
      };
    };
  };

  // output/Halogen.Hooks.Component/index.js
  var bind19 = /* @__PURE__ */ bind(bindHalogenM);
  var get6 = /* @__PURE__ */ get(monadStateHalogenM);
  var discard8 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var modify_4 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var over3 = /* @__PURE__ */ over()();
  var pure20 = /* @__PURE__ */ pure(applicativeHalogenM);
  var memoComponent = function(eqInput) {
    return function(inputHookFn) {
      var initialState2 = function(input3) {
        return {
          result: text5(""),
          stateRef: unsafePerformEffect($$new({
            input: input3,
            componentRef: {},
            queryFn: Nothing.value,
            stateCells: {
              queue: [],
              index: 0
            },
            effectCells: {
              queue: [],
              index: 0
            },
            memoCells: {
              queue: [],
              index: 0
            },
            refCells: {
              queue: [],
              index: 0
            },
            evalQueue: [],
            stateDirty: false
          }))
        };
      };
      var slotToken = {};
      var queryToken = {};
      var outputToken = {};
      var hookFn = inputHookFn({
        queryToken,
        slotToken,
        outputToken
      });
      var evalHook2 = function(reason2) {
        return bind19(get6)(function(v) {
          var $$eval = evalHook(evalHookM)(evalHook2)(reason2)(v.stateRef);
          var v1 = unsafePerformEffect(read(v.stateRef));
          var hookF = unsafeFromHook(hookFn(v1.input));
          return bind19(substFree($$eval)(hookF))(function(a2) {
            return discard8(modify_4(over3(HookState)(function(v2) {
              return {
                stateRef: v2.stateRef,
                result: a2
              };
            })))(function() {
              return pure20(a2);
            });
          });
        });
      };
      return mkComponent({
        initialState: initialState2,
        render: function(v) {
          return v.result;
        },
        "eval": function() {
          var $21 = toHalogenM(slotToken)(outputToken);
          var $22 = mkEval2(eqInput)(evalHookM)(evalHook2);
          return function($23) {
            return $21($22($23));
          };
        }()
      });
    };
  };
  var component4 = /* @__PURE__ */ memoComponent(function(v) {
    return function(v1) {
      return false;
    };
  });

  // output/Halogen.Hooks/index.js
  var useState = function(initialState2) {
    var $$interface = function(v) {
      return new Tuple(fromStateValue(v.value0), v.value1);
    };
    var initialState$prime = toStateValue(initialState2);
    return unsafeToHook(new UseState(initialState$prime, $$interface));
  };

  // output/Yare.Component.Nft/index.js
  var type_19 = /* @__PURE__ */ type_17(isPropInputType);
  var value15 = /* @__PURE__ */ value12(isPropString);
  var bind20 = /* @__PURE__ */ bind(bindHookM);
  var pass3 = /* @__PURE__ */ pass(applicativeHookM);
  var initialState = {
    policy: /* @__PURE__ */ make(parsePolicy)(printPolicy)(""),
    tokenName: /* @__PURE__ */ make(parseTokenName)(printTokenName)("")
  };
  var component5 = /* @__PURE__ */ component4(function(_tokens) {
    return function(_input) {
      return bind11(useState(initialState))(function(v) {
        return pure18(layout("NFT")(sidebar(new Nft(Mint.value)))([div2([css("box")])([div2([css("field")])([label4([css("label"), $$for("policy")])([text5("Policy ID")]), div2([css("control has-icons-left")])([input2([css("input is-family-code"), type_19(InputText.value), id2("policy"), name15("policy"), value15(value14(v.value0.policy)), required4(true), placeholder3("Hex-encoded"), onValueInput(function(str) {
          return modify_3(v.value1)(function(s) {
            return {
              tokenName: s.tokenName,
              policy: update(s.policy)(str)
            };
          });
        })]), span3([css("icon is-small is-left")])([i([css("fas fa-thumbtack")])([])])]), maybeElem(error3(v.value0.policy))(function(err) {
          return p([css("help is-danger")])([text5(err)]);
        })]), div2([css("field")])([label4([css("label"), $$for("tokenName")])([text5("Token Name")]), div2([css("control has-icons-left")])([input2([css("input is-family-code"), type_19(InputText.value), id2("tokenName"), name15("tokenName"), value15(value14(v.value0.tokenName)), required4(true), placeholder3("e.g. MyNFT"), onValueInput(function(str) {
          return modify_3(v.value1)(function(s) {
            return {
              policy: s.policy,
              tokenName: update(s.tokenName)(str)
            };
          });
        })]), span3([css("icon is-small is-left")])([i([css("fas fa-clipboard")])([])])]), maybeElem(error3(v.value0.tokenName))(function(err) {
          return p([css("help is-danger")])([text5(err)]);
        })]), div2([css("field")])([div2([css("control")])([button([css("button is-link"), onClick(function(_event) {
          return bind20(get4(v.value1))(function(v1) {
            var v2 = result(v1.tokenName);
            var v3 = result(v1.policy);
            if (v3 instanceof Just && v2 instanceof Just) {
              return put6(v.value1)(initialState);
            }
            ;
            return pass3;
          });
        }), disabled10(!(hasResult(v.value0.policy) && hasResult(v.value0.tokenName)))])([text5("Initiate Minting")])])])])]));
      });
    };
  });

  // output/Yare.Component.Scripts/index.js
  var bind21 = /* @__PURE__ */ bind(bindHalogenM);
  var put7 = /* @__PURE__ */ put(monadStateHalogenM);
  var Initialize5 = /* @__PURE__ */ function() {
    function Initialize9() {
    }
    ;
    Initialize9.value = new Initialize9();
    return Initialize9;
  }();
  var component6 = function(dictHasScripts) {
    var getScripts2 = getScripts(hasScriptsHalogenM(dictHasScripts));
    var renderScriptStatus2 = function(status) {
      return span3([css("is-family-code")])(function() {
        if (status instanceof DeploymentInitiated) {
          return [text5("Deployment Initiated")];
        }
        ;
        if (status instanceof DeploymentCompleted) {
          return [text5("Deployment Completed")];
        }
        ;
        throw new Error("Failed pattern match at Yare.Component.Scripts (line 74, column 5 - line 76, column 60): " + [status.constructor.name]);
      }());
    };
    var renderScripts = function(scripts) {
      return div2([css("content")])([table([css("table")])([thead_([tr_([th_([text5("#")]), th_([text5("ScriptHash")]), th_([text5("Status")]), th_([text5("Tx")]), th_([text5("Out")])])]), tbody_(mapWithIndex3(function(index6) {
        return function(script2) {
          return tr_([td_([index5(index6)]), td_([scriptHash(script2.scriptHash)]), td_([renderScriptStatus2(script2.scriptStatus)]), td_([txId(script2.scriptTxId)]), td_([txIx(script2.scriptTxOut)])]);
        };
      })(scripts))])]);
    };
    var render = function(remoteNetworkInfo) {
      return layout("Scripts")(sidebar(Scripts.value))([function() {
        if (remoteNetworkInfo instanceof NotAsked) {
          return p_([text5("Loading...")]);
        }
        ;
        if (remoteNetworkInfo instanceof Loading2) {
          return p_([text5("Loading...")]);
        }
        ;
        if (remoteNetworkInfo instanceof Failure) {
          return p_([text5(remoteNetworkInfo.value0)]);
        }
        ;
        if (remoteNetworkInfo instanceof Success2) {
          return renderScripts(remoteNetworkInfo.value0);
        }
        ;
        throw new Error("Failed pattern match at Yare.Component.Scripts (line 40, column 7 - line 44, column 48): " + [remoteNetworkInfo.constructor.name]);
      }()]);
    };
    var handleAction = function(v) {
      return bind21(getScripts2)(function(v1) {
        if (v1 instanceof Nothing) {
          return put7(new Failure("No info about Scripts is available"));
        }
        ;
        if (v1 instanceof Just) {
          return put7(new Success2(v1.value0));
        }
        ;
        throw new Error("Failed pattern match at Yare.Component.Scripts (line 34, column 33 - line 36, column 43): " + [v1.constructor.name]);
      });
    };
    return mkComponent({
      initialState: $$const(NotAsked.value),
      render,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        finalize: defaultEval.finalize,
        handleAction,
        initialize: new Just(Initialize5.value)
      })
    });
  };

  // output/Yare.Component.Transactions/index.js
  var show9 = /* @__PURE__ */ show(showInt);
  var bind22 = /* @__PURE__ */ bind(bindHalogenM);
  var put8 = /* @__PURE__ */ put(monadStateHalogenM);
  var Initialize6 = /* @__PURE__ */ function() {
    function Initialize9() {
    }
    ;
    Initialize9.value = new Initialize9();
    return Initialize9;
  }();
  var component7 = function(dictHasTransactions) {
    var getTransactions2 = getTransactions(hasTransactionsHalogenM(dictHasTransactions));
    var renderSubmitted = function(v) {
      if ($$null2(v)) {
        return p_([text5("No transactions have been submitted yet.")]);
      }
      ;
      return table([css("table")])([thead_([tr_([th_([text5("#")]), th_([text5("Submitted")])])]), tbody_(mapWithIndex3(function(index6) {
        return function(txId2) {
          return tr_([td_([text5(show9(index6))]), td_([txId(txId2)])]);
        };
      })(v))]);
    };
    var renderInLedger = function(inLedger) {
      return table([css("table")])([thead_([tr_([th_([text5("#")]), th_([text5("In Ledger")])])]), tbody_(mapWithIndex3(function(index6) {
        return function(txId2) {
          return tr_([td_([text5(show9(index6))]), td_([txId(txId2)])]);
        };
      })(inLedger))]);
    };
    var renderTransactions = function(v) {
      return div2([css("content")])([renderSubmitted(v.submitted), renderInLedger(v.inLedger)]);
    };
    var render = function(remoteNetworkInfo) {
      return layout("transactions")(sidebar(Transactions.value))([function() {
        if (remoteNetworkInfo instanceof NotAsked) {
          return p_([text5("Loading...")]);
        }
        ;
        if (remoteNetworkInfo instanceof Loading2) {
          return p_([text5("Loading...")]);
        }
        ;
        if (remoteNetworkInfo instanceof Failure) {
          return p_([text5(remoteNetworkInfo.value0)]);
        }
        ;
        if (remoteNetworkInfo instanceof Success2) {
          return renderTransactions(remoteNetworkInfo.value0);
        }
        ;
        throw new Error("Failed pattern match at Yare.Component.Transactions (line 41, column 7 - line 45, column 63): " + [remoteNetworkInfo.constructor.name]);
      }()]);
    };
    var handleAction = function(v) {
      return bind22(getTransactions2)(function(v1) {
        if (v1 instanceof Nothing) {
          return put8(new Failure("No info about transactions is available"));
        }
        ;
        if (v1 instanceof Just) {
          return put8(new Success2(v1.value0));
        }
        ;
        throw new Error("Failed pattern match at Yare.Component.Transactions (line 35, column 38 - line 37, column 53): " + [v1.constructor.name]);
      });
    };
    return mkComponent({
      initialState: $$const(NotAsked.value),
      render,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        finalize: defaultEval.finalize,
        handleAction,
        initialize: new Just(Initialize6.value)
      })
    });
  };

  // output/Yare.Component.UTxO/index.js
  var show10 = /* @__PURE__ */ show(showInt);
  var show16 = /* @__PURE__ */ show(showBigInt);
  var bind23 = /* @__PURE__ */ bind(bindHalogenM);
  var put9 = /* @__PURE__ */ put(monadStateHalogenM);
  var Initialize7 = /* @__PURE__ */ function() {
    function Initialize9() {
    }
    ;
    Initialize9.value = new Initialize9();
    return Initialize9;
  }();
  var component8 = function(dictHasUTxO) {
    var getUTxO2 = getUTxO(hasUTxOHalogenM(dictHasUTxO));
    var renderUtxo = function(utxos) {
      return table([css("table")])([thead_([tr_([th_([text5("#")]), th_([text5("Address")]), th_([text5("Tx Id")]), th_([text5("Output Index")]), th_([text5("Value")])])]), tbody_(mapWithIndex3(function(index6) {
        return function(v) {
          return tr_(function() {
            var v1 = splitTxIn(v.txIn);
            return [td([css("is-family-code")])([text5(show10(index6))]), td([css("is-family-code")])([address2(v.address)]), td([css("is-family-code")])([txId(v1.txId)]), td([css("is-family-code")])([text5(show10(v1.txIx))]), td([css("is-family-code")])([text5(show16(valueLovelace(v.value)))])];
          }());
        };
      })(utxos))]);
    };
    var render = function(remoteUTxO) {
      return layout("UTxO")(sidebar(UTxO.value))([function() {
        if (remoteUTxO instanceof NotAsked) {
          return p_([text5("Loading...")]);
        }
        ;
        if (remoteUTxO instanceof Loading2) {
          return p_([text5("Loading...")]);
        }
        ;
        if (remoteUTxO instanceof Failure) {
          return p_([text5(remoteUTxO.value0)]);
        }
        ;
        if (remoteUTxO instanceof Success2) {
          return renderUtxo(remoteUTxO.value0);
        }
        ;
        throw new Error("Failed pattern match at Yare.Component.UTxO (line 41, column 7 - line 45, column 41): " + [remoteUTxO.constructor.name]);
      }()]);
    };
    var handleAction = function(v) {
      return bind23(getUTxO2)(function(v1) {
        if (v1 instanceof Nothing) {
          return put9(new Failure("No UTxO info available"));
        }
        ;
        if (v1 instanceof Just) {
          return put9(new Success2(v1.value0));
        }
        ;
        throw new Error("Failed pattern match at Yare.Component.UTxO (line 35, column 17 - line 37, column 39): " + [v1.constructor.name]);
      });
    };
    return mkComponent({
      initialState: $$const(NotAsked.value),
      render,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        finalize: defaultEval.finalize,
        handleAction,
        initialize: new Just(Initialize7.value)
      })
    });
  };

  // output/Yare.Component.Router/index.js
  var slot_2 = /* @__PURE__ */ slot_();
  var slot_1 = /* @__PURE__ */ slot_2({
    reflectSymbol: function() {
      return "home";
    }
  })(ordUnit);
  var slot_22 = /* @__PURE__ */ slot_2({
    reflectSymbol: function() {
      return "utxo";
    }
  })(ordUnit);
  var slot_3 = /* @__PURE__ */ slot_2({
    reflectSymbol: function() {
      return "transactions";
    }
  })(ordUnit);
  var slot_4 = /* @__PURE__ */ slot_2({
    reflectSymbol: function() {
      return "network";
    }
  })(ordUnit);
  var slot_5 = /* @__PURE__ */ slot_2({
    reflectSymbol: function() {
      return "addresses";
    }
  })(ordUnit);
  var slot_6 = /* @__PURE__ */ slot_2({
    reflectSymbol: function() {
      return "scripts";
    }
  })(ordUnit);
  var slot_7 = /* @__PURE__ */ slot_2({
    reflectSymbol: function() {
      return "nft_mint";
    }
  })(ordUnit);
  var bind24 = /* @__PURE__ */ bind(bindHalogenM);
  var map44 = /* @__PURE__ */ map(functorHalogenM);
  var get7 = /* @__PURE__ */ get(monadStateHalogenM);
  var discard10 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var when5 = /* @__PURE__ */ when(applicativeHalogenM);
  var notEq2 = /* @__PURE__ */ notEq(/* @__PURE__ */ eqMaybe(eqRoute));
  var modify_5 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var pure21 = /* @__PURE__ */ pure(applicativeHalogenM);
  var Navigate = /* @__PURE__ */ function() {
    function Navigate2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Navigate2.create = function(value0) {
      return function(value1) {
        return new Navigate2(value0, value1);
      };
    };
    return Navigate2;
  }();
  var Initialize8 = /* @__PURE__ */ function() {
    function Initialize9() {
    }
    ;
    Initialize9.value = new Initialize9();
    return Initialize9;
  }();
  var component9 = function(dictMonadAff) {
    var liftEffect9 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    return function(dictMonadAsk) {
      return function(dictNow) {
        return function(dictLogMessages) {
          return function(dictHasNetworkInfo) {
            var component1 = component3(dictHasNetworkInfo);
            return function(dictHasTransactions) {
              var component22 = component7(dictHasTransactions);
              return function(dictHasAddresses) {
                var component32 = component(dictHasAddresses);
                return function(dictHasScripts) {
                  var component42 = component6(dictHasScripts);
                  return function(dictHasUTxO) {
                    var component52 = component8(dictHasUTxO);
                    return function(dictNavigate) {
                      var component62 = component2(dictNavigate);
                      var navigate2 = navigate(navigateHalogenM(dictNavigate));
                      var render = function(v) {
                        if (v.route instanceof Just) {
                          if (v.route.value0 instanceof Home) {
                            return slot_1($$Proxy.value)(unit)(component62)(unit);
                          }
                          ;
                          if (v.route.value0 instanceof UTxO) {
                            return slot_22($$Proxy.value)(unit)(component52)(unit);
                          }
                          ;
                          if (v.route.value0 instanceof Transactions) {
                            return slot_3($$Proxy.value)(unit)(component22)(unit);
                          }
                          ;
                          if (v.route.value0 instanceof Network) {
                            return slot_4($$Proxy.value)(unit)(component1)(unit);
                          }
                          ;
                          if (v.route.value0 instanceof Addresses) {
                            return slot_5($$Proxy.value)(unit)(component32)(unit);
                          }
                          ;
                          if (v.route.value0 instanceof Scripts) {
                            return slot_6($$Proxy.value)(unit)(component42)(unit);
                          }
                          ;
                          if (v.route.value0 instanceof Nft) {
                            return slot_7($$Proxy.value)(unit)(component5)(unit);
                          }
                          ;
                          throw new Error("Failed pattern match at Yare.Component.Router (line 99, column 14 - line 113, column 61): " + [v.route.value0.constructor.name]);
                        }
                        ;
                        if (v.route instanceof Nothing) {
                          return div_([text5("Oh no! That page wasn't found.")]);
                        }
                        ;
                        throw new Error("Failed pattern match at Yare.Component.Router (line 98, column 22 - line 116, column 59): " + [v.route.constructor.name]);
                      };
                      var initialize = bind24(map44(function() {
                        var $75 = parse7(routeCodec);
                        return function($76) {
                          return hush($75($76));
                        };
                      }())(liftEffect9(getHash)))(function(initialRoute) {
                        return navigate2(fromMaybe(Home.value)(initialRoute));
                      });
                      var handleQuery = function(v) {
                        return bind24(get7)(function(v1) {
                          return discard10(when5(notEq2(v1.route)(new Just(v.value0)))(modify_5(function(v2) {
                            var $68 = {};
                            for (var $69 in v2) {
                              if ({}.hasOwnProperty.call(v2, $69)) {
                                $68[$69] = v2[$69];
                              }
                              ;
                            }
                            ;
                            $68.route = new Just(v.value0);
                            return $68;
                          })))(function() {
                            return pure21(new Just(v.value1));
                          });
                        });
                      };
                      var handleAction = function(v) {
                        return initialize;
                      };
                      return mkComponent({
                        initialState: function(_input) {
                          return {
                            route: Nothing.value
                          };
                        },
                        render,
                        "eval": mkEval({
                          receive: defaultEval.receive,
                          finalize: defaultEval.finalize,
                          handleQuery,
                          handleAction,
                          initialize: new Just(Initialize8.value)
                        })
                      });
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Main/index.js
  var bind25 = /* @__PURE__ */ bind(bindAff);
  var hoist5 = /* @__PURE__ */ hoist3(functorAff);
  var component10 = /* @__PURE__ */ component9(monadAffAppM)(monadAsk)(nowAppM)(logMessagesAppM)(hasNetworkInfoAppM)(hasTransactionsAppM)(hasAddressesAppM)(hasScriptsAppM)(hasUTxOAppM)(navigateAppM);
  var $$void9 = /* @__PURE__ */ $$void(functorAff);
  var liftEffect8 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var matchesWith2 = /* @__PURE__ */ matchesWith(foldableEither);
  var when6 = /* @__PURE__ */ when(applicativeEffect);
  var notEq3 = /* @__PURE__ */ notEq(/* @__PURE__ */ eqMaybe(eqRoute));
  var pass4 = /* @__PURE__ */ pass(applicativeAff);
  var main2 = /* @__PURE__ */ runHalogenAff(/* @__PURE__ */ bind25(awaitBody)(function(body3) {
    var config = {
      baseUrl: "http://localhost:9999/api",
      logLevel: Dev.value
    };
    var rootComponent = hoist5(runAppM(config))(component10);
    return bind25(runUI2(rootComponent)(unit)(body3))(function(halogenIO) {
      return $$void9(liftEffect8(matchesWith2(parse7(routeCodec))(function(old) {
        return function($$new2) {
          return when6(notEq3(old)(new Just($$new2)))(launchAff_(bind25(halogenIO.query(mkTell(Navigate.create($$new2))))(function(_response) {
            return pass4;
          })));
        };
      })));
    });
  }));

  // build/dev/index.js
  new EventSource("/esbuild").addEventListener("change", () => {
    console.log("Reloading page...");
    location.reload();
  });
  console.log("Loaded PureScript code \u{1F680}");
  main2();
})();

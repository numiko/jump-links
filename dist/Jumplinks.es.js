function G(t, e = 0, r = !1) {
  if (!t) throw new Error("Please provide an element");
  const n = window.matchMedia("(prefers-reduced-motion: reduce)");
  let s = t.getBoundingClientRect().top + window.pageYOffset - e;
  if (r === !0) {
    const i = parseInt(window.getComputedStyle(t).marginTop);
    s -= i;
  }
  const o = {
    top: s,
    left: 0,
    behavior: n.matches ? "auto" : "smooth"
  };
  window.scrollTo(o), Ct(t) ? t.focus({ preventScroll: !0 }) : (t.setAttribute("tabindex", "-1"), t.focus({ preventScroll: !0 }));
}
function St(t) {
  history.pushState ? history.pushState(null, null, t) : location.hash = t;
}
function Ct(t = document) {
  return !![...document.querySelectorAll("a, button, input, textarea, select, details, [tabindex]")].includes(t);
}
var O = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function jt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Pt() {
  this.__data__ = [], this.size = 0;
}
var At = Pt;
function wt(t, e) {
  return t === e || t !== t && e !== e;
}
var j = wt, Et = j;
function kt(t, e) {
  for (var r = t.length; r--; )
    if (Et(t[r][0], e))
      return r;
  return -1;
}
var P = kt, xt = P, It = Array.prototype, Mt = It.splice;
function Lt(t) {
  var e = this.__data__, r = xt(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : Mt.call(e, r, 1), --this.size, !0;
}
var Dt = Lt, Ft = P;
function Ht(t) {
  var e = this.__data__, r = Ft(e, t);
  return r < 0 ? void 0 : e[r][1];
}
var Gt = Ht, Rt = P;
function Ut(t) {
  return Rt(this.__data__, t) > -1;
}
var Bt = Ut, Nt = P;
function Jt(t, e) {
  var r = this.__data__, n = Nt(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
var qt = Jt, zt = At, Vt = Dt, Kt = Gt, Xt = Bt, Yt = qt;
function g(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
g.prototype.clear = zt;
g.prototype.delete = Vt;
g.prototype.get = Kt;
g.prototype.has = Xt;
g.prototype.set = Yt;
var A = g, Wt = A;
function Zt() {
  this.__data__ = new Wt(), this.size = 0;
}
var Qt = Zt;
function te(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
var ee = te;
function re(t) {
  return this.__data__.get(t);
}
var ne = re;
function ae(t) {
  return this.__data__.has(t);
}
var ie = ae, se = typeof O == "object" && O && O.Object === Object && O, at = se, oe = at, ce = typeof self == "object" && self && self.Object === Object && self, le = oe || ce || Function("return this")(), d = le, ue = d, fe = ue.Symbol, it = fe, R = it, st = Object.prototype, he = st.hasOwnProperty, pe = st.toString, $ = R ? R.toStringTag : void 0;
function ve(t) {
  var e = he.call(t, $), r = t[$];
  try {
    t[$] = void 0;
    var n = !0;
  } catch {
  }
  var a = pe.call(t);
  return n && (e ? t[$] = r : delete t[$]), a;
}
var ge = ve, de = Object.prototype, ye = de.toString;
function be(t) {
  return ye.call(t);
}
var _e = be, U = it, $e = ge, me = _e, Oe = "[object Null]", Te = "[object Undefined]", B = U ? U.toStringTag : void 0;
function Se(t) {
  return t == null ? t === void 0 ? Te : Oe : B && B in Object(t) ? $e(t) : me(t);
}
var w = Se;
function Ce(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var p = Ce, je = w, Pe = p, Ae = "[object AsyncFunction]", we = "[object Function]", Ee = "[object GeneratorFunction]", ke = "[object Proxy]";
function xe(t) {
  if (!Pe(t))
    return !1;
  var e = je(t);
  return e == we || e == Ee || e == Ae || e == ke;
}
var M = xe, Ie = d, Me = Ie["__core-js_shared__"], Le = Me, I = Le, N = function() {
  var t = /[^.]+$/.exec(I && I.keys && I.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function De(t) {
  return !!N && N in t;
}
var Fe = De, He = Function.prototype, Ge = He.toString;
function Re(t) {
  if (t != null) {
    try {
      return Ge.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Ue = Re, Be = M, Ne = Fe, Je = p, qe = Ue, ze = /[\\^$.*+?()[\]{}|]/g, Ve = /^\[object .+?Constructor\]$/, Ke = Function.prototype, Xe = Object.prototype, Ye = Ke.toString, We = Xe.hasOwnProperty, Ze = RegExp(
  "^" + Ye.call(We).replace(ze, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Qe(t) {
  if (!Je(t) || Ne(t))
    return !1;
  var e = Be(t) ? Ze : Ve;
  return e.test(qe(t));
}
var tr = Qe;
function er(t, e) {
  return t == null ? void 0 : t[e];
}
var rr = er, nr = tr, ar = rr;
function ir(t, e) {
  var r = ar(t, e);
  return nr(r) ? r : void 0;
}
var L = ir, sr = L, or = d, cr = sr(or, "Map"), ot = cr, lr = L, ur = lr(Object, "create"), E = ur, J = E;
function fr() {
  this.__data__ = J ? J(null) : {}, this.size = 0;
}
var hr = fr;
function pr(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var vr = pr, gr = E, dr = "__lodash_hash_undefined__", yr = Object.prototype, br = yr.hasOwnProperty;
function _r(t) {
  var e = this.__data__;
  if (gr) {
    var r = e[t];
    return r === dr ? void 0 : r;
  }
  return br.call(e, t) ? e[t] : void 0;
}
var $r = _r, mr = E, Or = Object.prototype, Tr = Or.hasOwnProperty;
function Sr(t) {
  var e = this.__data__;
  return mr ? e[t] !== void 0 : Tr.call(e, t);
}
var Cr = Sr, jr = E, Pr = "__lodash_hash_undefined__";
function Ar(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = jr && e === void 0 ? Pr : e, this;
}
var wr = Ar, Er = hr, kr = vr, xr = $r, Ir = Cr, Mr = wr;
function y(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
y.prototype.clear = Er;
y.prototype.delete = kr;
y.prototype.get = xr;
y.prototype.has = Ir;
y.prototype.set = Mr;
var Lr = y, q = Lr, Dr = A, Fr = ot;
function Hr() {
  this.size = 0, this.__data__ = {
    hash: new q(),
    map: new (Fr || Dr)(),
    string: new q()
  };
}
var Gr = Hr;
function Rr(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
var Ur = Rr, Br = Ur;
function Nr(t, e) {
  var r = t.__data__;
  return Br(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
var k = Nr, Jr = k;
function qr(t) {
  var e = Jr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
var zr = qr, Vr = k;
function Kr(t) {
  return Vr(this, t).get(t);
}
var Xr = Kr, Yr = k;
function Wr(t) {
  return Yr(this, t).has(t);
}
var Zr = Wr, Qr = k;
function tn(t, e) {
  var r = Qr(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
var en = tn, rn = Gr, nn = zr, an = Xr, sn = Zr, on = en;
function b(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
b.prototype.clear = rn;
b.prototype.delete = nn;
b.prototype.get = an;
b.prototype.has = sn;
b.prototype.set = on;
var cn = b, ln = A, un = ot, fn = cn, hn = 200;
function pn(t, e) {
  var r = this.__data__;
  if (r instanceof ln) {
    var n = r.__data__;
    if (!un || n.length < hn - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new fn(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
var vn = pn, gn = A, dn = Qt, yn = ee, bn = ne, _n = ie, $n = vn;
function _(t) {
  var e = this.__data__ = new gn(t);
  this.size = e.size;
}
_.prototype.clear = dn;
_.prototype.delete = yn;
_.prototype.get = bn;
_.prototype.has = _n;
_.prototype.set = $n;
var mn = _, On = L, Tn = function() {
  try {
    var t = On(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), ct = Tn, z = ct;
function Sn(t, e, r) {
  e == "__proto__" && z ? z(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
var D = Sn, Cn = D, jn = j;
function Pn(t, e, r) {
  (r !== void 0 && !jn(t[e], r) || r === void 0 && !(e in t)) && Cn(t, e, r);
}
var lt = Pn;
function An(t) {
  return function(e, r, n) {
    for (var a = -1, s = Object(e), o = n(e), i = o.length; i--; ) {
      var c = o[t ? i : ++a];
      if (r(s[c], c, s) === !1)
        break;
    }
    return e;
  };
}
var wn = An, En = wn, kn = En(), xn = kn, T = { exports: {} };
T.exports;
(function(t, e) {
  var r = d, n = e && !e.nodeType && e, a = n && !0 && t && !t.nodeType && t, s = a && a.exports === n, o = s ? r.Buffer : void 0, i = o ? o.allocUnsafe : void 0;
  function c(u, f) {
    if (f)
      return u.slice();
    var h = u.length, v = i ? i(h) : new u.constructor(h);
    return u.copy(v), v;
  }
  t.exports = c;
})(T, T.exports);
var In = T.exports, Mn = d, Ln = Mn.Uint8Array, Dn = Ln, V = Dn;
function Fn(t) {
  var e = new t.constructor(t.byteLength);
  return new V(e).set(new V(t)), e;
}
var Hn = Fn, Gn = Hn;
function Rn(t, e) {
  var r = e ? Gn(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
var Un = Rn;
function Bn(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var Nn = Bn, Jn = p, K = Object.create, qn = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!Jn(e))
      return {};
    if (K)
      return K(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}(), zn = qn;
function Vn(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var Kn = Vn, Xn = Kn, Yn = Xn(Object.getPrototypeOf, Object), ut = Yn, Wn = Object.prototype;
function Zn(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || Wn;
  return t === r;
}
var ft = Zn, Qn = zn, ta = ut, ea = ft;
function ra(t) {
  return typeof t.constructor == "function" && !ea(t) ? Qn(ta(t)) : {};
}
var na = ra;
function aa(t) {
  return t != null && typeof t == "object";
}
var m = aa, ia = w, sa = m, oa = "[object Arguments]";
function ca(t) {
  return sa(t) && ia(t) == oa;
}
var la = ca, X = la, ua = m, ht = Object.prototype, fa = ht.hasOwnProperty, ha = ht.propertyIsEnumerable, pa = X(/* @__PURE__ */ function() {
  return arguments;
}()) ? X : function(t) {
  return ua(t) && fa.call(t, "callee") && !ha.call(t, "callee");
}, pt = pa, va = Array.isArray, vt = va, ga = 9007199254740991;
function da(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ga;
}
var gt = da, ya = M, ba = gt;
function _a(t) {
  return t != null && ba(t.length) && !ya(t);
}
var F = _a, $a = F, ma = m;
function Oa(t) {
  return ma(t) && $a(t);
}
var Ta = Oa, S = { exports: {} };
function Sa() {
  return !1;
}
var Ca = Sa;
S.exports;
(function(t, e) {
  var r = d, n = Ca, a = e && !e.nodeType && e, s = a && !0 && t && !t.nodeType && t, o = s && s.exports === a, i = o ? r.Buffer : void 0, c = i ? i.isBuffer : void 0, u = c || n;
  t.exports = u;
})(S, S.exports);
var dt = S.exports, ja = w, Pa = ut, Aa = m, wa = "[object Object]", Ea = Function.prototype, ka = Object.prototype, yt = Ea.toString, xa = ka.hasOwnProperty, Ia = yt.call(Object);
function Ma(t) {
  if (!Aa(t) || ja(t) != wa)
    return !1;
  var e = Pa(t);
  if (e === null)
    return !0;
  var r = xa.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && yt.call(r) == Ia;
}
var La = Ma, Da = w, Fa = gt, Ha = m, Ga = "[object Arguments]", Ra = "[object Array]", Ua = "[object Boolean]", Ba = "[object Date]", Na = "[object Error]", Ja = "[object Function]", qa = "[object Map]", za = "[object Number]", Va = "[object Object]", Ka = "[object RegExp]", Xa = "[object Set]", Ya = "[object String]", Wa = "[object WeakMap]", Za = "[object ArrayBuffer]", Qa = "[object DataView]", ti = "[object Float32Array]", ei = "[object Float64Array]", ri = "[object Int8Array]", ni = "[object Int16Array]", ai = "[object Int32Array]", ii = "[object Uint8Array]", si = "[object Uint8ClampedArray]", oi = "[object Uint16Array]", ci = "[object Uint32Array]", l = {};
l[ti] = l[ei] = l[ri] = l[ni] = l[ai] = l[ii] = l[si] = l[oi] = l[ci] = !0;
l[Ga] = l[Ra] = l[Za] = l[Ua] = l[Qa] = l[Ba] = l[Na] = l[Ja] = l[qa] = l[za] = l[Va] = l[Ka] = l[Xa] = l[Ya] = l[Wa] = !1;
function li(t) {
  return Ha(t) && Fa(t.length) && !!l[Da(t)];
}
var ui = li;
function fi(t) {
  return function(e) {
    return t(e);
  };
}
var hi = fi, C = { exports: {} };
C.exports;
(function(t, e) {
  var r = at, n = e && !e.nodeType && e, a = n && !0 && t && !t.nodeType && t, s = a && a.exports === n, o = s && r.process, i = function() {
    try {
      var c = a && a.require && a.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  t.exports = i;
})(C, C.exports);
var pi = C.exports, vi = ui, gi = hi, Y = pi, W = Y && Y.isTypedArray, di = W ? gi(W) : vi, bt = di;
function yi(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
var _t = yi, bi = D, _i = j, $i = Object.prototype, mi = $i.hasOwnProperty;
function Oi(t, e, r) {
  var n = t[e];
  (!(mi.call(t, e) && _i(n, r)) || r === void 0 && !(e in t)) && bi(t, e, r);
}
var Ti = Oi, Si = Ti, Ci = D;
function ji(t, e, r, n) {
  var a = !r;
  r || (r = {});
  for (var s = -1, o = e.length; ++s < o; ) {
    var i = e[s], c = n ? n(r[i], t[i], i, r, t) : void 0;
    c === void 0 && (c = t[i]), a ? Ci(r, i, c) : Si(r, i, c);
  }
  return r;
}
var Pi = ji;
function Ai(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var wi = Ai, Ei = 9007199254740991, ki = /^(?:0|[1-9]\d*)$/;
function xi(t, e) {
  var r = typeof t;
  return e = e ?? Ei, !!e && (r == "number" || r != "symbol" && ki.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var $t = xi, Ii = wi, Mi = pt, Li = vt, Di = dt, Fi = $t, Hi = bt, Gi = Object.prototype, Ri = Gi.hasOwnProperty;
function Ui(t, e) {
  var r = Li(t), n = !r && Mi(t), a = !r && !n && Di(t), s = !r && !n && !a && Hi(t), o = r || n || a || s, i = o ? Ii(t.length, String) : [], c = i.length;
  for (var u in t)
    (e || Ri.call(t, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Fi(u, c))) && i.push(u);
  return i;
}
var Bi = Ui;
function Ni(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var Ji = Ni, qi = p, zi = ft, Vi = Ji, Ki = Object.prototype, Xi = Ki.hasOwnProperty;
function Yi(t) {
  if (!qi(t))
    return Vi(t);
  var e = zi(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !Xi.call(t, n)) || r.push(n);
  return r;
}
var Wi = Yi, Zi = Bi, Qi = Wi, ts = F;
function es(t) {
  return ts(t) ? Zi(t, !0) : Qi(t);
}
var mt = es, rs = Pi, ns = mt;
function as(t) {
  return rs(t, ns(t));
}
var is = as, Z = lt, ss = In, os = Un, cs = Nn, ls = na, Q = pt, tt = vt, us = Ta, fs = dt, hs = M, ps = p, vs = La, gs = bt, et = _t, ds = is;
function ys(t, e, r, n, a, s, o) {
  var i = et(t, r), c = et(e, r), u = o.get(c);
  if (u) {
    Z(t, r, u);
    return;
  }
  var f = s ? s(i, c, r + "", t, e, o) : void 0, h = f === void 0;
  if (h) {
    var v = tt(c), x = !v && fs(c), H = !v && !x && gs(c);
    f = c, v || x || H ? tt(i) ? f = i : us(i) ? f = cs(i) : x ? (h = !1, f = ss(c, !0)) : H ? (h = !1, f = os(c, !0)) : f = [] : vs(c) || Q(c) ? (f = i, Q(i) ? f = ds(i) : (!ps(i) || hs(i)) && (f = ls(c))) : h = !1;
  }
  h && (o.set(c, f), a(f, c, n, s, o), o.delete(c)), Z(t, r, f);
}
var bs = ys, _s = mn, $s = lt, ms = xn, Os = bs, Ts = p, Ss = mt, Cs = _t;
function Ot(t, e, r, n, a) {
  t !== e && ms(e, function(s, o) {
    if (a || (a = new _s()), Ts(s))
      Os(t, e, o, r, Ot, n, a);
    else {
      var i = n ? n(Cs(t, o), s, o + "", t, e, a) : void 0;
      i === void 0 && (i = s), $s(t, o, i);
    }
  }, Ss);
}
var js = Ot;
function Ps(t) {
  return t;
}
var Tt = Ps;
function As(t, e, r) {
  switch (r.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, r[0]);
    case 2:
      return t.call(e, r[0], r[1]);
    case 3:
      return t.call(e, r[0], r[1], r[2]);
  }
  return t.apply(e, r);
}
var ws = As, Es = ws, rt = Math.max;
function ks(t, e, r) {
  return e = rt(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, a = -1, s = rt(n.length - e, 0), o = Array(s); ++a < s; )
      o[a] = n[e + a];
    a = -1;
    for (var i = Array(e + 1); ++a < e; )
      i[a] = n[a];
    return i[e] = r(o), Es(t, this, i);
  };
}
var xs = ks;
function Is(t) {
  return function() {
    return t;
  };
}
var Ms = Is, Ls = Ms, nt = ct, Ds = Tt, Fs = nt ? function(t, e) {
  return nt(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ls(e),
    writable: !0
  });
} : Ds, Hs = Fs, Gs = 800, Rs = 16, Us = Date.now;
function Bs(t) {
  var e = 0, r = 0;
  return function() {
    var n = Us(), a = Rs - (n - r);
    if (r = n, a > 0) {
      if (++e >= Gs)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var Ns = Bs, Js = Hs, qs = Ns, zs = qs(Js), Vs = zs, Ks = Tt, Xs = xs, Ys = Vs;
function Ws(t, e) {
  return Ys(Xs(t, e, Ks), t + "");
}
var Zs = Ws, Qs = j, to = F, eo = $t, ro = p;
function no(t, e, r) {
  if (!ro(r))
    return !1;
  var n = typeof e;
  return (n == "number" ? to(r) && eo(e, r.length) : n == "string" && e in r) ? Qs(r[e], t) : !1;
}
var ao = no, io = Zs, so = ao;
function oo(t) {
  return io(function(e, r) {
    var n = -1, a = r.length, s = a > 1 ? r[a - 1] : void 0, o = a > 2 ? r[2] : void 0;
    for (s = t.length > 3 && typeof s == "function" ? (a--, s) : void 0, o && so(r[0], r[1], o) && (s = a < 3 ? void 0 : s, a = 1), e = Object(e); ++n < a; ) {
      var i = r[n];
      i && t(e, i, n, s);
    }
    return e;
  });
}
var co = oo, lo = js, uo = co, fo = uo(function(t, e, r) {
  lo(t, e, r);
}), ho = fo;
const po = /* @__PURE__ */ jt(ho), vo = {
  linksEl: "[data-js-jumplinks-link]",
  labelEl: "[data-js-jumplinks-label]",
  containerEl: "[data-js-jumplinks-container]",
  sectionEl: "[data-js-jumplinks-section]",
  intersectionOptions: {
    root: null,
    // default is viewport
    rootMargin: "-50% 0px",
    threshhold: 0,
    callback: () => {
    }
  },
  hasScrollProgress: !0,
  scrollCustomProperty: "scrollprogress",
  attachCustomPropertyTo: null,
  stickyOffset: 0,
  unStickyOffset: 0,
  onSticky: () => {
  },
  onUnsticky: () => {
  }
};
class go {
  constructor(e, r) {
    const n = po(vo, r);
    this.rafTicking = !1, this.state = {
      isSticking: !1
    }, this.jumplinksEl = typeof e == "string" ? document.querySelector(e) : e, this.linksEl = typeof n.linksEl == "string" ? this.jumplinksEl.querySelectorAll(n.linksEl) : n.linksEl, this.labelEl = typeof n.labelEl == "string" ? this.jumplinksEl.querySelector(n.labelEl) : n.labelEl, this.containerEl = typeof n.containerEl == "string" ? document.querySelector(n.containerEl) : n.containerEl, this.intersectionOptions = n.intersectionOptions, this.sectionsEl = typeof n.sectionEl == "string" ? document.querySelectorAll(n.sectionEl) : n.sectionEl, this.sectionObserver = new IntersectionObserver(this.sectionIntersecting.bind(this), n.intersectionOptions), this.hasScrollProgress = n.hasScrollProgress, this.scrollCustomProperty = n.scrollCustomProperty, this.elToAttachScrollPropertyTo = this.getElementToAttachScrollPropertyTo(n), this.stickyOffset = n.stickyOffset, this.unStickyOffset = n.unStickyOffset, this.onSticky = n.onSticky, this.onUnsticky = n.onUnsticky, this.validateOptions();
  }
  /**
   * Simple validation of options
   */
  validateOptions() {
    if (this.jumplinksEl === null)
      throw 'Jumplinks: No matching DOM element for "jumplinkEl"';
    if (!this.linksEl.length)
      throw 'Jumplinks: No matching DOM elements for "linksEl"';
    if (this.containerEl === null)
      throw 'Jumplinks: No matching DOM element for "containerEl"';
    if (this.labelEl === null)
      throw 'Jumplinks: No matching DOM element for "labelEl"';
    if (!this.sectionsEl.length)
      throw 'Jumplinks: No matching DOM elements for "sectionsEl"';
    if (typeof this.scrollCustomProperty != "string" || this.scrollCustomProperty.length <= 0)
      throw 'Jumplinks: please specify a valid string for "scrollCustomProperty" exluding the "--" part';
    if (typeof this.stickyOffset != "number")
      throw 'Jumplinks: please specify a valid number for "stickyOffset"';
    if (typeof this.unStickyOffset != "number")
      throw 'Jumplinks: please specify a valid number for "unStickyOffset"';
    if (typeof this.onSticky != "function")
      throw 'Jumplinks: please specify a valid function for "onSticky"';
    if (typeof this.onUnsticky != "function")
      throw 'Jumplinks: please specify a valid function for "onUnsticky"';
  }
  /**
   * Set jumplinks section to first content item if intersection observer hasn't fired
   */
  setFirstJumplinksSectionLabel() {
    const e = this.sectionsEl[0].getAttribute("data-js-jumplinks-section-label");
    this.labelEl.innerText = e;
  }
  /**
   * Called whenever a jumplink section triggers the intersection observer
   */
  sectionIntersecting(e) {
    e.forEach((r) => {
      if (r.isIntersecting) {
        const n = r.target.getAttribute("data-js-jumplinks-section-label");
        this.labelEl.innerText = n, this.intersectionOptions.callback && typeof this.intersectionOptions.callback == "function" && this.intersectionOptions.callback(r);
      }
    });
  }
  /**
   * Returns containerEl height
   * @return {number} height
   */
  get getContainerHeight() {
    return this.containerEl.offsetHeight;
  }
  /**
   * Returns top position of the container relative to viewport
   * @return {number} distance from top of viewport to containerEl top
   */
  get getContainerTop() {
    return this.containerEl.getBoundingClientRect().top;
  }
  scrollToHash() {
    if (!window.location.hash) return;
    const e = document.querySelector(window.location.hash), r = this.jumplinksEl.offsetHeight;
    G(e, r, !1);
  }
  hasReachedJumplinksContainerTop() {
    return this.getContainerTop + this.stickyOffset <= 0;
  }
  hasReachedJumplinksContainerBottom() {
    return this.getContainerTop + this.getContainerHeight + this.unStickyOffset <= 0;
  }
  setScrollProgress() {
    if (this.hasScrollProgress === !1) return;
    const e = document.documentElement.scrollTop, n = this.containerEl.getBoundingClientRect().top + e, a = this.getContainerHeight, o = (Math.max(0, Math.min(1, (e - n) / a)) * 100).toFixed(2);
    this.setScrollCustomProperty(o + "%");
  }
  onLinkClick(e) {
    e.preventDefault();
    const n = e.currentTarget.getAttribute("href"), a = document.querySelector(n), s = this.jumplinksEl.offsetHeight;
    G(a, s, !0), St(n);
  }
  onScroll() {
    this.rafTicking || (window.requestAnimationFrame(() => {
      if (this.rafTicking = !1, this.setScrollProgress(), this.hasReachedJumplinksContainerTop() && !this.hasReachedJumplinksContainerBottom()) {
        if (this.state.isSticking) return;
        this.onSticky(), this.state.isSticking = !0;
      } else {
        if (!this.state.isSticking) return;
        this.onUnsticky(), this.state.isSticking = !1;
      }
    }), this.rafTicking = !0);
  }
  /**
   * @type {Object} the options used when configuring the module
   * @returns {HTMLElement}
   */
  getElementToAttachScrollPropertyTo(e) {
    return e.attachCustomPropertyTo ? typeof e.attachCustomPropertyTo == "string" ? document.querySelector(e.attachCustomPropertyTo) : e.attachCustomPropertyTo : this.jumplinksEl;
  }
  setScrollCustomProperty(e = "0%") {
    this.hasScrollProgress !== !1 && this.elToAttachScrollPropertyTo.style.setProperty(`--${this.scrollCustomProperty}`, e);
  }
  eventhandlers() {
    window.addEventListener("load", () => {
      this.scrollToHash();
    }), this.linksEl.forEach((e) => {
      e.addEventListener("click", this.onLinkClick.bind(this));
    }), window.addEventListener("scroll", this.onScroll.bind(this));
  }
  init() {
    this.setFirstJumplinksSectionLabel(), this.setScrollCustomProperty(), this.eventhandlers(), this.sectionsEl.forEach((e) => {
      this.sectionObserver.observe(e);
    });
  }
}
export {
  go as Jumplinks
};

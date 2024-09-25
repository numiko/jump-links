var O = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function St(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Ct() {
  this.__data__ = [], this.size = 0;
}
var jt = Ct;
function Et(t, e) {
  return t === e || t !== t && e !== e;
}
var j = Et, kt = j;
function Pt(t, e) {
  for (var r = t.length; r--; )
    if (kt(t[r][0], e))
      return r;
  return -1;
}
var E = Pt, wt = E, At = Array.prototype, xt = At.splice;
function It(t) {
  var e = this.__data__, r = wt(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : xt.call(e, r, 1), --this.size, !0;
}
var Mt = It, Lt = E;
function Dt(t) {
  var e = this.__data__, r = Lt(e, t);
  return r < 0 ? void 0 : e[r][1];
}
var Ft = Dt, Ht = E;
function Gt(t) {
  return Ht(this.__data__, t) > -1;
}
var Rt = Gt, Ut = E;
function Nt(t, e) {
  var r = this.__data__, n = Ut(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
var Bt = Nt, Vt = jt, Jt = Mt, qt = Ft, zt = Rt, Kt = Bt;
function g(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
g.prototype.clear = Vt;
g.prototype.delete = Jt;
g.prototype.get = qt;
g.prototype.has = zt;
g.prototype.set = Kt;
var k = g, Xt = k;
function Yt() {
  this.__data__ = new Xt(), this.size = 0;
}
var Wt = Yt;
function Zt(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
var Qt = Zt;
function te(t) {
  return this.__data__.get(t);
}
var ee = te;
function re(t) {
  return this.__data__.has(t);
}
var ne = re, ae = typeof O == "object" && O && O.Object === Object && O, at = ae, ie = at, se = typeof self == "object" && self && self.Object === Object && self, oe = ie || se || Function("return this")(), d = oe, ce = d, le = ce.Symbol, it = le, G = it, st = Object.prototype, ue = st.hasOwnProperty, fe = st.toString, $ = G ? G.toStringTag : void 0;
function he(t) {
  var e = ue.call(t, $), r = t[$];
  try {
    t[$] = void 0;
    var n = !0;
  } catch {
  }
  var a = fe.call(t);
  return n && (e ? t[$] = r : delete t[$]), a;
}
var pe = he, ve = Object.prototype, ge = ve.toString;
function de(t) {
  return ge.call(t);
}
var ye = de, R = it, be = pe, _e = ye, $e = "[object Null]", me = "[object Undefined]", U = R ? R.toStringTag : void 0;
function Oe(t) {
  return t == null ? t === void 0 ? me : $e : U && U in Object(t) ? be(t) : _e(t);
}
var P = Oe;
function Te(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var p = Te, Se = P, Ce = p, je = "[object AsyncFunction]", Ee = "[object Function]", ke = "[object GeneratorFunction]", Pe = "[object Proxy]";
function we(t) {
  if (!Ce(t))
    return !1;
  var e = Se(t);
  return e == Ee || e == ke || e == je || e == Pe;
}
var M = we, Ae = d, xe = Ae["__core-js_shared__"], Ie = xe, I = Ie, N = function() {
  var t = /[^.]+$/.exec(I && I.keys && I.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Me(t) {
  return !!N && N in t;
}
var Le = Me, De = Function.prototype, Fe = De.toString;
function He(t) {
  if (t != null) {
    try {
      return Fe.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Ge = He, Re = M, Ue = Le, Ne = p, Be = Ge, Ve = /[\\^$.*+?()[\]{}|]/g, Je = /^\[object .+?Constructor\]$/, qe = Function.prototype, ze = Object.prototype, Ke = qe.toString, Xe = ze.hasOwnProperty, Ye = RegExp(
  "^" + Ke.call(Xe).replace(Ve, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function We(t) {
  if (!Ne(t) || Ue(t))
    return !1;
  var e = Re(t) ? Ye : Je;
  return e.test(Be(t));
}
var Ze = We;
function Qe(t, e) {
  return t == null ? void 0 : t[e];
}
var tr = Qe, er = Ze, rr = tr;
function nr(t, e) {
  var r = rr(t, e);
  return er(r) ? r : void 0;
}
var L = nr, ar = L, ir = d, sr = ar(ir, "Map"), ot = sr, or = L, cr = or(Object, "create"), w = cr, B = w;
function lr() {
  this.__data__ = B ? B(null) : {}, this.size = 0;
}
var ur = lr;
function fr(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var hr = fr, pr = w, vr = "__lodash_hash_undefined__", gr = Object.prototype, dr = gr.hasOwnProperty;
function yr(t) {
  var e = this.__data__;
  if (pr) {
    var r = e[t];
    return r === vr ? void 0 : r;
  }
  return dr.call(e, t) ? e[t] : void 0;
}
var br = yr, _r = w, $r = Object.prototype, mr = $r.hasOwnProperty;
function Or(t) {
  var e = this.__data__;
  return _r ? e[t] !== void 0 : mr.call(e, t);
}
var Tr = Or, Sr = w, Cr = "__lodash_hash_undefined__";
function jr(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Sr && e === void 0 ? Cr : e, this;
}
var Er = jr, kr = ur, Pr = hr, wr = br, Ar = Tr, xr = Er;
function y(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
y.prototype.clear = kr;
y.prototype.delete = Pr;
y.prototype.get = wr;
y.prototype.has = Ar;
y.prototype.set = xr;
var Ir = y, V = Ir, Mr = k, Lr = ot;
function Dr() {
  this.size = 0, this.__data__ = {
    hash: new V(),
    map: new (Lr || Mr)(),
    string: new V()
  };
}
var Fr = Dr;
function Hr(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
var Gr = Hr, Rr = Gr;
function Ur(t, e) {
  var r = t.__data__;
  return Rr(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
var A = Ur, Nr = A;
function Br(t) {
  var e = Nr(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
var Vr = Br, Jr = A;
function qr(t) {
  return Jr(this, t).get(t);
}
var zr = qr, Kr = A;
function Xr(t) {
  return Kr(this, t).has(t);
}
var Yr = Xr, Wr = A;
function Zr(t, e) {
  var r = Wr(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
var Qr = Zr, tn = Fr, en = Vr, rn = zr, nn = Yr, an = Qr;
function b(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
b.prototype.clear = tn;
b.prototype.delete = en;
b.prototype.get = rn;
b.prototype.has = nn;
b.prototype.set = an;
var sn = b, on = k, cn = ot, ln = sn, un = 200;
function fn(t, e) {
  var r = this.__data__;
  if (r instanceof on) {
    var n = r.__data__;
    if (!cn || n.length < un - 1)
      return n.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new ln(n);
  }
  return r.set(t, e), this.size = r.size, this;
}
var hn = fn, pn = k, vn = Wt, gn = Qt, dn = ee, yn = ne, bn = hn;
function _(t) {
  var e = this.__data__ = new pn(t);
  this.size = e.size;
}
_.prototype.clear = vn;
_.prototype.delete = gn;
_.prototype.get = dn;
_.prototype.has = yn;
_.prototype.set = bn;
var _n = _, $n = L, mn = function() {
  try {
    var t = $n(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), ct = mn, J = ct;
function On(t, e, r) {
  e == "__proto__" && J ? J(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
var D = On, Tn = D, Sn = j;
function Cn(t, e, r) {
  (r !== void 0 && !Sn(t[e], r) || r === void 0 && !(e in t)) && Tn(t, e, r);
}
var lt = Cn;
function jn(t) {
  return function(e, r, n) {
    for (var a = -1, s = Object(e), o = n(e), i = o.length; i--; ) {
      var c = o[t ? i : ++a];
      if (r(s[c], c, s) === !1)
        break;
    }
    return e;
  };
}
var En = jn, kn = En, Pn = kn(), wn = Pn, T = { exports: {} };
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
var An = T.exports, xn = d, In = xn.Uint8Array, Mn = In, q = Mn;
function Ln(t) {
  var e = new t.constructor(t.byteLength);
  return new q(e).set(new q(t)), e;
}
var Dn = Ln, Fn = Dn;
function Hn(t, e) {
  var r = e ? Fn(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
var Gn = Hn;
function Rn(t, e) {
  var r = -1, n = t.length;
  for (e || (e = Array(n)); ++r < n; )
    e[r] = t[r];
  return e;
}
var Un = Rn, Nn = p, z = Object.create, Bn = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!Nn(e))
      return {};
    if (z)
      return z(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}(), Vn = Bn;
function Jn(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var qn = Jn, zn = qn, Kn = zn(Object.getPrototypeOf, Object), ut = Kn, Xn = Object.prototype;
function Yn(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || Xn;
  return t === r;
}
var ft = Yn, Wn = Vn, Zn = ut, Qn = ft;
function ta(t) {
  return typeof t.constructor == "function" && !Qn(t) ? Wn(Zn(t)) : {};
}
var ea = ta;
function ra(t) {
  return t != null && typeof t == "object";
}
var m = ra, na = P, aa = m, ia = "[object Arguments]";
function sa(t) {
  return aa(t) && na(t) == ia;
}
var oa = sa, K = oa, ca = m, ht = Object.prototype, la = ht.hasOwnProperty, ua = ht.propertyIsEnumerable, fa = K(/* @__PURE__ */ function() {
  return arguments;
}()) ? K : function(t) {
  return ca(t) && la.call(t, "callee") && !ua.call(t, "callee");
}, pt = fa, ha = Array.isArray, vt = ha, pa = 9007199254740991;
function va(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= pa;
}
var gt = va, ga = M, da = gt;
function ya(t) {
  return t != null && da(t.length) && !ga(t);
}
var F = ya, ba = F, _a = m;
function $a(t) {
  return _a(t) && ba(t);
}
var ma = $a, S = { exports: {} };
function Oa() {
  return !1;
}
var Ta = Oa;
S.exports;
(function(t, e) {
  var r = d, n = Ta, a = e && !e.nodeType && e, s = a && !0 && t && !t.nodeType && t, o = s && s.exports === a, i = o ? r.Buffer : void 0, c = i ? i.isBuffer : void 0, u = c || n;
  t.exports = u;
})(S, S.exports);
var dt = S.exports, Sa = P, Ca = ut, ja = m, Ea = "[object Object]", ka = Function.prototype, Pa = Object.prototype, yt = ka.toString, wa = Pa.hasOwnProperty, Aa = yt.call(Object);
function xa(t) {
  if (!ja(t) || Sa(t) != Ea)
    return !1;
  var e = Ca(t);
  if (e === null)
    return !0;
  var r = wa.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && yt.call(r) == Aa;
}
var Ia = xa, Ma = P, La = gt, Da = m, Fa = "[object Arguments]", Ha = "[object Array]", Ga = "[object Boolean]", Ra = "[object Date]", Ua = "[object Error]", Na = "[object Function]", Ba = "[object Map]", Va = "[object Number]", Ja = "[object Object]", qa = "[object RegExp]", za = "[object Set]", Ka = "[object String]", Xa = "[object WeakMap]", Ya = "[object ArrayBuffer]", Wa = "[object DataView]", Za = "[object Float32Array]", Qa = "[object Float64Array]", ti = "[object Int8Array]", ei = "[object Int16Array]", ri = "[object Int32Array]", ni = "[object Uint8Array]", ai = "[object Uint8ClampedArray]", ii = "[object Uint16Array]", si = "[object Uint32Array]", l = {};
l[Za] = l[Qa] = l[ti] = l[ei] = l[ri] = l[ni] = l[ai] = l[ii] = l[si] = !0;
l[Fa] = l[Ha] = l[Ya] = l[Ga] = l[Wa] = l[Ra] = l[Ua] = l[Na] = l[Ba] = l[Va] = l[Ja] = l[qa] = l[za] = l[Ka] = l[Xa] = !1;
function oi(t) {
  return Da(t) && La(t.length) && !!l[Ma(t)];
}
var ci = oi;
function li(t) {
  return function(e) {
    return t(e);
  };
}
var ui = li, C = { exports: {} };
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
var fi = C.exports, hi = ci, pi = ui, X = fi, Y = X && X.isTypedArray, vi = Y ? pi(Y) : hi, bt = vi;
function gi(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
var _t = gi, di = D, yi = j, bi = Object.prototype, _i = bi.hasOwnProperty;
function $i(t, e, r) {
  var n = t[e];
  (!(_i.call(t, e) && yi(n, r)) || r === void 0 && !(e in t)) && di(t, e, r);
}
var mi = $i, Oi = mi, Ti = D;
function Si(t, e, r, n) {
  var a = !r;
  r || (r = {});
  for (var s = -1, o = e.length; ++s < o; ) {
    var i = e[s], c = n ? n(r[i], t[i], i, r, t) : void 0;
    c === void 0 && (c = t[i]), a ? Ti(r, i, c) : Oi(r, i, c);
  }
  return r;
}
var Ci = Si;
function ji(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var Ei = ji, ki = 9007199254740991, Pi = /^(?:0|[1-9]\d*)$/;
function wi(t, e) {
  var r = typeof t;
  return e = e ?? ki, !!e && (r == "number" || r != "symbol" && Pi.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var $t = wi, Ai = Ei, xi = pt, Ii = vt, Mi = dt, Li = $t, Di = bt, Fi = Object.prototype, Hi = Fi.hasOwnProperty;
function Gi(t, e) {
  var r = Ii(t), n = !r && xi(t), a = !r && !n && Mi(t), s = !r && !n && !a && Di(t), o = r || n || a || s, i = o ? Ai(t.length, String) : [], c = i.length;
  for (var u in t)
    (e || Hi.call(t, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Li(u, c))) && i.push(u);
  return i;
}
var Ri = Gi;
function Ui(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var Ni = Ui, Bi = p, Vi = ft, Ji = Ni, qi = Object.prototype, zi = qi.hasOwnProperty;
function Ki(t) {
  if (!Bi(t))
    return Ji(t);
  var e = Vi(t), r = [];
  for (var n in t)
    n == "constructor" && (e || !zi.call(t, n)) || r.push(n);
  return r;
}
var Xi = Ki, Yi = Ri, Wi = Xi, Zi = F;
function Qi(t) {
  return Zi(t) ? Yi(t, !0) : Wi(t);
}
var mt = Qi, ts = Ci, es = mt;
function rs(t) {
  return ts(t, es(t));
}
var ns = rs, W = lt, as = An, is = Gn, ss = Un, os = ea, Z = pt, Q = vt, cs = ma, ls = dt, us = M, fs = p, hs = Ia, ps = bt, tt = _t, vs = ns;
function gs(t, e, r, n, a, s, o) {
  var i = tt(t, r), c = tt(e, r), u = o.get(c);
  if (u) {
    W(t, r, u);
    return;
  }
  var f = s ? s(i, c, r + "", t, e, o) : void 0, h = f === void 0;
  if (h) {
    var v = Q(c), x = !v && ls(c), H = !v && !x && ps(c);
    f = c, v || x || H ? Q(i) ? f = i : cs(i) ? f = ss(i) : x ? (h = !1, f = as(c, !0)) : H ? (h = !1, f = is(c, !0)) : f = [] : hs(c) || Z(c) ? (f = i, Z(i) ? f = vs(i) : (!fs(i) || us(i)) && (f = os(c))) : h = !1;
  }
  h && (o.set(c, f), a(f, c, n, s, o), o.delete(c)), W(t, r, f);
}
var ds = gs, ys = _n, bs = lt, _s = wn, $s = ds, ms = p, Os = mt, Ts = _t;
function Ot(t, e, r, n, a) {
  t !== e && _s(e, function(s, o) {
    if (a || (a = new ys()), ms(s))
      $s(t, e, o, r, Ot, n, a);
    else {
      var i = n ? n(Ts(t, o), s, o + "", t, e, a) : void 0;
      i === void 0 && (i = s), bs(t, o, i);
    }
  }, Os);
}
var Ss = Ot;
function Cs(t) {
  return t;
}
var Tt = Cs;
function js(t, e, r) {
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
var Es = js, ks = Es, et = Math.max;
function Ps(t, e, r) {
  return e = et(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, a = -1, s = et(n.length - e, 0), o = Array(s); ++a < s; )
      o[a] = n[e + a];
    a = -1;
    for (var i = Array(e + 1); ++a < e; )
      i[a] = n[a];
    return i[e] = r(o), ks(t, this, i);
  };
}
var ws = Ps;
function As(t) {
  return function() {
    return t;
  };
}
var xs = As, Is = xs, rt = ct, Ms = Tt, Ls = rt ? function(t, e) {
  return rt(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Is(e),
    writable: !0
  });
} : Ms, Ds = Ls, Fs = 800, Hs = 16, Gs = Date.now;
function Rs(t) {
  var e = 0, r = 0;
  return function() {
    var n = Gs(), a = Hs - (n - r);
    if (r = n, a > 0) {
      if (++e >= Fs)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var Us = Rs, Ns = Ds, Bs = Us, Vs = Bs(Ns), Js = Vs, qs = Tt, zs = ws, Ks = Js;
function Xs(t, e) {
  return Ks(zs(t, e, qs), t + "");
}
var Ys = Xs, Ws = j, Zs = F, Qs = $t, to = p;
function eo(t, e, r) {
  if (!to(r))
    return !1;
  var n = typeof e;
  return (n == "number" ? Zs(r) && Qs(e, r.length) : n == "string" && e in r) ? Ws(r[e], t) : !1;
}
var ro = eo, no = Ys, ao = ro;
function io(t) {
  return no(function(e, r) {
    var n = -1, a = r.length, s = a > 1 ? r[a - 1] : void 0, o = a > 2 ? r[2] : void 0;
    for (s = t.length > 3 && typeof s == "function" ? (a--, s) : void 0, o && ao(r[0], r[1], o) && (s = a < 3 ? void 0 : s, a = 1), e = Object(e); ++n < a; ) {
      var i = r[n];
      i && t(e, i, n, s);
    }
    return e;
  });
}
var so = io, oo = Ss, co = so, lo = co(function(t, e, r) {
  oo(t, e, r);
}), uo = lo;
const fo = /* @__PURE__ */ St(uo);
function ho(t = document) {
  return !![...document.querySelectorAll("a, button, input, textarea, select, details, [tabindex]")].includes(t);
}
function nt(t, e = 0, r = !1) {
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
  window.scrollTo(o), ho(t) ? t.focus({ preventScroll: !0 }) : (t.setAttribute("tabindex", "-1"), t.focus({ preventScroll: !0 }));
}
function po(t) {
  history.pushState ? history.pushState(null, null, t) : location.hash = t;
}
const vo = {
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
  },
  customOffsetValue: null,
  customOffsetEl: null,
  onLinkClicked: () => {
  }
};
class go {
  constructor(e, r) {
    const n = fo(vo, r);
    this.rafTicking = !1, this.state = {
      isSticking: !1
    }, this.jumplinksEl = typeof e == "string" ? document.querySelector(e) : e, this.linksEl = typeof n.linksEl == "string" ? this.jumplinksEl.querySelectorAll(n.linksEl) : n.linksEl, this.labelEl = typeof n.labelEl == "string" ? this.jumplinksEl.querySelector(n.labelEl) : n.labelEl, this.containerEl = typeof n.containerEl == "string" ? document.querySelector(n.containerEl) : n.containerEl, this.intersectionOptions = n.intersectionOptions, this.sectionsEl = typeof n.sectionEl == "string" ? document.querySelectorAll(n.sectionEl) : n.sectionEl, this.sectionObserver = new IntersectionObserver(this.sectionIntersecting.bind(this), n.intersectionOptions), this.hasScrollProgress = n.hasScrollProgress, this.scrollCustomProperty = n.scrollCustomProperty, this.elToAttachScrollPropertyTo = this.getElementToAttachScrollPropertyTo(n), this.stickyOffset = n.stickyOffset, this.unStickyOffset = n.unStickyOffset, this.onSticky = n.onSticky, this.onUnsticky = n.onUnsticky, this.customOffsetValue = n.customOffsetValue, this.customOffsetEl = typeof n.customOffsetEl == "string" ? document.querySelector(n.customOffsetEl) : n.customOffsetEl || this.jumplinksEl, this.onLinkClicked = n.onLinkClicked, this.validateOptions();
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
    if (typeof this.customOffsetValue != "number" && this.customOffsetValue !== null)
      throw 'Jumplinks: please specify a valid number for "customOffsetValue"';
    if (typeof this.customOffsetEl != "string" && !(this.customOffsetEl instanceof HTMLElement))
      throw 'Jumplinks: No matching DOM element for "customOffsetEl"';
    if (typeof this.onLinkClicked != "function")
      throw 'Jumplinks: please specify a valid function for "onLinkClicked"';
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
    var n;
    if (!window.location.hash) return;
    const e = document.querySelector(window.location.hash), r = this.customOffsetValue || ((n = this.customOffsetEl) == null ? void 0 : n.offsetHeight);
    nt(e, r, !1);
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
    var o;
    e.preventDefault();
    const n = e.currentTarget.getAttribute("href"), a = document.querySelector(n), s = this.customOffsetValue || ((o = this.customOffsetEl) == null ? void 0 : o.offsetHeight);
    nt(a, s, !0), this.onLinkClicked(), po(n);
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

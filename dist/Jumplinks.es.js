var O = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function St(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Ct() {
  this.__data__ = [], this.size = 0;
}
var jt = Ct;
function Pt(t, e) {
  return t === e || t !== t && e !== e;
}
var j = Pt, wt = j;
function At(t, e) {
  for (var r = t.length; r--; )
    if (wt(t[r][0], e))
      return r;
  return -1;
}
var P = At, Et = P, kt = Array.prototype, xt = kt.splice;
function It(t) {
  var e = this.__data__, r = Et(e, t);
  if (r < 0)
    return !1;
  var a = e.length - 1;
  return r == a ? e.pop() : xt.call(e, r, 1), --this.size, !0;
}
var Mt = It, Lt = P;
function Dt(t) {
  var e = this.__data__, r = Lt(e, t);
  return r < 0 ? void 0 : e[r][1];
}
var Ft = Dt, Ht = P;
function Gt(t) {
  return Ht(this.__data__, t) > -1;
}
var Rt = Gt, Ut = P;
function Bt(t, e) {
  var r = this.__data__, a = Ut(r, t);
  return a < 0 ? (++this.size, r.push([t, e])) : r[a][1] = e, this;
}
var Nt = Bt, Vt = jt, Jt = Mt, qt = Ft, zt = Rt, Kt = Nt;
function g(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var a = t[e];
    this.set(a[0], a[1]);
  }
}
g.prototype.clear = Vt;
g.prototype.delete = Jt;
g.prototype.get = qt;
g.prototype.has = zt;
g.prototype.set = Kt;
var w = g, Xt = w;
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
var ae = re, ne = typeof O == "object" && O && O.Object === Object && O, nt = ne, ie = nt, se = typeof self == "object" && self && self.Object === Object && self, oe = ie || se || Function("return this")(), d = oe, ce = d, le = ce.Symbol, it = le, G = it, st = Object.prototype, ue = st.hasOwnProperty, fe = st.toString, $ = G ? G.toStringTag : void 0;
function he(t) {
  var e = ue.call(t, $), r = t[$];
  try {
    t[$] = void 0;
    var a = !0;
  } catch {
  }
  var n = fe.call(t);
  return a && (e ? t[$] = r : delete t[$]), n;
}
var pe = he, ve = Object.prototype, ge = ve.toString;
function de(t) {
  return ge.call(t);
}
var ye = de, R = it, _e = pe, be = ye, $e = "[object Null]", me = "[object Undefined]", U = R ? R.toStringTag : void 0;
function Oe(t) {
  return t == null ? t === void 0 ? me : $e : U && U in Object(t) ? _e(t) : be(t);
}
var A = Oe;
function Te(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var p = Te, Se = A, Ce = p, je = "[object AsyncFunction]", Pe = "[object Function]", we = "[object GeneratorFunction]", Ae = "[object Proxy]";
function Ee(t) {
  if (!Ce(t))
    return !1;
  var e = Se(t);
  return e == Pe || e == we || e == je || e == Ae;
}
var M = Ee, ke = d, xe = ke["__core-js_shared__"], Ie = xe, I = Ie, B = function() {
  var t = /[^.]+$/.exec(I && I.keys && I.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Me(t) {
  return !!B && B in t;
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
var Ge = He, Re = M, Ue = Le, Be = p, Ne = Ge, Ve = /[\\^$.*+?()[\]{}|]/g, Je = /^\[object .+?Constructor\]$/, qe = Function.prototype, ze = Object.prototype, Ke = qe.toString, Xe = ze.hasOwnProperty, Ye = RegExp(
  "^" + Ke.call(Xe).replace(Ve, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function We(t) {
  if (!Be(t) || Ue(t))
    return !1;
  var e = Re(t) ? Ye : Je;
  return e.test(Ne(t));
}
var Ze = We;
function Qe(t, e) {
  return t == null ? void 0 : t[e];
}
var tr = Qe, er = Ze, rr = tr;
function ar(t, e) {
  var r = rr(t, e);
  return er(r) ? r : void 0;
}
var L = ar, nr = L, ir = d, sr = nr(ir, "Map"), ot = sr, or = L, cr = or(Object, "create"), E = cr, N = E;
function lr() {
  this.__data__ = N ? N(null) : {}, this.size = 0;
}
var ur = lr;
function fr(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var hr = fr, pr = E, vr = "__lodash_hash_undefined__", gr = Object.prototype, dr = gr.hasOwnProperty;
function yr(t) {
  var e = this.__data__;
  if (pr) {
    var r = e[t];
    return r === vr ? void 0 : r;
  }
  return dr.call(e, t) ? e[t] : void 0;
}
var _r = yr, br = E, $r = Object.prototype, mr = $r.hasOwnProperty;
function Or(t) {
  var e = this.__data__;
  return br ? e[t] !== void 0 : mr.call(e, t);
}
var Tr = Or, Sr = E, Cr = "__lodash_hash_undefined__";
function jr(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Sr && e === void 0 ? Cr : e, this;
}
var Pr = jr, wr = ur, Ar = hr, Er = _r, kr = Tr, xr = Pr;
function y(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var a = t[e];
    this.set(a[0], a[1]);
  }
}
y.prototype.clear = wr;
y.prototype.delete = Ar;
y.prototype.get = Er;
y.prototype.has = kr;
y.prototype.set = xr;
var Ir = y, V = Ir, Mr = w, Lr = ot;
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
var k = Ur, Br = k;
function Nr(t) {
  var e = Br(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
var Vr = Nr, Jr = k;
function qr(t) {
  return Jr(this, t).get(t);
}
var zr = qr, Kr = k;
function Xr(t) {
  return Kr(this, t).has(t);
}
var Yr = Xr, Wr = k;
function Zr(t, e) {
  var r = Wr(this, t), a = r.size;
  return r.set(t, e), this.size += r.size == a ? 0 : 1, this;
}
var Qr = Zr, ta = Fr, ea = Vr, ra = zr, aa = Yr, na = Qr;
function _(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var a = t[e];
    this.set(a[0], a[1]);
  }
}
_.prototype.clear = ta;
_.prototype.delete = ea;
_.prototype.get = ra;
_.prototype.has = aa;
_.prototype.set = na;
var ia = _, sa = w, oa = ot, ca = ia, la = 200;
function ua(t, e) {
  var r = this.__data__;
  if (r instanceof sa) {
    var a = r.__data__;
    if (!oa || a.length < la - 1)
      return a.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new ca(a);
  }
  return r.set(t, e), this.size = r.size, this;
}
var fa = ua, ha = w, pa = Wt, va = Qt, ga = ee, da = ae, ya = fa;
function b(t) {
  var e = this.__data__ = new ha(t);
  this.size = e.size;
}
b.prototype.clear = pa;
b.prototype.delete = va;
b.prototype.get = ga;
b.prototype.has = da;
b.prototype.set = ya;
var _a = b, ba = L, $a = function() {
  try {
    var t = ba(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), ct = $a, J = ct;
function ma(t, e, r) {
  e == "__proto__" && J ? J(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
var D = ma, Oa = D, Ta = j;
function Sa(t, e, r) {
  (r !== void 0 && !Ta(t[e], r) || r === void 0 && !(e in t)) && Oa(t, e, r);
}
var lt = Sa;
function Ca(t) {
  return function(e, r, a) {
    for (var n = -1, s = Object(e), o = a(e), i = o.length; i--; ) {
      var c = o[t ? i : ++n];
      if (r(s[c], c, s) === !1)
        break;
    }
    return e;
  };
}
var ja = Ca, Pa = ja, wa = Pa(), Aa = wa, T = { exports: {} };
T.exports;
(function(t, e) {
  var r = d, a = e && !e.nodeType && e, n = a && !0 && t && !t.nodeType && t, s = n && n.exports === a, o = s ? r.Buffer : void 0, i = o ? o.allocUnsafe : void 0;
  function c(u, f) {
    if (f)
      return u.slice();
    var h = u.length, v = i ? i(h) : new u.constructor(h);
    return u.copy(v), v;
  }
  t.exports = c;
})(T, T.exports);
var Ea = T.exports, ka = d, xa = ka.Uint8Array, Ia = xa, q = Ia;
function Ma(t) {
  var e = new t.constructor(t.byteLength);
  return new q(e).set(new q(t)), e;
}
var La = Ma, Da = La;
function Fa(t, e) {
  var r = e ? Da(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
var Ha = Fa;
function Ga(t, e) {
  var r = -1, a = t.length;
  for (e || (e = Array(a)); ++r < a; )
    e[r] = t[r];
  return e;
}
var Ra = Ga, Ua = p, z = Object.create, Ba = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!Ua(e))
      return {};
    if (z)
      return z(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}(), Na = Ba;
function Va(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var Ja = Va, qa = Ja, za = qa(Object.getPrototypeOf, Object), ut = za, Ka = Object.prototype;
function Xa(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || Ka;
  return t === r;
}
var ft = Xa, Ya = Na, Wa = ut, Za = ft;
function Qa(t) {
  return typeof t.constructor == "function" && !Za(t) ? Ya(Wa(t)) : {};
}
var tn = Qa;
function en(t) {
  return t != null && typeof t == "object";
}
var m = en, rn = A, an = m, nn = "[object Arguments]";
function sn(t) {
  return an(t) && rn(t) == nn;
}
var on = sn, K = on, cn = m, ht = Object.prototype, ln = ht.hasOwnProperty, un = ht.propertyIsEnumerable, fn = K(/* @__PURE__ */ function() {
  return arguments;
}()) ? K : function(t) {
  return cn(t) && ln.call(t, "callee") && !un.call(t, "callee");
}, pt = fn, hn = Array.isArray, vt = hn, pn = 9007199254740991;
function vn(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= pn;
}
var gt = vn, gn = M, dn = gt;
function yn(t) {
  return t != null && dn(t.length) && !gn(t);
}
var F = yn, _n = F, bn = m;
function $n(t) {
  return bn(t) && _n(t);
}
var mn = $n, S = { exports: {} };
function On() {
  return !1;
}
var Tn = On;
S.exports;
(function(t, e) {
  var r = d, a = Tn, n = e && !e.nodeType && e, s = n && !0 && t && !t.nodeType && t, o = s && s.exports === n, i = o ? r.Buffer : void 0, c = i ? i.isBuffer : void 0, u = c || a;
  t.exports = u;
})(S, S.exports);
var dt = S.exports, Sn = A, Cn = ut, jn = m, Pn = "[object Object]", wn = Function.prototype, An = Object.prototype, yt = wn.toString, En = An.hasOwnProperty, kn = yt.call(Object);
function xn(t) {
  if (!jn(t) || Sn(t) != Pn)
    return !1;
  var e = Cn(t);
  if (e === null)
    return !0;
  var r = En.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && yt.call(r) == kn;
}
var In = xn, Mn = A, Ln = gt, Dn = m, Fn = "[object Arguments]", Hn = "[object Array]", Gn = "[object Boolean]", Rn = "[object Date]", Un = "[object Error]", Bn = "[object Function]", Nn = "[object Map]", Vn = "[object Number]", Jn = "[object Object]", qn = "[object RegExp]", zn = "[object Set]", Kn = "[object String]", Xn = "[object WeakMap]", Yn = "[object ArrayBuffer]", Wn = "[object DataView]", Zn = "[object Float32Array]", Qn = "[object Float64Array]", ti = "[object Int8Array]", ei = "[object Int16Array]", ri = "[object Int32Array]", ai = "[object Uint8Array]", ni = "[object Uint8ClampedArray]", ii = "[object Uint16Array]", si = "[object Uint32Array]", l = {};
l[Zn] = l[Qn] = l[ti] = l[ei] = l[ri] = l[ai] = l[ni] = l[ii] = l[si] = !0;
l[Fn] = l[Hn] = l[Yn] = l[Gn] = l[Wn] = l[Rn] = l[Un] = l[Bn] = l[Nn] = l[Vn] = l[Jn] = l[qn] = l[zn] = l[Kn] = l[Xn] = !1;
function oi(t) {
  return Dn(t) && Ln(t.length) && !!l[Mn(t)];
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
  var r = nt, a = e && !e.nodeType && e, n = a && !0 && t && !t.nodeType && t, s = n && n.exports === a, o = s && r.process, i = function() {
    try {
      var c = n && n.require && n.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  t.exports = i;
})(C, C.exports);
var fi = C.exports, hi = ci, pi = ui, X = fi, Y = X && X.isTypedArray, vi = Y ? pi(Y) : hi, _t = vi;
function gi(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
var bt = gi, di = D, yi = j, _i = Object.prototype, bi = _i.hasOwnProperty;
function $i(t, e, r) {
  var a = t[e];
  (!(bi.call(t, e) && yi(a, r)) || r === void 0 && !(e in t)) && di(t, e, r);
}
var mi = $i, Oi = mi, Ti = D;
function Si(t, e, r, a) {
  var n = !r;
  r || (r = {});
  for (var s = -1, o = e.length; ++s < o; ) {
    var i = e[s], c = a ? a(r[i], t[i], i, r, t) : void 0;
    c === void 0 && (c = t[i]), n ? Ti(r, i, c) : Oi(r, i, c);
  }
  return r;
}
var Ci = Si;
function ji(t, e) {
  for (var r = -1, a = Array(t); ++r < t; )
    a[r] = e(r);
  return a;
}
var Pi = ji, wi = 9007199254740991, Ai = /^(?:0|[1-9]\d*)$/;
function Ei(t, e) {
  var r = typeof t;
  return e = e ?? wi, !!e && (r == "number" || r != "symbol" && Ai.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var $t = Ei, ki = Pi, xi = pt, Ii = vt, Mi = dt, Li = $t, Di = _t, Fi = Object.prototype, Hi = Fi.hasOwnProperty;
function Gi(t, e) {
  var r = Ii(t), a = !r && xi(t), n = !r && !a && Mi(t), s = !r && !a && !n && Di(t), o = r || a || n || s, i = o ? ki(t.length, String) : [], c = i.length;
  for (var u in t)
    (e || Hi.call(t, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    n && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
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
var Bi = Ui, Ni = p, Vi = ft, Ji = Bi, qi = Object.prototype, zi = qi.hasOwnProperty;
function Ki(t) {
  if (!Ni(t))
    return Ji(t);
  var e = Vi(t), r = [];
  for (var a in t)
    a == "constructor" && (e || !zi.call(t, a)) || r.push(a);
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
var as = rs, W = lt, ns = Ea, is = Ha, ss = Ra, os = tn, Z = pt, Q = vt, cs = mn, ls = dt, us = M, fs = p, hs = In, ps = _t, tt = bt, vs = as;
function gs(t, e, r, a, n, s, o) {
  var i = tt(t, r), c = tt(e, r), u = o.get(c);
  if (u) {
    W(t, r, u);
    return;
  }
  var f = s ? s(i, c, r + "", t, e, o) : void 0, h = f === void 0;
  if (h) {
    var v = Q(c), x = !v && ls(c), H = !v && !x && ps(c);
    f = c, v || x || H ? Q(i) ? f = i : cs(i) ? f = ss(i) : x ? (h = !1, f = ns(c, !0)) : H ? (h = !1, f = is(c, !0)) : f = [] : hs(c) || Z(c) ? (f = i, Z(i) ? f = vs(i) : (!fs(i) || us(i)) && (f = os(c))) : h = !1;
  }
  h && (o.set(c, f), n(f, c, a, s, o), o.delete(c)), W(t, r, f);
}
var ds = gs, ys = _a, _s = lt, bs = Aa, $s = ds, ms = p, Os = mt, Ts = bt;
function Ot(t, e, r, a, n) {
  t !== e && bs(e, function(s, o) {
    if (n || (n = new ys()), ms(s))
      $s(t, e, o, r, Ot, a, n);
    else {
      var i = a ? a(Ts(t, o), s, o + "", t, e, n) : void 0;
      i === void 0 && (i = s), _s(t, o, i);
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
var Ps = js, ws = Ps, et = Math.max;
function As(t, e, r) {
  return e = et(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var a = arguments, n = -1, s = et(a.length - e, 0), o = Array(s); ++n < s; )
      o[n] = a[e + n];
    n = -1;
    for (var i = Array(e + 1); ++n < e; )
      i[n] = a[n];
    return i[e] = r(o), ws(t, this, i);
  };
}
var Es = As;
function ks(t) {
  return function() {
    return t;
  };
}
var xs = ks, Is = xs, rt = ct, Ms = Tt, Ls = rt ? function(t, e) {
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
    var a = Gs(), n = Hs - (a - r);
    if (r = a, n > 0) {
      if (++e >= Fs)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var Us = Rs, Bs = Ds, Ns = Us, Vs = Ns(Bs), Js = Vs, qs = Tt, zs = Es, Ks = Js;
function Xs(t, e) {
  return Ks(zs(t, e, qs), t + "");
}
var Ys = Xs, Ws = j, Zs = F, Qs = $t, to = p;
function eo(t, e, r) {
  if (!to(r))
    return !1;
  var a = typeof e;
  return (a == "number" ? Zs(r) && Qs(e, r.length) : a == "string" && e in r) ? Ws(r[e], t) : !1;
}
var ro = eo, ao = Ys, no = ro;
function io(t) {
  return ao(function(e, r) {
    var a = -1, n = r.length, s = n > 1 ? r[n - 1] : void 0, o = n > 2 ? r[2] : void 0;
    for (s = t.length > 3 && typeof s == "function" ? (n--, s) : void 0, o && no(r[0], r[1], o) && (s = n < 3 ? void 0 : s, n = 1), e = Object(e); ++a < n; ) {
      var i = r[a];
      i && t(e, i, a, s);
    }
    return e;
  });
}
var so = io, oo = Ss, co = so, lo = co(function(t, e, r) {
  oo(t, e, r);
}), uo = lo;
const fo = /* @__PURE__ */ St(uo);
function at(t, e = 0, r = !1) {
  if (!t) throw new Error("Please provide an element");
  const a = window.matchMedia("(prefers-reduced-motion: reduce)");
  let s = t.getBoundingClientRect().top + window.pageYOffset - e;
  if (r === !0) {
    const i = parseInt(window.getComputedStyle(t).marginTop);
    s -= i;
  }
  const o = {
    top: s,
    left: 0,
    behavior: a.matches ? "auto" : "smooth"
  };
  window.scrollTo(o), this.isElementFocusable(t) ? t.focus({ preventScroll: !0 }) : (t.setAttribute("tabindex", "-1"), t.focus({ preventScroll: !0 }));
}
function ho(t) {
  history.pushState ? history.pushState(null, null, t) : location.hash = t;
}
const po = {
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
  customOffsetValue: null
};
class vo {
  constructor(e, r) {
    const a = fo(po, r);
    this.rafTicking = !1, this.state = {
      isSticking: !1
    }, this.jumplinksEl = typeof e == "string" ? document.querySelector(e) : e, this.linksEl = typeof a.linksEl == "string" ? this.jumplinksEl.querySelectorAll(a.linksEl) : a.linksEl, this.labelEl = typeof a.labelEl == "string" ? this.jumplinksEl.querySelector(a.labelEl) : a.labelEl, this.containerEl = typeof a.containerEl == "string" ? document.querySelector(a.containerEl) : a.containerEl, this.intersectionOptions = a.intersectionOptions, this.sectionsEl = typeof a.sectionEl == "string" ? document.querySelectorAll(a.sectionEl) : a.sectionEl, this.sectionObserver = new IntersectionObserver(this.sectionIntersecting.bind(this), a.intersectionOptions), this.hasScrollProgress = a.hasScrollProgress, this.scrollCustomProperty = a.scrollCustomProperty, this.elToAttachScrollPropertyTo = this.getElementToAttachScrollPropertyTo(a), this.stickyOffset = a.stickyOffset, this.unStickyOffset = a.unStickyOffset, this.onSticky = a.onSticky, this.onUnsticky = a.onUnsticky, this.customOffsetValue = a.customOffsetValue, this.validateOptions();
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
        const a = r.target.getAttribute("data-js-jumplinks-section-label");
        this.labelEl.innerText = a, this.intersectionOptions.callback && typeof this.intersectionOptions.callback == "function" && this.intersectionOptions.callback(r);
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
    const e = document.querySelector(window.location.hash), r = this.jumplinksEl.offsetHeight, a = this.customOffsetValue === null ? r : this.customOffsetValue;
    at(e, a, !1);
  }
  hasReachedJumplinksContainerTop() {
    return this.getContainerTop + this.stickyOffset <= 0;
  }
  hasReachedJumplinksContainerBottom() {
    return this.getContainerTop + this.getContainerHeight + this.unStickyOffset <= 0;
  }
  setScrollProgress() {
    if (this.hasScrollProgress === !1) return;
    const e = document.documentElement.scrollTop, a = this.containerEl.getBoundingClientRect().top + e, n = this.getContainerHeight, o = (Math.max(0, Math.min(1, (e - a) / n)) * 100).toFixed(2);
    this.setScrollCustomProperty(o + "%");
  }
  onLinkClick(e) {
    e.preventDefault();
    const a = e.currentTarget.getAttribute("href"), n = document.querySelector(a), s = this.jumplinksEl.offsetHeight, o = this.customOffsetValue === null ? s : this.customOffsetValue;
    at(n, o, !0), ho(a);
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
  vo as Jumplinks
};

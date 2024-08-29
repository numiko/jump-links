var O = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Tt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function St() {
  this.__data__ = [], this.size = 0;
}
var Ct = St;
function jt(t, e) {
  return t === e || t !== t && e !== e;
}
var j = jt, Pt = j;
function Et(t, e) {
  for (var r = t.length; r--; )
    if (Pt(t[r][0], e))
      return r;
  return -1;
}
var P = Et, wt = P, At = Array.prototype, kt = At.splice;
function xt(t) {
  var e = this.__data__, r = wt(e, t);
  if (r < 0)
    return !1;
  var a = e.length - 1;
  return r == a ? e.pop() : kt.call(e, r, 1), --this.size, !0;
}
var It = xt, Mt = P;
function Lt(t) {
  var e = this.__data__, r = Mt(e, t);
  return r < 0 ? void 0 : e[r][1];
}
var Dt = Lt, Ft = P;
function Ht(t) {
  return Ft(this.__data__, t) > -1;
}
var Gt = Ht, Rt = P;
function Ut(t, e) {
  var r = this.__data__, a = Rt(r, t);
  return a < 0 ? (++this.size, r.push([t, e])) : r[a][1] = e, this;
}
var Bt = Ut, Nt = Ct, Vt = It, Jt = Dt, qt = Gt, zt = Bt;
function g(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var a = t[e];
    this.set(a[0], a[1]);
  }
}
g.prototype.clear = Nt;
g.prototype.delete = Vt;
g.prototype.get = Jt;
g.prototype.has = qt;
g.prototype.set = zt;
var E = g, Kt = E;
function Xt() {
  this.__data__ = new Kt(), this.size = 0;
}
var Yt = Xt;
function Wt(t) {
  var e = this.__data__, r = e.delete(t);
  return this.size = e.size, r;
}
var Zt = Wt;
function Qt(t) {
  return this.__data__.get(t);
}
var te = Qt;
function ee(t) {
  return this.__data__.has(t);
}
var re = ee, ae = typeof O == "object" && O && O.Object === Object && O, at = ae, ne = at, ie = typeof self == "object" && self && self.Object === Object && self, se = ne || ie || Function("return this")(), d = se, oe = d, le = oe.Symbol, nt = le, G = nt, it = Object.prototype, ce = it.hasOwnProperty, ue = it.toString, $ = G ? G.toStringTag : void 0;
function fe(t) {
  var e = ce.call(t, $), r = t[$];
  try {
    t[$] = void 0;
    var a = !0;
  } catch {
  }
  var n = ue.call(t);
  return a && (e ? t[$] = r : delete t[$]), n;
}
var he = fe, pe = Object.prototype, ve = pe.toString;
function ge(t) {
  return ve.call(t);
}
var de = ge, R = nt, ye = he, be = de, _e = "[object Null]", $e = "[object Undefined]", U = R ? R.toStringTag : void 0;
function me(t) {
  return t == null ? t === void 0 ? $e : _e : U && U in Object(t) ? ye(t) : be(t);
}
var w = me;
function Oe(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var p = Oe, Te = w, Se = p, Ce = "[object AsyncFunction]", je = "[object Function]", Pe = "[object GeneratorFunction]", Ee = "[object Proxy]";
function we(t) {
  if (!Se(t))
    return !1;
  var e = Te(t);
  return e == je || e == Pe || e == Ce || e == Ee;
}
var M = we, Ae = d, ke = Ae["__core-js_shared__"], xe = ke, I = xe, B = function() {
  var t = /[^.]+$/.exec(I && I.keys && I.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Ie(t) {
  return !!B && B in t;
}
var Me = Ie, Le = Function.prototype, De = Le.toString;
function Fe(t) {
  if (t != null) {
    try {
      return De.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var He = Fe, Ge = M, Re = Me, Ue = p, Be = He, Ne = /[\\^$.*+?()[\]{}|]/g, Ve = /^\[object .+?Constructor\]$/, Je = Function.prototype, qe = Object.prototype, ze = Je.toString, Ke = qe.hasOwnProperty, Xe = RegExp(
  "^" + ze.call(Ke).replace(Ne, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ye(t) {
  if (!Ue(t) || Re(t))
    return !1;
  var e = Ge(t) ? Xe : Ve;
  return e.test(Be(t));
}
var We = Ye;
function Ze(t, e) {
  return t == null ? void 0 : t[e];
}
var Qe = Ze, tr = We, er = Qe;
function rr(t, e) {
  var r = er(t, e);
  return tr(r) ? r : void 0;
}
var L = rr, ar = L, nr = d, ir = ar(nr, "Map"), st = ir, sr = L, or = sr(Object, "create"), A = or, N = A;
function lr() {
  this.__data__ = N ? N(null) : {}, this.size = 0;
}
var cr = lr;
function ur(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var fr = ur, hr = A, pr = "__lodash_hash_undefined__", vr = Object.prototype, gr = vr.hasOwnProperty;
function dr(t) {
  var e = this.__data__;
  if (hr) {
    var r = e[t];
    return r === pr ? void 0 : r;
  }
  return gr.call(e, t) ? e[t] : void 0;
}
var yr = dr, br = A, _r = Object.prototype, $r = _r.hasOwnProperty;
function mr(t) {
  var e = this.__data__;
  return br ? e[t] !== void 0 : $r.call(e, t);
}
var Or = mr, Tr = A, Sr = "__lodash_hash_undefined__";
function Cr(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Tr && e === void 0 ? Sr : e, this;
}
var jr = Cr, Pr = cr, Er = fr, wr = yr, Ar = Or, kr = jr;
function y(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var a = t[e];
    this.set(a[0], a[1]);
  }
}
y.prototype.clear = Pr;
y.prototype.delete = Er;
y.prototype.get = wr;
y.prototype.has = Ar;
y.prototype.set = kr;
var xr = y, V = xr, Ir = E, Mr = st;
function Lr() {
  this.size = 0, this.__data__ = {
    hash: new V(),
    map: new (Mr || Ir)(),
    string: new V()
  };
}
var Dr = Lr;
function Fr(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
var Hr = Fr, Gr = Hr;
function Rr(t, e) {
  var r = t.__data__;
  return Gr(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
var k = Rr, Ur = k;
function Br(t) {
  var e = Ur(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
var Nr = Br, Vr = k;
function Jr(t) {
  return Vr(this, t).get(t);
}
var qr = Jr, zr = k;
function Kr(t) {
  return zr(this, t).has(t);
}
var Xr = Kr, Yr = k;
function Wr(t, e) {
  var r = Yr(this, t), a = r.size;
  return r.set(t, e), this.size += r.size == a ? 0 : 1, this;
}
var Zr = Wr, Qr = Dr, ta = Nr, ea = qr, ra = Xr, aa = Zr;
function b(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var a = t[e];
    this.set(a[0], a[1]);
  }
}
b.prototype.clear = Qr;
b.prototype.delete = ta;
b.prototype.get = ea;
b.prototype.has = ra;
b.prototype.set = aa;
var na = b, ia = E, sa = st, oa = na, la = 200;
function ca(t, e) {
  var r = this.__data__;
  if (r instanceof ia) {
    var a = r.__data__;
    if (!sa || a.length < la - 1)
      return a.push([t, e]), this.size = ++r.size, this;
    r = this.__data__ = new oa(a);
  }
  return r.set(t, e), this.size = r.size, this;
}
var ua = ca, fa = E, ha = Yt, pa = Zt, va = te, ga = re, da = ua;
function _(t) {
  var e = this.__data__ = new fa(t);
  this.size = e.size;
}
_.prototype.clear = ha;
_.prototype.delete = pa;
_.prototype.get = va;
_.prototype.has = ga;
_.prototype.set = da;
var ya = _, ba = L, _a = function() {
  try {
    var t = ba(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), ot = _a, J = ot;
function $a(t, e, r) {
  e == "__proto__" && J ? J(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
var D = $a, ma = D, Oa = j;
function Ta(t, e, r) {
  (r !== void 0 && !Oa(t[e], r) || r === void 0 && !(e in t)) && ma(t, e, r);
}
var lt = Ta;
function Sa(t) {
  return function(e, r, a) {
    for (var n = -1, o = Object(e), s = a(e), i = s.length; i--; ) {
      var l = s[t ? i : ++n];
      if (r(o[l], l, o) === !1)
        break;
    }
    return e;
  };
}
var Ca = Sa, ja = Ca, Pa = ja(), Ea = Pa, T = { exports: {} };
T.exports;
(function(t, e) {
  var r = d, a = e && !e.nodeType && e, n = a && !0 && t && !t.nodeType && t, o = n && n.exports === a, s = o ? r.Buffer : void 0, i = s ? s.allocUnsafe : void 0;
  function l(u, f) {
    if (f)
      return u.slice();
    var h = u.length, v = i ? i(h) : new u.constructor(h);
    return u.copy(v), v;
  }
  t.exports = l;
})(T, T.exports);
var wa = T.exports, Aa = d, ka = Aa.Uint8Array, xa = ka, q = xa;
function Ia(t) {
  var e = new t.constructor(t.byteLength);
  return new q(e).set(new q(t)), e;
}
var Ma = Ia, La = Ma;
function Da(t, e) {
  var r = e ? La(t.buffer) : t.buffer;
  return new t.constructor(r, t.byteOffset, t.length);
}
var Fa = Da;
function Ha(t, e) {
  var r = -1, a = t.length;
  for (e || (e = Array(a)); ++r < a; )
    e[r] = t[r];
  return e;
}
var Ga = Ha, Ra = p, z = Object.create, Ua = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!Ra(e))
      return {};
    if (z)
      return z(e);
    t.prototype = e;
    var r = new t();
    return t.prototype = void 0, r;
  };
}(), Ba = Ua;
function Na(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var Va = Na, Ja = Va, qa = Ja(Object.getPrototypeOf, Object), ct = qa, za = Object.prototype;
function Ka(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || za;
  return t === r;
}
var ut = Ka, Xa = Ba, Ya = ct, Wa = ut;
function Za(t) {
  return typeof t.constructor == "function" && !Wa(t) ? Xa(Ya(t)) : {};
}
var Qa = Za;
function tn(t) {
  return t != null && typeof t == "object";
}
var m = tn, en = w, rn = m, an = "[object Arguments]";
function nn(t) {
  return rn(t) && en(t) == an;
}
var sn = nn, K = sn, on = m, ft = Object.prototype, ln = ft.hasOwnProperty, cn = ft.propertyIsEnumerable, un = K(/* @__PURE__ */ function() {
  return arguments;
}()) ? K : function(t) {
  return on(t) && ln.call(t, "callee") && !cn.call(t, "callee");
}, ht = un, fn = Array.isArray, pt = fn, hn = 9007199254740991;
function pn(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= hn;
}
var vt = pn, vn = M, gn = vt;
function dn(t) {
  return t != null && gn(t.length) && !vn(t);
}
var F = dn, yn = F, bn = m;
function _n(t) {
  return bn(t) && yn(t);
}
var $n = _n, S = { exports: {} };
function mn() {
  return !1;
}
var On = mn;
S.exports;
(function(t, e) {
  var r = d, a = On, n = e && !e.nodeType && e, o = n && !0 && t && !t.nodeType && t, s = o && o.exports === n, i = s ? r.Buffer : void 0, l = i ? i.isBuffer : void 0, u = l || a;
  t.exports = u;
})(S, S.exports);
var gt = S.exports, Tn = w, Sn = ct, Cn = m, jn = "[object Object]", Pn = Function.prototype, En = Object.prototype, dt = Pn.toString, wn = En.hasOwnProperty, An = dt.call(Object);
function kn(t) {
  if (!Cn(t) || Tn(t) != jn)
    return !1;
  var e = Sn(t);
  if (e === null)
    return !0;
  var r = wn.call(e, "constructor") && e.constructor;
  return typeof r == "function" && r instanceof r && dt.call(r) == An;
}
var xn = kn, In = w, Mn = vt, Ln = m, Dn = "[object Arguments]", Fn = "[object Array]", Hn = "[object Boolean]", Gn = "[object Date]", Rn = "[object Error]", Un = "[object Function]", Bn = "[object Map]", Nn = "[object Number]", Vn = "[object Object]", Jn = "[object RegExp]", qn = "[object Set]", zn = "[object String]", Kn = "[object WeakMap]", Xn = "[object ArrayBuffer]", Yn = "[object DataView]", Wn = "[object Float32Array]", Zn = "[object Float64Array]", Qn = "[object Int8Array]", ti = "[object Int16Array]", ei = "[object Int32Array]", ri = "[object Uint8Array]", ai = "[object Uint8ClampedArray]", ni = "[object Uint16Array]", ii = "[object Uint32Array]", c = {};
c[Wn] = c[Zn] = c[Qn] = c[ti] = c[ei] = c[ri] = c[ai] = c[ni] = c[ii] = !0;
c[Dn] = c[Fn] = c[Xn] = c[Hn] = c[Yn] = c[Gn] = c[Rn] = c[Un] = c[Bn] = c[Nn] = c[Vn] = c[Jn] = c[qn] = c[zn] = c[Kn] = !1;
function si(t) {
  return Ln(t) && Mn(t.length) && !!c[In(t)];
}
var oi = si;
function li(t) {
  return function(e) {
    return t(e);
  };
}
var ci = li, C = { exports: {} };
C.exports;
(function(t, e) {
  var r = at, a = e && !e.nodeType && e, n = a && !0 && t && !t.nodeType && t, o = n && n.exports === a, s = o && r.process, i = function() {
    try {
      var l = n && n.require && n.require("util").types;
      return l || s && s.binding && s.binding("util");
    } catch {
    }
  }();
  t.exports = i;
})(C, C.exports);
var ui = C.exports, fi = oi, hi = ci, X = ui, Y = X && X.isTypedArray, pi = Y ? hi(Y) : fi, yt = pi;
function vi(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
var bt = vi, gi = D, di = j, yi = Object.prototype, bi = yi.hasOwnProperty;
function _i(t, e, r) {
  var a = t[e];
  (!(bi.call(t, e) && di(a, r)) || r === void 0 && !(e in t)) && gi(t, e, r);
}
var $i = _i, mi = $i, Oi = D;
function Ti(t, e, r, a) {
  var n = !r;
  r || (r = {});
  for (var o = -1, s = e.length; ++o < s; ) {
    var i = e[o], l = a ? a(r[i], t[i], i, r, t) : void 0;
    l === void 0 && (l = t[i]), n ? Oi(r, i, l) : mi(r, i, l);
  }
  return r;
}
var Si = Ti;
function Ci(t, e) {
  for (var r = -1, a = Array(t); ++r < t; )
    a[r] = e(r);
  return a;
}
var ji = Ci, Pi = 9007199254740991, Ei = /^(?:0|[1-9]\d*)$/;
function wi(t, e) {
  var r = typeof t;
  return e = e ?? Pi, !!e && (r == "number" || r != "symbol" && Ei.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var _t = wi, Ai = ji, ki = ht, xi = pt, Ii = gt, Mi = _t, Li = yt, Di = Object.prototype, Fi = Di.hasOwnProperty;
function Hi(t, e) {
  var r = xi(t), a = !r && ki(t), n = !r && !a && Ii(t), o = !r && !a && !n && Li(t), s = r || a || n || o, i = s ? Ai(t.length, String) : [], l = i.length;
  for (var u in t)
    (e || Fi.call(t, u)) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    n && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    o && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Mi(u, l))) && i.push(u);
  return i;
}
var Gi = Hi;
function Ri(t) {
  var e = [];
  if (t != null)
    for (var r in Object(t))
      e.push(r);
  return e;
}
var Ui = Ri, Bi = p, Ni = ut, Vi = Ui, Ji = Object.prototype, qi = Ji.hasOwnProperty;
function zi(t) {
  if (!Bi(t))
    return Vi(t);
  var e = Ni(t), r = [];
  for (var a in t)
    a == "constructor" && (e || !qi.call(t, a)) || r.push(a);
  return r;
}
var Ki = zi, Xi = Gi, Yi = Ki, Wi = F;
function Zi(t) {
  return Wi(t) ? Xi(t, !0) : Yi(t);
}
var $t = Zi, Qi = Si, ts = $t;
function es(t) {
  return Qi(t, ts(t));
}
var rs = es, W = lt, as = wa, ns = Fa, is = Ga, ss = Qa, Z = ht, Q = pt, os = $n, ls = gt, cs = M, us = p, fs = xn, hs = yt, tt = bt, ps = rs;
function vs(t, e, r, a, n, o, s) {
  var i = tt(t, r), l = tt(e, r), u = s.get(l);
  if (u) {
    W(t, r, u);
    return;
  }
  var f = o ? o(i, l, r + "", t, e, s) : void 0, h = f === void 0;
  if (h) {
    var v = Q(l), x = !v && ls(l), H = !v && !x && hs(l);
    f = l, v || x || H ? Q(i) ? f = i : os(i) ? f = is(i) : x ? (h = !1, f = as(l, !0)) : H ? (h = !1, f = ns(l, !0)) : f = [] : fs(l) || Z(l) ? (f = i, Z(i) ? f = ps(i) : (!us(i) || cs(i)) && (f = ss(l))) : h = !1;
  }
  h && (s.set(l, f), n(f, l, a, o, s), s.delete(l)), W(t, r, f);
}
var gs = vs, ds = ya, ys = lt, bs = Ea, _s = gs, $s = p, ms = $t, Os = bt;
function mt(t, e, r, a, n) {
  t !== e && bs(e, function(o, s) {
    if (n || (n = new ds()), $s(o))
      _s(t, e, s, r, mt, a, n);
    else {
      var i = a ? a(Os(t, s), o, s + "", t, e, n) : void 0;
      i === void 0 && (i = o), ys(t, s, i);
    }
  }, ms);
}
var Ts = mt;
function Ss(t) {
  return t;
}
var Ot = Ss;
function Cs(t, e, r) {
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
var js = Cs, Ps = js, et = Math.max;
function Es(t, e, r) {
  return e = et(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var a = arguments, n = -1, o = et(a.length - e, 0), s = Array(o); ++n < o; )
      s[n] = a[e + n];
    n = -1;
    for (var i = Array(e + 1); ++n < e; )
      i[n] = a[n];
    return i[e] = r(s), Ps(t, this, i);
  };
}
var ws = Es;
function As(t) {
  return function() {
    return t;
  };
}
var ks = As, xs = ks, rt = ot, Is = Ot, Ms = rt ? function(t, e) {
  return rt(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: xs(e),
    writable: !0
  });
} : Is, Ls = Ms, Ds = 800, Fs = 16, Hs = Date.now;
function Gs(t) {
  var e = 0, r = 0;
  return function() {
    var a = Hs(), n = Fs - (a - r);
    if (r = a, n > 0) {
      if (++e >= Ds)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var Rs = Gs, Us = Ls, Bs = Rs, Ns = Bs(Us), Vs = Ns, Js = Ot, qs = ws, zs = Vs;
function Ks(t, e) {
  return zs(qs(t, e, Js), t + "");
}
var Xs = Ks, Ys = j, Ws = F, Zs = _t, Qs = p;
function to(t, e, r) {
  if (!Qs(r))
    return !1;
  var a = typeof e;
  return (a == "number" ? Ws(r) && Zs(e, r.length) : a == "string" && e in r) ? Ys(r[e], t) : !1;
}
var eo = to, ro = Xs, ao = eo;
function no(t) {
  return ro(function(e, r) {
    var a = -1, n = r.length, o = n > 1 ? r[n - 1] : void 0, s = n > 2 ? r[2] : void 0;
    for (o = t.length > 3 && typeof o == "function" ? (n--, o) : void 0, s && ao(r[0], r[1], s) && (o = n < 3 ? void 0 : o, n = 1), e = Object(e); ++a < n; ) {
      var i = r[a];
      i && t(e, i, a, o);
    }
    return e;
  });
}
var io = no, so = Ts, oo = io, lo = oo(function(t, e, r) {
  so(t, e, r);
}), co = lo;
const uo = /* @__PURE__ */ Tt(co), fo = {
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
class ho {
  constructor(e, r) {
    const a = uo(fo, r);
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
  /**
   * Returns whether a given element is focusable
   * @param {HTMLElement} element
   * @returns {Boolean}
   */
  isElementFocusable(e = document) {
    return !![...document.querySelectorAll("a, button, input, textarea, select, details, [tabindex]")].includes(e);
  }
  /**
   * Scrolls to the given element; accepts an optional offset
   * @param {String} elementID the ID of an element of which to scroll to
   * @param {Number} customOffset a custom offset that is used when calculating the scroll position
   * @param {Boolean} inclusiveOfMargin whether you want the scroll offset calculated to take into account margin
   */
  scrollToElement(e, r = 0, a = !1) {
    if (!e) throw new Error("Please provide an element");
    const n = window.matchMedia("(prefers-reduced-motion: reduce)");
    let s = e.getBoundingClientRect().top + window.pageYOffset - r;
    if (a === !0) {
      const l = parseInt(window.getComputedStyle(e).marginTop);
      s -= l;
    }
    const i = {
      top: s,
      left: 0,
      behavior: n.matches ? "auto" : "smooth"
    };
    window.scrollTo(i), this.isElementFocusable(e) ? e.focus({ preventScroll: !0 }) : (e.setAttribute("tabindex", "-1"), e.focus({ preventScroll: !0 }));
  }
  /**
   * Set the push state in the URL
   * @param hash - the value to set in the URL.
   */
  setPushState(e) {
    history.pushState ? history.pushState(null, null, e) : location.hash = e;
  }
  scrollToHash() {
    if (!window.location.hash) return;
    const e = document.querySelector(window.location.hash), r = this.jumplinksEl.offsetHeight, a = this.customOffsetValue === null ? r : this.customOffsetValue;
    this.scrollToElement(e, a, !1);
  }
  hasReachedJumplinksContainerTop() {
    return this.getContainerTop + this.stickyOffset <= 0;
  }
  hasReachedJumplinksContainerBottom() {
    return this.getContainerTop + this.getContainerHeight + this.unStickyOffset <= 0;
  }
  setScrollProgress() {
    if (this.hasScrollProgress === !1) return;
    const e = document.documentElement.scrollTop, a = this.containerEl.getBoundingClientRect().top + e, n = this.getContainerHeight, s = (Math.max(0, Math.min(1, (e - a) / n)) * 100).toFixed(2);
    this.setScrollCustomProperty(s + "%");
  }
  onLinkClick(e) {
    e.preventDefault();
    const a = e.currentTarget.getAttribute("href"), n = document.querySelector(a), o = this.jumplinksEl.offsetHeight, s = this.customOffsetValue === null ? o : this.customOffsetValue;
    this.scrollToElement(n, s, !0), this.setPushState(a);
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
  ho as Jumplinks
};

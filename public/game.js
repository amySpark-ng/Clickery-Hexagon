(() => {
  var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x2)(function(x2) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x2 + '" is not supported');
  });

  // node_modules/kaplay/dist/kaplay.mjs
  var Ra = Object.defineProperty;
  var i = (t18, e) => Ra(t18, "name", { value: e, configurable: true });
  var co = (() => {
    for (var t18 = new Uint8Array(128), e = 0; e < 64; e++)
      t18[e < 26 ? e + 65 : e < 52 ? e + 71 : e < 62 ? e - 4 : e * 4 - 205] = e;
    return (n) => {
      for (var r = n.length, o = new Uint8Array((r - (n[r - 1] == "=") - (n[r - 2] == "=")) * 3 / 4 | 0), s = 0, a = 0; s < r; ) {
        var m = t18[n.charCodeAt(s++)], u = t18[n.charCodeAt(s++)], p = t18[n.charCodeAt(s++)], c = t18[n.charCodeAt(s++)];
        o[a++] = m << 2 | u >> 4, o[a++] = u << 4 | p >> 2, o[a++] = p << 6 | c;
      }
      return o;
    };
  })();
  var I = class t {
    static {
      i(this, "Color");
    }
    r = 255;
    g = 255;
    b = 255;
    constructor(e, n, r) {
      this.r = De(e, 0, 255), this.g = De(n, 0, 255), this.b = De(r, 0, 255);
    }
    static fromArray(e) {
      return new t(e[0], e[1], e[2]);
    }
    static fromHex(e) {
      if (typeof e == "number")
        return new t(e >> 16 & 255, e >> 8 & 255, e >> 0 & 255);
      if (typeof e == "string") {
        let n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        if (!n)
          throw new Error("Invalid hex color format");
        return new t(parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16));
      } else
        throw new Error("Invalid hex color format");
    }
    static fromHSL(e, n, r) {
      if (n == 0)
        return new t(255 * r, 255 * r, 255 * r);
      let o = i((c, f, d) => (d < 0 && (d += 1), d > 1 && (d -= 1), d < 1 / 6 ? c + (f - c) * 6 * d : d < 1 / 2 ? f : d < 2 / 3 ? c + (f - c) * (2 / 3 - d) * 6 : c), "hue2rgb"), s = r < 0.5 ? r * (1 + n) : r + n - r * n, a = 2 * r - s, m = o(a, s, e + 1 / 3), u = o(a, s, e), p = o(a, s, e - 1 / 3);
      return new t(Math.round(m * 255), Math.round(u * 255), Math.round(p * 255));
    }
    static RED = new t(255, 0, 0);
    static GREEN = new t(0, 255, 0);
    static BLUE = new t(0, 0, 255);
    static YELLOW = new t(255, 255, 0);
    static MAGENTA = new t(255, 0, 255);
    static CYAN = new t(0, 255, 255);
    static WHITE = new t(255, 255, 255);
    static BLACK = new t(0, 0, 0);
    clone() {
      return new t(this.r, this.g, this.b);
    }
    lighten(e) {
      return new t(this.r + e, this.g + e, this.b + e);
    }
    darken(e) {
      return this.lighten(-e);
    }
    invert() {
      return new t(255 - this.r, 255 - this.g, 255 - this.b);
    }
    mult(e) {
      return new t(this.r * e.r / 255, this.g * e.g / 255, this.b * e.b / 255);
    }
    lerp(e, n) {
      return new t(fe(this.r, e.r, n), fe(this.g, e.g, n), fe(this.b, e.b, n));
    }
    toHSL() {
      let e = this.r / 255, n = this.g / 255, r = this.b / 255, o = Math.max(e, n, r), s = Math.min(e, n, r), a = (o + s) / 2, m = a, u = a;
      if (o == s)
        a = m = 0;
      else {
        let p = o - s;
        switch (m = u > 0.5 ? p / (2 - o - s) : p / (o + s), o) {
          case e:
            a = (n - r) / p + (n < r ? 6 : 0);
            break;
          case n:
            a = (r - e) / p + 2;
            break;
          case r:
            a = (e - n) / p + 4;
            break;
        }
        a /= 6;
      }
      return [a, m, u];
    }
    eq(e) {
      return this.r === e.r && this.g === e.g && this.b === e.b;
    }
    toString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    toHex() {
      return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }
    toArray() {
      return [this.r, this.g, this.b];
    }
  };
  function k(...t18) {
    if (t18.length === 0)
      return new I(255, 255, 255);
    if (t18.length === 1) {
      if (t18[0] instanceof I)
        return t18[0].clone();
      if (typeof t18[0] == "string")
        return I.fromHex(t18[0]);
      if (Array.isArray(t18[0]) && t18[0].length === 3)
        return I.fromArray(t18[0]);
    } else if (t18.length === 2) {
      if (t18[0] instanceof I)
        return t18[0].clone();
    } else if (t18.length === 3 || t18.length === 4)
      return new I(t18[0], t18[1], t18[2]);
    throw new Error("Invalid color arguments");
  }
  i(k, "rgb");
  var lo = i((t18, e, n) => I.fromHSL(t18, e, n), "hsl2rgb");
  function se(t18) {
    return t18 * Math.PI / 180;
  }
  i(se, "deg2rad");
  function ct(t18) {
    return t18 * 180 / Math.PI;
  }
  i(ct, "rad2deg");
  function De(t18, e, n) {
    return e > n ? De(t18, n, e) : Math.min(Math.max(t18, e), n);
  }
  i(De, "clamp");
  function fe(t18, e, n) {
    if (typeof t18 == "number" && typeof e == "number")
      return t18 + (e - t18) * n;
    if (t18 instanceof C && e instanceof C)
      return t18.lerp(e, n);
    if (t18 instanceof I && e instanceof I)
      return t18.lerp(e, n);
    throw new Error(`Bad value for lerp(): ${t18}, ${e}. Only number, Vec2 and Color is supported.`);
  }
  i(fe, "lerp");
  function Se(t18, e, n, r, o) {
    return r + (t18 - e) / (n - e) * (o - r);
  }
  i(Se, "map");
  function po(t18, e, n, r, o) {
    return De(Se(t18, e, n, r, o), r, o);
  }
  i(po, "mapc");
  var C = class t2 {
    static {
      i(this, "Vec2");
    }
    x = 0;
    y = 0;
    constructor(e = 0, n = e) {
      this.x = e, this.y = n;
    }
    static fromAngle(e) {
      let n = se(e);
      return new t2(Math.cos(n), Math.sin(n));
    }
    static fromArray(e) {
      return new t2(e[0], e[1]);
    }
    static LEFT = new t2(-1, 0);
    static RIGHT = new t2(1, 0);
    static UP = new t2(0, -1);
    static DOWN = new t2(0, 1);
    clone() {
      return new t2(this.x, this.y);
    }
    add(...e) {
      let n = x(...e);
      return new t2(this.x + n.x, this.y + n.y);
    }
    sub(...e) {
      let n = x(...e);
      return new t2(this.x - n.x, this.y - n.y);
    }
    scale(...e) {
      let n = x(...e);
      return new t2(this.x * n.x, this.y * n.y);
    }
    dist(...e) {
      let n = x(...e);
      return this.sub(n).len();
    }
    sdist(...e) {
      let n = x(...e);
      return this.sub(n).slen();
    }
    len() {
      return Math.sqrt(this.dot(this));
    }
    slen() {
      return this.dot(this);
    }
    unit() {
      let e = this.len();
      return e === 0 ? new t2(0) : this.scale(1 / e);
    }
    normal() {
      return new t2(this.y, -this.x);
    }
    reflect(e) {
      return this.sub(e.scale(2 * this.dot(e)));
    }
    project(e) {
      return e.scale(e.dot(this) / e.len());
    }
    reject(e) {
      return this.sub(this.project(e));
    }
    dot(e) {
      return this.x * e.x + this.y * e.y;
    }
    cross(e) {
      return this.x * e.y - this.y * e.x;
    }
    angle(...e) {
      let n = x(...e);
      return ct(Math.atan2(this.y - n.y, this.x - n.x));
    }
    angleBetween(...e) {
      let n = x(...e);
      return ct(Math.atan2(this.cross(n), this.dot(n)));
    }
    lerp(e, n) {
      return new t2(fe(this.x, e.x, n), fe(this.y, e.y, n));
    }
    slerp(e, n) {
      let r = this.dot(e), o = this.cross(e), s = Math.atan2(o, r);
      return this.scale(Math.sin((1 - n) * s)).add(e.scale(Math.sin(n * s))).scale(1 / o);
    }
    isZero() {
      return this.x === 0 && this.y === 0;
    }
    toFixed(e) {
      return new t2(Number(this.x.toFixed(e)), Number(this.y.toFixed(e)));
    }
    transform(e) {
      return e.multVec2(this);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y;
    }
    bbox() {
      return new W(this, 0, 0);
    }
    toString() {
      return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
    toArray() {
      return [this.x, this.y];
    }
  };
  function x(...t18) {
    if (t18.length === 1) {
      if (t18[0] instanceof C)
        return new C(t18[0].x, t18[0].y);
      if (Array.isArray(t18[0]) && t18[0].length === 2)
        return new C(...t18[0]);
    }
    return new C(...t18);
  }
  i(x, "vec2");
  var z2 = class t3 {
    static {
      i(this, "Quad");
    }
    x = 0;
    y = 0;
    w = 1;
    h = 1;
    constructor(e, n, r, o) {
      this.x = e, this.y = n, this.w = r, this.h = o;
    }
    scale(e) {
      return new t3(this.x + this.w * e.x, this.y + this.h * e.y, this.w * e.w, this.h * e.h);
    }
    pos() {
      return new C(this.x, this.y);
    }
    clone() {
      return new t3(this.x, this.y, this.w, this.h);
    }
    eq(e) {
      return this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h;
    }
    toString() {
      return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
    }
  };
  function le(t18, e, n, r) {
    return new z2(t18, e, n, r);
  }
  i(le, "quad");
  var Dt = class t4 {
    static {
      i(this, "Mat2");
    }
    a;
    b;
    c;
    d;
    constructor(e, n, r, o) {
      this.a = e, this.b = n, this.c = r, this.d = o;
    }
    mul(e) {
      return new t4(this.a * e.a + this.b * e.c, this.a * e.b + this.b * e.d, this.c * e.a + this.d * e.c, this.c * e.b + this.d * e.d);
    }
    transform(e) {
      return x(this.a * e.x + this.b * e.y, this.c * e.x + this.d * e.y);
    }
    get inverse() {
      let e = this.det;
      return new t4(this.d / e, -this.b / e, -this.c / e, this.a / e);
    }
    get transpose() {
      return new t4(this.a, this.c, this.b, this.d);
    }
    get eigenvalues() {
      let e = this.trace / 2, n = this.det, r = e + Math.sqrt(e * e - n), o = e - Math.sqrt(e * e - n);
      return [r, o];
    }
    eigenvectors(e, n) {
      return this.c != 0 ? [[e - this.d, this.c], [n - this.d, this.c]] : this.b != 0 ? [[this.b, e - this.a], [this.b, n - this.a]] : Math.abs(this.transform(x(1, 0)).x - e) < Number.EPSILON ? [[1, 0], [0, 1]] : [[0, 1], [1, 0]];
    }
    get det() {
      return this.a * this.d - this.b * this.c;
    }
    get trace() {
      return this.a + this.d;
    }
    static rotation(e) {
      let n = Math.cos(e), r = Math.sin(e);
      return new t4(n, r, -r, n);
    }
    static scale(e, n) {
      return new t4(e, 0, 0, n);
    }
  };
  var ht = class t5 {
    static {
      i(this, "Mat3");
    }
    m11;
    m12;
    m13;
    m21;
    m22;
    m23;
    m31;
    m32;
    m33;
    constructor(e, n, r, o, s, a, m, u, p) {
      this.m11 = e, this.m12 = n, this.m13 = r, this.m21 = o, this.m22 = s, this.m23 = a, this.m31 = m, this.m32 = u, this.m33 = p;
    }
    static fromMat2(e) {
      return new t5(e.a, e.b, 0, e.c, e.d, 0, 0, 0, 1);
    }
    toMat2() {
      return new Dt(this.m11, this.m12, this.m21, this.m22);
    }
    mul(e) {
      return new t5(this.m11 * e.m11 + this.m12 * e.m21 + this.m13 * e.m31, this.m11 * e.m12 + this.m12 * e.m22 + this.m13 * e.m32, this.m11 * e.m13 + this.m12 * e.m23 + this.m13 * e.m33, this.m21 * e.m11 + this.m22 * e.m21 + this.m23 * e.m31, this.m21 * e.m12 + this.m22 * e.m22 + this.m23 * e.m32, this.m21 * e.m13 + this.m22 * e.m23 + this.m23 * e.m33, this.m31 * e.m11 + this.m32 * e.m21 + this.m33 * e.m31, this.m31 * e.m12 + this.m32 * e.m22 + this.m33 * e.m32, this.m31 * e.m13 + this.m32 * e.m23 + this.m33 * e.m33);
    }
    get det() {
      return this.m11 * this.m22 * this.m33 + this.m12 * this.m23 * this.m31 + this.m13 * this.m21 * this.m32 - this.m13 * this.m22 * this.m31 - this.m12 * this.m21 * this.m33 - this.m11 * this.m23 * this.m32;
    }
    rotate(e) {
      let n = Math.cos(e), r = Math.sin(e), o = this.m11, s = this.m12;
      return this.m11 = n * this.m11 + r * this.m21, this.m12 = n * this.m12 + r * this.m22, this.m21 = n * this.m21 - r * o, this.m22 = n * this.m22 - r * s, this;
    }
    scale(e, n) {
      return this.m11 *= e, this.m12 *= e, this.m21 *= n, this.m22 *= n, this;
    }
    get inverse() {
      let e = this.det;
      return new t5((this.m22 * this.m33 - this.m23 * this.m32) / e, (this.m13 * this.m32 - this.m12 * this.m33) / e, (this.m12 * this.m23 - this.m13 * this.m22) / e, (this.m23 * this.m31 - this.m21 * this.m33) / e, (this.m11 * this.m33 - this.m13 * this.m31) / e, (this.m13 * this.m21 - this.m11 * this.m23) / e, (this.m21 * this.m32 - this.m22 * this.m31) / e, (this.m12 * this.m31 - this.m11 * this.m32) / e, (this.m11 * this.m22 - this.m12 * this.m21) / e);
    }
    get transpose() {
      return new t5(this.m11, this.m21, this.m31, this.m12, this.m22, this.m32, this.m13, this.m23, this.m33);
    }
  };
  var he = class t6 {
    static {
      i(this, "Mat4");
    }
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(e) {
      e && (this.m = e);
    }
    static translate(e) {
      return new t6([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, 0, 1]);
    }
    static scale(e) {
      return new t6([e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(e) {
      e = se(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([1, 0, 0, 0, 0, n, -r, 0, 0, r, n, 0, 0, 0, 0, 1]);
    }
    static rotateY(e) {
      e = se(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([n, 0, r, 0, 0, 1, 0, 0, -r, 0, n, 0, 0, 0, 0, 1]);
    }
    static rotateZ(e) {
      e = se(-e);
      let n = Math.cos(e), r = Math.sin(e);
      return new t6([n, -r, 0, 0, r, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(e) {
      return this.m[12] += this.m[0] * e.x + this.m[4] * e.y, this.m[13] += this.m[1] * e.x + this.m[5] * e.y, this.m[14] += this.m[2] * e.x + this.m[6] * e.y, this.m[15] += this.m[3] * e.x + this.m[7] * e.y, this;
    }
    scale(e) {
      return this.m[0] *= e.x, this.m[4] *= e.y, this.m[1] *= e.x, this.m[5] *= e.y, this.m[2] *= e.x, this.m[6] *= e.y, this.m[3] *= e.x, this.m[7] *= e.y, this;
    }
    rotate(e) {
      e = se(-e);
      let n = Math.cos(e), r = Math.sin(e), o = this.m[0], s = this.m[1], a = this.m[4], m = this.m[5];
      return this.m[0] = o * n + s * r, this.m[1] = -o * r + s * n, this.m[4] = a * n + m * r, this.m[5] = -a * r + m * n, this;
    }
    mult(e) {
      let n = [];
      for (let r = 0; r < 4; r++)
        for (let o = 0; o < 4; o++)
          n[r * 4 + o] = this.m[0 * 4 + o] * e.m[r * 4 + 0] + this.m[1 * 4 + o] * e.m[r * 4 + 1] + this.m[2 * 4 + o] * e.m[r * 4 + 2] + this.m[3 * 4 + o] * e.m[r * 4 + 3];
      return new t6(n);
    }
    multVec2(e) {
      return new C(e.x * this.m[0] + e.y * this.m[4] + this.m[12], e.x * this.m[1] + e.y * this.m[5] + this.m[13]);
    }
    getTranslation() {
      return new C(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], n = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new C(n, e / n);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4], n = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new C(e / n, n);
      } else
        return new C(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return ct(this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e));
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return ct(Math.PI / 2 - (this.m[5] > 0 ? Math.acos(-this.m[4] / e) : -Math.acos(this.m[4] / e)));
      } else
        return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new C(Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e), 0);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new C(0, Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e));
      } else
        return new C(0, 0);
    }
    invert() {
      let e = [], n = this.m[10] * this.m[15] - this.m[14] * this.m[11], r = this.m[9] * this.m[15] - this.m[13] * this.m[11], o = this.m[9] * this.m[14] - this.m[13] * this.m[10], s = this.m[8] * this.m[15] - this.m[12] * this.m[11], a = this.m[8] * this.m[14] - this.m[12] * this.m[10], m = this.m[8] * this.m[13] - this.m[12] * this.m[9], u = this.m[6] * this.m[15] - this.m[14] * this.m[7], p = this.m[5] * this.m[15] - this.m[13] * this.m[7], c = this.m[5] * this.m[14] - this.m[13] * this.m[6], f = this.m[4] * this.m[15] - this.m[12] * this.m[7], d = this.m[4] * this.m[14] - this.m[12] * this.m[6], v = this.m[5] * this.m[15] - this.m[13] * this.m[7], h = this.m[4] * this.m[13] - this.m[12] * this.m[5], O2 = this.m[6] * this.m[11] - this.m[10] * this.m[7], y = this.m[5] * this.m[11] - this.m[9] * this.m[7], w = this.m[5] * this.m[10] - this.m[9] * this.m[6], V2 = this.m[4] * this.m[11] - this.m[8] * this.m[7], R = this.m[4] * this.m[10] - this.m[8] * this.m[6], P = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      e[0] = this.m[5] * n - this.m[6] * r + this.m[7] * o, e[4] = -(this.m[4] * n - this.m[6] * s + this.m[7] * a), e[8] = this.m[4] * r - this.m[5] * s + this.m[7] * m, e[12] = -(this.m[4] * o - this.m[5] * a + this.m[6] * m), e[1] = -(this.m[1] * n - this.m[2] * r + this.m[3] * o), e[5] = this.m[0] * n - this.m[2] * s + this.m[3] * a, e[9] = -(this.m[0] * r - this.m[1] * s + this.m[3] * m), e[13] = this.m[0] * o - this.m[1] * a + this.m[2] * m, e[2] = this.m[1] * u - this.m[2] * p + this.m[3] * c, e[6] = -(this.m[0] * u - this.m[2] * f + this.m[3] * d), e[10] = this.m[0] * v - this.m[1] * f + this.m[3] * h, e[14] = -(this.m[0] * c - this.m[1] * d + this.m[2] * h), e[3] = -(this.m[1] * O2 - this.m[2] * y + this.m[3] * w), e[7] = this.m[0] * O2 - this.m[2] * V2 + this.m[3] * R, e[11] = -(this.m[0] * y - this.m[1] * V2 + this.m[3] * P), e[15] = this.m[0] * w - this.m[1] * R + this.m[2] * P;
      let M = this.m[0] * e[0] + this.m[1] * e[4] + this.m[2] * e[8] + this.m[3] * e[12];
      for (let b = 0; b < 4; b++)
        for (let E = 0; E < 4; E++)
          e[b * 4 + E] *= 1 / M;
      return new t6(e);
    }
    clone() {
      return new t6([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
  function An(t18, e, n, r = (o) => -Math.cos(o)) {
    return t18 + (r(n) + 1) / 2 * (e - t18);
  }
  i(An, "wave");
  var Da = 1103515245;
  var Ma = 12345;
  var mo = 2147483648;
  var $t = class {
    static {
      i(this, "RNG");
    }
    seed;
    constructor(e) {
      this.seed = e;
    }
    gen() {
      return this.seed = (Da * this.seed + Ma) % mo, this.seed / mo;
    }
    genNumber(e, n) {
      return e + this.gen() * (n - e);
    }
    genVec2(e, n) {
      return new C(this.genNumber(e.x, n.x), this.genNumber(e.y, n.y));
    }
    genColor(e, n) {
      return new I(this.genNumber(e.r, n.r), this.genNumber(e.g, n.g), this.genNumber(e.b, n.b));
    }
    genAny(...e) {
      if (e.length === 0)
        return this.gen();
      if (e.length === 1) {
        if (typeof e[0] == "number")
          return this.genNumber(0, e[0]);
        if (e[0] instanceof C)
          return this.genVec2(x(0, 0), e[0]);
        if (e[0] instanceof I)
          return this.genColor(k(0, 0, 0), e[0]);
      } else if (e.length === 2) {
        if (typeof e[0] == "number" && typeof e[1] == "number")
          return this.genNumber(e[0], e[1]);
        if (e[0] instanceof C && e[1] instanceof C)
          return this.genVec2(e[0], e[1]);
        if (e[0] instanceof I && e[1] instanceof I)
          return this.genColor(e[0], e[1]);
      }
      throw new Error("More than 2 arguments not supported");
    }
  };
  var yr = new $t(Date.now());
  function fo(t18) {
    return t18 != null && (yr.seed = t18), yr.seed;
  }
  i(fo, "randSeed");
  function ge(...t18) {
    return yr.genAny(...t18);
  }
  i(ge, "rand");
  function xr(...t18) {
    return Math.floor(ge(...t18.length > 0 ? t18 : [2]));
  }
  i(xr, "randi");
  function ho(t18) {
    return ge() <= t18;
  }
  i(ho, "chance");
  function vr(t18) {
    for (let e = t18.length - 1; e > 0; e--) {
      let n = Math.floor(Math.random() * (e + 1));
      [t18[e], t18[n]] = [t18[n], t18[e]];
    }
    return t18;
  }
  i(vr, "shuffle");
  function go2(t18, e) {
    return t18.length <= e ? t18.slice() : vr(t18.slice()).slice(0, e);
  }
  i(go2, "chooseMultiple");
  function bo(t18) {
    return t18[xr(t18.length)];
  }
  i(bo, "choose");
  function wr(t18, e) {
    return t18.pos.x + t18.width > e.pos.x && t18.pos.x < e.pos.x + e.width && t18.pos.y + t18.height > e.pos.y && t18.pos.y < e.pos.y + e.height;
  }
  i(wr, "testRectRect");
  function Ba(t18, e) {
    if (t18.p1.x === t18.p2.x && t18.p1.y === t18.p2.y || e.p1.x === e.p2.x && e.p1.y === e.p2.y)
      return null;
    let n = (e.p2.y - e.p1.y) * (t18.p2.x - t18.p1.x) - (e.p2.x - e.p1.x) * (t18.p2.y - t18.p1.y);
    if (n === 0)
      return null;
    let r = ((e.p2.x - e.p1.x) * (t18.p1.y - e.p1.y) - (e.p2.y - e.p1.y) * (t18.p1.x - e.p1.x)) / n, o = ((t18.p2.x - t18.p1.x) * (t18.p1.y - e.p1.y) - (t18.p2.y - t18.p1.y) * (t18.p1.x - e.p1.x)) / n;
    return r < 0 || r > 1 || o < 0 || o > 1 ? null : r;
  }
  i(Ba, "testLineLineT");
  function Sn(t18, e) {
    let n = Ba(t18, e);
    return n ? x(t18.p1.x + n * (t18.p2.x - t18.p1.x), t18.p1.y + n * (t18.p2.y - t18.p1.y)) : null;
  }
  i(Sn, "testLineLine");
  function Vn(t18, e) {
    let n = e.p2.sub(e.p1), r = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY;
    if (n.x != 0) {
      let s = (t18.pos.x - e.p1.x) / n.x, a = (t18.pos.x + t18.width - e.p1.x) / n.x;
      r = Math.max(r, Math.min(s, a)), o = Math.min(o, Math.max(s, a));
    }
    if (n.y != 0) {
      let s = (t18.pos.y - e.p1.y) / n.y, a = (t18.pos.y + t18.height - e.p1.y) / n.y;
      r = Math.max(r, Math.min(s, a)), o = Math.min(o, Math.max(s, a));
    }
    return o >= r && o >= 0 && r <= 1;
  }
  i(Vn, "testRectLine");
  function Mt(t18, e) {
    return e.x > t18.pos.x && e.x < t18.pos.x + t18.width && e.y > t18.pos.y && e.y < t18.pos.y + t18.height;
  }
  i(Mt, "testRectPoint");
  function yo(t18, e) {
    let n = Math.max(t18.pos.x, Math.min(e.center.x, t18.pos.x + t18.width)), r = Math.max(t18.pos.y, Math.min(e.center.y, t18.pos.y + t18.height));
    return x(n, r).sdist(e.center) <= e.radius * e.radius;
  }
  i(yo, "testRectCircle");
  function xo(t18, e) {
    return vo(e, new ye(t18.points()));
  }
  i(xo, "testRectPolygon");
  function Pn(t18, e) {
    let n = e.sub(t18.p1), r = t18.p2.sub(t18.p1);
    if (Math.abs(n.cross(r)) > Number.EPSILON)
      return false;
    let o = n.dot(r) / r.dot(r);
    return o >= 0 && o <= 1;
  }
  i(Pn, "testLinePoint");
  function Bt(t18, e) {
    let n = t18.p2.sub(t18.p1), r = n.dot(n), o = t18.p1.sub(e.center), s = 2 * n.dot(o), a = o.dot(o) - e.radius * e.radius, m = s * s - 4 * r * a;
    if (r <= Number.EPSILON || m < 0)
      return false;
    if (m == 0) {
      let u = -s / (2 * r);
      if (u >= 0 && u <= 1)
        return true;
    } else {
      let u = (-s + Math.sqrt(m)) / (2 * r), p = (-s - Math.sqrt(m)) / (2 * r);
      if (u >= 0 && u <= 1 || p >= 0 && p <= 1)
        return true;
    }
    return Gn(e, t18.p1);
  }
  i(Bt, "testLineCircle");
  function Cr(t18, e) {
    if (et(e, t18.p1) || et(e, t18.p2))
      return true;
    for (let n = 0; n < e.pts.length; n++) {
      let r = e.pts[n], o = e.pts[(n + 1) % e.pts.length];
      if (Sn(t18, new Te(r, o)))
        return true;
    }
    return false;
  }
  i(Cr, "testLinePolygon");
  function Gn(t18, e) {
    return t18.center.sdist(e) < t18.radius * t18.radius;
  }
  i(Gn, "testCirclePoint");
  function Ua(t18, e) {
    return t18.center.sdist(e.center) < (t18.radius + e.radius) * (t18.radius + e.radius);
  }
  i(Ua, "testCircleCircle");
  function Xt(t18, e) {
    let n = e.pts[e.pts.length - 1];
    for (let r of e.pts) {
      if (Bt(new Te(n, r), t18))
        return true;
      n = r;
    }
    return Gn(t18, e.pts[0]) ? true : et(e, t18.center);
  }
  i(Xt, "testCirclePolygon");
  function vo(t18, e) {
    for (let n = 0; n < t18.pts.length; n++)
      if (Cr(new Te(t18.pts[n], t18.pts[(n + 1) % t18.pts.length]), e))
        return true;
    return !!(t18.pts.some((n) => et(e, n)) || e.pts.some((n) => et(t18, n)));
  }
  i(vo, "testPolygonPolygon");
  function et(t18, e) {
    let n = false, r = t18.pts;
    for (let o = 0, s = r.length - 1; o < r.length; s = o++)
      r[o].y > e.y != r[s].y > e.y && e.x < (r[s].x - r[o].x) * (e.y - r[o].y) / (r[s].y - r[o].y) + r[o].x && (n = !n);
    return n;
  }
  i(et, "testPolygonPoint");
  function Or(t18, e) {
    e = e.sub(t18.center);
    let n = se(t18.angle), r = Math.cos(n), o = Math.sin(n), s = e.x * r + e.y * o, a = -e.x * o + e.y * r;
    return s * s / (t18.radiusX * t18.radiusX) + a * a / (t18.radiusY * t18.radiusY) < 1;
  }
  i(Or, "testEllipsePoint");
  function En(t18, e) {
    let n = e.center.sub(t18.center), r = se(t18.angle), o = Math.cos(r), s = Math.sin(r), a = n.x * o + n.y * s, m = -n.x * s + n.y * o;
    return Or(new Ke(x(), t18.radiusX + e.radius, t18.radiusY + e.radius, 0), x(a, m));
  }
  i(En, "testEllipseCircle");
  function wo(t18, e) {
    let n = t18.toMat2().inverse;
    return e = new Te(n.transform(e.p1.sub(t18.center)), n.transform(e.p2.sub(t18.center))), Bt(e, new Ce(x(), 1));
  }
  i(wo, "testEllipseLine");
  function Fa(t18, e) {
    if (t18.radiusX === t18.radiusY)
      return En(e, new Ce(t18.center, t18.radiusX));
    if (e.radiusX === e.radiusY)
      return En(t18, new Ce(e.center, e.radiusX));
    let n = new ht(1 / t18.radiusX ** 2, 0, 0, 0, 1 / t18.radiusY ** 2, 0, 0, 0, -1), r = new ht(1 / e.radiusX ** 2, 0, 0, 0, 1 / e.radiusY ** 2, 0, 0, 0, -1), o = t18.center.x, s = t18.center.y, a = e.center.x, m = e.center.y, u = se(t18.angle), p = se(e.angle), c = new ht(Math.cos(u), -Math.sin(u), o, Math.sin(u), Math.cos(u), s, 0, 0, 1), f = new ht(Math.cos(p), -Math.sin(p), a, Math.sin(p), Math.cos(p), m, 0, 0, 1), d = c.inverse, v = f.inverse, h = d.transpose.mul(n).mul(d), O2 = v.transpose.mul(r).mul(v), y = h.m11, w = h.m12, V2 = h.m13, R = h.m21, P = h.m22, M = h.m23, b = h.m31, E = h.m32, A = h.m33, G = O2.m11, D = O2.m12, U = O2.m13, L2 = O2.m21, H = O2.m22, q = O2.m23, Y = O2.m31, _ = O2.m32, K2 = O2.m33, Z = y * P * A - y * M * E - w * R * A + w * M * b + V2 * R * E - V2 * P * b, $ = (y * P * K2 - y * M * _ - y * E * q + y * A * H - w * R * K2 + w * M * Y + w * b * q - w * A * L2 + V2 * R * _ - V2 * P * Y - V2 * b * H + V2 * E * L2 + R * E * U - R * A * D - P * b * U + P * A * G + M * b * D - M * E * G) / Z, ee = (y * H * K2 - y * q * _ - w * L2 * K2 + w * q * Y + V2 * L2 * _ - V2 * H * Y - R * D * K2 + R * U * _ + P * G * K2 - P * U * Y - M * G * _ + M * D * Y + b * D * q - b * U * H - E * G * q + E * U * L2 + A * G * H - A * D * L2) / Z, Ee = (G * H * K2 - G * q * _ - D * L2 * K2 + D * q * Y + U * L2 * _ - U * H * Y) / Z;
    if ($ >= 0) {
      let j = -3 * ee + $ ** 2, ft = 3 * $ * Ee + ee * $ ** 2 - 4 * ee ** 2, Pt = -27 * Ee ** 2 + 18 * Ee * $ * ee + $ ** 2 * ee ** 2 - 4 * $ ** 3 * Ee - 4 * ee ** 3;
      return !(j > 0 && ft < 0 && Pt > 0);
    } else {
      let j = -3 * ee + $ ** 2, ft = -27 * Ee ** 2 + 18 * Ee * $ * ee + $ ** 2 * ee ** 2 - 4 * $ ** 3 * Ee - 4 * ee ** 3;
      return !(j > 0 && ft > 0);
    }
  }
  i(Fa, "testEllipseEllipse");
  function Co(t18, e) {
    return Er(t18, new ye(e.points()));
  }
  i(Co, "testEllipseRect");
  function Er(t18, e) {
    let n = t18.toMat2().inverse;
    return e = new ye(e.pts.map((r) => n.transform(r.sub(t18.center)))), Xt(new Ce(x(), 1), e);
  }
  i(Er, "testEllipsePolygon");
  function La(t18, e) {
    return t18.x === e.x && t18.y === e.y;
  }
  i(La, "testPointPoint");
  function Ia(t18, e) {
    return e instanceof C ? La(e, t18.pt) : e instanceof Ce ? Gn(e, t18.pt) : e instanceof Te ? Pn(e, t18.pt) : e instanceof W ? Mt(e, t18.pt) : e instanceof ye ? et(e, t18.pt) : e instanceof Ke ? Or(e, t18.pt) : false;
  }
  i(Ia, "testPointShape");
  function Ka(t18, e) {
    return e instanceof C ? Pn(t18, e) : e instanceof Ce ? Bt(t18, e) : e instanceof Te ? Sn(t18, e) != null : e instanceof W ? Vn(e, t18) : e instanceof ye ? Cr(t18, e) : e instanceof Ke ? wo(e, t18) : false;
  }
  i(Ka, "testLineShape");
  function ja(t18, e) {
    return e instanceof C ? Gn(t18, e) : e instanceof Ce ? Ua(t18, e) : e instanceof Te ? Bt(e, t18) : e instanceof W ? yo(e, t18) : e instanceof ye ? Xt(t18, e) : e instanceof Ke ? En(e, t18) : false;
  }
  i(ja, "testCircleShape");
  function ka(t18, e) {
    return e instanceof C ? Mt(t18, e) : e instanceof Ce ? yo(t18, e) : e instanceof Te ? Vn(t18, e) : e instanceof W ? wr(t18, e) : e instanceof ye ? xo(t18, e) : e instanceof Ke ? Co(e, t18) : false;
  }
  i(ka, "testRectShape");
  function _a(t18, e) {
    return e instanceof C ? et(t18, e) : e instanceof Ce ? Xt(e, t18) : e instanceof Te ? Cr(e, t18) : e instanceof W ? xo(e, t18) : e instanceof ye ? vo(e, t18) : e instanceof Ke ? Er(e, t18) : false;
  }
  i(_a, "testPolygonShape");
  function Na(t18, e) {
    return e instanceof C ? Or(t18, e) : e instanceof Ce ? En(t18, e) : e instanceof Te ? wo(t18, e) : e instanceof W ? Co(t18, e) : e instanceof ye ? Er(t18, e) : e instanceof Ke ? Fa(e, t18) : false;
  }
  i(Na, "testEllipseShape");
  function Oo(t18, e, n) {
    let r = t18, o = n.p1, s = n.p2, a = e, m = s.sub(o), u = a.cross(m);
    if (Math.abs(u) < Number.EPSILON)
      return null;
    let p = o.sub(r), c = p.cross(m) / u;
    if (c <= 0 || c >= 1)
      return null;
    let f = p.cross(a) / u;
    if (f <= 0 || f >= 1)
      return null;
    let d = m.normal().unit();
    return e.dot(d) > 0 && (d.x *= -1, d.y *= -1), { point: r.add(a.scale(c)), normal: d, fraction: c };
  }
  i(Oo, "raycastLine");
  function Ha(t18, e, n) {
    let r = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY, s;
    if (t18.x != 0) {
      let a = (n.pos.x - t18.x) / e.x, m = (n.pos.x + n.width - t18.x) / e.x;
      s = x(-Math.sign(e.x), 0), r = Math.max(r, Math.min(a, m)), o = Math.min(o, Math.max(a, m));
    }
    if (t18.y != 0) {
      let a = (n.pos.y - t18.y) / e.y, m = (n.pos.y + n.height - t18.y) / e.y;
      Math.min(a, m) > r && (s = x(0, -Math.sign(e.y))), r = Math.max(r, Math.min(a, m)), o = Math.min(o, Math.max(a, m));
    }
    return o >= r && r >= 0 && r <= 1 ? { point: t18.add(e.scale(r)), normal: s, fraction: r } : null;
  }
  i(Ha, "raycastRect");
  function Eo(t18, e, n) {
    let r = t18, o = n.center, s = e, a = s.dot(s), m = r.sub(o), u = 2 * s.dot(m), p = m.dot(m) - n.radius * n.radius, c = u * u - 4 * a * p;
    if (a <= Number.EPSILON || c < 0)
      return null;
    if (c == 0) {
      let f = -u / (2 * a);
      if (f >= 0 && f <= 1) {
        let d = r.add(s.scale(f));
        return { point: d, normal: d.sub(o), fraction: f };
      }
    } else {
      let f = (-u + Math.sqrt(c)) / (2 * a), d = (-u - Math.sqrt(c)) / (2 * a), v = null;
      if (f >= 0 && f <= 1 && (v = f), d >= 0 && d <= 1 && (v = Math.min(d, v ?? d)), v != null) {
        let h = r.add(s.scale(v));
        return { point: h, normal: h.sub(o).unit(), fraction: v };
      }
    }
    return null;
  }
  i(Eo, "raycastCircle");
  function qa(t18, e, n) {
    let r = n.pts, o = null, s = r[r.length - 1];
    for (let a = 0; a < r.length; a++) {
      let m = r[a], u = Oo(t18, e, new Te(s, m));
      u && (!o || o.fraction > u.fraction) && (o = u), s = m;
    }
    return o;
  }
  i(qa, "raycastPolygon");
  function za(t18, e, n) {
    let r = n.toMat2(), o = r.inverse, s = o.transform(t18.sub(n.center)), a = o.transform(e), m = Eo(s, a, new Ce(x(), 1));
    if (m) {
      let u = Dt.rotation(se(-n.angle)), c = Dt.scale(n.radiusX, n.radiusY).transform(m.point), f = r.transform(m.point).add(n.center), d = f.dist(t18) / e.len();
      return { point: f, normal: u.transform(x(n.radiusY ** 2 * c.x, n.radiusX ** 2 * c.y)).unit(), fraction: d };
    }
    return m;
  }
  i(za, "raycastEllipse");
  function To(t18, e, n, r = 64) {
    let o = t18, s = e.len(), a = e.scale(1 / s), m = 0, u = x(Math.floor(t18.x), Math.floor(t18.y)), p = x(a.x > 0 ? 1 : -1, a.y > 0 ? 1 : -1), c = x(Math.abs(1 / a.x), Math.abs(1 / a.y)), f = x(p.x > 0 ? u.x + 1 - t18.x : t18.x - u.x, p.y > 0 ? u.y + 1 - t18.y : t18.y - u.y), d = x(c.x < 1 / 0 ? c.x * f.x : 1 / 0, c.y < 1 / 0 ? c.y * f.y : 1 / 0), v = -1;
    for (; m <= r; ) {
      let h = n(u);
      if (h === true)
        return { point: o.add(a.scale(m)), normal: x(v === 0 ? -p.x : 0, v === 1 ? -p.y : 0), fraction: m / s, gridPos: u };
      if (h)
        return h;
      d.x < d.y ? (u.x += p.x, m = d.x, d.x += c.x, v = 0) : (u.y += p.y, m = d.y, d.y += c.y, v = 1);
    }
    return null;
  }
  i(To, "raycastGrid");
  var Tn = class t7 {
    static {
      i(this, "Point");
    }
    pt;
    constructor(e) {
      this.pt = e.clone();
    }
    transform(e) {
      return new t7(e.multVec2(this.pt));
    }
    bbox() {
      return new W(this.pt, 0, 0);
    }
    area() {
      return 0;
    }
    clone() {
      return new t7(this.pt);
    }
    collides(e) {
      return Ia(this, e);
    }
    contains(e) {
      return this.pt.eq(e);
    }
    raycast(e, n) {
      return null;
    }
    random() {
      return this.pt.clone();
    }
  };
  var Te = class t8 {
    static {
      i(this, "Line");
    }
    p1;
    p2;
    constructor(e, n) {
      this.p1 = e.clone(), this.p2 = n.clone();
    }
    transform(e) {
      return new t8(e.multVec2(this.p1), e.multVec2(this.p2));
    }
    bbox() {
      return W.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new t8(this.p1, this.p2);
    }
    collides(e) {
      return Ka(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return Oo(e, n, this);
    }
    random() {
      return this.p1.add(this.p2.sub(this.p1).scale(ge(1)));
    }
  };
  var W = class t9 {
    static {
      i(this, "Rect");
    }
    pos;
    width;
    height;
    constructor(e, n, r) {
      this.pos = e.clone(), this.width = n, this.height = r;
    }
    static fromPoints(e, n) {
      return new t9(e.clone(), n.x - e.x, n.y - e.y);
    }
    center() {
      return new C(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [this.pos, this.pos.add(this.width, 0), this.pos.add(this.width, this.height), this.pos.add(0, this.height)];
    }
    transform(e) {
      return new ye(this.points().map((n) => e.multVec2(n)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new t9(this.pos.clone(), this.width, this.height);
    }
    distToPoint(e) {
      return Math.sqrt(this.sdistToPoint(e));
    }
    sdistToPoint(e) {
      let n = this.pos, r = this.pos.add(this.width, this.height), o = Math.max(n.x - e.x, 0, e.x - r.x), s = Math.max(n.y - e.y, 0, e.y - r.y);
      return o * o + s * s;
    }
    collides(e) {
      return ka(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return Ha(e, n, this);
    }
    random() {
      return this.pos.add(ge(this.width), ge(this.height));
    }
  };
  var Ce = class t10 {
    static {
      i(this, "Circle");
    }
    center;
    radius;
    constructor(e, n) {
      this.center = e.clone(), this.radius = n;
    }
    transform(e) {
      return new Ke(this.center, this.radius, this.radius).transform(e);
    }
    bbox() {
      return W.fromPoints(this.center.sub(x(this.radius)), this.center.add(x(this.radius)));
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new t10(this.center, this.radius);
    }
    collides(e) {
      return ja(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return Eo(e, n, this);
    }
    random() {
      return this.center.add(C.fromAngle(ge(360)).scale(ge(this.radius)));
    }
  };
  var Ke = class t11 {
    static {
      i(this, "Ellipse");
    }
    center;
    radiusX;
    radiusY;
    angle;
    constructor(e, n, r, o = 0) {
      this.center = e.clone(), this.radiusX = n, this.radiusY = r, this.angle = o;
    }
    static fromMat2(e) {
      let n = e.inverse, r = n.transpose.mul(n), [o, s] = r.eigenvalues, [a, m] = r.eigenvectors(o, s), [u, p] = [1 / Math.sqrt(o), 1 / Math.sqrt(s)];
      return u > p ? new t11(x(), u, p, ct(Math.atan2(-a[1], a[0]))) : new t11(x(), p, u, ct(Math.atan2(-m[1], m[0])));
    }
    toMat2() {
      let e = se(this.angle), n = Math.cos(e), r = Math.sin(e);
      return new Dt(n * this.radiusX, -r * this.radiusY, r * this.radiusX, n * this.radiusY);
    }
    transform(e) {
      if (this.angle == 0 && e.getRotation() == 0)
        return new t11(e.multVec2(this.center), e.m[0] * this.radiusX, e.m[5] * this.radiusY);
      {
        let n = this.toMat2(), r = e.getRotation(), o = e.getScale();
        n = ht.fromMat2(n).scale(o.x, o.y).rotate(r).toMat2();
        let a = t11.fromMat2(n);
        return a.center = e.multVec2(this.center), a;
      }
    }
    bbox() {
      if (this.angle == 0)
        return W.fromPoints(this.center.sub(x(this.radiusX, this.radiusY)), this.center.add(x(this.radiusX, this.radiusY)));
      {
        let e = se(this.angle), n = Math.cos(e), r = Math.sin(e), o = this.radiusX * n, s = this.radiusX * r, a = this.radiusY * r, m = this.radiusY * n, u = Math.sqrt(o * o + a * a), p = Math.sqrt(s * s + m * m);
        return W.fromPoints(this.center.sub(x(u, p)), this.center.add(x(u, p)));
      }
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new t11(this.center, this.radiusX, this.radiusY, this.angle);
    }
    collides(e) {
      return Na(this, e);
    }
    contains(e) {
      e = e.sub(this.center);
      let n = se(this.angle), r = Math.cos(n), o = Math.sin(n), s = e.x * r + e.y * o, a = -e.x * o + e.y * r;
      return s * s / (this.radiusX * this.radiusX) + a * a / (this.radiusY * this.radiusY) < 1;
    }
    raycast(e, n) {
      return za(e, n, this);
    }
    random() {
      return this.center;
    }
  };
  function Ya(t18, e, n, r) {
    let o = e.sub(t18), s = r.sub(n), a = o.cross(s);
    return a < 1e-5 && a > -1e-5 || (a = n.sub(t18).cross(s) / a, a < 0 || a > 1) ? null : t18.add(o.scale(a));
  }
  i(Ya, "segmentLineIntersection");
  var ye = class t12 {
    static {
      i(this, "Polygon");
    }
    pts;
    constructor(e) {
      if (e.length < 3)
        throw new Error("Polygons should have at least 3 vertices");
      this.pts = e;
    }
    transform(e) {
      return new t12(this.pts.map((n) => e.multVec2(n)));
    }
    bbox() {
      let e = x(Number.MAX_VALUE), n = x(-Number.MAX_VALUE);
      for (let r of this.pts)
        e.x = Math.min(e.x, r.x), n.x = Math.max(n.x, r.x), e.y = Math.min(e.y, r.y), n.y = Math.max(n.y, r.y);
      return W.fromPoints(e, n);
    }
    area() {
      let e = 0, n = this.pts.length;
      for (let r = 0; r < n; r++) {
        let o = this.pts[r], s = this.pts[(r + 1) % n];
        e += o.x * s.y * 0.5, e -= s.x * o.y * 0.5;
      }
      return Math.abs(e);
    }
    clone() {
      return new t12(this.pts.map((e) => e.clone()));
    }
    collides(e) {
      return _a(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, n) {
      return qa(e, n, this);
    }
    random() {
      return x();
    }
    cut(e, n) {
      let r = new Te(e, n), o = [], s = [], a = n.sub(e), m = this.pts[this.pts.length - 1], u = m.sub(e), p = a.cross(u) > 0;
      return this.pts.forEach((c) => {
        u = c.sub(e);
        let f = a.cross(u) > 0;
        if (p != f) {
          let d = Ya(m, c, e, n);
          o.push(d), s.push(d), p = f;
        }
        (f ? o : s).push(c), m = c;
      }), [o.length ? new t12(o) : null, s.length ? new t12(s) : null];
    }
  };
  function Ao(t18, e, n, r) {
    let o = r * r, s = 1 - r, a = s * s;
    return t18.scale(a).add(e.scale(2 * s * r)).add(n.scale(o));
  }
  i(Ao, "evaluateQuadratic");
  function So(t18, e, n, r) {
    let o = 1 - r;
    return e.sub(t18).scale(2 * o).add(n.sub(e).scale(2 * r));
  }
  i(So, "evaluateQuadraticFirstDerivative");
  function Vo(t18, e, n, r) {
    return n.sub(e.scale(2)).add(t18).scale(2);
  }
  i(Vo, "evaluateQuadraticSecondDerivative");
  function Qt(t18, e, n, r, o) {
    let s = o * o, a = s * o, m = 1 - o, u = m * m, p = u * m;
    return t18.scale(p).add(e.scale(3 * u * o)).add(n.scale(3 * m * s)).add(r.scale(a));
  }
  i(Qt, "evaluateBezier");
  function Po(t18, e, n, r, o) {
    let s = o * o, a = 1 - o, m = a * a;
    return e.sub(t18).scale(3 * m).add(n.sub(e).scale(6 * a * o)).add(r.sub(n).scale(3 * s));
  }
  i(Po, "evaluateBezierFirstDerivative");
  function Go(t18, e, n, r, o) {
    let s = 1 - o;
    return n.sub(e.scale(2)).add(t18).scale(6 * s).add(r.sub(n.scale(2)).add(e).scale(6 * o));
  }
  i(Go, "evaluateBezierSecondDerivative");
  function Ro(t18, e, n, r, o) {
    let s = 0.5 * (((-o + 2) * o - 1) * o), a = 0.5 * ((3 * o - 5) * o * o + 2), m = 0.5 * (((-3 * o + 4) * o + 1) * o), u = 0.5 * ((o - 1) * o * o);
    return t18.scale(s).add(e.scale(a)).add(n.scale(m)).add(r.scale(u));
  }
  i(Ro, "evaluateCatmullRom");
  function Do(t18, e, n, r, o) {
    let s = 0.5 * ((-3 * o + 4) * o - 1), a = 0.5 * ((9 * o - 10) * o), m = 0.5 * ((-9 * o + 8) * o + 1), u = 0.5 * ((3 * o - 2) * o);
    return t18.scale(s).add(e.scale(a)).add(n.scale(m)).add(r.scale(u));
  }
  i(Do, "evaluateCatmullRomFirstDerivative");
  function Mo(t18) {
    let e = Tr(t18), n = e(1);
    return (r) => {
      let o = r * n, s = e(o, true);
      return t18(s);
    };
  }
  i(Mo, "normalizedCurve");
  function Tr(t18, e = 10, n = 10) {
    let r = [0], o = [0], a = 1 / (e - 1) / n, m = 0, u = t18(0), p = 0;
    for (let c = 1; c < e; c++) {
      for (let f = 0; f < n; f++) {
        p += a;
        let d = t18(p), v = d.dist(u);
        m += v, u = d;
      }
      r[c] = m, o[c] = p;
    }
    return o[e - 1] = 1, (c, f = false) => {
      if (f) {
        let d = c;
        if (d <= 0)
          return 0;
        if (d >= m)
          return 1;
        let v = 0;
        for (; r[v + 1] < d; )
          v++;
        let h = o[v], O2 = o[v + 1], y = r[v], w = r[v + 1], V2 = (d - y) / (w - y);
        return h + (O2 - h) * V2;
      } else {
        if (c <= 0)
          return 0;
        if (c >= 1)
          return r[e - 1];
        let d = 0;
        for (; o[d + 1] < c; )
          d++;
        let v = o[d], h = o[d + 1], O2 = r[d], y = r[d + 1], w = (c - v) / (h - v);
        return O2 + (y - O2) * w;
      }
    };
  }
  i(Tr, "curveLengthApproximation");
  function Ut(t18, e, n, r) {
    let o = 2 * t18 + e - 2 * r + n, s = -3 * t18 + 3 * r - 2 * e - n, a = e, m = t18;
    return (u) => {
      let p = u * u, c = p * u;
      return o * c + s * p + a * u + m;
    };
  }
  i(Ut, "hermite");
  function Ar(t18, e, n, r, o, s = Ut) {
    let a = s(e.x, (1 - o) * (n.x - t18.x), (1 - o) * (r.x - e.x), n.x), m = s(e.y, (1 - o) * (n.y - t18.y), (1 - o) * (r.y - e.y), n.y);
    return (u) => new C(a(u), m(u));
  }
  i(Ar, "cardinal");
  function Ft(t18, e, n, r, o = Ut) {
    return Ar(t18, e, n, r, 0.5, o);
  }
  i(Ft, "catmullRom");
  function Bo(t18, e, n, r, o = Ut) {
    return Ft(r.add(t18.sub(e).scale(6)), t18, r, t18.add(r.sub(n).scale(6)), o);
  }
  i(Bo, "bezier");
  function Uo(t18, e, n, r, o, s, a, m = Ut) {
    let u = m(e.x, 0.5 * (1 - o) * (1 + a) * (1 + s) * (e.x - t18.x) + 0.5 * (1 - o) * (1 - a) * (1 - s) * (n.x - e.x), 0.5 * (1 - o) * (1 + a) * (1 - s) * (n.x - e.x) + 0.5 * (1 - o) * (1 - a) * (1 + s) * (r.x - n.x), n.x), p = m(e.y, 0.5 * (1 - o) * (1 + a) * (1 + s) * (e.y - t18.y) + 0.5 * (1 - o) * (1 - a) * (1 - s) * (n.y - e.y), 0.5 * (1 - o) * (1 + a) * (1 - s) * (n.y - e.y) + 0.5 * (1 - o) * (1 - a) * (1 + s) * (r.y - n.y), n.y);
    return (c) => new C(u(c), p(c));
  }
  i(Uo, "kochanekBartels");
  function Fo(t18, e, n, r) {
    let o = 2 * t18 + e - 2 * r + n, s = -3 * t18 + 3 * r - 2 * e + n, a = e;
    return (m) => {
      let u = m * m;
      return 3 * o * u + 2 * s * m + a;
    };
  }
  i(Fo, "hermiteFirstDerivative");
  function Yt(t18) {
    return 0 <= t18 && t18 <= 1;
  }
  i(Yt, "inZeroOneDomain");
  function gr(t18, e) {
    return Math.abs(t18 - e) <= Number.EPSILON;
  }
  i(gr, "approximately");
  function Wt(t18) {
    return t18 < 0 ? -Math.pow(-t18, 1 / 3) : Math.pow(t18, 1 / 3);
  }
  i(Wt, "cubeRoot");
  function Wa(t18, e, n, r) {
    let o = 3 * t18 - 6 * e + 3 * n, s = -3 * t18 + 3 * e, a = t18, m = -t18 + 3 * e - 3 * n + r;
    if (gr(m, 0)) {
      if (gr(o, 0))
        return gr(s, 0) ? [] : [-a / s].filter(Yt);
      let w = Math.sqrt(s * s - 4 * o * a), V2 = 2 * o;
      return [(w - s) / V2, (-s - w) / V2].filter(Yt);
    }
    o /= m, s /= m, a /= m;
    let u = (3 * s - o * o) / 3, p = u / 3, c = (2 * o * o * o - 9 * o * s + 27 * a) / 27, f = c / 2, d = f * f + p * p * p;
    if (d < 0) {
      let w = -u / 3, V2 = w * w * w, R = Math.sqrt(V2), P = -c / (2 * R), M = P < -1 ? -1 : P > 1 ? 1 : P, b = Math.acos(M), A = 2 * Wt(R), G = A * Math.cos(b / 3) - o / 3, D = A * Math.cos((b + 2 * Math.PI) / 3) - o / 3, U = A * Math.cos((b + 4 * Math.PI) / 3) - o / 3;
      return [G, D, U].filter(Yt);
    }
    if (d === 0) {
      let w = f < 0 ? Wt(-f) : -Wt(f), V2 = 2 * w - o / 3, R = -w - o / 3;
      return [V2, R].filter(Yt);
    }
    let v = Math.sqrt(d), h = Wt(v - f), O2 = Wt(v + f);
    return [h - O2 - o / 3].filter(Yt);
  }
  i(Wa, "getCubicRoots");
  function $a(t18, e, n, r, o) {
    let s = Wa(t18.x - o, e.x - o, n.x - o, r.x - o);
    return s.length > 0 ? Qt(t18, e, n, r, s[0]).y : NaN;
  }
  i($a, "cubicBezierYforX");
  function Lo(t18) {
    if (!t18 || t18.length == 0)
      throw new Error("Need at least one point for easingLinear.");
    let e = t18.length;
    return (n) => {
      if (n <= 0 || t18.length == 1 || n <= t18[0].x)
        return t18[0].y;
      for (let r = 0; r < e; r++)
        if (t18[r].x >= n)
          return Se(n, t18[r - 1].x, t18[r].x, t18[r - 1].y, t18[r].y);
      return t18[t18.length - 1].y;
    };
  }
  i(Lo, "easingLinear");
  function Io(t18, e) {
    return (n) => $a(x(0, 0), t18, e, x(1, 1), n);
  }
  i(Io, "easingCubicBezier");
  function Ko(t18, e = "jump-end") {
    let n = 1 / t18, r = e == "jump-start" || e == "jump-both", o = e == "jump-end" || e == "jump-both", s = 1 / (t18 + (o ? 1 : 0)), a = r ? s : 0;
    return (m) => {
      let u = Math.floor(m / n);
      return a + u * s;
    };
  }
  i(Ko, "easingSteps");
  function jo(t18, e) {
    let n = Number.MAX_VALUE, r = { normal: x(0), distance: 0 };
    for (let o of [t18, e])
      for (let s = 0; s < o.pts.length; s++) {
        let a = o.pts[s], u = o.pts[(s + 1) % o.pts.length].sub(a).normal().unit(), p = Number.MAX_VALUE, c = -Number.MAX_VALUE;
        for (let h = 0; h < t18.pts.length; h++) {
          let O2 = t18.pts[h].dot(u);
          p = Math.min(p, O2), c = Math.max(c, O2);
        }
        let f = Number.MAX_VALUE, d = -Number.MAX_VALUE;
        for (let h = 0; h < e.pts.length; h++) {
          let O2 = e.pts[h].dot(u);
          f = Math.min(f, O2), d = Math.max(d, O2);
        }
        let v = Math.min(c, d) - Math.max(p, f);
        if (v < 0)
          return null;
        if (v < Math.abs(n)) {
          let h = d - p, O2 = f - c;
          n = Math.abs(h) < Math.abs(O2) ? h : O2, r.normal = u, r.distance = n;
        }
      }
    return r;
  }
  i(jo, "sat");
  function ko(t18, e, n) {
    return (e.x - t18.x) * (n.y - t18.y) - (e.y - t18.y) * (n.x - t18.x) >= 0;
  }
  i(ko, "isOrientedCcw");
  function Xa(t18) {
    let e = 0, n = t18[t18.length - 1];
    for (let r = 0; r < t18.length; r++)
      e += (t18[r].x - n.x) * (t18[r].y + n.y), n = t18[r];
    return e < 0;
  }
  i(Xa, "isOrientedCcwPolygon");
  function br(t18, e, n, r) {
    let o = r.x - n.x, s = r.y - n.y, a = o * (t18.y - n.y) - s * (t18.x - n.x), m = o * (e.y - n.y) - s * (e.x - n.x);
    return a * m >= 0;
  }
  i(br, "onSameSide");
  function Qa(t18, e, n, r) {
    return br(t18, e, n, r) && br(t18, n, e, r) && br(t18, r, e, n);
  }
  i(Qa, "pointInTriangle");
  function Ja(t18, e, n, r) {
    for (let o of t18)
      if (o !== e && o !== n && o !== r && Qa(o, e, n, r))
        return true;
    return false;
  }
  i(Ja, "someInTriangle");
  function Za(t18, e, n, r) {
    return ko(t18, e, n) && !Ja(r, t18, e, n);
  }
  i(Za, "isEar");
  function Rn(t18) {
    if (t18.length < 3)
      return [];
    if (t18.length == 3)
      return [t18];
    let e = [], n = [], r = 0;
    for (let f = 0; f < t18.length; f++) {
      let d = t18[r], v = t18[f];
      (v.x < d.x || v.x == d.x && v.y < d.y) && (r = r), e[f] = f + 1, n[f] = f - 1;
    }
    e[e.length - 1] = 0, n[0] = n.length - 1, Xa(t18) || ([e, n] = [n, e]);
    let o = [];
    for (let f = 0; f < t18.length; ++f)
      ko(t18[n[f]], t18[f], t18[e[f]]) || o.push(t18[f]);
    let s = [], a = t18.length, m = 1, u = 0, p, c;
    for (; a > 3; ) {
      p = e[m], c = n[m];
      let f = t18[c], d = t18[m], v = t18[p];
      if (Za(f, d, v, o))
        s.push([f, d, v]), e[c] = p, n[p] = c, o.splice(o.indexOf(d), 1), --a, u = 0;
      else if (++u > a)
        return [];
      m = p;
    }
    return p = e[m], c = n[m], s.push([t18[c], t18[m], t18[p]]), s;
  }
  i(Rn, "triangulate");
  function _o(t18) {
    if (t18.length < 3)
      return false;
    let e = t18.length - 2, n = t18.length - 1, r = 0, o = t18[n].sub(t18[e]), s = t18[r].sub(t18[n]), a = o.cross(s);
    for (; r + 1 < t18.length; )
      if (e = n, n = r, r++, o = t18[n].sub(t18[e]), s = t18[r].sub(t18[n]), o.cross(s) * a < 0)
        return false;
    return true;
  }
  i(_o, "isConvex");
  var No = i((t18) => t18[0] instanceof I, "arrayIsColor");
  var Ho = i((t18) => t18[0] instanceof C, "arrayIsVec2");
  var qo = i((t18) => typeof t18[0] == "number", "arrayIsNumber");
  var Lt = class {
    static {
      i(this, "BinaryHeap");
    }
    _items;
    _compareFn;
    constructor(e = (n, r) => n < r) {
      this._compareFn = e, this._items = [];
    }
    insert(e) {
      this._items.push(e), this.moveUp(this._items.length - 1);
    }
    remove() {
      if (this._items.length === 0)
        return null;
      let e = this._items[0], n = this._items.pop();
      return this._items.length !== 0 && (this._items[0] = n, this.moveDown(0)), e;
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(e) {
      for (; e > 0; ) {
        let n = Math.floor((e - 1) / 2);
        if (!this._compareFn(this._items[e], this._items[n]) && this._items[e] >= this._items[n])
          break;
        this.swap(e, n), e = n;
      }
    }
    moveDown(e) {
      for (; e < Math.floor(this._items.length / 2); ) {
        let n = 2 * e + 1;
        if (n < this._items.length - 1 && !this._compareFn(this._items[n], this._items[n + 1]) && ++n, this._compareFn(this._items[e], this._items[n]))
          break;
        this.swap(e, n), e = n;
      }
    }
    swap(e, n) {
      [this._items[e], this._items[n]] = [this._items[n], this._items[e]];
    }
    get length() {
      return this._items.length;
    }
  };
  function eu(t18) {
    let e = window.atob(t18), n = e.length, r = new Uint8Array(n);
    for (let o = 0; o < n; o++)
      r[o] = e.charCodeAt(o);
    return r.buffer;
  }
  i(eu, "base64ToArrayBuffer");
  function zo(t18) {
    return eu(t18.split(",")[1]);
  }
  i(zo, "dataURLToArrayBuffer");
  function Dn(t18, e) {
    let n = document.createElement("a");
    n.href = e, n.download = t18, n.click();
  }
  i(Dn, "download");
  function Sr(t18, e) {
    Dn(t18, "data:text/plain;charset=utf-8," + e);
  }
  i(Sr, "downloadText");
  function Yo(t18, e) {
    Sr(t18, JSON.stringify(e));
  }
  i(Yo, "downloadJSON");
  function Vr(t18, e) {
    let n = URL.createObjectURL(e);
    Dn(t18, n), URL.revokeObjectURL(n);
  }
  i(Vr, "downloadBlob");
  var Mn = i((t18) => t18.match(/^data:\w+\/\w+;base64,.+/), "isDataURL");
  var Wo = i((t18) => t18.split(".").slice(0, -1).join("."), "getFileName");
  function Bn(t18, e) {
    if (t18 === e)
      return true;
    let n = typeof t18, r = typeof e;
    if (n !== r)
      return false;
    if (n === "object" && r === "object" && t18 !== null && e !== null) {
      if (Array.isArray(t18) !== Array.isArray(e))
        return false;
      let o = Object.keys(t18), s = Object.keys(e);
      if (o.length !== s.length)
        return false;
      for (let a of o) {
        let m = t18[a], u = e[a];
        if (!Bn(m, u))
          return false;
      }
      return true;
    }
    return false;
  }
  i(Bn, "deepEq");
  var Jt = class extends Map {
    static {
      i(this, "Registry");
    }
    lastID = 0;
    push(e) {
      let n = this.lastID;
      return this.set(n, e), this.lastID++, n;
    }
    pushd(e) {
      let n = this.push(e);
      return () => this.delete(n);
    }
  };
  var je = class t13 {
    static {
      i(this, "KEventController");
    }
    paused = false;
    cancel;
    constructor(e) {
      this.cancel = e;
    }
    static join(e) {
      let n = new t13(() => e.forEach((r) => r.cancel()));
      return Object.defineProperty(n, "paused", { get: i(() => e[0].paused, "get"), set: i((r) => e.forEach((o) => o.paused = r), "set") }), n.paused = false, n;
    }
    static replace(e, n) {
      return e.cancel = () => n.cancel(), n.paused = e.paused, Object.defineProperty(e, "paused", { get: i(() => n.paused, "get"), set: i((r) => n.paused = r, "set") }), e;
    }
  };
  var ae = class {
    static {
      i(this, "KEvent");
    }
    handlers = new Jt();
    add(e) {
      let n = this.handlers.pushd((...o) => {
        r.paused || e(...o);
      }), r = new je(n);
      return r;
    }
    addOnce(e) {
      let n = this.add((...r) => {
        n.cancel(), e(...r);
      });
      return n;
    }
    next() {
      return new Promise((e) => this.addOnce(e));
    }
    trigger(...e) {
      this.handlers.forEach((n) => n(...e));
    }
    numListeners() {
      return this.handlers.size;
    }
    clear() {
      this.handlers.clear();
    }
  };
  var ze = class {
    static {
      i(this, "KEventHandler");
    }
    handlers = {};
    registers = {};
    on(e, n) {
      return this.handlers[e] || (this.handlers[e] = new ae()), this.handlers[e].add(n);
    }
    onOnce(e, n) {
      let r = this.on(e, (...o) => {
        r.cancel(), n(...o);
      });
      return r;
    }
    next(e) {
      return new Promise((n) => {
        this.onOnce(e, (...r) => n(r[0]));
      });
    }
    trigger(e, ...n) {
      this.handlers[e] && this.handlers[e].trigger(...n);
    }
    remove(e) {
      delete this.handlers[e];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(e) {
      return this.handlers[e]?.numListeners() ?? 0;
    }
  };
  var $o = i((t18) => t18 instanceof Error ? t18.message : String(t18), "getErrorMessage");
  function Zt(t18, e) {
    return Number(t18.toFixed(e));
  }
  i(Zt, "toFixed");
  function me(t18, e) {
    return (...n) => {
      let r = n.length;
      if (r === t18.length)
        return t18(...n);
      if (r === e.length)
        return e(...n);
    };
  }
  i(me, "overload2");
  var tu = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
  function Qo(t18) {
    if (typeof t18 != "string")
      throw new TypeError("string cannot be undefined or null");
    let e = [], n = 0, r = 0;
    for (; n < t18.length; ) {
      if (r += nu(n + r, t18), cu(t18[n + r]) && r++, su(t18[n + r]) && r++, au(t18[n + r]) && r++, lu(t18[n + r])) {
        r++;
        continue;
      }
      e.push(t18.substring(n, n + r)), n += r, r = 0;
    }
    return e;
  }
  i(Qo, "runes");
  function nu(t18, e) {
    let n = e[t18];
    if (!ru(n) || t18 === e.length - 1)
      return 1;
    let r = n + e[t18 + 1], o = e.substring(t18 + 2, t18 + 5);
    return Xo(r) && Xo(o) ? 4 : ou(r) && uu(o) ? e.slice(t18).indexOf(String.fromCodePoint(917631)) + 2 : iu(o) ? 4 : 2;
  }
  i(nu, "nextUnits");
  function ru(t18) {
    return t18 && gt(t18[0].charCodeAt(0), 55296, 56319);
  }
  i(ru, "isFirstOfSurrogatePair");
  function Xo(t18) {
    return gt(Pr(t18), 127462, 127487);
  }
  i(Xo, "isRegionalIndicator");
  function ou(t18) {
    return gt(Pr(t18), 127988, 127988);
  }
  i(ou, "isSubdivisionFlag");
  function iu(t18) {
    return gt(Pr(t18), 127995, 127999);
  }
  i(iu, "isFitzpatrickModifier");
  function su(t18) {
    return typeof t18 == "string" && gt(t18.charCodeAt(0), 65024, 65039);
  }
  i(su, "isVariationSelector");
  function au(t18) {
    return typeof t18 == "string" && gt(t18.charCodeAt(0), 8400, 8447);
  }
  i(au, "isDiacriticalMark");
  function uu(t18) {
    let e = t18.codePointAt(0);
    return typeof t18 == "string" && typeof e == "number" && gt(e, 917504, 917631);
  }
  i(uu, "isSupplementarySpecialpurposePlane");
  function cu(t18) {
    return typeof t18 == "string" && tu.includes(t18.charCodeAt(0));
  }
  i(cu, "isGrapheme");
  function lu(t18) {
    return typeof t18 == "string" && t18.charCodeAt(0) === 8205;
  }
  i(lu, "isZeroWidthJoiner");
  function Pr(t18) {
    let e = t18.charCodeAt(0) - 55296, n = t18.charCodeAt(1) - 56320;
    return (e << 10) + n + 65536;
  }
  i(Pr, "codePointFromSurrogatePair");
  function gt(t18, e, n) {
    return t18 >= e && t18 <= n;
  }
  i(gt, "betweenInclusive");
  var Me = i((t18, e) => Array.isArray(t18) ? t18?.includes(e) : t18 === e, "isEqOrIncludes");
  var Ye = i((t18, e) => Array.isArray(e) ? e.some((n) => t18.has(n)) : t18.has(e), "setHasOrIncludes");
  var en = i((t18, e, n) => {
    t18.has(e) ? t18.get(e)?.push(n) : t18.set(e, [n]);
  }, "mapAddOrPush");
  var Jo = /* @__PURE__ */ (() => {
    let t18 = 0;
    return () => t18++;
  })();
  var Zo = { "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "select", "10": "lstick", "16": "start" }, sticks: { left: { x: 0, y: 1 } } }, "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "9": "start", "10": "lstick", "16": "select" }, sticks: { left: { x: 0, y: 1 } } }, "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home", "17": "capture" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } }, default: { buttons: { "0": "south", "1": "east", "2": "west", "3": "north", "4": "lshoulder", "5": "rshoulder", "6": "ltrigger", "7": "rtrigger", "8": "select", "9": "start", "10": "lstick", "11": "rstick", "12": "dpad-up", "13": "dpad-down", "14": "dpad-left", "15": "dpad-right", "16": "home" }, sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } } } };
  var ei = i(() => lt.lastInputDevice, "getLastInputDeviceType");
  var ti = i(() => {
    let t18 = lt.buttons;
    for (let e in t18) {
      let n = t18[e].keyboard && [t18[e].keyboard].flat(), r = t18[e].keyboardCode && [t18[e].keyboardCode].flat(), o = t18[e].gamepad && [t18[e].gamepad].flat(), s = t18[e].mouse && [t18[e].mouse].flat();
      n && n.forEach((a) => {
        en(lt.buttonsByKey, a, e);
      }), r && r.forEach((a) => {
        en(lt.buttonsByKeyCode, a, e);
      }), o && o.forEach((a) => {
        en(lt.buttonsByGamepad, a, e);
      }), s && s.forEach((a) => {
        en(lt.buttonsByMouse, a, e);
      });
    }
  }, "parseButtonBindings");
  var bt = class {
    static {
      i(this, "ButtonState");
    }
    pressed = /* @__PURE__ */ new Set([]);
    pressedRepeat = /* @__PURE__ */ new Set([]);
    released = /* @__PURE__ */ new Set([]);
    down = /* @__PURE__ */ new Set([]);
    update() {
      this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear();
    }
    press(e) {
      this.pressed.add(e), this.pressedRepeat.add(e), this.down.add(e);
    }
    pressRepeat(e) {
      this.pressedRepeat.add(e);
    }
    release(e) {
      this.down.delete(e), this.pressed.delete(e), this.released.add(e);
    }
  };
  var Gr = class {
    static {
      i(this, "GamepadState");
    }
    buttonState = new bt();
    stickState = /* @__PURE__ */ new Map();
  };
  var Rr = class {
    static {
      i(this, "FPSCounter");
    }
    dts = [];
    timer = 0;
    fps = 0;
    tick(e) {
      this.dts.push(e), this.timer += e, this.timer >= 1 && (this.timer = 0, this.fps = Math.round(1 / (this.dts.reduce((n, r) => n + r) / this.dts.length)), this.dts = []);
    }
  };
  var lt;
  var ni = Zo;
  var pu = i((t18) => {
    let e = t18.buttons ?? {};
    return { canvas: t18.canvas, buttons: e, buttonsByKey: /* @__PURE__ */ new Map(), buttonsByMouse: /* @__PURE__ */ new Map(), buttonsByGamepad: /* @__PURE__ */ new Map(), buttonsByKeyCode: /* @__PURE__ */ new Map(), loopID: null, stopped: false, dt: 0, fixedDt: 1 / 50, restDt: 0, time: 0, realTime: 0, fpsCounter: new Rr(), timeScale: 1, skipTime: false, isHidden: false, numFrames: 0, mousePos: new C(0), mouseDeltaPos: new C(0), keyState: new bt(), mouseState: new bt(), mergedGamepadState: new Gr(), gamepadStates: /* @__PURE__ */ new Map(), lastInputDevice: null, buttonState: new bt(), gamepads: [], charInputted: [], isMouseMoved: false, lastWidth: t18.canvas.offsetWidth, lastHeight: t18.canvas.offsetHeight, events: new ze() };
  }, "initAppState");
  var ri = i((t18) => {
    if (!t18.canvas)
      throw new Error("Please provide a canvas");
    let e = pu(t18);
    lt = e, ti();
    function n() {
      return e.dt * e.timeScale;
    }
    i(n, "dt");
    function r() {
      return e.fixedDt * e.timeScale;
    }
    i(r, "fixedDt");
    function o() {
      return e.restDt * e.timeScale;
    }
    i(o, "restDt");
    function s() {
      return e.isHidden;
    }
    i(s, "isHidden");
    function a() {
      return e.time;
    }
    i(a, "time");
    function m() {
      return e.fpsCounter.fps;
    }
    i(m, "fps");
    function u() {
      return e.numFrames;
    }
    i(u, "numFrames");
    function p() {
      return e.canvas.toDataURL();
    }
    i(p, "screenshot");
    function c(g) {
      e.canvas.style.cursor = g;
    }
    i(c, "setCursor");
    function f() {
      return e.canvas.style.cursor;
    }
    i(f, "getCursor");
    function d(g) {
      if (g)
        try {
          let T = e.canvas.requestPointerLock();
          T.catch && T.catch((S2) => console.error(S2));
        } catch (T) {
          console.error(T);
        }
      else
        document.exitPointerLock();
    }
    i(d, "setCursorLocked");
    function v() {
      return !!document.pointerLockElement;
    }
    i(v, "isCursorLocked");
    function h(g) {
      g.requestFullscreen ? g.requestFullscreen() : g.webkitRequestFullscreen && g.webkitRequestFullscreen();
    }
    i(h, "enterFullscreen");
    function O2() {
      document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    i(O2, "exitFullscreen");
    function y(g = true) {
      g ? h(e.canvas) : O2();
    }
    i(y, "setFullscreen");
    function w() {
      return document.fullscreenElement === e.canvas || document.webkitFullscreenElement === e.canvas;
    }
    i(w, "isFullscreen");
    function V2() {
      e.stopped = true;
      let g = Object.entries(Ge2), T = Object.entries(fr2), S2 = Object.entries(On);
      for (let [B, ne2] of g)
        e.canvas.removeEventListener(B, ne2);
      for (let [B, ne2] of T)
        document.removeEventListener(B, ne2);
      for (let [B, ne2] of S2)
        window.removeEventListener(B, ne2);
      uo.disconnect();
    }
    i(V2, "quit");
    function R(g, T) {
      e.loopID !== null && cancelAnimationFrame(e.loopID);
      let S2 = 0, B = 0, ne2 = i((Ae) => {
        if (e.stopped)
          return;
        if (document.visibilityState !== "visible") {
          e.loopID = requestAnimationFrame(ne2);
          return;
        }
        let oe2 = Ae / 1e3, Ze = Math.min(oe2 - e.realTime, 0.25), Rt = t18.maxFPS ? 1 / t18.maxFPS : 0;
        if (e.realTime = oe2, B += Ze, B > Rt) {
          if (!e.skipTime) {
            for (S2 += B, e.dt = e.fixedDt, e.restDt = 0; S2 > e.fixedDt; )
              S2 -= e.fixedDt, S2 < e.fixedDt && (e.restDt = S2), g();
            e.restDt = S2, e.dt = B, e.time += n(), e.fpsCounter.tick(e.dt);
          }
          B = 0, e.skipTime = false, e.numFrames++, T(Cn, Sa);
        }
        e.loopID = requestAnimationFrame(ne2);
      }, "frame");
      ne2(0);
    }
    i(R, "run");
    function P() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    i(P, "isTouchscreen");
    function M() {
      return e.mousePos.clone();
    }
    i(M, "mousePos");
    function b() {
      return e.mouseDeltaPos.clone();
    }
    i(b, "mouseDeltaPos");
    function E(g = "left") {
      return e.mouseState.pressed.has(g);
    }
    i(E, "isMousePressed");
    function A(g = "left") {
      return e.mouseState.down.has(g);
    }
    i(A, "isMouseDown");
    function G(g = "left") {
      return e.mouseState.released.has(g);
    }
    i(G, "isMouseReleased");
    function D() {
      return e.isMouseMoved;
    }
    i(D, "isMouseMoved");
    function U(g) {
      return g === void 0 ? e.keyState.pressed.size > 0 : Ye(e.keyState.pressed, g);
    }
    i(U, "isKeyPressed");
    function L2(g) {
      return g === void 0 ? e.keyState.pressedRepeat.size > 0 : Ye(e.keyState.pressedRepeat, g);
    }
    i(L2, "isKeyPressedRepeat");
    function H(g) {
      return g === void 0 ? e.keyState.down.size > 0 : Ye(e.keyState.down, g);
    }
    i(H, "isKeyDown");
    function q(g) {
      return g === void 0 ? e.keyState.released.size > 0 : Ye(e.keyState.released, g);
    }
    i(q, "isKeyReleased");
    function Y(g) {
      return g === void 0 ? e.mergedGamepadState.buttonState.pressed.size > 0 : Ye(e.mergedGamepadState.buttonState.pressed, g);
    }
    i(Y, "isGamepadButtonPressed");
    function _(g) {
      return g === void 0 ? e.mergedGamepadState.buttonState.down.size > 0 : Ye(e.mergedGamepadState.buttonState.down, g);
    }
    i(_, "isGamepadButtonDown");
    function K2(g) {
      return g === void 0 ? e.mergedGamepadState.buttonState.released.size > 0 : Ye(e.mergedGamepadState.buttonState.released, g);
    }
    i(K2, "isGamepadButtonReleased");
    function Z(g) {
      return g === void 0 ? e.buttonState.pressed.size > 0 : Ye(e.buttonState.pressed, g);
    }
    i(Z, "isButtonPressed");
    function $(g) {
      return g === void 0 ? e.buttonState.down.size > 0 : Ye(e.buttonState.down, g);
    }
    i($, "isButtonDown");
    function ee(g) {
      return g === void 0 ? e.buttonState.released.size > 0 : Ye(e.buttonState.released, g);
    }
    i(ee, "isButtonReleased");
    function Ee(g) {
      return e.buttons?.[g];
    }
    i(Ee, "getButton");
    function j(g, T) {
      e.buttons[g] = { ...e.buttons[g], ...T };
    }
    i(j, "setButton");
    function ft(g) {
      e.buttonState.press(g), e.events.trigger("buttonPress", g);
    }
    i(ft, "pressButton");
    function Pt(g) {
      e.buttonState.release(g), e.events.trigger("buttonRelease", g);
    }
    i(Pt, "releaseButton");
    function Nt(g) {
      return e.events.on("resize", g);
    }
    i(Nt, "onResize");
    let yn = me((g) => e.events.on("keyDown", g), (g, T) => e.events.on("keyDown", (S2) => Me(g, S2) && T(S2))), xn = me((g) => e.events.on("keyPress", (T) => g(T)), (g, T) => e.events.on("keyPress", (S2) => Me(g, S2) && T(S2))), ur = me((g) => e.events.on("keyPressRepeat", g), (g, T) => e.events.on("keyPressRepeat", (S2) => Me(g, S2) && T(S2))), cr = me((g) => e.events.on("keyRelease", g), (g, T) => e.events.on("keyRelease", (S2) => Me(g, S2) && T(S2))), Gt = me((g) => e.events.on("mouseDown", (T) => g(T)), (g, T) => e.events.on("mouseDown", (S2) => Me(g, S2) && T(S2))), $e2 = me((g) => e.events.on("mousePress", (T) => g(T)), (g, T) => e.events.on("mousePress", (S2) => Me(g, S2) && T(S2))), vn = me((g) => e.events.on("mouseRelease", (T) => g(T)), (g, T) => e.events.on("mouseRelease", (S2) => S2 === g && T(S2)));
    function F(g) {
      return e.events.on("mouseMove", () => g(M(), b()));
    }
    i(F, "onMouseMove");
    function N(g) {
      return e.events.on("charInput", g);
    }
    i(N, "onCharInput");
    function X2(g) {
      return e.events.on("touchStart", g);
    }
    i(X2, "onTouchStart");
    function re(g) {
      return e.events.on("touchMove", g);
    }
    i(re, "onTouchMove");
    function xe(g) {
      return e.events.on("touchEnd", g);
    }
    i(xe, "onTouchEnd");
    function J(g) {
      return e.events.on("scroll", g);
    }
    i(J, "onScroll");
    function we(g) {
      return e.events.on("hide", g);
    }
    i(we, "onHide");
    function Ht(g) {
      return e.events.on("show", g);
    }
    i(Ht, "onShow");
    let at = me((g) => e.events.on("gamepadButtonPress", (T, S2) => g(T, S2)), (g, T) => e.events.on("gamepadButtonPress", (S2, B) => Me(g, S2) && T(S2, B))), lr = me((g) => e.events.on("gamepadButtonDown", (T, S2) => g(T, S2)), (g, T) => e.events.on("gamepadButtonDown", (S2, B) => Me(g, S2) && T(S2, B))), mr = me((g) => e.events.on("gamepadButtonRelease", (T, S2) => g(T, S2)), (g, T) => e.events.on("gamepadButtonRelease", (S2, B) => Me(g, S2) && T(S2, B)));
    function pr2(g, T) {
      return e.events.on("gamepadStick", (S2, B, ne2) => S2 === g && T(B, ne2));
    }
    i(pr2, "onGamepadStick");
    function dr2(g) {
      e.events.on("gamepadConnect", g);
    }
    i(dr2, "onGamepadConnect");
    function wn(g) {
      e.events.on("gamepadDisconnect", g);
    }
    i(wn, "onGamepadDisconnect");
    function Xe(g) {
      return e.mergedGamepadState.stickState.get(g) || new C(0);
    }
    i(Xe, "getGamepadStick");
    function ut() {
      return [...e.charInputted];
    }
    i(ut, "charInputted");
    function qt() {
      return [...e.gamepads];
    }
    i(qt, "getGamepads");
    let Ie = me((g) => e.events.on("buttonPress", (T) => g(T)), (g, T) => e.events.on("buttonPress", (S2) => Me(g, S2) && T(S2))), zt = me((g) => e.events.on("buttonDown", (T) => g(T)), (g, T) => e.events.on("buttonDown", (S2) => Me(g, S2) && T(S2))), Je2 = me((g) => e.events.on("buttonRelease", (T) => g(T)), (g, T) => e.events.on("buttonRelease", (S2) => Me(g, S2) && T(S2)));
    function Cn() {
      e.events.trigger("input"), e.keyState.down.forEach((g) => e.events.trigger("keyDown", g)), e.mouseState.down.forEach((g) => e.events.trigger("mouseDown", g)), e.buttonState.down.forEach((g) => {
        e.events.trigger("buttonDown", g);
      }), Pa();
    }
    i(Cn, "processInput");
    function Sa() {
      e.keyState.update(), e.mouseState.update(), e.buttonState.update(), e.mergedGamepadState.buttonState.update(), e.mergedGamepadState.stickState.forEach((g, T) => {
        e.mergedGamepadState.stickState.set(T, new C(0));
      }), e.charInputted = [], e.isMouseMoved = false, e.mouseDeltaPos = new C(0), e.gamepadStates.forEach((g) => {
        g.buttonState.update(), g.stickState.forEach((T, S2) => {
          g.stickState.set(S2, new C(0));
        });
      });
    }
    i(Sa, "resetInput");
    function oo(g) {
      let T = { index: g.index, isPressed: i((S2) => e.gamepadStates.get(g.index)?.buttonState.pressed.has(S2) || false, "isPressed"), isDown: i((S2) => e.gamepadStates.get(g.index)?.buttonState.down.has(S2) || false, "isDown"), isReleased: i((S2) => e.gamepadStates.get(g.index)?.buttonState.released.has(S2) || false, "isReleased"), getStick: i((S2) => e.gamepadStates.get(g.index)?.stickState.get(S2) || x(), "getStick") };
      return e.gamepads.push(T), e.gamepadStates.set(g.index, { buttonState: new bt(), stickState: /* @__PURE__ */ new Map([["left", new C(0)], ["right", new C(0)]]) }), T;
    }
    i(oo, "registerGamepad");
    function Va(g) {
      e.gamepads = e.gamepads.filter((T) => T.index !== g.index), e.gamepadStates.delete(g.index);
    }
    i(Va, "removeGamepad");
    function Pa() {
      for (let g of navigator.getGamepads())
        g && !e.gamepadStates.has(g.index) && oo(g);
      for (let g of e.gamepads) {
        let T = navigator.getGamepads()[g.index];
        if (!T)
          continue;
        let B = (t18.gamepads ?? {})[T.id] || ni[T.id] || ni.default, ne2 = e.gamepadStates.get(g.index);
        if (ne2) {
          for (let Ae = 0; Ae < T.buttons.length; Ae++) {
            let oe2 = B.buttons[Ae], Ze = T.buttons[Ae], Rt = e.buttonsByGamepad.has(oe2);
            if (Ze.pressed) {
              if (ne2.buttonState.down.has(oe2)) {
                e.events.trigger("gamepadButtonDown", oe2, g);
                continue;
              }
              e.lastInputDevice = "gamepad", Rt && e.buttonsByGamepad.get(oe2)?.forEach((Re2) => {
                e.buttonState.press(Re2), e.events.trigger("buttonPress", Re2);
              }), e.mergedGamepadState.buttonState.press(oe2), ne2.buttonState.press(oe2), e.events.trigger("gamepadButtonPress", oe2, g);
            } else
              ne2.buttonState.down.has(oe2) && (Rt && e.buttonsByGamepad.get(oe2)?.forEach((Re2) => {
                e.buttonState.release(Re2), e.events.trigger("buttonRelease", Re2);
              }), e.mergedGamepadState.buttonState.release(oe2), ne2.buttonState.release(oe2), e.events.trigger("gamepadButtonRelease", oe2, g));
          }
          for (let Ae in B.sticks) {
            let oe2 = B.sticks[Ae];
            if (!oe2)
              continue;
            let Ze = new C(T.axes[oe2.x], T.axes[oe2.y]);
            ne2.stickState.set(Ae, Ze), e.mergedGamepadState.stickState.set(Ae, Ze), e.events.trigger("gamepadStick", Ae, Ze, g);
          }
        }
      }
    }
    i(Pa, "processGamepad");
    let Ge2 = {}, fr2 = {}, On = {}, io = t18.pixelDensity || 1;
    Ge2.mousemove = (g) => {
      let T = new C(g.offsetX, g.offsetY), S2 = new C(g.movementX, g.movementY);
      if (w()) {
        let B = e.canvas.width / io, ne2 = e.canvas.height / io, Ae = window.innerWidth, oe2 = window.innerHeight, Ze = Ae / oe2, Rt = B / ne2;
        if (Ze > Rt) {
          let Re2 = oe2 / ne2, hr = (Ae - B * Re2) / 2;
          T.x = Se(g.offsetX - hr, 0, B * Re2, 0, B), T.y = Se(g.offsetY, 0, ne2 * Re2, 0, ne2);
        } else {
          let Re2 = Ae / B, hr = (oe2 - ne2 * Re2) / 2;
          T.x = Se(g.offsetX, 0, B * Re2, 0, B), T.y = Se(g.offsetY - hr, 0, ne2 * Re2, 0, ne2);
        }
      }
      e.events.onOnce("input", () => {
        e.isMouseMoved = true, e.mousePos = T, e.mouseDeltaPos = S2, e.events.trigger("mouseMove");
      });
    };
    let so = ["left", "middle", "right", "back", "forward"];
    Ge2.mousedown = (g) => {
      e.events.onOnce("input", () => {
        let T = so[g.button];
        T && (e.lastInputDevice = "mouse", e.buttonsByMouse.has(T) && e.buttonsByMouse.get(T)?.forEach((S2) => {
          e.buttonState.press(S2), e.events.trigger("buttonPress", S2);
        }), e.mouseState.press(T), e.events.trigger("mousePress", T));
      });
    }, Ge2.mouseup = (g) => {
      e.events.onOnce("input", () => {
        let T = so[g.button];
        T && (e.buttonsByMouse.has(T) && e.buttonsByMouse.get(T)?.forEach((S2) => {
          e.buttonState.release(S2), e.events.trigger("buttonRelease", S2);
        }), e.mouseState.release(T), e.events.trigger("mouseRelease", T));
      });
    };
    let Ga = /* @__PURE__ */ new Set([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"]), ao = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", " ": "space" };
    Ge2.keydown = (g) => {
      Ga.has(g.key) && g.preventDefault(), e.events.onOnce("input", () => {
        let T = ao[g.key] || g.key.toLowerCase(), S2 = g.code;
        if (T === void 0)
          throw new Error(`Unknown key: ${g.key}`);
        T.length === 1 ? (e.events.trigger("charInput", T), e.charInputted.push(T)) : T === "space" && (e.events.trigger("charInput", " "), e.charInputted.push(" ")), g.repeat ? (e.keyState.pressRepeat(T), e.events.trigger("keyPressRepeat", T)) : (e.lastInputDevice = "keyboard", e.buttonsByKey.has(T) && e.buttonsByKey.get(T)?.forEach((B) => {
          e.buttonState.press(B), e.events.trigger("buttonPress", B);
        }), e.buttonsByKeyCode.has(S2) && e.buttonsByKeyCode.get(S2)?.forEach((B) => {
          e.buttonState.press(B), e.events.trigger("buttonPress", B);
        }), e.keyState.press(T), e.events.trigger("keyPressRepeat", T), e.events.trigger("keyPress", T));
      });
    }, Ge2.keyup = (g) => {
      e.events.onOnce("input", () => {
        let T = ao[g.key] || g.key.toLowerCase(), S2 = g.code;
        e.buttonsByKey.has(T) && e.buttonsByKey.get(T)?.forEach((B) => {
          e.buttonState.release(B), e.events.trigger("buttonRelease", B);
        }), e.buttonsByKeyCode.has(S2) && e.buttonsByKeyCode.get(S2)?.forEach((B) => {
          e.buttonState.release(B), e.events.trigger("buttonRelease", B);
        }), e.keyState.release(T), e.events.trigger("keyRelease", T);
      });
    }, Ge2.touchstart = (g) => {
      g.preventDefault(), e.events.onOnce("input", () => {
        let T = [...g.changedTouches], S2 = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new C(T[0].clientX - S2.x, T[0].clientY - S2.y), e.lastInputDevice = "mouse", e.buttonsByMouse.has("left") && e.buttonsByMouse.get("left")?.forEach((B) => {
          e.buttonState.press(B), e.events.trigger("buttonPress", B);
        }), e.mouseState.press("left"), e.events.trigger("mousePress", "left")), T.forEach((B) => {
          e.events.trigger("touchStart", new C(B.clientX - S2.x, B.clientY - S2.y), B);
        });
      });
    }, Ge2.touchmove = (g) => {
      g.preventDefault(), e.events.onOnce("input", () => {
        let T = [...g.changedTouches], S2 = e.canvas.getBoundingClientRect();
        if (t18.touchToMouse !== false) {
          let B = e.mousePos;
          e.mousePos = new C(T[0].clientX - S2.x, T[0].clientY - S2.y), e.mouseDeltaPos = e.mousePos.sub(B), e.events.trigger("mouseMove");
        }
        T.forEach((B) => {
          e.events.trigger("touchMove", new C(B.clientX - S2.x, B.clientY - S2.y), B);
        });
      });
    }, Ge2.touchend = (g) => {
      e.events.onOnce("input", () => {
        let T = [...g.changedTouches], S2 = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new C(T[0].clientX - S2.x, T[0].clientY - S2.y), e.mouseDeltaPos = new C(0, 0), e.buttonsByMouse.has("left") && e.buttonsByMouse.get("left")?.forEach((B) => {
          e.buttonState.release(B), e.events.trigger("buttonRelease", B);
        }), e.mouseState.release("left"), e.events.trigger("mouseRelease", "left")), T.forEach((B) => {
          e.events.trigger("touchEnd", new C(B.clientX - S2.x, B.clientY - S2.y), B);
        });
      });
    }, Ge2.touchcancel = (g) => {
      e.events.onOnce("input", () => {
        let T = [...g.changedTouches], S2 = e.canvas.getBoundingClientRect();
        t18.touchToMouse !== false && (e.mousePos = new C(T[0].clientX - S2.x, T[0].clientY - S2.y), e.mouseState.release("left"), e.events.trigger("mouseRelease", "left")), T.forEach((B) => {
          e.events.trigger("touchEnd", new C(B.clientX - S2.x, B.clientY - S2.y), B);
        });
      });
    }, Ge2.wheel = (g) => {
      g.preventDefault(), e.events.onOnce("input", () => {
        e.events.trigger("scroll", new C(g.deltaX, g.deltaY));
      });
    }, Ge2.contextmenu = (g) => g.preventDefault(), fr2.visibilitychange = () => {
      document.visibilityState === "visible" ? (e.skipTime = true, e.isHidden = false, e.events.trigger("show")) : (e.isHidden = true, e.events.trigger("hide"));
    }, On.gamepadconnected = (g) => {
      let T = oo(g.gamepad);
      e.events.onOnce("input", () => {
        e.events.trigger("gamepadConnect", T);
      });
    }, On.gamepaddisconnected = (g) => {
      let T = qt().filter((S2) => S2.index === g.gamepad.index)[0];
      Va(g.gamepad), e.events.onOnce("input", () => {
        e.events.trigger("gamepadDisconnect", T);
      });
    };
    for (let [g, T] of Object.entries(Ge2))
      e.canvas.addEventListener(g, T);
    for (let [g, T] of Object.entries(fr2))
      document.addEventListener(g, T);
    for (let [g, T] of Object.entries(On))
      window.addEventListener(g, T);
    let uo = new ResizeObserver((g) => {
      for (let T of g)
        if (T.target === e.canvas) {
          if (e.lastWidth === e.canvas.offsetWidth && e.lastHeight === e.canvas.offsetHeight)
            return;
          e.lastWidth = e.canvas.offsetWidth, e.lastHeight = e.canvas.offsetHeight, e.events.onOnce("input", () => {
            e.events.trigger("resize");
          });
        }
    });
    return uo.observe(e.canvas), { state: e, dt: n, fixedDt: r, restDt: o, time: a, run: R, canvas: e.canvas, fps: m, numFrames: u, quit: V2, isHidden: s, setFullscreen: y, isFullscreen: w, setCursor: c, screenshot: p, getGamepads: qt, getCursor: f, setCursorLocked: d, isCursorLocked: v, isTouchscreen: P, mousePos: M, mouseDeltaPos: b, isKeyDown: H, isKeyPressed: U, isKeyPressedRepeat: L2, isKeyReleased: q, isMouseDown: A, isMousePressed: E, isMouseReleased: G, isMouseMoved: D, isGamepadButtonPressed: Y, isGamepadButtonDown: _, isGamepadButtonReleased: K2, getGamepadStick: Xe, isButtonPressed: Z, isButtonDown: $, isButtonReleased: ee, setButton: j, getButton: Ee, pressButton: ft, releaseButton: Pt, charInputted: ut, onResize: Nt, onKeyDown: yn, onKeyPress: xn, onKeyPressRepeat: ur, onKeyRelease: cr, onMouseDown: Gt, onMousePress: $e2, onMouseRelease: vn, onMouseMove: F, onCharInput: N, onTouchStart: X2, onTouchMove: re, onTouchEnd: xe, onScroll: J, onHide: we, onShow: Ht, onGamepadButtonDown: lr, onGamepadButtonPress: at, onGamepadButtonRelease: mr, onGamepadStick: pr2, onGamepadConnect: dr2, onGamepadDisconnect: wn, onButtonPress: Ie, onButtonDown: zt, onButtonRelease: Je2, getLastInputDeviceType: ei, events: e.events };
  }, "initApp");
  function te() {
    return l.app.dt();
  }
  i(te, "dt");
  function tn() {
    return l.app.fixedDt();
  }
  i(tn, "fixedDt");
  function nn() {
    return l.app.restDt();
  }
  i(nn, "restDt");
  var du = new C(-1, -1);
  var fu = new C(0, -1);
  var hu = new C(1, -1);
  var gu = new C(-1, 0);
  var bu = new C(0, 0);
  var yu = new C(1, 0);
  var xu = new C(-1, 1);
  var vu = new C(0, 1);
  var wu = new C(1, 1);
  function ke(t18) {
    switch (t18) {
      case "topleft":
        return du;
      case "top":
        return fu;
      case "topright":
        return hu;
      case "left":
        return gu;
      case "center":
        return bu;
      case "right":
        return yu;
      case "botleft":
        return xu;
      case "bot":
        return vu;
      case "botright":
        return wu;
      default:
        return t18;
    }
  }
  i(ke, "anchorPt");
  function oi(t18) {
    switch (t18) {
      case "left":
        return 0;
      case "center":
        return 0.5;
      case "right":
        return 1;
      default:
        return 0;
    }
  }
  i(oi, "alignPt");
  function ii(t18) {
    return t18.createBuffer(1, 1, 44100);
  }
  i(ii, "createEmptyAudioBuffer");
  var Un = 2.5949095;
  var si = 1.70158 + 1;
  var ai = 2 * Math.PI / 3;
  var ui = 2 * Math.PI / 4.5;
  var Fn = { linear: i((t18) => t18, "linear"), easeInSine: i((t18) => 1 - Math.cos(t18 * Math.PI / 2), "easeInSine"), easeOutSine: i((t18) => Math.sin(t18 * Math.PI / 2), "easeOutSine"), easeInOutSine: i((t18) => -(Math.cos(Math.PI * t18) - 1) / 2, "easeInOutSine"), easeInQuad: i((t18) => t18 * t18, "easeInQuad"), easeOutQuad: i((t18) => 1 - (1 - t18) * (1 - t18), "easeOutQuad"), easeInOutQuad: i((t18) => t18 < 0.5 ? 2 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 2) / 2, "easeInOutQuad"), easeInCubic: i((t18) => t18 * t18 * t18, "easeInCubic"), easeOutCubic: i((t18) => 1 - Math.pow(1 - t18, 3), "easeOutCubic"), easeInOutCubic: i((t18) => t18 < 0.5 ? 4 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 3) / 2, "easeInOutCubic"), easeInQuart: i((t18) => t18 * t18 * t18 * t18, "easeInQuart"), easeOutQuart: i((t18) => 1 - Math.pow(1 - t18, 4), "easeOutQuart"), easeInOutQuart: i((t18) => t18 < 0.5 ? 8 * t18 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 4) / 2, "easeInOutQuart"), easeInQuint: i((t18) => t18 * t18 * t18 * t18 * t18, "easeInQuint"), easeOutQuint: i((t18) => 1 - Math.pow(1 - t18, 5), "easeOutQuint"), easeInOutQuint: i((t18) => t18 < 0.5 ? 16 * t18 * t18 * t18 * t18 * t18 : 1 - Math.pow(-2 * t18 + 2, 5) / 2, "easeInOutQuint"), easeInExpo: i((t18) => t18 === 0 ? 0 : Math.pow(2, 10 * t18 - 10), "easeInExpo"), easeOutExpo: i((t18) => t18 === 1 ? 1 : 1 - Math.pow(2, -10 * t18), "easeOutExpo"), easeInOutExpo: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : t18 < 0.5 ? Math.pow(2, 20 * t18 - 10) / 2 : (2 - Math.pow(2, -20 * t18 + 10)) / 2, "easeInOutExpo"), easeInCirc: i((t18) => 1 - Math.sqrt(1 - Math.pow(t18, 2)), "easeInCirc"), easeOutCirc: i((t18) => Math.sqrt(1 - Math.pow(t18 - 1, 2)), "easeOutCirc"), easeInOutCirc: i((t18) => t18 < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t18, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t18 + 2, 2)) + 1) / 2, "easeInOutCirc"), easeInBack: i((t18) => si * t18 * t18 * t18 - 1.70158 * t18 * t18, "easeInBack"), easeOutBack: i((t18) => 1 + si * Math.pow(t18 - 1, 3) + 1.70158 * Math.pow(t18 - 1, 2), "easeOutBack"), easeInOutBack: i((t18) => t18 < 0.5 ? Math.pow(2 * t18, 2) * ((Un + 1) * 2 * t18 - Un) / 2 : (Math.pow(2 * t18 - 2, 2) * ((Un + 1) * (t18 * 2 - 2) + Un) + 2) / 2, "easeInOutBack"), easeInElastic: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : -Math.pow(2, 10 * t18 - 10) * Math.sin((t18 * 10 - 10.75) * ai), "easeInElastic"), easeOutElastic: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : Math.pow(2, -10 * t18) * Math.sin((t18 * 10 - 0.75) * ai) + 1, "easeOutElastic"), easeInOutElastic: i((t18) => t18 === 0 ? 0 : t18 === 1 ? 1 : t18 < 0.5 ? -(Math.pow(2, 20 * t18 - 10) * Math.sin((20 * t18 - 11.125) * ui)) / 2 : Math.pow(2, -20 * t18 + 10) * Math.sin((20 * t18 - 11.125) * ui) / 2 + 1, "easeInOutElastic"), easeInBounce: i((t18) => 1 - Fn.easeOutBounce(1 - t18), "easeInBounce"), easeOutBounce: i((t18) => t18 < 1 / 2.75 ? 7.5625 * t18 * t18 : t18 < 2 / 2.75 ? 7.5625 * (t18 -= 1.5 / 2.75) * t18 + 0.75 : t18 < 2.5 / 2.75 ? 7.5625 * (t18 -= 2.25 / 2.75) * t18 + 0.9375 : 7.5625 * (t18 -= 2.625 / 2.75) * t18 + 0.984375, "easeOutBounce"), easeInOutBounce: i((t18) => t18 < 0.5 ? (1 - Fn.easeOutBounce(1 - 2 * t18)) / 2 : (1 + Fn.easeOutBounce(2 * t18 - 1)) / 2, "easeInOutBounce") };
  var tt = Fn;
  function Cu(t18, e, n) {
    let r = [], o = e;
    for (r.push(o); o !== t18; ) {
      if (o = n.get(o), o == null)
        return null;
      r.push(o);
    }
    return r.reverse();
  }
  i(Cu, "buildPath");
  function Dr(t18, e, n) {
    let r = new Lt((a, m) => a.cost < m.cost);
    r.insert({ cost: 0, node: e });
    let o = /* @__PURE__ */ new Map();
    o.set(e, e);
    let s = /* @__PURE__ */ new Map();
    for (s.set(e, 0); r.length !== 0; ) {
      let a = r.remove()?.node;
      if (a === n)
        break;
      let m = t18.getNeighbours(a);
      for (let u of m) {
        let p = (s.get(a) || 0) + t18.getCost(a, u) + t18.getHeuristic(u, n);
        (!s.has(u) || p < s.get(u)) && (s.set(u, p), r.insert({ cost: p, node: u }), o.set(u, a));
      }
    }
    return Cu(e, n, o);
  }
  i(Dr, "aStarSearch");
  var Mr = class {
    static {
      i(this, "NavEdge");
    }
    a;
    b;
    polygon;
    constructor(e, n, r) {
      this.a = e, this.b = n, this.polygon = new WeakRef(r);
    }
    isLeft(e, n) {
      return (this.b.x - this.a.x) * (n - this.a.y) - (e - this.a.x) * (this.b.y - this.a.y);
    }
    get middle() {
      return this.a.add(this.b).scale(0.5);
    }
  };
  var Br = class {
    static {
      i(this, "NavPolygon");
    }
    _edges;
    _centroid;
    _id;
    constructor(e) {
      this._id = e;
    }
    get id() {
      return this._id;
    }
    set edges(e) {
      this._edges = e;
      let n = 0, r = 0, o = 0;
      for (let s of this._edges) {
        s.polygon = new WeakRef(this);
        let a = s.a.x * s.b.y - s.a.y * s.b.x;
        n += (s.a.x + s.b.x) * a, r += (s.a.y + s.b.y) * a, o += a;
      }
      o /= 2, this._centroid = x(n / (6 * o), r / (6 * o));
    }
    get edges() {
      return this._edges;
    }
    get centroid() {
      return this._centroid;
    }
    contains(e) {
      let n = false;
      for (let r of this.edges)
        r.b.y > e.y != r.a.y > e.y && e.x < (r.a.x - r.b.x) * (e.y - r.b.y) / (r.a.y - r.b.y) + r.b.x && (n = !n);
      return n;
    }
  };
  var Ln = class {
    static {
      i(this, "NavMesh");
    }
    _polygons;
    _pointCache;
    _edgeCache;
    constructor() {
      this._polygons = [], this._pointCache = {}, this._edgeCache = {};
    }
    _addPoint(e) {
      let n = this._pointCache[`${e.x}_${e.y}`];
      return n || (n = e.clone(), this._pointCache[`${e.x}_${e.y}`] = n, n);
    }
    _addEdge(e) {
      let n = `${e.a.x}_${e.a.y}-${e.b.x}_${e.b.y}`;
      return this._edgeCache[n] = e, e;
    }
    _findEdge(e, n) {
      let r = `${e.x}_${e.y}-${n.x}_${n.y}`;
      return this._edgeCache[r];
    }
    _findCommonEdge(e, n) {
      for (let r of e.edges) {
        let o = this._findEdge(r.b, r.a);
        if (o && o.polygon.deref().id === n.id)
          return o;
      }
      return null;
    }
    addPolygon(e) {
      let n = new Br(this._polygons.length), r = e.map((o, s) => new Mr(o, e[(s + 1) % e.length], n));
      n.edges = r, this._polygons.push(n);
      for (let o of n.edges)
        this._addEdge(o);
      return n;
    }
    addRect(e, n) {
      let r = this._addPoint(e), o = this._addPoint(e.add(n.x, 0)), s = this._addPoint(e.add(n)), a = this._addPoint(e.add(0, n.y));
      return this.addPolygon([r, o, s, a]);
    }
    _getLocation(e) {
      for (let n of this._polygons)
        if (n.contains(e))
          return n;
      return null;
    }
    getNeighbours(e) {
      let n = [];
      for (let r of this._polygons[e].edges) {
        let o = this._findEdge(r.b, r.a);
        if (o) {
          let s = o.polygon.deref();
          s && n.push(s.id);
        }
      }
      return n;
    }
    getCost(e, n) {
      return 1;
    }
    getHeuristic(e, n) {
      let r = this._polygons[e], o = this._polygons[n], s = r.centroid.x - o.centroid.x, a = r.centroid.y - o.centroid.y;
      return Math.sqrt(s * s + a * a);
    }
    getPath(e, n) {
      return e === void 0 || n === void 0 ? [] : e === n ? [e, n] : Dr(this, e, n);
    }
    getWaypointPath(e, n, r) {
      let o = r?.type || "centroids", s = this._getLocation(e), a = this._getLocation(n);
      if (s === void 0 || a === void 0)
        return [];
      let m = this.getPath(s.id, a.id);
      if (!m)
        return [];
      if (o === "edges") {
        let u = [];
        for (let p = 1; p < m.length; p++) {
          let c = this._polygons[m[p - 1]], f = this._polygons[m[p]], d = this._findCommonEdge(c, f);
          u.push(d.middle.add(f.centroid.sub(d.middle).unit().scale(4)));
        }
        return [e, ...u, n];
      } else
        return [e, ...m.slice(1, -1).map((u) => this._polygons[u].centroid), n];
    }
  };
  function mt(t18) {
    let e = new he();
    return t18.pos && e.translate(t18.pos), t18.scale && e.scale(t18.scale), t18.angle && e.rotate(t18.angle), t18.parent ? e.mult(t18.parent.transform) : e;
  }
  i(mt, "calcTransform");
  function ci(t18) {
    return new C(t18.x / ie() * 2 - 1, -t18.y / ue() * 2 + 1);
  }
  i(ci, "screen2ndc");
  function yt(t18, e, n, r, o, s = 1) {
    r = se(r % 360), o = se(o % 360), o <= r && (o += Math.PI * 2);
    let a = [], m = Math.ceil((o - r) / se(8) * s), u = (o - r) / m, p = x(Math.cos(r), Math.sin(r)), c = x(Math.cos(u), Math.sin(u));
    for (let f = 0; f <= m; f++)
      a.push(t18.add(e * p.x, n * p.y)), p = x(p.x * c.x - p.y * c.y, p.x * c.y + p.y * c.x);
    return a;
  }
  i(yt, "getArcPts");
  function li(...t18) {
    let e = k(...t18), n = t18[3] ?? 1;
    l.gfx.bgColor = e, l.gfx.bgAlpha = n, l.gfx.ggl.gl.clearColor(e.r / 255, e.g / 255, e.b / 255, n);
  }
  i(li, "setBackground");
  function mi() {
    return l.gfx.bgColor?.clone?.() ?? null;
  }
  i(mi, "getBackground");
  function Q(...t18) {
    if (t18[0] === void 0)
      return;
    let e = x(...t18);
    e.x === 0 && e.y === 0 || l.gfx.transform.translate(e);
  }
  i(Q, "pushTranslate");
  function be() {
    l.gfx.transformStack.push(l.gfx.transform.clone());
  }
  i(be, "pushTransform");
  function pi(t18) {
    l.gfx.transform = t18.clone();
  }
  i(pi, "pushMatrix");
  function nt(...t18) {
    if (t18[0] === void 0)
      return;
    let e = x(...t18);
    e.x === 1 && e.y === 1 || l.gfx.transform.scale(e);
  }
  i(nt, "pushScale");
  function We(t18) {
    t18 && l.gfx.transform.rotate(t18);
  }
  i(We, "pushRotate");
  function pe() {
    l.gfx.transformStack.length > 0 && (l.gfx.transform = l.gfx.transformStack.pop());
  }
  i(pe, "popTransform");
  function Oe() {
    l.gfx.renderer.flush();
  }
  i(Oe, "flush");
  function ie() {
    return l.gfx.width;
  }
  i(ie, "width");
  function ue() {
    return l.gfx.height;
  }
  i(ue, "height");
  function In() {
    return (l.gfx.viewport.width + l.gfx.viewport.height) / (l.gfx.width + l.gfx.height);
  }
  i(In, "getViewportScale");
  function di(t18) {
    return new C(t18.x * l.gfx.viewport.width / l.gfx.width, t18.y * l.gfx.viewport.height / l.gfx.height);
  }
  i(di, "contentToView");
  function Ou(t18) {
    return new C((t18.x - l.gfx.viewport.x) * ie() / l.gfx.viewport.width, (t18.y - l.gfx.viewport.y) * ue() / l.gfx.viewport.height);
  }
  i(Ou, "windowToContent");
  function Kn() {
    return Ou(l.app.mousePos());
  }
  i(Kn, "mousePos");
  function xt() {
    return x(ie() / 2, ue() / 2);
  }
  i(xt, "center");
  var jn = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
  var pt = "topleft";
  var fi = "monospace";
  var vt = "monospace";
  var rn = "linear";
  var on = [{ name: "a_pos", size: 2 }, { name: "a_uv", size: 2 }, { name: "a_color", size: 4 }];
  var Eu = on.reduce((t18, e) => t18 + e.size, 0);
  var hi = 2048;
  var gi = hi * 4 * Eu;
  var bi = hi * 6;
  var yi = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`;
  var xi = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	return v_color * texture2D(u_tex, v_uv);
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`;
  var sn = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`;
  var an = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`;
  var vi = /* @__PURE__ */ new Set(["id", "require"]);
  var wi = /* @__PURE__ */ new Set(["add", "fixedUpdate", "update", "draw", "destroy", "inspect", "drawInspect"]);
  var Ci = 200;
  var Oi = 640;
  var Ei = 65536;
  var un = class {
    static {
      i(this, "TexPacker");
    }
    textures = [];
    bigTextures = [];
    canvas;
    c2d;
    x = 0;
    y = 0;
    curHeight = 0;
    gfx;
    constructor(e, n, r) {
      this.gfx = e, this.canvas = document.createElement("canvas"), this.canvas.width = n, this.canvas.height = r, this.textures = [Ve.fromImage(e, this.canvas)], this.bigTextures = [];
      let o = this.canvas.getContext("2d");
      if (!o)
        throw new Error("Failed to get 2d context");
      this.c2d = o;
    }
    add(e) {
      if (e.width > this.canvas.width || e.height > this.canvas.height) {
        let o = Ve.fromImage(this.gfx, e);
        return this.bigTextures.push(o), [o, new z2(0, 0, 1, 1)];
      }
      this.x + e.width > this.canvas.width && (this.x = 0, this.y += this.curHeight, this.curHeight = 0), this.y + e.height > this.canvas.height && (this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height), this.textures.push(Ve.fromImage(this.gfx, this.canvas)), this.x = 0, this.y = 0, this.curHeight = 0);
      let n = this.textures[this.textures.length - 1], r = new C(this.x, this.y);
      return this.x += e.width, e.height > this.curHeight && (this.curHeight = e.height), e instanceof ImageData ? this.c2d.putImageData(e, r.x, r.y) : this.c2d.drawImage(e, r.x, r.y), n.update(this.canvas), [n, new z2(r.x / this.canvas.width, r.y / this.canvas.height, e.width / this.canvas.width, e.height / this.canvas.height)];
    }
    free() {
      for (let e of this.textures)
        e.free();
      for (let e of this.bigTextures)
        e.free();
    }
  };
  function de(t18) {
    return typeof t18 != "string" || Mn(t18) ? t18 : l.assets.urlPrefix + t18;
  }
  i(de, "fixURL");
  var ce = class t14 {
    static {
      i(this, "Asset");
    }
    loaded = false;
    data = null;
    error = null;
    onLoadEvents = new ae();
    onErrorEvents = new ae();
    onFinishEvents = new ae();
    constructor(e) {
      e.then((n) => {
        this.loaded = true, this.data = n, this.onLoadEvents.trigger(n);
      }).catch((n) => {
        if (this.error = n, this.onErrorEvents.numListeners() > 0)
          this.onErrorEvents.trigger(n);
        else
          throw n;
      }).finally(() => {
        this.onFinishEvents.trigger(), this.loaded = true;
      });
    }
    static loaded(e) {
      let n = new t14(Promise.resolve(e));
      return n.data = e, n.loaded = true, n;
    }
    onLoad(e) {
      return this.loaded && this.data ? e(this.data) : this.onLoadEvents.add(e), this;
    }
    onError(e) {
      return this.loaded && this.error ? e(this.error) : this.onErrorEvents.add(e), this;
    }
    onFinish(e) {
      return this.loaded ? e() : this.onFinishEvents.add(e), this;
    }
    then(e) {
      return this.onLoad(e);
    }
    catch(e) {
      return this.onError(e);
    }
    finally(e) {
      return this.onFinish(e);
    }
  };
  var dt2 = class {
    static {
      i(this, "AssetBucket");
    }
    assets = /* @__PURE__ */ new Map();
    lastUID = 0;
    add(e, n) {
      let r = e ?? this.lastUID++ + "", o = new ce(n);
      return this.assets.set(r, o), o;
    }
    addLoaded(e, n) {
      let r = e ?? this.lastUID++ + "", o = ce.loaded(n);
      return this.assets.set(r, o), o;
    }
    get(e) {
      return this.assets.get(e);
    }
    progress() {
      if (this.assets.size === 0)
        return 1;
      let e = 0;
      return this.assets.forEach((n) => {
        n.loaded && e++;
      }), e / this.assets.size;
    }
  };
  function Lr(t18) {
    return fetch(t18).then((e) => {
      if (!e.ok)
        throw new Error(`Failed to fetch "${t18}"`);
      return e;
    });
  }
  i(Lr, "fetchURL");
  function wt(t18) {
    return Lr(t18).then((e) => e.json());
  }
  i(wt, "fetchJSON");
  function Ti(t18) {
    return Lr(t18).then((e) => e.text());
  }
  i(Ti, "fetchText");
  function Ai(t18) {
    return Lr(t18).then((e) => e.arrayBuffer());
  }
  i(Ai, "fetchArrayBuffer");
  function Si(t18) {
    return t18 !== void 0 && (l.assets.urlPrefix = t18), l.assets.urlPrefix;
  }
  i(Si, "loadRoot");
  function Vi(t18, e) {
    return l.assets.custom.add(t18, wt(de(e)));
  }
  i(Vi, "loadJSON");
  function Ct(t18) {
    let e = new Image();
    return e.crossOrigin = "anonymous", e.src = t18, new Promise((n, r) => {
      e.onload = () => n(e), e.onerror = () => r(new Error(`Failed to load image from "${t18}"`));
    });
  }
  i(Ct, "loadImg");
  function Be() {
    let t18 = [l.assets.sprites, l.assets.sounds, l.assets.shaders, l.assets.fonts, l.assets.bitmapFonts, l.assets.custom];
    return t18.reduce((e, n) => e + n.progress(), 0) / t18.length;
  }
  i(Be, "loadProgress");
  function Pi(t18) {
    return l.assets.custom.get(t18) ?? null;
  }
  i(Pi, "getAsset");
  function cn(t18) {
    return l.assets.custom.add(null, t18);
  }
  i(cn, "load");
  var Gi = i((t18) => ({ urlPrefix: "", sprites: new dt2(), fonts: new dt2(), bitmapFonts: new dt2(), sounds: new dt2(), shaders: new dt2(), custom: new dt2(), music: {}, packer: new un(t18, 2048, 2048), loaded: false }), "initAssets");
  var Ri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==";
  var Ue = class t15 {
    static {
      i(this, "SpriteData");
    }
    tex;
    frames = [new z2(0, 0, 1, 1)];
    anims = {};
    slice9 = null;
    constructor(e, n, r = {}, o = null) {
      this.tex = e, n && (this.frames = n), this.anims = r, this.slice9 = o;
    }
    get width() {
      return this.tex.width * this.frames[0].w;
    }
    get height() {
      return this.tex.height * this.frames[0].h;
    }
    static from(e, n = {}) {
      return typeof e == "string" ? t15.fromURL(e, n) : Promise.resolve(t15.fromImage(e, n));
    }
    static fromImage(e, n = {}) {
      let [r, o] = l.assets.packer.add(e), s = n.frames ? n.frames.map((a) => new z2(o.x + a.x * o.w, o.y + a.y * o.h, a.w * o.w, a.h * o.h)) : Kr(n.sliceX || 1, n.sliceY || 1, o.x, o.y, o.w, o.h);
      return new t15(r, s, n.anims, n.slice9);
    }
    static fromURL(e, n = {}) {
      return Ct(e).then((r) => t15.fromImage(r, n));
    }
  };
  function It(t18) {
    if (typeof t18 == "string") {
      let e = Ir(t18);
      if (e)
        return e;
      if (Be() < 1)
        return null;
      throw new Error(`Sprite not found: ${t18}`);
    } else {
      if (t18 instanceof Ue)
        return ce.loaded(t18);
      if (t18 instanceof ce)
        return t18;
      throw new Error(`Invalid sprite: ${t18}`);
    }
  }
  i(It, "resolveSprite");
  function Ir(t18) {
    return l.assets.sprites.get(t18) ?? null;
  }
  i(Ir, "getSprite");
  function Ot(t18, e, n = { sliceX: 1, sliceY: 1, anims: {} }) {
    return e = de(e), Array.isArray(e) ? e.some((r) => typeof r == "string") ? l.assets.sprites.add(t18, Promise.all(e.map((r) => typeof r == "string" ? Ct(r) : Promise.resolve(r))).then((r) => Di(r, n))) : l.assets.sprites.addLoaded(t18, Di(e, n)) : typeof e == "string" ? l.assets.sprites.add(t18, Ue.from(e, n)) : l.assets.sprites.addLoaded(t18, Ue.fromImage(e, n));
  }
  i(Ot, "loadSprite");
  function Kr(t18 = 1, e = 1, n = 0, r = 0, o = 1, s = 1) {
    let a = [], m = o / t18, u = s / e;
    for (let p = 0; p < e; p++)
      for (let c = 0; c < t18; c++)
        a.push(new z2(n + c * m, r + p * u, m, u));
    return a;
  }
  i(Kr, "slice");
  function Di(t18, e = {}) {
    let n = document.createElement("canvas"), r = t18[0].width, o = t18[0].height;
    n.width = r * t18.length, n.height = o;
    let s = n.getContext("2d");
    if (!s)
      throw new Error("Failed to create canvas context");
    t18.forEach((m, u) => {
      m instanceof ImageData ? s.putImageData(m, u * r, 0) : s.drawImage(m, u * r, 0);
    });
    let a = s.getImageData(0, 0, t18.length * r, o);
    return Ue.fromImage(a, { ...e, sliceX: t18.length, sliceY: 1 });
  }
  i(Di, "createSpriteSheet");
  function Mi(t18 = "bean") {
    return Ot(t18, Ri);
  }
  i(Mi, "loadBean");
  function Bi(t18, e, n) {
    e = de(e), n = de(n), typeof e == "string" && !n && (n = Wo(e) + ".json");
    let r = typeof n == "string" ? wt(n) : Promise.resolve(n);
    return l.assets.sprites.add(t18, r.then((o) => {
      let s = o.meta.size, a = o.frames.map((u) => new z2(u.frame.x / s.w, u.frame.y / s.h, u.frame.w / s.w, u.frame.h / s.h)), m = {};
      for (let u of o.meta.frameTags)
        u.from === u.to ? m[u.name] = u.from : m[u.name] = { from: u.from, to: u.to, speed: 10, loop: true, pingpong: u.direction === "pingpong" };
      return Ue.from(e, { frames: a, anims: m });
    }));
  }
  i(Bi, "loadAseprite");
  var Et = class {
    static {
      i(this, "FontData");
    }
    fontface;
    filter = rn;
    outline = null;
    size = 64;
    constructor(e, n = {}) {
      if (this.fontface = e, this.filter = n.filter ?? rn, this.size = n.size ?? 64, this.size > 256)
        throw new Error(`Max font size: ${256}`);
      n.outline && (this.outline = { width: 1, color: k(0, 0, 0) }, typeof n.outline == "number" ? this.outline.width = n.outline : typeof n.outline == "object" && (n.outline.width && (this.outline.width = n.outline.width), n.outline.color && (this.outline.color = n.outline.color)));
    }
  };
  function jr(t18) {
    if (!t18)
      return jr(l.globalOpt.font ?? fi);
    if (typeof t18 == "string") {
      let e = kn(t18), n = kr(t18);
      if (e)
        return e.data ?? e;
      if (n)
        return n.data ?? n;
      if (document.fonts.check(`${64}px ${t18}`))
        return t18;
      if (Be() < 1)
        return null;
      throw new Error(`Font not found: ${t18}`);
    } else if (t18 instanceof ce)
      return t18.data ? t18.data : t18;
    return t18;
  }
  i(jr, "resolveFont");
  function kr(t18) {
    return l.assets.fonts.get(t18) ?? null;
  }
  i(kr, "getFont");
  function Ui(t18, e, n = {}) {
    let r = de(e), o = new FontFace(t18, typeof e == "string" ? `url(${r})` : r);
    return document.fonts.add(o), l.assets.fonts.add(t18, o.load().catch((s) => {
      throw new Error(`Failed to load font from "${r}": ${s}`);
    }).then((s) => new Et(s, n)));
  }
  i(Ui, "loadFont");
  function Fi(t18, e, n, r) {
    let o = t18.width / e, s = {}, a = r.split("").entries();
    for (let [m, u] of a)
      s[u] = new z2(m % o * e, Math.floor(m / o) * n, e, n);
    return { tex: t18, map: s, size: n };
  }
  i(Fi, "makeFont");
  function kn(t18) {
    return l.assets.bitmapFonts.get(t18) ?? null;
  }
  i(kn, "getBitmapFont");
  function Li(t18, e, n, r, o = {}) {
    let s = de(e);
    return l.assets.bitmapFonts.add(t18, Ct(s).then((a) => Fi(Ve.fromImage(l.gfx.ggl, a, o), n, r, o.chars ?? jn)));
  }
  i(Li, "loadBitmapFont");
  function Ii(t18, e) {
    return e = de(e), l.assets.sprites.add(t18, new Promise(async (n) => {
      let r = typeof e == "string" ? await wt(e) : e, o = await Promise.all(r.frames.map(Ct)), s = document.createElement("canvas");
      s.width = r.width, s.height = r.height * r.frames.length;
      let a = s.getContext("2d");
      if (!a)
        throw new Error("Failed to create canvas context");
      o.forEach((u, p) => {
        a.drawImage(u, 0, p * r.height);
      });
      let m = await Ot(null, s, { sliceY: r.frames.length, anims: r.anims });
      n(m);
    }));
  }
  i(Ii, "loadPedit");
  var _r = class {
    static {
      i(this, "Shader");
    }
    ctx;
    glProgram;
    constructor(e, n, r, o) {
      this.ctx = e, e.onDestroy(() => this.free());
      let s = e.gl, a = s.createShader(s.VERTEX_SHADER), m = s.createShader(s.FRAGMENT_SHADER);
      if (!a || !m)
        throw new Error("Failed to create shader");
      s.shaderSource(a, n), s.shaderSource(m, r), s.compileShader(a), s.compileShader(m);
      let u = s.createProgram();
      if (this.glProgram = u, s.attachShader(u, a), s.attachShader(u, m), o.forEach((p, c) => s.bindAttribLocation(u, c, p)), s.linkProgram(u), !s.getProgramParameter(u, s.LINK_STATUS)) {
        let p = s.getShaderInfoLog(a);
        if (p)
          throw new Error("VERTEX SHADER " + p);
        let c = s.getShaderInfoLog(m);
        if (c)
          throw new Error("FRAGMENT SHADER " + c);
      }
      s.deleteShader(a), s.deleteShader(m);
    }
    bind() {
      this.ctx.pushProgram(this.glProgram);
    }
    unbind() {
      this.ctx.popProgram();
    }
    send(e) {
      let n = this.ctx.gl;
      for (let r in e) {
        let o = e[r], s = n.getUniformLocation(this.glProgram, r);
        if (typeof o == "number")
          n.uniform1f(s, o);
        else if (o instanceof he)
          n.uniformMatrix4fv(s, false, new Float32Array(o.m));
        else if (o instanceof I)
          n.uniform3f(s, o.r, o.g, o.b);
        else if (o instanceof C)
          n.uniform2f(s, o.x, o.y);
        else if (Array.isArray(o)) {
          let a = o[0];
          qo(o) ? n.uniform1fv(s, o) : Ho(o) ? n.uniform2fv(s, o.map((m) => [m.x, m.y]).flat()) : No(o) && n.uniform3fv(s, o.map((m) => [m.r, m.g, m.b]).flat());
        } else
          throw new Error("Unsupported uniform data type");
      }
    }
    free() {
      this.ctx.gl.deleteProgram(this.glProgram);
    }
  };
  function _n(t18, e = sn, n = an) {
    let r = yi.replace("{{user}}", e ?? sn), o = xi.replace("{{user}}", n ?? an);
    try {
      return new _r(t18, r, o, on.map((s) => s.name));
    } catch (s) {
      let m = /(?<type>^\w+) SHADER ERROR: 0:(?<line>\d+): (?<msg>.+)/, u = $o(s).match(m);
      if (!u?.groups)
        throw s;
      let p = Number(u.groups.line) - 14, c = u.groups.msg.trim(), f = u.groups.type.toLowerCase();
      throw new Error(`${f} shader line ${p}: ${c}`);
    }
  }
  i(_n, "makeShader");
  function Ki(t18) {
    if (!t18)
      return l.gfx.defShader;
    if (typeof t18 == "string") {
      let e = Nr(t18);
      if (e)
        return e.data ?? e;
      if (Be() < 1)
        return null;
      throw new Error(`Shader not found: ${t18}`);
    } else if (t18 instanceof ce)
      return t18.data ? t18.data : t18;
    return t18;
  }
  i(Ki, "resolveShader");
  function Nr(t18) {
    return l.assets.shaders.get(t18) ?? null;
  }
  i(Nr, "getShader");
  function ji(t18, e, n) {
    return l.assets.shaders.addLoaded(t18, _n(l.gfx.ggl, e, n));
  }
  i(ji, "loadShader");
  function ki(t18, e, n) {
    e = de(e), n = de(n);
    let r = i((s) => s ? Ti(s) : Promise.resolve(null), "resolveUrl"), o = Promise.all([r(e), r(n)]).then(([s, a]) => _n(l.gfx.ggl, s, a));
    return l.assets.shaders.add(t18, o);
  }
  i(ki, "loadShaderURL");
  var rt = class t16 {
    static {
      i(this, "SoundData");
    }
    buf;
    constructor(e) {
      this.buf = e;
    }
    static fromArrayBuffer(e) {
      return new Promise((n, r) => l.audio.ctx.decodeAudioData(e, n, r)).then((n) => new t16(n));
    }
    static fromURL(e) {
      return Mn(e) ? t16.fromArrayBuffer(zo(e)) : Ai(e).then((n) => t16.fromArrayBuffer(n));
    }
  };
  function _i(t18) {
    if (typeof t18 == "string") {
      let e = Hr(t18);
      if (e)
        return e;
      if (Be() < 1)
        return null;
      throw new Error(`Sound not found: ${t18}`);
    } else {
      if (t18 instanceof rt)
        return ce.loaded(t18);
      if (t18 instanceof ce)
        return t18;
      throw new Error(`Invalid sound: ${t18}`);
    }
  }
  i(_i, "resolveSound");
  function Hr(t18) {
    return l.assets.sounds.get(t18) ?? null;
  }
  i(Hr, "getSound");
  function Ni(t18, e) {
    return e = de(e), l.assets.sounds.add(t18, typeof e == "string" ? rt.fromURL(e) : rt.fromArrayBuffer(e));
  }
  i(Ni, "loadSound");
  function Hi(t18, e) {
    let n = de(e), r = new Audio(n);
    return r.preload = "auto", l.assets.music[t18] = n;
  }
  i(Hi, "loadMusic");
  function qr(t18, e) {
    return t18 = de(t18), typeof e == "string" ? cn(new Promise((n, r) => {
      wt(e).then((o) => {
        qr(t18, o).then(n).catch(r);
      });
    })) : cn(Ue.from(t18).then((n) => {
      let r = {};
      for (let o in e) {
        let s = e[o], a = n.frames[0], m = 2048 * a.w, u = 2048 * a.h, p = s.frames ? s.frames.map((f) => new z2(a.x + (s.x + f.x) / m * a.w, a.y + (s.y + f.y) / u * a.h, f.w / m * a.w, f.h / u * a.h)) : Kr(s.sliceX || 1, s.sliceY || 1, a.x + s.x / m * a.w, a.y + s.y / u * a.h, s.width / m * a.w, s.height / u * a.h), c = new Ue(n.tex, p, s.anims);
        l.assets.sprites.addLoaded(o, c), r[o] = c;
      }
      return r;
    }));
  }
  i(qr, "loadSpriteAtlas");
  function Fe(t18, e, n = false, r, o, s = {}) {
    let a = r ?? l.gfx.defTex, m = o ?? l.gfx.defShader, u = Ki(m);
    if (!u || u instanceof ce)
      return;
    let p = l.gfx.fixed || n ? l.gfx.transform : l.game.cam.transform.mult(l.gfx.transform), c = [];
    for (let f of t18) {
      let d = ci(p.multVec2(f.pos));
      c.push(d.x, d.y, f.uv.x, f.uv.y, f.color.r / 255, f.color.g / 255, f.color.b / 255, f.opacity);
    }
    l.gfx.renderer.push(l.gfx.ggl.gl.TRIANGLES, c, e, u, a, s);
  }
  i(Fe, "drawRaw");
  function Pe(t18) {
    if (!t18.pts)
      throw new Error('drawPolygon() requires property "pts".');
    let e = t18.pts.length;
    if (!(e < 3)) {
      if (be(), Q(t18.pos), nt(t18.scale), We(t18.angle), Q(t18.offset), t18.fill !== false) {
        let n = t18.color ?? I.WHITE, r = t18.pts.map((s, a) => ({ pos: new C(s.x, s.y), uv: t18.uv ? t18.uv[a] : new C(0, 0), color: t18.colors && t18.colors[a] ? t18.colors[a].mult(n) : n, opacity: t18.opacity ?? 1 })), o;
        t18.triangulate ? o = Rn(t18.pts).map((a) => a.map((m) => t18.pts.indexOf(m))).flat() : o = [...Array(e - 2).keys()].map((s) => [0, s + 1, s + 2]).flat(), Fe(r, t18.indices ?? o, t18.fixed, t18.uv ? t18.tex : l.gfx.defTex, t18.shader, t18.uniform ?? void 0);
      }
      t18.outline && Kt({ pts: [...t18.pts, t18.pts[0]], radius: t18.radius, width: t18.outline.width, color: t18.outline.color, join: t18.outline.join, uniform: t18.uniform, fixed: t18.fixed, opacity: t18.opacity ?? t18.outline.opacity }), pe();
    }
  }
  i(Pe, "drawPolygon");
  function Nn(t18) {
    if (t18.radiusX === void 0 || t18.radiusY === void 0)
      throw new Error('drawEllipse() requires properties "radiusX" and "radiusY".');
    if (t18.radiusX === 0 || t18.radiusY === 0)
      return;
    let e = t18.start ?? 0, n = t18.end ?? 360, r = ke(t18.anchor ?? "center").scale(new C(-t18.radiusX, -t18.radiusY)), o = yt(r, t18.radiusX, t18.radiusY, e, n, t18.resolution);
    o.unshift(r);
    let s = Object.assign({}, t18, { pts: o, radius: 0, ...t18.gradient ? { colors: [t18.gradient[0], ...Array(o.length - 1).fill(t18.gradient[1])] } : {} });
    if (n - e >= 360 && t18.outline) {
      t18.fill !== false && Pe(Object.assign({}, s, { outline: null })), Pe(Object.assign({}, s, { pts: o.slice(1), fill: false }));
      return;
    }
    Pe(s);
  }
  i(Nn, "drawEllipse");
  function _e(t18) {
    if (typeof t18.radius != "number")
      throw new Error('drawCircle() requires property "radius".');
    t18.radius !== 0 && Nn(Object.assign({}, t18, { radiusX: t18.radius, radiusY: t18.radius, angle: 0 }));
  }
  i(_e, "drawCircle");
  function jt(t18) {
    let { p1: e, p2: n } = t18;
    if (!e || !n)
      throw new Error('drawLine() requires properties "p1" and "p2".');
    let r = t18.width || 1, o = n.sub(e).unit().normal().scale(r * 0.5), s = [e.sub(o), e.add(o), n.add(o), n.sub(o)].map((a) => ({ pos: new C(a.x, a.y), uv: new C(0), color: t18.color ?? I.WHITE, opacity: t18.opacity ?? 1 }));
    Fe(s, [0, 1, 3, 1, 2, 3], t18.fixed, l.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(jt, "drawLine");
  function Au(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), s = t18.pos || x(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let m = a.len(), u = a.normal().scale(-r / m), p, c = e[0];
    if (!o)
      switch (t18.cap) {
        case "square": {
          let h = a.scale(-r / m);
          n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
          break;
        }
        case "round": {
          let h = Math.max(r, 10), O2 = Math.PI / h, y = u.scale(-1), w = Math.cos(O2), V2 = Math.sin(O2);
          for (let R = 0; R < h; R++)
            n.push(c), n.push(c.sub(y)), y = x(y.x * w - y.y * V2, y.x * V2 + y.y * w);
        }
      }
    for (let h = 1; h < e.length; h++) {
      if (c === e[h] || c.eq(e[h]))
        continue;
      p = c, c = e[h];
      let O2 = c.sub(p), y = O2.len(), w = O2.normal().scale(-r / y), V2 = a.cross(O2);
      if (Math.abs(V2) / (m * y) < 0.05) {
        n.push(p.add(u)), n.push(p.sub(u)), a.dot(O2) < 0 && (n.push(p.sub(u)), n.push(p.add(u))), a = O2, m = y, u = w;
        continue;
      }
      let R = w.sub(u).cross(O2) / V2, P = u.add(a.scale(R));
      V2 > 0 ? (n.push(p.add(P)), n.push(p.sub(u)), n.push(p.add(P)), n.push(p.sub(w))) : (n.push(p.add(u)), n.push(p.sub(P)), n.push(p.add(w)), n.push(p.sub(P))), a = O2, m = y, u = w;
    }
    if (!o)
      switch (n.push(c.add(u)), n.push(c.sub(u)), t18.cap) {
        case "square": {
          let h = a.scale(r / m);
          n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
          break;
        }
        case "round": {
          let h = Math.max(r, 10), O2 = Math.PI / h, y = u.scale(1), w = Math.cos(O2), V2 = Math.sin(O2);
          for (let R = 0; R < h; R++)
            y = x(y.x * w - y.y * V2, y.x * V2 + y.y * w), n.push(c), n.push(c.sub(y));
        }
      }
    if (n.length < 4)
      return;
    let f = n.map((h) => ({ pos: s.add(h), uv: x(), color: t18.color || I.WHITE, opacity: t18.opacity ?? 1 })), d = [], v = 0;
    for (let h = 0; h < n.length - 2; h += 2)
      d[v++] = h + 1, d[v++] = h, d[v++] = h + 2, d[v++] = h + 2, d[v++] = h + 3, d[v++] = h + 1;
    o && (d[v++] = n.length - 1, d[v++] = n.length - 2, d[v++] = 0, d[v++] = 0, d[v++] = 1, d[v++] = n.length - 1), Fe(f, d, t18.fixed, l.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(Au, "_drawLinesBevel");
  function Su(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), s = t18.pos || x(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let m = a.len(), u = a.normal().scale(-r / m), p, c = e[0];
    if (!o)
      switch (t18.cap) {
        case "square": {
          let h = a.scale(-r / m);
          n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
          break;
        }
        case "round": {
          let h = Math.max(r, 10), O2 = Math.PI / h, y = u.scale(-1), w = Math.cos(O2), V2 = Math.sin(O2);
          for (let R = 0; R < h; R++)
            n.push(c), n.push(c.sub(y)), y = x(y.x * w - y.y * V2, y.x * V2 + y.y * w);
        }
      }
    for (let h = 1; h < e.length; h++) {
      if (c === e[h] || c.eq(e[h]))
        continue;
      p = c, c = e[h];
      let O2 = c.sub(p), y = O2.len(), w = O2.normal().scale(-r / y), V2 = a.cross(O2);
      if (Math.abs(V2) / (m * y) < 0.05) {
        n.push(p.add(u)), n.push(p.sub(u)), a.dot(O2) < 0 && (n.push(p.sub(u)), n.push(p.add(u))), a = O2, m = y, u = w;
        continue;
      }
      let R = w.sub(u).cross(O2) / V2, P = u.add(a.scale(R));
      if (V2 > 0) {
        let M = p.add(P), b = Math.max(r, 10), E = se(u.angleBetween(w) / b), A = u, G = Math.cos(E), D = Math.sin(E);
        for (let U = 0; U < b; U++)
          n.push(M), n.push(p.sub(A)), A = x(A.x * G - A.y * D, A.x * D + A.y * G);
      } else {
        let M = p.sub(P), b = Math.max(r, 10), E = se(u.angleBetween(w) / b), A = u, G = Math.cos(E), D = Math.sin(E);
        for (let U = 0; U < b; U++)
          n.push(p.add(A)), n.push(M), A = x(A.x * G - A.y * D, A.x * D + A.y * G);
      }
      a = O2, m = y, u = w;
    }
    if (!o)
      switch (n.push(c.add(u)), n.push(c.sub(u)), t18.cap) {
        case "square": {
          let h = a.scale(r / m);
          n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
          break;
        }
        case "round": {
          let h = Math.max(r, 10), O2 = Math.PI / h, y = u.scale(1), w = Math.cos(O2), V2 = Math.sin(O2);
          for (let R = 0; R < h; R++)
            y = x(y.x * w - y.y * V2, y.x * V2 + y.y * w), n.push(c), n.push(c.sub(y));
        }
      }
    if (n.length < 4)
      return;
    let f = n.map((h) => ({ pos: s.add(h), uv: x(), color: t18.color || I.WHITE, opacity: t18.opacity ?? 1 })), d = [], v = 0;
    for (let h = 0; h < n.length - 2; h += 2)
      d[v++] = h + 1, d[v++] = h, d[v++] = h + 2, d[v++] = h + 2, d[v++] = h + 3, d[v++] = h + 1;
    o && (d[v++] = n.length - 1, d[v++] = n.length - 2, d[v++] = 0, d[v++] = 0, d[v++] = 1, d[v++] = n.length - 1), Fe(f, d, t18.fixed, l.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(Su, "_drawLinesRound");
  function Vu(t18) {
    let e = t18.pts, n = [], r = (t18.width || 1) * 0.5, o = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]), s = t18.pos || x(0, 0), a;
    o ? a = e[0].sub(e[e.length - 2]) : a = e[1].sub(e[0]);
    let m = a.len(), u = a.normal().scale(-r / m), p, c = e[0];
    if (!o)
      switch (t18.cap) {
        case "square": {
          let h = a.scale(-r / m);
          n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
          break;
        }
        case "round": {
          let h = Math.max(r, 10), O2 = Math.PI / h, y = u.scale(-1), w = Math.cos(O2), V2 = Math.sin(O2);
          for (let R = 0; R < h; R++)
            n.push(c), n.push(c.sub(y)), y = x(y.x * w - y.y * V2, y.x * V2 + y.y * w);
        }
      }
    for (let h = 1; h < e.length; h++) {
      if (c === e[h] || c.eq(e[h]))
        continue;
      p = c, c = e[h];
      let O2 = c.sub(p), y = O2.len(), w = O2.normal().scale(-r / y), V2 = a.cross(O2);
      if (Math.abs(V2) / (m * y) < 0.05) {
        n.push(p.add(u)), n.push(p.sub(u)), a.dot(O2) < 0 && (n.push(p.sub(u)), n.push(p.add(u))), a = O2, m = y, u = w;
        continue;
      }
      let R = w.sub(u).cross(O2) / V2, P = u.add(a.scale(R));
      n.push(p.add(P)), n.push(p.sub(P)), a = O2, m = y, u = w;
    }
    if (!o)
      switch (n.push(c.add(u)), n.push(c.sub(u)), t18.cap) {
        case "square": {
          let h = a.scale(r / m);
          n.push(c.add(h).add(u)), n.push(c.add(h).sub(u));
          break;
        }
        case "round": {
          let h = Math.max(r, 10), O2 = Math.PI / h, y = u.scale(1), w = Math.cos(O2), V2 = Math.sin(O2);
          for (let R = 0; R < h; R++)
            y = x(y.x * w - y.y * V2, y.x * V2 + y.y * w), n.push(c), n.push(c.sub(y));
        }
      }
    if (n.length < 4)
      return;
    let f = n.map((h) => ({ pos: s.add(h), uv: x(), color: t18.color || I.WHITE, opacity: t18.opacity ?? 1 })), d = [], v = 0;
    for (let h = 0; h < n.length - 2; h += 2)
      d[v++] = h + 1, d[v++] = h, d[v++] = h + 2, d[v++] = h + 2, d[v++] = h + 3, d[v++] = h + 1;
    o && (d[v++] = n.length - 1, d[v++] = n.length - 2, d[v++] = 0, d[v++] = 0, d[v++] = 1, d[v++] = n.length - 1), Fe(f, d, t18.fixed, l.gfx.defTex, t18.shader, t18.uniform ?? void 0);
  }
  i(Vu, "_drawLinesMiter");
  function Kt(t18) {
    let e = t18.pts, n = t18.width ?? 1;
    if (!e)
      throw new Error('drawLines() requires property "pts".');
    if (!(e.length < 2)) {
      if (e.length > 2)
        switch (t18.join) {
          case "bevel":
            return Au(t18);
          case "round":
            return Su(t18);
          case "miter":
            return Vu(t18);
        }
      if (t18.radius && e.length >= 3) {
        jt(Object.assign({}, t18, { p1: e[0], p2: e[1] }));
        for (let r = 1; r < e.length - 2; r++) {
          let o = e[r], s = e[r + 1];
          jt(Object.assign({}, t18, { p1: o, p2: s }));
        }
        jt(Object.assign({}, t18, { p1: e[e.length - 2], p2: e[e.length - 1] }));
      } else
        for (let r = 0; r < e.length - 1; r++)
          jt(Object.assign({}, t18, { p1: e[r], p2: e[r + 1] })), t18.join !== "none" && _e(Object.assign({}, t18, { pos: e[r], radius: n / 2 }));
    }
  }
  i(Kt, "drawLines");
  function Hn(t18, e) {
    let n = e.segments ?? 16, r = [];
    for (let o = 0; o <= n; o++)
      r.push(t18(o / n));
    Kt({ pts: r, width: e.width || 1, pos: e.pos, color: e.color, opacity: e.opacity });
  }
  i(Hn, "drawCurve");
  function qi(t18) {
    Hn((e) => Qt(t18.pt1, t18.pt2, t18.pt3, t18.pt4, e), t18);
  }
  i(qi, "drawBezier");
  var Ve = class t17 {
    static {
      i(this, "Texture");
    }
    ctx;
    src = null;
    glTex;
    width;
    height;
    constructor(e, n, r, o = {}) {
      this.ctx = e;
      let s = e.gl, a = e.gl.createTexture();
      if (!a)
        throw new Error("Failed to create texture");
      this.glTex = a, e.onDestroy(() => this.free()), this.width = n, this.height = r;
      let m = { linear: s.LINEAR, nearest: s.NEAREST }[o.filter ?? e.opts.texFilter ?? "nearest"], u = { repeat: s.REPEAT, clampToEdge: s.CLAMP_TO_EDGE }[o.wrap ?? "clampToEdge"];
      this.bind(), n && r && s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, n, r, 0, s.RGBA, s.UNSIGNED_BYTE, null), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, m), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, m), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_S, u), s.texParameteri(s.TEXTURE_2D, s.TEXTURE_WRAP_T, u), this.unbind();
    }
    static fromImage(e, n, r = {}) {
      let o = new t17(e, n.width, n.height, r);
      return o.update(n), o.src = n, o;
    }
    update(e, n = 0, r = 0) {
      let o = this.ctx.gl;
      this.bind(), o.texSubImage2D(o.TEXTURE_2D, 0, n, r, o.RGBA, o.UNSIGNED_BYTE, e), this.unbind();
    }
    bind() {
      this.ctx.pushTexture2D(this.glTex);
    }
    unbind() {
      this.ctx.popTexture2D();
    }
    free() {
      this.ctx.gl.deleteTexture(this.glTex);
    }
  };
  var ot = class {
    static {
      i(this, "FrameBuffer");
    }
    ctx;
    tex;
    glFramebuffer;
    glRenderbuffer;
    constructor(e, n, r, o = {}) {
      this.ctx = e;
      let s = e.gl;
      e.onDestroy(() => this.free()), this.tex = new Ve(e, n, r, o);
      let a = s.createFramebuffer(), m = s.createRenderbuffer();
      if (!a || !m)
        throw new Error("Failed to create framebuffer");
      this.glFramebuffer = a, this.glRenderbuffer = m, this.bind(), s.renderbufferStorage(s.RENDERBUFFER, s.DEPTH_STENCIL, n, r), s.framebufferTexture2D(s.FRAMEBUFFER, s.COLOR_ATTACHMENT0, s.TEXTURE_2D, this.tex.glTex, 0), s.framebufferRenderbuffer(s.FRAMEBUFFER, s.DEPTH_STENCIL_ATTACHMENT, s.RENDERBUFFER, this.glRenderbuffer), this.unbind();
    }
    get width() {
      return this.tex.width;
    }
    get height() {
      return this.tex.height;
    }
    toImageData() {
      let e = this.ctx.gl, n = new Uint8ClampedArray(this.width * this.height * 4);
      this.bind(), e.readPixels(0, 0, this.width, this.height, e.RGBA, e.UNSIGNED_BYTE, n), this.unbind();
      let r = this.width * 4, o = new Uint8Array(r);
      for (let s = 0; s < (this.height / 2 | 0); s++) {
        let a = s * r, m = (this.height - s - 1) * r;
        o.set(n.subarray(a, a + r)), n.copyWithin(a, m, m + r), n.set(o, m);
      }
      return new ImageData(n, this.width, this.height);
    }
    toDataURL() {
      let e = document.createElement("canvas"), n = e.getContext("2d");
      if (e.width = this.width, e.height = this.height, !n)
        throw new Error("Failed to get 2d context");
      return n.putImageData(this.toImageData(), 0, 0), e.toDataURL();
    }
    clear() {
      let e = this.ctx.gl;
      e.clear(e.COLOR_BUFFER_BIT);
    }
    draw(e) {
      this.bind(), e(), this.unbind();
    }
    bind() {
      this.ctx.pushFramebuffer(this.glFramebuffer), this.ctx.pushRenderbuffer(this.glRenderbuffer), this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height });
    }
    unbind() {
      this.ctx.popFramebuffer(), this.ctx.popRenderbuffer(), this.ctx.popViewport();
    }
    free() {
      let e = this.ctx.gl;
      e.deleteFramebuffer(this.glFramebuffer), e.deleteRenderbuffer(this.glRenderbuffer), this.tex.free();
    }
  };
  var qn = class {
    static {
      i(this, "BatchRenderer");
    }
    ctx;
    glVBuf;
    glIBuf;
    vqueue = [];
    iqueue = [];
    stride;
    maxVertices;
    maxIndices;
    vertexFormat;
    numDraws = 0;
    curPrimitive = null;
    curTex = null;
    curShader = null;
    curUniform = {};
    constructor(e, n, r, o) {
      let s = e.gl;
      this.vertexFormat = n, this.ctx = e, this.stride = n.reduce((m, u) => m + u.size, 0), this.maxVertices = r, this.maxIndices = o;
      let a = s.createBuffer();
      if (!a)
        throw new Error("Failed to create vertex buffer");
      this.glVBuf = a, e.pushArrayBuffer(this.glVBuf), s.bufferData(s.ARRAY_BUFFER, r * 4, s.DYNAMIC_DRAW), e.popArrayBuffer(), this.glIBuf = s.createBuffer(), e.pushElementArrayBuffer(this.glIBuf), s.bufferData(s.ELEMENT_ARRAY_BUFFER, o * 4, s.DYNAMIC_DRAW), e.popElementArrayBuffer();
    }
    push(e, n, r, o, s = null, a = {}) {
      (e !== this.curPrimitive || s !== this.curTex || o !== this.curShader || !Bn(this.curUniform, a) || this.vqueue.length + n.length * this.stride > this.maxVertices || this.iqueue.length + r.length > this.maxIndices) && this.flush();
      let m = this.vqueue.length / this.stride;
      for (let u of n)
        this.vqueue.push(u);
      for (let u of r)
        this.iqueue.push(u + m);
      this.curPrimitive = e, this.curShader = o, this.curTex = s, this.curUniform = a;
    }
    flush() {
      if (!this.curPrimitive || !this.curShader || this.vqueue.length === 0 || this.iqueue.length === 0)
        return;
      let e = this.ctx.gl;
      this.ctx.pushArrayBuffer(this.glVBuf), e.bufferSubData(e.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)), this.ctx.pushElementArrayBuffer(this.glIBuf), e.bufferSubData(e.ELEMENT_ARRAY_BUFFER, 0, new Uint16Array(this.iqueue)), this.ctx.setVertexFormat(this.vertexFormat), this.curShader.bind(), this.curShader.send(this.curUniform), this.curTex?.bind(), e.drawElements(this.curPrimitive, this.iqueue.length, e.UNSIGNED_SHORT, 0), this.curTex?.unbind(), this.curShader.unbind(), this.ctx.popArrayBuffer(), this.ctx.popElementArrayBuffer(), this.vqueue = [], this.iqueue = [], this.numDraws++;
    }
    free() {
      let e = this.ctx.gl;
      e.deleteBuffer(this.glVBuf), e.deleteBuffer(this.glIBuf);
    }
  };
  function Tt(t18) {
    let e = [], n = i((s) => {
      e.push(s), t18(s);
    }, "push"), r = i(() => {
      e.pop(), t18(o() ?? null);
    }, "pop"), o = i(() => e[e.length - 1], "cur");
    return [n, r, o];
  }
  i(Tt, "genStack");
  function zi(t18, e = {}) {
    let n = [];
    function r(M) {
      n.push(M);
    }
    i(r, "onDestroy");
    function o() {
      n.forEach((b) => b());
      let M = t18.getExtension("WEBGL_lose_context");
      M && M.loseContext();
    }
    i(o, "destroy");
    let s = null;
    function a(M) {
      if (Bn(M, s))
        return;
      s = M;
      let b = M.reduce((E, A) => E + A.size, 0);
      M.reduce((E, A, G) => (t18.vertexAttribPointer(G, A.size, t18.FLOAT, false, b * 4, E), t18.enableVertexAttribArray(G), E + A.size * 4), 0);
    }
    i(a, "setVertexFormat");
    let [m, u] = Tt((M) => t18.bindTexture(t18.TEXTURE_2D, M)), [p, c] = Tt((M) => t18.bindBuffer(t18.ARRAY_BUFFER, M)), [f, d] = Tt((M) => t18.bindBuffer(t18.ELEMENT_ARRAY_BUFFER, M)), [v, h] = Tt((M) => t18.bindFramebuffer(t18.FRAMEBUFFER, M)), [O2, y] = Tt((M) => t18.bindRenderbuffer(t18.RENDERBUFFER, M)), [w, V2] = Tt((M) => {
      if (!M)
        return;
      let { x: b, y: E, w: A, h: G } = M;
      t18.viewport(b, E, A, G);
    }), [R, P] = Tt((M) => t18.useProgram(M));
    return w({ x: 0, y: 0, w: t18.drawingBufferWidth, h: t18.drawingBufferHeight }), { gl: t18, opts: e, onDestroy: r, destroy: o, pushTexture2D: m, popTexture2D: u, pushArrayBuffer: p, popArrayBuffer: c, pushElementArrayBuffer: f, popElementArrayBuffer: d, pushFramebuffer: v, popFramebuffer: h, pushRenderbuffer: O2, popRenderbuffer: y, pushViewport: w, popViewport: V2, pushProgram: R, popProgram: P, setVertexFormat: a };
  }
  i(zi, "initGfx");
  var zr = {};
  function $i(t18, e) {
    e.pos && (t18.pos = t18.pos.add(e.pos)), e.scale && (t18.scale = t18.scale.scale(x(e.scale))), e.angle && (t18.angle += e.angle), e.color && t18.ch.length === 1 && (t18.color = t18.color.mult(e.color)), e.opacity != null && (t18.opacity *= e.opacity);
  }
  i($i, "applyCharTransform");
  function zn(t18) {
    let e = {}, n = "", r = [], o = String(t18), s = i((a) => {
      r.length > 0 && (e[n.length] = r.slice()), n += a;
    }, "emit");
    for (; o !== ""; ) {
      if (o[0] === "\\") {
        if (o.length === 1)
          throw new Error("Styled text error: \\ at end of string");
        s(o[1]), o = o.slice(2);
        continue;
      }
      if (o[0] === "[") {
        let a = /^\[(\/)?(\w+?)\]/.exec(o);
        if (!a) {
          s(o[0]), o = o.slice(1);
          continue;
        }
        let [m, u, p] = a;
        if (u !== void 0) {
          let c = r.pop();
          if (c !== p)
            throw c !== void 0 ? new Error(`Styled text error: mismatched tags. Expected [/${c}], got [/${p}]`) : new Error(`Styled text error: stray end tag [/${p}]`);
        } else
          r.push(p);
        o = o.slice(m.length);
        continue;
      }
      s(o[0]), o = o.slice(1);
    }
    if (r.length > 0)
      throw new Error(`Styled text error: unclosed tags ${r}`);
    return { charStyleMap: e, text: n };
  }
  i(zn, "compileStyledText");
  function Ne(t18) {
    if (t18.text === void 0)
      throw new Error('formatText() requires property "text".');
    let e = jr(t18.font);
    if (!t18.text || t18.text === "" || e instanceof ce || !e)
      return { width: 0, height: 0, chars: [], opt: t18, renderedText: "" };
    let { charStyleMap: n, text: r } = zn(t18.text + ""), o = Qo(r);
    if (e instanceof Et || typeof e == "string") {
      let V2 = e instanceof Et ? e.fontface.family : e, R = e instanceof Et ? { outline: e.outline, filter: e.filter } : { outline: null, filter: rn }, P = zr[V2] ?? { font: { tex: new Ve(l.gfx.ggl, 2048, 2048, { filter: R.filter }), map: {}, size: 64 }, cursor: new C(0), outline: R.outline };
      zr[V2] || (zr[V2] = P), e = P.font;
      for (let M of o)
        if (!P.font.map[M]) {
          let b = l.fontCacheC2d;
          if (!b)
            throw new Error("fontCacheC2d is not defined.");
          if (!l.fontCacheCanvas)
            throw new Error("fontCacheCanvas is not defined.");
          b.clearRect(0, 0, l.fontCacheCanvas.width, l.fontCacheCanvas.height), b.font = `${e.size}px ${V2}`, b.textBaseline = "top", b.textAlign = "left", b.fillStyle = "#ffffff";
          let E = b.measureText(M), A = Math.ceil(E.width);
          if (!A)
            continue;
          let G = E.fontBoundingBoxAscent + E.fontBoundingBoxDescent;
          P.outline && P.outline.width && P.outline.color && (b.lineJoin = "round", b.lineWidth = P.outline.width * 2, b.strokeStyle = P.outline.color.toHex(), b.strokeText(M, P.outline.width, P.outline.width), A += P.outline.width * 2, G += P.outline.width * 3), b.fillText(M, P.outline?.width ?? 0, P.outline?.width ?? 0);
          let D = b.getImageData(0, 0, A, G);
          if (P.cursor.x + A > 2048 && (P.cursor.x = 0, P.cursor.y += G, P.cursor.y > 2048))
            throw new Error("Font atlas exceeds character limit");
          e.tex.update(D, P.cursor.x, P.cursor.y), e.map[M] = new z2(P.cursor.x, P.cursor.y, A, G), P.cursor.x += A;
        }
    }
    let s = t18.size || e.size, a = x(t18.scale ?? 1).scale(s / e.size), m = t18.lineSpacing ?? 0, u = t18.letterSpacing ?? 0, p = 0, c = 0, f = 0, d = [], v = [], h = 0, O2 = null, y = 0;
    for (; h < o.length; ) {
      let V2 = o[h];
      if (V2 === `
`)
        f += s + m, d.push({ width: p - u, chars: v }), O2 = null, y = 0, p = 0, v = [];
      else {
        let R = e.map[V2];
        if (R) {
          let P = R.w * a.x;
          t18.width && p + P > t18.width && (f += s + m, O2 != null && (h -= v.length - O2, V2 = o[h], R = e.map[V2], P = R.w * a.x, v = v.slice(0, O2 - 1), p = y), O2 = null, y = 0, d.push({ width: p - u, chars: v }), p = 0, v = []), v.push({ tex: e.tex, width: R.w, height: R.h, quad: new z2(R.x / e.tex.width, R.y / e.tex.height, R.w / e.tex.width, R.h / e.tex.height), ch: V2, pos: new C(p, f), opacity: t18.opacity ?? 1, color: t18.color ?? I.WHITE, scale: x(a), angle: 0 }), V2 === " " && (O2 = v.length, y = p), p += P, c = Math.max(c, p), p += u;
        }
      }
      h++;
    }
    d.push({ width: p - u, chars: v }), f += s, t18.width && (c = t18.width);
    let w = [];
    for (let V2 = 0; V2 < d.length; V2++) {
      let R = (c - d[V2].width) * oi(t18.align ?? "left");
      for (let P of d[V2].chars) {
        let M = e.map[P.ch], b = w.length + V2;
        if (P.pos = P.pos.add(R, 0).add(M.w * a.x * 0.5, M.h * a.y * 0.5), t18.transform) {
          let E = typeof t18.transform == "function" ? t18.transform(b, P.ch) : t18.transform;
          E && $i(P, E);
        }
        if (n[b]) {
          let E = n[b];
          for (let A of E) {
            let G = t18.styles?.[A], D = typeof G == "function" ? G(b, P.ch) : G;
            D && $i(P, D);
          }
        }
        w.push(P);
      }
    }
    return { width: c, height: f, chars: w, opt: t18, renderedText: r };
  }
  i(Ne, "formatText");
  function it(t18) {
    if (t18.width === void 0 || t18.height === void 0)
      throw new Error('drawUVQuad() requires property "width" and "height".');
    if (t18.width <= 0 || t18.height <= 0)
      return;
    let e = t18.width, n = t18.height, o = ke(t18.anchor || pt).scale(new C(e, n).scale(-0.5)), s = t18.quad || new z2(0, 0, 1, 1), a = t18.color || k(255, 255, 255), m = t18.opacity ?? 1, u = t18.tex ? 0.1 / t18.tex.width : 0, p = t18.tex ? 0.1 / t18.tex.height : 0, c = s.x + u, f = s.y + p, d = s.w - u * 2, v = s.h - p * 2;
    be(), Q(t18.pos), We(t18.angle), nt(t18.scale), Q(o), Fe([{ pos: new C(-e / 2, n / 2), uv: new C(t18.flipX ? c + d : c, t18.flipY ? f : f + v), color: a, opacity: m }, { pos: new C(-e / 2, -n / 2), uv: new C(t18.flipX ? c + d : c, t18.flipY ? f + v : f), color: a, opacity: m }, { pos: new C(e / 2, -n / 2), uv: new C(t18.flipX ? c : c + d, t18.flipY ? f + v : f), color: a, opacity: m }, { pos: new C(e / 2, n / 2), uv: new C(t18.flipX ? c : c + d, t18.flipY ? f : f + v), color: a, opacity: m }], [0, 1, 3, 1, 2, 3], t18.fixed, t18.tex, t18.shader, t18.uniform ?? void 0), pe();
  }
  i(it, "drawUVQuad");
  function He(t18) {
    be(), Q(t18.opt.pos), We(t18.opt.angle), Q(ke(t18.opt.anchor ?? "topleft").add(1, 1).scale(t18.width, t18.height).scale(-0.5)), t18.chars.forEach((e) => {
      it({ tex: e.tex, width: e.width, height: e.height, pos: e.pos, scale: e.scale, angle: e.angle, color: e.color, opacity: e.opacity, quad: e.quad, anchor: "center", uniform: t18.opt.uniform, shader: t18.opt.shader, fixed: t18.opt.fixed });
    }), pe();
  }
  i(He, "drawFormattedText");
  function ve(t18) {
    if (t18.width === void 0 || t18.height === void 0)
      throw new Error('drawRect() requires property "width" and "height".');
    if (t18.width <= 0 || t18.height <= 0)
      return;
    let e = t18.width, n = t18.height, o = ke(t18.anchor || pt).add(1, 1).scale(new C(e, n).scale(-0.5)), s = [new C(0, 0), new C(e, 0), new C(e, n), new C(0, n)];
    if (t18.radius) {
      let a = Math.min(e, n) / 2, m = Array.isArray(t18.radius) ? t18.radius.map((u) => Math.min(a, u)) : new Array(4).fill(Math.min(a, t18.radius));
      s = [new C(m[0], 0), ...m[1] ? yt(new C(e - m[1], m[1]), m[1], m[1], 270, 360) : [x(e, 0)], ...m[2] ? yt(new C(e - m[2], n - m[2]), m[2], m[2], 0, 90) : [x(e, n)], ...m[3] ? yt(new C(m[3], n - m[3]), m[3], m[3], 90, 180) : [x(0, n)], ...m[0] ? yt(new C(m[0], m[0]), m[0], m[0], 180, 270) : []];
    }
    Pe(Object.assign({}, t18, { offset: o, pts: s, ...t18.gradient ? { colors: t18.horizontal ? [t18.gradient[0], t18.gradient[1], t18.gradient[1], t18.gradient[0]] : [t18.gradient[0], t18.gradient[0], t18.gradient[1], t18.gradient[1]] } : {} }));
  }
  i(ve, "drawRect");
  function qe(t18) {
    Oe();
    let e = l.gfx.width, n = l.gfx.height;
    l.gfx.width = l.gfx.viewport.width, l.gfx.height = l.gfx.viewport.height, t18(), Oe(), l.gfx.width = e, l.gfx.height = n;
  }
  i(qe, "drawUnscaled");
  function Yr(t18, e) {
    qe(() => {
      let n = x(8);
      be(), Q(t18);
      let r = Ne({ text: e, font: vt, size: 16, pos: n, color: k(255, 255, 255), fixed: true }), o = r.width + n.x * 2, s = r.height + n.x * 2;
      t18.x + o >= ie() && Q(x(-o, 0)), t18.y + s >= ue() && Q(x(0, -s)), ve({ width: o, height: s, color: k(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), He(r), pe();
    });
  }
  i(Yr, "drawInspectText");
  function Yn(t18) {
    if (!t18.p1 || !t18.p2 || !t18.p3)
      throw new Error('drawTriangle() requires properties "p1", "p2" and "p3".');
    return Pe(Object.assign({}, t18, { pts: [t18.p1, t18.p2, t18.p3] }));
  }
  i(Yn, "drawTriangle");
  function Qi() {
    if (l.debug.inspect) {
      let t18 = null;
      for (let e of l.game.root.get("*", { recursive: true }))
        if (e.c("area") && e.isHovering()) {
          t18 = e;
          break;
        }
      if (l.game.root.drawInspect(), t18) {
        let e = [], n = t18.inspect();
        for (let r in n)
          n[r] ? e.push(`${n[r]}`) : e.push(`${r}`);
        Yr(di(Kn()), e.join(`
`));
      }
      Yr(x(8), `FPS: ${l.debug.fps()}`);
    }
    l.debug.paused && qe(() => {
      be(), Q(ie(), 0), Q(-8, 8);
      let t18 = 32;
      ve({ width: t18, height: t18, anchor: "topright", color: k(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
      for (let e = 1; e <= 2; e++)
        ve({ width: 4, height: t18 * 0.6, anchor: "center", pos: x(-t18 / 3 * e, t18 * 0.5), color: k(255, 255, 255), radius: 2, fixed: true });
      pe();
    }), l.debug.timeScale !== 1 && qe(() => {
      be(), Q(ie(), ue()), Q(-8, -8);
      let t18 = 8, e = Ne({ text: l.debug.timeScale.toFixed(1), font: vt, size: 16, color: k(255, 255, 255), pos: x(-t18), anchor: "botright", fixed: true });
      ve({ width: e.width + t18 * 2 + t18 * 4, height: e.height + t18 * 2, anchor: "botright", color: k(0, 0, 0), opacity: 0.8, radius: 4, fixed: true });
      for (let n = 0; n < 2; n++) {
        let r = l.debug.timeScale < 1;
        Yn({ p1: x(-e.width - t18 * (r ? 2 : 3.5), -t18), p2: x(-e.width - t18 * (r ? 2 : 3.5), -t18 - e.height), p3: x(-e.width - t18 * (r ? 3.5 : 2), -t18 - e.height / 2), pos: x(-n * t18 * 1 + (r ? -t18 * 0.5 : 0), 0), color: k(255, 255, 255), fixed: true });
      }
      He(e), pe();
    }), l.debug.curRecording && qe(() => {
      be(), Q(0, ue()), Q(24, -24), _e({ radius: 12, color: k(255, 0, 0), opacity: An(0, 1, l.app.time() * 4), fixed: true }), pe();
    }), l.debug.showLog && l.game.logs.length > 0 && qe(() => {
      be(), Q(0, ue()), Q(8, -8);
      let t18 = 8, e = [];
      for (let r of l.game.logs) {
        let o = "", s = r.msg instanceof Error ? "error" : "info";
        o += `[time]${r.time.toFixed(2)}[/time]`, o += " ", o += `[${s}]${Wr(r.msg)}[/${s}]`, e.push(o);
      }
      l.game.logs = l.game.logs.filter((r) => l.app.time() - r.time < (l.globalOpt.logTime || 4));
      let n = Ne({ text: e.join(`
`), font: vt, pos: x(t18, -t18), anchor: "botleft", size: 16, width: ie() * 0.6, lineSpacing: t18 / 2, fixed: true, styles: { time: { color: k(127, 127, 127) }, info: { color: k(255, 255, 255) }, error: { color: k(255, 0, 127) } } });
      ve({ width: n.width + t18 * 2, height: n.height + t18 * 2, anchor: "botleft", color: k(0, 0, 0), radius: 4, opacity: 0.8, fixed: true }), He(n), pe();
    });
  }
  i(Qi, "drawDebug");
  function Wr(t18, e = false) {
    var n = "", r;
    return e && typeof t18 == "string" && (t18 = JSON.stringify(t18)), Array.isArray(t18) && (n = ["[", t18.map((o) => Wr(o, true)).join(", "), "]"].join(""), t18 = n), typeof t18 == "object" && t18.toString === Object.prototype.toString && (t18.constructor !== Object && (n += t18.constructor.name + " "), n += ["{", (r = Object.getOwnPropertyNames(t18).map((o) => `${/^\w+$/.test(o) ? o : JSON.stringify(o)}: ${Wr(t18[o], true)}`).join(", ")) ? ` ${r} ` : "", "}"].join(""), t18 = n), String(t18).replaceAll(/(?<!\\)\[/g, "\\[");
  }
  i(Wr, "prettyDebug");
  function Ji() {
    let t18 = l.game.cam, e = C.fromAngle(ge(0, 360)).scale(t18.shake);
    t18.shake = fe(t18.shake, 0, 5 * te()), t18.transform = new he().translate(xt()).scale(t18.scale).rotate(t18.angle).translate((t18.pos ?? xt()).scale(-1).add(e)), l.game.root.draw(), Oe();
  }
  i(Ji, "drawFrame");
  function Zi() {
    let t18 = Be();
    l.game.events.numListeners("loading") > 0 ? l.game.events.trigger("loading", t18) : qe(() => {
      let e = ie() / 2, n = 24, r = x(ie() / 2, ue() / 2).sub(x(e / 2, n / 2));
      ve({ pos: x(0), width: ie(), height: ue(), color: k(0, 0, 0) }), ve({ pos: r, width: e, height: n, fill: false, outline: { width: 4 } }), ve({ pos: r, width: e * t18, height: n });
    });
  }
  i(Zi, "drawLoadScreen");
  function Wn(t18, e, n) {
    let r = l.gfx.ggl.gl;
    Oe(), r.clear(r.STENCIL_BUFFER_BIT), r.enable(r.STENCIL_TEST), r.stencilFunc(r.NEVER, 1, 255), r.stencilOp(r.REPLACE, r.REPLACE, r.REPLACE), e(), Oe(), r.stencilFunc(n, 1, 255), r.stencilOp(r.KEEP, r.KEEP, r.KEEP), t18(), Oe(), r.disable(r.STENCIL_TEST);
  }
  i(Wn, "drawStenciled");
  function es(t18, e) {
    let n = l.gfx.ggl.gl;
    Wn(t18, e, n.EQUAL);
  }
  i(es, "drawMasked");
  function At(t18) {
    if (!t18.tex)
      throw new Error('drawTexture() requires property "tex".');
    let e = t18.quad ?? new z2(0, 0, 1, 1), n = t18.tex.width * e.w, r = t18.tex.height * e.h, o = new C(1);
    if (t18.tiled) {
      let a = ke(t18.anchor || pt).add(new C(1, 1)).scale(0.5).scale(t18.width || n, t18.height || r), m = (t18.width || n) / n, u = (t18.height || r) / r, p = Math.floor(m), c = Math.floor(u), f = m - p, d = u - c, v = (p + f ? 1 : 0) * (c + d ? 1 : 0), h = new Array(v * 6), O2 = new Array(v * 4), y = 0, w = i((V2, R, P, M, b) => {
        h[y * 6 + 0] = y * 4 + 0, h[y * 6 + 1] = y * 4 + 1, h[y * 6 + 2] = y * 4 + 3, h[y * 6 + 3] = y * 4 + 1, h[y * 6 + 4] = y * 4 + 2, h[y * 6 + 5] = y * 4 + 3, O2[y * 4 + 0] = { pos: new C(V2 - a.x, R - a.y), uv: new C(b.x, b.y), color: t18.color || I.WHITE, opacity: t18.opacity || 1 }, O2[y * 4 + 1] = { pos: new C(V2 + P - a.x, R - a.y), uv: new C(b.x + b.w, b.y), color: t18.color || I.WHITE, opacity: t18.opacity || 1 }, O2[y * 4 + 2] = { pos: new C(V2 + P - a.x, R + M - a.y), uv: new C(b.x + b.w, b.y + b.h), color: t18.color || I.WHITE, opacity: t18.opacity || 1 }, O2[y * 4 + 3] = { pos: new C(V2 - a.x, R + M - a.y), uv: new C(b.x, b.y + b.h), color: t18.color || I.WHITE, opacity: t18.opacity || 1 }, y++;
      }, "addQuad");
      for (let V2 = 0; V2 < c; V2++) {
        for (let R = 0; R < p; R++)
          w(R * n, V2 * r, n, r, e);
        f && w(p * n, V2 * r, n * f, r, new z2(e.x, e.y, e.w * f, e.h));
      }
      if (d) {
        for (let V2 = 0; V2 < p; V2++)
          w(V2 * n, c * r, n, r * d, new z2(e.x, e.y, e.w, e.h * d));
        f && w(p * n, c * r, n * f, r * d, new z2(e.x, e.y, e.w * f, e.h * d));
      }
      Fe(O2, h, t18.fixed, t18.tex, t18.shader, t18.uniform ?? void 0);
    } else
      t18.width && t18.height ? (o.x = t18.width / n, o.y = t18.height / r) : t18.width ? (o.x = t18.width / n, o.y = o.x) : t18.height && (o.y = t18.height / r, o.x = o.y), it(Object.assign({}, t18, { scale: o.scale(t18.scale || new C(1)), tex: t18.tex, quad: e, width: n, height: r }));
  }
  i(At, "drawTexture");
  function ts(t18) {
    if (!t18.sprite)
      throw new Error('drawSprite() requires property "sprite"');
    let e = It(t18.sprite);
    if (!e || !e.data)
      return;
    let n = e.data.frames[t18.frame ?? 0];
    if (!n)
      throw new Error(`Frame not found: ${t18.frame ?? 0}`);
    At(Object.assign({}, t18, { tex: e.data.tex, quad: n.scale(t18.quad ?? new z2(0, 0, 1, 1)) }));
  }
  i(ts, "drawSprite");
  function ns(t18, e) {
    let n = l.gfx.ggl.gl;
    Wn(t18, e, n.NOTEQUAL);
  }
  i(ns, "drawSubtracted");
  function $r(t18) {
    He(Ne(t18));
  }
  i($r, "drawText");
  var rs = i((t18, e) => {
    let n = _n(e, sn, an), r = t18.pixelDensity ?? 1, o = t18.scale ?? 1, { gl: s } = e, a = Ve.fromImage(e, new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), m = t18.width && t18.height ? new ot(e, t18.width * r * o, t18.height * r * o) : new ot(e, s.drawingBufferWidth, s.drawingBufferHeight), u = null, p = 1;
    t18.background && (typeof t18.background == "string" ? u = k(t18.background) : (u = k(...t18.background), p = t18.background[3] ?? 1), s.clearColor(u.r / 255, u.g / 255, u.b / 255, p ?? 1)), s.enable(s.BLEND), s.blendFuncSeparate(s.SRC_ALPHA, s.ONE_MINUS_SRC_ALPHA, s.ONE, s.ONE_MINUS_SRC_ALPHA);
    let c = new qn(e, on, gi, bi), f = Ve.fromImage(e, new ImageData(new Uint8ClampedArray([128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128, 128, 255]), 2, 2), { wrap: "repeat", filter: "nearest" });
    return { lastDrawCalls: 0, ggl: e, defShader: n, defTex: a, frameBuffer: m, postShader: null, postShaderUniform: null, renderer: c, transform: new he(), transformStack: [], bgTex: f, bgColor: u, bgAlpha: p, width: t18.width ?? s.drawingBufferWidth / r / o, height: t18.height ?? s.drawingBufferHeight / r / o, viewport: { x: 0, y: 0, width: s.drawingBufferWidth, height: s.drawingBufferHeight }, fixed: false };
  }, "initAppGfx");
  function $n() {
    let t18 = l.pixelDensity, e = l.gfx.ggl.gl.drawingBufferWidth / t18, n = l.gfx.ggl.gl.drawingBufferHeight / t18;
    if (l.globalOpt.letterbox) {
      if (!l.globalOpt.width || !l.globalOpt.height)
        throw new Error("Letterboxing requires width and height defined.");
      let r = e / n, o = l.globalOpt.width / l.globalOpt.height;
      if (r > o) {
        let s = n * o, a = (e - s) / 2;
        l.gfx.viewport = { x: a, y: 0, width: s, height: n };
      } else {
        let s = e / o, a = (n - s) / 2;
        l.gfx.viewport = { x: 0, y: a, width: e, height: s };
      }
      return;
    }
    if (l.globalOpt.stretch && (!l.globalOpt.width || !l.globalOpt.height))
      throw new Error("Stretching requires width and height defined.");
    l.gfx.viewport = { x: 0, y: 0, width: e, height: n };
  }
  i($n, "updateViewport");
  function st(t18) {
    return t18.fixed ? true : t18.parent ? st(t18.parent) : false;
  }
  i(st, "isFixed");
  function Le(t18) {
    return { color: t18.color, opacity: t18.opacity, anchor: t18.anchor, outline: t18.outline, shader: t18.shader, uniform: t18.uniform };
  }
  i(Le, "getRenderProps");
  function os(t18, e = {}) {
    return { id: "circle", radius: t18, draw() {
      _e(Object.assign(Le(this), { radius: this.radius, fill: e.fill }));
    }, renderArea() {
      return new W(new C(this.anchor ? 0 : -this.radius), this.radius * 2, this.radius * 2);
    }, inspect() {
      return `radius: ${Math.ceil(this.radius)}`;
    } };
  }
  i(os, "circle");
  function Xn(...t18) {
    return { id: "color", color: k(...t18), inspect() {
      return `color: ${this.color.toString()}`;
    } };
  }
  i(Xn, "color");
  function is(t18) {
    return { add() {
      this.canvas = t18;
    } };
  }
  i(is, "drawon");
  function ss(t18 = 1) {
    let e, n = 0, r = false;
    return { require: ["opacity"], add() {
      e = this.opacity, this.opacity = 0;
    }, update() {
      r || (n += te(), this.opacity = Se(n, 0, t18, 0, e), n >= t18 && (this.opacity = e, r = true));
    } };
  }
  i(ss, "fadeIn");
  function as(t18 = "intersect") {
    return { id: "mask", mask: t18 };
  }
  i(as, "mask");
  function Qn(t18) {
    return { id: "opacity", opacity: t18 ?? 1, fadeIn(e = 1, n = l.k.easings.linear) {
      return l.game.root.tween(0, this.opacity, e, (r) => this.opacity = r, n);
    }, fadeOut(e = 1, n = l.k.easings.linear) {
      return l.game.root.tween(this.opacity, 0, e, (r) => this.opacity = r, n);
    }, inspect() {
      return `opacity: ${Zt(this.opacity, 1)}`;
    } };
  }
  i(Qn, "opacity");
  function us(t18 = 1, e = k(0, 0, 0), n = 1, r = "miter", o = 10, s = "butt") {
    return { id: "outline", outline: { width: t18, color: e, opacity: n, join: r, miterLimit: o, cap: s }, inspect() {
      return `outline: ${this.outline.width}px, ${this.outline.color}`;
    } };
  }
  i(us, "outline");
  var Xr = class {
    static {
      i(this, "Particle");
    }
    pos = x(0);
    vel = x(0);
    acc = x(0);
    angle = 0;
    angularVelocity = 0;
    damping = 0;
    t;
    lt = null;
    gc;
    constructor() {
      this.t = 0, this.gc = true;
    }
    get progress() {
      return this.lt ? this.t / this.lt : this.t;
    }
  };
  function cs(t18, e) {
    let n = e.lifetime, r = [], o = t18.colors || [I.WHITE], s = t18.opacities || [1], a = t18.quads || [new z2(0, 0, 1, 1)], m = t18.scales || [1], u = t18.lifeTime, p = e.direction, c = e.spread, f = t18.speed || [0, 0], d = t18.angle || [0, 0], v = t18.angularVelocity || [0, 0], h = t18.acceleration || [x(0), x(0)], O2 = t18.damping || [0, 0], y = [], w = new Array(t18.max), V2 = 0, R = 0;
    for (let b = 0; b < t18.max; b++) {
      y[b * 6 + 0] = b * 4 + 0, y[b * 6 + 1] = b * 4 + 1, y[b * 6 + 2] = b * 4 + 3, y[b * 6 + 3] = b * 4 + 1, y[b * 6 + 4] = b * 4 + 2, y[b * 6 + 5] = b * 4 + 3;
      for (let E = 0; E < 4; E++)
        w[b * 4 + E] = { pos: new C(0, 0), uv: new C(0, 0), color: k(255, 255, 255), opacity: 1 };
      r[b] = new Xr();
    }
    let P = new ae();
    function M(b = 0) {
      for (; b < t18.max; ) {
        if (r[b].gc)
          return b;
        b++;
      }
      return null;
    }
    return i(M, "nextFree"), { id: "particles", emit(b) {
      let E = 0;
      for (let A = 0; A < b; A++) {
        if (E = M(E), E == null)
          return;
        let G = ge(p - c, p + c), D = C.fromAngle(G).scale(ge(f[0], f[1])), U = ge(d[0], d[1]), L2 = ge(v[0], v[1]), H = x(ge(h[0].x, h[1].x), ge(h[0].y, h[1].y)), q = ge(O2[0], O2[1]), Y = u ? ge(u[0], u[1]) : null, _ = e.shape ? e.shape.random() : x(), K2 = r[E];
        K2.lt = Y, K2.pos = _, K2.vel = D, K2.acc = H, K2.angle = U, K2.angularVelocity = L2, K2.damping = q, K2.angularVelocity = L2, K2.gc = false;
      }
      V2 += b;
    }, update() {
      if (n !== void 0 && n <= 0)
        return;
      let b = te();
      for (let E of r)
        if (!E.gc) {
          if (E.t += b, E.lt && E.t >= E.lt) {
            E.gc = true, V2--;
            continue;
          }
          E.vel = E.vel.add(E.acc.scale(b)).scale(1 - E.damping * b), E.pos = E.pos.add(E.vel.scale(b)), E.angle += E.angularVelocity * b;
        }
      for (n !== void 0 && (n -= b, n <= 0 && P.trigger()), R += b; V2 < t18.max && e.rate && R > e.rate; )
        this.emit(1), V2++, R -= e.rate;
    }, draw() {
      if (!(n !== void 0 && n <= 0)) {
        for (let b = 0; b < r.length; b++) {
          let E = r[b];
          if (E.gc)
            continue;
          let A = E.progress, G = Math.floor(E.progress * o.length), D = G < o.length - 1 ? fe(o[G], o[G + 1], Se(A, G / o.length, (G + 1) / o.length, 0, 1)) : o[G], U = Math.floor(E.progress * s.length), L2 = U < s.length - 1 ? fe(s[U], s[U + 1], Se(A, U / s.length, (U + 1) / s.length, 0, 1)) : s[U], H = Math.floor(E.progress * a.length), q = a[H], Y = Math.floor(E.progress * m.length), _ = m[Y], K2 = Math.cos(E.angle * Math.PI / 180), Z = Math.sin(E.angle * Math.PI / 180), $ = (t18.texture ? t18.texture.width : 10) * q.w / 2, ee = (t18.texture ? t18.texture.height : 10) * q.h / 2, Ee = b * 4, j = w[Ee];
          j.pos.x = E.pos.x + -$ * _ * K2 - -ee * _ * Z, j.pos.y = E.pos.y + -$ * _ * Z + -ee * _ * K2, j.uv.x = q.x, j.uv.y = q.y, j.color.r = D.r, j.color.g = D.g, j.color.b = D.b, j.opacity = L2, j = w[Ee + 1], j.pos.x = E.pos.x + $ * _ * K2 - -ee * _ * Z, j.pos.y = E.pos.y + $ * _ * Z + -ee * _ * K2, j.uv.x = q.x + q.w, j.uv.y = q.y, j.color.r = D.r, j.color.g = D.g, j.color.b = D.b, j.opacity = L2, j = w[Ee + 2], j.pos.x = E.pos.x + $ * _ * K2 - ee * _ * Z, j.pos.y = E.pos.y + $ * _ * Z + ee * _ * K2, j.uv.x = q.x + q.w, j.uv.y = q.y + q.h, j.color.r = D.r, j.color.g = D.g, j.color.b = D.b, j.opacity = L2, j = w[Ee + 3], j.pos.x = E.pos.x + -$ * _ * K2 - ee * _ * Z, j.pos.y = E.pos.y + -$ * _ * Z + ee * _ * K2, j.uv.x = q.x, j.uv.y = q.y + q.h, j.color.r = D.r, j.color.g = D.g, j.color.b = D.b, j.opacity = L2;
        }
        Fe(w, y, this.fixed, t18.texture, this.shader, this.uniform);
      }
    }, onEnd(b) {
      return P.add(b);
    }, inspect() {
      return `count: ${V2}/${t18.max}`;
    } };
  }
  i(cs, "particles");
  function ls(t18, e = {}) {
    if (t18.length < 3)
      throw new Error(`Polygon's need more than two points, ${t18.length} points provided`);
    return { id: "polygon", pts: t18, colors: e.colors, uv: e.uv, tex: e.tex, radius: e.radius, draw() {
      Pe(Object.assign(Le(this), { pts: this.pts, colors: this.colors, uv: this.uv, tex: this.tex, radius: this.radius, fill: e.fill, triangulate: e.triangulate }));
    }, renderArea() {
      return new ye(this.pts);
    }, inspect() {
      return `polygon: ${this.pts.map((n) => `[${n.x},${n.y}]`).join(",")}`;
    } };
  }
  i(ls, "polygon");
  function Jn(t18, e, n) {
    let r;
    return l.game.root.get("area").forEach((s) => {
      if (n && n.some((u) => s.is(u)))
        return;
      let m = s.worldArea().raycast(t18, e);
      m && (r ? m.fraction < r.fraction && (r = m, r.object = s) : (r = m, r.object = s));
    }), r;
  }
  i(Jn, "raycast");
  function Zn(t18, e, n = {}) {
    return { id: "rect", width: t18, height: e, radius: n.radius || 0, draw() {
      ve(Object.assign(Le(this), { width: this.width, height: this.height, radius: this.radius, fill: n.fill }));
    }, renderArea() {
      return new W(x(0), this.width, this.height);
    }, inspect() {
      return `rect: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)}h)`;
    } };
  }
  i(Zn, "rect");
  function ms(t18, e) {
    return { id: "shader", shader: t18, ...typeof e == "function" ? { uniform: e(), update() {
      this.uniform = e();
    } } : { uniform: e }, inspect() {
      return `shader: ${t18}`;
    } };
  }
  i(ms, "shader");
  function ps(...t18) {
    return t18.length > 0 && (l.game.cam.pos = x(...t18)), l.game.cam.pos ? l.game.cam.pos.clone() : xt();
  }
  i(ps, "camPos");
  function ds(...t18) {
    return t18.length > 0 && (l.game.cam.scale = x(...t18)), l.game.cam.scale.clone();
  }
  i(ds, "camScale");
  function fs(t18) {
    return t18 !== void 0 && (l.game.cam.angle = t18), l.game.cam.angle;
  }
  i(fs, "camRot");
  function hs(t18 = k(255, 255, 255), e = 1) {
    let n = l.game.root.add([Zn(ie(), ue()), Xn(t18), Qn(1), nr()]), r = n.fadeOut(e);
    return r.onEnd(() => tr(n)), r;
  }
  i(hs, "camFlash");
  function gs() {
    return l.game.cam.transform.clone();
  }
  i(gs, "camTransform");
  function bs(t18 = 12) {
    l.game.cam.shake += t18;
  }
  i(bs, "shake");
  function pn(t18) {
    return l.game.cam.transform.multVec2(t18);
  }
  i(pn, "toScreen");
  function er(t18) {
    return l.game.cam.transform.invert().multVec2(t18);
  }
  i(er, "toWorld");
  function ys(t18, e) {
    if (!e.tileWidth || !e.tileHeight)
      throw new Error("Must provide tileWidth and tileHeight.");
    let n = l.game.root.add([St(e.pos ?? x(0))]), r = t18.length, o = 0, s = null, a = null, m = null, u = null, p = i((b) => b.x + b.y * o, "tile2Hash"), c = i((b) => x(Math.floor(b % o), Math.floor(b / o)), "hash2Tile"), f = i(() => {
      s = [];
      for (let b of n.children)
        d(b);
    }, "createSpatialMap"), d = i((b) => {
      let E = p(b.tilePos);
      s[E] ? s[E].push(b) : s[E] = [b];
    }, "insertIntoSpatialMap"), v = i((b) => {
      let E = p(b.tilePos);
      if (s[E]) {
        let A = s[E].indexOf(b);
        A >= 0 && s[E].splice(A, 1);
      }
    }, "removeFromSpatialMap"), h = i(() => {
      let b = false;
      for (let E of n.children) {
        let A = n.pos2Tile(E.pos);
        (E.tilePos.x != A.x || E.tilePos.y != A.y) && (b = true, v(E), E.tilePos.x = A.x, E.tilePos.y = A.y, d(E));
      }
      b && n.trigger("spatialMapChanged");
    }, "updateSpatialMap"), O2 = i(() => {
      let b = n.getSpatialMap(), E = n.numRows() * n.numColumns();
      a ? a.length = E : a = new Array(E), a.fill(1, 0, E);
      for (let A = 0; A < b.length; A++) {
        let G = b[A];
        if (G) {
          let D = 0;
          for (let U of G)
            if (U.isObstacle) {
              D = 1 / 0;
              break;
            } else
              D += U.cost;
          a[A] = D || 1;
        }
      }
    }, "createCostMap"), y = i(() => {
      let b = n.getSpatialMap(), E = n.numRows() * n.numColumns();
      m ? m.length = E : m = new Array(E), m.fill(15, 0, E);
      for (let A = 0; A < b.length; A++) {
        let G = b[A];
        if (G) {
          let D = G.length, U = 15;
          for (let L2 = 0; L2 < D; L2++)
            U |= G[L2].edgeMask;
          m[A] = U;
        }
      }
    }, "createEdgeMap"), w = i(() => {
      let b = n.numRows() * n.numColumns(), E = i((G, D) => {
        let U = [];
        for (U.push(G); U.length > 0; ) {
          let L2 = U.pop();
          P(L2).forEach((H) => {
            u[H] < 0 && (u[H] = D, U.push(H));
          });
        }
      }, "traverse");
      u ? u.length = b : u = new Array(b), u.fill(-1, 0, b);
      let A = 0;
      for (let G = 0; G < a.length; G++) {
        if (u[G] >= 0) {
          A++;
          continue;
        }
        E(G, A), A++;
      }
    }, "createConnectivityMap"), V2 = i((b, E) => a[E], "getCost"), R = i((b, E) => {
      let A = c(b), G = c(E);
      return A.dist(G);
    }, "getHeuristic"), P = i((b, E) => {
      let A = [], G = Math.floor(b % o), D = G > 0 && m[b] & 1 && a[b - 1] !== 1 / 0, U = b >= o && m[b] & 2 && a[b - o] !== 1 / 0, L2 = G < o - 1 && m[b] & 4 && a[b + 1] !== 1 / 0, H = b < o * r - o - 1 && m[b] & 8 && a[b + o] !== 1 / 0;
      return E ? (D && (U && A.push(b - o - 1), A.push(b - 1), H && A.push(b + o - 1)), U && A.push(b - o), L2 && (U && A.push(b - o + 1), A.push(b + 1), H && A.push(b + o + 1)), H && A.push(b + o)) : (D && A.push(b - 1), U && A.push(b - o), L2 && A.push(b + 1), H && A.push(b + o)), A;
    }, "getNeighbours"), M = { id: "level", tileWidth() {
      return e.tileWidth;
    }, tileHeight() {
      return e.tileHeight;
    }, spawn(b, ...E) {
      let A = x(...E), G = (() => {
        if (typeof b == "string") {
          if (e.tiles[b]) {
            if (typeof e.tiles[b] != "function")
              throw new Error("Level symbol def must be a function returning a component list");
            return e.tiles[b](A);
          } else if (e.wildcardTile)
            return e.wildcardTile(b, A);
        } else {
          if (Array.isArray(b))
            return b;
          throw new Error("Expected a symbol or a component list");
        }
      })();
      if (!G)
        return null;
      let D = false, U = false;
      for (let H of G)
        H.id === "tile" && (U = true), H.id === "pos" && (D = true);
      D || G.push(St(this.tile2Pos(A))), U || G.push(rr());
      let L2 = n.add(G);
      return D && (L2.tilePosOffset = L2.pos.clone()), L2.tilePos = A, L2.transform = mt(L2), s && (d(L2), this.trigger("spatialMapChanged"), this.trigger("navigationMapInvalid")), L2;
    }, numColumns() {
      return o;
    }, numRows() {
      return r;
    }, levelWidth() {
      return o * this.tileWidth();
    }, levelHeight() {
      return r * this.tileHeight();
    }, tile2Pos(...b) {
      return x(...b).scale(this.tileWidth(), this.tileHeight());
    }, pos2Tile(...b) {
      let E = x(...b);
      return x(Math.floor(E.x / this.tileWidth()), Math.floor(E.y / this.tileHeight()));
    }, getSpatialMap() {
      return s || f(), s;
    }, onSpatialMapChanged(b) {
      return this.on("spatialMapChanged", b);
    }, onNavigationMapInvalid(b) {
      return this.on("navigationMapInvalid", b);
    }, getAt(b) {
      s || f();
      let E = p(b);
      return s[E] || [];
    }, raycast(b, E) {
      let A = this.toWorld(b), G = this.toWorld(b.add(E)).sub(A), D = 1 / this.tileWidth(), U = b.scale(D), L2 = To(U, E, (H) => {
        let q = this.getAt(H);
        if (q.some((_) => _.isObstacle))
          return true;
        let Y = null;
        for (let _ of q)
          if (_.is("area")) {
            let Z = _.worldArea().raycast(A, G);
            Z && (Y ? Z.fraction < Y.fraction && (Y = Z, Y.object = _) : (Y = Z, Y.object = _));
          }
        return Y && (Y.point = this.fromWorld(Y.point).scale(D)), Y || false;
      }, 64);
      return L2 && (L2.point = L2.point.scale(this.tileWidth())), L2;
    }, update() {
      s && h();
    }, invalidateNavigationMap() {
      a = null, m = null, u = null;
    }, onNavigationMapChanged(b) {
      return this.on("navigationMapChanged", b);
    }, getTilePath(b, E, A = {}) {
      if (a || O2(), m || y(), u || w(), b.x < 0 || b.x >= o || b.y < 0 || b.y >= r || E.x < 0 || E.x >= o || E.y < 0 || E.y >= r)
        return null;
      let G = p(b), D = p(E);
      if (a[D] === 1 / 0)
        return null;
      if (G === D)
        return [];
      if (u[G] != -1 && u[G] !== u[D])
        return null;
      let U = new Lt((K2, Z) => K2.cost < Z.cost);
      U.insert({ cost: 0, node: G });
      let L2 = /* @__PURE__ */ new Map();
      L2.set(G, G);
      let H = /* @__PURE__ */ new Map();
      for (H.set(G, 0); U.length !== 0; ) {
        let K2 = U.remove()?.node;
        if (K2 === D)
          break;
        let Z = P(K2, A.allowDiagonals);
        for (let $ of Z) {
          let ee = (H.get(K2) || 0) + V2(K2, $) + R($, D);
          (!H.has($) || ee < H.get($)) && (H.set($, ee), U.insert({ cost: ee, node: $ }), L2.set($, K2));
        }
      }
      let q = [], Y = D, _ = c(Y);
      for (q.push(_); Y !== G; ) {
        let K2 = L2.get(Y);
        if (K2 === void 0)
          throw new Error("Bug in pathfinding algorithm");
        Y = K2;
        let Z = c(Y);
        q.push(Z);
      }
      return q.reverse();
    }, getPath(b, E, A = {}) {
      let G = this.tileWidth(), D = this.tileHeight(), U = this.getTilePath(this.pos2Tile(b), this.pos2Tile(E), A);
      return U ? [b, ...U.slice(1, -1).map((L2) => L2.scale(G, D).add(G / 2, D / 2)), E] : null;
    } };
    return n.use(M), n.onNavigationMapInvalid(() => {
      n.invalidateNavigationMap(), n.trigger("navigationMapChanged");
    }), t18.forEach((b, E) => {
      let A = b.split("");
      o = Math.max(A.length, o), A.forEach((G, D) => {
        n.spawn(G, x(D, E));
      });
    }), n;
  }
  i(ys, "addLevel");
  function Qe(t18, e, n) {
    return l.game.objEvents.registers[t18] || (l.game.objEvents.registers[t18] = new Jt()), l.game.objEvents.on(t18, (r, ...o) => {
      r.is(e) && n(r, ...o);
    });
  }
  i(Qe, "on");
  var xs = me((t18) => {
    let e = l.game.root.add([{ fixedUpdate: t18 }]);
    return { get paused() {
      return e.paused;
    }, set paused(n) {
      e.paused = n;
    }, cancel: i(() => e.destroy(), "cancel") };
  }, (t18, e) => Qe("fixedUpdate", t18, e));
  var vs = me((t18) => {
    let e = l.game.root.add([{ update: t18 }]);
    return { get paused() {
      return e.paused;
    }, set paused(n) {
      e.paused = n;
    }, cancel: i(() => e.destroy(), "cancel") };
  }, (t18, e) => Qe("update", t18, e));
  var ws = me((t18) => {
    let e = l.game.root.add([{ draw: t18 }]);
    return { get paused() {
      return e.hidden;
    }, set paused(n) {
      e.hidden = n;
    }, cancel: i(() => e.destroy(), "cancel") };
  }, (t18, e) => Qe("draw", t18, e));
  var Qr = me((t18) => l.game.events.on("add", t18), (t18, e) => Qe("add", t18, e));
  var Cs = me((t18) => l.game.events.on("destroy", t18), (t18, e) => Qe("destroy", t18, e));
  function Os(t18, e, n) {
    return Qe("collide", t18, (r, o, s) => o.is(e) && n(r, o, s));
  }
  i(Os, "onCollide");
  function Es(t18, e, n) {
    return Qe("collideUpdate", t18, (r, o, s) => o.is(e) && n(r, o, s));
  }
  i(Es, "onCollideUpdate");
  function Ts(t18, e, n) {
    return Qe("collideEnd", t18, (r, o, s) => o.is(e) && n(r, o, s));
  }
  i(Ts, "onCollideEnd");
  function or(t18, e) {
    l.game.root.get(t18, { recursive: true }).forEach(e), Qr(t18, e);
  }
  i(or, "forAllCurrentAndFuture");
  var As = me((t18) => l.app.onMousePress(t18), (t18, e) => {
    let n = [];
    return or(t18, (r) => {
      if (!r.area)
        throw new Error("onClick() requires the object to have area() component");
      n.push(r.onClick(() => e(r)));
    }), je.join(n);
  });
  function Ss(t18, e) {
    let n = [];
    return or(t18, (r) => {
      if (!r.area)
        throw new Error("onHover() requires the object to have area() component");
      n.push(r.onHover(() => e(r)));
    }), je.join(n);
  }
  i(Ss, "onHover");
  function Vs(t18, e) {
    let n = [];
    return or(t18, (r) => {
      if (!r.area)
        throw new Error("onHoverUpdate() requires the object to have area() component");
      n.push(r.onHoverUpdate(() => e(r)));
    }), je.join(n);
  }
  i(Vs, "onHoverUpdate");
  function Ps(t18, e) {
    let n = [];
    return or(t18, (r) => {
      if (!r.area)
        throw new Error("onHoverEnd() requires the object to have area() component");
      n.push(r.onHoverEnd(() => e(r)));
    }), je.join(n);
  }
  i(Ps, "onHoverEnd");
  function Gs(t18) {
    l.game.events.on("loading", t18);
  }
  i(Gs, "onLoading");
  function Rs(t18) {
    l.app.onResize(t18);
  }
  i(Rs, "onResize");
  function Ds(t18) {
    l.game.events.on("error", t18);
  }
  i(Ds, "onError");
  function kt(t18) {
    l.assets.loaded ? t18() : l.game.events.on("load", t18);
  }
  i(kt, "onLoad");
  function dn(t18 = []) {
    let e = /* @__PURE__ */ new Map(), n = [], r = {}, o = new ze(), s = [], a = null, m = false, u = { id: Jo(), hidden: false, transform: new he(), children: [], parent: null, set paused(c) {
      if (c !== m) {
        m = c;
        for (let f of s)
          f.paused = c;
      }
    }, get paused() {
      return m;
    }, get tags() {
      let c = [];
      for (let [f, d] of e.entries())
        Object.keys(d).length == 1 && c.push(f);
      return c;
    }, add(c) {
      let f = Array.isArray(c) ? dn(c) : c;
      if (f.parent)
        throw new Error("Cannot add a game obj that already has a parent.");
      return f.parent = this, f.transform = mt(f), this.children.push(f), f.trigger("add", f), l.game.events.trigger("add", f), f;
    }, readd(c) {
      let f = this.children.indexOf(c);
      return f !== -1 && (this.children.splice(f, 1), this.children.push(c)), c;
    }, remove(c) {
      let f = this.children.indexOf(c);
      if (f !== -1) {
        c.parent = null, this.children.splice(f, 1);
        let d = i((v) => {
          v.trigger("destroy"), l.game.events.trigger("destroy", v), v.children.forEach((h) => d(h));
        }, "trigger");
        d(c);
      }
    }, removeAll(c) {
      if (c)
        this.get(c).forEach((f) => this.remove(f));
      else
        for (let f of [...this.children])
          this.remove(f);
    }, fixedUpdate() {
      this.paused || (this.children.forEach((c) => c.fixedUpdate()), this.trigger("fixedUpdate"));
    }, update() {
      this.paused || (this.children.forEach((c) => c.update()), this.trigger("update"));
    }, draw() {
      if (this.hidden)
        return;
      this.canvas && (Oe(), this.canvas.bind());
      let c = l.gfx.fixed;
      this.fixed && (l.gfx.fixed = true), be(), Q(this.pos), nt(this.scale), We(this.angle);
      let f = this.children.sort((d, v) => {
        let h = d.layerIndex ?? l.game.defaultLayerIndex, O2 = v.layerIndex ?? l.game.defaultLayerIndex;
        return h - O2 || (d.z ?? 0) - (v.z ?? 0);
      });
      if (this.mask) {
        let d = { intersect: l.k.drawMasked, subtract: l.k.drawSubtracted }[this.mask];
        if (!d)
          throw new Error(`Invalid mask func: "${this.mask}"`);
        d(() => {
          f.forEach((v) => v.draw());
        }, () => {
          this.trigger("draw");
        });
      } else
        this.trigger("draw"), f.forEach((d) => d.draw());
      pe(), l.gfx.fixed = c, this.canvas && (Oe(), this.canvas.unbind());
    }, drawInspect() {
      this.hidden || (be(), Q(this.pos), nt(this.scale), We(this.angle), this.children.forEach((c) => c.drawInspect()), this.trigger("drawInspect"), pe());
    }, use(c) {
      if (!c)
        return;
      if (typeof c == "string")
        return this.use({ id: c });
      let f = [];
      c.id ? (this.unuse(c.id), r[c.id] = [], f = r[c.id], e.set(c.id, c)) : n.push(c);
      for (let v in c) {
        if (vi.has(v))
          continue;
        let h = Object.getOwnPropertyDescriptor(c, v);
        if (h)
          if (typeof h.value == "function" && (c[v] = c[v].bind(this)), h.set && Object.defineProperty(c, v, { set: h.set.bind(this) }), h.get && Object.defineProperty(c, v, { get: h.get.bind(this) }), wi.has(v)) {
            let O2 = v === "add" ? () => {
              a = i((y) => f.push(y), "onCurCompCleanup"), c[v]?.(), a = null;
            } : c[v];
            f.push(this.on(v, O2).cancel);
          } else if (this[v] === void 0)
            Object.defineProperty(this, v, { get: i(() => c[v], "get"), set: i((O2) => c[v] = O2, "set"), configurable: true, enumerable: true }), f.push(() => delete this[v]);
          else
            throw new Error(`Duplicate component property: "${v}"`);
      }
      let d = i(() => {
        if (c.require) {
          for (let v of c.require)
            if (!this.c(v))
              throw new Error(`Component "${c.id}" requires component "${v}"`);
        }
      }, "checkDeps");
      c.destroy && f.push(c.destroy.bind(this)), this.exists() ? (d(), c.add && (a = i((v) => f.push(v), "onCurCompCleanup"), c.add.call(this), a = null)) : c.require && f.push(this.on("add", d).cancel);
    }, unuse(c) {
      if (e.has(c)) {
        for (let f of e.values())
          if (f.require && f.require.includes(c))
            throw new Error(`Can't unuse. Component "${f.id}" requires component "${c}"`);
        e.delete(c);
      }
      r[c] && (r[c].forEach((f) => f()), delete r[c]);
    }, c(c) {
      return e.get(c) ?? null;
    }, get(c, f = {}) {
      let d = f.recursive ? this.children.flatMap(i(function v(h) {
        return [h, ...h.children.flatMap(v)];
      }, "recurse")) : this.children;
      if (d = d.filter((v) => c ? v.is(c) : true), f.liveUpdate) {
        let v = i((O2) => f.recursive ? this.isAncestorOf(O2) : O2.parent === this, "isChild"), h = [];
        h.push(l.k.onAdd((O2) => {
          v(O2) && O2.is(c) && d.push(O2);
        })), h.push(l.k.onDestroy((O2) => {
          if (v(O2) && O2.is(c)) {
            let y = d.findIndex((w) => w.id === O2.id);
            y !== -1 && d.splice(y, 1);
          }
        })), this.onDestroy(() => {
          for (let O2 of h)
            O2.cancel();
        });
      }
      return d;
    }, query(c) {
      let f = c.hierarchy || "children", d = c.include, v = c.exclude, h = [];
      switch (f) {
        case "children":
          h = this.children;
          break;
        case "siblings":
          h = this.parent ? this.parent.children.filter((y) => y !== this) : [];
          break;
        case "ancestors":
          let O2 = this.parent;
          for (; O2; )
            h.push(O2), O2 = O2.parent;
          break;
        case "descendants":
          h = this.children.flatMap(i(function y(w) {
            return [w, ...w.children.flatMap(y)];
          }, "recurse"));
          break;
      }
      if (d && ((c.includeOp || "and") === "and" || !Array.isArray(c.include) ? h = h.filter((y) => y.is(d)) : h = h.filter((y) => c.include.some((w) => y.is(w)))), v && ((c.includeOp || "and") === "and" || !Array.isArray(c.include) ? h = h.filter((y) => !y.is(v)) : h = h.filter((y) => !c.exclude.some((w) => y.is(w)))), c.visible === true && (h = h.filter((O2) => O2.visible)), c.distance) {
        if (!this.pos)
          throw Error("Can't do a distance query from an object without pos");
        let O2 = c.distanceOp || "near", y = c.distance * c.distance;
        O2 === "near" ? h = h.filter((w) => w.pos && this.pos.sdist(w.pos) <= y) : h = h.filter((w) => w.pos && this.pos.sdist(w.pos) > y);
      }
      return c.name && (h = h.filter((O2) => O2.name === c.name)), h;
    }, isAncestorOf(c) {
      return c.parent ? c.parent === this || this.isAncestorOf(c.parent) : false;
    }, exists() {
      return l.game.root.isAncestorOf(this);
    }, is(c) {
      if (c === "*")
        return true;
      if (Array.isArray(c)) {
        for (let f of c)
          if (!this.c(f))
            return false;
        return true;
      } else
        return this.c(c) != null;
    }, on(c, f) {
      let d = o.on(c, f.bind(this));
      return a && a(() => d.cancel()), d;
    }, trigger(c, ...f) {
      o.trigger(c, ...f), l.game.objEvents.trigger(c, this, ...f);
    }, destroy() {
      this.parent && this.parent.remove(this);
    }, inspect() {
      let c = {};
      for (let [f, d] of e)
        c[f] = d.inspect?.() ?? null;
      for (let [f, d] of n.entries()) {
        if (d.inspect) {
          c[f] = d.inspect();
          continue;
        }
        for (let [v, h] of Object.entries(d))
          typeof h != "function" && (c[v] = `${v}: ${h}`);
      }
      return c;
    }, onAdd(c) {
      return this.on("add", c);
    }, onFixedUpdate(c) {
      return this.on("fixedUpdate", c);
    }, onUpdate(c) {
      return this.on("update", c);
    }, onDraw(c) {
      return this.on("draw", c);
    }, onDestroy(c) {
      return this.on("destroy", c);
    }, clearEvents() {
      o.clear();
    } }, p = ["onKeyPress", "onKeyPressRepeat", "onKeyDown", "onKeyRelease", "onMousePress", "onMouseDown", "onMouseRelease", "onMouseMove", "onCharInput", "onMouseMove", "onTouchStart", "onTouchMove", "onTouchEnd", "onScroll", "onGamepadButtonPress", "onGamepadButtonDown", "onGamepadButtonRelease", "onGamepadStick", "onButtonPress", "onButtonDown", "onButtonRelease"];
    for (let c of p)
      u[c] = (...f) => {
        let d = l.app[c]?.(...f);
        return s.push(d), u.onDestroy(() => d.cancel()), u.on("sceneEnter", () => {
          s.splice(s.indexOf(d), 1);
          let v = l.app[c]?.(...f);
          je.replace(d, v), s.push(d);
        }), d;
      };
    for (let c of t18)
      u.use(c);
    return u;
  }
  i(dn, "make");
  var Ms = i(() => ({ events: new ze(), objEvents: new ze(), root: dn([]), gravity: null, scenes: {}, currentScene: null, layers: null, defaultLayerIndex: 0, logs: [], cam: { pos: null, scale: new C(1), angle: 0, shake: 0, transform: new he() } }), "initGame");
  function Bs(t18) {
    l.game.gravity = t18 ? (l.game.gravity || x(0, 1)).unit().scale(t18) : null;
  }
  i(Bs, "setGravity");
  function Us() {
    return l.game.gravity ? l.game.gravity.len() : 0;
  }
  i(Us, "getGravity");
  function Fs(t18) {
    l.game.gravity = t18.unit().scale(l.game.gravity ? l.game.gravity.len() : 1);
  }
  i(Fs, "setGravityDirection");
  function Vt() {
    return l.game.gravity ? l.game.gravity.unit() : x(0, 1);
  }
  i(Vt, "getGravityDirection");
  var Ls = co("SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwPj4+Pj4+TExMTExZWVlZWVlnZ2dnZ3V1dXV1dYODg4ODkZGRkZGRn5+fn5+frKysrKy6urq6urrIyMjIyNbW1tbW1uTk5OTk8vLy8vLy//////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAAAAAAAP/7kGQAAANUMEoFPeACNQV40KEYABEY41g5vAAA9RjpZxRwAImU+W8eshaFpAQgALAAYALATx/nYDYCMJ0HITQYYA7AH4c7MoGsnCMU5pnW+OQnBcDrQ9Xx7w37/D+PimYavV8elKUpT5fqx5VjV6vZ38eJR48eRKa9KUp7v396UgPHkQwMAAAAAA//8MAOp39CECAAhlIEEIIECBAgTT1oj///tEQYT0wgEIYxgDC09aIiE7u7u7uIiIz+LtoIQGE/+XAGYLjpTAIOGYYy0ZACgDgSNFxC7YYiINocwERjAEDhIy0mRoGwAE7lOTBsGhj1qrXNCU9GrgwSPr80jj0dIpT9DRUNHKJbRxiWSiifVHuD2b0EbjLkOUzSXztP3uE1JpHzV6NPq+f3P5T0/f/lNH7lWTavQ5Xz1yLVe653///qf93B7f/vMdaKJAAJAMAIwIMAHMpzDkoYwD8CR717zVb8/p54P3MikXGCEWhQOEAOAdP6v8b8oNL/EzdnROC8Zo+z+71O8VVAGIKFEglKbidkoLam0mAFiwo0ZoVExf/7kmQLgAQyZFxvPWAENcVKXeK0ABAk2WFMaSNIzBMptBYfArbkZgpWjEQpcmjxQoG2qREWQcvpzuuIm29THt3ElhDNlrXV///XTGbm7Kbx0ymcRX///x7GVvquf5vk/dPs0Wi5Td1vggDxqbNII4bAPTU3Ix5h9FJTe7zv1LHG/uPsPrvth0ejchVzVT3giirs6sQAACgQAAIAdaXbRAYra/2t0//3HwqLKIlBOJhOg4BzAOkt+MOL6H8nlNvKyi3rOnqP//zf6AATwBAKIcHKixxwjl1TjDVIrvTqdmKQOFQBUBDwZ1EhHlDEGEVyGQWBAHrcJgRSXYbkvHK/8/6rbYjs4Qj0C8mRy2hwRv/82opGT55fROgRoBTjanaiQiMRHUu1/P3V9yGFffaVv78U1/6l/kpo0cz73vuSv/9GeaqDVRA5bWdHRKQKIEAAAAoIktKeEmdQFKN5sguv/ZSC0oxCAR7CzcJgEsd8cA0M/x0tzv15E7//5L5KCqoIAAmBFIKM1UxYtMMFjLKESTE8lhaelUyCBYeA2IN4rK1iDt//+5JkEgAkZzlVq29D8DJDWo0YLLARwPFZrL0PyLsUazTAlpI+hKSx01VSOfbjXg0iW9/jVPDleLJ15QQA4Okdc5ByMDFIeuCCE5CvevwBGH8YibiX9FtaIIgUikF42wrZw6ZJ6WlHrA+Ki5++NNMeYH1lEkwwJAIJB4ugVFguXFc20Vd/FLlvq1GSiSwAFABABABA47k6BFeNvxEQZO9v3L1IE4iEVElfrXmEmlyWIyGslFA55gH/sW7////o9AAFIBIIAAIUMzYTTNkgsAmYObfwQyzplrOmYvq0BKCKNN+nUTbvD7cJzvHxrEWG5QqvP8U1vFx6CwE8NoRc2ADBeEb/HoXh60N7ST8nw9QiiGoYvf/r6GtC9+vLwXHjaSkIp3iupC5+Nii81Zhu85pNYbFvrf+UFThDOYYY26off+W6b//73GTiN9xDfl0AAwBAiMBO8qsDBPOZtuT/dTbjVVbY/KSGH6ppHwKv/6X+s8gUCN/lODzv////GQAGAMQAADlXAUCBJiY0wFQZusYQOaQzaTwDBTcx0IvVp8m7uxKp//uSZBMCBHRI1eNPLHAyxNqWGeoYUIEnWYyxD8DUFSn0l6iojcd+oEOkzV6uWqyHNzjqmv+7V5xGUfY9yEmbziTzjRscm9OqFQp1PKFrqu3PX/7YuGtDU6bt0OUTpv38rdc+37dVDQLKUchaJ853E9edNDGqWwsYz1VoiSStEJtZvw6+sNqFWqaIXJjQCGAAGWAYVwmag/x3BRJw1wYF7IzVqDcNzn85d//FzK7IgwbQwccLoB4AsF8Nj/1ESRUAAVJwAFh0YOFEhmSJEHKQRDyhszgLUpHIgFrb5cySFg5jv10ImlYuvaaGBItfXqnNPmic+XNkmb5fW49vdhq97nQMQyGIlM2v8oQSrxKSxE4F1WqrduqvuJCRof1R7Gsre9KszUVF1/t3PzH2tnp+iSUG3rDwGNcDzxCGA8atuQF0paZAAkAhAQAEAC240yJV+nJgUrqq8axAYtVpYjZyFGb13/17jwiClQDaCdytZpyHHf1R/EG/+lUAgAAAChhmJvioVGGBCFgqdpsGAkUUrbTstwTCJgLQpFIsELW7t/68Iv/7kmQUgAQ9NFO9aeAAPAU6RKwUABClY2e5hoARGpDvPydCAsY8WO10fSvUOnfT98+n/l/6/+hxslhQ1DEOaevNKGocvIYba8WJpaP/15pX0NQ1DUNn/////k6lPp/N61rBi8RJFfERV3IgrqDsJA64sjCoKxDDQ9xEcWDpMBDwVFDIAEIAAzryxsjGi4q/oWpixKjhklAF4pUrDPjFhFVupDFZ/t/t0YPAygUBhADPR/KLCKJ8h2Oxhpxz/zNRAAFl0MAZLAYEAiVbEiz36LSgZ5QoQVat69KNy8FyM5Z80ACHAzgnISEkxUSJIDyBSwi5KF4mjBl4xJdbrG9ComLrL8YATiodhQKCkj6ROdyg1y5XmZlvMVmpJzYppJDwLi/Lp9vT3TfmimOGpuezi2U/9FNav0zX9Oja2r//8+hvuihuQAAMAVmqFgAgCcuboAEAAAUcqy8ca0BHBmwbFkED0CNA1YYDPkhcQrRJxcY3BzfxxltAz9vX62Xl3plAzWmRO+FkZyH///1qAAEjQBAACUpgU5o2AIBmFBGMamrGg0b/+5JkC4ADxyLWb2ngAEEkGofsoACP7U1JLaxTkOqFaKhspGgnW3SGC56ZgUJGCRnLOmIJAkuNBgvwU4Ocf8CJK9UsafH9/Frj///365XSoME+DZMw5UNjrMbVoeIj9EL91IuQ5KHyl5V2LCpdIdESgafOHxVGkAlkHuakmix/gN8+BP/sKguLAAoAtUjtvaoeEADwr3OK11E4KBlojgeQNQBJ4MvCAd/4t/xMMzeLhQGQ1//6tQu5BaBOGCT6U4aafvXZ//4iAPAAAAbLkgIlQmMSLA2H1CVNAlWwyVvKIQIxOSK1NWxs4MBUATlKrAkIMPAjCAdS6MVFzuURWa/+/qQWEGsA6EEpiBEJb9Q21lAHoBoD0B6aAPhyt+bG3muoXIN3RLadXxUfr/ohjGFF/p97eqNI5noKAqYLNPpUTDSI9/TmA6B+YAAADgA0Y4lxTW1SQfOQuDDDI0KTTuIrF5qoJrUFhUFAsg+AT2hbkaRZYGIjBKVDIa5VgNN/9P/rCDsBJbYJRKpCA1ArAkigIeYY61AjE+jubyiZFZ3+L789//uSZBCABHVj2entNmw1JXokLycYEFTFVa0wz4DYjKs08J2Q+r4n3lgbWaaMwMLEjFW88F39brqPF83cv1mCSJeY3Q2uiQxhBJxCBeR1D2LQRsYQcZUTzdNll8+OwZBsIwSgl45ymaHX603Mz7JmZuvt71GDTN66zev/+cLn/b5imV8pAHkg61FIJchBSG+zycgAZgADD6F1iQQRXRWmWS6bDIIgyBCZEcdl/KgXGmVKFv/vl8ry/5bLypf//U5jhYDhL9X/pAA0AKBIAAKgGtGXGGWJgEoF2JNsHlKfSKLRhGBAgIuWZKIJCFpF1VBhkB+EfzEyMUJdWuMrEZoPZ5BfF3/Nu62riIdjoO4AAKD2sTrDmpZZaYysf/810TitAVvn9xtFucieiaEy54YqiIO6RqkGAm5wVO0bFB0sDTdNxYGekKktR4KAAfAwUIgI8Ci6aXgtwbhPWAC+CKExAFydNtYGXNZoQjUsXv/9vKjgmdwieb+h7kHvPoc//0FaCACAATKFC4Y9ammklidbaiJNPBhGWTNhFSgdtalK12lpl//7kmQRAFN2NFI7TBvwNKNaTRsFGBWdfV2tPNcYvBHpgPKJsc8IUcTCxY3HSvUVNTWe/Z3YWlrJ0yrNRUiT19aprA7E+mPP+ZmC3/CsheOJXhc/9VJb3UZnphUBcqZUZQth1i3XqtPYu2Sy1s8DV9ZYACAAASAAHgFkQcOqgB5utFHFh3kSi4USs0yk4iOClREmjvdG+upaiLcRA6/9QGbOfxF/8sEAQAVG0G07YFMihKR4EXJCkRdX9isueLqUMRAQdhDZmv3KeR0nPqRVrZmSIXDt+BBSR7qqbKQcB98W9qiMb55preHIStxFWPE4lAyI+BKz2iSxonpvMR5DgKxTH6vGGXAbYCaAnJUW4W07EesQqbfqdbo4qNnPxSpn1H8eahszc/y9//dn1V7D/OYpn1szQKAPXTMlO/rO//u7JriJXbld7aP33v6RXYg/COIDzTWkTspg6Ay1YaDSwKxrP/LfIikHjmO871POf/kEAseAgoPEi9/0ZziNwfxVKy9qAEGEEAAq1EcOamDEGHAA0iao8k31rz2MiLNEik6VQ37/+5JkEAgEYU5WU0M3MDjDe0o9IjiOzSVM7aCzEM2GqXD8pFB0zxMcHCQNHtZD+R+pMWZxOJ/otEZTvVN/MeU12xTVcL+f2YaiNJTVoPd6SvzEnKel5GXOzEaazgdChnP2jOAwpfyRpVlQwoJBwpN1L1DL////6TVWcoepf7CVWrpEWiym5lR5U0BSMlxQC4qByOyQIAEuJfIriWixDqRgMfVZWuvRowjR9BzP5lZlT/+YG50CsSBG////////liXDQVMxEaBkbzKAAACnDIAstY7iK7gGSF7SIDexaTtPOHABk9YcmJEACmo50pgWal22etroBpYoVqtU6OPqvlf0c4QCAfLk9P/FJs4KCQMf6ECZyA6BwqqyJ0rMYj56k1/UlTIx1V3Rt5NF71D4qlptDC8VMgQVHFDlQnDFi06qQgKQAAIK4TxxJGFGYJuZNGXRdpq7IW/DYpPIQRFJLAc+qn1E0XYdOkQVJT+z8Lvff//8vbKAWTIBBUUdM6cOhlDry7x4dAkJXIBhbO3HSMMMGBQ9K9/JNfu09PjTO64wYEcR//uSZBeABP5g11NPRVwzQ4r8PMJVj7j9UU2wUwDPjeq0Z5w675D9+uDdL2QsuIry2lZtwn/pJYyRRjANEOQxNWw8mU7Tq+vueV7JrX/Pg7VIkEuZT5dwd85MVoq5lpStNICkBAcFR88//58KO8Zjt2PIGxWl1cVfXeNGH18SReNT//hYliWtQuNluxyxONbm4U+lpkAgpyE7yAIYUjIaqHmARJ0GQTtmH60xdwFp/u253XBCxD0f/lBcguCALn//Y5nqEv//1h4BAAwgAA5gcHmpIplgeW9fAOM6RFZUywrsGAiRmKkanQnCFBjYoPDS7bjwtPTkVI8D/P8VVLcTUz65n7PW2s3tNYHgEul4tBaIz0A9RgJAyAMI4/i0fpQKjhX9S+qIa0vmc4CZit/0/3UTDGeKNpkk0nu2rUE2ag8WErhE/kgAiQCJKQEYBA5Wn6CxHoIUh6dQ46nLIuwFk4S/LaDQxXu7Yf/pf//lwJB0S/Ff/4C///EiBEiAAAIAMnpngiIABAdMpKigkXaUwhLEGvpiofmXW57h2XAZO3CMRv/7kmQUAEOHQlHraRTQMkQp6GWFZBTVU1lNPTPYyIyocYeUoNgLBWAs1jPkTv/tXBaeZ/tbD/nAGP8/xT0SNEi5zof0KIVEzVe9r5lZOol7kyaXMYS4J/ZS3djp//UaeVyR0mUMlTgfz8XqMzIEgAQQ6UNQ1DSE0/C16OvyaocF4ijAGFci0FSYqCUSaWs6t9F6/699DKvMgMoK1//kSbvxtyBN27I7mdXgNMAW75sRU1UwUHYG5axI2tFIFpkgx7nnK+1JmRKjqeAd5Ph0QAL4QAnirmiPlg0yBDlrb/d3ngtA65rb999+8vdDCfnJuJAYIl285zklpVbrKpk1PEzrOY9NZUgyz6OiOsKt5qG/g2ibxSZ+/eTI/NB8n4ev//n2nIw85GAdwuJL7kYnnAbpcf1RBKH6b2U4RWP8dmWH5snsAFYwADBgAopKdzFJq4Jlmotloh/m4QpTSvJRE3nYZHephoqBhVf+P7vQ9BPlwZCP+3//+hdy5uUwS3LDEgQx4cdIgvDEBR1YqymCsSbKzRy2aQmSv+AAcAgAkvzPfuX/+5JkFQAj6VFX00Zr5DllOhhgpn4MmSs+zSRRiO8U5tWklYgSLKfs+Xheb/+6WaAQCKTztNeJ382MUltZNnjSJoFrCqB6C4mFcwJpJD4Oc8dLDXMTh9k1/rmTopfzqv9AvHWfOuZJlEvHSVMjyjpkVucKSzxJVQBgAAIo8DGqRdYCXPckFYg+dH9A/qUyljrtpxH9RJX/Z3Vv6uFkPg4M2jf3CL09QrwOrMt69n//8UFEAAMHWdhg1CcjyVBwiArOYlDL5NPY6x8ZLFBCGi6SVTKX5nqdSEFjebnv2zHdt0dj6xvORsSFzwqRNTJSZIrrlpXcURNL9WW7krBgr5jPMaGcvJ5v0N1s19CV7+7fvQfjySX2QECWUgKgeJCIif4WRBZ/6archpDkzE7oWctK3zEHP9Smeai8oeHkM6AK7pGjtOgeFv40ugqNd+Iv///uAZAMgAAAUeSWhLPpdwk3iXpBw43hOVIp1gliUOSaeZcZeZhLAH9TtD56wUpBduzLF5v5qViTH6o+I0+8Z1asaLgKVAohlpB72DgAQBQxEd3g//uSZCiAA6k0UdMPQfA+xcnBYON8E3WDVU0w1ZjPDSmo8IniHAFDNnkXF3B94gicH5d8MFw+IHZwufxOf/8gsHw+XrD4Jn8T4RAyQiABNBQg/3giEWuZ42mVFB3kkXNjhqBg1CghEUbN3/7/KBhyqNueef/MIDBClP3YRnKLiIlEFzf//0g+4zKpRIKTpqQgUtnHGFw6RSLN421iGcYapqFxny/capK9r9v+2BSy/RU1yZxa2eGaWK07ijfcxeiO3iuHJvjbXzts+Ny+XyFnsne1h0qG4mAaN6xRGaLVxKPlrri0Bg9oXGyxcw8JRBPkUzC8v451vVd9liSX85JMrmkVNwxOCwUg298////7ks//L409/hwMRIozKiIckXtjzDaAMTBcAACAwLGargPSEgEJZN/EFjfF/VKgaMYKMbwtf/T0UCGGfjfOAZ2frCigYdwh/+sGlQBxhCAAAUHkDPqOdmmUdAVYl3IhrEfR8qZFjLYEPOyzVGvm6lNUJCk2PNazwFxaijk+ZEaiTehoJGuDh6zN/EVP8BCLD/88BoY7Xv/7kmQlgBNmMtNTL0FwOGZJ/WHiKAyhJU+soE3A3JnmAa2oaCIru/+RrEHMTphxQ0X/LzoVy4gKhYl6ZUlklW7CLRVoYmgABwCRMAAMA/poCiEEYLsBVodWcVZ18+CcAfH165U4Xgh7/X1/BAQF6GN/BwQ/+D9S9P6wII//CoANYFYCBAKlGQDKhVjjylKARw2mPAtp8JjcQHggQswVsOEKsF6AIBWvmpIFdSZvRVv/LHWEy0+txMxu+VK9gEqG5pWf6GNGU4UBVkfd+bsj/6lZE0fkOpAqAOvyUO9oo+IiEtcLKOGzhhSGa4MYINHWoQsFr8zzmow0tRILkqz5/+vFxl/oZX/+qGW//xiLjR3xcGn//0QLkTQJh1UA8MAQAEXC/YxODKTDUEhrASs1512GRp+dRFFdTWIRaOXrve1eNjTNpreqQYrC9NBlQc1f8YO2po8bnH6qffuRvU7taiNF3baokE0YpmjRCHRclWBb9NCHKHpERwHRG3pqgXklq4sBpLjGvmekg8Y7SjM1FZopIM8IhB6dtMr8aKsdovh4FW//+5JkQ4CjTDdSU0gtIDiE+YBrKgwNbSVJTCBPwN8N5ZW8NKDnhRB8AXCm//KAsBUCwKU//oJQnET+UP3/zpYRocAAABJkVzzIuoLGEaDoxfsNva12EUdxhJMGFQioSg8GxKsLm8kWEmExJuNidarkk+OTXc0i2OZEq2v+tZr/MDZRS0I7LfRpHdlsiF6m/mEjk+XlK10UqtKYUwNgMx24hUtCJLfpM3ExUeKDYjClgZAzAjQ0qlNQBTsGpk9zSRkCiKkRGp572VXsPYChGvxhAuYkDYZK//jSRgto2mTf6+PJqgAAgIAAAACYZE6aZOHhYkYlcbpeYQq1RgLO4U8TIlL1sGw+iKZi5Kzc/bKT0yXrIUMES89RCWy8oWlxqIQlKANLFpT/KjUrK+UCYbZqGnjVj29aO5dzofWAskRX5eJWPi4kf/aRVjy3Wlyg2AnMYIDSTLwZUTASIzflPWUwwlUnIFMnGiyABeaXJcN91PmQJCLzmvUJkFOHCrX/+6O///IHnT4tT9YYBoNMQ09GfKIErwdwChNz1Qy5+5S/wWeY//uSZF+C03UyT2tMO0A3RRkhY20KzQjDMszhA8DjlGOBp5y4ZCS3ica52GIGiryv7FAaSDVZSXKFTiir+GvGiuK4rjgwPVTddso+W/42a4ueJJHDYtfj6YoKknnjzRgKA0fBIRZOSsprJqnoNN73ps/Z9DVgbKNbMGmRzrYBMAZCPUANkAZQ0syAC2ubK1NF90+WoesBpnhY8qwVDkNb/5Uof6//418TgElCSgAIgyAAQBHEmiaQFPIRmfAMELffpo0IflyEuAAQnSnKvwTlVlnIgOAAGS3P3IydjXPSh/CaVRqpSNCjQqDvPM+fLcuN+WgqNix6CoHomUWTT86JjziRSZ3yjnq+dIldKPU11KUuf6wAASMAAJxE+MlyktgE9UGSxjEx6RR0v1s9bWZ+EJSrGtjqUIhklG3J8eLRn/2U/nv7f///+7/6gBQgEAMUijVMwweWWMyYM/PLXuc7DptIQmBARMRCxXjEIcTNDQgSSeHpUNXO7dRSOllJPvnY7yzaO1hmUjsKvHe99fOxrabMX7mGTi5tsNkZVZLndzxse//7kmR7ABM2O0pbKTvQN4NI+WGFPA2ZESs1pYAAvA0jVrJwAHfbr/c6//vW790dzX36QNBRlDv/6QQAU3V64yUgBEAYc/lI8e5bm+Z9+j+4aaj4tFrb//iker/4a12b/V//q//9v+7vAEAAAAMqZTGd5gL4f54o6ZebKNrR/zWVYUEVYVVv8BuAV2OUT+DUQgkJ8J1Ey4ZbFCiAwgwzMSdHV4jQR+OoPWEASaPkyYq+PsQFFJCsEEJtOiUjI/+GRhtC2DnizTMXATJig9Ey/kAJMrkHGYJ8gpLjmJOYoskpav+ShRJInyGGZVJMihDi6pIxRZJJel/8iZPkYiREnyKE0akTL5QNSqT5iiySS9Ja2SV//5ME0ak//+4KgAAABgQBAADAMDgYCAEgCteQ0fZH6+ICXA357+MPfhR/+ywRf/U///LVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JknQAFoWhGLm5gBClBmT3GiAAAAAGkHAAAIAAANIOAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
  var Is = i(() => (() => {
    let e = new (window.AudioContext || window.webkitAudioContext)(), n = e.createGain();
    n.connect(e.destination);
    let r = new rt(ii(e));
    return e.decodeAudioData(Ls.buffer.slice(0)).then((o) => {
      r.buf = o;
    }).catch((o) => {
      console.error("Failed to load burp: ", o);
    }), { ctx: e, masterNode: n, burpSnd: r };
  })(), "initAudio");
  function Ks(t18, e = {}) {
    let n = new ae(), r = new Audio(t18);
    l.audio.ctx.createMediaElementSource(r).connect(l.audio.masterNode);
    function s() {
      l.debug.paused || l.app.isHidden() && !l.globalOpt.backgroundAudio || l.audio.ctx.resume();
    }
    i(s, "resumeAudioCtx");
    function a() {
      s(), r.play();
    }
    return i(a, "play"), e.paused || a(), r.onended = () => n.trigger(), { play() {
      a();
    }, seek(m) {
      r.currentTime = m;
    }, stop() {
      r.pause(), this.seek(0);
    }, set loop(m) {
      r.loop = m;
    }, get loop() {
      return r.loop;
    }, set paused(m) {
      m ? r.pause() : a();
    }, get paused() {
      return r.paused;
    }, time() {
      return r.currentTime;
    }, duration() {
      return r.duration;
    }, set volume(m) {
      r.volume = De(m, 0, 1);
    }, get volume() {
      return r.volume;
    }, set speed(m) {
      r.playbackRate = Math.max(m, 0);
    }, get speed() {
      return r.playbackRate;
    }, set detune(m) {
    }, get detune() {
      return 0;
    }, onEnd(m) {
      return n.add(m);
    }, then(m) {
      return this.onEnd(m);
    } };
  }
  i(Ks, "playMusic");
  function js(t18, e = {}) {
    if (typeof t18 == "string" && l.assets.music[t18])
      return Ks(l.assets.music[t18], e);
    let n = l.audio.ctx, r = e.paused ?? false, o = n.createBufferSource(), s = new ae(), a = n.createGain(), m = n.createStereoPanner(), u = e.seek ?? 0, p = 0, c = 0, f = false;
    o.loop = !!e.loop, o.detune.value = e.detune ?? 0, o.playbackRate.value = e.speed ?? 1, o.connect(m), o.onended = () => {
      h() >= (o.buffer?.duration ?? Number.POSITIVE_INFINITY) && s.trigger();
    }, m.pan.value = e.pan ?? 0, m.connect(a), a.connect(l.audio.masterNode), a.gain.value = e.volume ?? 1;
    let d = i((y) => {
      o.buffer = y.buf, r || (p = n.currentTime, o.start(0, u), f = true);
    }, "start"), v = _i(t18);
    v instanceof ce && v.onLoad(d);
    let h = i(() => {
      if (!o.buffer)
        return 0;
      let y = r ? c - p : n.currentTime - p, w = o.buffer.duration;
      return o.loop ? y % w : Math.min(y, w);
    }, "getTime"), O2 = i((y) => {
      let w = n.createBufferSource();
      return w.buffer = y.buffer, w.loop = y.loop, w.playbackRate.value = y.playbackRate.value, w.detune.value = y.detune.value, w.onended = y.onended, w.connect(m), w;
    }, "cloneNode");
    return { stop() {
      this.paused = true, this.seek(0);
    }, set paused(y) {
      if (r !== y)
        if (r = y, y)
          f && (o.stop(), f = false), c = n.currentTime;
        else {
          o = O2(o);
          let w = c - p;
          o.start(0, w), f = true, p = n.currentTime - w, c = 0;
        }
    }, get paused() {
      return r;
    }, play(y = 0) {
      this.seek(y), this.paused = false;
    }, seek(y) {
      o.buffer?.duration && (y > o.buffer.duration || (r ? (o = O2(o), p = c - y) : (o.stop(), o = O2(o), p = n.currentTime - y, o.start(0, y), f = true, c = 0)));
    }, set speed(y) {
      o.playbackRate.value = y;
    }, get speed() {
      return o.playbackRate.value;
    }, set detune(y) {
      o.detune.value = y;
    }, get detune() {
      return o.detune.value;
    }, set volume(y) {
      a.gain.value = Math.max(y, 0);
    }, get volume() {
      return a.gain.value;
    }, set pan(y) {
      m.pan.value = y;
    }, get pan() {
      return m.pan.value;
    }, set loop(y) {
      o.loop = y;
    }, get loop() {
      return o.loop;
    }, duration() {
      return o.buffer?.duration ?? 0;
    }, time() {
      return h() % this.duration();
    }, onEnd(y) {
      return s.add(y);
    }, then(y) {
      return this.onEnd(y);
    } };
  }
  i(js, "play");
  function ir(t18) {
    return l.k.play(l.audio.burpSnd, t18);
  }
  i(ir, "burp");
  function ks(t18) {
    return t18 !== void 0 && (l.audio.masterNode.gain.value = t18), l.audio.masterNode.gain.value;
  }
  i(ks, "volume");
  function sr() {
    l.app.onHide(() => {
      l.globalOpt.backgroundAudio || l.audio.ctx.suspend();
    }), l.app.onShow(() => {
      !l.globalOpt.backgroundAudio && !l.debug.paused && l.audio.ctx.resume();
    }), l.app.onResize(() => {
      if (l.app.isFullscreen())
        return;
      let t18 = l.globalOpt.width && l.globalOpt.height;
      t18 && !l.globalOpt.stretch && !l.globalOpt.letterbox || (l.canvas.width = l.canvas.offsetWidth * l.pixelDensity, l.canvas.height = l.canvas.offsetHeight * l.pixelDensity, $n(), t18 || (l.gfx.frameBuffer.free(), l.gfx.frameBuffer = new ot(l.gfx.ggl, l.gfx.ggl.gl.drawingBufferWidth, l.gfx.ggl.gl.drawingBufferHeight), l.gfx.width = l.gfx.ggl.gl.drawingBufferWidth / l.pixelDensity / l.gscale, l.gfx.height = l.gfx.ggl.gl.drawingBufferHeight / l.pixelDensity / l.gscale));
    }), l.globalOpt.debug !== false && (l.app.onKeyPress(l.globalOpt.debugKey ?? "f1", () => l.debug.inspect = !l.debug.inspect), l.app.onKeyPress("f2", () => l.debug.clearLog()), l.app.onKeyPress("f8", () => l.debug.paused = !l.debug.paused), l.app.onKeyPress("f7", () => {
      l.debug.timeScale = Zt(De(l.debug.timeScale - 0.2, 0, 2), 1);
    }), l.app.onKeyPress("f9", () => {
      l.debug.timeScale = Zt(De(l.debug.timeScale + 0.2, 0, 2), 1);
    }), l.app.onKeyPress("f10", () => l.debug.stepFrame())), l.globalOpt.burp && l.app.onKeyPress("b", () => ir());
  }
  i(sr, "initEvents");
  function _s(t18, e = {}) {
    let n = l.game.root.add([St(t18), ar()]), r = (e.speed || 1) * 5, o = e.scale || 1;
    n.add([fn(l.boomSprite), _t(0), hn("center"), Jr(r, o), ...e.comps ?? []]);
    let s = n.add([fn(l.kaSprite), _t(0), hn("center"), gn(), ...e.comps ?? []]);
    return s.wait(0.4 / r, () => s.use(Jr(r, o))), s.onDestroy(() => n.destroy()), n;
  }
  i(_s, "addKaboom");
  var Ns = i(function(t18, e) {
    if (l.game.layers)
      throw Error("Layers can only be assigned once.");
    let n = t18.indexOf(e);
    if (n == -1)
      throw Error("The default layer name should be present in the layers list.");
    l.game.layers = t18, l.game.defaultLayerIndex = n;
  }, "layers");
  function tr(t18) {
    t18.destroy();
  }
  i(tr, "destroy");
  function Hs() {
    return l.game.root;
  }
  i(Hs, "getTreeRoot");
  function qs(t18, e) {
    l.game.scenes[t18] = e;
  }
  i(qs, "scene");
  function zs(t18, ...e) {
    if (!l.game.scenes[t18])
      throw new Error(`Scene not found: ${t18}`);
    l.game.events.onOnce("frameEnd", () => {
      l.game.events.trigger("sceneLeave", t18), l.app.events.clear(), l.game.events.clear(), l.game.objEvents.clear(), [...l.game.root.children].forEach((n) => {
        !n.stay || n.scenesToStay && !n.scenesToStay.includes(t18) ? l.game.root.remove(n) : n.trigger("sceneEnter", t18);
      }), l.game.root.clearEvents(), sr(), l.game.cam = { pos: null, scale: x(1), angle: 0, shake: 0, transform: new he() }, l.game.scenes[t18](...e);
    }), l.game.currentScene = t18;
  }
  i(zs, "go");
  function Ys(t18) {
    return l.game.events.on("sceneLeave", t18);
  }
  i(Ys, "onSceneLeave");
  function Ws() {
    return l.game.currentScene;
  }
  i(Ws, "getSceneName");
  function fn(t18, e = {}) {
    let n = null, r = null, o = null, s = new ae();
    if (!t18)
      throw new Error("Please pass the resource name or data to sprite()");
    let a = i((u, p, c, f) => {
      let d = x(1, 1);
      return c && f ? (d.x = c / (u.width * p.w), d.y = f / (u.height * p.h)) : c ? (d.x = c / (u.width * p.w), d.y = d.x) : f && (d.y = f / (u.height * p.h), d.x = d.y), d;
    }, "calcTexScale"), m = i((u, p) => {
      if (!p)
        return;
      let c = p.frames[0].clone();
      e.quad && (c = c.scale(e.quad));
      let f = a(p.tex, c, e.width, e.height);
      u.width = p.tex.width * c.w * f.x, u.height = p.tex.height * c.h * f.y, e.anim && u.play(e.anim), n = p, s.trigger(n);
    }, "setSpriteData");
    return { id: "sprite", width: 0, height: 0, frame: e.frame || 0, quad: e.quad || new z2(0, 0, 1, 1), animSpeed: e.animSpeed ?? 1, flipX: e.flipX ?? false, flipY: e.flipY ?? false, get sprite() {
      return t18.toString();
    }, set sprite(u) {
      let p = It(u);
      p && p.onLoad((c) => m(this, c));
    }, get animFrame() {
      if (!n || !r || o === null)
        return this.frame;
      let u = n.anims[r.name];
      return typeof u == "number" ? u : this.frame - Math.min(u.from, u.to);
    }, draw() {
      if (!n)
        return;
      let u = n.frames[this.frame ?? 0];
      if (!u)
        throw new Error(`Frame not found: ${this.frame ?? 0}`);
      if (n.slice9) {
        let { left: p, right: c, top: f, bottom: d } = n.slice9, v = n.tex.width * u.w, h = n.tex.height * u.h, O2 = this.width - p - c, y = this.height - f - d, w = p / v, V2 = c / v, R = 1 - w - V2, P = f / h, M = d / h, b = 1 - P - M, E = [le(0, 0, w, P), le(w, 0, R, P), le(w + R, 0, V2, P), le(0, P, w, b), le(w, P, R, b), le(w + R, P, V2, b), le(0, P + b, w, M), le(w, P + b, R, M), le(w + R, P + b, V2, M), le(0, 0, p, f), le(p, 0, O2, f), le(p + O2, 0, c, f), le(0, f, p, y), le(p, f, O2, y), le(p + O2, f, c, y), le(0, f + y, p, d), le(p, f + y, O2, d), le(p + O2, f + y, c, d)];
        for (let A = 0; A < 9; A++) {
          let G = E[A], D = E[A + 9];
          At(Object.assign(Le(this), { pos: D.pos(), tex: n.tex, quad: u.scale(G), flipX: this.flipX, flipY: this.flipY, tiled: e.tiled, width: D.w, height: D.h }));
        }
      } else
        At(Object.assign(Le(this), { tex: n.tex, quad: u.scale(this.quad ?? new z2(0, 0, 1, 1)), flipX: this.flipX, flipY: this.flipY, tiled: e.tiled, width: this.width, height: this.height }));
    }, add() {
      let u = It(t18);
      u ? u.onLoad((p) => m(this, p)) : kt(() => m(this, It(t18).data));
    }, update() {
      if (!n || !r || o === null)
        return;
      let u = n.anims[r.name];
      if (typeof u == "number") {
        this.frame = u;
        return;
      }
      if (u.speed === 0)
        throw new Error("Sprite anim speed cannot be 0");
      r.timer += te() * this.animSpeed, r.timer >= 1 / r.speed && (r.timer = 0, this.frame += o, (this.frame < Math.min(u.from, u.to) || this.frame > Math.max(u.from, u.to)) && (r.loop ? r.pingpong ? (this.frame -= o, o *= -1, this.frame += o) : this.frame = u.from : r.pingpong ? o === Math.sign(u.to - u.from) ? (this.frame = u.to, o *= -1, this.frame += o) : (this.frame = u.from, r.onEnd(), this.stop()) : (this.frame = u.to, r.onEnd(), this.stop())));
    }, play(u, p = {}) {
      if (!n) {
        s.add(() => this.play(u, p));
        return;
      }
      let c = n.anims[u];
      if (c === void 0)
        throw new Error(`Anim not found: ${u}`);
      r && this.stop(), r = typeof c == "number" ? { name: u, timer: 0, loop: false, pingpong: false, speed: 0, onEnd: i(() => {
      }, "onEnd") } : { name: u, timer: 0, loop: p.loop ?? c.loop ?? false, pingpong: p.pingpong ?? c.pingpong ?? false, speed: p.speed ?? c.speed ?? 10, onEnd: p.onEnd ?? (() => {
      }) }, o = typeof c == "number" ? null : c.from < c.to ? 1 : -1, this.frame = typeof c == "number" ? c : c.from, this.trigger("animStart", u);
    }, stop() {
      if (!r)
        return;
      let u = r.name;
      r = null, this.trigger("animEnd", u);
    }, numFrames() {
      return n?.frames.length ?? 0;
    }, getCurAnim() {
      return r;
    }, curAnim() {
      return r?.name;
    }, getAnim(u) {
      return n?.anims[u] ?? null;
    }, hasAnim(u) {
      return !!this.getAnim(u);
    }, onAnimEnd(u) {
      return this.on("animEnd", u);
    }, onAnimStart(u) {
      return this.on("animStart", u);
    }, renderArea() {
      return new W(x(0), this.width, this.height);
    }, inspect() {
      return typeof t18 == "string" ? `sprite: "${t18}"` : null;
    } };
  }
  i(fn, "sprite");
  function $s(t18, e = {}) {
    function n(o) {
      let s = Ne(Object.assign(Le(o), { text: o.text + "", size: o.textSize, font: o.font, width: e.width && o.width, align: o.align, letterSpacing: o.letterSpacing, lineSpacing: o.lineSpacing, transform: o.textTransform, styles: o.textStyles }));
      return e.width || (o.width = s.width / (o.scale?.x || 1)), o.height = s.height / (o.scale?.y || 1), s;
    }
    i(n, "update");
    let r = { id: "text", set text(o) {
      t18 = o, n(this), this.renderedText = zn(t18).text;
    }, get text() {
      return t18;
    }, textSize: e.size ?? 36, font: e.font, width: e.width ?? 0, height: 0, align: e.align, lineSpacing: e.lineSpacing, letterSpacing: e.letterSpacing, textTransform: e.transform, textStyles: e.styles, renderedText: t18 ? zn(t18).text : "", add() {
      kt(() => n(this));
    }, draw() {
      He(n(this));
    }, renderArea() {
      return new W(x(0), this.width, this.height);
    } };
    return n(r), r;
  }
  i($s, "text");
  function Xs(t18, e) {
    return { id: "rect", width: t18, height: e, draw() {
      it(Object.assign(Le(this), { width: this.width, height: this.height }));
    }, renderArea() {
      return new W(x(0), this.width, this.height);
    }, inspect() {
      return `uvquad: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)})h`;
    } };
  }
  i(Xs, "uvquad");
  function Qs(t18 = {}) {
    let e = null, n = null, r = null, o = null;
    return { id: "agent", require: ["pos", "tile"], agentSpeed: t18.speed ?? 100, allowDiagonals: t18.allowDiagonals ?? true, getDistanceToTarget() {
      return e ? this.pos.dist(e) : 0;
    }, getNextLocation() {
      return n && r ? n[r] : null;
    }, getPath() {
      return n ? n.slice() : null;
    }, getTarget() {
      return e;
    }, isNavigationFinished() {
      return n ? r === null : true;
    }, isTargetReachable() {
      return n !== null;
    }, isTargetReached() {
      return e ? this.pos.eq(e) : true;
    }, setTarget(s) {
      e = s, n = this.getLevel().getPath(this.pos, e, { allowDiagonals: this.allowDiagonals }), r = n ? 0 : null, n && r !== null ? (o || (o = this.getLevel().onNavigationMapChanged(() => {
        e && n && r !== null && (n = this.getLevel().getPath(this.pos, e, { allowDiagonals: this.allowDiagonals }), n ? (r = 0, this.trigger("navigationNext", this, n[r])) : (r = null, this.trigger("navigationEnded", this)));
      }), this.onDestroy(() => o?.cancel())), this.trigger("navigationStarted", this), this.trigger("navigationNext", this, n[r])) : this.trigger("navigationEnded", this);
    }, update() {
      if (e && n && r !== null) {
        if (this.pos.sdist(n[r]) < 2)
          if (r === n.length - 1) {
            this.pos = e.clone(), r = null, this.trigger("navigationEnded", this), this.trigger("targetReached", this);
            return;
          } else
            r++, this.trigger("navigationNext", this, n[r]);
        this.moveTo(n[r], this.agentSpeed);
      }
    }, onNavigationStarted(s) {
      return this.on("navigationStarted", s);
    }, onNavigationNext(s) {
      return this.on("navigationNext", s);
    }, onNavigationEnded(s) {
      return this.on("navigationEnded", s);
    }, onTargetReached(s) {
      return this.on("targetReached", s);
    }, inspect() {
      return "agent: " + JSON.stringify({ target: JSON.stringify(e), path: JSON.stringify(n) });
    } };
  }
  i(Qs, "agent");
  function Js(t18) {
    let e = t18.graph;
    return { id: "pathfinder", require: ["pos"], navigateTo(n) {
      return this.graph?.getWaypointPath(this.pos, n, t18.navigationOpt);
    }, get graph() {
      if (e)
        return e;
      let n = this.parent;
      for (; n; ) {
        if (n.is("pathfinderMap"))
          return n.graph;
        n = n.parent;
      }
    }, set graph(n) {
      e = n;
    } };
  }
  i(Js, "pathfinder");
  function Zs(t18 = {}) {
    let e = t18.waypoints, n = t18.speed || 100, r = t18.endBehavior || "stop", o = 0, s = e != null;
    return { id: "patrol", require: ["pos"], get patrolSpeed() {
      return n;
    }, set patrolSpeed(a) {
      n = a;
    }, get waypoints() {
      return e;
    }, set waypoints(a) {
      e = a, o = 0, s = false;
    }, get nextLocation() {
      return e ? e[o] : void 0;
    }, update() {
      let a = this.nextLocation;
      if (!(!e || !a || s) && (this.moveTo(a, n), this.pos.sdist(a) < 9))
        switch (r) {
          case "loop":
            o = (o + 1) % e.length;
            break;
          case "ping-pong":
            o = o + 1, o == e.length && (e.reverse(), o = 0);
            break;
          case "stop":
            o = Math.min(o + 1, e.length - 1), o == e.length - 1 && (s = true, this.trigger("patrolFinished"));
            break;
        }
    }, onPatrolFinished(a) {
      return this.on("patrolFinished", a);
    } };
  }
  i(Zs, "patrol");
  function ea(t18, e = {}) {
    let n = typeof t18 == "function" ? t18 : () => l.game.root.query(t18), r = e.checkFrequency || 1, o = typeof e.direction == "number" ? C.fromAngle(e.direction) : e.direction, s = 0;
    return { id: "sentry", require: ["pos"], direction: typeof e.direction == "number" ? C.fromAngle(e.direction) : e.direction, spotted: [], set directionAngle(a) {
      this.direction = a !== void 0 ? C.fromAngle(a) : void 0;
    }, get directionAngle() {
      return this.direction ? this.direction.angle() : void 0;
    }, fieldOfView: e.fieldOfView || 200, isWithinFieldOfView(a, m, u) {
      let p = (typeof m == "number" ? C.fromAngle(m) : m) || o, c = u || e.fieldOfView;
      if (!p || !c || c >= 360)
        return true;
      let f = c / 2;
      return a.pos && p.angleBetween(a.pos.sub(this.pos)) <= f;
    }, hasLineOfSight(a) {
      let m = Jn(this.pos, a.pos.sub(this.pos), e.raycastExclude);
      return m != null && m.object === a;
    }, update() {
      if (s += te(), s > r) {
        s -= r;
        let a = n();
        if (a.length && o && this.fieldOfView && this.fieldOfView < 360) {
          let m = this.fieldOfView / 2;
          a = a.filter((u) => u.pos && o.angleBetween(u.pos.sub(this.pos)) <= m);
        }
        a.length && e.lineOfSight && (a = a.filter((m) => m.pos && this.hasLineOfSight(m))), a.length > 0 && (this.spotted = a, this.trigger("objectSpotted", a));
      }
    }, onObjectsSpotted(a) {
      return this.on("objectSpotted", a);
    } };
  }
  i(ea, "sentry");
  function rr(t18 = {}) {
    let e = x(0), n = t18.isObstacle ?? false, r = t18.cost ?? 0, o = t18.edges ?? [], s = i(() => {
      let m = { left: 1, top: 2, right: 4, bottom: 8 };
      return o.map((u) => m[u] || 0).reduce((u, p) => u | p, 0);
    }, "getEdgeMask"), a = s();
    return { id: "tile", tilePosOffset: t18.offset ?? x(0), set tilePos(m) {
      let u = this.getLevel();
      e = m.clone(), this.pos = x(this.tilePos.x * u.tileWidth(), this.tilePos.y * u.tileHeight()).add(this.tilePosOffset);
    }, get tilePos() {
      return e;
    }, set isObstacle(m) {
      n !== m && (n = m, this.getLevel().invalidateNavigationMap());
    }, get isObstacle() {
      return n;
    }, set cost(m) {
      r !== m && (r = m, this.getLevel().invalidateNavigationMap());
    }, get cost() {
      return r;
    }, set edges(m) {
      o = m, a = s(), this.getLevel().invalidateNavigationMap();
    }, get edges() {
      return o;
    }, get edgeMask() {
      return a;
    }, getLevel() {
      return this.parent;
    }, moveLeft() {
      this.tilePos = this.tilePos.add(x(-1, 0));
    }, moveRight() {
      this.tilePos = this.tilePos.add(x(1, 0));
    }, moveUp() {
      this.tilePos = this.tilePos.add(x(0, -1));
    }, moveDown() {
      this.tilePos = this.tilePos.add(x(0, 1));
    } };
  }
  i(rr, "tile");
  var bn = class {
    static {
      i(this, "AnimateChannel");
    }
    name;
    duration;
    loops;
    direction;
    easing;
    interpolation;
    isFinished;
    timing;
    easings;
    relative;
    constructor(e, n, r) {
      this.name = e, this.duration = n.duration, this.loops = n.loops || 0, this.direction = n.direction || "forward", this.easing = n.easing || tt.linear, this.interpolation = n.interpolation || "linear", this.isFinished = false, this.timing = n.timing, this.easings = n.easings, this.relative = r;
    }
    update(e, n) {
      return true;
    }
    getLowerKeyIndexAndRelativeTime(e, n, r) {
      let o = n - 1, s = e / this.duration;
      if (this.loops !== 0 && s >= this.loops)
        return [o, 0];
      let a = Math.trunc(s);
      if (s -= a, (this.direction == "reverse" || this.direction == "ping-pong" && a & 1) && (s = 1 - s), r) {
        let m = 0;
        for (; r[m + 1] !== void 0 && r[m + 1] < s; )
          m++;
        return m >= o ? [o, 0] : [m, (s - r[m]) / (r[m + 1] - r[m])];
      } else {
        let m = Math.floor((n - 1) * s);
        return [m, (s - m / o) * o];
      }
    }
    setValue(e, n, r) {
      if (this.relative)
        switch (n) {
          case "pos":
            e.pos = e.base.pos.add(r);
            break;
          case "angle":
            e.angle = e.base.angle + r;
            break;
          case "scale":
            e.scale = e.base.scale.scale(r);
            break;
          case "opacity":
            e.opacity = e.base.opacity * r;
            break;
          default:
            e[n] = r;
        }
      else
        e[n] = r;
    }
    serialize() {
      let e = { duration: this.duration, keys: [] };
      return this.loops && (e.loops = this.loops), this.direction !== "forward" && (e.direction = this.direction), this.easing != tt.linear && (e.easing = this.easing.name), this.interpolation !== "linear" && (e.interpolation = this.interpolation), this.timing && (e.timing = this.timing), this.easings && (e.easings = this.easings.map((n) => this.easing.name)), e;
    }
  };
  function ta(t18, e) {
    return e.add(e.sub(t18));
  }
  i(ta, "reflect");
  var Zr = class extends bn {
    static {
      i(this, "AnimateChannelNumber");
    }
    keys;
    constructor(e, n, r, o) {
      super(e, r, o), this.keys = n;
    }
    update(e, n) {
      let [r, o] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation === "none")
        this.setValue(e, this.name, this.keys[r]);
      else {
        let s = this.easings ? this.easings[r] : this.easing;
        this.setValue(e, this.name, fe(this.keys[r], this.keys[r + 1], s(o)));
      }
      return o == 1;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  };
  var eo = class extends bn {
    static {
      i(this, "AnimateChannelVec2");
    }
    keys;
    curves;
    dcurves;
    constructor(e, n, r, o, s) {
      if (super(e, r, o), this.keys = n, this.interpolation === "spline") {
        this.curves = [], s && (this.dcurves = []);
        for (let a = 0; a < this.keys.length - 1; a++) {
          let m = this.keys[a], u = a + 1, p = this.keys[u], c = a > 0 ? this.keys[a - 1] : ta(p, m), f = u < this.keys.length - 1 ? this.keys[u + 1] : ta(m, p);
          this.curves.push(Ft(c, m, p, f)), s && this.dcurves?.push(Ft(c, m, p, f, Fo));
        }
      }
    }
    update(e, n) {
      let [r, o] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation === "none")
        this.setValue(e, this.name, this.keys[r]);
      else {
        let s = this.easings ? this.easings[r] : this.easing;
        switch (this.interpolation) {
          case "linear":
            this.setValue(e, this.name, this.keys[r].lerp(this.keys[r + 1], s(o)));
            break;
          case "slerp":
            this.setValue(e, this.name, this.keys[r].slerp(this.keys[r + 1], s(o)));
            break;
          case "spline":
            if (this.curves) {
              this.setValue(e, this.name, this.curves[r](s(o))), this.dcurves && this.setValue(e, "angle", this.dcurves[r](s(o)).angle());
              break;
            }
        }
      }
      return o == 1;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys.map((e) => [e.x, e.y]) });
    }
  };
  var to = class extends bn {
    static {
      i(this, "AnimateChannelColor");
    }
    keys;
    constructor(e, n, r, o) {
      super(e, r, o), this.keys = n;
    }
    update(e, n) {
      let [r, o] = this.getLowerKeyIndexAndRelativeTime(n, this.keys.length, this.timing);
      if (o == 0 || this.interpolation == "none")
        this.setValue(e, this.name, this.keys[r]);
      else {
        let s = this.easings ? this.easings[r] : this.easing;
        this.setValue(e, this.name, this.keys[r].lerp(this.keys[r + 1], s(o)));
      }
      return o == 1;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  };
  function na(t18 = {}) {
    let e = [], n = 0, r = false;
    return { id: "animate", require: t18.followMotion ? ["rotate"] : void 0, base: { pos: x(0, 0), angle: 0, scale: x(1, 1), opacity: 1 }, add() {
      t18.relative && (this.is("pos") && (this.base.pos = this.pos.clone()), this.is("rotate") && (this.base.angle = this.angle), this.is("scale") && (this.base.scale = this.scale), this.is("opacity") && (this.base.opacity = this.opacity));
    }, update() {
      let o = true, s;
      n += te();
      for (let a of e)
        s = a.update(this, n), s && !a.isFinished && (a.isFinished = true, this.trigger("animateChannelFinished", a.name)), o &&= s;
      o && !r && (r = true, this.trigger("animateFinished"));
    }, animate(o, s, a) {
      r = false, this.unanimate(o), typeof s[0] == "number" ? e.push(new Zr(o, s, a, t18.relative || false)) : s[0] instanceof C ? e.push(new eo(o, s, a, t18.relative || false, o === "pos" && (t18.followMotion || false))) : s[0] instanceof I && e.push(new to(o, s, a, t18.relative || false));
    }, unanimate(o) {
      let s = e.findIndex((a) => a.name === o);
      s >= 0 && e.splice(s, 1);
    }, unanimateAll() {
      e.splice(0, e.length);
    }, onAnimateFinished(o) {
      return this.on("animateFinished", o);
    }, onAnimateChannelFinished(o) {
      return this.on("animateChannelFinished", o);
    }, serializeAnimationChannels() {
      return e.reduce((o, s) => (o[s.name] = s.serialize(), o), {});
    }, serializeAnimationOptions() {
      let o = {};
      return t18.followMotion && (o.followMotion = true), t18.relative && (o.relative = true), o;
    } };
  }
  i(na, "animate");
  function no(t18, e) {
    let n = { name: t18.name };
    return t18.is("animate") && (n.channels = t18.serializeAnimationChannels(), Object.assign(n, t18.serializeAnimationOptions())), t18.children.length > 0 && (n.children = t18.children.filter((r) => r.is("named")).map((r) => no(r, r.name))), n;
  }
  i(no, "serializeAnimation");
  function Jr(t18 = 2, e = 1) {
    let n = 0;
    return { require: ["scale"], update() {
      let r = Math.sin(n * t18) * e;
      r < 0 && this.destroy(), this.scale = x(r), n += te();
    } };
  }
  i(Jr, "boom");
  function ra(t18, e) {
    if (t18 == null)
      throw new Error("health() requires the initial amount of hp");
    return { id: "health", hurt(n = 1) {
      this.setHP(t18 - n), this.trigger("hurt", n);
    }, heal(n = 1) {
      let r = t18;
      this.setHP(t18 + n), this.trigger("heal", t18 - r);
    }, hp() {
      return t18;
    }, maxHP() {
      return e ?? null;
    }, setMaxHP(n) {
      e = n;
    }, setHP(n) {
      t18 = e ? Math.min(e, n) : n, t18 <= 0 && this.trigger("death");
    }, onHurt(n) {
      return this.on("hurt", n);
    }, onHeal(n) {
      return this.on("heal", n);
    }, onDeath(n) {
      return this.on("death", n);
    }, inspect() {
      return `health: ${t18}`;
    } };
  }
  i(ra, "health");
  function oa(t18, e = {}) {
    if (t18 == null)
      throw new Error("lifespan() requires time");
    let n = e.fade ?? 0;
    return { id: "lifespan", require: ["opacity"], async add() {
      await l.game.root.wait(t18), this.opacity = this.opacity ?? 1, n > 0 && await l.game.root.tween(this.opacity, 0, n, (r) => this.opacity = r, tt.linear), this.destroy();
    } };
  }
  i(oa, "lifespan");
  function ia(t18) {
    return { id: "named", name: t18 };
  }
  i(ia, "named");
  function sa(t18, e, n) {
    if (!t18)
      throw new Error("state() requires an initial state");
    let r = {};
    function o(u) {
      r[u] || (r[u] = { enter: new ae(), end: new ae(), update: new ae(), draw: new ae() });
    }
    i(o, "initStateEvents");
    function s(u, p, c) {
      return o(p), r[p][u].add(c);
    }
    i(s, "on");
    function a(u, p, ...c) {
      o(p), r[p][u].trigger(...c);
    }
    i(a, "trigger");
    let m = false;
    return { id: "state", state: t18, enterState(u, ...p) {
      if (m = true, e && !e.includes(u))
        throw new Error(`State not found: ${u}`);
      let c = this.state;
      if (n) {
        if (!n?.[c])
          return;
        let f = typeof n[c] == "string" ? [n[c]] : n[c];
        if (!f.includes(u))
          throw new Error(`Cannot transition state from "${c}" to "${u}". Available transitions: ${f.map((d) => `"${d}"`).join(", ")}`);
      }
      a("end", c, ...p), this.state = u, a("enter", u, ...p), a("enter", `${c} -> ${u}`, ...p);
    }, onStateTransition(u, p, c) {
      return s("enter", `${u} -> ${p}`, c);
    }, onStateEnter(u, p) {
      return s("enter", u, p);
    }, onStateUpdate(u, p) {
      return s("update", u, p);
    }, onStateDraw(u, p) {
      return s("draw", u, p);
    }, onStateEnd(u, p) {
      return s("end", u, p);
    }, update() {
      m || (a("enter", t18), m = true), a("update", this.state);
    }, draw() {
      a("draw", this.state);
    }, inspect() {
      return `state: ${this.state}`;
    } };
  }
  i(sa, "state");
  function ar(t18) {
    return { id: "stay", stay: true, scenesToStay: t18 };
  }
  i(ar, "stay");
  function aa(t18 = true, e) {
    let n, r;
    return { id: "textInput", hasFocus: t18, require: ["text"], add() {
      n = l.k.onCharInput((o) => {
        this.hasFocus && (!e || this.text.length < e) && (l.k.isKeyDown("shift") ? this.text += o.toUpperCase() : this.text += o);
      }), r = l.k.onKeyPressRepeat("backspace", () => {
        this.hasFocus && (this.text = this.text.slice(0, -1));
      });
    }, destroy() {
      n.cancel(), r.cancel();
    } };
  }
  i(aa, "textInput");
  function gn() {
    return { id: "timer", wait(t18, e) {
      let n = [];
      e && n.push(e);
      let r = 0, o = this.onUpdate(() => {
        r += l.app.state.dt, r >= t18 && (n.forEach((s) => s()), o.cancel());
      });
      return { get paused() {
        return o.paused;
      }, set paused(s) {
        o.paused = s;
      }, cancel: o.cancel, onEnd(s) {
        n.push(s);
      }, then(s) {
        return this.onEnd(s), this;
      } };
    }, loop(t18, e) {
      let n = null, r = i(() => {
        n = this.wait(t18, r), e();
      }, "newAction");
      return n = this.wait(0, r), { get paused() {
        return n?.paused ?? false;
      }, set paused(o) {
        n && (n.paused = o);
      }, cancel: i(() => n?.cancel(), "cancel") };
    }, tween(t18, e, n, r, o = tt.linear) {
      let s = 0, a = [], m = this.onUpdate(() => {
        s += l.app.state.dt;
        let u = Math.min(s / n, 1);
        r(fe(t18, e, o(u))), u === 1 && (m.cancel(), r(e), a.forEach((p) => p()));
      });
      return { get paused() {
        return m.paused;
      }, set paused(u) {
        m.paused = u;
      }, onEnd(u) {
        a.push(u);
      }, then(u) {
        return this.onEnd(u), this;
      }, cancel() {
        m.cancel();
      }, finish() {
        m.cancel(), r(e), a.forEach((u) => u());
      } };
    } };
  }
  i(gn, "timer");
  var ro = 0;
  function ua() {
    return ro > 0;
  }
  i(ua, "usesArea");
  function ca(t18 = {}) {
    let e = {}, n = /* @__PURE__ */ new Set();
    return { id: "area", collisionIgnore: t18.collisionIgnore ?? [], add() {
      ro++, this.area.cursor && this.onHover(() => l.app.setCursor(this.area.cursor)), this.onCollideUpdate((r, o) => {
        if (!r.id)
          throw new Error("area() requires the object to have an id");
        e[r.id] || this.trigger("collide", r, o), o && (e[r.id] = o, n.add(r.id));
      });
    }, destroy() {
      ro--;
    }, fixedUpdate() {
      for (let r in e)
        n.has(Number(r)) || (this.trigger("collideEnd", e[r].target), delete e[r]);
      n.clear();
    }, drawInspect() {
      let r = this.localArea();
      be(), Q(this.area.offset);
      let o = { outline: { width: 4 / In(), color: k(0, 0, 255) }, anchor: this.anchor, fill: false, fixed: st(this) };
      r instanceof W ? ve({ ...o, pos: r.pos, width: r.width * this.area.scale.x, height: r.height * this.area.scale.y }) : r instanceof ye ? Pe({ ...o, pts: r.pts, scale: this.area.scale }) : r instanceof Ce && _e({ ...o, pos: r.center, radius: r.radius }), pe();
    }, area: { shape: t18.shape ?? null, scale: t18.scale ? x(t18.scale) : x(1), offset: t18.offset ?? x(0), cursor: t18.cursor ?? null }, isClicked() {
      return l.app.isMousePressed() && this.isHovering();
    }, isHovering() {
      let r = st(this) ? l.k.mousePos() : l.k.toWorld(l.k.mousePos());
      return this.hasPoint(r);
    }, checkCollision(r) {
      if (!r.id)
        throw new Error("checkCollision() requires the object to have an id");
      return e[r.id] ?? null;
    }, getCollisions() {
      return Object.values(e);
    }, isColliding(r) {
      if (!r.id)
        throw new Error("isColliding() requires the object to have an id");
      return !!e[r.id];
    }, isOverlapping(r) {
      if (!r.id)
        throw new Error("isOverlapping() requires the object to have an id");
      let o = e[r.id];
      return o && o.hasOverlap();
    }, onClick(r, o = "left") {
      let s = l.app.onMousePress(o, () => {
        this.isHovering() && r();
      });
      return this.onDestroy(() => s.cancel()), s;
    }, onHover(r) {
      let o = false;
      return this.onUpdate(() => {
        o ? o = this.isHovering() : this.isHovering() && (o = true, r());
      });
    }, onHoverUpdate(r) {
      return this.onUpdate(() => {
        this.isHovering() && r();
      });
    }, onHoverEnd(r) {
      let o = false;
      return this.onUpdate(() => {
        o ? this.isHovering() || (o = false, r()) : o = this.isHovering();
      });
    }, onCollide(r, o) {
      if (typeof r == "function" && o === void 0)
        return this.on("collide", r);
      if (typeof r == "string")
        return this.onCollide((s, a) => {
          s.is(r) && o?.(s, a);
        });
      throw new Error("onCollide() requires either a function or a tag");
    }, onCollideUpdate(r, o) {
      if (typeof r == "function" && o === void 0)
        return this.on("collideUpdate", r);
      if (typeof r == "string")
        return this.on("collideUpdate", (s, a) => s.is(r) && o?.(s, a));
      throw new Error("onCollideUpdate() requires either a function or a tag");
    }, onCollideEnd(r, o) {
      if (typeof r == "function" && o === void 0)
        return this.on("collideEnd", r);
      if (typeof r == "string")
        return this.on("collideEnd", (s) => s.is(r) && o?.(s));
      throw new Error("onCollideEnd() requires either a function or a tag");
    }, hasPoint(r) {
      return et(this.worldArea(), r);
    }, resolveCollision(r) {
      let o = this.checkCollision(r);
      o && !o.resolved && (this.pos = this.pos.add(o.displacement), o.resolved = true);
    }, localArea() {
      return this.area.shape ? this.area.shape : this.renderArea();
    }, worldArea() {
      let r = this.localArea();
      if (!(r instanceof ye || r instanceof W))
        throw new Error("Only support polygon and rect shapes for now");
      let o = this.transform.clone().translate(this.area.offset).scale(x(this.area.scale ?? 1));
      if (r instanceof W) {
        let s = ke(this.anchor || pt).add(1, 1).scale(-0.5).scale(r.width, r.height);
        o.translate(s);
      }
      return r.transform(o);
    }, screenArea() {
      let r = this.worldArea();
      return st(this) ? r : r.transform(l.game.cam.transform);
    }, inspect() {
      return this.area.scale?.x == this.area.scale?.y ? `area: ${this.area.scale?.x?.toFixed(1)}x` : `area: (${this.area.scale?.x?.toFixed(1)}x, ${this.area.scale.y?.toFixed(1)}y)`;
    } };
  }
  i(ca, "area");
  function la(t18 = {}) {
    let e = null, n = null, r = false, o = x(0), s = null, a = null, m;
    return { id: "body", require: ["pos"], vel: x(0), drag: t18.drag ?? 0, jumpForce: t18.jumpForce ?? Oi, gravityScale: t18.gravityScale ?? 1, isStatic: t18.isStatic ?? false, mass: t18.mass ?? 1, add() {
      if (s = this.pos.clone(), a = this.pos.clone(), m = this.pos.clone(), this.mass === 0)
        throw new Error("Can't set body mass to 0");
      this.is("area") && (this.onCollideUpdate((u, p) => {
        if (!p || !u.is("body") || p.resolved)
          return;
        this.trigger("beforePhysicsResolve", p);
        let c = p.reverse();
        if (u.trigger("beforePhysicsResolve", c), !(p.resolved || c.resolved) && !(this.isStatic && u.isStatic)) {
          if (!this.isStatic && !u.isStatic) {
            let f = this.mass + u.mass;
            this.pos = this.pos.add(p.displacement.scale(u.mass / f)), u.pos = u.pos.add(p.displacement.scale(-this.mass / f)), this.transform = mt(this), u.transform = mt(u);
          } else {
            let f = !this.isStatic && u.isStatic ? p : p.reverse();
            f.source.pos = f.source.pos.add(f.displacement), f.source.transform = mt(f.source);
          }
          p.resolved = true, this.trigger("physicsResolve", p), u.trigger("physicsResolve", p.reverse());
        }
      }), this.onPhysicsResolve((u) => {
        if (l.game.gravity)
          if (u.isBottom() && this.isFalling()) {
            this.vel = this.vel.reject(l.game.gravity.unit());
            let p = e;
            e = u.target, p != e && (n = u.target.pos), r ? r = false : p || (this.trigger("ground", e), u.target.trigger("land", this));
          } else
            u.isTop() && this.isJumping() && (this.vel = this.vel.reject(l.game.gravity.unit()), this.trigger("headbutt", u.target), u.target.trigger("headbutted", this));
      }));
    }, update() {
      e && this.isColliding(e) && e.exists() && e.is("body") && (n && !e.pos.eq(n) && t18.stickToPlatform !== false && this.moveBy(e.pos.sub(n)), n = e.pos);
      let u = nn();
      u && (this.pos.x == m.x && (this.pos.x = fe(s.x, a.x, u / tn()), m.x = this.pos.x), this.pos.y == m.y && (this.pos.y = fe(s.y, a.y, u / tn()), m.y = this.pos.y));
    }, fixedUpdate() {
      if (s && (this.pos.x == m.x && (this.pos.x = s.x), this.pos.y == m.y && (this.pos.y = s.y), s = null), l.game.gravity && !this.isStatic) {
        r && (e = null, n = null, this.trigger("fallOff"), r = false), e && (!this.isColliding(e) || !e.exists() || !e.is("body")) && (r = true);
        let p = this.vel.clone();
        this.vel = this.vel.add(l.game.gravity.scale(this.gravityScale * te()));
        let c = t18.maxVelocity ?? Ei;
        this.vel.slen() > c * c && (this.vel = this.vel.unit().scale(c)), p.dot(l.game.gravity) < 0 && this.vel.dot(l.game.gravity) >= 0 && this.trigger("fall");
      }
      if (this.vel.x += o.x * te(), this.vel.y += o.y * te(), this.vel.x *= 1 - this.drag * te(), this.vel.y *= 1 - this.drag * te(), this.move(this.vel), nn()) {
        s = this.pos.clone();
        let p = this.vel.add(o.scale(te()));
        a = this.pos.add(p.scale(te())), m = this.pos.clone();
      }
      o.x = 0, o.y = 0;
    }, onPhysicsResolve(u) {
      return this.on("physicsResolve", u);
    }, onBeforePhysicsResolve(u) {
      return this.on("beforePhysicsResolve", u);
    }, curPlatform() {
      return e;
    }, isGrounded() {
      return e !== null;
    }, isFalling() {
      return this.vel.dot(Vt()) > 0;
    }, isJumping() {
      return this.vel.dot(Vt()) < 0;
    }, applyImpulse(u) {
      this.vel = this.vel.add(u);
    }, addForce(u) {
      o.x += u.x / this.mass, o.y += u.y / this.mass;
    }, jump(u) {
      e = null, n = null, this.vel = Vt().scale(-u || -this.jumpForce);
    }, onGround(u) {
      return this.on("ground", u);
    }, onFall(u) {
      return this.on("fall", u);
    }, onFallOff(u) {
      return this.on("fallOff", u);
    }, onHeadbutt(u) {
      return this.on("headbutt", u);
    }, onLand(u) {
      return this.on("land", u);
    }, onHeadbutted(u) {
      return this.on("headbutted", u);
    }, inspect() {
      return `gravityScale: ${this.gravityScale}x`;
    } };
  }
  i(la, "body");
  function ma(t18 = 2) {
    let e = t18;
    return { id: "doubleJump", require: ["body"], numJumps: t18, add() {
      this.onGround(() => {
        e = this.numJumps;
      });
    }, doubleJump(n) {
      e <= 0 || (e < this.numJumps && this.trigger("doubleJump"), e--, this.jump(n));
    }, onDoubleJump(n) {
      return this.on("doubleJump", n);
    }, inspect() {
      return `jumpsLeft: ${e}`;
    } };
  }
  i(ma, "doubleJump");
  function pa(t18) {
    return { id: "surfaceEffector", require: ["area"], speed: t18.speed, speedVariation: t18.speedVariation ?? 0, forceScale: t18.speedVariation ?? 0.9, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = n?.normal.normal(), o = e.vel.project(r), a = r?.scale(this.speed)?.sub(o);
        e.addForce(a?.scale(e.mass * this.forceScale));
      });
    } };
  }
  i(pa, "surfaceEffector");
  function da(t18) {
    return { id: "areaEffector", require: ["area"], useGlobalAngle: t18.useGlobalAngle || false, forceAngle: t18.forceAngle, forceMagnitude: t18.forceMagnitude, forceVariation: t18.forceVariation ?? 0, linearDrag: t18.linearDrag ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        let o = C.fromAngle(this.forceAngle).scale(this.forceMagnitude);
        e.addForce(o), this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    } };
  }
  i(da, "areaEffector");
  function fa(t18) {
    return { id: "pointEffector", require: ["area", "pos"], forceMagnitude: t18.forceMagnitude, forceVariation: t18.forceVariation ?? 0, distanceScale: t18.distanceScale ?? 1, forceMode: t18.forceMode || "inverseLinear", linearDrag: t18.linearDrag ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = this.pos.sub(e.pos), o = r.len(), s = o * this.distanceScale / 10, a = this.forceMode === "constant" ? 1 : this.forceMode === "inverseLinear" ? 1 / s : 1 / s ** 2, m = r.scale(this.forceMagnitude * a / o);
        e.addForce(m), this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag));
      });
    } };
  }
  i(fa, "pointEffector");
  function ha(t18) {
    return { id: "constantForce", require: ["body"], force: t18.force, update() {
      this.force && this.addForce(this.force);
    } };
  }
  i(ha, "constantForce");
  function ga(t18) {
    return { id: "buoyancyEffector", require: ["area"], surfaceLevel: t18.surfaceLevel, density: t18.density ?? 1, linearDrag: t18.linearDrag ?? 1, angularDrag: t18.angularDrag ?? 0.2, flowAngle: t18.flowAngle ?? 0, flowMagnitude: t18.flowMagnitude ?? 0, flowVariation: t18.flowVariation ?? 0, add() {
      this.onCollideUpdate("body", (e, n) => {
        let r = e, o = r.worldArea(), [s, a] = o.cut(x(-100, this.surfaceLevel), x(100, this.surfaceLevel));
        s && (this.applyBuoyancy(r, s), this.applyDrag(r, s)), this.flowMagnitude && r.addForce(C.fromAngle(this.flowAngle).scale(this.flowMagnitude));
      });
    }, applyBuoyancy(e, n) {
      let r = this.density * n.area(), o = x(0, 1).scale(-r);
      e.addForce(o);
    }, applyDrag(e, n) {
      let r = e.vel, o = this.density * this.linearDrag, s = r.scale(-o);
      e.addForce(s);
    } };
  }
  i(ga, "buoyancyEffector");
  function hn(t18) {
    if (!t18)
      throw new Error("Please define an anchor");
    return { id: "anchor", anchor: t18, inspect() {
      return typeof this.anchor == "string" ? "anchor: " + this.anchor : "anchor: " + this.anchor.toString();
    } };
  }
  i(hn, "anchor");
  function nr() {
    return { id: "fixed", fixed: true };
  }
  i(nr, "fixed");
  function ba(t18, e) {
    return { id: "follow", require: ["pos"], follow: { obj: t18, offset: e ?? x(0) }, add() {
      t18.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    }, update() {
      t18.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    } };
  }
  i(ba, "follow");
  function ya(t18) {
    let e = l.game.layers?.indexOf(t18);
    return { id: "layer", get layerIndex() {
      return e ?? null;
    }, get layer() {
      return e ? l.game.layers?.[e] ?? null : null;
    }, set layer(n) {
      if (e = l.game.layers?.indexOf(n), e == -1)
        throw Error("Invalid layer name");
    }, inspect() {
      return `layer: ${this.layer}`;
    } };
  }
  i(ya, "layer");
  function xa(t18, e) {
    let n = typeof t18 == "number" ? C.fromAngle(t18) : t18.unit();
    return { id: "move", require: ["pos"], update() {
      this.move(n.scale(e));
    } };
  }
  i(xa, "move");
  function va(t18 = {}) {
    let e = t18.distance ?? Ci, n = false;
    return { id: "offscreen", require: ["pos"], isOffScreen() {
      let r = this.screenPos();
      if (!r)
        return false;
      let o = new W(x(0), ie(), ue());
      return !Mt(o, r) && o.sdistToPoint(r) > e * e;
    }, onExitScreen(r) {
      return this.on("exitView", r);
    }, onEnterScreen(r) {
      return this.on("enterView", r);
    }, update() {
      this.isOffScreen() ? (n || (this.trigger("exitView"), n = true), t18.hide && (this.hidden = true), t18.pause && (this.paused = true), t18.destroy && this.destroy()) : (n && (this.trigger("enterView"), n = false), t18.hide && (this.hidden = false), t18.pause && (this.paused = false));
    } };
  }
  i(va, "offscreen");
  function St(...t18) {
    return { id: "pos", pos: x(...t18), moveBy(...e) {
      this.pos = this.pos.add(x(...e));
    }, move(...e) {
      this.moveBy(x(...e).scale(te()));
    }, moveTo(...e) {
      if (typeof e[0] == "number" && typeof e[1] == "number")
        return this.moveTo(x(e[0], e[1]), e[2]);
      let n = e[0], r = e[1];
      if (r === void 0) {
        this.pos = x(n);
        return;
      }
      let o = n.sub(this.pos);
      if (o.len() <= r * te()) {
        this.pos = x(n);
        return;
      }
      this.move(o.unit().scale(r));
    }, worldPos(e = null) {
      return e ? (this.pos = this.pos.add(this.fromWorld(e)), null) : this.parent ? this.parent.transform.multVec2(this.pos) : this.pos;
    }, toWorld(e) {
      return this.parent ? this.parent.transform.multVec2(this.pos.add(e)) : this.pos.add(e);
    }, fromWorld(e) {
      return this.parent ? this.parent.transform.invert().multVec2(e).sub(this.pos) : e.sub(this.pos);
    }, screenPos(e = null) {
      if (e)
        return this.pos = this.pos.add(this.fromScreen(e)), null;
      {
        let n = this.worldPos();
        return n ? st(this) ? n : pn(n) : null;
      }
    }, toScreen(e) {
      let n = this.toWorld(e);
      return st(this) ? n : pn(n);
    }, fromScreen(e) {
      return st(this) ? this.fromWorld(e) : this.fromWorld(er(e));
    }, toOther(e, n) {
      return e.fromWorld(this.toWorld(n));
    }, fromOther(e, n) {
      return e.toOther(this, n);
    }, inspect() {
      return `pos: (${Math.round(this.pos.x)}x, ${Math.round(this.pos.y)}y)`;
    }, drawInspect() {
      _e({ color: k(255, 0, 0), radius: 4 / In() });
    } };
  }
  i(St, "pos");
  function wa(t18) {
    return { id: "rotate", angle: t18 ?? 0, rotateBy(e) {
      this.angle += e;
    }, rotateTo(e) {
      this.angle = e;
    }, inspect() {
      return `angle: ${Math.round(this.angle)}`;
    } };
  }
  i(wa, "rotate");
  function _t(...t18) {
    if (t18.length === 0)
      return _t(1);
    let e = x(...t18);
    return { id: "scale", set scale(n) {
      if (!(n instanceof C))
        throw Error("The scale property on scale is a vector. Use scaleTo or scaleBy to set the scale with a number.");
      e = x(n);
    }, get scale() {
      return e;
    }, scaleTo(...n) {
      e = x(...n);
    }, scaleBy(...n) {
      e = e.scale(x(...n));
    }, inspect() {
      return e.x == e.y ? `scale: ${e.x.toFixed(1)}x` : `scale: (${e.x.toFixed(1)}x, ${e.y.toFixed(1)}y)`;
    } };
  }
  i(_t, "scale");
  function Ca(t18) {
    return { id: "z", z: t18, inspect() {
      return `z: ${this.z}`;
    } };
  }
  i(Ca, "z");
  var Oa = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACDCAYAAAB2kQxsAAAAAXNSR0IArs4c6QAABqxJREFUeJztnU1yFDkQRtMEB+AG7Fk6fBPO6ZsQLGc/N5gbMAtosJvqKv2kpPxS763A0W5XSXqVqZ+SngzgF58/fflx/7N///vnacW1gBkFD2Z2LOYNBF3Dx9UXAGs5kxLWwhNxU2qlJHrOhwLfkNZoiaBzIa3dCFJYLXgSboKXmETPeVDQyamR8vX55fe/v37/9vBzCDoH0tqktEpZ+t0IOh4KOBm16euZmETPtVDAiRgRLRF0HRRuEkrFrE1hzR4Lipxj+bD6AqCPz5++/Bgp5tXfdv1CeAdPPmFmSkn0nE+a0drdFm6XiOkdKWEuKRptTXqlLuqqFNaM6Dkb+T5nbb+npo8WjZVinqFantFJk9bWojaRThq7HzKN8wiPJ7aCoJHEZN5zHvJp7RE1DTV6SnZ1fa/PL1MjJtF5HmnT2tJF3GZ/BIj05I8ULUtR6ypER7ogjxpw61rRGxEal4KYjNyORzatbUlHSxr06tFcBTHPiN5NUEJWzlZKG/aKRqYk5tl1IKgPafucZ7w+vxSluLP6olHnL6MQQfYV6bpk/+BRZXm+cXHEiApSipZHlE6tRBDMkxmyysl5VsmtjXiFoJmiZU35ZWK0oNv1OY+omSv0GDDKJCaMI42cHg25dvFCi6QZxVS6ViVSpLUz38A4oiS9ySjlW2althGWKZrN6XNuOVpbwq0ReIzqZhfTrHwE/PZZuEYqcnqO0tZQGxVqRylprLGIEDXNkLOKEakbYsYiiphmiQaEZuD9BghixiKSmGYJIueqBt4TRZEyHtHENCNyNtMaRREzHhHFNBOKnKv7myVcVXKka4WfRBXTjMjpypl8iBmP6MsOmed0Bgk1UHjxXlpORIAWIqeybyGtha1QEdNMRM5s7wLCGpTENBORE6AXNTHNkBM2QFFMM4F5ToX5TYiLqphmRE7YmMhimiEnJEb9XBdJOUlp4Qp1Mc1E5QQ4I/qyvFJCy8n8JnijEjXNAi3fQ0TwIEM6e2OqnAgII8kkptkgOZEQZlN6BquZjqhVFxlBOkZq4Z6WASAFQQ8jZwQJ70FK8CTiaeb3fDSLJyMiwiwiS/q0SkwEBE+85jYjSTpcTiSE2WQRtVlOpAMVemVdtjXmlZxICFlQk/TJjHcmYS96JJ0p6KmcZggKeWmVdPopYwgKuxJVUuQE+EU0Sd99KYICxJH0ry9DUIA/rFy3WyWnGYLCnqyQ9PCXERTgmJmSPvwlBAU4p1bUWklPP1yytA9JYWdGRtLLDyEowDUjomiRwQgKUIZnJC3OgREUoByPSDpkDyEkBfhJj6RNQ7xEUYA6aiS9Cdo8SUoUBaijVtCuFQwICtBGiajdawARFKCNK0HdVtEjKUAd0+Q0q9v/FklhJ1rmP4e8JEoUBejfq2jYNgtEUdgJzwN7u6dSSkBQyMSME7O7FyHUQpoLCqw8rv5o+d6Uw3NvfzjagUkAZvOlLH1lLMyx8wCzWBEhW3ZDmLZ7NTsrwCpmyui5A1+IPidigjcjhZy14/vytBYxwRsPMVcf/2c2QU72wQUVIgj5lqFyIiZEJ5qQb1me1gLMJLKM93wY9cVETYiGkphmg+RETFhJljY2LHICQB/uchI1AXxwlRMxAfwgrYVtUHvxwk1OoiaAL8MjJ2ICtOEip1q6APnJEBS6VwiRzp4vtM5YBvf3m/EeI8DyvUZK33z4+v1bqsZ7dN+3n2W6zwgMO44hY0X1vIqkXh419x7lXh9ds8oyviFyRqmcXrxf2FUtF89ymFkG6nI2p7WZB4FGvUWfLcVt4ahsdy+TR7ifz6lc0F5v0GfalmXldpE3esrr6PrTR84sjNjS4kpQhQhaUi4lD6KR1xK9DHupfoKoR02vSFDy9FWNoKVivv1/lG7OfZkqR043OZUbWgmtFaomaGl51ZTHCnFv5bqNnFGjZvRtEFUEHSHmI1ZHWgVBXZ5+sxvX7ANlPChpjKsknSllKaPlRU4nZo0Yjq6wiIJGFPMML2mj3M8ZRRe4QkzF6FhCJEFbBn4i0iKswn11yenZiLLKeMRqQdWiZSmlkqrcV9d0gPfksAcqBW+2ZqAoq5gZGSrnTtGwlVmCIqUepxWxerj7iIyNZ7SgiKmJhJw7NJpRgiKmLuHl3KnReA4UIaU+y+WkcbzHQ1DEzMGQ9aJH0BDK6RE0y9wlTDp2HuppERQxc0FFBaZGUMTMB5UlQG/fHyk1odJEaBUUMXWh4oSoFRQxtaHyxMi2uBseQwUKciUoYuaAShTlkaCImQcqUph7QREzF/8DSS/2GZ2/N/sAAAAASUVORK5CYII=";
  var Ea = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACDCAYAAAB2kQxsAAAAAXNSR0IArs4c6QAABdRJREFUeJzt3d3N3TYMgGG16ADdoAhyl7UyV9bqXRB0g2zQXgRGDcOWSIoUaX3vAwQBknMk/4gWLcnHrQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACDEb9kb8FH99eeXf6Wf/efn35ynDyj1pEsb6G6NUxOYZ7sdB/QtPdnWRnn29gbKMYDUspPs0SgPb22cHANo/JG9AZF6wWBp3JLgeir36bvff3x9LOvzp2/dbSFA97bk5I4a9VMD7TXOUcP0uJ+d6emu5d6V1QvMs5nj8FZPx37X/b2TFpzShtnafeP0DipJMFnLnN3/w1OQ7tZgP+pA4VVKcHo0TG36KNULKGt5XsHZmi1APS5WM2Vqg0i7vbsG6YcIznN9vRTxXHavgdxtv6Tc3vc1pAHqdaG6ipwKYprpf1sFp6aH0gRTrxxLubPB2avHu+c/l3mICvqnsr//+Cq+qGrK1Xw/wzbBaRkNvSv3yew9cq+cu89L6nu6F/cMzCgzF1ftANlbe+Otp1IkDVxyVfbo6Z481f3507dhvXfbrk3HpdtjKTNqKuio8678c7mzF6ns6arfMyrVNoA75wMfNU2hKSeCx3Fq7dc+SPfDc39H9Vqn2CT//4bsYeT1PecOJyGSJdh6PZOlbElPZz2PHtlD1cUeS4LT4z5IOihwfNaD5ERm9qxH/dZ7Vmt9M999CtCZbdLUP/p3r2zFQ0paG8lr4Eb6+ZWBcSeq/qhyK6bXUfXOSgtO7/tOb9eT1NveqKttpYbiyXu/euV51JV16/T6e86zyF5TUp731V5Sp+Z7M71h9QvFNWWuvr0Sy4LzLfNvrel6zRX1e+hN2VzrnNlfaYD0xhCs++851lDh3vNV95xe6YvHgb8bwbNcuc+f09wbaUj2dzYgjz93//5kh94t0quCM8OKK6glKKuM0EYHfhUZWd8WwenZa0rLsp6s2YY66o0k9WUvS4NManBaGuo1eDIHgUZ1ePdkntsfFaCz5VZJdStsxyt7ziMNXHEAK5yk1mqmhrMPf1fcp57Vqe3SqZTMEduZhqAZyaywFne0DVHngHTZ11bznE88l/1lBZ9meP8851plWkBCO7drmQvWnL/sY/fKtFaqN3iy6iofsQxNktJnTMgfPXJUz3w3VaP5vOQ7Iyszvy2DczSi+aYFET2jINUEqFcAS4+rV480WlwRWXe07dLa0YGvfl9kmbTvPZJ1TXGvn4t4yuRp+2aMgk27wkm63DIztU3vOVfueC8wK4zKWtK0M+nvJXmOdlt65MgFFCva06qsKz044SvjIiN5TjLaaHxhtNyyouXBGZ1WSn66Ivt+M7pRZAWoZsDq+t2emeM1am/WtHxFG9runrO1/n1CxLK7CilxJM/H4bwuTJJBvWtgvm0gcNu01uvpd8la1soLE7xkpYDea4Ot6W3GOSzRc3o/qHw2M9qmXWA+uw+jbd0hyO9Yz0+vJ9QGcO/8ZV2YUqYVPN8dImXp3aJ/w1XTGGYfKZN+P7IXiXqO1uINLzFOm/Pz+BV4C03PNEqpZl//ELXP1ro8nhLyKLPHMyAiXyvh4cMFZ2uyAJXc62gzgJl1nhrSLMEzcLx+5qQnIhgqv6qhTHC2Zmus1tUuowCVDkRU6j0jgiJqhLPSSq2q7wMtMSBkdbcQWjNCq2nMlRrTnajAPP/t+c5Sj3K8VNueQ+pGzaa2MyOb2sZseW2dpL6ZnjMzfeQFt/Fe3XP2WIfGvRY6a569jCJ9TaIlcCS9KQE5p1TP2VrMbwLNDlZEvpE5AkGxh9f2nLO/QOetytIwAnMf6SfS2ns+jaZ6B4i2sWvSvF0HWOAj/aRGNFAaPXbw2rS2Rzr0T/ChshKNM3qd4135BCaqK9VAKy+lAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4DBC0k0jFtF9wAAAAASUVORK5CYII=";
  var Fu = "3001.0.0";
  var l = { k: null, globalOpt: null, gfx: null, game: null, app: null, assets: null, fontCacheCanvas: null, fontCacheC2d: null, debug: null, audio: null, pixelDensity: null, canvas: null, gscale: null, kaSprite: null, boomSprite: null };
  var Aa = i((t18 = {}) => {
    l.k && (console.warn("KAPLAY already initialized, you are calling kaplay() multiple times, it may lead bugs!"), l.k.quit()), l.globalOpt = t18;
    let e = t18.root ?? document.body;
    e === document.body && (document.body.style.width = "100%", document.body.style.height = "100%", document.body.style.margin = "0px", document.documentElement.style.width = "100%", document.documentElement.style.height = "100%");
    let n = t18.canvas ?? e.appendChild(document.createElement("canvas"));
    l.canvas = n;
    let r = t18.scale ?? 1;
    l.gscale = r;
    let o = t18.width && t18.height && !t18.stretch && !t18.letterbox;
    o ? (n.width = t18.width * r, n.height = t18.height * r) : (n.width = n.parentElement.offsetWidth, n.height = n.parentElement.offsetHeight);
    let s = ["outline: none", "cursor: default"];
    if (o) {
      let F = n.width, N = n.height;
      s.push(`width: ${F}px`), s.push(`height: ${N}px`);
    } else
      s.push("width: 100%"), s.push("height: 100%");
    t18.crisp && (s.push("image-rendering: pixelated"), s.push("image-rendering: crisp-edges")), n.style.cssText = s.join(";");
    let a = t18.pixelDensity || 1;
    l.pixelDensity = a, n.width *= a, n.height *= a, n.tabIndex = 0;
    let m = document.createElement("canvas");
    m.width = 256, m.height = 256, l.fontCacheCanvas = m;
    let u = m.getContext("2d", { willReadFrequently: true });
    l.fontCacheC2d = u;
    let p = ri({ canvas: n, touchToMouse: t18.touchToMouse, gamepads: t18.gamepads, pixelDensity: t18.pixelDensity, maxFPS: t18.maxFPS, buttons: t18.buttons });
    l.app = p;
    let c = [], f = p.canvas.getContext("webgl", { antialias: true, depth: true, stencil: true, alpha: true, preserveDrawingBuffer: true });
    if (!f)
      throw new Error("WebGL not supported");
    let d = f, v = zi(d, { texFilter: t18.texFilter }), h = rs(t18, v);
    l.gfx = h;
    let O2 = Is();
    l.audio = O2;
    let y = Gi(v);
    l.assets = y;
    let w = Ms();
    l.game = w, w.root.use(gn());
    function V2(F, N) {
      let X2 = new ot(v, F, N);
      return { clear: i(() => X2.clear(), "clear"), free: i(() => X2.free(), "free"), toDataURL: i(() => X2.toDataURL(), "toDataURL"), toImageData: i(() => X2.toImageData(), "toImageData"), width: X2.width, height: X2.height, draw: i((re) => {
        Oe(), X2.bind(), re(), Oe(), X2.unbind();
      }, "draw") };
    }
    i(V2, "makeCanvas");
    function R() {
      d.clear(d.COLOR_BUFFER_BIT), h.frameBuffer.bind(), d.clear(d.COLOR_BUFFER_BIT), h.bgColor || qe(() => {
        it({ width: ie(), height: ue(), quad: new z2(0, 0, ie() / 64, ue() / 64), tex: h.bgTex, fixed: true });
      }), h.renderer.numDraws = 0, h.fixed = false, h.transformStack.length = 0, h.transform = new he();
    }
    i(R, "frameStart");
    function P(F, N) {
      h.postShader = F, h.postShaderUniform = N ?? null;
    }
    i(P, "usePostEffect");
    function M() {
      Oe(), h.lastDrawCalls = h.renderer.numDraws, h.frameBuffer.unbind(), d.viewport(0, 0, d.drawingBufferWidth, d.drawingBufferHeight);
      let F = h.width, N = h.height;
      h.width = d.drawingBufferWidth / a, h.height = d.drawingBufferHeight / a, At({ flipY: true, tex: h.frameBuffer.tex, pos: new C(h.viewport.x, h.viewport.y), width: h.viewport.width, height: h.viewport.height, shader: h.postShader, uniform: typeof h.postShaderUniform == "function" ? h.postShaderUniform() : h.postShaderUniform, fixed: true }), Oe(), h.width = F, h.height = N;
    }
    i(M, "frameEnd");
    let b = false, E = { inspect: false, timeScale: 1, showLog: true, fps: i(() => p.fps(), "fps"), numFrames: i(() => p.numFrames(), "numFrames"), stepFrame: Pt, drawCalls: i(() => h.lastDrawCalls, "drawCalls"), clearLog: i(() => w.logs = [], "clearLog"), log: i((...F) => {
      let N = t18.logMax ?? 8, X2 = F.length > 1 ? F.concat(" ").join(" ") : F[0];
      w.logs.unshift({ msg: X2, time: p.time() }), w.logs.length > N && (w.logs = w.logs.slice(0, N));
    }, "log"), error: i((F) => E.log(new Error(F.toString ? F.toString() : F)), "error"), curRecording: null, numObjects: i(() => _("*", { recursive: true }).length, "numObjects"), get paused() {
      return b;
    }, set paused(F) {
      b = F, F ? O2.ctx.suspend() : O2.ctx.resume();
    } };
    l.debug = E;
    function A(F, N) {
      try {
        return JSON.parse(window.localStorage[F]);
      } catch {
        return N ? (G(F, N), N) : null;
      }
    }
    i(A, "getData");
    function G(F, N) {
      window.localStorage[F] = JSON.stringify(N);
    }
    i(G, "setData");
    function D(F, ...N) {
      let X2 = F($e2), re;
      typeof X2 == "function" ? re = X2(...N)($e2) : re = X2;
      for (let xe in re)
        $e2[xe] = re[xe], t18.global !== false && (window[xe] = re[xe]);
      return $e2;
    }
    i(D, "plug");
    function U(F) {
      let N = p.canvas.captureStream(F), X2 = O2.ctx.createMediaStreamDestination();
      O2.masterNode.connect(X2);
      let re = new MediaRecorder(N), xe = [];
      return re.ondataavailable = (J) => {
        J.data.size > 0 && xe.push(J.data);
      }, re.onerror = () => {
        O2.masterNode.disconnect(X2), N.getTracks().forEach((J) => J.stop());
      }, re.start(), { resume() {
        re.resume();
      }, pause() {
        re.pause();
      }, stop() {
        return re.stop(), O2.masterNode.disconnect(X2), N.getTracks().forEach((J) => J.stop()), new Promise((J) => {
          re.onstop = () => {
            J(new Blob(xe, { type: "video/mp4" }));
          };
        });
      }, download(J = "kaboom.mp4") {
        this.stop().then((we) => Vr(J, we));
      } };
    }
    i(U, "record");
    function L2() {
      return document.activeElement === p.canvas;
    }
    i(L2, "isFocused");
    let H = w.root.add.bind(w.root), q = w.root.readd.bind(w.root), Y = w.root.removeAll.bind(w.root), _ = w.root.get.bind(w.root), K2 = w.root.wait.bind(w.root), Z = w.root.loop.bind(w.root), $ = w.root.query.bind(w.root), ee = w.root.tween.bind(w.root), Ee = Ot(null, Ea), j = Ot(null, Oa);
    l.kaSprite = Ee, l.boomSprite = j;
    function ft() {
      w.root.fixedUpdate();
    }
    i(ft, "fixedUpdateFrame");
    function Pt() {
      w.root.update();
    }
    i(Pt, "updateFrame");
    class Nt {
      static {
        i(this, "Collision");
      }
      source;
      target;
      normal;
      distance;
      resolved = false;
      constructor(N, X2, re, xe, J = false) {
        this.source = N, this.target = X2, this.normal = re, this.distance = xe, this.resolved = J;
      }
      get displacement() {
        return this.normal.scale(this.distance);
      }
      reverse() {
        return new Nt(this.target, this.source, this.normal.scale(-1), this.distance, this.resolved);
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.cross(w.gravity || x(0, 1)) > 0;
      }
      isRight() {
        return this.displacement.cross(w.gravity || x(0, 1)) < 0;
      }
      isTop() {
        return this.displacement.dot(w.gravity || x(0, 1)) > 0;
      }
      isBottom() {
        return this.displacement.dot(w.gravity || x(0, 1)) < 0;
      }
      preventResolution() {
        this.resolved = true;
      }
    }
    function yn() {
      if (!ua())
        return;
      let F = {}, N = t18.hashGridSize || 64, X2 = new he(), re = [];
      function xe(J) {
        if (re.push(X2.clone()), J.pos && X2.translate(J.pos), J.scale && X2.scale(J.scale), J.angle && X2.rotate(J.angle), J.transform = X2.clone(), J.c("area") && !J.paused) {
          let we = J, at = we.worldArea().bbox(), lr = Math.floor(at.pos.x / N), mr = Math.floor(at.pos.y / N), pr2 = Math.ceil((at.pos.x + at.width) / N), dr2 = Math.ceil((at.pos.y + at.height) / N), wn = /* @__PURE__ */ new Set();
          for (let Xe = lr; Xe <= pr2; Xe++)
            for (let ut = mr; ut <= dr2; ut++)
              if (!F[Xe])
                F[Xe] = {}, F[Xe][ut] = [we];
              else if (!F[Xe][ut])
                F[Xe][ut] = [we];
              else {
                let qt = F[Xe][ut];
                e:
                  for (let Ie of qt) {
                    if (Ie.paused || !Ie.exists() || wn.has(Ie.id))
                      continue;
                    for (let Je2 of we.collisionIgnore)
                      if (Ie.is(Je2))
                        continue e;
                    for (let Je2 of Ie.collisionIgnore)
                      if (we.is(Je2))
                        continue e;
                    let zt = jo(we.worldArea(), Ie.worldArea());
                    if (zt) {
                      let Je2 = new Nt(we, Ie, zt.normal, zt.distance);
                      we.trigger("collideUpdate", Ie, Je2);
                      let Cn = Je2.reverse();
                      Cn.resolved = Je2.resolved, Ie.trigger("collideUpdate", we, Cn);
                    }
                    wn.add(Ie.id);
                  }
                qt.push(we);
              }
        }
        J.children.forEach(xe), X2 = re.pop();
      }
      i(xe, "checkObj"), xe(w.root);
    }
    i(yn, "checkFrame");
    function xn(F) {
      console.error(F), O2.ctx.suspend();
      let N = F.message ?? String(F) ?? "Unknown error, check console for more info";
      p.run(() => {
      }, () => {
        R(), qe(() => {
          let xe = ie(), J = ue(), we = { size: 36, width: xe - 32 * 2, letterSpacing: 4, lineSpacing: 4, font: vt, fixed: true };
          ve({ width: xe, height: J, color: k(0, 0, 255), fixed: true });
          let Ht = Ne({ ...we, text: "Error", pos: x(32), color: k(255, 128, 0), fixed: true });
          He(Ht), $r({ ...we, text: N, pos: x(32, 32 + Ht.height + 16), fixed: true }), pe(), w.events.trigger("error", F);
        }), M();
      });
    }
    i(xn, "handleErr");
    function ur(F) {
      c.push(F);
    }
    i(ur, "onCleanup");
    function cr() {
      w.events.onOnce("frameEnd", () => {
        p.quit(), d.clear(d.COLOR_BUFFER_BIT | d.DEPTH_BUFFER_BIT | d.STENCIL_BUFFER_BIT);
        let F = d.getParameter(d.MAX_TEXTURE_IMAGE_UNITS);
        for (let N = 0; N < F; N++)
          d.activeTexture(d.TEXTURE0 + N), d.bindTexture(d.TEXTURE_2D, null), d.bindTexture(d.TEXTURE_CUBE_MAP, null);
        d.bindBuffer(d.ARRAY_BUFFER, null), d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, null), d.bindRenderbuffer(d.RENDERBUFFER, null), d.bindFramebuffer(d.FRAMEBUFFER, null), v.destroy(), c.forEach((N) => N());
      });
    }
    i(cr, "quit");
    let Gt = true;
    p.run(() => {
      try {
        y.loaded && (E.paused || ft(), yn());
      } catch (F) {
        xn(F);
      }
    }, (F, N) => {
      try {
        F(), y.loaded || Be() === 1 && !Gt && (y.loaded = true, w.events.trigger("load")), !y.loaded && t18.loadingScreen !== false || Gt ? (R(), Zi(), M()) : (E.paused || Pt(), yn(), R(), Ji(), t18.debug !== false && Qi(), M()), Gt && (Gt = false), w.events.trigger("frameEnd"), N();
      } catch (X2) {
        xn(X2);
      }
    }), $n(), sr();
    let $e2 = { _k: l, VERSION: Fu, loadRoot: Si, loadProgress: Be, loadSprite: Ot, loadSpriteAtlas: qr, loadSound: Ni, loadMusic: Hi, loadBitmapFont: Li, loadFont: Ui, loadShader: ji, loadShaderURL: ki, loadAseprite: Bi, loadPedit: Ii, loadBean: Mi, loadJSON: Vi, load: cn, getSound: Hr, getFont: kr, getBitmapFont: kn, getSprite: Ir, getShader: Nr, getAsset: Pi, Asset: ce, SpriteData: Ue, SoundData: rt, width: ie, height: ue, center: xt, dt: te, fixedDt: tn, restDt: nn, time: p.time, screenshot: p.screenshot, record: U, isFocused: L2, setCursor: p.setCursor, getCursor: p.getCursor, setCursorLocked: p.setCursorLocked, isCursorLocked: p.isCursorLocked, setFullscreen: p.setFullscreen, isFullscreen: p.isFullscreen, isTouchscreen: p.isTouchscreen, onLoad: kt, onLoading: Gs, onResize: Rs, onGamepadConnect: p.onGamepadConnect, onGamepadDisconnect: p.onGamepadDisconnect, onError: Ds, onCleanup: ur, camPos: ps, camScale: ds, camFlash: hs, camRot: fs, camTransform: gs, shake: bs, toScreen: pn, toWorld: er, setGravity: Bs, getGravity: Us, setGravityDirection: Fs, getGravityDirection: Vt, setBackground: li, getBackground: mi, getGamepads: p.getGamepads, getTreeRoot: Hs, add: H, make: dn, destroy: tr, destroyAll: Y, get: _, query: $, readd: q, pos: St, scale: _t, rotate: wa, color: Xn, opacity: Qn, anchor: hn, area: ca, sprite: fn, text: $s, polygon: ls, rect: Zn, circle: os, uvquad: Xs, outline: us, particles: cs, body: la, surfaceEffector: pa, areaEffector: da, pointEffector: fa, buoyancyEffector: ga, constantForce: ha, doubleJump: ma, shader: ms, textInput: aa, timer: gn, fixed: nr, stay: ar, health: ra, lifespan: oa, named: ia, state: sa, z: Ca, layer: ya, move: xa, offscreen: va, follow: ba, fadeIn: ss, mask: as, drawon: is, raycast: Jn, tile: rr, animate: na, serializeAnimation: no, agent: Qs, sentry: ea, patrol: Zs, pathfinder: Js, on: Qe, onFixedUpdate: xs, onUpdate: vs, onDraw: ws, onAdd: Qr, onDestroy: Cs, onClick: As, onCollide: Os, onCollideUpdate: Es, onCollideEnd: Ts, onHover: Ss, onHoverUpdate: Vs, onHoverEnd: Ps, onKeyDown: p.onKeyDown, onKeyPress: p.onKeyPress, onKeyPressRepeat: p.onKeyPressRepeat, onKeyRelease: p.onKeyRelease, onMouseDown: p.onMouseDown, onMousePress: p.onMousePress, onMouseRelease: p.onMouseRelease, onMouseMove: p.onMouseMove, onCharInput: p.onCharInput, onTouchStart: p.onTouchStart, onTouchMove: p.onTouchMove, onTouchEnd: p.onTouchEnd, onScroll: p.onScroll, onHide: p.onHide, onShow: p.onShow, onGamepadButtonDown: p.onGamepadButtonDown, onGamepadButtonPress: p.onGamepadButtonPress, onGamepadButtonRelease: p.onGamepadButtonRelease, onGamepadStick: p.onGamepadStick, onButtonPress: p.onButtonPress, onButtonDown: p.onButtonDown, onButtonRelease: p.onButtonRelease, mousePos: Kn, mouseDeltaPos: p.mouseDeltaPos, isKeyDown: p.isKeyDown, isKeyPressed: p.isKeyPressed, isKeyPressedRepeat: p.isKeyPressedRepeat, isKeyReleased: p.isKeyReleased, isMouseDown: p.isMouseDown, isMousePressed: p.isMousePressed, isMouseReleased: p.isMouseReleased, isMouseMoved: p.isMouseMoved, isGamepadButtonPressed: p.isGamepadButtonPressed, isGamepadButtonDown: p.isGamepadButtonDown, isGamepadButtonReleased: p.isGamepadButtonReleased, getGamepadStick: p.getGamepadStick, isButtonPressed: p.isButtonPressed, isButtonDown: p.isButtonDown, isButtonReleased: p.isButtonReleased, setButton: p.setButton, getButton: p.getButton, pressButton: p.pressButton, releaseButton: p.releaseButton, getLastInputDeviceType: p.getLastInputDeviceType, charInputted: p.charInputted, loop: Z, wait: K2, play: js, volume: ks, burp: ir, audioCtx: O2.ctx, Line: Te, Rect: W, Circle: Ce, Ellipse: Ke, Point: Tn, Polygon: ye, Vec2: C, Color: I, Mat4: he, Quad: z2, RNG: $t, rand: ge, randi: xr, randSeed: fo, vec2: x, rgb: k, hsl2rgb: lo, quad: le, choose: bo, chooseMultiple: go2, shuffle: vr, chance: ho, lerp: fe, tween: ee, easings: tt, map: Se, mapc: po, wave: An, deg2rad: se, rad2deg: ct, clamp: De, evaluateQuadratic: Ao, evaluateQuadraticFirstDerivative: So, evaluateQuadraticSecondDerivative: Vo, evaluateBezier: Qt, evaluateBezierFirstDerivative: Po, evaluateBezierSecondDerivative: Go, evaluateCatmullRom: Ro, evaluateCatmullRomFirstDerivative: Do, curveLengthApproximation: Tr, normalizedCurve: Mo, hermite: Ut, cardinal: Ar, catmullRom: Ft, bezier: Bo, kochanekBartels: Uo, easingSteps: Ko, easingLinear: Lo, easingCubicBezier: Io, testLineLine: Sn, testRectRect: wr, testRectLine: Vn, testRectPoint: Mt, testCirclePolygon: Xt, testLinePoint: Pn, testLineCircle: Bt, isConvex: _o, triangulate: Rn, NavMesh: Ln, drawSprite: ts, drawText: $r, formatText: Ne, drawRect: ve, drawLine: jt, drawLines: Kt, drawTriangle: Yn, drawCircle: _e, drawEllipse: Nn, drawUVQuad: it, drawPolygon: Pe, drawCurve: Hn, drawBezier: qi, drawFormattedText: He, drawMasked: es, drawSubtracted: ns, pushTransform: be, popTransform: pe, pushTranslate: Q, pushScale: nt, pushRotate: We, pushMatrix: pi, usePostEffect: P, makeCanvas: V2, debug: E, scene: qs, getSceneName: Ws, go: zs, onSceneLeave: Ys, layers: Ns, addLevel: ys, getData: A, setData: G, download: Dn, downloadJSON: Yo, downloadText: Sr, downloadBlob: Vr, plug: D, ASCII_CHARS: jn, canvas: p.canvas, addKaboom: _s, LEFT: C.LEFT, RIGHT: C.RIGHT, UP: C.UP, DOWN: C.DOWN, RED: I.RED, GREEN: I.GREEN, BLUE: I.BLUE, YELLOW: I.YELLOW, MAGENTA: I.MAGENTA, CYAN: I.CYAN, WHITE: I.WHITE, BLACK: I.BLACK, quit: cr, KEvent: ae, KEventHandler: ze, KEventController: je };
    l.k = $e2;
    let vn = t18.plugins;
    if (vn && vn.forEach(D), t18.global !== false)
      for (let F in $e2)
        window[F] = $e2[F];
    return t18.focus !== false && p.canvas.focus(), $e2;
  }, "kaplay");
  var _C = Aa;

  // source/game/scenes/introScene.ts
  function introscene() {
    return scene("introscene", () => {
      debug.log("amuspark logo");
    });
  }

  // node_modules/.pnpm/newgrounds.js@4.1.1/node_modules/newgrounds.js/dist/newgrounds.mjs
  var px = Object.create;
  var E0 = Object.defineProperty;
  var Ax = Object.getOwnPropertyDescriptor;
  var Ex = Object.getOwnPropertyNames;
  var Fx = Object.getPrototypeOf;
  var Dx = Object.prototype.hasOwnProperty;
  var _x = (x2) => E0(x2, "__esModule", { value: true });
  var S = (x2, e) => E0(x2, "name", { value: e, configurable: true });
  var ke2 = ((x2) => typeof __require != "undefined" ? __require : typeof Proxy != "undefined" ? new Proxy(x2, { get: (e, v) => (typeof __require != "undefined" ? __require : e)[v] }) : x2)(function(x2) {
    if (typeof __require != "undefined")
      return __require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var O = (x2, e) => () => (e || x2((e = { exports: {} }).exports, e), e.exports);
  var gx = (x2, e, v) => {
    if (e && typeof e == "object" || typeof e == "function")
      for (let l2 of Ex(e))
        !Dx.call(x2, l2) && l2 !== "default" && E0(x2, l2, { get: () => e[l2], enumerable: !(v = Ax(e, l2)) || v.enumerable });
    return x2;
  };
  var bx = (x2) => gx(_x(E0(x2 != null ? px(Fx(x2)) : {}, "default", x2 && x2.__esModule && "default" in x2 ? { get: () => x2.default, enumerable: true } : { value: x2, enumerable: true })), x2);
  var Se2 = O(() => {
  });
  var L = O((F0, He2) => {
    (function(x2, e) {
      typeof F0 == "object" ? He2.exports = F0 = e() : typeof define == "function" && define.amd ? define([], e) : x2.CryptoJS = e();
    })(F0, function() {
      var x2 = x2 || function(e, v) {
        var l2;
        if (typeof window != "undefined" && window.crypto && (l2 = window.crypto), typeof self != "undefined" && self.crypto && (l2 = self.crypto), typeof globalThis != "undefined" && globalThis.crypto && (l2 = globalThis.crypto), !l2 && typeof window != "undefined" && window.msCrypto && (l2 = window.msCrypto), !l2 && typeof global != "undefined" && global.crypto && (l2 = global.crypto), !l2 && typeof ke2 == "function")
          try {
            l2 = Se2();
          } catch {
          }
        var D = S(function() {
          if (l2) {
            if (typeof l2.getRandomValues == "function")
              try {
                return l2.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof l2.randomBytes == "function")
              try {
                return l2.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, "cryptoSecureRandomInt"), h = Object.create || function() {
          function t18() {
          }
          return S(t18, "F"), function(i2) {
            var A;
            return t18.prototype = i2, A = new t18(), t18.prototype = null, A;
          };
        }(), u = {}, r = u.lib = {}, o = r.Base = /* @__PURE__ */ function() {
          return { extend: function(t18) {
            var i2 = h(this);
            return t18 && i2.mixIn(t18), (!i2.hasOwnProperty("init") || this.init === i2.init) && (i2.init = function() {
              i2.$super.init.apply(this, arguments);
            }), i2.init.prototype = i2, i2.$super = this, i2;
          }, create: function() {
            var t18 = this.extend();
            return t18.init.apply(t18, arguments), t18;
          }, init: function() {
          }, mixIn: function(t18) {
            for (var i2 in t18)
              t18.hasOwnProperty(i2) && (this[i2] = t18[i2]);
            t18.hasOwnProperty("toString") && (this.toString = t18.toString);
          }, clone: function() {
            return this.init.prototype.extend(this);
          } };
        }(), d = r.WordArray = o.extend({ init: function(t18, i2) {
          t18 = this.words = t18 || [], i2 != v ? this.sigBytes = i2 : this.sigBytes = t18.length * 4;
        }, toString: function(t18) {
          return (t18 || c).stringify(this);
        }, concat: function(t18) {
          var i2 = this.words, A = t18.words, p = this.sigBytes, E = t18.sigBytes;
          if (this.clamp(), p % 4)
            for (var F = 0; F < E; F++) {
              var q = A[F >>> 2] >>> 24 - F % 4 * 8 & 255;
              i2[p + F >>> 2] |= q << 24 - (p + F) % 4 * 8;
            }
          else
            for (var k3 = 0; k3 < E; k3 += 4)
              i2[p + k3 >>> 2] = A[k3 >>> 2];
          return this.sigBytes += E, this;
        }, clamp: function() {
          var t18 = this.words, i2 = this.sigBytes;
          t18[i2 >>> 2] &= 4294967295 << 32 - i2 % 4 * 8, t18.length = e.ceil(i2 / 4);
        }, clone: function() {
          var t18 = o.clone.call(this);
          return t18.words = this.words.slice(0), t18;
        }, random: function(t18) {
          for (var i2 = [], A = 0; A < t18; A += 4)
            i2.push(D());
          return new d.init(i2, t18);
        } }), a = u.enc = {}, c = a.Hex = { stringify: function(t18) {
          for (var i2 = t18.words, A = t18.sigBytes, p = [], E = 0; E < A; E++) {
            var F = i2[E >>> 2] >>> 24 - E % 4 * 8 & 255;
            p.push((F >>> 4).toString(16)), p.push((F & 15).toString(16));
          }
          return p.join("");
        }, parse: function(t18) {
          for (var i2 = t18.length, A = [], p = 0; p < i2; p += 2)
            A[p >>> 3] |= parseInt(t18.substr(p, 2), 16) << 24 - p % 8 * 4;
          return new d.init(A, i2 / 2);
        } }, n = a.Latin1 = { stringify: function(t18) {
          for (var i2 = t18.words, A = t18.sigBytes, p = [], E = 0; E < A; E++) {
            var F = i2[E >>> 2] >>> 24 - E % 4 * 8 & 255;
            p.push(String.fromCharCode(F));
          }
          return p.join("");
        }, parse: function(t18) {
          for (var i2 = t18.length, A = [], p = 0; p < i2; p++)
            A[p >>> 2] |= (t18.charCodeAt(p) & 255) << 24 - p % 4 * 8;
          return new d.init(A, i2);
        } }, f = a.Utf8 = { stringify: function(t18) {
          try {
            return decodeURIComponent(escape(n.stringify(t18)));
          } catch {
            throw new Error("Malformed UTF-8 data");
          }
        }, parse: function(t18) {
          return n.parse(unescape(encodeURIComponent(t18)));
        } }, s = r.BufferedBlockAlgorithm = o.extend({ reset: function() {
          this._data = new d.init(), this._nDataBytes = 0;
        }, _append: function(t18) {
          typeof t18 == "string" && (t18 = f.parse(t18)), this._data.concat(t18), this._nDataBytes += t18.sigBytes;
        }, _process: function(t18) {
          var i2, A = this._data, p = A.words, E = A.sigBytes, F = this.blockSize, q = F * 4, k3 = E / q;
          t18 ? k3 = e.ceil(k3) : k3 = e.max((k3 | 0) - this._minBufferSize, 0);
          var z3 = k3 * F, P = e.min(z3 * 4, E);
          if (z3) {
            for (var _ = 0; _ < z3; _ += F)
              this._doProcessBlock(p, _);
            i2 = p.splice(0, z3), A.sigBytes -= P;
          }
          return new d.init(i2, P);
        }, clone: function() {
          var t18 = o.clone.call(this);
          return t18._data = this._data.clone(), t18;
        }, _minBufferSize: 0 }), B = r.Hasher = s.extend({ cfg: o.extend(), init: function(t18) {
          this.cfg = this.cfg.extend(t18), this.reset();
        }, reset: function() {
          s.reset.call(this), this._doReset();
        }, update: function(t18) {
          return this._append(t18), this._process(), this;
        }, finalize: function(t18) {
          t18 && this._append(t18);
          var i2 = this._doFinalize();
          return i2;
        }, blockSize: 512 / 32, _createHelper: function(t18) {
          return function(i2, A) {
            return new t18.init(A).finalize(i2);
          };
        }, _createHmacHelper: function(t18) {
          return function(i2, A) {
            return new C2.HMAC.init(t18, A).finalize(i2);
          };
        } }), C2 = u.algo = {};
        return u;
      }(Math);
      return x2;
    });
  });
  var u0 = O((D0, qe2) => {
    (function(x2, e) {
      typeof D0 == "object" ? qe2.exports = D0 = e(L()) : typeof define == "function" && define.amd ? define(["./core"], e) : e(x2.CryptoJS);
    })(D0, function(x2) {
      return function(e) {
        var v = x2, l2 = v.lib, D = l2.Base, h = l2.WordArray, u = v.x64 = {}, r = u.Word = D.extend({ init: function(d, a) {
          this.high = d, this.low = a;
        } }), o = u.WordArray = D.extend({ init: function(d, a) {
          d = this.words = d || [], a != e ? this.sigBytes = a : this.sigBytes = d.length * 8;
        }, toX32: function() {
          for (var d = this.words, a = d.length, c = [], n = 0; n < a; n++) {
            var f = d[n];
            c.push(f.high), c.push(f.low);
          }
          return h.create(c, this.sigBytes);
        }, clone: function() {
          for (var d = D.clone.call(this), a = d.words = this.words.slice(0), c = a.length, n = 0; n < c; n++)
            a[n] = a[n].clone();
          return d;
        } });
      }(), x2;
    });
  });
  var Re = O((_0, ze2) => {
    (function(x2, e) {
      typeof _0 == "object" ? ze2.exports = _0 = e(L()) : typeof define == "function" && define.amd ? define(["./core"], e) : e(x2.CryptoJS);
    })(_0, function(x2) {
      return function() {
        if (typeof ArrayBuffer == "function") {
          var e = x2, v = e.lib, l2 = v.WordArray, D = l2.init, h = l2.init = function(u) {
            if (u instanceof ArrayBuffer && (u = new Uint8Array(u)), (u instanceof Int8Array || typeof Uint8ClampedArray != "undefined" && u instanceof Uint8ClampedArray || u instanceof Int16Array || u instanceof Uint16Array || u instanceof Int32Array || u instanceof Uint32Array || u instanceof Float32Array || u instanceof Float64Array) && (u = new Uint8Array(u.buffer, u.byteOffset, u.byteLength)), u instanceof Uint8Array) {
              for (var r = u.byteLength, o = [], d = 0; d < r; d++)
                o[d >>> 2] |= u[d] << 24 - d % 4 * 8;
              D.call(this, o, r);
            } else
              D.apply(this, arguments);
          };
          h.prototype = l2;
        }
      }(), x2.lib.WordArray;
    });
  });
  var Ne2 = O((g0, Pe2) => {
    (function(x2, e) {
      typeof g0 == "object" ? Pe2.exports = g0 = e(L()) : typeof define == "function" && define.amd ? define(["./core"], e) : e(x2.CryptoJS);
    })(g0, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.WordArray, D = e.enc, h = D.Utf16 = D.Utf16BE = { stringify: function(r) {
          for (var o = r.words, d = r.sigBytes, a = [], c = 0; c < d; c += 2) {
            var n = o[c >>> 2] >>> 16 - c % 4 * 8 & 65535;
            a.push(String.fromCharCode(n));
          }
          return a.join("");
        }, parse: function(r) {
          for (var o = r.length, d = [], a = 0; a < o; a++)
            d[a >>> 1] |= r.charCodeAt(a) << 16 - a % 2 * 16;
          return l2.create(d, o * 2);
        } };
        D.Utf16LE = { stringify: function(r) {
          for (var o = r.words, d = r.sigBytes, a = [], c = 0; c < d; c += 2) {
            var n = u(o[c >>> 2] >>> 16 - c % 4 * 8 & 65535);
            a.push(String.fromCharCode(n));
          }
          return a.join("");
        }, parse: function(r) {
          for (var o = r.length, d = [], a = 0; a < o; a++)
            d[a >>> 1] |= u(r.charCodeAt(a) << 16 - a % 2 * 16);
          return l2.create(d, o * 2);
        } };
        function u(r) {
          return r << 8 & 4278255360 | r >>> 8 & 16711935;
        }
        S(u, "swapEndian");
      }(), x2.enc.Utf16;
    });
  });
  var x0 = O((b0, Ie) => {
    (function(x2, e) {
      typeof b0 == "object" ? Ie.exports = b0 = e(L()) : typeof define == "function" && define.amd ? define(["./core"], e) : e(x2.CryptoJS);
    })(b0, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.WordArray, D = e.enc, h = D.Base64 = { stringify: function(r) {
          var o = r.words, d = r.sigBytes, a = this._map;
          r.clamp();
          for (var c = [], n = 0; n < d; n += 3)
            for (var f = o[n >>> 2] >>> 24 - n % 4 * 8 & 255, s = o[n + 1 >>> 2] >>> 24 - (n + 1) % 4 * 8 & 255, B = o[n + 2 >>> 2] >>> 24 - (n + 2) % 4 * 8 & 255, C2 = f << 16 | s << 8 | B, t18 = 0; t18 < 4 && n + t18 * 0.75 < d; t18++)
              c.push(a.charAt(C2 >>> 6 * (3 - t18) & 63));
          var i2 = a.charAt(64);
          if (i2)
            for (; c.length % 4; )
              c.push(i2);
          return c.join("");
        }, parse: function(r) {
          var o = r.length, d = this._map, a = this._reverseMap;
          if (!a) {
            a = this._reverseMap = [];
            for (var c = 0; c < d.length; c++)
              a[d.charCodeAt(c)] = c;
          }
          var n = d.charAt(64);
          if (n) {
            var f = r.indexOf(n);
            f !== -1 && (o = f);
          }
          return u(r, o, a);
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
        function u(r, o, d) {
          for (var a = [], c = 0, n = 0; n < o; n++)
            if (n % 4) {
              var f = d[r.charCodeAt(n - 1)] << n % 4 * 2, s = d[r.charCodeAt(n)] >>> 6 - n % 4 * 2, B = f | s;
              a[c >>> 2] |= B << 24 - c % 4 * 8, c++;
            }
          return l2.create(a, c);
        }
        S(u, "parseLoop");
      }(), x2.enc.Base64;
    });
  });
  var je2 = O((y0, We2) => {
    (function(x2, e) {
      typeof y0 == "object" ? We2.exports = y0 = e(L()) : typeof define == "function" && define.amd ? define(["./core"], e) : e(x2.CryptoJS);
    })(y0, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.WordArray, D = e.enc, h = D.Base64url = { stringify: function(r, o) {
          o === void 0 && (o = true);
          var d = r.words, a = r.sigBytes, c = o ? this._safe_map : this._map;
          r.clamp();
          for (var n = [], f = 0; f < a; f += 3)
            for (var s = d[f >>> 2] >>> 24 - f % 4 * 8 & 255, B = d[f + 1 >>> 2] >>> 24 - (f + 1) % 4 * 8 & 255, C2 = d[f + 2 >>> 2] >>> 24 - (f + 2) % 4 * 8 & 255, t18 = s << 16 | B << 8 | C2, i2 = 0; i2 < 4 && f + i2 * 0.75 < a; i2++)
              n.push(c.charAt(t18 >>> 6 * (3 - i2) & 63));
          var A = c.charAt(64);
          if (A)
            for (; n.length % 4; )
              n.push(A);
          return n.join("");
        }, parse: function(r, o) {
          o === void 0 && (o = true);
          var d = r.length, a = o ? this._safe_map : this._map, c = this._reverseMap;
          if (!c) {
            c = this._reverseMap = [];
            for (var n = 0; n < a.length; n++)
              c[a.charCodeAt(n)] = n;
          }
          var f = a.charAt(64);
          if (f) {
            var s = r.indexOf(f);
            s !== -1 && (d = s);
          }
          return u(r, d, c);
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" };
        function u(r, o, d) {
          for (var a = [], c = 0, n = 0; n < o; n++)
            if (n % 4) {
              var f = d[r.charCodeAt(n - 1)] << n % 4 * 2, s = d[r.charCodeAt(n)] >>> 6 - n % 4 * 2, B = f | s;
              a[c >>> 2] |= B << 24 - c % 4 * 8, c++;
            }
          return l2.create(a, c);
        }
        S(u, "parseLoop");
      }(), x2.enc.Base64url;
    });
  });
  var t0 = O((m0, Oe2) => {
    (function(x2, e) {
      typeof m0 == "object" ? Oe2.exports = m0 = e(L()) : typeof define == "function" && define.amd ? define(["./core"], e) : e(x2.CryptoJS);
    })(m0, function(x2) {
      return function(e) {
        var v = x2, l2 = v.lib, D = l2.WordArray, h = l2.Hasher, u = v.algo, r = [];
        (function() {
          for (var f = 0; f < 64; f++)
            r[f] = e.abs(e.sin(f + 1)) * 4294967296 | 0;
        })();
        var o = u.MD5 = h.extend({ _doReset: function() {
          this._hash = new D.init([1732584193, 4023233417, 2562383102, 271733878]);
        }, _doProcessBlock: function(f, s) {
          for (var B = 0; B < 16; B++) {
            var C2 = s + B, t18 = f[C2];
            f[C2] = (t18 << 8 | t18 >>> 24) & 16711935 | (t18 << 24 | t18 >>> 8) & 4278255360;
          }
          var i2 = this._hash.words, A = f[s + 0], p = f[s + 1], E = f[s + 2], F = f[s + 3], q = f[s + 4], k3 = f[s + 5], z3 = f[s + 6], P = f[s + 7], _ = f[s + 8], H = f[s + 9], R = f[s + 10], m = f[s + 11], I2 = f[s + 12], N = f[s + 13], W2 = f[s + 14], T = f[s + 15], g = i2[0], y = i2[1], w = i2[2], b = i2[3];
          g = d(g, y, w, b, A, 7, r[0]), b = d(b, g, y, w, p, 12, r[1]), w = d(w, b, g, y, E, 17, r[2]), y = d(y, w, b, g, F, 22, r[3]), g = d(g, y, w, b, q, 7, r[4]), b = d(b, g, y, w, k3, 12, r[5]), w = d(w, b, g, y, z3, 17, r[6]), y = d(y, w, b, g, P, 22, r[7]), g = d(g, y, w, b, _, 7, r[8]), b = d(b, g, y, w, H, 12, r[9]), w = d(w, b, g, y, R, 17, r[10]), y = d(y, w, b, g, m, 22, r[11]), g = d(g, y, w, b, I2, 7, r[12]), b = d(b, g, y, w, N, 12, r[13]), w = d(w, b, g, y, W2, 17, r[14]), y = d(y, w, b, g, T, 22, r[15]), g = a(g, y, w, b, p, 5, r[16]), b = a(b, g, y, w, z3, 9, r[17]), w = a(w, b, g, y, m, 14, r[18]), y = a(y, w, b, g, A, 20, r[19]), g = a(g, y, w, b, k3, 5, r[20]), b = a(b, g, y, w, R, 9, r[21]), w = a(w, b, g, y, T, 14, r[22]), y = a(y, w, b, g, q, 20, r[23]), g = a(g, y, w, b, H, 5, r[24]), b = a(b, g, y, w, W2, 9, r[25]), w = a(w, b, g, y, F, 14, r[26]), y = a(y, w, b, g, _, 20, r[27]), g = a(g, y, w, b, N, 5, r[28]), b = a(b, g, y, w, E, 9, r[29]), w = a(w, b, g, y, P, 14, r[30]), y = a(y, w, b, g, I2, 20, r[31]), g = c(g, y, w, b, k3, 4, r[32]), b = c(b, g, y, w, _, 11, r[33]), w = c(w, b, g, y, m, 16, r[34]), y = c(y, w, b, g, W2, 23, r[35]), g = c(g, y, w, b, p, 4, r[36]), b = c(b, g, y, w, q, 11, r[37]), w = c(w, b, g, y, P, 16, r[38]), y = c(y, w, b, g, R, 23, r[39]), g = c(g, y, w, b, N, 4, r[40]), b = c(b, g, y, w, A, 11, r[41]), w = c(w, b, g, y, F, 16, r[42]), y = c(y, w, b, g, z3, 23, r[43]), g = c(g, y, w, b, H, 4, r[44]), b = c(b, g, y, w, I2, 11, r[45]), w = c(w, b, g, y, T, 16, r[46]), y = c(y, w, b, g, E, 23, r[47]), g = n(g, y, w, b, A, 6, r[48]), b = n(b, g, y, w, P, 10, r[49]), w = n(w, b, g, y, W2, 15, r[50]), y = n(y, w, b, g, k3, 21, r[51]), g = n(g, y, w, b, I2, 6, r[52]), b = n(b, g, y, w, F, 10, r[53]), w = n(w, b, g, y, R, 15, r[54]), y = n(y, w, b, g, p, 21, r[55]), g = n(g, y, w, b, _, 6, r[56]), b = n(b, g, y, w, T, 10, r[57]), w = n(w, b, g, y, z3, 15, r[58]), y = n(y, w, b, g, N, 21, r[59]), g = n(g, y, w, b, q, 6, r[60]), b = n(b, g, y, w, m, 10, r[61]), w = n(w, b, g, y, E, 15, r[62]), y = n(y, w, b, g, H, 21, r[63]), i2[0] = i2[0] + g | 0, i2[1] = i2[1] + y | 0, i2[2] = i2[2] + w | 0, i2[3] = i2[3] + b | 0;
        }, _doFinalize: function() {
          var f = this._data, s = f.words, B = this._nDataBytes * 8, C2 = f.sigBytes * 8;
          s[C2 >>> 5] |= 128 << 24 - C2 % 32;
          var t18 = e.floor(B / 4294967296), i2 = B;
          s[(C2 + 64 >>> 9 << 4) + 15] = (t18 << 8 | t18 >>> 24) & 16711935 | (t18 << 24 | t18 >>> 8) & 4278255360, s[(C2 + 64 >>> 9 << 4) + 14] = (i2 << 8 | i2 >>> 24) & 16711935 | (i2 << 24 | i2 >>> 8) & 4278255360, f.sigBytes = (s.length + 1) * 4, this._process();
          for (var A = this._hash, p = A.words, E = 0; E < 4; E++) {
            var F = p[E];
            p[E] = (F << 8 | F >>> 24) & 16711935 | (F << 24 | F >>> 8) & 4278255360;
          }
          return A;
        }, clone: function() {
          var f = h.clone.call(this);
          return f._hash = this._hash.clone(), f;
        } });
        function d(f, s, B, C2, t18, i2, A) {
          var p = f + (s & B | ~s & C2) + t18 + A;
          return (p << i2 | p >>> 32 - i2) + s;
        }
        S(d, "FF");
        function a(f, s, B, C2, t18, i2, A) {
          var p = f + (s & C2 | B & ~C2) + t18 + A;
          return (p << i2 | p >>> 32 - i2) + s;
        }
        S(a, "GG");
        function c(f, s, B, C2, t18, i2, A) {
          var p = f + (s ^ B ^ C2) + t18 + A;
          return (p << i2 | p >>> 32 - i2) + s;
        }
        S(c, "HH");
        function n(f, s, B, C2, t18, i2, A) {
          var p = f + (B ^ (s | ~C2)) + t18 + A;
          return (p << i2 | p >>> 32 - i2) + s;
        }
        S(n, "II"), v.MD5 = h._createHelper(o), v.HmacMD5 = h._createHmacHelper(o);
      }(Math), x2.MD5;
    });
  });
  var le2 = O((w0, Le2) => {
    (function(x2, e) {
      typeof w0 == "object" ? Le2.exports = w0 = e(L()) : typeof define == "function" && define.amd ? define(["./core"], e) : e(x2.CryptoJS);
    })(w0, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.WordArray, D = v.Hasher, h = e.algo, u = [], r = h.SHA1 = D.extend({ _doReset: function() {
          this._hash = new l2.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }, _doProcessBlock: function(o, d) {
          for (var a = this._hash.words, c = a[0], n = a[1], f = a[2], s = a[3], B = a[4], C2 = 0; C2 < 80; C2++) {
            if (C2 < 16)
              u[C2] = o[d + C2] | 0;
            else {
              var t18 = u[C2 - 3] ^ u[C2 - 8] ^ u[C2 - 14] ^ u[C2 - 16];
              u[C2] = t18 << 1 | t18 >>> 31;
            }
            var i2 = (c << 5 | c >>> 27) + B + u[C2];
            C2 < 20 ? i2 += (n & f | ~n & s) + 1518500249 : C2 < 40 ? i2 += (n ^ f ^ s) + 1859775393 : C2 < 60 ? i2 += (n & f | n & s | f & s) - 1894007588 : i2 += (n ^ f ^ s) - 899497514, B = s, s = f, f = n << 30 | n >>> 2, n = c, c = i2;
          }
          a[0] = a[0] + c | 0, a[1] = a[1] + n | 0, a[2] = a[2] + f | 0, a[3] = a[3] + s | 0, a[4] = a[4] + B | 0;
        }, _doFinalize: function() {
          var o = this._data, d = o.words, a = this._nDataBytes * 8, c = o.sigBytes * 8;
          return d[c >>> 5] |= 128 << 24 - c % 32, d[(c + 64 >>> 9 << 4) + 14] = Math.floor(a / 4294967296), d[(c + 64 >>> 9 << 4) + 15] = a, o.sigBytes = d.length * 4, this._process(), this._hash;
        }, clone: function() {
          var o = D.clone.call(this);
          return o._hash = this._hash.clone(), o;
        } });
        e.SHA1 = D._createHelper(r), e.HmacSHA1 = D._createHmacHelper(r);
      }(), x2.SHA1;
    });
  });
  var S0 = O((k0, Te2) => {
    (function(x2, e) {
      typeof k0 == "object" ? Te2.exports = k0 = e(L()) : typeof define == "function" && define.amd ? define(["./core"], e) : e(x2.CryptoJS);
    })(k0, function(x2) {
      return function(e) {
        var v = x2, l2 = v.lib, D = l2.WordArray, h = l2.Hasher, u = v.algo, r = [], o = [];
        (function() {
          function c(B) {
            for (var C2 = e.sqrt(B), t18 = 2; t18 <= C2; t18++)
              if (!(B % t18))
                return false;
            return true;
          }
          S(c, "isPrime");
          function n(B) {
            return (B - (B | 0)) * 4294967296 | 0;
          }
          S(n, "getFractionalBits");
          for (var f = 2, s = 0; s < 64; )
            c(f) && (s < 8 && (r[s] = n(e.pow(f, 1 / 2))), o[s] = n(e.pow(f, 1 / 3)), s++), f++;
        })();
        var d = [], a = u.SHA256 = h.extend({ _doReset: function() {
          this._hash = new D.init(r.slice(0));
        }, _doProcessBlock: function(c, n) {
          for (var f = this._hash.words, s = f[0], B = f[1], C2 = f[2], t18 = f[3], i2 = f[4], A = f[5], p = f[6], E = f[7], F = 0; F < 64; F++) {
            if (F < 16)
              d[F] = c[n + F] | 0;
            else {
              var q = d[F - 15], k3 = (q << 25 | q >>> 7) ^ (q << 14 | q >>> 18) ^ q >>> 3, z3 = d[F - 2], P = (z3 << 15 | z3 >>> 17) ^ (z3 << 13 | z3 >>> 19) ^ z3 >>> 10;
              d[F] = k3 + d[F - 7] + P + d[F - 16];
            }
            var _ = i2 & A ^ ~i2 & p, H = s & B ^ s & C2 ^ B & C2, R = (s << 30 | s >>> 2) ^ (s << 19 | s >>> 13) ^ (s << 10 | s >>> 22), m = (i2 << 26 | i2 >>> 6) ^ (i2 << 21 | i2 >>> 11) ^ (i2 << 7 | i2 >>> 25), I2 = E + m + _ + o[F] + d[F], N = R + H;
            E = p, p = A, A = i2, i2 = t18 + I2 | 0, t18 = C2, C2 = B, B = s, s = I2 + N | 0;
          }
          f[0] = f[0] + s | 0, f[1] = f[1] + B | 0, f[2] = f[2] + C2 | 0, f[3] = f[3] + t18 | 0, f[4] = f[4] + i2 | 0, f[5] = f[5] + A | 0, f[6] = f[6] + p | 0, f[7] = f[7] + E | 0;
        }, _doFinalize: function() {
          var c = this._data, n = c.words, f = this._nDataBytes * 8, s = c.sigBytes * 8;
          return n[s >>> 5] |= 128 << 24 - s % 32, n[(s + 64 >>> 9 << 4) + 14] = e.floor(f / 4294967296), n[(s + 64 >>> 9 << 4) + 15] = f, c.sigBytes = n.length * 4, this._process(), this._hash;
        }, clone: function() {
          var c = h.clone.call(this);
          return c._hash = this._hash.clone(), c;
        } });
        v.SHA256 = h._createHelper(a), v.HmacSHA256 = h._createHmacHelper(a);
      }(Math), x2.SHA256;
    });
  });
  var Ge = O((H0, Ue2) => {
    (function(x2, e, v) {
      typeof H0 == "object" ? Ue2.exports = H0 = e(L(), S0()) : typeof define == "function" && define.amd ? define(["./core", "./sha256"], e) : e(x2.CryptoJS);
    })(H0, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.WordArray, D = e.algo, h = D.SHA256, u = D.SHA224 = h.extend({ _doReset: function() {
          this._hash = new l2.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
        }, _doFinalize: function() {
          var r = h._doFinalize.call(this);
          return r.sigBytes -= 4, r;
        } });
        e.SHA224 = h._createHelper(u), e.HmacSHA224 = h._createHmacHelper(u);
      }(), x2.SHA224;
    });
  });
  var de2 = O((q0, Xe) => {
    (function(x2, e, v) {
      typeof q0 == "object" ? Xe.exports = q0 = e(L(), u0()) : typeof define == "function" && define.amd ? define(["./core", "./x64-core"], e) : e(x2.CryptoJS);
    })(q0, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.Hasher, D = e.x64, h = D.Word, u = D.WordArray, r = e.algo;
        function o() {
          return h.create.apply(h, arguments);
        }
        S(o, "X64Word_create");
        var d = [o(1116352408, 3609767458), o(1899447441, 602891725), o(3049323471, 3964484399), o(3921009573, 2173295548), o(961987163, 4081628472), o(1508970993, 3053834265), o(2453635748, 2937671579), o(2870763221, 3664609560), o(3624381080, 2734883394), o(310598401, 1164996542), o(607225278, 1323610764), o(1426881987, 3590304994), o(1925078388, 4068182383), o(2162078206, 991336113), o(2614888103, 633803317), o(3248222580, 3479774868), o(3835390401, 2666613458), o(4022224774, 944711139), o(264347078, 2341262773), o(604807628, 2007800933), o(770255983, 1495990901), o(1249150122, 1856431235), o(1555081692, 3175218132), o(1996064986, 2198950837), o(2554220882, 3999719339), o(2821834349, 766784016), o(2952996808, 2566594879), o(3210313671, 3203337956), o(3336571891, 1034457026), o(3584528711, 2466948901), o(113926993, 3758326383), o(338241895, 168717936), o(666307205, 1188179964), o(773529912, 1546045734), o(1294757372, 1522805485), o(1396182291, 2643833823), o(1695183700, 2343527390), o(1986661051, 1014477480), o(2177026350, 1206759142), o(2456956037, 344077627), o(2730485921, 1290863460), o(2820302411, 3158454273), o(3259730800, 3505952657), o(3345764771, 106217008), o(3516065817, 3606008344), o(3600352804, 1432725776), o(4094571909, 1467031594), o(275423344, 851169720), o(430227734, 3100823752), o(506948616, 1363258195), o(659060556, 3750685593), o(883997877, 3785050280), o(958139571, 3318307427), o(1322822218, 3812723403), o(1537002063, 2003034995), o(1747873779, 3602036899), o(1955562222, 1575990012), o(2024104815, 1125592928), o(2227730452, 2716904306), o(2361852424, 442776044), o(2428436474, 593698344), o(2756734187, 3733110249), o(3204031479, 2999351573), o(3329325298, 3815920427), o(3391569614, 3928383900), o(3515267271, 566280711), o(3940187606, 3454069534), o(4118630271, 4000239992), o(116418474, 1914138554), o(174292421, 2731055270), o(289380356, 3203993006), o(460393269, 320620315), o(685471733, 587496836), o(852142971, 1086792851), o(1017036298, 365543100), o(1126000580, 2618297676), o(1288033470, 3409855158), o(1501505948, 4234509866), o(1607167915, 987167468), o(1816402316, 1246189591)], a = [];
        (function() {
          for (var n = 0; n < 80; n++)
            a[n] = o();
        })();
        var c = r.SHA512 = l2.extend({ _doReset: function() {
          this._hash = new u.init([new h.init(1779033703, 4089235720), new h.init(3144134277, 2227873595), new h.init(1013904242, 4271175723), new h.init(2773480762, 1595750129), new h.init(1359893119, 2917565137), new h.init(2600822924, 725511199), new h.init(528734635, 4215389547), new h.init(1541459225, 327033209)]);
        }, _doProcessBlock: function(n, f) {
          for (var s = this._hash.words, B = s[0], C2 = s[1], t18 = s[2], i2 = s[3], A = s[4], p = s[5], E = s[6], F = s[7], q = B.high, k3 = B.low, z3 = C2.high, P = C2.low, _ = t18.high, H = t18.low, R = i2.high, m = i2.low, I2 = A.high, N = A.low, W2 = p.high, T = p.low, g = E.high, y = E.low, w = F.high, b = F.low, G = q, U = k3, $ = z3, j = P, s0 = _, a0 = H, ce2 = R, c0 = m, Q2 = I2, Z = N, C0 = W2, f0 = T, p0 = g, l0 = y, fe2 = w, d0 = b, M = 0; M < 80; M++) {
            var Y, e0, A0 = a[M];
            if (M < 16)
              e0 = A0.high = n[f + M * 2] | 0, Y = A0.low = n[f + M * 2 + 1] | 0;
            else {
              var Ce2 = a[M - 15], n0 = Ce2.high, h0 = Ce2.low, nx = (n0 >>> 1 | h0 << 31) ^ (n0 >>> 8 | h0 << 24) ^ n0 >>> 7, pe2 = (h0 >>> 1 | n0 << 31) ^ (h0 >>> 8 | n0 << 24) ^ (h0 >>> 7 | n0 << 25), Ae = a[M - 2], i0 = Ae.high, v0 = Ae.low, ix = (i0 >>> 19 | v0 << 13) ^ (i0 << 3 | v0 >>> 29) ^ i0 >>> 6, Ee = (v0 >>> 19 | i0 << 13) ^ (v0 << 3 | i0 >>> 29) ^ (v0 >>> 6 | i0 << 26), Fe2 = a[M - 7], ox = Fe2.high, sx = Fe2.low, De2 = a[M - 16], cx = De2.high, _e2 = De2.low;
              Y = pe2 + sx, e0 = nx + ox + (Y >>> 0 < pe2 >>> 0 ? 1 : 0), Y = Y + Ee, e0 = e0 + ix + (Y >>> 0 < Ee >>> 0 ? 1 : 0), Y = Y + _e2, e0 = e0 + cx + (Y >>> 0 < _e2 >>> 0 ? 1 : 0), A0.high = e0, A0.low = Y;
            }
            var fx = Q2 & C0 ^ ~Q2 & p0, ge2 = Z & f0 ^ ~Z & l0, lx = G & $ ^ G & s0 ^ $ & s0, dx = U & j ^ U & a0 ^ j & a0, hx = (G >>> 28 | U << 4) ^ (G << 30 | U >>> 2) ^ (G << 25 | U >>> 7), be2 = (U >>> 28 | G << 4) ^ (U << 30 | G >>> 2) ^ (U << 25 | G >>> 7), vx = (Q2 >>> 14 | Z << 18) ^ (Q2 >>> 18 | Z << 14) ^ (Q2 << 23 | Z >>> 9), ux = (Z >>> 14 | Q2 << 18) ^ (Z >>> 18 | Q2 << 14) ^ (Z << 23 | Q2 >>> 9), ye2 = d[M], Bx = ye2.high, me2 = ye2.low, J = d0 + ux, r0 = fe2 + vx + (J >>> 0 < d0 >>> 0 ? 1 : 0), J = J + ge2, r0 = r0 + fx + (J >>> 0 < ge2 >>> 0 ? 1 : 0), J = J + me2, r0 = r0 + Bx + (J >>> 0 < me2 >>> 0 ? 1 : 0), J = J + Y, r0 = r0 + e0 + (J >>> 0 < Y >>> 0 ? 1 : 0), we = be2 + dx, Cx = hx + lx + (we >>> 0 < be2 >>> 0 ? 1 : 0);
            fe2 = p0, d0 = l0, p0 = C0, l0 = f0, C0 = Q2, f0 = Z, Z = c0 + J | 0, Q2 = ce2 + r0 + (Z >>> 0 < c0 >>> 0 ? 1 : 0) | 0, ce2 = s0, c0 = a0, s0 = $, a0 = j, $ = G, j = U, U = J + we | 0, G = r0 + Cx + (U >>> 0 < J >>> 0 ? 1 : 0) | 0;
          }
          k3 = B.low = k3 + U, B.high = q + G + (k3 >>> 0 < U >>> 0 ? 1 : 0), P = C2.low = P + j, C2.high = z3 + $ + (P >>> 0 < j >>> 0 ? 1 : 0), H = t18.low = H + a0, t18.high = _ + s0 + (H >>> 0 < a0 >>> 0 ? 1 : 0), m = i2.low = m + c0, i2.high = R + ce2 + (m >>> 0 < c0 >>> 0 ? 1 : 0), N = A.low = N + Z, A.high = I2 + Q2 + (N >>> 0 < Z >>> 0 ? 1 : 0), T = p.low = T + f0, p.high = W2 + C0 + (T >>> 0 < f0 >>> 0 ? 1 : 0), y = E.low = y + l0, E.high = g + p0 + (y >>> 0 < l0 >>> 0 ? 1 : 0), b = F.low = b + d0, F.high = w + fe2 + (b >>> 0 < d0 >>> 0 ? 1 : 0);
        }, _doFinalize: function() {
          var n = this._data, f = n.words, s = this._nDataBytes * 8, B = n.sigBytes * 8;
          f[B >>> 5] |= 128 << 24 - B % 32, f[(B + 128 >>> 10 << 5) + 30] = Math.floor(s / 4294967296), f[(B + 128 >>> 10 << 5) + 31] = s, n.sigBytes = f.length * 4, this._process();
          var C2 = this._hash.toX32();
          return C2;
        }, clone: function() {
          var n = l2.clone.call(this);
          return n._hash = this._hash.clone(), n;
        }, blockSize: 1024 / 32 });
        e.SHA512 = l2._createHelper(c), e.HmacSHA512 = l2._createHmacHelper(c);
      }(), x2.SHA512;
    });
  });
  var $e = O((z0, Ke2) => {
    (function(x2, e, v) {
      typeof z0 == "object" ? Ke2.exports = z0 = e(L(), u0(), de2()) : typeof define == "function" && define.amd ? define(["./core", "./x64-core", "./sha512"], e) : e(x2.CryptoJS);
    })(z0, function(x2) {
      return function() {
        var e = x2, v = e.x64, l2 = v.Word, D = v.WordArray, h = e.algo, u = h.SHA512, r = h.SHA384 = u.extend({ _doReset: function() {
          this._hash = new D.init([new l2.init(3418070365, 3238371032), new l2.init(1654270250, 914150663), new l2.init(2438529370, 812702999), new l2.init(355462360, 4144912697), new l2.init(1731405415, 4290775857), new l2.init(2394180231, 1750603025), new l2.init(3675008525, 1694076839), new l2.init(1203062813, 3204075428)]);
        }, _doFinalize: function() {
          var o = u._doFinalize.call(this);
          return o.sigBytes -= 16, o;
        } });
        e.SHA384 = u._createHelper(r), e.HmacSHA384 = u._createHmacHelper(r);
      }(), x2.SHA384;
    });
  });
  var Je = O((R0, Ze) => {
    (function(x2, e, v) {
      typeof R0 == "object" ? Ze.exports = R0 = e(L(), u0()) : typeof define == "function" && define.amd ? define(["./core", "./x64-core"], e) : e(x2.CryptoJS);
    })(R0, function(x2) {
      return function(e) {
        var v = x2, l2 = v.lib, D = l2.WordArray, h = l2.Hasher, u = v.x64, r = u.Word, o = v.algo, d = [], a = [], c = [];
        (function() {
          for (var s = 1, B = 0, C2 = 0; C2 < 24; C2++) {
            d[s + 5 * B] = (C2 + 1) * (C2 + 2) / 2 % 64;
            var t18 = B % 5, i2 = (2 * s + 3 * B) % 5;
            s = t18, B = i2;
          }
          for (var s = 0; s < 5; s++)
            for (var B = 0; B < 5; B++)
              a[s + 5 * B] = B + (2 * s + 3 * B) % 5 * 5;
          for (var A = 1, p = 0; p < 24; p++) {
            for (var E = 0, F = 0, q = 0; q < 7; q++) {
              if (A & 1) {
                var k3 = (1 << q) - 1;
                k3 < 32 ? F ^= 1 << k3 : E ^= 1 << k3 - 32;
              }
              A & 128 ? A = A << 1 ^ 113 : A <<= 1;
            }
            c[p] = r.create(E, F);
          }
        })();
        var n = [];
        (function() {
          for (var s = 0; s < 25; s++)
            n[s] = r.create();
        })();
        var f = o.SHA3 = h.extend({ cfg: h.cfg.extend({ outputLength: 512 }), _doReset: function() {
          for (var s = this._state = [], B = 0; B < 25; B++)
            s[B] = new r.init();
          this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
        }, _doProcessBlock: function(s, B) {
          for (var C2 = this._state, t18 = this.blockSize / 2, i2 = 0; i2 < t18; i2++) {
            var A = s[B + 2 * i2], p = s[B + 2 * i2 + 1];
            A = (A << 8 | A >>> 24) & 16711935 | (A << 24 | A >>> 8) & 4278255360, p = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360;
            var E = C2[i2];
            E.high ^= p, E.low ^= A;
          }
          for (var F = 0; F < 24; F++) {
            for (var q = 0; q < 5; q++) {
              for (var k3 = 0, z3 = 0, P = 0; P < 5; P++) {
                var E = C2[q + 5 * P];
                k3 ^= E.high, z3 ^= E.low;
              }
              var _ = n[q];
              _.high = k3, _.low = z3;
            }
            for (var q = 0; q < 5; q++)
              for (var H = n[(q + 4) % 5], R = n[(q + 1) % 5], m = R.high, I2 = R.low, k3 = H.high ^ (m << 1 | I2 >>> 31), z3 = H.low ^ (I2 << 1 | m >>> 31), P = 0; P < 5; P++) {
                var E = C2[q + 5 * P];
                E.high ^= k3, E.low ^= z3;
              }
            for (var N = 1; N < 25; N++) {
              var k3, z3, E = C2[N], W2 = E.high, T = E.low, g = d[N];
              g < 32 ? (k3 = W2 << g | T >>> 32 - g, z3 = T << g | W2 >>> 32 - g) : (k3 = T << g - 32 | W2 >>> 64 - g, z3 = W2 << g - 32 | T >>> 64 - g);
              var y = n[a[N]];
              y.high = k3, y.low = z3;
            }
            var w = n[0], b = C2[0];
            w.high = b.high, w.low = b.low;
            for (var q = 0; q < 5; q++)
              for (var P = 0; P < 5; P++) {
                var N = q + 5 * P, E = C2[N], G = n[N], U = n[(q + 1) % 5 + 5 * P], $ = n[(q + 2) % 5 + 5 * P];
                E.high = G.high ^ ~U.high & $.high, E.low = G.low ^ ~U.low & $.low;
              }
            var E = C2[0], j = c[F];
            E.high ^= j.high, E.low ^= j.low;
          }
        }, _doFinalize: function() {
          var s = this._data, B = s.words, C2 = this._nDataBytes * 8, t18 = s.sigBytes * 8, i2 = this.blockSize * 32;
          B[t18 >>> 5] |= 1 << 24 - t18 % 32, B[(e.ceil((t18 + 1) / i2) * i2 >>> 5) - 1] |= 128, s.sigBytes = B.length * 4, this._process();
          for (var A = this._state, p = this.cfg.outputLength / 8, E = p / 8, F = [], q = 0; q < E; q++) {
            var k3 = A[q], z3 = k3.high, P = k3.low;
            z3 = (z3 << 8 | z3 >>> 24) & 16711935 | (z3 << 24 | z3 >>> 8) & 4278255360, P = (P << 8 | P >>> 24) & 16711935 | (P << 24 | P >>> 8) & 4278255360, F.push(P), F.push(z3);
          }
          return new D.init(F, p);
        }, clone: function() {
          for (var s = h.clone.call(this), B = s._state = this._state.slice(0), C2 = 0; C2 < 25; C2++)
            B[C2] = B[C2].clone();
          return s;
        } });
        v.SHA3 = h._createHelper(f), v.HmacSHA3 = h._createHmacHelper(f);
      }(Math), x2.SHA3;
    });
  });
  var Qe2 = O((P0, Ye2) => {
    (function(x2, e) {
      typeof P0 == "object" ? Ye2.exports = P0 = e(L()) : typeof define == "function" && define.amd ? define(["./core"], e) : e(x2.CryptoJS);
    })(P0, function(x2) {
      return function(e) {
        var v = x2, l2 = v.lib, D = l2.WordArray, h = l2.Hasher, u = v.algo, r = D.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]), o = D.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]), d = D.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]), a = D.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]), c = D.create([0, 1518500249, 1859775393, 2400959708, 2840853838]), n = D.create([1352829926, 1548603684, 1836072691, 2053994217, 0]), f = u.RIPEMD160 = h.extend({ _doReset: function() {
          this._hash = D.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        }, _doProcessBlock: function(p, E) {
          for (var F = 0; F < 16; F++) {
            var q = E + F, k3 = p[q];
            p[q] = (k3 << 8 | k3 >>> 24) & 16711935 | (k3 << 24 | k3 >>> 8) & 4278255360;
          }
          var z3 = this._hash.words, P = c.words, _ = n.words, H = r.words, R = o.words, m = d.words, I2 = a.words, N, W2, T, g, y, w, b, G, U, $;
          w = N = z3[0], b = W2 = z3[1], G = T = z3[2], U = g = z3[3], $ = y = z3[4];
          for (var j, F = 0; F < 80; F += 1)
            j = N + p[E + H[F]] | 0, F < 16 ? j += s(W2, T, g) + P[0] : F < 32 ? j += B(W2, T, g) + P[1] : F < 48 ? j += C2(W2, T, g) + P[2] : F < 64 ? j += t18(W2, T, g) + P[3] : j += i2(W2, T, g) + P[4], j = j | 0, j = A(j, m[F]), j = j + y | 0, N = y, y = g, g = A(T, 10), T = W2, W2 = j, j = w + p[E + R[F]] | 0, F < 16 ? j += i2(b, G, U) + _[0] : F < 32 ? j += t18(b, G, U) + _[1] : F < 48 ? j += C2(b, G, U) + _[2] : F < 64 ? j += B(b, G, U) + _[3] : j += s(b, G, U) + _[4], j = j | 0, j = A(j, I2[F]), j = j + $ | 0, w = $, $ = U, U = A(G, 10), G = b, b = j;
          j = z3[1] + T + U | 0, z3[1] = z3[2] + g + $ | 0, z3[2] = z3[3] + y + w | 0, z3[3] = z3[4] + N + b | 0, z3[4] = z3[0] + W2 + G | 0, z3[0] = j;
        }, _doFinalize: function() {
          var p = this._data, E = p.words, F = this._nDataBytes * 8, q = p.sigBytes * 8;
          E[q >>> 5] |= 128 << 24 - q % 32, E[(q + 64 >>> 9 << 4) + 14] = (F << 8 | F >>> 24) & 16711935 | (F << 24 | F >>> 8) & 4278255360, p.sigBytes = (E.length + 1) * 4, this._process();
          for (var k3 = this._hash, z3 = k3.words, P = 0; P < 5; P++) {
            var _ = z3[P];
            z3[P] = (_ << 8 | _ >>> 24) & 16711935 | (_ << 24 | _ >>> 8) & 4278255360;
          }
          return k3;
        }, clone: function() {
          var p = h.clone.call(this);
          return p._hash = this._hash.clone(), p;
        } });
        function s(p, E, F) {
          return p ^ E ^ F;
        }
        S(s, "f1");
        function B(p, E, F) {
          return p & E | ~p & F;
        }
        S(B, "f2");
        function C2(p, E, F) {
          return (p | ~E) ^ F;
        }
        S(C2, "f3");
        function t18(p, E, F) {
          return p & F | E & ~F;
        }
        S(t18, "f4");
        function i2(p, E, F) {
          return p ^ (E | ~F);
        }
        S(i2, "f5");
        function A(p, E) {
          return p << E | p >>> 32 - E;
        }
        S(A, "rotl"), v.RIPEMD160 = h._createHelper(f), v.HmacRIPEMD160 = h._createHmacHelper(f);
      }(Math), x2.RIPEMD160;
    });
  });
  var I0 = O((N0, Me2) => {
    (function(x2, e) {
      typeof N0 == "object" ? Me2.exports = N0 = e(L()) : typeof define == "function" && define.amd ? define(["./core"], e) : e(x2.CryptoJS);
    })(N0, function(x2) {
      (function() {
        var e = x2, v = e.lib, l2 = v.Base, D = e.enc, h = D.Utf8, u = e.algo, r = u.HMAC = l2.extend({ init: function(o, d) {
          o = this._hasher = new o.init(), typeof d == "string" && (d = h.parse(d));
          var a = o.blockSize, c = a * 4;
          d.sigBytes > c && (d = o.finalize(d)), d.clamp();
          for (var n = this._oKey = d.clone(), f = this._iKey = d.clone(), s = n.words, B = f.words, C2 = 0; C2 < a; C2++)
            s[C2] ^= 1549556828, B[C2] ^= 909522486;
          n.sigBytes = f.sigBytes = c, this.reset();
        }, reset: function() {
          var o = this._hasher;
          o.reset(), o.update(this._iKey);
        }, update: function(o) {
          return this._hasher.update(o), this;
        }, finalize: function(o) {
          var d = this._hasher, a = d.finalize(o);
          d.reset();
          var c = d.finalize(this._oKey.clone().concat(a));
          return c;
        } });
      })();
    });
  });
  var er2 = O((W0, Ve2) => {
    (function(x2, e, v) {
      typeof W0 == "object" ? Ve2.exports = W0 = e(L(), S0(), I0()) : typeof define == "function" && define.amd ? define(["./core", "./sha256", "./hmac"], e) : e(x2.CryptoJS);
    })(W0, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.Base, D = v.WordArray, h = e.algo, u = h.SHA256, r = h.HMAC, o = h.PBKDF2 = l2.extend({ cfg: l2.extend({ keySize: 128 / 32, hasher: u, iterations: 25e4 }), init: function(d) {
          this.cfg = this.cfg.extend(d);
        }, compute: function(d, a) {
          for (var c = this.cfg, n = r.create(c.hasher, d), f = D.create(), s = D.create([1]), B = f.words, C2 = s.words, t18 = c.keySize, i2 = c.iterations; B.length < t18; ) {
            var A = n.update(a).finalize(s);
            n.reset();
            for (var p = A.words, E = p.length, F = A, q = 1; q < i2; q++) {
              F = n.finalize(F), n.reset();
              for (var k3 = F.words, z3 = 0; z3 < E; z3++)
                p[z3] ^= k3[z3];
            }
            f.concat(A), C2[0]++;
          }
          return f.sigBytes = t18 * 4, f;
        } });
        e.PBKDF2 = function(d, a, c) {
          return o.create(c).compute(d, a);
        };
      }(), x2.PBKDF2;
    });
  });
  var V = O((j0, rr2) => {
    (function(x2, e, v) {
      typeof j0 == "object" ? rr2.exports = j0 = e(L(), le2(), I0()) : typeof define == "function" && define.amd ? define(["./core", "./sha1", "./hmac"], e) : e(x2.CryptoJS);
    })(j0, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.Base, D = v.WordArray, h = e.algo, u = h.MD5, r = h.EvpKDF = l2.extend({ cfg: l2.extend({ keySize: 128 / 32, hasher: u, iterations: 1 }), init: function(o) {
          this.cfg = this.cfg.extend(o);
        }, compute: function(o, d) {
          for (var a, c = this.cfg, n = c.hasher.create(), f = D.create(), s = f.words, B = c.keySize, C2 = c.iterations; s.length < B; ) {
            a && n.update(a), a = n.update(o).finalize(d), n.reset();
            for (var t18 = 1; t18 < C2; t18++)
              a = n.finalize(a), n.reset();
            f.concat(a);
          }
          return f.sigBytes = B * 4, f;
        } });
        e.EvpKDF = function(o, d, a) {
          return r.create(a).compute(o, d);
        };
      }(), x2.EvpKDF;
    });
  });
  var K = O((O0, xr2) => {
    (function(x2, e, v) {
      typeof O0 == "object" ? xr2.exports = O0 = e(L(), V()) : typeof define == "function" && define.amd ? define(["./core", "./evpkdf"], e) : e(x2.CryptoJS);
    })(O0, function(x2) {
      x2.lib.Cipher || function(e) {
        var v = x2, l2 = v.lib, D = l2.Base, h = l2.WordArray, u = l2.BufferedBlockAlgorithm, r = v.enc, o = r.Utf8, d = r.Base64, a = v.algo, c = a.EvpKDF, n = l2.Cipher = u.extend({ cfg: D.extend(), createEncryptor: function(_, H) {
          return this.create(this._ENC_XFORM_MODE, _, H);
        }, createDecryptor: function(_, H) {
          return this.create(this._DEC_XFORM_MODE, _, H);
        }, init: function(_, H, R) {
          this.cfg = this.cfg.extend(R), this._xformMode = _, this._key = H, this.reset();
        }, reset: function() {
          u.reset.call(this), this._doReset();
        }, process: function(_) {
          return this._append(_), this._process();
        }, finalize: function(_) {
          _ && this._append(_);
          var H = this._doFinalize();
          return H;
        }, keySize: 128 / 32, ivSize: 128 / 32, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function() {
          function _(H) {
            return typeof H == "string" ? P : q;
          }
          return S(_, "selectCipherStrategy"), function(H) {
            return { encrypt: function(R, m, I2) {
              return _(m).encrypt(H, R, m, I2);
            }, decrypt: function(R, m, I2) {
              return _(m).decrypt(H, R, m, I2);
            } };
          };
        }() }), f = l2.StreamCipher = n.extend({ _doFinalize: function() {
          var _ = this._process(true);
          return _;
        }, blockSize: 1 }), s = v.mode = {}, B = l2.BlockCipherMode = D.extend({ createEncryptor: function(_, H) {
          return this.Encryptor.create(_, H);
        }, createDecryptor: function(_, H) {
          return this.Decryptor.create(_, H);
        }, init: function(_, H) {
          this._cipher = _, this._iv = H;
        } }), C2 = s.CBC = function() {
          var _ = B.extend();
          _.Encryptor = _.extend({ processBlock: function(R, m) {
            var I2 = this._cipher, N = I2.blockSize;
            H.call(this, R, m, N), I2.encryptBlock(R, m), this._prevBlock = R.slice(m, m + N);
          } }), _.Decryptor = _.extend({ processBlock: function(R, m) {
            var I2 = this._cipher, N = I2.blockSize, W2 = R.slice(m, m + N);
            I2.decryptBlock(R, m), H.call(this, R, m, N), this._prevBlock = W2;
          } });
          function H(R, m, I2) {
            var N, W2 = this._iv;
            W2 ? (N = W2, this._iv = e) : N = this._prevBlock;
            for (var T = 0; T < I2; T++)
              R[m + T] ^= N[T];
          }
          return S(H, "xorBlock"), _;
        }(), t18 = v.pad = {}, i2 = t18.Pkcs7 = { pad: function(_, H) {
          for (var R = H * 4, m = R - _.sigBytes % R, I2 = m << 24 | m << 16 | m << 8 | m, N = [], W2 = 0; W2 < m; W2 += 4)
            N.push(I2);
          var T = h.create(N, m);
          _.concat(T);
        }, unpad: function(_) {
          var H = _.words[_.sigBytes - 1 >>> 2] & 255;
          _.sigBytes -= H;
        } }, A = l2.BlockCipher = n.extend({ cfg: n.cfg.extend({ mode: C2, padding: i2 }), reset: function() {
          var _;
          n.reset.call(this);
          var H = this.cfg, R = H.iv, m = H.mode;
          this._xformMode == this._ENC_XFORM_MODE ? _ = m.createEncryptor : (_ = m.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == _ ? this._mode.init(this, R && R.words) : (this._mode = _.call(m, this, R && R.words), this._mode.__creator = _);
        }, _doProcessBlock: function(_, H) {
          this._mode.processBlock(_, H);
        }, _doFinalize: function() {
          var _, H = this.cfg.padding;
          return this._xformMode == this._ENC_XFORM_MODE ? (H.pad(this._data, this.blockSize), _ = this._process(true)) : (_ = this._process(true), H.unpad(_)), _;
        }, blockSize: 128 / 32 }), p = l2.CipherParams = D.extend({ init: function(_) {
          this.mixIn(_);
        }, toString: function(_) {
          return (_ || this.formatter).stringify(this);
        } }), E = v.format = {}, F = E.OpenSSL = { stringify: function(_) {
          var H, R = _.ciphertext, m = _.salt;
          return m ? H = h.create([1398893684, 1701076831]).concat(m).concat(R) : H = R, H.toString(d);
        }, parse: function(_) {
          var H, R = d.parse(_), m = R.words;
          return m[0] == 1398893684 && m[1] == 1701076831 && (H = h.create(m.slice(2, 4)), m.splice(0, 4), R.sigBytes -= 16), p.create({ ciphertext: R, salt: H });
        } }, q = l2.SerializableCipher = D.extend({ cfg: D.extend({ format: F }), encrypt: function(_, H, R, m) {
          m = this.cfg.extend(m);
          var I2 = _.createEncryptor(R, m), N = I2.finalize(H), W2 = I2.cfg;
          return p.create({ ciphertext: N, key: R, iv: W2.iv, algorithm: _, mode: W2.mode, padding: W2.padding, blockSize: _.blockSize, formatter: m.format });
        }, decrypt: function(_, H, R, m) {
          m = this.cfg.extend(m), H = this._parse(H, m.format);
          var I2 = _.createDecryptor(R, m).finalize(H.ciphertext);
          return I2;
        }, _parse: function(_, H) {
          return typeof _ == "string" ? H.parse(_, this) : _;
        } }), k3 = v.kdf = {}, z3 = k3.OpenSSL = { execute: function(_, H, R, m, I2) {
          if (m || (m = h.random(64 / 8)), I2)
            var N = c.create({ keySize: H + R, hasher: I2 }).compute(_, m);
          else
            var N = c.create({ keySize: H + R }).compute(_, m);
          var W2 = h.create(N.words.slice(H), R * 4);
          return N.sigBytes = H * 4, p.create({ key: N, iv: W2, salt: m });
        } }, P = l2.PasswordBasedCipher = q.extend({ cfg: q.cfg.extend({ kdf: z3 }), encrypt: function(_, H, R, m) {
          m = this.cfg.extend(m);
          var I2 = m.kdf.execute(R, _.keySize, _.ivSize, m.salt, m.hasher);
          m.iv = I2.iv;
          var N = q.encrypt.call(this, _, H, I2.key, m);
          return N.mixIn(I2), N;
        }, decrypt: function(_, H, R, m) {
          m = this.cfg.extend(m), H = this._parse(H, m.format);
          var I2 = m.kdf.execute(R, _.keySize, _.ivSize, H.salt, m.hasher);
          m.iv = I2.iv;
          var N = q.decrypt.call(this, _, H, I2.key, m);
          return N;
        } });
      }();
    });
  });
  var ar2 = O((L0, tr2) => {
    (function(x2, e, v) {
      typeof L0 == "object" ? tr2.exports = L0 = e(L(), K()) : typeof define == "function" && define.amd ? define(["./core", "./cipher-core"], e) : e(x2.CryptoJS);
    })(L0, function(x2) {
      return x2.mode.CFB = function() {
        var e = x2.lib.BlockCipherMode.extend();
        e.Encryptor = e.extend({ processBlock: function(l2, D) {
          var h = this._cipher, u = h.blockSize;
          v.call(this, l2, D, u, h), this._prevBlock = l2.slice(D, D + u);
        } }), e.Decryptor = e.extend({ processBlock: function(l2, D) {
          var h = this._cipher, u = h.blockSize, r = l2.slice(D, D + u);
          v.call(this, l2, D, u, h), this._prevBlock = r;
        } });
        function v(l2, D, h, u) {
          var r, o = this._iv;
          o ? (r = o.slice(0), this._iv = void 0) : r = this._prevBlock, u.encryptBlock(r, 0);
          for (var d = 0; d < h; d++)
            l2[D + d] ^= r[d];
        }
        return S(v, "generateKeystreamAndEncrypt"), e;
      }(), x2.mode.CFB;
    });
  });
  var ir2 = O((T0, nr2) => {
    (function(x2, e, v) {
      typeof T0 == "object" ? nr2.exports = T0 = e(L(), K()) : typeof define == "function" && define.amd ? define(["./core", "./cipher-core"], e) : e(x2.CryptoJS);
    })(T0, function(x2) {
      return x2.mode.CTR = function() {
        var e = x2.lib.BlockCipherMode.extend(), v = e.Encryptor = e.extend({ processBlock: function(l2, D) {
          var h = this._cipher, u = h.blockSize, r = this._iv, o = this._counter;
          r && (o = this._counter = r.slice(0), this._iv = void 0);
          var d = o.slice(0);
          h.encryptBlock(d, 0), o[u - 1] = o[u - 1] + 1 | 0;
          for (var a = 0; a < u; a++)
            l2[D + a] ^= d[a];
        } });
        return e.Decryptor = v, e;
      }(), x2.mode.CTR;
    });
  });
  var sr2 = O((U0, or2) => {
    (function(x2, e, v) {
      typeof U0 == "object" ? or2.exports = U0 = e(L(), K()) : typeof define == "function" && define.amd ? define(["./core", "./cipher-core"], e) : e(x2.CryptoJS);
    })(U0, function(x2) {
      return x2.mode.CTRGladman = function() {
        var e = x2.lib.BlockCipherMode.extend();
        function v(h) {
          if ((h >> 24 & 255) == 255) {
            var u = h >> 16 & 255, r = h >> 8 & 255, o = h & 255;
            u === 255 ? (u = 0, r === 255 ? (r = 0, o === 255 ? o = 0 : ++o) : ++r) : ++u, h = 0, h += u << 16, h += r << 8, h += o;
          } else
            h += 1 << 24;
          return h;
        }
        S(v, "incWord");
        function l2(h) {
          return (h[0] = v(h[0])) === 0 && (h[1] = v(h[1])), h;
        }
        S(l2, "incCounter");
        var D = e.Encryptor = e.extend({ processBlock: function(h, u) {
          var r = this._cipher, o = r.blockSize, d = this._iv, a = this._counter;
          d && (a = this._counter = d.slice(0), this._iv = void 0), l2(a);
          var c = a.slice(0);
          r.encryptBlock(c, 0);
          for (var n = 0; n < o; n++)
            h[u + n] ^= c[n];
        } });
        return e.Decryptor = D, e;
      }(), x2.mode.CTRGladman;
    });
  });
  var fr = O((G0, cr) => {
    (function(x2, e, v) {
      typeof G0 == "object" ? cr.exports = G0 = e(L(), K()) : typeof define == "function" && define.amd ? define(["./core", "./cipher-core"], e) : e(x2.CryptoJS);
    })(G0, function(x2) {
      return x2.mode.OFB = function() {
        var e = x2.lib.BlockCipherMode.extend(), v = e.Encryptor = e.extend({ processBlock: function(l2, D) {
          var h = this._cipher, u = h.blockSize, r = this._iv, o = this._keystream;
          r && (o = this._keystream = r.slice(0), this._iv = void 0), h.encryptBlock(o, 0);
          for (var d = 0; d < u; d++)
            l2[D + d] ^= o[d];
        } });
        return e.Decryptor = v, e;
      }(), x2.mode.OFB;
    });
  });
  var dr = O((X0, lr) => {
    (function(x2, e, v) {
      typeof X0 == "object" ? lr.exports = X0 = e(L(), K()) : typeof define == "function" && define.amd ? define(["./core", "./cipher-core"], e) : e(x2.CryptoJS);
    })(X0, function(x2) {
      return x2.mode.ECB = function() {
        var e = x2.lib.BlockCipherMode.extend();
        return e.Encryptor = e.extend({ processBlock: function(v, l2) {
          this._cipher.encryptBlock(v, l2);
        } }), e.Decryptor = e.extend({ processBlock: function(v, l2) {
          this._cipher.decryptBlock(v, l2);
        } }), e;
      }(), x2.mode.ECB;
    });
  });
  var vr2 = O((K0, hr) => {
    (function(x2, e, v) {
      typeof K0 == "object" ? hr.exports = K0 = e(L(), K()) : typeof define == "function" && define.amd ? define(["./core", "./cipher-core"], e) : e(x2.CryptoJS);
    })(K0, function(x2) {
      return x2.pad.AnsiX923 = { pad: function(e, v) {
        var l2 = e.sigBytes, D = v * 4, h = D - l2 % D, u = l2 + h - 1;
        e.clamp(), e.words[u >>> 2] |= h << 24 - u % 4 * 8, e.sigBytes += h;
      }, unpad: function(e) {
        var v = e.words[e.sigBytes - 1 >>> 2] & 255;
        e.sigBytes -= v;
      } }, x2.pad.Ansix923;
    });
  });
  var Br2 = O(($0, ur) => {
    (function(x2, e, v) {
      typeof $0 == "object" ? ur.exports = $0 = e(L(), K()) : typeof define == "function" && define.amd ? define(["./core", "./cipher-core"], e) : e(x2.CryptoJS);
    })($0, function(x2) {
      return x2.pad.Iso10126 = { pad: function(e, v) {
        var l2 = v * 4, D = l2 - e.sigBytes % l2;
        e.concat(x2.lib.WordArray.random(D - 1)).concat(x2.lib.WordArray.create([D << 24], 1));
      }, unpad: function(e) {
        var v = e.words[e.sigBytes - 1 >>> 2] & 255;
        e.sigBytes -= v;
      } }, x2.pad.Iso10126;
    });
  });
  var pr = O((Z0, Cr2) => {
    (function(x2, e, v) {
      typeof Z0 == "object" ? Cr2.exports = Z0 = e(L(), K()) : typeof define == "function" && define.amd ? define(["./core", "./cipher-core"], e) : e(x2.CryptoJS);
    })(Z0, function(x2) {
      return x2.pad.Iso97971 = { pad: function(e, v) {
        e.concat(x2.lib.WordArray.create([2147483648], 1)), x2.pad.ZeroPadding.pad(e, v);
      }, unpad: function(e) {
        x2.pad.ZeroPadding.unpad(e), e.sigBytes--;
      } }, x2.pad.Iso97971;
    });
  });
  var Er2 = O((J0, Ar2) => {
    (function(x2, e, v) {
      typeof J0 == "object" ? Ar2.exports = J0 = e(L(), K()) : typeof define == "function" && define.amd ? define(["./core", "./cipher-core"], e) : e(x2.CryptoJS);
    })(J0, function(x2) {
      return x2.pad.ZeroPadding = { pad: function(e, v) {
        var l2 = v * 4;
        e.clamp(), e.sigBytes += l2 - (e.sigBytes % l2 || l2);
      }, unpad: function(e) {
        for (var v = e.words, l2 = e.sigBytes - 1, l2 = e.sigBytes - 1; l2 >= 0; l2--)
          if (v[l2 >>> 2] >>> 24 - l2 % 4 * 8 & 255) {
            e.sigBytes = l2 + 1;
            break;
          }
      } }, x2.pad.ZeroPadding;
    });
  });
  var Dr2 = O((Y0, Fr) => {
    (function(x2, e, v) {
      typeof Y0 == "object" ? Fr.exports = Y0 = e(L(), K()) : typeof define == "function" && define.amd ? define(["./core", "./cipher-core"], e) : e(x2.CryptoJS);
    })(Y0, function(x2) {
      return x2.pad.NoPadding = { pad: function() {
      }, unpad: function() {
      } }, x2.pad.NoPadding;
    });
  });
  var gr2 = O((Q0, _r2) => {
    (function(x2, e, v) {
      typeof Q0 == "object" ? _r2.exports = Q0 = e(L(), K()) : typeof define == "function" && define.amd ? define(["./core", "./cipher-core"], e) : e(x2.CryptoJS);
    })(Q0, function(x2) {
      return function(e) {
        var v = x2, l2 = v.lib, D = l2.CipherParams, h = v.enc, u = h.Hex, r = v.format, o = r.Hex = { stringify: function(d) {
          return d.ciphertext.toString(u);
        }, parse: function(d) {
          var a = u.parse(d);
          return D.create({ ciphertext: a });
        } };
      }(), x2.format.Hex;
    });
  });
  var yr2 = O((M0, br2) => {
    (function(x2, e, v) {
      typeof M0 == "object" ? br2.exports = M0 = e(L(), x0(), t0(), V(), K()) : typeof define == "function" && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(x2.CryptoJS);
    })(M0, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.BlockCipher, D = e.algo, h = [], u = [], r = [], o = [], d = [], a = [], c = [], n = [], f = [], s = [];
        (function() {
          for (var t18 = [], i2 = 0; i2 < 256; i2++)
            i2 < 128 ? t18[i2] = i2 << 1 : t18[i2] = i2 << 1 ^ 283;
          for (var A = 0, p = 0, i2 = 0; i2 < 256; i2++) {
            var E = p ^ p << 1 ^ p << 2 ^ p << 3 ^ p << 4;
            E = E >>> 8 ^ E & 255 ^ 99, h[A] = E, u[E] = A;
            var F = t18[A], q = t18[F], k3 = t18[q], z3 = t18[E] * 257 ^ E * 16843008;
            r[A] = z3 << 24 | z3 >>> 8, o[A] = z3 << 16 | z3 >>> 16, d[A] = z3 << 8 | z3 >>> 24, a[A] = z3;
            var z3 = k3 * 16843009 ^ q * 65537 ^ F * 257 ^ A * 16843008;
            c[E] = z3 << 24 | z3 >>> 8, n[E] = z3 << 16 | z3 >>> 16, f[E] = z3 << 8 | z3 >>> 24, s[E] = z3, A ? (A = F ^ t18[t18[t18[k3 ^ F]]], p ^= t18[t18[p]]) : A = p = 1;
          }
        })();
        var B = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], C2 = D.AES = l2.extend({ _doReset: function() {
          var t18;
          if (!(this._nRounds && this._keyPriorReset === this._key)) {
            for (var i2 = this._keyPriorReset = this._key, A = i2.words, p = i2.sigBytes / 4, E = this._nRounds = p + 6, F = (E + 1) * 4, q = this._keySchedule = [], k3 = 0; k3 < F; k3++)
              k3 < p ? q[k3] = A[k3] : (t18 = q[k3 - 1], k3 % p ? p > 6 && k3 % p == 4 && (t18 = h[t18 >>> 24] << 24 | h[t18 >>> 16 & 255] << 16 | h[t18 >>> 8 & 255] << 8 | h[t18 & 255]) : (t18 = t18 << 8 | t18 >>> 24, t18 = h[t18 >>> 24] << 24 | h[t18 >>> 16 & 255] << 16 | h[t18 >>> 8 & 255] << 8 | h[t18 & 255], t18 ^= B[k3 / p | 0] << 24), q[k3] = q[k3 - p] ^ t18);
            for (var z3 = this._invKeySchedule = [], P = 0; P < F; P++) {
              var k3 = F - P;
              if (P % 4)
                var t18 = q[k3];
              else
                var t18 = q[k3 - 4];
              P < 4 || k3 <= 4 ? z3[P] = t18 : z3[P] = c[h[t18 >>> 24]] ^ n[h[t18 >>> 16 & 255]] ^ f[h[t18 >>> 8 & 255]] ^ s[h[t18 & 255]];
            }
          }
        }, encryptBlock: function(t18, i2) {
          this._doCryptBlock(t18, i2, this._keySchedule, r, o, d, a, h);
        }, decryptBlock: function(t18, i2) {
          var A = t18[i2 + 1];
          t18[i2 + 1] = t18[i2 + 3], t18[i2 + 3] = A, this._doCryptBlock(t18, i2, this._invKeySchedule, c, n, f, s, u);
          var A = t18[i2 + 1];
          t18[i2 + 1] = t18[i2 + 3], t18[i2 + 3] = A;
        }, _doCryptBlock: function(t18, i2, A, p, E, F, q, k3) {
          for (var z3 = this._nRounds, P = t18[i2] ^ A[0], _ = t18[i2 + 1] ^ A[1], H = t18[i2 + 2] ^ A[2], R = t18[i2 + 3] ^ A[3], m = 4, I2 = 1; I2 < z3; I2++) {
            var N = p[P >>> 24] ^ E[_ >>> 16 & 255] ^ F[H >>> 8 & 255] ^ q[R & 255] ^ A[m++], W2 = p[_ >>> 24] ^ E[H >>> 16 & 255] ^ F[R >>> 8 & 255] ^ q[P & 255] ^ A[m++], T = p[H >>> 24] ^ E[R >>> 16 & 255] ^ F[P >>> 8 & 255] ^ q[_ & 255] ^ A[m++], g = p[R >>> 24] ^ E[P >>> 16 & 255] ^ F[_ >>> 8 & 255] ^ q[H & 255] ^ A[m++];
            P = N, _ = W2, H = T, R = g;
          }
          var N = (k3[P >>> 24] << 24 | k3[_ >>> 16 & 255] << 16 | k3[H >>> 8 & 255] << 8 | k3[R & 255]) ^ A[m++], W2 = (k3[_ >>> 24] << 24 | k3[H >>> 16 & 255] << 16 | k3[R >>> 8 & 255] << 8 | k3[P & 255]) ^ A[m++], T = (k3[H >>> 24] << 24 | k3[R >>> 16 & 255] << 16 | k3[P >>> 8 & 255] << 8 | k3[_ & 255]) ^ A[m++], g = (k3[R >>> 24] << 24 | k3[P >>> 16 & 255] << 16 | k3[_ >>> 8 & 255] << 8 | k3[H & 255]) ^ A[m++];
          t18[i2] = N, t18[i2 + 1] = W2, t18[i2 + 2] = T, t18[i2 + 3] = g;
        }, keySize: 256 / 32 });
        e.AES = l2._createHelper(C2);
      }(), x2.AES;
    });
  });
  var wr2 = O((V0, mr) => {
    (function(x2, e, v) {
      typeof V0 == "object" ? mr.exports = V0 = e(L(), x0(), t0(), V(), K()) : typeof define == "function" && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(x2.CryptoJS);
    })(V0, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.WordArray, D = v.BlockCipher, h = e.algo, u = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4], r = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32], o = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28], d = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }], a = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679], c = h.DES = D.extend({ _doReset: function() {
          for (var B = this._key, C2 = B.words, t18 = [], i2 = 0; i2 < 56; i2++) {
            var A = u[i2] - 1;
            t18[i2] = C2[A >>> 5] >>> 31 - A % 32 & 1;
          }
          for (var p = this._subKeys = [], E = 0; E < 16; E++) {
            for (var F = p[E] = [], q = o[E], i2 = 0; i2 < 24; i2++)
              F[i2 / 6 | 0] |= t18[(r[i2] - 1 + q) % 28] << 31 - i2 % 6, F[4 + (i2 / 6 | 0)] |= t18[28 + (r[i2 + 24] - 1 + q) % 28] << 31 - i2 % 6;
            F[0] = F[0] << 1 | F[0] >>> 31;
            for (var i2 = 1; i2 < 7; i2++)
              F[i2] = F[i2] >>> (i2 - 1) * 4 + 3;
            F[7] = F[7] << 5 | F[7] >>> 27;
          }
          for (var k3 = this._invSubKeys = [], i2 = 0; i2 < 16; i2++)
            k3[i2] = p[15 - i2];
        }, encryptBlock: function(B, C2) {
          this._doCryptBlock(B, C2, this._subKeys);
        }, decryptBlock: function(B, C2) {
          this._doCryptBlock(B, C2, this._invSubKeys);
        }, _doCryptBlock: function(B, C2, t18) {
          this._lBlock = B[C2], this._rBlock = B[C2 + 1], n.call(this, 4, 252645135), n.call(this, 16, 65535), f.call(this, 2, 858993459), f.call(this, 8, 16711935), n.call(this, 1, 1431655765);
          for (var i2 = 0; i2 < 16; i2++) {
            for (var A = t18[i2], p = this._lBlock, E = this._rBlock, F = 0, q = 0; q < 8; q++)
              F |= d[q][((E ^ A[q]) & a[q]) >>> 0];
            this._lBlock = E, this._rBlock = p ^ F;
          }
          var k3 = this._lBlock;
          this._lBlock = this._rBlock, this._rBlock = k3, n.call(this, 1, 1431655765), f.call(this, 8, 16711935), f.call(this, 2, 858993459), n.call(this, 16, 65535), n.call(this, 4, 252645135), B[C2] = this._lBlock, B[C2 + 1] = this._rBlock;
        }, keySize: 64 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
        function n(B, C2) {
          var t18 = (this._lBlock >>> B ^ this._rBlock) & C2;
          this._rBlock ^= t18, this._lBlock ^= t18 << B;
        }
        S(n, "exchangeLR");
        function f(B, C2) {
          var t18 = (this._rBlock >>> B ^ this._lBlock) & C2;
          this._lBlock ^= t18, this._rBlock ^= t18 << B;
        }
        S(f, "exchangeRL"), e.DES = D._createHelper(c);
        var s = h.TripleDES = D.extend({ _doReset: function() {
          var B = this._key, C2 = B.words;
          if (C2.length !== 2 && C2.length !== 4 && C2.length < 6)
            throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
          var t18 = C2.slice(0, 2), i2 = C2.length < 4 ? C2.slice(0, 2) : C2.slice(2, 4), A = C2.length < 6 ? C2.slice(0, 2) : C2.slice(4, 6);
          this._des1 = c.createEncryptor(l2.create(t18)), this._des2 = c.createEncryptor(l2.create(i2)), this._des3 = c.createEncryptor(l2.create(A));
        }, encryptBlock: function(B, C2) {
          this._des1.encryptBlock(B, C2), this._des2.decryptBlock(B, C2), this._des3.encryptBlock(B, C2);
        }, decryptBlock: function(B, C2) {
          this._des3.decryptBlock(B, C2), this._des2.encryptBlock(B, C2), this._des1.decryptBlock(B, C2);
        }, keySize: 192 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
        e.TripleDES = D._createHelper(s);
      }(), x2.TripleDES;
    });
  });
  var Sr2 = O((ee, kr2) => {
    (function(x2, e, v) {
      typeof ee == "object" ? kr2.exports = ee = e(L(), x0(), t0(), V(), K()) : typeof define == "function" && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(x2.CryptoJS);
    })(ee, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.StreamCipher, D = e.algo, h = D.RC4 = l2.extend({ _doReset: function() {
          for (var o = this._key, d = o.words, a = o.sigBytes, c = this._S = [], n = 0; n < 256; n++)
            c[n] = n;
          for (var n = 0, f = 0; n < 256; n++) {
            var s = n % a, B = d[s >>> 2] >>> 24 - s % 4 * 8 & 255;
            f = (f + c[n] + B) % 256;
            var C2 = c[n];
            c[n] = c[f], c[f] = C2;
          }
          this._i = this._j = 0;
        }, _doProcessBlock: function(o, d) {
          o[d] ^= u.call(this);
        }, keySize: 256 / 32, ivSize: 0 });
        function u() {
          for (var o = this._S, d = this._i, a = this._j, c = 0, n = 0; n < 4; n++) {
            d = (d + 1) % 256, a = (a + o[d]) % 256;
            var f = o[d];
            o[d] = o[a], o[a] = f, c |= o[(o[d] + o[a]) % 256] << 24 - n * 8;
          }
          return this._i = d, this._j = a, c;
        }
        S(u, "generateKeystreamWord"), e.RC4 = l2._createHelper(h);
        var r = D.RC4Drop = h.extend({ cfg: h.cfg.extend({ drop: 192 }), _doReset: function() {
          h._doReset.call(this);
          for (var o = this.cfg.drop; o > 0; o--)
            u.call(this);
        } });
        e.RC4Drop = l2._createHelper(r);
      }(), x2.RC4;
    });
  });
  var qr2 = O((re, Hr2) => {
    (function(x2, e, v) {
      typeof re == "object" ? Hr2.exports = re = e(L(), x0(), t0(), V(), K()) : typeof define == "function" && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(x2.CryptoJS);
    })(re, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.StreamCipher, D = e.algo, h = [], u = [], r = [], o = D.Rabbit = l2.extend({ _doReset: function() {
          for (var a = this._key.words, c = this.cfg.iv, n = 0; n < 4; n++)
            a[n] = (a[n] << 8 | a[n] >>> 24) & 16711935 | (a[n] << 24 | a[n] >>> 8) & 4278255360;
          var f = this._X = [a[0], a[3] << 16 | a[2] >>> 16, a[1], a[0] << 16 | a[3] >>> 16, a[2], a[1] << 16 | a[0] >>> 16, a[3], a[2] << 16 | a[1] >>> 16], s = this._C = [a[2] << 16 | a[2] >>> 16, a[0] & 4294901760 | a[1] & 65535, a[3] << 16 | a[3] >>> 16, a[1] & 4294901760 | a[2] & 65535, a[0] << 16 | a[0] >>> 16, a[2] & 4294901760 | a[3] & 65535, a[1] << 16 | a[1] >>> 16, a[3] & 4294901760 | a[0] & 65535];
          this._b = 0;
          for (var n = 0; n < 4; n++)
            d.call(this);
          for (var n = 0; n < 8; n++)
            s[n] ^= f[n + 4 & 7];
          if (c) {
            var B = c.words, C2 = B[0], t18 = B[1], i2 = (C2 << 8 | C2 >>> 24) & 16711935 | (C2 << 24 | C2 >>> 8) & 4278255360, A = (t18 << 8 | t18 >>> 24) & 16711935 | (t18 << 24 | t18 >>> 8) & 4278255360, p = i2 >>> 16 | A & 4294901760, E = A << 16 | i2 & 65535;
            s[0] ^= i2, s[1] ^= p, s[2] ^= A, s[3] ^= E, s[4] ^= i2, s[5] ^= p, s[6] ^= A, s[7] ^= E;
            for (var n = 0; n < 4; n++)
              d.call(this);
          }
        }, _doProcessBlock: function(a, c) {
          var n = this._X;
          d.call(this), h[0] = n[0] ^ n[5] >>> 16 ^ n[3] << 16, h[1] = n[2] ^ n[7] >>> 16 ^ n[5] << 16, h[2] = n[4] ^ n[1] >>> 16 ^ n[7] << 16, h[3] = n[6] ^ n[3] >>> 16 ^ n[1] << 16;
          for (var f = 0; f < 4; f++)
            h[f] = (h[f] << 8 | h[f] >>> 24) & 16711935 | (h[f] << 24 | h[f] >>> 8) & 4278255360, a[c + f] ^= h[f];
        }, blockSize: 128 / 32, ivSize: 64 / 32 });
        function d() {
          for (var a = this._X, c = this._C, n = 0; n < 8; n++)
            u[n] = c[n];
          c[0] = c[0] + 1295307597 + this._b | 0, c[1] = c[1] + 3545052371 + (c[0] >>> 0 < u[0] >>> 0 ? 1 : 0) | 0, c[2] = c[2] + 886263092 + (c[1] >>> 0 < u[1] >>> 0 ? 1 : 0) | 0, c[3] = c[3] + 1295307597 + (c[2] >>> 0 < u[2] >>> 0 ? 1 : 0) | 0, c[4] = c[4] + 3545052371 + (c[3] >>> 0 < u[3] >>> 0 ? 1 : 0) | 0, c[5] = c[5] + 886263092 + (c[4] >>> 0 < u[4] >>> 0 ? 1 : 0) | 0, c[6] = c[6] + 1295307597 + (c[5] >>> 0 < u[5] >>> 0 ? 1 : 0) | 0, c[7] = c[7] + 3545052371 + (c[6] >>> 0 < u[6] >>> 0 ? 1 : 0) | 0, this._b = c[7] >>> 0 < u[7] >>> 0 ? 1 : 0;
          for (var n = 0; n < 8; n++) {
            var f = a[n] + c[n], s = f & 65535, B = f >>> 16, C2 = ((s * s >>> 17) + s * B >>> 15) + B * B, t18 = ((f & 4294901760) * f | 0) + ((f & 65535) * f | 0);
            r[n] = C2 ^ t18;
          }
          a[0] = r[0] + (r[7] << 16 | r[7] >>> 16) + (r[6] << 16 | r[6] >>> 16) | 0, a[1] = r[1] + (r[0] << 8 | r[0] >>> 24) + r[7] | 0, a[2] = r[2] + (r[1] << 16 | r[1] >>> 16) + (r[0] << 16 | r[0] >>> 16) | 0, a[3] = r[3] + (r[2] << 8 | r[2] >>> 24) + r[1] | 0, a[4] = r[4] + (r[3] << 16 | r[3] >>> 16) + (r[2] << 16 | r[2] >>> 16) | 0, a[5] = r[5] + (r[4] << 8 | r[4] >>> 24) + r[3] | 0, a[6] = r[6] + (r[5] << 16 | r[5] >>> 16) + (r[4] << 16 | r[4] >>> 16) | 0, a[7] = r[7] + (r[6] << 8 | r[6] >>> 24) + r[5] | 0;
        }
        S(d, "nextState"), e.Rabbit = l2._createHelper(o);
      }(), x2.Rabbit;
    });
  });
  var Rr2 = O((xe, zr2) => {
    (function(x2, e, v) {
      typeof xe == "object" ? zr2.exports = xe = e(L(), x0(), t0(), V(), K()) : typeof define == "function" && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(x2.CryptoJS);
    })(xe, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.StreamCipher, D = e.algo, h = [], u = [], r = [], o = D.RabbitLegacy = l2.extend({ _doReset: function() {
          var a = this._key.words, c = this.cfg.iv, n = this._X = [a[0], a[3] << 16 | a[2] >>> 16, a[1], a[0] << 16 | a[3] >>> 16, a[2], a[1] << 16 | a[0] >>> 16, a[3], a[2] << 16 | a[1] >>> 16], f = this._C = [a[2] << 16 | a[2] >>> 16, a[0] & 4294901760 | a[1] & 65535, a[3] << 16 | a[3] >>> 16, a[1] & 4294901760 | a[2] & 65535, a[0] << 16 | a[0] >>> 16, a[2] & 4294901760 | a[3] & 65535, a[1] << 16 | a[1] >>> 16, a[3] & 4294901760 | a[0] & 65535];
          this._b = 0;
          for (var s = 0; s < 4; s++)
            d.call(this);
          for (var s = 0; s < 8; s++)
            f[s] ^= n[s + 4 & 7];
          if (c) {
            var B = c.words, C2 = B[0], t18 = B[1], i2 = (C2 << 8 | C2 >>> 24) & 16711935 | (C2 << 24 | C2 >>> 8) & 4278255360, A = (t18 << 8 | t18 >>> 24) & 16711935 | (t18 << 24 | t18 >>> 8) & 4278255360, p = i2 >>> 16 | A & 4294901760, E = A << 16 | i2 & 65535;
            f[0] ^= i2, f[1] ^= p, f[2] ^= A, f[3] ^= E, f[4] ^= i2, f[5] ^= p, f[6] ^= A, f[7] ^= E;
            for (var s = 0; s < 4; s++)
              d.call(this);
          }
        }, _doProcessBlock: function(a, c) {
          var n = this._X;
          d.call(this), h[0] = n[0] ^ n[5] >>> 16 ^ n[3] << 16, h[1] = n[2] ^ n[7] >>> 16 ^ n[5] << 16, h[2] = n[4] ^ n[1] >>> 16 ^ n[7] << 16, h[3] = n[6] ^ n[3] >>> 16 ^ n[1] << 16;
          for (var f = 0; f < 4; f++)
            h[f] = (h[f] << 8 | h[f] >>> 24) & 16711935 | (h[f] << 24 | h[f] >>> 8) & 4278255360, a[c + f] ^= h[f];
        }, blockSize: 128 / 32, ivSize: 64 / 32 });
        function d() {
          for (var a = this._X, c = this._C, n = 0; n < 8; n++)
            u[n] = c[n];
          c[0] = c[0] + 1295307597 + this._b | 0, c[1] = c[1] + 3545052371 + (c[0] >>> 0 < u[0] >>> 0 ? 1 : 0) | 0, c[2] = c[2] + 886263092 + (c[1] >>> 0 < u[1] >>> 0 ? 1 : 0) | 0, c[3] = c[3] + 1295307597 + (c[2] >>> 0 < u[2] >>> 0 ? 1 : 0) | 0, c[4] = c[4] + 3545052371 + (c[3] >>> 0 < u[3] >>> 0 ? 1 : 0) | 0, c[5] = c[5] + 886263092 + (c[4] >>> 0 < u[4] >>> 0 ? 1 : 0) | 0, c[6] = c[6] + 1295307597 + (c[5] >>> 0 < u[5] >>> 0 ? 1 : 0) | 0, c[7] = c[7] + 3545052371 + (c[6] >>> 0 < u[6] >>> 0 ? 1 : 0) | 0, this._b = c[7] >>> 0 < u[7] >>> 0 ? 1 : 0;
          for (var n = 0; n < 8; n++) {
            var f = a[n] + c[n], s = f & 65535, B = f >>> 16, C2 = ((s * s >>> 17) + s * B >>> 15) + B * B, t18 = ((f & 4294901760) * f | 0) + ((f & 65535) * f | 0);
            r[n] = C2 ^ t18;
          }
          a[0] = r[0] + (r[7] << 16 | r[7] >>> 16) + (r[6] << 16 | r[6] >>> 16) | 0, a[1] = r[1] + (r[0] << 8 | r[0] >>> 24) + r[7] | 0, a[2] = r[2] + (r[1] << 16 | r[1] >>> 16) + (r[0] << 16 | r[0] >>> 16) | 0, a[3] = r[3] + (r[2] << 8 | r[2] >>> 24) + r[1] | 0, a[4] = r[4] + (r[3] << 16 | r[3] >>> 16) + (r[2] << 16 | r[2] >>> 16) | 0, a[5] = r[5] + (r[4] << 8 | r[4] >>> 24) + r[3] | 0, a[6] = r[6] + (r[5] << 16 | r[5] >>> 16) + (r[4] << 16 | r[4] >>> 16) | 0, a[7] = r[7] + (r[6] << 8 | r[6] >>> 24) + r[5] | 0;
        }
        S(d, "nextState"), e.RabbitLegacy = l2._createHelper(o);
      }(), x2.RabbitLegacy;
    });
  });
  var Nr2 = O((te2, Pr2) => {
    (function(x2, e, v) {
      typeof te2 == "object" ? Pr2.exports = te2 = e(L(), x0(), t0(), V(), K()) : typeof define == "function" && define.amd ? define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], e) : e(x2.CryptoJS);
    })(te2, function(x2) {
      return function() {
        var e = x2, v = e.lib, l2 = v.BlockCipher, D = e.algo;
        let h = 16, u = [608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731], r = [[3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946], [1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055], [3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504], [976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462]];
        var o = { pbox: [], sbox: [] };
        function d(s, B) {
          let C2 = B >> 24 & 255, t18 = B >> 16 & 255, i2 = B >> 8 & 255, A = B & 255, p = s.sbox[0][C2] + s.sbox[1][t18];
          return p = p ^ s.sbox[2][i2], p = p + s.sbox[3][A], p;
        }
        S(d, "F");
        function a(s, B, C2) {
          let t18 = B, i2 = C2, A;
          for (let p = 0; p < h; ++p)
            t18 = t18 ^ s.pbox[p], i2 = d(s, t18) ^ i2, A = t18, t18 = i2, i2 = A;
          return A = t18, t18 = i2, i2 = A, i2 = i2 ^ s.pbox[h], t18 = t18 ^ s.pbox[h + 1], { left: t18, right: i2 };
        }
        S(a, "BlowFish_Encrypt");
        function c(s, B, C2) {
          let t18 = B, i2 = C2, A;
          for (let p = h + 1; p > 1; --p)
            t18 = t18 ^ s.pbox[p], i2 = d(s, t18) ^ i2, A = t18, t18 = i2, i2 = A;
          return A = t18, t18 = i2, i2 = A, i2 = i2 ^ s.pbox[1], t18 = t18 ^ s.pbox[0], { left: t18, right: i2 };
        }
        S(c, "BlowFish_Decrypt");
        function n(s, B, C2) {
          for (let E = 0; E < 4; E++) {
            s.sbox[E] = [];
            for (let F = 0; F < 256; F++)
              s.sbox[E][F] = r[E][F];
          }
          let t18 = 0;
          for (let E = 0; E < h + 2; E++)
            s.pbox[E] = u[E] ^ B[t18], t18++, t18 >= C2 && (t18 = 0);
          let i2 = 0, A = 0, p = 0;
          for (let E = 0; E < h + 2; E += 2)
            p = a(s, i2, A), i2 = p.left, A = p.right, s.pbox[E] = i2, s.pbox[E + 1] = A;
          for (let E = 0; E < 4; E++)
            for (let F = 0; F < 256; F += 2)
              p = a(s, i2, A), i2 = p.left, A = p.right, s.sbox[E][F] = i2, s.sbox[E][F + 1] = A;
          return true;
        }
        S(n, "BlowFishInit");
        var f = D.Blowfish = l2.extend({ _doReset: function() {
          if (this._keyPriorReset !== this._key) {
            var s = this._keyPriorReset = this._key, B = s.words, C2 = s.sigBytes / 4;
            n(o, B, C2);
          }
        }, encryptBlock: function(s, B) {
          var C2 = a(o, s[B], s[B + 1]);
          s[B] = C2.left, s[B + 1] = C2.right;
        }, decryptBlock: function(s, B) {
          var C2 = c(o, s[B], s[B + 1]);
          s[B] = C2.left, s[B + 1] = C2.right;
        }, blockSize: 64 / 32, keySize: 128 / 32, ivSize: 64 / 32 });
        e.Blowfish = l2._createHelper(f);
      }(), x2.Blowfish;
    });
  });
  var Wr2 = O((ae2, Ir2) => {
    (function(x2, e, v) {
      typeof ae2 == "object" ? Ir2.exports = ae2 = e(L(), u0(), Re(), Ne2(), x0(), je2(), t0(), le2(), S0(), Ge(), de2(), $e(), Je(), Qe2(), I0(), er2(), V(), K(), ar2(), ir2(), sr2(), fr(), dr(), vr2(), Br2(), pr(), Er2(), Dr2(), gr2(), yr2(), wr2(), Sr2(), qr2(), Rr2(), Nr2()) : typeof define == "function" && define.amd ? define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./enc-base64url", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy", "./blowfish"], e) : x2.CryptoJS = e(x2.CryptoJS);
    })(ae2, function(x2) {
      return x2;
    });
  });
  var B0 = bx(Wr2());
  var o0 = class {
    constructor(e, v, l2) {
      this._appID = e, this._cipher = v, this._debug = l2?.debug ?? false, this.soundProxy = l2?.soundProxy ?? "https://cors.niceeli.workers.dev/?";
      let D = new URL(globalThis.location.href);
      this._sessionID = D.searchParams.get("ngio_session_id") ?? null, this._sessionID || this.startSession();
    }
    async startSession() {
      let e = await this.call("App.startSession");
      return this._sessionID = e.result.data.session.id, e.result.data.session;
    }
    encryptCall(e) {
      if (!this._cipher)
        return e;
      let v = B0.default.enc.Base64.parse(this._cipher), l2 = B0.default.lib.WordArray.random(16), D = B0.default.AES.encrypt(JSON.stringify(e), v, { iv: l2 }), h = B0.default.enc.Base64.stringify(l2.concat(D.ciphertext));
      return e.secure = h, e.parameters = null, e;
    }
    async call(e, v) {
      let l2 = this.encryptCall({ component: e, parameters: v }), D = { app_id: this._appID, session_id: this._sessionID, call: l2 }, h = new FormData();
      h.append("input", JSON.stringify(D));
      let u = "https://newgrounds.io/gateway_v3.php";
      try {
        var r = await fetch(u, { method: "POST", body: h, mode: "cors" });
        if (!r.ok)
          throw new Error("Network response was not ok.");
      } catch (d) {
        throw console.error("Fetch Error:", d), d;
      }
      let o = await r.json();
      return this._debug && console.log("Newgrounds API Response:", o), o;
    }
  };
  S(o0, "NewgroundsClient");
  var yx = { name: "Cacher", version: "0.0.4" };
  var mx = S((x2) => new Promise((e) => setTimeout(e, x2)), "o");
  var ne = class {
    cacheName;
    _cache;
    set cache(e) {
      this._cache = e, localStorage.setItem(this.cacheName, JSON.stringify(e)), this.initialized = true;
    }
    get cache() {
      return this._cache;
    }
    initialized = false;
    static nsBuilder(e, v) {
      return `${e}~${v}`;
    }
    constructor(e) {
      this.cacheName = e;
    }
    ensureIsInit() {
      if (!this.initialized)
        throw new Error("Cache not initialized, will not function without cache");
    }
    async init() {
      this.cache = await caches.open(this.cacheName), this.initialized = true;
    }
    createNamespace(e) {
      return this.ensureIsInit(), new ie2(this, e);
    }
    createSpriteCacher() {
      return this.ensureIsInit(), new window.SpriteCacher(this);
    }
  };
  S(ne, "Cacher");
  var ie2 = class {
    namespace;
    parent;
    cache;
    constructor(e, v) {
      e.ensureIsInit(), this.namespace = v, this.parent = e, this.cache = () => this.parent.cache;
    }
    nsBuilder = (e) => ne.nsBuilder(this.namespace, e);
    async get(e) {
      return await this.cache().match(this.nsBuilder(e));
    }
    async put(e, v) {
      await this.cache().put(this.nsBuilder(e), v);
    }
    makeRollout(e, v = 0) {
      return new oe(this, e, v);
    }
  };
  S(ie2, "CacherNamespace");
  var oe = class {
    rolloutList;
    rolloutInterval;
    parent;
    cache;
    constructor(e, v, l2 = 0) {
      this.rolloutList = v, this.rolloutInterval = l2, this.parent = e, this.cache = () => e.cache();
    }
    async rollout(e) {
      return await Promise.all(this.rolloutList.map(async (v) => {
        let l2 = this.parent.nsBuilder(v), D = await this.cache().match(l2), h = await e(v, l2, D, this);
        return this.rolloutInterval > 0 && await mx(this.rolloutInterval), h;
      }));
    }
    async tossBrokenCaches(e) {
      let v = await this.cache().keys(), l2 = [];
      for (let D of v) {
        let h = D.url.split("/").pop()?.split("~")[1];
        e.includes(h) || l2.push(h);
      }
      for (let D of l2)
        await this.cache().delete(D);
    }
  };
  S(oe, "CacheRollout");
  var se2 = { ...yx, Cacher: ne, CacherNamespace: ie2, CacheRollout: oe };
  var he2 = null;
  var X = S(() => {
    if (!he2)
      throw new Error("Client not initialized");
    return he2;
  }, "getClient");
  var jr2 = S((x2) => {
    he2 = x2;
  }, "setClient");
  var wx = "NGjs";
  var kx = "art";
  var ve2 = new se2.Cacher(wx);
  var Or2 = S((x2) => fetch(x2).then((e) => e.blob()).then((e) => new Promise((v, l2) => {
    let D = new FileReader();
    D.onloadend = () => v(D.result), D.onerror = l2, D.readAsDataURL(e);
  })), "toDataURL");
  async function Lr2(x2 = "amyspark-ng/mrak-fanart", e = 1) {
    let v = X().soundProxy, l2 = `${v}https://www.newgrounds.com/art/view`, D = x2 + "\\" + e.toString();
    ve2.initialized || await ve2.init();
    let h = ve2.createNamespace(kx), u = await h.get(D);
    if (u)
      return u.text();
    let r = null;
    {
      let B = `${l2}/${x2}`, C2 = await fetch(B, { method: "GET" });
      var o = new DOMParser().parseFromString(await C2.text(), "text/html");
    }
    let d = o.querySelectorAll(".art-image-row").length > 0, a = o.querySelectorAll(".ng-img-container-sync");
    if (a.length > 0 && !d) {
      r = a[e - 1].children[0].children[0];
      let B = v + r.src, C2 = await Or2(B);
      return await h.put(D, new Response(C2)), C2;
    }
    let c;
    d ? c = true : c = false;
    let n = c ? `/html/body/div[9]/div[6]/div/div/div/div[2]/div[1]/div[2]/div[1]/div/div[${e.toString()}]/div/a` : "/html/body/div[9]/div[6]/div/div/div/div[2]/div[1]/div[2]/div[1]/a";
    try {
      r = o.evaluate(n, o.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    } catch (B) {
      throw new Error("Image source is null: " + B);
    }
    let f = r?.href, s = await Or2(f ? v + encodeURI(f) : null);
    return await h.put(D, new Response(s)), s;
  }
  S(Lr2, "getArtURI");
  var Tr2 = S(async (x2) => {
    let v = (await X().call("CloudSave.loadSlot", { id: x2 })).result.data.slot.url;
    if (!v)
      return "";
    try {
      return await (await fetch(v, { method: "GET", mode: "cors" })).text();
    } catch (l2) {
      throw console.error("Fetch Error:", l2), l2;
    }
  }, "getCloudData");
  var Ur = S(async (x2, e) => (await X().call("CloudSave.setData", { id: x2, data: e })).result.data.slot, "setCloudData");
  function Gr2(x2, e, v) {
    let l2 = new o0(x2, e, v);
    return jr2(l2), l2;
  }
  S(Gr2, "connect");
  var Xr2 = S(async () => (await X().call("App.checkSession"))?.result?.data, "getSessionData");
  var Kr2 = S(async () => {
    let x2 = await Xr2();
    return new Promise(async (e, v) => {
      let l2 = x2?.session;
      if (x2.session || (l2 = await X().startSession()), l2.user)
        return e(l2.user);
      if (!l2.passport_url)
        throw new Error("No passport url found in session data");
      let D = l2.passport_url, h = globalThis.open(D, "Newgrounds Passport", "height=600, width=800"), u = setInterval(async () => {
        if (h?.closed) {
          let r = await Xr2();
          return r?.session?.user ? (clearInterval(u), e(r.session.user)) : (clearInterval(u), e(null));
        }
      }, 100);
    });
  }, "login");
  var $r2 = S(async (x2) => (await X().call("Medal.unlock", { id: x2 })).result.data.medal.unlocked, "unlockMedal");
  var Zr2 = S(async () => (await X().call("Medal.getList")).result.data.medals, "getMedals");
  var Jr2 = S(async (x2, e = {}) => {
    let { id: v, ...l2 } = e;
    return (await X().call("ScoreBoard.getScores", { id: x2, ...l2 })).result?.data?.scores;
  }, "getScores");
  var Yr2 = S(async (x2, e) => (await X().call("ScoreBoard.postScore", { id: x2, value: e })).result?.data?.score, "postScore");
  var Sx = "NGjs";
  var Hx = "songs";
  var ue2 = new se2.Cacher(Sx);
  async function qx() {
    ue2.initialized || await ue2.init();
  }
  S(qx, "prepareCache");
  function zx(x2) {
    return new Promise(async (e, v) => {
      await qx();
      let l2 = ue2.createNamespace(Hx), D = await l2.get(x2);
      if (D)
        return e(D.text());
      function h(r) {
        l2.put(x2, new Response(r)), e(r);
      }
      S(h, "handleCacheRes");
      let u = new XMLHttpRequest();
      u.open("GET", x2, true), u.responseType = "text", u.onload = () => {
        u.status === 200 ? h(u.response) : v(u.status);
      }, u.send();
    });
  }
  S(zx, "getPage");
  async function Qr2(x2) {
    if (!x2)
      return Promise.reject("Song ID is empty!");
    let e = S((d) => d === 404 ? Promise.reject("The song could not be found! Please check the song id and try again! (error 404)") : Promise.reject(`Something went wrong! Please check your internet connection and try again! Error Code: ${d}`), "catchErr"), v;
    try {
      v = await zx(`https://api.allorigins.win/get?url=https%3A%2F%2Fwww.newgrounds.com%2Faudio%2Flisten%2F${x2}`);
    } catch (d) {
      return await e(d).catch((a) => a);
    }
    let l2 = JSON.parse(v), D = l2.contents, h = l2.status.http_code;
    if (h !== 200)
      return e(h);
    let u = D.substring(D.indexOf("<![CDATA[") + 9);
    u = u.substring(u.indexOf("embedController([") + 17), u = u.substring(0, u.indexOf('","')), u = u.substring(0, u.indexOf("?")), u = u.substring(u.indexOf("url") + 3), u = u.substring(u.indexOf(':"') + 2), u = u.replace(/\\\//g, "/");
    let r = X().soundProxy + encodeURI(u), o;
    try {
      o = await (await fetch(r)).arrayBuffer();
    } catch (d) {
      return await e(d).catch((a) => a);
    }
    return o;
  }
  S(Qr2, "loadSoundID");
  var Mr2 = S(async () => (await X().call("App.checkSession"))?.result?.data?.session?.user?.name, "getUsername");
  var Vr2 = S(async () => (await X().call("App.checkSession"))?.result?.data?.session, "getSession");
  var ex = S(async () => (await X().call("App.getCurrentVersion"))?.result?.data?.current_version, "getVersion");
  var rx = S(async () => (await X().call("App.checkSession"))?.result?.data?.session?.user?.supporter, "isSupporter");
  var xx = S(async () => (await X().call("App.checkSession"))?.result?.data?.session?.user != null, "isLoggedIn");
  var tx = S(() => globalThis.location.hostname === "uploads.ungrounded.net" || globalThis.location.hostname === "newgrounds.com", "isOnNewgrounds");
  var Be2 = S(async () => (await X().call("Gateway.ping")).result.data.pong, "ping");
  var ax = S(async (x2 = 5e3) => {
    setInterval(() => {
      Be2();
    }, x2);
  }, "autoPing");
  var Rx = { connect: Gr2, login: Kr2, unlockMedal: $r2, getScores: Jr2, getSession: Vr2, postScore: Yr2, getUsername: Mr2, getVersion: ex, isSupporter: rx, isLoggedIn: xx, getCloudData: Tr2, setCloudData: Ur, isOnNewgrounds: tx, NewgroundsClient: o0, ping: Be2, autoPing: ax, loadSoundID: Qr2, getArtURI: Lr2, getMedals: Zr2 };
  var ht2 = Rx;

  // source/game/plugins/wave.ts
  function waver(WaveCompOpt) {
    return {
      // Name of the component
      id: "wave",
      // This component requires the "pos" component to work
      require: ["pos"],
      amplitude: 0,
      wave_tweenSpeed: WaveCompOpt?.wave_tweenSpeed || 0.32,
      wave_startTweenSpeed: WaveCompOpt?.wave_tweenSpeed || 0.32,
      wave_endTweenSpeed: WaveCompOpt?.wave_tweenSpeed || 0.32,
      minAmplitude: WaveCompOpt?.minAmplitude || 0,
      maxAmplitude: WaveCompOpt?.maxAmplitude || 50,
      wave_verPosition: 0,
      wave_speed: WaveCompOpt?.wave_speed || 1,
      isWaving: false,
      add() {
        this.wave_verPosition = this.pos.y;
      },
      startWave() {
        if (this.isWaving)
          return;
        this.trigger("waveStart");
        tween(this.minAmplitude, this.maxAmplitude, this.wave_tweenSpeed, (v) => this.amplitude = v);
        this.isWaving = true;
      },
      stopWave() {
        if (!this.isWaving)
          return;
        this.trigger("waveStop");
        tween(this.amplitude, this.minAmplitude, this.wave_tweenSpeed, (v) => this.amplitude = v);
        tween(this.pos.y, this.wave_verPosition, this.wave_tweenSpeed, (v) => this.pos.y = v);
        this.isWaving = false;
      },
      // "update" is a lifecycle method gets called every frame the obj is in scene
      update() {
        if (!this.isWaving)
          return;
        const t18 = time() * this.wave_speed;
        this.pos.y = this.wave_verPosition + this.amplitude * Math.cos(t18 * this.wave_speed);
      }
    };
  }

  // source/game/plugins/drag.ts
  var curDraggin = null;
  function setCurDraggin(value = null) {
    curDraggin = value;
  }
  function drag(onlyX = false, onlyY = false) {
    let offset = vec2(0);
    return {
      // Name of the component
      id: "drag",
      // This component requires the "pos" and "area" component to work
      require: ["pos", "area"],
      dragging: false,
      pick() {
        curDraggin = this;
        offset = mousePos().sub(this.pos);
        this.trigger("drag");
        this.dragging = true;
      },
      // "update" is a lifecycle method gets called every frame the obj is in scene
      update() {
        if (curDraggin === this) {
          if (this.dragging == false)
            this.dragging = true;
          if (onlyX == true)
            this.pos.x = mousePos().x - offset.x;
          else if (onlyY == true)
            this.pos.y = mousePos().y - offset.y;
          else
            this.pos = this.pos = mousePos().sub(offset);
          this.trigger("dragUpdate");
        } else {
          this.dragging = false;
        }
      },
      onDrag(action) {
        return this.on("drag", action);
      },
      onDragUpdate(action) {
        return this.on("dragUpdate", action);
      },
      onDragEnd(action) {
        return this.on("dragEnd", action);
      },
      inspect() {
        return `dragging: ${this.dragging}`;
      }
    };
  }

  // source/sound.ts
  var bg;
  var volumeText;
  var speaker;
  var trayVolElements;
  var volumeBars;
  var sfxHandlers = /* @__PURE__ */ new Set();
  function playSfx(sound, opts) {
    opts = opts || {};
    opts.detune = opts.detune || 0;
    opts.speed = opts.speed || 1;
    opts.loop = opts.loop || false;
    opts.volume = opts.volume || GameState.settings.sfx.muted == true ? 0 : GameState.settings.sfx.volume;
    let handle = play(sound, {
      volume: opts.volume,
      detune: opts.detune,
      speed: opts.speed,
      loop: opts.loop
    });
    sfxHandlers.add(handle);
    handle.onEnd(() => sfxHandlers.delete(handle));
    return handle;
  }
  function stopAllSounds() {
    sfxHandlers.forEach((handler) => {
      handler.stop();
    });
  }
  var musicHandler;
  function playMusic(song, opts) {
    opts = opts || {};
    opts.volume = opts.volume || GameState.settings.music.muted == true ? 0 : GameState.settings.music.volume;
    opts.loop = opts.loop || true;
    opts.detune = opts.detune || 0;
    musicHandler?.stop();
    musicHandler = play(song, {
      volume: opts.volume,
      loop: opts.loop,
      detune: opts.detune
    });
  }
  function changeVolume(type, volume2) {
    if (type == "sfx") {
      sfxHandlers.forEach((handler) => {
        handler.volume = volume2;
      });
    } else if (type == "music") {
      musicHandler.volume = volume2;
    }
  }
  function manageMute(type, mute) {
    if (type == "sfx") {
      GameState.settings.sfx.muted = mute;
      changeVolume("sfx", mute == true ? 0 : GameState.settings.sfx.volume);
    } else if (type == "music") {
      GameState.settings.music.muted = mute;
      changeVolume("music", mute == true ? 0 : GameState.settings.music.volume);
    }
  }
  function scratchSong() {
    musicHandler.winding = true;
    tween(musicHandler.detune, rand(-100, -150), 0.25, (p) => musicHandler.detune = p, easings.easeInQuint).then(() => {
      tween(musicHandler.detune, rand(100, 150), 0.25, (p) => musicHandler.detune = p, easings.easeInQuint);
    });
    tween(musicHandler.speed, rand(0.25, 0.5), 0.25, (p) => musicHandler.speed = p, easings.easeInQuint);
    tween(musicHandler.volume, musicHandler.volume * rand(0.1, 0.5), 0.5, (p) => musicHandler.volume = p, easings.easeInQuint).then(() => {
      musicHandler.stop();
    });
  }
  var volChangeTune = 0;
  var showTween = null;
  function addSoundElements() {
    bg = add([
      rect(width() / 6, 80, { radius: 2.5 }),
      pos(width() / 2, 0),
      anchor("top"),
      color(BLACK),
      stay(),
      opacity(0.75),
      layer("sound"),
      z(0),
      "trayVolElement",
      {
        upYPos: -80,
        downYPos: 0
      }
    ]);
    bg.pos.y = bg.upYPos;
    volumeText = bg.add([
      text("VOLUME"),
      pos(0, bg.height - 12),
      anchor("center"),
      scale(0.6),
      layer("sound"),
      z(1),
      "trayVolElement"
    ]);
    speaker = volumeText.add([
      sprite("speakers"),
      opacity(1),
      pos(0, -64),
      scale(),
      anchor("center"),
      layer("sound"),
      z(1),
      "trayVolElement"
    ]);
    speaker.frame = 0;
    speaker.hidden = true;
    for (let i2 = 0; i2 < 10; i2++) {
      bg.add([
        pos(-67 + i2 * 15, 30),
        rect(10, bg.height - 40, { radius: 1 }),
        opacity(0),
        anchor("center"),
        layer("sound"),
        z(1),
        scale(),
        "trayVolElement",
        "trayVolBar",
        {
          volume: 0.1 * (i2 + 1),
          update() {
            if (GameState.settings.volume.toFixed(1) < this.volume.toFixed(1))
              this.opacity = 0.1;
            else
              this.opacity = 1;
          }
        }
      ]);
    }
    trayVolElements = get("trayVolElement", { recursive: true });
    volumeBars = get("trayVolBar", { recursive: true });
  }
  function volumeManager() {
    showTween = tween(GameState.settings.volume, GameState.settings.volume, 0, (p) => GameState.settings.volume = p, easings.linear);
    volume(GameState.settings.volume);
    let changeVolTune = 0;
    let waitingTimer = wait(0, function() {
    });
    musicHandler = play("clickRelease", { volume: 0 });
    musicHandler.winding = true;
    musicHandler.currentTime = 0;
    musicHandler.totalTime = 0;
    trayVolElements = get("trayVolElement", { recursive: true });
    let soundManager = add([
      stay(),
      {
        update() {
          GameState.settings.volume = parseFloat(GameState.settings.volume.toFixed(1));
          GameState.settings.sfx.volume = parseFloat(GameState.settings.sfx.volume.toFixed(1));
          GameState.settings.music.volume = parseFloat(GameState.settings.music.volume.toFixed(1));
          volChangeTune = map(GameState.settings.volume, 0, 1, -250, 0);
          if (isKeyPressed("-")) {
            this.trigger("show");
            if (GameState.settings.volume > 0) {
              GameState.settings.volume -= 0.1;
              volume(GameState.settings.volume);
              if (GameState.settings.volume == 0) {
                volumeText.text = "SOUND OFF";
              } else {
                volumeText.text = `VOLUME: ${(GameState.settings.volume * 100).toFixed(0)}%`;
                bop(volumeBars[clamp(Math.floor(GameState.settings.volume * 10 - 1), 0, 10)], 0.05);
              }
              get("trayVolBar", { recursive: true }).forEach((trayVolBar) => {
                trayVolBar.hidden = GameState.settings.volume == 0 ? true : false;
              });
              speaker.hidden = GameState.settings.volume == 0 ? false : true;
              speaker.frame = GameState.settings.volume == 0 ? 0 : 1;
            }
          } else if (isKeyPressed("+")) {
            this.trigger("show");
            get("trayVolBar", { recursive: true }).forEach((trayVolBar) => {
              trayVolBar.hidden = false;
            });
            speaker.hidden = true;
            speaker.frame = 1;
            if (GameState.settings.volume <= 0.9) {
              GameState.settings.volume += 0.1;
              volume(GameState.settings.volume);
            } else {
            }
            bop(volumeBars[clamp(Math.floor(GameState.settings.volume * 10 - 1), 0, 10)], 0.05);
            volumeText.text = `VOLUME: ${(GameState.settings.volume * 100).toFixed(0)}%`;
          } else if (isKeyPressed("n") && panderitoIndex != 3) {
            this.trigger("show");
            manageMute("sfx", !GameState.settings.sfx.muted);
            volumeText.text = `SFX: ${GameState.settings.sfx.muted ? "OFF" : "ON"}`;
            get("trayVolBar", { recursive: true }).forEach((trayVolBar) => {
              trayVolBar.hidden = true;
            });
            speaker.hidden = false;
            speaker.frame = GameState.settings.sfx.muted ? 0 : 1;
            bop(speaker, 0.05);
            if (get("sfxCheckbox", { recursive: true })[0]) {
              if (GameState.settings.sfx.muted)
                get("sfxCheckbox", { recursive: true })[0]?.turnOff();
              else
                get("sfxCheckbox", { recursive: true })[0]?.turnOn();
            }
          } else if (isKeyPressed("m")) {
            this.trigger("show");
            GameState.settings.music.muted = !GameState.settings.music.muted;
            volumeText.text = `MUSIC: ${GameState.settings.music.muted ? "OFF" : "ON"}`;
            get("trayVolBar", { recursive: true }).forEach((trayVolBar) => {
              trayVolBar.hidden = true;
            });
            speaker.hidden = false;
            speaker.frame = GameState.settings.music.muted ? 0 : 1;
            bop(speaker, 0.05);
            if (get("musicCheckbox", { recursive: true })[0]) {
              if (GameState.settings.music.muted)
                get("musicCheckbox", { recursive: true })[0]?.turnOff();
              else
                get("musicCheckbox", { recursive: true })[0]?.turnOn();
            }
            manageMute("music", GameState.settings.music.muted);
          }
        }
      }
    ]);
    soundManager.on("hide", () => {
      if (get("trayVolElement").length === 0)
        return;
      showTween.cancel();
      showTween = tween(bg.pos.y, bg.upYPos, 0.32, (p) => bg.pos.y = p, easings.easeOutQuad).then(() => {
        waitingTimer.cancel();
        waitingTimer = wait(0.5, () => {
          trayVolElements.forEach((soundElement) => {
            destroy(soundElement);
          });
        });
      });
    });
    soundManager.on("show", () => {
      if (get("trayVolElement").length === 0)
        addSoundElements();
      if (showTween) {
        showTween.cancel();
      }
      showTween = tween(bg.pos.y, bg.downYPos, 0.32, (p) => bg.pos.y = p, easings.easeOutQuad);
      waitingTimer.cancel();
      waitingTimer = wait(1, () => {
        soundManager.trigger("hide");
      });
      if (GameState.settings.volume < 10)
        play("volumeChange", { detune: changeVolTune });
    });
    return soundManager;
  }

  // source/game/plugins/confetti.ts
  var DEF_COUNT = 80;
  var DEF_GRAVITY = 800;
  var DEF_AIR_DRAG = 0.9;
  var DEF_VELOCITY = [1e3, 4e3];
  var DEF_ANGULAR_VELOCITY = [-200, 200];
  var DEF_FADE = 0.3;
  var DEF_SPREAD = 60;
  var DEF_SPIN = [2, 8];
  var DEF_SATURATION = 0.7;
  var DEF_LIGHTNESS = 0.6;
  function addConfetti(opt) {
    const sample = (s) => typeof s === "function" ? s() : s;
    for (let i2 = 0; i2 < (opt.count ?? DEF_COUNT); i2++) {
      const p = add([
        pos(sample(opt.pos ?? vec2(0, 0))),
        choose([
          rect(rand(5, 20), rand(5, 20)),
          circle(rand(3, 10))
        ]),
        color(sample(opt.color ?? hsl2rgb(rand(0, 1), DEF_SATURATION, DEF_LIGHTNESS))),
        opacity(1),
        lifespan(4),
        scale(1),
        anchor("center"),
        rotate(rand(0, 360))
      ]);
      const spin = rand(DEF_SPIN[0], DEF_SPIN[1]);
      const gravity = opt.gravity ?? DEF_GRAVITY;
      const airDrag = opt.airDrag ?? DEF_AIR_DRAG;
      const heading = sample(opt.heading ?? 0) - 90;
      const spread = opt.spread ?? DEF_SPREAD;
      const head = heading + rand(-spread / 2, spread / 2);
      const fade = opt.fade ?? DEF_FADE;
      const vel = sample(opt.velocity ?? rand(DEF_VELOCITY[0], DEF_VELOCITY[1]));
      let velX = Math.cos(deg2rad(head)) * vel;
      let velY = Math.sin(deg2rad(head)) * vel;
      const velA = sample(opt.angularVelocity ?? rand(DEF_ANGULAR_VELOCITY[0], DEF_ANGULAR_VELOCITY[1]));
      p.onUpdate(() => {
        velY += gravity * dt();
        p.pos.x += velX * dt();
        p.pos.y += velY * dt();
        p.angle += velA * dt();
        p.opacity -= fade * dt();
        velX *= airDrag;
        velY *= airDrag;
        p.scale.x = wave(-1, 1, time() * spin);
      });
    }
  }

  // source/hoverManaging.ts
  function hoverController(clickIndex = 0, customScale = vec2(1)) {
    let oldestParentWithHover = null;
    return {
      id: "hover",
      clickIndex,
      customHoverScale: customScale,
      add() {
        oldestParentWithHover = this.parent;
      },
      update() {
        if (this.parent == getTreeRoot()) {
          this.clickIndex = clickIndex;
          return;
        }
        while (!oldestParentWithHover || !oldestParentWithHover.is("hover")) {
          oldestParentWithHover = oldestParentWithHover.parent;
        }
        if (oldestParentWithHover.is("hover"))
          this.clickIndex = oldestParentWithHover.clickIndex;
        else
          this.clickIndex = 0;
      }
    };
  }
  function hoverManaging() {
    let hoverObjects = get("hover", { recursive: true });
    onUpdate(() => {
      hoverObjects = get("hover", { recursive: true });
      const draggedObject = hoverObjects.find((obj) => obj.dragging == true);
      if (draggedObject) {
        draggedObject.area.scale = draggedObject.customHoverScale;
        const allOtherObjects = hoverObjects.filter((filtObj) => filtObj != draggedObject);
        allOtherObjects.forEach((obj) => obj.area.scale = vec2(0));
        return;
      }
      if (!hoverObjects.some((obj) => obj.isHovering())) {
        hoverObjects.forEach((obj) => obj.area.scale = obj.customHoverScale);
        return;
      }
      hoverObjects.sort((a, b) => b.clickIndex - a.clickIndex).forEach((curObj, index) => {
        const higherHoveredObject = hoverObjects.find((obj) => obj.clickIndex > curObj.clickIndex && obj.isHovering());
        if (!higherHoveredObject) {
          curObj.area.scale = curObj.customHoverScale;
          return;
        }
        ;
        curObj.area.scale = vec2(0);
      });
    });
  }

  // source/game/windows/store/storeWin.ts
  var storeElements = [];
  var storePitchJuice = {
    hasBoughtRecently: false,
    timeSinceBought: 0,
    storeTune: 0
  };
  var isHoveringUpgrade;
  var clickersElement;
  var cursorsElement;
  var powerupsElement;
  function storeWinContent(winParent) {
    clickersElement = addStoreElement(winParent, { type: "clickersElement", pos: vec2(0, -128) });
    addUpgrades(clickersElement);
    cursorsElement = addStoreElement(winParent, { type: "cursorsElement", pos: vec2(0, clickersElement.pos.y + clickersElement.height + 15) });
    addUpgrades(cursorsElement);
    powerupsElement = addStoreElement(winParent, { type: "powerupsElement", pos: vec2(0, cursorsElement.pos.y + cursorsElement.height + 15) });
    storeElements = [clickersElement, cursorsElement, powerupsElement];
    let firstUpgrade = clickersElement.get("upgrade").filter((upgrade) => upgrade.upgradeId == "k_0")[0];
    winParent.onUpdate(() => {
      if (!winParent.is("window"))
        return;
      if (storePitchJuice.timeSinceBought < 1) {
        storePitchJuice.timeSinceBought += dt();
        if (storePitchJuice.timeSinceBought > 0.25) {
          storePitchJuice.hasBoughtRecently = false;
          storePitchJuice.storeTune = 0;
        }
      }
      isHoveringUpgrade = get("upgrade", { recursive: true }).some((upgrade) => upgrade.isHovering());
      if (GameState.stats.timesAscended < 1) {
        const clickersTutorialTooltip = () => {
          let tooltip = addTooltip(clickersElement, {
            text: "\u2190 You can buy these to get more\nscore per click",
            direction: "right",
            type: "tutorialClickers",
            layer: winParent.layer,
            z: winParent.z
          });
          let buyClickersEvent = ROOT.on("buy", (data) => {
            if (data.type == "clickers") {
              tooltip.end();
              buyClickersEvent.cancel();
            }
          });
        };
        const cursorsTutorialTooltip = () => {
          let tooltip = addTooltip(cursorsElement, {
            text: "\u2190 You can buy these to\nautomatically get score!",
            direction: "right",
            type: "tutorialCursors",
            layer: winParent.layer,
            z: winParent.z
          });
          let buyCursorsEvent = ROOT.on("buy", (data) => {
            if (data.type == "cursors") {
              tooltip.end();
              buyCursorsEvent.cancel();
            }
          });
        };
        const powerupsTutorialTooltip = () => {
          let tooltip = addTooltip(powerupsElement, {
            text: "\u2190 Power-ups give you a small help!\nFor a time limit.",
            direction: "right",
            type: "tutorialPowerups",
            layer: winParent.layer,
            z: winParent.z
          });
          let unlockPowerupsEvent = ROOT.on("powerupunlock", () => {
            tooltip.end();
            unlockPowerupsEvent.cancel();
          });
        };
        const upgradesTutorialTooltip = () => {
          let tooltip = addTooltip(firstUpgrade, {
            text: "\u2190 Upgrades help make your clicks worth!",
            direction: "right",
            type: "tutorialUpgrades",
            layer: winParent.layer,
            z: winParent.z
          });
          let buyFirstUpgradeCheck = ROOT.on("buy", (data) => {
            if (data.element == "upgrade" && data.id == "k_0") {
              tooltip.end();
              buyFirstUpgradeCheck.cancel();
            }
          });
        };
        const getTooltip = (type) => {
          return get("tooltip", { recursive: true }).filter((tooltip) => tooltip.is("text") == false && tooltip.type == type);
        };
        if (GameState.clickers == 1 && GameState.score >= storeElementsInfo.clickersElement.basePrice) {
          if (getTooltip("tutorialClickers").length == 0) {
            clickersTutorialTooltip();
          }
        }
        if (GameState.cursors == 0 && GameState.score >= storeElementsInfo.cursorsElement.basePrice) {
          if (getTooltip("tutorialCursors").length == 0) {
            cursorsTutorialTooltip();
          }
        }
        if (GameState.hasUnlockedPowerups == false && GameState.score >= storeElementsInfo.powerupsElement.unlockPrice) {
          if (getTooltip("tutorialPowerups").length == 0) {
            powerupsTutorialTooltip();
          }
        }
        if (!isUpgradeBought("k_0") && GameState.score >= firstUpgrade.price) {
          if (getTooltip("tutorialUpgrades").length == 0) {
            upgradesTutorialTooltip();
          }
        }
      }
    });
    winParent.on("close", () => {
      winParent.get("*", { recursive: true }).forEach((element) => {
        if (element.endHover)
          element.endHover();
      });
      let tooltips = get("tooltip").filter((tooltip) => tooltip.type != void 0);
      tooltips = tooltips.filter((obj) => obj.type.includes("tutorial") || obj.type.includes("price") || obj.type.includes("store"));
      tooltips.forEach((tooltip) => {
        tooltip.end();
      });
    });
    if (chance(0.01)) {
      winParent.sprite = "stroeWin";
    }
  }

  // source/game/windows/store/storeElements.ts
  var storeElementsInfo = {
    "clickersElement": {
      gamestateKey: "clickers",
      basePrice: 25,
      percentageIncrease: 15
    },
    "cursorsElement": {
      gamestateKey: "cursors",
      basePrice: 50,
      percentageIncrease: 20
    },
    "powerupsElement": {
      gamestateKey: "stats.powerupsBoughtThisRun",
      basePrice: 50500,
      percentageIncrease: 110,
      unlockPrice: 10500
    }
  };
  function priceAscensionMultiplier(basePrice, percentage3) {
    return basePrice + basePrice * (percentage3 * 1.5) * GameState.stats.timesAscended;
  }
  function addSmoke(winParent, btn) {
    let smoke = winParent.add([
      sprite("smoke"),
      pos(btn.pos.x - btn.width / 2, btn.pos.y - btn.height / 2),
      opacity(),
      anchor("center"),
      z(btn.z - 1),
      "smoke"
    ]);
    smoke.fadeIn(1);
    smoke.play("smoking");
    return smoke;
  }
  function isThereSmoke() {
    return get("smoke", { recursive: true }) ?? true;
  }
  function regularStoreElement(winParent) {
    let thisElement = null;
    let timer2 = 0;
    let minTime = 0.08;
    let timeUntilAnotherBuy = 1.2;
    let maxTime = 1.2;
    let hold_timesBought = 0;
    let downEvent = null;
    return {
      add() {
        thisElement = this;
        thisElement.onMousePress("left", () => {
          if (thisElement.isBeingHovered == false)
            return;
          if (!winParent.active)
            return;
          if (isHoveringUpgrade)
            return;
          if (!thisElement.isHovering())
            return;
          if (GameState.score < thisElement.price) {
            thisElement.trigger("notEnoughMoney");
            return;
          }
          downEvent = thisElement.onMouseDown(() => {
            thisElement.isBeingClicked = true;
            if (GameState.score < thisElement.price)
              return;
            if (hold_timesBought == 0) {
              timeUntilAnotherBuy = maxTime;
            }
            timer2 += dt();
            timeUntilAnotherBuy = maxTime / hold_timesBought;
            timeUntilAnotherBuy = clamp(timeUntilAnotherBuy, minTime, maxTime);
            if (hold_timesBought == 0) {
              hold_timesBought = 1;
              thisElement.buy(amountToBuy);
            }
            if (timer2 > timeUntilAnotherBuy) {
              timer2 = 0;
              hold_timesBought++;
              thisElement.buy(amountToBuy);
              this.timesBoughtConsecutively++;
            }
          });
        });
        thisElement.onMouseRelease(() => {
          if (!winParent.active)
            return;
          downEvent?.cancel();
          downEvent = null;
          if (!thisElement.isHovering())
            return;
          thisElement.isBeingClicked = false;
          timer2 = 0;
          hold_timesBought = 0;
          timeUntilAnotherBuy = 2.25;
        });
        thisElement.on("endHover", () => {
          timer2 = 0;
          hold_timesBought = 0;
        });
      }
    };
  }
  function lockedPowerupStoreElement(winParent) {
    let thisElement = null;
    let progressSound = null;
    const unlockPrice = storeElementsInfo.powerupsElement.unlockPrice;
    return {
      id: "lockedPowerupStoreElement",
      chains: null,
      boughtProgress: 0,
      dropUnlock() {
        tween(thisElement.boughtProgress, 0, 0.15, (p) => thisElement.boughtProgress = p);
        tween(this.scale, vec2(1.025), 0.15, (p) => this.scale = p, easings.easeOutQuad);
        tween(thisElement.chains.opacity, 1, 0.15, (p) => thisElement.chains.opacity = p, easings.easeOutQuad);
      },
      add() {
        thisElement = this;
        thisElement.chains = thisElement.add([
          sprite("chains"),
          pos(),
          anchor("center"),
          opacity(1)
        ]);
        thisElement.onDraw(() => {
          drawRect({
            width: thisElement.width,
            height: map(thisElement.boughtProgress, 0, 100, thisElement.height, 0),
            anchor: "bot",
            color: BLACK,
            pos: vec2(0, thisElement.height / 2),
            radius: 5,
            opacity: 0.8
          });
        });
        let downEvent = null;
        thisElement.onMousePress("left", () => {
          if (thisElement.isBeingHovered == false)
            return;
          if (!winParent.active)
            return;
          downEvent?.cancel();
          if (!thisElement.isHovering())
            return;
          if (GameState.score < thisElement.price) {
            thisElement.trigger("notEnoughMoney");
            return;
          }
          progressSound = playSfx("progress");
          downEvent = thisElement.onMouseDown("left", () => {
            if (thisElement.isBeingHovered == false)
              return;
            if (thisElement.boughtProgress < 100) {
              thisElement.boughtProgress += 1.5;
              thisElement.scale.x = map(thisElement.boughtProgress, 0, 100, 1.025, 0.9);
              thisElement.scale.y = map(thisElement.boughtProgress, 0, 100, 1.025, 0.9);
              thisElement.chains.opacity = map(thisElement.boughtProgress, 0, 100, 1, 0.25);
              progressSound.detune = thisElement.boughtProgress * 1.1;
            }
            if (thisElement.boughtProgress >= 100 && !GameState.hasUnlockedPowerups) {
              thisElement.unlock();
            }
          });
        });
        thisElement.onMouseRelease("left", () => {
          if (!winParent.active)
            return;
          if (!thisElement.isHovering())
            return;
          thisElement.dropUnlock();
          if (thisElement.boughtProgress > 0) {
          } else {
            if (GameState.score >= this.price)
              bop(thisElement);
          }
          progressSound?.seek(1);
        });
      },
      unlock() {
        GameState.hasUnlockedPowerups = true;
        playSfx("kaching");
        playSfx("chainbreak");
        let copyOfOld = thisElement;
        thisElement.destroy();
        let newElement = addStoreElement(winParent, { type: "powerupsElement", pos: thisElement.pos });
        let index = storeElements.indexOf(copyOfOld);
        if (index > -1)
          storeElements[index] = newElement;
        ROOT.trigger("powerupunlock");
        scoreManager.subTweenScore(unlockPrice);
      }
    };
  }
  var buyTimer = null;
  var amountToBuy = 1;
  function addStoreElement(winParent, opts) {
    const btn = winParent.add([
      sprite(opts.type),
      pos(opts.pos),
      area(),
      color(),
      opacity(1),
      scale(1),
      anchor("center"),
      z(winParent.z + 1),
      hoverController(),
      "storeElement",
      `${opts.type}`,
      {
        price: 0,
        isBeingClicked: false,
        down: false,
        timesBoughtConsecutively: 0,
        buy(amount) {
          if (winParent.dragging)
            return;
          GameState[storeElementsInfo[opts.type].gamestateKey] += amount;
          storePitchJuice.hasBoughtRecently = true;
          storePitchJuice.timeSinceBought = 0;
          if (storePitchJuice.hasBoughtRecently == true)
            storePitchJuice.storeTune += 25;
          storePitchJuice.storeTune = clamp(storePitchJuice.storeTune, -100, 500);
          playSfx("kaching", { detune: storePitchJuice.storeTune });
          scoreManager.subTweenScore(this.price);
          if (this.isBeingClicked) {
            this.play("down");
            this.get("*").forEach((element) => {
              element.pos.y += 2;
            });
            wait(0.15, () => {
              this.play("up");
              this.get("*").forEach((element) => {
                element.pos.y -= 2;
              });
            });
          }
          this.timesBoughtConsecutively++;
          buyTimer?.cancel();
          buyTimer = wait(0.75, () => {
            this.timesBoughtConsecutively = 0;
            let smoke = get("smoke", { recursive: true })[0];
            if (smoke) {
              smoke.unuse("smoke");
              smoke.fadeOut(1);
              tween(smoke.pos.y, smoke.pos.y - 15, 0.5, (p) => smoke.pos.y = p);
            }
          });
          if (this.timesBoughtConsecutively >= 5 && !isThereSmoke()) {
            addSmoke(winParent, this);
          }
          ROOT.trigger("buy", { element: "storeElement", type: opts.type == "clickersElement" ? "clickers" : "cursors", price: this.price });
          if (opts.type == "powerupsElement") {
            spawnPowerup({
              type: "random",
              pos: randomPos(),
              natural: false
            });
            GameState.stats.powerupsBought++;
            GameState.stats.powerupsBoughtThisRun++;
          }
          if (this.timesBoughtConsecutively >= 10 && !isAchievementUnlocked("store.stuffBought_10"))
            unlockAchievement("store.stuffBought_10");
          this.trigger("buy");
        }
      }
    ]);
    let tooltip = null;
    if (opts.type == "powerupsElement" && GameState.hasUnlockedPowerups == false) {
      btn.use(lockedPowerupStoreElement(winParent));
      tooltip = addTooltip(btn, {
        text: `${formatNumber(btn.price, { price: true })}`,
        direction: "down",
        lerpValue: 1,
        layer: winParent.layer,
        z: winParent.z,
        type: "store"
      });
      const greenPrice = GREEN.lighten(30);
      const redPrice = RED.lighten(30);
      tooltip.tooltipText.onUpdate(() => {
        if (GameState.score >= storeElementsInfo.powerupsElement.unlockPrice)
          tooltip.tooltipText.color = greenPrice;
        else
          tooltip.tooltipText.color = redPrice;
        tooltip.tooltipText.text = formatNumber(btn.price, { price: true });
      });
    } else
      btn.use(regularStoreElement(winParent));
    btn.onUpdate(() => {
      if (isKeyDown("shift"))
        amountToBuy = 10;
      else
        amountToBuy = 1;
      if (opts.type == "powerupsElement" && GameState.hasUnlockedPowerups == false) {
        btn.price = priceAscensionMultiplier(storeElementsInfo.powerupsElement.unlockPrice, storeElementsInfo.powerupsElement.percentageIncrease / 100);
      } else {
        const amountBought = getVariable(GameState, storeElementsInfo[opts.type].gamestateKey);
        let priceMultiplier = 1;
        if (opts.type != "powerupsElement")
          priceMultiplier = powerupTypes.store.multiplier;
        const elementInfo = storeElementsInfo[opts.type];
        btn.price = getPrice({
          basePrice: priceAscensionMultiplier(elementInfo.basePrice, elementInfo.percentageIncrease / 100),
          percentageIncrease: elementInfo.percentageIncrease,
          objectAmount: amountBought,
          amountToBuy: opts.type == "powerupsElement" ? 1 : amountToBuy,
          gifted: opts.type == "clickersElement" ? 1 : 0
        }) * priceMultiplier;
      }
    });
    btn.onUpdate(() => {
      if (btn.isHovering()) {
        btn.scale = lerp(btn.scale, vec2(1.025), 0.25);
      } else {
        btn.scale = lerp(btn.scale, vec2(1), 0.25);
        if (btn.isBeingClicked == true)
          btn.isBeingClicked = false;
      }
    });
    let stacksText = btn.add([
      text("Stacked upgrades: 0", {
        size: 14,
        align: "left"
      }),
      anchor("left"),
      pos(-155, 24),
      color(BLACK),
      z(btn.z + 1),
      "stacksText",
      {
        update() {
          if (opts.type == "clickersElement") {
            let percentage3 = `(+${GameState.clickPercentage}%)`;
            let stuff = [
              `Stacked upgrades: ${GameState.clicksUpgradesValue == 1 ? GameState.clicksUpgradesValue - 1 : GameState.clicksUpgradesValue}`,
              `${GameState.clickPercentage < 1 ? "" : percentage3}`
            ];
            this.text = stuff.join(" ");
          } else if (opts.type == "cursorsElement") {
            let percentage3 = `(+${GameState.cursorsPercentage}%)`;
            let stuff = [
              `Stacked upgrades: ${GameState.cursorsUpgradesValue == 1 ? GameState.cursorsUpgradesValue - 1 : GameState.cursorsUpgradesValue}`,
              `${GameState.clickPercentage < 1 ? "" : percentage3}`
            ];
            this.text = stuff.join(" ");
          } else if (opts.type == "powerupsElement")
            this.destroy();
        }
      }
    ]);
    let priceText = btn.add([
      text("$50", {
        size: 18,
        align: "center"
      }),
      anchor("center"),
      pos(-100, stacksText.pos.y + 15),
      color(BLACK),
      rotate(0),
      z(btn.z + 1),
      {
        update() {
          this.text = `${formatNumber(Math.round(btn.price), { price: true, fixAmount: 2 })}`;
          if (GameState.score >= btn.price)
            this.color = GREEN;
          else
            this.color = RED;
          if (opts.type == "powerupsElement") {
            if (GameState.hasUnlockedPowerups == false)
              this.destroy();
            else
              this.pos = vec2(-5, 41);
          }
        }
      }
    ]);
    let amountText = btn.add([
      text("x1", {
        size: 18,
        align: "left"
      }),
      anchor("center"),
      pos(-159, -52),
      color(BLACK),
      opacity(0.25),
      z(btn.z + 1),
      {
        update() {
          this.text = "x" + amountToBuy;
          if (amountToBuy == 10)
            this.opacity = 0.45;
          else
            this.opacity = 0.252;
          if (opts.type == "powerupsElement")
            this.destroy();
        }
      }
    ]);
    if (opts.type == "powerupsElement") {
      let powerupText = btn.add([
        text("x1", {
          size: 18,
          align: "left"
        }),
        anchor("center"),
        pos(-139, -52),
        color(BLACK),
        opacity(0.45),
        z(btn.z + 1),
        {
          update() {
            if (GameState.hasUnlockedPowerups == false)
              this.destroy();
            GameState.powerupPower = parseFloat(GameState.powerupPower.toFixed(1));
            this.text = `Power: ${GameState.powerupPower}x`;
          }
        }
      ]);
    }
    btn.on("notEnoughMoney", () => {
      const direction = getRandomDirection(opts.pos, false, 1.25);
      tween(direction, opts.pos, 0.25, (p) => btn.pos = p, easings.easeOutQuint);
      if (btn.is("lockedPowerupStoreElement")) {
        tween(choose([-15, 15]), 0, 0.25, (p) => tooltip.tooltipText.angle = p, easings.easeOutQuint);
        playSfx("chainwrong", { detune: rand(-50, 50) });
      } else {
        tween(choose([-15, 15]), 0, 0.25, (p) => priceText.angle = p, easings.easeOutQuint);
      }
      playSfx("wrong", { detune: rand(-50, 50) });
    });
    btn.on("buy", () => {
    });
    return btn;
  }

  // source/game/windows/store/upgrades.ts
  var tooltipLerp = 0.65;
  var upgradeInfo = {
    "k_0": { value: 2, price: 500 },
    "k_1": { value: 4, price: 5e3 },
    "k_2": { value: 8, price: 1e4 },
    // ending
    "k_3": { value: 16, price: 15e4 },
    "k_4": { value: 32, price: 6e5 },
    "k_5": { value: 64, price: 75e4 },
    // freq
    "c_0": { freq: 10 },
    // 10 seconds
    "c_1": { freq: 5, price: 25e4 },
    // 5 seconds
    "c_2": { freq: 1, price: 5e5 },
    // 1 second
    // cursor values
    "c_3": { value: 16, price: 5e4 },
    "c_4": { value: 32, price: 1e5 },
    "c_5": { value: 64, price: 5e5 }
  };
  function isUpgradeBought(upgradeId) {
    return GameState.upgradesBought.includes(upgradeId);
  }
  function addUpgrades(elementParent) {
    let winParent = elementParent.parent;
    let initialPos2 = vec2(-27.5, -31.5);
    let desiredPos = vec2(initialPos2.x, initialPos2.y);
    let spacing2 = vec2(55);
    for (let i2 = 0; i2 < 6; i2++) {
      if (i2 == 3) {
        desiredPos.y += spacing2.y;
        desiredPos.x = initialPos2.x;
      }
      desiredPos.x += spacing2.x;
      let progressSound = null;
      let downEvent = null;
      let elementColor = elementParent.is("clickersElement") ? rgb(0, 84, 136) : rgb(49, 222, 58);
      let newColor = blendColors(elementColor.lighten(310), elementColor, map(i2, 0, 6, 0.5, 1));
      let upgradeObj = elementParent.add([
        sprite("upgrade"),
        pos(desiredPos),
        color(newColor),
        anchor("center"),
        scale(1),
        rotate(0),
        z(winParent.z + 1),
        area({ scale: vec2(1.15, 1.15) }),
        outline(5, BLACK),
        hoverController(),
        "upgrade",
        {
          type: elementParent.is("clickersElement") ? "k_" : "c_",
          idx: i2,
          // is setted below
          value: null,
          freq: null,
          upgradeId: "",
          price: 0,
          tooltip: null,
          boughtProgress: 0,
          manageBlinkText(texty = "missing a text there buddy") {
            let thisUpgrade = this;
            function addT() {
              let stacksText = thisUpgrade.parent.get("stacksText")[0];
              let blinkingText = elementParent.add([
                text("+0", { align: "left", size: stacksText.textSize + 4 }),
                pos(),
                color(BLACK),
                anchor("left"),
                layer("windows"),
                opacity(),
                "blinkText",
                {
                  upgradeId: thisUpgrade.upgradeId,
                  update() {
                    this.text = texty;
                    this.opacity = wave(0.25, 1, time() * 8);
                  }
                }
              ]);
              if (thisUpgrade.freq == null) {
                blinkingText.pos.x = -56;
                blinkingText.pos.y = stacksText.pos.y - 15;
              } else {
                blinkingText.pos.x = -56;
                blinkingText.pos.y = 56;
              }
            }
            function end() {
              elementParent.get("blinkText", { recursive: true }).filter((t18) => t18.upgradeId == thisUpgrade.upgradeId).forEach((t18) => t18.destroy());
            }
            return { addT, end };
          },
          dropBuy() {
            tween(this.scale, this.isHovering() ? vec2(1.1) : vec2(1), 0.15, (p) => this.scale = p, easings.easeOutQuad);
            tween(this.boughtProgress, 0, 0.15, (p) => this.boughtProgress = p, easings.easeOutQuad);
            this.trigger("dropBuy");
            downEvent?.cancel();
            downEvent = null;
          },
          buy() {
            this.tooltip?.end();
            GameState.upgradesBought.push(this.upgradeId);
            playSfx("kaching", { detune: 25 * this.idx });
            tween(this.scale, vec2(1.1), 0.15, (p) => this.scale = p, easings.easeOutQuad);
            if (this.type == "k_") {
              if (GameState.clicksUpgradesValue == 1)
                GameState.clicksUpgradesValue += this.value - 1;
              else
                GameState.clicksUpgradesValue += this.value;
            } else if (this.type == "c_") {
              if (this.value != null) {
                if (GameState.cursorsUpgradesValue == 1)
                  GameState.cursorsUpgradesValue += this.value - 1;
                else
                  GameState.cursorsUpgradesValue += this.value;
              } else if (this.freq != null)
                GameState.timeUntilAutoLoopEnds = this.freq;
            }
            scoreManager.subTweenScore(this.price);
            ROOT.trigger("buy", { element: "upgrade", upgradeId: this.upgradeId, price: this.price });
            this.trigger("buy");
          },
          draw() {
            drawText({
              text: this.freq != null ? `${this.freq}s` : `x${this.value}`,
              anchor: "center",
              font: "lambda",
              size: this.height / 2,
              align: "center"
            });
            if (isUpgradeBought(upgradeObj.upgradeId))
              return;
            drawRect({
              width: this.width,
              height: map(this.boughtProgress, 0, 100, this.height, 0),
              anchor: "bot",
              radius: 10,
              color: BLACK,
              opacity: map(this.boughtProgress, 0, 100, 0.5, 0.05),
              pos: vec2(0, this.height / 2)
            });
            drawSprite({
              sprite: "upgradelock",
              pos: vec2(upgradeObj.width / 2, -upgradeObj.height / 2 + 5),
              anchor: "center",
              scale: vec2(0.7),
              color: GameState.score >= this.price ? GREEN.lighten(100) : RED.lighten(100),
              opacity: map(this.boughtProgress, 0, 100, 1, 0.1)
            });
          },
          inspect() {
            return `upgradeId: ${this.upgradeId}`;
          }
        }
      ]);
      const addedPosition = upgradeObj.pos;
      upgradeObj.upgradeId = upgradeObj.type + upgradeObj.idx;
      const upgradePrice = upgradeInfo[upgradeObj.upgradeId].price;
      upgradeObj.price = priceAscensionMultiplier(upgradePrice, 0.15);
      if (upgradeObj.type == "k_")
        upgradeObj.value = upgradeInfo[upgradeObj.upgradeId].value;
      else if (upgradeObj.type == "c_") {
        if (upgradeObj.idx > -1 && upgradeObj.idx < 3)
          upgradeObj.freq = upgradeInfo[upgradeObj.upgradeId].freq;
        else
          upgradeObj.value = upgradeInfo[upgradeObj.upgradeId].value;
      }
      upgradeObj.outline.color = upgradeObj.color.darken(10);
      let upgradeTooltip = null;
      const addPriceTooltip = () => {
        let tooltip = addTooltip(upgradeObj, {
          text: `${formatNumber(upgradeObj.price, { price: true, fixAmount: 0 })}`,
          textSize: upgradeObj.height / 2,
          direction: "down",
          lerpValue: tooltipLerp,
          type: "price",
          layer: winParent.layer,
          z: winParent.z
        });
        tooltip.tooltipText.onUpdate(() => {
          GameState.score >= upgradeObj.price ? tooltip.tooltipText.color = GREEN : tooltip.tooltipText.color = RED;
        });
        tooltip.tooltipBg.z += 1;
        return tooltip;
      };
      upgradeObj.onUpdate(() => {
        if (upgradeObj.isHovering()) {
          upgradeObj.parent.opacity = lerp(upgradeObj.parent.opacity, 0.5, 0.15);
          upgradeObj.parent.scale = lerp(upgradeObj.parent.scale, vec2(1), 0.15);
        } else {
          upgradeObj.parent.opacity = lerp(upgradeObj.parent.opacity, 1, 0.15);
        }
      });
      upgradeObj.onHover(() => {
        let textInBlink = upgradeObj.value != null ? `+${upgradeObj.value}` : `Clicks every ${upgradeObj.freq} ${upgradeObj.freq > 1 ? "seconds" : "second"}`;
        if (!isUpgradeBought(upgradeObj.upgradeId)) {
          if (upgradeObj.tooltip == null) {
            upgradeTooltip = addPriceTooltip();
            upgradeObj.manageBlinkText(textInBlink).addT();
          }
        }
      });
      upgradeObj.onHoverEnd(() => {
        if (upgradeObj.tooltip != null) {
          upgradeObj.tooltip?.end();
          upgradeObj.manageBlinkText().end();
        }
        if (!isUpgradeBought(upgradeObj.upgradeId) && upgradeObj.boughtProgress > 0 && GameState.score >= upgradeObj.price) {
          upgradeObj.dropBuy();
        }
      });
      upgradeObj.onClick(() => {
        if (!winParent.active)
          return;
        if (isUpgradeBought(upgradeObj.upgradeId)) {
          bop(upgradeObj);
          upgradeObj.trigger("dummyClick");
          let sillyParticle = elementParent.add([
            sprite("cursors"),
            opacity(),
            pos(upgradeObj.pos.x, upgradeObj.pos.y - upgradeObj.height / 2 + 5),
            anchor("center"),
            z(upgradeObj.z - 1),
            scale(rand(0.25, 0.5)),
            {
              update() {
                this.pos.y -= 1.5;
                this.pos.x = wave(upgradeObj.pos.x - 5, upgradeObj.pos.x + 5, time() * 5);
                if (this.pos.y < getPositionOfSide(upgradeObj).top)
                  this.z = upgradeObj.z + 1;
                else
                  this.z = upgradeObj.z - 1;
              }
            }
          ]);
          sillyParticle.fadeIn(0.1).onEnd(() => sillyParticle.fadeOut(0.25).onEnd(() => sillyParticle.destroy()));
          if (upgradeObj.type == "k_")
            parseAnimation(sillyParticle, "cursors.cursor");
          else if (upgradeObj.type == "c_")
            parseAnimation(sillyParticle, "cursors.point");
          return;
        } else {
          if (upgradeObj.upgradeId == "c_2" && !isUpgradeBought("c_1")) {
            upgradeObj.tooltip.end();
            addTooltip(upgradeObj, {
              text: "You have to buy the previous one",
              textSize: upgradeObj.height / 2,
              direction: "down",
              lerpValue: tooltipLerp,
              type: "store",
              layer: winParent.layer,
              z: winParent.z
            });
            upgradeObj.trigger("dummyClick");
            return;
          } else if (GameState.score < upgradeObj.price) {
            upgradeObj.trigger("notEnoughMoney");
            return;
          } else if (GameState.score >= upgradeObj.price) {
            progressSound?.stop();
            progressSound = playSfx("progress");
            downEvent = upgradeObj.onMouseDown(() => {
              if (isUpgradeBought(upgradeObj.upgradeId))
                return;
              if (upgradeObj.boughtProgress >= 5) {
                if (upgradeObj.tooltip.type == "storeholddowntobuy") {
                  upgradeObj.tooltip.end();
                  addPriceTooltip();
                  progressSound?.stop();
                  progressSound = playSfx("progress", { detune: upgradeObj.boughtProgress });
                }
              }
              if (upgradeObj.boughtProgress < 100) {
                upgradeObj.boughtProgress += 2;
                upgradeObj.scale.x = map(upgradeObj.boughtProgress, 0, 100, 1.1, 0.85);
                upgradeObj.scale.y = map(upgradeObj.boughtProgress, 0, 100, 1.1, 0.85);
                progressSound.detune = upgradeObj.boughtProgress * upgradeObj.idx / 2 + 1;
              }
              if (upgradeObj.boughtProgress >= 100) {
                upgradeObj.buy();
                upgradeObj.manageBlinkText().end();
              }
            });
          }
        }
      });
      upgradeObj.onMouseRelease(() => {
        if (!winParent.active)
          return;
        if (isUpgradeBought(upgradeObj.upgradeId))
          return;
        if (!upgradeObj.isHovering())
          return;
        upgradeObj.dropBuy();
        if (GameState.score >= upgradeObj.price) {
          if (upgradeObj.boughtProgress < 1) {
            upgradeObj.tooltip?.end();
            let tutorialTooltip = addTooltip(upgradeObj, {
              text: "Hold down to buy!",
              lerpValue: tooltipLerp,
              type: "storeholddowntobuy",
              direction: "down"
            });
          }
          upgradeObj.trigger("dummyClick");
        }
      });
      upgradeObj.on("notEnoughMoney", () => {
        const direction = getRandomDirection(addedPosition, false, 1.25);
        tween(direction, addedPosition, 0.25, (p) => upgradeObj.pos = p, easings.easeOutQuint);
        tween(choose([-15, 15]), 0, 0.25, (p) => upgradeTooltip.tooltipText.angle = p, easings.easeOutQuint);
        playSfx("wrong", { detune: rand(25, 75) });
      });
      upgradeObj.on("dropBuy", () => {
        if (progressSound != null || progressSound != void 0) {
          tween(progressSound.volume, 0, 0.35, (p) => progressSound.volume = p).onEnd(() => {
            progressSound.stop();
          });
          sfxHandlers.delete(progressSound);
        }
      });
      upgradeObj.on("dummyClick", () => {
        tween(choose([-15, 15]), 0, 0.15, (p) => upgradeObj.angle = p, easings.easeOutQuint);
        playSfx("clickButton", { detune: rand(-25, 25) });
      });
      let drawShadow = elementParent.onDraw(() => {
        drawSprite({
          sprite: upgradeObj.sprite,
          opacity: 0.25,
          pos: vec2(upgradeObj.pos.x, upgradeObj.pos.y + 2),
          anchor: upgradeObj.anchor,
          color: BLACK
        });
      });
    }
  }

  // source/game/windows/musicWindow.ts
  var songs = {
    "clicker.wav": { name: "clicker.wav", idx: 0, speed: 2.5, cover: "wav", duration: 61 },
    "menu.wav": { name: "menu.wav", idx: 1, speed: 1.6, cover: "wav", duration: 36 },
    "whatttt.wav": { name: "whatttt.wav", idx: 2, speed: 2, cover: "wav", duration: 51 },
    "simple.wav": { name: "simple.wav", idx: 3, speed: 1.3, cover: "wav", duration: 99 },
    "jazz.wav": { name: "jazz.wav", idx: 4, speed: 2.1, cover: "wav", duration: 43 },
    "sweet.wav": { name: "sweet.wav", idx: 5, speed: 2.5, cover: "wav", duration: 46 },
    "ok_instrumental": { name: "ok (Inst)", idx: 6, speed: 2, cover: "ok", duration: 102 },
    "magic": { name: "magic.", idx: 7, speed: 1, cover: "bb1", duration: 46 },
    "watchout": { name: "Watch out!", idx: 8, speed: 2.4, cover: "bb2", duration: 49 },
    "catnip": { name: "catnip", idx: 9, speed: 2.1, cover: "cat", duration: 67 },
    "project_23": { name: "Project_23", idx: 10, speed: 2.1, cover: "bb3", duration: 45 }
  };
  var songsListened = [];
  var currentSongIdx = 0;
  var progressBar;
  var timeText;
  var timeSinceSkip = 0;
  var skipping = false;
  function setTimeSinceSkip(value = 0) {
    timeSinceSkip = value;
  }
  var angleOfDisc = 0;
  function musicWinContent(winParent) {
    currentSongIdx = GameState.settings.music.favoriteIdx == null ? 0 : GameState.settings.music.favoriteIdx;
    let currentSong = songs[Object.keys(songs)[currentSongIdx]];
    function checkForSongListen(songIdx) {
      if (songsListened.includes(songIdx) == false)
        songsListened.push(songIdx);
      checkForUnlockable();
    }
    if (!isAchievementUnlocked("allsongs")) {
      checkForSongListen(currentSongIdx);
    }
    let disc = winParent.add([
      sprite("musicDisc"),
      // sprite("discs", {
      // 	anim: `${songs[Object.keys(songs)[currentSongIdx]].cover}`
      // }),
      pos(-152, -17),
      rotate(angleOfDisc),
      anchor("center"),
      scale(1),
      area(),
      hoverController(),
      "pauseButton",
      "musicButton",
      "windowButton",
      {
        verPosition: -20,
        spinSpeed: musicHandler.paused ? 0 : songs[Object.keys(songs)[currentSongIdx]].speed,
        update() {
          if (musicHandler.winding || skipping)
            return;
          this.angle += this.spinSpeed;
          if (Math.floor(this.angle) % 360 == 0)
            this.angle = 0;
        }
      }
    ]);
    let titleText = winParent.add([
      pos(-114, -14),
      text(Object.keys(songs)[0], {
        size: 28
      }),
      anchor("left"),
      {
        update() {
          let theText = `${songs[Object.keys(songs)[currentSongIdx]].idx + 1}. ${songs[Object.keys(songs)[currentSongIdx]].name}`;
          this.text = theText;
        }
      }
    ]);
    let mutedButton = winParent.add([
      sprite("mutedButton"),
      pos(172, -30),
      area(),
      hoverController(),
      anchor("center"),
      scale(),
      {
        update() {
          if (GameState.settings.music.muted) {
            this.hidden = false;
            if (isMousePressed("left") && this.isHovering()) {
              bop(this);
              manageMute("music", false);
            }
          } else {
            this.hidden = true;
          }
        }
      }
    ]);
    let theOneBehind = winParent.add([
      rect(winParent.width - 50, 10, { radius: 2.5 }),
      pos(0, 25),
      area(),
      color(),
      area({ scale: vec2(1, 1.25) }),
      opacity(1),
      hoverController(),
      anchor("center"),
      {
        update() {
          this.color = progressBar.color.darken(150);
        }
      }
    ]);
    timeText = winParent.add([
      text("0:00", {
        size: 25
      }),
      pos(-120, 50),
      anchor("center"),
      {
        verPosition: 50,
        update() {
          if (!musicHandler.winding)
            musicHandler.currentTime = map(progressBar.width, 0, theOneBehind.width, 0, musicHandler.duration());
          if (!musicHandler.winding)
            musicHandler.totalTime = songs[Object.keys(songs)[currentSongIdx]].duration;
          let theText = `${formatTime(musicHandler.currentTime, false)}/${formatTime(musicHandler.totalTime === void 0 ? musicHandler.duration() : musicHandler.totalTime, false)}`;
          this.text = theText;
        }
      }
    ]);
    progressBar = winParent.add([
      rect(1, 10, { radius: theOneBehind.radius }),
      pos(theOneBehind.pos.x - theOneBehind.width / 2, theOneBehind.pos.y),
      color(WHITE),
      anchor("left"),
      {
        update() {
          if (musicHandler.winding)
            return;
          let intendedWidth = musicHandler.time() / musicHandler.duration() * theOneBehind.width;
          this.width = lerp(this.width, intendedWidth, 0.6);
        },
        draw() {
          drawSprite({
            pos: vec2(this.width, 0),
            sprite: "hexColorHandle",
            // recycling is good for the planet
            scale: vec2(0.5),
            color: this.color,
            anchor: "center",
            opacity: this.opacity
          });
        }
      }
    ]);
    let backButton = winParent.add([
      sprite("musicWinButtons", { anim: "back" }),
      pos(-30, 60),
      area(),
      scale(),
      hoverController(),
      anchor("center"),
      "musicButton",
      "windowButton",
      "backButton"
    ]);
    let pauseButton = winParent.add([
      sprite("musicWinButtons", { anim: "pause" }),
      pos(15, 60),
      area(),
      scale(),
      hoverController(),
      anchor("center"),
      "musicButton",
      "windowButton",
      "pauseButton"
    ]);
    let skipButton = winParent.add([
      sprite("musicWinButtons", { anim: "skip" }),
      pos(60, 60),
      area(),
      hoverController(),
      scale(),
      anchor("center"),
      "musicButton",
      "windowButton",
      "skipButton"
    ]);
    function backButtonAction() {
      if (musicHandler.currentTime > 2) {
        musicHandler.seek(0);
        musicHandler.winding = true;
      } else {
        currentSongIdx--;
        if (currentSongIdx < 0)
          currentSongIdx = Object.keys(songs).length - 1;
        currentSong = songs[Object.keys(songs)[currentSongIdx]];
      }
      playSfx("clickButton", { detune: rand(-150, 50) });
      bop(backButton);
    }
    function skipButtonAction() {
      currentSongIdx++;
      if (currentSongIdx >= Object.keys(songs).length)
        currentSongIdx = 0;
      currentSong = songs[Object.keys(songs)[currentSongIdx]];
      playSfx("clickButton", { detune: rand(-50, 150) });
      bop(skipButton);
    }
    function pauseButtonAction(pause) {
      if (musicHandler.winding)
        return;
      pause = pause || !musicHandler.paused;
      musicHandler.paused = pause;
      GameState.settings.music.paused = musicHandler.paused;
      if (musicHandler.paused == true)
        pauseButton.play("play");
      else
        pauseButton.play("pause");
      get("bpmChange", { recursive: true }).forEach((bpmChange) => {
        musicHandler.paused ? bpmChange.stopWave() : bpmChange.startWave();
      });
      tween(disc.spinSpeed, musicHandler.paused ? 0 : songs[Object.keys(songs)[currentSongIdx]].speed, 1, (p) => disc.spinSpeed = p, easings.easeOutQuint);
      playSfx("clickButton", { detune: rand(-100, 100) });
      bop(pauseButton);
    }
    function generalBackSkipButtonAction(action) {
      if (musicHandler.paused)
        pauseButtonAction(false);
      if (skipping == false) {
        skipping = true;
        get("bpmChange", { recursive: true }).forEach((element) => {
          element.stopWave();
        });
      }
      scratchSong();
      tween(progressBar.width, 0, 0.5, (p) => progressBar.width = p, easings.easeOutQuint);
      musicHandler.currentTime = musicHandler.time();
      musicHandler.totalTime = musicHandler.duration();
      tween(musicHandler.currentTime, 0, 0.5, (p) => musicHandler.currentTime = p, easings.easeOutQuint);
      tween(musicHandler.totalTime, songs[Object.keys(songs)[currentSongIdx]].duration, 0.5, (p) => musicHandler.totalTime = p, easings.easeOutQuint);
      let idxOfNewSong = action == 0 ? currentSongIdx + 1 : currentSongIdx - 1;
      if (idxOfNewSong < 0)
        idxOfNewSong = Object.keys(songs).length - 1;
      if (idxOfNewSong >= Object.keys(songs).length)
        idxOfNewSong = 0;
      if (songs[Object.keys(songs)[idxOfNewSong]].cover != songs[Object.keys(songs)[currentSongIdx]].cover) {
        tween(disc.angle, 0, 0.5, (p) => disc.angle = p, easings.easeOutQuint);
        if (action == 0)
          tween(1, -1, 0.5, (p) => disc.scale.x = p, easings.easeOutQuint);
        else if (action == 1)
          tween(-1, 1, 0.5, (p) => disc.scale.x = p, easings.easeOutQuint);
      } else {
        if (action == 0)
          tween(disc.angle, disc.angle - rand(75, 100), 0.5, (p) => disc.angle = p, easings.easeOutQuint);
        else
          tween(disc.angle, disc.angle + rand(75, 100), 0.5, (p) => disc.angle = p, easings.easeOutQuint);
      }
      GameState.settings.music.favoriteIdx = currentSongIdx;
      timeSinceSkip = 0;
      if (!isAchievementUnlocked("allsongs")) {
        checkForSongListen(currentSongIdx);
      }
      wait(1, () => {
        if (timeSinceSkip > 1) {
          playMusic(Object.keys(songs)[currentSongIdx]);
          skipping = false;
          musicHandler.winding = false;
          get("bpmChange", { recursive: true }).forEach((element) => {
            musicHandler.paused ? true : element.startWave();
          });
        }
      });
    }
    get("musicButton", { recursive: true }).forEach((mBtn) => mBtn.onClick(() => {
      if (mBtn.is("backButton") || mBtn.is("skipButton")) {
        let action;
        if (mBtn.is("backButton")) {
          backButtonAction();
          action = 0;
        } else if (mBtn.is("skipButton")) {
          skipButtonAction();
          action = 1;
        }
        generalBackSkipButtonAction(action);
      } else if (mBtn.is("pauseButton")) {
        pauseButtonAction();
      }
    }));
    get("bpmChange", { recursive: true }).forEach((bpmChange) => {
      if (!bpmChange.is("wave"))
        bpmChange.use(waver({
          maxAmplitude: 5,
          wave_speed: currentSong.speed,
          wave_tweenSpeed: 0.2
        }));
      if (!musicHandler.paused)
        bpmChange.startWave();
    });
    let bpmChangeUpdate = onUpdate("bpmChange", (bpmChangeObj) => {
      bpmChangeObj.wave_speed = currentSong.speed;
    });
    winParent.onKeyPress((key) => {
      if (winParent.active == false)
        return;
      let action;
      if (key == "left") {
        backButtonAction();
        action = 0;
      } else if (key == "right") {
        skipButtonAction();
        action = 1;
      }
      if (key == "left" || key == "right")
        generalBackSkipButtonAction(action);
      else if (key == "up")
        pauseButtonAction();
    });
    winParent.on("close", () => {
      angleOfDisc = disc.angle;
    });
    theOneBehind.onClick(() => {
      if (winParent.active == false)
        return;
      let leftSideOfTheOneBehind = theOneBehind.screenPos().x - theOneBehind.width * 0.5;
      let rightSideOfTheOneBehind = theOneBehind.screenPos().x + theOneBehind.width * 0.5;
      let mappedSeconds = map(mousePos().x, leftSideOfTheOneBehind, rightSideOfTheOneBehind, 0, musicHandler.duration());
      mappedSeconds = clamp(mappedSeconds, 0, musicHandler.duration());
      if (!skipping) {
        musicHandler.winding = true;
        musicHandler.seek(mappedSeconds);
        let differenceInSeconds = currentSong.duration - mappedSeconds;
        let mappedAngle = map(differenceInSeconds, 0, currentSong.duration, 360, 0);
        tween(disc.angle, disc.angle + mappedAngle, 0.5, (p) => disc.angle = p, easings.easeOutQuint);
        let mappedWidth = map(mappedSeconds, 0, currentSong.duration, 0, theOneBehind.width);
        tween(progressBar.width, mappedWidth, 0.2, (p) => progressBar.width = p, easings.easeOutQuint).onEnd(() => {
          musicHandler.winding = false;
        });
      }
    });
    function addDancerMage() {
      const mageDance = winParent.add([
        sprite("mageDance", { anim: "dance" }),
        pos(134, -1),
        anchor("center"),
        opacity(),
        "mageDance",
        {
          update() {
            this.opacity = winParent.opacity;
          }
        }
      ]);
      return mageDance;
    }
    if (GameState.stats.timesAscended > 0) {
      let mageDance = addDancerMage();
      winParent.onUpdate(() => {
        let isThereMage = winParent.get("mageDance").length > 0 ? true : false;
        let currentSongSpeed = songs[Object.keys(songs)[currentSongIdx]].speed;
        let mageDancingSpeed = 0;
        if (currentSongSpeed < 1 && currentSongSpeed < 1.5)
          mageDancingSpeed = 0.5;
        else if (currentSongSpeed > 1.5 && currentSongSpeed < 2)
          mageDancingSpeed = 1;
        else if (currentSongSpeed >= 2)
          mageDancingSpeed = 1.5;
        if (musicHandler.winding || musicHandler.paused || GameState.settings.music.muted)
          mageDancingSpeed = 0;
        mageDance.animSpeed = lerp(mageDance.animSpeed, mageDancingSpeed, 0.1);
        if (isWindowOpen("ascendWin") && isThereMage == true)
          destroy(mageDance);
        else if (!isWindowOpen("ascendWin") && isThereMage == false)
          mageDance = addDancerMage();
      });
    }
    if (musicHandler.paused == true)
      pauseButton.play("play");
    else
      pauseButton.play("pause");
    winParent.on("close", () => {
      bpmChangeUpdate.cancel();
    });
  }

  // source/game/plugins/dummyShadow.ts
  function dummyShadow() {
    return {
      // Name of the component
      id: "dummyShadow",
      require: ["pos", "area", "drag", "z"],
      shadow: null,
      add() {
        this.on("drag", () => {
          this.shadow = add([
            pos(this.pos),
            sprite(this.sprite),
            z(this.z - 1),
            rotate(0),
            color(BLACK),
            layer(this.layer),
            opacity(0.8),
            anchor("center")
          ]);
          this.shadow.onUpdate(() => {
            let xPos = map(this.pos.x, 0, width(), this.pos.x + 8, this.pos.x - 8);
            this.shadow.pos.x = lerp(this.pos.x, xPos, 0.75);
            this.shadow.pos.y = lerp(this.shadow.pos.y, this.pos.y + 8, 0.75);
            this.shadow.angle = lerp(this.shadow.angle, this.angle, 0.9);
            this.shadow.sprite = this.sprite;
          });
          this.on("dragEnd", () => {
            this.shadow?.destroy();
          });
        });
      },
      destroy() {
        this.shadow?.destroy();
      }
    };
  }

  // source/game/windows/windows-api/openWindowButton.ts
  var timeForHold = 0.18;
  function openWindowButton() {
    return {
      id: "windowButton",
      require: ["rotate", "drag", "dummyShadow", "area"],
      add() {
        let waitingHold = wait(0, () => {
        });
        this.onClick(() => {
          if (!this.isHovering())
            return;
          waitingHold.cancel();
          waitingHold = wait(timeForHold, () => {
            if (!this.isHovering())
              return;
            if (curDraggin) {
              return;
            }
            this.trigger("hold");
          });
        });
        this.onMouseRelease("left", () => {
          if (this.dragging) {
            this.trigger("holdRelease");
          } else {
            waitingHold.cancel();
            if (!this.isHovering())
              return;
            if (curDraggin)
              return;
            this.trigger("press");
          }
        });
      },
      update() {
        if (this.dragging) {
          if (isMouseMoved())
            this.angle = lerp(this.angle, mouseDeltaPos().x, 0.25);
          else
            this.angle = lerp(this.angle, 0, 0.25);
        }
      },
      onPress(action) {
        return this.on("press", action);
      },
      onHold(action) {
        return this.on("hold", action);
      },
      onHoldRelease(action) {
        return this.on("holdRelease", action);
      }
    };
  }

  // source/game/windows/windows-api/minibuttons.ts
  function getMinibuttonPos(taskbarIndex) {
    return getPosInGrid(folderObj.pos, 0, -taskbarIndex - 1, vec2(75, 0));
  }
  function addMinibutton(opts) {
    let quad;
    getSprite("bean")?.then((quady) => {
      quad = quady.frames[0];
    });
    let idxForInfo = infoForWindows[opts.windowKey].idx;
    let destinedPosition;
    if (opts.destPosition)
      destinedPosition = opts.destPosition;
    else {
      let extraMb = infoForWindows[Object.keys(infoForWindows)[idxForInfo]].icon ? true : false;
      if (extraMb)
        destinedPosition = vec2(folderObj.pos.x, folderObj.pos.y - buttonSpacing);
      else
        destinedPosition = getMinibuttonPos(opts.taskbarIndex);
    }
    const theSprite = `icon_${infoForWindows[opts.windowKey].icon ?? opts.windowKey.replace("Win", "")}`;
    const currentMinibutton = add([
      sprite(theSprite),
      pos(opts.initialPosition),
      anchor("center"),
      area(),
      scale(1),
      opacity(1),
      rotate(0),
      drag(),
      color(),
      layer("ui"),
      z(folderObj.z - 1),
      dummyShadow(),
      openWindowButton(),
      hoverController(2),
      `${opts.windowKey}`,
      "minibutton",
      infoForWindows[opts.windowKey].icon == "extra" ? "extraMinibutton" : "",
      {
        idxForInfo,
        taskbarIndex: opts.taskbarIndex,
        window: get(`${opts.windowKey}`, { recursive: true })[0] ?? null,
        windowInfo: null,
        windowKey: opts.windowKey,
        nervousSpinSpeed: 10,
        saturation: 0,
        saturationColor: WHITE,
        defaultScale: vec2(1),
        dragHasSurpassed: false,
        destinedPosition,
        extraMb: infoForWindows[opts.windowKey].icon == "extra" ? true : null,
        shut: get("extraWin")[0] ? false : true,
        update() {
          if (this.dragging == false) {
            if (curDraggin?.is("minibutton") && !this.extraMb) {
              this.angle = wave(-8, 8, time() * 3);
              this.saturation = wave(5e-3, 0.05, time() * 3);
              if (Math.abs(curDraggin?.pos.sub(this.pos).x) < 15) {
                if (curDraggin.pos.x < this.pos.x && !this.dragHasSurpassed) {
                  this.trigger("dragHasSurpassed", true);
                }
                if (curDraggin.pos.x > this.pos.x && !this.dragHasSurpassed) {
                  this.trigger("dragHasSurpassed", false);
                }
              } else {
                this.dragHasSurpassed = false;
              }
            } else if (curDraggin?.is("gridMiniButton") && !this.extraMb) {
              this.angle = wave(-4, 4, time() * this.nervousSpinSpeed);
              this.saturation = wave(0.01, 0.1, time() * 3);
            } else if (curDraggin == null) {
              if (this.isBeingHovered) {
                this.angle = wave(-8, 8, time() * 3);
              } else {
                this.angle = lerp(this.angle, 0, 0.25);
              }
              if (this.window != null) {
                this.saturation = wave(0.01, 0.1, time() * 3);
              } else {
                this.saturation = 0;
              }
            }
          }
          if (this.extraMb) {
            this.destinedPosition = vec2(folderObj.pos.x, folderObj.pos.y - buttonSpacing);
          } else {
            this.destinedPosition.x = getMinibuttonPos(this.taskbarIndex).x;
          }
        },
        drawInspect() {
          if (this.extraMb)
            return;
          drawText({
            text: this.taskbarIndex,
            pos: vec2(0, -this.height),
            anchor: "center",
            size: 25,
            color: WHITE
          });
        },
        click() {
          manageWindow(currentMinibutton.windowKey);
          bop(currentMinibutton);
          destroyExclamation(currentMinibutton);
        },
        pickFromTaskbar() {
          this.pick();
          this.layer = "mouse";
          this.z = mouse.z - 1;
          folderObj.addSlots();
          playSfx("plap", { detune: 100 * this.windowInfo.idx / 4 });
          bop(this, 0.1);
          if (this.window)
            this.window.close();
        },
        releaseDrop() {
          curDraggin.trigger("dragEnd");
          setCurDraggin(null);
          this.layer = "ui";
          this.z = folderObj.z - 1;
          let closestSlot = null;
          let closestDistance = Infinity;
          const minibuttonSlots = get("minibuttonslot");
          minibuttonSlots.forEach((slot) => {
            const distance = currentMinibutton.screenPos().dist(slot.screenPos());
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSlot = slot;
            }
          });
          let movingTween = null;
          if (this.taskbarIndex != closestSlot.taskbarIndex)
            movingTween = tween(this.pos, get(`slot_${this.taskbarIndex}`)[0].pos, 0.32, (p) => this.pos = p, easings.easeOutQuint);
          if (this.taskbarIndex == closestSlot.taskbarIndex)
            movingTween = tween(this.pos, closestSlot.pos, 0.32, (p) => this.pos = p, easings.easeOutQuint);
          playSfx("plop", { detune: 100 * this.windowInfo.idx / 4 });
          this.z = folderObj.z - 1;
          get("minibuttonslot").filter((minibuttonslot) => minibuttonslot.taskbarIndex != this.taskbarIndex).forEach((minibuttonslot) => {
            destroy(minibuttonslot);
          });
          movingTween.onEnd(() => {
            let currentSlot = get(`slot_${this.taskbarIndex}`)[0];
            currentSlot?.fadeOut(0.32).onEnd(() => currentSlot?.destroy());
          });
        }
      }
    ]);
    currentMinibutton.windowInfo = infoForWindows[opts.windowKey];
    let isHovering = false;
    currentMinibutton.onUpdate(() => {
      isHovering = currentMinibutton.isHovering() || currentMinibutton.dragging;
      if (currentMinibutton.isHovering() && !currentMinibutton.dragging) {
        currentMinibutton.angle = lerp(currentMinibutton.angle, wave(-8, 8, time() * 3), 0.6);
      }
      if (isHovering) {
        if (currentMinibutton.getCurAnim().name != "hover") {
          if (currentMinibutton.extraMb) {
            currentMinibutton.play(`${currentMinibutton.shut ? "shut" : "open"}_hover`);
          } else
            currentMinibutton.play("hover");
        }
      } else {
        if (currentMinibutton.getCurAnim().name != "default") {
          if (currentMinibutton.extraMb) {
            currentMinibutton.play(`${currentMinibutton.shut ? "shut" : "open"}_default`);
          } else
            currentMinibutton.play("default");
        }
      }
      currentMinibutton.area.offset = vec2(10);
    });
    if (currentMinibutton.extraMb) {
      if (currentMinibutton.shut)
        currentMinibutton.play("shut_default");
      else
        currentMinibutton.play("open_default");
    } else
      currentMinibutton.play("default");
    currentMinibutton.area.scale = vec2(1);
    currentMinibutton.opacity = 0;
    tween(currentMinibutton.opacity, 1, 0.32, (p) => currentMinibutton.opacity = p, easings.easeOutQuad);
    currentMinibutton.onUpdate(() => {
      if (currentMinibutton.dragging)
        return;
      currentMinibutton.pos = lerp(currentMinibutton.pos, currentMinibutton.destinedPosition, 0.5);
    });
    currentMinibutton.on("dragHasSurpassed", (left) => {
      currentMinibutton.dragHasSurpassed = true;
      GameState.taskbar[curDraggin.taskbarIndex] = currentMinibutton.windowKey;
      GameState.taskbar[currentMinibutton.taskbarIndex] = curDraggin.windowKey;
      swap(curDraggin, "taskbarIndex", currentMinibutton, "taskbarIndex");
      let newXPos = getMinibuttonPos(currentMinibutton.taskbarIndex).x;
      currentMinibutton.destinedPosition.x = newXPos;
    });
    currentMinibutton.use(shader("saturate", () => ({
      "saturation": currentMinibutton.saturation,
      "saturationColor": currentMinibutton.saturationColor,
      "u_pos": vec2(quad.x, quad.y),
      "u_size": vec2(quad.w, quad.h)
    })));
    currentMinibutton.onHover(() => {
      if (folded || curDraggin || currentMinibutton.dragging)
        return;
      playSfx("hoverMiniButton", { detune: 100 * currentMinibutton.windowInfo.idx / 4 });
      currentMinibutton.destinedPosition.y -= 5;
      tween(currentMinibutton.scale, vec2(1.05), 0.32, (p) => currentMinibutton.scale = p, easings.easeOutQuint);
    });
    currentMinibutton.onHoverEnd(() => {
      if (folded || currentMinibutton.dragging)
        return;
      currentMinibutton.destinedPosition.y += 5;
      tween(currentMinibutton.scale, vec2(1), 0.32, (p) => currentMinibutton.scale = p, easings.easeOutQuint);
      currentMinibutton.defaultScale = vec2(1.05);
    });
    currentMinibutton.onPress(() => {
      currentMinibutton.click();
    });
    if (currentMinibutton.windowKey != "extraWin") {
      currentMinibutton.onHold(() => {
        if (curDraggin)
          return;
        currentMinibutton.pickFromTaskbar();
        destroyExclamation(currentMinibutton);
      });
      currentMinibutton.onHoldRelease(() => {
        if (curDraggin == currentMinibutton) {
          currentMinibutton.releaseDrop();
        }
      });
    }
    return currentMinibutton;
  }

  // source/game/windows/extraWin.ts
  var gridContainer;
  var currentClosest;
  function updateClosestMinibuttonToDrag() {
    const minibuttons = get("minibutton").filter((minibutton) => !minibutton.extraMb);
    let closestDistance = Infinity;
    let closestMinibutton = null;
    minibuttons.forEach((minibutton) => {
      const dist = curDraggin?.screenPos().dist(minibutton.screenPos());
      if (dist < closestDistance) {
        closestDistance = dist;
        closestMinibutton = minibutton;
      }
    });
    if (closestMinibutton !== currentClosest) {
      if (currentClosest) {
        if (currentClosest.is("closestMinibuttonToDrag")) {
          currentClosest.unuse("closestMinibuttonToDrag");
          currentClosest.opacity = 1;
          currentClosest.scale = vec2(1);
          currentClosest.color = WHITE;
          currentClosest.nervousSpinSpeed = 10;
        }
      }
      currentClosest = closestMinibutton;
      if (currentClosest) {
        if (!currentClosest.is("closestMinibuttonToDrag"))
          currentClosest.use("closestMinibuttonToDrag");
      }
    }
  }
  function addGridButton(windowKey5) {
    let distanceToSlot;
    let distanceToClosestMinibutton;
    let minibuttons = [];
    let closestMinibutton = null;
    let closestDistance = Infinity;
    let winParent = gridContainer.parent;
    let gridSlot = get(`gridShadow`, { recursive: true }).filter((gridShadow) => gridShadow.windowKey == windowKey5)[0];
    let windowInfo = infoForWindows[windowKey5];
    let theSprite = "icon_" + windowKey5.replace("Win", "");
    let gridButton = gridContainer.add([
      sprite(theSprite, {
        anim: "default"
      }),
      anchor("center"),
      opacity(1),
      pos(gridSlot.pos),
      color(WHITE),
      scale(0),
      drag(),
      layer("windows"),
      z(winParent.z + 1),
      area(),
      rotate(0),
      dummyShadow(),
      hoverController(),
      openWindowButton(),
      "gridMiniButton",
      {
        windowKey: windowKey5,
        beingHeld: false,
        releaseDrop(defaultShadow = true) {
          if (curDraggin == this) {
            curDraggin.trigger("dragEnd");
            setCurDraggin(null);
            gridButton.layer = "windows";
            let thisThing = this;
            const goToShadowSlot = function() {
              let gridMinibuttonIdx = infoForWindows[thisThing.windowKey].idx;
              destroy(thisThing);
              addGridButton(windowKey5);
              playSfx("plop");
              get("minibutton").forEach((element) => {
                tween(element.angle, 0, 0.32, (p) => element.angle = p, easings.easeOutQuint);
                element.color = WHITE;
                element.opacity = 1;
                element.scale = vec2(1);
              });
              get("gridMiniButton", { recursive: true }).forEach((element) => {
                if (element.isHovering())
                  element.startHoverFunction();
              });
            };
            const goToTaskbar = function() {
              let newMinibutton = addMinibutton({
                windowKey: thisThing.windowKey,
                taskbarIndex: closestMinibutton.taskbarIndex,
                initialPosition: thisThing.pos,
                destPosition: closestMinibutton.pos
              });
              GameState.taskbar[closestMinibutton.taskbarIndex] = thisThing.windowKey;
              tween(closestMinibutton.opacity, 0, 0.32, (p) => closestMinibutton.opacity = p, easings.easeOutQuint);
              tween(closestMinibutton.scale, vec2(0), 0.32, (p) => closestMinibutton.scale = p, easings.easeOutQuint).onEnd(() => {
                destroy(closestMinibutton);
              });
              destroy(thisThing);
              let cmbShadow = get(`gridShadow`, { recursive: true }).filter((cmb) => cmb.windowKey == closestMinibutton.windowKey)[0];
              addGridButton(closestMinibutton.windowKey);
              playSfx("plop");
              get("minibutton").forEach((minibutton) => {
                tween(minibutton.angle, 0, 0.15, (p) => minibutton.angle = p, easings.easeOutQuint);
              });
            };
            if (distanceToSlot < distanceToClosestMinibutton || defaultShadow == true)
              goToShadowSlot();
            else
              goToTaskbar();
          }
        }
      }
    ]);
    tween(gridButton.scale, vec2(1), 0.32, (p) => gridButton.scale = p, easings.easeOutElastic);
    gridButton.onUpdate(() => {
      if (gridButton.dragging) {
        closestMinibutton = null;
        closestDistance = Infinity;
        minibuttons = get("minibutton").filter((minibutton) => !minibutton.extraMb);
        minibuttons.forEach((minibutton) => {
          const distance = gridButton.screenPos().dist(minibutton.pos);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestMinibutton = minibutton;
          }
        });
        distanceToSlot = gridButton.screenPos().dist(gridSlot.screenPos());
        distanceToClosestMinibutton = gridButton.screenPos().dist(closestMinibutton.screenPos());
      }
    });
    gridButton.onHover(() => {
      if (gridButton.dragging)
        return;
      let idx = windowInfo.idx;
      playSfx("hoverMiniButton", { detune: 100 * idx / 4 });
      gridButton.play("hover");
    });
    gridButton.onHoverEnd(() => {
      if (gridButton.dragging)
        return;
      gridButton.play("default");
      tween(gridButton.angle, 0, 0.32, (p) => gridButton.angle = p, easings.easeOutQuint);
    });
    gridButton.onPress(() => {
      let window2 = get(gridButton.windowKey).filter((obj) => obj.is("window"))[0];
      if (window2)
        window2.close();
      else
        winParent.close();
      manageWindow(gridButton.windowKey);
      bop(gridButton);
    });
    gridButton.onHold(() => {
      gridButton.parent.children.splice(gridButton.parent.children.indexOf(gridButton), 1);
      gridButton.parent = ROOT;
      ROOT.children.push(gridButton);
      gridButton.pos = toScreen(mousePos());
      gridButton.z = mouse.z - 1;
      destroyExclamation(gridButton);
      gridButton.layer = "mouse";
      gridButton.pick();
      playSfx("plap");
    });
    gridButton.onHoldRelease(() => {
      gridButton.releaseDrop(false);
    });
    return gridButton;
  }
  var amountOfElementsX = 5;
  function extraWinContent(winParent) {
    gridContainer = winParent.add([pos(-164, -32)]);
    function getExtraBtnPos(index) {
      let initialPos2 = vec2(18, 15);
      let pos2 = vec2();
      let column = 0;
      let row = 0;
      if (index < amountOfElementsX)
        column = index;
      else
        column = index - amountOfElementsX;
      if (index < amountOfElementsX)
        row = 0;
      else
        row = 1;
      pos2 = getPosInGrid(initialPos2, row, column, vec2(buttonSpacing - 5));
      return pos2;
    }
    for (let i2 = 0; i2 < Object.keys(infoForWindows).length - 1; i2++) {
      let windowKey5 = Object.keys(infoForWindows)[i2];
      let thePos = getExtraBtnPos(i2);
      let shadowOne = gridContainer.add([
        sprite(`icon_${infoForWindows[windowKey5].icon || windowKey5.replace("Win", "")}`, {
          anim: "default"
        }),
        anchor("center"),
        opacity(0.5),
        pos(thePos),
        color(BLACK),
        area(),
        `gridShadow_${i2}`,
        "gridShadow",
        {
          idx: i2,
          windowKey: windowKey5
        }
      ]);
      if (!GameState.taskbar.includes(windowKey5)) {
        if (GameState.unlockedWindows.includes(windowKey5)) {
          addGridButton(windowKey5);
        }
      }
    }
    winParent.onUpdate(() => {
      if (curDraggin == null || !curDraggin.is("gridMiniButton"))
        return;
      updateClosestMinibuttonToDrag();
    });
    let extraMinibutton = get("extraMinibutton")[0];
    if (extraMinibutton) {
      extraMinibutton.shut = false;
      extraMinibutton.play(`open_${extraMinibutton.isHovering() ? "hover" : "default"}`);
    }
    let cursorPos = vec2(0);
    gridContainer.onDraw(() => {
      const hoveredGridButton = get("gridMiniButton", { recursive: true }).filter((obj) => obj.isHovering())[0];
      if (!hoveredGridButton || hoveredGridButton.dragging)
        return;
      cursorPos = lerp(cursorPos, hoveredGridButton.pos, 0.7);
      drawRect({
        pos: cursorPos,
        width: extraMinibutton.width,
        height: extraMinibutton.height,
        color: WHITE,
        anchor: "center",
        opacity: 0.25,
        radius: 8
      });
    });
    winParent.on("close", () => {
      let extraMinibutton2 = get("extraMinibutton")[0];
      if (extraMinibutton2) {
        extraMinibutton2.shut = true;
        extraMinibutton2.play(`shut_${extraMinibutton2.isHovering() ? "hover" : "default"}`);
      }
    });
  }

  // source/game/unlockables/windowUnlocks.ts
  var unlockableWindows = {
    "storeWin": {
      condition: () => GameState.scoreAllTime >= 25
    },
    "settingsWin": {
      condition: () => GameState.scoreAllTime >= 50
    },
    "statsWin": {
      condition: () => GameState.scoreAllTime >= 60
    },
    // they're unlocked at the same time lol!
    "extraWin": {
      condition: () => GameState.scoreAllTime >= 150
    },
    "musicWin": {
      condition: () => GameState.scoreAllTime >= 150
    },
    "medalsWin": {
      condition: () => GameState.scoreAllTime >= 105
    },
    "creditsWin": {
      condition: () => GameState.scoreAllTime >= 200
    },
    "leaderboardsWin": {
      condition: () => GameState.scoreAllTime >= 11e5
    },
    "ascendWin": {
      condition: () => GameState.scoreAllTime >= scoreManager.ascensionConstant
    }
  };
  function isWindowUnlocked(windowName) {
    return GameState.unlockedWindows.includes(windowName);
  }
  function destroyExclamation(obj) {
    obj?.get("exclamation")?.forEach((element) => {
      element?.fadeOut(0.1).onEnd(() => {
        destroy(element);
      });
    });
  }
  function addExclamation(obj) {
    if (obj.get("exclamation").length == 0) {
      let exclamation = obj.add([
        text("!", { font: "lambdao", size: 45 }),
        pos(obj.width / 2, -obj.height / 2),
        anchor("center"),
        scale(),
        opacity(1),
        waver({ maxAmplitude: 5 }),
        "exclamation",
        {
          times: 0,
          update() {
            if (obj.opacity != null)
              this.opacity = obj.opacity;
          }
        }
      ]);
      tween(-obj.height, -obj.height / 2, 0.32, (p) => exclamation.pos.y = p, easings.easeOutBack).onEnd(() => {
        exclamation.startWave();
      });
      tween(0.5, 1, 0.32, (p) => exclamation.opacity = p, easings.easeOutQuad);
    } else {
      let exclamation = obj.get("exclamation")[0];
      bop(exclamation);
    }
  }
  function unlockWindow(windowJustUnlocked) {
    GameState.unlockedWindows.push(windowJustUnlocked);
    playSfx("windowUnlocked");
    if (GameState.taskbar.length < 4 || windowJustUnlocked == "extraWin") {
      GameState.taskbar.push(windowJustUnlocked);
    }
    GameState.taskbar = sortedTaskbar();
    if (folded == true) {
      addExclamation(folderObj);
      let unfoldCheckEvent = folderObj.on("unfold", () => {
        destroyExclamation(folderObj);
        if (GameState.taskbar.includes(windowJustUnlocked)) {
          let newlyUnlockedBtn = get("minibutton").filter((btn) => btn.windowKey == windowJustUnlocked)[0];
          addExclamation(newlyUnlockedBtn);
        } else if (GameState.taskbar.includes(windowJustUnlocked) == false) {
          let extraWinBtn = get("minibutton").filter((btn) => btn.windowKey == "extraWin")[0];
          if (extraWinBtn)
            addExclamation(extraWinBtn);
        }
        unfoldCheckEvent.cancel();
      });
    } else if (folded == false) {
      if (GameState.taskbar.includes(windowJustUnlocked)) {
        let newIndex = GameState.taskbar.indexOf(windowJustUnlocked);
        let btnForNewWindow = addMinibutton({
          windowKey: windowJustUnlocked,
          taskbarIndex: newIndex,
          initialPosition: folderObj.pos
        });
        addExclamation(btnForNewWindow);
      } else {
        let extraWinBtn = get("minibutton").filter((btn) => btn.windowKey == "extraWin")[0];
        addExclamation(extraWinBtn);
      }
    }
    if (GameState.taskbar.includes(windowJustUnlocked) == false) {
      if (isWindowOpen("extraWin")) {
        let gridBtn = addGridButton(windowJustUnlocked);
        addExclamation(gridBtn);
      } else {
        let extraWinOpenCheck = ROOT.on("winOpen", (windowOpened) => {
          if (windowOpened == "extraWin") {
            let gridMinibtn = get("gridMiniButton", { recursive: true }).filter((btn) => btn.windowKey == windowJustUnlocked)[0];
            addExclamation(gridMinibtn);
            extraWinOpenCheck.cancel();
          }
        });
      }
    }
  }

  // source/env.json
  var API_ID = "58772:iSJtdnjI";
  var ENCRIPTION_KEY = "tU8YymrSEPrn1PmsJtxd0w==";
  var SCORE_LEADERBOARD_ID = 14075;
  var TIME_LEADERBOARD_ID = 14096;
  var MANA_LEADERBOARD_ID = 14127;
  var DEVKY_MEDAL_ID = 80475;

  // source/newgrounds.ts
  var ngEnabled;
  var ngUser;
  function connectToNewgrounds() {
    return ht2.connect(API_ID, ENCRIPTION_KEY);
  }
  function postEverything() {
    if (ngEnabled == true) {
      ht2.postScore(SCORE_LEADERBOARD_ID, GameState.scoreAllTime);
      ht2.postScore(TIME_LEADERBOARD_ID, GameState.stats.totalTimePlayed * 1e3);
      ht2.postScore(MANA_LEADERBOARD_ID, GameState.ascension.manaAllTime);
      console.log("NG: Posted your scores!");
    }
  }
  async function onLogIn(session) {
    ngUser = session.user;
    console.log("ngUser: ");
    console.log(ngUser);
    console.log("NG: Enabled");
    ngEnabled = true;
    const data = JSON.parse(await ht2.getCloudData(1));
    if (data) {
      if (GameState.scoreAllTime > data.scoreAllTime) {
        ht2.setCloudData(1, JSON.stringify(GameState));
        console.log("Current data is better than cloud, overwriting...");
        return;
      } else {
        console.log("Setting save to data in cloud save: ", data);
        Object.assign(GameState, data);
      }
    }
    let gottenMedals = await ht2.getMedals();
    let gottenMedalsIds = gottenMedals.filter((medal) => medal.unlocked == true).map((medal) => medal.id);
    let idsToUnlock = [];
    GameState.unlockedAchievements.forEach((unlockedAchievement) => {
      if (!gottenMedalsIds.includes(getAchievement(unlockedAchievement).ngId)) {
        const achievement = getAchievement(unlockedAchievement);
        idsToUnlock.push(achievement.ngId);
      }
    });
    function processArray(array, process, delay) {
      function processNext(index) {
        if (index < array.length) {
          process(array[index]);
          setTimeout(() => {
            processNext(index + 1);
          }, delay);
        }
      }
      processNext(0);
    }
    function medalProcessing(ngId) {
      const achievement = achievements.filter((achievement2) => achievement2.ngId == ngId)[0];
      console.log("NG: (Recovered) unlocked medal: " + achievement.id);
      ht2.unlockMedal(achievement.ngId);
    }
    processArray(idsToUnlock, medalProcessing, 5e3);
  }
  async function newgroundsSceneContent() {
    gameBg.colorA = 0.9;
    let newgroundsInfoText = "You don't seem to be signed in.\nWould you like to? Includes:\n +Your score in leaderboards\n+Medals in newgrounds (up to 300 points)\n+Cloud saves\nPretty good deal huh?";
    let titleText = add([
      text("You don't seem to be signed in.\nWould you like to?", { align: "center", size: 40 }),
      pos(center().x, center().y - 200),
      anchor("center")
    ]);
    let yesButton = add([
      sprite("newgroundsSignInButton"),
      pos(center().x - 300, center().y + 150),
      area(),
      anchor("center"),
      scale(),
      "newgroundsButton",
      {
        update() {
          if (this.isHovering())
            this.opacity = 1;
          else
            this.opacity = 0.4;
        }
      }
    ]);
    async function userAgreed() {
      get("newgroundsButton").forEach((button) => {
        button.destroy();
      });
      titleText.text = "Ok im trying to sign you in.\nCheck your popups!";
      let popup = add([
        sprite("newgroundsPopup"),
        pos(center()),
        anchor("center"),
        "newgroundsPopup"
      ]);
      add([
        text("Close when done"),
        pos(popup.pos.x, center().y + popup.height / 2 + 60),
        anchor("center"),
        "newgroundsPopup"
      ]);
      await ht2.login();
      const loggedIn = await ht2.isLoggedIn();
      const session = await ht2.getSession();
      if (loggedIn == true) {
        onLogIn(session);
        titleText.text = `Welcome: ${ngUser.name}
Click to start the game!`;
        onClick(() => go("gamescene"));
        get("newgroundsPopup").forEach((obj) => obj.destroy());
        tween(titleText.pos.y, center().y, 0.1, (p) => titleText.pos.y = p, easings.easeOutExpo);
      } else {
        ngUser = null;
        titleText.text = "Seems like there was an error. I'm sorry\nClick to start the game!";
        ngEnabled = false;
        onClick(() => go("gamescene"));
        get("newgroundsPopup").forEach((obj) => obj.destroy());
        tween(titleText.pos.y, center().y, 0.15, (p) => titleText.pos.y = p, easings.easeOutExpo);
      }
    }
    async function userDeclined() {
      get("newgroundsButton").forEach((button) => button.destroy());
      get("newgroundsPopup").forEach((obj) => obj.destroy());
      let phrases = [
        "Whatever you say man, goodbye",
        "Oh no :(",
        "Ok no worries, goodbye",
        "Why tho :pensive:",
        "Ok i don't mind goodbye"
      ];
      titleText.text = choose(phrases) + "\nClick to start the game!";
      tween(titleText.pos.y, center().y, 0.15, (p) => titleText.pos.y = p, easings.easeOutExpo);
      onClick(() => go("gamescene"));
    }
    let noButton = add([
      sprite("newgroundsNahButton"),
      pos(center().x + 300, yesButton.pos.y),
      anchor("center"),
      area(),
      scale(),
      "newgroundsButton",
      {
        update() {
          if (this.isHovering())
            this.opacity = 1;
          else
            this.opacity = 0.4;
        }
      }
    ]);
    get("newgroundsButton").forEach((button) => {
      button.onClick(() => {
        bop(button);
        button.area.scale = vec2(0);
        wait(0.1, () => {
          let howDidInteractionGo = button.sprite.includes("Nah") ? false : true;
          if (howDidInteractionGo == true)
            userAgreed();
          else
            userDeclined();
        });
      });
    });
  }

  // source/game/unlockables/achievements.ts
  var Achievement = class {
    constructor(opts) {
      this.id = opts.id;
      this.ngId = opts.ngId;
      this.title = opts.title;
      this.description = opts.description;
      this.flavorText = opts.flavorText || "";
      this.rare = opts.rare || false;
      this.timeAfter = opts.timeAfter || 0;
      this.readingTime = opts.readingTime || 3;
      this.unlockCondition = opts.unlockCondition || null;
      this.visibleCondition = opts.visibleCondition || null;
    }
  };
  var fullUpgradeValues = {
    clicks: () => {
      let sum = 0;
      Object.keys(upgradeInfo).forEach((key) => {
        if (key.includes("k_")) {
          sum += upgradeInfo[key].value;
        }
      });
      return sum;
    },
    cursors: () => {
      let sum = 0;
      Object.keys(upgradeInfo).forEach((key) => {
        if (key.includes("c_") && upgradeInfo[key].freq == null) {
          sum += upgradeInfo[key].value;
        }
      });
      return sum;
    }
  };
  var achievements = [
    // #region SCORE ACHIEVEMENTS =====================
    new Achievement({
      id: "score.100",
      title: "Clicktastic",
      description: "Get 100 of score",
      ngId: 80187,
      unlockCondition: () => GameState.scoreAllTime >= 100
    }),
    new Achievement({
      id: "score.1_000",
      title: "Finger clickin' good",
      description: "Get 1.000 of score",
      ngId: 80364,
      unlockCondition: () => GameState.scoreAllTime >= 1e3
    }),
    new Achievement({
      id: "score.5_000",
      title: "Now you're clickin",
      description: "Get 5.000 of score",
      ngId: 80365,
      unlockCondition: () => GameState.scoreAllTime >= 5e3
    }),
    new Achievement({
      id: "score.10_000",
      title: "Olimpic Hexagon",
      description: "Get 10.000 of score",
      ngId: 80367,
      unlockCondition: () => GameState.scoreAllTime >= 1e4
    }),
    new Achievement({
      id: "score.25_000",
      title: "Usain Hexagon",
      description: "Get 25.000 of score",
      ngId: 80368,
      unlockCondition: () => GameState.scoreAllTime >= 25e3
    }),
    new Achievement({
      id: "score.50_000",
      title: "Another one clicks the hexagon",
      description: "Get 50.000 of score",
      ngId: 80369,
      unlockCondition: () => GameState.scoreAllTime >= 5e4
    }),
    new Achievement({
      id: "score.100_000",
      title: "You Spin Me Round (Like a hexagon)",
      description: "Get 100.000 of score",
      ngId: 80370,
      unlockCondition: () => GameState.scoreAllTime >= 1e5
    }),
    new Achievement({
      id: "score.250_000",
      title: "Hex-a-Gone Crazy",
      description: "Get 250.000 of score",
      ngId: 80371,
      unlockCondition: () => GameState.scoreAllTime >= 25e4
    }),
    new Achievement({
      id: "score.500_000",
      title: "Placeholder title",
      description: "Get 500.000 of score",
      ngId: 80372,
      unlockCondition: () => GameState.scoreAllTime >= 5e5
    }),
    new Achievement({
      id: "score.750_000",
      title: "Did you know there's no actual limit to how long these names can be? I specifically spent a lot of time working on them so they can be as LONG as i want them to be and they will do their best to look good",
      description: `Get 750.000 score`,
      flavorText: "I'm not too sure how well it supports long descriptions, i can't really be bothered to test it, i'm pretty close to the deadline of this game coming out so i'd like not to dwell in those dark functions...",
      readingTime: 10,
      ngId: 80384,
      unlockCondition: () => GameState.scoreAllTime >= 75e4
    }),
    new Achievement({
      id: "score.1_million",
      title: "Master of hexagons",
      description: "Get 1 million of score",
      ngId: 80374,
      unlockCondition: () => GameState.scoreAllTime >= 1e6
    }),
    new Achievement({
      id: "score.15_million",
      title: "Hex-a-Lent",
      description: "Get 15 million of score",
      ngId: 80375,
      unlockCondition: () => GameState.scoreAllTime >= 15e6
    }),
    new Achievement({
      id: "score.50_million",
      title: "Hex-machina",
      description: "Get 50 million of score",
      ngId: 80376,
      unlockCondition: () => GameState.scoreAllTime >= 5e7
    }),
    new Achievement({
      id: "score.100_million",
      title: "Clickery Hexagon forever and forever a 100 years clickery Hexagon, all day long forever, forever a hundred times, over and over clickery Hexagon adventures dot com",
      description: "Get 100 million of score",
      ngId: 80385,
      unlockCondition: () => GameState.scoreAllTime >= 1e8
    }),
    new Achievement({
      id: "score.250_million",
      title: "Hex-traordinary",
      description: "Get 250 million of score",
      ngId: 80378,
      unlockCondition: () => GameState.scoreAllTime >= 25e7
    }),
    new Achievement({
      id: "score.500_million",
      title: "Hexagonmania!",
      description: "Get 500 million of score",
      ngId: 80379,
      unlockCondition: () => GameState.scoreAllTime >= 5e8
    }),
    new Achievement({
      id: "score.600_million",
      title: "Click my hexagons...",
      description: "Get 600 million of score",
      ngId: 80380,
      unlockCondition: () => GameState.scoreAllTime >= 6e8
    }),
    // this is the gimmiko achievement
    new Achievement({
      id: "score.750_million",
      title: "Who else is gimmicking their dice right now?",
      description: "Get 750 million of score",
      ngId: 80381,
      unlockCondition: () => GameState.scoreAllTime >= 75e7
    }),
    new Achievement({
      id: "score.950_million",
      title: "You've come so far",
      description: "Get 950 million of score",
      ngId: 80382,
      unlockCondition: () => GameState.scoreAllTime >= 95e7
    }),
    new Achievement({
      id: "score.1_billion",
      title: "F I N A L L Y",
      rare: true,
      description: "Get 1 billion of score, you're crazy for this...",
      ngId: 80383,
      unlockCondition: () => GameState.scoreAllTime >= 1e9
    }),
    // #endregion SCORE ACHIEVEMENTS ====================
    // #region CLICKER/CURSOR ACHIEVEMENTS ==================
    // ### CLICKERS
    new Achievement({
      id: "clickers.10",
      title: "Seeing decuple",
      description: "Have 10 clickers",
      ngId: 80446,
      unlockCondition: () => GameState.clickers >= 10
    }),
    new Achievement({
      id: "clickers.20",
      title: "Mitosis",
      flavorText: "At the Telophase",
      description: "Have 20 clickers",
      ngId: 80447,
      unlockCondition: () => GameState.clickers >= 20
    }),
    new Achievement({
      id: "clickers.30",
      title: "DIE HARD",
      flavorText: "I've never seen die hard",
      description: "Have 30 clickers",
      ngId: 80448,
      unlockCondition: () => GameState.clickers >= 30
    }),
    new Achievement({
      id: "clickers.40",
      title: "Ommmmmm",
      flavorText: "Mastering clicking power",
      description: "Have 40 clickers",
      ngId: 80449,
      unlockCondition: () => GameState.clickers >= 40
    }),
    new Achievement({
      id: "clickers.50",
      title: "Iridescent Cursor",
      flavorText: "50 millions clicks, is what it would take for you to break your mouse, kinda",
      description: "Have 50 clickers",
      rare: true,
      ngId: 80450,
      unlockCondition: () => GameState.clickers >= 50
    }),
    // ### CURSORS
    new Achievement({
      id: "cursors.10",
      title: "I work hard for the money",
      flavorText: "So hard for the money",
      description: "Have 10 cursors",
      ngId: 80451,
      unlockCondition: () => GameState.cursors >= 10
    }),
    new Achievement({
      id: "cursors.20",
      title: "Check out this ruby i got",
      flavorText: "That's an emerald dude",
      description: "Have 20 cursors",
      ngId: 80452,
      unlockCondition: () => GameState.cursors >= 20
    }),
    new Achievement({
      id: "cursors.30",
      title: "Telekinesis",
      flavorText: "Not even touching the mouse",
      description: "Have 30 cursors",
      ngId: 80453,
      unlockCondition: () => GameState.cursors >= 30
    }),
    new Achievement({
      id: "cursors.40",
      title: "Twisted",
      flavorText: "Scrumptious amounts",
      description: "Have 40 cursors",
      ngId: 80454,
      unlockCondition: () => GameState.cursors >= 40
    }),
    new Achievement({
      id: "cursors.50",
      title: "Frankenstein's cursor",
      flavorText: "RAAAAAA",
      description: "Have 50 cursors",
      rare: true,
      ngId: 80455,
      unlockCondition: () => GameState.cursors >= 50
    }),
    //#endregion CLICKERS/CURSORS ACHIEVEMENTS =================
    new Achievement({
      id: "store.allUpgrades",
      title: "All done (no)",
      flavorText: "Some Power-Ups would go great on this",
      description: "Buy all the available upgrades",
      timeAfter: 1,
      ngId: 80456,
      unlockCondition: () => GameState.clicksUpgradesValue >= fullUpgradeValues.clicks() && GameState.cursorsUpgradesValue >= fullUpgradeValues.cursors()
    }),
    // #region POWERUP ACHIEVEMENTS =====================
    new Achievement({
      id: "powerups.click_1",
      title: "Golden Cook- wait",
      flavorText: "Wrong game sorry",
      description: "Click 1 power-up",
      timeAfter: 0.5,
      ngId: 80457,
      unlockCondition: () => GameState.stats.powerupsClicked >= 1
    }),
    new Achievement({
      id: "powerups.click_5",
      title: "What?! Help me!",
      flavorText: "Help = LIKE",
      description: "Click 5 power-ups",
      timeAfter: 0.5,
      ngId: 80458,
      unlockCondition: () => GameState.stats.powerupsClicked >= 5
    }),
    new Achievement({
      id: "powerups.click_10",
      title: "Full of power",
      description: "Click 10 power-ups",
      flavorText: "And soup",
      timeAfter: 0.5,
      ngId: 80459,
      unlockCondition: () => GameState.stats.powerupsClicked >= 10
    }),
    new Achievement({
      id: "powerups.click_20",
      title: "Super HEXAGON",
      description: "Click 20 power-ups",
      rare: true,
      timeAfter: 0.5,
      ngId: 80460,
      unlockCondition: () => GameState.stats.powerupsClicked >= 20
    }),
    new Achievement({
      id: "powerups.buy_10",
      title: "Pay to win",
      flavorText: "Only 899.99 monthly",
      description: "Buy 10 power-ups",
      timeAfter: 1,
      ngId: 80461,
      unlockCondition: () => GameState.stats.powerupsBought >= 10
    }),
    // #endregion POWERUP ACHIEVEMENTS ====================
    // #region ASCENSION ACHIEVEMENTS =====================
    new Achievement({
      id: "ascension.times_1",
      title: "Oh. So you've met him?",
      description: "Ascend for the first time",
      ngId: 80462,
      visibleCondition: () => GameState.stats.timesAscended >= 1
    }),
    new Achievement({
      id: "ascension.times_5",
      title: "He's funny, isn't he?",
      description: "Ascend for the fifth time",
      ngId: 80463,
      unlockCondition: () => GameState.stats.timesAscended >= 5,
      visibleCondition: () => isAchievementUnlocked("ascension.times_1")
    }),
    new Achievement({
      id: "ascension.times_10",
      title: "I am the clickery...",
      description: "Ascend for the tenth time",
      rare: true,
      ngId: 80464,
      unlockCondition: () => GameState.stats.timesAscended >= 10,
      visibleCondition: () => isAchievementUnlocked("ascension.times_1")
    }),
    new Achievement({
      id: "ascension.cardsBought_10",
      title: "The trickster",
      flavorText: "Wooimabouttomakeanameformyselfhere",
      description: "Buy 10 cards",
      ngId: 80465,
      unlockCondition: () => GameState.ascension.clickPercentagesBought + GameState.ascension.cursorsPercentagesBought + GameState.ascension.powerupPowersBought + GameState.ascension.critPowersBought >= 10,
      visibleCondition: () => isAchievementUnlocked("ascension.times_1")
    }),
    // #endregion ASCENSION ACHIEVEMENTS =====================
    // #region EXTRA ACHIEVEMENTS =====================
    new Achievement({
      id: "clicks.1000",
      title: "Letting the clicks go by",
      flavorText: "Score flowing underground",
      description: "Click 1000 times",
      ngId: 80466,
      unlockCondition: () => GameState.stats.timesClicked >= 1e3
    }),
    new Achievement({
      id: "extra.maxedcombo",
      title: "OVERDRIVE!!!",
      description: "Max your combo for the first time",
      flavorText: "FULL COMBO!!",
      ngId: 80467,
      timeAfter: 2
    }),
    new Achievement({
      id: "extra.panderito",
      title: "So tasty",
      flavorText: "Panderitos.....",
      description: "Spell panderito",
      ngId: 80468
    }),
    new Achievement({
      id: "extra.theSlot",
      title: "Click click lick",
      flavorText: "It wasn't hard was it?",
      description: "Click this achivement's slot",
      ngId: 80469
    }),
    new Achievement({
      id: "extra.gnome",
      title: "HOLY CRAP GUYS DID YOU SEE THAT???",
      description: "WHAT THE HELL WAS THAT DID WE GET THAT ON CAMERA??????!!",
      timeAfter: 1.5,
      readingTime: 5,
      ngId: 80470,
      visibleCondition: () => GameState.stats.beenGnomed == true
    }),
    new Achievement({
      id: "extra.songs",
      title: "Music lover",
      description: "Listen to all the songs at least once",
      ngId: 80471,
      unlockCondition: () => songsListened.length == Object.keys(songs).length
    }),
    // inflation was the original name, it was pretty good i think
    new Achievement({
      id: "store.stuffBought_10",
      title: "Scrooge McDuck",
      description: "Buy 10 things consecutively",
      ngId: 80472
    }),
    new Achievement({
      id: "extra.time_15minutes",
      title: "Hex-citing Times",
      description: "Play for 15 minutes",
      flavorText: "Thanks for playing!",
      ngId: 80473,
      unlockCondition: () => GameState.stats.totalTimePlayed >= 60 * 15
    }),
    // #endregion EXTRA ACHIEVEMENTS =====================
    new Achievement({
      id: "extra.ALL",
      title: "F I N A L L Y",
      flavorText: "You're the master now",
      description: "Complete all achievements",
      ngId: 80474,
      unlockCondition: () => GameState.unlockedAchievements.length == achievements.length - 1
    })
  ];
  function getAchievement(achievementId) {
    if (!achievements.map((achievement) => achievement.id).includes(achievementId))
      throw new Error(`Achievement: ${achievementId} does not exist`);
    return achievements.filter((achievementObject) => achievementObject.id == achievementId)[0];
  }
  function isAchievementUnlocked(achievementName) {
    return GameState.unlockedAchievements.includes(achievementName);
  }
  var achievementsInfo = {
    ids: achievements.map((achievement) => achievement.id),
    objects: achievements.map((achievement) => achievement)
  };
  function checkForUnlockable() {
    achievements.forEach((achievement) => {
      if (achievement.unlockCondition != null && !isAchievementUnlocked(achievement.id)) {
        if (achievement.unlockCondition()) {
          unlockAchievement(achievement.id);
        } else {
          lockAchievement(achievement.id);
        }
      }
    });
    Object.keys(unlockableWindows).forEach((window2) => {
      if (!isWindowUnlocked(window2)) {
        if (unlockableWindows[window2].condition()) {
          unlockWindow(window2);
        }
      }
    });
  }
  function unlockAchievement(id) {
    if (isAchievementUnlocked(id))
      return;
    if (!achievements.map((achievement) => achievement.id).includes(id))
      throw new Error(`Achievement: ${id} does not exist`);
    GameState.unlockedAchievements.push(id);
    const theAchievement = getAchievement(id);
    wait(theAchievement.timeAfter || 0, () => {
      addToast({
        icon: `medals_${theAchievement.id}`,
        title: theAchievement.title,
        body: `${theAchievement.description}. ${theAchievement.flavorText ?? theAchievement.flavorText}`,
        duration: theAchievement.readingTime,
        type: "achievement",
        whenAdded: (toastObj, icon) => {
          playSfx("unlockachievement", { detune: toastObj.index * 100 });
          if (theAchievement.id != "extra.theSlot") {
            icon.onDraw(() => {
              drawRect({
                anchor: icon.anchor,
                width: icon.width,
                height: icon.height,
                color: BLACK,
                fill: false,
                fixed: true,
                outline: {
                  width: 3,
                  color: BLACK
                }
              });
            });
            if (theAchievement.id == "extra.ALL")
              icon.play("master");
          }
        }
      });
      if (id == "allachievements") {
        addConfetti({ pos: mousePos() });
      }
      ROOT.trigger("achivementUnlock", id);
    });
    if (ngEnabled == true) {
      if (theAchievement.ngId)
        ht2.unlockMedal(theAchievement.ngId);
      console.log("NG: Medal unlocked: " + theAchievement.id);
    }
  }
  function lockAchievement(id) {
    if (GameState.unlockedAchievements.includes(id))
      GameState.unlockedAchievements = GameState.unlockedAchievements.filter((achievement) => achievement != id);
  }

  // source/game/powerups.ts
  var Powerup = class {
    sprite;
    /**
     * Time that its left for it to be removed, if it's null it means it's not active
     */
    removalTime;
    /**
     * Time it's running to check for max time and then chance
     */
    runningTime;
    /**
     * Time it takes to rethink chance
     */
    maxTime;
    /**
     * Chance it has of appearing when maxTime is ran (from 0 to 1)
     */
    chance;
    /**
     * The multiplier the powerup is currently running
     */
    multiplier;
    /**
     * Just a color
     */
    color;
    // DON'T DELETE SPRITE!!!!!! needed for powerup logs
    constructor(sprite2, maxTime, chance2, color2, runningTime, multiplier) {
      this.sprite = sprite2;
      this.maxTime = maxTime;
      this.chance = chance2;
      this.color = color2 || [255, 255, 255];
      this.runningTime = runningTime || 0;
      this.multiplier = multiplier || 1;
    }
  };
  var powerupTypes = {
    /**
     * Makes clicks more powerful
     */
    "clicks": new Powerup("cursors.cursor", 80, 0.15, [66, 144, 245]),
    /**
     * Makes cursors more powerful
     */
    "cursors": new Powerup("cursors.point", 60, 0.2, [35, 232, 64]),
    /**
     * Gives you the score you would have gotten in X amount of time
     */
    "time": new Powerup("cursors.wait", 60, 0.45, [232, 199, 35]),
    /**
     * Increses production
     */
    "awesome": new Powerup("cursors.check", 120, 0.3, [162, 60, 240]),
    /**
     * Gives discounts for clickers and cursors
     */
    "store": new Powerup("icon_store", 90, 0.45, [87, 214, 51]),
    /**
     * Is just silly, very silly
     */
    "blab": new Powerup("panderito", 20, 0.15, [214, 154, 51])
  };
  var blabPhrases = [
    "Test powerup",
    "Despite a text saying test powerup\nThis was the last powerup implemented",
    "lol!",
    "Hexagoning since march 2024",
    "Also try Cookie Clicker!",
    "Orteil don't sue me",
    "Area of an hexagon:\nA = (3\u221A3*s\xB2)/2",
    "Yummers",
    "Enjoying the game so far?",
    "These sometimes explain things things i was lazy enough to code an explanation for",
    "Boy why you so buggy",
    "Zizou approved :holding_back_tears:",
    "Hey medals don't work!",
    "The clicker game you were (not) waiting for",
    "Not balanced at all",
    "Did you know?\nKAPLAY is free, open-source and fun!",
    "Did you know?\nYou can hold to drag the buttons in your taskbar around!",
    "Did you know?\nYou can hold and drag the buttons in the extra window\nto your taskbar!",
    "Did you know?\nYou can hold your mouse when buying!",
    "Did you know?\nYou can hold shift to bulk-buy 10x things!",
    "Did you know?\nYou can click the big hexagon several times\nto start a combo!",
    "Did you know?\nThe game has support for displaying numbers up until Vigintillions!",
    "Did you know?\nYou can press Shift + R to restart the game's scene",
    "Did you know?\nYou can press Shift + C to save your game",
    "Did you know?\nYou can press F2 to remove all toasts/logs"
  ];
  var timerSpacing = 70;
  function getTimerXPos(index) {
    let initialPos2 = vec2(width() + timerSpacing / 2);
    return getPosInGrid(initialPos2, 0, -index - 1, vec2(timerSpacing, 0)).x;
  }
  function addTimer(type) {
    const powerupColor = arrToColor(powerupTypes[type].color);
    let timerSprite = add([
      sprite(`${type}Powerup`),
      color(WHITE),
      pos(0, 40),
      anchor("center"),
      opacity(1),
      scale(),
      rotate(0),
      layer("ui"),
      color(),
      area(),
      z(0),
      "putimer",
      `${type}_putimer`,
      {
        index: get("putimer").length,
        updateTime() {
          tween(vec2(1), vec2(1.1), 0.32, (p) => this.scale = p, easings.easeOutQuint).onEnd(() => {
            tween(this.scale, vec2(1), 0.32, (p) => this.scale = p, easings.easeOutQuint);
          });
          tween(powerupColor, WHITE, 1, (p) => timerSprite.color = p, easings.easeOutQuint);
        },
        end() {
          this.tags.forEach((tag) => this.unuse(tag));
          tween(this.pos.y, this.pos.y - 40, 0.32, (p) => this.pos.y = p, easings.easeOutQuint);
          tween(1, 0, 0.32, (p) => this.opacity = p, easings.easeOutQuint).onEnd(() => {
            destroy(this);
          });
          get("putimer").filter((pt2) => pt2.index > this.index).forEach((element) => {
            element.index--;
            tween(element.pos.x, getTimerXPos(element.index), 0.32, (p) => element.pos.x = p, easings.easeOutQuint);
          });
        }
      }
    ]);
    timerSprite.angle = -10;
    timerSprite.width = timerSpacing + 5;
    timerSprite.height = timerSpacing + 5;
    timerSprite.pos.x = width() + timerSpacing;
    let tooltip = addTooltip(timerSprite, {
      text: "",
      direction: "down",
      layer: "ui",
      z: timerSprite.z - 1
    });
    tween(timerSprite.pos.x, getTimerXPos(timerSprite.index), 0.32, (p) => timerSprite.pos.x = p, easings.easeOutBack).onEnd(() => {
      tween(timerSprite.angle, 0, 0.32, (p) => timerSprite.angle = p, easings.easeOutQuint);
    });
    tween(powerupColor, WHITE, 1, (p) => timerSprite.color = p, easings.easeOutQuint);
    tween(30, 40, 0.32, (p) => timerSprite.pos.y = p, easings.easeOutQuint);
    tween(90, 0, 0.32, (p) => timerSprite.angle = p, easings.easeOutQuint);
    timerSprite.onUpdate(() => {
      tooltip.changePos(vec2(timerSprite.pos.x, timerSprite.pos.y + timerSprite.height / 2 + 5));
      tooltip.tooltipBg.opacity = timerSprite.opacity;
      tooltip.tooltipText.opacity = timerSprite.opacity;
      if (powerupTypes[type].removalTime == null)
        return;
      tooltip.tooltipText.text = `${powerupTypes[type].removalTime.toFixed(0)}s`;
    });
    timerSprite.onClick(() => {
      if (get(`poweruplog_${type}`).length == 0) {
        bop(timerSprite);
        addPowerupLog(type);
      }
    });
    let maxTime = powerupTypes[type].removalTime;
  }
  function addPowerupLog(powerupType) {
    function getPosForPowerupLog(index2) {
      return getPosInGrid(vec2(center().x, height() - 100), -index2, 0, vec2(300, 100));
    }
    let powerupTime = powerupTypes[powerupType].removalTime;
    let textInText = "";
    if (powerupType == "blab")
      textInText = choose(blabPhrases);
    const bgOpacity = 0.95;
    let bg2 = add([
      rect(0, 0, { radius: 0 }),
      pos(center().x, height() - 100),
      color(BLACK.lighten(2)),
      anchor("center"),
      layer("powerups"),
      opacity(bgOpacity),
      z(1),
      "poweruplog",
      `poweruplog_${powerupType}`
    ]);
    let textInBgOpts = { size: 25, align: "center", width: 300 };
    let textInBg = bg2.add([
      text("", textInBgOpts),
      pos(0, 0),
      anchor("center"),
      area(),
      opacity(),
      {
        update() {
          if (powerupTypes[powerupType].removalTime == null) {
            powerupTime = 0;
            return;
          }
          powerupTime = Math.round(parseFloat(powerupTypes[powerupType].removalTime.toFixed(1)));
          let stringPowerupTime = formatTime(powerupTime, true);
          let powerupMultiplier = powerupTypes[powerupType].multiplier;
          if (powerupType == "clicks")
            textInText = `Click production increased x${powerupMultiplier} for ${stringPowerupTime}`;
          else if (powerupType == "cursors")
            textInText = `Cursors production increased x${powerupMultiplier} for ${stringPowerupTime}`;
          else if (powerupType == "time") {
            textInText = `+${formatNumber(Math.round(scoreManager.autoScorePerSecond()) * powerupTime)}, the score you would have gained in ${stringPowerupTime}`;
          } else if (powerupType == "awesome")
            textInText = `Score production increased by x${powerupMultiplier} for ${stringPowerupTime}, AWESOME!!`;
          else if (powerupType == "store") {
            const discount = 100 - Math.round(powerupMultiplier * 100);
            textInText = `Store prices have a discount of ${discount}% for ${stringPowerupTime}, get em' now!`;
          } else if (powerupType == "blab")
            textInText = textInText;
          else
            throw new Error("powerup type doesn't exist");
          this.text = textInText;
        }
      }
    ]);
    let icon = bg2.add([
      sprite("white_noise"),
      pos(textInBg.pos.x - textInBg.width / 2 - 15, textInBg.pos.y),
      anchor("center"),
      opacity(),
      {
        update() {
          this.opacity = bg2.opacity;
        }
      }
    ]);
    parseAnimation(icon, powerupTypes[powerupType].sprite);
    icon.width = 35;
    icon.height = 35;
    let index = get("poweruplog").length - 1;
    let destinedPos = getPosForPowerupLog(index);
    bg2.onUpdate(() => {
      let radius = 5;
      let textWidth = textInBg.width + icon.width * 2;
      let textHeight = formatText({ text: textInText, ...textInBgOpts }).height + 15;
      if (textHeight < 50)
        textHeight = 50;
      bg2.height = lerp(bg2.height, textHeight, 0.5);
      bg2.width = lerp(bg2.width, textWidth, 0.5);
    });
    tween(0, bgOpacity, 0.5, (p) => bg2.opacity = p, easings.easeOutQuad);
    tween(height() + bg2.height, destinedPos.y, 0.5, (p) => bg2.pos.y = p, easings.easeOutQuad);
    wait(3.5, () => {
      tween(bg2.pos.y, bg2.pos.y - bg2.height, 0.5, (p) => bg2.pos.y = p, easings.easeOutQuad);
      bg2.fadeOut(0.5).onEnd(() => destroy(bg2));
      tween(textInBg.opacity, 0, 0.5, (p) => textInBg.opacity = p, easings.easeOutQuad);
      bg2.unuse("poweruplog");
    });
  }
  var allPowerupsInfo2 = {
    isHoveringAPowerup: false,
    canSpawnPowerups: false
  };
  function spawnPowerup(opts) {
    if (allPowerupsInfo2.canSpawnPowerups == false)
      return;
    if (opts == void 0)
      opts = {};
    function getRandomPowerup() {
      let list = Object.keys(powerupTypes);
      if (Math.round(scoreManager.autoScorePerSecond()) < 1 || GameState.cursors < 1)
        list.splice(list.indexOf("time"), 1);
      if (opts.natural == false)
        list.splice(list.indexOf("blab"), 1);
      let element = choose(list);
      if (chance(0.2) && opts.natural == true)
        element = "blab";
      return element;
    }
    opts.type = opts.type;
    if (opts.type == "random")
      opts.type = getRandomPowerup();
    const powerupColor = arrToColor(powerupTypes[opts.type].color);
    opts.pos = opts.pos || randomPos();
    const hoverScale = vec2(1.1);
    let powerupObj = add([
      sprite(`${opts.type}Powerup`),
      pos(opts.pos),
      scale(),
      area(),
      anchor("center"),
      opacity(),
      layer("powerups"),
      color(WHITE),
      rotate(0),
      z(0),
      waver({ wave_speed: 1.25, maxAmplitude: 5, minAmplitude: 0 }),
      area(),
      timer(),
      hoverController(100),
      "powerup",
      {
        type: opts.type,
        update() {
          this.angle = wave(-1, 1, time() * 3);
        },
        startHover() {
          tween(this.scale, hoverScale, 0.15, (p) => this.scale = p, easings.easeOutCubic);
        },
        endHover() {
          tween(this.scale, vec2(1), 0.15, (p) => this.scale = p, easings.easeOutCubic);
        },
        dissapear() {
          this.loop(0.1, () => {
            let maxOpacity = 1;
            if (this.opacity == maxOpacity) {
              this.opacity = 0;
              maxOpacity -= 0.1;
            } else if (this.opacity == 0)
              this.opacity = maxOpacity;
          });
          this.wait(1, () => {
            this.area.scale = vec2(0);
            tween(this.opacity, 0, 0.15, (p) => this.opacity = p).onEnd(() => this.destroy());
          });
        },
        clickAnim() {
          this.area.scale = vec2(0);
          tween(this.scale, hoverScale, 0.15, (p) => this.scale = p, easings.easeOutCubic);
          tween(this.opacity, 0, 0.15, (p) => this.opacity = p, easings.easeOutCubic).onEnd(() => {
            destroy(this);
          });
          let maxOpacity = 0.5;
          let blink = add([
            sprite(this.type + "Powerup"),
            pos(this.pos),
            scale(this.scale),
            anchor(this.anchor),
            opacity(0.5),
            color(),
            layer("powerups"),
            z(this.z - 1),
            timer()
          ]);
          blink.onUpdate(() => {
            blink.scale = this.scale;
            blink.width = this.width;
            blink.height = this.height;
            blink.pos.y -= 0.5;
          });
          let timeToLeave = 0.75;
          tween(blink.color, powerupColor, timeToLeave, (p) => blink.color = p, easings.easeOutBack);
          tween(blink.opacity, 0, timeToLeave, (p) => blink.opacity = p, easings.easeOutBack);
          blink.wait(timeToLeave, () => {
            destroy(blink);
          });
        },
        click() {
          this.clickAnim();
          playSfx("powerup", { detune: rand(-35, 35) });
          checkForUnlockable();
          GameState.stats.powerupsClicked++;
          let multiplier = 0;
          let time2 = 0;
          if (opts.multiplier == null) {
            if (opts.type == "clicks" || opts.type == "cursors") {
              time2 += opts.time ?? randi(15, 30);
              multiplier = rand(1.5, 3) * GameState.powerupPower;
            } else if (opts.type == "awesome") {
              time2 += opts.time ?? randi(10, 15);
              multiplier = randi(4, 8) * GameState.powerupPower;
            } else if (opts.type == "store") {
              time2 += opts.time ?? randi(10, 15);
              multiplier = rand(0.85, 0.9) / GameState.powerupPower;
            } else if (opts.type == "time") {
              multiplier = 1;
              time2 += opts.time ?? rand(30, 60) * GameState.powerupPower;
              scoreManager.addTweenScore(scoreManager.scorePerSecond() * time2);
            } else if (opts.type == "blab") {
              multiplier = 1;
              time2 = 1;
              scoreManager.addScore(1);
            }
          }
          if (opts.type == "clicks" || opts.type == "cursors" || opts.type == "store" || opts.type == "awesome") {
            let checkTimer = get(`${opts.type}_putimer`)[0];
            if (checkTimer)
              checkTimer.updateTime();
            else
              addTimer(opts.type);
          }
          multiplier = parseFloat(multiplier.toFixed(1));
          powerupTypes[opts.type].multiplier = multiplier;
          powerupTypes[opts.type].removalTime = time2;
          addPowerupLog(opts.type);
        }
      }
    ]);
    powerupObj.startWave();
    tween(vec2(hoverScale).sub(0.4), hoverScale, 0.25, (p) => powerupObj.scale = p, easings.easeOutBack);
    tween(0, 1, 0.2, (p) => powerupObj.opacity = p, easings.easeOutBack);
    powerupObj.onHover(() => {
      powerupObj.startHover();
    });
    powerupObj.onHoverEnd(() => {
      powerupObj.endHover();
    });
    powerupObj.onClick(() => {
      powerupObj.click();
    });
    powerupObj.wait(20, () => {
      powerupObj.dissapear();
    });
    powerupObj.loop(0.5, () => {
      let shimmer = add([
        layer(powerupObj.layer),
        z(powerupObj.z - 1),
        pos(powerupObj.pos),
        opacity(1),
        timer(),
        particles({
          max: 20,
          speed: [50, 100],
          angle: [0, 360],
          angularVelocity: [45, 90],
          lifeTime: [1, 2],
          scales: [0.7, 1],
          colors: [powerupColor, powerupColor.darken(25), powerupColor.lighten(100)],
          opacities: [0.1, 1, 0],
          texture: getSprite("part_star").data.tex,
          quads: [getSprite("part_star").data.frames[0]]
        }, {
          lifetime: 1.5,
          rate: 0,
          direction: 90,
          spread: 20
        })
      ]);
      shimmer.emit(randi(2, 4));
      shimmer.onEnd(() => shimmer.destroy());
    });
  }
  function Powerup_RemovalTimeManager() {
    for (const powerup in powerupTypes) {
      if (powerupTypes[powerup].removalTime != null) {
        if (powerup != "time")
          powerupTypes[powerup].removalTime -= dt();
        if (powerupTypes[powerup].removalTime < 0) {
          powerupTypes[powerup].removalTime = null;
          get(`${powerup}_putimer`)?.forEach((timer2) => timer2.end());
          powerupTypes[powerup].multiplier = 1;
        }
      }
    }
    if (get("powerup").length > 0) {
      allPowerupsInfo2.isHoveringAPowerup = get("powerup").some((powerup) => powerup.isHovering());
    }
  }
  function Powerup_NaturalSpawnManager() {
    for (let powerup in powerupTypes) {
      powerupTypes[powerup].runningTime += dt();
      if (powerupTypes[powerup].runningTime > powerupTypes[powerup].maxTime) {
        powerupTypes[powerup].runningTime = 0;
        if (chance(powerupTypes[powerup].chance)) {
          powerupTypes[powerup].maxTime += rand(-5, 5);
          spawnPowerup({
            type: powerup
          });
        }
      }
    }
  }

  // source/game/ascension/dialogues.ts
  var defaultTalkingSpeed = 0.025;
  var someVowels = ["a", "e", "o", "i"];
  var Dialogue = class {
    /**
     * The key of the dialogue (back1, back2, etc) 
     */
    key;
    /**
     * The text of the dialogue
     */
    text;
    /**
     * The speed of the dialogue
     */
    speed;
    /**
     * Wheter the dialogue is a random one that has no continuing or if it's something like tutorial
     */
    extra;
    constructor(key, text2, extra, speed) {
      this.key = key;
      this.text = text2;
      this.extra = extra || false;
      this.speed = speed || defaultTalkingSpeed;
    }
  };
  var mageDialogues = [
    new Dialogue("tutorial1", "Welcome..."),
    new Dialogue("tutorial2", "Im glad you're here..."),
    new Dialogue("tutorial3", "You're ascending, which means you have a lot of stuff to learn..."),
    new Dialogue("tutorial4", "These are cards, when they're clicked you get an additive percentage"),
    new Dialogue("tutorial5", "You buy them with mana, which you get after gaining large amounts of score"),
    new Dialogue("tutorial6", "For every mana you get, you'll get +1% on your score production"),
    new Dialogue("tutorial7", "When returning with your new cards, all your score will be lost"),
    new Dialogue("tutorial8", "Good luck traveller (so corny)"),
    // extra ones
    new Dialogue("eye1", "Stop that", true),
    new Dialogue("eye2", "Don't do that", true),
    new Dialogue("eye3", "STOP", true),
    new Dialogue("eye4", "I'm throwing hands if you keep doing that", true),
    new Dialogue("eye5", "How would YOU like your eye getting clicked", true),
    new Dialogue("eye6", "...", true),
    new Dialogue("eye7", "Ok", true),
    new Dialogue("hex1", "No backsies", true),
    new Dialogue("hex2", "Mine now", true),
    new Dialogue("hex3", "I want to play with it :(", true),
    new Dialogue("hex4", "I'm not giving this back", true),
    new Dialogue("hex5", "Pick a card", true),
    new Dialogue("hex6", "Stop it", true),
    new Dialogue("back1", "Welcome back...", true),
    new Dialogue("back2", "Here again?", true),
    new Dialogue("back2", "Not busy it seems", true),
    new Dialogue("back3", "Really putting in the work, huh?", true),
    new Dialogue("back4", "Another one", true),
    new Dialogue("fun1", "Fun fact: Hexagons have 6 (six) sides", true),
    new Dialogue("fun2", "Welcome to fortnite", true),
    new Dialogue("fun3", "Cold, so cold...", true),
    new Dialogue("fun4", "Find my obituaries", true),
    new Dialogue("fun5", `"Gimmicking" your hexagon?`, true),
    new Dialogue("fun6", "Tasty hexa-gone, none for you", true),
    new Dialogue("fun7", "Gotta click them all", true),
    new Dialogue("fun8", "Hum... Hum...", true, 0.1),
    new Dialogue("fun9", "Y U M M E R S", true, 0.1)
  ];
  var yummersKey = mageDialogues.find((dialogue2) => dialogue2.text == "Y U M M E R S").key;
  var humKey = mageDialogues.find((dialogue2) => dialogue2.text == "Hum... Hum...").key;
  function getDialogue(key) {
    return mageDialogues[mageDialogues.indexOf(mageDialogues.filter((dialogue2) => dialogue2.key === key)[0])];
  }
  function getRandomDialogue(generalType) {
    const arrayOfDialoguesWithThatType = mageDialogues.filter((dialogue2) => dialogue2.key.includes(generalType));
    return getRandomElementDifferentFrom(arrayOfDialoguesWithThatType, ascension.currentDialoguekey);
  }
  function startDialoguing() {
    dialogue = add([]);
    dialogue.box = addDialogueBox();
    dialogue.textBox = addDialogueText();
  }
  function playerReadAction() {
    if (dialogue.textBox.text != currentlySaying)
      skipTalk();
    else
      continueDialogue(ascension.currentDialoguekey);
  }
  function addDialogueBox() {
    let box = add([
      sprite("dialogue"),
      pos(623, 144),
      anchor("center"),
      scale(),
      area({ scale: 0.8 }),
      opacity(),
      layer("ascension"),
      z(1),
      "textbox",
      {
        defaultPos: vec2(623, 144)
      }
    ]);
    box.on("talk", (speaker2) => {
      if (speaker2 == "card") {
        box.use(sprite("hoverDialogue"));
        tween(box.defaultPos.y + 10, box.defaultPos.y, 0.25, (p) => box.pos.y = p, easings.easeOutQuint);
      } else if (speaker2 == "mage") {
        box.use(sprite("dialogue"));
        tween(box.defaultPos.x - 10, box.defaultPos.x, 0.25, (p) => box.pos.x = p, easings.easeOutQuint);
      }
      tween(0.75, 1, 0.25, (p) => box.scale.x = p, easings.easeOutQuint);
    });
    box.onClick(() => {
      playerReadAction();
    });
    box.onKeyPress(["space", "enter"], () => {
      playerReadAction();
    });
    tween(0.5, 1, 0.25, (p) => box.scale.x = p, easings.easeOutQuint);
    tween(0, 1, 0.25, (p) => box.opacity = p, easings.easeOutQuint);
    return box;
  }
  function addDialogueText() {
    let textBox = add([
      text("", {
        styles: {
          "wavy": (idx) => ({
            pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5))
          })
        },
        width: 606,
        // width without tail
        align: "center",
        size: 25
      }),
      pos(670, 127),
      anchor("center"),
      color(BLACK),
      layer("ascension"),
      opacity(),
      z(dialogue.box.z + 1),
      "textbox",
      "boxText"
    ]);
    return textBox;
  }
  var activeLetterWaits = [];
  var currentlySaying = "";
  var dialogue;
  var currentOnEnd = () => {
  };
  function talk(speaker2, thingToSay, speed, onEnd) {
    if (!onEnd)
      currentOnEnd = () => {
      };
    else
      currentOnEnd = onEnd;
    dialogue.box.trigger("talk", speaker2, thingToSay);
    speaker2 = speaker2 || "card";
    thingToSay = thingToSay || "No dialogue, missing a dialogue here";
    speed = speed || 0.025;
    if (currentlySaying == thingToSay)
      speed /= 2;
    currentlySaying = thingToSay;
    activeLetterWaits.forEach((waitCall) => waitCall.cancel());
    activeLetterWaits = [];
    dialogue.textBox.text = "";
    let currentDelay = 0;
    Array.from(thingToSay).forEach((letter, index) => {
      let delay = speed;
      if (letter === "," || letter === "_") {
        delay = speed * 5;
      }
      currentDelay += delay;
      const waitCall = wait(currentDelay, () => {
        dialogue.textBox.text += letter;
        if (speaker2 == "mage") {
          if (!(thingToSay == "Y U M M E R S" || thingToSay == "Hum... Hum...")) {
            const vowel = chance(0.5) ? choose(someVowels) : "e";
            playSfx(`mage_${vowel}`, { detune: rand(-150, 150) });
          }
        }
        if (index == thingToSay.length - 1) {
          let dialogueKey = void 0;
          mageDialogues.forEach((dialogue2) => {
            if (dialogue2.text == thingToSay)
              dialogueKey = dialogue2.key;
          });
          if (dialogueKey == void 0)
            dialogueKey = null;
          dialogue.box.trigger("dialogueEnd", dialogueKey);
          currentOnEnd();
        }
      });
      activeLetterWaits.push(waitCall);
    });
  }
  function continueDialogue(dialogueKey) {
    let currentDialogue = getDialogue(dialogueKey);
    let thePlayedNewDialogue = null;
    if (currentDialogue.extra == true) {
      let dialogueType = removeNumbersOfString(dialogueKey);
      let newRandDialogue = getRandomDialogue(dialogueType);
      if (currentDialogue.key.includes("back")) {
        dialogueType = "fun";
        newRandDialogue = getRandomDialogue(dialogueType);
      }
      thePlayedNewDialogue = newRandDialogue;
      ascension.currentDialoguekey = thePlayedNewDialogue.key;
    } else {
      let tutorialDialoguesKeys = mageDialogues.map((dialogue2) => dialogue2.key).filter((key) => key.includes("tutorial"));
      let index = tutorialDialoguesKeys.findIndex((key) => key == dialogueKey);
      let nextDialogueKey = tutorialDialoguesKeys[index + 1];
      if (nextDialogueKey != void 0) {
        thePlayedNewDialogue = getDialogue(nextDialogueKey);
        ascension.currentDialoguekey = thePlayedNewDialogue.key;
      } else {
        let extraDialogueKeys = mageDialogues.map((dialogue2) => dialogue2.key).filter((key) => key.includes("fun"));
        let nextDialogueKey2 = getRandomElementDifferentFrom(extraDialogueKeys, ascension.currentDialoguekey);
        thePlayedNewDialogue = getDialogue(nextDialogueKey2);
        ascension.currentDialoguekey = thePlayedNewDialogue.key;
      }
    }
    talk("mage", thePlayedNewDialogue.text, thePlayedNewDialogue.speed);
  }
  function skipTalk() {
    activeLetterWaits.forEach((waitCall) => waitCall.cancel());
    dialogue.textBox.text = currentlySaying;
    tween(dialogue.box.defaultPos.y + 10, dialogue.box.defaultPos.y, 0.25, (p) => dialogue.box.pos.y = p, easings.easeOutQuint);
    tween(dialogue.box.defaultPos.x + 10, dialogue.box.defaultPos.x, 0.25, (p) => dialogue.box.pos.x = p, easings.easeOutQuint);
    currentOnEnd();
    dialogue.box.trigger("dialogueEnd", ascension.currentDialoguekey);
  }

  // source/game/ascension/mage.ts
  function addMage() {
    let mageClothColor = rgb(0, 51, 102);
    let mage;
    mage = add([
      pos(-17, 154),
      waver({ wave_speed: 1, maxAmplitude: 2.5 }),
      layer("ascension"),
      z(1),
      opacity(1),
      anchor("center"),
      "mage"
    ]);
    mage.startWave();
    let mage_body = mage.add([
      pos(),
      sprite("mage_body"),
      z(2),
      "mage_body"
    ]);
    let mage_body_lightning = mage.add([
      pos(),
      sprite("mage_body_lightning"),
      z(3),
      opacity(0.25),
      "mage_lightning"
    ]);
    let mage_cursors = mage.add([
      pos(0, -7),
      sprite("mage_cursors"),
      z(0),
      waver({ wave_speed: 1, maxAmplitude: 5 }),
      opacity(1),
      color(WHITE.darken(50))
    ]);
    mage_cursors.startWave();
    let mage_eye = mage.add([
      pos(117, 120),
      sprite("mage_eye"),
      area({ scale: 0.8 }),
      z(2),
      {
        timeToBlinkAgain: 8,
        timeUntilBlink: 8,
        update() {
          this.timeToBlinkAgain -= dt();
          if (this.timeToBlinkAgain < 0) {
            this.timeToBlinkAgain = rand(5, 8);
            this.timeToBlinkAgain = this.timeToBlinkAgain;
            if (chance(0.75))
              this.play("blink");
          }
        }
      }
    ]);
    mage_eye.onClick(() => {
      if (GameState.stats.timesAscended < 1)
        return;
      let randomDialogue = getRandomDialogue("eye");
      talk("mage", randomDialogue.text, randomDialogue.speed);
      mage_eye.play("blink");
    });
    let mage_toparm = mage.add([
      pos(0, 0),
      sprite("mage_toparm"),
      z(1),
      {
        update() {
          this.angle = wave(-0.5, 0.5, time());
        }
      }
    ]);
    let mage_toparm_lightning = mage.add([
      pos(0, 0),
      sprite("mage_toparm_lightning"),
      z(4),
      opacity(0.25),
      "mage_lightning",
      {
        update() {
          this.angle = wave(-0.5, 0.5, time());
        }
      }
    ]);
    let mage_botarm = mage.add([
      pos(5, 240),
      sprite("mage_botarm"),
      z(7),
      anchor("left"),
      {
        update() {
          this.angle = wave(-1, 1, time());
        }
      }
    ]);
    let mage_botarm_lightning = mage.add([
      pos(5, 240),
      sprite("mage_botarm_lightning"),
      z(8),
      anchor("left"),
      opacity(0.25),
      "mage_lightning",
      {
        update() {
          this.angle = wave(-1, 1, time());
        }
      }
    ]);
    let mage_hexagon = mage.add([
      pos(GameState.settings.panderitoMode ? vec2(231, 250) : vec2(231, 244)),
      sprite(GameState.settings.panderitoMode ? "panderito" : "hexagon"),
      scale(0.35),
      waver({ wave_speed: 1, maxAmplitude: 10 }),
      rotate(0),
      anchor("center"),
      color(WHITE),
      z(5),
      area({ scale: 0.8 }),
      "hexagon",
      {
        update() {
          this.angle += 0.02;
        }
      }
    ]);
    mage_hexagon.onClick(() => {
      if (GameState.stats.timesAscended < 1)
        return;
      let randomDialogue = getRandomDialogue("hex");
      talk("mage", randomDialogue.text, randomDialogue.speed);
      bop(mage_hexagon, 0.01);
    });
    mage.get("mage_lightning").forEach((o) => o.onUpdate(() => {
      o.color = mage_hexagon.color;
    }));
    return mage;
  }

  // source/game/ascension/cards.ts
  var cardsInfo = {
    "clickersCard": {
      info: "Clickers are +[number]% more efficient",
      basePrice: 1,
      percentageIncrease: 80,
      idx: 0,
      gamestateInfo: {
        key: "clickPercentage",
        objectAmount: "ascension.clickPercentagesBought"
      }
    },
    "cursorsCard": {
      info: "Cursors are +[number]% more efficient",
      basePrice: 1,
      percentageIncrease: 110,
      idx: 1,
      gamestateInfo: {
        key: "cursorsPercentage",
        objectAmount: "ascension.cursorsPercentagesBought"
      }
    },
    "powerupsCard": {
      info: "Powerups will be +[number]x more powerful",
      basePrice: 4,
      percentageIncrease: 75,
      idx: 2,
      gamestateInfo: {
        key: "powerupPower",
        objectAmount: "ascension.powerupPowersBought"
      }
    },
    "critsCard": {
      info: "Criticals will be +[number]x more powerful",
      basePrice: 5,
      percentageIncrease: 90,
      idx: 3,
      gamestateInfo: {
        key: "critPower",
        objectAmount: "ascension.critPowersBought"
      }
    },
    "hexColorCard": {
      info: "You can customize the hexagon's color",
      unlockPrice: 5,
      idx: 4
    },
    "bgColorCard": {
      info: "You can customize the background's color",
      unlockPrice: 5,
      idx: 5
    }
  };
  function cardTypes() {
    return Object.keys(cardsInfo).sort((a, b) => cardsInfo[a].idx - cardsInfo[b].idx);
  }
  var cardYPositions = {
    hidden: 691,
    /**
     * The position they are when they're stacked
     */
    dealing: 341,
    unhovered: 544,
    hovered: 524
  };
  function getAdditive(type) {
    let additive;
    if (type == "clickersCard" || type == "cursorsCard") {
      additive = randi(8, 12);
    } else if (type == "powerupsCard") {
      additive = rand(0.1, 0.6);
    } else if (type == "critsCard") {
      if (GameState.ascension.critPowersBought == 0)
        additive = 1;
      else
        additive = rand(0.1, 0.25);
    } else if (type == "hexColorCard" || type == "bgColorCard") {
      additive = 0;
    }
    additive = parseFloat(additive.toFixed(1));
    return additive;
  }
  var typeToSprite = (type) => `card_${type.replace("Card", "")}`;
  function flipCard(card, newType) {
    let flipOneSideTime = 0.075;
    card.area.scale = vec2(0);
    tween(1, 0, flipOneSideTime, (p) => card.scale.x = p).onEnd(() => {
      card.type = newType;
      card.typeIdx = cardsInfo[card.type].idx;
      card.additive = getAdditive(card.type);
      card.sprite = typeToSprite(card.type);
      tween(0, 1, flipOneSideTime, (p) => card.scale.x = p).onEnd(() => {
        card.area.scale = vec2(1);
        card.trigger("flip");
      });
    });
  }
  function addCard(cardType, position) {
    let card = add([
      // starts at backcard
      sprite("backcard"),
      pos(position),
      rotate(0),
      layer("ascension"),
      z(6),
      scale(),
      anchor("center"),
      area({ scale: vec2(0) }),
      "card",
      {
        indexInDeck: 0,
        // 1 - 4 / 1 being leftmost
        price: 1,
        type: cardType,
        typeIdx: cardsInfo[cardType].idx,
        additive: getAdditive(cardType),
        update() {
          if (!(this.type == "hexColorCard" || this.type == "bgColorCard")) {
            let objectAmount = getVariable(GameState, cardsInfo[this.type].gamestateInfo.objectAmount);
            this.price = getPrice({
              basePrice: cardsInfo[this.type].basePrice,
              percentageIncrease: cardsInfo[this.type].percentageIncrease,
              objectAmount
            });
          } else {
            this.price = cardsInfo[this.type].unlockPrice;
          }
        },
        startHover() {
          tween(this.pos.y, cardYPositions.hovered, 0.25, (p) => this.pos.y = p, easings.easeOutQuart);
          tween(this.angle, choose([-1.5, 1.5]), 0.25, (p) => this.angle = p, easings.easeOutQuart);
          let message;
          if (this.type == "critsCard" && GameState.ascension.critPowersBought == 0) {
            message = "When you click, you will have a random chance of getting more score per click";
          } else {
            message = cardsInfo[this.type].info.replace("[number]", this.additive);
            if (!(this.type == "hexColorCard" || this.type == "bgColorCard")) {
              let currentGot = getVariable(GameState, cardsInfo[this.type].gamestateInfo.key);
              currentGot = parseFloat(currentGot.toFixed(1));
              if (this.type == "powerupsCard" || this.type == "critsCard") {
                message += ` (Current power: ${currentGot}x)`;
              } else {
                message += ` (You have: ${currentGot}%)`;
              }
            }
          }
          talk("card", message);
          playSfx("onecard", { detune: rand(-75, 75) * this.indexInDeck });
        },
        buy() {
          tween(0.75, 1, 0.15, (p) => this.scale.y = p, easings.easeOutQuart);
          if (this.type == "hexColorCard" || this.type == "bgColorCard") {
            let oldType = this.type;
            flipCard(card, cardTypes()[this.typeIdx - 2]);
            let endascensioncheck = ROOT.on("endAscension", () => {
              wait(1, () => {
                unlockWindow(oldType.replace("Card", "Win"));
              });
              endascensioncheck.cancel();
            });
          } else {
            if (this.type == "critsCard" && GameState.ascension.critPowersBought == 0) {
              GameState.critPower = 1;
              GameState.ascension.critPowersBought = 1;
            } else {
              let currentPercentage = getVariable(GameState, cardsInfo[this.type].gamestateInfo.key);
              let percentagesBought = getVariable(GameState, cardsInfo[this.type].gamestateInfo.objectAmount);
              setVariable(GameState, cardsInfo[this.type].gamestateInfo.key, currentPercentage + this.additive);
              setVariable(GameState, cardsInfo[this.type].gamestateInfo.objectAmount, percentagesBought + 1);
            }
            this.additive = getAdditive(this.type);
            this.startHover();
          }
          function subMana(amount) {
            tween(GameState.ascension.mana, GameState.ascension.mana - amount, 0.32, (p) => GameState.ascension.mana = Math.round(p), easings.easeOutExpo);
          }
          subMana(this.price);
          playSfx("kaching", { detune: rand(-50, 50) });
          if (ascension.canLeave == false) {
            ascension.canLeave = true;
            ROOT.trigger("canLeaveAscension");
          }
        },
        drawInspect() {
          drawText({
            text: `deck: ${this.indexInDeck}
type: ${this.typeIdx} - ${this.type}`,
            pos: vec2(0, -this.height),
            anchor: "center",
            size: 25,
            color: WHITE
          });
        }
      }
    ]);
    card.on("dealingOver", () => {
      card.onHover(() => {
        card.startHover();
      });
      card.onHoverEnd(() => {
        tween(card.pos.y, cardYPositions.unhovered, 0.25, (p) => card.pos.y = p, easings.easeOutQuart);
      });
      card.onClick(() => {
        if (GameState.ascension.mana >= card.price)
          card.buy();
        else {
          tween(0.75, 1, 0.15, (p) => card.scale.x = p, easings.easeOutQuart);
        }
      });
      const greenPrice = GREEN.lighten(30);
      const redPrice = RED.lighten(30);
      card.onDraw(() => {
        drawText({
          text: `${card.price}\u2726`,
          align: "center",
          anchor: "center",
          pos: vec2(0, 35),
          size: 26,
          scale: card.scale,
          color: GameState.ascension.mana >= card.price ? greenPrice : redPrice
        });
        if (!(card.type == "hexColorCard" || card.type == "bgColorCard")) {
          drawText({
            text: `+${card.additive}%`,
            size: 15,
            color: BLACK,
            align: "left",
            pos: vec2(-59, -82)
          });
        }
      });
    });
    return card;
  }
  function spawnCards() {
    const cardSpacing = 150;
    let cardsToAdd = [
      "clickersCard",
      "cursorsCard",
      !isWindowUnlocked("hexColorWin") ? "hexColorCard" : "powerupsCard",
      !isWindowUnlocked("bgColorWin") ? "bgColorCard" : "critsCard"
    ];
    let dealingXPosition = 947;
    playSfx("allcards", { detune: rand(-25, 25) });
    cardsToAdd.forEach((cardToAdd, index) => {
      let theCard = addCard(cardToAdd, vec2(dealingXPosition, cardYPositions.hidden));
      theCard.angle = rand(-4, 4);
      theCard.pos.x = dealingXPosition + rand(-5, 5);
      theCard.pos.y = cardYPositions.hidden;
      theCard.indexInDeck = index;
      let randOffset = rand(-5, 5);
      tween(theCard.pos.y, cardYPositions.dealing + randOffset, 0.75, (p) => theCard.pos.y = p, easings.easeOutQuint);
      function dealTheCards() {
        wait(0.25 * theCard.indexInDeck, () => {
          function getCardXPos(index2) {
            let startPoint = 492;
            return startPoint + cardSpacing + cardSpacing * (index2 - 1);
          }
          playSfx("onecard", { detune: rand(-25, 25) * theCard.indexInDeck });
          tween(theCard.angle, rand(-1.5, 1.5), 0.25, (p) => theCard.angle = p, easings.easeOutQuart);
          tween(theCard.pos.x, getCardXPos(theCard.indexInDeck), 0.25, (p) => theCard.pos.x = p, easings.easeOutQuart);
          tween(theCard.pos.y, cardYPositions.unhovered, 0.25, (p) => theCard.pos.y = p, easings.easeOutQuart);
          tween(theCard.scale.x, 0, 0.25, (p) => theCard.scale.x = p, easings.easeOutQuart).onEnd(() => {
            theCard.sprite = typeToSprite(theCard.type);
            tween(theCard.scale.x, 1, 0.25, (p) => theCard.scale.x = p, easings.easeOutQuart).onEnd(() => {
              theCard.area.scale = vec2(1);
              theCard.trigger("dealingOver");
              if (GameState.stats.timesAscended > 0) {
                if (theCard.indexInDeck == 3) {
                  let button = addLeaveButton();
                  leaveButtonSpawnAnim(button);
                }
              }
            });
          });
        });
      }
      wait(0.75, () => {
        dealTheCards();
      });
    });
  }

  // source/game/ascension/ascension.ts
  var ascension = {
    ascending: false,
    canLeave: false,
    currentDialoguekey: ""
  };
  function addLeaveButton() {
    let leaveButton = add([
      sprite("leaveButton"),
      pos(968, 286),
      anchor("center"),
      area({ scale: vec2(0) }),
      scale(0),
      layer("ascension"),
      opacity(),
      z(1),
      "leaveButton"
    ]);
    return leaveButton;
  }
  function leaveButtonSpawnAnim(leaveButton) {
    leaveButton.fadeIn(0.25, easings.easeOutExpo);
    tween(leaveButton.scale, vec2(1), 0.25, (p) => leaveButton.scale = p, easings.easeOutExpo).onEnd(() => {
      leaveButton.area.scale = vec2(1);
      let tooltip;
      leaveButton.onHover(() => {
        tween(leaveButton.scale, vec2(1.1), 0.25, (p) => leaveButton.scale = p, easings.easeOutExpo);
        mouse.play("point");
        tooltip = addTooltip(leaveButton, {
          text: "When clicked\nwill end the ascension",
          direction: "left",
          lerpValue: 0.5,
          layer: leaveButton.layer,
          z: leaveButton.z
        });
      });
      leaveButton.onHoverEnd(() => {
        tween(leaveButton.scale, vec2(1), 0.25, (p) => leaveButton.scale = p, easings.easeOutExpo);
        mouse.play("cursor");
        tooltip.end();
      });
      leaveButton.onClick(() => {
        endAscension();
        playSfx("clickButton");
      });
    });
  }
  function startAscending() {
    ascension.ascending = true;
    allPowerupsInfo2.canSpawnPowerups = false;
    ROOT.trigger("ascension", { score: GameState.score, scoreThisRun: GameState.scoreThisRun });
    hexagon.interactable = false;
    folderObj.interactable = false;
    folderObj.fold();
    get("window").forEach((window2) => {
      window2.close();
    });
    tween(hexagon.opacity, 0, 0.35, (p) => hexagon.opacity = p, easings.easeOutCubic);
    let blackBg = add([
      rect(width(), height()),
      color(BLACK),
      fixed(),
      opacity(0.5),
      anchor("center"),
      pos(center()),
      z(0),
      layer("ascension"),
      "ascensionBg"
    ]);
    let mage = addMage();
    mage.pos.x = -489;
    blackBg.fadeIn(0.35).onEnd(() => {
      tween(-489, -17, 0.5, (p) => mage.pos.x = p, easings.easeOutQuart);
      tween(145, 154, 0.5, (p) => mage.pos.y = p, easings.easeOutQuart);
      tween(0.5, 1, 0.5, (p) => mage.opacity = p, easings.easeOutQuart).onEnd(() => {
        startDialoguing();
        mage.trigger("endAnimating");
      });
    });
    wait(0.1, () => {
      let manaText = add([
        text("", { align: "left", font: "lambdao", size: 38 }),
        pos(4, 19),
        anchor("left"),
        layer("ascension"),
        opacity(1),
        "manaText",
        {
          hiddenXPos: -72,
          update() {
            this.text = `\u2726${formatNumberSimple(GameState.ascension.mana)}`;
          }
        }
      ]);
      manaText.fadeIn(0.35);
      tween(manaText.hiddenXPos, 4, 0.5, (p) => manaText.pos.x = p, easings.easeOutQuart);
    });
    function startTheTalking() {
      if (GameState.stats.timesAscended > 0) {
        let backDialogue = getRandomDialogue("back");
        ascension.currentDialoguekey = backDialogue.key;
        talk("mage", backDialogue.text, backDialogue.speed);
      } else {
        let dialogues = getDialogue("tutorial1");
        ascension.currentDialoguekey = "tutorial1";
        talk("mage", dialogues.text, dialogues.speed);
      }
    }
    mage.on("endAnimating", () => {
      startTheTalking();
      dialogue.box.on("talk", (speaker2, thingToSay) => {
        let theDialogue = mageDialogues.find((dialogue2) => dialogue2.text == thingToSay);
        if (theDialogue == void 0)
          return;
        let keySpoken = theDialogue.key;
        if (keySpoken == humKey) {
          let sfx = playSfx("mage_huntressHum");
          let cancelDialogueChecker;
          let endAscensionChecker;
          wait(0.1, () => {
            cancelDialogueChecker = dialogue.box.on("talk", () => {
              sfx.stop();
              cancelDialogueChecker.cancel();
            });
            endAscensionChecker = ROOT.on("endAscension", () => {
              sfx.stop();
              endAscensionChecker.cancel();
            });
          });
        }
        if (keySpoken == yummersKey) {
          let sfx = playSfx("mage_yummers");
          let cancelDialogueChecker;
          let endAscensionChecker;
          wait(0.1, () => {
            cancelDialogueChecker = dialogue.box.on("talk", () => {
              sfx.stop();
              cancelDialogueChecker.cancel();
            });
            endAscensionChecker = ROOT.on("endAscension", () => {
              sfx.stop();
              endAscensionChecker.cancel();
            });
          });
        }
      });
      dialogue.box.on("dialogueEnd", (key) => {
        if (key == null)
          return;
        if (key == "tutorial3" || key.includes("back") && get("card").length == 0) {
          wait(0.5, () => {
            spawnCards();
          });
        }
        const thingy = mageDialogues.map((dialogue2) => dialogue2.key).filter((dialogue2) => dialogue2.includes("tutorial"));
        const lastTutorialkey = thingy[thingy.length - 1];
        if (GameState.stats.timesAscended < 1) {
          if (key == lastTutorialkey) {
            let button = addLeaveButton();
            leaveButtonSpawnAnim(button);
          }
        }
      });
    });
  }
  function endAscension() {
    GameState.stats.timesAscended++;
    folderObj.interactable = true;
    ROOT.trigger("endAscension");
    allPowerupsInfo2.canSpawnPowerups = true;
    ascension.ascending = false;
    get("*", { recursive: true }).filter((obj) => obj.layer == "ascension").forEach((obj) => {
      if (obj.is("mage") || obj.is("manaText")) {
        tween(obj.pos.x, obj.pos.x - obj.width, 0.5, (p) => obj.pos.x = p, easings.easeOutQuart).onEnd(() => destroy(obj));
      } else if (obj.is("card")) {
        tween(obj.pos.y, obj.pos.y + obj.height, 0.5, (p) => obj.pos.y = p, easings.easeOutQuart).onEnd(() => destroy(obj));
      } else if (obj.is("textbox")) {
        tween(obj.pos.y, -obj.height, 0.5, (p) => obj.pos.y = p, easings.easeOutQuart).onEnd(() => destroy(obj));
      } else if (obj.is("ascensionBg") || obj.is("leaveButton")) {
        obj.fadeOut(0.5).onEnd(() => destroy(obj));
      }
    });
    scoreManager.resetRun();
    wait(0.25, () => {
      hexagonIntro();
    });
    wait(0.5, () => {
      ascension.canLeave = false;
      if (!isAchievementUnlocked("ascension.times_1"))
        unlockAchievement("ascension.times_1");
    });
  }

  // source/game/windows/windows-api/folderObj.ts
  var folderObj;
  var folded = true;
  var timeSinceFold = 0;
  var movingMinibuttons;
  function addFolderObj() {
    folded = true;
    timeSinceFold = 0;
    allObjWindows2.isHoveringAWindow = false;
    allObjWindows2.isDraggingAWindow = false;
    allPowerupsInfo2.isHoveringAPowerup = false;
    movingMinibuttons = false;
    let theFolderObj = add([
      sprite("folderObj"),
      pos(width() - 40, height() - 40),
      area({ scale: vec2(1.2) }),
      layer("ui"),
      z(0),
      scale(),
      anchor("center"),
      hoverController(3),
      "folderObj",
      {
        defaultScale: vec2(1.2),
        interactable: true,
        unfold() {
          folded = false;
          timeSinceFold = 0;
          playSfx("fold");
          GameState.taskbar = sortedTaskbar();
          if (get("minibutton").length == 0) {
            GameState.taskbar.forEach((key, taskbarIndex) => {
              let newminibutton = addMinibutton({
                windowKey: key,
                taskbarIndex,
                initialPosition: theFolderObj.pos
              });
            });
            movingMinibuttons = true;
            wait(0.32, () => movingMinibuttons = false);
          }
          this.trigger("unfold");
        },
        fold() {
          folded = true;
          movingMinibuttons = true;
          get("minibutton").forEach((minibutton) => {
            tween(minibutton.opacity, 0, 0.32, (p) => minibutton.opacity = p, easings.easeOutQuint);
            tween(minibutton.pos, theFolderObj.pos, 0.32, (p) => minibutton.pos = p, easings.easeOutQuint).then(() => {
              destroy(minibutton);
              movingMinibuttons = false;
            });
          });
          playSfx("fold", { detune: -150 });
          this.trigger("fold");
        },
        manageFold() {
          if (folded)
            theFolderObj.unfold();
          else
            theFolderObj.fold();
        },
        addSlots() {
          get("minibutton").filter((minibutton) => !minibutton.extraMb).forEach((minibutton, index) => {
            add([
              rect(20, 20, { radius: 4 }),
              pos(getMinibuttonPos(index)),
              color(BLACK),
              anchor("center"),
              opacity(0.5),
              "minibuttonslot",
              "slot_" + index,
              {
                taskbarIndex: index
              }
            ]);
          });
        },
        deleteSlots() {
          let minibuttonsslots = get("minibuttonslot");
          minibuttonsslots?.forEach((minibuttonslot) => {
            destroy(minibuttonslot);
          });
        },
        update() {
          this.flipX = folded ? true : false;
          if (curDraggin?.is("gridMiniButton") || curDraggin?.is("minibutton"))
            return;
          if (!movingMinibuttons) {
            if (this.interactable == true && isKeyPressed("space")) {
              this.manageFold();
              this.deleteSlots();
            }
          }
          if (timeSinceFold < 0.25)
            timeSinceFold += dt();
          if (timeSinceSkip < 5)
            setTimeSinceSkip(timeSinceSkip + dt());
        }
      }
    ]);
    theFolderObj.onClick(() => {
      folderObj.manageFold();
    });
    theFolderObj.onCharInput((key) => {
      if (ascension.ascending == true)
        return;
      if (isKeyDown("control"))
        return;
      if (curDraggin)
        return;
      const numberPressed = parseInt(key);
      if (isNaN(numberPressed))
        return;
      const index = numberPressed - 1;
      if (numberPressed == 0) {
        if (folded)
          theFolderObj.unfold();
        manageWindow("extraWin");
      } else if (index >= 0 && index < GameState.taskbar.length) {
        const windowKey5 = GameState.taskbar[index];
        if (GameState.unlockedWindows.includes(windowKey5)) {
          if (folded)
            theFolderObj.unfold();
          let minibutton = get(windowKey5)?.filter((obj) => obj.is("minibutton"))[0];
          if (minibutton)
            minibutton.click();
          else
            manageWindow(windowKey5);
        }
      }
    });
    theFolderObj.on("winClose", () => {
      let allWindows = get("window");
      if (allWindows.length > 0)
        allWindows.reverse()[0].activate();
      get("outsideHover").forEach((obj) => {
        obj.trigger("cursorExitWindow");
      });
    });
    theFolderObj.onUpdate(() => {
      if (get("window").length > 0) {
        allObjWindows2.isHoveringAWindow = get("window").some((window2) => window2.isMouseInRange());
        allObjWindows2.isDraggingAWindow = get("window").some((window2) => window2.dragging);
      } else {
        allObjWindows2.isHoveringAWindow = false;
        allObjWindows2.isDraggingAWindow = false;
      }
    });
    onUpdate("closestMinibuttonToDrag", (minibutton) => {
      if (!curDraggin?.is("gridMiniButton"))
        return;
      if (curDraggin?.screenPos().dist(minibutton.screenPos()) > 120)
        return;
      let distanceToCurDragging = curDraggin?.screenPos().dist(minibutton.screenPos());
      minibutton.nervousSpinSpeed = 14;
      let blackness = map(distanceToCurDragging, 20, 120, 1, 0.25);
      minibutton.opacity = map(distanceToCurDragging, 20, 120, 0.5, 1);
      minibutton.scale.x = map(distanceToCurDragging, 20, 120, 0.8, 1);
      minibutton.scale.y = map(distanceToCurDragging, 20, 120, 0.8, 1);
      minibutton.scale.y = map(distanceToCurDragging, 20, 120, 0.8, 1);
      minibutton.color = blendColors(WHITE, BLACK, blackness);
    });
    folderObj = theFolderObj;
    return theFolderObj;
  }

  // source/game/combo-utils.ts
  function getClicksFromCombo(level) {
    return Math.round(map(level, 2, COMBO_MAX, COMBO_MINCLICKS, COMBO_MAXCLICKS));
  }
  function getComboFromClicks(clicks) {
    return Math.round(map(clicks, COMBO_MINCLICKS, COMBO_MAXCLICKS, 2, COMBO_MAX));
  }
  var comboBarContent;
  var maxContentWidth = 0;
  function addComboBar() {
    let targetPos = vec2(0, scoreText.height / 2 + scoreText.height / 4 - 6);
    let barFrame = scoreText.add([
      rect(scoreText.width, scoreText.height / 4, { fill: false, radius: 5 }),
      pos(targetPos.x, scoreText.y),
      anchor("center"),
      opacity(1),
      outline(3.5, BLACK),
      z(scoreText.z - 1),
      layer("ui"),
      z(0),
      "comboBar",
      {
        update() {
          this.width = lerp(this.width, scoreText.width, 0.25);
          maxContentWidth = this.width;
        }
      }
    ]);
    barFrame.fadeIn(0.5);
    tween(barFrame.pos.y, targetPos.y, 0.5, (p) => barFrame.pos.y = p, easings.easeOutQuint);
    let barFrameBg = scoreText.onDraw(() => {
      drawRect({
        pos: barFrame.pos,
        anchor: barFrame.anchor,
        width: barFrame.width,
        height: barFrame.height,
        opacity: barFrame.opacity * 0.28,
        radius: 5,
        color: BLACK
      });
    });
    barFrame.onDestroy(() => {
      barFrameBg.cancel();
    });
    comboBarContent = scoreText.add([
      rect(0, barFrame.height, { radius: 5 }),
      pos(-barFrame.width / 2, barFrame.pos.y),
      anchor("left"),
      color(WHITE),
      opacity(1),
      layer("ui"),
      z(barFrame.z - 1),
      "comboBar",
      {
        update() {
          if (!clickVars.constantlyClicking) {
            if (clickVars.consecutiveClicks > 0)
              clickVars.consecutiveClicks -= 0.75;
            scoreManager.combo = getComboFromClicks(clickVars.consecutiveClicks);
            if (this.width < maxContentWidth / 2)
              clickVars.maxedCombo = false;
          } else {
            clickVars.consecutiveClicks = Math.round(clickVars.consecutiveClicks);
          }
          let mappedWidth = map(clickVars.consecutiveClicks, COMBO_MINCLICKS, COMBO_MAXCLICKS, 0, maxContentWidth);
          this.width = lerp(this.width, mappedWidth, 0.25);
          this.width = clamp(this.width, 0, maxContentWidth - 2);
          if (this.width == 0 && !clickVars.constantlyClicking && clickVars.comboDropped == false) {
            dropCombo();
          }
          let blendFactor = map(scoreManager.combo, 1, COMBO_MAX, 0, 1);
          this.color = blendColors(
            WHITE,
            hsl2rgb(time() * 0.2 * 0.1 % 1, 1.5, 0.8),
            blendFactor
          );
          this.pos.x = barFrame.pos.x - barFrame.width / 2;
          this.pos.y = barFrame.pos.y;
        }
      }
    ]);
    comboBarContent.fadeIn(0.25);
    tween(spsText.pos.y, spsText.barYPos, 0.5, (p) => spsText.pos.y = p, easings.easeOutQuint);
    return barFrame;
  }
  function addPlusScoreText(opts) {
    let size;
    if (!opts.cursorRelated)
      size = [40, 50];
    else
      size = [32.5, 40];
    let textBlendFactor = 0;
    let plusScoreText = add([
      text("", {
        size: rand(size[0], size[1]),
        font: "lambdao",
        styles: {
          "small": {
            scale: vec2(0.8),
            pos: vec2(0, 4)
          },
          "combo": (idx) => ({
            color: blendColors(
              WHITE,
              hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
              textBlendFactor
            ),
            pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5))
          })
        }
      }),
      opacity(1),
      pos(opts.pos),
      rotate(0),
      color(),
      scale(),
      anchor("center"),
      layer("ui"),
      "plusScoreText",
      {
        update() {
          if (opts.cursorRelated)
            return;
          textBlendFactor = map(scoreManager.combo, 1, COMBO_MAX, 0, 1);
        }
      }
    ]);
    plusScoreText.text = `+${formatNumber(opts.value)}`;
    if (scoreManager.combo > 1 && !opts.cursorRelated) {
      let addStyleToText = function(str, tag) {
        return insertAtStart2(str, `[${tag}]`) + `[/${tag}]`;
      };
      plusScoreText.text = addStyleToText(plusScoreText.text, "combo");
    }
    plusScoreText.pos.x = opts.pos.x + 2;
    plusScoreText.pos.y = opts.pos.y - 18;
    tween(
      plusScoreText.pos.y,
      plusScoreText.pos.y - 20,
      0.25,
      (p) => plusScoreText.pos.y = p
    );
    tween(
      1,
      0,
      0.25,
      (p) => plusScoreText.opacity = p
    );
    wait(0.25, () => {
      tween(
        plusScoreText.opacity,
        0,
        0.25,
        (p) => plusScoreText.opacity = p
      );
    });
    wait(0.25, () => {
      destroy(plusScoreText);
    });
    if (plusScoreText.pos.x > opts.pos.x)
      plusScoreText.anchor = "left";
    else
      plusScoreText.anchor = "right";
    if (scoreManager.combo > 1 && !opts.cursorRelated) {
    }
    return plusScoreText;
  }
  function increaseComboText() {
    let blendFactor = 0;
    let incComboText = add([
      text(`[combo]x${scoreManager.combo}[/combo]`, {
        font: "lambdao",
        size: 48,
        align: "center",
        styles: {
          "combo": (idx) => ({
            pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
            color: blendColors(
              WHITE,
              hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
              blendFactor
            )
          })
        }
      }),
      pos(mousePos().x, mousePos().y - 80),
      scale(),
      opacity(),
      layer("ui"),
      color(),
      {
        update() {
          this.pos.y -= 0.5;
          blendFactor = map(scoreManager.combo, 0, COMBO_MAX, 0, 1);
        }
      }
    ]);
    let timeToDie = 2;
    tween(0.5, 1, 0.1, (p) => incComboText.opacity = p, easings.easeOutQuint).onEnd(() => {
      tween(incComboText.opacity, 0, timeToDie, (p) => incComboText.opacity = p, easings.easeOutQuint);
      wait(timeToDie, () => {
        destroy(incComboText);
      });
    });
  }
  function maxComboAnim() {
    let blendFactor = 0;
    let words = ["MAX COMBO", "MAX COMBO!!", "YOO-HOO!!!", "YEEEOUCH!!", "FINISH IT"];
    let maxComboText = add([
      text(`[combo]${choose(words)}[/combo]`, {
        font: "lambdao",
        size: 55,
        align: "center",
        styles: {
          "combo": (idx) => ({
            pos: vec2(0, wave(-4, 4, time() * 6 + idx * 0.5)),
            color: blendColors(
              WHITE,
              hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.7, 0.8),
              blendFactor
            )
          })
        }
      }),
      pos(vec2(mousePos().x, mousePos().y - 65)),
      layer("ui"),
      color(),
      scale(),
      opacity(),
      anchor("center"),
      timer(),
      {
        update() {
          this.pos.y -= 1;
          blendFactor = 1;
        }
      }
    ]);
    let timeToDie = 2;
    maxComboText.tween(vec2(0.5), vec2(1), 0.1, (p) => maxComboText.scale = p, easings.easeOutQuad);
    maxComboText.tween(0.5, 1, 0.1, (p) => maxComboText.opacity = p, easings.easeOutQuint).onEnd(() => {
      maxComboText.tween(maxComboText.opacity, 0, timeToDie, (p) => maxComboText.opacity = p, easings.easeOutQuint);
      maxComboText.wait(timeToDie, () => {
        destroy(maxComboText);
      });
    });
    if (GameState.hasUnlockedPowerups == true && chance(0.2)) {
      spawnPowerup({
        type: "awesome",
        pos: randomPos(),
        natural: true
      });
    }
  }
  function increaseCombo() {
    scoreManager.combo = getComboFromClicks(clickVars.consecutiveClicks);
    playSfx("combo", { detune: scoreManager.combo > 1 ? 100 * scoreManager.combo : 0 });
    tween(cam.zoom, 0.95, 0.25 / 2, (p) => cam.zoom = p, easings.easeOutQuint).onEnd(() => {
      tween(cam.zoom, 1, 0.25, (p) => cam.zoom = p, easings.easeOutQuint);
    });
    if (scoreManager.combo != COMBO_MAX)
      increaseComboText();
  }
  function startCombo() {
    increaseCombo();
    clickVars.comboDropped = false;
    addComboBar();
    tween(-10, 0, 0.5, (p) => cam.rotation = p, easings.easeOutQuint);
  }
  function dropCombo() {
    clickVars.comboDropped = true;
    clickVars.consecutiveClicks = 0;
    get("comboBar", { recursive: true }).forEach((comboBar) => {
      comboBar.fadeOut(0.25).onEnd(() => {
        comboBar.destroy();
        tween(spsText.pos.y, spsText.defaultYPos, 0.5, (p) => spsText.pos.y = p, easings.easeOutQuint);
      });
    });
  }

  // source/game/windows/settings/settingsWinElements.ts
  var defaultTextSize = 36;
  function addCheckbox(opts, parent) {
    let checkBox = (parent || ROOT).add([
      sprite("checkbox", {
        anim: "off"
      }),
      pos(opts.pos),
      anchor("center"),
      area(),
      scale(),
      hoverController(),
      opts.name,
      {
        tick: null,
        turnOn() {
          this.play("on");
          this.tick.hidden = false;
        },
        turnOff() {
          this.play("off");
          this.tick.hidden = true;
        }
      }
    ]);
    let tick = checkBox.add([
      sprite("tick"),
      anchor("center"),
      pos(),
      scale(1),
      "tick"
    ]);
    checkBox.tick = tick;
    if (opts.checked == true) {
      checkBox.turnOn();
    } else {
      checkBox.turnOff();
    }
    checkBox.onClick(() => {
      bop(checkBox);
      let resultOfClick = opts.onCheck();
      if (resultOfClick == true) {
        checkBox.turnOn();
      } else {
        checkBox.turnOff();
      }
      playSfx("clickButton", { detune: resultOfClick == true ? 150 : -150 });
    });
    if (opts.title) {
      opts.titleSize = opts.titleSize | defaultTextSize;
      let title = (parent || ROOT).add([
        text(opts.title, {
          size: opts.titleSize
        }),
        pos(checkBox.pos.x, 0),
        anchor("left"),
        {
          update() {
            this.pos.x = checkBox.pos.x + checkBox.width / 2 + 10;
            this.pos.y = checkBox.pos.y;
          }
        }
      ]);
    }
    return checkBox;
  }
  function addVolumeControl(position, parent) {
    let barsContainer = parent.add([anchor("center"), pos(-128, -30)]);
    let checkboxesContainer = parent.add([anchor("center"), pos(0, -70)]);
    const winParent = parent.parent;
    for (let i2 = 0; i2 < 10; i2++) {
      let volbar = barsContainer.add([
        sprite("volbarbutton"),
        pos(0, 0),
        anchor("center"),
        scale(),
        area(),
        opacity(1),
        hoverController(),
        "volbar",
        {
          volume: 0.1 * (i2 + 1),
          update() {
            if (GameState.settings.volume.toFixed(1) < this.volume.toFixed(1))
              this.frame = 1;
            else
              this.frame = 0;
          }
        }
      ]);
      volbar.pos.x = volbar.pos.x + i2 * 28;
      volbar.onClick(() => {
        tween(GameState.settings.volume, volbar.volume, 0.1, (p) => {
          const lastVolume = GameState.settings.volume;
          GameState.settings.volume = parseFloat(p.toFixed(1));
          if (lastVolume != GameState.settings.volume)
            play("volumeChange", { detune: volChangeTune });
        });
        bop(volbar);
      });
    }
    ;
    let volbars = get("volbar", { recursive: true });
    let minus = barsContainer.add([
      sprite("minusbutton"),
      pos(-180, 0),
      area(),
      scale(),
      anchor("center"),
      hoverController()
    ]);
    minus.pos.x = volbars[0].pos.x - 26;
    minus.onClick(() => {
      if (GameState.settings.volume > 0) {
        GameState.settings.volume -= 0.1;
      }
      bop(volbars[clamp(Math.floor(GameState.settings.volume * 10 - 1), 0, 10)]);
      play("volumeChange", { detune: volChangeTune });
      bop(minus);
    });
    let plus = barsContainer.add([
      sprite("plusbutton"),
      pos(142, 0),
      area(),
      scale(),
      anchor("center"),
      hoverController()
    ]);
    plus.pos.x = volbars[volbars.length - 1].pos.x + 26;
    plus.onClick(() => {
      if (GameState.settings.volume <= 0.9) {
        GameState.settings.volume += 0.1;
      }
      bop(volbars[clamp(Math.floor(GameState.settings.volume * 10 - 1), 0, 10)]);
      play("volumeChange", { detune: volChangeTune });
      bop(plus);
    });
    let sfx = addCheckbox({
      pos: vec2(-140, 104),
      title: "SFX",
      checked: !GameState.settings.sfx.muted,
      onCheck: () => {
        manageMute("sfx", !GameState.settings.sfx.muted);
        return !GameState.settings.sfx.muted;
      },
      name: "sfxCheckbox"
    }, checkboxesContainer);
    let music = addCheckbox({
      pos: vec2(42, 104),
      title: "MUSIC",
      checked: !GameState.settings.music.muted,
      onCheck: () => {
        manageMute("music", !GameState.settings.music.muted);
        return !GameState.settings.music.muted;
      },
      name: "musicCheckbox"
    }, checkboxesContainer);
    return {
      barsContainer,
      checkboxesContainer
    };
  }
  function addScorePerTimeCounter(position, parent) {
    parent = parent || ROOT;
    const winParent = parent.parent;
    let values = ["", "Seconds", "Minutes", "Hours"];
    let title = parent.add([
      text("Score per time", { size: 45 }),
      pos(0, 22),
      anchor("center")
    ]);
    let counter = parent.add([
      text("", { size: 28 }),
      pos(0, title.pos.y + 45),
      anchor("center"),
      {
        update() {
          this.text = values[clamp(Math.floor(GameState.settings.spsTextMode), 1, 3)];
        }
      }
    ]);
    let leftArrow = parent.add([
      sprite("settingsArrow"),
      pos(0, 80),
      anchor("center"),
      area({ scale: 1.5 }),
      hoverController(),
      {
        update() {
          this.pos.x = lerp(this.pos.x, counter.pos.x - counter.width / 2 - 20, 0.5);
          this.pos.y = counter.pos.y;
        }
      }
    ]);
    leftArrow.flipX = true;
    leftArrow.onClick(() => {
      if (GameState.settings.spsTextMode - 1 < 1)
        GameState.settings.spsTextMode = 3;
      else
        GameState.settings.spsTextMode -= 1;
      spsText.updateValue();
      bop(spsText, 0.05);
    });
    let rightArrow = parent.add([
      sprite("settingsArrow"),
      pos(0, 80),
      anchor("center"),
      area({ scale: 1.5 }),
      hoverController(),
      {
        update() {
          this.pos.x = lerp(this.pos.x, counter.pos.x + counter.width / 2 + 20, 0.5);
          this.pos.y = counter.pos.y;
        }
      }
    ]);
    rightArrow.onClick(() => {
      if (GameState.settings.spsTextMode + 1 > 3)
        GameState.settings.spsTextMode = 1;
      else
        GameState.settings.spsTextMode += 1;
      spsText.updateValue();
      bop(spsText, 0.05);
    });
    return {
      title
    };
  }
  function addSaveButton(otherButtonsBg) {
    const winParent = otherButtonsBg.parent;
    let saveButton = otherButtonsBg.add([
      sprite("settingsFloppy"),
      pos(-124, 36),
      anchor("center"),
      area(),
      scale(),
      hoverController(),
      {
        count: 3
      }
    ]);
    saveButton.onClick(() => {
      bop(saveButton);
      if (get("toast").filter((toast) => toast.type == "gamesaved").length < 1) {
        playSfx("clickButton", { detune: rand(0, 25) });
        GameState.save();
      }
    });
    let texty = otherButtonsBg.add([
      text("Save", { size: 40 }),
      anchor("center"),
      pos(),
      {
        update() {
          this.pos.x = saveButton.pos.x + saveButton.width + 30;
          this.pos.y = saveButton.pos.y;
        }
      }
    ]);
  }
  function addDeleteSaveButton(otherButtonsBg) {
    const winParent = otherButtonsBg.parent;
    let deleteSaveButton = otherButtonsBg.add([
      sprite("settingsTrashcan"),
      pos(20, 36),
      anchor("center"),
      area(),
      hoverController(),
      {
        count: 3
      }
    ]);
    let texty = otherButtonsBg.add([
      text("Delete", { size: 40 }),
      anchor("center"),
      pos(),
      {
        update() {
          this.pos.x = deleteSaveButton.pos.x + deleteSaveButton.width + 40;
          this.pos.y = deleteSaveButton.pos.y;
        }
      }
    ]);
    let deleteSaveButtonTooltip = null;
    deleteSaveButton.onHover(() => {
      deleteSaveButtonTooltip = addTooltip(deleteSaveButton, {
        direction: "up",
        text: "WILL DELETE YOUR SAVE"
      });
    });
    deleteSaveButton.onHoverEnd(() => {
      deleteSaveButton.count = 3;
      deleteSaveButtonTooltip.end();
    });
    let initialTrashPosition = deleteSaveButton.pos;
    deleteSaveButton.onClick(() => {
      if (!winParent.active)
        return;
      deleteSaveButton.count--;
      playSfx("clickButton", { detune: 25 * deleteSaveButton.count });
      deleteSaveButtonTooltip.end();
      deleteSaveButtonTooltip = addTooltip(deleteSaveButton, {
        direction: "up",
        text: `WILL DELETE YOUR SAVE IN ${deleteSaveButton.count}`
      });
      if (deleteSaveButton.count == 0) {
        deleteSaveButtonTooltip.tooltipText.text = "GOODBYE SAVE :)";
        GameState.delete();
      }
      let fromZeroToThree = map(deleteSaveButton.count, 0, 3, 3, 0);
      deleteSaveButtonTooltip.tooltipText.color = blendColors(WHITE, RED, map(fromZeroToThree, 0, 3, 0, 1));
      let randPos = getRandomDirection(initialTrashPosition, false, 1.5 * fromZeroToThree);
      tween(randPos, deleteSaveButton.pos, 0.5, (p) => deleteSaveButton.pos = p, easings.easeOutQuint);
    });
    return deleteSaveButton;
  }
  function addMinigame(otherButtonsBg) {
    let miniHex = otherButtonsBg.add([
      sprite("settingsDottedHex"),
      pos(190, 34),
      area(),
      anchor("center"),
      scale(),
      hoverController()
    ]);
    let miniGameActive = scoreManager.autoScorePerSecond() >= 10;
    if (miniGameActive) {
      miniHex.sprite = "settingsHex";
      miniHex.onClick(() => {
        scoreManager.addScore(1);
        bop(miniHex, 0.05);
        let thing = addPlusScoreText({
          pos: mouse.pos,
          value: 1,
          cursorRelated: false
        });
        thing.scale = vec2(0.4);
        thing.layer = otherButtonsBg.parent.layer;
        GameState.stats.timesClicked += 1;
      });
    }
  }

  // source/game/windows/settings/settingsWin.ts
  var volumeControlBG;
  var generalOptionsBG;
  var buttonsBG;
  function settingsWinContent(winParent) {
    volumeControlBG = winParent.add([
      rect(winParent.width - 25, 150, { radius: 10 }),
      pos(0, -132),
      color(BLACK),
      opacity(0.25),
      anchor("center")
    ]);
    let volumeControl = addVolumeControl(vec2(-winParent.width / 2 + 40, -winParent.height / 2 + 75), volumeControlBG);
    generalOptionsBG = winParent.add([
      rect(winParent.width - 25, 218, { radius: 10 }),
      pos(0, -44),
      color(BLACK),
      opacity(0.25),
      anchor("top")
    ]);
    let fullscreenCheckbox = addCheckbox({
      pos: vec2(-144, 110),
      name: "fullscreenCheckbox",
      checked: GameState.settings.fullscreen,
      onCheck: function() {
        toggleTheFullscreen();
        return GameState.settings.fullscreen;
      },
      title: "Fullscreen"
    }, generalOptionsBG);
    let checkForFullscreen = ROOT.on("checkFullscreen", () => {
      if (isFullscreen())
        fullscreenCheckbox.turnOn();
      else
        fullscreenCheckbox.turnOff();
      GameState.settings.fullscreen = isFullscreen();
    });
    let commaCheckbox = addCheckbox({
      pos: vec2(-144, fullscreenCheckbox.pos.y + 65),
      name: "commaCheckbox",
      checked: GameState.settings.commaInsteadOfDot,
      onCheck: function() {
        GameState.settings.commaInsteadOfDot = !GameState.settings.commaInsteadOfDot;
        return GameState.settings.commaInsteadOfDot;
      },
      title: "Use commas"
    }, generalOptionsBG);
    let counter = addScorePerTimeCounter(vec2(0, 0), generalOptionsBG);
    buttonsBG = winParent.add([
      rect(winParent.width - 80, 70, { radius: 10 }),
      pos(-27, 182),
      color(BLACK),
      opacity(0.25),
      anchor("top")
    ]);
    addSaveButton(buttonsBG);
    addDeleteSaveButton(buttonsBG);
    addMinigame(buttonsBG);
    winParent.on("close", () => {
      checkForFullscreen.cancel();
    });
    ROOT.trigger("checkFullscreen");
  }

  // source/game/windows/ascendWin.ts
  var objectsPositions = {
    mage_hidden: 450,
    mage_visible: 30,
    cursors_hidden: 470,
    cursors_visible: 26
  };
  var windowLerp = 0.25;
  function addWinMage(position, parent) {
    let winMage = parent.add([
      pos(position),
      anchor("center"),
      waver({ maxAmplitude: 2 })
    ]);
    let body2 = winMage.add([
      sprite("winMage_body"),
      anchor("center")
    ]);
    let eye = winMage.add([
      sprite("winMage_eye"),
      anchor("center"),
      "winMage_eye"
    ]);
    let cursors = parent.add([
      sprite("winMage_cursors"),
      anchor("center"),
      pos(),
      waver({ maxAmplitude: 3 })
    ]);
    return {
      mage: winMage,
      cursors
    };
  }
  function addAscendButton(position, winParent) {
    const buttonContainer = winParent.add([
      pos(position),
      anchor("center"),
      {
        eye: null,
        scroll: null
      }
    ]);
    const scroll2 = buttonContainer.add([
      sprite("ascendButtonScroll"),
      pos(-15, -1),
      anchor("right"),
      scale()
    ]);
    scroll2.scale.x = 0;
    const eye = buttonContainer.add([
      sprite("ascendButtonEyes", { anim: "dumb" }),
      pos(position),
      anchor("center"),
      area(),
      hoverController(),
      scale(),
      opacity(),
      {
        update() {
          if (GameState.ascension.mana < 1)
            this.opacity = 0.8;
          else
            this.opacity = 1;
        }
      }
    ]);
    eye.onHover(() => {
      if (GameState.ascension.mana > 0) {
        tween(scroll2.scale.x, 1, 0.15, (p) => scroll2.scale.x = p, easings.easeOutQuint);
        eye.play("woke");
      } else {
        eye.play("dumb");
      }
      tween(1.5, 1.05, 0.15, (p) => eye.scale.y = p, easings.easeOutQuint);
      tween(1, 1.05, 0.15, (p) => eye.scale.x = p, easings.easeOutQuint);
    });
    eye.onHoverEnd(() => {
      eye.play("dumb");
      tween(scroll2.scale.x, 0, 0.15, (p) => scroll2.scale.x = p, easings.easeOutQuint);
      tween(eye.scale.y, 1, 0.15, (p) => eye.scale.y = p, easings.easeOutQuint);
      tween(eye.scale.x, 1, 0.15, (p) => eye.scale.x = p, easings.easeOutQuint);
    });
    eye.onClick(() => {
      bop(eye);
      startAscending();
    });
    buttonContainer.eye = eye;
    buttonContainer.scroll = scroll2;
    return buttonContainer;
  }
  function ascendWinContent(winParent) {
    const masked = winParent.add([
      mask("intersect"),
      anchor("center"),
      pos(),
      rect(winParent.width, winParent.height)
    ]);
    const winMageFull = addWinMage(vec2(0, 450), masked);
    const winMage = winMageFull.mage;
    const winMageCursors = winMageFull.cursors;
    winMageCursors.pos.y = objectsPositions.cursors_hidden;
    tween(objectsPositions.mage_hidden, objectsPositions.mage_visible, 0.6, (p) => winMage.pos.y = p, easings.easeOutQuint).onEnd(() => {
      winMage.wave_verPosition = objectsPositions.mage_visible;
      winMage.startWave();
    });
    wait(0.2, () => {
      tween(objectsPositions.cursors_hidden, objectsPositions.cursors_visible, 0.5, (p) => winMageCursors.pos.y = p, easings.easeOutQuint).onEnd(() => {
        winMageCursors.wave_verPosition = objectsPositions.cursors_visible;
        winMageCursors.startWave();
      });
    });
    if (GameState.stats.timesAscended < 1) {
      winMage.get("winMage_eye")[0].destroy();
      let vignette = winParent.add([
        sprite("winMage_vignette"),
        pos(0),
        anchor("center"),
        opacity(0.75),
        z(3)
      ]);
      vignette.width = winParent.width;
      vignette.height = winParent.height;
      vignette.fadeIn(0.5, easings.easeOutQuad);
    }
    const manaCounterText = winParent.add([
      text("\u2726", { align: "left" }),
      pos(-308, -169),
      anchor("left"),
      z(1),
      {
        update() {
          this.text = `+${formatNumberSimple(GameState.ascension.manaAllTime)}%
\u2726${formatNumberSimple(GameState.ascension.mana)}`;
        }
      }
    ]);
    const manaCounterRect = winParent.add([
      rect(0, 10),
      color(BLACK),
      anchor("topleft"),
      opacity(0.9),
      pos(-314, 0),
      z(0),
      {
        update() {
          this.pos.y = manaCounterText.pos.y - manaCounterText.height * 0.5;
          let width2 = formatText({ text: manaCounterText.text, size: manaCounterText.textSize, align: manaCounterText.align }).width + 14;
          this.width = lerp(this.width, width2, windowLerp);
          this.height = lerp(this.height, manaCounterText.height, windowLerp);
        }
      }
    ]);
    const manaCounterTri = winParent.add([
      sprite("manaCounterTri"),
      pos(),
      anchor(manaCounterRect.anchor),
      color(manaCounterRect.color),
      opacity(manaCounterRect.opacity),
      {
        update() {
          this.height = manaCounterRect.height;
          this.pos.y = manaCounterRect.pos.y;
          this.pos.x = manaCounterRect.pos.x + manaCounterRect.width;
        }
      }
    ]);
    const bottomPolygon = winParent.add([
      sprite("ascendBottomPolygon"),
      pos(140, 249),
      color(manaCounterRect.color),
      opacity(manaCounterRect.opacity),
      anchor("bot"),
      {
        add() {
          this.height = 0;
        },
        update() {
          this.height = lerp(this.height, 146, windowLerp);
        }
      }
    ]);
    const barColor = rgb(105, 180, 225);
    const ascendEmptyBar = winParent.add([
      sprite("ascendBar"),
      pos(150, 178),
      anchor("center"),
      color(barColor),
      opacity(0.5)
    ]);
    const maskedBarContent = winParent.add([
      mask("intersect"),
      anchor("botleft"),
      pos(ascendEmptyBar.pos.x - ascendEmptyBar.width / 2, ascendEmptyBar.pos.y + ascendEmptyBar.height / 2),
      rect(0, ascendEmptyBar.height),
      opacity(0.5),
      {
        // this is the actual workings of the bar
        update() {
          let currentScore = scoreManager.getScoreForManaAT(GameState.ascension.manaAllTime);
          let nextScore = scoreManager.getScoreForManaAT(GameState.ascension.manaAllTime + 1);
          let mappedWidth = map(GameState.scoreAllTime, currentScore, nextScore, 0, ascendEmptyBar.width);
          this.width = lerp(this.width, mappedWidth, 0.15);
          this.width = clamp(this.width, 0, ascendEmptyBar.width);
        }
      }
    ]);
    const ascendContentBar = maskedBarContent.add([
      sprite("ascendBar"),
      pos(157, -65),
      anchor("center"),
      color(barColor),
      opacity(1),
      {
        update() {
          const lighter = barColor;
          const darker = barColor.darken(10);
          this.color.r = wave(lighter.r, darker.r, time() * 2);
          this.color.g = wave(lighter.g, darker.g, time() * 2);
          this.color.b = wave(lighter.b, darker.b, time() * 2);
        }
      }
    ]);
    const manaStar = winParent.add([
      sprite("ascendManaStar"),
      pos(306, 116),
      anchor("center"),
      color(barColor.lighten(10)),
      scale()
    ]);
    const scoreTilNextManaText = winParent.add([
      text("", {
        align: "right",
        size: 22
      }),
      anchor("right"),
      color(WHITE),
      pos(307, 140),
      rotate(-22),
      {
        update() {
          let scoreTextOrManaPerSecond = `Score 'til next mana: `;
          let scoreTilNextMana = Math.round(scoreManager.scoreYouGetNextManaAt() - Math.round(GameState.scoreAllTime));
          let formattedNumber = formatNumber(Math.round(scoreManager.scoreYouGetNextManaAt()) - Math.round(GameState.scoreAllTime));
          if (scoreTilNextMana < -1) {
            formattedNumber = formatNumber(scoreManager.manaPerSecond());
            scoreTextOrManaPerSecond = "Mana per second: ";
          }
          this.text = `${scoreTextOrManaPerSecond}${formattedNumber}`;
        }
      }
    ]);
    const buttonPos = vec2(280, 220);
    const ascendButton = addAscendButton(vec2(0), winParent);
    ascendButton.pos = buttonPos;
    function manaParticles(position) {
      let manaParticles2 = add([
        pos(position),
        particles({
          max: 8,
          texture: getSprite("part_star").data.tex,
          quads: [getSprite("part_star").data.frames[0]],
          speed: [100, 250],
          angle: [0, 0],
          colors: [manaStar.color.lighten(50), manaStar.color.darken(50)],
          scales: [1, 1.1],
          lifeTime: [0.35, 0.5],
          opacities: [1, 0],
          acceleration: [vec2(50), vec2(-50)],
          angularVelocity: [30, 60]
        }, {
          lifetime: 1.5,
          rate: 100,
          direction: 180,
          spread: -90
        }),
        layer(winParent.layer)
      ]);
      manaParticles2.emit(randi(4, 8));
      manaParticles2.onEnd(() => manaParticles2.destroy());
    }
    const manaGainedCheck = ROOT.on("manaGained", () => {
      tween(2, 1, 0.15, (p) => manaStar.scale.y = p, easings.easeOutQuad);
      manaParticles(manaStar.worldPos());
    });
    winParent.on("close", () => {
      manaGainedCheck.cancel();
    });
  }

  // source/game/windows/creditsWin.ts
  var defFontSize = 36;
  var allCredits = {
    "code": "https://amyspark-ng.newgrounds.com",
    "art": "https://devkyRD.newgrounds.com",
    "design": "https://lajbel.newgrounds.com",
    "shader": null,
    "playtest": "https://Khriz28.newgrounds.com",
    "desktop": "https://EliCardoso.newgrounds.com"
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function openURL(url) {
    window.open(url, "_blank").focus();
  }
  function dummyHoverAnims(theObj) {
    theObj.startingHover(() => {
      tween(theObj.scale, vec2(1.05), 0.15, (p) => theObj.scale = p, easings.easeOutQuad);
    });
    theObj.endingHover(() => {
      tween(theObj.scale, vec2(1), 0.15, (p) => theObj.scale = p, easings.easeOutQuad);
    });
  }
  function makeCredit(theCredit) {
    let creditObj = make([
      sprite(`credits${capitalizeFirstLetter(theCredit)}`),
      pos(),
      area(),
      hoverController(),
      scale(),
      anchor("center")
    ]);
    if (allCredits[theCredit] != null) {
      creditObj.onClick(() => {
        openURL(allCredits[theCredit]);
        playSfx("clickButton", { detune: rand(0, 50) });
      });
      dummyHoverAnims(creditObj);
    }
    return creditObj;
  }
  async function creditsWinContent(winParent) {
    winParent.add([
      pos(0, -160),
      text("Clickery Hexagon was made\nby these awesome people", { align: "center", size: defFontSize }),
      anchor("center")
    ]);
    winParent.add(make([
      sprite("hexagon")
    ]));
    const firstColumnX = -85;
    let codeCredit = winParent.add(makeCredit("code"));
    let designCredit = winParent.add(makeCredit("design"));
    let playtestCredit = winParent.add(makeCredit("playtest"));
    const secondColumnX = 85;
    let artCredit = winParent.add(makeCredit("art"));
    let shaderCredit = winParent.add(makeCredit("shader"));
    let desktopCredit = winParent.add(makeCredit("desktop"));
    let specialCredits = winParent.add([
      text("Enysmo, Candy&Carmel, OliverIsHere\nGGBot, WebadaZzz", { align: "center", size: 30 }),
      pos(0, 170),
      anchor("center"),
      area(),
      scale(),
      hoverController()
    ]);
    dummyHoverAnims(specialCredits);
    specialCredits.onClick(() => {
      openURL("https://github.com/amyspark-ng/clickery-hexagon-dev?tab=readme-ov-file#extra--special-thanks");
      playSfx("clickButton", { detune: rand(0, 50) });
    });
    let playerCredit = winParent.add([
      text("And you", { align: "center", size: 38 }),
      pos(-20, 228),
      scale(),
      anchor("center"),
      area(),
      hoverController()
    ]);
    let creditsHeart = winParent.add([
      sprite("creditsHeart"),
      pos(62, playerCredit.pos.y),
      scale(),
      anchor("center")
    ]);
    if (ngUser != null) {
      playerCredit.onClick(() => {
        openURL(`https://${ngUser.name}.newgrounds.com`);
        playSfx("clickButton", { detune: rand(30, 70) });
      });
      playerCredit.onHover(() => {
        tween(playerCredit.scale, vec2(1.05), 0.15, (p) => playerCredit.scale = p, easings.easeOutQuad);
        tween(creditsHeart.scale, vec2(1.05), 0.15, (p) => creditsHeart.scale = p, easings.easeOutQuad);
      });
      playerCredit.onHoverEnd(() => {
        tween(playerCredit.scale, vec2(1), 0.15, (p) => playerCredit.scale = p, easings.easeOutQuad);
        tween(creditsHeart.scale, vec2(1), 0.15, (p) => creditsHeart.scale = p, easings.easeOutQuad);
      });
    }
  }

  // source/game/windows/statsWin.ts
  var Stat = class {
    key;
    value;
    constructor(key, value) {
      this.key = key;
      this.value = value;
    }
  };
  function statsWinContent(winParent) {
    let stats = [];
    winParent.onUpdate(() => {
      let scoreAllTime = new Stat("Score all time", formatNumber(GameState.scoreAllTime));
      let scoreThisRun = new Stat("Score this run", formatNumber(GameState.scoreThisRun));
      let timesClicked = new Stat("Times clicked", formatNumberSimple(GameState.stats.timesClicked));
      let powerupsClicked = new Stat("Power-ups clicked", formatNumberSimple(GameState.stats.powerupsClicked));
      let powerupsBought = new Stat("Power-ups bought", formatNumberSimple(GameState.stats.powerupsBought));
      let timesAscended = new Stat("Times ascended", formatNumberSimple(GameState.stats.timesAscended));
      let achievementsUnlocked = new Stat("Achievements unlocked", `${GameState.unlockedAchievements.length}/${achievements.length}`);
      let timePlayed = new Stat("Total time played", formatTime(Math.round(GameState.stats.totalTimePlayed), true));
      let timeForGameComplete = new Stat("Time for game completed", formatTime(Math.round(GameState.stats.timeGameComplete), true));
      stats = [
        scoreAllTime,
        timesClicked,
        powerupsClicked,
        powerupsBought,
        achievementsUnlocked,
        timePlayed
      ];
      if (GameState.stats.timesAscended > 0) {
        stats.splice(stats.indexOf(achievementsUnlocked), 0, timesAscended);
        stats.splice(stats.indexOf(timesClicked), 0, scoreThisRun);
      }
      if (isAchievementUnlocked("extra.ALL")) {
        if (!stats.includes(timeForGameComplete))
          stats.push(timeForGameComplete);
      }
    });
    function createStats() {
      let text2 = stats.map((stat) => `${stat.key}: ${stat.value}`).join("\n");
      return text2;
    }
    let icons = winParent.add([
      sprite("statIcons1"),
      pos(-222, -152),
      anchor("top"),
      {
        update() {
          if (isAchievementUnlocked("extra.ALL") && this.sprite != "statIcons3")
            this.sprite = "statIcons3";
          else if (GameState.stats.timesAscended > 0 && this.sprite != "statIcons2")
            this.sprite = "statIcons2";
          else if (GameState.stats.timesAscended < 1 && this.sprite != "statIcons1")
            this.sprite = "statIcons1";
        }
      }
    ]);
    let statsText = winParent.add([
      text(createStats()),
      pos(-202, -150),
      anchor("topleft"),
      {
        update() {
          this.text = createStats();
        }
      }
    ]);
  }

  // source/game/windows/medalsWin.ts
  var totalColumns = 5;
  var totalRows = 7;
  var initialPos = { x: -132, y: 42 };
  var spacing = { x: 66, y: 65 };
  var medalsContainer;
  var medalMap = /* @__PURE__ */ new Map();
  function getPositionInWindow(row, column) {
    const posX = initialPos.x + spacing.x * (column - 1);
    const posY = initialPos.y + spacing.y * (row - 1);
    return vec2(posX, posY);
  }
  function indexToGrid(i2) {
    return { row: Math.floor(i2 / totalColumns) + 1, column: i2 % totalColumns + 1 };
  }
  function medalsWinContent(winParent) {
    clearMedals();
    medalsContainer = winParent.add([
      pos(-18, -214),
      rect(350, winParent.height - 35 * 2, { radius: 5 }),
      color(BLACK),
      opacity(0.5),
      anchor("top")
    ]);
    addScrollBar(medalsContainer, 3);
    addAllMedals();
    winParent.onScroll((delta) => {
      if (!winParent.active || DEBUG && isKeyDown("shift"))
        return;
      scroll(delta.y > 0 ? "down" : "up");
    });
    winParent.onKeyPress(["up", "left"], () => {
      if (!winParent.active)
        return;
      scroll("up");
    });
    winParent.onKeyPress(["down", "right"], () => {
      if (!winParent.active)
        return;
      scroll("down");
    });
    winParent.on("close", clearMedals);
  }
  function clearMedals() {
    if (medalsContainer) {
      medalsContainer.get("medal").forEach((medal) => {
        if (medal) {
          medal.destroy();
        }
      });
      medalsContainer.destroy();
      medalsContainer = void 0;
    }
    medalMap.clear();
  }
  function addAllMedals() {
    for (let row = 1; row <= totalRows; row++) {
      const medalIndex = (row - 1) * totalColumns;
      if (medalIndex < achievements.length) {
        const achievementId = achievements[medalIndex].id;
        addMedal({ row, column: 1 }, achievementId);
      } else {
        console.warn(`No achievement available for row ${row}, column 1`);
      }
    }
    for (let i2 = 0; i2 < achievements.length; i2++) {
      if (i2 >= totalColumns * totalRows)
        break;
      addMedal(indexToGrid(i2), achievements[i2].id);
    }
  }
  function addMedal(gridPosition, medal_ID, position) {
    if (!medalsContainer) {
      console.error("medalsContainer is not defined in addMedal");
      return;
    }
    if (medalMap.has(medal_ID))
      return;
    const existingMedal = medalsContainer.get("medal").find((medal) => medal.row === gridPosition.row && medal.column === gridPosition.column);
    if (existingMedal) {
      console.warn(`Medal at row ${gridPosition.row}, column ${gridPosition.column} already exists. Skipping addition for ${medal_ID}.`);
      return;
    }
    const medalObj = medalsContainer.add(createMedalObject(gridPosition, medal_ID));
    if (position) {
      medalObj.pos = vec2(position.x, position.y);
    } else {
      medalObj.pos = getPositionInWindow(gridPosition.row, gridPosition.column);
    }
    medalObj.achievementIdx = achievements.findIndex((a) => a.id === medal_ID);
    medalObj.onClick(() => handleMedalClick(medalObj));
    medalObj.onHover(() => handleMedalHover(medalObj));
    medalObj.onHoverEnd(() => handleMedalHoverEnd(medalObj));
    medalObj.onDraw(() => handleMedalDraw(medalObj, isAchievementUnlocked(medalObj.achievementId) && medalObj.achievementId != "extra.theSlot"));
    medalMap.set(medal_ID, medalObj);
  }
  function createMedalObject(gridPosition, medal_ID) {
    return [
      sprite("medalsUnknown"),
      pos(getPositionInWindow(gridPosition.row, gridPosition.column)),
      anchor("center"),
      layer("windows"),
      ,
      area(),
      hoverController(),
      color(),
      "medal",
      {
        achievementIdx: achievements.indexOf(getAchievement(medal_ID)),
        achievementId: medal_ID,
        row: gridPosition.row,
        column: gridPosition.column,
        add() {
          if (this.achievementId == "extra.theSlot") {
            return;
          }
          this.use("ignorepoint");
        },
        update() {
          updateMedalState(this);
        }
      }
    ];
  }
  function updateMedalState(medalObj) {
    if (!medalsContainer) {
      console.error("medalsContainer is not defined in updateMedalState");
      return;
    }
    const theAchievement = getAchievement(medalObj.achievementId);
    const medalSprite = "medals_" + theAchievement.id;
    if (isAchievementUnlocked(medalObj.achievementId)) {
      if (medalObj.sprite != medalSprite)
        medalObj.sprite = medalSprite;
      if (medalObj.color != WHITE)
        medalObj.color = WHITE;
      if (medalObj.achievementId == "extra.ALL" && medalObj.getCurAnim() == null)
        medalObj.play("master");
      medalObj.opacity = 1;
    } else {
      manageLockedMedalApp(medalObj, theAchievement);
    }
  }
  function manageLockedMedalApp(medalObj, theAchievement) {
    const PURPLE = blendColors(RED, BLUE, 0.5);
    if (theAchievement.id === "extra.theSlot" && medalObj.sprite !== "medalsUnknown_tap") {
      medalObj.sprite = "medalsUnknown_tap";
    } else if (theAchievement.id != "extra.theSlot" && medalObj.sprite != "medalsUnknown") {
      medalObj.sprite = "medalsUnknown";
    }
    if (theAchievement.id == "extra.ALL")
      medalObj.color = hsl2rgb((time() * 0.2 + 0 * 0.1) % 1, 0.6, 0.6);
    else {
      if (theAchievement.visibleCondition != null) {
        if (theAchievement.visibleCondition() == true) {
          if (theAchievement.rare == true)
            medalObj.color = YELLOW;
          else
            medalObj.color = RED;
        } else {
          medalObj.color = PURPLE;
        }
      } else {
        if (theAchievement.rare == true)
          medalObj.color = YELLOW;
        else
          medalObj.color = RED;
      }
    }
    medalObj.opacity = 0.5;
  }
  function handleMedalClick(medalObj) {
    if (medalObj.achievementId === "extra.theSlot" && !isAchievementUnlocked(medalObj.achievementId)) {
      unlockAchievement(medalObj.achievementId);
    }
  }
  function handleMedalHover(medalObj) {
    const theAchievement = getAchievement(medalObj.achievementId);
    let title = formatTooltipText(theAchievement.title, 50);
    let description = formatTooltipText(theAchievement.description, 50);
    let flavorText = theAchievement.flavorText;
    title = `[title]${title}[/title]`;
    if (!isAchievementUnlocked(theAchievement.id)) {
      if (theAchievement.visibleCondition && !theAchievement.visibleCondition()) {
        title = "???";
        description = "This achievement is secret\nFor now...";
        flavorText = "";
      } else {
        title = "???";
        description = theAchievement.description;
        flavorText = "";
      }
    }
    const tooltip = addTooltip(medalObj, {
      text: `${title}
${description}${flavorText.length < 50 ? `. ${flavorText}` : ""}`,
      direction: "down",
      lerpValue: 0.5
    });
    tooltip.tooltipText.align = "center";
    medalObj.tooltip = tooltip;
  }
  function handleMedalDraw(medalObj, drawOutline) {
    if (drawOutline == false)
      return;
    drawRect({
      anchor: medalObj.anchor,
      width: medalObj.width,
      height: medalObj.height,
      color: BLACK,
      fill: false,
      outline: {
        width: 3,
        color: BLACK
      }
    });
  }
  function formatTooltipText(text2, maxLength) {
    return text2.length > maxLength ? `${text2.substring(0, maxLength)}...` : text2;
  }
  function handleMedalHoverEnd(medalObj) {
    if (medalObj.tooltip) {
      medalObj.tooltip.end();
    }
  }
  function scroll(direction) {
    if (!medalsContainer) {
      console.error("medalsContainer is not defined in scroll function");
      return;
    }
    const medals = medalsContainer.get("medal").filter((medal) => medal !== void 0);
    const sortedMedals = medals.sort((a, b) => a.achievementIdx - b.achievementIdx);
    if (direction === "down" && sortedMedals[sortedMedals.length - 1]?.achievementIdx === achievements.length - 1 || direction === "up" && sortedMedals[0]?.achievementIdx === 0)
      return;
    const isScrollingDown = direction === "down";
    const rowChange = isScrollingDown ? -1 : 1;
    const yOffset = isScrollingDown ? -spacing.y : spacing.y;
    medals.forEach((medal) => {
      if (medal) {
        if (isScrollingDown && medal.row === 1 || !isScrollingDown && medal.row === totalRows) {
          medalMap.delete(medal.achievementId);
          medal.destroy();
        } else {
          medal.row += rowChange;
          medal.pos.y += yOffset;
        }
      }
    });
    const firstOrLastIdx = sortedMedals[isScrollingDown ? medals.length - 1 : 0]?.achievementIdx;
    if (firstOrLastIdx === void 0)
      return;
    const nextAchievements = achievements.slice(
      firstOrLastIdx + (isScrollingDown ? 1 : -totalColumns),
      firstOrLastIdx + (isScrollingDown ? 1 : -totalColumns) + totalColumns
    );
    nextAchievements.forEach((achievement, index) => {
      const gridPos = indexToGrid(index);
      addMedal({ row: isScrollingDown ? totalRows : 1, column: gridPos.column }, achievement.id);
    });
  }
  function addScrollBar(medalsContainer2, totalScrolls = 3) {
    if (!medalsContainer2) {
      console.error("medalsContainer is not defined in addScrollBar");
      return;
    }
    const scrollBarWidth = 10;
    const scrollBarHeight = medalsContainer2.height;
    const totalParts = totalScrolls;
    const bar = medalsContainer2.add([
      pos(medalsContainer2.width / 2 + 20, 0),
      rect(scrollBarWidth, scrollBarHeight, { radius: 2.5 }),
      color(BLACK),
      opacity(0.5),
      layer("ui")
    ]);
    let elevatorYPos = 0;
    const elevatorHeight = scrollBarHeight / totalParts;
    const elevator = medalsContainer2.add([
      pos(medalsContainer2.width / 2 + 20, 0),
      rect(scrollBarWidth, elevatorHeight, { radius: 2.5 }),
      color(255, 255, 255),
      layer("ui"),
      area({ scale: vec2(2, 1) }),
      opacity(0.5),
      hoverController(),
      "elevator"
    ]);
    let isDragging = false;
    elevator.onHover(() => {
      if (isDragging == false) {
        tween(elevator.opacity, 1, 0.15, (p) => elevator.opacity = p, easings.easeOutQuad);
      }
    });
    elevator.onHoverEnd(() => {
      if (isDragging == false) {
        tween(elevator.opacity, 0.5, 0.15, (p) => elevator.opacity = p, easings.easeOutQuad);
      }
    });
    let currentScroll = 0;
    let hasCheckedLastScroll = false;
    function updateElevator(scrollStep) {
      currentScroll = Math.max(0, Math.min(currentScroll + scrollStep, totalScrolls));
      const elevatorY = currentScroll / totalScrolls * (scrollBarHeight - elevatorHeight);
      elevatorYPos = elevatorY;
      if (currentScroll == totalScrolls && medalsContainer2.get("goober").length == 0 && hasCheckedLastScroll == false) {
        if (!chance(0.4)) {
          hasCheckedLastScroll = true;
          return;
        }
        const lastAchievement = medalsContainer2.get("medal").filter((medal) => medal.row == totalRows && medal.column == totalColumns - 1)[0];
        const thePosition = getPositionInWindow(lastAchievement.row, lastAchievement.column + 1);
        let goober = medalsContainer2.add([
          sprite("devkyGoober"),
          pos(thePosition.x, thePosition.y + 30),
          anchor("bot"),
          area(),
          scale(),
          hoverController(),
          "goober"
        ]);
        goober.onClick(() => {
          if (ngEnabled == true) {
            if (GameState.stats.hasDevkyGoobered == false) {
              GameState.stats.hasDevkyGoobered = true;
              ht2.unlockMedal(DEVKY_MEDAL_ID);
            }
          }
          tween(rand(0.7, 0.9), 1, 0.15, (p) => goober.scale.y = p);
          playSfx("squeak", { detune: rand(-100, 100) });
        });
        goober.width = 60;
        goober.height = 60;
      } else {
        if (currentScroll == totalScrolls)
          return;
        hasCheckedLastScroll = false;
        if (medalsContainer2.get("goober").length > 0)
          medalsContainer2.get("goober")[0].destroy();
      }
    }
    medalsContainer2.onScroll((delta) => {
      if (isDragging == true)
        return;
      if (delta.y > 0) {
        updateElevator(1);
      } else if (delta.y < 0) {
        updateElevator(-1);
      }
    });
    medalsContainer2.onKeyPress(["down", "right"], () => {
      updateElevator(1);
    });
    medalsContainer2.onKeyPress(["left", "up"], () => {
      updateElevator(-1);
    });
    elevator.onClick(() => {
      if (elevator.isHovering()) {
        isDragging = true;
        setCurDraggin(elevator);
      }
    });
    elevator.onMouseRelease("left", () => {
      if (isDragging == true) {
        isDragging = false;
        setCurDraggin(null);
      }
    });
    elevator.onUpdate(() => {
      if (isDragging == true) {
        currentScroll = Math.round(elevatorYPos / (scrollBarHeight - elevatorHeight) * totalScrolls);
        if (mousePos().y > elevator.worldPos().y + elevator.height / 2) {
          updateElevator(1);
          scroll("down");
        } else if (mousePos().y < elevator.worldPos().y - elevator.height / 2) {
          updateElevator(-1);
          scroll("up");
        }
      }
      elevator.pos.y = lerp(elevator.pos.y, elevatorYPos, 0.5);
      elevator.pos.y = clamp(elevator.pos.y, 0, scrollBarHeight - elevatorHeight);
    });
  }

  // source/game/plugins/drawThings.ts
  function drawDamnShadow(xSpacing, ySpacing, theOpacity) {
    let drawEvent;
    return {
      id: "damnShadow",
      require: ["anchor"],
      disableShadow: false,
      add() {
        let drawingShadow = () => {
          if (this.disableShadow == true)
            return;
          if (this.is("sprite")) {
            drawSprite({
              sprite: this.sprite,
              pos: vec2(this.pos.x + xSpacing, this.pos.y + ySpacing),
              opacity: theOpacity,
              color: BLACK,
              anchor: this.anchor,
              scale: this.scale,
              angle: this.angle
            });
          } else if (this.is("text")) {
            drawText({
              text: this.text,
              font: this.font,
              align: this.align,
              size: this.textSize,
              pos: vec2(this.pos.x + xSpacing, this.pos.y + ySpacing),
              opacity: theOpacity,
              color: BLACK,
              anchor: this.anchor,
              scale: this.scale,
              angle: this.angle
            });
          } else if (this.is("rect")) {
            drawRect({
              width: this.width,
              height: this.height,
              radius: this.radius,
              pos: vec2(this.pos.x + xSpacing, this.pos.y + ySpacing),
              opacity: theOpacity,
              color: BLACK,
              anchor: this.anchor,
              scale: this.scale,
              angle: this.angle
            });
          }
        };
        drawEvent = this.parent.onDraw(drawingShadow);
      },
      destroy() {
        drawEvent.cancel();
        drawEvent = null;
      }
    };
  }

  // source/game/windows/color/colorWindowElements.ts
  var SLIDER_HANDLE_LERP = 0.2;
  var sliderColors = {
    red: { full: [255, 60, 60], dull: [245, 119, 119] },
    green: { full: [68, 255, 74], dull: [133, 243, 136] },
    blue: { full: [60, 121, 255], dull: [126, 163, 243] },
    alpha: { full: [48, 48, 48], dull: [118, 118, 118] }
  };
  function keyToName(key) {
    switch (key) {
      case "r":
        return "red";
      case "g":
        return "green";
      case "b":
        return "blue";
      case "a":
        return "alpha";
    }
  }
  function addSlider(opts) {
    opts.parent = opts.parent || ROOT;
    let value = opts.value;
    let previousValue = value;
    let winParent = opts.parent;
    opts.parent.onUpdate(() => winParent = opts.parent);
    let fullColor = Color.fromArray(sliderColors[opts.color].full);
    let dullColor = Color.fromArray(sliderColors[opts.color].dull);
    const triggerOnValueChange = () => {
      if (opts.onValueChange && value !== previousValue) {
        opts.onValueChange(value);
        previousValue = value;
      }
    };
    let content = winParent.add([
      rect(winParent.width - 40, 18, { radius: 10 }),
      color(),
      pos(opts.pos),
      anchor("left"),
      area(),
      drawDamnShadow(2, 2, 0.5),
      {
        update() {
          let blendFactor = map(value, opts.range[0], opts.range[1], 0, 1);
          let color2 = blendColors(dullColor, fullColor, blendFactor);
          this.color = color2;
          triggerOnValueChange();
        }
      }
    ]);
    let leftSideOfContent = content.pos.x;
    let rightSideOfContent = content.pos.x + content.width;
    let button = winParent.add([
      sprite("hexColorHandle"),
      anchor("center"),
      rotate(0),
      pos(0, content.pos.y),
      area(),
      scale(),
      drag(true),
      hoverController(),
      drawDamnShadow(2, 2, 0.5),
      {
        update() {
          this.pos.y = content.pos.y;
          if (this.dragging === true) {
            value = map(this.pos.x, leftSideOfContent, rightSideOfContent, opts.range[0], opts.range[1]);
          } else {
            let mappedPos = map(value, opts.range[0], opts.range[1], leftSideOfContent, rightSideOfContent);
            this.pos.x = lerp(this.pos.x, mappedPos, SLIDER_HANDLE_LERP);
          }
          value = clamp(value, opts.range[0], opts.range[1]);
          this.pos.x = clamp(this.pos.x, leftSideOfContent, rightSideOfContent);
          let mappedAngle = map(value, opts.range[0], opts.range[1], 0, 360);
          this.angle = lerp(this.angle, mappedAngle, SLIDER_HANDLE_LERP);
          let mappedColor = content.color.darken(5);
          this.color = mappedColor;
          triggerOnValueChange();
        },
        releaseDrop() {
          curDraggin?.trigger("dragEnd");
          setCurDraggin(null);
        }
      }
    ]);
    button.onHover(() => {
      tween(vec2(1), vec2(1.2), 0.15, (p) => button.scale = p);
    });
    button.onHoverEnd(() => {
      tween(vec2(1.2), vec2(1), 0.15, (p) => button.scale = p);
    });
    button.onClick(() => {
      if (!winParent.active)
        return;
      button.pick();
      winParent.canClose = false;
    });
    button.onMouseRelease(() => {
      if (!winParent.active)
        return;
      button.releaseDrop();
      winParent.canClose = true;
    });
    content.onClick(() => {
      if (button.isHovering())
        return;
      let mappedValue = map(mousePos().x, content.screenPos().x, content.screenPos().x + content.width, opts.range[0], opts.range[1]);
      value = clamp(mappedValue, opts.range[0], opts.range[1]);
    });
    return {
      sliderContent: content,
      sliderButton: button,
      value,
      range: [opts.range[0], opts.range[1]],
      setValue: (newValue) => {
        value = newValue;
        triggerOnValueChange();
      }
    };
  }
  function playSliderSound(value) {
    if (Math.round(value) % 2 == 0) {
      let mappedDetune = map(value, 0, 255, -100, 100);
      playSfx("hoverMiniButton", { detune: mappedDetune });
    }
  }
  function addDefaultButton(position, parent, sliders, defaultValues) {
    parent = parent || ROOT;
    let winParent = parent.parent;
    let defaultButton = parent.add([
      sprite("defaultButton"),
      pos(position),
      area(),
      color(),
      scale(),
      anchor("center"),
      drawDamnShadow(2, 2, 0.5)
    ]);
    defaultButton.onClick(() => {
      if (!winParent.active)
        return;
      bop(defaultButton);
      playSfx("clickButton", { detune: rand(-50, 50) });
      for (let i2 = 0; i2 < sliders.length; i2++) {
        sliders[i2].setValue(defaultValues[i2]);
      }
    });
    return defaultButton;
  }
  function addRandomButton(position, parent, sliders) {
    parent = parent || ROOT;
    let winParent = parent.parent;
    let randomButton = parent.add([
      sprite("randomButton"),
      pos(position),
      area(),
      anchor("center"),
      color(),
      scale(),
      hoverController(),
      drawDamnShadow(2, 2, 0.5)
    ]);
    randomButton.onClick(() => {
      if (!winParent.active)
        return;
      bop(randomButton);
      playSfx("clickButton", { detune: rand(-50, 50) });
      sliders.forEach((slider) => {
        let randomValue = rand(slider.range[0], slider.range[1]);
        slider.setValue(randomValue);
      });
    });
    return randomButton;
  }
  function addNumbers(position, parent, objSaveColor) {
    parent = parent || ROOT;
    let numberStyles = {};
    let names = Object.keys(objSaveColor).map((color2) => keyToName(color2));
    names.forEach((colorName) => {
      numberStyles[`${colorName}`] = {
        color: Color.fromArray(sliderColors[colorName].full)
      };
    });
    function formatRgb(value) {
      return value.toFixed(0).padStart(3, "0");
    }
    let numbers = parent.add([
      text("000 000 000", {
        styles: numberStyles
      }),
      pos(position),
      anchor("left"),
      drawDamnShadow(2, 2, 0.5),
      {
        update() {
          let stuff = [];
          if (isNaN(objSaveColor.a) == true)
            delete objSaveColor.a;
          Object.keys(objSaveColor).forEach((colorKey, index) => {
            if (colorKey == "a") {
              stuff[index] = `[${names[index]}]${formatRgb(objSaveColor[colorKey] * 100)}[/${names[index]}]`;
            } else {
              stuff[index] = `[${names[index]}]${formatRgb(objSaveColor[colorKey])}[/${names[index]}]`;
            }
          });
          this.text = stuff.join(" ");
        }
      }
    ]);
    return numbers;
  }

  // source/game/windows/color/hexColorWin.ts
  function hexColorWinContent(winParent) {
    let redslider = addSlider({
      parent: winParent,
      pos: vec2(-180, -66),
      value: GameState.settings.hexColor.r,
      range: [0, 255],
      color: "red",
      onValueChange: (value) => {
        hexagon.color.r = value;
        GameState.settings.hexColor.r = value;
        playSliderSound(value);
      }
    });
    let greenslider = addSlider({
      parent: winParent,
      pos: vec2(-180, -15),
      value: GameState.settings.hexColor.g,
      range: [0, 255],
      color: "green",
      onValueChange: (value) => {
        hexagon.color.g = value;
        GameState.settings.hexColor.g = value;
        playSliderSound(value);
      }
    });
    let blueslider = addSlider({
      parent: winParent,
      pos: vec2(-180, 38),
      value: GameState.settings.hexColor.b,
      range: [0, 255],
      color: "blue",
      onValueChange: (value) => {
        hexagon.color.b = value;
        GameState.settings.hexColor.b = value;
        playSliderSound(value);
      }
    });
    let sliders = [redslider, greenslider, blueslider];
    let controlBar = winParent.add([
      rect(winParent.width - 40, 60, { radius: 10 }),
      anchor("top"),
      pos(0, 70),
      color(BLACK),
      opacity(0.25)
    ]);
    let defaultButton = addDefaultButton(vec2(-135, 29), controlBar, sliders, [255, 255, 255]);
    let randomButton = addRandomButton(vec2(-66, 29), controlBar, sliders);
    let rgbaNumbers = addNumbers(vec2(-18, 29), controlBar, GameState.settings.hexColor);
    winParent.onUpdate(() => {
      winParent.color = hexagon.color.lighten(50);
    });
  }

  // source/game/windows/color/bgColorWin.ts
  function bgColorWinContent(winParent) {
    let redslider = addSlider({
      parent: winParent,
      pos: vec2(-180, -98),
      value: GameState.settings.bgColor.r,
      range: [0, 255],
      color: "red",
      onValueChange: (value) => {
        gameBg.color.r = value;
        GameState.settings.bgColor.r = value;
        playSliderSound(value);
      }
    });
    let greenslider = addSlider({
      parent: winParent,
      pos: vec2(-180, redslider.sliderContent.pos.y + 55),
      value: GameState.settings.bgColor.g,
      range: [0, 255],
      color: "green",
      onValueChange: (value) => {
        gameBg.color.g = value;
        GameState.settings.bgColor.g = value;
        playSliderSound(value);
      }
    });
    let blueslider = addSlider({
      parent: winParent,
      pos: vec2(-180, greenslider.sliderContent.pos.y + 55),
      value: GameState.settings.bgColor.b,
      range: [0, 255],
      color: "blue",
      onValueChange: (value) => {
        gameBg.color.b = value;
        GameState.settings.bgColor.b = value;
        playSliderSound(value);
      }
    });
    let alphaslider = addSlider({
      parent: winParent,
      pos: vec2(-180, blueslider.sliderContent.pos.y + 55),
      value: GameState.settings.bgColor.a,
      range: [0, 1],
      color: "alpha",
      onValueChange: (value) => {
        gameBg.colorA = value;
        GameState.settings.bgColor.a = value;
        playSliderSound(value);
      }
    });
    let sliders = [redslider, greenslider, blueslider, alphaslider];
    let controlBar = winParent.add([
      rect(winParent.width - 20, 60, { radius: 10 }),
      anchor("left"),
      pos(-winParent.width / 2 + 10, 125),
      color(BLACK),
      opacity(0.25)
    ]);
    let defaultButton = addDefaultButton(vec2(38, 0), controlBar, sliders, [0, 0, 0, 0.84]);
    let randomButton = addRandomButton(vec2(98, 0), controlBar, sliders);
    let rgbaNumbers = addNumbers(vec2(130, 0), controlBar, GameState.settings.bgColor);
    winParent.onUpdate(() => {
      winParent.color = blendColors(WHITE, gameBg.color.lighten(50), gameBg.colorA);
    });
  }

  // source/game/windows/leaderboardsWin.ts
  async function updateScores(winParent) {
    const paramsForGettingScores = { period: "A", limit: 5 };
    const dummyLeaderboard = { user: { name: "NoOne" }, value: 0 };
    const scoreLeaderboards = await ht2.getScores(SCORE_LEADERBOARD_ID, paramsForGettingScores);
    const timeLeaderboards = await ht2.getScores(TIME_LEADERBOARD_ID, paramsForGettingScores);
    for (let i2 = 0; i2 < 5; i2++) {
      if (!scoreLeaderboards[i2])
        scoreLeaderboards[i2] = dummyLeaderboard;
    }
    for (let i2 = 0; i2 < 5; i2++) {
      if (!timeLeaderboards[i2])
        timeLeaderboards[i2] = dummyLeaderboard;
    }
    let names = winParent.get("names")[0];
    if (names) {
      let scoreNames = scoreLeaderboards.map((score) => score.user.name);
      names.text = scoreNames.join("\n");
    }
    let scores = winParent.get("scores")[0];
    if (scores) {
      let scoreValues = scoreLeaderboards.map((score) => formatNumber(score.value));
      scores.text = scoreValues.join("\n");
    }
    let times = winParent.get("times")[0];
    if (times) {
      let timeValues = timeLeaderboards.map((score) => formatTime(score.value / 1e3, true));
      times.text = timeValues.join("\n");
    }
  }
  async function leaderboardsWinContent(winParent) {
    let loadingEvent = winParent.onDraw(() => {
      drawText({
        text: "Loading" + ".".repeat(wave(1, 4, time() * 10)),
        size: 24,
        anchor: "center",
        pos: vec2(0)
      });
    });
    await updateScores(winParent);
    loadingEvent.cancel();
    let header = winParent.add([
      sprite("leaderboardsHeader"),
      anchor("center"),
      pos(-30, -91)
    ]);
    const propertyTextProperties = {
      textOpts: { align: "center", lineSpacing: 10 },
      yPos: 40
    };
    let ranks = winParent.add([
      text("", propertyTextProperties.textOpts),
      pos(-252, propertyTextProperties.yPos),
      anchor("center")
    ]);
    let rankNumbers = ["1.", "2.", "3.", "4.", "5."];
    ranks.text = rankNumbers.join("\n");
    let names = winParent.add([
      text("", propertyTextProperties.textOpts),
      pos(-141, propertyTextProperties.yPos),
      anchor("center"),
      "names"
    ]);
    let scores = winParent.add([
      text("", propertyTextProperties.textOpts),
      pos(39, propertyTextProperties.yPos),
      anchor("center"),
      "scores"
    ]);
    let times = winParent.add([
      text("", propertyTextProperties.textOpts),
      pos(189, propertyTextProperties.yPos),
      anchor("center"),
      "times"
    ]);
    await updateScores(winParent);
    winParent.wait(10, () => {
      winParent.loop(30, async () => {
        await updateScores(winParent);
      });
    });
  }

  // source/game/windows/windows-api/windowManaging.ts
  var infoForWindows = {};
  var allObjWindows2 = {
    isHoveringAWindow: false,
    isDraggingAWindow: false
  };
  var buttonSpacing = 75;
  function deactivateAllWindows() {
    get("window").filter((window2) => window2.active == true).forEach((element) => {
      element.deactivate();
    });
  }
  function manageWindow(windowKey5) {
    if (!infoForWindows.hasOwnProperty(windowKey5))
      throw new Error("No such window for: " + windowKey5);
    let maybeWindow = get(windowKey5).filter((obj) => !obj.is("minibutton"))[0];
    if (maybeWindow) {
      if (maybeWindow.is("window")) {
        maybeWindow.close();
      }
    } else {
      maybeWindow = openWindow3(windowKey5);
    }
    return maybeWindow;
  }
  function windowsDefinition() {
    infoForWindows = {
      "storeWin": { idx: 0, content: storeWinContent, lastPos: vec2(264, 285) },
      "musicWin": { idx: 1, content: musicWinContent, lastPos: vec2(208, 96) },
      "ascendWin": { idx: 2, content: ascendWinContent, lastPos: vec2(center().x, center().y) },
      "statsWin": { idx: 3, content: statsWinContent, lastPos: vec2(center().x, center().y) },
      "medalsWin": { idx: 4, content: medalsWinContent, lastPos: vec2(center().x, center().y) },
      "creditsWin": { idx: 5, content: creditsWinContent, lastPos: vec2(center().x, center().y) },
      "settingsWin": { idx: 6, content: settingsWinContent, lastPos: vec2(center().x, center().y) },
      "leaderboardsWin": { idx: 7, content: leaderboardsWinContent, lastPos: vec2(center().x, center().y) },
      "hexColorWin": { idx: 8, content: hexColorWinContent, lastPos: vec2(208, 160) },
      "bgColorWin": { idx: 9, content: bgColorWinContent, lastPos: vec2(width() - 200, 200) },
      "extraWin": { idx: 10, icon: "extra", content: extraWinContent, lastPos: vec2(750, 392) }
    };
    return infoForWindows;
  }
  function isWindowOpen(windowKey5) {
    return get(windowKey5).filter((obj) => obj.is("window")).length > 0;
  }
  function addXButton(windowParent) {
    let xButton = windowParent.add([
      sprite("xButton"),
      color(WHITE),
      pos(),
      anchor("center"),
      hoverController(),
      z(windowParent.z + 1),
      area({ scale: vec2(1.8, 1.1) }),
      "xButton",
      "ignorepoint",
      {
        add() {
          let offset = vec2(-18, 23);
          this.pos.x += windowParent.width / 2;
          this.pos.y -= windowParent.height / 2;
          this.pos = this.pos.add(offset);
        }
      }
    ]);
    xButton.onHover(() => {
      xButton.color = RED;
    });
    xButton.onHoverEnd(() => {
      xButton.color = WHITE;
    });
    xButton.onClick(() => {
      if (!windowParent.active) {
        if (!allObjWindows2.isDraggingAWindow && !get("window").some((window2) => window2.isHovering() && window2 != windowParent)) {
          windowParent.close();
        }
      } else
        windowParent.close();
    });
    return xButton;
  }
  function openWindow3(windowKey5) {
    if (!infoForWindows.hasOwnProperty(windowKey5))
      throw new Error(`No such window for: ${windowKey5}`);
    playSfx("openWin");
    let windowObj = add([
      sprite(getSprite(windowKey5) ? windowKey5 : "dumbTestWin"),
      pos(infoForWindows[windowKey5].lastPos),
      anchor("center"),
      opacity(1),
      scale(1),
      layer("windows"),
      z(0),
      drag(),
      area({ scale: vec2(1, 1) }),
      timer(),
      color(),
      hoverController(10),
      "window",
      "ignorepoint",
      `${windowKey5}`,
      {
        idx: infoForWindows[windowKey5].idx,
        windowKey: windowKey5,
        active: true,
        xButton: null,
        canClose: true,
        close() {
          this.trigger("close");
          this.removeAll();
          this.unuse("window");
          this.active = false;
          playSfx("closeWin");
          tween(this.scale, vec2(0.9), 0.32, (p) => this.scale = p, easings.easeOutQuint);
          tween(this.opacity, 0, 0.32, (p) => this.opacity = p, easings.easeOutQuint).then(() => {
            destroy(this);
          });
          folderObj.trigger("winClose");
          infoForWindows[windowKey5].lastPos = this.pos;
        },
        releaseDrop() {
          if (curDraggin && curDraggin == this) {
            curDraggin.trigger("dragEnd");
            setCurDraggin(null);
          }
        },
        activate() {
          this.active = true;
          this.trigger("activate");
          const highestWindow2 = get("window").sort((a, b) => b.z - a.z)[0];
          swap(this, "z", highestWindow2, "z");
          if (this.is("shader")) {
            this.unuse("shader");
            this.get("*", { recursive: true }).forEach((obj) => {
              obj.unuse("shader");
            });
          }
        },
        deactivate() {
          this.active = false;
          this.trigger("deactivate");
          if (!this.is("shader")) {
            this.use(shader("grayscale"));
            this.get("*", { recursive: true }).forEach((obj) => {
              obj.use(shader("grayscale"));
            });
          }
        },
        isMouseInClickingRange() {
          let condition = mouse.pos.y >= getPositionOfSide(this).top && mouse.pos.y <= getPositionOfSide(this).top + 35;
          return condition;
        },
        isMouseInRange() {
          return this.hasPoint(mouse.pos);
        }
      }
    ]);
    windowObj.z = "";
    const highestWindow = get("window").sort((a, b) => b.z - a.z)[0] ?? { z: 0 };
    windowObj.z = highestWindow.z + 1;
    windowObj.clickIndex = 10 + windowObj.z;
    infoForWindows[windowKey5].lastPos.x = clamp(infoForWindows[windowKey5].lastPos.x, 196, 827);
    infoForWindows[windowKey5].lastPos.y = clamp(infoForWindows[windowKey5].lastPos.y, height() - windowObj.height / 2, -windowObj.height / 2);
    windowObj.pos = infoForWindows[windowKey5].lastPos;
    windowObj.xButton = addXButton(windowObj);
    windowObj.onUpdate(() => {
      windowObj.pos.x = clamp(windowObj.pos.x, -151, 1180);
      windowObj.pos.y = clamp(windowObj.pos.y, windowObj.height / 2, height() + windowObj.height / 2 - 36);
    });
    windowObj.onClick(() => {
      if (!windowObj.is("window"))
        return;
      if (!windowObj.xButton.isHovering()) {
        if (curDraggin) {
          return;
        }
        for (const window2 of get("window").reverse()) {
          if (window2.isMouseInRange()) {
            if (window2.isMouseInClickingRange()) {
              window2.pick();
            }
            if (window2.active == false) {
              wait(0.01, () => {
                deactivateAllWindows();
                window2.activate();
              });
            }
            break;
          }
        }
      }
    });
    windowObj.onMouseRelease(() => {
      if (windowObj.dragging)
        windowObj.releaseDrop();
    });
    windowObj.onKeyPress("escape", () => {
      if (windowObj.canClose == true && windowObj.active && curDraggin != windowObj && !(windowObj.is("extraWin") && curDraggin?.is("gridMiniButton")))
        windowObj.close();
    });
    deactivateAllWindows();
    windowObj.activate();
    infoForWindows[windowKey5].content(windowObj, windowKey5);
    tween(0, 1, 0.32, (p) => windowObj.opacity = p, easings.easeOutQuint);
    tween(vec2(0.8), vec2(1), 0.32, (p) => windowObj.scale = p, easings.easeOutQuint);
    let correspondingMinibutton = get("minibutton").filter((minibutton) => minibutton.windowKey === windowKey5)[0];
    if (correspondingMinibutton != null) {
      correspondingMinibutton.window = windowObj;
      if (!correspondingMinibutton.isHovering())
        bop(correspondingMinibutton);
    }
    windowObj.on("close", () => {
      if (correspondingMinibutton != null) {
        correspondingMinibutton.window = null;
        if (!correspondingMinibutton.isHovering())
          bop(correspondingMinibutton);
      }
    });
    let drawShadowEvent = onDraw(() => {
      drawSprite({
        sprite: windowObj.sprite,
        // width: windowObj.width,
        // height: windowObj.height,
        pos: vec2(windowObj.pos.x, windowObj.pos.y + 4),
        scale: windowObj.scale,
        anchor: windowObj.anchor,
        color: BLACK,
        opacity: 0.5
      });
    });
    windowObj.on("close", () => {
      drawShadowEvent.cancel();
    });
    ROOT.trigger("winOpen", windowKey5);
    return windowObj;
  }

  // source/game/additives.ts
  var gameBg;
  function addBackground() {
    gameBg = add([
      rect(width(), height()),
      pos(center()),
      anchor("center"),
      scale(8),
      color(saveColorToColor(GameState.settings.bgColor)),
      layer("background"),
      stay(),
      {
        speed: 0.1,
        movAngle: 5,
        uScale: 2,
        col1D: rgb(128, 128, 128),
        col2D: rgb(190, 190, 190),
        colorA: GameState.settings.bgColor.a,
        update() {
          if (getSceneName() != "gamescene")
            return;
          if (!isWindowUnlocked("bgColorWin"))
            return;
          if (isMousePressed("right")) {
            if (!hexagon?.isHovering() && !get("folderObj")[0]?.isHovering() && !get("minibutton")[0]?.isHovering() && !get("window")[0]?.isHovering() && !allObjWindows2.isDraggingAWindow) {
              manageWindow("bgColorWin");
            }
          }
        }
      }
    ]);
    gameBg.use(shader("checkeredBg", () => ({
      "u_time": time() / 10,
      "u_color1": blendColors(gameBg.col1D, gameBg.color, gameBg.colorA),
      "u_color2": blendColors(gameBg.col2D, gameBg.color, gameBg.colorA),
      "u_speed": vec2(-1, 2).scale(gameBg.speed),
      "u_angle": gameBg.movAngle,
      "u_scale": gameBg.uScale,
      "u_aspect": width() / height()
    })));
  }
  var mouse;
  function addMouse() {
    mouse = add([
      sprite("cursors"),
      pos(mousePos()),
      color(WHITE),
      stay(),
      anchor(vec2(-0.5, -0.65)),
      fixed(),
      layer("mouse"),
      z(0),
      {
        intro: false,
        speed: 5e3,
        // 5000 is the optimal for actual mouse movement
        grabbing: false,
        update() {
          const allHoverObjs = get("hover", { recursive: true });
          allHoverObjs.forEach((hoverObj) => {
            if (!hoverObj.isHovering()) {
              if (hoverObj.dragging)
                this.play("grab");
              else {
                if (allHoverObjs.some((otherObj) => otherObj.isHovering()))
                  return;
                else
                  this.play("cursor");
              }
            } else {
              if (isMouseDown("left")) {
                if (hoverObj.is("ignorepoint") && !hoverObj.dragging)
                  return;
                this.play("grab");
              } else {
                if (!hoverObj.is("ignorepoint"))
                  this.play("point");
                else
                  this.play("cursor");
              }
            }
          });
          this.pos = lerp(this.pos, mousePos(), 0.9);
        }
      }
    ]);
    return mouse;
  }
  var initialYPosition = 50;
  function addToast(opts) {
    opts = opts || {};
    let toasts = get("toast", { recursive: true });
    function getAvailableIndex(toasts2) {
      let occupiedIndices = toasts2.map((log) => log.index);
      for (let i2 = 0; i2 < Infinity; i2++) {
        if (!occupiedIndices.includes(i2)) {
          return i2;
        }
      }
    }
    let idx = getAvailableIndex(toasts);
    let yOffset = initialYPosition;
    for (let i2 = 0; i2 < idx; i2++) {
      yOffset += toasts[i2].height + 10;
    }
    const LERP_VALUE = 0.1;
    let toastPosition = vec2();
    toastPosition.x = -200;
    toastPosition.y = yOffset;
    let toastBg = add([
      rect(0, 0, { radius: [0, 10, 10, 0] }),
      pos(-200, yOffset),
      anchor("top"),
      color(WHITE.darken(50)),
      fixed(),
      layer("logs"),
      z(0),
      timer(),
      "toast",
      {
        index: idx,
        type: opts.type,
        icon: null,
        title: null,
        body: null,
        getPosition() {
          return toastPosition;
        },
        setPosition(posi) {
          toastPosition = posi;
        },
        close() {
          this.unuse("toast");
          toastPosition.x = -this.width;
          wait(1.5).onEnd(() => {
            this.trigger("closed");
            this.destroy();
          });
        },
        update() {
          this.pos = lerp(this.pos, toastPosition, LERP_VALUE);
        }
      }
    ]);
    let drawToastShadow = onDraw(() => {
      drawRect({
        pos: vec2(toastBg.pos.x, toastBg.pos.y + 5),
        width: toastBg.width,
        anchor: toastBg.anchor,
        height: toastBg.height,
        radius: toastBg.radius,
        opacity: 0.5,
        fixed: toastBg.is("fixed") ?? true,
        color: BLACK
      });
    });
    toastBg.height = opts.icon ? 80 : 100;
    let icon = add([
      sprite("white_noise"),
      anchor("center"),
      pos(toastBg.pos.x - toastBg.width / 2 + 50, toastBg.pos.y),
      fixed(),
      layer("logs"),
      z(toastBg.z + 1),
      {
        update() {
          this.pos.x = toastBg.pos.x - toastBg.width / 2 + 50;
          this.pos.y = toastBg.pos.y + toastBg.height / 2;
        }
      }
    ]);
    icon.sprite = opts.icon;
    if (icon.width >= 70)
      icon.width = 60;
    if (icon.height >= 70)
      icon.height = 60;
    let titleText = add([
      text(opts.title, {
        font: "lambda",
        size: 40,
        align: "left",
        width: 500
      }),
      pos(icon.pos.x + icon.width / 2 + 10, toastBg.pos.y - toastBg.height / 2),
      fixed(),
      color(BLACK),
      layer("logs"),
      z(toastBg.z + 1),
      {
        update() {
          this.pos.x = icon.pos.x + icon.width / 2 + 10;
          this.pos.y = toastBg.pos.y + 5;
        }
      }
    ]);
    let bodyText = add([
      text(opts.body, {
        font: "lambda",
        size: 20,
        align: "left",
        width: 500
      }),
      pos(titleText.pos.x, titleText.pos.y + titleText.height),
      fixed(),
      color(BLACK),
      layer("logs"),
      z(toastBg.z + 1),
      {
        update() {
          this.pos.x = titleText.pos.x;
          this.pos.y = titleText.pos.y + titleText.height;
        }
      }
    ]);
    toastBg.width = icon.width + 20;
    toastBg.height = icon.height + 20;
    let titleTextWidth = formatText({ text: titleText.text, size: titleText.textSize }).width;
    let bodyTextWidth = formatText({ text: bodyText.text, size: bodyText.textSize }).width;
    titleTextWidth = clamp(titleTextWidth, 0, 500);
    bodyTextWidth = clamp(bodyTextWidth, 0, 500);
    if (titleTextWidth > bodyTextWidth)
      toastBg.width += titleTextWidth + 25;
    else if (bodyTextWidth > titleTextWidth)
      toastBg.width += bodyTextWidth + 25;
    else if (bodyTextWidth == titleTextWidth)
      toastBg.width += titleTextWidth + 25;
    if (titleText.height > bodyText.height)
      toastBg.height = titleText.height + bodyText.height + 15;
    else if (bodyText.height > titleText.height)
      toastBg.height += bodyText.height - titleText.height + 15;
    else if (bodyText.height == titleText.height)
      toastBg.height = titleText.height + bodyText.height + 15;
    toastPosition.x = toastBg.width / 2;
    if (opts.whenAdded)
      opts.whenAdded(toastBg, icon);
    toastBg.wait(opts.duration ?? 3, () => {
      toastBg.close();
    });
    toastBg.onDestroy(() => {
      drawToastShadow.cancel();
      icon.destroy();
      titleText.destroy();
      bodyText.destroy();
    });
    const Ycenter = toastBg.pos.y + toastBg.height * 0.5;
    if (Ycenter >= height()) {
      const newYPos = height() - toastBg.height - 10;
      toastBg.setPosition(vec2(toastBg.getPosition().x, newYPos));
      const allTosts = get("toast");
      allTosts.filter((toast) => toast != toastBg).forEach((toast) => {
        const newYPos2 = toast.getPosition().y - toastBg.height - 10;
        toast.setPosition(vec2(toast.getPosition().x, newYPos2));
      });
    }
    if (Ycenter < -10)
      toastBg.close();
    toastBg.icon = icon;
    toastBg.title = titleText;
    toastBg.body = bodyText;
    return toastBg;
  }
  function addTooltip(obj, opts) {
    if (opts == void 0)
      opts = {};
    opts.direction = opts.direction ?? "up";
    opts.lerpValue = opts.lerpValue ?? 1;
    opts.textSize = opts.textSize ?? 20;
    opts.layer = opts.layer ?? "windows";
    opts.z = opts.z ?? obj.z ? obj.z + 1 : 10;
    let sizeOfText = { x: 0, y: 0 };
    let offset = 10;
    let bgPos = vec2(obj.worldPos().x, obj.worldPos().y);
    let padding = 10;
    let ending = false;
    let theOpacity = 0.95;
    let tooltipBg = add([
      rect(sizeOfText.x, sizeOfText.y, { radius: 5 }),
      z(0),
      pos(obj.worldPos()),
      color(BLACK),
      opacity(theOpacity),
      anchor("center"),
      layer(opts.layer),
      z(opts.z),
      "tooltip",
      {
        end: null,
        type: opts.type,
        update() {
          if (ending == false) {
            if (!opts.position) {
              switch (opts.direction) {
                case "up":
                  bgPos.y = obj.worldPos().y - obj.height / 2 - offset;
                  bgPos.x = obj.worldPos().x;
                  break;
                case "down":
                  bgPos.y = obj.worldPos().y + obj.height / 2 + offset;
                  bgPos.x = obj.worldPos().x;
                  break;
                case "left":
                  this.anchor = "right";
                  bgPos.x = obj.worldPos().x - obj.width / 2 - offset;
                  bgPos.y = obj.worldPos().y;
                  break;
                case "right":
                  this.anchor = "left";
                  bgPos.x = obj.worldPos().x + obj.width / 2 + offset;
                  bgPos.y = obj.worldPos().y;
                  break;
              }
            } else {
              bgPos = opts.position;
            }
          }
          this.width = lerp(this.width, sizeOfText.x + padding, opts.lerpValue);
          this.height = lerp(this.height, sizeOfText.y + padding, opts.lerpValue);
          this.pos.x = lerp(this.pos.x, bgPos.x, opts.lerpValue);
          this.pos.y = lerp(this.pos.y, bgPos.y, opts.lerpValue);
          this.opacity = lerp(this.opacity, theOpacity, opts.lerpValue);
        }
      }
    ]);
    let tooltipText = add([
      text(opts.text, {
        font: "lambda",
        size: opts.textSize,
        styles: {
          "red": {
            color: RED
          },
          "green": {
            color: GREEN
          },
          "title": {
            scale: vec2(1.1)
          }
        }
      }),
      color(WHITE),
      anchor(tooltipBg.anchor),
      opacity(0),
      pos(tooltipBg.pos),
      layer(opts.layer),
      z(opts.z + 1),
      "tooltip",
      {
        bg: tooltipBg,
        update() {
          sizeOfText.x = formatText({ text: tooltipText.text, size: tooltipText.textSize }).width;
          sizeOfText.y = formatText({ text: tooltipText.text, size: tooltipText.textSize }).height;
          this.anchor = tooltipBg.anchor;
          this.layer = tooltipBg.layer;
          this.z = tooltipBg.z;
          let xPos;
          if (opts.direction == "right")
            xPos = tooltipBg.pos.x + padding / 2;
          else if (opts.direction == "left")
            xPos = tooltipBg.pos.x - padding / 2;
          else
            xPos = tooltipBg.pos.x;
          this.pos.x = xPos;
          this.pos.y = tooltipBg.pos.y;
          this.opacity = lerp(this.opacity, theOpacity > 0 ? 1 : theOpacity, opts.lerpValue);
        }
      }
    ]);
    function end() {
      ending = true;
      theOpacity = 0;
      bgPos = obj.worldPos();
      wait(1 - opts.lerpValue, () => {
        destroy(tooltipBg);
        destroy(tooltipText);
      });
      obj.tooltip = null;
    }
    function changePos(newPos) {
      opts.position = newPos;
    }
    let tooltipinfo = {
      tooltipBg,
      tooltipText,
      type: opts.type,
      end,
      changePos
    };
    if (obj.tooltip == null)
      obj.tooltip = tooltipinfo;
    obj.onDestroy(() => {
      end();
    });
    tooltipBg.end = end;
    return tooltipinfo;
  }

  // source/game/utils.ts
  function formatNumberSimple(value) {
    let integerStr = value.toString();
    var len = integerStr.length;
    var formatted = "";
    var breakpoint = (len - 1) % 3;
    for (let i2 = 0; i2 < len; i2++) {
      formatted += integerStr.charAt(i2);
      if (i2 % 3 === breakpoint) {
        if (i2 < len - 1)
          formatted += ".";
      }
    }
    return formatted;
  }
  var numTypes = {
    n: { small: "", large: "" },
    // just for offset apparently
    K: { small: "K", large: "Thousands" },
    M: { small: "M", large: "Millions" },
    B: { small: "B", large: "Billions" },
    T: { small: "T", large: "Trillions" },
    Qa: { small: "Qa", large: "Quadrillions" },
    Qt: { small: "Qi", large: "Quintillions" },
    St: { small: "Sx", large: "Sextillions" },
    Sp: { small: "Sp", large: "Septillions" },
    Oc: { small: "Oc", large: "Octillions" },
    Nn: { small: "No", large: "Nonillions" },
    Dc: { small: "Dc", large: "Decillions" },
    Un: { small: "Und", large: "Undecillions" },
    Du: { small: "DoD", large: "Duodecillions" },
    Te: { small: "TrD", large: "Tredecillions" },
    Qd: { small: "QaD", large: "Quattuordecillion" },
    Qu: { small: "QiD", large: "Quindecillions" },
    Sd: { small: "SxD", large: "Sexdecillions" },
    Su: { small: "SpD", large: "Septemdecillion" },
    Oe: { small: "OcD", large: "Octodecillion" },
    No: { small: "NoD", large: "Novemdecillion" },
    Ve: { small: "VgT", large: "Vigintillion" }
  };
  function formatNumber(value, opts) {
    if (opts == void 0)
      opts = {};
    opts.price = opts.price ?? false;
    opts.fullWord = opts.fullWord ?? false;
    if (opts.price && !opts.fixAmount)
      opts.fixAmount = 1;
    else
      opts.fixAmount = opts.fixAmount ?? 3;
    let returnValue = "";
    if (value < 1e3) {
      returnValue = value.toString();
    } else if (value < Math.pow(1e3, Object.keys(numTypes).length) && value > 999) {
      for (let i2 = 1; value >= Math.pow(1e3, i2); i2++) {
        let numberValue = (value / Math.pow(1e3, i2)).toFixed(opts.fixAmount);
        let suffix = (opts.fullWord == true ? " " : "") + numTypes[Object.keys(numTypes)[i2]][opts.fullWord == true ? "large" : "small"];
        returnValue = numberValue + suffix;
      }
    } else {
      returnValue = value.toExponential(2);
    }
    if (opts.price == true)
      returnValue = returnValue.replace(/^/, "$");
    if (GameState.settings.commaInsteadOfDot == true)
      returnValue = returnValue.replaceAll(".", ",");
    return returnValue;
  }
  function coolSetFullscreen(bool) {
    let kanvas = document.querySelector("#kanva");
    if (bool == true) {
      kanvas.requestFullscreen();
    } else if (bool == false)
      kanvas;
  }
  function getPosInGrid(initialpos, row, column, spacing2) {
    return vec2(initialpos.x + spacing2.x * column, initialpos.y + spacing2.y * row);
  }
  function toHHMMSS2(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor(timeInSeconds % 3600 / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedHours = hours > 0 ? `${hours}:` : "";
    const formattedMinutes = hours > 0 ? `${minutes < 10 ? "0" + minutes : minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  }
  function formatTime(time2, includeWords) {
    let returnValue = toHHMMSS2(time2);
    if (includeWords == true) {
      let timeName = "";
      if (time2 > 3600) {
        if (time2 < 3600 * 2)
          timeName = "hour";
        else
          timeName = "hours";
      } else if (time2 > 60) {
        if (time2 < 120)
          timeName = "min";
        else
          timeName = "mins";
      } else if (time2 > 0) {
        if (time2 < 2)
          timeName = "sec";
        else
          timeName = "secs";
      }
      returnValue = `${returnValue} ${timeName}`;
    }
    return returnValue;
  }
  function percentage2(percentageOf, number) {
    return Math.round(percentageOf * number / 100);
  }
  function getPrice(opts) {
    opts.amountToBuy = opts.amountToBuy ?? 1;
    opts.gifted = opts.gifted ?? 0;
    let percentageMultiplier = 1 + opts.percentageIncrease / 100;
    let priceToReturn = 0;
    for (let i2 = 0; i2 < opts.amountToBuy; i2++) {
      let currentPrice = opts.basePrice * percentageMultiplier ** (opts.objectAmount + i2 - opts.gifted);
      priceToReturn += Math.round(currentPrice);
    }
    return priceToReturn;
  }
  function removeNumbersOfString(str) {
    return str.replace(/\d+/g, "");
  }
  function getRandomElementDifferentFrom(arr, element) {
    const filteredArray = arr.filter((item) => item !== element);
    if (filteredArray.length === 0) {
      throw new Error("No different elements available");
    }
    const randomIndex = Math.floor(Math.random() * filteredArray.length);
    return filteredArray[randomIndex];
  }
  function insertAtStart2(str, replacement) {
    return str.replace(/^/, `${replacement}`);
  }
  function blendColors(color1, color2, blendFactor) {
    return color1.lerp(color2, blendFactor);
  }
  function sortedTaskbar() {
    let unlockedWindowsWithoutExtraAndTaskbar = GameState.unlockedWindows.filter((key) => key != "extraWin" && !GameState.taskbar.includes(key));
    let taskbarCopy = GameState.taskbar;
    while (taskbarCopy.filter((key) => key != "extraWin").length < 4 && unlockedWindowsWithoutExtraAndTaskbar.length > 0) {
      if (GameState.unlockedWindows.filter((key) => GameState.taskbar.includes(key)).length > 0) {
        let randomNewOne = choose(GameState.unlockedWindows.filter((key) => !GameState.taskbar.includes(key)));
        taskbarCopy.push(randomNewOne);
      }
    }
    if (taskbarCopy.includes("extraWin")) {
      taskbarCopy.push(taskbarCopy.splice(taskbarCopy.indexOf("extraWin"), 1)[0]);
    }
    return taskbarCopy;
  }
  function arrToColor(arr) {
    return rgb(arr[0], arr[1], arr[2]);
  }
  function saveColorToColor(color2) {
    return rgb(color2.r, color2.g, color2.b);
  }
  function getPositionOfSide(obj) {
    return {
      get left() {
        return obj.pos.x - obj.width * 0.5;
      },
      get right() {
        return obj.pos.x + obj.width * 0.5;
      },
      get top() {
        return obj.pos.y - obj.height * 0.5;
      },
      get bottom() {
        return obj.pos.y + obj.height * 0.5;
      }
    };
  }
  function getRandomDirection(initialPos2, onlyCardinal, mult) {
    onlyCardinal = onlyCardinal || false;
    let directions = {
      "left": LEFT,
      "right": RIGHT,
      "top": UP,
      "bot": DOWN
    };
    if (onlyCardinal == false) {
      directions["botleft"] = vec2(-1, 1);
      directions["topleft"] = vec2(-1, -1);
      directions["botright"] = vec2(1, 1);
      directions["botleft"] = vec2(1, -1);
    }
    let direction = choose(Object.values(directions));
    direction = direction.scale(mult);
    let newPos = vec2();
    newPos.x = initialPos2.x + direction.x * mult;
    newPos.y = initialPos2.y + direction.y * mult;
    return newPos;
  }
  function parseAnimation(obj, anim) {
    let spriteName = !anim.includes(".") ? anim : [anim.split(".")[0], anim.split(".")[1]];
    obj.unuse("sprite");
    obj.use(sprite(typeof spriteName == "string" ? spriteName : spriteName[0]));
    if (typeof spriteName == "string")
      return;
    if (spriteName[1] && typeof spriteName != "string")
      obj.play(spriteName[1]);
  }
  function getVariable(obj, path) {
    const parts = path.split(".");
    const target = parts.slice(0, -1).reduce((o, p) => o[p], obj);
    return target[parts[parts.length - 1]];
  }
  function setVariable(obj, path, value) {
    const parts = path.split(".");
    const target = parts.slice(0, -1).reduce((o, p) => o[p], obj);
    target[parts[parts.length - 1]] = value;
  }
  function swap(sourceObj, sourceKey, targetObj, targetKey) {
    let temp = sourceObj[sourceKey];
    sourceObj[sourceKey] = targetObj[targetKey];
    targetObj[targetKey] = temp;
  }
  function saveAnim() {
    addToast({
      icon: "saveIcon",
      title: "Game saved!",
      body: `Time played: ${formatTime(GameState.stats.totalTimePlayed, true)}`,
      type: "gamesaved",
      whenAdded(toastObj) {
        playSfx("gamesaved", { detune: rand(0, 30) });
      }
    });
  }
  function randomPos() {
    return vec2(rand(0, width()), rand(0, height()));
  }
  function bop(obj, howMuch = 0.1, bopEasing = easings.easeOutQuint) {
    if (!obj.is("scale"))
      throw new Error("Obj must have scale component");
    if (obj.bopDefScale == null)
      obj.bopDefScale = obj.scale;
    tween(obj.scale, obj.bopDefScale.sub(howMuch), 0.15, (p) => obj.scale = p, bopEasing).then(() => {
      tween(obj.scale, obj.bopDefScale, 0.15, (p) => obj.scale = p, bopEasing);
    });
  }
  function debugTexts() {
    let keys = {};
    function createKeys() {
      let text2 = Object.keys(keys).map((key) => `${key} ${keys[key]}`).join("\n");
      return text2;
    }
    let debugTexts2 = add([
      text("", {
        size: 18
      }),
      color(WHITE),
      opacity(0.25),
      anchor("topleft"),
      layer("mouse"),
      fixed(),
      pos(),
      z(mouse.z + 1),
      "debugText",
      {
        update() {
          if (isKeyPressed("tab"))
            this.hidden = !this.hidden;
          keys = {
            "Auto loop time: ": autoLoopTime.toFixed(2),
            "Time until auto loop ends: ": GameState.timeUntilAutoLoopEnds,
            "isHoveringPowerup": allPowerupsInfo2.isHoveringAPowerup,
            "isHoveringWindow": allObjWindows2.isHoveringAWindow,
            "isDraggingWindow": allObjWindows2.isDraggingAWindow
          };
          this.text = createKeys();
        }
      }
    ]);
    debugTexts2.hidden = true;
  }
  function debugFunctions() {
    debugTexts();
    window.globalThis.GameState = GameState;
    window.globalThis.scoreManager = scoreManager;
    window.globalThis.unlockAchievement = unlockAchievement;
    window.globalThis.lockAchievement = lockAchievement;
    window.globalThis.spawnPowerup = spawnPowerup;
    window.globalThis.hexagon = hexagon;
    window.globalThis.openWindow = openWindow3;
    window.globalThis.unlockWindow = unlockWindow;
    window.globalThis.triggerGnome = triggerGnome;
    window.globalThis.unlockAllAchievements = () => {
      achievements.forEach((achievement) => unlockAchievement(achievement.id));
    };
    onUpdate(() => {
      if (isKeyPressed("c") && GameState.scoreAllTime > 25)
        GameState.save(true);
      else if (isKeyPressed("v"))
        GameState.delete();
      else if (isKeyPressed("b"))
        GameState.cheat();
      else if (isKeyPressed("w")) {
        hexagon.autoClick();
      } else if (isKeyDown("q")) {
        hexagon.clickPress();
        wait(0.1, () => hexagon.clickRelease());
      } else if (isKeyPressed("f")) {
        spawnPowerup({
          type: "random",
          pos: mousePos(),
          natural: true
        });
      } else if (isKeyPressed("g")) {
        let longAchievement = getAchievement("score.100");
        let theIcon = `medals_${longAchievement.id}`;
        addToast({
          // title: "Helo, i am testing",
          // // title: "clickery Hexagon forever and forever a hundred years clickery Hexagon, all day long forever, forever a hundred times, over and over clickery Hexagon adventures dot com",
          // body: "This is a test toast, i am just testing the animations very very very descriptioner",
          // icon: "cursors.point"
          title: longAchievement.title,
          body: longAchievement.description,
          icon: theIcon
        });
      } else if (isKeyPressed("k")) {
        achievements.forEach((achievement) => unlockAchievement(achievement.id));
      }
    });
    onScroll((delta) => {
      if (isKeyDown("shift"))
        cam.zoom = cam.zoom * (1 - 0.1 * Math.sign(delta.y));
    });
    onMousePress("middle", () => {
      if (isKeyDown("shift"))
        cam.zoom = 1;
    });
  }
  function runInTauri2(func) {
    if ("__TAURI_INTERNALS__" in window) {
      func();
    }
  }
  function toggleTheFullscreen(newFullscreen) {
    newFullscreen = newFullscreen ?? !GameState.settings.fullscreen;
    GameState.settings.fullscreen = newFullscreen;
    setFullscreen(GameState.settings.fullscreen);
    runInTauri2(() => appWindow2.setFullscreen(GameState.settings.fullscreen));
    return GameState.settings.fullscreen;
  }

  // source/game/uicounters.ts
  var scoreText;
  var spsText;
  var buildingsText;
  function uiCounters() {
    scoreText = add([
      text(GameState.score.toString(), {
        // 46 width of char
        size: 75,
        font: "lambdao"
      }),
      anchor("center"),
      rotate(0),
      scale(1),
      layer("ui"),
      opacity(1),
      pos(center().x, 60),
      "scoreCounter",
      {
        defaultScale: 1,
        scaleIncrease: 1,
        scoreShown: 0,
        update() {
          this.text = `${formatNumber(Math.round(this.scoreShown))}`;
          this.angle = wave(-2.8, 2.8, time() * 1.25);
          this.scale.x = wave(0.95 * this.scaleIncrease, 1.08 * this.scaleIncrease, time() * 1.15);
          this.scale.y = wave(0.95 * this.scaleIncrease, 1.08 * this.scaleIncrease, time() * 1.15);
          this.defaultScale = vec2(this.scale.x, this.scale.y);
        }
      }
    ]);
    scoreText.on("startAnimEnd", () => {
      scoreText.use(waver({ maxAmplitude: 5, wave_speed: 0.5 }));
      scoreText.startWave();
      scoreText.onUpdate(() => scoreText.scoreShown = GameState.score);
    });
    spsText = scoreText.add([
      text("0.0/s", {
        size: 30,
        font: "lambdao"
      }),
      scale(),
      anchor("center"),
      layer("ui"),
      opacity(1),
      pos(0, scoreText.pos.y - 14),
      "scoreCounter",
      // can't put text change here bc it would update to 0 each second
      {
        defaultYPos: 49,
        barYPos: 75,
        value: 0,
        // value is the raw (number) score per second (with time accounted for)
        formatSpsText(value) {
          let textThing = "/s";
          switch (GameState.settings.spsTextMode) {
            case 1:
              textThing = "/sec";
              break;
            case 2:
              textThing = "/min";
              break;
            case 3:
              textThing = "/hour";
              break;
            default:
              textThing = "/sec";
              break;
          }
          let valueToReturn = formatNumber(Number(value.toFixed(2)), { fixAmount: 2 });
          return valueToReturn + textThing;
        },
        updateValue() {
          let multiplyValue = GameState.settings.spsTextMode ? Math.pow(60, GameState.settings.spsTextMode - 1) : 1;
          this.value = scoreManager.scorePerSecond() * multiplyValue;
        },
        update() {
          this.text = this.formatSpsText(this.value, GameState.settings.spsTextMode);
        }
      }
    ]);
    let buildingTextTextOpts = { size: 40, lineSpacing: 1.5, font: "lambdao" };
    buildingsText = add([
      text(`${formatNumberSimple(GameState.cursors)}<
${formatNumberSimple(GameState.clickers)}`, buildingTextTextOpts),
      opacity(1),
      anchor("left"),
      layer("ui"),
      pos(10, height() - 55),
      waver({ maxAmplitude: 8, wave_speed: 0.8 }),
      {
        update() {
          this.text = `${formatNumberSimple(GameState.cursors)}
${formatNumberSimple(GameState.clickers)}`;
        },
        draw() {
          let clickersWidth = formatText({ text: `${formatNumberSimple(GameState.clickers)}`, ...buildingTextTextOpts }).width;
          let cursorsWidth = formatText({ text: `${formatNumberSimple(GameState.cursors)}`, ...buildingTextTextOpts }).width;
          drawSprite({
            sprite: "cursors",
            frame: 0,
            pos: vec2(this.pos.x + clickersWidth + 5, 28),
            anchor: "center",
            scale: 0.75,
            opacity: this.opacity * 0.9
          });
          drawSprite({
            sprite: "cursors",
            frame: 1,
            pos: vec2(this.pos.x + cursorsWidth + 5, -17),
            anchor: "center",
            scale: 0.75,
            opacity: this.opacity * 0.9
          });
        }
      }
    ]);
    buildingsText.startWave();
  }

  // source/game/hexagon.ts
  var clickVars = {
    clicksPerSecond: 0,
    // to properly calculate sps
    consecutiveClicks: 0,
    comboDropped: true,
    maxedCombo: false,
    constantlyClicking: false
  };
  var COMBO_MINCLICKS = 25;
  var COMBO_MAXCLICKS = 160;
  var COMBO_MAX = 5;
  var consecutiveClicksWaiting = null;
  var spsUpdaterTimer = 0;
  var hexagon;
  function playClickSound() {
    return playSfx("clickPress", { detune: rand(-75, 75) });
  }
  function playClickReleaseSound() {
    return playSfx("clickRelease", { detune: rand(-75, 75) });
  }
  function addHexagon() {
    hexagon = createHexagon();
  }
  function createHexagon() {
    scoreManager.combo = 1;
    clickVars.consecutiveClicks = 0;
    clickVars.constantlyClicking = false;
    clickVars.comboDropped = true;
    clickVars.maxedCombo = false;
    spsUpdaterTimer = 0;
    const hexagon2 = add([
      sprite(GameState.settings.panderitoMode ? "panderito" : "hexagon"),
      pos(center().x, center().y + 55),
      anchor("center"),
      rotate(0),
      scale(),
      opacity(1),
      color(saveColorToColor(GameState.settings.hexColor)),
      area(),
      area(),
      hoverController(1),
      z(0),
      layer("hexagon"),
      "hexagon",
      {
        interactable: true,
        isBeingClicked: false,
        isBeingFakeClicked: false,
        clickPress() {
          playClickSound();
          this.isBeingClicked = true;
          GameState.stats.timesClicked++;
        },
        clickReleaseAnim() {
          this.isBeingClicked = false;
          playClickReleaseSound();
          if (GameState.settings.panderitoMode) {
            let smallpanderito = add([
              sprite("smallpanderito"),
              anchor("center"),
              pos(mouse.pos),
              rotate(rand(0, 360)),
              body(),
              area({ collisionIgnore: ["smallpanderito", "autoCursor"] }),
              opacity(1),
              scale(rand(1, 2.5)),
              layer("ui"),
              color(),
              "smallpanderito"
            ]);
            smallpanderito.gravityScale = 0.5;
            smallpanderito.vel.x = rand(30, 75);
            let randomColor = rgb(rand(0, 255), rand(0, 255), rand(0, 255));
            smallpanderito.color = blendColors(smallpanderito.color, randomColor, 0.1);
            if (chance(0.5)) {
              tween(smallpanderito.angle, smallpanderito.angle + 90, 1, (p) => smallpanderito.angle = p);
            } else {
              tween(smallpanderito.angle, smallpanderito.angle - 90, 1, (p) => smallpanderito.angle = p);
              smallpanderito.vel.x *= -1;
            }
            wait(0.5, () => {
              tween(smallpanderito.opacity, 0, 0.5, (p) => smallpanderito.opacity = p, easings.easeOutQuint);
            });
            wait(1, () => {
              destroy(smallpanderito);
            });
          }
          this.trigger("clickrelease");
        },
        clickRelease() {
          this.clickReleaseAnim();
          clickVars.clicksPerSecond++;
          clickVars.constantlyClicking = true;
          consecutiveClicksWaiting.cancel();
          consecutiveClicksWaiting = wait(1, () => {
            clickVars.constantlyClicking = false;
            if (scoreManager.combo < 2)
              clickVars.consecutiveClicks = 0;
          });
          if (GameState.scoreThisRun > 100) {
            if (clickVars.consecutiveClicks != COMBO_MAXCLICKS) {
              clickVars.consecutiveClicks++;
            }
            if (clickVars.consecutiveClicks == getClicksFromCombo(2) && clickVars.comboDropped == true) {
              startCombo();
            } else if (scoreManager.combo < COMBO_MAX) {
              for (let i2 = 2; i2 < COMBO_MAX + 1; i2++) {
                if (clickVars.consecutiveClicks == getClicksFromCombo(i2)) {
                  increaseCombo();
                }
              }
            }
            if (scoreManager.combo == COMBO_MAX && clickVars.maxedCombo == false) {
              clickVars.maxedCombo = true;
              maxComboAnim();
              addConfetti({ pos: center() });
              tween(-10, 0, 0.5, (p) => cam.rotation = p, easings.easeOutQuint);
              playSfx("fullcombo", { detune: rand(-50, 50) });
              if (!isAchievementUnlocked("extra.maxedcombo")) {
                unlockAchievement("extra.maxedcombo");
              }
            }
          }
          let scoreObtained = 0;
          let isCritical = chance(rand(0.02, 0.08));
          let isBigCrit;
          if (isCritical == true) {
            if (chance(0.2))
              isBigCrit = true;
            else
              isBigCrit = false;
          }
          if (GameState.critPower > 1 && isCritical == true) {
            scoreObtained = scoreManager.scorePerClick(true);
            if (isBigCrit == true)
              scoreObtained *= rand(1.05, 1.1);
          } else {
            scoreObtained = scoreManager.scorePerClick(false);
          }
          scoreObtained = Math.round(scoreObtained);
          let plusScoreText = addPlusScoreText({
            pos: mousePos(),
            value: scoreObtained,
            cursorRelated: false
          });
          scoreManager.addScore(scoreObtained);
          const addCriticalParticles = (big) => {
            let redcritcolor = RED.lighten(rand(110, 130));
            let bluecritcolor = BLUE.lighten(rand(110, 130));
            let theColor = big ? bluecritcolor : redcritcolor;
            let starparticle = add([
              layer("ui"),
              pos(mousePos()),
              opacity(),
              particles({
                max: 8,
                texture: getSprite("part_star").data.tex,
                quads: [getSprite("part_star").data.frames[0]],
                speed: [100, 250],
                angle: [0, 0],
                colors: [theColor.lighten(50), theColor.darken(50)],
                scales: [1, 1.1],
                lifeTime: [0.35, 0.5],
                opacities: [1, 0],
                acceleration: [vec2(50), vec2(-50)],
                angularVelocity: [30, 60]
              }, {
                lifetime: 1.5,
                rate: 100,
                direction: 180,
                spread: -90
              })
            ]);
            starparticle.fadeIn(0.1);
            starparticle.emit(4);
          };
          if (scoreObtained > scoreManager.scorePerClick()) {
            if (isCritical == true && isBigCrit == false) {
              plusScoreText.color = blendColors(plusScoreText.color, RED, 0.1);
              plusScoreText.text += "!";
              let randomDir = getRandomDirection(center(), false, 2.5);
              tween(randomDir, center(), 0.35, (p) => cam.pos = p, easings.easeOutQuint);
              let tone = rand(-60, 45);
              playSfx("punch", { detune: tone });
              addCriticalParticles(isBigCrit);
            }
            if (isCritical == true && isBigCrit == true) {
              plusScoreText.color = blendColors(plusScoreText.color, BLUE, 0.1);
              plusScoreText.text += "!!";
              let randomDir = getRandomDirection(center(), false, 2.5);
              tween(randomDir, center(), 0.35, (p) => cam.pos = p, easings.easeOutQuint);
              tween(choose([-1, 1]), 0, 0.35, (p) => cam.rotation = p, easings.easeOutQuint);
              let tone = rand(35, 80);
              playSfx("punch", { detune: tone });
              addCriticalParticles(isBigCrit);
            }
          }
        },
        autoClick() {
          let autoCursor = add([
            sprite("cursors"),
            pos(),
            scale(0.8),
            rotate(0),
            layer("ui"),
            area({ collisionIgnore: ["autoCursor"] }),
            body(),
            opacity(1),
            anchor("center"),
            "autoCursor",
            {
              update() {
              }
            }
          ]);
          autoCursor.gravityScale = 0;
          autoCursor.pos.x = rand(
            hexagon2.pos.x - 50,
            hexagon2.pos.x + 50
          );
          autoCursor.pos.y = rand(
            hexagon2.pos.y - 50,
            hexagon2.pos.y + 50
          );
          tween(0, 1, 0.5, (p) => autoCursor.opacity = p, easings.easeOutQuint);
          tween(autoCursor.pos, autoCursor.pos.add(choose([-80, -70, -60, -50, 50, 60, 70, 80])), 0.5, (p) => autoCursor.pos = p, easings.easeOutQuint);
          if (autoCursor.pos.x > hexagon2.pos.x - 50 && autoCursor.pos.x < hexagon2.pos.x) {
            autoCursor.angle = 90;
          } else if (autoCursor.pos.x > hexagon2.pos.x && autoCursor.pos.x < hexagon2.pos.x + 50) {
            autoCursor.angle = 270;
          }
          if (autoCursor.pos.y > hexagon2.pos.y - 50 && autoCursor.pos.y < hexagon2.pos.y) {
            autoCursor.angle += 45;
          } else if (autoCursor.pos.y > hexagon2.pos.y && autoCursor.pos.y < hexagon2.pos.y + 50) {
            autoCursor.angle -= 45;
          }
          wait(0.25, () => {
            autoCursor.play("point");
            wait(0.15, () => {
              autoCursor.play("grab");
              this.isBeingFakeClicked = true;
              playClickSound();
              wait(0.15, () => {
                autoCursor.play("point");
                this.isBeingFakeClicked = false;
                playClickReleaseSound();
                addPlusScoreText({
                  pos: autoCursor.pos,
                  value: scoreManager.scorePerAutoClick(),
                  cursorRelated: true
                });
                scoreManager.addScore(scoreManager.scorePerAutoClick());
                autoCursor.gravityScale = 1;
                autoCursor.jump(300);
                wait(0.2, () => {
                  let upwards = chance(0.1);
                  if (upwards)
                    autoCursor.gravityScale = -1;
                  tween(1, 0, upwards ? 0.4 : 0.25, (p) => autoCursor.opacity = p, easings.linear);
                  if (autoCursor.pos.x > hexagon2.pos.x) {
                    tween(autoCursor.angle, autoCursor.angle + 90, 1, (p) => autoCursor.angle = p);
                    autoCursor.vel.x = rand(25, 50);
                  }
                  if (autoCursor.pos.x < hexagon2.pos.x) {
                    tween(autoCursor.angle, autoCursor.angle - 90, 1, (p) => autoCursor.angle = p);
                    autoCursor.vel.x = rand(-25, -50);
                  }
                  wait(1, () => {
                    destroy(autoCursor);
                  });
                });
              });
            });
          });
        }
      }
    ]);
    const hexagonArea = {
      // must have at least 3 vertices
      shape: new Polygon([vec2(0), vec2(0), vec2(0)]),
      offset: vec2(0)
    };
    const pts = [];
    for (let i2 = 0; i2 < 6; i2++) {
      const angle = Math.PI / 3 * i2;
      const x2 = -221 * Math.cos(angle);
      const y = -221 * Math.sin(angle);
      pts.push(vec2(x2, y));
    }
    hexagonArea.shape = new Polygon(pts);
    const panderitoArea = {
      // must have at least 3 vertices
      shape: new Polygon([
        // they have to be clockwise or counter clockwise
        vec2(-hexagon2.width / 2 + 15, 35),
        // centerleft
        vec2(-hexagon2.width / 2 + 50, -hexagon2.height / 4 - 30),
        // cornerthing
        vec2(-20, -hexagon2.height / 2),
        // topcenter
        vec2(hexagon2.width / 2 - 20, -hexagon2.height / 4),
        // centerright
        vec2(20, hexagon2.height / 2)
        // botcenter
      ]),
      offset: vec2(0)
    };
    let maxRotationSpeed = 4;
    let rotationSpeed = 0;
    let scaleHoverIncrease = vec2(1.1);
    hexagon2.onUpdate(() => {
      if (hexagon2.angle >= 360) {
        hexagon2.angle = 0;
      }
      rotationSpeed = mapc(GameState.score, 0, scoreManager.scoreYouGetNextManaAt(), 0.01, maxRotationSpeed);
      hexagon2.angle += rotationSpeed;
      if (hexagon2.isHovering()) {
        hexagon2.isBeingClicked = isMouseDown("left");
        if (hexagon2.isBeingFakeClicked && scaleHoverIncrease != vec2(1)) {
          scaleHoverIncrease = vec2(1);
        } else {
          scaleHoverIncrease = vec2(1.1);
        }
        if (hexagon2.isBeingClicked) {
          hexagon2.scale = lerp(hexagon2.scale, scaleHoverIncrease.scale(0.9), 0.25);
        } else {
          hexagon2.scale = lerp(hexagon2.scale, scaleHoverIncrease, 0.25);
        }
        maxRotationSpeed = 4.75;
      } else {
        if (hexagon2.isBeingClicked)
          hexagon2.isBeingClicked = false;
        maxRotationSpeed = 4;
        hexagon2.scale.x = lerp(hexagon2.scale.x, 1, 0.25);
        hexagon2.scale.y = lerp(hexagon2.scale.y, 1, 0.25);
      }
      if (!GameState.settings.panderitoMode) {
        hexagon2.sprite = "hexagon";
        hexagon2.area.shape = hexagonArea.shape;
        hexagon2.area.offset = hexagonArea.offset;
      } else {
        hexagon2.sprite = "panderito";
        hexagon2.area.shape = panderitoArea.shape;
        hexagon2.area.offset = panderitoArea.offset;
      }
    });
    hexagon2.on("startAnimEnd", () => {
      hexagon2.use(waver({ maxAmplitude: 5, wave_speed: 1 }));
    });
    hexagon2.onClick(() => {
      if (hexagon2.isHovering()) {
        hexagon2.clickPress();
      }
    });
    hexagon2.onMouseRelease("left", () => {
      if (hexagon2.isHovering()) {
        hexagon2.clickRelease();
      }
    });
    hexagon2.onMousePress("right", () => {
      if (isWindowUnlocked("hexColorWin") && hexagon2.isHovering())
        manageWindow("hexColorWin");
    });
    hexagon2.onUpdate(() => {
      spsUpdaterTimer += dt();
      if (spsUpdaterTimer > 1) {
        spsUpdaterTimer = 0;
        spsText.updateValue();
        clickVars.clicksPerSecond = 0;
      }
    });
    ROOT.on("scoreGained", (amount) => {
      checkForUnlockable();
    });
    consecutiveClicksWaiting = wait(0, () => {
    });
    return hexagon2;
  }

  // source/gamestate.ts
  var saveColor2 = class {
    r = 255;
    g = 255;
    b = 255;
    a;
    constructor(r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }
  };
  var _GameState2 = class __GameState {
    score = 0;
    scoreThisRun = 0;
    scoreAllTime = 0;
    clickers = 1;
    clicksUpgradesValue = 1;
    // multiplier for clicks
    clickPercentage = 0;
    // percentage added
    cursors = 0;
    cursorsUpgradesValue = 1;
    // multiplier for cursors
    cursorsPercentage = 0;
    // percentage added
    timeUntilAutoLoopEnds = 10;
    // cursor frequency
    upgradesBought = ["c_0"];
    // powerups 
    hasUnlockedPowerups = false;
    powerupPower = 1;
    critPower = 0;
    ascension = {
      mana: 0,
      manaAllTime: 0,
      // stuff bought for price calculation
      clickPercentagesBought: 0,
      cursorsPercentagesBought: 0,
      powerupPowersBought: 0,
      critPowersBought: 0
    };
    unlockedAchievements = [];
    unlockedWindows = [];
    taskbar = [];
    stats = {
      timesClicked: 0,
      powerupsClicked: 0,
      timesAscended: 0,
      powerupsBoughtThisRun: 0,
      powerupsBought: 0,
      totalTimePlayed: 0,
      /**
       * Time it took you to complete the game
       */
      timeGameComplete: 0,
      beenGnomed: false,
      hasDevkyGoobered: false
    };
    settings = {
      sfx: { volume: 1, muted: false },
      music: { volume: 1, muted: false, paused: false, favoriteIdx: 0 },
      volume: 1,
      hexColor: new saveColor2(255, 255, 255),
      bgColor: new saveColor2(0, 0, 0, 0.84),
      commaInsteadOfDot: false,
      fullscreen: false,
      spsTextMode: 1,
      panderitoMode: false
    };
    save(anim = true) {
      if (this.scoreAllTime < 25)
        return;
      setData("hexagon-save", this);
      if (anim)
        saveAnim();
      if (ngEnabled && ngUser)
        ht2.setCloudData(1, JSON.stringify(this));
    }
    loadFromStorage() {
      const newSave = new __GameState();
      let gottenData = getData("hexagon-save");
      if (!gottenData)
        gottenData = newSave;
      Object.keys(gottenData).forEach(function(k3) {
        if (!gottenData.hasOwnProperty(k3))
          gottenData[k3] = newSave[k3];
      });
      Object.assign(this, gottenData);
      return gottenData;
    }
    delete() {
      let oldvolume = this.settings.volume;
      localStorage.removeItem("hexagon-save");
      Object.assign(this, new __GameState());
      musicHandler?.stop();
      stopAllSounds();
      this.settings.volume = oldvolume;
      go("gamescene");
      return console.log("=== HEXAGON-SAVE DELETED ===");
    }
    cheat() {
      this.clickers = 100;
      this.cursors = 100;
      this.score = scoreManager.ascensionConstant;
      this.scoreThisRun = scoreManager.ascensionConstant;
      this.scoreAllTime = scoreManager.ascensionConstant;
      stopAllSounds();
      go("gamescene");
      this.settings.music.muted = true;
    }
    // 0.9 was in the last days before the release of the game
    // 0.91 was has been gnomed, devky goobered
    // 1.0 will be in the moment of release
    /**
     *  Every time there's a change to the gamestate save this has to be changed
     */
    saveVersion = 1;
  };
  var GameState = new _GameState2();
  var _scoreManager = class {
    combo = 1;
    // score per click (no combo or powerups or percentage)
    scorePerClick_Vanilla = () => {
      return Math.round(GameState.clickers * GameState.clicksUpgradesValue);
    };
    /**
     * Gets the score per click with powerups combo cards mana and possibly crit
     * @param includeCrits Wheter to also include crit power
     * @returns The score
     */
    scorePerClick = (includeCrits) => {
      const vanillaValue = this.scorePerClick_Vanilla();
      const countingPowerups = vanillaValue * powerupTypes.clicks.multiplier * powerupTypes.awesome.multiplier;
      const countingCombo = countingPowerups * this.combo;
      const countingCards = countingCombo + percentage2(countingCombo, GameState.clickPercentage);
      const countingManaAT = countingCards + percentage2(countingCards, GameState.ascension.manaAllTime);
      includeCrits = includeCrits ?? false;
      if (includeCrits)
        return Math.round(countingManaAT * GameState.critPower);
      else
        return Math.round(countingManaAT);
    };
    // score per cursor click (not including powerups or percentages)
    scorePerAutoClick_Vanilla = () => {
      return Math.round(GameState.cursors * GameState.cursorsUpgradesValue);
    };
    /**
     * Gets the score per auto click
     * @param includePowerups wheter to include powerups in the formula or not
     */
    scorePerAutoClick = (includePowerups) => {
      includePowerups = includePowerups ?? false;
      const vanillaValue = this.scorePerAutoClick_Vanilla();
      let nextValue = vanillaValue;
      if (includePowerups == true)
        nextValue = vanillaValue * powerupTypes.cursors.multiplier * powerupTypes.awesome.multiplier;
      const countingCards = vanillaValue + percentage2(vanillaValue, GameState.cursorsPercentage);
      const countingManaAT = countingCards + percentage2(countingCards, GameState.ascension.manaAllTime);
      return Math.round(countingManaAT);
    };
    // the score per second you're getting by cursors
    // no rounding because can be decimal (0.1)
    autoScorePerSecond = () => {
      return this.scorePerAutoClick() / GameState.timeUntilAutoLoopEnds;
    };
    // the general score per second clicks and all
    // no rounding because can be decimal (0.1)
    scorePerSecond = () => {
      return clickVars.clicksPerSecond * this.scorePerClick() + this.autoScorePerSecond();
    };
    addScore(amount) {
      GameState.score += amount;
      GameState.scoreThisRun += amount;
      GameState.scoreAllTime += amount;
      ROOT.trigger("scoreGained", amount);
    }
    // used usually when buying
    subTweenScore(amount) {
      ROOT.trigger("scoreDecreased", amount);
      tween(GameState.score, GameState.score - amount, 0.32, (p) => GameState.score = p, easings.easeOutExpo).onEnd(() => {
        ROOT.trigger("scoreDecreased", amount);
      });
    }
    addTweenScore(amount) {
      ROOT.trigger("scoreIncreased", amount);
      tween(GameState.score, GameState.score + amount, 0.32, (p) => GameState.score = p, easings.easeOutExpo).onEnd(() => {
        ROOT.trigger("scoreIncreased", amount);
      });
      GameState.scoreThisRun += amount;
      GameState.scoreAllTime += amount;
    }
    // =====================
    //   ASCENSION STUFF
    // =====================
    // Mana is a spendable currency
    // When score is greater than scoreTilNextMana, mana is added by one
    // Every mana all time gives +1% of score production 
    /**
     * This is the number you start getting mana at
     */
    ascensionConstant = 5e6;
    ascensionExponent = 1.5;
    /**
     * The actual formula used to calculate the score needed for a certain mana 
     * @param manaAllTime The mana all time
     * @returns The score needed for that mana all time
    */
    getScoreForManaAT = (manaAllTime = GameState.ascension.manaAllTime + 1) => {
      return this.ascensionConstant * Math.pow(manaAllTime, this.ascensionExponent);
    };
    /**
     * Why does this exist
     * @returns The score you get the next mana at
     */
    scoreYouGetNextManaAt = () => {
      return Math.round(this.getScoreForManaAT(GameState.ascension.manaAllTime + 1));
    };
    // Oliver the goat 
    manaPerSecond = () => {
      const scoreNeededForNextMana = this.getScoreForManaAT(GameState.ascension.manaAllTime + 1) - Math.round(GameState.scoreAllTime);
      const timeToNextMana = scoreNeededForNextMana / GameState.scoreAllTime;
      const manaPerSecond = timeToNextMana > 0 ? 1 / timeToNextMana : 0;
      return manaPerSecond;
    };
    /** Resets the run when ascending */
    resetRun() {
      tween(GameState.score, 0, 0.32, (p) => GameState.score = p, easings.easeOutCirc);
      tween(GameState.scoreThisRun, 0, 0.32, (p) => GameState.scoreThisRun = p, easings.easeOutCirc);
      tween(GameState.clickers, 1, 0.5, (p) => GameState.clickers = Math.round(p), easings.easeOutQuad);
      tween(GameState.cursors, 0, 0.5, (p) => GameState.cursors = Math.round(p), easings.easeOutQuad);
      tween(GameState.clicksUpgradesValue, 1, 0.5, (p) => GameState.clicksUpgradesValue = Math.round(p), easings.easeOutQuad);
      tween(GameState.cursorsUpgradesValue, 1, 0.5, (p) => GameState.cursorsUpgradesValue = Math.round(p), easings.easeOutQuad);
      GameState.hasUnlockedPowerups = false;
      GameState.stats.powerupsBoughtThisRun = 0;
      GameState.upgradesBought = ["c_0"];
      GameState.timeUntilAutoLoopEnds = 10;
    }
  };
  var scoreManager = new _scoreManager();

  // source/game/gamescene.ts
  var panderitoLetters = "panderito".split("");
  var panderitoIndex = 0;
  var isTabActive = true;
  var totalTimeOutsideTab = 0;
  var startTimeOutsideTab;
  var excessTime = 0;
  var autoLoopTime = 0;
  var idleWaiter;
  var sleeping = false;
  var timeSlept = 0;
  var cam = null;
  function togglePanderito() {
    GameState.settings.panderitoMode = !GameState.settings.panderitoMode;
    panderitoIndex = 0;
    if (!isAchievementUnlocked("panderitomode")) {
      unlockAchievement("extra.panderito");
    }
    let block = add([
      rect(width(), 100),
      pos(center()),
      anchor("center"),
      opacity(0.5),
      color(BLACK),
      layer("mouse"),
      z(mouse.z - 2)
    ]);
    let panderitoText = add([
      text(`Panderito mode: ${GameState.settings.panderitoMode ? "ACTIVATED" : "DEACTIVATED"}`, {
        size: 26,
        font: "emulogic"
      }),
      pos(center()),
      anchor("center"),
      layer("mouse"),
      z(mouse.z - 1),
      opacity(1)
    ]);
    wait(0.8, () => {
      tween(0.5, 0, 0.5, (p) => block.opacity = p);
      tween(1, 0, 0.5, (p) => panderitoText.opacity = p);
      wait(0.5, () => {
        destroy(panderitoText);
        destroy(block);
      });
    });
    if (GameState.settings.panderitoMode) {
      hexagon.use(sprite("panderito"));
    } else {
      hexagon.use(sprite("hexagon"));
    }
    GameState.save(false);
  }
  var TIME_FOR_SLEEP = 60;
  function triggerZZZ(playerInactivity = true) {
    if (playerInactivity)
      sleeping = true;
    let black = add([
      rect(width(), height()),
      pos(center()),
      anchor("center"),
      color(BLACK),
      layer("mouse"),
      z(mouse.z - 2),
      opacity(1)
    ]);
    if (playerInactivity)
      black.fadeIn(0.5);
    let sleepyText = add([
      text("Z Z Z . . . ", {
        size: 90,
        font: "lambda",
        transform: (idx) => ({
          pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
          scale: wave(1, 1.2, time() * 3 + idx),
          angle: wave(-9, 9, time() * 3 + idx)
        })
      }),
      z(mouse.z - 1),
      layer("mouse"),
      anchor("center"),
      pos(center()),
      opacity(1)
    ]);
    if (playerInactivity)
      sleepyText.fadeIn(0.5);
    let events;
    function wakeUp() {
      sleeping = false;
      wait(0.5, () => {
        black.fadeOut(0.5);
        sleepyText.fadeOut(0.5).onEnd(() => {
          black?.destroy();
          sleepyText?.destroy();
          if (playerInactivity)
            welcomeBack(true);
        });
      });
      events?.forEach((event) => {
        event.cancel();
      });
    }
    if (playerInactivity) {
      let mouse3 = onMouseMove(() => wakeUp());
      let click = onClick(() => wakeUp());
      let key = onKeyPress(() => wakeUp());
      events = [mouse3, click, key];
    } else
      wakeUp();
  }
  function welcomeBack(idle = false) {
    let timeSinceLeave = 0;
    let scoreGained = 0;
    function addWelcomeBackToast(score, timeInSeconds) {
      let body2 = `You were out for: ${formatTime(timeInSeconds, true)}`;
      if (score != null)
        body2 += `
+${formatNumber(score)}`;
      let hasCombo = scoreManager.combo > 1;
      let hasPowerup = get("putimer")?.length > 0;
      let applicationMessage = "";
      if (hasCombo)
        applicationMessage += `
(Combo is not applicable)`;
      else if (hasPowerup)
        applicationMessage += "\n(Power-ups are not applicable)";
      else if (hasCombo && hasPowerup)
        applicationMessage += "\n(Combo nor Power-ups are applicable)";
      body2 += applicationMessage;
      let toast = addToast({ icon: "welcomeBackIcon", title: "Welcome back!", body: body2, type: "welcome" });
      if (GameState.hasUnlockedPowerups == true) {
        if (timeInSeconds > TIME_FOR_SLEEP) {
          if (chance(0.1))
            spawnPowerup({ type: "random" });
        }
      }
      return toast;
    }
    if (idle == false) {
      timeSinceLeave = totalTimeOutsideTab / 1e3;
      autoLoopTime += totalTimeOutsideTab / 1e3;
      excessTime = autoLoopTime - GameState.timeUntilAutoLoopEnds;
      let gainedScore = 0;
      if (excessTime >= 0) {
        gainedScore = Math.floor(excessTime / GameState.timeUntilAutoLoopEnds);
        excessTime -= GameState.timeUntilAutoLoopEnds * gainedScore;
        gainedScore = gainedScore * scoreManager.scorePerAutoClick(false);
        scoreManager.addTweenScore(gainedScore);
        scoreGained = gainedScore;
      }
    } else {
      timeSinceLeave = timeSlept;
      if (GameState.cursors < 1 || ascension.ascending == true) {
        addWelcomeBackToast(null, timeSlept);
        return;
      }
      if (timeSlept > 60) {
        timeSlept = 0;
      }
      scoreGained = Math.round(scoreManager.autoScorePerSecond() * timeSinceLeave);
    }
    let welcomebacktoasts = get("toast").filter((t18) => t18.type == "welcome");
    if (timeSinceLeave > 10 && welcomebacktoasts.length > 0) {
      welcomebacktoasts.forEach((toast) => toast.destroy());
    }
    if (GameState.cursors < 1 || ascension.ascending == true) {
      addWelcomeBackToast(null, timeSinceLeave);
    } else {
      addWelcomeBackToast(scoreGained, timeSinceLeave);
    }
  }
  function resetIdleTime() {
    idleWaiter.cancel();
    idleWaiter = wait(TIME_FOR_SLEEP, () => {
      triggerZZZ(true);
    });
  }
  function triggerGnome() {
    let gnome = add([
      sprite("gnome"),
      pos(),
      layer("mouse"),
      scale(1.25),
      z(mouse.z - 1),
      anchor("center"),
      {
        update() {
          this.angle = wave(-10, 10, time() / 2);
        }
      }
    ]);
    playSfx("gnome");
    tween(0, width(), 0.1, (p) => gnome.pos.x = p, easings.linear);
    tween(0, height(), 0.1, (p) => gnome.pos.y = p, easings.linear).onEnd(() => {
      destroy(gnome);
    });
    GameState.stats.beenGnomed;
    if (!isAchievementUnlocked("extra.gnome"))
      unlockAchievement("extra.gnome");
  }
  var hexagonIntro;
  var hasStartedGame;
  var gamescene = () => scene("gamescene", () => {
    hasStartedGame = GameState.scoreAllTime > 1;
    ascension.ascending = false;
    allPowerupsInfo2.isHoveringAPowerup = false;
    allObjWindows2.isDraggingAWindow = false;
    allObjWindows2.isHoveringAWindow = false;
    cam = {
      pos: center(),
      zoom: 1,
      rotation: 0
    };
    setGravity(1600);
    addHexagon();
    uiCounters();
    addFolderObj();
    checkForUnlockable();
    hoverManaging();
    ROOT.on("gamestart", () => {
      runInTauri2(() => appWindow2.setTitle("Clickery Hexagon"));
      wait(60, () => {
        loop(120, () => {
          if (GameState.scoreAllTime > 25) {
            if (ngEnabled == true) {
              postEverything();
            }
            GameState.save(true);
          }
        });
      });
      if (!GameState.hasUnlockedPowerups) {
        ROOT.on("powerupunlock", () => {
          allPowerupsInfo2.canSpawnPowerups = true;
        });
      } else {
        allPowerupsInfo2.canSpawnPowerups = true;
      }
      idleWaiter = wait(0, () => {
      });
      onMouseMove(() => resetIdleTime());
      onKeyPress(() => resetIdleTime());
      onClick(() => resetIdleTime());
      onCharInput((ch) => {
        if (!hasStartedGame)
          return;
        if (ch == panderitoLetters[panderitoIndex]) {
          panderitoIndex++;
        } else {
          panderitoIndex = 0;
        }
        if (panderitoIndex == panderitoLetters.length) {
          togglePanderito();
        }
      });
      if (!isAchievementUnlocked("gnome")) {
        wait(60, () => {
          loop(1, () => {
            if (isAchievementUnlocked("extra.gnome"))
              return;
            if (GameState.stats.timesAscended < 1)
              return;
            if (sleeping == true)
              return;
            if (chance(2e-3)) {
              triggerGnome();
            }
          });
        });
      }
    });
    onUpdate(() => {
      camRot(cam.rotation);
      camScale(vec2(cam.zoom));
      camPos(cam.pos);
      if (isKeyDown("shift") && isKeyPressed("r") && panderitoIndex != 6) {
        musicHandler.stop();
        stopAllSounds();
        go("gamescene");
      }
      if (isKeyDown("shift") && isKeyPressed("s") && GameState.scoreAllTime > 25)
        GameState.save();
      if (isKeyPressed("f2")) {
        get("toast").forEach((toast) => toast.close());
      }
      if (isKeyPressed("f") && !DEBUG) {
        toggleTheFullscreen();
      }
      GameState.stats.totalTimePlayed += dt();
      if (!isAchievementUnlocked("extra.ALL"))
        GameState.stats.timeGameComplete += dt();
      GameState.score = clamp(GameState.score, 0, Infinity);
      GameState.score = Math.round(GameState.score);
      if (GameState.scoreAllTime >= scoreManager.scoreYouGetNextManaAt()) {
        GameState.ascension.mana++;
        GameState.ascension.manaAllTime++;
        ROOT.trigger("manaGained");
      }
      if (GameState.cursors >= 1 && ascension.ascending == false) {
        autoLoopTime += dt();
        if (autoLoopTime >= GameState.timeUntilAutoLoopEnds) {
          if (excessTime > 0)
            autoLoopTime = excessTime;
          else {
            autoLoopTime = 0;
            hexagon.autoClick();
          }
          excessTime = 0;
        }
      } else {
        autoLoopTime = 0;
      }
      if (sleeping)
        timeSlept += dt();
      if (GameState.hasUnlockedPowerups == true) {
        Powerup_NaturalSpawnManager();
        Powerup_RemovalTimeManager();
      }
    });
    function handleVisibilityChange() {
      if (!hasStartedGame)
        return;
      if (document.hidden) {
        totalTimeOutsideTab = 0;
        isTabActive = false;
        startTimeOutsideTab = performance.now();
      } else {
        if (!isTabActive) {
          isTabActive = true;
          GameState.save(false);
          const timeOutsideTab = performance.now() - startTimeOutsideTab;
          totalTimeOutsideTab += timeOutsideTab;
          GameState.stats.totalTimePlayed += totalTimeOutsideTab / 1e3;
          if (!(GameState.scoreAllTime > 0))
            return;
          if (totalTimeOutsideTab / 1e3 > 30) {
            triggerZZZ(false);
            welcomeBack(false);
          }
        }
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", (event) => {
      if (event.keyCode == 83 && (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)) {
        event.preventDefault();
      }
    }, false);
    document.getElementById("kanva").addEventListener("mouseout", () => {
      if (curDraggin && curDraggin.releaseDrop)
        curDraggin.releaseDrop();
    }, false);
    document.getElementById("kanva").addEventListener("fullscreenchange", () => {
      ROOT.trigger("checkFullscreen");
    });
    let introAnimations = {
      intro_hopes() {
        let reference = add([
          text("\u266A ~ Clicker.wav", {
            align: "right",
            font: "lambdao"
          }),
          opacity(),
          pos(width(), -2)
        ]);
        tween(reference.pos.x, 733, 0.32, (p) => reference.pos.x = p, easings.easeOutCubic);
        tween(0, 1, 0.32, (p) => reference.opacity = p, easings.easeOutCubic);
        wait(4, () => {
          tween(reference.pos.x, width(), 0.32, (p) => reference.pos.x = p, easings.easeInCubic).onEnd(() => destroy(reference));
          tween(1, 0, 0.32, (p) => reference.opacity = p, easings.easeOutCubic);
        });
      },
      intro_playMusic() {
        let song = GameState.settings.music.favoriteIdx == null ? "clicker.wav" : Object.keys(songs)[GameState.settings.music.favoriteIdx];
        playMusic(song);
        musicHandler.paused = GameState.settings.music.paused;
      },
      intro_hexagon() {
        tween(vec2(center().x, center().y + 110), vec2(center().x, center().y + 55), 0.5, (p) => hexagon.pos = p, easings.easeOutQuad).onEnd(() => {
          hexagon.trigger("startAnimEnd");
        });
        tween(0.25, 1, 1, (p) => hexagon.opacity = p, easings.easeOutQuad);
      },
      intro_gameBg() {
        tween(BLACK, saveColorToColor(GameState.settings.bgColor), 0.5, (p) => gameBg.color = p, easings.easeOutQuad);
        tween(1, GameState.settings.bgColor.a, 0.5, (p) => gameBg.colorA = p, easings.easeOutQuad);
        tween(-5, 5, 0.5, (p) => gameBg.movAngle = p, easings.easeOutQuad);
      },
      intro_scoreCounter() {
        tween(scoreText.scoreShown, GameState.score, 0.25, (p) => scoreText.scoreShown = p, easings.easeOutQuint);
        tween(vec2(center().x, 80), vec2(center().x, 60), 0.5, (p) => scoreText.pos = p, easings.easeOutQuad).onEnd(() => {
          scoreText.trigger("startAnimEnd");
        });
        tween(0.25, 1, 0.5, (p) => scoreText.opacity = p, easings.easeOutQuad);
      },
      intro_spsText() {
        tween(0.25, 1, 0.5, (p) => spsText.opacity = p, easings.easeOutQuad);
      },
      intro_buildingsText() {
        tween(5, 10, 0.5, (p) => buildingsText.pos.x = p, easings.easeOutQuad);
        tween(0.25, 1, 0.5, (p) => buildingsText.opacity = p, easings.easeOutQuad);
      },
      intro_folderObj() {
        tween(width() - 30, width() - 40, 0.5, (p) => folderObj.pos.x = p, easings.easeOutQuad);
        tween(0.25, 1, 0.5, (p) => folderObj.opacity = p, easings.easeOutQuad);
      }
    };
    hexagonIntro = introAnimations.intro_hexagon;
    if (GameState.settings.fullscreen == true)
      coolSetFullscreen(true);
    if (!isFullscreen())
      GameState.settings.fullscreen = false;
    if (hasStartedGame) {
      Object.values(introAnimations).filter((animation) => !animation.name.includes("hopes")).forEach((animation) => {
        animation();
      });
      wait(0.5, () => {
        hexagon.interactable = true;
        ROOT.trigger("gamestart");
      });
    } else {
      gameBg.colorA = 1;
      hexagon.interactable = false;
      let black = add([
        rect(width(), height()),
        pos(center()),
        anchor("center"),
        color(BLACK),
        opacity(),
        layer("mouse"),
        z(mouse.z - 1)
      ]);
      wait(2, () => {
        black.destroy();
        let ominus = playSfx("ominus", { loop: true });
        playSfx("biglight");
        hexagon.interactable = true;
        folderObj.interactable = false;
        spsText.opacity = 0;
        scoreText.opacity = 0;
        buildingsText.opacity = 0;
        folderObj.opacity = 0;
        hexagon.on("clickrelease", () => {
          switch (GameState.scoreAllTime) {
            case 1:
              ominus.stop();
              gameBg.colorA = 0.84;
              introAnimations.intro_scoreCounter();
              break;
            case 2:
              introAnimations.intro_playMusic();
              introAnimations.intro_hopes();
              introAnimations.intro_spsText();
              break;
            case 3:
              introAnimations.intro_buildingsText();
              break;
            case 25:
              introAnimations.intro_folderObj();
              hasStartedGame = true;
              folderObj.interactable = true;
              ROOT.trigger("gamestart");
              break;
          }
        });
      });
    }
    ROOT.on("buy", (info) => {
      checkForUnlockable();
    });
    runInTauri2(() => {
      ROOT.on("scoreGained", () => {
        appWindow2.setTitle(`Clickery Hexagon - ${formatNumber(Math.round(GameState.score))} score`);
      });
      ROOT.on("scoreDecreased", () => {
        appWindow2.setTitle(`Clickery Hexagon - ${formatNumber(Math.round(GameState.score))} score`);
      });
      let exitDesire = 0;
      let desireToOpacity = 0;
      let phrase = "";
      const goodbyephrases = [
        "don't go :(",
        ":(",
        "fine i don't care",
        "the most difficult part of programming this game\nwas programming a button to leave\nbecause im no good with goobyes"
      ];
      const backagainphrases = [
        "good, i missed you",
        ":)",
        "i knew it",
        "i knew you'd come back!"
      ];
      let drawing = add([layer("mouse"), z(mouse.z + 1)]);
      drawing.onUpdate(() => {
        let mapped = map(exitDesire, 0, 1.2, 0, 1);
        desireToOpacity = lerp(desireToOpacity, mapped, 0.1);
      });
      drawing.onDraw(() => {
        drawRect({
          width: width(),
          height: height(),
          fixed: true,
          pos: vec2(center()),
          color: BLACK,
          anchor: "center",
          opacity: desireToOpacity
        });
        drawText({
          text: phrase,
          fixed: true,
          size: 30,
          pos: vec2(center()),
          color: WHITE,
          align: "center",
          anchor: "center",
          opacity: desireToOpacity
        });
      });
      onKeyPress("escape", () => phrase = choose(goodbyephrases));
      onKeyDown("escape", () => {
        exitDesire += dt();
        if (exitDesire >= 1.2) {
          appWindow2.close();
          quit();
          phrase = choose(["goodbye...", "AAAAAAAAAAAAAAAAAAAAAAAA", "...", "i hate you"]);
        }
      });
      onKeyRelease("escape", () => {
        phrase = choose(backagainphrases);
        exitDesire = 0;
      });
    });
    ht2.autoPing(5e3);
    if (DEBUG == true)
      debugFunctions();
  });

  // source/game/scenes/focuscene.ts
  function focuscene() {
    return scene("focuscene", () => {
      tween(1, 0.95, 0.25, (p) => gameBg.colorA = p, easings.linear);
      let y_posToDrawText = center().y + 5;
      let opacityToDrawText = 0;
      tween(y_posToDrawText, center().y, 0.25, (p) => y_posToDrawText = p, easings.easeOutCirc);
      tween(opacityToDrawText, 1, 0.25, (p) => opacityToDrawText = p, easings.easeOutCirc);
      let hasClicked = false;
      onDraw(() => {
        if (hasClicked)
          return;
        drawText({
          text: "Thanks for playing!\nClick to focus the game",
          size: 60,
          pos: vec2(center().x, y_posToDrawText),
          opacity: opacityToDrawText,
          color: WHITE,
          font: "lambda",
          align: "center",
          angle: wave(-8, 8, time() * 0.9),
          anchor: "center"
        });
      });
      onClick(async () => {
        if (hasClicked == true)
          return;
        else {
          hasClicked = true;
          gameBg.colorA = 1;
          if (enableNg == true) {
            if (await ht2.isLoggedIn() == false)
              go("ngScene");
            else {
              onLogIn(await ht2.getSession());
              go("gamescene");
            }
          } else
            go("gamescene");
        }
      });
    });
  }

  // source/game/scenes/ngScene.ts
  var ngScene = () => scene("ngScene", () => {
    newgroundsSceneContent();
  });

  // source/loader.ts
  function drawSeriousLoadScreen(progress, op = 1) {
    function drawHexagon(opts = {
      pos: center(),
      scale: vec2(1),
      opacity: 1,
      color: WHITE
    }) {
      const centerX = 0;
      const centerY = 0;
      const radius = 100;
      const pts = [];
      const colors = [];
      for (let i2 = 0; i2 < 6; i2++) {
        const angle = Math.PI / 3 * i2;
        const x2 = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        pts.push(vec2(x2, y));
        colors.push(rgb(
          Math.floor(Math.random() * 128 + 128),
          Math.floor(Math.random() * 128 + 128),
          Math.floor(Math.random() * 128 + 128)
        ));
      }
      drawPolygon({
        pos: opts.pos,
        opacity: opts.opacity,
        scale: opts.scale,
        color: opts.color,
        pts
      });
    }
    drawRect({
      width: width(),
      height: height(),
      color: BLACK
    });
    drawHexagon({
      pos: vec2(963, 495),
      opacity: op,
      scale: vec2(wave(-0.5, 0.5, time() * 3), 0.5),
      color: WHITE
    });
    drawText({
      text: `LOADING ${Math.round(progress * 100)}%`,
      size: 40,
      color: WHITE,
      anchor: "right",
      pos: vec2(899, 525),
      opacity: op
    });
    drawRect({
      width: map(progress, 0, 1, 5, width() - 5),
      radius: 2.5,
      height: 10,
      anchor: "left",
      pos: vec2(5, height() - 10),
      opacity: op
    });
  }
  function drawDevkyLoadScreen(progress) {
    drawRect({
      width: width(),
      height: height(),
      color: BLACK
    });
    drawSprite({
      sprite: "devky",
      anchor: "topleft",
      pos: vec2(),
      width: map(progress, 0, 1, 0, width()),
      height: height()
    });
  }
  function loadFonts() {
    loadFont("emulogic", "assets/emulogic.ttf", {
      outline: 10,
      filter: "linear"
    });
    loadFont("lambdao", "assets/Lambda-Regular.ttf", {
      outline: 5,
      filter: "linear"
    });
    loadFont("lambda", "assets/Lambda-Regular.ttf", {
      filter: "linear"
    });
  }
  function loadAllSprites() {
    loadBean();
    loadFonts();
    loadRoot("assets/");
    loadSprite("devky", "devky.png");
    loadSprite("hexagon", "sprites/hexagon.png");
    loadSprite("cursors", "sprites/cursors.png", {
      sliceX: 5,
      sliceY: 1,
      anims: {
        cursor: 0,
        point: 1,
        grab: 2,
        wait: 3,
        check: 4
      }
    });
    loadSprite("saveIcon", "sprites/saveIcon.png");
    loadSprite("welcomeBackIcon", "sprites/welcomeBackIcon.png");
    loadSpriteAtlas("sprites/powerUps.png", {
      "clicksPowerup": {
        x: 140 * 0,
        y: 0,
        width: 140,
        height: 140
      },
      "timePowerup": {
        x: 140 * 1,
        y: 0,
        width: 140,
        height: 140
      },
      "cursorsPowerup": {
        x: 140 * 2,
        y: 0,
        width: 140,
        height: 140
      },
      "storePowerup": {
        x: 140 * 3,
        y: 0,
        width: 140,
        height: 140
      },
      "blabPowerup": {
        x: 140 * 4,
        y: 0,
        width: 140,
        height: 140
      },
      "awesomePowerup": {
        x: 140 * 5,
        y: 0,
        width: 140,
        height: 140
      }
    });
    loadSprite("part_star", "sprites/part_star.png");
    loadSprite("panderito", "sprites/panderito.png");
    loadSprite("smallpanderito", "sprites/smallpanderito.png");
    loadSprite("folderObj", "sprites/folderObj.png");
    loadSprite("speakers", "sprites/speakers.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        mute: 0,
        sound: 1
      }
    });
    loadSprite("dumbTestWin", "sprites/windows/dumbTestWin.png");
    loadSprite("xButton", "sprites/windows/xButton.png");
    loadSpriteAtlas("sprites/windows/winMinibuttons.png", {
      "icon_about": {
        width: 140,
        height: 70,
        sliceX: 2,
        sliceY: 1,
        x: 0,
        y: 0,
        anims: {
          default: 0,
          hover: 1
        }
      },
      "icon_medals": {
        width: 140,
        height: 70,
        sliceX: 2,
        sliceY: 1,
        x: 140,
        y: 0,
        anims: {
          default: 0,
          hover: 1
        }
      },
      "icon_ascend": {
        width: 140,
        height: 70,
        sliceX: 2,
        sliceY: 1,
        x: 280,
        y: 0,
        anims: {
          default: 0,
          hover: 1
        }
      },
      "icon_settings": {
        width: 140,
        height: 70,
        sliceX: 2,
        sliceY: 1,
        x: 420,
        y: 0,
        anims: {
          default: 0,
          hover: 1
        }
      },
      "icon_leaderboards": {
        width: 140,
        height: 70,
        sliceX: 2,
        sliceY: 1,
        x: 560,
        y: 0,
        anims: {
          default: 0,
          hover: 1
        }
      },
      "icon_music": {
        width: 140,
        height: 70,
        sliceX: 2,
        sliceY: 1,
        x: 700,
        y: 0,
        anims: {
          default: 0,
          hover: 1
        }
      },
      "icon_stats": {
        width: 140,
        height: 70,
        sliceX: 2,
        sliceY: 1,
        x: 0,
        y: 70,
        anims: {
          default: 0,
          hover: 1
        }
      },
      "icon_store": {
        width: 140,
        height: 70,
        sliceX: 2,
        sliceY: 1,
        x: 140,
        y: 70,
        anims: {
          default: 0,
          hover: 1
        }
      },
      "icon_bgColor": {
        width: 140,
        height: 70,
        sliceX: 2,
        sliceY: 1,
        x: 280,
        y: 70,
        anims: {
          default: 0,
          hover: 1
        }
      },
      "icon_hexColor": {
        width: 140,
        height: 70,
        sliceX: 2,
        sliceY: 1,
        x: 420,
        y: 70,
        anims: {
          default: 0,
          hover: 1
        }
      },
      "icon_credits": {
        width: 140,
        height: 70,
        sliceX: 2,
        sliceY: 1,
        x: 560,
        y: 70,
        anims: {
          default: 0,
          hover: 1
        }
      },
      "white_noise": {
        width: 140,
        height: 70,
        x: 770,
        y: 70
      },
      "icon_extra": {
        width: 280,
        height: 70,
        sliceX: 4,
        sliceY: 1,
        x: 0,
        y: 140,
        anims: {
          open_default: 0,
          open_hover: 1,
          shut_default: 2,
          shut_hover: 3
        }
      }
    });
    loadSprite("storeWin", "sprites/windows/storeWin/storeWin.png");
    loadSprite("stroeWin", "sprites/windows/storeWin/stroeWin.png");
    loadSpriteAtlas("sprites/windows/storeWin/storeElements.png", {
      "clickersElement": {
        sliceX: 2,
        x: 0,
        y: 254,
        width: 349 * 2,
        height: 127,
        anims: {
          "up": 0,
          "down": 1
        }
      },
      "cursorsElement": {
        sliceX: 2,
        x: 0,
        y: 0,
        width: 349 * 2,
        height: 127,
        anims: {
          "up": 0,
          "down": 1
        }
      },
      "powerupsElement": {
        sliceX: 3,
        x: 0,
        y: 127,
        width: 349 * 3,
        height: 127,
        anims: {
          "up": 0,
          "down": 1
        }
      }
    });
    loadSprite("chains", "sprites/windows/storeWin/chains.png");
    loadSprite("smoke", "sprites/windows/storeWin/smoke.png", {
      sliceX: 3,
      anims: {
        "smoking": {
          from: 0,
          to: 2,
          loop: true
        }
      }
    });
    loadSprite("upgrade", "sprites/windows/storeWin/upgrade.png");
    loadSprite("upgradelock", "sprites/windows/storeWin/upgradelock.png");
    loadSprite("musicWin", "sprites/windows/musicWin/musicWin.png");
    loadSpriteAtlas("sprites/windows/musicWin/discs.png", {
      "discs": {
        "x": 0,
        "y": 0,
        "width": 50 * 6,
        "height": 50,
        "sliceX": 6,
        "sliceY": 1,
        "anims": {
          "wav": 0,
          "ok": 1,
          "bb1": 2,
          "bb2": 3,
          "cat": 4,
          "bb3": 5
        }
      }
    });
    loadSprite("musicDisc", "sprites/windows/musicWin/musicDisc.png");
    loadSprite("musicWinButtons", "sprites/windows/musicWin/musicWinButtons.png", {
      sliceX: 4,
      sliceY: 1,
      anims: {
        "pause": 0,
        "play": 1,
        "back": 2,
        "skip": 3
      }
    });
    loadSprite("mutedButton", "sprites/windows/musicWin/mutedButton.png");
    loadSprite("mageDance", "sprites/windows/musicWin/mageDance.png", {
      sliceX: 4,
      sliceY: 1,
      anims: {
        "dance": {
          from: 0,
          to: 3,
          loop: true
        }
      }
    });
    loadSpriteAtlas("sprites/windows/settingsWin/settingsVolbars.png", {
      "plusbutton": {
        "x": 90,
        "y": 0,
        "width": 30,
        "height": 50
      },
      "minusbutton": {
        "x": 60,
        "y": 0,
        "width": 30,
        "height": 50
      },
      "volbarbutton": {
        "x": 0,
        "y": 0,
        "width": 60,
        "height": 50,
        "sliceX": 2,
        "sliceY": 1,
        "anims": {
          on: 1,
          off: 0
        }
      }
    });
    loadSpriteAtlas("sprites/windows/settingsWin/settingsCheckbox.png", {
      "checkbox": {
        "x": 0,
        "y": 0,
        "width": 45 * 2,
        "height": 45,
        "sliceX": 2,
        "anims": {
          "on": 1,
          "off": 0
        }
      },
      "tick": {
        "x": 90,
        "y": 0,
        "width": 60,
        "height": 54
      }
    });
    loadSprite("settingsWin", "sprites/windows/settingsWin/settingsWin.png");
    loadSprite("settingsArrow", "sprites/windows/settingsWin/settingsArrow.png");
    loadSprite("settingsDottedHex", "sprites/windows/settingsWin/settingsDottedHex.png");
    loadSprite("settingsHex", "sprites/windows/settingsWin/settingsHex.png");
    loadSprite("settingsFloppy", "sprites/windows/settingsWin/settingsFloppy.png");
    loadSprite("settingsTrashcan", "sprites/windows/settingsWin/settingsTrashcan.png");
    loadSprite("medalsUnknown", "sprites/windows/medalsWin/medalsUnknown.png");
    loadSprite("medalsUnknown_tap", "sprites/windows/medalsWin/medalsUnknown_tap.png");
    let medalSprites = {};
    let availableAchievements = achievements.slice(0, 48);
    let column = -1;
    let row = 0;
    let spacing2 = vec2(60);
    availableAchievements.map((achievement) => achievement.id).forEach((achievementId, index) => {
      if (column == 19) {
        column = 0;
        row++;
      } else {
        column++;
      }
      let position = getPosInGrid(vec2(0, 0), row, column, spacing2);
      medalSprites[`medals_${achievementId}`] = {
        "x": position.x,
        "y": position.y,
        "width": spacing2.x,
        "height": spacing2.y
      };
    });
    const gooberPos = getPosInGrid(vec2(0, 0), 2, 8, vec2(60));
    medalSprites["devkyGoober"] = {
      x: gooberPos.x,
      y: gooberPos.y,
      width: 60,
      height: 60
    };
    loadSpriteAtlas("sprites/windows/medalsWin/medalsMedals.png", medalSprites);
    loadSprite("medals_extra.ALL", "sprites/windows/medalsWin/masterMedal.png", {
      sliceX: 24,
      sliceY: 2,
      anims: {
        "master": {
          from: 0,
          to: 47,
          loop: true
        }
      }
    });
    loadSprite("medalsWin", "sprites/windows/medalsWin/medalsWin.png");
    loadSprite("medalsBg", "sprites/windows/medalsWin/medalsBg.png");
    loadSprite("hexColorWin", "sprites/windows/colorWin/hexColorWin.png");
    loadSprite("bgColorWin", "sprites/windows/colorWin/bgColorWin.png");
    loadSprite("hexColorHandle", "sprites/windows/colorWin/hexColorHandle.png");
    loadSprite("defaultButton", "sprites/windows/colorWin/defaultButton.png");
    loadSprite("randomButton", "sprites/windows/colorWin/randomButton.png");
    loadSprite("extraWin", "sprites/windows/extraWin/extraWin.png");
    loadSprite("statsWin", "sprites/windows/statsWin/statsWin.png");
    loadSprite("statIcons1", "sprites/windows/statsWin/statIcons1.png");
    loadSprite("statIcons2", "sprites/windows/statsWin/statIcons2.png");
    loadSprite("statIcons3", "sprites/windows/statsWin/statIcons3.png");
    loadSprite("leaderboardsWin", "sprites/windows/leaderboardsWin/leaderboardsWin.png");
    loadSprite("leaderboardsHeader", "sprites/windows/leaderboardsWin/leaderboardsHeader.png");
    loadSprite("leaderboardsTheLine", "sprites/windows/leaderboardsWin/leaderboardsTheLine.png");
    loadSprite("creditsWin", "sprites/windows/creditsWin/creditsWin.png");
    loadSprite("creditsHeart", "sprites/windows/creditsWin/creditsHeart.png");
    loadSprite("creditsCode", "sprites/windows/creditsWin/creditsCode.png");
    loadSprite("creditsArt", "sprites/windows/creditsWin/creditsArt.png");
    loadSprite("creditsDesign", "sprites/windows/creditsWin/creditsDesign.png");
    loadSprite("creditsShader", "sprites/windows/creditsWin/creditsShader.png");
    loadSprite("creditsPlaytest", "sprites/windows/creditsWin/creditsPlaytest.png");
    loadSprite("creditsDesktop", "sprites/windows/creditsWin/creditsDesktop.png");
    loadSpriteAtlas("sprites/ascendscene/hexAgony.png", {
      "mage_body": {
        "x": 1e3,
        "y": 0,
        "width": 500,
        "height": 500
      },
      "mage_body_lightning": {
        "x": 0,
        "y": 500,
        "width": 500,
        "height": 500
      },
      "mage_botarm": {
        "x": 500,
        "y": 0,
        "width": 500,
        "height": 500
      },
      "mage_botarm_lightning": {
        "x": 0,
        "y": 0,
        "width": 500,
        "height": 500
      },
      "mage_toparm": {
        "x": 1e3,
        "y": 500,
        "width": 500,
        "height": 500
      },
      "mage_toparm_lightning": {
        "x": 0,
        "y": 1e3,
        "width": 500,
        "height": 500
      },
      "mage_cursors": {
        "x": 500,
        "y": 500,
        "width": 500,
        "height": 500
      }
    });
    loadSprite("mage_eye", "sprites/ascendscene/eye.png", {
      sliceX: 4,
      sliceY: 1,
      anims: {
        "blink": {
          from: 1,
          to: 3
        }
      }
    });
    loadSprite("dialogue", "sprites/ascendscene/dialogue.png");
    loadSprite("hoverDialogue", "sprites/ascendscene/emptyDialogue.png");
    loadSprite("eye_translate", "sprites/ascendscene/translate.png", {
      sliceX: 4,
      sliceY: 1,
      anims: {
        "woke": 3,
        "dumb": 1
      }
    });
    loadSpriteAtlas("sprites/ascendscene/cards.png", {
      // 22 between each card
      "card_clickers": {
        "x": 0,
        "y": 0,
        "width": 123,
        "height": 169
      },
      "card_cursors": {
        "x": 133 * 1,
        "y": 0,
        "width": 123,
        "height": 169
      },
      "card_powerups": {
        "x": 133 * 2,
        "y": 0,
        "width": 123,
        "height": 169
      },
      "card_crits": {
        "x": 133 * 3,
        "y": 0,
        "width": 123,
        "height": 169
      },
      "card_hexColor": {
        "x": 133 * 4,
        "y": 0,
        "width": 123,
        "height": 169
      },
      "card_bgColor": {
        "x": 133 * 5,
        "y": 0,
        "width": 123,
        "height": 169
      }
    });
    loadSprite("backcard", "sprites/ascendscene/backcard.png");
    loadSprite("leaveButton", "sprites/ascendscene/leaveButton.png");
    loadSprite("ascendWin", "sprites/windows/ascendWin/ascendWin.png");
    loadSprite("winMage_body", "sprites/windows/ascendWin/winMage_body.png");
    loadSprite("winMage_eye", "sprites/windows/ascendWin/winMage_eye.png");
    loadSprite("winMage_cursors", "sprites/windows/ascendWin/winMage_cursors.png");
    loadSprite("winMage_vignette", "sprites/windows/ascendWin/winMage_vignette.png");
    loadSprite("manaCounterTri", "sprites/windows/ascendWin/manaCounterTri.png");
    loadSprite("ascendBottomPolygon", "sprites/windows/ascendWin/ascendBottomPolygon.png");
    loadSprite("ascendBar", "sprites/windows/ascendWin/ascendBar.png");
    loadSprite("ascendManaStar", "sprites/windows/ascendWin/ascendManaStar.png");
    loadSprite("ascendButtonEyes", "sprites/windows/ascendWin/ascendButtonEyes.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        "woke": 0,
        "dumb": 1
      }
    });
    loadSprite("ascendButtonScroll", "sprites/windows/ascendWin/ascendButtonScroll.png");
    loadSprite("gnome", "sprites/gnome.png");
    loadSprite("pinch", "sprites/pinch.png", {
      anims: {
        pinching: {
          from: 0,
          to: 3
        }
      },
      sliceX: 4,
      sliceY: 1
    });
    loadSpriteAtlas("sprites/newgroundsButtons.png", {
      "newgroundsSignInButton": {
        "x": 0,
        "y": 0,
        "width": 200,
        "height": 100
      },
      "newgroundsNahButton": {
        "x": 5 + 190 + 5 + 5,
        "y": 0,
        "width": 200,
        "height": 100
      }
    });
    loadSprite("newgroundsPopup", "sprites/newgroundsPopup.png");
  }
  function loadAllSounds() {
    loadSound("biglight", "sounds/sfx/hexagon-intro/biglight.ogg");
    loadSound("ominus", "sounds/sfx/hexagon-intro/ominus.ogg");
    loadSound("clickPress", "sounds/sfx/hexagon-intro/clickPress.ogg");
    loadSound("clickRelease", "sounds/sfx/hexagon-intro/clickRelease.ogg");
    loadSound("powerup", "sounds/sfx/hexagon-intro/powerup.ogg");
    loadSound("fullcombo", "sounds/sfx/hexagon-intro/fullcombo.ogg");
    loadSound("combo", "sounds/sfx/hexagon-intro/combo.ogg");
    loadSound("punch", "sounds/sfx/hexagon-intro/punch.ogg");
    loadSound("mage_a", "sounds/sfx/ascension/mage_a.ogg");
    loadSound("mage_e", "sounds/sfx/ascension/mage_e.ogg");
    loadSound("mage_o", "sounds/sfx/ascension/mage_o.ogg");
    loadSound("mage_i", "sounds/sfx/ascension/mage_i.ogg");
    loadSound("mage_yummers", "sounds/sfx/ascension/mage_yummers.ogg");
    loadSound("mage_huntressHum", "sounds/sfx/ascension/mage_huntressHum.ogg");
    loadSound("onecard", "sounds/sfx/ascension/onecard.mp3");
    loadSound("allcards", "sounds/sfx/ascension/allcards.ogg");
    loadSound("unlockachievement", "sounds/sfx/ui/unlockachievement.ogg");
    loadSound("gamesaved", "sounds/sfx/ui/gamesaved.ogg");
    loadSound("clickButton", "sounds/sfx/ui/clickButton.ogg");
    loadSound("kaching", "sounds/sfx/ui/kaching.ogg");
    loadSound("unhoverhex", "sounds/sfx/ui/unhoverhex.ogg");
    loadSound("volumeChange", "sounds/sfx/ui/volumeChange.ogg");
    loadSound("fold", "sounds/sfx/window/fold.ogg");
    loadSound("hoverMiniButton", "sounds/sfx/window/hoverMiniButton.ogg");
    loadSound("plap", "sounds/sfx/window/plap.ogg");
    loadSound("plop", "sounds/sfx/window/plop.ogg");
    loadSound("windowUnlocked", "sounds/sfx/window/windowUnlocked.ogg");
    loadSound("openWin", "sounds/sfx/window/openWin.ogg");
    loadSound("closeWin", "sounds/sfx/window/closeWin.ogg");
    loadSound("progress", "sounds/sfx/window/progress.ogg");
    loadSound("wrong", "sounds/sfx/window/wrong.ogg");
    loadSound("chainwrong", "sounds/sfx/window/chainwrong.ogg");
    loadSound("chainbreak", "sounds/sfx/window/chainbreak.ogg");
    loadSound("gnome", "sounds/sfx/gnome.ogg");
    loadSound("squeak", "sounds/sfx/squeak.ogg");
    loadSound("clicker.wav", "sounds/music/clicker.ogg");
    loadSound("menu.wav", "sounds/music/menu.ogg");
    loadSound("whatttt.wav", "sounds/music/whatttt.ogg");
    loadSound("simple.wav", "sounds/music/simple.ogg");
    loadSound("jazz.wav", "sounds/music/jazz.ogg");
    loadSound("sweet.wav", "sounds/music/sweet.ogg");
    loadSound("ok_instrumental", "sounds/music/ok_instrumental.ogg");
    loadSound("magic", "sounds/music/magic.ogg");
    loadSound("watchout", "sounds/music/watchout.ogg");
    loadSound("catnip", "sounds/music/catnip.ogg");
    loadSound("project_23", "sounds/music/project_23.ogg");
  }
  function loadShaders() {
    loadShader("checkeredBg", null, `
	uniform float u_time;
	uniform vec3 u_color1;
	uniform vec3 u_color2;
	uniform vec2 u_speed;
	uniform float u_angle;
	uniform float u_scale;
	uniform float u_aspect;
	
	#define PI 3.14159265359
	vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
		float angle = u_angle * PI / 180.0;
		mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
		vec2 size = vec2(u_scale);
		vec2 p = (pos + vec2(u_time) * u_speed) * vec2(u_aspect, 1.0);
		p = p * rot;
		float total = floor(p.x * size.x) + floor(p.y * size.y);
		bool isEven = mod(total, 2.0) == 0.0;
		vec4 col1 = vec4(u_color1 / 255.0, 1.0);
		vec4 col2 = vec4(u_color2 / 255.0, 1.0);
		return (isEven) ? col1 : col2;
	}
	`);
    loadShader("saturate", null, `
		uniform float saturation;
		uniform vec2 u_pos;
		uniform vec2 u_size;
		uniform vec3 saturationColor;

		vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
			vec4 c = def_frag();
			vec4 col = vec4(saturationColor/255.0, 1);
			return (c + vec4(mix(vec3(0), vec3(1), saturation), 0)) * col;
		}
	`);
    loadShader("grayscale", null, `
		vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
			vec4 c = def_frag();
			return vec4(vec3(dot(c.rgb, vec3(0.2125, 0.7154, 0.0721))), c.a);
		}
	`);
  }
  function loadEverything() {
    loadAllSprites();
    loadAllSounds();
    loadShaders();
    ngScene();
    focuscene();
    introscene();
    gamescene();
    if (chance(0.2))
      onLoading((progress) => drawDevkyLoadScreen(progress));
    else
      onLoading((progress) => drawSeriousLoadScreen(progress));
  }

  // node_modules/.pnpm/@tauri-apps+api@2.0.0-rc.4/node_modules/@tauri-apps/api/dpi.js
  var LogicalSize = class {
    constructor(width2, height2) {
      this.type = "Logical";
      this.width = width2;
      this.height = height2;
    }
  };
  var PhysicalSize = class {
    constructor(width2, height2) {
      this.type = "Physical";
      this.width = width2;
      this.height = height2;
    }
    /**
     * Converts the physical size to a logical one.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const appWindow = getCurrentWindow();
     * const factor = await appWindow.scaleFactor();
     * const size = await appWindow.innerSize();
     * const logical = size.toLogical(factor);
     * ```
     *  */
    toLogical(scaleFactor) {
      return new LogicalSize(this.width / scaleFactor, this.height / scaleFactor);
    }
  };
  var LogicalPosition = class {
    constructor(x2, y) {
      this.type = "Logical";
      this.x = x2;
      this.y = y;
    }
  };
  var PhysicalPosition = class {
    constructor(x2, y) {
      this.type = "Physical";
      this.x = x2;
      this.y = y;
    }
    /**
     * Converts the physical position to a logical one.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const appWindow = getCurrentWindow();
     * const factor = await appWindow.scaleFactor();
     * const position = await appWindow.innerPosition();
     * const logical = position.toLogical(factor);
     * ```
     * */
    toLogical(scaleFactor) {
      return new LogicalPosition(this.x / scaleFactor, this.y / scaleFactor);
    }
  };

  // node_modules/.pnpm/@tauri-apps+api@2.0.0-rc.4/node_modules/@tauri-apps/api/external/tslib/tslib.es6.js
  function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  }

  // node_modules/.pnpm/@tauri-apps+api@2.0.0-rc.4/node_modules/@tauri-apps/api/core.js
  var _Channel_onmessage;
  var _Channel_nextMessageId;
  var _Channel_pendingMessages;
  var _Resource_rid;
  function transformCallback(callback, once2 = false) {
    return window.__TAURI_INTERNALS__.transformCallback(callback, once2);
  }
  _Channel_onmessage = /* @__PURE__ */ new WeakMap(), _Channel_nextMessageId = /* @__PURE__ */ new WeakMap(), _Channel_pendingMessages = /* @__PURE__ */ new WeakMap();
  async function invoke(cmd, args = {}, options) {
    return window.__TAURI_INTERNALS__.invoke(cmd, args, options);
  }
  var Resource = class {
    get rid() {
      return __classPrivateFieldGet(this, _Resource_rid, "f");
    }
    constructor(rid) {
      _Resource_rid.set(this, void 0);
      __classPrivateFieldSet(this, _Resource_rid, rid, "f");
    }
    /**
     * Destroys and cleans up this resource from memory.
     * **You should not call any method on this object anymore and should drop any reference to it.**
     */
    async close() {
      return invoke("plugin:resources|close", {
        rid: this.rid
      });
    }
  };
  _Resource_rid = /* @__PURE__ */ new WeakMap();

  // node_modules/.pnpm/@tauri-apps+api@2.0.0-rc.4/node_modules/@tauri-apps/api/event.js
  var TauriEvent;
  (function(TauriEvent2) {
    TauriEvent2["WINDOW_RESIZED"] = "tauri://resize";
    TauriEvent2["WINDOW_MOVED"] = "tauri://move";
    TauriEvent2["WINDOW_CLOSE_REQUESTED"] = "tauri://close-requested";
    TauriEvent2["WINDOW_DESTROYED"] = "tauri://destroyed";
    TauriEvent2["WINDOW_FOCUS"] = "tauri://focus";
    TauriEvent2["WINDOW_BLUR"] = "tauri://blur";
    TauriEvent2["WINDOW_SCALE_FACTOR_CHANGED"] = "tauri://scale-change";
    TauriEvent2["WINDOW_THEME_CHANGED"] = "tauri://theme-changed";
    TauriEvent2["WINDOW_CREATED"] = "tauri://window-created";
    TauriEvent2["WEBVIEW_CREATED"] = "tauri://webview-created";
    TauriEvent2["DRAG_ENTER"] = "tauri://drag-enter";
    TauriEvent2["DRAG_OVER"] = "tauri://drag-over";
    TauriEvent2["DRAG_DROP"] = "tauri://drag-drop";
    TauriEvent2["DRAG_LEAVE"] = "tauri://drag-leave";
  })(TauriEvent || (TauriEvent = {}));
  async function _unlisten(event, eventId) {
    await invoke("plugin:event|unlisten", {
      event,
      eventId
    });
  }
  async function listen(event, handler, options) {
    var _a2;
    const target = typeof (options === null || options === void 0 ? void 0 : options.target) === "string" ? { kind: "AnyLabel", label: options.target } : (_a2 = options === null || options === void 0 ? void 0 : options.target) !== null && _a2 !== void 0 ? _a2 : { kind: "Any" };
    return invoke("plugin:event|listen", {
      event,
      target,
      handler: transformCallback(handler)
    }).then((eventId) => {
      return async () => _unlisten(event, eventId);
    });
  }
  async function once(event, handler, options) {
    return listen(event, (eventData) => {
      _unlisten(event, eventData.id);
      handler(eventData);
    }, options);
  }
  async function emit(event, payload) {
    await invoke("plugin:event|emit", {
      event,
      payload
    });
  }
  async function emitTo(target, event, payload) {
    const eventTarget = typeof target === "string" ? { kind: "AnyLabel", label: target } : target;
    await invoke("plugin:event|emit_to", {
      target: eventTarget,
      event,
      payload
    });
  }

  // node_modules/.pnpm/@tauri-apps+api@2.0.0-rc.4/node_modules/@tauri-apps/api/image.js
  var Image2 = class _Image extends Resource {
    /**
     * Creates an Image from a resource ID. For internal use only.
     *
     * @ignore
     */
    constructor(rid) {
      super(rid);
    }
    /** Creates a new Image using RGBA data, in row-major order from top to bottom, and with specified width and height. */
    static async new(rgba, width2, height2) {
      return invoke("plugin:image|new", {
        rgba: transformImage(rgba),
        width: width2,
        height: height2
      }).then((rid) => new _Image(rid));
    }
    /**
     * Creates a new image using the provided bytes by inferring the file format.
     * If the format is known, prefer [@link Image.fromPngBytes] or [@link Image.fromIcoBytes].
     *
     * Only `ico` and `png` are supported (based on activated feature flag).
     *
     * Note that you need the `image-ico` or `image-png` Cargo features to use this API.
     * To enable it, change your Cargo.toml file:
     * ```toml
     * [dependencies]
     * tauri = { version = "...", features = ["...", "image-png"] }
     * ```
     */
    static async fromBytes(bytes) {
      return invoke("plugin:image|from_bytes", {
        bytes: transformImage(bytes)
      }).then((rid) => new _Image(rid));
    }
    /**
     * Creates a new image using the provided path.
     *
     * Only `ico` and `png` are supported (based on activated feature flag).
     *
     * Note that you need the `image-ico` or `image-png` Cargo features to use this API.
     * To enable it, change your Cargo.toml file:
     * ```toml
     * [dependencies]
     * tauri = { version = "...", features = ["...", "image-png"] }
     * ```
     */
    static async fromPath(path) {
      return invoke("plugin:image|from_path", { path }).then((rid) => new _Image(rid));
    }
    /** Returns the RGBA data for this image, in row-major order from top to bottom.  */
    async rgba() {
      return invoke("plugin:image|rgba", {
        rid: this.rid
      }).then((buffer) => new Uint8Array(buffer));
    }
    /** Returns the size of this image.  */
    async size() {
      return invoke("plugin:image|size", { rid: this.rid });
    }
  };
  function transformImage(image) {
    const ret = image == null ? null : typeof image === "string" ? image : image instanceof Image2 ? image.rid : image;
    return ret;
  }

  // node_modules/.pnpm/@tauri-apps+api@2.0.0-rc.4/node_modules/@tauri-apps/api/window.js
  var UserAttentionType;
  (function(UserAttentionType2) {
    UserAttentionType2[UserAttentionType2["Critical"] = 1] = "Critical";
    UserAttentionType2[UserAttentionType2["Informational"] = 2] = "Informational";
  })(UserAttentionType || (UserAttentionType = {}));
  var CloseRequestedEvent = class {
    constructor(event) {
      this._preventDefault = false;
      this.event = event.event;
      this.id = event.id;
    }
    preventDefault() {
      this._preventDefault = true;
    }
    isPreventDefault() {
      return this._preventDefault;
    }
  };
  var ProgressBarStatus;
  (function(ProgressBarStatus2) {
    ProgressBarStatus2["None"] = "none";
    ProgressBarStatus2["Normal"] = "normal";
    ProgressBarStatus2["Indeterminate"] = "indeterminate";
    ProgressBarStatus2["Paused"] = "paused";
    ProgressBarStatus2["Error"] = "error";
  })(ProgressBarStatus || (ProgressBarStatus = {}));
  function getCurrentWindow() {
    return new Window(window.__TAURI_INTERNALS__.metadata.currentWindow.label, {
      // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
      skip: true
    });
  }
  async function getAllWindows() {
    return invoke("plugin:window|get_all_windows").then((windows) => windows.map((w) => new Window(w, {
      // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
      skip: true
    })));
  }
  var localTauriEvents = ["tauri://created", "tauri://error"];
  var Window = class {
    /**
     * Creates a new Window.
     * @example
     * ```typescript
     * import { Window } from '@tauri-apps/api/window';
     * const appWindow = new Window('my-label');
     * appWindow.once('tauri://created', function () {
     *  // window successfully created
     * });
     * appWindow.once('tauri://error', function (e) {
     *  // an error happened creating the window
     * });
     * ```
     *
     * @param label The unique window label. Must be alphanumeric: `a-zA-Z-/:_`.
     * @returns The {@link Window} instance to communicate with the window.
     */
    constructor(label, options = {}) {
      var _a2;
      this.label = label;
      this.listeners = /* @__PURE__ */ Object.create(null);
      if (!(options === null || options === void 0 ? void 0 : options.skip)) {
        invoke("plugin:window|create", {
          options: {
            ...options,
            parent: typeof options.parent === "string" ? options.parent : (_a2 = options.parent) === null || _a2 === void 0 ? void 0 : _a2.label,
            label
          }
        }).then(async () => this.emit("tauri://created")).catch(async (e) => this.emit("tauri://error", e));
      }
    }
    /**
     * Gets the Window associated with the given label.
     * @example
     * ```typescript
     * import { Window } from '@tauri-apps/api/window';
     * const mainWindow = Window.getByLabel('main');
     * ```
     *
     * @param label The window label.
     * @returns The Window instance to communicate with the window or null if the window doesn't exist.
     */
    static async getByLabel(label) {
      var _a2;
      return (_a2 = (await getAllWindows()).find((w) => w.label === label)) !== null && _a2 !== void 0 ? _a2 : null;
    }
    /**
     * Get an instance of `Window` for the current window.
     */
    static getCurrent() {
      return getCurrentWindow();
    }
    /**
     * Gets a list of instances of `Window` for all available windows.
     */
    static async getAll() {
      return getAllWindows();
    }
    /**
     *  Gets the focused window.
     * @example
     * ```typescript
     * import { Window } from '@tauri-apps/api/window';
     * const focusedWindow = Window.getFocusedWindow();
     * ```
     *
     * @returns The Window instance or `undefined` if there is not any focused window.
     */
    static async getFocusedWindow() {
      for (const w of await getAllWindows()) {
        if (await w.isFocused()) {
          return w;
        }
      }
      return null;
    }
    /**
     * Listen to an emitted event on this window.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const unlisten = await getCurrentWindow().listen<string>('state-changed', (event) => {
     *   console.log(`Got error: ${payload}`);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param handler Event handler.
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async listen(event, handler) {
      if (this._handleTauriEvent(event, handler)) {
        return () => {
          const listeners = this.listeners[event];
          listeners.splice(listeners.indexOf(handler), 1);
        };
      }
      return listen(event, handler, {
        target: { kind: "Window", label: this.label }
      });
    }
    /**
     * Listen to an emitted event on this window only once.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const unlisten = await getCurrentWindow().once<null>('initialized', (event) => {
     *   console.log(`Window initialized!`);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param handler Event handler.
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async once(event, handler) {
      if (this._handleTauriEvent(event, handler)) {
        return () => {
          const listeners = this.listeners[event];
          listeners.splice(listeners.indexOf(handler), 1);
        };
      }
      return once(event, handler, {
        target: { kind: "Window", label: this.label }
      });
    }
    /**
     * Emits an event to all {@link EventTarget|targets}.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().emit('window-loaded', { loggedIn: true, token: 'authToken' });
     * ```
     *
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param payload Event payload.
     */
    async emit(event, payload) {
      if (localTauriEvents.includes(event)) {
        for (const handler of this.listeners[event] || []) {
          handler({
            event,
            id: -1,
            payload
          });
        }
        return;
      }
      return emit(event, payload);
    }
    /**
     * Emits an event to all {@link EventTarget|targets} matching the given target.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().emit('main', 'window-loaded', { loggedIn: true, token: 'authToken' });
     * ```
     * @param target Label of the target Window/Webview/WebviewWindow or raw {@link EventTarget} object.
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param payload Event payload.
     */
    async emitTo(target, event, payload) {
      if (localTauriEvents.includes(event)) {
        for (const handler of this.listeners[event] || []) {
          handler({
            event,
            id: -1,
            payload
          });
        }
        return;
      }
      return emitTo(target, event, payload);
    }
    /** @ignore */
    _handleTauriEvent(event, handler) {
      if (localTauriEvents.includes(event)) {
        if (!(event in this.listeners)) {
          this.listeners[event] = [handler];
        } else {
          this.listeners[event].push(handler);
        }
        return true;
      }
      return false;
    }
    // Getters
    /**
     * The scale factor that can be used to map physical pixels to logical pixels.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const factor = await getCurrentWindow().scaleFactor();
     * ```
     *
     * @returns The window's monitor scale factor.
     */
    async scaleFactor() {
      return invoke("plugin:window|scale_factor", {
        label: this.label
      });
    }
    /**
     * The position of the top-left hand corner of the window's client area relative to the top-left hand corner of the desktop.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const position = await getCurrentWindow().innerPosition();
     * ```
     *
     * @returns The window's inner position.
     */
    async innerPosition() {
      return invoke("plugin:window|inner_position", {
        label: this.label
      }).then(({ x: x2, y }) => new PhysicalPosition(x2, y));
    }
    /**
     * The position of the top-left hand corner of the window relative to the top-left hand corner of the desktop.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const position = await getCurrentWindow().outerPosition();
     * ```
     *
     * @returns The window's outer position.
     */
    async outerPosition() {
      return invoke("plugin:window|outer_position", {
        label: this.label
      }).then(({ x: x2, y }) => new PhysicalPosition(x2, y));
    }
    /**
     * The physical size of the window's client area.
     * The client area is the content of the window, excluding the title bar and borders.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const size = await getCurrentWindow().innerSize();
     * ```
     *
     * @returns The window's inner size.
     */
    async innerSize() {
      return invoke("plugin:window|inner_size", {
        label: this.label
      }).then(({ width: width2, height: height2 }) => new PhysicalSize(width2, height2));
    }
    /**
     * The physical size of the entire window.
     * These dimensions include the title bar and borders. If you don't want that (and you usually don't), use inner_size instead.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const size = await getCurrentWindow().outerSize();
     * ```
     *
     * @returns The window's outer size.
     */
    async outerSize() {
      return invoke("plugin:window|outer_size", {
        label: this.label
      }).then(({ width: width2, height: height2 }) => new PhysicalSize(width2, height2));
    }
    /**
     * Gets the window's current fullscreen state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const fullscreen = await getCurrentWindow().isFullscreen();
     * ```
     *
     * @returns Whether the window is in fullscreen mode or not.
     */
    async isFullscreen() {
      return invoke("plugin:window|is_fullscreen", {
        label: this.label
      });
    }
    /**
     * Gets the window's current minimized state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const minimized = await getCurrentWindow().isMinimized();
     * ```
     */
    async isMinimized() {
      return invoke("plugin:window|is_minimized", {
        label: this.label
      });
    }
    /**
     * Gets the window's current maximized state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const maximized = await getCurrentWindow().isMaximized();
     * ```
     *
     * @returns Whether the window is maximized or not.
     */
    async isMaximized() {
      return invoke("plugin:window|is_maximized", {
        label: this.label
      });
    }
    /**
     * Gets the window's current focus state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const focused = await getCurrentWindow().isFocused();
     * ```
     *
     * @returns Whether the window is focused or not.
     */
    async isFocused() {
      return invoke("plugin:window|is_focused", {
        label: this.label
      });
    }
    /**
     * Gets the window's current decorated state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const decorated = await getCurrentWindow().isDecorated();
     * ```
     *
     * @returns Whether the window is decorated or not.
     */
    async isDecorated() {
      return invoke("plugin:window|is_decorated", {
        label: this.label
      });
    }
    /**
     * Gets the window's current resizable state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const resizable = await getCurrentWindow().isResizable();
     * ```
     *
     * @returns Whether the window is resizable or not.
     */
    async isResizable() {
      return invoke("plugin:window|is_resizable", {
        label: this.label
      });
    }
    /**
     * Gets the window's native maximize button state.
     *
     * #### Platform-specific
     *
     * - **Linux / iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const maximizable = await getCurrentWindow().isMaximizable();
     * ```
     *
     * @returns Whether the window's native maximize button is enabled or not.
     */
    async isMaximizable() {
      return invoke("plugin:window|is_maximizable", {
        label: this.label
      });
    }
    /**
     * Gets the window's native minimize button state.
     *
     * #### Platform-specific
     *
     * - **Linux / iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const minimizable = await getCurrentWindow().isMinimizable();
     * ```
     *
     * @returns Whether the window's native minimize button is enabled or not.
     */
    async isMinimizable() {
      return invoke("plugin:window|is_minimizable", {
        label: this.label
      });
    }
    /**
     * Gets the window's native close button state.
     *
     * #### Platform-specific
     *
     * - **iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const closable = await getCurrentWindow().isClosable();
     * ```
     *
     * @returns Whether the window's native close button is enabled or not.
     */
    async isClosable() {
      return invoke("plugin:window|is_closable", {
        label: this.label
      });
    }
    /**
     * Gets the window's current visible state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const visible = await getCurrentWindow().isVisible();
     * ```
     *
     * @returns Whether the window is visible or not.
     */
    async isVisible() {
      return invoke("plugin:window|is_visible", {
        label: this.label
      });
    }
    /**
     * Gets the window's current title.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const title = await getCurrentWindow().title();
     * ```
     */
    async title() {
      return invoke("plugin:window|title", {
        label: this.label
      });
    }
    /**
     * Gets the window's current theme.
     *
     * #### Platform-specific
     *
     * - **macOS:** Theme was introduced on macOS 10.14. Returns `light` on macOS 10.13 and below.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * const theme = await getCurrentWindow().theme();
     * ```
     *
     * @returns The window theme.
     */
    async theme() {
      return invoke("plugin:window|theme", {
        label: this.label
      });
    }
    // Setters
    /**
     * Centers the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().center();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async center() {
      return invoke("plugin:window|center", {
        label: this.label
      });
    }
    /**
     *  Requests user attention to the window, this has no effect if the application
     * is already focused. How requesting for user attention manifests is platform dependent,
     * see `UserAttentionType` for details.
     *
     * Providing `null` will unset the request for user attention. Unsetting the request for
     * user attention might not be done automatically by the WM when the window receives input.
     *
     * #### Platform-specific
     *
     * - **macOS:** `null` has no effect.
     * - **Linux:** Urgency levels have the same effect.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().requestUserAttention();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async requestUserAttention(requestType) {
      let requestType_ = null;
      if (requestType) {
        if (requestType === UserAttentionType.Critical) {
          requestType_ = { type: "Critical" };
        } else {
          requestType_ = { type: "Informational" };
        }
      }
      return invoke("plugin:window|request_user_attention", {
        label: this.label,
        value: requestType_
      });
    }
    /**
     * Updates the window resizable flag.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setResizable(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async setResizable(resizable) {
      return invoke("plugin:window|set_resizable", {
        label: this.label,
        value: resizable
      });
    }
    /**
     * Sets whether the window's native maximize button is enabled or not.
     * If resizable is set to false, this setting is ignored.
     *
     * #### Platform-specific
     *
     * - **macOS:** Disables the "zoom" button in the window titlebar, which is also used to enter fullscreen mode.
     * - **Linux / iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setMaximizable(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async setMaximizable(maximizable) {
      return invoke("plugin:window|set_maximizable", {
        label: this.label,
        value: maximizable
      });
    }
    /**
     * Sets whether the window's native minimize button is enabled or not.
     *
     * #### Platform-specific
     *
     * - **Linux / iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setMinimizable(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async setMinimizable(minimizable) {
      return invoke("plugin:window|set_minimizable", {
        label: this.label,
        value: minimizable
      });
    }
    /**
     * Sets whether the window's native close button is enabled or not.
     *
     * #### Platform-specific
     *
     * - **Linux:** GTK+ will do its best to convince the window manager not to show a close button. Depending on the system, this function may not have any effect when called on a window that is already visible
     * - **iOS / Android:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setClosable(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async setClosable(closable) {
      return invoke("plugin:window|set_closable", {
        label: this.label,
        value: closable
      });
    }
    /**
     * Sets the window title.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setTitle('Tauri');
     * ```
     *
     * @param title The new title
     * @returns A promise indicating the success or failure of the operation.
     */
    async setTitle(title) {
      return invoke("plugin:window|set_title", {
        label: this.label,
        value: title
      });
    }
    /**
     * Maximizes the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().maximize();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async maximize() {
      return invoke("plugin:window|maximize", {
        label: this.label
      });
    }
    /**
     * Unmaximizes the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().unmaximize();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async unmaximize() {
      return invoke("plugin:window|unmaximize", {
        label: this.label
      });
    }
    /**
     * Toggles the window maximized state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().toggleMaximize();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async toggleMaximize() {
      return invoke("plugin:window|toggle_maximize", {
        label: this.label
      });
    }
    /**
     * Minimizes the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().minimize();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async minimize() {
      return invoke("plugin:window|minimize", {
        label: this.label
      });
    }
    /**
     * Unminimizes the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().unminimize();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async unminimize() {
      return invoke("plugin:window|unminimize", {
        label: this.label
      });
    }
    /**
     * Sets the window visibility to true.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().show();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async show() {
      return invoke("plugin:window|show", {
        label: this.label
      });
    }
    /**
     * Sets the window visibility to false.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().hide();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async hide() {
      return invoke("plugin:window|hide", {
        label: this.label
      });
    }
    /**
     * Closes the window.
     *
     * Note this emits a closeRequested event so you can intercept it. To force window close, use {@link Window.destroy}.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().close();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async close() {
      return invoke("plugin:window|close", {
        label: this.label
      });
    }
    /**
     * Destroys the window. Behaves like {@link Window.close} but forces the window close instead of emitting a closeRequested event.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().destroy();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async destroy() {
      return invoke("plugin:window|destroy", {
        label: this.label
      });
    }
    /**
     * Whether the window should have borders and bars.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setDecorations(false);
     * ```
     *
     * @param decorations Whether the window should have borders and bars.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setDecorations(decorations) {
      return invoke("plugin:window|set_decorations", {
        label: this.label,
        value: decorations
      });
    }
    /**
     * Whether or not the window should have shadow.
     *
     * #### Platform-specific
     *
     * - **Windows:**
     *   - `false` has no effect on decorated window, shadows are always ON.
     *   - `true` will make undecorated window have a 1px white border,
     * and on Windows 11, it will have a rounded corners.
     * - **Linux:** Unsupported.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setShadow(false);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async setShadow(enable) {
      return invoke("plugin:window|set_shadow", {
        label: this.label,
        value: enable
      });
    }
    /**
     * Set window effects.
     */
    async setEffects(effects) {
      return invoke("plugin:window|set_effects", {
        label: this.label,
        value: effects
      });
    }
    /**
     * Clear any applied effects if possible.
     */
    async clearEffects() {
      return invoke("plugin:window|set_effects", {
        label: this.label,
        value: null
      });
    }
    /**
     * Whether the window should always be on top of other windows.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setAlwaysOnTop(true);
     * ```
     *
     * @param alwaysOnTop Whether the window should always be on top of other windows or not.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setAlwaysOnTop(alwaysOnTop) {
      return invoke("plugin:window|set_always_on_top", {
        label: this.label,
        value: alwaysOnTop
      });
    }
    /**
     * Whether the window should always be below other windows.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setAlwaysOnBottom(true);
     * ```
     *
     * @param alwaysOnBottom Whether the window should always be below other windows or not.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setAlwaysOnBottom(alwaysOnBottom) {
      return invoke("plugin:window|set_always_on_bottom", {
        label: this.label,
        value: alwaysOnBottom
      });
    }
    /**
     * Prevents the window contents from being captured by other apps.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setContentProtected(true);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async setContentProtected(protected_) {
      return invoke("plugin:window|set_content_protected", {
        label: this.label,
        value: protected_
      });
    }
    /**
     * Resizes the window with a new inner size.
     * @example
     * ```typescript
     * import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
     * await getCurrentWindow().setSize(new LogicalSize(600, 500));
     * ```
     *
     * @param size The logical or physical inner size.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setSize(size) {
      if (!size || size.type !== "Logical" && size.type !== "Physical") {
        throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");
      }
      const value = {};
      value[`${size.type}`] = {
        width: size.width,
        height: size.height
      };
      return invoke("plugin:window|set_size", {
        label: this.label,
        value
      });
    }
    /**
     * Sets the window minimum inner size. If the `size` argument is not provided, the constraint is unset.
     * @example
     * ```typescript
     * import { getCurrentWindow, PhysicalSize } from '@tauri-apps/api/window';
     * await getCurrentWindow().setMinSize(new PhysicalSize(600, 500));
     * ```
     *
     * @param size The logical or physical inner size, or `null` to unset the constraint.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setMinSize(size) {
      if (size && size.type !== "Logical" && size.type !== "Physical") {
        throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");
      }
      let value = null;
      if (size) {
        value = {};
        value[`${size.type}`] = {
          width: size.width,
          height: size.height
        };
      }
      return invoke("plugin:window|set_min_size", {
        label: this.label,
        value
      });
    }
    /**
     * Sets the window maximum inner size. If the `size` argument is undefined, the constraint is unset.
     * @example
     * ```typescript
     * import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
     * await getCurrentWindow().setMaxSize(new LogicalSize(600, 500));
     * ```
     *
     * @param size The logical or physical inner size, or `null` to unset the constraint.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setMaxSize(size) {
      if (size && size.type !== "Logical" && size.type !== "Physical") {
        throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");
      }
      let value = null;
      if (size) {
        value = {};
        value[`${size.type}`] = {
          width: size.width,
          height: size.height
        };
      }
      return invoke("plugin:window|set_max_size", {
        label: this.label,
        value
      });
    }
    /**
     * Sets the window inner size constraints.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setSizeConstraints({ minWidth: 300 });
     * ```
     *
     * @param constraints The logical or physical inner size, or `null` to unset the constraint.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setSizeConstraints(constraints) {
      function logical(pixel) {
        return pixel ? { Logical: pixel } : null;
      }
      return invoke("plugin:window|set_size_constraints", {
        label: this.label,
        value: {
          minWidth: logical(constraints === null || constraints === void 0 ? void 0 : constraints.minWidth),
          minHeight: logical(constraints === null || constraints === void 0 ? void 0 : constraints.minHeight),
          maxWidth: logical(constraints === null || constraints === void 0 ? void 0 : constraints.maxWidth),
          maxHeight: logical(constraints === null || constraints === void 0 ? void 0 : constraints.maxHeight)
        }
      });
    }
    /**
     * Sets the window outer position.
     * @example
     * ```typescript
     * import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';
     * await getCurrentWindow().setPosition(new LogicalPosition(600, 500));
     * ```
     *
     * @param position The new position, in logical or physical pixels.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setPosition(position) {
      if (!position || position.type !== "Logical" && position.type !== "Physical") {
        throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");
      }
      const value = {};
      value[`${position.type}`] = {
        x: position.x,
        y: position.y
      };
      return invoke("plugin:window|set_position", {
        label: this.label,
        value
      });
    }
    /**
     * Sets the window fullscreen state.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setFullscreen(true);
     * ```
     *
     * @param fullscreen Whether the window should go to fullscreen or not.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setFullscreen(fullscreen) {
      return invoke("plugin:window|set_fullscreen", {
        label: this.label,
        value: fullscreen
      });
    }
    /**
     * Bring the window to front and focus.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setFocus();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async setFocus() {
      return invoke("plugin:window|set_focus", {
        label: this.label
      });
    }
    /**
     * Sets the window icon.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setIcon('/tauri/awesome.png');
     * ```
     *
     * Note that you need the `image-ico` or `image-png` Cargo features to use this API.
     * To enable it, change your Cargo.toml file:
     * ```toml
     * [dependencies]
     * tauri = { version = "...", features = ["...", "image-png"] }
     * ```
     *
     * @param icon Icon bytes or path to the icon file.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setIcon(icon) {
      return invoke("plugin:window|set_icon", {
        label: this.label,
        value: transformImage(icon)
      });
    }
    /**
     * Whether the window icon should be hidden from the taskbar or not.
     *
     * #### Platform-specific
     *
     * - **macOS:** Unsupported.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setSkipTaskbar(true);
     * ```
     *
     * @param skip true to hide window icon, false to show it.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setSkipTaskbar(skip) {
      return invoke("plugin:window|set_skip_taskbar", {
        label: this.label,
        value: skip
      });
    }
    /**
     * Grabs the cursor, preventing it from leaving the window.
     *
     * There's no guarantee that the cursor will be hidden. You should
     * hide it by yourself if you want so.
     *
     * #### Platform-specific
     *
     * - **Linux:** Unsupported.
     * - **macOS:** This locks the cursor in a fixed location, which looks visually awkward.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setCursorGrab(true);
     * ```
     *
     * @param grab `true` to grab the cursor icon, `false` to release it.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setCursorGrab(grab) {
      return invoke("plugin:window|set_cursor_grab", {
        label: this.label,
        value: grab
      });
    }
    /**
     * Modifies the cursor's visibility.
     *
     * #### Platform-specific
     *
     * - **Windows:** The cursor is only hidden within the confines of the window.
     * - **macOS:** The cursor is hidden as long as the window has input focus, even if the cursor is
     *   outside of the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setCursorVisible(false);
     * ```
     *
     * @param visible If `false`, this will hide the cursor. If `true`, this will show the cursor.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setCursorVisible(visible) {
      return invoke("plugin:window|set_cursor_visible", {
        label: this.label,
        value: visible
      });
    }
    /**
     * Modifies the cursor icon of the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setCursorIcon('help');
     * ```
     *
     * @param icon The new cursor icon.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setCursorIcon(icon) {
      return invoke("plugin:window|set_cursor_icon", {
        label: this.label,
        value: icon
      });
    }
    /**
     * Changes the position of the cursor in window coordinates.
     * @example
     * ```typescript
     * import { getCurrentWindow, LogicalPosition } from '@tauri-apps/api/window';
     * await getCurrentWindow().setCursorPosition(new LogicalPosition(600, 300));
     * ```
     *
     * @param position The new cursor position.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setCursorPosition(position) {
      if (!position || position.type !== "Logical" && position.type !== "Physical") {
        throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");
      }
      const value = {};
      value[`${position.type}`] = {
        x: position.x,
        y: position.y
      };
      return invoke("plugin:window|set_cursor_position", {
        label: this.label,
        value
      });
    }
    /**
     * Changes the cursor events behavior.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().setIgnoreCursorEvents(true);
     * ```
     *
     * @param ignore `true` to ignore the cursor events; `false` to process them as usual.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setIgnoreCursorEvents(ignore) {
      return invoke("plugin:window|set_ignore_cursor_events", {
        label: this.label,
        value: ignore
      });
    }
    /**
     * Starts dragging the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().startDragging();
     * ```
     *
     * @return A promise indicating the success or failure of the operation.
     */
    async startDragging() {
      return invoke("plugin:window|start_dragging", {
        label: this.label
      });
    }
    /**
     * Starts resize-dragging the window.
     * @example
     * ```typescript
     * import { getCurrentWindow } from '@tauri-apps/api/window';
     * await getCurrentWindow().startResizeDragging();
     * ```
     *
     * @return A promise indicating the success or failure of the operation.
     */
    async startResizeDragging(direction) {
      return invoke("plugin:window|start_resize_dragging", {
        label: this.label,
        value: direction
      });
    }
    /**
     * Sets the taskbar progress state.
     *
     * #### Platform-specific
     *
     * - **Linux / macOS**: Progress bar is app-wide and not specific to this window.
     * - **Linux**: Only supported desktop environments with `libunity` (e.g. GNOME).
     *
     * @example
     * ```typescript
     * import { getCurrentWindow, ProgressBarStatus } from '@tauri-apps/api/window';
     * await getCurrentWindow().setProgressBar({
     *   status: ProgressBarStatus.Normal,
     *   progress: 50,
     * });
     * ```
     *
     * @return A promise indicating the success or failure of the operation.
     */
    async setProgressBar(state) {
      return invoke("plugin:window|set_progress_bar", {
        label: this.label,
        value: state
      });
    }
    /**
     * Sets whether the window should be visible on all workspaces or virtual desktops.
     *
     * ## Platform-specific
     *
     * - **Windows / iOS / Android:** Unsupported.
     *
     * @since 2.0.0
     */
    async setVisibleOnAllWorkspaces(visible) {
      return invoke("plugin:window|set_visible_on_all_workspaces", {
        label: this.label,
        value: visible
      });
    }
    /**
     * Sets the title bar style. **macOS only**.
     *
     * @since 2.0.0
     */
    async setTitleBarStyle(style) {
      return invoke("plugin:window|set_title_bar_style", {
        label: this.label,
        value: style
      });
    }
    // Listeners
    /**
     * Listen to window resize.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * const unlisten = await getCurrentWindow().onResized(({ payload: size }) => {
     *  console.log('Window resized', size);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async onResized(handler) {
      return this.listen(TauriEvent.WINDOW_RESIZED, (e) => {
        e.payload = mapPhysicalSize(e.payload);
        handler(e);
      });
    }
    /**
     * Listen to window move.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * const unlisten = await getCurrentWindow().onMoved(({ payload: position }) => {
     *  console.log('Window moved', position);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async onMoved(handler) {
      return this.listen(TauriEvent.WINDOW_MOVED, (e) => {
        e.payload = mapPhysicalPosition(e.payload);
        handler(e);
      });
    }
    /**
     * Listen to window close requested. Emitted when the user requests to closes the window.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * import { confirm } from '@tauri-apps/api/dialog';
     * const unlisten = await getCurrentWindow().onCloseRequested(async (event) => {
     *   const confirmed = await confirm('Are you sure?');
     *   if (!confirmed) {
     *     // user did not confirm closing the window; let's prevent it
     *     event.preventDefault();
     *   }
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async onCloseRequested(handler) {
      return this.listen(TauriEvent.WINDOW_CLOSE_REQUESTED, async (event) => {
        const evt = new CloseRequestedEvent(event);
        await handler(evt);
        if (!evt.isPreventDefault()) {
          await this.destroy();
        }
      });
    }
    /**
     * Listen to a file drop event.
     * The listener is triggered when the user hovers the selected files on the webview,
     * drops the files or cancels the operation.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/webview";
     * const unlisten = await getCurrentWindow().onDragDropEvent((event) => {
     *  if (event.payload.type === 'hover') {
     *    console.log('User hovering', event.payload.paths);
     *  } else if (event.payload.type === 'drop') {
     *    console.log('User dropped', event.payload.paths);
     *  } else {
     *    console.log('File drop cancelled');
     *  }
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async onDragDropEvent(handler) {
      const unlistenDrag = await this.listen(TauriEvent.DRAG_ENTER, (event) => {
        handler({
          ...event,
          payload: {
            type: "enter",
            paths: event.payload.paths,
            position: mapPhysicalPosition(event.payload.position)
          }
        });
      });
      const unlistenDragOver = await this.listen(TauriEvent.DRAG_OVER, (event) => {
        handler({
          ...event,
          payload: {
            type: "over",
            position: mapPhysicalPosition(event.payload.position)
          }
        });
      });
      const unlistenDrop = await this.listen(TauriEvent.DRAG_DROP, (event) => {
        handler({
          ...event,
          payload: {
            type: "drop",
            paths: event.payload.paths,
            position: mapPhysicalPosition(event.payload.position)
          }
        });
      });
      const unlistenCancel = await this.listen(TauriEvent.DRAG_LEAVE, (event) => {
        handler({ ...event, payload: { type: "leave" } });
      });
      return () => {
        unlistenDrag();
        unlistenDrop();
        unlistenDragOver();
        unlistenCancel();
      };
    }
    /**
     * Listen to window focus change.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * const unlisten = await getCurrentWindow().onFocusChanged(({ payload: focused }) => {
     *  console.log('Focus changed, window is focused? ' + focused);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async onFocusChanged(handler) {
      const unlistenFocus = await this.listen(TauriEvent.WINDOW_FOCUS, (event) => {
        handler({ ...event, payload: true });
      });
      const unlistenBlur = await this.listen(TauriEvent.WINDOW_BLUR, (event) => {
        handler({ ...event, payload: false });
      });
      return () => {
        unlistenFocus();
        unlistenBlur();
      };
    }
    /**
     * Listen to window scale change. Emitted when the window's scale factor has changed.
     * The following user actions can cause DPI changes:
     * - Changing the display's resolution.
     * - Changing the display's scale factor (e.g. in Control Panel on Windows).
     * - Moving the window to a display with a different scale factor.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * const unlisten = await getCurrentWindow().onScaleChanged(({ payload }) => {
     *  console.log('Scale changed', payload.scaleFactor, payload.size);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async onScaleChanged(handler) {
      return this.listen(TauriEvent.WINDOW_SCALE_FACTOR_CHANGED, handler);
    }
    /**
     * Listen to the system theme change.
     *
     * @example
     * ```typescript
     * import { getCurrentWindow } from "@tauri-apps/api/window";
     * const unlisten = await getCurrentWindow().onThemeChanged(({ payload: theme }) => {
     *  console.log('New theme: ' + theme);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async onThemeChanged(handler) {
      return this.listen(TauriEvent.WINDOW_THEME_CHANGED, handler);
    }
  };
  var Effect;
  (function(Effect2) {
    Effect2["AppearanceBased"] = "appearanceBased";
    Effect2["Light"] = "light";
    Effect2["Dark"] = "dark";
    Effect2["MediumLight"] = "mediumLight";
    Effect2["UltraDark"] = "ultraDark";
    Effect2["Titlebar"] = "titlebar";
    Effect2["Selection"] = "selection";
    Effect2["Menu"] = "menu";
    Effect2["Popover"] = "popover";
    Effect2["Sidebar"] = "sidebar";
    Effect2["HeaderView"] = "headerView";
    Effect2["Sheet"] = "sheet";
    Effect2["WindowBackground"] = "windowBackground";
    Effect2["HudWindow"] = "hudWindow";
    Effect2["FullScreenUI"] = "fullScreenUI";
    Effect2["Tooltip"] = "tooltip";
    Effect2["ContentBackground"] = "contentBackground";
    Effect2["UnderWindowBackground"] = "underWindowBackground";
    Effect2["UnderPageBackground"] = "underPageBackground";
    Effect2["Mica"] = "mica";
    Effect2["Blur"] = "blur";
    Effect2["Acrylic"] = "acrylic";
    Effect2["Tabbed"] = "tabbed";
    Effect2["TabbedDark"] = "tabbedDark";
    Effect2["TabbedLight"] = "tabbedLight";
  })(Effect || (Effect = {}));
  var EffectState;
  (function(EffectState2) {
    EffectState2["FollowsWindowActiveState"] = "followsWindowActiveState";
    EffectState2["Active"] = "active";
    EffectState2["Inactive"] = "inactive";
  })(EffectState || (EffectState = {}));
  function mapPhysicalPosition(m) {
    return new PhysicalPosition(m.x, m.y);
  }
  function mapPhysicalSize(m) {
    return new PhysicalSize(m.width, m.height);
  }

  // node_modules/.pnpm/@tauri-apps+api@2.0.0-rc.4/node_modules/@tauri-apps/api/webview.js
  function getCurrentWebview() {
    return new Webview(getCurrentWindow(), window.__TAURI_INTERNALS__.metadata.currentWebview.label, {
      // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
      skip: true
    });
  }
  async function getAllWebviews() {
    return invoke("plugin:webview|get_all_webviews").then((webviews) => webviews.map((w) => new Webview(new Window(w.windowLabel, {
      // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
      skip: true
    }), w.label, {
      // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
      skip: true
    })));
  }
  var localTauriEvents2 = ["tauri://created", "tauri://error"];
  var Webview = class {
    /**
     * Creates a new Webview.
     * @example
     * ```typescript
     * import { Window } from '@tauri-apps/api/window'
     * import { Webview } from '@tauri-apps/api/webview'
     * const appWindow = new Window('my-label')
     * const webview = new Webview(appWindow, 'my-label', {
     *   url: 'https://github.com/tauri-apps/tauri'
     * });
     * webview.once('tauri://created', function () {
     *  // webview successfully created
     * });
     * webview.once('tauri://error', function (e) {
     *  // an error happened creating the webview
     * });
     * ```
     *
     * @param window the window to add this webview to.
     * @param label The unique webview label. Must be alphanumeric: `a-zA-Z-/:_`.
     * @returns The {@link Webview} instance to communicate with the webview.
     */
    constructor(window2, label, options) {
      this.window = window2;
      this.label = label;
      this.listeners = /* @__PURE__ */ Object.create(null);
      if (!(options === null || options === void 0 ? void 0 : options.skip)) {
        invoke("plugin:webview|create_webview", {
          windowLabel: window2.label,
          label,
          options
        }).then(async () => this.emit("tauri://created")).catch(async (e) => this.emit("tauri://error", e));
      }
    }
    /**
     * Gets the Webview for the webview associated with the given label.
     * @example
     * ```typescript
     * import { Webview } from '@tauri-apps/api/webview';
     * const mainWebview = Webview.getByLabel('main');
     * ```
     *
     * @param label The webview label.
     * @returns The Webview instance to communicate with the webview or null if the webview doesn't exist.
     */
    static async getByLabel(label) {
      var _a2;
      return (_a2 = (await getAllWebviews()).find((w) => w.label === label)) !== null && _a2 !== void 0 ? _a2 : null;
    }
    /**
     * Get an instance of `Webview` for the current webview.
     */
    static getCurrent() {
      return getCurrentWebview();
    }
    /**
     * Gets a list of instances of `Webview` for all available webviews.
     */
    static async getAll() {
      return getAllWebviews();
    }
    /**
     * Listen to an emitted event on this webview.
     *
     * @example
     * ```typescript
     * import { getCurrentWebview } from '@tauri-apps/api/webview';
     * const unlisten = await getCurrentWebview().listen<string>('state-changed', (event) => {
     *   console.log(`Got error: ${payload}`);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param handler Event handler.
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async listen(event, handler) {
      if (this._handleTauriEvent(event, handler)) {
        return () => {
          const listeners = this.listeners[event];
          listeners.splice(listeners.indexOf(handler), 1);
        };
      }
      return listen(event, handler, {
        target: { kind: "Webview", label: this.label }
      });
    }
    /**
     * Listen to an emitted event on this webview only once.
     *
     * @example
     * ```typescript
     * import { getCurrentWebview } from '@tauri-apps/api/webview';
     * const unlisten = await getCurrent().once<null>('initialized', (event) => {
     *   console.log(`Webview initialized!`);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param handler Event handler.
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async once(event, handler) {
      if (this._handleTauriEvent(event, handler)) {
        return () => {
          const listeners = this.listeners[event];
          listeners.splice(listeners.indexOf(handler), 1);
        };
      }
      return once(event, handler, {
        target: { kind: "Webview", label: this.label }
      });
    }
    /**
     * Emits an event to all {@link EventTarget|targets}.
     *
     * @example
     * ```typescript
     * import { getCurrentWebview } from '@tauri-apps/api/webview';
     * await getCurrentWebview().emit('webview-loaded', { loggedIn: true, token: 'authToken' });
     * ```
     *
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param payload Event payload.
     */
    async emit(event, payload) {
      if (localTauriEvents2.includes(event)) {
        for (const handler of this.listeners[event] || []) {
          handler({
            event,
            id: -1,
            payload
          });
        }
        return;
      }
      return emit(event, payload);
    }
    /**
     * Emits an event to all {@link EventTarget|targets} matching the given target.
     *
     * @example
     * ```typescript
     * import { getCurrentWebview } from '@tauri-apps/api/webview';
     * await getCurrentWebview().emitTo('main', 'webview-loaded', { loggedIn: true, token: 'authToken' });
     * ```
     *
     * @param target Label of the target Window/Webview/WebviewWindow or raw {@link EventTarget} object.
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param payload Event payload.
     */
    async emitTo(target, event, payload) {
      if (localTauriEvents2.includes(event)) {
        for (const handler of this.listeners[event] || []) {
          handler({
            event,
            id: -1,
            payload
          });
        }
        return;
      }
      return emitTo(target, event, payload);
    }
    /** @ignore */
    _handleTauriEvent(event, handler) {
      if (localTauriEvents2.includes(event)) {
        if (!(event in this.listeners)) {
          this.listeners[event] = [handler];
        } else {
          this.listeners[event].push(handler);
        }
        return true;
      }
      return false;
    }
    // Getters
    /**
     * The position of the top-left hand corner of the webview's client area relative to the top-left hand corner of the desktop.
     * @example
     * ```typescript
     * import { getCurrentWebview } from '@tauri-apps/api/webview';
     * const position = await getCurrentWebview().position();
     * ```
     *
     * @returns The webview's position.
     */
    async position() {
      return invoke("plugin:webview|webview_position", {
        label: this.label
      }).then(({ x: x2, y }) => new PhysicalPosition(x2, y));
    }
    /**
     * The physical size of the webview's client area.
     * The client area is the content of the webview, excluding the title bar and borders.
     * @example
     * ```typescript
     * import { getCurrentWebview } from '@tauri-apps/api/webview';
     * const size = await getCurrentWebview().size();
     * ```
     *
     * @returns The webview's size.
     */
    async size() {
      return invoke("plugin:webview|webview_size", {
        label: this.label
      }).then(({ width: width2, height: height2 }) => new PhysicalSize(width2, height2));
    }
    // Setters
    /**
     * Closes the webview.
     * @example
     * ```typescript
     * import { getCurrentWebview } from '@tauri-apps/api/webview';
     * await getCurrentWebview().close();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async close() {
      return invoke("plugin:webview|close", {
        label: this.label
      });
    }
    /**
     * Resizes the webview.
     * @example
     * ```typescript
     * import { getCurrent, LogicalSize } from '@tauri-apps/api/webview';
     * await getCurrentWebview().setSize(new LogicalSize(600, 500));
     * ```
     *
     * @param size The logical or physical size.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setSize(size) {
      if (!size || size.type !== "Logical" && size.type !== "Physical") {
        throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");
      }
      const value = {};
      value[`${size.type}`] = {
        width: size.width,
        height: size.height
      };
      return invoke("plugin:webview|set_webview_size", {
        label: this.label,
        value
      });
    }
    /**
     * Sets the webview position.
     * @example
     * ```typescript
     * import { getCurrent, LogicalPosition } from '@tauri-apps/api/webview';
     * await getCurrentWebview().setPosition(new LogicalPosition(600, 500));
     * ```
     *
     * @param position The new position, in logical or physical pixels.
     * @returns A promise indicating the success or failure of the operation.
     */
    async setPosition(position) {
      if (!position || position.type !== "Logical" && position.type !== "Physical") {
        throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");
      }
      const value = {};
      value[`${position.type}`] = {
        x: position.x,
        y: position.y
      };
      return invoke("plugin:webview|set_webview_position", {
        label: this.label,
        value
      });
    }
    /**
     * Bring the webview to front and focus.
     * @example
     * ```typescript
     * import { getCurrentWebview } from '@tauri-apps/api/webview';
     * await getCurrentWebview().setFocus();
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async setFocus() {
      return invoke("plugin:webview|set_webview_focus", {
        label: this.label
      });
    }
    /**
     * Set webview zoom level.
     * @example
     * ```typescript
     * import { getCurrentWebview } from '@tauri-apps/api/webview';
     * await getCurrentWebview().setZoom(1.5);
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async setZoom(scaleFactor) {
      return invoke("plugin:webview|set_webview_zoom", {
        label: this.label,
        value: scaleFactor
      });
    }
    /**
     * Moves this webview to the given label.
     * @example
     * ```typescript
     * import { getCurrentWebview } from '@tauri-apps/api/webview';
     * await getCurrentWebview().reparent('other-window');
     * ```
     *
     * @returns A promise indicating the success or failure of the operation.
     */
    async reparent(window2) {
      return invoke("plugin:webview|reparent", {
        label: this.label,
        window: typeof window2 === "string" ? window2 : window2.label
      });
    }
    // Listeners
    /**
     * Listen to a file drop event.
     * The listener is triggered when the user hovers the selected files on the webview,
     * drops the files or cancels the operation.
     *
     * @example
     * ```typescript
     * import { getCurrentWebview } from "@tauri-apps/api/webview";
     * const unlisten = await getCurrentWebview().onDragDropEvent((event) => {
     *  if (event.payload.type === 'hover') {
     *    console.log('User hovering', event.payload.paths);
     *  } else if (event.payload.type === 'drop') {
     *    console.log('User dropped', event.payload.paths);
     *  } else {
     *    console.log('File drop cancelled');
     *  }
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async onDragDropEvent(handler) {
      const unlistenDragEnter = await this.listen(TauriEvent.DRAG_ENTER, (event) => {
        handler({
          ...event,
          payload: {
            type: "enter",
            paths: event.payload.paths,
            position: mapPhysicalPosition2(event.payload.position)
          }
        });
      });
      const unlistenDragOver = await this.listen(TauriEvent.DRAG_OVER, (event) => {
        handler({
          ...event,
          payload: {
            type: "over",
            position: mapPhysicalPosition2(event.payload.position)
          }
        });
      });
      const unlistenDragDrop = await this.listen(TauriEvent.DRAG_DROP, (event) => {
        handler({
          ...event,
          payload: {
            type: "drop",
            paths: event.payload.paths,
            position: mapPhysicalPosition2(event.payload.position)
          }
        });
      });
      const unlistenDragLeave = await this.listen(TauriEvent.DRAG_LEAVE, (event) => {
        handler({ ...event, payload: { type: "leave" } });
      });
      return () => {
        unlistenDragEnter();
        unlistenDragDrop();
        unlistenDragOver();
        unlistenDragLeave();
      };
    }
  };
  function mapPhysicalPosition2(m) {
    return new PhysicalPosition(m.x, m.y);
  }

  // node_modules/.pnpm/@tauri-apps+api@2.0.0-rc.4/node_modules/@tauri-apps/api/webviewWindow.js
  function getCurrentWebviewWindow() {
    const webview = getCurrentWebview();
    return new WebviewWindow(webview.label, { skip: true });
  }
  async function getAllWebviewWindows() {
    return invoke("plugin:window|get_all_windows").then((windows) => windows.map((w) => new WebviewWindow(w, {
      // @ts-expect-error `skip` is not defined in the public API but it is handled by the constructor
      skip: true
    })));
  }
  var WebviewWindow = class _WebviewWindow {
    /**
     * Creates a new {@link Window} hosting a {@link Webview}.
     * @example
     * ```typescript
     * import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
     * const webview = new WebviewWindow('my-label', {
     *   url: 'https://github.com/tauri-apps/tauri'
     * });
     * webview.once('tauri://created', function () {
     *  // webview successfully created
     * });
     * webview.once('tauri://error', function (e) {
     *  // an error happened creating the webview
     * });
     * ```
     *
     * @param label The unique webview label. Must be alphanumeric: `a-zA-Z-/:_`.
     * @returns The {@link WebviewWindow} instance to communicate with the window and webview.
     */
    constructor(label, options = {}) {
      var _a2;
      this.label = label;
      this.listeners = /* @__PURE__ */ Object.create(null);
      if (!(options === null || options === void 0 ? void 0 : options.skip)) {
        invoke("plugin:webview|create_webview_window", {
          options: {
            ...options,
            parent: typeof options.parent === "string" ? options.parent : (_a2 = options.parent) === null || _a2 === void 0 ? void 0 : _a2.label,
            label
          }
        }).then(async () => this.emit("tauri://created")).catch(async (e) => this.emit("tauri://error", e));
      }
    }
    /**
     * Gets the Webview for the webview associated with the given label.
     * @example
     * ```typescript
     * import { Webview } from '@tauri-apps/api/webviewWindow';
     * const mainWebview = Webview.getByLabel('main');
     * ```
     *
     * @param label The webview label.
     * @returns The Webview instance to communicate with the webview or null if the webview doesn't exist.
     */
    static async getByLabel(label) {
      var _a2;
      const webview = (_a2 = (await getAllWebviewWindows()).find((w) => w.label === label)) !== null && _a2 !== void 0 ? _a2 : null;
      if (webview) {
        return new _WebviewWindow(webview.label, { skip: true });
      }
      return null;
    }
    /**
     * Get an instance of `Webview` for the current webview.
     */
    static getCurrent() {
      return getCurrentWebviewWindow();
    }
    /**
     * Gets a list of instances of `Webview` for all available webviews.
     */
    static async getAll() {
      return getAllWebviewWindows();
    }
    /**
     * Listen to an emitted event on this webivew window.
     *
     * @example
     * ```typescript
     * import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
     * const unlisten = await WebviewWindow.getCurrent().listen<string>('state-changed', (event) => {
     *   console.log(`Got error: ${payload}`);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param handler Event handler.
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async listen(event, handler) {
      if (this._handleTauriEvent(event, handler)) {
        return () => {
          const listeners = this.listeners[event];
          listeners.splice(listeners.indexOf(handler), 1);
        };
      }
      return listen(event, handler, {
        target: { kind: "WebviewWindow", label: this.label }
      });
    }
    /**
     * Listen to an emitted event on this webview window only once.
     *
     * @example
     * ```typescript
     * import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
     * const unlisten = await WebviewWindow.getCurrent().once<null>('initialized', (event) => {
     *   console.log(`Webview initialized!`);
     * });
     *
     * // you need to call unlisten if your handler goes out of scope e.g. the component is unmounted
     * unlisten();
     * ```
     *
     * @param event Event name. Must include only alphanumeric characters, `-`, `/`, `:` and `_`.
     * @param handler Event handler.
     * @returns A promise resolving to a function to unlisten to the event.
     * Note that removing the listener is required if your listener goes out of scope e.g. the component is unmounted.
     */
    async once(event, handler) {
      if (this._handleTauriEvent(event, handler)) {
        return () => {
          const listeners = this.listeners[event];
          listeners.splice(listeners.indexOf(handler), 1);
        };
      }
      return once(event, handler, {
        target: { kind: "WebviewWindow", label: this.label }
      });
    }
  };
  applyMixins(WebviewWindow, [Window, Webview]);
  function applyMixins(baseClass, extendedClasses) {
    (Array.isArray(extendedClasses) ? extendedClasses : [extendedClasses]).forEach((extendedClass) => {
      Object.getOwnPropertyNames(extendedClass.prototype).forEach((name) => {
        var _a2;
        if (typeof baseClass.prototype === "object" && baseClass.prototype && name in baseClass.prototype)
          return;
        Object.defineProperty(
          baseClass.prototype,
          name,
          // eslint-disable-next-line
          (_a2 = Object.getOwnPropertyDescriptor(extendedClass.prototype, name)) !== null && _a2 !== void 0 ? _a2 : /* @__PURE__ */ Object.create(null)
        );
      });
    });
  }

  // source/main.ts
  var appWindow2 = null;
  runInTauri2(() => appWindow2 = getCurrentWebviewWindow());
  console.log(`appWindow: ` + appWindow2);
  var DEBUG = true;
  var enableNg = false;
  var VERSION = "1.1.0";
  var kaplayOpts = {
    width: 1024,
    height: 576,
    font: "lambda",
    canvas: document.querySelector("#kanva"),
    logMax: 10,
    debugKey: "f1",
    debug: DEBUG,
    loadingScreen: true,
    crisp: false,
    backgroundAudio: true,
    stretch: false,
    letterbox: false,
    maxFPS: 120,
    tagsAsComponents: true
  };
  runInTauri2(() => {
    kaplayOpts.stretch = true;
    kaplayOpts.letterbox = true;
  });
  var k2 = _C(kaplayOpts);
  console.log("Game's version: " + VERSION);
  var ROOT = getTreeRoot();
  setBackground(BLACK);
  setCursor("none");
  layers([
    "background",
    "hexagon",
    "ui",
    "windows",
    "powerups",
    "ascension",
    "logs",
    "sound",
    "mouse"
  ], "background");
  loadEverything();
  onLoad(() => {
    volumeManager();
    addBackground();
    connectToNewgrounds();
    windowsDefinition();
    gameBg.movAngle = -5;
    gameBg.color = BLACK;
    gameBg.colorA = 0.9;
    if (!DEBUG) {
      let opacity2 = 1;
      tween(opacity2, 0, 1, (p) => opacity2 = p, easings.linear);
      let drawEvent = onDraw(() => {
        drawSeriousLoadScreen(1, opacity2);
      });
      wait(1, () => {
        drawEvent.cancel();
        ROOT.trigger("rungame");
      });
    } else {
      wait(0.05, () => {
        ROOT.trigger("rungame");
      });
    }
    ROOT.on("rungame", async () => {
      GameState.loadFromStorage();
      volume(GameState.settings.volume);
      addMouse();
      if (!isFocused())
        go("focuscene");
      else {
        if (enableNg == true) {
          let loadingEvent = onDraw(() => {
            drawText({
              text: "Loading newgrounds, might take a second\nLoading" + ".".repeat(wave(1, 4, time() * 8)),
              size: 26,
              align: "center",
              anchor: "center",
              pos: center()
            });
          });
          if (!await ht2.isLoggedIn())
            go("ngScene");
          else {
            const session = await ht2.getSession();
            onLogIn(session);
            go("gamescene");
          }
          loadingEvent.cancel();
        } else
          go("gamescene");
      }
    });
  });
  if (DEBUG == true)
    document.body.style.backgroundColor = "rgb(1, 3, 13)";
  else
    document.body.style.backgroundColor = "rgb(0, 0, 0)";
})();
/*! Bundled license information:

newgrounds.js/dist/newgrounds.mjs:
  (** @preserve
  	(c) 2012 by Cédric Mesnil. All rights reserved.
  
  	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
  
  	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  
  	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  	*)
  (** @preserve
   * Counter block mode compatible with  Dr Brian Gladman fileenc.c
   * derived from CryptoJS.mode.CTR
   * Jan Hruby jhruby.web@gmail.com
   *)
*/

type Grad3 = readonly [number, number, number];

const grad3: Grad3[] = [
  [1, 1, 0],
  [-1, 1, 0],
  [1, -1, 0],
  [-1, -1, 0],
  [1, 0, 1],
  [-1, 0, 1],
  [1, 0, -1],
  [-1, 0, -1],
  [0, 1, 1],
  [0, -1, 1],
  [0, 1, -1],
  [0, -1, -1]
];

export class SimplexNoise {
  private readonly perm = new Uint8Array(512);
  private readonly permMod12 = new Uint8Array(512);

  constructor(seed = 42) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i += 1) p[i] = i;
    let mutableSeed = seed;

    for (let i = 255; i > 0; i -= 1) {
      mutableSeed = (mutableSeed * 16807) % 2147483647;
      const j = mutableSeed % (i + 1);
      const tmp = p[i];
      p[i] = p[j];
      p[j] = tmp;
    }

    for (let i = 0; i < 512; i += 1) {
      this.perm[i] = p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
  }

  noise3D(xin: number, yin: number, zin: number) {
    const f3 = 1 / 3;
    const g3 = 1 / 6;
    const s = (xin + yin + zin) * f3;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const k = Math.floor(zin + s);
    const t = (i + j + k) * g3;
    const x0 = xin - (i - t);
    const y0 = yin - (j - t);
    const z0 = zin - (k - t);

    let i1 = 0;
    let j1 = 0;
    let k1 = 0;
    let i2 = 0;
    let j2 = 0;
    let k2 = 0;

    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1; i2 = 1; j2 = 1;
      } else if (x0 >= z0) {
        i1 = 1; i2 = 1; k2 = 1;
      } else {
        k1 = 1; i2 = 1; k2 = 1;
      }
    } else if (y0 < z0) {
      k1 = 1; j2 = 1; k2 = 1;
    } else if (x0 < z0) {
      j1 = 1; j2 = 1; k2 = 1;
    } else {
      j1 = 1; i2 = 1; j2 = 1;
    }

    const x1 = x0 - i1 + g3;
    const y1 = y0 - j1 + g3;
    const z1 = z0 - k1 + g3;
    const x2 = x0 - i2 + 2 * g3;
    const y2 = y0 - j2 + 2 * g3;
    const z2 = z0 - k2 + 2 * g3;
    const x3 = x0 - 1 + 3 * g3;
    const y3 = y0 - 1 + 3 * g3;
    const z3 = z0 - 1 + 3 * g3;
    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;

    const corner = (tt: number, x: number, y: number, z: number, gi: number) => {
      if (tt < 0) return 0;
      const t2 = tt * tt;
      const g = grad3[gi];
      return t2 * t2 * (g[0] * x + g[1] * y + g[2] * z);
    };

    return 32 * (
      corner(0.6 - x0 * x0 - y0 * y0 - z0 * z0, x0, y0, z0, this.permMod12[ii + this.perm[jj + this.perm[kk]]]) +
      corner(0.6 - x1 * x1 - y1 * y1 - z1 * z1, x1, y1, z1, this.permMod12[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]]) +
      corner(0.6 - x2 * x2 - y2 * y2 - z2 * z2, x2, y2, z2, this.permMod12[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]]) +
      corner(0.6 - x3 * x3 - y3 * y3 - z3 * z3, x3, y3, z3, this.permMod12[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]])
    );
  }
}

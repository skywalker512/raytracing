export default class Vec3 {
  /**
   *
   * 三维向量类 Vec3 ，用它可以在三维空间中表述一个点的
   * 坐标/一个方向
   * 或者表述一个颜色 ( rgb 值 )
   * @param e0
   * @param e1
   * @param e2
   */
  constructor(public e0 = 0, public e1 = 0, public e2 = 0) {
  }

  static add(v1: number | Vec3, v2: number | Vec3): Vec3 {
    return (
      typeof v1 === 'number'
        ? Vec3.add(new Vec3(v1, v1, v1), v2)
        : typeof v2 === 'number'
        ? Vec3.add(v1, new Vec3(v2, v2, v2))
        : new Vec3(v1.e0 + v2.e0, v1.e1 + v2.e1, v1.e2 + v2.e2)
    )
  }

  static sub(v1: number | Vec3, v2: number | Vec3): Vec3 {
    return (
      typeof v1 === 'number'
        ? Vec3.sub(new Vec3(v1, v1, v1), v2)
        : typeof v2 === 'number'
        ? Vec3.sub(v1, new Vec3(v2, v2, v2))
        : new Vec3(v1.e0 - v2.e0, v1.e1 - v2.e1, v1.e2 - v2.e2)
    )
  }

  static mul(v1: number | Vec3, v2: number | Vec3): Vec3 {
    return (
      typeof v1 === 'number'
        ? Vec3.mul(new Vec3(v1, v1, v1), v2)
        : typeof v2 === 'number'
        ? Vec3.mul(v1, new Vec3(v2, v2, v2))
        : new Vec3(v1.e0 * v2.e0, v1.e1 * v2.e1, v1.e2 * v2.e2)
    )
  }

  static div(v1: number | Vec3, v2: number | Vec3): Vec3 {

    return (
      typeof v1 === 'number'
        ? Vec3.div(new Vec3(v1, v1, v1), v2)
        : typeof v2 === 'number'
        ? Vec3.div(v1, new Vec3(v2, v2, v2))
        : new Vec3(v1.e0 / v2.e0, v1.e1 / v2.e1, v1.e2 / v2.e2)
    )
  }

  static dot(v1: Vec3, v2: Vec3) {
    return v1.e0 * v2.e0 + v1.e1 * v2.e1 + v1.e2 * v2.e2
  }

  add(v: Vec3 | number) {
    return Vec3.add(this, v)
  }

  sub(v: Vec3 | number) {
    return Vec3.sub(this, v)
  }

  mul(v: Vec3 | number) {
    return Vec3.mul(this, v)
  }

  div(v: Vec3 | number) {
    return Vec3.div(this, v)
  }

  // 单位向量(向量方向)
  unitVec() {
    return this.div(this.length())
  }

  // 向量长度
  squaredLength() {
    return this.e0 ** 2 + this.e1 ** 2 + this.e2 ** 2
  }

  length() {
    return this.squaredLength() ** (1 / 2)
  }

}

import Vec3 from './vec3'
import type HitRecord from './hitRecord'

export default class Ray {
  constructor(public origin: Vec3, public direction: Vec3) {
  }

  getPoint(t: number) {
    return this.origin.add(this.direction.mul(t))
  }

  reflect(hit: HitRecord) {
    return new Ray(hit.p, reflect(this.direction.unitVec(), hit.normal))
  }
}

function reflect(v: Vec3, n: Vec3) {
  return v.sub(n.mul(Vec3.dot(v, n) * 2))
}


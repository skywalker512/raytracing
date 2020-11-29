import type Vec3 from './vec3'
import Ray from './ray'

export default class Camera {
  constructor(public origin: Vec3,public leftBottom: Vec3,public horizontal: Vec3,public vertical: Vec3) {
  }

  getRay(x: number, y: number): Ray {
    return new Ray(
      this.origin,
      this.leftBottom
        .add(this.horizontal.mul(x))
        .add(this.vertical.mul(y))
        .sub(this.origin))
  }
}

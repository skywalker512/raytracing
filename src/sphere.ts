import Vec3 from './vec3'
import type Ray from './ray'
import HitRecord from './hitRecord'

export default class Sphere {
  /**
   * 球 (必要信息，球心和半径)
   * @param center 球心坐标
   * @param radius 半径
   */
  constructor(public center: Vec3, public radius: number) {
  }

  hit(ray: Ray, t_min: number, t_max: number) {

    let hit = new HitRecord()

    // 球心和光线原点的连线
    const oc = Vec3.sub(ray.origin, this.center)
    const a = Vec3.dot(ray.direction, ray.direction)
    const b = Vec3.dot(oc, ray.direction) * (2)
    const c = Vec3.dot(oc, oc) - this.radius ** 2

    const discriminate = b ** 2 - 4 * a * c

    if (discriminate > 0) {
      let t
      t = (-b - Math.sqrt(discriminate)) / (2 * a)
      if (t > t_min && t < t_max) {
        hit.t = t
        hit.p = ray.getPoint(t)
        // 法线方向
        hit.normal = hit.p.sub(this.center).div(this.radius)


        return [hit, ray.reflect(hit)]
      }
      t = (-b + Math.sqrt(discriminate)) / (2 * a)
      if (t > t_min && t < t_max) {
        hit.t = t
        hit.p = ray.getPoint(t)
        hit.normal = hit.p.sub(this.center).div(this.radius)

        return [hit, ray.reflect(hit)]
      }
    }
  }
}

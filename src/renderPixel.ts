import type { Px } from './index'
import Camera from './camera'
import Vec3 from './vec3'
import Sphere from './sphere'

const ball = new Sphere(new Vec3(0, 0, -1), 0.5)

const camera = new Camera(
  new Vec3(0, 0, 1), //origin
  new Vec3(-2, -1, -1), //leftBottom
  new Vec3(4, 0, 0), //horizontal
  new Vec3(0, 2, 0) //vertical
)

function color(_x: number, _y: number) {
  const [x, y] = [_x, 1 - _y]


  const r = camera.getRay(x, y)

  const hit = ball.hit(r, 0, Infinity)

  let res: Vec3

  if (hit) {

    res = hit.normal.unitVec().add(1).mul(0.5)

  } else {
    // 设置背景色
    const unitDirection = r.direction.unitVec(),
      t = (unitDirection.e1 + 1.0) * 0.5

    res = Vec3.add(new Vec3(1, 1, 1).mul(1 - t), new Vec3(0.3, 0.5, 1).mul(t))

  }

  return [res.e0, res.e1, res.e2]
}

const n = 50

export default function renderPixel(
  v: Px,
  width: number,
  height: number) {

  ;[v.r, v.g, v.b, v.a] = (new Array(n))
    .fill(0)
    .map(m => color((v.x + Math.random()) / width, (v.y + Math.random()) / height))
    .reduce((res, v) => res.map((item, i) => item += v[i]), [0, 0, 0])
    .map(v => Math.floor(v / n * 255.99))
    .concat([255])
}

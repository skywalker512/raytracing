import type { Px } from './index'
import Camera from './camera'
import Vec3 from './vec3'

const camera = new Camera(
  new Vec3(0, 0, 1), //origin
  new Vec3(-2, -1, -1), //leftBottom
  new Vec3(4, 0, 0), //horizontal
  new Vec3(0, 2, 0) //vertical
)

function color(_x: number, _y: number) {
  const [x, y] = [_x, 1 - _y]


  const r = camera.getRay(x, y)

  // 设置背景色
  const unitDirection = r.direction.unitVec(),
    t = (unitDirection.e1 + 1.0) * 0.5

  const res =  Vec3.add(new Vec3(1, 1, 1).mul(1 - t), new Vec3(0.3, 0.5, 1).mul(t))

  return [res.e0, res.e1, res.e2]
}

export default function RenderPixel(
  v: Px,
  width: number,
  height: number) {
  [v.r, v.g, v.b, v.a] = [...color(v.x / width, v.y / height), 1]
    .map(v => Math.floor(v * 255.9))
}

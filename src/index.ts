import RenderTask from './renderTask'

const height = 400
const width = 800

const canvas = document.getElementsByTagName('canvas')[0]
canvas.height = height
canvas.width = width

const ctx = canvas.getContext('2d')
const image = ctx?.createImageData(width, height)
const bar = document.getElementById('processline') as HTMLElement


/**
 * 一个点的坐标信息和 rgba 值
 */
export class Px {
  r: number
  g: number
  b: number
  a: number

  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.r = this.g = this.b = this.a = 0
  }
}

//:ImageData
let imageData = ctx?.createImageData(width, height) as any
let complete = 0

function performTask(task: RenderTask, amount: number) {
  const worker = new Worker('./_dist_/task.worker.js', { type: 'module' })

  worker.postMessage({
    method: 'render',
    args: [task]
  })


  const taskMsg: { [key: string]: Function } = {
    partComplete(worker: Worker, task: RenderTask) {
      task.pixels.forEach((v, i) => {
        const position = (v.x + v.y * task.width) * 4
        imageData.data[position] = v.r
        imageData.data[position + 1] = v.g
        imageData.data[position + 2] = v.b
        imageData.data[position + 3] = v.a
      })
      complete += task.pixels.length
      bar.style.width = (complete / amount) * 100 + '%'
      ctx?.putImageData(imageData, 0, 0)
    },

    allComplete(worker: Worker, task: RenderTask | null) {
      if (task) {
        task.pixels.forEach((v, i) => {
          const position = (v.x + v.y * task.width) * 4
          imageData.data[position] = v.r
          imageData.data[position + 1] = v.g
          imageData.data[position + 2] = v.b
          imageData.data[position + 3] = v.a
        })
        complete += task.pixels.length
        bar.style.width = (complete / amount) * 100 + '%'
      }
      ctx?.putImageData(imageData, 0, 0)
      console.log((complete / amount))
      worker.terminate()
    }
  }

  worker.onmessage = function(res: {
    data: { method: string; args: any[] }
  }) {
    const { method, args } = res.data

    if (taskMsg[method]) {
      taskMsg[method](worker, ...args)
    } else {
      alert(`app : can't find method (${method})`)
    }
  }

}

/**
 * 进行一些初始化操作，并派发 RenderTask
 * @param ctx
 * @param width
 * @param height
 * @param amount 分的 task 数量
 */
function initTasks(
  ctx: CanvasRenderingContext2D | null,
  width: number,
  height: number,
  amount: number
) {
  // 获取 canvas 像素总数 n
  const n = width * height
  // 向上取整数
  // 每个 task 需要处理的像素数量 len
  const len = Math.ceil(n / amount)

  let task = new RenderTask([], width, height)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      task.pixels.push(new Px(x, y))

      // 每当task 内部的像素数量等于 len 时候 或者 处理到最后一个像素的时候
      if (task.pixels.length >= len || y * width + x === n - 1) {
        // 处理 task
        performTask(task, n)
        // 更新 task
        task = new RenderTask([], width, height)
      }
    }
  }
}

initTasks(ctx, width, height, 4)

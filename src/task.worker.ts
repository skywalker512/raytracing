import type { RenderTask, Px } from './index'

function renderPixel(v: Px, width: number, height: number) {
  v.r = v.g = v.b = v.a = 255
}

function render(task: RenderTask) {

  const { pixels, width, height } = task

  pixels.forEach((v, i) => {
    renderPixel(v, width, height)
  })

  ;(<any>postMessage)({
    method:'allComplete',
    args:[task]
  })
}

const appMsg: { [key: string]: Function } = {
  render
}

onmessage = function(e) {
  const { method, args = [] } = e.data

  if (appMsg[method]) {
    appMsg[method](...args)
  } else {
    console.log(`taskWorker: can't find method (${method})`)
  }
}

import React, { useRef, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Router } from '@reach/router'
import styled from 'styled-components'
import { useSize } from 'hooks'

console.log('useSize', useSize)
import { Inspect } from 'Common/Inspect'
import '../styles/app.scss'

const CenteredDiv = styled.div`
  flex: 1;
`

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`

const SPEED = 2
const GRAVITY_SPEED = 0.01
const REBOUND_DAMPING = 0.8

const getContext = ref => ref.current && ref.current.getContext('2d')

function useCanvas(draw, context = '2d') {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext(context);
    let animationFrameId = requestAnimationFrame(renderFrame);

    function renderFrame() {
      animationFrameId = requestAnimationFrame(renderFrame);
      draw(ctx);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return canvasRef;
}

let balls = []

class Ball {
  constructor(params = {}) {
    Object.assign(this, params)

    console.log('creating ball', this)
  }

  advance({ height, width }) {
    this.x += this.dx
    this.y += this.dy

    this.rebound({ height, width })

    this.dx += this.gx
    this.dy += this.gy
  }

  isOutOfBounds({ height, width }) {
    let { x, y } = this
    if (x < 0 || x > width) return true
    if (y < 0 || y > height) return true

    return false
  }

  rebound({ height, width }) {
    let { x, y, dx, dy, radius } = this

    if (x <= radius || x >= (width - radius)) {
      this.dx = -dx * REBOUND_DAMPING
      this.x += this.dx
    }

    if (y <= radius || y >= (height - radius)) {
      this.dy = -dy * REBOUND_DAMPING
      this.y += this.dy
    }
  }
}

const splash = (ctx, location) => {
  const SPEED = 2
  const radius = Math.random() * 15 + 5
  const weight = Math.random() * 0.7 + 0.3
  const x = location.clientX
  const y = location.clientY
  const dx = (Math.random() * 2 - 1) * SPEED
  const dy = (Math.random() * 2 - 1) * SPEED
  const gx = 0 //(Math.random() * 2 - 1) * GRAVITY_SPEED
  const gy = (Math.random() * 1) * GRAVITY_SPEED

  balls.push(new Ball({
    radius, weight, x, y, dx, dy, gx, gy
  }))

  // ctx.canvas.window.innerWidth  = window.innerWidth
  // ctx.canvas.height = window.innerHeight
}

const renderFrame = (ctx) => {
  if (!ctx) {
    console.warn('context broken, waiting to reconnect')

    return false
  }

  let { height, width } = ctx.canvas
  ctx.clearRect(0, 0, width, height)

  for (var ball of balls) {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0 Math.PI*2, false)
    ctx.strokeStyle = `rgba(0, 0, 0, ${ball.weight})`
    ctx.stroke()
    ctx.closePath()

    ball.advance({ height, width })
  }

  // balls = balls.filter(b => !b.isOutOfBounds({ height, width }))
}

export default function App() {
  let canvasRef = useRef(null)

  // const canvasRef = useCanvas(ctx => {
  //   // gl.clearColor(0.0, 0.0, 0.0, 1.0)
  //   // gl.clearDepth(1.0)
  //   // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  //   ctx.beginPath()
  //   ctx.rect(20, 40, 50, 50)
  //   ctx.fillStyle = "#FF0000"
  //   ctx.fill()
  //   ctx.closePath()

  //   ctx.beginPath()
  //   ctx.arc(240, 160, 20, 0, Math.PI*2, false)
  //   // ctx.fillStyle = "green"
  //   // ctx.fill()
  //   ctx.strokeStyle = "rgba(0, 0, 255, 1)"
  //   ctx.stroke()
  //   ctx.closePath()

  //   ctx.beginPath()
  //   ctx.rect(160, 10, 100, 40)
  //   ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"
  //   ctx.stroke()
  //   ctx.closePath()
  // }, "2d")

  useEffect(() => {
    setInterval(() => renderFrame(getContext(canvasRef)), 10)
  }, [])

  return (
    <CenteredDiv>
      <StyledCanvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={(e) => splash(getContext(canvasRef), e)}
        />
    </CenteredDiv>
  )
}

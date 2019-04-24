import React, { useRef, useState, useEffect } from 'react'
import classNames from 'classnames'
import { Router } from '@reach/router'
import styled from 'styled-components'
import { Inspect } from 'Common/Inspect'
import '../styles/app.scss'

const CenteredDiv = styled.div`
  flex: 1;
`

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
`

const SPEED = 5
const GRAVITY_SPEED = 0.01
const REBOUND_DAMPING = 0.8

const getContext = ref => ref.current && ref.current.getContext('2d')

let balls = []

class Ball {
  constructor(params = {}) {
    Object.assign(this, params)
    this.color = [0,0,0]

    console.log('creating ball', this)
  }

  advance({ height, width }) {
    this.x += this.dx
    this.y += this.dy

    this.rebound({ height, width })
    this.detectCollisions(balls)

    this.dx += this.gx
    this.dy += this.gy
  }

  detectCollisions(balls) {
    for (var ball of balls) {
      if (ball === this) continue
      let deltaX = ball.x - this.x
      let deltaY = ball.y - this.y
      let allowedDistance = ball.radius + this.radius

      let actualDistance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))

      if (actualDistance < allowedDistance) {
        this.color = ball.color = [255,0,0]
        this.dx = -this.dx
        this.dy = -this.dy

        ball.dx = -ball.dx
        ball.dy = -ball.dy

        this.x += this.dx
        this.y += this.dy
      }
    }
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
  const radius = Math.random() * 15 + 5
  const weight = Math.random() * 0.8 + 0.2
  const x = location.clientX
  const y = location.clientY
  const dx = (Math.random() * 2 - 1) * SPEED
  const dy = (Math.random() * 2 - 1) * SPEED
  const gx = (Math.random() * 2 - 1) * GRAVITY_SPEED
  const gy = (Math.random() * 2 - 1) * GRAVITY_SPEED

  balls.push(new Ball({
    radius, weight, x, y, dx, dy, gx, gy
  }))
}

const renderFrame = (ctx) => {
  if (!ctx) return false // breakout for context switch on hot-reload

  let { height, width } = ctx.canvas
  ctx.clearRect(0, 0, width, height)

  for (var ball of balls) {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0 Math.PI*2, false)
    ctx.strokeStyle = `rgba(${ball.color.join(',')}, ${ball.weight})`
    ctx.stroke()
    ctx.closePath()

    ball.advance({ height, width })
  }
}

export default function App() {
  let canvasRef = useRef(null)

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

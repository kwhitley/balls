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

const SPEED = 0.0001
const GRAVITY_SPEED = 0.02
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
    this.detectCollisions({ height, width, balls })

    // this.dx += this.gx
    // this.dy += this.gy
  }



  detectCollisions({ height, width, balls }) {
    for (var ball of balls) {
      if (ball === this) continue
      let deltaX = (ball.x - this.x) * width
      let deltaY = (ball.y - this.y) * height

      let allowedDistance = ball.radius + this.radius
      let gravityDistance = allowedDistance * 20
      let actualDistance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
      let gravityImpact = actualDistance / gravityDistance

      // inter-ball gravity effects these balls
      if (actualDistance < gravityDistance && actualDistance > allowedDistance) {
        // console.log('nearby ball, add intra-ball gravity', 'actual distance', actualDistance)
        let partialDeltaX = deltaX / 100000000 * ball.radius / this.radius * gravityImpact
        let partialDeltaY = deltaY / 100000000 * ball.radius / this.radius * gravityImpact
        this.dy += partialDeltaY
        this.dx += partialDeltaX
        // console.log({
        //   partialDeltaX,
        //   partialDeltaY,
        //   dx: this.dx,
        //   dy: this.dy,
        // })
      }

      // if (actualDistance < allowedDistance) {
      //   this.color = ball.color = [255,0,0]
      //   this.dx = -this.dx
      //   this.dy = -this.dy
      //   ball.dx = -ball.dx
      //   ball.dy = -ball.dy
      //   this.x += this.dx
      //   this.y += this.dy
      // }
    }
  }

  rebound({ height, width }) {
    let { x, y, dx, dy, radius } = this

    if (x * width <= radius || x * width >= (width - radius)) {
      this.dx = -dx * REBOUND_DAMPING
      this.x += this.dx
    }

    if (y * height <= radius || y * height >= (height - radius)) {
      this.dy = -dy * REBOUND_DAMPING
      this.y += this.dy
    }
  }
}

const splash = (ctx, location) => {
  let { height, width } = ctx.canvas

  const radius = Math.random() * 15 + 5
  const weight = Math.random() * 0.1 + 0.05
  const x = location.clientX / width
  const y = location.clientY / height
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
  // ctx.clearRect(0, 0, width, height)

  for (var ball of balls) {
    ctx.beginPath()
    ctx.arc(ball.x * width, ball.y * height, ball.radius, 0 Math.PI*2, false)
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

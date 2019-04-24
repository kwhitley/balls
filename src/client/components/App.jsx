import React from 'react'
import classNames from 'classnames'
import { Router } from '@reach/router'
import { useAuth } from '../auth'
import styled from 'styled-components'
import '../styles/app.scss'

const CenteredDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 2em 2em 5em;
  font-size: 4vmax;

  em {
    color: pink;
    font-style: normal;
    font-size: 1.3em;
  }
`

export default function App() {
  let { user, isLoggedIn } = useAuth()

  return (
    <CenteredDiv>
      Welcome to the Arundo <em>Women's 2019 Hackathon</em>
      <pre>
        { JSON.stringify({ isLoggedIn }, null, 2) }
      </pre>
    </CenteredDiv>
  )
}

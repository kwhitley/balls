import React from 'react'
import svgr from '@svgr/core'


const logoSVG = `
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1326.83 172.49"><defs><style>.cls-1{fill:url(#Gradient_2);}</style><linearGradient id="Gradient_2" x1="2.15" y1="85.65" x2="1325.42" y2="85.65" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1b75bb"/><stop offset="0.48" stop-color="#00adee"/><stop offset="0.98" stop-color="#2584c5"/></linearGradient></defs><title>Arundo Logo Primary New</title><path class="cls-1" d="M204.36,159.25H175.42L157,126.35H49.49l-18.4,32.89H2.15l84.46-147h33.3Zm-60.19-54.82L103.5,33.21,62.34,104.43Zm263.94,54.82H377.33l-43.21-56H253.53v56H227.07v-147H353q25.14,0,39.47,12.49t14.33,33.81q0,18.68-11.69,30Q384.3,99.15,365.33,102Zm-59.1-78q30.65,0,30.65-22.73,0-24.37-33.08-24.37H253.53v47.1Zm274.54,30.46q0,22.95-24.26,37.15-24.7,14.82-65.93,14.82T467,148.89q-24.26-14.41-24.25-37.15V12.25h26.46v93.6q0,17.26,16.43,26.4t47.74,9.14q31.31,0,47.52-9.14t16.21-26.4V12.25h26.46Zm228,47.51H818.63L696.75,38.7V159.25H670.29v-147h32.86L825.09,132.86V12.25h26.46Zm148.84-147q41.68,0,66,20.4t24.37,54.72q0,31.47-25.8,52.38-24,19.49-59.54,19.49H899.4v-147Zm7.28,125.07q23.81,0,39.14-14.17t15.33-36.39q0-23.64-16.43-38.12T1002.6,34.18H925.86V137.32Zm317.75-51.78q0,36.14-32.19,58.48-28.23,19.49-70.12,19.49-42.34,0-70.56-19.69-32.2-22.33-32.19-58.27,0-35.33,32.64-58.07,28.66-19.9,70.12-19.9,41.68,0,69.9,19.9Q1325.43,50.22,1325.42,85.54Zm-27.56,0q0-25.78-23.82-41.82-20.5-13.81-50.94-13.81-33.3,0-54.25,15.74t-20.95,39.9q0,25,20.51,40.3t54.69,15.33q34,0,54.35-15.43T1297.86,85.54Z"/></svg>
`


let svg = svgr.sync(logoSVG, { icon: true }, { componentName: 'MyComponent' })

console.log('svg', svg)

export const Logo = () => <div>Arundo</div>

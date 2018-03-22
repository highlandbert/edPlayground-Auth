import '../node_modules/bulma/css/bulma.css'
import '../node_modules/@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'
import '../node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-regular.css'
import '../node_modules/@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'
import './index.css'

import React from 'react'
import {render} from 'react-dom'

import App from './App'

render(<App/>, document.querySelector('#app'))

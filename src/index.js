import { createRoot } from 'react-dom/client'

import App from './components/App/app'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)

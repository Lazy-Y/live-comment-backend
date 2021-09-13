import { Suspense } from "react"

const App = () => {
  return <Suspense fallback={'loading...'}> <div>My App</div></Suspense>
}

export default App;
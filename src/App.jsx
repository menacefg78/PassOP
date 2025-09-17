import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar />
      <div className="flex-1 bg-green-50 bg-[linear-gradient(to-right,#8080800a_1px,transparent_1px),linear-gradient(to-bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <Manager />
      </div>
      <Footer /> 
    </div>
  )
}

export default App

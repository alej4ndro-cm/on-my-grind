import BaristaForm from './Components/BaristaForm'
import coffeeCup from './assets/coffee-cup-svgrepo-com.svg'

function App() {
  return (
    <div>
      <div className="title-container">
        <div className="title-with-logo">
          <img 
            src={coffeeCup} 
            alt="Coffee cup" 
            className="coffee-logo"
          />
          <h1 className="title">On My Grind</h1>
        </div>
        <p>So you think you can barista? Let's put that to the test...</p>
      </div>
      <BaristaForm />
    </div>
  )
}

export default App
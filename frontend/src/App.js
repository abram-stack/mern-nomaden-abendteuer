import { Container } from 'react-bootstrap'
import Footer from './components/Footer';
import Header from './components/Header';
import Homescreen from './screens/Homescreen';
import { BrowserRouter as Router,  Route, Routes} from 'react-router-dom'
import Productscreen from './screens/Productscreen';
import Cartscreen from './screens/Cartscreen';
import Signinscreen from './screens/Signinscreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {/* <Homescreen/> */}
          <Routes>
            <Route exact path='/' element={<Homescreen/>} />
            <Route path='/product/:id' element={<Productscreen />} />
            <Route path='/cart' element={<Cartscreen />} />
            <Route path='/signin' element={<Signinscreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

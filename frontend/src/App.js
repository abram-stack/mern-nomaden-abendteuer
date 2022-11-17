import { Container } from 'react-bootstrap'
import Footer from './components/Footer';
import Header from './components/Header';
import Homescreen from './screens/Homescreen';
import { BrowserRouter as Router,  Route, Routes} from 'react-router-dom'
import Productscreen from './screens/Productscreen';
import Cartscreen from './screens/Cartscreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

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
              {/* <Route path='/cart/:id?' element={<Cartscreen />} /> */}
             
           <Route path='/cart'>
              <Route path='' element={<Cartscreen/>} />
              <Route path=':id' element={<Cartscreen/>} />
           </Route> 
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

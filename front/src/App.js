import { MainPage } from "./component/MainPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Channel } from './component/Channel';
import { Video } from './component/Video';
import { Signup } from './component/Signup';
import { Login } from './component/Login';
import { Cabinet } from "./component/Cabinet";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<MainPage/>}/>

        <Route path="/signup" element={<Signup/>}/>

        <Route path="/login" element={<Login/>}/>

        <Route path="/cabinet" element={<Cabinet/>}/>

        <Route path="/channel">
          <Route path=":userid" element={<Channel />} />
        </Route>

        <Route path="/video">
          <Route path=":videoid" element={<Video />} />
        </Route>

        {/* <Route path="/events" element={<Events/>}>
          <Route path=":eventid" element={<SingleEvent />} />
        </Route> */}

        {/* <Route path='*' element={<NotFound/>} /> */}

      </Routes>
    </Router>
  );
}

export default App;

import { MainPage } from "./component/MainPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Channel } from './component/Channel';

function App() {
  return (
    // <DefaultContext.Provider value={{ toggleTheme, theme }}>
        <Router>
          <Routes>

            <Route path="/" element={<MainPage/>}/>

            <Route path="/channel">
              <Route path=":userid" element={<Channel />} />
            </Route>

            {/* <Route path="/comics" element={<Comics/>}>
              <Route path=":comicsid" element={<SingleComics />} />
            </Route>

            <Route path="/events" element={<Events/>}>
              <Route path=":eventid" element={<SingleEvent />} />
            </Route> */}

            {/* <Route path='*' element={<NotFound/>} /> */}

          </Routes>
        </Router>
    // </DefaultContext.Provider>
  );
}

export default App;

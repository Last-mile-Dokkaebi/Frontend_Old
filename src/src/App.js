import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home'
import LoginPage from './pages/login'

function App() {
    const backgroundStyle = {
        position: 'absolute',
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 250, 0.2)"
    }
    console.log("[App]Connected")
    return (
        <>
        <div style={backgroundStyle}>
            This is APP Page
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </div>
        </>
    );
}

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;

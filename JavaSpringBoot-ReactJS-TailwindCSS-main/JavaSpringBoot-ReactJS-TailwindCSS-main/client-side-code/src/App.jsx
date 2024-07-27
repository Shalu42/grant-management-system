import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css'
import NavBar from './components/common/navBar'

function App() {

  const location = useLocation();

  // Initialize selectedMenu based on the pathname
  const initialMenu = location.pathname.replace('/', '');
  const [selectedMenu, setSelectedMenu] = useState(initialMenu);

  // Use useEffect to update the state when the location changes
  useEffect(() => {
    const menu = location.pathname.replace('/', '');
    setSelectedMenu(menu);
  }, [location]); // Dependency array includes location to react to changes in location

  return (
    <>
      <NavBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <h1 className="bg-yellow-950 rounded-xl text-white p-4 mb-4"></h1>

      <Outlet />  {/* This is where nested routes will be rendered */}
    </>
  )
}

export default App

import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import AddModal from "./components/AddModal";
import MenuModal from "./components/MenuModal";
import Modal from './components/Modal';
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Routers from "./routers/Routers";
function App() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const isOpenMenu = useSelector((state) => state.menuModal.isOpen);
  const isOpenAddModal =useSelector((state)=>state.addModal.isOpenAddModal)
  return (
    <>
      <Router>
        <Header />
        <Routers />
        <Footer />
        {isOpen ? <Modal /> : null}
        {isOpenMenu ? <MenuModal /> : null}
        {isOpenAddModal ? <AddModal /> : null}
      </Router>
    </>
  );
}

export default App;

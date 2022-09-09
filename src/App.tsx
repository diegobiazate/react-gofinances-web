import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal';
import { useState } from "react";

Modal.setAppElement('#root');

export function App() {
  const [isNewTransModalOpen, setIsNewTransModalOpen] = useState(false);

    function handleOpenNewTransModal(){
        setIsNewTransModalOpen(true);
    }

    function handleCloseNewTransModal(){
        setIsNewTransModalOpen(false);
    }

  return (
    <>
      <Header onOpenNewTransModal={handleOpenNewTransModal} />
      <Dashboard />

      <Modal isOpen={isNewTransModalOpen} onRequestClose={handleCloseNewTransModal}>
          <h2>Cadastrar</h2>
      </Modal>

      <GlobalStyle />
    </>
  );
}


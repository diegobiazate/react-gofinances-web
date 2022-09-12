import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal';
import { useState } from "react";
import { NewTransModal } from "./components/NewTransModal";
import { TransactionsProvider } from "./hooks/UseTransactions";

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
    <TransactionsProvider>
      <Header onOpenNewTransModal={handleOpenNewTransModal} />
      <Dashboard />
      <NewTransModal isOpen={isNewTransModalOpen} onRequestClose={handleCloseNewTransModal} />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/UseTransactions';

import { Container, TransContainerType, RadioBox } from "./styles";
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

interface NewTransModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransModal({isOpen, onRequestClose} : NewTransModalProps) {
    const {createTransaction} = useTransactions();

    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);

    async function handeCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({title, amount, category, type});

        setType('deposit');
        setTitle('');
        setCategory('');
        setAmount(0);
        onRequestClose();
    }

    return(
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName='react-modal-overlay' className='reac-modal-content'>

            <button type='button' onClick={onRequestClose} className="close-modal">
                <img src={closeImg} alt="Fechar Modal" />
            </button>

            <Container onSubmit={handeCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input type="text" placeholder='Título' value={title} onChange={event => setTitle(event.target.value)} />
                <input type="number" placeholder='valor' value={amount} onChange={event => setAmount(Number(event.target.value))} />
                
                <TransContainerType>
                    <RadioBox type='button' onClick={()=> { setType('deposit'); }} isActive={type === 'deposit'} activeColor='green'>
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox type='button' onClick={()=> { setType('withdraw'); }} isActive={type === 'withdraw'} activeColor='red'>
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransContainerType>

                <input type="text" placeholder='Categoria' value={category} onChange={event => setCategory(event.target.value)} />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>

        </Modal>
    );
}
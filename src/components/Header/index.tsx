import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
    onOpenNewTransModal: () => void;
}

export function Header( {onOpenNewTransModal} : HeaderProps) {
    
    return(
        <Container>
            <Content>
            <img src={logo} alt="dt money" />
            <button type="button" onClick={onOpenNewTransModal}>
                Nova Transação
            </button>
            </Content>
        </Container>
    )
}
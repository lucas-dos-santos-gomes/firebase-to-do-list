import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as S from './style';
import { useContext } from 'react';
import { ThemeContext } from "../../contexts/theme";

export default function AddListItem({ value, onChange, placeholder, onClick, isLoading }) {
  const { theme } = useContext(ThemeContext);

  return(
    <S.Container>
      <S.Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        theme={theme}
      />
      <S.InputButton type='button' onClick={onClick} disabled={isLoading}>
        <FontAwesomeIcon icon={isLoading ? faSpinner : faPlus} size='xl' spinPulse={isLoading} /> 
      </S.InputButton>
    </S.Container>
  );
}
import * as PropTypes from 'prop-types';
import { useContext, useState, forwardRef } from "react";
import { ThemeContext } from "../../contexts/theme";
import * as S from "./style";

const SignInput = forwardRef(({type, onFocus, user, ...props}, ref) => {
  const [focus, setFocus] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <S.Container theme={theme} className={focus && 'focus'}>
      <img src={`/svg/${user ? 'user' : type}-${theme}.svg`} alt="" />
      <S.Input 
        ref={ref}
        theme={theme} 
        type={type}
        onFocus={() => {
          onFocus && onFocus();
          setFocus(true);
        }} 
        onBlur={() => setFocus(false)} 
        minLength={type === 'password' ? 8 : 0}
        maxLength={type === 'password' ? 24 : 50}
        {...props}
      />
    </S.Container>
  );
});

SignInput.propTypes = {
  type: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  user: PropTypes.bool
}

SignInput.displayName = 'SignInput';
export default SignInput;
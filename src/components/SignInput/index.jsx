import * as PropTypes from 'prop-types';
import { useContext, useState, forwardRef, useEffect } from "react";
import { ThemeContext } from "../../contexts/theme";
import * as S from "./style";

const SignInput = forwardRef(({type, onFocus, ...props}, ref) => {
  const [focus, setFocus] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => console.log(focus), [focus]);

  return (
    <S.Container theme={theme} className={focus && 'focus'}>
      <img src={`/svg/${type}-${theme}.svg`} alt="" />
      <S.Input 
        ref={ref}
        theme={theme} 
        onFocus={() => {
          onFocus && onFocus();
          setFocus(true);
        }} 
        onBlur={() => setFocus(false)} 
        {...props}
      />
    </S.Container>
  );
});

SignInput.propTypes = {
  type: PropTypes.string.isRequired,
  onFocus: PropTypes.func
}

SignInput.displayName = 'SignInput';
export default SignInput;
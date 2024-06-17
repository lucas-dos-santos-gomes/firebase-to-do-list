import { useContext, useState, forwardRef } from "react";
import { ThemeContext } from "../../contexts/theme";
import * as S from "./style";

const SignInput = forwardRef((props, ref) => {
  const [focus, setFocus] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <S.Container theme={theme} className={focus && 'focus'}>
      <img src={`/svg/signup-${theme}.svg`} alt="" />
      <S.Input 
        ref={ref}
        theme={theme} 
        onFocus={() => setFocus(true)} 
        onBlur={() => setFocus(false)} 
        {...props}
      />
    </S.Container>
  );
});

SignInput.displayName = 'SignInput';

export default SignInput;
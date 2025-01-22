import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './redirect-block.module.css';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

type Props = {
  text: string;
  buttonLabel: string;
  pathname: string;
};

const RedirectBlock: FC<Props> = ({ text, buttonLabel, pathname }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(pathname);
  };

  return (
    <div className={`${style.redirectLink} ${'mb-4'}`}>
      <p className='text text_type_main-default text_color_inactive pr-2'>
        {text}
      </p>
      <Button
        htmlType='button'
        type='secondary'
        size='medium'
        style={{ padding: 0 }}
        onClick={onClick}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default RedirectBlock;

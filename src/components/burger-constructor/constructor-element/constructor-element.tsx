import style from './constructor-element.module.css';
import { FC } from 'react';

type Props = {
  text: string;
  borderColor: string;
  position?: 'top' | 'bottom';
};

const CustomConstructorElement: FC<Props> = ({
  text,
  borderColor,
  position,
}) => {
  return (
    <div
      className={`${
        position
          ? `constructor-element constructor-element_pos_${position}`
          : 'constructor-element'
      } ${style.сonstructorElement}`}
      style={{
        border: borderColor,
      }}
    >
      <p className='text text_type_main-default'>{text}</p>
    </div>
  );
};

export default CustomConstructorElement;

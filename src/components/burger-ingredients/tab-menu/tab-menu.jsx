import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

const TabMenu = () => {
  const [current, setCurrent] = useState('one');

  return (
    <>
      <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </>
  );
};

export default TabMenu;

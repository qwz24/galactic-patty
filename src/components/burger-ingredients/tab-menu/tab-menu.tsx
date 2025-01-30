import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};
const TabMenu: FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <Tab
        value='bun'
        active={activeTab === 'bun'}
        onClick={() => setActiveTab('bun')}
      >
        Булки
      </Tab>
      <Tab
        value='sauce'
        active={activeTab === 'sauce'}
        onClick={() => setActiveTab('sauce')}
      >
        Соусы
      </Tab>
      <Tab
        value='main'
        active={activeTab === 'main'}
        onClick={() => setActiveTab('main')}
      >
        Начинки
      </Tab>
    </>
  );
};

export default TabMenu;

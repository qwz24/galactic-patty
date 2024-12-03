import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const TabMenu = ({ activeTab, setActiveTab }) => {
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

TabMenu.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default TabMenu;

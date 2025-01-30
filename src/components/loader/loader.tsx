import { FC } from 'react';
import style from './loader.module.css';

const Loader: FC = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;

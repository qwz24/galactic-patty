import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import style from './render-main.module.css';
import { TIngredient } from '../../../../types';
import type { Identifier, XYCoord } from 'dnd-core';

type Props = {
  main: TIngredient;
  handleClose: () => void;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
};

type TItem = {
  id: string;
  index: number;
  type: string;
};

const RenderMain: FC<Props> = ({ main, handleClose, index, moveItem }) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, dropTarget] = useDrop<TItem, void, { handlerId: Identifier | null }>(
    {
      accept: 'main',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }

        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        const clientOffset = monitor.getClientOffset();
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    }
  );

  const [{ isDrag }, dragRef] = useDrag({
    type: 'main',
    item: () => ({
      id: main.id,
      type: main.type,
      index,
    }),
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const opacity = isDrag ? 0 : 1;

  dragRef(dropTarget(ref));

  return (
    <li
      className={`mb-4 pr-2 ${style.listItem} ${isDrag ? style.dragging : ''}`}
      style={{ opacity }}
      key={main.id}
      ref={ref}
    >
      <DragIcon type='primary' className='mr-2' />
      <ConstructorElement
        text={main.name}
        price={main.price}
        thumbnail={main.image}
        handleClose={handleClose}
      />
    </li>
  );
};

export default RenderMain;

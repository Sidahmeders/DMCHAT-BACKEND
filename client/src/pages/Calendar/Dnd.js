import { useDrag, useDrop } from 'react-dnd'
import { Tr } from '@chakra-ui/react'

const DND_TYPE = 'BUTTON'

export const TrDragWrapper = ({ id, children }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: DND_TYPE,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <Tr ref={dragRef} className={`drag-wrapper ${isDragging ? 'dragging' : ''}`}>
      {children}
    </Tr>
  )
}

export const DropWrapper = ({ children }) => {
  const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
    accept: DND_TYPE,
    drop: ({ id }) => {
      console.log(id)
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }))

  return (
    <div ref={dropRef} className={`drop-wrapper ${canDrop && isOver ? 'dropping' : ''}`}>
      {children}
    </div>
  )
}

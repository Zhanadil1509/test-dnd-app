import React from 'react';
import {Card} from "react-bootstrap";
import { useDrop } from 'react-dnd'

const DndBlock = ({title, img, question, item, children, onDrop}) => {

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: question,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return (
    <Card ref={drop}>
      <Card.Img src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
};

export default DndBlock;
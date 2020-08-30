import React from 'react';
import {FormControl, InputGroup} from "react-bootstrap";
import { useDrag } from 'react-dnd'

const DndInput = ({question, checkTrue, handleChange, answer, id}) => {

  const [{ opacity }, drag] = useDrag({
    item: { name:question, type: question },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })

  return (
    <InputGroup ref={checkTrue ? drag : null}>
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">{question}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder={checkTrue ? answer : 'ответ'}
        aria-label="answer"
        aria-describedby="basic-addon1"
        onChange={handleChange}
        maxLength="10"
        type='number'
        name={id}
      />
    </InputGroup>
  );
};

export default DndInput;
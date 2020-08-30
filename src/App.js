import React, {useCallback, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import {data} from "./fakeData";
import './App.css';
import DndBlock from "./components/dndBlock";
import DndInput from "./components/dndInput";

const App = () => {

  const [isValue, setIsValue] = useState('')
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  const [dustbins, setDustbins] = useState(data)

  const handleChange = (e) => {
    const {name, value} = e.target
    setIsValue(prevState => ({...prevState, [name]: value}))
  }

  const handleDrop = useCallback((i, item) => {
    const { name } = item
    setDroppedBoxNames(
      update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
    )
    setDustbins(
      update(dustbins, {
        [i]: {
          lastDroppedItem: {
            $set: item,
          },
        },
      }),
    )
  }, [droppedBoxNames, dustbins])
  console.log(data)

  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const threeBlocks = () => dustbins.map((v, i) => {
    const checkTrue = Object.values(isValue).join() === v.answer
    return (
      <Row key={i}>
        <Col>
          <DndBlock
            title={v.title}
            img={v.img}
            question={v.question}
            item={i}
            onDrop={(item) => handleDrop(i, item)}
          >
            {v.lastDroppedItem && <DndInput
              handleChange={handleChange}
              checkTrue={checkTrue}
              question={v.question}
              isValue={isValue}
              item={i}
            />}
          </DndBlock>
          {v.lastDroppedItem === null &&
            <DndInput
              isDropped={isDropped(v.question)}
              handleChange={handleChange}
              checkTrue={checkTrue}
              question={v.question}
              isValue={isValue}
              item={i}
            />
          }
        </Col>
      </Row>
    )
  })

  return (
    <div className="App">
      <h1>This App</h1>
      <Container className='d-flex'>
        <DndProvider backend={HTML5Backend}>
          {threeBlocks()}
        </DndProvider>
      </Container>
    </div>
  );
}

export default App;

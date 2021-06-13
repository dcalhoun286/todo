import React from 'react';
import { useState, useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { SiteContext } from '../context/context.js';

function TodoList (props) {

  const siteInformation = useContext(SiteContext);

  const hideComplete = (e) => {
    siteInformation.changeHideCompleteTo(true);
  }

  const handleDelete = (e) => {
    siteInformation.handleDel
  }

  return (

    <ListGroup as="ul">
      {props.list.map(item => 
        <ListGroupItem as="li" className={`complete-${item.complete.toString()}`} key={item._id} onClick={() => props.handleComplete(item._id)}>{item.text}
          <span onClick={() => props.handleDelete(item._id)}>{`DELETE`}</span>
          <span onClick={() => hideComplete(item._id)}>Hide from view</span>
        </ListGroupItem>
      )}
    </ListGroup>

  );

}

export default TodoList;

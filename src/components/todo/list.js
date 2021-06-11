import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

function TodoList (props) {

  return (

    <ListGroup as="ul">
      {props.list.map(item => 
        <ListGroupItem as="li" className={`complete-${item.complete.toString()}`} key={item._id} onClick={() => props.handleComplete(item._id)}>{item.text}
          <span onClick={() => props.handleDelete(item._id)}>{`DELETE`}</span>
        </ListGroupItem>
      )}
    </ListGroup>

  );

}

export default TodoList;

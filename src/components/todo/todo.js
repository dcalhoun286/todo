import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAxios from 'axios-hooks';
import axios from 'axios';

import './todo.scss'; 

function ToDo (props) {

  const[list, setList] = useState([]);

  const [{data, loading, error}, refetch] = useAxios({url: 'https://api-js401.herokuapp.com/api/v1/todo', method: 'GET'});

  const addItem = async item => {

    let url = 'https://api-js401.herokuapp.com/api/v1/todo';
    item.complete = false;

    await axios.post(url, item);
    let updatedList = list.map(listItem => listItem._id === item._id ? item : listItem);
    setList(updatedList);
    refetch();
  }

  const toggleComplete = async id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`;
      let changedItem = await axios.put(url, item);
      let updatedList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(updatedList);
      refetch();
    }
  }

  const deleteItem = async id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      let url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`;
      let deletedItem = await axios.delete(url, item);
      let updatedList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(updatedList);
      refetch();
    }
  }

  useEffect(() => {

    if (!loading) {
      setList(data.results);
    }
  
  }, [loading, data]);

  return (
  
    <>
      <header>
        <h2>
        { list.length ? `There are ${list.filter(item => !item.complete).length} Items To Complete` : `Your task list is empty.` }
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm todoHandleSubmit={addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
            handleDelete={deleteItem}
          />
        </div>
      </section>
    </>
  );
}

export default ToDo;

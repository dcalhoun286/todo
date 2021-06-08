import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
// import useGetAll from '../get.js';
// import { useGetData } from 'use-axios-react';
// import { useGetCallback } from 'use=axios-react';
import useAxios from 'axios-hooks';
import axios from 'axios';

import './todo.scss'; 

function ToDo (props) {

  const[list, setList] = useState([]);

  const [{data, loading, error}, refetch] = useAxios({url: 'https://api-js401.herokuapp.com/api/v1/todo', method: 'GET'});

  console.log(data);

  const addItem = async item => {
    // this code below should look similar to what toggleComplete is, making an HTTP request to the server when trying to add an item (POST)

    console.log('the item we want to post to the api', item);

    // item._id = Math.random();

    let url = 'https://api-js401.herokuapp.com/api/v1/todo';
    item.complete = false;

    let addedItem = await axios.post(url, item);
    // item._id = addedItem.data._id;
    console.log('added item:', item);
    let updatedList = list.map(listItem => listItem._id === item._id ? item : listItem);
    setList(updatedList);
    // refetch();
  }

  const toggleComplete = async id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`;
      let changedItem = await axios.put(url, item);
      console.log(changedItem);
      let updatedList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(updatedList);
      refetch();
    }
  }

  // simulate componentDidUpdate ... every render this is going to happen if the data  list has changed

  useEffect(() => {
    // const [data] = useGetData('https:api-js401.herokuapp.com/api.v1/todo');
    // console.log(data);
    if (!loading) {
      setList(data.results);
    }
  }, [loading, data]);

  // useEffect(() => {
  //   console.log('this runs every time: ToDo component rendered itself');
  //   let updatedList = [
  //     { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
  //     { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
  //     { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
  //     { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
  //     { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
  //   ];

    // setList(updatedList);

  // }, []);

  // function components do not render like classes, they just return

  return (
    <>
      <header>
        <h2>
        There are {list.filter(item => !item.complete).length} Items To Complete
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
          />
        </div>
      </section>
    </>
  );
}

export default ToDo;

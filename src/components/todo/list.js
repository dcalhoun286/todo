import React from 'react';

function TodoList (props) {

  // props.list.forEach(item => {
  //   // console.log('is item complete?', item.complete);
  //   // console.log('item id', item._id);
  //   console.log('trying to render shit', item);
  // });
 
  // console.log('state being rendered', props.list);

  return (
    <ul>
      {props.list.map(item => (

        <li
          className={`complete-${item.complete.toString()}`}
          key={item._id}
        >
          <span onClick={() => props.handleComplete(item._id)}>
            {item.text}
          </span>
        </li>
      ))}
    </ul>

  );

}

// class TodoList extends React.Component {

//   render() {
//     return (
//       <ul>
//         {this.props.list.map(item => (
//           <li
//             className={`complete-${item.complete.toString()}`}
//             key={item._id}
//           >
//             <span onClick={() => this.props.handleComplete(item._id)}>
//               {item.text}
//             </span>
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }

export default TodoList;

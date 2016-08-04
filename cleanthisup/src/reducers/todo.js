export default function todo(state = {}, action = {}) {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        [action.data.id]: action.data, //should be object with {text: , active:}
      });
    case 'REMOVE_TODO':
      let temp = Object.assign({}, state);
      delete temp[action.data.id];
      return temp;
    case 'TOGGLE_TODO':
      temp = Object.assign({}, state);
      temp[action.data.id].active = !temp[action.data.id].active;
      return temp;
    default:
      return state;
  }
}

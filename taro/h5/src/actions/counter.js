import { ADD, MINUS } from '../constants/counter';

export const add = () => {
  return {
    type: ADD,
  };
};
export const minus = () => {
  return {
    type: MINUS,
  };
};

const delay = time => {
  return new Promise((res, rej) => {
    setTimeout(res, time);
  });
};

// 异步的action
export async function asyncAdd() {
  return dispatch => {
    setTimeout(() => {
      dispatch(add());
    }, 2000);
  };
}

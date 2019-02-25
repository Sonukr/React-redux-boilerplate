
import { GetData } from '../actions/getData';

const initialState = [];

export function initialData (state = initialState ,action) {
  switch (action.type) {
  case GetData.typeName():
    return action.payload;
  default:
    return state;
  }
}
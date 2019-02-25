export interface Action {
  +type;
  +payload;
  
  constructor (payload);
  plainAction ();
}
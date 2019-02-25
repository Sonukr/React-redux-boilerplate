import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import { HomePage } from './home';
// import our Main Reducer
import { Reducer } from '../../reducer/index';

/*
 * The Provider component provides
 * the React store to all its child
 * components so we don't need to pass
 * it explicitly to all the components.
 */
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';

/* Redux persist handle the Ui rendering and state on refresh. 
 * persistStore will create a persist store and Persistgate delays the 
 * rendering of your app's UI until your persisted state has been retrieved and saved to redux.
 * NOTE the PersistGate loading prop can be null, or any react instance, e.g. loading={<Loading />}
*/ 
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import reduxMiddlewares from  '../../middlewares/redux-middleware';

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
}
// create a persist reducer with existing main reducer.
const persistedReducer = persistReducer(persistConfig, Reducer)

export class Home extends Component {

    constructor(props) {
        super(props);

        const initialState = {};
        /*
        * The enhancer are passed when
        * creating the Redux store to
        * add some extra functionality.
        *
        * In this case we add a logger
        * middleware that write some debug
        * information every time the
        * state is changed.
        *
        * We also add the Redux DevTools
        * so we can easily debug the state.
        */
        const enhancer = compose(
            applyMiddleware(...reduxMiddlewares)
        );
        
        /*
        * This creates the store so we
        * can listen to changes and
        * dispatch actions.
        */
        //const store = createStore(Reducer,initialState,enhancer); // Store with main reducer, initialState and enhancer(middleware).
        const store = createStore(persistedReducer,initialState,enhancer); // Store with persistedReducer is new store which wraps the main reducer
        this.store = store;
        /* or we can write in a single function.
        *
        */ 
        // this.store =compose(
        //     applyMiddleware(logger)
        // )(createStore)(Reducer);

        /* creating a persist store and passing our existing reducer store into that.
         * It will create a localstoreage store, which will handle your state on page refresh.
        */ 
        this.persistor = persistStore(this.store);
    }


  render() {
    return (
        //  Provider component which makes the Redux store available to all its descendants. Without this component you would have to pass the store as a prop to all the components that need it.
      <Provider store={this.store}>
          {/* Persistgate delays the rendering of your app's UI until your persisted state has been retrieved and saved to redux. */}
          <PersistGate loading={null} persistor={this.persistor}>
            <Router>
                <Route  path="/" component={HomePage}/>
            </Router>
          </PersistGate>
      </Provider>
    );
  }
}
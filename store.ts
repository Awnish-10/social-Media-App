// store.ts
import { createStore, applyMiddleware, Store } from 'redux';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Actions
const ADD_POST = 'ADD_POST';
const ADD_USER = 'ADD_USER';
const UPDATE_POST = 'UPDATE_POST';
const CHANGE_USER ='CHANGE_USER';
const DELETE_POST = 'DELETE_POST';

const changeUser = (user: User | null) => ({
  type: CHANGE_USER,
  payload: user,
});

const addPost = (post: Post) => ({
  type: ADD_POST,
  payload: post,
});

const addUser = (user: User) => ({
  type: ADD_USER,
  payload: user,
});


const updatePost = (post: Post) => ({
  type: UPDATE_POST,
  payload: post,
});
const deletePost = (post: Post) => ({
  type: DELETE_POST,
  payload: post,
});

// Types

type Comment = {
  user:User;
  text: string
}

type Post = {
  id:string;
  title: string;
  desc: string;
  likes:User[]
  comments:Comment[];
  user:User
};
type User = {
  id:string;
  name:string;
  password:string;
}
type AppState = {
  posts: Post[];
  users:User[];
  currentUser:User | null
};

// Reducers
const initialState: AppState = {
  posts: [],
  users:[],
  currentUser:null
};

const rootReducer = (state: AppState = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
      case ADD_USER:
        return {
          ...state,
          users: [...state.users, action.payload],
        };

    case UPDATE_POST:
      const updatedIndex = state.posts.findIndex((post: Post) => post.id === action.payload.id);
      if (updatedIndex !== -1) {
        const updatedPosts = [...state.posts];
        updatedPosts[updatedIndex] = action.payload;
        return {
          ...state,
          posts: updatedPosts,
        };
      }
      return state;
      case DELETE_POST:
        const filteredPosts = state.posts.filter((post: Post) => {return post.id != action.payload.id});

          return {
            ...state,
            posts: filteredPosts,
          };
        
      
    default:
      return state;
  }
};

// Configuring Redux Persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['matches'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store and persistor
const store: Store<AppState, any, any> = createStore(persistedReducer);
const persistor: Persistor = persistStore(store);

export { store, persistor, addPost, addUser, updatePost, changeUser,deletePost };

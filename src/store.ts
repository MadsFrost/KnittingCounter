import { configureStore } from '@reduxjs/toolkit'
import KnitCounter from './features/KnitCounter'
import KnitProject from './features/KnitProject'
export const store = configureStore({
  reducer: {
    knitCounter: KnitCounter,
    knitProject: KnitProject
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
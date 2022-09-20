import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { KnitCounter } from '../types'

const initialState: KnitCounter = {
  id: 0,
  cycle: 0,
  minCycle: 0,
  maxCycle: 100,
  name: 'No Counter Selected',
}

export const knitCounterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCurrentKnitCounter: (state, action: PayloadAction<KnitCounter>) => {
        state = action.payload
    },
    increment: (state) => {
        if (state.cycle + 1 <= state.maxCycle) {
            state.cycle += 1
        }
    },
    decrement: (state) => {
        if (state.cycle - 1 >= state.minCycle) {
            state.cycle -= 1
        }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentKnitCounter, increment, decrement } = knitCounterSlice.actions

export default knitCounterSlice.reducer
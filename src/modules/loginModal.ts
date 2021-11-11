import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const loginModal = createSlice({
  name: 'loginModalReducer',
  initialState: false,
  reducers: {
    setModalOpen: (state: boolean, action: PayloadAction<boolean>) => {
      return action.payload
    },
  },
})

export const { setModalOpen } = loginModal.actions
export default loginModal.reducer

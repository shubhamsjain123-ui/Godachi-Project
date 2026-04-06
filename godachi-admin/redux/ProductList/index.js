import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'productList',
  initialState: { 
    pageNumber:1,
    pageSize:50  
  },
  reducers: {
    setPageDetails: (state, { payload: payload }) => {
      state.pageNumber=payload.page;
      state.pageSize=payload.pageSize;
    },
  },
})

export const { setPageDetails } = slice.actions

export default slice.reducer

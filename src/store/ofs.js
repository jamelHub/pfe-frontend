import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'ofs',
  initialState: {
    items: {},
  },
  reducers: {
    update(state, action) {
      action.payload.forEach((item) => (state.items[item.id] = item));
    },
  },
});

export { actions as ofsActions };
export { reducer as ofsReducer };
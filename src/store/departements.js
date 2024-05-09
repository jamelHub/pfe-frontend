import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'departements',
  initialState: {
    items: {},
  },
  reducers: {
    update(state, action) {
      action.payload.forEach((item) => state.items[item.id] = item);
    },
  },
});

export { actions as departementsActions };
export { reducer as departementsReducer };
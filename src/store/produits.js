import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'produits',
  initialState: {
    items: {},
  },
  reducers: {
    update(state, action) {
      action.payload.forEach((item) => state.items[item.id] = item);
    },
  },
});

export { actions as produitsActions };
export { reducer as produitsReducer };
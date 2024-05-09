import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'users',
  initialState: {
    items: {},
  },
  reducers: {
    update(state, action) {
      action.payload.forEach((item) => (state.items[item.id] = item));
    },
  },
});

export { actions as usersActions };
export { reducer as usersReducer };
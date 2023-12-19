import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCard = createAsyncThunk("users/getCard", async (id) => {
  const response = await fetch(`https://api.legpromrf.ru/order_cards/${id}`);
  return await response.json();
});

export const getTechnology = createAsyncThunk(
  "users/getTechnology",
  async (id) => {
    const response = await fetch(
      `https://api.legpromrf.ru/order_cards/${id}/technology`
    );
    return await response.json();
  }
);

export const getOther = createAsyncThunk("users/getOther", async (id) => {
  const response = await fetch(
    `https://api.legpromrf.ru/order_cards/${id}/other`
  );
  return await response.json();
});

export const getRequirements = createAsyncThunk(
  "users/getRequirements",
  async (id) => {
    const response = await fetch(
      `https://api.legpromrf.ru/order_cards/${id}/requirements`
    );
    return await response.json();
  }
);

export const getFiles = createAsyncThunk("users/getFiles", async (id) => {
  const response = await fetch(
    `https://api.legpromrf.ru/order_cards/${id}/files`
  );
  return await response.json();
});

export const viewTzSlice = createSlice({
  name: "viewTz",
  initialState: {
    loading: false,
    technologyLoading: false,
    otherLoading: false,
    requirementsLoading: false,
    filesLoading: false,
    item: {},
    technology: {},
    other: {},
    requirements: {},
    files: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCard.fulfilled, (state, action) => {
        state.item = action.payload;
        state.loading = false;
      });

    builder
      .addCase(getTechnology.pending, (state) => {
        state.technologyLoading = true;
      })
      .addCase(getTechnology.fulfilled, (state, action) => {
        state.technology = action.payload;
        state.technologyLoading = false;
      });

    builder
      .addCase(getOther.pending, (state) => {
        state.otherLoading = true;
      })
      .addCase(getOther.fulfilled, (state, action) => {
        state.other = action.payload;
        state.otherLoading = false;
      });

    builder
      .addCase(getRequirements.pending, (state) => {
        state.requirementsLoading = true;
      })
      .addCase(getRequirements.fulfilled, (state, action) => {
        state.requirements = action.payload;
        state.requirementsLoading = false;
      });

    builder
      .addCase(getFiles.pending, (state) => {
        state.filesLoading = true;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.files = action.payload;
        state.filesLoading = false;
      });
  },
});

// export const {} = procRegisterSlice.actions;
export default viewTzSlice.reducer;

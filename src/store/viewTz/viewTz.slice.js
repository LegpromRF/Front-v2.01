import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCard = createAsyncThunk("users/getCard", async (id) => {
  const response = await fetch(`https://api.legpromrf.ru/order_cards/${id}`);

  if (!response.ok) {
    throw new Error("Bad Request");
  }

  return await response.json();
});

export const getTechnology = createAsyncThunk(
  "users/getTechnology",
  async (id) => {
    const response = await fetch(
      `https://api.legpromrf.ru/order_cards/${id}/technology`
    );

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Bad Request: Invalid parameters");
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    }

    return await response.json();
  }
);

export const getOther = createAsyncThunk("users/getOther", async (id) => {
  const response = await fetch(
    `https://api.legpromrf.ru/order_cards/${id}/other`
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Bad Request: Invalid parameters");
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  }

  return await response.json();
});

export const getRequirements = createAsyncThunk(
  "users/getRequirements",
  async (id) => {
    const response = await fetch(
      `https://api.legpromrf.ru/order_cards/${id}/requirements`
    );

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Bad Request: Invalid parameters");
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    }

    return await response.json();
  }
);

export const getFiles = createAsyncThunk("users/getFiles", async (id) => {
  const response = await fetch(
    `https://api.legpromrf.ru/order_cards/${id}/files`
  );
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Bad Request: Invalid parameters");
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  }

  return await response.json();
});

export const getCustomer = createAsyncThunk("users/customer", async (id) => {
  const response = await fetch(
    `https://api.legpromrf.ru/order_cards/${id}/customer`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return await response.json();
});

export const getPaylink = createAsyncThunk("users/paylink", async (id) => {
  const response = await fetch(
    `https://api.legpromrf.ru/order_cards/${id}/paylink`,
    {
      credentials: "include",
    }
  );
  return await response.json();
});

export const viewTzSlice = createSlice({
  name: "viewTz",
  initialState: {
    loading: false,
    itemError: false,
    technologyLoading: false,
    otherLoading: false,
    requirementsLoading: false,
    filesLoading: false,
    filesError: false,
    customerLoading: false,
    customerError: false,
    paylinkLoading: false,
    item: {},
    technology: {},
    other: {},
    requirements: {},
    files: {},
    customer: {},
    paylink: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCard.pending, (state) => {
        state.loading = true;
        state.itemError = false;
      })
      .addCase(getCard.fulfilled, (state, action) => {
        state.item = action.payload;
        state.loading = false;
      })
      .addCase(getCard.rejected, (state) => {
        state.itemError = true;
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
        state.filesError = false;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.files = action.payload;
        state.filesLoading = false;
      })
      .addCase(getFiles.rejected, (state) => {
        state.filesError = true;
        state.filesLoading = false;
      });

    builder
      .addCase(getCustomer.pending, (state) => {
        state.customerLoading = true;
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.customerLoading = false;
      })
      .addCase(getCustomer.rejected, (state) => {
        state.customerError = true;
        state.customerLoading = false;
      });

    builder
      .addCase(getPaylink.pending, (state) => {
        state.paylinkLoading = true;
      })
      .addCase(getPaylink.fulfilled, (state, action) => {
        state.paylink = action.payload;
        state.paylinkLoading = false;
      });
  },
});

// export const {} = procRegisterSlice.actions;
export default viewTzSlice.reducer;

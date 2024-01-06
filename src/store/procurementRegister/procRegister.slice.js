import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearQuery } from "../../utils/helpers/procurementRegister";
import { QUERY_FILTERS } from "../../utils/constants/procurementRegister";

export const getAllFilters = createAsyncThunk("users/getFilters", async () => {
  const response = await fetch("https://api.legpromrf.ru/filters");
  return await response.json();
});

export const getAllCards = createAsyncThunk("users/getCards", async (query) => {
  const response = await fetch(`https://api.legpromrf.ru/order_cards?${query}`);
  const cards = await response.json() 
  return cards || [];
});

export const procRegisterSlice = createSlice({
  name: "procRegister",
  initialState: {
    open: false,
    filters: null,
    cards: [],
    loading: false,
    pageNumber: 1,
    query: {
      clothes_type__name__in: "",
      location__name__in: "",
      purpose__name__in: "",
      raw_materials__name__in: "",
      purchase_type__name__in: "",
      status__name__in: "",
      count__gte: "",
      count__lte: "",
      price_for_all__gte: "",
      price_for_all__lte: "",
      deadline__gte: "",
      deadline__lte: "",
    },
  },
  reducers: {
    changeSelect(state, action) {
      state.query[QUERY_FILTERS[action.payload.name]] = action.payload.value;
    },
    openFilters(state, action) {
      state.open = !action.payload;
    },
    clearFilters(state) {
      state.query = clearQuery(state.query);
    },
    changePage(state, action) {
      state.pageNumber = action.payload;
    },
    changeQuantity(state, action) {
      if (action.payload.type === "min") {
        state.query.count__gte = action.payload.value;
      } else if (action.payload.type === "max") {
        state.query.count__lte = action.payload.value;
      }
    },
    changeBudget(state, action) {
      if (action.payload.type === "min") {
        state.query.price_for_all__gte = action.payload.value;
      } else if (action.payload.type === "max") {
        state.query.price_for_all__lte = action.payload.value;
      }
    },
    changeDate(state, action) {
      if (action.payload.type === "min") {
        state.query.deadline__gte = `${action.payload.value}T00:00:00`;
      } else if (action.payload.type === "max") {
        state.query.deadline__lte = `${action.payload.value}T00:00:00`;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.loading = false;
      })
      .addCase(getAllCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.loading = false;
      });
  },
});

export const {
  changeSelect,
  openFilters,
  clearFilters,
  changeQuantity,
  changeBudget,
  changeDate,
  changePage,
} = procRegisterSlice.actions;
export default procRegisterSlice.reducer;

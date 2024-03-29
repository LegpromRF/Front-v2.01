import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearQuery } from "../../utils/helpers/procurementRegister";
import { QUERY_FILTERS } from "../../utils/constants/procurementRegister";
import axios from "axios";

export const getAllFilters = createAsyncThunk("users/getFilters", async () => {
  const response = await fetch("https://api.legpromrf.ru/filters");
  return await response.json();
});

export const getAllCards = createAsyncThunk(
  "users/getCards",
  async (query, thunkAPI) => {
    const size = 40;
    const page = thunkAPI.getState().procRegister.pageNumber;
    const response = await axios.get(
      `https://api.legpromrf.ru/order_cards?${
        query ? query + "&" : ""
      }page=${page}&size=${size}`,
      { withCredentials: true }
    );
    const stateData = {
      pageNumber: response.data.page,
      countPages: response.data.pages,
      cards: response.data.items ?? [],
    };

    return stateData;
  }
);

export const getTotalCardsInfo = createAsyncThunk(
  "users/getTotalCardsInfo",
  async (query, thunkAPI) => {
    const response = await fetch(
      `https://api.legpromrf.ru/order_cards/order_count`
    );
    const data = await response.json();

    const stateData = {
      totalCards: data.order_count,
      totalSumCards: data.order_sum,
    };
    return stateData;
  }
);

export const procRegisterSlice = createSlice({
  name: "procRegister",
  initialState: {
    open: false,
    filters: null,
    cards: [], //на странице
    totalCards: null,
    totalSumCards: null,
    loading: false,
    pageNumber: 1,
    countPages: null,
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
        const { pageNumber, countPages, cards } = action.payload;

        cards.sort(
          (cardA, cardB) =>
            -new Date(cardA.created_at).getTime() +
            new Date(cardB.created_at).getTime()
        );
        console.log(cards);
        state.cards = cards;
        state.pageNumber = pageNumber;
        state.countPages = countPages;
        state.loading = false;
      })
      .addCase(getTotalCardsInfo.fulfilled, (state, action) => {
        const { totalCards, totalSumCards } = action.payload;
        state.totalCards = totalCards;
        state.totalSumCards = totalSumCards;
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

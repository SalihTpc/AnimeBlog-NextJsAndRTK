import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Anime {
  id: number;
  category: [];
  user: string;
  title: string;
  body: string;
  image: string;
  since_creation: string;
  comment_post: [];
  comments_count: number;
  like_post: [];
  likes_count: number;
  postview_post: [];
  postviews_count: number;
}

export type AnimeState = {
  anime: Anime[];
  pending: boolean;
  error: boolean;
  next: string;
  count: Number;
};

const initialState: AnimeState = {
  anime: [],
  pending: false,
  error: false,
  next: "",
  count: 0,
};

export const getAnime = createAsyncThunk("anime/getAnime", async () => {
  const response = await fetch("https://blogsato-drf.herokuapp.com/api/list/");
  return await response.json();
});

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.anime = [...state.anime, ...action.payload.results];
      state.next = action.payload.next;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnime.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAnime.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.anime = payload.results;
        state.next = payload.next;
        state.count = payload.count;
      })
      .addCase(getAnime.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { addBlog } = blogSlice.actions;
export default blogSlice.reducer;

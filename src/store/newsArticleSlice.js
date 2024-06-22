import { createSlice } from "@reduxjs/toolkit";

const intitialState = {
    article : [] ,
    trendingArticles : []
}

const articleSlice = createSlice({
    name : "article" ,
    initialState : intitialState ,
    reducers : {
        addArticle : (state , action) => {
            state.article.push(action.payload)
        },
        addTrendingArticle : (state, action) => {
            state.trendingArticles.push(action.payload)
        }
    }
})


export const {addArticle , addTrendingArticle} = articleSlice.actions

export default articleSlice.reducer

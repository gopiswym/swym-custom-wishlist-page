import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchWishlistCateogory = createAsyncThunk(
    'wishlist/fetchWishlistCateogory',
    async () => {
        return await new Promise((resolve, reject)=>{
            window._swat.fetchLists({
                callbackFn: (list)=>{
                    console.log('fetch wihslist category list', list);
                    resolve(list);
                },
                errorFn:(error)=>{
                    reject(error);
                }
            });
        });
    }
)

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState:{
        wishlist:[],
        wishlistCategory:[]
    },
    reducers:{
        setWishlistCateogry:(state, payload)=>{
            console.log('on wishlist dispatch', payload);
            state.wishlistCategory = payload.wishlistCategory;
        },
        fetchCategoryList:async(state)=>{
            let response = await new Promise((resolve, reject)=>{
                window._swat.fetchLists({
                    callbackFn: (list)=>{
                        console.log('fetch wihslist category list', list);
                        resolve(list);
                    },
                    errorFn:(error)=>{
                        reject(error);
                    }
                });
            });
            let data = await response;
            console.log('final list cateogry', data);
            state.wishlistCategory = data;
        },
        fetchWishList:(state, id)=>{
            window._swat.fetchLists({
                callbackFn: async(lists) => {
                    console.log("Fetched my lists", lists);
                    state.wishlist = await lists;
                },
                errorFn: (xhrObj)=>{
                // something went wrong
                }
            })
        }
    },
    extraReducers:{
        [fetchWishlistCateogory.fulfilled]:(state, action) =>{
            console.log('on action response', action);
            state.wishlistCategory = action.payload;
        }
    }
});

export const { fetchWishList, fetchCategoryList, setWishlistCateogry } = wishlistSlice.actions;

export default wishlistSlice.reducer;
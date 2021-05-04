export const handleFavorites=(isFavorite,city)=>({
 type: `${isFavorite}_FAVORITES`,
payload: city 
})

export const initialLocation=(initialCityKey)=>({
 type: 'CURRENT_CITY', 
 payload: {name:'Your location',Key:initialCityKey}
})

export const favoriteChose=(name,key)=>({
    type: 'CURRENT_CITY',
    payload: { name: name, Key: key },
   })

   export const handleCityClicked=(selectedCity)=>({
    type: 'CURRENT_CITY',
    payload: selectedCity
   })

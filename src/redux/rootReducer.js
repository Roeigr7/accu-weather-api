const initialState = {
  currentCity: {
    name: 'Your location',
    key: '215854',
  },
  favorites: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'CURRENT_CITY':
      return {
        ...state,
        currentCity: action.payload,
      };
    case 'ADD_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(
          fav => fav.key !== action.payload.key
        ),
      };
    case 'UPDATE_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
}

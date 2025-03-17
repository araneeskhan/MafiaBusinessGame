import React, { createContext, useContext, useReducer } from 'react';

// Initial state for character progression
const initialState = {
    stats: {
        strength: 1,
        intelligence: 1,
        charisma: 1,
    },
    skills: [],
};

// Create context
const CharacterContext = createContext();

// Reducer function to manage character state
const characterReducer = (state, action) => {
    switch (action.type) {
        case 'UPGRADE_STAT':
            return { ...state, stats: { ...state.stats, [action.payload]: state.stats[action.payload] + 1 } };
        case 'ADD_SKILL':
            return { ...state, skills: [...state.skills, action.payload] };
        default:
            return state;
    }
};

// Provider component
export const CharacterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(characterReducer, initialState);

    return (
        <CharacterContext.Provider value={{ state, dispatch }}>
            {children}
        </CharacterContext.Provider>
    );
};

// Custom hook to use the CharacterContext
export const useCharacter = () => useContext(CharacterContext); 
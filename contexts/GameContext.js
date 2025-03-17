import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { database, auth } from '../firebaseConfig'; // Import your Firebase config and auth
import { ref, onValue, set } from 'firebase/database'; // Import necessary Firebase functions
import { buildingConfig } from './BuildingConfig'; // Import the building configuration
import { businessConfig } from './BusinessConfig'; // Import business configuration
import Toast from 'react-native-toast-message';
import { gangMemberTypes, weaponTypes } from './GangConfig'; // Import gang member and weapon configurations

// Initial state
const initialState = {
    resources: {
        money: 1000, // Starting money for testing
        ammo: 0,
        weapons: [],
    },
    buildings: {
        blackMarket: 0,
        bank: 0,
        headquarters: 0,
        weaponFactory: 0,
        casino: 0,
        safeHouse: 0,
    },
    businesses: {}, // To hold the businesses the player owns
    alliances: [],
    gangMembers: [],
    weapons: [],
    stats: {
        totalAttack: 0,
        totalDefense: 0,
        totalHealth: 0,
        reputation: 0,
    },
};

// Create context
const GameContext = createContext();

// Reducer function to manage state
const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PLAYER_DATA':
            return { ...state, ...action.payload }; // Set player data from Firebase
        case 'ADD_MONEY':
            return { ...state, resources: { ...state.resources, money: state.resources.money + action.payload } };
        case 'ADD_AMMO':
            return { ...state, resources: { ...state.resources, ammo: state.resources.ammo + action.payload } };
        case 'ADD_WEAPON':
            return { ...state, resources: { ...state.resources, weapons: [...state.resources.weapons, action.payload] } };
        case 'UPGRADE_BUILDING':
            return { ...state, buildings: { ...state.buildings, [action.payload]: state.buildings[action.payload] + 1 } };
        case 'UPGRADE_BUSINESS':
            const business = state.businesses[action.payload];
            const upgradeCost = businessConfig[action.payload].upgradeCost;
            if (state.resources.money >= upgradeCost) {
                return {
                    ...state,
                    resources: { ...state.resources, money: state.resources.money - upgradeCost },
                    businesses: {
                        ...state.businesses,
                        [action.payload]: { ...business, level: business.level + 1, income: business.income + 50 }, // Increase income
                    },
                };
            } else {
                Toast.show({
                    text1: 'Insufficient Funds',
                    text2: `You need ${upgradeCost} money to upgrade ${action.payload}.`,
                    type: 'error',
                });
                return state;
            }
        case 'JOIN_ALLIANCE':
            return { ...state, alliances: [...state.alliances, action.payload] };
        case 'START_BUSINESS':
            const businessToStart = businessConfig[action.payload];
            if (state.resources.money >= businessToStart.startingCost) {
                return {
                    ...state,
                    resources: { ...state.resources, money: state.resources.money - businessToStart.startingCost },
                    businesses: {
                        ...state.businesses,
                        [action.payload]: { level: 1, income: businessToStart.baseIncome },
                    },
                };
            } else {
                Toast.show({
                    text1: 'Insufficient Funds',
                    text2: `You need ${businessToStart.startingCost} money to start ${action.payload}.`,
                    type: 'error',
                });
                return state;
            }
        case 'HIRE_GANG_MEMBER':
            const memberType = gangMemberTypes[action.payload];
            if (state.resources.money >= memberType.cost) {
                const newMember = {
                    id: Date.now(),
                    type: action.payload,
                    ...memberType,
                };
                return {
                    ...state,
                    resources: { ...state.resources, money: state.resources.money - memberType.cost },
                    gangMembers: [...state.gangMembers, newMember],
                    stats: {
                        ...state.stats,
                        totalAttack: state.stats.totalAttack + memberType.attack,
                        totalDefense: state.stats.totalDefense + memberType.defense,
                        totalHealth: state.stats.totalHealth + memberType.health,
                    },
                };
            }
            return state;
        case 'BUY_WEAPON':
            const weapon = weaponTypes[action.payload];
            if (state.resources.money >= weapon.cost) {
                const newWeapon = {
                    id: Date.now(),
                    type: action.payload,
                    ...weapon,
                };
                return {
                    ...state,
                    resources: { ...state.resources, money: state.resources.money - weapon.cost },
                    weapons: [...state.weapons, newWeapon],
                    stats: {
                        ...state.stats,
                        totalAttack: state.stats.totalAttack + weapon.attack,
                    },
                };
            }
            return state;
        default:
            return state;
    }
};

// Provider component
export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    // Fetch player data from Firebase
    const fetchPlayerData = (userId) => {
        const playerRef = ref(database, `players/${userId}`);
        onValue(playerRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                dispatch({ type: 'SET_PLAYER_DATA', payload: data });
            }
        });
    };

    // Update player data in Firebase
    const updatePlayerData = (userId, newData) => {
        const playerRef = ref(database, `players/${userId}`);
        set(playerRef, newData);
    };

    // Function to generate income every hour
    const generateIncome = () => {
        const totalIncome = Object.values(state.businesses).reduce((acc, business) => acc + business.income, 0);
        dispatch({ type: 'ADD_MONEY', payload: totalIncome });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            generateIncome();
        }, 60000); // Generate income every minute (60000 ms)

        return () => clearInterval(interval); // Cleanup on unmount
    }, [state]);

    // Add this function to handle logout
    const logout = async (userId) => {
        try {
            // Save current game state to Firebase
            await updatePlayerData(userId, state);
            await auth.signOut(); // Sign out the user
            Toast.show({
                text1: 'Logged Out',
                text2: 'You have successfully logged out.',
                type: 'success',
            });
        } catch (error) {
            console.error("Logout Error: ", error);
            Toast.show({
                text1: 'Logout Failed',
                text2: 'An error occurred while logging out.',
                type: 'error',
            });
        }
    };

    return (
        <GameContext.Provider value={{ state, dispatch, fetchPlayerData, updatePlayerData, logout }}>
            {children}
        </GameContext.Provider>
    );
};

// Custom hook to use the GameContext
export const useGame = () => useContext(GameContext);

// Function to add resources
const addResources = (dispatch, resourceType, amount) => {
    switch (resourceType) {
        case 'money':
            dispatch({ type: 'ADD_MONEY', payload: amount });
            break;
        case 'ammo':
            dispatch({ type: 'ADD_AMMO', payload: amount });
            break;
        case 'weapon':
            dispatch({ type: 'ADD_WEAPON', payload: amount }); // Assuming amount is the weapon name or object
            break;
        default:
            break;
    }
};

// Function to upgrade buildings
const upgradeBuilding = (dispatch, buildingType) => {
    const currentBuilding = state.buildings[buildingType];
    const upgradeCost = buildingConfig[buildingType].cost * (currentBuilding.level + 1); // Cost increases with level

    if (state.resources.money >= upgradeCost) {
        dispatch({ type: 'UPGRADE_BUILDING', payload: buildingType });
        updatePlayerData(user.uid, { buildings: { ...state.buildings, [buildingType]: { ...currentBuilding, level: currentBuilding.level + 1 } } }); // Update Firebase
    } else {
        Toast.show({
            text1: 'Insufficient Funds',
            text2: `You need ${upgradeCost} money to upgrade ${buildingType}.`,
            type: 'error',
        });
    }
};

// Function to join an alliance
const joinAlliance = (dispatch, allianceName) => {
    dispatch({ type: 'JOIN_ALLIANCE', payload: allianceName });
}; 
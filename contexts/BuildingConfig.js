export const buildingConfig = {
    blackMarket: {
        level: 0,
        cost: 100,
        benefits: {
            weapons: 5,
            ammo: 10,
        },
    },
    bank: {
        level: 0,
        cost: 200,
        benefits: {
            money: 50,
        },
    },
    headquarters: {
        level: 0,
        cost: 300,
        benefits: {
            alliances: 1,
        },
    },
    weaponFactory: {
        level: 0,
        cost: 150,
        benefits: {
            weapons: 3,
        },
    },
    casino: {
        level: 0,
        cost: 250,
        benefits: {
            money: 20,
            risk: 'high', // Indicates the risk of losing resources
        },
    },
    safeHouse: {
        level: 0,
        cost: 400,
        benefits: {
            secureStorage: true,
        },
    },
}; 
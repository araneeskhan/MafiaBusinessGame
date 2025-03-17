export const gangMemberTypes = {
    thug: {
        cost: 100,
        attack: 10,
        defense: 5,
        health: 100,
        salary: 50, // per hour
        description: 'Basic gang member, good for starting out',
    },
    enforcer: {
        cost: 300,
        attack: 25,
        defense: 15,
        health: 150,
        salary: 100,
        description: 'Specialized in intimidation and protection',
    },
    hitman: {
        cost: 500,
        attack: 40,
        defense: 10,
        health: 120,
        salary: 150,
        description: 'Expert in stealth and assassination',
    },
    bodyguard: {
        cost: 400,
        attack: 20,
        defense: 30,
        health: 200,
        salary: 120,
        description: 'Specialized in defense and protection',
    },
};

export const weaponTypes = {
    pistol: {
        cost: 200,
        attack: 15,
        accuracy: 70,
        description: 'Standard sidearm',
        type: 'Small Arms',
    },
    shotgun: {
        cost: 400,
        attack: 30,
        accuracy: 50,
        description: 'Powerful at close range',
        type: 'Heavy Weapons',
    },
    assaultRifle: {
        cost: 800,
        attack: 25,
        accuracy: 80,
        description: 'Versatile automatic weapon',
        type: 'Military Grade',
    },
    sniperRifle: {
        cost: 1000,
        attack: 40,
        accuracy: 95,
        description: 'Long-range precision weapon',
        type: 'Special',
    },
}; 
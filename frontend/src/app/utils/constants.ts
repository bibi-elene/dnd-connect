// regex to remove comments: \/\*.*?\*\/
// regex to capture jsx comments: \{\s*\/\*.*?\*\/\s*\}

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}
export const roleOptions = ['user', 'admin'];
export const classOptions = ['Fighter', 'Mage', 'Rogue'];
export const raceOptions = ['Elf', 'Orc', 'Human'];
export const backgroundOptions = ['Noble', 'Acolyte', 'Folk-Hero', 'Thief'];
export const skillsOptions = ['History', 'Athletics', 'Survival', 'Performance'];

export const characterImages: Record<string, Record<string, string>> = {
  Fighter: {
    Elf: '/assets/fighter_elf.jpeg',
    Orc: '/assets/fighter_orc.jpeg',
    Human: '/assets/fighter_human.jpg',
  },
  Mage: {
    Elf: '/assets/mage_elf.jpg',
    Orc: '/assets/mage_orc.jpg',
    Human: '/assets/mage_human.jpg',
  },
  Rogue: {
    Elf: '/assets/rogue_elf.jpg',
    Orc: '/assets/rogue_orc.jpg',
    Human: '/assets/rogue_human.jpg',
  },
};

export const characterClasses = [
  {
    name: 'Fighter',
    description: 'A master of martial combat, skilled with weapons and armor.',
    img: '/assets/fighter.jpg',
  },
  {
    name: 'Wizard',
    description: 'A scholarly magic-user capable of manipulating reality.',
    img: '/assets/wizard.jpg',
  },
  {
    name: 'Rogue',
    description: 'A scoundrel who uses stealth and trickery.',
    img: '/assets/rogue.jpg',
  },
  {
    name: 'Cleric',
    description: 'A priestly champion wielding divine magic.',
    img: '/assets/cleric.jpg',
  },
  {
    name: 'Barbarian',
    description: 'A fierce warrior who can enter a battle rage.',
    img: '/assets/barbarian.jpg',
  },
  {
    name: 'Paladin',
    description: 'A holy warrior bound to a sacred oath.',
    img: '/assets/paladin.jpg',
  },
  {
    name: 'Ranger',
    description: 'A skilled hunter and tracker, adept in the wilderness.',
    img: '/assets/ranger.jpg',
  },
  {
    name: 'Sorcerer',
    description: 'A spellcaster who draws magic from innate ability.',
    img: '/assets/sorcerer.jpg',
  },
  {
    name: 'Warlock',
    description: 'A wielder of magic derived from a pact with an otherworldly being.',
    img: '/assets/warlock.jpg',
  },
  {
    name: 'Monk',
    description: 'A master of martial arts and spiritual discipline.',
    img: '/assets/monk.jpg',
  },
  {
    name: 'Druid',
    description: 'A protector of nature, capable of shapeshifting.',
    img: '/assets/druid.jpg',
  },
  {
    name: 'Bard',
    description: 'A performer who weaves magic through music and storytelling.',
    img: '/assets/bard.jpg',
  },
];

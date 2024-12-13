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
    name: 'Cleric',
    description: 'A priestly champion wielding divine magic.',
    img: '/assets/cleric.jpg',
  },

  {
    name: 'Paladin',
    description: 'A holy warrior bound to a sacred oath.',
    img: '/assets/paladin.jpg',
  },
  {
    name: 'Barbarian',
    description: 'A fierce warrior who can enter a battle rage.',
    img: '/assets/barbarian.jpg',
  },

  {
    name: 'Warlock',
    description: 'A wielder of magic derived from a pact with an otherworldly being.',
    img: '/assets/warlock.jpg',
  },
  {
    name: 'Ranger',
    description: 'A skilled hunter and tracker, adept in the wilderness.',
    img: '/assets/ranger.jpg',
  },
  {
    name: 'Wizard',
    description: 'A scholarly magic-user capable of manipulating reality.',
    img: '/assets/wizard.jpg',
  },
  {
    name: 'Sorcerer',
    description: 'A spellcaster who draws magic from innate ability.',
    img: '/assets/sorcerer.jpg',
  },
  {
    name: 'Monk',
    description: 'A master of martial arts and spiritual discipline.',
    img: '/assets/monk.jpg',
  },
  {
    name: 'Rogue',
    description: 'A scoundrel who uses stealth and trickery.',
    img: '/assets/rogue.jpg',
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

export const characterRaces = [
  { name: 'Human', description: 'Versatile and ambitious.', img: '/assets/human.jpg' },
  { name: 'Elf', description: 'Graceful and wise.', img: '/assets/elf.jpg' },
  { name: 'Dwarf', description: 'Stout and sturdy.', img: '/assets/dwarf.jpg' },
  { name: 'Halfling', description: 'Small, nimble, and resourceful.', img: '/assets/halfling.jpg' },
  {
    name: 'Dragonborn',
    description: 'Born of dragons, proud and strong.',
    img: '/assets/dragonborn.jpg',
  },
  {
    name: 'Tiefling',
    description: 'Fiendish ancestry with a touch of infernal power.',
    img: '/assets/tiefling.jpg',
  },
  {
    name: 'Half-Orc',
    description: 'Strong and resilient, with a savage grace.',
    img: '/assets/halforc.jpg',
  },
  { name: 'Gnome', description: 'Inventive and curious.', img: '/assets/gnome.jpg' },
  {
    name: 'Half-Elf',
    description: 'A blend of human ambition and elven grace.',
    img: '/assets/halfelf.jpg',
  },
  {
    name: 'Aasimar',
    description: 'Celestial beings with a divine purpose.',
    img: '/assets/aasimar.jpg',
  },
  {
    name: 'Genasi',
    description: 'Mortals touched by elemental planes.',
    img: '/assets/genasi.jpg',
  },
  {
    name: 'Firbolg',
    description: 'Gentle giants with a strong connection to nature.',
    img: '/assets/firbolg.jpg',
  },
];

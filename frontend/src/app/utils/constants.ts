// regex to remove comments: \/\*.*?\*\/
// regex to capture jsx comments: \{\s*\/\*.*?\*\/\s*\}

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

export const SUCCESS_CHAR_CREATE_MESSAGES = {
  TITLE: 'Character Created!',
  DESCRIPTION: 'Your character has been successfully created.',
};

export const MIN_LOADING_TIME = 500;

export const MAX_SKILLS_ALLOWED = 2;

// "metadata": {
//   "avatars": {
//     "Fighter": {
//       "Human": "/assets/fighter.jpg",
//       "Elf": "/assets/fighter.jpg",
//       "Dwarf": "/assets/fighter.jpg",
//       "Halfling": "/assets/fighter.jpg",
//       "Dragonborn": "/assets/fighter.jpg",
//       "Tiefling": "/assets/fighter.jpg",
//       "Half-Orc": "/assets/fighter.jpg",
//       "Gnome": "/assets/fighter.jpg",
//       "Half-Elf": "/assets/fighter.jpg"
//     },
//     "Mage": {
//       "Human": "/assets/mage.jpg",
//       "Elf": "/assets/mage.jpg",
//       "Dwarf": "/assets/mage.jpg",
//       "Halfling": "/assets/mage.jpg",
//       "Dragonborn": "/assets/mage.jpg",
//       "Tiefling": "/assets/mage.jpg",
//       "Half-Orc": "/assets/mage.jpg",
//       "Gnome": "/assets/mage.jpg",
//       "Half-Elf": "/assets/mage.jpg"
//     },
//     "Rogue": {
//       "Human": "/assets/rogue.jpg",
//       "Elf": "/assets/rogue.jpg",
//       "Dwarf": "/assets/rogue.jpg",
//       "Halfling": "/assets/rogue.jpg",
//       "Dragonborn": "/assets/rogue.jpg",
//       "Tiefling": "/assets/rogue.jpg",
//       "Half-Orc": "/assets/rogue.jpg",
//       "Gnome": "/assets/rogue.jpg",
//       "Half-Elf": "/assets/rogue.jpg"
//     },
//     "Cleric": {
//       "Human": "/assets/cleric.jpg",
//       "Elf": "/assets/cleric.jpg",
//       "Dwarf": "/assets/cleric.jpg",
//       "Halfling": "/assets/cleric.jpg",
//       "Dragonborn": "/assets/cleric.jpg",
//       "Tiefling": "/assets/cleric.jpg",
//       "Half-Orc": "/assets/cleric.jpg",
//       "Gnome": "/assets/cleric.jpg",
//       "Half-Elf": "/assets/cleric.jpg"
//     },
//     "Paladin": {
//       "Human": "/assets/paladin.jpg",
//       "Elf": "/assets/paladin.jpg",
//       "Dwarf": "/assets/paladin.jpg",
//       "Halfling": "/assets/paladin.jpg",
//       "Dragonborn": "/assets/paladin.jpg",
//       "Tiefling": "/assets/paladin.jpg",
//       "Half-Orc": "/assets/paladin.jpg",
//       "Gnome": "/assets/paladin.jpg",
//       "Half-Elf": "/assets/paladin.jpg"
//     },
//     "Barbarian": {
//       "Human": "/assets/barbarian.jpg",
//       "Elf": "/assets/barbarian.jpg",
//       "Dwarf": "/assets/barbarian.jpg",
//       "Halfling": "/assets/barbarian.jpg",
//       "Dragonborn": "/assets/barbarian.jpg",
//       "Tiefling": "/assets/barbarian.jpg",
//       "Half-Orc": "/assets/barbarian.jpg",
//       "Gnome": "/assets/barbarian.jpg",
//       "Half-Elf": "/assets/barbarian.jpg"
//     },
//     "Warlock": {
//       "Human": "/assets/warlock.jpg",
//       "Elf": "/assets/warlock.jpg",
//       "Dwarf": "/assets/warlock.jpg",
//       "Halfling": "/assets/warlock.jpg",
//       "Dragonborn": "/assets/warlock.jpg",
//       "Tiefling": "/assets/warlock.jpg",
//       "Half-Orc": "/assets/warlock.jpg",
//       "Gnome": "/assets/warlock.jpg",
//       "Half-Elf": "/assets/warlock.jpg"
//     },
//     "Ranger": {
//       "Human": "/assets/ranger.jpg",
//       "Elf": "/assets/ranger.jpg",
//       "Dwarf": "/assets/ranger.jpg",
//       "Halfling": "/assets/ranger.jpg",
//       "Dragonborn": "/assets/ranger.jpg",
//       "Tiefling": "/assets/ranger.jpg",
//       "Half-Orc": "/assets/ranger.jpg",
//       "Gnome": "/assets/ranger.jpg",
//       "Half-Elf": "/assets/ranger.jpg"
//     },
//     "Wizard": {
//       "Human": "/assets/wizard.jpg",
//       "Elf": "/assets/wizard.jpg",
//       "Dwarf": "/assets/wizard.jpg",
//       "Halfling": "/assets/wizard.jpg",
//       "Dragonborn": "/assets/wizard.jpg",
//       "Tiefling": "/assets/wizard.jpg",
//       "Half-Orc": "/assets/wizard.jpg",
//       "Gnome": "/assets/wizard.jpg",
//       "Half-Elf": "/assets/wizard.jpg"
//     },
//     "Sorcerer": {
//       "Human": "/assets/sorcerer.jpg",
//       "Elf": "/assets/sorcerer.jpg",
//       "Dwarf": "/assets/sorcerer.jpg",
//       "Halfling": "/assets/sorcerer.jpg",
//       "Dragonborn": "/assets/sorcerer.jpg",
//       "Tiefling": "/assets/sorcerer.jpg",
//       "Half-Orc": "/assets/sorcerer.jpg",
//       "Gnome": "/assets/sorcerer.jpg",
//       "Half-Elf": "/assets/sorcerer.jpg"
//     },
//     "Monk": {
//       "Human": "/assets/monk.jpg",
//       "Elf": "/assets/monk.jpg",
//       "Dwarf": "/assets/monk.jpg",
//       "Halfling": "/assets/monk.jpg",
//       "Dragonborn": "/assets/monk.jpg",
//       "Tiefling": "/assets/monk.jpg",
//       "Half-Orc": "/assets/monk.jpg",
//       "Gnome": "/assets/monk.jpg",
//       "Half-Elf": "/assets/monk.jpg"
//     },
//     "Druid": {
//       "Human": "/assets/druid.jpg",
//       "Elf": "/assets/druid.jpg",
//       "Dwarf": "/assets/druid.jpg",
//       "Halfling": "/assets/druid.jpg",
//       "Dragonborn": "/assets/druid.jpg",
//       "Tiefling": "/assets/druid.jpg",
//       "Half-Orc": "/assets/druid.jpg",
//       "Gnome": "/assets/druid.jpg",
//       "Half-Elf": "/assets/druid.jpg"
//     },
//     "Bard": {
//       "Human": "/assets/bard.jpg",
//       "Elf": "/assets/bard.jpg",
//       "Dwarf": "/assets/bard.jpg",
//       "Halfling": "/assets/bard.jpg",
//       "Dragonborn": "/assets/bard.jpg",
//       "Tiefling": "/assets/bard.jpg",
//       "Half-Orc": "/assets/bard.jpg",
//       "Gnome": "/assets/bard.jpg",
//       "Half-Elf": "/assets/bard.jpg"
//     }
//   }
// }

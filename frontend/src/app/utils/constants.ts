export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

export const classOptions = ['Fighter', 'Mage', 'Rogue'];
export const raceOptions = ['Elf', 'Orc', 'Human'];
export const backgroundOptions = ['Noble', 'Acolyte', 'Folk-Hero', 'Thief'];
export const skillsOptions = [
  'History',
  'Athletics',
  'Survival',
  'Performance',
];

export const characterImages: Record<string, Record<string, string>> = {
  fighter: {
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

interface ISeedData {
  entries: ISeedEntry[];
}

interface ISeedEntry {
  description: string;
  status     : string;
  createdAt  : number;
}

export const SeedData: ISeedData = {
  entries: [
    {
      description:
        "Pendiente: Et commodo fugiat aliqua labore adipisicing consequat voluptate fugiat.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "En Progreso: Irure irure ea aute ex amet.",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        "Terminado: Enim exercitation culpa laborum reprehenderit labore id labore ipsum tempor consectetur labore Lorem dolore.",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};

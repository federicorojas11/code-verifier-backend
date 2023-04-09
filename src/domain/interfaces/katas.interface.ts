export interface Kata {
      _id?: string;
      name: string;
      level: number;
      category: KataCategory;
      user: string;
      description: string;
      valoration: number;
      chances: number;
      participants: string[];
}

export enum KataCategory {
      BASIC = "Basic",
      MEDIUM = "Medium",
      HIGH = "High",
}

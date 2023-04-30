export interface Kata {
      _id?: string;
      name: string;
      level: number;
      category: KataCategory;
      description: string;
      valoration: number;
      chances: number;
      participants: string[];
      creator?: string | Record<string, string>;
}

export enum KataCategory {
      BASIC = "Basic",
      MEDIUM = "Medium",
      HIGH = "High",
}

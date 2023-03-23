export interface Contact {
     _id?: string;
     gender?: string;
     name?: { title: string; first: string; last: string };
     location?: {
          street: { number: 2825; name: string };
          city: string;
          state: string;
          country: string;
          postcode: 10088;
          coordinates: {
               latitude: number;
               longitude: number;
          };
          timezone: {
               offset: string;
               description: string;
          };
     };
     email?: string;
     login?: {
          uuid: string;
          username: string;
          password: string;
          salt: string;
          md5: string;
          sha1: string;
          sha256: string;
     };
     dob?: { date: Date; age: 69 };
     registered?: { date: Date; age: 4 };
     phone?: string;
     cell?: string;
     id?: { name: string; value: any };
     picture?: {
          large?: string;
          medium?: string;
          thumbnail?: string;
     };
     nat?: string;
}

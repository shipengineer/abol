export type Item = {
        id: string;
        type: 'root' | 'dir' | 'file';
        name: string;
        consist: Array<Item>;
      };

import { defineStore } from 'pinia';
import { ref } from 'vue';
type Item = {
  id: string;
  type: 'root' | 'dir' | 'file';
  name: string;
  consist: Array<Item>;
};
export const useTreeStore = defineStore('tree', () => {
  const tree = ref({
    id: 'tree',
    type: 'root',
    consist: [
      {
        id: 'dir-1',
        type: 'dir',
        name: 'Dir 1',
        consist: [
          {
            id: 'dir-1-1',
            type: 'dir',
            name: 'Dir 1-1',
            consist: [
              {
                id: 'file-1-1-1',
                type: 'file',
                name: 'File 1-1-1',
                consist: [''],
              },
            ],
          },
        ],
      },
      {
        id: 'dir-2',
        type: 'dir',
        name: 'Dir 2',
        consist: [
          {
            id: 'dir-2-1',
            type: 'dir',
            name: 'File 2-1',
            consist: [''],
          },
          { id: 'file-2-2', type: 'file', name: 'File 2-2', consist: [''] },
        ],
      },
      { id: 'file-2', type: 'file', name: 'File 2', consist: [''] },
    ],
  });
  function setTree(payload: Item) {
    if (payload.type === 'root') {
      tree.value = payload;
    }
  }
  return { tree, setTree };
});

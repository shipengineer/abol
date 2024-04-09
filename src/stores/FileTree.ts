import { defineStore } from 'pinia';
import { Item } from '@/types/Item';
import { ref } from 'vue';
export const useTreeStore = defineStore('tree', () => {
  const tree = ref(
    new Map([
      ['dir-1', {
        id: 'dir-1', type: 'dir', name: 'Dir 1', children: ['dir-1-1'], parent: 'root'
      }],
      ['dir-1-1', {
        id: 'dir-1-1', type: 'dir', name: 'Dir 1-1', children: ['file-1-1-1'], parent: 'dir-1'
      }],
      ['file-1-1-1',
        { id: 'file-1-1-1', type: 'file', name: 'File 1-1-1', children: [], parent: "dir-1-1" }
      ],
      ['dir-2', {
        id: 'dir-2', type: 'dir', name: 'Dir 2', children: ['dir-2-1', 'file-2-1'], parent: 'root'
      }],
      ['file-2-1', {
        id: 'file-2-1', type: 'file', name: 'File 2', children: [], parent: 'dir-2'
      }],
      ['dir-2-1', {
        id: 'dir-2-1', type: 'dir', name: 'Dir 2-1', children: [], parent: 'dir-2'
      }],
      ['file-2',
        { id: 'file-2', type: 'file', name: 'File 2', children: [], parent: "root" }
      ]])
  )
  function getTreeElementById(ID: string): Item {


    return tree.value.get(ID)!
  }
  function setNewNameById(ID: string, newName: string) {
    const mute: Item = tree.value.get(ID)!
    tree.value.set(ID, { ...mute, name: newName })
  }
  function setNewValuesByID(ID: string, payload: Item) {
    tree.value.set(ID, payload)
  }
  function deleteFileById(ID: string) {
    tree.value.delete(ID)
  }


  return { tree, getTreeElementById, setNewNameById, deleteFileById };
});

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineStore } from 'pinia';
import { Item } from '@/types/Item';
import { ref } from 'vue';
export const useTreeStore = defineStore('tree', () => {
  const tree = ref(
    new Map([
      [
        'root',
        {
          id: 'root',
          type: 'root',
          name: '',
          children: ['dir-1', 'dir-2', 'file-2'],
          parent: 'root',
        },
      ],
      [
        'dir-1',
        {
          id: 'dir-1',
          type: 'dir',
          name: 'Dir 1',
          children: ['dir-1-1'],
          parent: 'root',
        },
      ],
      [
        'dir-1-1',
        {
          id: 'dir-1-1',
          type: 'dir',
          name: 'Dir 1-1',
          children: ['file-1-1-1'],
          parent: 'dir-1',
        },
      ],
      [
        'file-1-1-1',
        {
          id: 'file-1-1-1',
          type: 'file',
          name: 'File 1-1-1',
          children: [],
          parent: 'dir-1-1',
        },
      ],
      [
        'dir-2',
        {
          id: 'dir-2',
          type: 'dir',
          name: 'Dir 2',
          children: ['dir-2-1', 'file-2-1'],
          parent: 'root',
        },
      ],
      [
        'file-2-1',
        {
          id: 'file-2-1',
          type: 'file',
          name: 'File 2',
          children: [],
          parent: 'dir-2',
        },
      ],
      [
        'dir-2-1',
        {
          id: 'dir-2-1',
          type: 'dir',
          name: 'Dir 2-1',
          children: [],
          parent: 'dir-2',
        },
      ],
      [
        'file-2',
        {
          id: 'file-2',
          type: 'file',
          name: 'File 2',
          children: [],
          parent: 'root',
        },
      ],
    ])
  );
  function getTreeElementById(ID: string): Item {
    return tree.value.get(ID)!;
  }
  function setNewNameById(ID: string, newName: string) {
    const mute: Item = tree.value.get(ID)!;
    tree.value.set(ID, { ...mute, name: newName });
  }

  function deleteFileById(ID: string) {
    const element = getTreeElementById(ID);
    element.children.forEach(child => deleteFileById(child))
    const parent = getTreeElementById(element.parent);
    parent.children = parent.children.filter((child) => child !== ID);
    tree.value.delete(ID);
  }
  function addNewFile(ID: string) {
    const element = getTreeElementById(ID);

    const filesInElement = element.children.filter((elem) =>
      elem.match('file')
    );
    const mathMax = Math.max(
      ...filesInElement.map((file: string) =>
        parseInt(file.split('-').slice(-1) as unknown as string)
      )
    );
    const nextNumber = (filesInElement.length === 0 ? 0 : mathMax) + 1;
    const type =
      element.id.indexOf('-') == -1
        ? element.id.length
        : element.id.indexOf('-');
    const newFileId = 'file' + element.id.slice(type) + '-' + nextNumber;

    const payload = {
      id: newFileId,
      type: 'file',
      name: newFileId.charAt(0).toUpperCase() + newFileId.slice(1),
      children: [],
      parent: element.id,
    };

    element.children.push(newFileId);
    tree.value.set(newFileId, payload);
  }
  function addNewFolder(ID: string) {
    const element = getTreeElementById(ID);

    const directoriesInElement = element.children.filter((elem) =>
      elem.match('dir')
    );
    const mathMax = Math.max(
      ...directoriesInElement.map((file: string) =>
        parseInt(file.split('-').slice(-1) as unknown as string)
      )
    );
    const nextNumber = (directoriesInElement.length === 0 ? 0 : mathMax) + 1;
    const type =
      element.id.indexOf('-') == -1
        ? element.id.length
        : element.id.indexOf('-');
    const newDirectoryId = 'dir' + element.id.slice(type) + '-' + nextNumber;

    const payload = {
      id: newDirectoryId,
      type: 'dir',
      name: newDirectoryId.charAt(0).toUpperCase() + newDirectoryId.slice(1),
      children: [],
      parent: element.id,
    };

    element.children.push(newDirectoryId);
    tree.value.set(newDirectoryId, payload);
  }

  return {
    tree,
    getTreeElementById,
    setNewNameById,
    deleteFileById,
    addNewFile,
    addNewFolder,
  };
});

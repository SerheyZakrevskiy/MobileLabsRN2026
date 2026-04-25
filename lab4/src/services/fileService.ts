import * as FileSystem from "expo-file-system/legacy";
export const ROOT_DIR = FileSystem.documentDirectory + "lab4-files/";

export async function initFileSystem() {
  const info = await FileSystem.getInfoAsync(ROOT_DIR);

  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
    await FileSystem.writeAsStringAsync(
      ROOT_DIR + "readme.txt",
      "Це тестовий файл лабораторної роботи №4.",
    );
  }
}

export async function readDirectory(path: string) {
  return await FileSystem.readDirectoryAsync(path);
}

export async function getItemInfo(path: string) {
  return await FileSystem.getInfoAsync(path);
}

export async function createFolder(path: string, name: string) {
  await FileSystem.makeDirectoryAsync(path + name, { intermediates: true });
}

export async function createTextFile(
  path: string,
  name: string,
  content: string,
) {
  const finalName = name.endsWith(".txt") ? name : `${name}.txt`;
  await FileSystem.writeAsStringAsync(path + finalName, content);
}

export async function readTextFile(path: string) {
  return await FileSystem.readAsStringAsync(path);
}

export async function saveTextFile(path: string, content: string) {
  await FileSystem.writeAsStringAsync(path, content);
}

export async function deleteItem(path: string) {
  await FileSystem.deleteAsync(path, { idempotent: true });
}

export async function getStorageInfo() {
  const total = await FileSystem.getTotalDiskCapacityAsync();
  const free = await FileSystem.getFreeDiskStorageAsync();

  return {
    total,
    free,
    used: total - free,
  };
}

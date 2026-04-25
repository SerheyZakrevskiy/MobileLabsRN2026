export function formatBytes(bytes: number) {
  if (!bytes) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, index);

  return `${value.toFixed(2)} ${units[index]}`;
}

export function getFileExtension(name: string) {
  const parts = name.split(".");
  if (parts.length < 2) return "folder/unknown";
  return parts.pop()?.toLowerCase() || "unknown";
}

export function formatDate(timestamp?: number) {
  if (!timestamp) return "Невідомо";
  return new Date(timestamp * 1000).toLocaleString();
}

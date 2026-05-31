export function formatDisplayName(name: string): string {
  return name
    .replace(/[_-]/g, " ")
    .split(" ")
    .map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    )
    .join(" ");
}
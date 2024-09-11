export function determineColor(priority: string): string {
  switch (priority) {
    case "high":
      return "#ff0000";
    case "medium":
      return "#fcee70";
    case "low":
      return "#00ff00";
    default:
      return "bg-gray-500";
  }
}

export function determineTextColor(priority: string): string {
  switch (priority) {
    case "high":
    case "low":
      return "text-white";
    case "medium":
      return "text-black";
    default:
      return "text-blue-600";
  }
}

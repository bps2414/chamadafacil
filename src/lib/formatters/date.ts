export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return "—";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "—";
  }
}

export function formatRelativeAge(
  dateString: string | null | undefined,
  now: Date = new Date(),
): string {
  if (!dateString) return "data indisponivel";

  const date = new Date(dateString);

  if (isNaN(date.getTime()) || isNaN(now.getTime())) {
    return "data indisponivel";
  }

  const diffInMinutes = Math.max(
    0,
    Math.floor((now.getTime() - date.getTime()) / 60000),
  );

  if (diffInMinutes < 1) {
    return "agora";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} h`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 30) {
    return `${diffInDays} dia${diffInDays === 1 ? "" : "s"}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths < 12) {
    return `${diffInMonths} mes${diffInMonths === 1 ? "" : "es"}`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ano${diffInYears === 1 ? "" : "s"}`;
}

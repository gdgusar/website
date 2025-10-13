export async function getTeamMembersServer() {
  let data = null;
  let error: string | null = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/team`
    );
    if (!res.ok) {
      error = `HTTP ${res.status}`;
      data = null;
    } else {
      data = await res.json();
    }
  } catch (e: any) {
    error = e?.message || String(e);
    data = null;
  }

  return {
    data,
    loading: false,
    error,
  };
}

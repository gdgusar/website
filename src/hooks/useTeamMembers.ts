import useSWR from 'swr';

// The fetcher function is a simple async function that fetches data
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useTeamMembers() {
  // useSWR will fetch the data and handle all the state for us
  const { data, error, isLoading } = useSWR('/api/team', fetcher);

  return {
    team: data,       // The array of team members
    isLoading,        // True when data is being fetched
    isError: error,   // The error object if fetching fails
  };
}
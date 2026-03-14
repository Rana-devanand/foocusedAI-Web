const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://admin-hub-backend.vercel.app/api';

export const getDashboardData = async (token: string) => {
  const response = await fetch(`${API_URL}/s2s/data`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch dashboard data');
  }

  return response.json();
};

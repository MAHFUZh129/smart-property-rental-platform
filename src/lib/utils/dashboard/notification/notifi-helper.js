// "5 minutes ago", "3 hours ago", "2 days ago", or a date for older messages
export const timeAgo=(iso)=> {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  if (seconds < 7 * 86400) return `${Math.floor(seconds / 86400)} days ago`;

  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
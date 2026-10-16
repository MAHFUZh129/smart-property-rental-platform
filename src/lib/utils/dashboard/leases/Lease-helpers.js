// Small helpers shared by the tenant components.

export const SOON_DAYS = 60; // "ending soon" means 60 days or less

export const daysLeft=(endDate) =>{
  return Math.ceil((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export const formatDate=(iso)=> {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// "Mahfuz Hossain " ------> "MH"
export const initials=(name)=> {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}
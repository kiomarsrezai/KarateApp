export const roles = [
  {
    value: 2,
    label: "ورزشکار",
    path: "/dashboard/player",
  },
  { value: 3, label: "مربی", path: "/dashboard/coach" },
  { value: 4, label: "داور", path: "/dashboard/referee" },
] as const;

export const allRoles = [
  {
    value: 1,
    label: "مدیر",
    path: "/dashboard/player",
  },
  ...roles,
] as const;

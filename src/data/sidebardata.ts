"use server";

import { getAllUnits } from "@/lib/getNewWords";

export async function sideBarData() {
  return {
    user: {
      name: "AI Land",
      email: "ailand@example.com",
      avatar: "/assets/icons/logo.svg",
    },
    units: getAllUnits(),  
  };
}

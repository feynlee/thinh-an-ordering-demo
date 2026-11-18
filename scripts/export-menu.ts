// Writes docs/menu-sample.json from src/data/menu.ts (deliverable D). Run: npm run menu:json
import { writeFileSync } from "node:fs";
import { CATEGORIES, MENU, MODIFIER_GROUPS, EXCLUDED_NOTES } from "../src/data/menu";

const out = {
  title: "Thịnh An Kitchen & Tofu — sample menu dataset (demo)",
  generatedFrom: "src/data/menu.ts",
  primarySource: "https://thinhankitchentofutampa.cloveronline.com/menu/all",
  crossCheckSource: "https://order.online/store/thinh-an-kitchen-24151998",
  lastChecked: "2026-11-18",
  verificationKey: {
    "verified-clover-online": "Seen on the restaurant's Clover ordering page on lastChecked",
    "cross-checked": "Seen on Clover and matched on order.online / DoorDash featured items",
    editorial: "Written by the developer; owner must confirm",
    unverified: "Not confirmed",
  },
  notes: [
    "nameVi adds Vietnamese tone marks to the Clover names; spelling needs owner review.",
    "Dietary flags only reflect the restaurant's own VEGETARIAN category or the word 'Spicy' in its description. No allergen information is published.",
    "Images are original illustrations ('art' key), not photos of the food.",
    ...EXCLUDED_NOTES,
  ],
  categories: CATEGORIES,
  modifierGroups: MODIFIER_GROUPS,
  items: MENU,
};
writeFileSync("docs/menu-sample.json", JSON.stringify(out, null, 2) + "\n");
console.log(`wrote docs/menu-sample.json (${MENU.length} items)`);

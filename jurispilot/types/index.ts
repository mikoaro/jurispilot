export interface Activity {
  id: string;
  date: string;
  description: string;
  type: "visit" | "lab" | "admission";
}

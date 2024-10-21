import { ToolOverview } from "./ToolOverview";

export interface ToolDetails {
  id: string;
  label: string;
  status: string;
  keywords: string[];
  description: string;
  accessibleAt: string;
  contributors: string[];
  imageUrls: string[];
  related: ToolOverview[];
}

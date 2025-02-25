export interface Activity {
  id: string;
  date: string;
  description: string;
  type: "visit" | "lab" | "admission";
}


export interface GenerateThumbnailProps {
  setImage: (image: string) => void;
  setImageStorageId: (id: string) => void;
  image: string;
  imagePrompt: string;
  setImagePrompt: (prompt: string) => void; // Add this if missing
}

export interface ImageData {
  imageUrl: string;
}


export interface ImageData2 {
    id: string;
    url: string;
  }
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { ImageData } from "@/types";

interface GenerateThumbnailProps {
  setImage: (url: string) => void;
  setImagePrompt: (prompt: string) => void;
  setImageStorageId: (id: string) => void;
  image: string;
  imagePrompt: string;
}

export default function GenerateThumbnail({
  setImage,
  setImagePrompt,
  setImageStorageId,
  image,
  imagePrompt
}: GenerateThumbnailProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAiThumbnail, setIsAiThumbnail] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      
      setIsImageLoading(true);
      try {
        const storageId = uuidv4();
        const uploadedImageUrl = `https://example.com/${storageId}`;
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("Image uploaded:", uploadedImageUrl);
        setImageStorageId(storageId);
      } catch (error) {
        console.error("Image upload failed:", error);
        setError("Failed to upload image");
      } finally {
        setIsImageLoading(false);
      }
    }
  };

  const generateImage = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://44.222.73.172:8400/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: imagePrompt }),
      });
      const data = await response.json();
      console.log("Image URL: ", data);
      if (response.ok) {
        setImages((prevImages) => [data, ...prevImages]);
        setImage(data.imageUrl);
        setImagePrompt("");
      } else {
        setError(data.error || "Failed to generate image");
      }
    } catch (err) {
      setError("An error occurred while generating the image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="generate_thumbnail flex gap-4 mb-5">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAiThumbnail(true)}
          className={cn("flex-1", {
            "bg-primary text-primary-foreground": isAiThumbnail,
          })}
        >
          Use AI to generate thumbnail
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAiThumbnail(false)}
          className={cn("flex-1", {
            "bg-primary text-primary-foreground": !isAiThumbnail,
          })}
        >
          Upload custom image
        </Button>
      </div>

      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <Label htmlFor="ai-prompt" className="text-lg font-bold">
            AI Prompt to generate Thumbnail
          </Label>
          <Textarea
            id="ai-prompt"
            className="input-class font-light w-full bg-background text-foreground p-2 rounded-md border border-input"
            placeholder="Provide text to generate thumbnail"
            rows={5}
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
          />
          <div className="w-full max-w-[200px]">
            <Button onClick={generateImage} disabled={loading || !imagePrompt}>
              {loading ? (
                <>
                  Generating... <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                "Generate Image"
              )}
            </Button>
          </div>
          {error && <p className="text-destructive mt-2">{error}</p>}
            <div className="flex justify-center">
                {images.map((image, index) => (
                    <div key={index} className="p-5">
                    <Image
                        src={image.imageUrl || "/placeholder.png"}
                        alt={`Generated Image ${index + 1}`}
                        width={500}
                        height={500}
                        priority={false}
                        className="rounded-lg shadow-lg"
                    />
                    </div>
                ))}
            </div>
        </div>
      ) : (
        <div className="image_div cursor-pointer mt-5 flex flex-col items-center">
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageRef}
            onChange={handleImageUpload}
          />
          <div
            onClick={() => imageRef.current?.click()}
            className="flex flex-col items-center gap-2 cursor-pointer"
          >
            {!image && !isImageLoading ? (
              <div className="w-[250px] h-[250px] bg-muted flex items-center justify-center rounded-md">
                <Image
                src="/placeholder.png"
                width={250}
                height={250}
                alt="Image preview"
                className="rounded-md"
              />
              </div>
            ) : isImageLoading ? (
              <div className="w-[250px] h-[250px] bg-muted flex items-center justify-center rounded-md">
                <div className="text-lg flex items-center font-medium">
                  Uploading
                  <Loader size={20} className="animate-spin ml-2" />
                </div>
              </div>
            ) : (
              <Image
                src={image || "/placeholder.png"}
                width={250}
                height={250}
                alt="Image preview"
                className="rounded-md"
              />
            )}
            <h2 className="text-sm font-bold text-primary">
              Click to upload
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              Supported formats: SVG, PNG, JPG, GIF (max. 1080x1080px)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
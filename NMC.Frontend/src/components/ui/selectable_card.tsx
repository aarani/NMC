import { Card } from "@/components/ui/card"

interface ImageCardProps {
  imageUrl: string;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function ImageCard({ imageUrl, label, isSelected, onSelect }: ImageCardProps) {
  return (
    <Card 
      className={`w-48 h-48 relative overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-4 ring-primary ring-offset-2' : ''
      }`}
      onClick={onSelect}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        aria-hidden="true"
      />
      <div className={`absolute inset-0 ${isSelected ? 'bg-primary/20' : 'bg-black/40'}`} aria-hidden="true" />
      <div className="relative h-full flex items-end p-4">
        <span className="text-white text-lg font-semibold">
          {label}
        </span>
      </div>
    </Card>
  )
}


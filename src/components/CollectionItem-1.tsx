import { X, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CollectionItemProps {
  item: any;
  onDelete: (id: string) => void;
  type: 'character' | 'game' | 'item';
}

export function CollectionItem({ item, onDelete, type }: CollectionItemProps) {
  return (
    <div className="group relative bg-white dark:bg-card border border-gray-200 dark:border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* Delete Overlay (visible on hover) */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
        <Button
          variant="destructive"
          size="sm"
          className="pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.collectionItemId);
          }}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Retirer
        </Button>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-gray-100 dark:bg-muted">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-2"
          />
          <div className="absolute top-1 right-1">
            <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
              Nv. {item.level || 1}
            </Badge>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-card-foreground line-clamp-1" title={item.name}>
            {item.name}
          </h4>
          <p className="text-xs text-gray-500 dark:text-muted-foreground capitalize">
            {item.element || item.type}
          </p>
        </div>
      </div>
    </div>
  );
}

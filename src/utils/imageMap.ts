// Map character search queries to actual image URLs
export const imageMap: Record<string, string> = {
  'fire warrior': 'https://images.unsplash.com/photo-1662072628094-8ab48e7b62ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwd2FycmlvcnxlbnwxfHx8fDE3NjM4MzQxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'water mage': 'https://images.unsplash.com/photo-1717274810553-0a1329772669?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMG1hZ2V8ZW58MXx8fHwxNzYzODM0MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'earth tank': 'https://images.unsplash.com/photo-1730208558087-3d01642ffc54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHRhbmt8ZW58MXx8fHwxNzYzODM0MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'air assassin': 'https://images.unsplash.com/photo-1749867052986-532f009179ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBhc3Nhc3NpbnxlbnwxfHx8fDE3NjM4MzQxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'nature support': 'https://images.unsplash.com/photo-1579565708212-4cd3b994daf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBzdXBwb3J0fGVufDF8fHx8MTc2MzgzNDEyOHww&ixlib=rb-4.1.0&q=80&w=1080',
  'undead mage': 'https://images.unsplash.com/photo-1620853720814-763f74b945ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwaGVyb3xlbnwxfHx8fDE3NjM4MzQxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'magic mage': 'https://images.unsplash.com/photo-1542379653-b928db1b4956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpYyUyMG1hZ2V8ZW58MXx8fHwxNzYzODM0MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'tech warrior': 'https://images.unsplash.com/photo-1762838362179-1718fce76d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwd2FycmlvcnxlbnwxfHx8fDE3NjM4MzQxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'fire mage': 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwY2hhcmFjdGVyfGVufDF8fHx8MTc2MzgzNDEzMnww&ixlib=rb-4.1.0&q=80&w=1080',
  'water support': 'https://images.unsplash.com/photo-1601414380752-b0d4cb86a47e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBoZXJvfGVufDF8fHx8MTc2MzgzNDEzMnww&ixlib=rb-4.1.0&q=80&w=1080',
  'air warrior legendary': 'https://images.unsplash.com/photo-1662072628094-8ab48e7b62ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwd2FycmlvcnxlbnwxfHx8fDE3NjM4MzQxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'tech tank': 'https://images.unsplash.com/photo-1730208558087-3d01642ffc54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHRhbmt8ZW58MXx8fHwxNzYzODM0MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
};

export function getImageUrl(query: string): string {
  return imageMap[query] || imageMap['fire warrior'];
}

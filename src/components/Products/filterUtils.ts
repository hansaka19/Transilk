export type ShapeKey = 'oval' | 'round' | 'marquise' | 'radiant' | 'cushion' | 'princess' | 'emerald'

export type ShapeItem = {
  key: ShapeKey
  label: string
  count?: number
}

export type FilterValues = {
  price: { from: number; to: number }
  carat: { from: number; to: number }
  shape: ShapeKey | null
}

export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))
export const formatMoney = (n: number) => `$${n.toLocaleString()}`
export const formatCarat = (n: number) => `${n.toFixed(2)} ct`

export const defaultShapes: ShapeItem[] = [
  { key: 'oval', label: 'Oval', count: 1355 },
  { key: 'round', label: 'Round', count: 3997 },
  { key: 'marquise', label: 'Marquise', count: 624 },
  { key: 'radiant', label: 'Radiant', count: 552 },
  { key: 'cushion', label: 'Cushion', count: 1254 },
  { key: 'princess', label: 'Princess', count: 1172 },
  { key: 'emerald', label: 'Emerald Cut', count: 525 },
]

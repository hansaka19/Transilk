import { index, route } from '@react-router/dev/routes'

export default [
  index('routes/_index.tsx'),
  route('stones', 'routes/stones.tsx'),
  route('stones/:id', 'routes/stones.$id.tsx'),
  route('minecart', 'routes/minecart.tsx'),
  route('jewelleries', 'routes/jewelleries.tsx'),
  route('collections', 'routes/collections.tsx'),
  route('jewelleries/:id', 'routes/jewelleries.$id.tsx'),
  route('support', 'routes/support.tsx'),
  route('checkout', 'routes/checkout.tsx'),
  route('paynow', 'routes/paynow.tsx'),
  route('journey', 'routes/journey.tsx'),
  route('profile', 'routes/profile.tsx'),
]




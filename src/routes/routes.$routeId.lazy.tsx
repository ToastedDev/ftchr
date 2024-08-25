import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/routes/$routeId')({
  component: () => <div>Hello /routes/$routeId!</div>
})
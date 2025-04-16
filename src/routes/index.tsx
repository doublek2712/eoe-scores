import { createFileRoute } from '@tanstack/react-router'
import { Overview } from '../pages/overview'
import { ProtectedPage } from '../pages/protected'
export const Route = createFileRoute('/')({
  component: () => <ProtectedPage targetPage={<Overview />} />
})

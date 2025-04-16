import { createFileRoute } from '@tanstack/react-router'
import { Admin } from '../pages/admin'
import { ProtectedPage } from '../pages/protected'

export const Route = createFileRoute('/admin')({
  component: () => <ProtectedPage targetPage={<Admin />} requiredRole='admin' />,
})



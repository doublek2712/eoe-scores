import { createFileRoute } from '@tanstack/react-router'
import { Team } from '../../../pages/team'

export const Route = createFileRoute('/team/$teamId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { teamId } = Route.useParams()
  return <Team teamId={teamId} />
}

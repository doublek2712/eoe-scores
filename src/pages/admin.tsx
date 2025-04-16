import { FC, useState } from "react"
import { useQuery } from "../lib/hooks/useQuery"
import { TeamService } from "../services/team/api"
import { Loading } from "../components/layout/loading/loading"
import { Team } from "../services/team/type"
import { TeamCard } from "../components/ui/team-card/team-card"
import { useMutation } from "../lib/hooks/useMutation"
import { AddTeamModal } from "../components/ui/add-team-modal/add-team-modal"

interface AdminProps { }
export const Admin: FC<AdminProps> = ({ }) => {

  const teamQuery = useQuery<Team[]>(TeamService.getTeams)

  const updateTeamMutation = useMutation(TeamService.updateTeam)

  const addTeamMutation = useMutation(TeamService.createTeam)

  const deleteTeamMutation = useMutation(TeamService.deleteTeam)

  const [isAddTeamModelOpen, setIsAddTeamModalOpen] = useState(false)

  const handleUpdate = (id: string, data: Team) => {
    updateTeamMutation.mutate(id, data)
  }

  const handleAddTeamModal = () => {
    setIsAddTeamModalOpen(true)
  }

  const handleAddTeam = (data: Team) => {
    data.id = data.name
    addTeamMutation.mutate(data)
  }

  const handleDeleteTeam = (id: string) => {
    deleteTeamMutation.mutate(id)
  }

  const handleValidateNewTeam = (data: Team): boolean => {
    if (teamQuery.data?.filter((team) => team.name == data.name).length) {
      alert('Tên nhóm đã tồn tại')
      return false
    }
    return true
  }

  if (teamQuery.loading || updateTeamMutation.loading || addTeamMutation.loading) {
    return <Loading />
  }
  else if (teamQuery.error || updateTeamMutation.error || addTeamMutation.error) {
    return <div>Error: {teamQuery.error}</div>
  }
  else
    return (
      <div className="felx flex-col gap-4">
        <h1 className="text-center">Admin</h1>
        <div>
          {teamQuery.data?.map((team) => {
            return (
              <details key={team.id}>
                <summary className="text-lg py-2">{team.name}</summary>
                <div className="flex flex-col gap-2 my-2">
                  <TeamCard key={team.id} initialData={team} onChange={(data: Team) => handleUpdate(team.id, data)} />
                  <button
                    className={`py-2 px-4 text-md hover:cursor-pointer text-center 
                  bg-rose-800  rounded-lg`}
                    onClick={() => handleDeleteTeam(team.id)}
                  >
                    Xóa nhóm này
                  </button>
                </div>
              </details>
            )
          })}
          <button
            className='w-full mt-4 px-6 py-2 text-lg bg-gradient-to-br from-indigo-900 to-fuchsia-800 rounded-lg hover:cursor-pointer 
            transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 
            inset-shadow-sm inset-shadow-indigo-500/50'
            onClick={handleAddTeamModal}
          >
            Thêm đội
          </button>
        </div>
        <AddTeamModal
          onAdd={handleAddTeam}
          isOpen={isAddTeamModelOpen}
          setIsOpen={setIsAddTeamModalOpen}
          validateFn={handleValidateNewTeam} />
      </div>
    )
}

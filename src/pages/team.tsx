import { FC, useState } from 'react'
import { useAuthStore } from '../store/auth'
import { useQuery } from '../lib/hooks/useQuery'
import { Score } from '../services/score/type'
import { ScoreService } from '../services/score/api'
import { TeamService } from '../services/team/api'
import { Team as TeamType } from '../services/team/type'
import { Loading } from '../components/layout/loading/loading'
import { Empty } from '../components/layout/empty/empty'
import { getRole } from '../lib/helpers/auth'
import { getStationName } from '../lib/helpers/station'
import { AddOrUpdateScoreModal } from '../components/ui/add-update-score-modal/add-update-score-modal'
import { useMutation } from '../lib/hooks/useMutation'

interface TeamProps {
  teamId: string
}
export const Team: FC<TeamProps> = ({ teamId }) => {
  const auth = useAuthStore((state) => state.secret)

  const scoresQuery = useQuery<Score[]>(() => ScoreService.getScoresByTeam(teamId))

  const teamQuery = useQuery<TeamType>(() => TeamService.getTeam(teamId))

  const updateScoreMutation = useMutation(ScoreService.updateScore)

  const addScoreMutation = useMutation(ScoreService.createScore)

  const [isAddScoreModalOpen, setIsAddScoreModalOpen] = useState(false)

  const getCurrentStationScore = () => {
    return scoresQuery.data?.find((score) => score.station === getStationName(getRole(auth)))?.score
  }
  const handleAddOrUpdateScoreModal = () => {
    setIsAddScoreModalOpen(true)
  }
  const handleAddOrUpdateScore = (data: number) => {
    if (getCurrentStationScore()) {
      updateScoreMutation.mutate(`${teamId}_${getStationName(getRole(auth))}`, {
        team: teamId,
        station: getStationName(getRole(auth)),
        score: data
      })
    }
    else {
      const newScore: Score = {
        id: `${teamId}_${getStationName(getRole(auth))}`,
        team: teamId,
        station: getStationName(getRole(auth)),
        score: data
      }
      addScoreMutation.mutate(newScore)
    }
  }

  if (scoresQuery.loading || teamQuery.loading || updateScoreMutation.loading || addScoreMutation.loading) {
    return <Loading />
  }
  else if (scoresQuery.error || teamQuery.error || updateScoreMutation.error || addScoreMutation.error) {
    return <div>Error</div>
  }
  else
    return (
      <div>
        <h1 className='text-xl mb-4'>{teamQuery.data?.name}</h1>
        <ul className='py-2 px-4 bg-white/10 rounded-xl'>
          {teamQuery.data?.members.map((member, index) => (
            <li key={index} className='text-md my-2'>
              {member.name}
            </li>
          ))}
        </ul>
        <div className='my-4'>
          <h2 className='uppercase'>Điểm ở các trạm</h2>
          <div className="w-full bg-transparent ">
            {scoresQuery.data === null || scoresQuery.data.length === 0 ? <Empty /> :
              scoresQuery.data.filter((score) => score.station !== getStationName(getRole(auth))).map((score, index) => (
                <div
                  key={index}
                  className="hover:bg-white/10 hover:cursor-pointer active:bg-white/10 flex justify-between px-8 py-4 
                            transition ease-in-out hover:-translate-y-1 hover:scale-y-110 hover:scale-x-105 hover:text-shadow-[0_0_8px_rgb(255_255_255)]
                            focus:-translate-y-1 focus:scale-y-110 focus:scale-x-105 focus:text-shadow-[0_0_8px_rgb(255_255_255)]
                            "
                >
                  <span className="text-md">{score.station}</span>
                  <span className="text-md text-shadow-[0_0_16px_rgb(255_255_255)]">{score.score}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className='my-4'>
          <div className='flex gap-2 justify-between items-center'>
            <h2 className='uppercase'>Điểm ở trạm của cậu</h2>
            <span className='w-fit text-center text-md uppercase py-2 px-4 rounded-full bg-indigo-700/60'>
              {getStationName(getRole(auth))}
            </span>
          </div>
          <span className='block py-4 text-center text-xl font-bold'>
            {getCurrentStationScore()}
          </span>
          <button className='w-full px-6 py-2 text-lg bg-gradient-to-br from-indigo-900 to-fuchsia-800 rounded-lg hover:cursor-pointer 
          transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 
          inset-shadow-sm inset-shadow-indigo-500/50'
            onClick={handleAddOrUpdateScoreModal}
          >
            {getCurrentStationScore() ? 'Sửa điểm' : 'Nhập điểm'}
          </button>
        </div>
        <AddOrUpdateScoreModal
          initialData={getCurrentStationScore()}
          onAdd={handleAddOrUpdateScore}
          isOpen={isAddScoreModalOpen}
          setIsOpen={setIsAddScoreModalOpen}
        />
      </div>
    )
}

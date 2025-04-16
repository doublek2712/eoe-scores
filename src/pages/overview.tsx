import { Link } from "@tanstack/react-router"
import { useAuthStore } from "../store/auth"
import { getRoleString } from "../lib/helpers/auth"
import { Score } from "../services/score/type"
import { ScoreService } from "../services/score/api"
import { useQuery } from "../lib/hooks/useQuery"
import { Loading } from "../components/layout/loading/loading"
import { Team } from "../services/team/type"
import { TeamService } from "../services/team/api"
import { Empty } from "../components/layout/empty/empty"


export const Overview = () => {
  const auth = useAuthStore((state) => state.secret)

  const scoresQuery = useQuery<Score[]>(ScoreService.getScores)

  const teamQuery = useQuery<Team[]>(TeamService.getTeams)

  const getFullScoreOfTeam = (teamId: string) => {
    let res = 0
    scoresQuery.data?.map((score) => {
      if (score.team === teamId)
        res += score.score
    })
    return res
  }

  if (scoresQuery.loading || teamQuery.loading) {
    return <Loading />
  }
  else if (scoresQuery.error || teamQuery.error) {
    return <div>Error</div>
  }
  else
    return (
      <div className="flex flex-col justify-center">
        <span className="text-center px-4 py-2 bg-indigo-600/50 font-bold text-md mx-auto">Bạn là {getRoleString(auth)}</span>
        <h1 className="text-3xl text-center my-8">Tổng quan</h1>
        <div className="w-full bg-transparent ">
          {teamQuery.data === null || teamQuery.data.length === 0 ? <Empty /> :
            teamQuery.data?.map((row, index) => (
              <Link
                key={index}
                className="hover:bg-white/10 hover:cursor-pointer active:bg-white/10 flex justify-between px-8 py-4 
              transition ease-in-out hover:-translate-y-1 hover:scale-y-110 hover:scale-x-105 hover:text-shadow-[0_0_8px_rgb(255_255_255)]
              focus:-translate-y-1 focus:scale-y-110 focus:scale-x-105 focus:text-shadow-[0_0_8px_rgb(255_255_255)]
              "
                to='/team/$teamId'
                params={{ teamId: row.name }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-white/70">#{index + 1}</span>
                  <span className="text-xl">{row.name}</span>
                </div>
                <span className="text-xl text-shadow-[0_0_16px_rgb(255_255_255)]">{getFullScoreOfTeam(row.name)}</span>
              </Link>
            ))}
        </div >
      </div >
    )
}

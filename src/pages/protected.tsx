import { useNavigate } from "@tanstack/react-router"
import { FC, useEffect } from "react"
import { useAuthStore } from "../store/auth"
import { isAuthenticated, isAuthorized, USER_ROLES } from "../lib/helpers/auth"
import { NotAllowed } from "./not-allowed"

interface ProtectedPageProps {
  targetPage: React.ReactNode,
  requiredRole?: USER_ROLES
}

export const ProtectedPage: FC<ProtectedPageProps> = ({ targetPage, requiredRole }) => {
  const navigate = useNavigate()
  const secret = useAuthStore((state) => state.secret)
  useEffect(() => {
    if (!isAuthenticated(secret)) {
      navigate({ to: '/login' })
    }
  }, [secret, navigate])

  if (!isAuthenticated(secret)) {
    return null // hoặc loader nếu bạn muốn hiển thị gì đó tạm thời
  }
  else if (requiredRole && !isAuthorized(secret, requiredRole)) {
    return <NotAllowed />
  }
  else
    return targetPage
}

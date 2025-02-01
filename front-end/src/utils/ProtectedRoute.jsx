import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from "../../src/features/user/userSlice";
const ProtectedRoute = ({ allowedRoles, children }) => {
  const currentUser = useSelector(selectCurrentUser)

  // Nếu không có người dùng, chuyển hướng đến trang login
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  // Nếu vai trò không nằm trong danh sách cho phép, chuyển hướng đến trang 404
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />
  }

  // Nếu vai trò hợp lệ, hiển thị nội dung bên trong ProtectedRoute
  return children ? children : <Outlet />;
}

export default ProtectedRoute

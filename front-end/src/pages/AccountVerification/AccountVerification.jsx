import { useSearchParams, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '../../apis'


function AccountVerification() {

  // Lấy giá trị email và token từ URL
  let [searchParams] = useSearchParams()
  // const email = searchParams.get('email')
  // const token = searchParams.get('token')
  const { email, token } = Object.fromEntries([...searchParams])
  console.log('Email:', email)
  console.log('Token:', token)

  // Tạo một biến state để biết được là đã verify tài khoản đã thành công hay chưa
  const [isVerified, setIsVerified] = useState(false)

  // Gọi API để  verify tài khoản

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token })
        .then(() => {
          setIsVerified(true)
        })
    }
  }, [email, token])


  if (!email || !token) {
    return <Navigate to="/404" />
  }

  // Nếu chưa verify xong thì hiện loading

  if (!isVerified) {
    return <PageLoadingSpinner caption="Verifying your account..."/>
  }

  // Cuối cùng nếu không gặp vấn đề gì + với verify thành công thì điều hướng về trang login cùng giá trị verifiedEmail

  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
import React, { createContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

// tác dụng của AuthProvider là cung cấp thông tin user cho toàn bộ ứng dụng (cho phép user sử dụng các component con bên trong AuthProvider)

export const AuthContext = createContext();
 
// bất kỳ component nào được bọc trong AuthProvider sẽ tượng trưng cho children
export default function AuthProvider({ children }) {
  const [user, setUser] = useState({}); // user là state để lưu thông tin user, setUser là hàm để cập nhật giá trị cho user
  const navigate = useNavigate(); // dùng để điều hướng đến trang khác
  const [isLoading, setIsLoading] = useState(true); // dùng để kiểm tra xem có đang tải dữ liệu hay không

  // event firebase sẽ tự động gọi khi có sự kiện xảy ra (vd: đăng nhập, đăng xuất) => callback
  const auth = getAuth();
  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      console.log('[From AuthProvider]', { user });
      if (user?.uid) {
        setUser(user);  // set user vào setUser thì toàn bộ các component con đều có thể truy vấn đến user đã đăng nhập\

        if(user.accessToken !== localStorage.getItem('accessToken')) { // nếu accessToken không giống với accessToken trong localStorage thì lưu lại accessToken vào localStorage
          localStorage.setItem('accessToken', user.accessToken); // lưu accessToken vào localStorage (firebase có hỗ trợ tự động refresh lại accesstoken khi hết hạn nên không cần lưu lại refreshtoken)
          window.location.reload(); // reload lại trang để cập nhật lại accessToken
        }
        setIsLoading(false); // khi đã có user thì không còn đang tải dữ liệu nữa
        return;
      }



      // reset user info
      setIsLoading(false); // khi đã có user thì không còn đang tải dữ liệu nữa
      setUser({}); // nếu không có user thì setUser về giá trị mặc định là {}
      localStorage.clear(); // clear localStorage
      navigate('/login'); // điều hướng về trang login
    })

    return () => {
      unsubcribed(); // hủy bỏ sự kiện khi component unmount
    }
  }, [auth]);

  return (
    // toàn bộ các component con nằm trong AuthProvider sẽ có thể sử dụng AuthContext (sử dụng cái prop value user này)

    <AuthContext.Provider value= {{ user, setUser }}>
      {isLoading? <CircularProgress/> : children}
    </AuthContext.Provider>
    
  )
}

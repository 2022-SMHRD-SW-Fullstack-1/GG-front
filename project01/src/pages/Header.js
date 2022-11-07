import { useEffect, useState } from 'react';
import logo from '../assets/img/gameus_logo_width.svg';
import '../styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillBellFill } from 'react-icons/io';
import Notifications from '../components/Modal/Notifications';

const Header = () => {
  // const dispatch = useDispatch();
  //const navigate = useNavigate();
  // const token = useSelector(state => state.Auth.token);

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  const onLogout = () => {
    localStorage.removeItem('user_id');

    navigate('/');
  };

  // useEffect(() => {
  //   if (jwtUtils.isAuth(token)) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [token]);
  // // 비동기로 처리!
  // const logout = async () => {
  //   await dispatch(setToken(""));
  //   alert("로그아웃 되었습니다😎");
  //   navigate("/");
  // };
  // const logout()
  //   localStorage.removeItem();
  // };

  return (
    <div className="headerStyle">
      <div className="leftStyle">
        <Link to="./">
          <img
            src={logo}
            alt="이미지를 불러올 수 없습니다."
            className="logoStyle"
          ></img>
        </Link>
        <Link className="textLink" to="/teamsearch">
          <div className="topStyle">팀찾기</div>
        </Link>
        <Link className="textLink" to="/newteam">
          <div className="topStyle">팀만들기</div>
        </Link>
        <Link className="textLink" to="/myteam">
          <div className="topStyle">내팀보기</div>
        </Link>
      </div>
      {!isLogin ? (
        <div className="rightStyle">
          <Link className="textLink" to="/">
            <div className="loginStyle" onClick={onLogout}>
              로그아웃
            </div>
          </Link>

          <Link className="text-link">
            <div className="loginStyle">
              <Notifications />
            </div>
          </Link>
        </div>
      ) : (
        <div className="rightStyle">
          <Link className="textLink" to="/signup">
            <div className="loginStyle">회원가입</div>
          </Link>
          <Link className="textLink" to="/login">
            <div className="loginStyle">로그인</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;

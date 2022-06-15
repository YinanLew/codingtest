import React, {useRef, useState, useEffect, createContext, useContext} from 'react'
import favicon from '../img/favicon.svg'
import axios from 'axios'
import ProductsContext from "./Context";

import EmailIcon from '@mui/icons-material/Email'
import { IconButton, Link } from '@mui/material'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import Products from "./Products";

const USER_REGEX = /^[A-z][A-z0-9-_]{1,19}$/

function Login() {
  const userRef = useRef();

  const {setProducts} = useContext(ProductsContext);

  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);


  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(username))
    console.log(USER_REGEX.test(username))
  }, [username])

  const handleSubmit = async e => {
    e.preventDefault()

    const name = USER_REGEX.test(username)
    if (!name) {
      setErrMsg('Invalid Entry')
    }
    try {
      console.log(username,date)
      const response = await axios.post(
        'https://wemi-round2-server.herokuapp.com/round2/authentication',
        {
          displayName: username,
          displayDate: date,
        },
      )

      const token = response.data.access_token
      window.localStorage.setItem('token', token)
      console.log(window.localStorage.getItem('token'))
      const res = await axios.post(
        'https://wemi-round2-server.herokuapp.com/round2/get-products',
        {
          page: 1,
          amount: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        },
      )
      const products = res.data.products
      console.log(res.data.products)
      setProducts(products)
    } catch (err) {
      if (!err ? err.response : '') {
        setErrMsg('No Server Response')
        console.log(errMsg)
      } else if (err.response ? err.response.status === 409 : '') {
        setErrMsg('Username Taken')
        console.log(errMsg)
      } else {
        setErrMsg('Failed')
        console.log(errMsg)
      }
    }
  }

  return (
    <>
          <header className='header'>
            <img src={favicon} alt='' />
            <div className='header-p'>
              <span>WELCOME TO WEMI ROUND 2</span>
            </div>
          </header>

          <div className='login'>
            <section>
              <form onSubmit={handleSubmit}>
                <div className='img-container'>
                  <img src={favicon} alt='' />
                </div>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    placeholder={'Username'}
                    autoComplete='off'
                    onChange={e => setUsername(e.target.value)}
                    required
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby='uidnote'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p
                    id='uidnote'
                    className={
                      userFocus && username && !validName
                          ? 'instructions'
                          : 'offscreen'
                    }
                >
                  Username must be 2-20 characters in length.
                </p>

                <input
                    type='date'
                    id='start'
                    name='trip-start'
                    value={date}
                    min='2022-06-14'
                    max='2025-12-31'
                    onChange={e => setDate(e.target.value)}
                />

                <Link to={"/products"} element={<Products />} ><button className='token'>Get Token</button></Link>
              </form>
            </section>
          </div>
          <footer className='footer'>
            <div className='footer-icons'>
              <IconButton>
                <a href="mailto:Yinanlu0112@gmail.ca?&subject=Coding Test">
                  <EmailIcon style={{ color: '#2CD889' }} />
                </a>
              </IconButton>
              <span>example@gmail.com</span>
            </div>
            <div className='footer-icons'>
              <IconButton>
                <LocalPhoneOutlinedIcon style={{ color: '#2CD889' }} />
              </IconButton>
              <span>(647) 450-8627</span>
            </div>
            <div className='footer-icons'>
              <IconButton>
                <Link href='https://github.com/YinanLew/codingtest'>
                  <GitHubIcon style={{ color: '#2CD889' }} />
                </Link>
              </IconButton>
              <span>Github</span>
            </div>
          </footer>
    </>
)
}

export default Login

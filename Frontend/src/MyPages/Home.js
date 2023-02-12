import { Image, Text, Title, UnstyledButton } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import hero from '../assets/hero.gif'
import { FeaturesCards } from '../components/Feature'
import logo from '../assets/LOGO3.png'
import './Home.css'

function Home() {
    const navigate = useNavigate()
  return (
    <>
    <div style={{
        background: ' 	hsl(203,80%, 12%)',
        filter : 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#020b19",endColorstr="#0c1638",GradientType=1)',
        padding:'12px',
        paddingBottom : '180px',
        marginTop : '-2px',
        // marginBottom : '64px'
    }}
    >
            {/* <UnstyledButton sx={{
                marginLeft : 26,
            }} className='hm-btn'>LOGO</UnstyledButton> */}
         <div minWidth="30px">
         <img src={logo} height="75px" width="250px" alt="ogo" />
         </div>
          


            <UnstyledButton sx={{
                marginRight : 42,
                float : 'right',
            //  border: '2px solid black',
                padding: '4px',
                borderRadius: '6px',
                color: '#9A9DA1'
                
                
            }} onClick={()=>navigate('/auth/register')} className='hm-btn'>Sign Up</UnstyledButton>

<UnstyledButton sx={{
                marginRight : 42,
                float : 'right',
            //  border: '2px solid black',
                padding: '4px',
                borderRadius: '6px',
                color: '#9A9DA1',
                position : 'relative',
                right : '100px'
                
                
            }} onClick={()=>navigate('/auth/login')} className='hm-btn'>Log In</UnstyledButton>

        <div className='cont' >
            <div className='cont1'  style={{fontSize : '1.0rem'}}>
                <div >
                <Title order={2} className='title' style={{fontfamily:'cursive', fontSize : '6.0rem',color: 'hsl(210,50%, 80%)',}} m='sm' >Code Collab </Title>
                </div>
               
                <Text className='slogan' p='md'>"Code collaboration platforms allow multiple developers to work on the same codebase simultaneously, improving teamwork and communication, and reducing the risk of conflicts."</Text>
                <UnstyledButton className='pbtn' onClick={()=>navigate('/auth/login')}>Explore Now</UnstyledButton>
            </div>
            <div className='cont2'>
                <Image className='heroGif' src={hero}  />
            </div>
        </div>
        

    </div>
    <div style={{
            background: 'linear-gradient(90deg, rgba(2,11,25,1) 4%, rgba(7,22,68,0.9809990890887605) 76%, rgba(17,0,82,1) 90%)',
            minHeight : '100vh',
        }}> 
    <FeaturesCards />
        </div>
    </>
  )
}

export default Home
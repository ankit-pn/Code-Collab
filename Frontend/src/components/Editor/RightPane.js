import React, { useContext, useState } from 'react'
import {FaPlusCircle , FaFolder , FaArrowRight} from 'react-icons/fa'


import './RightPane.css'
import { ActionIcon, Button, ScrollArea, Modal, Stack, Title, UnstyledButton } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import InputForm from '../../components/Editor/addProject'

function RightPane({lang , setLang , data}) {
  

  const [opened, setOpened] = useState(false);  
  

  const c = data?.user.allowedProjects.filter( x => !data?.user.createdProjects.filter( y => y.projectId === x.projectId).length);

  console.log(c , 'allowed' , data?.user.createdProjects , 'created')

  const nav = useNavigate()

  return (<>
      <div id='aside-toolbar' style={{minWidth : '224px' , minHeight : '100vh' , display : 'none' , zIndex : '5' , padding : '18px'}}>
          <ActionIcon color='green' onClick={()=>{
          const ele = document.getElementById('aside-toolbar');
          ele.style.display = 'none'}} sx={{display : 'fixed' , top : '5px' , right : '5px'}} ><FaArrowRight size={'24px'} /></ActionIcon>

          <Title style={{color : 'hsl(197, 55%, 55%)'}}>My Projects</Title>
          <ScrollArea type="hover" sx={{height:'30vh'}}>
            {data?.user.createdProjects.map((ele)=><UnstyledButton onClick={()=>{
              nav(`/editor/${ele.projectId}`);
              document.getElementById('aside-toolbar').style.display = 'none'

            }} size='lg' p='md'  sx={{marginBottom : '12px' , borderRadius : '8px', display : 'block' , border : '2px solid hsl(217, 40%, 32%)', fontFamily : 'Bitter' , color : 'white', width : '100%'}} key={ele.projectId}>{ele.projectName}</UnstyledButton>)}
          </ScrollArea>

          <Title style={{color : 'hsl(197, 55%, 55%)'}}>Joined Projects</Title>
          <ScrollArea type="never" sx={{height:'30vh'}}>
            {c?.map((ele)=><UnstyledButton  onClick={()=>{
              nav(`/editor/${ele.projectId}`);
              document.getElementById('aside-toolbar').style.display = 'none'

            }} size='lg' p='md'  sx={{marginBottom : '12px' , borderRadius : '8px', display : 'block' , border : '2px solid hsl(217, 40%, 32%)', fontFamily : 'Bitter' , color : 'hsl(80, 20%, 102%)', width : '100%'}} key={ele.projectId}>{ele.projectName}</UnstyledButton>)}
          </ScrollArea>
        
      </div>

      <div className='container' >
      
        <FaPlusCircle size={36} className='btn'  onClick={()=>{setOpened(true)}}/>
        <FaFolder onClick={()=>{
          const ele = document.getElementById('aside-toolbar');
          ele.style.display = 'block'
        }} size={36} className='btn' />        

    </div>

    <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create New Project"
      >
        <InputForm setOpened={setOpened} data={data}/>
      </Modal>
      
      
      </>
    
  )
}

export default RightPane
import { useMutation } from '@apollo/client';
import { Button, Input, Text } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { CREATE_PROJECT, GET_PROJECTS, USER_DATA } from '../../assets/queries';
import './addProject.css';

import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import StoreContext from '../../assets/StoreContext';
import { useNavigate } from 'react-router-dom';


function InputForm({setOpened , data}) {
  const textRef = useRef();

  const navigate = useNavigate()

  const [CreateProject , {loading , error }] = useMutation(CREATE_PROJECT,{
    refetchQueries: [{query : USER_DATA,variables: { userId: localStorage.getItem('uid') }}],
  });
  const { setOptions} = useContext(StoreContext)


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
    const pid = uuidv4()
    CreateProject({
      variables : {
        userId : localStorage.getItem('uid'),
        projectName : textRef.current.value,
        projectId : pid

      }
    }).then((res)=>{
      setOptions({
        text : 'We have Created a new project for you',
        color : 'green',
        title : 'Hurray'
      })
      console.log(res)
      setTimeout(() => {
        setOptions(null)
      }, 3000);
      setOpened(false)
      // navigate(`/editor/${pid}`)
    })

  }

  return (
    <form >
      <Input ref={textRef} placeholder='Enter Project Name' m='xs' />
      <Button m='sm' onClick={(e)=>{
        handleSubmit(e)
      }}>Create</Button>
        
      
    </form>
  );
}

export default InputForm;





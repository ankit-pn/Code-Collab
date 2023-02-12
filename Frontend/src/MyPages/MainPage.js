import { Badge, Box, Button, Center, Grid, Group, Image, Modal, NativeSelect, Navbar, Text } from '@mantine/core'
import { useRef , useState , useEffect, useContext} from 'react'
import Editor from '../components/Editor/Editor'
import LeftPane from '../components/Editor/LeftPane'
import RightPane from '../components/Editor/RightPane'

import './MainPage.css'

import ACTIONS from '../Actions';
import { initSocket } from '../socket';
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { USER_DATA , GET_PROJECTS, SAVE_CODE } from '../assets/queries'
import Def from '../components/Editor/default'
import StoreContext from '../assets/StoreContext'

import logo from '../assets/Aside.png'

import {FaDownload} from 'react-icons/fa'
import logo404 from '../assets/404.jpeg'


function MainPage() {


  const codeRef = useRef(null);
  const [clients, setClients] = useState([]);
  const [fsize , setFsize] = useState(18)
  const [opened, setOpened] = useState(false);
  const [output, setOutput] = useState(null);
  const [dlink , setDlink] = useState(null)

  const {projectId} = useParams();
  const [pid , setPid] = useState(projectId)
  const navigate = useNavigate()

  const [SaveCode , {load}] = useMutation(SAVE_CODE);

  let editorRef = useRef()

  const {setOptions , socketRef , setCast} = useContext(StoreContext)

  const [dis , setDis ] = useState(false)


    const handleDownload = async () => {
        const content = editorRef.current.getValue()
        const fileName = pdata.data?.project.projectName
        const fileExtension = (lang === 'python' ? 'py' : (lang === 'cmake' ? 'cpp' : 'js'))
        
        const file = new Blob([content] , {type : 'text/plain'})

        console.log(content,fileExtension,fileName)

        const link = document.createElement('a');
        link.download = URL.createObjectURL(file)
        setDlink({link : link.download , fname : `${fileName}.${fileExtension}`})
      };

  async function handleCompile (){
    setDis(true)
    const lan = (lang === 'python' ? 'py' : (lang === 'cmake' ? 'cpp' : 'js'))
    await fetch('https://api.codex.jaagrav.in' , {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            language : lan,
            code : editorRef.current.getValue()
        })}).then((res)=>
        res.json()
    ).then((res)=>{
        console.log(res)
        if(res.error){
            setOutput({title : 'Compilation Error' , text : res.error , color : 'red'})
        }
        else{
            setOutput({title : 'Compilation Successfull ' , text : res.output , color : 'green'})
        }
        setOpened(true)
    })

    setDis(false)
  }

  useEffect(()=>{

    if(socketRef.current && projectId != -1){
        console.log('SOCKET EXISTSSSS')
        socketRef.current.on(ACTIONS.GET_BROADCAST , ({cast})=>{
            console.log('CAUGHT GET BROADCAST' , cast)
            setCast(cast)
            setTimeout(() => {
                setCast(null)
            }, 10000000);
        })
      }
  },[socketRef?.current])

  


  const handleSave = (e)=>{
    e.preventDefault()
    SaveCode({
        variables : {
            projectId : projectId,
            content : editorRef.current.getValue()
        }
    }).then((res)=>{
        setOptions({
            text : 'Successfully saved',
            color : 'green',
            title : 'Success'
          })
          setTimeout(() => {
            setOptions(null)
          }, 3000);
    })

  }

  const uid = localStorage.getItem('uid')

  const {loading , error , data} = useQuery(USER_DATA , {
    variables : {
        userId: uid
      }
    })

    const pdata = useQuery(GET_PROJECTS , {
        variables : {
            projectId
        }
    })


    if(!loading){
        console.log(data , 'dattttt')   
    }

  useEffect( () => {

        async function init(){    
        const uid = localStorage.getItem('uid')
        

      if(!uid){
        setOptions({
            text : 'Something went wrong',
            color : 'red',
            title : 'Sorry'

        })

        setTimeout(() => {
            setOptions(null)
        }, 3000);
        navigate('/' , {'replace' : true} )
      }
      if(projectId != -1){
       

        socketRef.current = await initSocket();
        socketRef.current.on('connect_error', (err) => handleErrors(err));
        socketRef.current.on('connect_failed', (err) => handleErrors(err));

        function handleErrors(e) {
            console.log(e , 'HEREEE')
            setOptions({
                text : 'Something went wrong',
                color : 'red',
                title : 'Sorry'

            })

            setTimeout(() => {
                setOptions(null)
            }, 3000);
            navigate('/' , {'replace' : true} )
        }

        socketRef.current.emit(ACTIONS.JOIN, {
            projectId,
            username: uid,
        });

        // // Listening for joined event
        socketRef.current.on(
            ACTIONS.JOINED,
            ({ clients, username, socketId , projectId }) => {
                if (username !== uid) {
                    console.log(`${username} joined`);
                }
                setClients(clients);
                console.log('clients ' , clients);
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    code: codeRef.current,
                    socketId,
                });
            }
        );

        // Listening for disconnected
        socketRef.current.on(
            ACTIONS.DISCONNECTED,
            ({ socketId, username }) => {
                setClients((prev) => {
                    return prev.filter(
                        (client) => client.socketId !== socketId
                    );
                });
                console.log('disconnected ' , username)
                console.log(clients)
            }
        );

        if(pdata.data?.project.content){
            editorRef.current?.setValue(pdata.data.project.content)
        }
    
    
    }
        }
        init()
    return () => {
        console.log('MAIN CLEANUP CALLED')
        socketRef.current?.disconnect();
        socketRef.current?.off(ACTIONS.JOINED);
        socketRef.current?.off(ACTIONS.DISCONNECTED);
        editorRef.current?.setValue('')
        editorRef.current = null
    };
}, [projectId]);


    const [lang , setLang] = useState('cmake');
    const [theme , setTheme] = useState('dracula');
    
    const ele = document.getElementsByClassName('CodeMirror')[0]

    if(ele){
        ele.style.fontSize = `${fsize}px`
        console.log(ele)
    }

    if(!pdata.loading && !pdata.data && projectId != '-1'){
        console.log('NOT ACCESS THIS PAGE' )
        
        
        return <Image src={logo404} sx={{marginTop : '10%'}} height={'40vh'} fit="contain"/>
    }

  return (<div className='cont'>
      <div className='left'>
        {projectId == '-1' ? <><Image mt='20%'  src={logo} height='90vh' ></Image></> : <LeftPane clients={clients} pid={projectId} data={pdata.data?.project}/>}
      </div>
    <div className='main'>
        <div style={{maxHeight : '64px' , margin : '8px 0px' , backgroundColor :  'hsl(231, 25%, 18%)' , padding : '0px 4px'}}>
    <Grid gutter='sm' px='md' justify="left">
        <Grid.Col span={1}>
            {pdata?.data && <Center>
                <Badge variant="filled" py='md' mt='md' color='green' fullWidth>
                {pdata.data?.project.projectName}
                </Badge>
            </Center>}
        </Grid.Col>
        <Grid.Col  span={2} ml='24px'>
            <Text color='cyan'>Language</Text>
            <Group spacing={'4px'}>
            <Button size='sm' compact variant={`${lang === 'cmake' ? 'filled' : 'outline'}`} onClick={()=>{setLang('cmake')}}>C++</Button>
            <Button size='sm' compact variant={`${lang === 'javascript' ? 'filled' : 'outline'}`} onClick={()=>setLang('javascript')}>JS</Button>
            <Button size='sm' compact variant={`${lang === 'python' ? 'filled' : 'outline'}`} onClick={()=>setLang('python')}>Python</Button>
            </Group>
        </Grid.Col>

        <Grid.Col span={3} sx={{
            position : 'relative',
            right : '32px'
        }}>
            <Text color='cyan'>Theme</Text>
            <Group spacing={'4px'}>
                <Button size='sm' compact variant={`${theme === 'dracula' ? 'filled' : 'outline'}`} onClick={()=>setTheme('dracula')}>Dracula</Button>
                <Button size='sm' compact variant={`${theme === 'solarized light' ? 'filled' : 'outline'}`} onClick={()=>setTheme('solarized light')}>Solarized</Button>
                <Button size='sm' compact variant={`${theme === 'lucario' ? 'filled' : 'outline'}`} onClick={()=>setTheme('lucario')}>Lucario</Button>
            </Group>
        </Grid.Col>

        <Grid.Col mr='md' span={1} sx={{
            position : 'relative',
            right : '98px'
        }}>
            <Text color='cyan'>Font Size</Text>
            <Group spacing={'4px'}>
                <Button size='sm' compact variant='outline' onClick={()=>{setFsize(Number(fsize) + 2);console.log(fsize)}}>A+</Button>
                <Button size='sm' compact variant='outline' onClick={()=>{setFsize(Number( fsize) - 2);console.log(fsize)}}>A-</Button>
            </Group>
        </Grid.Col >

        <Grid.Col span={1}>
        </Grid.Col>

        <Grid.Col mx={0} span={1}>
            <Button my='sm'  color='#4F78BA' onClick={(e)=>{
                handleSave(e)
            }}>SAVE</Button>
        </Grid.Col>

        <Grid.Col span={1}>
            <Button my='sm' loading={dis} onClick={(e)=>{
                handleCompile()
            }}>Compile </Button>
        </Grid.Col>
        <Grid.Col sx={{position : 'relative',
                left : '24px'}} span={1}>
            { dlink ?<a my='sm' style={{
                textDecoration : 'none',
                backgroundColor : '#40C057',
                color : 'white',
                borderRadius : '4px',
                marginTop : '12px',
                display: 'block',
                padding:'8px',
                width : '24px',
                height : '18px',
                paddingLeft : '12px',
                
            }}  href={dlink.link} download={dlink.fname} onClick={handleDownload}><FaDownload/></a>: <Button m='sm' onClick={handleDownload}>Download</Button> }
        </Grid.Col>

        
    </Grid>
        </div>
        {projectId == '-1' ? <Def/> :  <Editor editorRef={editorRef} content={pdata.data?.project.content} socketRef={socketRef} projectId={projectId} onCodeChange={(code) => {codeRef.current = code;}} lang={lang} theme={theme}/>}
    </div>
    <div className='right'>
        <RightPane setLang={setLang} lang={lang} data={data}/>
    </div>

    <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Text color={output?.color}  fw={600}>{output?.title}</Text>}
      >
        <Text>{output?.text}</Text>
      </Modal>
    </div>
  )
}

export default MainPage
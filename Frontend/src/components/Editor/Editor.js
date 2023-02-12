import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/lucario.css'


import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python'
import 'codemirror/mode/cmake/cmake'
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../../Actions';
import './Editor.css'


function Editor({ socketRef, projectId, onCodeChange , lang , theme , content , editorRef}) {

    console.log('Elang' , lang)
    

    useEffect(() => {

        async function init(){
            editorRef.current = Codemirror.fromTextArea(
                document.getElementById('realtimeEditor'),
                {
                    mode: { name: lang, json: true },
                    theme: theme,
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );

            console.log(content , 'content')

            if(content){
                editorRef.current.setValue(String(content))
            }


            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        projectId,
                        code,
                    });
                }
            });
        }

        init()

        return () =>{
            editorRef.current.toTextArea();
            
            console.log(editorRef.current.options.mode.name)
        }
        
    },[lang , theme , content])


    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
        }


        return () => {
            socketRef.current.off(ACTIONS.CODE_CHANGE);
        };
    }, [socketRef.current]);
    

  return (
    <textarea id="realtimeEditor" style={{minHeight : '100vh'}}></textarea>
  )
}

export default Editor
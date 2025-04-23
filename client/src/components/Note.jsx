import React, { useEffect, useMemo, useState } from 'react'
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { useLoaderData, useSubmit, useLocation } from 'react-router-dom'
import { debounce } from '@mui/material'


export default function Note() {
  
  const { note } = useLoaderData()

  const submit = useSubmit()

  const location = useLocation()

  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty()
  })
  const [rawHTML, setRawHTML] = useState(note.content)

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content)
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    )
    setEditorState(EditorState.createWithContent(state))
  }, [note.id])

  console.log({location})


  // khi mà gõ nội dung liên tiếp thì chúng ta sẽ delay 1s , trong khoảng thời gian 1s đó sẽ ignore những cái event liên tiếp trước đó và chỉ 
  // submit lần event cuối cùng  => đó là kỹ thuật debounce
  // Trong react để làm được kỹ thuật debounce chúgn ta phải bọc trong 1 hàm useCallback (lưu trữ 1 giá trị) hoặc useMemo (lưu trữ nguyên 1 cái func) 
  
  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
  }, [rawHTML, location.pathname]); // khi rawHTML hoặc pathname có sự thay đổi thì sẽ gọi hàm debouncedMemorized

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) return;  // rawHTML là nội dung hiện tại của editor, note.content là nội dung lấy trong database => ko làm gì hết (vì ko thay đổi nội dung)

      submit({...note, content: rawHTML}, {  // ghi đè lại content = rawHTML (data mới do ng` dùng nhập vào)
        method: 'post',
        action: pathname // chính là đường dẫn tới đúng cái note đang edit => submit nội dung mới lên đúng đường dẫn của note
      })
    }, 1000);
  }, []);

  useEffect(() => {
    setRawHTML(note.content)
  },[note.content])

  const handleOnChange = (e) => {
    setEditorState(e)
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())))
  }

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder='Write something...'
    />
  )
}

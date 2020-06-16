const Toolbar = () => {
  return (
    <div>
      <button
        onMouseDown={event => {
          event.preventDefault()
          CustomEditor.toggleBoldMark(editor)
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault()
          CustomEditor.toggleCodeBlock(editor)
        }}
      >
        Code Block
      </button>
    </div>
  )
}

export default Toolbar
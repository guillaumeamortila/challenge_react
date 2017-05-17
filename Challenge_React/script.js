const initialState = []

function comments(state = initialState, action){

	if (action.type == 'NEW_COM'){
		state.push({
      user: action.user,
      mail: action.mail,
      content: action.content,
      date: action.date,
    })
    $("#user").val("");
    $("#mail").val("");
    $("#content").val("");
		return state
	}
	return state
}

const store = Redux.createStore(
	Redux.combineReducers({
		comments
	})
)

// Affichage d'un commentaire
function Comment(props){
  return(
    <div id="bro">
      <p>fait par {props.user} <a href={"mailto:"+props.mail+""}>{props.mail}</a> le {props.date} :</p>
      <p>{props.content}</p>
    </div>
  )
}

// Affichage de la liste des commentaires
function App(){
  return(
    <div>
      { store.getState().comments.map((com) => ( 
        <Comment
          user={com.user}
          mail={com.mail}
          content={com.content}
          date={com.date}
        />
      ))}
    </div>
  )
}


// Submit event lors de l'ajout d'un commentaire
$("form").on("submit", function(evt){
  evt.preventDefault();
  // Date et traitement pour l'esthétique
  var dateBrut = new Date()
  var dateFr = dateBrut.getDate()+"/"+(dateBrut.getMonth()+1)+"/"+dateBrut.getFullYear()+" à "+dateBrut.getHours()+"h"+dateBrut.getMinutes()
  return (
    store.dispatch({
      type: 'NEW_COM',
      user: $("#user").val(),
      mail: $("#mail").val(),
      content: $("#content").val(),
      date: dateFr,
    })
  )
})


// Pour checker les com dès l'ouverture
/*
function render(){
	ReactDOM.render(<App />, document.querySelector('#comments'))
}
render();
*/


store.subscribe(function(){
	ReactDOM.render(<App />, document.querySelector('#comments'))
})



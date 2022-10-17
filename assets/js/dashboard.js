import  *  as importSetup  from './class/SetupFirebase.js'

//form
const inputNomeCampo = document.querySelector('#nomeCampo')
const inputNomeEvento = document.querySelector('#nomeEvento')
const inputNomeOrganizador = document.querySelector('#nomeOrganizador')
const inputNumeroOperadores = document.querySelector('#numeroOperadores')
const btnCad = document.querySelector('#cadastrar')
const btnListarGames = document.querySelector('#listar')
const divListagemGames = document.querySelector('#listagemGames')




/* if (!userLogado) {
  window.location = 'http://127.0.0.1:5555/index.html'
}
 */

let app, db, auth, queryFirebase, querySnapshot,
query,collection, where,getDocs ,addDoc, updateDoc, deleteDoc , doc, getDoc

let idEditando = ''
let carregado = false
let editando = false

function setarVariaveisParaIniciar(){
  app = importSetup.app
  db = importSetup.db
  auth = importSetup.getAuth()
  query = importSetup.query
  collection = importSetup.collection
  where = importSetup.where
  getDocs = importSetup.getDocs
  addDoc = importSetup.addDoc
  deleteDoc = importSetup.deleteDoc
  doc = importSetup.doc
  getDoc = importSetup.getDoc
  updateDoc = importSetup.updateDoc
}


window.addEventListener('DOMContentLoaded', (e) => {
  
  console.log('restagando o user uid',sessionStorage.getItem("uid"))
  console.log('restagando o user email',sessionStorage.getItem("email"))
  console.log('restagando o user username',sessionStorage.getItem("username"))
  
  // setar variaveis locais para tudo que veio do arquivo de conf
  setarVariaveisParaIniciar()

  // event
  btnCad.addEventListener('click', (e) =>{
    e.preventDefault()
    
    console.log('itens que serão cadastrados ', 
    inputNomeCampo.value ,  inputNomeEvento.value,
    inputNomeOrganizador.value, Number(inputNumeroOperadores.value) )
    if(!editando){
      console.log('criando novo user');
      cadastrarFirebaseUser(inputNomeCampo, inputNomeEvento,inputNomeOrganizador, inputNumeroOperadores )
    }else{
      console.log('editando  user');
      updateItem(idEditando.id, idEditando.data())
    }
    
    limparHtml()
    listAll()
    limpaForm()
    
  })

  btnListarGames.addEventListener('click', (e) => {
    console.log('chamando deletar')
    deleteItem()
    limparHtml()
    listAll()
  })
  listAll()
  
 
})

 
 

async function cadastrarFirebaseUser(inputNomeCampo, inputNomeEvento,inputNomeOrganizador, inputNumeroOperadores){
  

  try {
    const docRef = await addDoc(collection(db, "Jogos"), {
      nomeCampo: inputNomeCampo.value,
      dataCriacao: Date.now(),
      nomeEvento: inputNomeEvento.value,
      nomeOrganizador: inputNomeOrganizador.value,
      numeroOperadores: Number(inputNumeroOperadores.value),
      organizadorID: 'ZOILxeVeDWrIQKYOWgcZ'
    })
  
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
    console.error("Error adding document: ", e);
    }
}

async function carregaDadosForm(idDocumento){
  console.log('chamou o update firebase')
  const dadoRetorno = await getDoc(doc(db, 'Jogos', idDocumento ))
  console.log('trouxe o doc do banco', dadoRetorno.id, dadoRetorno.data());
  btnCad.textContent = 'Editar Evento'
  
  // load form with obj data
  inputNomeCampo.value = dadoRetorno.data().nomeCampo
  inputNomeEvento.value = dadoRetorno.data().nomeEvento
  inputNomeOrganizador.value = dadoRetorno.data().nomeOrganizador
  inputNumeroOperadores.value = dadoRetorno.data().numeroOperadores
  //
  console.log('carreguei')
  idEditando = dadoRetorno
  editando = true
  
}

async function listAll(){
   // mont the query
  queryFirebase = collection(db, 'Jogos')

  // call a firebase with my data
  querySnapshot = await getDocs(queryFirebase)
  if (querySnapshot) carregado = true
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // DADOS EM DOC.DATA()
    //console.log(doc.id, " => ", doc.data());

    listagemGamesHtml(doc.id, doc.data())
    
  })
  
}

async function listWhere(param){
  // mont the query
  queryFirebase = query(collection(db, "Jogos"), where("organizadorID", "==", param))
 
  // call a firebase with my data 
  querySnapshot = await getDocs(queryFirebase)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    listagemGamesHtml(doc.data())
    

  })


  //call a function to list games
 
}


function listagemGamesHtml(id, obj){
  
  divListagemGames.innerHTML += `
  <div class="resultadosListagem" data-id=${id}>
    ${obj.nomeEvento} - ${obj.nomeCampo} - <button class="editar">Editar</button> | <button class="deletar">Deletar</button>
  </div>
  `
  
}

function limparHtml(){
  while(divListagemGames.firstChild) {
    divListagemGames.removeChild(divListagemGames.firstChild);
  }
}



async function deleteItem(id){
  await deleteDoc(doc(db, "Jogos", id))
  limparHtml()
  listAll()
}

divListagemGames.addEventListener('click', (e) => {
  
  if( e.target.classList == 'deletar'){
    console.log('ativar funcao');
    deleteItem(e.target.parentNode.dataset.id)
  }

  if( e.target.classList == 'editar'){
    console.log('ativar funcao editar');
    //updateItem(e.target.parentNode.dataset.id)
    console.log(e.target.parentNode.dataset.id);
    //listaDocID(e.target.parentNode.dataset.id)
    carregaDadosForm(e.target.parentNode.dataset.id)
  }

  
})


function limpaForm(){
  inputNomeCampo.value = ''
  inputNomeEvento.value = ''
  inputNomeOrganizador.value = ''
  inputNumeroOperadores.value = ''
}

async function updateItem(id, data){
  
  try{
    await updateDoc(doc(db, "Jogos", id), {
      nomeCampo: inputNomeCampo.value,
      nomeEvento: inputNomeEvento.value,
      nomeOrganizador: inputNomeOrganizador.value,
      numeroOperadores: Number(inputNumeroOperadores.value),
      organizadorID: 'ZOILxeVeDWrIQKYOWgcZ'} 
    )
    console.log("Document update with ID: ", id);
    console.log('vamos limpar o form');
    limpaForm()
    btnCad.textContent = 'Criar Evento'
  }catch (e) {
    console.error("Error adding document: ", e);
  }
  
}


async function listaDocID(id){
  const dadoRetorno = await getDoc(doc(db, 'Jogos', id ))

  if (dadoRetorno.exists()) {
    updateItem(dadoRetorno.id, dadoRetorno.data())
    
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
 
  
}

function CarregaDadosFormParaEditar(data){
  inputNomeCampo.value = data.nomeCampo
  nomeEvento.value = data.nomeEvento
  nomeOrganizador.value = data.nomeOrganizador
  numeroOperadores.value = data.numeroOperadores
}


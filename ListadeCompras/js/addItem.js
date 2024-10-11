import { criarItemDaLista } from "./createItem.js";
import { verificarListaVazia } from "./verifyEmptyList.js";

const item = document.getElementById("input-item");
const listaDeCompras = document.getElementById("lista-de-compras");

export function adicionarItem(evento) {
    evento.preventDefault()
    
    if (item.value === "") {
        alert("Insira um item!");
        return;
    }

    const itemDaLista = criarItemDaLista(item.value); 
    listaDeCompras.appendChild(itemDaLista);
    verificarListaVazia(listaDeCompras);
    item.value = "";
}
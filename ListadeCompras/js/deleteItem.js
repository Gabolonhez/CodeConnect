import { verificarListaComprados} from "./verifyBoughtList.js";
import { verificarListaVazia } from "./verifyEmptyList.js";

const listaDeCompras = document.getElementById("lista-de-compras");
const listaComprados = document.getElementById("lista-comprados");

const deleteItem = (elemento) => {
    let confirmacao = confirm("Are u sure you want to delete this item?");

    if (confirmacao) {
        elemento.remove();

        verificarListaVazia(listaDeCompras);
        verificarListaComprados(listaComprados);
    }
}

export { deleteItem }; 
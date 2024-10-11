import { gerarDiaDaSemana } from "./generateWeekDay.js";

export const editarItem = (elemento) => {
    let novoItem = prompt("Digite o novo nome do Item:");

    if (novoitem !== null && novoItem.trim() !== "") {
        const itemTextoAtualizado = element.querySelector("#item-titulo");
        itemTextoAtualizado = textContent = novoItem;

        const estavaComprado = elemento.querySelector("input-checkbox").checked;

        if (estavaComprado) {
            elemento.querySelector(".input-checkbox").checked = true;
            elemento.querySelector(".checkbox-customizado").classList.add("checked");
            itemTextoAtualizado.style.textDecoration = "line-through";
        }

        const dataDeCriacao = elemento.querySelector(".texto-data");
        dataDeCriacao.textContent = gerarDiaDaSemana();
    }
}
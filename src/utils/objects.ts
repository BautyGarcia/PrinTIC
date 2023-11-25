export const coloresPedido = {
    "PENDIENTE": "bg-[#ff6c31]",
    "APROBADO": "bg-[#65FF7E]",
    "IMPRIMIENDO": "bg-[#5e2b97]",
    "ESPERANDO_RETIRO": "bg-[#18d0da]",
    "ENTREGADO": "bg-[#E61366]",
    'CON_ERRORES': "bg-[#FF4343]",
    "DENEGADO": "bg-[#6A6A6A]",
    'FALTA_HACER_PIEZAS': "bg-[#ed58ec]",
    "CADUCADO": "bg-[#6A6A6A]",
    "TIMI": "bg-[#008080]",
    "PROYECTO": "bg-[#18d0da]"
}

const estadosPedido = {
    "PENDIENTE": "Pendiente",
    "APROBADO": "Aprobado",
    "IMPRIMIENDO": "Imprimiendo",
    "ESPERANDO_RETIRO": "Esperando retiro",
    "ENTREGADO": "Entregado",
    'CON_ERRORES': "Con errores",
    "DENEGADO": "Denegado",
    'FALTA_HACER_PIEZAS': "Falta hacer piezas",
    "CADUCADO": "Caducado",
    "": "Todos"
}

export const estadosPedidoValues = Object.values(estadosPedido);
export const estadosPedidoKeys = Object.keys(estadosPedido);
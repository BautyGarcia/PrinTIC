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
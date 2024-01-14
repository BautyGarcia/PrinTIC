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

export const estadosCambioPedido = {
    "PENDIENTE": "Pendiente",
    "APROBADO": "Aprobado",
    "IMPRIMIENDO": "Imprimiendo",
    "ESPERANDO_RETIRO": "Esperando retiro",
    "ENTREGADO": "Entregado",
    'CON_ERRORES': "Con errores",
    "DENEGADO": "Denegado",
    'FALTA_HACER_PIEZAS': "Falta hacer piezas",
    "CADUCADO": "Caducado",
}

export const estadosPedidoValues = Object.values(estadosPedido);
export const estadosPedidoKeys = Object.keys(estadosPedido); 
export const estadosCambioPedidoValues = Object.values(estadosCambioPedido);
export const estadosCambioPedidoKeys = Object.keys(estadosCambioPedido);

export const estadosTermiandos = ["ENTREGADO", "DENEGADO", "CON_ERRORES", "CADUCADO"]
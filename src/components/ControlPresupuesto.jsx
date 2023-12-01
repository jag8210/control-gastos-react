import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({gastos, presupuesto}) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado;
    
    // Calcular el porcentaje gastado
    const nuevoPorcentaje =( ( ( presupuesto - totalDisponible ) / presupuesto) * 100).toFixed(2);

    setGastado(totalGastado);    
    setDisponible(totalDisponible);
    setTimeout(() => {
        setPorcentaje(nuevoPorcentaje);
    }, 1000);
  },[gastos] )

    const formatearCantidad = (cantidad) =>{
        return cantidad.toLocaleString('en-US', {
            style: 'currency', 
            currency: 'USD'
        })
    }
  return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
              <div>
                    <CircularProgressbar
                          styles={buildStyles({
                                pathColor: "#3b82f6",
                                trailColor: "#f5f5f5",
                                textColor: "#3b82f6",
                          })}
                          value={porcentaje}
                          text={`${porcentaje}% Gastado`}
                    />
              </div>

              <div className="contenido-presupuesto">
                    <p>
                          {" "}
                          Presupuesto:{" "}
                          <span>{formatearCantidad(presupuesto)}</span>
                    </p>
                    <p className={` ${disponible < 0 ? "negativo" : ""} `}>
                          {" "}
                          Disponible:{" "}
                          <span>{formatearCantidad(disponible)}</span>
                    </p>
                    <p>
                          {" "}
                          Gastado: <span>{formatearCantidad(gastado)}</span>
                    </p>
              </div>
        </div>
  );
}

export default ControlPresupuesto
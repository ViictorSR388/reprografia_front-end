import React from "react";
import "./styles.scss";
import { useHistory } from 'react-router';
import Repo from '../img/repo'

function SideBar(props) {

    const history = useHistory();

    const routeForm = () => {
        history.push("/requestForm");
    }

    const routeManagement = () => {
        history.push("/management");
    }

    const routeHistory = () => {
        history.push("/historyAdmin");
    }

    const routeMyRequests = () => {
        history.push("/myRequests");
    }

    const routeStatistics = () => {
        history.push("/statistics");
    }

    return (
        <div className="sidebarG">
                <Repo image={props.image} nif={props.nif} />                
            <h2 className="subTitle" onClick={() => {history.push(`/user/${props.nif}`)}}>{props.name}</h2>
            <div className="buttonsG">
            
            {props.requestForm ? <></> : <><button className="buttonG" onClick={routeForm}>Solicitar Impressão</button></>}
                {props.admin ?
                 <>
                {props.management ? <></> : <button className="buttonG" onClick={routeManagement}>Gerencia de usuários</button>}
                {props.estatisticas ? <></> : <button className="buttonG" onClick={routeStatistics}>Estatísticas</button>}
                {props.historico ? <></> : <button className="buttonG" onClick={routeHistory}>Histórico</button>}
                </> : <></>}
                <button className="buttonG" onClick={routeMyRequests}>Meus Pedidos</button>
            </div>
        </div>
    );
}

export default SideBar;
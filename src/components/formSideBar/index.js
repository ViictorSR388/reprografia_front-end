import React, { useEffect, useState } from "react";
import "./styles.scss";
import "../img/repo.scss"
import { useHistory } from 'react-router';
import axios from 'axios';
import Loading from '../../../src/components/loading';

function SideBar(props) {

    const [name, setName] = useState("");
    const [nif, setNif] = useState("");
    const [image, setImage] = useState("");
    const [admin, setAdmin] = useState(false);
    const port = process.env.REACT_APP_PORT || 3002;
    const reprografia_url = `${process.env.REACT_APP_REPROGRAFIA_URL}:${port}`;
    const history = useHistory();

    const routeForm = () => {
        history.push("/requestForm");
    }

    const routeManagement = () => {
        history.push("/management");
    }

    const routeMyRequests = () => {
        history.push("/myRequests");
    }

    const routeStatistics = () => {
        history.push("/statistics");
    }

    const routeServices = () => {
        history.push("/services");
    }

    var [loading, setLoading] = useState(Loading);

    useEffect(() => {
        setLoading(true)
        axios
            .get(`${reprografia_url}/myUser/`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }).then((result) => {
                if (result.data.roles) {
                    setName(result.data.nome)
                    setNif(result.data.nif)
                    setImage(`${reprografia_url}/${result.data.imagem}`)
                    if (result.data.roles[0].descricao === "admin") {
                        setAdmin(true)
                    }
                    else {
                        setAdmin(false)
                    }

                    if (props.nif) {
                        setNif(props.nif)
                    }
                    if (props.image) {
                        setImage(`${props.image}`)
                    }
                    if (props.name) {
                        setName(props.name)
                    }
                    if (props.admin) {
                        setAdmin(props.admin)
                    }
                }
                setLoading(false)
            })
    }, [props.nif, props.image, props.name, props.admin, reprografia_url])

    return (
        <>
            {loading ? <Loading /> : <>
                <div className="sidebarG">
                    <div onClick={() => { history.push(`/user/${nif}`) }} className="circle">
                        <img src={image} className="repo" alt="imagem do usuário" />
                    </div>
                    <h2 className="subTitle" onClick={() => { history.push(`/user/${nif}`) }}>{name}</h2>
                    <h3 className="sidebar-nif" onClick={() => { history.push(`/user/${nif}`) }}>NIF: {nif}</h3>
                    <div className="buttonsG">

                        {props.requestForm ? <></> : <><button className="buttonG" onClick={routeForm}>Solicitar Impressão</button></>}
                        {props.requestsNoInfo ? <></> :
                            <>
                                <button className="buttonG" onClick={routeMyRequests}>Meus Pedidos</button>
                            </>
                        }
                        {admin ?
                            <>

                                {props.management ? <></> : <button className="buttonG" onClick={routeManagement}>Gerencia de usuários</button>}
                                {props.estatisticas ? <></> : <button className="buttonG" onClick={routeStatistics}>Estatísticas</button>}
                                {props.services ? <></> : <button className="buttonG" onClick={routeServices}>Serviços</button>}
                            </> :
                            <>
                            </>}

                    </div>
                </div>
            </>}
        </>
    );
}

export default SideBar;

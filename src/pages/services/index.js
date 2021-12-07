import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "../../styles/services.scss";
import Header from "../../../src/components/header";
import SideBar from "../../../src/components/formSideBar";
import { Table } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import Menu from "../../components/hamburgerButton";
import Loading from '../../../src/components/loading';

export default function Services(props) {
  var history = useHistory();

  const [servicos, setServicos] = useState({
    servicosCA: [],
    servicosCT: [],
    status: false,
  });

  var [ativos, setAtivos] = useState();

  var [semRegistros, setSemRegistros] = useState();

  const port = process.env.REACT_APP_PORT || 3002;
  
  const reprografia_url = `${process.env.REACT_APP_REPROGRAFIA_URL}:${port}`;

  useEffect(() => {
    setLoading(true);
    onLoad();
    return () => {
      setServicos({});
    };
  }, []);

  const servicosAtivos = (id) => {
    axios
      .get(`${reprografia_url}/services/enabled=` + id, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response);
        if (id === 1) {
          setAtivos(true);
        } else {
          setAtivos(false);
        }

        if (response.data.message) {
          setSemRegistros(1);
        } else {
          setServicos({
            servicosCA: response.data.servicosCA,
            servicosCT: response.data.servicosCT,
          });
          setSemRegistros(0);
        }
      });
  };

  const onLoad = async () => {
    var config = {
      method: "get",
      url: `${reprografia_url}/services/enabled=1`,
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    try {
      const response = await axios(config);
      if (response) {
        if (response.data.message) {
          console.log(response.data.message);
        } else {
          setServicos({
            servicosCA: response.data.servicosCA,
            servicosCT: response.data.servicosCT,
            status: true,
          });
        }
        setAtivos(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const enableUser = ({ id, type, enable }) => {
    var atvr = 1;

    if (enable === 1) {
      atvr = 0;
    }

    var config = {
      method: "put",
      url: `${reprografia_url}/service/${id}/type=${type}/enable=${atvr}`,
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };

    axios(config)
      .then(function (response) {
        if (atvr === 1) {
          servicosAtivos(0);
        } else if (atvr === 0) {
          servicosAtivos(1);
        }
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  var [loading, setLoading] = useState(Loading);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }, [])

  return (
    <>
      {loading ? <> <Loading /> </> :
        <>
          <Menu />
          <Header nif={props.nif} />
          <SideBar
            image={props.image}
            name={props.name}
            admin={props.admin}
            services={true}
            nif={props.nif}
          />
          <div className="container-Services">
            <Button className="btn-boot" onClick={() => servicosAtivos(1)}>
              Serviços Ativos
            </Button>
            <Button className="btn-boot" onClick={() => servicosAtivos(0)}>
              Serviços Inativos
            </Button>
          </div>
          <div className="servicesAcoes">
            {ativos ? (
              <h1 className="title-services">Serviços Ativos:</h1>
            ) : (
              <h1 className="title-services">Serviços Inativos:</h1>
            )}
          </div>
          <div className="services-card">
            <div className="ct-table-div">
              <h1 className="title-services">Capa &#38; Acabamento</h1>
              {semRegistros ? (
                <p>Sem registros...</p>
              ) : (
                <>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>DESCRIÇÃO</th>
                        <th>QUANTIDADE</th>
                        <th>CUSTO</th>
                        <th> </th>
                      </tr>
                    </thead>
                    {servicos.servicosCA.map((data) => (
                      <React.Fragment key={data.id_servico}>
                        <tbody>
                          <tr>
                            {/* DESCRIÇÃO */}
                            <td>{data.descricao}</td>
                            {/* QUANTIDADE */}
                            <td>{data.quantidade}</td>
                            {/* CUSTO */}
                            <td>{"R$ " + data.valor_unitario}</td>
                            {data.ativado ? (
                              <tr>
                                <td>
                                  <Button
                                    className="btn-edit"
                                    onClick={() => {
                                      history.push(`/edit-services/${data.id_servico}/ca`);
                                    }}
                                  >
                                    Editar
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    className="btn-disable"
                                    onClick={() =>
                                      enableUser({
                                        id: data.id_servico,
                                        type: "ca",
                                        enable: data.ativado,
                                      })
                                    }
                                  >
                                    Desabilitar
                                  </Button>
                                </td>
                              </tr>
                            ) : (
                              <td>
                                <Button
                                  className="btn-enable"
                                  onClick={() =>
                                    enableUser({
                                      id: data.id_servico,
                                      type: "ca",
                                      enable: data.ativado,
                                    })
                                  }
                                >
                                  Habilitar
                                </Button>
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </React.Fragment>
                    ))}
                  </Table>
                </>
              )}

              <Button
                className="btn-services"
                variant="primary"
                size="lg"
                onClick={() => {
                  history.push("/addService/ca");
                }}
              >
                Adicionar Serviço
              </Button>
            </div>
            <div className="ca-table-div">
              <h1 className="title-services">Copia &#38; Tamanho</h1>
              {semRegistros ? (
                <p>Sem registros...</p>
              ) : (
                <>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>DESCRIÇÃO</th>
                        <th>QUANTIDADE</th>
                        <th>CUSTO</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicos.servicosCT.map((data) => (
                        <React.Fragment key={data.id_servico}>
                          <tr>
                            {/* DESCRIÇÃO */}
                            <td>{data.descricao}</td>
                            {/* QUANTIDADE */}
                            <td>{data.quantidade}</td>
                            {/* CUSTO */}
                            <td>{"R$ " + data.valor_unitario}</td>
                            {data.ativado ? (
                              <tbody>
                                <td>
                                  <Button
                                      className="btn-edit"
                                      onClick={() => {
                                        history.push(`/edit-services/${data.id_servico}/ct`);
                                      }}
                                    >
                                      Editar
                                    </Button>
                                </td>
                                <td>
                                  <Button
                                    className="btn-disable"
                                    onClick={() =>
                                      enableUser({
                                        id: data.id_servico,
                                        type: "ct",
                                        enable: data.ativado,
                                      })
                                    }
                                  >
                                    Desabilitar
                                  </Button>
                                </td>
                              </tbody>
                            ) : (
                              <td>
                                <Button
                                  className="btn-enable"
                                  onClick={() =>
                                    enableUser({
                                      id: data.id_servico,
                                      type: "ct",
                                      enable: data.ativado,
                                    })
                                  }
                                >
                                  Habilitar
                                </Button>
                              </td>
                            )}
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
              <Button
                className="btn-services"
                variant="primary"
                size="lg"
                onClick={() => {
                  history.push("/addService/ct");
                }}
              >
                Adicionar Serviço
              </Button>
            </div>
          </div>
        </>
      }
    </>
  );
}
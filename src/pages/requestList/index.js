import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/requestList.scss";
import axios from "axios";
import { Table, Card } from "react-bootstrap";

import Header from '../../../src/components/header';
import Menu from '../../../src/components/hamburgerButton';
import SideBar from '../../../src/components/formSideBar';

function RequestList(props) {

  const { id } = useParams();

  var [pedidos, setPedidos] = useState({
    status: false,
    list: [],
    message: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3002/requestDetails/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data) {
          setPedidos({
            list: [result.data],
            status: true,
          });
        } else {
          setPedidos({
            message: result.data.message
          });
        }
      });
  }, []);

  return (
    <>
      <Menu />
      <Header nif={props.nif} />
      <SideBar image={props.image} name={props.name} admin={true} />

      <div className="container-management">
        <div className="management">
          <h1 className="userRequest">Solicitação de usuário</h1>
        </div>
      </div>

      <div className="container-management">
        <>
          <div className="request">
            {pedidos.status ? (
              <>
                {/* <Card className="details-card">
                  <div className="details-title">
                    <Card.Title className="title-itens">Curso</Card.Title>
                    <Card.Title className="title-itens">Centro de Custos</Card.Title>
                    <Card.Title className="title-itens">Titulo</Card.Title>
                    <Card.Title className="title-itens">Páginas</Card.Title>
                    <Card.Title className="title-itens">Cópias</Card.Title>
                    <Card.Title className="title-itens">Total</Card.Title>
                    <Card.Title className="title-itens">Encadernação</Card.Title>
                    <Card.Title className="title-itens">Formato e Cor</Card.Title>
                    <Card.Title className="title-itens">Modo de Envio</Card.Title>
                  </div>
                  <div className="form-details">
                    {pedidos.list.map((data) => (
                      <React.Fragment key={data.id_pedido}>
                        <div>
                          <Card.Text>{data.curso}</Card.Text>
                          <Card.Text>{data.centro_custos}</Card.Text>
                          <Card.Text>{data.titulo_pedido}</Card.Text>
                          <Card.Text>{data.num_paginas}</Card.Text>
                          <Card.Text>{data.num_copias}</Card.Text>
                          <Card.Text>{data.custo_total}</Card.Text>
                          <Card.Text>{data.acabamento}</Card.Text>
                          <Card.Text>{data.tamanho}</Card.Text>
                          <Card.Text>{data.modo_envio}</Card.Text>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </Card> */}

                <Table striped bordered hover size="sm">
                  {pedidos.list.map((data) => (
                    <React.Fragment key={data.id_pedido}>
                      <tbody>
                        <tr>
                          <td><strong>Curso</strong></td>
                          <td>
                            <Card.Text>{data.det_pedidos.id_curso}</Card.Text>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Centro de custos</strong></td>
                          <td>
                            <Card.Text>{data.det_pedidos.id_centro_custos}</Card.Text>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Título</strong></td>
                          <td>
                            <Card.Text>{data.titulo_pedido}</Card.Text>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Páginas</strong></td>
                          <td>
                            <Card.Text>{data.det_pedidos.num_paginas}</Card.Text>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Cópias</strong></td>
                          <td>
                            <Card.Text>{data.det_pedidos.num_copias}</Card.Text>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Total</strong></td>
                          <td>
                            <Card.Text>{data.custo_total}</Card.Text>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Encadernação</strong></td>
                          <td>
                            <Card.Text>{data.servico_pedidos.servicoCA}</Card.Text>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Formato e Cor</strong></td>
                          <td>
                            <Card.Text>{data.servico_pedidos.servicoCT}</Card.Text>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Modo de Envio</strong></td>
                          <td>
                            <Card.Text>{data.id_modo_envio}</Card.Text>
                          </td>
                        </tr>
                      </tbody>
                    </React.Fragment>
                  ))}
                </Table>
              </>
            ) : (
              <>
                <h1>{pedidos.message}</h1>
              </>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default RequestList;
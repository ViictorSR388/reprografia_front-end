import React, { useState, useEffect, useContext } from "react";
import "../../styles/requestManager.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FaSearch } from 'react-icons/fa';
import { AuthContext } from './../../helpers/AuthContext';

import MenuG from './../../components/hamburgerButtonG';
import Header from './../../components/header';
import SideBarGerencia from '../../components/formSideBar';

function RequestManager() {
    return (
      <>
        <MenuG />
        <Header />
        <SideBarGerencia />
    
        <div>
          <div>
            <h1>Serviços</h1>
            <label htmlFor="search">
              <input type="search" name="search" id="search" placeholder="Filtro" />
            </label>
            <FaSearch />
          </div>
    
          <div>
              {/* vamos colocar as requisições aqui */}
          </div>
        </div>
      </>
    );
}

export default RequestManager;

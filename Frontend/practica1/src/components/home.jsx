import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

export default function Home() {
    return (
        <>
            <center>
                <h1><Badge bg="info">Information:</Badge></h1>
                <br></br>
            </center>
            <h3>Name: <Badge bg="info">Osman Alejandro Pérez López</Badge></h3>
            <br></br>
            <h3>Academic Record: <Badge bg="info">201801229</Badge></h3>
            <br></br>
            <h3>Class: <Badge bg="info">Software Avanzado</Badge></h3>
            <br></br>
            <h3>Section: <Badge bg="info">P</Badge></h3>
            <br></br>

        </>
    );
}
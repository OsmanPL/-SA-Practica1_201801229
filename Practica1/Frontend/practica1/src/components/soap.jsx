import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "wouter";
import React, { useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import XMLParser from 'react-xml-parser';
import Badge from 'react-bootstrap/Badge';

export default function Soap() {
    const [data, setData] = useState();
    async function ListOfLanguagesByName() {
        const xmlData = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <ListOfLanguagesByName xmlns="http://www.oorsprong.org/websamples.countryinfo">
        </ListOfLanguagesByName>
      </soap:Body>
    </soap:Envelope>`;

        try {
            const response = await axios.post(
                'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso',
                xmlData,
                {
                    mode: "cors",
                    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
                }
            );
            console.log(response.data); // Maneja la respuesta SOAP aquí
            var xml = new XMLParser().parseFromString(response.data);    // Assume xmlText contains the example XML
            console.log(xml);
            console.log(xml.getElementsByTagName('m:tLanguage'));
            setData(xml.getElementsByTagName('m:tLanguage'));
        } catch (error) {
            console.error(error); // Maneja el error de la solicitud SOAP
        }
    }
    return (
        <>
            <center>
                <h2><Badge bg="info">SOAP API List of Languages by Name</Badge></h2>
                <br></br>
                <Button variant="info" onClick={ListOfLanguagesByName}>
                    Get List
                </Button>
            </center>


            <center>
                <div class="p-3 mb-2 bg-white text-white" style={{ width: "800px" }}>
                    <Table striped bordered hover variant="info">
                        <thead>
                            <tr>
                                <th>m:sISOCode</th>
                                <th>m:sName</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data
                                ? data.map((language) => {
                                    return (
                                        <tr>
                                            <td>{language.children[0].value}</td>
                                            <td>{language.children[1].value}</td>
                                        </tr>
                                    );
                                })
                                : null}
                        </tbody>
                    </Table>
                </div>
            </center>
        </>
    );
}
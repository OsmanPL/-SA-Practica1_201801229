import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

export default function Rest() {
    const [results, setResults] = useState([]);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=25&offset=0");
    const [next, setNext] = useState();
    const [previous, setPrevious] = useState();
    const [pokemon, setPokemon] = useState({ name: "prueba", sprites: { front_default: "" } });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getPokemons();
    }, [])

    async function getPokemon(urlPokemon) {
        try {
            const res = await axios.get(urlPokemon
            );
            console.log(res.data);
            setPokemon(res.data);
        } catch (error) {
            console.log(error);
        }
        handleShow();
    }

    const Siguiente = async (e) => {
        console.log(next);
        if (next !== undefined) {
            setUrl(next);
        }
        setResults([]);
        getPokemons();
    }

    const Anterior = async (e) => {
        setUrl(previous);
        setResults([]);
        getPokemons();
    }

    const getPokemons = async (e) => {
        try {
            const res = await axios.get(url
            );
            setNext(res.data.next);
            setPrevious(res.data.previous);
            setResults(res.data.results);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <center>
                <h2><Badge bg="info">REST API Pokemon</Badge></h2>
                <br></br>
                <Button variant="info" onClickCapture={
                    e => {
                        e.stopPropagation();
                        Anterior();
                    }
                }>
                    Previous Page
                </Button>
                <Button variant="info" onClickCapture={
                    e => {
                        e.stopPropagation();
                        Siguiente();
                    }
                }>
                    Next Page
                </Button>
            </center>
            <center>
                <div class="p-3 mb-2 bg-white text-white" style={{ width: "800px" }}>
                    <Table striped bordered hover variant="info">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Informacion del pokemon</th>
                                <th>Ver Pokemon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results
                                ? results.map((result) => {
                                    return (
                                        <tr>
                                            <td>{result.name}</td>
                                            <td>{result.url}</td>
                                            <td><Button variant="info" onClickCapture={
                                                e => {
                                                    e.stopPropagation();
                                                    getPokemon(result.url);
                                                }
                                            }>
                                                Ver Pokemon
                                            </Button></td>
                                        </tr>
                                    );
                                })
                                : null}
                        </tbody>
                    </Table>
                </div>
            </center>



            <Modal show={show} onHide={handleClose}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={pokemon.sprites.front_default} />
                    <Card.Body>
                        <Card.Title>{pokemon.name}</Card.Title>
                        <Card.Text>
                            Base Experience: {pokemon.base_experience} <br />
                            Height: {pokemon.height} <br />
                            Weight: {pokemon.weight} <br />
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Modal.Footer>
                    <Button variant="info" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
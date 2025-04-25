"use client"

import api from "@/services/api"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface Usuario {
    id: number
    nome: string
    usuario: string
    senha: string
    status: string
}

export default function login() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const router = useRouter()
    function carregarUsuarios() {
        api.get("/login")
            .then(function (resposta) {
                setUsuarios(resposta.data);
            })
    }
    useEffect(function () {
        carregarUsuarios();
    }, [])
    return (
        <div>
            <h1>Lista de Usuários!</h1>
            <ul>
                {usuarios.map(
                    function (usuario) {
                        return (
                            <li key={usuario.id} onClick={function () {
                                router.push(`/login/${usuario.id}`)
                            }}>
                                <p><strong>Nome: </strong>{usuario.nome}</p>
                                <p><strong>Usuário: </strong>{usuario.usuario}</p>
                                <p><strong>Status: </strong>{usuario.status}</p>
                                <hr />
                            </li>
                        )
                    }
                )}
            </ul>
            <br />
            <Link href={"/"}>Tela de início</Link>
        </div>
    )
}